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
