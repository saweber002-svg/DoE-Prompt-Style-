import type { Build, Target, HitOutcome, ResultState, FactorBreakdown, Pattern } from './types';
import {
  attackPowerFactor, stabFactor, powerPullbackFactor, handlingFactor,
  ringFactor, ringSum, conditionalRingFactor, zoneFactor, zoneClassOf,
  CRIT_MULT, EXO_CRIT_MULT_BASE, FIRE_MULT_BASE, EXPLOSION_MULT_BASE
} from './factors';
import { getPools, enumeratePatterns } from './probability';

const SUNDERING = 'Sundering / Armor Penetration';
const SCOUTS = "Scout's Signet / Precision Shot";
const PREDATOR = 'Predator / Critical Strike';
const BACKSTAB = 'Shadow Strike / Backstab';

/**
 * Canonical damage evaluation — implements the owner's calculator formula
 * (reference/owner-calculator-formula.md, Scott 2026-10-22, owner-confirmed).
 * Research-sourced factors that are not in the owner's calculator
 * (Might, Pierce, Venom Fang, Breaker's Band, Throw Damage, first-strike)
 * are set aside in the data annex and are NOT applied here.
 */
export function evaluateHit(build: Build, target: Target): HitOutcome {
  const zoneF = zoneFactor(target.zone?.multiplier ?? null);
  const zoneClass = target.zone?.zoneClass ?? zoneClassOf(target.zone?.id);

  // Always-on factors (owner formula chain).
  const ap = attackPowerFactor(build);
  const stab = stabFactor(build);
  const pp = powerPullbackFactor(build);
  const handling = handlingFactor(build);

  const sundering = ringFactor(build.rings, SUNDERING);   // (1 + x + y) | null
  // Owner formula zone gates: headshot ring applies on HEAD hits only;
  // Backstab applies on BODY hits only. Zone-gating makes the two
  // mutually exclusive per hit by construction (no conflict state).
  const scouts = conditionalRingFactor(build.rings, SCOUTS, zoneClass === 'head');
  const backstab = conditionalRingFactor(build.rings, BACKSTAB, zoneClass === 'body');
  const predatorSum = ringSum(build.rings, PREDATOR);     // raw sum for crit factors | null

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
    sundering === null || scouts.unknown || backstab.unknown ||
    predatorUnknown || zoneF === null;

  const knownBase =
    build.baseDamage * ap * stab * pp * handling *
    (sundering ?? 1) * scouts.factor * backstab.factor *
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

  const floor: ResultState = asResult(known);
  const expected: ResultState = asResult(known === null ? null : expectedDamage);
  const ceiling: ResultState = asResult(known === null ? null : known * ceilingMult);

  const ceilingFrequency = patterns.find(p => p.procced.every(Boolean))?.probability ?? null;

  const scoutsEquipped = build.rings.some(r => r.name === SCOUTS);
  const backstabEquipped = build.rings.some(r => r.name === BACKSTAB);
  const breakdown: FactorBreakdown[] = [
    { name: 'Attack Power', multiplier: ap, active: ap > 1 },
    { name: 'Stab', multiplier: stab, active: stab > 1 },
    { name: 'Power/Pullback', multiplier: pp, active: pp > 1 },
    { name: 'Sundering', multiplier: sundering, active: sundering !== null && sundering > 1 },
    {
      name: "Scout's Signet", multiplier: scouts.unknown ? null : scouts.factor, active: scouts.factor > 1,
      note: scoutsEquipped && zoneClass !== 'head' ? 'applies on HEAD hits only (owner formula)' : undefined,
    },
    {
      name: 'Backstab', multiplier: backstab.unknown ? null : backstab.factor, active: backstab.factor > 1,
      note: backstabEquipped && zoneClass !== 'body' ? 'applies on BODY hits only (owner formula)' : undefined,
    },
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
    // First-strike is set aside (research annex) — not applied by the
    // canonical engine.
    firstStrikeApplied: false
  };
}
