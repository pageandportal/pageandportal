# Adding an app page

## Content

1. Copy `supply/apps/_template/` to `supply/apps/<slug>/` and fill in `app.md`.
2. Add a matching entry in `src/content/apps/<slug>.md` with the same frontmatter shape (see `commander-vault.md`).
3. Register the app in `apps.inventory.json` for the home grid.

## Assets

Place public assets under `public/apps/<slug>/` (e.g. `icon.png`, `hero.png`). Reference paths in frontmatter without a leading slash.

## Build

App pages are generated from the `apps` content collection (`src/content.config.ts`). Run `npm run build` to verify.
