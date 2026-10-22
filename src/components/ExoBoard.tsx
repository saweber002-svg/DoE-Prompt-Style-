import { loadAll } from '../data/loader';
import { Sigil } from './Sigil';
import { UnknownField } from './Signature';

const { damageModel } = loadAll();

export function ExoBoard() {
  const perks = (damageModel as any).exoPerks?.perks ?? [];
  return (
    <div className="p-4 max-w-2xl">
      <h2 className="display text-xl mb-4">EXO Board</h2>
      <p className="text-xs text-amber-200/60 mb-4">Only maxed values are known. Per-level values render ?</p>
      <div className="space-y-2">
        {perks.map((p: any) => (
          <div key={p.name} className="panel p-3 flex items-center gap-3">
            <Sigil name={p.name} />
            <div className="flex-1">
              <div className="display text-sm">{p.name}</div>
              <div className="text-xs text-amber-200/50 mt-0.5">
                {p.maxedValue != null ? `Maxed: ${p.maxedValue}` : <UnknownField reason="per-level unknown" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
