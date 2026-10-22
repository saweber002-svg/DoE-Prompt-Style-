/**
 * Dungeons of Eternity — Damage Companion
 * EXAMPLE MODEL / REFERENCE IMPLEMENTATION
 * Unofficial fan project. Not affiliated with Othergate.
 *
 * Pure, engine-agnostic damage model. No UI, no I/O, no dependencies.
 * Runs identically in Node, the browser, and (ported 1:1) in TypeScript / C#.
 *
 * Core formula (EXAMPLE stacking rule — see TECHNICAL_SPEC.md §3, Open Question Q1):
 *
 *   finalDamage = baseDamage * hitboxMultiplier * (1 + sum of procced perk bonuses)
 *
 * Perk bonuses are fractions: 0.25 = +25%. Stacking is ADDITIVE in this example.
 * If the live game stacks multiplicatively, change ONLY `perkMultiplierFor()`.
 *
 * All game data (proc chances, bonuses, hitboxes) lives in config — see
 * src/config.mjs / data/config.json. Never hard-code game values in logic.
 */

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export function validatePerks(perks) {
  if (!Array.isArray(perks) || perks.length === 0) {
    throw new Error("perks must be a non-empty array");
  }
  for (const p of perks) {
    if (typeof p.id !== "string" || !p.id) throw new Error("perk.id is required");
    if (!(p.procChance >= 0 && p.procChance <= 1)) {
      throw new Error(`perk ${p.id}: procChance must be 0..1, got ${p.procChance}`);
    }
    if (typeof p.bonus !== "number" || p.bonus < 0) {
      throw new Error(`perk ${p.id}: bonus must be a number >= 0, got ${p.bonus}`);
    }
  }
  return perks;
}

export function validateEnemy(enemy) {
  if (!enemy || typeof enemy.id !== "string") throw new Error("enemy.id is required");
  if (!Array.isArray(enemy.hitboxes) || enemy.hitboxes.length === 0) {
    throw new Error(`enemy ${enemy.id}: hitboxes must be a non-empty array`);
  }
  for (const h of enemy.hitboxes) {
    if (!(h.multiplier > 0)) {
      throw new Error(`enemy ${enemy.id} zone ${h.id}: multiplier must be > 0`);
    }
  }
  return enemy;
}

// ---------------------------------------------------------------------------
// Single-hit calculation
// ---------------------------------------------------------------------------

/**
 * Multiplier contributed by a set of procced perks.
 * @param {Array} perks   full perk config
 * @param {boolean[]} procced  same length/order as perks; true = perk fired
 */
export function perkMultiplierFor(perks, procced) {
  validatePerks(perks);
  let bonusSum = 0;
  perks.forEach((perk, i) => {
    if (procced[i]) bonusSum += perk.bonus;
  });
  return 1 + bonusSum;
}

/**
 * Damage for ONE hit.
 * @returns {{finalDamage:number, perkMultiplier:number, proccedCount:number}}
 * finalDamage is unrounded — rounding is a DISPLAY concern (see formatDamage).
 */
export function calculateDamage({ baseDamage, perks, procced, hitboxMultiplier }) {
  if (!(baseDamage >= 0)) throw new Error("baseDamage must be >= 0");
  if (!(hitboxMultiplier > 0)) throw new Error("hitboxMultiplier must be > 0");
  const perkMultiplier = perkMultiplierFor(perks, procced);
  return {
    finalDamage: baseDamage * hitboxMultiplier * perkMultiplier,
    perkMultiplier,
    proccedCount: procced.filter(Boolean).length,
  };
}

/** Display formatting only. The game appears to show whole numbers; the dev
 *  team must confirm the in-game rounding rule (floor / round / ceil) — Q4. */
