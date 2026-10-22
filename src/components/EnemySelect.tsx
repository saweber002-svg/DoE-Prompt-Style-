import { useState } from 'react';
import { loadAll } from '../data/loader';
import { ZoneFigure } from './Signature';

const { enemies: enemiesData } = loadAll();
const roster = enemiesData.enemies.filter((e: any) => e.roster);

export function EnemySelect() {
  const [selected, setSelected] = useState(roster[0]?.id ?? '');
  const enemy = roster.find((e: any) => e.id === selected);

  return (
    <div className="p-4">
      <div className="flex gap-2 overflow-x-auto pb-3">
        {roster.map((e: any) => (
          <button
            key={e.id}
            onClick={() => setSelected(e.id)}
            className={`panel p-2 min-w-[110px] text-center shrink-0 ${selected === e.id ? 'border-amber-400 ring-1 ring-amber-400/40' : ''}`}
          >
            <div className="text-xs font-medium">{e.name}</div>
            <div className="text-[9px] text-amber-200/50 mt-0.5">{e.class}</div>
          </button>
        ))}
      </div>
      {enemy && (
        <div className="panel p-4 flex flex-col lg:flex-row gap-6 items-start">
          <ZoneFigure name={enemy.name} image={enemy.image} confidence={enemy.confidence} zones={enemy.zones} />
          <div className="flex-1 w-full">
            <div className="display text-lg mb-2">Zone Data</div>
            <div className="space-y-1 text-sm">
              {enemy.zones.map((z: any) => (
                <div key={z.zone} className="flex justify-between border-b border-amber-900/30 py-1.5">
                  <span className="capitalize">{z.zone}</span>
                  <span>
                    ×{z.multiplier}
                    {z.note && <span className="text-amber-200/50 text-xs ml-2">· {z.note}</span>}
                  </span>
                </div>
              ))}
            </div>
            {enemy.note && <p className="mt-3 text-xs text-amber-200/50">{enemy.note}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
