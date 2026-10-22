# Damage of Eternity — Blueprint & Reference Repo

*I get accused of it so why not do it 😂*

This repository is the **single source of truth** for building **Damage of Eternity**, a damage-system guide + calculator companion app for *Dungeons of Eternity* (Othergate, VR). It is a **prompt-style staging repo**: a complete blueprint of the codebase plus every research finding, data table, design mockup, and game asset collected so far — organized so that any builder (human or AI) can reference the same facts, names, and design language everywhere and produce a consistent app.

**Status: blueprint stage. No app code yet — by design.** Build slices come later, against `BLUEPRINT.md`.

## Start here

| File | What it is |
|---|---|
| `BLUEPRINT.md` | The master blueprint: architecture, module map, build order, verification |
| `docs/01-product-scope.md` | What the app is, what it deliberately is not, scope law |
| `docs/02-damage-model.md` | The formula, factor chain, interactions, frequencies (human-readable) |
| `docs/03-data-tables.md` | Canonical perk / EXO / ring / weapon tables with confidence badges |
| `docs/04-enemies-and-zones.md` | The trimmed roster and every zone map |
| `docs/05-screens-and-flows.md` | Screen inventory + per-screen spec, tied to the mockups |
| `docs/06-design-system.md` | Approach B "Torchlit Cinematic" design language |
| `docs/07-unknowns-and-lab-notes.md` | Everything unknown, framed as a measurement roadmap |
| `docs/08-consistency-rules.md` | The laws every change must obey (data integrity, naming, art) |

## Machine-readable data

- `data/damage-model.json` — formula, weapon perks, EXO perks, rings, frequencies, interactions
- `data/enemies.json` — roster + zone multipliers per enemy

These two files mirror `docs/02–04`. If they ever disagree, the **research report wins** and the mismatch is a bug to fix in both.

## Reference assets (`reference/`)

- `reference/research/` — the full 2026-10-21 deep-research report + source notes (the evidence base; every number in `data/` traces here)
- `reference/hitbox-research/` — the earlier hitbox research report
- `reference/mockups/` — design mockups (see `reference/mockups/INDEX.md`). Approach B is the chosen direction; B2 pages use real in-game captures for enemy likeness
- `reference/mob-images/` — 25 real in-game enemy captures with `MANIFEST.md` provenance. **These are the actual art assets for the build** (after the owner's separation pass), never AI redraws
- `reference/game-screenshots/` — the owner's 5 screenshots that define the game's visual language
- `reference/legacy/` — the earlier handoff example model and Oct-20 game data. **Superseded in places — read `reference/legacy/README.md` before touching anything in there**

## The one rule that outranks all others

**Never invent a value.** Unknowns ship as `?` / `null` / user-entered fields — never as a plausible guess, never as ×1. See `docs/08-consistency-rules.md`.

## Asset note (binaries)

All text, data, and docs in this repo are pushed and current. The binary reference images (mockups, mob captures, screenshots — ~12 MB) are staged in this exact folder structure in the staging workspace and listed in each folder's index/manifest; they join the repo via a binary-capable upload path. Paths in the docs are repo-relative and correct either way.
