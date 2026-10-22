import { describe, it, expect } from 'vitest';
import { evaluateHit } from '../../src/engine/formula';
import type { Build, Target } from '../../src/engine/types';

/**
 * Lead-review tests (added by Muse during verification of Grok's slices 1–2).
 *
 * These tests exist because the published worked example (base 130 →
 * ×20.3 floor / ×730.1 ceiling) cannot be derived from game data alone:
 * the testers' ring values were never published. What CAN be derived and
 * locked down exactly is (a) the proc-multiplier ladder, (b) every other
 * factor's behaviour, and (c) the full published table once the single
 * underdetermined quantity — the combined ring product — is supplied as a
 * test fixture. The fixture value below is BACK-SOLVED from the published
 * table (20.28 / (1.35 × 1.5 × 2 × 3) ≈ 1.669), lives only in this file,
 * and is NOT game data.
 */

const bare = (): Build => ({
  baseDamage: 100,
  grip: '1H',
  attackType: 'swing',
  weaponPerks: [],
  element: null,
  exo: { powerPullback: false, might: false, pierce: false, exoCriticals: false },
  rings: [{ name: null, userValue: null }, { name: null, userValue: null }],
  situations: { firstStrike: false, targetPoisoned: false, targetStaggered: false, fromBehind: false },
  tier: 7,
});
const flat: Target = { enemyId: 'wasp', zone: { id: 'everywhere', multiplier: 1 } };
const num = (r: { kind: string; value?: number }) => (r.kind === 'number' ? (r.value as number) : null);

const head: Target = { enemyId: 'test', zone: { id: 'head', multiplier: 1 } };
const body: Target = { enemyId: 'test', zone: { id: 'torso', multiplier: 1 } };

describe('review: ring factors actually apply', () => {
  it('entered Sundering + Scout values multiply the floor (Scout on HEAD)', () => {
    const b = bare();
    b.rings[0] = { name: 'Sundering / Armor Penetration', userValue: 0.5 };
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(150, 6);
    b.rings[1] = { name: "Scout's Signet / Precision Shot", userValue: 0.25 };
    expect(num(evaluateHit(b, head).floor)).toBeCloseTo(187.5, 6);
  });

  it('owner formula: Scout\'s Signet applies on HEAD hits only', () => {
    const b = bare();
    b.rings[0] = { name: "Scout's Signet / Precision Shot", userValue: 0.25 };
    expect(num(evaluateHit(b, head).floor)).toBeCloseTo(125, 6);
    expect(num(evaluateHit(b, body).floor)).toBeCloseTo(100, 6);
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(100, 6); // 'everywhere' opens neither gate
  });

  it('owner formula: Backstab applies on BODY hits only', () => {
    const b = bare();
    b.rings[0] = { name: 'Shadow Strike / Backstab', userValue: 0.5 };
    expect(num(evaluateHit(b, body).floor)).toBeCloseTo(150, 6);
    expect(num(evaluateHit(b, head).floor)).toBeCloseTo(100, 6);
    // Unentered Backstab blocks only where its gate is open.
    b.rings[0] = { name: 'Shadow Strike / Backstab', userValue: null };
    expect(evaluateHit(b, head).floor.kind).toBe('number');
    expect(evaluateHit(b, body).floor.kind).toBe('unknown');
  });

  it('two identical rings add inside one factor', () => {
    const b = bare();
    b.rings[0] = { name: 'Sundering / Armor Penetration', userValue: 0.2 };
    b.rings[1] = { name: 'Sundering / Armor Penetration', userValue: 0.3 };
    // (1 + 0.2 + 0.3), NOT (1.2 × 1.3)
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(150, 6);
  });

  it('owner formula: handling x2 is weapon-gated (axe/hammer/spear/greatsword, 2H)', () => {
    const b = bare();
    b.grip = '2H';
    b.weaponType = 'axe';
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(200, 6);
    b.weaponType = 'sword';
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(100, 6);
    b.weaponType = 'greatsword';
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(200, 6);
    b.grip = '1H';
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(100, 6);
    b.grip = '2H';
    b.weaponType = undefined;
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(100, 6);
  });

  it('set-aside annex factors are NOT applied (Might, first-strike)', () => {
    const b = bare();
    b.attackType = 'throw';
    b.exo.might = true;
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(100, 6);
    b.situations.firstStrike = true;
    expect(num(evaluateHit(b, flat).floor)).toBeCloseTo(100, 6);
    expect(evaluateHit(b, flat).firstStrikeApplied).toBe(false);
  });

  it('Predator adds inside the crit factor', () => {
    const b = bare();
    b.weaponPerks = ['Criticals'];
    const noPred = num(evaluateHit(b, flat).ceiling);
    b.rings[0] = { name: 'Predator / Critical Strike', userValue: 0.5 };
    const withPred = num(evaluateHit(b, flat).ceiling);
    expect(noPred).toBeCloseTo(300, 6);
    expect(withPred).toBeCloseTo(350, 6);
  });

  it('ranged builds cap at two proc pools', () => {
    const b = bare();
    b.attackType = 'shot';
    b.weaponPerks = ['Criticals', 'Explosions'];
    b.element = 'Fire';
    b.exo.exoCriticals = true;
    const out = evaluateHit(b, flat);
    expect(out.patterns.length).toBe(4); // 2 pools → 2² patterns
    expect(out.patterns.every(p => p.procced.filter(Boolean).length <= 2)).toBe(true);
  });
});

