# PROMPT G — Codebase project: verification hardening + owner-data intake prep

You are the **Codebase project** for **Damage of Eternity** (repo saweber002-svg/DoE-Prompt-Style-). State of play: PR #4 (your foundation) and PR #5 (UI Stage 1) are **merged to main** (`e660424`); 24/24 tests, build green. The CI/Pages workflow files exist only as owner-landed files (the connector lacks workflows permission) — **`.github/**` is owner territory now; do not create or modify workflows.** The UI project runs in parallel under the same ownership contract.

## File ownership (binding, unchanged)
**You own:** `src/engine/**`, `src/data/**`, `data/**`, `tests/**`, `docs/**`, `BLUEPRINT.md`, `vite.config.ts`, `tsconfig*.json`, `reference/**`, and (new) `scripts/**`.
**Frozen:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/**`, `src/assets/**`, `ATTRIBUTIONS.md`, `screenshots/**`, `package.json` / `package-lock.json`, `.github/**`.
Branch: **`build/codebase-hardening`** off current `main`. PR titled **"Codebase hardening: real loader tests, data guards, intake worksheet"** + STOP (zip relay on 403). Merge order: yours first, UI second, as before.

## Task 1 — Make the provenance tests real (tests + loader, yours)
The PR #4 review found that two of the loader tests assert the ring-provenance rule's *shape* on synthetic objects instead of driving the actual validation code. Fix that properly:
- Refactor the loader's validation into an exported, pure entry point (e.g. `validateDamageModel(model)` / `validateEnemies(data)`) that the normal load path also calls — one source of truth, no test-only copy of the logic.
- Rewrite the provenance tests against in-memory fixtures run through that entry point: (a) all-null ring values pass; (b) numeric + `provenance: "owner-measured"` + non-empty `source` passes; (c) numeric without provenance throws; (d) numeric with provenance but empty/missing source throws; (e) non-numeric, non-null value throws.
- All 24 existing tests stay green (updated where they asserted the old synthetic shape).

## Task 2 — Data guards (tests only)
- **zoneClass consistency:** for every enemy zone in the data, the stored `zoneClass` equals the engine's derivation (head/face → head; everywhere → everywhere; else body). The engine is the source of truth; the test fails loudly on drift.
- **Twin-copy guard:** a test reads both copies (`data/` and `src/data/`) of `enemies.json` and `damage-model.json` and asserts deep equality — the byte-identical rule becomes self-enforcing instead of review-enforced.
- **Roster sanity:** every `roster: true` enemy has zones or is the known no-data case (Mimic); every zone multiplier is a finite number ≥ 0.

## Task 3 — Owner-data intake worksheet (`reference/t-weak-worksheet.md`, new)
Scott's T_WEAK table and ring digits will arrive as in-game transcriptions. Prepare the exact form for it:
- A grid of **every enemy × its zones** (generated from current `enemies.json`), each cell showing the current interim multiplier greyed as `(interim: ×N)` with a blank for the owner-observed value beside it, plus a "no such zone / not observed" convention explained at the top.
- A ring section: the 10 rings by name with blank fields for owner-measured value + date/source note — matching the loader's provenance rule exactly (value, `owner-measured`, source).
- Header instructions: fill in-game, return the file, and the values land as a data-only update (plus the docs/02 interim flag coming off the zones he confirms). **No values pre-filled as fact — interim numbers are labelled interim everywhere they appear.**

## Task 4 — Docs truth pass (small)
`BLUEPRINT.md` + `docs/01` status lines: foundation + UI Stage 1 merged; Pages pending the owner's two manual actions (add the two workflow files to main; Settings → Pages → Source: GitHub Actions); active work = UI completion II + this hardening. Factual alignment only.

## Acceptance
All tests green (24 + new), build green, no data values changed anywhere (schema/refactor only), both data twins still identical, report-back per task + anything you needed outside your territory and did NOT touch.
