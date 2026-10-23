import { useState } from 'react';
import { loadAll } from '../data/loader';
import { Sigil } from './Sigil';
import { UnknownField } from './Signature';
import { loadRingValues, saveRingValues } from './ringStore';

const { damageModel } = loadAll();
const rings = (damageModel as any).rings?.list ?? [];

export function RingsVault() {
  const [values, setValues] = useState<Record<string, string>>(() => loadRingValues());

  const update = (name: string, v: string) => {
    const next = { ...values, [name]: v };
    setValues(next);
    saveRingValues(next);
  };

  return (
    <div className="p-4">
      <h2 className="display text-xl mb-4">Rings Vault</h2>
      <p className="text-xs text-amber-200/60 mb-4">Values are unknown until entered. User-entered values persist locally with user-entered provenance.</p>
      <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
        {rings.map((r: any) => (
          <div key={r.name} className="panel p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sigil name={r.name} />
              <div className="display text-sm">{r.name}</div>
            </div>
            <div className="text-xs text-amber-200/50 mb-2">{r.factorNote}</div>
            <label className="block text-xs">
              Value
              <input
                type="number"
                step="0.01"
                placeholder="?"
                value={values[r.name] ?? ''}
                onChange={e => update(r.name, e.target.value)}
                className="w-full mt-1 bg-black/40 border border-amber-800/40 rounded px-2 py-1 text-amber-100 text-sm"
              />
            </label>
            {values[r.name] && <div className="text-[10px] text-teal-300/70 mt-1">user-entered</div>}
            {!values[r.name] && <UnknownField reason="engraved value unknown" className="mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
