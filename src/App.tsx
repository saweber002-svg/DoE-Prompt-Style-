import { useState } from 'react';
import { Sandbox } from './components/Sandbox';
import { EnemySelect } from './components/EnemySelect';
import { Combos } from './components/Combos';
import { Perks } from './components/Perks';
import { ExoBoard } from './components/ExoBoard';
import { RingsVault } from './components/RingsVault';
import { TheChain } from './components/TheChain';
import { LabNotes } from './components/LabNotes';
import { MenuSigil } from './components/Sigil';
import { SettingsBar } from './components/SettingsBar';
import type { Build } from './engine/types';

const SCREENS = ['Main Menu', 'Sandbox', 'Enemies', 'Combos', 'Perks', 'EXO', 'Rings', 'The Chain', 'Lab Notes'] as const;
type Screen = typeof SCREENS[number];

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

export default function App() {
  const [screen, setScreen] = useState<Screen>('Main Menu');
  const [sandboxBuild, setSandboxBuild] = useState<Build>(DEFAULT_BUILD);

  const loadPreset = (partial: Partial<Build>) => {
    setSandboxBuild(prev => ({ ...prev, ...partial }));
    setScreen('Sandbox');
  };

  return (
    <div className="app-root">
      <header className="flex items-center justify-between px-4 py-2 border-b border-amber-900/40">
        <div className="title-lockup text-lg">DAMAGE OF ETERNITY</div>
        <div className="flex gap-1 overflow-x-auto text-xs max-w-[55vw] sm:max-w-none">
          {SCREENS.map(s => (
            <button key={s} onClick={() => setScreen(s)} className={`px-2 py-1 rounded whitespace-nowrap ${screen === s ? 'bg-amber-900/60 text-amber-100' : 'text-amber-200/60'}`}>
              {s}
            </button>
          ))}
        </div>
      </header>

      {screen === 'Main Menu' && (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)]">
          <aside className="panel m-4 p-4 w-full lg:w-80 space-y-2">
            {SCREENS.filter(s => s !== 'Main Menu').map(label => (
              <button
                key={label}
                onClick={() => setScreen(label)}
                className="w-full text-left px-4 py-3 rounded-lg border border-amber-700/40 hover:border-amber-400/70 hover:bg-amber-950/40 transition-colors duration-150 flex items-center gap-3"
              >
                <MenuSigil label={label} />
                <span className="display text-sm tracking-wide">{label.toUpperCase()}</span>
              </button>
            ))}
          </aside>
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-64 h-80 mx-auto rounded-2xl border border-amber-700/50 bg-black/40 flex items-end justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
                <div className="relative text-amber-100/60 text-sm pb-8">Hero on pedestal<br />(capture drop-in)</div>
              </div>
              <p className="mt-4 text-amber-200/60 text-sm">Torchlit chamber</p>
            </div>
          </main>
        </div>
      )}

      <div key={screen} className="screen-enter">
      {screen === 'Sandbox' && <Sandbox initialBuild={sandboxBuild} onBuildChange={setSandboxBuild} />}
      {screen === 'Enemies' && <EnemySelect />}
      {screen === 'Combos' && <Combos />}
      {screen === 'Perks' && <Perks />}
      {screen === 'EXO' && <ExoBoard />}
      {screen === 'Rings' && <RingsVault />}
      {screen === 'The Chain' && <TheChain onPreset={loadPreset} />}
      {screen === 'Lab Notes' && <LabNotes />}
      </div>
      <SettingsBar />
    </div>
  );
}
