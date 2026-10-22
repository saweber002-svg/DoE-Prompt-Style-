import type { Build, RingSlot } from './types';

// All constants below are taken from data/damage-model.json (canonical seed):
// pctPerkByTier / chancePerkByTier (weapon perks), Stab Damage flatPct,
// EXO Power/Pullback maxedValue, EXO Criticals chance, crit multipliers.
const PCT_BY_TIER = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];
const MAX_TIER_CHANCE = 0.32;
const STAB_FLAT = 0.5;
const POWER_PULLBACK = 0.5;
const EXO_CRIT_CHANCE = 0.4;
const EXO_CRIT_MULT = 3;
const WEAPON_CRIT_MULT = 3;
const FIRE_MULT = 2;
const EXPLOSION_MULT = 2;

export function attackPowerFactor(build: Build): number {
  if (!build.weaponPerks.includes('Attack Power')) return 1;
  return 1 + PCT_BY_TIER[build.tier - 1];
}

export function stabFactor(build: Build): number {
  if (!build.weaponPerks.includes('Stab Damage')) return 1;
  if (build.attackType !== 'thrust') return 1;
  return 1 + STAB_FLAT;
}

export function powerPullbackFactor(build: Build): number {
  return build.exo.powerPullback ? 1 + POWER_PULLBACK : 1;
}

const HANDLING_WEAPONS = ['axe', 'hammer', 'spear', 'greatsword'];

export function handlingFactor(build: Build): number {
  // Owner formula (canonical): two-hand handling ×2 ONLY for
  // axe / hammer / spear / greatsword. Any other type, one hand, or an
  // unspecified weapon type earns no handling factor.
  if (build.grip !== '2H') return 1;
  return HANDLING_WEAPONS.includes(build.weaponType ?? '') ? 2 : 1;
}

/** Zone class from a zone id (owner formula gates rings by HEAD / BODY). */
export function zoneClassOf(zoneId: string | null | undefined): 'head' | 'body' | 'everywhere' {
  const id = (zoneId ?? '').toLowerCase();
  if (id === 'head' || id === 'face') return 'head';
  if (id === 'everywhere') return 'everywhere';
  return 'body';
}

/**
 * Factor for a ring group whose copies add inside one (1 + x + y) factor.
 * Returns 1 when no matching ring is equipped, null when a matching ring
 * is selected but its value is unentered (unknown — never coerced).
 */
export function ringFactor(slots: [RingSlot, RingSlot], ringName: string): number | null {
  const matching = slots.filter(s => s.name === ringName);
  if (matching.length === 0) return 1;
  if (matching.some(s => s.userValue === null)) return null;
  const sum = matching.reduce((a, s) => a + (s.userValue as number), 0);
  return 1 + sum;
}

/**
 * Raw additive sum for rings that add inside another factor
 * (Predator adds inside each crit factor: (3 + p + p)).
 * Returns 0 when not equipped, null when selected but unentered.
 */
export function ringSum(slots: [RingSlot, RingSlot], ringName: string): number | null {
  const matching = slots.filter(s => s.name === ringName);
  if (matching.length === 0) return 0;
  if (matching.some(s => s.userValue === null)) return null;
  return matching.reduce((a, s) => a + (s.userValue as number), 0);
}

/**
 * Conditional rings (Venom Fang / Breaker's Band / Backstab) contribute
 * their (1 + sum) factor only while their situation holds. An unentered
 * value blocks results (unknown) only when the ring would actually apply.
 */
export function conditionalRingFactor(
  slots: [RingSlot, RingSlot],
  ringName: string,
  situationActive: boolean,
): { factor: number; unknown: boolean } {
  const matching = slots.filter(s => s.name === ringName);
  if (matching.length === 0) return { factor: 1, unknown: false };
  if (!situationActive) return { factor: 1, unknown: false };
  if (matching.some(s => s.userValue === null)) return { factor: 1, unknown: true };
  const sum = matching.reduce((a, s) => a + (s.userValue as number), 0);
  return { factor: 1 + sum, unknown: false };
}

export function zoneFactor(multiplier: number | null): number | null {
  return multiplier; // 0 preserved (measured nullify), null = unknown
}

export const PROC_RATES = {
  weaponCriticals: MAX_TIER_CHANCE,
  exoCriticals: EXO_CRIT_CHANCE,
  elementFire: MAX_TIER_CHANCE,
  explosionsOrArea: MAX_TIER_CHANCE,
} as const;

export const CRIT_MULT = WEAPON_CRIT_MULT;
export const EXO_CRIT_MULT_BASE = EXO_CRIT_MULT;
export const FIRE_MULT_BASE = FIRE_MULT;
export const EXPLOSION_MULT_BASE = EXPLOSION_MULT;
