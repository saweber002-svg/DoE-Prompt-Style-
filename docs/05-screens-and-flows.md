# 05 — Screens & flows

Design language for all screens: `docs/06-design-system.md` (Approach B). Governing mockups in `reference/mockups/` — each screen names its own. Mockup text/numbers are **dressing, not data**: wherever a mockup shows DPS, TTK, hit-probability, resists, or abilities, that content does not exist in the real design and must not be built.

## Navigation (main menu — mockup `b-main-menu.webp`)

Sandbox · The Chain · Perk Library · EXO Suit · Rings · Enemies · Combos · Lab Notes.

## Sandbox (mockups `approach-b-sandbox.webp`, `b2-sandbox-skeleton-warrior.webp`)

The core screen. Three panes on desktop (Build / Target / Results); stacked on mobile with a sticky results bar.

- **Build (in formula order):** base damage input → grip (1H/2H) + attack type (swing/thrust/throw/shot) → 2 perk slots + element → EXO toggles → 2 ring slots (value fields, `?` until user-entered) → situation toggles (first strike / target poisoned / target staggered / from behind).
- **Target:** enemy figure on the pedestal/arena presentation, tappable zones with the tint system (`docs/04`); **Roll a hit** and **Roll 100** simulator.
- **Results:** ThreeNumbers (Floor / Expected / Ceiling + frequency), the FactorChain strip lighting/dimming per state, proc pip row, waterfall contribution list, 5-segment distribution bar, build snapshot save for **A/B compare**.
- Default target: **Wasp** (flat baseline). Teaching target: **Skeleton Warrior**.

## Enemy Select + Detail (`b2-enemy-select.webp`, `b2-target-*.webp`)

- Roster cards use the **real captures** (`reference/mob-images/`) — likeness is a hard requirement, not a style preference.
- Detail page = big figure with zone tints + zone rows. One page exists per roster enemy: Doomer, Skeleton Boss, Zombie, Wasp, Octoculus, Uber Mage (+ Skeleton Warrior in the sandbox mockup). Mimic = silhouette + `?`.
- Detail pages show **zones and only zones** — no resists/abilities/threat stats (the game has none that are published; mockups that show them are dressing).

## Combos (`b-combos.webp`)

16-pattern pip grid (4 pools) with real frequencies from `docs/02`; 5-segment bar on top; melee/ranged toggle greys out 3- and 4-proc patterns for ranged (2-proc cap). The full-house card gets the hero treatment. Summary rail = pattern count / expected multiplier / expected damage — **not** DPS.

## Perk Library · EXO Suit Board · Rings Vault

- **Perk Library:** card deck of the canonical perks (`docs/03`) with tier tables (7 tiers), eligibility, confidence badges. Excluded perks appear in a clearly-marked appendix, never mixed into the deck.
- **EXO Board:** the in-room point board reimagined — 4 slot columns (Mind/Chest/Arms/Legs), damage perks functional, per-level values shown as `?` (unknown), non-damage perks name-only.
- **Rings Vault** (`b-rings-vault.webp`): equipped L/R rings in sigil circles; collection grid; detail panel whose value field is an engraved `?` until the user types the value printed on their physical ring; crypt sigil-code strip as decoration-with-purpose (codes are how rings are found).

## The Chain (guide)

The formula as a walkable explainer: each factor group gets a plain-language page + a "try it" deep link that loads a preset build into the Sandbox. Carries the interaction rules (fire priority, non-stack, enablers) from `docs/02`.

## Lab Notes

Every unknown from `docs/07` as a measurement task card: what's unknown, why it matters, how to measure it in-game (damage numbers display is in the game since Sept 2026), and where the answer lands in the data files when captured. This screen is the app's honesty engine — it converts gaps into a roadmap instead of hiding them.
