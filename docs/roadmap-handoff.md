# Roadmap & app content — agent handoff

**Commander Vault owns the product roadmap.** The Page and Portal Website repo **publishes** it to the live site.

---

## Source of truth (Commander Vault repo)

| File | Role |
|------|------|
| **`E:/Projects - Apps/Commander_Vault/docs/public-roadmap.yaml`** | **Canonical** public roadmap — app badge, lanes, items, statuses, backlog cross-refs |
| `E:/Projects - Apps/Commander_Vault/docs/PROJECT_TODO.md` | Internal execution backlog (`A*` / `U*` tasks) |
| `E:/Projects - Apps/Commander_Vault/docs/roadmap-handoff.md` | Full ownership rules and maintenance workflow |

**Website agents:** Read Commander Vault `docs/public-roadmap.yaml` before editing Commander Vault roadmap content. Copy **user-centric headlines** verbatim — no task IDs or engineering detail on the site. See Commander Vault `docs/roadmap-handoff.md` § Editorial rules.

---

## What drives the live site?

The **live roadmap** is rendered from:

```
src/content/apps/commander-vault.md   ← YAML frontmatter (Astro renders this)
```

Publish from Commander Vault source:

```
E:/Projects - Apps/Commander_Vault/docs/public-roadmap.yaml
        ↓  (website agent copies roadmap + status)
src/content/apps/commander-vault.md
supply/apps/commander-vault/app.md    ← human-friendly tables (keep aligned)
apps.inventory.json                   ← home card badge when status changes
```

**Critical:** Roadmap changes start in **Commander Vault** `docs/public-roadmap.yaml`. This website repo applies them to frontmatter and supply sheets.

Only **legal pages** and some **site config** auto-sync from `supply/` via `npm run sync:content` — **roadmap is not synced by script**.

---

## Website publish checklist

When publishing Commander Vault roadmap updates:

1. Read **`E:/Projects - Apps/Commander_Vault/docs/public-roadmap.yaml`** and **`docs/roadmap-handoff.md`** (Commander Vault).
2. Update **`src/content/apps/commander-vault.md`** (`status`, `roadmap` frontmatter).
3. Update **`supply/apps/commander-vault/app.md`** roadmap tables to match.
4. If app badge changed, update **`apps.inventory.json`**.
5. Run **`npm run build`**.
6. Bump **`version.properties`** when shipping user-visible site changes.
7. Record in **`PROJECT_PLAN.md`** *Done* when substantial.

**Do not edit Commander Vault `docs/public-roadmap.yaml` from this repo** unless the owner explicitly assigns a cross-repo fix — note discrepancies for Commander Vault agents.

---

## Roadmap structure (site schema)

Defined in `src/content.config.ts`. Each app has **exactly three lanes**:

| Lane `id` | Typical use |
|-----------|-------------|
| `now` | Current release / beta work |
| `next` | Next version |
| `later` | Future / backlog |

Custom lane labels supported (e.g. `V1.0 closed beta`, `v1.2+ and iOS`).

**Commander Vault lane layout** (since 2026-10-30; see Commander Vault `docs/roadmap-handoff.md` § Lane layout):

| Lane `id` | Label | Contents |
|-----------|-------|----------|
| `now` | `Released` | Everything live for users (`shipped`), newest release first |
| `next` | Next release + status, e.g. `v1.3.0 — Coming soon` or `v2.0.0 — iOS Release` | Items for that release (`ready` / `in-progress`); empty when nothing is scheduled, so the lane hides |
| `later` | `Planned` | Accepted future work (`planned`), biggest headline first |

Each item: `title` (required), `description` (optional), `status` (`planned` | `in-progress` | `ready` | `shipped`). The site chip shows `shipped` as **Released**; keep `shipped` in the YAML.

