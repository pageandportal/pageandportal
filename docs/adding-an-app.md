# Adding an app page

## Content workflow

1. Copy `supply/apps/_template/` to `supply/apps/<slug>/` and fill in `app.md`.
2. Add images under `supply/apps/<slug>/graphics/` (or `public/apps/<slug>/` for build).
3. Add legal Markdown under `supply/apps/<slug>/legal/`.
4. Register the app in `apps.inventory.json` for the home grid.
5. Add matching frontmatter in `src/content/apps/<slug>.md` (see `commander-vault.md` for shape).
6. Run **`npm run sync:content`** to copy legal pages from `supply/` and refresh site config when `supply/site/about.md` and `donate.md` are filled in.

## Assets

Place public assets under `public/apps/<slug>/` (e.g. `icon.png`, `hero.png`). Reference paths in frontmatter without a leading slash.

## Legal pages

1. Add Markdown under `supply/apps/<slug>/legal/` (e.g. `privacy.md`).
2. Run `npm run sync:content` — copies into `src/content/legal/<slug>/` with frontmatter (`app`, `title`).
3. List the page in the app’s `legalPages` frontmatter (`slug` must match the filename, e.g. `privacy`).

Routes: `/apps/<slug>/<legal-slug>/` (e.g. `/apps/portal-pages-times-tables/privacy`).

## Site-wide config

- **About blurb:** `supply/site/about.md` → `src/config/about.ts` (via `npm run sync:content` when not TODO)
- **Donate URL:** `supply/site/donate.md` → `src/config/donate.ts` (via `npm run sync:content` when not TODO)

## Build

App and legal pages use the `apps` and `legal` content collections (`src/content.config.ts`). Run `npm run build` to verify.
