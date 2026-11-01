#!/usr/bin/env node
/**
 * Sync owner supply graphics → public/ (deployed static assets).
 *
 * - supply/site/branding/tier-a-1-nav-icon.png → public/brand/studio-icon.png (link previews),
 *   plus centre-square crops studio-icon.webp (80px header) and favicon.png (64px)
 * - supply/site/branding/avatar.{webp,png,jpg,jpeg} → public/brand/avatar.<ext>
 * - supply/apps/<slug>/graphics/logo-icon.png → public/apps/<slug>/icon.webp
 *   (square icons 192px, wordmarks 840px wide — twice their largest display size)
 * - supply/apps/<slug>/graphics/hero-banner.{jpg,png} → public/apps/<slug>/hero.<ext>
 *   (a .jpg web copy wins over the .png original when both exist)
 * - supply/apps/<slug>/graphics/share-card.{jpg,png} → public/apps/<slug>/share.<ext>
 *   (1200×630 link-preview image)
 * - supply/apps/<slug>/graphics/screenshots/* → public/apps/<slug>/screenshots/*
 *
 * Run after adding or updating images in supply/. See docs/adding-an-app.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** @param {string} src @param {string} dest */
function copyIfChanged(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`skip  missing source: ${path.relative(root, src)}`);
    return false;
  }

  const srcBuf = fs.readFileSync(src);
  if (fs.existsSync(dest)) {
    const destBuf = fs.readFileSync(dest);
    if (srcBuf.length === destBuf.length && srcBuf.equals(destBuf)) {
      console.log(`same  ${path.relative(root, dest)}`);
      return false;
    }
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, srcBuf);
  console.log(`wrote ${path.relative(root, dest)}`);
  return true;
}

/** @param {Buffer} buf @param {string} dest */
function writeIfChanged(buf, dest) {
  if (fs.existsSync(dest) && buf.equals(fs.readFileSync(dest))) {
    console.log(`same  ${path.relative(root, dest)}`);
    return false;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(`wrote ${path.relative(root, dest)}`);
  return true;
}

/**
 * Write a web-sized WebP copy of an app icon (square → 192px, wordmark → 840px wide).
 * @param {string} src @param {string} dest
 */
async function writeIcon(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`skip  missing source: ${path.relative(root, src)}`);
    return false;
  }

  const image = sharp(src);
  const { width = 0, height = 0 } = await image.metadata();
  const size = width === height ? { width: 192, height: 192 } : { width: 840 };
  const buf = await image
    .resize({ ...size, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  return writeIfChanged(buf, dest);
}

/**
 * Write the centre-square crops of the studio icon: header (WebP) and favicon (PNG).
 * @param {string} src @param {string} publicBrand
 */
async function writeStudioIcons(src, publicBrand) {
  if (!fs.existsSync(src)) return 0;

  const square = (size) => sharp(src).resize({ width: size, height: size, fit: 'cover' });
  const header = await square(80).webp({ quality: 85 }).toBuffer();
  const favicon = await square(64).png().toBuffer();

  let count = 0;
  if (writeIfChanged(header, path.join(publicBrand, 'studio-icon.webp'))) count += 1;
  if (writeIfChanged(favicon, path.join(publicBrand, 'favicon.png'))) count += 1;
  return count;
}

const AVATAR_FILENAMES = ['avatar.webp', 'avatar.png', 'avatar.jpg', 'avatar.jpeg'];

async function syncBranding() {
  let count = 0;
  const brandingDir = path.join(root, 'supply', 'site', 'branding');
  const publicBrand = path.join(root, 'public', 'brand');

  const iconSrc = path.join(brandingDir, 'tier-a-1-nav-icon.png');
  if (copyIfChanged(iconSrc, path.join(publicBrand, 'studio-icon.png'))) count += 1;
  count += await writeStudioIcons(iconSrc, publicBrand);

  for (const name of AVATAR_FILENAMES) {
    const src = path.join(brandingDir, name);
    if (!fs.existsSync(src)) continue;
    if (copyIfChanged(src, path.join(publicBrand, name))) count += 1;
    break;
  }

  return count;
}

const IMAGE_EXTS = ['.jpg', '.png'];

/**
 * Copy the first `<srcBase>.<ext>` found (IMAGE_EXTS order) to `<destBase>.<ext>`.
 * @param {string} srcDir @param {string} srcBase @param {string} destDir @param {string} destBase
 */
function copyFirstOf(srcDir, srcBase, destDir, destBase) {
  for (const ext of IMAGE_EXTS) {
    const src = path.join(srcDir, srcBase + ext);
    if (!fs.existsSync(src)) continue;
    return copyIfChanged(src, path.join(destDir, destBase + ext));
  }
  return false;
}

async function syncAppAssets() {
  const supplyApps = path.join(root, 'supply', 'apps');
  const skip = new Set(['_template']);
  let count = 0;

  for (const slug of fs.readdirSync(supplyApps)) {
    if (skip.has(slug)) continue;
    const graphicsDir = path.join(supplyApps, slug, 'graphics');
    if (!fs.existsSync(graphicsDir)) continue;

    const publicDir = path.join(root, 'public', 'apps', slug);
    const iconSrc = path.join(graphicsDir, 'logo-icon.png');

    if (await writeIcon(iconSrc, path.join(publicDir, 'icon.webp'))) count += 1;
    if (copyFirstOf(graphicsDir, 'hero-banner', publicDir, 'hero')) count += 1;
    if (copyFirstOf(graphicsDir, 'share-card', publicDir, 'share')) count += 1;

    const shotsDir = path.join(graphicsDir, 'screenshots');
    if (fs.existsSync(shotsDir)) {
      for (const name of fs.readdirSync(shotsDir)) {
        if (!IMAGE_EXTS.includes(path.extname(name).toLowerCase())) continue;
        const dest = path.join(publicDir, 'screenshots', name);
        if (copyIfChanged(path.join(shotsDir, name), dest)) count += 1;
      }
    }
  }

  return count;
}

console.log('Syncing supply graphics → public/…\n');
console.log('brand');
const brandCount = await syncBranding();
console.log('\napps');
const appCount = await syncAppAssets();
console.log(`\nDone. ${brandCount + appCount} file(s) updated.`);
