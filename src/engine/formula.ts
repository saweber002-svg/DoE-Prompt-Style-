import type { Build, Target, HitOutcome, ResultState, FactorBreakdown, Pattern } from './types';
import {
  attackPowerFactor, stabFactor, powerPullbackFactor, handlingFactor,
  mightFactor, pierceFactor, ringFactor, zoneFactor,
  CRIT_MULT, EXO_CRIT_MULT_BASE, FIRE_MULT_BASE, EXPLOSION_MULT_BASE
} from './factors';
import { getPools, enumeratePatterns } from './probability';

function asNumber(r: ResultState): number | null {
  return r.kind === 'number' ? r.value : null;
}

export function evaluateHit(build: Build, target: Target): HitOutcome {
  // Conflict: Backstab + Scout's never stack
  const hasBackstab = build.rings.some(r => r.name?.includes('Shadow Strike') || r.name?.includes('Backstab'));
  const hasScouts = build.rings.some(r => r.name?.includes("Scout's") || r.name?.includes('Precision Shot'));
  if (hasBackstab && hasScouts) {
    const conflict: ResultState = { kind: 'conflict', reason: 'Backstab and Scout\'s Signet do not stack' };
    return {
      floor: conflict, expected: conflict, ceiling: conflict,
      ceilingFrequency: null, patterns: [], breakdown: [], firstStrikeApplied: false
    };
  }

  const zoneMult = target.zone?.multiplier ?? null;
  const zoneF = zoneFactor(zoneMult);

  // Always-on factors
  const ap = attackPowerFactor(build);
  const stab = stabFactor(build);
  const pp = powerPullbackFactor(build);
  const handling = handlingFactor(build);
  const might = mightFactor(build);
  const pierce = pierceFactor(build);

  const sundering = ringFactor(build.rings, 'Sundering / Armor Penetration');
  const scouts = ringFactor(build.rings, "Scout's Signet / Precision Shot");
  const predator = ringFactor(build.rings, 'Predator / Critical Strike');

  const hasUnknownRing = [sundering, scouts, predator].some(v => v === null);

  const baseAlways = build.baseDamage * ap * stab * pp * handling * might * pierce;
  const zoneApplied = zoneF === null ? null : baseAlways * zoneF;

  const floorRaw = zoneApplied;
  const floor: ResultState = hasUnknownRing || floorRaw === null
    ? { kind: 'unknown', reason: 'ring value or zone unknown' }
    : { kind: 'number', value: floorRaw };

  // Proc pools
  const hasFire = build.element === 'Fire';
  const hasExpl = build.weaponPerks.includes('Explosions') || build.weaponPerks.includes('Area Damage');
  const hasWCrit = build.weaponPerks.includes('Criticals');
  const hasECrit = build.exo.exoCriticals;
  const isRanged = build.attackType === 'shot';

  const pools = getPools(isRanged, hasFire, hasExpl, hasWCrit, hasECrit);
  const patternsRaw = enumeratePatterns(pools);

  // For ceiling: all procs
  let ceilingMult = 1;
  if (hasFire) ceilingMult *= FIRE_MULT_BASE;
  if (hasExpl) ceilingMult *= EXPLOSION_MULT_BASE;
  if (hasWCrit) ceilingMult *= (CRIT_MULT + (predator ?? 0));
  if (hasECrit) ceilingMult *= (EXO_CRIT_MULT_BASE + (predator ?? 0));

  const ceilingRaw = zoneApplied === null ? null : zoneApplied * ceilingMult;
  const ceiling: ResultState = hasUnknownRing || ceilingRaw === null
    ? { kind: 'unknown', reason: 'ring value or zone unknown' }
    : { kind: 'number', value: ceilingRaw };

  // Expected: probability-weighted (linearity on independent rolls)
  let expectedMult = 1;
  if (hasFire) expectedMult *= (1 + PROC_RATES_FIRE * (FIRE_MULT_BASE - 1)); // approximate; full enum better
  // Full enumeration for accuracy
  let expectedDamage = 0;
  let totalProb = 0;
  const patterns: Pattern[] = patternsRaw.map(p => {
    let m = 1;
    // map procced to factors (order depends on pools)
    // Simplified: apply based on which pools exist
    let idx = 0;
    if (hasWCrit) { if (p.procced[idx++]) m *= (CRIT_MULT + (predator ?? 0)); }
    if (hasECrit) { if (p.procced[idx++]) m *= (EXO_CRIT_MULT_BASE + (predator ?? 0)); }
    if (hasFire) { if (p.procced[idx++]) m *= FIRE_MULT_BASE; }
    if (hasExpl) { if (p.procced[idx++]) m *= EXPLOSION_MULT_BASE; }
    const dmg = zoneApplied === null ? null : zoneApplied * m;
    if (dmg !== null) {
      expectedDamage += dmg * p.probability;
      totalProb += p.probability;
    }
    return {
      procced: p.procced,
      probability: p.probability,
      multiplier: m,
      damage: dmg === null ? { kind: 'unknown', reason: 'zone or ring' } : { kind: 'number', value: dmg }
    };
  });

  const expected: ResultState = hasUnknownRing || zoneApplied === null
    ? { kind: 'unknown', reason: 'ring value or zone unknown' }
    : { kind: 'number', value: expectedDamage };

  const ceilingFrequency = patterns.find(p => p.procced.every(Boolean))?.probability ?? null;

  // First strike outside the chain
  let floorFinal = floor;
  let expectedFinal = expected;
  let ceilingFinal = ceiling;
  if (build.situations.firstStrike && floor.kind === 'number') {
    floorFinal = { kind: 'number', value: floor.value * 3 };
    if (expected.kind === 'number') expectedFinal = { kind: 'number', value: expected.value * 3 };
    if (ceiling.kind === 'number') ceilingFinal = { kind: 'number', value: ceiling.value * 3 };
  }

  const breakdown: FactorBreakdown[] = [
    { name: 'Attack Power', multiplier: ap, active: ap > 1 },
    { name: 'Stab', multiplier: stab, active: stab > 1 },
    { name: 'Power/Pullback', multiplier: pp, active: pp > 1 },
    { name: 'Handling', multiplier: handling, active: handling !== 1 },
    { name: 'Zone', multiplier: zoneF, active: zoneF !== null && zoneF !== 1 },
  ];

  return {
    floor: floorFinal,
    expected: expectedFinal,
    ceiling: ceilingFinal,
    ceilingFrequency,
    patterns,
    breakdown,
    firstStrikeApplied: build.situations.firstStrike
  };
}

// Temporary until rates imported properly
const PROC_RATES_FIRE = 0.32;
