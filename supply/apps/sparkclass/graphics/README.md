# SparkClass graphics

| File | Role |
|------|------|
| `logo-wordmark.png` / `logo-icon.png` | Official wordmark (transparent) — SparkClass + bolt |
| `logo-wordmark-source.png` | Original white-background export |
| `hero-banner.png` | App page hero / OG preview |
| `bolt-reference.png` | Earlier bolt shape reference (superseded by wordmark) |

## Brand colours (page foundation)

| Role | Hex |
|------|-----|
| Primary blue (wordmark text / accents) | `#3465C1` |
| Primary yellow (bolt / secondary accent) | `#F7D024` |
| Bolt highlight (optional) | `#FDEE52` |
| Bolt shadow (optional) | `#D8AA0D` |

## Rebuild transparent wordmark

```bash
python supply/apps/sparkclass/graphics/process_wordmark.py
npm run sync:assets
```