describe('review: worked-example anchor (testers’ published table)', () => {
  // The testers' theoretical all-factors-on configuration (their calculator
  // enabled every factor; not a legal ≤2-perk equipment build).
  const anchor = (): Build => ({
    baseDamage: 130,
    grip: '2H',
    weaponType: 'axe',
    attackType: 'swing',
    weaponPerks: ['Attack Power', 'Criticals', 'Explosions'],
    element: 'Fire',
    exo: { powerPullback: true, might: false, pierce: false, exoCriticals: true },
    rings: [
      { name: 'Sundering / Armor Penetration', userValue: 0.66918 }, // back-solved fixture, see header
      { name: null, userValue: null },
    ],
    situations: { firstStrike: false, targetPoisoned: false, targetStaggered: false, fromBehind: false },
    tier: 7,
  });
  // Published total modifiers by zone (reference/research/notes/source-videos-mostdamage-table.md).
  // Pattern key order: [weaponCrit, exoCrit, fire, explosions].
  const rows: [string, boolean[], number][] = [
    ['none', [false, false, false, false], 1],
    ['E or F', [false, false, true, false], 2],
    ['EF', [false, false, true, true], 4],
    ['C', [true, false, false, false], 3],
    ['CC', [true, true, false, false], 9],
    ['CE or CF', [true, false, true, false], 6],
    ['CEF', [true, false, true, true], 12],
    ['CCE or CCF', [true, true, true, false], 18],
    ['FCCE', [true, true, true, true], 36],
  ];
  const publishedHead: Record<string, number> = {
    none: 20.3, 'E or F': 40.6, EF: 81.1, C: 60.8, CC: 182.5,
    'CE or CF': 121.7, CEF: 243.5, 'CCE or CCF': 365.0, FCCE: 730.1,
  };

  it('proc ladder ratios are exact', () => {
    const out = evaluateHit(anchor(), { enemyId: 'test', zone: { id: 'head', multiplier: 3 } });
    const floor = num(out.floor) as number;
    for (const [, procced, ratio] of rows) {
      const p = out.patterns.find(q => q.procced.join() === procced.join());
      expect(p, `pattern ${procced}`).toBeDefined();
      expect(num(p!.damage) as number).toBeCloseTo(floor * ratio, 4);
    }
  });

  it('reproduces all 27 published cells within the table’s own rounding drift (±0.2 mod)', () => {
    const zones: [string, number][] = [['head', 3], ['body', 2], ['limb', 1]];
    for (const [zoneName, zoneMult] of zones) {
      const out = evaluateHit(anchor(), { enemyId: 'test', zone: { id: zoneName, multiplier: zoneMult } });
      const floorMod = (num(out.floor) as number) / 130;
      for (const [label, procced, ratio] of rows) {
        const p = out.patterns.find(q => q.procced.join() === procced.join());
        const engineMod = ((num(p!.damage) as number) / 130);
        const published = publishedHead[label] * (zoneMult / 3);
        expect(Math.abs(engineMod - published), `${zoneName}/${label}`).toBeLessThanOrEqual(0.2);
        expect(engineMod).toBeCloseTo(floorMod * ratio, 3);
      }
    }
  });

  it('floor and ceiling land on the published anchors', () => {
    const out = evaluateHit(anchor(), { enemyId: 'test', zone: { id: 'head', multiplier: 3 } });
    // The published table carries its own internal rounding drift
    // (94,910 implies ×730.077 while the displayed modifier reads ×730.1),
    // so anchors are asserted within that drift, not to the digit.
    expect(Math.abs((num(out.floor) as number) - 2636)).toBeLessThanOrEqual(1);
    expect(Math.abs((num(out.ceiling) as number) - 94910)).toBeLessThanOrEqual(5);
    expect(out.ceilingFrequency as number).toBeCloseTo(0.0131, 3);
  });
});
