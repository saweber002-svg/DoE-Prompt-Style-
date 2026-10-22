/**
 * Game data — CONFIG ONLY. The dev team edits values here (or loads
 * data/config.json, which mirrors this file) without touching model logic.
 *
 * SOURCE OF TRUTH NOTE: Proc chances and hitbox multipliers below are the
 * values supplied by the project owner. Perk BONUS values are EXAMPLE
 * placeholders (all +25% so a "tier" = a count, cleanly) — the team MUST
 * replace them with verified per-perk values from the current game build
 * before shipping. See TECHNICAL_SPEC.md, Open Questions Q1–Q3.
 */

export const EXAMPLE_PERKS = [
  // Column 1 across weapon types procs at 40%; columns 2–4 at 32%.
  { id: "perk-col-1", name: "Perk — Column 1", procChance: 0.40, bonus: 0.25 },
  { id: "perk-col-2", name: "Perk — Column 2", procChance: 0.32, bonus: 0.25 },
  { id: "perk-col-3", name: "Perk — Column 3", procChance: 0.32, bonus: 0.25 },
  { id: "perk-col-4", name: "Perk — Column 4", procChance: 0.32, bonus: 0.25 },
];

export const ENEMIES = [
  {
    id: "megamage",
    name: "Megamage (placeholder — actually the Ubermage; owner-observed figures, not certain)",
    hitboxes: [
      { id: "head", name: "Head", multiplier: 3 },
      { id: "chest", name: "Chest", multiplier: 2 },
      { id: "legs", name: "Legs", multiplier: 3 },
    ],
  },
  // Template for every other enemy — same shape, team fills verified values:
  // {
  //   id: "skeleton",
  //   name: "Skeleton",
  //   hitboxes: [
  //     { id: "head", name: "Head", multiplier: 0 },
  //     { id: "chest", name: "Chest", multiplier: 0 },
  //     { id: "legs", name: "Legs", multiplier: 0 },
  //   ],
  // },
];

export const DEFAULT_BASE_DAMAGE = 100; // round example number, not a weapon stat
