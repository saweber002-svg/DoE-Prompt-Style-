import type { Build, Target, HitOutcome, ResultState, FactorBreakdown, Pattern } from './types';
import {
  attackPowerFactor, throwDamageFactor, stabFactor, powerPullbackFactor, handlingFactor,
  mightFactor, pierceFactor, ringFactor, ringSum, conditionalRingFactor, zoneFactor,
  CRIT_MULT, EXO_CRIT_MULT_BASE, FIRE_MULT_BASE, EXPLOSION_MULT_BASE
} from './factors';
import { getPools, enumeratePatterns } from './probability';

const SUNDERING = 'Sundering / Armor Penetration';
const SCOUTS = "Scout's Signet / Precision Shot";
const PREDATOR = 'Predator / Critical Strike';
const VENOM = 'Venom Fang / Toxic Amplifier';
const BREAKERS = "Breaker's Band / Stagger Mastery";
const BACKSTAB = 'Shadow Strike / Backstab';

export function evaluateHit(build: Build, target: Target): HitOutcome {
  // Conflict: Backstab + Scout's never stack (the only documented non-stack).
  const hasBackstab = build.rings.some(r => r.name?.includes('Shadow Strike') || r.name?.includes('Backstab'));
  const hasScouts = build.rings.some(r => r.name?.includes("Scout's") || r.name?.includes('Precision Shot'));
  if (hasBackstab && hasScouts) {
    const conflict: ResultState = { kind: 'conflict', reason: "Backstab and Scout's Signet do not stack" };
    return {
      floor: conflict, expected: conflict, ceiling: conflict,
      ceilingFrequency: null, patterns: [], breakdown: [], firstStrikeApplied: false
    };
  }

  const zoneF = zoneFactor(target.zone?.multiplier ?? null);

  // Always-on and conditional factors (docs/02 factor chain).
  const ap = attackPowerFactor(build);
  const throwDmg = throwDamageFactor(build);
  const stab = stabFactor(build);
  const pp = powerPullbackFactor(build);
  const handling = handlingFactor(build);
  const might = mightFactor(build);
  const pierce = pierceFactor(build);

  const sundering = ringFactor(build.rings, SUNDERING);   // (1 + x + y) | null
  const scouts = ringFactor(build.rings, SCOUTS);         // (1 + x + y) | null
  const predatorSum = ringSum(build.rings, PREDATOR);     // raw sum for crit factors | null
  const venom = conditionalRingFactor(build.rings, VENOM, build.situations.targetPoisoned);
  const breakers = conditionalRingFactor(build.rings, BREAKERS, build.situations.targetStaggered);
  const backstab = conditionalRingFactor(build.rings, BACKSTAB, build.situations.fromBehind);

  // Effective proc pools (ranged cap applied inside getPools).
  const pools = getPools(
    build.attackType === 'shot',
    build.element === 'Fire',
    build.weaponPerks.includes('Explosions') || build.weaponPerks.includes('Area Damage'),
    build.weaponPerks.includes('Criticals'),
    build.exo.exoCriticals,
  );
  const poolIds = new Set(pools.map(p => p.id));
  const hasWCrit = poolIds.has('weaponCriticals');
  const hasECrit = poolIds.has('exoCriticals');
  const hasFire = poolIds.has('elementFire');
  const hasExpl = poolIds.has('explosionsOrArea');

  // Predator's unknown value matters only when a crit factor exists.
  const predatorUnknown = predatorSum === null && (hasWCrit || hasECrit);
  const hasUnknown =
    sundering === null || scouts === null || predatorUnknown ||
    venom.unknown || breakers.unknown || backstab.unknown || zoneF === null;

  const knownBase =
    build.baseDamage * ap * throwDmg * stab * pp * handling * might * pierce *
    (sundering ?? 1) * (scouts ?? 1) * venom.factor * breakers.factor * backstab.factor *
    (zoneF ?? 1);
  const known = hasUnknown ? null : knownBase;

  const unknown: ResultState = { kind: 'unknown', reason: 'ring value or zone unknown' };
  const asResult = (v: number | null): ResultState =>
    v === null ? unknown : { kind: 'number', value: v };

  // Patterns: full enumeration over the effective pools.
  const patternsRaw = enumeratePatterns(pools);
  let expectedDamage = 0;
  const patterns: Pattern[] = patternsRaw.map(p => {
    let m = 1;
    pools.forEach((pool, i) => {
      if (!p.procced[i]) return;
      if (pool.id === 'weaponCriticals') m *= CRIT_MULT + (predatorSum ?? 0);
      else if (pool.id === 'exoCriticals') m *= EXO_CRIT_MULT_BASE + (predatorSum ?? 0);
      else if (pool.id === 'elementFire') m *= FIRE_MULT_BASE;
      else if (pool.id === 'explosionsOrArea') m *= EXPLOSION_MULT_BASE;
    });
    const dmg = known === null ? null : known * m;
    if (dmg !== null) expectedDamage += dmg * p.probability;
    return {
      procced: p.procced,
      probability: p.probability,
      multiplier: m,
      damage: asResult(dmg),
    };
  });

  let ceilingMult = 1;
  if (hasWCrit) ceilingMult *= CRIT_MULT + (predatorSum ?? 0);
  if (hasECrit) ceilingMult *= EXO_CRIT_MULT_BASE + (predatorSum ?? 0);
  if (hasFire) ceilingMult *= FIRE_MULT_BASE;
  if (hasExpl) ceilingMult *= EXPLOSION_MULT_BASE;

  let floor: ResultState = asResult(known);
  let expected: ResultState = asResult(known === null ? null : expectedDamage);
  let ceiling: ResultState = asResult(known === null ? null : known * ceilingMult);

  const ceilingFrequency = patterns.find(p => p.procced.every(Boolean))?.probability ?? null;

  // First strike (×3 vs unaware) applies outside the chain (docs/02).
  if (build.situations.firstStrike) {
    if (floor.kind === 'number') floor = { kind: 'number', value: floor.value * 3 };
    if (expected.kind === 'number') expected = { kind: 'number', value: expected.value * 3 };
    if (ceiling.kind === 'number') ceiling = { kind: 'number', value: ceiling.value * 3 };
  }

  const breakdown: FactorBreakdown[] = [
    { name: 'Attack Power', multiplier: ap, active: ap > 1 },
    { name: 'Throw Damage', multiplier: throwDmg, active: throwDmg > 1 },
    { name: 'Stab', multiplier: stab, active: stab > 1 },
    { name: 'Power/Pullback', multiplier: pp, active: pp > 1 },
    { name: 'Sundering', multiplier: sundering, active: sundering !== null && sundering > 1 },
    { name: "Scout's Signet", multiplier: scouts, active: scouts !== null && scouts > 1 },
    { name: 'Venom Fang', multiplier: venom.unknown ? null : venom.factor, active: venom.factor > 1 },
    { name: "Breaker's Band", multiplier: breakers.unknown ? null : breakers.factor, active: breakers.factor > 1 },
    { name: 'Backstab', multiplier: backstab.unknown ? null : backstab.factor, active: backstab.factor > 1 },
    { name: 'Might', multiplier: might, active: might > 1 },
    { name: 'Pierce', multiplier: pierce, active: pierce > 1 },
    { name: 'Handling', multiplier: handling, active: handling !== 1 },
    { name: 'Zone', multiplier: zoneF, active: zoneF !== null && zoneF !== 1 },
  ];

  return {
    floor,
    expected,
    ceiling,
    ceilingFrequency,
    patterns,
    breakdown,
    firstStrikeApplied: build.situations.firstStrike
  };
}
