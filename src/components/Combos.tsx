import { useState } from 'react';
import { loadAll } from '../data/loader';

const { damageModel } = loadAll();

export function Combos() {
  const [ranged, setRanged] = useState(false);
  const freq = damageModel.combinationFrequencies_MaxTier4Pool;

  const items = [
    { label: '0', value: freq.zero },
    { label: '1', value: freq.exactlyOne },
    { label: '2', value: freq.exactlyTwo },
    { label: '3', value: freq.exactlyThree },
    { label: '4', value: freq.allFour },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="display text-xl">Combos Probability</h2>
        <label className="flex items-center gap-2 text-xs text-amber-200/70">
          <input type="checkbox" checked={ranged} onChange={e => setRanged(e.target.checked)} className="accent-amber-500" />
          Ranged (cap 2)
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {items.map(it => (
          <div key={it.label} className={`panel p-3 text-center ${ranged && Number(it.label) > 2 ? 'opacity-40' : ''}`}>
            <div className="display text-lg">{(it.value * 100).toFixed(0)}%</div>
            <div className="text-xs text-amber-200/60">{it.label} proc{it.label !== '1' ? 's' : ''}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-amber-200/50">
        Frequencies from engine (MaxTier4Pool). Ranged greys patterns above the 2-pool cap.
      </p>
    </div>
  );
}
