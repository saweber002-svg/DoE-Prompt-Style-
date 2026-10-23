import { useState, useMemo } from 'react';
import { loadAll } from '../data/loader';
import { evaluateHit } from '../engine/formula';
import type { Build, Target } from '../engine/types';
import { ThreeNumbers } from './Signature';
import { getRingValue } from './ringStore';

const { enemies: enemiesData, damageModel } = loadAll();
const roster = enemiesData.enemies.filter((e: any) => e.roster);

const BASE: Build = {
  baseDamage: 120,
  grip: '1H',
  attackType: 'swing',
  weaponPerks: [],
  element: null,
  exo: { powerPullback: false, might: false, pierce: false, exoCriticals: false },
  rings: [{ name: null, userValue: null }, { name: null, userValue: null }],
  situations: { firstStrike: false, targetPoisoned: false, targetStaggered: false, fromBehind: false },
  tier: 4,
};

function combo(name: string, patch: Partial<Build>): { name: string; build: Build } {
  return { name, build: { ...BASE, ...patch } };
}

export function Combos() {
  const [ranged, setRanged] = useState(false);
  const [enemyId, setEnemyId] = useState(roster[0]?.id ?? 'wasp');
  const [zoneIdx, setZoneIdx] = useState(0);
  const enemy = roster.find((e: any) => e.id === enemyId) ?? roster[0];
  const zones = enemy?.zones ?? [];
  const zone = zones[zoneIdx] ?? zones[0];
  const target: Target = useMemo(() => ({
    enemyId: enemy?.id ?? 'wasp',
    zone: zone ? { id: zone.zone, multiplier: zone.multiplier } : null,
  }), [enemy, zone]);

  const cards = [
    combo('Full House', { weaponPerks: ['Attack Power', 'Criticals'], element: 'Fire', exo: { ...BASE.exo, exoCriticals: true } }),
    combo('Double Crit', { weaponPerks: ['Criticals'], exo: { ...BASE.exo, exoCriticals: true } }),
    combo('Predator Stack', { weaponPerks: ['Criticals'], rings: [{ name: 'Predator / Critical Strike', userValue: getRingValue('Predator / Critical Strike') }, { name: null, userValue: null }] }),
  ];

  const freq = damageModel.combinationFrequencies_MaxTier4Pool;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="display text-xl">Combos</h2>
        <label className="flex items-center gap-2 text-xs text-amber-200/70">
          <input type="checkbox" checked={ranged} onChange={e => setRanged(e.target.checked)} className="accent-amber-500" />
          Ranged cap
        </label>
      </div>
      <div className="flex gap-2 items-center text-xs">
        <select value={enemyId} onChange={e => { setEnemyId(e.target.value); setZoneIdx(0); }} className="bg-black/40 border border-amber-800/50 rounded px-2 py-1 text-amber-100">
          {roster.map((e: any) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        {zones.map((z: any, i: number) => (
          <button key={z.zone} onClick={() => setZoneIdx(i)} className={`px-2 py-1 rounded border ${i === zoneIdx ? 'border-amber-400' : 'border-amber-900/40'}`}>{z.zone}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {cards.map(c => {
          const out = evaluateHit(c.build, target);
          return (
            <div key={c.name} className="panel p-3">
              <div className="display text-sm mb-2">{c.name}</div>
              <ThreeNumbers floor={out.floor} expected={out.expected} ceiling={out.ceiling} ceilingFrequency={out.ceilingFrequency} />
            </div>
          );
        })}
      </div>
      <div>
        <div className="text-xs text-amber-200/60 mb-2">Proc distribution (max-tier 4-pool)</div>
        <div className="grid grid-cols-5 gap-2">
          {[
            { l: '0', v: freq.zero },
            { l: '1', v: freq.exactlyOne },
            { l: '2', v: freq.exactlyTwo },
            { l: '3', v: freq.exactlyThree },
            { l: '4', v: freq.allFour },
          ].map(it => (
            <div key={it.l} className={`panel p-2 text-center text-xs ${ranged && Number(it.l) > 2 ? 'opacity-40' : ''}`}>
              <div className="display">{(it.v * 100).toFixed(0)}%</div>
              <div className="text-amber-200/50">{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
