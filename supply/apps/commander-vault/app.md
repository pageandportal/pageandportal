# App supply sheet — Commander Vault

**Pilot app** for the Page and Portal website build.  
**Migrated from:** https://sites.google.com/view/commander-vault/home (Google Sites — retiring)

---

## Identity

| Field | Value |
|-------|--------|
| **Display name** | Commander Vault |
| **Subtitle** | 32 Deck Challenge Companion |
| **URL slug** | commander-vault |
| **Tagline** | Track all 32 Commander color identities — one deck at a time. |
| **Status** | live (v1.0 on Google Play — public release) |
| **Short description** | Commander Vault helps you track your Magic: The Gathering 32 Deck Commander Challenge — one deck slot for every unique colour identity. **Available on Google Play.** Start free with 5 mono-colour slots, then unlock the full 32-slot challenge with a one-time purchase. |

---

## Links

| Label | URL |
|-------|-----|
| Google Play | https://play.google.com/store/apps/details?id=com.commandervault.app |
| App Store | Not announced |
| GitHub / source | TODO: or leave blank |
| Website / other | TODO: or leave blank |
| **Support email** | pageandportal@gmail.com |

---

## Donate

| Field | Value |
|-------|--------|
| **Use global donate link?** | TODO: yes \| no |
| **App-specific donate URL** | Not on legacy Google Site |

---

## Features

Derived from legacy site copy; expand or reword when you have screenshots.

### Feature 1 — 32 deck challenge grid

- **Title:** Every colour identity, one slot
- **Description:** Track the full 32 Deck Commander Challenge with a dedicated slot for each unique colour identity — commander name, bracket, build status, and notes per deck. Start free with five editable mono-colour slots; the remaining non-mono slots stay visible but locked until you unlock full access with a one-time purchase.
- **Image (optional):** TODO

### Feature 2 — Local-first privacy

- **Title:** Your decks stay on your device
- **Description:** Commander names, bracket, build status, notes, and saved card art URLs are stored locally (IndexedDB). No user accounts and no backend — your list is not uploaded to Page and Portal servers.
- **Image (optional):** TODO

### Feature 3 — Scryfall commander lookup

- **Title:** Search commanders with Scryfall
- **Description:** Commander search and autocomplete use the Scryfall API when you look up a card. Card artwork may load from Scryfall-hosted URLs after you select a commander.
- **Image (optional):** TODO

### Feature 4 — No ads, no analytics

- **Title:** No tracking SDKs
- **Description:** No analytics SDKs, no advertising identifiers, and no in-app email or account registration — a focused utility for personal deck tracking.
- **Image (optional):** TODO

---

## Roadmap

_Published from Commander Vault `docs/public-roadmap.yaml`. User-centric headlines only — see that repo’s `docs/roadmap-handoff.md`._

*Site lanes: **v1.1** = next release; **v1.2+** = later polish; **iOS and beyond** = App Store and long-term.*

### v1.1

| Feature | Status | Notes |
|---------|--------|--------|
| Better deck links | In progress | Paste-friendly Moxfield + more hosts; commander from linked list |
| Deck slot nicknames | In progress | Custom name on grid and share image |
| Smarter commander search | In progress | Colour-aware search and better art picking |
| Partner commanders | In progress | Partner / background commanders |
| Filter and sort your decks | In progress | Status filters, sorting, faster status updates |
| Share feedback from the project homepage | Shipped | `#feedback` section + mailto; app Support deep link |

### v1.2+

| Feature | Notes |
|---------|--------|
| Settings menu | App preferences and backup |
| Light and dark themes | Light, dark, or system |
| Richer progress shares | More detail on share images |
| EDHREC, budget, and play tracking | Links and optional tracking fields |

### iOS and beyond

| Feature | Notes |
|---------|--------|
| iPhone and iPad release | App Store + home-screen widget |
| iCloud backup | Optional synced backup |
| Alternative 32-deck challenges | House-rule / community presets |

**Shipped in v1.0 (live on Google Play):** 32-deck tracker, free mono tier + one-time unlock, Support screen with purchase/restore, backup export/import, progress share, Scryfall commander lookup.

---

## Graphics checklist

Assets in `graphics/` (owner-supplied 2026-05-23):

| File | Role | Verdict |
|------|------|---------|
| `logo-icon.png` | App icon, favicon source, home app card, nav | **Primary logo** — use everywhere a square mark is needed |
| `hero-banner.png` | App page hero / OG image | **Primary hero** — wide scene; title is baked in (see notes) |
| `logo-lockup.png` | Marketing lockup, optional home tile | **Secondary** — light background; needs dark-site treatment |

- [x] Logo / icon — `logo-icon.png`
- [x] Hero — `hero-banner.png`
- [ ] Feature screenshots — still need **in-app UI** shots (grid, deck slot, Scryfall picker)
- [ ] Favicon exports — generate 32×32 / 180×180 from `logo-icon.png` at build time

### Graphics notes (suitability)

- **logo-icon.png:** Best all-purpose asset. Circular vault + five color motifs reads at small sizes; matches Commander Vault brand; works on dark backgrounds.
- **hero-banner.png:** Strong app-page hero and social preview. Caveat: “COMMANDER VAULT” is in the image — page should still use a real `<h1>` for accessibility; avoid duplicating the same text immediately below. On narrow mobile, baked-in type may shrink — acceptable for v1.
- **logo-lockup.png:** Good for store listings or a light “about” panel. Off-white background clashes with dark-mode site unless placed in a card or re-exported on transparent/dark bg.
- **Not covered:** Feature section screenshots; roadmap visuals (optional). AI/fan-art style is fine with existing Wizards disclaimer.
- **Accent colors (from art):** gold `#C9A227` (approx), bronze frame, purple twilight `#4A3F6B`, Scryfall-blue accents from compass gem.

---

## Brand (optional)

| Field | Value |
|-------|--------|
| **Accent color** | `#C9A227` (gold), `#6B5B95` (twilight purple) — refine at build from `hero-banner.png` |
| **Fonts (from app)** | Cinzel and Inter (SIL Open Font License) — see `legal/credits.md` |
| **Notes for designer/agent** | Unofficial fan content; not affiliated with Wizards of the Coast. MTG / Commander aesthetic; dark-mode site should feel consistent. |

---

## Legal pages on site

| Page | Include? | File |
|------|----------|------|
| Privacy | yes | `legal/privacy.md` |
| Terms | yes | `legal/terms.md` |
| Credits / attributions | yes | `legal/credits.md` |

**Legacy URL mapping (for redirects or owner reference):**

| Legacy (Google Sites) | New (GitHub Pages, when live) |
|-----------------------|-------------------------------|
| `/home` | `/apps/commander-vault/` |
| `/home/privacy` | `/apps/commander-vault/privacy` |
| `/home/terms` | `/apps/commander-vault/terms` |
| `/home/credits` | `/apps/commander-vault/credits` |

---

## Footer / disclaimer (show on app page)

Unofficial fan content. Not affiliated with Wizards of the Coast.

---

## Notes for agents

- Support block: “Questions, Feedback and Support” → `pageandportal@gmail.com` (live on app page as **Questions and feedback** section with `#feedback` anchor)
- Scryfall API for commander autocomplete and artwork; no deck uploads to app servers
- When building Astro routes, include privacy, terms, and credits pages for this app
