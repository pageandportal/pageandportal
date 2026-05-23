# Website analytics (Plausible)

The site uses [Plausible](https://plausible.io/) — lightweight, cookie-free pageview stats. It does **not** use the same SDKs as the mobile apps; this is **website-only**.

## One-time setup (owner)

1. Create a free or paid account at [plausible.io](https://plausible.io/).
2. **Add a site** with domain: `pageandportal.github.io`  
   (Plausible tracks all paths on that host, including `/pageandportal/`.)
3. No dashboard changes needed beyond that — the script is already in the site build.

## How it is enabled in this repo

| Where | Value |
|-------|--------|
| Build env | `PUBLIC_PLAUSIBLE_DOMAIN=pageandportal.github.io` |
| CI | Set in `.github/workflows/deploy.yml` on the build step |
| Local | Copy `.env.example` → `.env` (optional; disabled in `npm run dev`) |

## Privacy note

Consider a short line on the site (e.g. footer or a future site privacy page) that the **website** uses privacy-friendly analytics. App privacy policies describe the apps only.

## Alternatives

To switch provider later, edit `src/components/Analytics.astro` and `src/config/analytics.ts`.
