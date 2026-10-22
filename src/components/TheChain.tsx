import { loadAll } from '../data/loader';

const { damageModel } = loadAll();

export function TheChain() {
  const chain = (damageModel as any).formula?.chain ?? [];
  return (
    <div className="p-4 max-w-2xl">
      <h2 className="display text-xl mb-4">The Chain</h2>
      <p className="text-xs text-amber-200/60 mb-4">Walkable explainer. Factors deep-link into Sandbox presets.</p>
      <ol className="space-y-2 list-decimal list-inside">
        {chain.map((step: string, i: number) => (
          <li key={i} className="panel p-3 text-sm">{step}</li>
        ))}
      </ol>
    </div>
  );
}
