# Versioning — Page and Portal Website

The public site version is stored in `version.properties` at the repo root.

## Format

```
version=MAJOR.MINOR.PATCH
```

Semantic intent:

- **MAJOR** — Breaking URL structure, major redesign, or removed app pages
- **MINOR** — New app page, new legal page, notable new sections
- **PATCH** — Copy tweaks, asset swaps, small CSS fixes

## When agents bump

- User-visible section ships (new app, roadmap refresh on site, new policy page)
- A release is prepared for smoke testing / GitHub Pages deploy
- Owner asks for a version tag on the live site

## Done row notation

In `PROJECT_PLAN.md` **Done** table, append: `→ v1.2.3`

## Not versioned here

Individual Android app version codes live in those app repos; this file is **website only**.
