# 06 — Design system: Approach B "Torchlit Cinematic"

Chosen by the owner (Oct 2026) from three game-matched approaches. Source references: the owner's screenshots in `reference/game-screenshots/` — the app's job is to match the game seamlessly while exceeding the in-game UI's quality: *the highest quality, most premium, visually satisfying experience possible.*

## The language

- **Full-bleed dungeon backdrops.** Every screen floats over a moody torchlit stone chamber, softly darkened. Warm **amber torchlight** from one side, deep **teal magical glow** from the other, drifting embers.
- **Frosted dark-glass panels** carry all data. Panels never compete with the backdrop: blur + dark tint + hairline gold edge.
- **Gold serif display type** in the spirit of the game's logo for headings and the big numbers; clean sans for data rows.
- **Circular blue sigil icons** (the game's ability-icon language) for perks, factors, and menu entries. **Orange sigil rings** for equipped rings (from the Tomb Extraction imagery).
- **Enemy presentation is cinematic:** full-body figures in the red arena square or on the glowing pedestal (both lifted from the game's own screenshots), zone tints glowing on the model itself.

## Color semantics (never decorative-only)

| Color | Meaning |
|---|---|
| Gold | damage, weak point (×3), primary numbers |
| Pale teal | ×2 zone, system/info, EXO |
| Slate grey | ×1 zone, neutral |
| Hatching/dark | nullify zone |
| Hollow / `?` | unknown — a first-class state, styled deliberately |
| Distinct 4th pip hue | EXO crit pool (40%) — must never match the 32% pools |

## Component signatures

- **FactorChain:** chips in formula order; same-factor adds stack in one bracket; chips light when active, dim when conditional-off; proc chips show their chance.
- **ThreeNumbers:** Floor / Expected / Ceiling stacked huge; ceiling always carries its frequency ("94,910 — 1.3% of hits").
- **ZoneFigure:** as `docs/04`. The figure teaches before any text is read.
- **UnknownField:** one component renders every `?` in the app (ring values, EXO per-level values, Mimic zones) so the unknown state is identical everywhere.

## Quality bar & rules

- Readability beats atmosphere on data-dense screens (libraries, combos grid): backdrop dims further there — B's one known trade-off, managed deliberately.
- All names/labels are **app-rendered text** (never baked into art), so copy can be corrected without touching images.
- Enemy art = the real captures (`reference/mob-images/`), owner-separated. Mockups are composition guides; AI-generated enemy art is never a shipping asset.
- Mobile: same language, panels stack, results bar sticks. No separate mobile design language.
