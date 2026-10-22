import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnemies } from '../../src/data/loader';
import { zoneClassOf } from '../../src/engine/factors';

describe('data guards', () => {
  it('zoneClass consistency: stored zoneClass matches engine derivation', () => {
    const en = loadEnemies();
    for (const enemy of en.enemies) {
      if (!enemy.zones) continue;
      for (const z of enemy.zones) {
        const derived = zoneClassOf(z.zone);
        expect(z.zoneClass, `${enemy.id}/${z.zone}`).toBe(derived);
      }
    }
  });

  it('twin-copy guard: data/ and src/data/ are deep-equal', () => {
    const pairs = [
      ['data/enemies.json', 'src/data/enemies.json'],
      ['data/damage-model.json', 'src/data/damage-model.json'],
    ];
    for (const [a, b] of pairs) {
      const ja = JSON.parse(readFileSync(resolve(a), 'utf8'));
      const jb = JSON.parse(readFileSync(resolve(b), 'utf8'));
      expect(ja).toEqual(jb);
    }
  });

  it('roster sanity: roster:true enemies have zones or are the known Mimic no-data case; multipliers are finite ≥ 0', () => {
    const en = loadEnemies();
    for (const enemy of en.enemies) {
      if (enemy.roster) {
        if (enemy.id === 'mimic') {
          expect(enemy.zones).toBeNull();
        } else {
          expect(Array.isArray(enemy.zones) && enemy.zones.length > 0).toBe(true);
        }
      }
      if (Array.isArray(enemy.zones)) {
        for (const z of enemy.zones) {
          expect(Number.isFinite(z.multiplier)).toBe(true);
          expect(z.multiplier).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });
});
