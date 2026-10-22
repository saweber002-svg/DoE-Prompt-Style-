import { loadAll } from '../data/loader';
import type { Build } from '../engine/types';

const { damageModel } = loadAll();

interface TheChainProps {
  onPreset?: (build: Partial<Build>) => void;
}

const PRESETS: Record<string, Partial<Build>> = {
  'Attack Power': { weaponPerks: ['Attack Power'] },
  'Stab Damage': { weaponPerks: ['Stab Damage'], attackType: 'thrust' },
  'Power / Pullback': { exo: { powerPullback: true, might: false, pierce: false, exoCriticals: false } },
  'Handling': { grip: '2H', weaponType: 'axe' },
  "Scout's Signet": { rings: [{ name: "Scout's Signet / Precision Shot", userValue: 0.1 }, { name: null, userValue: null }] },
  'Backstab': { rings: [{ name: 'Shadow Strike / Backstab', userValue: 0.15 }, { name: null, userValue: null }] },
};

export function TheChain({ onPreset }: TheChainProps) {
  const chain = (damageModel as any).formula?.chain ?? [];
  return (
    <div className="p-4 max-w-2xl">
      <h2 className="display text-xl mb-4">The Chain</h2>
      <p className="text-xs text-amber-200/60 mb-4">Click a factor to load a preset into the Sandbox.</p>
      <ol className="space-y-2 list-decimal list-inside">
        {chain.map((step: string, i: number) => {
          const presetKey = Object.keys(PRESETS).find(k => step.includes(k));
          const preset = presetKey ? PRESETS[presetKey] : null;
          return (
            <li key={i} className="panel p-3 text-sm">
              <div>{step}</div>
              {preset && onPreset && (
                <button
                  onClick={() => onPreset(preset)}
                  className="mt-1 text-[10px] text-teal-300/80 underline"
                >
                  Load preset → Sandbox
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
