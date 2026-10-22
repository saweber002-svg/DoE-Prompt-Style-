import type { Build, RingSlot } from './types';

const MAX_TIER_PCT = 0.35;
const MAX_TIER_CHANCE = 0.32;
const STAB_FLAT = 0.5;
const POWER_PULLBACK = 0.5;
const EXO_CRIT_CHANCE = 0.4;
const EXO_CRIT_MULT = 3;
const WEAPON_CRIT_MULT = 3;
const FIRE_MULT = 2;
const EXPLOSION_MULT = 2;

export function attackPowerFactor(build: Build): number {
  const has = build.weaponPerks.includes('Attack Power');
  if (!has) return 1;
  const tiers = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];
  return 1 + tiers[build.tier - 1];
}

export function stabFactor(build: Build): number {
  const has = build.weaponPerks.includes('Stab Damage');
  const isStab = build.attackType === 'thrust' || build.attackType === 'stab' as any;
  if (!has || !isStab) return 1;
  return 1 + STAB_FLAT;
}

export function powerPullbackFactor(build: Build): number {
  return build.exo.powerPullback ? 1 + POWER_PULLBACK : 1;
}

export function handlingFactor(build: Build): number {
  if (build.grip === '2H') return 2;
  if (build.attackType === 'thrust' && build.weaponPerks.some(p => p.toLowerCase().includes('dagger'))) return 1.5;
  return 1;
}

export function mightFactor(build: Build): number {
  return build.exo.might && build.attackType === 'throw' ? 2 : 1;
}

export function pierceFactor(build: Build): number {
  return build.exo.pierce && (build.attackType === 'thrust') ? 2 : 1;
}

export function ringFactor(slots: [RingSlot, RingSlot], ringName: string): number | null {
  const matching = slots.filter(s => s.name === ringName);
  if (matching.length === 0) return 1;
  const values = matching.map(s => s.userValue);
  if (values.some(v => v === null)) return null; // unknown
  const sum = values.reduce((a, b) => a! + (b ?? 0), 0);
  return 1 + sum;
}

export function zoneFactor(multiplier: number | null): number | null {
  return multiplier; // 0 preserved, null = unknown
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
