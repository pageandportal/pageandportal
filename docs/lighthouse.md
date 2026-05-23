# Lighthouse & accessibility checks

Run locally against the live site (Chrome required):

```bash
npx lighthouse https://pageandportal.github.io/pageandportal/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --view
```

Repeat on one app page, e.g. `/apps/commander-vault/`.

## What we optimize for

| Area | Practices in this repo |
|------|-------------------------|
| **Accessibility** | Skip link, landmarks, focus styles, semantic lists, `lang`, alt text, reduced motion |
| **SEO** | Title, description, canonical, Open Graph / Twitter meta |
| **Performance** | Font preload + fewer weights, `fetchpriority` on app hero (LCP), lazy images |
| **Best practices** | HTTPS via GitHub Pages, no mixed content |

Scores vary by network; large hero PNGs are the main limit on Performance until images are compressed or WebP is added.

## Baseline (2026-05-23, live site, v0.5.3)

| Page | Performance | Accessibility | Best practices | SEO |
|------|-------------|---------------|----------------|-----|
| Home | 95 | 100 | 100 | 100 |
| Commander Vault | 94 | 100 | 100 | 100 |
| Portal Pages Times Tables | 88 | 100 | 100 | 100 |

Earlier pre-polish run: home Performance ~86, app page ~79 (same 100s elsewhere).

Run all three when re-checking:

```bash
npx lighthouse https://pageandportal.github.io/pageandportal/ --view
npx lighthouse https://pageandportal.github.io/pageandportal/apps/commander-vault/ --view
npx lighthouse https://pageandportal.github.io/pageandportal/apps/portal-pages-times-tables/ --view
```