export function formatDamage(finalDamage) {
  return Math.round(finalDamage).toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Probability model — exact enumeration (2^n patterns; n=4 -> 16)
// ---------------------------------------------------------------------------

/** Probability of one exact on/off pattern, assuming independent rolls. */
export function patternProbability(perks, procced) {
  return perks.reduce(
    (acc, perk, i) => acc * (procced[i] ? perk.procChance : 1 - perk.procChance),
    1
  );
}

/** All 2^n patterns with probability, count, and perk multiplier. */
export function enumeratePatterns(perks) {
  validatePerks(perks);
  const n = perks.length;
  const patterns = [];
  for (let mask = 0; mask < 2 ** n; mask++) {
    const procced = perks.map((_, i) => Boolean(mask & (1 << i)));
    patterns.push({
      procced,
      proccedIds: perks.filter((_, i) => procced[i]).map((p) => p.id),
      count: procced.filter(Boolean).length,
      probability: patternProbability(perks, procced),
      perkMultiplier: perkMultiplierFor(perks, procced),
    });
  }
  return patterns.sort((a, b) => b.probability - a.probability);
}

/**
 * Probability distribution grouped by NUMBER of perks procced (0..n).
 * This is the player-readable table: 5 rows for 4 perks.
 * Verified values for 0.40 / 0.32 / 0.32 / 0.32:
 *   0: 18.87%  1: 39.21%  2: 30.29%  3: 10.32%  4: 1.31%   (sum = 100%)
 */
export function tierDistribution(perks) {
  const tiers = Array.from({ length: perks.length + 1 }, (_, count) => ({
    count,
    probability: 0,
  }));
  for (const pattern of enumeratePatterns(perks)) {
    tiers[pattern.count].probability += pattern.probability;
  }
  return tiers;
}

/** Expected number of perks procced per hit = sum of proc chances. */
export function expectedPerkCount(perks) {
  return perks.reduce((acc, p) => acc + p.procChance, 0); // 0.40+0.32*3 = 1.36
}

/**
 * Expected final damage for a given hitbox, averaged over all perk rolls.
 * Uses E[perkMultiplier] = 1 + sum(procChance_i * bonus_i) (linearity of
 * expectation, valid because rolls are independent).
 */
export function expectedDamage({ baseDamage, perks, hitboxMultiplier }) {
  const expectedPerkMultiplier =
    1 + perks.reduce((acc, p) => acc + p.procChance * p.bonus, 0);
  return baseDamage * hitboxMultiplier * expectedPerkMultiplier;
}

// ---------------------------------------------------------------------------
// Full outcome matrix — patterns x hitbox zones
// 4 perks + Megamage (3 zones) = 16 x 3 = 48 distinct outcomes,
// grouped for players as 5 tiers x 3 zones = 15 cells.
// ---------------------------------------------------------------------------

export function buildOutcomeMatrix({ baseDamage, perks, enemy }) {
  validateEnemy(enemy);
  const rows = [];
  for (const pattern of enumeratePatterns(perks)) {
    for (const zone of enemy.hitboxes) {
      const { finalDamage } = calculateDamage({
        baseDamage,
        perks,
        procced: pattern.procced,
        hitboxMultiplier: zone.multiplier,
      });
      rows.push({
        procced: pattern.procced,
        proccedIds: pattern.proccedIds,
        count: pattern.count,
        probability: pattern.probability, // hitbox choice is aim, not chance
        zoneId: zone.id,
        zoneName: zone.name,
        hitboxMultiplier: zone.multiplier,
        perkMultiplier: pattern.perkMultiplier,
        finalDamage,
      });
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Simulator — Monte Carlo check of the exact math (for the guide UI + tests)
// rng is injectable so tests can be deterministic.
// ---------------------------------------------------------------------------

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function simulate({ perks, rolls = 1000, rng = Math.random }) {
  validatePerks(perks);
  const tierCounts = Array(perks.length + 1).fill(0);
  for (let r = 0; r < rolls; r++) {
    const count = perks.reduce((acc, p) => acc + (rng() < p.procChance ? 1 : 0), 0);
    tierCounts[count]++;
  }
  return tierCounts.map((hits, count) => ({
    count,
    hits,
    observed: rolls === 0 ? 0 : hits / rolls,
  }));
}
