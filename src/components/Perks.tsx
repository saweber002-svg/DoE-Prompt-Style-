import { loadAll } from '../data/loader';
const { damageModel } = loadAll();
export function Perks() {
  const perks = (damageModel as any).weaponPerks?.perks ?? [];
  return (
    <div className="p-4">
      <h2 className="display text-xl mb-4">Perk Library</h2>
      <div className="grid gap-2 max-w-2xl">
        {perks.map((p: any) => (
          <div key={p.name} className="panel p-3 text-sm">
            <div className="display text-sm">{p.name}</div>
            {p.note && <div className="text-amber-200/50 text-xs mt-1">{p.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
