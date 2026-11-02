# Page and Portal — Developer Website

**Brand:** Page and Portal  
**Purpose:** Clean, modern developer hub with a dedicated page per app  
**Hosting:** GitHub Pages (static site)  
**Repository:** [github.com/pageandportal/pageandportal](https://github.com/pageandportal/pageandportal)  
**Last updated:** 2026-07-26

---

## Repository & GitHub Pages

| Field | Value |
|-------|--------|
| **GitHub org** | `pageandportal` |
| **Repository** | `pageandportal` |
| **Repo URL** | https://github.com/pageandportal/pageandportal |
| **Pages type** | Project site |
| **Live URL (after deploy)** | https://pageandportal.github.io/pageandportal/ |
| **Astro `site`** | `https://pageandportal.github.io` |
| **Astro `base`** | `/pageandportal/` |

Machine-readable copy: [`site.properties`](site.properties). Agents must use these values in `astro.config.mjs` and GitHub Actions deploy.

**Git:** Owner delegates all Git work to agents. See `.cursor/rules/git.mdc`. Remote: `https://github.com/pageandportal/pageandportal.git`, branch `main`.

App list: [`apps.inventory.json`](apps.inventory.json) and `supply/apps/<slug>/`.

---

## App inventory

| Display name | URL slug | Tagline | Status | Supply folder |
|--------------|----------|---------|--------|---------------|
| Commander Vault | `commander-vault` | Track all 32 Commander color identities — one deck at a time. | live (Google Play) | [`supply/apps/commander-vault/`](supply/apps/commander-vault/) |
| SparkClass | `sparkclass` | Class-centred practice for NZ electrical learners — from pre-trade through apprenticeship. | coming soon (hidden from home) | [`supply/apps/sparkclass/`](supply/apps/sparkclass/) |
| Portal Pages Times Tables | `portal-pages-times-tables` | Learn and practise times tables 2–12 — calm, offline, and free. | coming soon | [`supply/apps/portal-pages-times-tables/`](supply/apps/portal-pages-times-tables/) |
| Insert Continue | `insert-continue` | Retro gaming in your pocket, no coins required. Original arcade mini games. | coming soon | [`supply/apps/insert-continue/`](supply/apps/insert-continue/) |

**Pilot app:** **Commander Vault** — content migrated from [Google Sites](https://sites.google.com/view/commander-vault/home) into `supply/apps/commander-vault/` (2026-05-23). V1.0 is **live on Google Play**; donate link still pending.

**SparkClass:** NZ electrical learning web app (Next.js + Supabase) for pre-trade and apprenticeship programmes. Site section added 2026-07-24. **Hidden from the home grid since 2026-10-31** (page still at `/apps/sparkclass/`). **Do not publish the live app URL** until the owner says it is ready for visitors. Product name still interim (`U20` in SparkClass plan); privacy/consent copy needs owner review.

**Site routes:**

- `/apps/commander-vault/`
- `/apps/sparkclass/`
- `/apps/portal-pages-times-tables/`
- `/apps/insert-continue/`

**Insert Continue:** pocket arcade of original mini games (Godot, Android first). Page added 2026-10-31 from the app repo’s `docs/website-page-brief.md` — copy is locked there. No store links, privacy page, or screenshots until the brief’s later pass.

---

## Vision

A dark-mode-first, minimal developer site that introduces **Page and Portal**, routes visitors to each app, and on every app page showcases **features**, a **visual roadmap** of upcoming work, a short **about-the-developer** blurb, and a clear **donate** call-to-action. Legal content (privacy policies, etc.) lives on linked subpages where you already have copy.

---

## Recommended technical approach

| Choice | Recommendation | Why |
|--------|----------------|-----|
| **Stack** | [Astro](https://astro.build) 5.x, static output | Fast static HTML, Markdown for policies, reusable layouts per app, easy GitHub Actions deploy |
| **Styling** | CSS custom properties + one global theme | No runtime theme flash; graphics drive accent colors per app |
| **Content** | `src/content/apps/*.md` + `src/content/legal/*.md` | You edit copy without touching layout code |
| **Deploy** | GitHub Actions → `gh-pages` branch (or `docs/`) | Works for project sites (`username.github.io/repo-name`) and user/org sites |
| **Fallback** | Plain HTML/CSS if you prefer zero build | Possible, but worse for many apps + Markdown legal pages |

### GitHub Pages (confirmed)

This repo is a **project site** under the `pageandportal` org:

- **Published URL:** https://pageandportal.github.io/pageandportal/
- **`astro.config.mjs`:** `site: 'https://pageandportal.github.io'`, `base: '/pageandportal/'`

Enable Pages in the repo: **Settings → Pages → Source:** GitHub Actions (after Phase 0 adds the deploy workflow) or deploy branch as documented in the workflow.

---

## Information architecture

```
/                          Home — Page and Portal brand, app cards, global donate
/about                     Optional full “who I am” (can mirror blurb on app pages)
/apps/<app-slug>/          Per-app landing (template below)
/apps/<app-slug>/privacy   Privacy policy (Markdown → HTML)
/apps/<app-slug>/…         Other legal pages as needed (terms, etc.)
/donate                    Optional on-site donate explainer; button still links out
```

### Per-app page template (every app)

1. **Hero** — App name, one-line pitch, key art (your graphic or placeholder)
2. **Features** — 3–8 items: icon or screenshot, title, short description
3. **Roadmap** — Visual timeline / status lanes: *Now · Next · Later* (or quarters)
4. **About the developer** — On the home page (`/#about`); app pages link back via studio credit in the footer
5. **Donate** — Prominent button → external donation URL (Ko-fi, PayPal, GitHub Sponsors, etc.)
6. **Footer** — Links to privacy/legal, store listing (if any), back to home

### Home page

- Page and Portal logo/wordmark
- Short studio tagline
- Grid of app cards (art, name, one line, link)
- About the developer (`#about`)

---

## Visual & UX direction

- **Default:** Dark background (`#0d0f12` range), high-contrast text, restrained accent from each app’s artwork
- **Typography:** One readable sans (e.g. system stack or [Inter](https://rsms.me/inter/)) + optional display face for headings if assets suggest it
- **Layout:** Generous whitespace, max-width ~1100px, mobile-first
- **Roadmap:** Horizontal scroll on mobile; cards or nodes with status chips (`Planned`, `In progress`, `Ready`, `Released` — data value `shipped`). **Features only** — no user/internal tasks or "not planned" lanes; see `.cursor/rules/app-roadmaps.mdc`
- **Accessibility:** Semantic landmarks, focus states, `prefers-reduced-motion`, alt text on all supplied images
- **Apps without graphics:** Neutral gradient placeholder + monogram until assets arrive

---

## Build phases (agent work)

| Phase | Scope | Depends on |
|-------|--------|------------|
| **0 — Bootstrap** | Astro, theme tokens, layout shell, GitHub Actions, `version.properties` | `site.properties` (confirmed) |
| **1 — Home** | Branding, app grid (placeholder apps OK) | App list, any global logo |
| **2 — App template** | Reusable `AppPage.astro` + content schema | One app’s copy as pilot |
| **3 — Content ingest** | All apps + legal Markdown | Your tasks below |
| **4 — Asset pass** | Wire graphics, favicon, OG images | Asset pack per app |
| **5 — Polish** | Animations, SEO, 404, lighthouse pass | Your review |
| **6 — Launch** | Enable Pages, custom domain (optional), smoke test | Domain DNS if used |

---

## Repository layout (target)

```
/
├── PROJECT_PLAN.md          ← This file (tasks, rules, checklist)
├── VERSIONING.md
├── version.properties
├── .cursor/rules/
│   ├── agent-workflow.mdc
│   └── versioning.mdc
├── .github/workflows/deploy.yml
├── public/                  Static assets (favicon, robots.txt)
├── src/
│   ├── assets/              Per-app images you supply
│   ├── components/          Feature grid, Roadmap, DonateButton, AboutBlurb
│   ├── content/
│   │   ├── apps/            One .md per app (frontmatter + body)
│   │   └── legal/
│   ├── layouts/
│   └── pages/
└── docs/                    Owner reference (not deployed): adding-an-app, app-ideas
```

---

## Agent update rules

**Agents:** Read this file at the start of any substantial work. Task state lives here — not only in Cursor’s in-chat todo tool.

### Workflow

| When | Action |
|------|--------|
| **Start of substantial work** | Read `PROJECT_PLAN.md`. Pick the next item from **Cursor agent tasks → In progress (agents)**, or promote/create one as needed. |
| **When starting** | Move the item to **In progress (agents)**. |
| **When finishing** | Move to **Done** with date `YYYY-MM-DD` and a short note. |
| **New agent work** | Add under **Cursor agent tasks**; do not rely only on in-chat todo tools. |
| **Owner completes something** | Move from **Your tasks** to **Done** (agents may do this when the owner confirms). |
| **Polish / post-launch ideas** | Keep in **Polish backlog** until the owner promotes an item into **Cursor agent tasks** or **Your tasks**. |
| **Do not remove history** | Keep **Done** entries (newest first). |

### To Test Checklist

Keep **To Test Checklist** in sync with the site (below). Same file, same maintenance discipline as tasks and backlog.

### Versioning (agents)

Agents own bumps in `version.properties` when user-visible work ships or a Play build is prepared. See `.cursor/rules/versioning.mdc` and `VERSIONING.md`. Note `→ vX.Y.Z` in **Done** rows.

---

## Your tasks

*Things only you can supply. Check off here; tell the agent when an item is ready.*

### Required before first real app page

- [x] **GitHub setup** — [pageandportal/pageandportal](https://github.com/pageandportal/pageandportal); project site → https://pageandportal.github.io/pageandportal/
- [x] **App inventory** — Commander Vault (closed beta V1.0), Portal Pages Times Tables (coming soon); see **App inventory** above
- [x] **Pilot app pack** — Commander Vault features, graphics, legal, and `V1.0 closed beta` roadmap synced from `supply/`; public Google Play listing URL and donate still pending
- [x] **Roadmap ownership** — Commander Vault `docs/public-roadmap.yaml` is source of truth (2026-05-30); website publishes via `docs/roadmap-handoff.md`
- [x] **Developer blurb** — James; Nelson region; Page & Portal copy in `supply/site/about.md` (2026-05-23)
- [ ] **Donation** — URL for donate button(s): one global link or per-app links *(UI hidden via `DONATE.enabled` until ready)*
- [x] **Privacy (and other legal)** — Commander Vault: privacy, terms, credits in `supply/apps/commander-vault/legal/`; Times Tables privacy in `supply/apps/portal-pages-times-tables/legal/privacy.md` (+ `docs/Portal-Pages-Times-Tables-PRIVACY_POLICY.md`; republished from app-repo canonical 2026-07-26)

### Post-launch (owner)

*(none)*

### Per app (repeat for each)

**Commander Vault** (`supply/apps/commander-vault/`)

- [x] **Features** — 4 items from legacy site (in `app.md`)
- [x] **Roadmap** — Released / v2.0.0 — iOS Release / Planned lanes in `app.md`, published from CV `public-roadmap.yaml` (updated 2026-10-31)
- [x] **Monetization architecture** — Start free with 5 editable mono-colour slots; non-mono slots remain visible but locked; a one-time purchase unlocks the full 32-slot challenge; shared progress pages keep a watermark until unlock (2026-05-25)
- [x] **Links** — support email live; site shows `Coming soon to Google Play` until the public listing goes live
- [x] **Graphics** — `logo-icon.png`, `hero-banner.png`; feature screenshots + Play assets when store listing ships
- [x] **Brand hints** — Cinzel/Inter, gold/purple accents, fan content disclaimer (see `app.md`, `legal/credits.md`)

**Portal Pages Times Tables** (`supply/apps/portal-pages-times-tables/`)

- [x] **Features** — 7 items in `app.md`
- [x] **Roadmap** — Release 2–4+ plan in `app.md` (2026-05-23)
- [x] **Links** — support email; store URLs when listings go live (with feature screenshots)
- [x] **Graphics** — `logo-icon.png`, `hero-banner.png`; feature screenshots + Play assets when store listing ships
- [x] **Brand hints** — orange/green accents (see `app.md`, `graphics/README.md`)

**SparkClass** (`supply/apps/sparkclass/`)

- [ ] **Final product name** — still interim `SparkClass` (shortlist in SparkClass `notes/product-plan.md` / `U20`)
- [ ] **Privacy / terms owner review** — drafts in `legal/`; confirm under-18 consent, retention, and third-party wording
- [ ] **Graphics** — official wordmark (transparent) live; optional: replace workshop hero, product screenshots; page accents `#3465C1` / `#F7D024`
- [ ] **Custom domain** — when a public hostname is ready, update site Open CTA + Auth URLs
- [ ] **Public roadmap source** — optional `public-roadmap.yaml` in SparkClass (like Commander Vault) for ongoing sync
- [x] **Features / roadmap / links** — drafted from SparkClass product plan (2026-07-24); **app URL withheld** from public site until ready
- [ ] **Public app URL** — add Open CTA only when owner confirms visitors may use the hosted app
- [x] **Support email** — `pageandportal@gmail.com` (same studio address unless owner specifies otherwise)

**Insert Continue** (`supply/apps/insert-continue/`)

- [x] **Features / roadmap / intro** — locked copy from Insert Continue `docs/website-page-brief.md` (2026-10-31)
- [x] **Graphics** — code-drawn green CRT icon + hero (`render-graphics.py`); real screenshots when a release build exists
- [ ] **Privacy policy** — required before any Play submission; host at `src/content/legal/insert-continue/privacy.md` once shipping SDKs are confirmed
- [ ] **Google Play link** — add the store button only when a real listing URL exists

### Site-wide optional (recommended)

- [x] **Global logo** — Tier A set in `supply/site/branding/` (`tier-a-1` nav icon, `tier-a-2` header, `tier-a-3` optional hero); see `TIER-A.md`
- [x] **Avatar** — `supply/site/branding/avatar.png` (2026-05-23)
- [x] **Social links** — none (owner decision 2026-05-23; recorded in `supply/site/about.md`)
- [x] **SEO** — default site title/description in `src/config/site.ts`; per-app meta from taglines
- [x] **Custom domain** — not planned (stay on `pageandportal.github.io/pageandportal/`)
- [x] **Analytics** — Google Analytics 4 on the website (`G-48L1CF97DY`), loaded in production only and disabled in local dev
- [x] **404 copy** — custom page at `/404.html`; `<base>` fix for nested bad URLs on GitHub Pages

### Delivery format (helps agents)

Put assets in a folder you can drop into the repo, e.g.:

```
supply/
  README.md              ← your notes
  apps/
    my-app-slug/
      app.yaml or app.md ← features + roadmap as structured text
      graphics/
      legal/
        privacy.md
```

Plain text, YAML, or Markdown is ideal. Word docs are fine if you paste content into chat or convert to `.md`.

---

## Cursor agent tasks

### In progress (agents)

*(none)*

### Backlog (agents)

1. **Phase 1 — Home** — Optional tier-a-3 hero; donate when owner supplies URL
5. **Phase 4 — Asset polish** — Feature screenshots + Play graphics when store listings ship

### Done (agents)

*(newest first)*

| Date | Task | Note |
|------|------|------|
| 2026-11-03 | Insert Continue: Lane Hopper screenshot | Added the IC agent's Lane Hopper capture (level 3 Classic, rabbit on the river crates, two trains) as `09-lane-hopper.png`, re-saved as a 256-colour PNG (166 KB → 71 KB, no visible change). Six upright shots now share one row on a PC (170px each, edges level with the landscape row); alt text and caption from the IC agent, within the copy rules. Spare `lane_hopper_alt.png` not used → v0.12.18 |
| 2026-11-03 | Insert Continue roadmap: Formation Fire and Lane Hopper ready | Published the IC agent's uncommitted roadmap edit (roadmap block only, per process): Formation Fire and Lane Hopper move to Ready for launch as the fourth and fifth finished games; On the bench now holds Shattered Earth alone. Website follow-ups the IC agent flagged: the In the cabinet card now mentions Lane Hopper's railway and marsh; the Formation Fire caption no longer says it is still being built. Supply sheet mirrored. No Lane Hopper screenshot yet → v0.12.17 |
| 2026-11-02 | Insert Continue screenshots: two compact rows | Owner didn't like the two-block layout on PC (~1,650px tall, Paddle & Pixel over-represented). Now one row of five upright shots (hub, Paddle & Pixel pre-match, Neon Snake, Brick Buster, Formation Fire) above a row of the three Paddle & Pixel landscape shots; ~840px tall; "More games in testing" heading dropped; pre-match caption names Paddle & Pixel. Gallery rule: mixed sets that don't suit the side-by-side layout now split into a portrait row and a landscape row (up to three across). Commander Vault unchanged (measured) → v0.12.16 |
| 2026-11-02 | Insert Continue: more games in the screenshots | Owner-supplied shots of Neon Snake, Brick Buster and Formation Fire (an early look, still being built) added as a second row, **More games in testing**, under the Paddle & Pixel set. Screenshots accept an optional `group` label: consecutive shots with the same label get their own row and layout; portrait-only rows cap shots at 20rem so they match the shots above; three stay in one row on phones. Viewer steps through all eight. Commander Vault gallery unchanged (checked). Hub shot to be replaced by the owner once all six games are in → v0.12.15 |
| 2026-11-02 | Insert Continue roadmap: Brick Buster ready, Formation Fire in progress | Published the Insert Continue agent's uncommitted roadmap edit: Brick Buster moved to **Ready for launch** (third game, endless mode); Formation Fire now in progress at the top of **On the bench**; high-score tables now "working in every finished game". Supply sheet mirrored → v0.12.14 |
| 2026-11-02 | Insert Continue roadmap: Neon Snake ready, Brick Buster in progress | Published the Insert Continue agent's uncommitted roadmap edit (first one through the new process): Neon Snake moved to **Ready for launch**; Brick Buster now in progress at the top of **On the bench** (playable in testing, adds an endless mode); high-score tables now name Brick Buster. Supply sheet mirrored; other page copy still accurate → v0.12.13 |
| 2026-11-02 | Insert Continue roadmap relaid like Commander Vault's | Owner approved: lanes now read done → being worked on → later. **Ready for launch** (cabinet interface, high-score tables, Paddle & Pixel), **On the bench** (Neon Snake in progress; Brick Buster, Formation Fire, Lane Hopper, Shattered Earth planned, one card each, descriptions from the features card), **After launch** (unchanged four). Dropped the "Google Play release" and "Full launch line-up" cards — the launch is now the line between lanes. Supply sheet and handoff doc match → v0.12.12 |
| 2026-11-02 | Insert Continue roadmap follow-up | The Insert Continue agent committed and pushed its roadmap edit directly (v0.12.10); checked live on desktop and phone (renders correctly, lanes level). Hub screenshot caption no longer says the other games are all on the bench (Neon Snake is now playable in testing). New **Insert Continue** section in docs/roadmap-handoff.md: IC agents edit only the oadmap: block, never commit or push; website agent publishes → v0.12.11 |
| 2026-11-02 | Insert Continue roadmap update | Owner request (via the Insert Continue agent): cabinet interface, Paddle & Pixel and local high-score tables now **ready** (built, working in testing); **Neon Snake** added as in progress (playable on a phone in testing); Google Play line-up now names the remaining four games. Frontmatter and supply sheet match. Screenshots still show Neon Snake as Soon on the hub — refresh when new shots are wanted → v0.12.10 |
| 2026-11-01 | Roadmap lanes line up under release headings | Owner request: when a lane starts with a release heading (Commander Vault **v1.3**), the other lanes get an invisible spacer of the same height so all first cards start level (measured equal on desktop). Pages without release headings unchanged → v0.12.9 |
| 2026-11-01 | No chips in all-released lanes | Owner request: a lane where every item is `shipped` (Commander Vault **Released**) no longer repeats a **Released** chip on each card; mixed lanes (SparkClass **Classroom readiness**) keep their chips → v0.12.8 |
| 2026-11-01 | Roadmap chip Published → Released | Owner request: `shipped` items now show a **Released** chip on all app pages (Commander Vault; SparkClass by direct link). YAML still uses `shipped`; rule and handoff doc updated → v0.12.7 |
| 2026-11-01 | Insert Continue review fixes + lighter site logo | From Grok's IC page review (owner-approved items): site header logo now an 80px WebP centre crop (`studio-icon.webp`, 1.5 KB, was the 108 KB original) and the browser-tab icon a 64px `favicon.png`; the full image stays as the link-preview fallback. IC: "Local high-score tables" moved to **On the bench** as in progress (working in Paddle & Pixel in testing); "Nothing is uploaded" → "Your scores are never uploaded". Supply `app.md` kept in step. Privacy page still waits on confirmed SDKs per the IC brief → v0.12.6 |
| 2026-11-01 | Commander Vault roadmap grouped by release | Re-published CV `public-roadmap.yaml` (main 3b8ecb5): only change is `release` on all 14 Released items; site frontmatter verified field-for-field (0 mismatches). Released lane now shows **v1.3** (4), **v1.2** (1), then **v1.1** (9) behind "Show 9 more" → v0.12.5 |
| 2026-11-01 | Commander Vault legal wording + roadmap release groups (Grok review, owner decisions) | Credits: dropped "permitted under the Fan Content Policy" (kept unofficial / not endorsed / © Wizards; footer policy link kept). Privacy: Scryfall may log search requests; View on EDHREC opens edhrec.com with the commander's name; Android asks Google Play about updates. iCloud backup labelled "coming with the iOS app" in Features, Privacy, Terms (src + supply). Roadmap items accept optional `release` — Released lane groups by store version, newest first; needs `release` values in CV `public-roadmap.yaml` (not there yet, so the live lane is unchanged). Owner declined the v1.3 line; support page not created (homepage is the Support URL) → v0.12.4 |
| 2026-11-01 | Lighter app icons + "colour" tagline (Grok review) | `sync:assets` now writes `icon.webp` (square 192px, wordmark 840px wide) instead of copying the 1024px PNG: Commander Vault icon 217 KB → 9 KB, Times Tables 121 KB → 3 KB. `sharp` added as a dev dependency. Commander Vault tagline "color" → "colour" (page, home grid inventory, supply app.md) → v0.12.3 |
| 2026-11-01 | Screenshot viewer + phone roadmap overflow fix | Clicking any screenshot opens a full-screen viewer (caption, "2 of 6" count, previous/next buttons, arrow keys, swipe, Escape or click outside to close; focus returns to the thumbnail). Without JavaScript each thumbnail still links to its image. Also fixed a pre-existing phone bug on every app page with a scrolling roadmap: hidden "Status:" labels escaped the lane scroller and made the page about 800px wide → v0.12.2 |
| 2026-11-01 | Commander Vault screenshots — share image removed | Owner didn't like the landscape share image: removed from page, supply and public. Portrait-only galleries now fill every row: six in one row on wide screens (≥1024px), two rows of three on mid widths, pairs on phones. Other app pages unchanged apart from the stylesheet file name → v0.12.1 |
| 2026-11-01 | Commander Vault screenshots | Seven web-ready shots from CV `resources/website-screenshots/web/` (unedited; six dark-theme portraits + landscape share image) in `supply/.../graphics/screenshots/`, synced to `public/`. Screenshots section with the CV agent's note, captions and alt text (checked against the images). Desktop: row of four portraits, then two portraits beside the share image spanning two columns; phone: pairs, share image full width. Built-page diff: only the CV page changed, only by the new section. Graphics README + supply checklist updated → v0.12.0 |
| 2026-11-01 | Insert Continue screenshots | Owner-supplied in-development shots (`E:\Tools\Godot\builds\web-shots\`), half-size web copies in `supply/.../graphics/screenshots/`. New optional `screenshots` / `screenshotsNote` frontmatter + `Screenshots.astro` section between Features and Roadmap: desktop shows the two phone shots side by side with the three landscape shots stacked beside them; phones show the pair then full-width landscapes. Captions follow the play flow; note says “in-development build”. Brief had said wait for a release build — owner overrode → v0.11.0 |
| 2026-11-01 | Commander Vault terms + feature cards match privacy | Terms (src + supply): Last updated November 2026; purchases via Google Play and Apple's App Store; “Your content” mentions optional iCloud backup. Feature cards: “Your decks stay on your device” adds optional iCloud backup; Scryfall card uses the new “send what you type” wording (owner request) → v0.10.2 |
| 2026-11-01 | Commander Vault roadmap + privacy (Nov 2026) | Re-published CV `public-roadmap.yaml` (main, 2026-11-01; verified field-for-field): centre card now **iPhone release**, new Planned card **iPad layout** (Planned 5). Privacy policy (src + supply copy): Last updated November 2026; optional iCloud backup on iPhone/iPad; Scryfall wording; deck-link reads from Archidekt/ManaBox/Moxfield; purchases via Google Play and Apple's App Store, purchase status only for unlock/restore, unlock never in backups. Terms still name Google Play only — flagged to owner → v0.10.1 |
| 2026-10-31 | Grok review fixes | 1200×630 share cards for every app (`shareImage`; `scripts/make-share-card.py`; IC card drawn in its render script) and large link previews on app pages (home keeps the small square card); `/apps/` redirects to `#apps`; generated `/sitemap.xml` (listed apps + legal; no `/r/`, no hidden apps); IC title “Insert Continue — Retro Arcade Mini Games” (`pageTitle`); SparkClass hero 1.8 MB PNG → 159 KB JPEG web copy (original kept in supply); SparkClass hidden from home grid (`"hidden": true`), page still live by direct link → v0.10.0 |
| 2026-10-31 | Insert Continue roadmap wording | Tiles reworded for a more professional tone (owner request); lane labels kept; IC repo brief still has original wording → v0.9.1 |
| 2026-10-31 | Insert Continue app page | New coming-soon page + home card from Insert Continue `docs/website-page-brief.md`: locked intro, six features, three-lane roadmap; green CRT icon and hero drawn with Pillow (Press Start 2P baked in); no store link, banner, legal, or donate → v0.9.0 |
| 2026-10-31 | Commander Vault roadmap + collapsible lanes | Published CV `public-roadmap.yaml` (2026-10-31): v1.3 items top of Released (14), `v2.0.0 — iOS Release` lane (iPhone and iPad in progress, iCloud planned), Planned 4. Roadmap lanes over 8 cards collapse behind native `<details>` “Show N more” / “Show fewer” on all app pages; card markup moved to `RoadmapCard.astro` → v0.8.0 |
| 2026-10-30 | Commander Vault iOS coming-soon banner | Optional `announcement` frontmatter field; shimmering pill under the store button (“iOS version coming soon”); animation off for reduced motion → v0.7.10 |
| 2026-10-30 | Commander Vault “Coming soon” lane | Middle lane label `v1.3.0 — Coming soon` (owner request; CV source YAML still says `v1.3.0` — flagged) → v0.7.9 |
| 2026-10-30 | Roadmap chip “Published” | `shipped` status chip now reads **Published** on all app pages (Commander Vault, SparkClass); data value unchanged; roadmap rule allows release-version lane labels → v0.7.8 |
| 2026-10-30 | Commander Vault roadmap — Released / v1.3.0 / Planned | Published three-column layout from CV `public-roadmap.yaml`: 10 released (EDHREC from v1.2 first), 4 v1.3.0 **ready**, 6 planned; fixed CV paths in `docs/roadmap-handoff.md` → v0.7.7 |
| 2026-07-26 | Times Tables roadmap trim | Dropped Play/internal “before release” items and Not planned lane; hide empty roadmap lanes → v0.7.6 |
| 2026-07-26 | Y-014 Times Tables page + privacy | Rewrote features/roadmap from app-repo handoff; republished canonical privacy (26 July 2026) → v0.7.5 |
| 2026-07-25 | GA4 page title (not set) fix | Move `<title>` before gtag; send explicit `page_title` in config so page_view cannot race empty document.title → v0.7.4 |
| 2026-07-24 | SparkClass drop Kahoot wording | Live quiz sessions only — avoid third-party brand risk → v0.7.3 |
| 2026-07-24 | SparkClass wordmark on white | Logo tile matches other app marks; rounded white plate → v0.7.2 |
| 2026-07-24 | SparkClass status and scope copy | Home/app: coming soon; pre-trade → apprenticeship wording → v0.7.1 |
| 2026-07-24 | SparkClass app section | Home card, `/apps/sparkclass/`, privacy/terms drafts, web Open CTA, interim brand art from product teal → v0.7.0 |
| 2026-07-22 | Commander Vault v1.1 shipped on site | All v1.1 roadmap items **shipped** after Play publish → v0.6.6 |
| 2026-07-22 | Commander Vault v1.1 rollout roadmap | Synced from CV `public-roadmap.yaml`: v1.1 items **ready**/shipped for Play rollout; stale reminders + in-app updates added → v0.6.5 |
| 2026-06-15 | Commander Vault v1.1 roadmap sync | Full v1.1 copy from CV `public-roadmap.yaml`; all v1.1 **in progress** on site except **U22** shipped; added suggest-slot headline → v0.6.4 |
| 2026-06-15 | Commander Vault homepage feedback (U22) | `AppFeedbackSection` with `#feedback` + mailto; roadmap item shipped |
| 2026-06-15 | Commander Vault v1.1 roadmap publish | Published live status + v1.1 in-progress lanes from CV `public-roadmap.yaml` → v0.6.3 |
| 2026-05-31 | Commander Vault v1.1 deck links copy | Published auto-fill commander from linked deck list on Better deck links → v0.6.2 |
| 2026-05-30 | Commander Vault roadmap publish | Published refined user-centric roadmap from CV `public-roadmap.yaml`; V1.0 ready items + v1.1 deck links/nicknames → v0.6.1 |
| 2026-05-30 | Roadmap ownership → Commander Vault | `docs/public-roadmap.yaml` in Commander Vault repo is canonical; website publishes from handoff doc → v0.6.0 build 1 |
| 2026-05-30 | Roadmap agent handoff doc | Added `docs/roadmap-handoff.md` for app content and roadmap update workflow → v0.6.0 build 1 |
| 2026-05-30 | Commander Vault signed build prep | Website release `v0.6.0` build `1` for V1.0 closed beta signed build → v0.6.0 build 1 |
| 2026-05-30 | Commander Vault V1.0 closed beta | App status `beta`; roadmap lane `V1.0 closed beta` with in-progress V1.0 items → v0.5.13 |
| 2026-05-27 | Website analytics privacy note | Added a short footer note that the website uses Google Analytics → v0.5.12 |
| 2026-05-27 | Google Analytics 4 setup | Added GA4 site-wide in `BaseLayout`; production only, disabled in local dev → v0.5.11 |
| 2026-05-25 | Commander Vault icon update | Replaced the small app icon with newly supplied artwork and synced it to public assets → v0.5.10 |
| 2026-05-25 | Commander Vault roadmap lane rename | Renamed the current roadmap lane to `V1.0 coming soon` → v0.5.9 |
| 2026-05-25 | Commander Vault roadmap trim | Removed the free-tier watermark item from the `V1.0 ready` roadmap → v0.5.8 |
| 2026-05-25 | Commander Vault hero copy alignment | Updated the intro wording and center-aligned the top descriptive text → v0.5.7 |
| 2026-05-25 | App hero intro width polish | Top descriptive text now spans the same content width as features and roadmap sections → v0.5.6 |
| 2026-05-25 | Commander Vault V1.0-ready refresh | Freemium copy, `V1.0 ready` roadmap state, Google Play placeholder, and purchase legal wording aligned → v0.5.5 |
| 2026-05-23 | Remove website analytics | Plausible removed; no tracking scripts → v0.5.4 |
| 2026-05-23 | Lighthouse / a11y polish | Skip link, OG meta, contrast, LCP hints → v0.5.3 |
| 2026-05-23 | Post-launch owner decisions + 404 fix | Social/domain none; 404 `<base>` + `.nojekyll` → v0.5.1 |
| 2026-05-23 | Phase 6 — Launch | Public repo; Pages + Actions; owner live smoke test passed → v0.5.0 |
| 2026-05-23 | Phase 3 — Content ingest | Both apps + legal + about in collections; supply sync scripts |
| 2026-05-23 | Commander Vault roadmap on site | v1.0–v1.2+ and iOS → `commander-vault` collection → v0.4.4 |
| 2026-05-23 | About on home only | Moved `AboutBlurb` to home `#about`; studio credit on app pages → v0.5.0 |
| 2026-05-23 | Times Tables roadmap on site | Release 2–4+ from owner → `portal-pages-times-tables` collection → v0.4.3 |
| 2026-05-23 | Site assets sync + 404 page | `sync:assets` supply→public; favicon/nav icons; 404 → v0.4.2 |
| 2026-05-23 | Hide donate UI until owner ready | `DONATE.enabled: false` on app pages → v0.4.1 |
| 2026-05-23 | Phase 5 — Legal routes (Commander Vault) | Privacy, terms, credits from `supply/` → v0.4.0 |
| 2026-05-23 | Phase 5 — Legal routes (Times Tables privacy) | `legal` collection + `/apps/portal-pages-times-tables/privacy` from supply → v0.3.0 |
| 2026-05-23 | Phase 2 — App template (content schema, AppPage, components) | Commander Vault pilot data in collection; hero in public → v0.2.0 |
| 2026-05-23 | Phase 0 — Astro bootstrap, minimal home, GitHub Pages deploy | → v0.1.0 |
| 2026-05-23 | Project plan + agent rules + versioning stubs | → v0.0.1 |

---

## Polish backlog

- Subtle scroll animations for roadmap
- Per-app OG images auto-generated from hero art
- Light mode toggle (only if you want it; default remains dark)
- RSS / “what’s new” from roadmap changes
- i18n

---

## To Test Checklist

*Sync when the site exists. Check on each release.*

### Global

- [x] Home loads at https://pageandportal.github.io/pageandportal/ (`base: /pageandportal/`) — owner verified 2026-05-23
- [x] Dark theme readable; focus visible on links — owner verified 2026-05-23
- [x] Mobile layout: nav, app cards, footer — owner verified 2026-05-23
- [x] Donate button — N/A (UI hidden via `DONATE.enabled`)
- [ ] Footer includes a short note that the website uses Google Analytics
- [ ] Google Analytics 4 loads on deployed pages with measurement ID `G-48L1CF97DY`
- [ ] Google Analytics 4 does not load during local `npm run dev`
- [ ] Pages and screens report shows real page titles (e.g. Portal Pages Times Tables), not a large `(not set)` bucket after deploy

### Per app

- [x] App page hero shows correct art — owner verified 2026-05-23
- [x] Feature items render (text-only; no feature screenshots yet) — owner verified 2026-05-23
- [ ] Commander Vault — status badge shows `live`
- [ ] Commander Vault — roadmap shows three lanes: **Released** (14 cards, no status chips; first cards of all three lanes level), grouped under **v1.3** (4) and **v1.2** (1), with **v1.1** (9) behind “Show 9 more”), **v2.0.0 — iOS Release** (iPhone release in progress, iCloud backup planned), **Planned** (5, iPad layout last); mobile swipes between lanes
- [ ] Insert Continue — home card (coming soon, green subtitle, square CRT icon readable); app page has no Play button, no banner, no privacy link; hero wordmark not cropped on a phone
- [ ] Insert Continue — roadmap lanes **Ready for launch** (7 ready, incl. Neon Snake, Brick Buster, Formation Fire and Lane Hopper), **On the bench** (Shattered Earth planned), **After launch** (4 planned); first cards level; the In the cabinet card mentions railway tracks and a sinking marsh for Lane Hopper; Formation Fire's caption doesn't say it's still being built; the high-scores feature card says "Your scores are never uploaded"; hub caption says it was captured when Paddle & Pixel was the first playable game
- [ ] Insert Continue — Screenshots on a PC: one row of six upright shots (hub, pre-match, Neon Snake, Brick Buster, Formation Fire, Lane Hopper) above three Paddle & Pixel landscape shots, edges level; on a phone, upright shots in pairs and landscapes full width; the viewer counts 1–9 left to right
- [ ] Insert Continue — Screenshots section between Features and Roadmap: five shots in play order with captions and the in-development note; desktop phone shots and landscape stack end level; on a phone the two upright shots sit side by side
- [ ] Roadmap “Show N more” toggle opens/closes with mouse, touch, and keyboard (Tab to it, Enter/Space); focus outline visible
- [ ] Commander Vault — Screenshots section between Features and Roadmap: six dark-theme portraits (no share image); one row of six on a wide desktop, two rows of three on a tablet/small laptop, pairs on a phone; note credits card art to Wizards of the Coast via Scryfall
- [ ] Screenshot viewer (Commander Vault and Insert Continue) — tap a screenshot: it opens full-screen with caption and "n of N"; previous/next buttons (bottom corners on a phone), swipe and arrow keys move between shots; ×, Escape or tapping outside closes it
- [ ] App pages on a phone — no sideways scrolling or zoomed-out page; only the roadmap lanes swipe sideways
- [ ] Commander Vault — free-to-start copy matches the approved one-time unlock wording
- [ ] Commander Vault — support link works and **Get it on Google Play** opens the store listing
- [ ] Commander Vault — “iOS version coming soon” banner sits under the Play button (remove `announcement` when the App Store link goes live)
- [ ] Commander Vault — privacy (Last updated November 2026) covers optional iCloud backup (coming with the iOS app), Scryfall logging, deck-link lookups, View on EDHREC, the Android update check, and Google Play + App Store purchases; terms (November 2026) name both stores and label iCloud backup as coming with the iOS app; feature card matches; Credits no longer claims "permitted under the Fan Content Policy"
- [x] About on home `#about`; studio credit on app pages — owner verified 2026-05-23
- [x] Privacy (and other legal) pages linked and readable — owner verified 2026-05-23
- [x] Portal Pages Times Tables — privacy at `/apps/portal-pages-times-tables/privacy`
- [x] Commander Vault — privacy, terms, credits at `/apps/commander-vault/{privacy,terms,credits}`
- [ ] SparkClass — **not** on the home grid; `/apps/sparkclass/` still opens by direct link with the workshop hero (now `hero.jpg`)
- [ ] SparkClass — app page hero, features, roadmap, and Open app CTA
- [ ] SparkClass — privacy and terms at `/apps/sparkclass/{privacy,terms}`
- [ ] SparkClass — status badge shows `coming soon`; no public app URL / Open CTA until owner ready
- [ ] SparkClass — footer shows “Coming soon” as non-link placeholder
- [ ] Store/repo links work — pending Play/App Store URLs (support email only today); SparkClass web URL live

### Deploy & meta

- [ ] `version.properties` v0.6.0 build 1 matches the next shipped site
- [x] Favicon and page `<title>` / description — owner verified on deploy 2026-05-23
- [ ] Header logo and browser-tab icon look the same as before (centre crop of the Page & Portal artwork) after the v0.12.6 switch to small `studio-icon.webp` / `favicon.png`
- [ ] Link previews — pasting an app page link (e.g. Insert Continue) into Messages, Discord, Facebook, or X shows the large 1200×630 card; home link shows the small studio icon card. Platforms cache previews, so a re-shared old link may show the old card for a while
- [ ] Insert Continue — browser tab / search title reads “Insert Continue — Retro Arcade Mini Games · Page & Portal”
- [ ] `/apps/` opens the home page at the Apps section
- [ ] `/sitemap.xml` lists home, Commander Vault, Times Tables, Insert Continue and their legal pages (no SparkClass, no `/r/`); submit it in Google Search Console when the owner sets that up
- [x] 404 page works (`/404.html` and nested bad URLs — owner verified; `<base>` fix v0.5.1)
- [x] Lighthouse / a11y polish — skip link (owner verified Tab 2026-05-23), SEO meta, focus/touch targets, semantic roadmap lists, perf tweaks; re-run 2026-05-23: home 95/100/100/100, Commander Vault 94/100/100/100, Times Tables 88/100/100/100 (perf/a11y/bp/seo)

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-31 | SparkClass hidden from home grid | Owner decision after Grok review; `/apps/sparkclass/` stays built and reachable by direct link, left out of sitemap. Remove `"hidden"` in `apps.inventory.json` to relist |
| 2026-07-24 | SparkClass added to website inventory | Beta web app section; interim name; legal drafts pending owner review |
| 2026-05-23 | Astro + static deploy | Markdown legal copy, multi-app template, GitHub Actions |
| 2026-05-23 | Single `PROJECT_PLAN.md` for tasks + test checklist | Owner-requested agent workflow |
| 2026-05-23 | GitHub repo `pageandportal/pageandportalweb` | Initial repo; superseded by rename |
| 2026-05-23 | Renamed repo → `pageandportal/pageandportal` | Pages URL `/pageandportal/`; `site.properties` updated |
| 2026-05-23 | App inventory (2 apps, coming soon) | `apps.inventory.json` + starter `supply/apps/*` |
| 2026-05-23 | Commander Vault pilot content | Migrated from Google Sites; legal + features in `supply/` |
| 2026-05-30 | Commander Vault V1.0 in closed beta | Site badge `beta`; roadmap lane renamed to `V1.0 closed beta`; not yet public on Google Play |
| 2026-05-25 | Commander Vault uses free-to-start unlock model | 5 editable mono-colour slots are free, non-mono slots stay visible but locked, full 32-slot access is a one-time Google Play unlock |
| 2026-05-23 | Repo public + GitHub Pages live | Free plan requires public repo; Actions deploy |
| 2026-05-27 | Google Analytics 4 enabled on the website | Use measurement ID `G-48L1CF97DY`; tracking loads on deployed pages only and stays off in local development |
| 2026-05-23 | Analytics: none | No website tracking; app privacy unchanged |
| 2026-05-23 | Social links: none | No profiles linked from site |
| 2026-05-23 | Custom domain: deferred | GitHub Pages URL is canonical for now |

---

## Quick reference for owners

- **App ideas (private, not on site):** [`docs/app-ideas.md`](docs/app-ideas.md)

1. Fill **Your tasks** (start with pilot app; GitHub repo is set).
2. Drop files under `supply/` or tell the agent paths in this repo.
3. Say “start Phase 0” (or pick a backlog item) when ready to build.
4. Confirm in chat when an owner task is done so agents can move it to **Done**.
