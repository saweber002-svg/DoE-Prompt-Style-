# BLUEPRINT — Damage of Eternity codebase

**Status (2026-10-22):** Slices 1–4 built and merged. Owner formula is canonical. Active work: UI completion (parallel) and codebase foundation (CI, Pages, owner-data readiness).

How the app is structured. Slices 1–4 (scaffold, engine, owner-formula alignment, premium UI v1) are merged to main. This document remains the contract for remaining work (UI completion + codebase foundation). Product/data/design detail lives in `docs/`; this file is the engineering map.

## 1. Product in one paragraph

A companion app for *Dungeons of Eternity* players: pick a weapon's base damage, its perks, EXO perks, and rings; pick a target and a hit zone; see exactly what a hit does — **Floor / Expected / Ceiling** — with the full factor chain visible and every proc combination's frequency shown. Plus a guide layer (The Chain, libraries, enemy pages) and a Lab Notes layer that turns every unknown in the damage system into a measurement task. Scope law: `docs/01-product-scope.md`.

## 2. Recommended stack (blueprint decision, revisable at build start)

- **Web app, single codebase, mobile-first responsive** (the sandbox must work one-handed on a phone between VR sessions; desktop is the wide layout).
- **TypeScript + a component framework** (React or Svelte — builder's choice at scaffold time; the blueprint is framework-agnostic below the component layer).
- **Pure functional core:** the damage engine is a dependency-free module with zero UI imports, unit-tested against the worked examples in `data/damage-model.json`.
- **Static data as JSON** in `data/` (this repo's files move verbatim into the app repo as the seed). No database at v1; user-entered ring values and saved builds live in local storage.
- **No backend, no accounts, no analytics at v1.**

## 3. Module map

```
src/
  engine/            # PURE — no UI, no I/O
    formula.ts       # factor-chain evaluation: build -> hit outcome (floor/expected/ceiling)
    factors.ts       # one function per factor group (rings, perks, exo, handling, zone)
    probability.ts   # proc-pool enumeration: 16 patterns (melee) / ranged cap, frequencies
    types.ts         # Build, Target, Zone, HitOutcome, Confidence
  data/              # seed data, imported from this repo's data/*.json
    damage-model.json
    enemies.json
    loader.ts        # validates seed data at boot; fails loudly on schema drift
  state/
    build-store.ts   # current build, A/B snapshot compare, situation toggles
    user-values.ts   # user-entered ring values, persisted locally, keyed by ring id
  ui/
    screens/         # one file per screen in docs/05
      Sandbox.tsx  Menu.tsx  EnemySelect.tsx  EnemyDetail.tsx
      Combos.tsx   PerkLibrary.tsx  ExoBoard.tsx  RingsVault.tsx
      ChainGuide.tsx  LabNotes.tsx
    components/
      FactorChain.tsx    # the chip strip — the app's signature component
      ThreeNumbers.tsx   # Floor / Expected / Ceiling (+ ceiling frequency)
      ProcPips.tsx       # 4-pool pip rows; EXO crit pip visually distinct
      DistributionBar.tsx# 5-segment probability bar
      ZoneFigure.tsx     # enemy figure w/ zone tints: gold x3, pale x2, slate x1, hatched null, ? unmeasured
      UnknownField.tsx   # every '?' state in the app renders through this one component
      ConfidenceBadge.tsx
    theme/           # design tokens from docs/06 (colors, type, panel treatment)
  assets/
    enemies/         # separated real captures from reference/mob-images (owner separation pass)
    backdrops/       # dungeon chamber art per docs/06
tests/
  engine/            # worked-example tests: base 130 -> floor 2,636 / ceiling 94,910 @ x3 zone
  data/              # seed integrity: no invented values, unknowns are null
```

## 4. Core contracts

- **Engine purity:** `engine/` never reads storage, never formats display strings, never rounds for display. Display rounding (nearest tenth / whole) is a UI concern; the game hides fractions, the app shows exact math.
- **One hit, one story:** every result traces to one factor chain render. If a number can't be explained by the chain, it doesn't ship.
- **Unknown is a value:** `null` in data means *unknown*, and the UI must render it through `UnknownField` — never coerce to 0 or 1. Tests assert this.
- **User values are data too:** a ring value the user types in is stored with provenance `user-entered` and is visually distinct from verified values everywhere it appears.
- **Names are canon:** enemy/perk/ring names come from `data/` only (see `docs/08`); UI copy never invents a name.

## 5. Build order (slices 1–4 merged; remaining work below)

1. **Scaffold + theme tokens + seed loader** (data integrity tests green).
2. **Engine: formula + probability** with worked-example tests.
3. **Sandbox screen** (build panel → FactorChain → ThreeNumbers → ZoneFigure) against the Wasp (flat baseline) and Skeleton Warrior (the teaching case).
4. **Enemy select + detail pages** for the full roster (Mimic as `?` silhouette).
5. **Combos screen** (16-pattern grid, melee/ranged toggle).
6. **Libraries:** Perk Library, EXO Board, Rings Vault (with user-entered ring values + persistence).
7. **The Chain guide + Lab Notes.**
8. **A/B build compare, Roll 1 / Roll 100 simulator, mobile pass.**

## 6. Verification recipe (every slice)

- Engine tests pass, including the two worked examples and the frequency table (18.87 / 39.21 / 30.29 / 10.32 / 1.31%).
- Data tests pass: every non-null number in `data/` carries a source; every unknown is `null`.
- Visual check against the governing mockup in `reference/mockups/` for the touched screen.
- No DPS, no invented names, no guessed values anywhere in the diff.
