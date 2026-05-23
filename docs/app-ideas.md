# App ideas (owner reference)

**Not published.** This file lives in `docs/` for your reference only. It is not part of the Astro site build and does not appear on GitHub Pages.

When an idea is ready to ship on the hub, promote it via [`adding-an-app.md`](adding-an-app.md), `apps.inventory.json`, and `supply/apps/<slug>/`. Until then, keep ideas here.

**Last updated:** 2026-05-23

---

## How to use this list

| Status | Meaning |
|--------|---------|
| **Idea** | Concept only — not scoped for build |
| **Interested** | You want to work on it; design or prototype TBD |
| **Scoped** | Enough detail to start supply/content or agent tasks |
| **Shipped** | Live on Page and Portal — move slug to inventory; archive or trim entry here |

---

## Ideas

### Page & Portal: Chronicles

| Field | Value |
|-------|--------|
| **Status** | Interested |
| **Tentative name** | Page & Portal: Chronicles *(slug TBD — e.g. `chronicles`)* |
| **Also known as** | Create-your-own-adventure / branching fantasy adventure *(internal shorthand)* |
| **One-liner** | Fantasy-flavored interactive adventure for tabletop RPG fans — branching story, dice, puzzles, multiple endings. |
| **Audience & tone** | Tabletop RPG fans; fantasy setting and feel (adventure, magic, classic RPG vibes). |

**Concept**

A digital “choose your own adventure” experience aimed at people who already enjoy tabletop RPGs: narrative branches, player choices, optional character state (inventory, flags, stats), and gates that use dice checks or puzzles before the story continues. Tone and framing should feel like fantasy campaign play, not a generic kids’ storybook.

**Core mechanics (draft)**

- Branching story graph (nodes, choices, conditions, endings)
- Virtual dice (e.g. d6/d20, modifiers, pass/fail thresholds; optional hidden rolls)
- Puzzles: riddles, codes, item combinations, sequence puzzles, timed choices
- Save/load and replay; optional journal or “story so far”

**Content model (draft)**

- Story authored as structured data (JSON/YAML/Markdown) so branches can be edited without rewriting app code
- Strong fit for collaboration: you set voice and major beats; agents or tools flesh out branches and consistency passes

**Open questions**

- Platform: browser/PWA on Page and Portal vs standalone app
- Dice: narrative flair vs crunchy RPG rules (lean toward familiar tabletop patterns where it helps)
- Fantasy scope: high fantasy, sword-and-sorcery, or other subgenre preference
- How much prose you write vs generate/edit in passes
- Art/audio scope (text-only MVP vs illustrations)

**Notes**

- Good agent fit for engine, dice, puzzles, and branching consistency; playtesting and final “voice” benefit from your input.
- Sensible path: design doc + one sample chapter (3–5 endings, one puzzle, one dice check) before scaling.

---

## Parking lot

*Add short bullets here for half-formed ideas before they get a full section above.*

- *(none yet)*