Optional `release` (e.g. `v1.3`) on items: consecutive items with the same value are grouped under that label in the lane — use it in **Released**, newest release first, so the lane reads by store version. Groups are never split by "Show more"; lanes without `release` look as before. Copy the value into the site frontmatter as-is.

Lanes longer than 8 cards show the first 8 and collapse the rest behind a “Show N more” toggle (`src/components/Roadmap.astro`, all app pages). Keep source order — newest first in Released — so the most recent items stay visible.

App badge (`coming-soon` | `beta` | `live`) is separate from item statuses.

See Commander Vault `docs/public-roadmap.yaml` for current Commander Vault content and `backlogIds` mapping.

---

## File map (this repo)

| File | Role | Feeds live site? |
|------|------|------------------|
| `src/content/apps/commander-vault.md` | App page data (features, roadmap, status, links) | **Yes** |
| `supply/apps/commander-vault/app.md` | Planning copy mirror (not authoritative for roadmap) | No |
| `apps.inventory.json` | Home page app list | **Yes** (home grid) |
| `PROJECT_PLAN.md` | Website agent tasks, decisions, test checklist | No |

**Sync scripts (do not sync roadmap):**

- `npm run sync:content` — legal + about/donate only
- `npm run sync:assets` — graphics only

---

## Related docs

| Doc | Repo |
|-----|------|
| [`docs/public-roadmap.yaml`](../../Commander_Vault/docs/public-roadmap.yaml) | Commander Vault — **roadmap source** |
| [`docs/roadmap-handoff.md`](../../Commander_Vault/docs/roadmap-handoff.md) | Commander Vault — ownership + rules |
| [`docs/PROJECT_TODO.md`](../../Commander_Vault/docs/PROJECT_TODO.md) | Commander Vault — internal backlog |
| `PROJECT_PLAN.md` | This repo — website tasks |
| `docs/adding-an-app.md` | This repo — adding a new app |
| `src/content/apps/commander-vault.md` | This repo — live frontmatter |

---

## Insert Continue (different process, James 2026-11-02)

Insert Continue has no roadmap file in its own repo. Its agents may edit **only** the `roadmap:` block in `src/content/apps/insert-continue.md` (Insert Continue `AGENTS.md` § Page & Portal website), and **must not commit or push** — a push to `main` deploys the live site straight away.

1. Insert Continue agent edits the `roadmap:` block, leaves it uncommitted, and tells James what changed and why (plus any other page copy it thinks is now out of date).
2. Website agent reviews the diff, mirrors it into `supply/apps/insert-continue/app.md`, fixes knock-on copy (features, screenshot captions), builds, checks in the browser, bumps `version.properties`, records in `PROJECT_PLAN.md` and the Command Brief, commits, pushes, and watches the deploy.

**Insert Continue lane layout** (James, 2026-11-02 — reads like Commander Vault's: done, being worked on, later):

| Lane `id` | Label | Contents |
|-----------|-------|----------|
| `now` | `Ready for launch` | Built and finished in testing (`ready`) |
| `next` | `On the bench` | Launch work not finished yet: the game being built (`in-progress`), then the other launch games (`planned`), one card per game |
| `later` | `After launch` | After the Google Play launch (`planned`) |

Every card in a lane is at the same stage — move a card across when its status changes rather than mixing stages in one lane. The Google Play launch is the line between the first two lanes and the third, not a card. After launch, `now` becomes `Released` with `shipped` items, as on Commander Vault.

Copy rules for Insert Continue roadmap items come from Insert Continue `docs/website-page-brief.md`: no famous game, character or studio names; no game counts or prices; no ads SDK or analytics wording; say "in testing" for anything not yet released.

---

## Verification after publish

- [ ] Commander Vault `docs/public-roadmap.yaml` matches published frontmatter
- [ ] `npm run build` passes
- [ ] App page badge, lane labels, and item chips are correct
- [ ] Home app card status matches if changed
- [ ] `supply/apps/commander-vault/app.md` agrees with frontmatter
