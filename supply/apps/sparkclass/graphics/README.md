# SparkClass graphics (website supply)

Website deploy copies. **App agents:** use the SparkClass repo handoff instead —

**`E:/App Projects/SparkClass/docs/branding/`** (see that folder’s `README.md`).

| File | Role |
|------|------|
| `logo-wordmark.png` / `logo-icon.png` | Official wordmark on **white** tile |
| `logo-wordmark-transparent.png` | Transparent cutout |
| `logo-wordmark-source.png` | Original export |
| `hero-banner.png` | App page hero / OG preview |

## Brand colours

| Role | Hex |
|------|-----|
| Primary blue | `#3465C1` |
| Primary yellow | `#F7D024` |
| Bolt highlight (optional) | `#FDEE52` |
| Bolt shadow (optional) | `#D8AA0D` |

## Rebuild white tile from source

```bash
python supply/apps/sparkclass/graphics/process_wordmark.py
npm run sync:assets
```

Then re-copy updated files into SparkClass `docs/branding/` if the app should stay in sync.
