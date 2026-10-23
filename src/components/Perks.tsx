import { loadAll } from '../data/loader';
import { Sigil } from './Sigil';

const { damageModel } = loadAll();

export function Perks() {
  const perks = (damageModel as any).weaponPerks?.perks ?? [];
  const rules = (damageModel as any).weaponPerks?.rules ?? '';
  const interactions = (damageModel as any).interactions ?? {};
  return (
    <div className="p-4 max-w-3xl">
      <h2 className="display text-xl mb-2">Perk Library</h2>
      {rules && <p className="text-xs text-amber-200/60 mb-4">{rules}</p>}
      <div className="space-y-2">
        {perks.map((p: any) => (
          <div key={p.name} className="panel p-3 flex gap-3">
            <Sigil name={p.name} />
            <div className="flex-1 text-sm">
              <div className="display text-sm">{p.name}</div>
              <div className="text-[10px] text-amber-200/50 mt-0.5">{p.kind} · {p.alwaysOn ? 'always-on' : 'proc'}</div>
              {p.weapons && <div className="text-[10px] text-amber-200/40">weapons: {p.weapons}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-amber-200/60">Elements</div>
      <div className="flex gap-3 mt-1">
        {['Fire', 'Ice', 'Poison'].map(el => <Sigil key={el} name={el} />)}
      </div>
      {interactions.element && <p className="text-[10px] text-amber-200/40 mt-1">{interactions.element}</p>}
    </div>
  );
}
