export function LabNotes() {
  const cards = [
    { id: 1, title: "Base damage input", note: "Owner-observed. Rarity is not a damage factor." },
    { id: 2, title: "Zone multiplier", note: "Final factor. 0 = nullify." },
    { id: 3, title: "First Strike", note: "×3 outside the chain." },
    { id: 4, title: "Proc pools", note: "Independent. Ranged caps at 2." },
    { id: 5, title: "Predator in crit", note: "Adds inside each crit factor." },
    { id: 6, title: "Backstab + Scout conflict", note: "Only documented non-stack." },
    { id: 7, title: "EXO Criticals", note: "40% ×3 when maxed." },
    { id: 8, title: "Throw Damage", note: "Throws only." },
    { id: 9, title: "Stab Damage", note: "Flat on thrust." },
    { id: 10, title: "Handling", note: "2H = ×2 (owner-confirmed)." },
    { id: 11, title: "Conditional rings", note: "Venom / Breaker / Backstab only while situation holds." },
    { id: 12, title: "Unknown values", note: "Never coerced. Render ? via UnknownField." },
  ];
  return (
    <div className="p-4">
      <h2 className="display text-xl mb-4">Lab Notes</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map(c => (
          <div key={c.id} className="panel p-3">
            <div className="display text-sm mb-1">{c.id}. {c.title}</div>
            <div className="text-xs text-amber-200/60">{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
