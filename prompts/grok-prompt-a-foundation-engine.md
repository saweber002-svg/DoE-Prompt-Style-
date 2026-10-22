# PROMPT A — for Grok: Foundation + Damage Engine (build slices 1–2)

Copy everything below the line into Grok. Prerequisite: none. This prompt authorizes code in the named repo on a branch — nothing else.

---

You are building **Damage of Eternity**, a damage-system guide + calculator companion for the VR game *Dungeons of Eternity*. The repository **https://github.com/saweber002-svg/DoE-Prompt-Style-** is the sole build source and your single source of truth. An independent audit of this repo (yours, 2026-10-22) recommended Option C — a dedicated data-access/validation layer plus a pure functional engine. That recommendation is **approved**. The lead (Muse) has also resolved audit item P0: this repo is the only build source; the inaccessible private repo belongs to a separate handoff project and is **not** to be merged, fetched, or waited on.

## Before writing any code, read in full

`README.md`, `BLUEPRINT.md`, `docs/01` through `docs/08`, `data/damage-model.json`, `data/enemies.json`, and `reference/legacy/README.md`. If any instruction below conflicts with those files, **the repo files win** and you must flag the conflict in your report.

## Hard laws (violating any of these fails the build)

1. **Never invent a value.** Unknown data is `null` in data and `?` in UI. Unknown is never coerced to 0 or 1. (The one exception: a zone multiplier of `0` in `enemies.json` is a *measured nullify* — preserve it exactly; it is not missing data.)
2. **Max 2 weapon perks, no duplicates, multiplicative factor chain.** The legacy 4-perk-column model under `reference/legacy/` is retired: never import its numbers, its config, its validation (it rejects ≤0 multipliers — incompatible with real nullify zones), or its assumptions. Legacy code may be read for *structural* patterns only.
3. **Ring values are user-entered.** All ring values in the data are `null` because no public numbers exist. An *empty* ring slot contributes no factor. A *selected* ring with no user-entered value makes its factor **unknown**: totals are withheld (shown as `?`) until the user enters the value printed on their physical ring. Never substitute a default.
4. **No DPS, no TTK, no enemy HP** anywhere — that data does not exist.
5. Names (enemies, perks, rings) come only from `data/*.json`. Do not rename, embellish, or add any.

## Stack (pinned)

Vite + React 19 + TypeScript (strict) + Tailwind CSS. Vitest for tests. Static site output (no backend, no accounts). Follow the module map in `BLUEPRINT.md` §3 exactly.

## Slice 1 — Scaffold, seed loader, validation

- Scaffold the app per BLUEPRINT. Move `data/damage-model.json` and `data/enemies.json` into `src/data/` **unchanged** (byte-identical — they are canonical; if you believe one is wrong, stop and report, do not edit).
- `src/data/loader.ts`: parses and validates both files against explicit schemas at boot; **fails loudly** on schema drift, missing fields, wrong types, a perk count > 2, or any unknown→number coercion. Carries each record's `confidence`/`source` through to consumers.
- Tests: schema integrity for both files; ring values remain `null` after load; Mimic's `zones: null` loads as an explicit no-data state (not an error, not an empty array); a deliberately corrupted fixture fails validation.
- **Acceptance:** `npm test` green; `npm run build` green; zero invented values (grep your diff for numeric literals not present in the seed data and justify each in your report).

## Slice 2 — Pure engine (`src/engine/`, zero UI/IO imports)

Implement `formula.ts`, `factors.ts`, `probability.ts`, `types.ts` per BLUEPRINT and `docs/02-damage-model.md`:

- The multiplicative factor chain exactly as `data/damage-model.json` `formula.text`: identical rings add inside their factor; different sources multiply; zone is the final factor.
- Attack-type conditions: Might only on throws, Pierce only on thrusts, Stab only on stabs/thrusts, Throw Damage perk only on throws. Grip: 2H ×2 handling (dagger stab ×1.5). Situation toggles: first strike (×3, applied outside the chain as specified in docs/02), target poisoned/staggered/from-behind enable their conditional rings.
- Priority rules: Fire overrides other elements on projectiles (a lit crossbow bolt loses its crit); ranged shots cap at **2 proc perks**; Backstab and Scout's Signet never stack (if both are somehow selected, surface an explicit conflict state — do not silently pick one).
- Probability: enumerate the proc pools (weapon crit, EXO crit, fire, explosions/area) as **independent** rolls. Note for the avoidance of doubt: these four pools happen to carry rates of 32/40/32/32% at max tier — they are four *distinct perks*, **not** the retired 4-column model; do not structure the code as "columns."
- Output per hit: **Floor** (no procs), **Expected** (probability-weighted), **Ceiling** (all procs) **with the ceiling's frequency**, plus the full per-pattern table (16 patterns melee; ranged-capped set for ranged) and the factor-by-factor breakdown the UI will render. Engine never rounds for display and never formats strings.
- **Acceptance tests (must pass exactly):**
  - Worked example: base 130, max-tier full build, ×3 zone → Floor **2,636** (×20.3), Ceiling **94,910** (×730.1).
  - Frequency table for the max-tier 4-pool build: 0 procs **18.87%**, exactly 1 **39.21%**, exactly 2 **30.29%**, exactly 3 **10.32%**, all 4 **1.31%** (±0.01 rounding).
  - Sword (3-pool) distribution: 27.74 / 44.61 / 23.55 / 4.10%.
  - A selected ring with `null` value → engine returns an explicit `unknown` result state, not a number.
  - Nullify zone (×0) → damage 0 through the normal path (not an error).

## Workflow

- Work on branch **`build/foundation-engine`** off `main`. Two commits minimum (slice 1, slice 2), messages naming the slice.
- Open a pull request against `main` titled "Slices 1–2: scaffold, loader, pure engine" and **STOP**. Do not merge. Do not start UI work (that is a separate prompt).
- Report back: files created, test output (full counts), build status, every numeric literal you introduced and its source, and any conflict you found between this prompt and the repo (repo wins — list what you obeyed instead).
