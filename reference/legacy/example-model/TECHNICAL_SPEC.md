# Technical Specification — Dungeons of Eternity Damage Companion (Example Model)

**Version:** 0.1.0 · **Status:** Example model for handoff — not production code
**Game:** Dungeons of Eternity (Othergate), VR — Meta Quest / SteamVR
**Unofficial fan project. Not affiliated with or endorsed by Othergate.**

---

## 1. Purpose

Teach players to read the damage numbers the game now displays rising off
enemies, and let them predict/plan damage **outside the headset** — before a
run and between dungeons. The companion is a phone/tablet second-screen app.
Nothing in it is used during combat.

Two jobs, kept separate in the code:

1. **Calculator** — given a weapon's base damage, a perk loadout, and an enemy
   hitbox zone, show the damage a hit will display, per perk outcome.
2. **Guide** — illustrate *why* the number is what it is, in one glance:
   a 4-pip row (which perks procced) + a hitbox badge (×3 / ×2 / ×1).

## 2. Domain model — the variables

Exactly **6 core variables** determine one hit's displayed damage:

| # | Variable | Type | Example values |
|---|----------|------|----------------|
| 1 | Base damage | number, per weapon | 100 (example) |
| 2 | Perk 1 procced? | boolean roll, **p = 0.40** | — |
| 3 | Perk 2 procced? | boolean roll, p = 0.32 | — |
| 4 | Perk 3 procced? | boolean roll, p = 0.32 | — |
| 5 | Perk 4 procced? | boolean roll, p = 0.32 | — |
| 6 | Hitbox zone | categorical, per enemy | Head / Chest / Legs |

Supporting config (not per-hit variables): each perk's **bonus magnitude**,
and each zone's **multiplier**. Both live in config (§6), never in logic.

**Combinations:** 2⁴ = **16** perk patterns × 3 zones = **48 distinct outcomes**
per hit. Grouped by perk *count* for players: **5 tiers (0–4) × 3 zones = 15 cells.**

Assumption A1: the 4 perk rolls are **independent**. (If the game uses a
shared roll or pity system, the distribution changes — Q5.)

## 3. Formula

```
finalDamage = baseDamage × hitboxMultiplier × (1 + Σ bonuses of procced perks)
```

- **Stacking rule in this example: additive** percentages of base.
  ⚠ This is an *assumption*, not a verified game fact — see Q1. If the game
  stacks multiplicatively, only `perkMultiplierFor()` changes:
  `∏ (1 + bonus_i)` over procced perks. The rest of the model is untouched.
- Multiplication is commutative — hitbox vs. perk order does not matter.
- Keep full float precision internally. Round **only for display**
  (`formatDamage()`), and confirm the game's own rounding rule (Q4) so the
  companion's numbers match the floating numbers in-game exactly.

## 4. Probability reference (verified — do not re-derive by hand)

Proc chances: Perk 1 = 0.40, Perks 2–4 = 0.32 each. Independent rolls.

| Perks procced | Probability | Reading |
|---|---|---|
| 0 | **18.87%** | unlucky — about 1 in 5 hits |
| 1 | **39.21%** | the most common hit |
| 2 | **30.29%** | |
| 3 | **10.32%** | |
| 4 | **1.31%** | jackpot — about 1 in 76 hits |

- Expected perks per hit: **1.36**
- P(≥1 perk) = 81.13% · P(≥2) = 41.92% · P(≥3) = 11.63%
- Exact fractions: 0: 0.1886592 · 1: 0.3921152 · 2: 0.3028992 · 3: 0.1032192 · 4: 0.0131072

All 16 individual patterns are enumerated by `enumeratePatterns()` and locked
in by the test suite. Note the asymmetry Perk 1 creates: "only Perk 1" is
12.58%, while "only one 32% perk" is 8.88% each — this is why Perk 1's pip is
a distinct colour in the UI.

## 5. Display system — tying the model to the on-screen number

Every damage number in the guide is rendered as one unit:

```
  450   ● ● ○ ○   ×3 HEAD
  └┬┘   └──┬──┘   └──┬──┘
 value   pip row   hitbox badge
```

