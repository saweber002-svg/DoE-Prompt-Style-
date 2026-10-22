import { PROC_RATES } from './factors';

export interface Pool {
  id: 'weaponCriticals' | 'exoCriticals' | 'elementFire' | 'explosionsOrArea';
  rate: number;
}

export function getPools(isRanged: boolean, hasFire: boolean, hasExplosions: boolean, hasWeaponCrit: boolean, hasExoCrit: boolean): Pool[] {
  const pools: Pool[] = [];
  if (hasWeaponCrit) pools.push({ id: 'weaponCriticals', rate: PROC_RATES.weaponCriticals });
  if (hasExoCrit) pools.push({ id: 'exoCriticals', rate: PROC_RATES.exoCriticals });
  if (hasFire) pools.push({ id: 'elementFire', rate: PROC_RATES.elementFire });
  if (hasExplosions) pools.push({ id: 'explosionsOrArea', rate: PROC_RATES.explosionsOrArea });
  if (isRanged) {
    // cap at 2 proc perks — but enumeration still lists; caller filters
  }
  return pools;
}

export function enumeratePatterns(pools: Pool[]): { mask: number; procced: boolean[]; probability: number }[] {
  const n = pools.length;
  const results = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    const procced = pools.map((_, i) => (mask & (1 << i)) !== 0);
    let prob = 1;
    for (let i = 0; i < n; i++) {
      prob *= procced[i] ? pools[i].rate : (1 - pools[i].rate);
    }
    results.push({ mask, procced, probability: prob });
  }
  return results;
}

export function frequencyByCount(patterns: { procced: boolean[]; probability: number }[]): number[] {
  const max = Math.max(0, ...patterns.map(p => p.procced.filter(Boolean).length));
  const counts = Array(max + 1).fill(0);
  for (const p of patterns) {
    const c = p.procced.filter(Boolean).length;
    counts[c] += p.probability;
  }
  return counts;
}
