# Adding an app page

## Content workflow

1. Copy `supply/apps/_template/` to `supply/apps/<slug>/` and fill in `app.md`.
2. Add images under `supply/apps/<slug>/graphics/` (`logo-icon.png`, `hero-banner.png`).
3. Add legal Markdown under `supply/apps/<slug>/legal/`.
4. Register the app in `apps.inventory.json` for the home grid. Add `"hidden": true` to keep the page built (reachable by direct link) but off the home grid and sitemap.
5. Add matching frontmatter in `src/content/apps/<slug>.md` (see `commander-vault.md` for shape).
6. Run **`npm run sync:content`** to copy legal pages from `supply/` and refresh site config when `supply/site/about.md` and `donate.md` are filled in.
7. Run **`npm run sync:assets`** to copy graphics from `supply/` into `public/` (nav icon, app icons, heroes).

## Assets

Source files live in `supply/`; **`npm run sync:assets`** writes deploy copies:

| Supply | Public |
|--------|--------|
| `supply/site/branding/tier-a-1-nav-icon.png` | `public/brand/studio-icon.png` |
| `supply/site/branding/avatar.{webp,png,jpg}` | `public/brand/avatar.<ext>` |
| `supply/apps/<slug>/graphics/logo-icon.png` | `public/apps/<slug>/icon.webp` (resized: square 192px, wordmark 840px wide) |
| `supply/apps/<slug>/graphics/hero-banner.{jpg,png}` | `public/apps/<slug>/hero.<ext>` |
| `supply/apps/<slug>/graphics/share-card.{jpg,png}` | `public/apps/<slug>/share.<ext>` |
| `supply/apps/<slug>/graphics/screenshots/*.{jpg,png}` | `public/apps/<slug>/screenshots/*` |

Reference paths in app frontmatter without a leading slash (e.g. `apps/commander-vault/icon.webp`).

**Large heroes:** if `hero-banner.png` is a photo over ~500 KB, save a `hero-banner.jpg` web copy beside it (quality ~85). The `.jpg` wins on sync; point `heroImage` at `hero.jpg`.

## Screenshots

Optional `screenshots` frontmatter adds a **Screenshots** section between Features and Roadmap. Each entry needs `src`, `alt`, `width` and `height` (the file's pixel size), plus an optional `caption`; `screenshotsNote` adds a line under the heading (e.g. that shots come from a test build). Phone captures can be large — save half-size web copies into `graphics/screenshots/`. With one or two portrait shots and two or more landscape shots, desktop shows the portraits side by side with the landscapes stacked beside them. Portrait-only sets fill every row: up to six in one row on wide screens, and two rows of three (or pairs) on mid widths; otherwise it is a four-column grid with landscapes spanning two. Clicking a screenshot opens it full-screen with its caption and previous/next controls (arrow keys and swipe work too), so the image files double as the large view — don't shrink them below roughly 540px on the short side.

## Link previews and search title

- **Share card:** run `python scripts/make-share-card.py <slug>` to crop the hero to a 1200×630 `share-card.jpg`, sync, then set `shareImage: apps/<slug>/share.jpg`. App pages with a share card or hero use the large link-preview card.
- **Search title:** optional `pageTitle` frontmatter replaces the app name in `<title>` (e.g. `Insert Continue — Retro Arcade Mini Games`); the page heading still uses `name`.
- **Sitemap:** `/sitemap.xml` is generated from listed apps and their routed legal pages — nothing to edit.

## Legal pages

1. Add Markdown under `supply/apps/<slug>/legal/` (e.g. `privacy.md`).
2. Run `npm run sync:content` — copies into `src/content/legal/<slug>/` with frontmatter (`app`, `title`).
3. List the page in the app’s `legalPages` frontmatter (`slug` must match the filename, e.g. `privacy`).

Routes: `/apps/<slug>/<legal-slug>/` (e.g. `/apps/portal-pages-times-tables/privacy`).

## Site-wide config

- **About blurb + photo:** `supply/site/about.md` + `supply/site/branding/avatar.{jpg,png,webp}` → `src/config/about.ts` and `public/brand/` (via `npm run sync`)
- **Donate URL:** `supply/site/donate.md` → `src/config/donate.ts` (via `npm run sync:content` when not TODO)

## Build

App and legal pages use the `apps` and `legal` content collections (`src/content.config.ts`). Run `npm run build` to verify.
