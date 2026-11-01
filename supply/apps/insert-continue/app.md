# App supply sheet — Insert Continue

**Source brief:** `E:\Projects - Apps\insert-continue\docs\website-page-brief.md` (James, 2026-10-31). Copy is locked there; this sheet mirrors what is published.

---

## Identity

| Field | Value |
|-------|--------|
| **Display name** | Insert Continue |
| **Subtitle** | Arcade Mini Games |
| **URL slug** | insert-continue |
| **Tagline** | Retro gaming in your pocket, no coins required. Original arcade mini games. |
| **Status** | coming-soon (in active development; not on Google Play yet) |
| **Short description** | Insert Continue is a pocket arcade cabinet: original mini games, a green-screen glow, and a bank of honest blips and bleeps. It is in active development and is not on Google Play yet. When it launches you pick a game, play a round, and chase a high score on your own phone — offline, with no account. |

---

## Links

| Label | URL |
|-------|-----|
| Google Play | None yet — add only when a real store URL exists |
| App Store | None yet |
| Support email | pageandportal@gmail.com |

---

## Donate

| Field | Value |
|-------|--------|
| **Use global donate link?** | no (`donateUseGlobal: false` — a game, not a tip jar) |
| **App-specific donate URL** | None |

---

## Features

### Feature 1 — In the cabinet

- **Description:** Original games, built from scratch. Paddle & Pixel — a side-on paddle duel against the computer; first to seven wins. Neon Snake — eat, grow, and don’t bite your own tail; walls or wrap-around. Brick Buster — ten hand-built brick layouts, three lives, one ball, no power-up circus. Formation Fire — hold the line against eight waves of descending drones. Lane Hopper — get the rabbit across busy roads and rivers before the clock runs out. Shattered Earth — a turn-based artillery duel: set the angle and power, blast the hills, outlast the other tank.

### Feature 2 — Short rounds

- **Description:** Built for a bus stop or a coffee break. Simple touch controls, each game on the screen orientation that suits it.

### Feature 3 — Plays offline

- **Description:** No account and no sign-in. A round does not need a connection.

### Feature 4 — A green screen you can switch off

- **Description:** Classic phosphor green, with a plain white screen if you prefer. Subtle scanlines and a light vignette, and a mute button that means it.

### Feature 5 — High scores stay on the phone

- **Description:** Cabinet-style local tables. Three-letter initials. Your scores are never uploaded.

### Feature 6 — Fair play

- **Description:** Free to play, with ads only between games — never in the middle of a round. In some games you can choose to watch a short ad to continue a run, once per run. A one-off way to turn ads off comes after launch. This is not an emulator and not a set of licensed remakes.

---

## Roadmap

*Site lanes: **On the bench** (`now`), **Google Play** (`next`), **After Android** (`later`).*

### On the bench

| Feature | Status | Notes |
|---------|--------|--------|
| Arcade cabinet interface | Ready | Phosphor-green display, optional scanlines, central hub for launching each game; built and working in testing |
| Paddle & Pixel | Ready | First game, finished and playable on a phone in testing |
| Neon Snake | In progress | Second game, playable on a phone in testing; three speeds, walls or wrap-around |
| Local high-score tables | Ready | Three-letter initials, stored only on the phone; working in Paddle & Pixel and Neon Snake in testing |

### Google Play

| Feature | Status | Notes |
|---------|--------|--------|
| Google Play release | Planned | Public release for Android on Google Play |
| Full launch line-up | Planned | Brick Buster, Formation Fire, Lane Hopper, Shattered Earth join Paddle & Pixel and Neon Snake |
### After Android

| Feature | Status | Notes |
|---------|--------|--------|
| iPhone and iPad release | Planned | Same release window as Android, after it; no date |
| Remove ads | Planned | Optional one-time purchase; no price until billing is live |
| Additional screen colours | Planned | Amber, red, cyan, purple packs; green and white remain free |
| New original games | Planned | Do not name or count |

_Roadmap tiles reworded 2026-10-31 for a more professional tone (owner request); lane labels unchanged. The Insert Continue repo brief still has the original wording._

---

## Graphics checklist

| File | Role | Notes |
|------|------|-------|
| `logo-icon.png` | 512×512 square icon (home card, app hero) | Stacked INSERT / CONTINUE in Press Start 2P, `#33FF66` on `#040A06`, inset border, bright cursor block. Checked at 72×72. |
| `hero-banner.png` | 2200×880 app hero | Single-line wordmark + static cursor block, `ARCADE MINI GAMES` line, subtle scanlines, light vignette. Wordmark kept narrow enough for the mobile crop. |
| `render-graphics.py` | Regenerates icon, hero and `share-card.png` | `python render-graphics.py` — reads fonts from the Insert Continue game repo; type is baked in, so no font files ship with the site. |
| `screenshots/01–05-*.png` | In-development screenshots (page Screenshots section) | Half-size web copies (540×1200 portrait, 1200×540 landscape) of `E:\Tools\Godot\builds\web-shots\` (owner-supplied 2026-11-01): hub, pre-match, Paddle & Pixel in play, initials entry, results table. Captioned as an in-development build. |

- [x] Icon and hero (stylised, code-drawn)
- [x] In-development screenshots — added at owner request 2026-11-01 (brief said wait for a release build); swap for release-build screens when they exist

---

## Brand

| Field | Value |
|-------|--------|
| **Accent color** | `#33FF66` (main), `#9CFF9C` (bright, secondary) |
| **Palette (locked)** | Bright `#9CFF9C`, Main `#33FF66`, Dim `#1F8F3A` (never text), Background `#040A06` |
| **Fonts in art** | Press Start 2P (wordmark), SIL OFL 1.1 — baked into PNGs |
| **Notes** | Studio chrome stays (Cinzel / Inter / `#0d0f12`). No synthwave, no curvature, no flicker, no animated cursor. |

---

## Legal pages on site

| Page | Include? | File |
|------|----------|------|
| Privacy | Later pass — before any Play submission | `src/content/legal/insert-continue/privacy.md` (outline in Insert Continue `FOUNDATION-PLAN.md` § D2) |

---

## Notes for agents

- No famous game, character, or studio names; no emulator / ROM / remake wording; no game counts; no prices; no ads SDK or analytics talk. See the source brief § “Copy you must not write”.
- Do not claim the other five games are playable today.
- Add the Play button only when a real store URL exists.
