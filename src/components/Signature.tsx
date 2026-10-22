import type { FactorBreakdown, ResultState, Pattern } from '../engine/types';
import { motion, useReducedMotion } from 'motion/react';

export function UnknownField({ reason, className = '' }: { reason?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-amber-300/80 italic ${className}`} title={reason || 'Unknown — not measured'}>
      <span className="text-lg leading-none">?</span>
      {reason && <span className="text-xs not-italic opacity-70">{reason}</span>}
    </span>
  );
}

export function ConfidenceBadge({ confidence }: { confidence: string }) {
  return (
    <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded border border-amber-700/40 text-amber-200/70">
      {confidence.replace(/-/g, ' ')}
    </span>
  );
}

function NumberOrUnknown({ r, className = '' }: { r: ResultState; className?: string }) {
  if (r.kind === 'number') return <span className={className}>{r.value.toLocaleString()}</span>;
  return <UnknownField reason={r.reason} className={className} />;
}

export function ThreeNumbers({
  floor,
  expected,
  ceiling,
  ceilingFrequency,
}: {
  floor: ResultState;
  expected: ResultState;
  ceiling: ResultState;
  ceilingFrequency?: number | null;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      <div>
        <div className="display text-2xl text-gold"><NumberOrUnknown r={floor} /></div>
        <div className="text-[10px] text-amber-200/60 mt-1">FLOOR</div>
      </div>
      <div>
        <div className="display text-2xl text-gold"><NumberOrUnknown r={expected} /></div>
        <div className="text-[10px] text-amber-200/60 mt-1">EXPECTED</div>
      </div>
      <div>
        <div className="display text-2xl text-gold"><NumberOrUnknown r={ceiling} /></div>
        <div className="text-[10px] text-amber-200/60 mt-1">CEILING</div>
        {ceilingFrequency != null && (
          <div className="text-[9px] text-teal-300/70 mt-0.5">{(ceilingFrequency * 100).toFixed(1)}%</div>
        )}
      </div>
    </div>
  );
}

export function FactorChain({ breakdown }: { breakdown: FactorBreakdown[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {breakdown.map((f) => (
        <motion.span
          key={f.name}
          initial={reduce ? false : { opacity: 0.6, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.16 }}
          className={`px-2 py-1 rounded text-xs border transition-all duration-150 ${
            f.active
              ? 'border-amber-500/70 bg-amber-950/50 text-amber-100'
              : 'border-amber-900/30 text-amber-200/40'
          }`}
          title={f.note || f.name}
        >
          {f.name}
          {f.multiplier != null && f.multiplier !== 1 && (
            <span className="ml-1 text-gold">×{f.multiplier}</span>
          )}
          {f.multiplier == null && <span className="ml-1">?</span>}
        </motion.span>
      ))}
    </div>
  );
}

const PIP_LABELS = ['W', 'E', 'F', 'X'] as const; // weaponCrit, exoCrit, fire, explosions

export function ProcPips({ patterns }: { patterns: Pattern[] }) {
  if (!patterns.length) return null;
  return (
    <div className="mt-2 space-y-1">
      {patterns.slice(0, 8).map((p, i) => (
        <div key={i} className="flex items-center gap-1 text-[10px]">
          <div className="flex gap-0.5">
            {p.procced.map((on, j) => (
              <span
                key={j}
                className={`w-3 h-3 rounded-full border ${
                  on
                    ? j === 1
                      ? 'bg-purple-500 border-purple-300' // EXO distinct hue
                      : 'bg-amber-500 border-amber-300'
                    : 'border-amber-800/50'
                }`}
                title={PIP_LABELS[j] || ''}
              />
            ))}
          </div>
          <span className="text-amber-200/50">{(p.probability * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}

export function DistributionBar({ patterns }: { patterns: Pattern[] }) {
  const counts = new Map<number, number>();
  for (const p of patterns) {
    const c = p.procced.filter(Boolean).length;
    counts.set(c, (counts.get(c) || 0) + p.probability);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="flex h-2 rounded overflow-hidden mt-2 bg-black/40">
      {Array.from(counts.entries()).map(([k, v]) => (
        <div key={k} style={{ width: `${(v / total) * 100}%` }} className="bg-gradient-to-r from-amber-600 to-teal-500" title={`${k} procs: ${(v * 100).toFixed(0)}%`} />
      ))}
    </div>
  );
}

export function ZoneFigure({
  name,
  image,
  confidence,
  zones,
}: {
  name: string;
  image: string | null;
  confidence: string;
  zones?: { zone: string; multiplier: number; note?: string }[];
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="display text-lg mb-1">{name}</div>
      <ConfidenceBadge confidence={confidence} />
      <div className="mt-3 w-56 h-64 rounded-xl border border-amber-700/40 bg-black/30 flex items-end justify-center relative">
        {image ? (
          <div className="text-amber-200/40 text-xs pb-4">Capture drop-in</div>
        ) : (
          <UnknownField reason="No capture" className="pb-6" />
        )}
        {zones && zones.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {zones.map(z => (
              <span key={z.zone} className="text-[9px] px-1.5 py-0.5 rounded bg-black/60 border border-amber-700/50 text-amber-200">
                {z.zone} ×{z.multiplier}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
