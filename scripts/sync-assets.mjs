#!/usr/bin/env node
/**
 * Sync owner supply graphics → public/ (deployed static assets).
 *
 * - supply/site/branding/tier-a-1-nav-icon.png → public/brand/studio-icon.png
 * - supply/site/branding/avatar.{webp,png,jpg,jpeg} → public/brand/avatar.<ext>
 * - supply/apps/<slug>/graphics/logo-icon.png → public/apps/<slug>/icon.png
 * - supply/apps/<slug>/graphics/hero-banner.{jpg,png} → public/apps/<slug>/hero.<ext>
 *   (a .jpg web copy wins over the .png original when both exist)
 * - supply/apps/<slug>/graphics/share-card.{jpg,png} → public/apps/<slug>/share.<ext>
 *   (1200×630 link-preview image)
 *
 * Run after adding or updating images in supply/. See docs/adding-an-app.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const AVATAR_FILENAMES = ['avatar.webp', 'avatar.png', 'avatar.jpg', 'avatar.jpeg'];

function syncBranding() {
  let count = 0;
  const brandingDir = path.join(root, 'supply', 'site', 'branding');
  const publicBrand = path.join(root, 'public', 'brand');

  const iconSrc = path.join(brandingDir, 'tier-a-1-nav-icon.png');
  if (copyIfChanged(iconSrc, path.join(publicBrand, 'studio-icon.png'))) count += 1;

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

function syncAppAssets() {
  const supplyApps = path.join(root, 'supply', 'apps');
  const skip = new Set(['_template']);
  let count = 0;

  for (const slug of fs.readdirSync(supplyApps)) {
    if (skip.has(slug)) continue;
    const graphicsDir = path.join(supplyApps, slug, 'graphics');
    if (!fs.existsSync(graphicsDir)) continue;

    const publicDir = path.join(root, 'public', 'apps', slug);
    const iconSrc = path.join(graphicsDir, 'logo-icon.png');

    if (copyIfChanged(iconSrc, path.join(publicDir, 'icon.png'))) count += 1;
    if (copyFirstOf(graphicsDir, 'hero-banner', publicDir, 'hero')) count += 1;
    if (copyFirstOf(graphicsDir, 'share-card', publicDir, 'share')) count += 1;
  }

  return count;
}

console.log('Syncing supply graphics → public/…\n');
console.log('brand');
const brandCount = syncBranding();
console.log('\napps');
const appCount = syncAppAssets();
console.log(`\nDone. ${brandCount + appCount} file(s) updated.`);