- **Pip row:** 4 dots, filled = procced. Pip 1 distinct colour (40% vs 32%).
- **Hitbox badge:** `×{multiplier} {ZONE}` — Head ×3, Chest ×2, Legs ×1 (Megamage).
- **Tier colours (suggestion, team to finalise):** scale number size/weight
  with tier so a 4-perk hit *looks* like the 1.31% event it is.
- ⚠ **Tier ≠ damage when bonuses are unequal.** If perks have different bonus
  magnitudes, two 2-perk hits can deal different damage. The grouped matrix
  is then a summary — the 16-pattern table is authoritative. With the example
  config (all bonuses equal) tier damage is exact, which is why the example
  uses equal bonuses.

## 6. Data model / config schema

Single source: `src/config.mjs`, mirrored in `data/config.json` for non-JS ports.

```ts
interface Perk  { id: string; name: string; procChance: number /*0..1*/; bonus: number /*0.25 = +25%*/ }
interface Enemy { id: string; name: string; hitboxes: HitboxZone[] }
interface HitboxZone { id: string; name: string; multiplier: number }
```

Adding content is a config edit, never a code change:
- **New enemy** → add an `Enemy` with its zones (template in config file).
- **New weapon type / perk set** → add/replace the `Perk[]` for that loadout.
- **Balance patch** → update numbers in config, re-run tests (§8).

## 7. Architecture

```
src/damage-model.mjs   Pure model. No UI, no I/O, no deps. THE deliverable.
src/damage-model.d.ts  Types for the TS/React port — keep in sync.
src/config.mjs         All game data.
src/ui-components.jsx  Example React components (PipRow, HitboxBadge,
                       DamageNumberExample, TierBars, HitboxDiagram).
examples/              Runnable demos (Node tour + standalone HTML calculator).
tests/                 Acceptance tests = §8 checks.
```

Porting: the model is ~200 lines of arithmetic. Port 1:1 to C# (Unity) or
TypeScript; the JSON config and the test expectations port unchanged.
The UI layer is disposable — rebuild it in the production stack/design system.

**VR-specific constraints for production:** the companion runs *outside* the
headset (phone/tablet). No account system, no game API, and no telemetry are
in scope for this example. Large touch targets, dark theme, and tables that
read at arm's length. Do not design any interaction that assumes use mid-combat.

## 8. Acceptance checks (automated — `npm test`)

1. Tier distribution equals the §4 values to 1e-7.
2. Tier probabilities sum to 1; 16 patterns exist and sum to 1.
3. Expected perk count = 1.36.
4. All-4 probability = 0.0131072.
5. Worked hit: base 100, perks 1+2 procced, Head ×3 → 450 (example bonuses).
6. Matrix = 48 rows, 15 unique tier×zone cells.
7. Expected damage, base 100, Legs ×1 → 134 (example bonuses).
8. Seeded simulator (20,000 rolls) lands within ±2 pts of theory per tier.

## 9. Open questions — the succeeding team must resolve these

| # | Question | Why it matters |
|---|----------|----------------|
| Q1 | Do perk bonuses stack **additively or multiplicatively** in the live game? | Changes every damage number; isolated to `perkMultiplierFor()` |
| Q2 | What are the **verified bonus magnitudes** per perk, per weapon type? | Example uses +25% placeholders throughout |
| Q3 | What are the **perk names/columns per weapon type**, and the hitbox tables for enemies other than Megamage? | Config completeness |
| Q4 | How does the game **round** displayed damage (floor / round / ceil)? | Companion must match floating numbers exactly |
| Q5 | Are perk rolls truly **independent** (no shared roll, no pity/streak protection)? | Changes the §4 distribution |
| Q6 | Do other modifiers exist in scope (difficulty scaling, co-op player-count scaling, elemental/status effects, charged/strong attacks)? | Each is a new variable + a new config section |

## 10. Out of scope for this example

Live game data/API integration · accounts or saved loadouts · in-headset UI ·
DPS-over-time modelling (swing speed, stamina, cooldowns) · enemy HP / time-to-kill
(a natural next feature once enemy HP is verified data).

