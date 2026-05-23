# Adding an app page

## Content

1. Copy `supply/apps/_template/` to `supply/apps/<slug>/` and fill in `app.md`.
2. Add a matching entry in `src/content/apps/<slug>.md` with the same frontmatter shape (see `commander-vault.md`).
3. Register the app in `apps.inventory.json` for the home grid.

## Assets

Place public assets under `public/apps/<slug>/` (e.g. `icon.png`, `hero.png`). Reference paths in frontmatter without a leading slash.

## Legal pages

1. Add Markdown under `supply/apps/<slug>/legal/` (e.g. `privacy.md`).
2. Copy into `src/content/legal/<slug>/` with frontmatter: `app: <slug>`, `title: Privacy Policy` (or matching title).
3. List the page in the app’s `legalPages` frontmatter (`slug` must match the filename, e.g. `privacy`).

Routes: `/apps/<slug>/<legal-slug>/` (e.g. `/apps/portal-pages-times-tables/privacy`).

## Build

App and legal pages use the `apps` and `legal` content collections (`src/content.config.ts`). Run `npm run build` to verify.
