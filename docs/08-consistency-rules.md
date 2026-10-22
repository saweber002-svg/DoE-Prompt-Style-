# 08 — Consistency rules (binding on every change)

These rules exist so the app never drifts from the evidence or from itself. They outrank convenience, deadlines, and aesthetics.

## Data integrity law

1. **Never invent a value.** If it isn't in `reference/research/` (or a later captured measurement recorded with provenance), it does not exist. Unknown = `null` in data, `?` in UI.
2. **Unknown is never ×1, never 0, never a "reasonable default."** The only ×1s in the system are measured ones (flat enemies).
3. **Three tiers of numbers, never mixed silently:** verified public · owner-supplied (labelled) · placeholder (labelled, and placeholders never reach user-facing math). Owner observations that conflict with tested data are recorded as conflicts (e.g. Blind Octoculus ×8-heard vs ×6-surveyed), not resolved by fiat.
4. **Contradictions are data.** Both readings are stored with sources; the app copy uses the better-supported one and Lab Notes carries the dispute.
5. **Every number carries provenance.** In `data/` via `confidence`/`source` fields; in UI copy via confidence badges where the value is load-bearing.

## Naming canon

- Enemy, perk, ring, and EXO names come **only** from `data/` (which follows the research report). If a mockup, an old doc, or a builder's instinct offers a different name ("Doom Tide", "Ring of Ember"), it is wrong.
- Dual-named rings are always cited **Item / Perk** (e.g. Scout's Signet / Precision Shot).
- Known naming disputes stay visible: Spectral Echo aka Spectral Attack; EXO currency Exo Crystals vs EXO Points; EXO Criticals vs the slide's "Critical/Impale".

## Supersession discipline

- The Oct-2026 research **supersedes** the Oct-20 handoff model wherever they conflict — most importantly: **weapons have max 2 perks** (the "4 perk columns at 40%/32%" model in `reference/legacy/` was never found in any citable source and is retired). Legacy material is evidence of process, never a build source. See `reference/legacy/README.md`.
- When new evidence lands, update `data/` + the mirroring doc in the same change, and note what it superseded.

## Art rules

- The owner's files and the real game captures are used **exactly as provided** — no AI redraws, no sharpening, no downscaled substitutes. AI mockups guide composition only.
- Enemy likeness is grounded in `reference/mob-images/`; an enemy with no capture (Mimic) ships as a silhouette, not an invention.
- All text is app-rendered; no words are baked into shipped art.

## Scope guardrails

- No DPS, no TTK, no enemy HP — the data does not exist (see `docs/01`).
- No enemy-specific damage perks in the calculator — owner ruling.
- A briefing or reference document is **context, never a work order**: building starts only on an explicit instruction.