## 11. Design system — modular aesthetics (added per owner requirement)

The app's appearance is fully modular, specified in
`resources/design-system/README.md`:

- **Tokens are the only visual values** (`resources/design-system/tokens.mjs`,
  mirrored as `tokens.json`): groups `color`, `font`, `shape`, `spacing`,
  `component`. Components consume CSS variables produced by
  `theme-loader.mjs` and never hard-code values.
- **Themes are partial overrides** — Presets: Dungeon Dark, Parchment Light,
  High Contrast, Blood Moon. A theme changes only the tokens it lists.
- **Editing is visual**: `theme-editor.html` provides preset picking, colour
  swatches, size sliders, a live preview of the real components, contrast /
  touch-target warnings, and theme JSON export/import (imported JSON loads
  directly via `applyTheme({ tokens })`).
- **Guardrails are tested** (`tests/design-tokens.test.mjs`): themes may only
  override existing tokens; every preset must pass text-contrast ≥ 4.5:1 and
  the 44px touch-target minimum.
- Game-data research files live alongside this under `resources/game-data/`
  (same principle: content is data, kept separate from code and styling).

## 12. Enemy hitbox data + layered dummy models

Enemy hitbox data lives in `resources/game-data/enemies.json` — one record
per enemy: `hitboxZones` (zone + multiplier; **null multiplier = not yet
documented, never 1×**), `status` (owner-supplied / official / community /
placeholder), and image `layers` slots.

Dummy models render as **separated 2D layers** (bottom → top: background
image → mob image → generated hitbox overlay → optional foreground) with
slight parallax offsets per layer — a high-quality depth effect at
transform-only render cost, no 3D engine. The overlay is always generated
from the zone data, never baked into artwork, so multipliers remain
editable data. When an enemy has no images yet, the stage falls back to a
generic dummy figure with the same layer structure. The demo (§03) selects
enemies via a dropdown driven by this same record shape.

## 13. Weapon builder + A/B comparison

`src/weapon-builder.mjs` (pure, data injected from resources/game-data/):

- A **build** = weapon class + tier (1–7) + rarity + optional element +
  perk picks with rolled values. Purpose: assemble a weapon you looted
  (as a module) *before* fabricating it, or design a target build.
- **Validation** enforces only what's documented: Common = no perks /
  no element; picks must be in the class's published pool. Unpublished
  pools (spears, sickles, staffs) accept picks with a warning.
- **Damage estimation** uses the published scaling rule: crossbows ≈ 1×
  and long swords ≈ 2× player level give point estimates (flagged
  approximate); all other classes estimate as a level–2×level range.
- **Perk math** (expected value): %-damage perks multiply; proc perks
  use chance × (multiple − 1); context perks (Throw/Stab Damage) apply
  only in their context; Reload applies the official −7.5%/tier under a
  flagged assumption (rolled +shots = tiers). Utility perks are listed,
  never folded into damage; Poison is excluded (damage unpublished).
- **compareBuilds(A, B, enemy)** produces the per-zone side-by-side used
  in the demo's mob dummy window, with per-zone winners and a win count.
  Unknown enemy multipliers stay null end-to-end.

**Owner update (2026-10-20 eve) — placeholder framing + dev-team inputs.**
"Megamage" is the owner's placeholder joke: the enemy is the **Ubermage**.
All hitbox figures in this package are **owner-observed and explicitly not
certain**. The recipient dev team already holds the game's real statistics;
this package's job is to leave a correctly-shaped input slot plus a clear
question for every missing value — see `devTeamDataRequests` in
`resources/game-data/enemies.json` (36 open questions at time of writing)
and each record's `dataNeeded` list. Owner-observed data so far: Ubermage
head ×3 / torso ×2 / legs ×3; Zombie zones arms/torso/legs(?)/head with
head the only viable damage zone and arms removable via blade blocks;
Skeleton zones arms/torso/head/legs (believed, unconfirmed); Knight torso
×0.01 with face multiplier unknown; Octoculus ('ghosts'/'eyeballs') "1
hitbox ×8"; Wasps a single hitbox ×1.
