import { useState, useMemo } from 'react';
import { loadAll } from '../data/loader';
import { evaluateHit } from '../engine/formula';
import type { Build, Target } from '../engine/types';
import { ThreeNumbers, FactorChain, ProcPips, DistributionBar, ZoneFigure } from './Signature';

const { enemies: enemiesData, damageModel } = loadAll();
const roster = enemiesData.enemies.filter((e: any) => e.roster);
const weaponPerks = (damageModel as any).weaponPerks?.perks ?? [];

const DEFAULT_BUILD: Build = {
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

export function Sandbox() {
  const [build, setBuild] = useState<Build>(DEFAULT_BUILD);
  const [enemyId, setEnemyId] = useState('wasp');
  const [zoneIdx, setZoneIdx] = useState(0);

  const enemy = roster.find((e: any) => e.id === enemyId) ?? roster[0];
  const zones = enemy?.zones ?? [];
  const zone = zones[zoneIdx] ?? zones[0] ?? null;

  const target: Target = useMemo(() => ({
    enemyId: enemy?.id ?? 'wasp',
    zone: zone ? { id: zone.zone, multiplier: zone.multiplier } : null,
  }), [enemy, zone]);

  const outcome = useMemo(() => evaluateHit(build, target), [build, target]);

  const togglePerk = (name: string) => {
    const has = build.weaponPerks.includes(name);
    const next = has ? build.weaponPerks.filter(p => p !== name) : [...build.weaponPerks, name].slice(0, 2);
    setBuild({ ...build, weaponPerks: next });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 min-h-[calc(100vh-60px)]">
      <aside className="panel w-full lg:w-80 p-4 space-y-3 overflow-y-auto max-h-[80vh]">
        <h2 className="display text-lg">Loadout Builder</h2>
        <label className="block text-xs text-amber-200/70">Base Damage
          <input type="number" value={build.baseDamage} onChange={e => setBuild({ ...build, baseDamage: Number(e.target.value) || 0 })} className="w-full mt-1 bg-black/40 border border-amber-800/50 rounded px-3 py-2 text-amber-100" />
        </label>
        <label className="block text-xs text-amber-200/70">Grip
          <select value={build.grip} onChange={e => setBuild({ ...build, grip: e.target.value as any })} className="w-full mt-1 bg-black/40 border border-amber-800/50 rounded px-3 py-2 text-amber-100">
            <option value="1H">1H</option>
            <option value="2H">2H</option>
          </select>
        </label>
        <label className="block text-xs text-amber-200/70">Attack
          <select value={build.attackType} onChange={e => setBuild({ ...build, attackType: e.target.value as any })} className="w-full mt-1 bg-black/40 border border-amber-800/50 rounded px-3 py-2 text-amber-100">
            <option value="swing">Swing</option>
            <option value="thrust">Thrust</option>
            <option value="throw">Throw</option>
            <option value="shot">Shot</option>
          </select>
        </label>
        <div className="text-xs text-amber-200/70">Weapon Perks (max 2)</div>
        <div className="flex flex-wrap gap-1">
          {weaponPerks.map((p: any) => (
            <button key={p.name} onClick={() => togglePerk(p.name)} className={`text-xs px-2 py-1 rounded border ${build.weaponPerks.includes(p.name) ? 'border-amber-400 bg-amber-950/60' : 'border-amber-900/40'}`}>
              {p.name}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-amber-200/70">
          <input type="checkbox" checked={build.situations.firstStrike} onChange={e => setBuild({ ...build, situations: { ...build.situations, firstStrike: e.target.checked } })} className="accent-amber-500" />
          First Strike
        </label>
      </aside>

      <main className="flex-1 panel p-4 flex flex-col items-center">
        <ZoneFigure name={enemy?.name ?? '—'} image={enemy?.image ?? null} confidence={enemy?.confidence ?? ''} zones={zones} />
        <div className="mt-3 flex gap-1 flex-wrap justify-center">
          {zones.map((z: any, i: number) => (
            <button key={z.zone} onClick={() => setZoneIdx(i)} className={`text-xs px-2 py-1 rounded border ${i === zoneIdx ? 'border-amber-400' : 'border-amber-900/40'}`}>
              {z.zone} ×{z.multiplier}
            </button>
          ))}
        </div>
      </main>

      <aside className="panel w-full lg:w-80 p-4">
        <h2 className="display text-lg mb-3">Damage Results</h2>
        <ThreeNumbers floor={outcome.floor} expected={outcome.expected} ceiling={outcome.ceiling} ceilingFrequency={outcome.ceilingFrequency} />
        <div className="mt-4 text-xs text-amber-200/70">Factor Chain</div>
        <FactorChain breakdown={outcome.breakdown} />
        <div className="mt-3 text-xs text-amber-200/70">Proc distribution</div>
        <DistributionBar patterns={outcome.patterns} />
        <ProcPips patterns={outcome.patterns} />
      </aside>
    </div>
  );
}
