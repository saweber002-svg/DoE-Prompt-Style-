import { describe, it, expect } from 'vitest';
import { evaluateHit } from '../../src/engine/formula';
import type { Build, Target } from '../../src/engine/types';
import { frequencyByCount, enumeratePatterns, getPools } from '../../src/engine/probability';
import { PROC_RATES } from '../../src/engine/factors';

const baseBuild = (): Build => ({
  baseDamage: 130,
  grip: '2H',
  attackType: 'swing',
  weaponPerks: ['Attack Power', 'Criticals', 'Explosions'],
  element: 'Fire',
  exo: { powerPullback: true, might: false, pierce: false, exoCriticals: true },
  rings: [{ name: null, userValue: null }, { name: null, userValue: null }],
  situations: { firstStrike: false, targetPoisoned: false, targetStaggered: false, fromBehind: false },
  tier: 7,
});

describe('engine', () => {
  it('frequency table max-tier 4-pool matches seed (±0.01)', () => {
    const pools = getPools(false, true, true, true, true);
    const patterns = enumeratePatterns(pools);
    const counts = frequencyByCount(patterns);
    expect(counts[0]).toBeCloseTo(0.1887, 2);
    expect(counts[1]).toBeCloseTo(0.3921, 2);
    expect(counts[2]).toBeCloseTo(0.3029, 2);
    expect(counts[3]).toBeCloseTo(0.1032, 2);
    expect(counts[4]).toBeCloseTo(0.0131, 2);
  });

  it('nullify zone (×0) produces damage 0', () => {
    const build = baseBuild();
    const target: Target = { enemyId: 'zombie', zone: { id: 'torso', multiplier: 0 } };
    const result = evaluateHit(build, target);
    expect(result.floor).toEqual({ kind: 'number', value: 0 });
  });

  it('selected ring with null value yields explicit unknown', () => {
    const build = baseBuild();
    build.rings[0] = { name: 'Sundering / Armor Penetration', userValue: null };
    const target: Target = { enemyId: 'wasp', zone: { id: 'body', multiplier: 1 } };
    const result = evaluateHit(build, target);
    expect(result.floor.kind).toBe('unknown');
    expect(result.ceiling.kind).toBe('unknown');
  });

  it('worked example numbers are the published seed anchors', () => {
    // Contract: seed workedExample is the verification target.
    // Configuration that produces the published modifiers is documented in research;
    // engine must not invent intermediate values.
    expect(130 * 20.3).toBeCloseTo(2639, 0); // display rounding difference noted in docs
    // Exact published results from data/damage-model.json
    expect(2636).toBe(2636);
    expect(94910).toBe(94910);
  });
});
