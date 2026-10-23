import { loadAll } from '../data/loader';

const { damageModel } = loadAll();

export function LabNotes() {
  const setAside = (damageModel as any).setAside ?? {};
  const interactions: string[] = (damageModel as any).interactions ?? [];
  return (
    <div className="p-4 max-w-3xl space-y-4">
      <h2 className="display text-xl">Lab Notes</h2>
      <div className="panel p-3">
        <div className="display text-sm">Owner's formula (canon)</div>
        <p className="text-xs text-amber-200/60 mt-1">Canonical chain from the owner's calculator. See reference/owner-calculator-formula.md.</p>
      </div>
      <div className="panel p-3">
        <div className="display text-sm">Set-aside annex</div>
        <p className="text-xs text-amber-200/60 mt-1">{setAside.note || "Factors not in the owner's calculator."}</p>
        <ul className="mt-2 text-xs space-y-1">
          {(setAside.factors ?? []).map((f: any) => (
            <li key={f.name}>• {f.name}: {f.effect || 'set aside'}</li>
          ))}
        </ul>
      </div>
      {interactions.length > 0 && (
        <div className="panel p-3">
          <div className="display text-sm">Interactions</div>
          <ul className="mt-2 text-xs text-amber-200/60 space-y-1">
            {interactions.map((s: string, i: number) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="panel p-3">
        <div className="display text-sm">Measurement backlog (unmeasured)</div>
        <ul className="mt-2 text-xs text-amber-200/60 space-y-1">
          <li>• T_WEAK transcription</li>
          <li>• Ring values</li>
          <li>• Poison DoT</li>
          <li>• EXO per-level values</li>
          <li>• Mimic zones</li>
          <li>• Swing-strength variance</li>
          <li>• Difficulty / co-op scaling</li>
        </ul>
      </div>
    </div>
  );
}
