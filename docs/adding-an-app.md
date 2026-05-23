# Adding an app page

## Content workflow

1. Copy `supply/apps/_template/` to `supply/apps/<slug>/` and fill in `app.md`.
2. Add images under `supply/apps/<slug>/graphics/` (`logo-icon.png`, `hero-banner.png`).
3. Add legal Markdown under `supply/apps/<slug>/legal/`.
4. Register the app in `apps.inventory.json` for the home grid.
5. Add matching frontmatter in `src/content/apps/<slug>.md` (see `commander-vault.md` for shape).
6. Run **`npm run sync:content`** to copy legal pages from `supply/` and refresh site config when `supply/site/about.md` and `donate.md` are filled in.
7. Run **`npm run sync:assets`** to copy graphics from `supply/` into `public/` (nav icon, app icons, heroes).

## Assets

Source files live in `supply/`; **`npm run sync:assets`** writes deploy copies:

| Supply | Public |
|--------|--------|
| `supply/site/branding/tier-a-1-nav-icon.png` | `public/brand/studio-icon.png` |
| `supply/site/branding/avatar.{webp,png,jpg}` | `public/brand/avatar.<ext>` |
| `supply/apps/<slug>/graphics/logo-icon.png` | `public/apps/<slug>/icon.png` |
| `supply/apps/<slug>/graphics/hero-banner.png` | `public/apps/<slug>/hero.png` |

Reference paths in app frontmatter without a leading slash (e.g. `apps/commander-vault/icon.png`).

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
