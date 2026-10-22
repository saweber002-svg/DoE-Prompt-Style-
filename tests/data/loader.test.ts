import { describe, it, expect } from 'vitest';
import { loadDamageModel, loadEnemies, validateDamageModel, validateEnemies } from '../../src/data/loader';

describe('seed loader', () => {
  it('loads damage model with schema integrity', () => {
    const dm = loadDamageModel();
    expect(dm.$schema).toContain('canonical damage model');
    expect(dm.weaponPerks.maxPerWeapon).toBe(2);
    expect(dm.rings.valuesKnown).toBe(false);
  });

  it('ring values remain null after load (current seed)', () => {
    const dm = loadDamageModel();
    for (const ring of dm.rings.list) {
      expect(ring.value).toBeNull();
    }
  });

  it('Mimic zones load as explicit no-data (null), not error or empty array', () => {
    const en = loadEnemies();
    const mimic = en.enemies.find(e => e.id === 'mimic');
    expect(mimic).toBeDefined();
    expect(mimic!.zones).toBeNull();
    expect(mimic!.confidence).toBe('no-data');
  });

  it('preserves nullify multipliers of 0', () => {
    const en = loadEnemies();
    const hasZero = en.enemies.some(e =>
      Array.isArray(e.zones) && e.zones.some(z => z.multiplier === 0)
    );
    expect(hasZero).toBe(true);
  });

  it('every zone carries a zoneClass', () => {
    const en = loadEnemies();
    for (const enemy of en.enemies) {
      if (enemy.zones === null) continue;
      for (const z of enemy.zones) {
        expect(['head', 'body', 'everywhere']).toContain(z.zoneClass);
      }
    }
  });

  it('fails loudly on corrupted fixture (maxPerWeapon != 2)', () => {
    const dm = loadDamageModel();
    const corrupted = { ...dm, weaponPerks: { ...dm.weaponPerks, maxPerWeapon: 4 } };
    expect(() => validateDamageModel(corrupted)).toThrow(/maxPerWeapon/);
  });
});

describe('owner-measured ring provenance (real validator)', () => {
  const baseModel = () => {
    const dm = loadDamageModel();
    return JSON.parse(JSON.stringify(dm)); // deep clone for mutation
  };

  it('(a) all-null ring values pass', () => {
    const dm = baseModel();
    expect(() => validateDamageModel(dm)).not.toThrow();
  });

  it('(b) numeric + provenance owner-measured + non-empty source passes', () => {
    const dm = baseModel();
    dm.rings.list[0].value = 0.15;
    dm.rings.list[0].provenance = 'owner-measured';
    dm.rings.list[0].source = 'owner in-game capture 2026-10-22';
    expect(() => validateDamageModel(dm)).not.toThrow();
  });

  it('(c) numeric without provenance throws', () => {
    const dm = baseModel();
    dm.rings.list[0].value = 0.15;
    expect(() => validateDamageModel(dm)).toThrow(/provenance/);
  });

  it('(d) numeric with provenance but empty/missing source throws', () => {
    const dm = baseModel();
    dm.rings.list[0].value = 0.15;
    dm.rings.list[0].provenance = 'owner-measured';
    dm.rings.list[0].source = '';
    expect(() => validateDamageModel(dm)).toThrow(/source/);

    const dm2 = baseModel();
    dm2.rings.list[0].value = 0.15;
    dm2.rings.list[0].provenance = 'owner-measured';
    delete dm2.rings.list[0].source;
    expect(() => validateDamageModel(dm2)).toThrow(/source/);
  });

  it('(e) non-numeric, non-null value throws', () => {
    const dm = baseModel();
    (dm.rings.list[0] as any).value = '0.15';
    expect(() => validateDamageModel(dm)).toThrow(/number or null/);
  });
});
