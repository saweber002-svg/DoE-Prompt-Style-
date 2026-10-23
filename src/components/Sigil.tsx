import { ICON_MANIFEST } from '../assets/icons/manifest';

const SIGIL_STYLE = "w-6 h-6 rounded-full border-2 border-cyan-400/80 flex items-center justify-center text-cyan-300 shrink-0 overflow-hidden";

// Load all vendored SVGs as raw strings
const svgModules = import.meta.glob('../assets/icons/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function getSvgRaw(file: string): string | null {
  const key = Object.keys(svgModules).find(k => k.endsWith(file));
  return key ? svgModules[key] : null;
}

function renderGlyph(raw: string): string {
  // Drop the first full-canvas background path; keep glyph paths with currentColor
  const paths = raw.match(/<path[^>]*>/g) || [];
  const glyph = paths.slice(1).join('');
  return glyph.replace(/fill="[^"]*"/g, 'fill="currentColor"');
}

function resolveId(name: string): string | null {
  if (!name) return null;
  const short = name.split('/')[0].trim().toLowerCase();
  const entry = ICON_MANIFEST.find(m =>
    m.name.toLowerCase() === short ||
    name.toLowerCase().startsWith(m.name.toLowerCase()) ||
    m.name.toLowerCase().includes(short) ||
    m.id === short ||
    m.id === `weapon-${short}` ||
    m.id === `zone-${short === 'body' ? 'torso' : short}` ||
    m.id === `menu-${short}`
  );
  return entry?.id ?? null;
}

export function Sigil({ name, className = '' }: { name: string; className?: string }) {
  const id = resolveId(name);
  const entry = id ? ICON_MANIFEST.find(m => m.id === id) : null;
  const raw = entry ? getSvgRaw(entry.file) : null;

  if (raw) {
    const glyph = renderGlyph(raw);
    return (
      <span className={`${SIGIL_STYLE} ${className}`} title={name} aria-hidden>
        <svg viewBox="0 0 512 512" className="w-4 h-4 text-cyan-300" dangerouslySetInnerHTML={{ __html: glyph }} />
      </span>
    );
  }

  // Text fallback only for known gaps or unmapped
  const letters = name.slice(0, 2).toUpperCase();
  return <span className={`${SIGIL_STYLE} text-[10px] font-medium ${className}`} title={name}>{letters}</span>;
}

export function MenuSigil({ label }: { label: string }) {
  return <Sigil name={label} />;
}
