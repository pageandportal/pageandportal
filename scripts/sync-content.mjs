#!/usr/bin/env node
/**
 * Sync owner supply → site content.
 *
 * - Legal: supply/apps/<slug>/legal/*.md → src/content/legal/<slug>/
 * - Site config: supply/site/about.md + donate.md → src/config/ (when values are not TODO)
 *
 * App frontmatter (src/content/apps/*.md) is maintained manually from supply/app.md.
 * Run after editing supply; see docs/adding-an-app.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const supplyApps = path.join(root, 'supply', 'apps');

const LEGAL_TITLES = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  credits: 'Credits',
};

function isTodo(value) {
  return !value || /TODO/i.test(value);
}

/** @param {string} filePath */
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/** @param {string} filePath @param {string} content */
function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

/** @param {string} markdown @param {string} key */
function tableCell(markdown, key) {
  const re = new RegExp(`\\|\\s*\\*\\*${key}\\*\\*\\s*\\|\\s*([^|\\n]+)`, 'i');
  const match = markdown.match(re);
  return match?.[1]?.trim() ?? '';
}

/** @param {string} tsString */
function tsString(value) {
  return JSON.stringify(value);
}

function syncLegal() {
  const skip = new Set(['_template']);
  let count = 0;

  for (const slug of fs.readdirSync(supplyApps)) {
    if (skip.has(slug)) continue;
    const appDir = path.join(supplyApps, slug);
    if (!fs.statSync(appDir).isDirectory()) continue;

    const legalDir = path.join(appDir, 'legal');
    if (!fs.existsSync(legalDir)) continue;

    for (const file of fs.readdirSync(legalDir)) {
      if (!file.endsWith('.md')) continue;

      const base = file.replace(/\.md$/, '');
      const title = LEGAL_TITLES[base] ?? base.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const body = readFile(path.join(legalDir, file)).trim();
      const out = `---\napp: ${slug}\ntitle: ${title}\n---\n\n${body}\n`;
      const dest = path.join(root, 'src', 'content', 'legal', slug, file);
      writeFile(dest, out);
      count += 1;
      console.log(`legal  ${slug}/${file}`);
    }
  }

  return count;
}

function syncAbout() {
  const aboutPath = path.join(root, 'supply', 'site', 'about.md');
  if (!fs.existsSync(aboutPath)) return false;

  const markdown = readFile(aboutPath);
  const displayNameRaw = markdown.match(/## Display name[^\n]*\n\n([^\n#]+)/)?.[1]?.trim() ?? '';
  const displayName = isTodo(displayNameRaw) ? '' : displayNameRaw;
  const headline = tableCell(markdown, 'Headline');

  const bioParts = [];
  const bioRe = /Paragraph (\d+):\s*\n\s*([^\n#]+)/g;
  let match;
  while ((match = bioRe.exec(markdown)) !== null) {
    const text = match[2].trim();
    if (!isTodo(text)) bioParts.push(text);
  }
  const bio = bioParts.join('\n\n');

  const next = {
    displayName: isTodo(displayName) ? null : displayName,
    headline: isTodo(headline) ? null : headline,
    bio: bio || null,
  };

  const currentPath = path.join(root, 'src', 'config', 'about.ts');
  const current = readFile(currentPath);
  if (
    current.includes(`headline: ${tsString(next.headline)}`) &&
    current.includes(`bio: ${tsString(next.bio)}`) &&
    current.includes(`displayName: ${tsString(next.displayName)}`)
  ) {
    console.log('about  unchanged (still TODO in supply or already synced)');
    return false;
  }

  if (!next.headline && !next.bio && !next.displayName) {
    console.log('about  skipped (supply/site/about.md still has TODO placeholders)');
    return false;
  }

  const out = `/** Shared developer blurb — sync with supply/site/about.md when owner supplies copy. */
export const ABOUT = {
  headline: ${tsString(next.headline)} as string | null,
  bio: ${tsString(next.bio)} as string | null,
  displayName: ${tsString(next.displayName)} as string | null,
} as const;

export function hasAboutContent(): boolean {
  return Boolean(ABOUT.headline || ABOUT.bio);
}
`;
  writeFile(currentPath, out);
  console.log('about  updated src/config/about.ts');
  return true;
}

function syncDonate() {
  const donatePath = path.join(root, 'supply', 'site', 'donate.md');
  if (!fs.existsSync(donatePath)) return false;

  const markdown = readFile(donatePath);
  const url = tableCell(markdown, 'URL');
  const label = tableCell(markdown, 'Button label');
  const thankYou = tableCell(markdown, 'Short thank-you line');

  const next = {
    url: isTodo(url) ? null : url,
    label: isTodo(label) ? 'Support development' : label.replace(/\*\*/g, ''),
    thankYou: isTodo(thankYou) ? null : thankYou,
  };

  const currentPath = path.join(root, 'src', 'config', 'donate.ts');
  const current = readFile(currentPath);
  if (current.includes(`url: ${tsString(next.url)}`) && current.includes(`label: ${tsString(next.label)}`)) {
    console.log('donate unchanged (still TODO in supply or already synced)');
    return false;
  }

  if (!next.url) {
    console.log('donate skipped (supply/site/donate.md URL still TODO)');
    return false;
  }

  const out = `/** Global donate settings — sync with supply/site/donate.md when owner supplies URL. */
export const DONATE = {
  url: ${tsString(next.url)} as string | null,
  label: ${tsString(next.label)},
  thankYou: ${tsString(next.thankYou)} as string | null,
} as const;

export function resolveDonateUrl(appUrl?: string, useGlobal = true): string | null {
  if (appUrl) return appUrl;
  if (useGlobal && DONATE.url) return DONATE.url;
  return null;
}
`;
  writeFile(currentPath, out);
  console.log('donate updated src/config/donate.ts');
  return true;
}

console.log('Syncing supply → site content…\n');
const legalCount = syncLegal();
syncAbout();
syncDonate();
console.log(`\nDone. ${legalCount} legal file(s) written.`);
