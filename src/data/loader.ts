import damageModelRaw from './damage-model.json';
import enemiesRaw from './enemies.json';

export type Confidence = string;

export interface WeaponPerk {
  name: string;
  kind: string;
  weapons?: string;
  alwaysOn?: boolean;
  chance?: boolean;
  critMultiplier?: number;
  multiplier?: number;
  flatPct?: number;
  note?: string;
}

export interface ExoPerk {
  name: string;
  alwaysOn?: boolean;
  factor?: string;
  maxedValue?: number;
  chance?: number;
  condition?: string;
  note?: string;
}

export interface Ring {
  name: string;
  factorNote: string;
  note?: string;
  value: null;
}

export interface DamageModel {
  $schema: string;
  baseDamage: {
    input: string;
    note: string;
    rarityIsDamageFactor: boolean;
    weaponTiers: number;
  };
  combinationFrequencies_MaxTier4Pool: {
    allFour: number;
    exactlyOne: number;
    exactlyThree: number;
    exactlyTwo: number;
    note: string;
    pools: {
      elementFire: number;
      exoCriticals: number;
      explosionsOrArea: number;
      weaponCriticals: number;
    };
    zero: number;
  };
  confidence: Confidence;
  display: string;
  exoPerks: {
    currency: string;
    maxLevel: number;
    nonDamageNames: string[];
    perks: ExoPerk[];
    slots: string[];
  };
  formula: {
    chain: string[];
    groupingRule: string;
    text: string;
  };
  handling: Record<string, string>;
  interactions: unknown[];
  rings: {
    count: number;
    drop: string;
    list: Ring[];
    slots: number;
    valueRule: string;
    valuesKnown: boolean;
  };
  situations: unknown[];
  source: string;
  weaponPerks: {
    chancePerkByTier: number[];
    maxPerWeapon: number;
    noDuplicates: boolean;
    pctPerkByTier: number[];
    perks: WeaponPerk[];
    plusElement: string[];
    rules: string;
  };
  workedExample: {
    base: number;
    ceiling: { chance: string; modifier: number; result: number; target: string };
    floor: { modifier: number; result: number };
  };
}

export interface Zone {
  multiplier: number;
  zone: string;
  note?: string;
}

export interface Enemy {
  class: string | null;
  confidence: Confidence;
  id: string;
  image: string | null;
  name: string;
  roster: boolean;
  zones: Zone[] | null;
  note?: string;
}

export interface EnemiesData {
  $schema: string;
  enemies: Enemy[];
  rosterNote: string;
  source: string;
  zoneModel: string;
}

function fail(msg: string): never {
  throw new Error(`[loader] ${msg}`);
}

function assert(condition: boolean, msg: string): asserts condition {
  if (!condition) fail(msg);
}

function validateDamageModel(raw: unknown): DamageModel {
  assert(typeof raw === 'object' && raw !== null, 'damage-model must be object');
  const d = raw as Record<string, unknown>;
  assert(typeof d.$schema === 'string', '$schema missing');
  assert(typeof d.confidence === 'string', 'confidence missing');
  assert(typeof d.source === 'string', 'source missing');

  const wp = d.weaponPerks as Record<string, unknown> | undefined;
  assert(!!wp && typeof wp === 'object', 'weaponPerks missing');
  assert(wp.maxPerWeapon === 2, `maxPerWeapon must be 2, got ${wp.maxPerWeapon}`);
  assert(Array.isArray(wp.perks), 'weaponPerks.perks must be array');
  // No coercion of unknowns; rings values must stay null
  const rings = d.rings as Record<string, unknown> | undefined;
  assert(rings !== undefined && Array.isArray(rings.list), 'rings.list missing');
  for (const r of rings.list as unknown[]) {
    const ring = r as Record<string, unknown>;
    assert(ring.value === null, `Ring "${ring.name}" value must be null (user-entered), got ${ring.value}`);
  }

  return raw as DamageModel;
}

function validateEnemies(raw: unknown): EnemiesData {
  assert(typeof raw === 'object' && raw !== null, 'enemies must be object');
  const e = raw as Record<string, unknown>;
  assert(Array.isArray(e.enemies), 'enemies array missing');
  const enemies = e.enemies as unknown[];
  for (const en of enemies) {
    const enemy = en as Record<string, unknown>;
    assert(typeof enemy.id === 'string', 'enemy.id missing');
    assert(typeof enemy.confidence === 'string', `enemy ${enemy.id} confidence missing`);
    // Mimic: zones null is explicit no-data, not error
    if (enemy.id === 'mimic') {
      assert(enemy.zones === null, 'Mimic zones must be null (no-data state)');
      assert(enemy.confidence === 'no-data', 'Mimic confidence must be no-data');
    } else if (enemy.zones !== null && enemy.zones !== undefined) {
      assert(Array.isArray(enemy.zones), `enemy ${enemy.id} zones must be array or null`);
      for (const z of enemy.zones as unknown[]) {
        const zone = z as Record<string, unknown>;
        assert(typeof zone.multiplier === 'number', `zone multiplier must be number (0 allowed for nullify)`);
        // 0 is measured nullify — preserve, do not treat as missing
      }
    }
  }
  return raw as EnemiesData;
}

export function loadDamageModel(): DamageModel {
  return validateDamageModel(damageModelRaw);
}

export function loadEnemies(): EnemiesData {
  return validateEnemies(enemiesRaw);
}

export function loadAll() {
  return {
    damageModel: loadDamageModel(),
    enemies: loadEnemies(),
  };
}
