// Circular blue sigil icon system.
// Priority: perks → rings → elements → EXO → weapons → zone markers → menu.
// Real game-icons.net SVGs (CC-BY 3.0) are vendored under src/assets/icons/ when available.
// Until then, text-sigil fallbacks are used. Gap list is in reports/icon-gaps.md.

const SIGIL_STYLE = "w-6 h-6 rounded-full border-2 border-cyan-400/80 flex items-center justify-center text-cyan-300 text-[10px] font-medium shrink-0";

const ICONS: Record<string, string> = {
  // Perks
  "Attack Power": "AP",
  "Criticals": "CR",
  "Throw Damage": "TH",
  "Explosions": "EX",
  "Area Damage": "AR",
  "Stab Damage": "ST",
  "Poison": "PO",
  "Spectral Echo": "SE",
  "Reload": "RL",
  "Vampire": "VA",
  // Rings
  "Predator": "PD",
  "Sundering": "SU",
  "Scout's Signet": "SC",
  "Venom Fang": "VF",
  "Hexweaver": "HX",
  "Blacksmith": "BS",
  "Micro Amplifier": "MA",
  "Duelist": "DU",
  "Breaker's Band": "BB",
  "Shadow Strike": "SS",
  // EXO
  "Power / Pullback": "PP",
  "Might": "MI",
  "Pierce": "PI",
  "EXO Criticals": "EC",
  // Menu / zones
  "Sandbox": "SB",
  "Enemies": "EN",
  "Combos": "CO",
  "Perks": "PK",
  "EXO": "XO",
  "Rings": "RG",
  "The Chain": "CH",
  "Lab Notes": "LN",
  "head": "HD",
  "torso": "TO",
  "limbs": "LM",
  "waist": "WA",
  "everywhere": "EV",
};

export function Sigil({ name, className = "" }: { name: string; className?: string }) {
  const key = Object.keys(ICONS).find(k => name.toLowerCase().includes(k.toLowerCase())) || name;
  const label = ICONS[key] || name.slice(0, 2).toUpperCase();
  return (
    <span className={`${SIGIL_STYLE} ${className}`} title={name} aria-label={name}>
      {label}
    </span>
  );
}

export function MenuSigil({ label }: { label: string }) {
  return <Sigil name={label} />;
}
