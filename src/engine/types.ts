export type AttackType = 'swing' | 'thrust' | 'throw' | 'shot';
export type Grip = '1H' | '2H';

export type WeaponType =
  | 'axe' | 'hammer' | 'spear' | 'greatsword'
  | 'sword' | 'longsword' | 'dagger' | 'bow' | 'crossbow'
  | 'staff' | 'shield' | 'club' | 'sickle' | 'other';

/** Zone classes per the owner's calculator: HEAD gates the headshot ring,
 *  BODY gates Backstab, 'everywhere' (flat targets) opens neither gate. */
export type ZoneClass = 'head' | 'body' | 'everywhere';

export interface RingSlot {
  name: string | null;          // null = empty slot (no factor)
  userValue: number | null;     // null = selected but unentered → unknown
}

export interface Build {
  baseDamage: number;
  grip: Grip;
  attackType: AttackType;
  /** Weapon type — gates the two-hand handling factor (owner formula:
   *  only axe / hammer / spear / greatsword). Absent = no handling bonus. */
  weaponType?: WeaponType;
  weaponPerks: string[];        // max 2, from data names
  element: 'Fire' | 'Ice' | 'Poison' | null;
  exo: {
    powerPullback: boolean;     // maxed 0.5
    might: boolean;
    pierce: boolean;
    exoCriticals: boolean;      // 40% ×3
  };
  rings: [RingSlot, RingSlot];
  situations: {
    // Set-aside (research annex — NOT applied by the canonical engine;
    // see data setAside. Owner formula gates rings by zone instead.)
    firstStrike: boolean;
    targetPoisoned: boolean;
    targetStaggered: boolean;
    fromBehind: boolean;
  };
  // max-tier flags for chance/pct perks
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Zone {
  id: string;
  multiplier: number;           // 0 = measured nullify
  zoneClass?: ZoneClass;        // derived from id when absent
}

export interface Target {
  enemyId: string;
  zone: Zone | null;            // null = unknown / no-data (Mimic)
}

export type ResultState =
  | { kind: 'number'; value: number }
  | { kind: 'unknown'; reason: string }
  | { kind: 'conflict'; reason: string };

export interface FactorBreakdown {
  name: string;
  multiplier: number | null;    // null if unknown
  active: boolean;
  note?: string;
}

export interface Pattern {
  procced: boolean[];           // order: weaponCrit, exoCrit, fire, explosions/area
  probability: number;
  multiplier: number | null;
  damage: ResultState;
}

export interface HitOutcome {
  floor: ResultState;
  expected: ResultState;
  ceiling: ResultState;
  ceilingFrequency: number | null;
  patterns: Pattern[];
  breakdown: FactorBreakdown[];
  firstStrikeApplied: boolean;
}
