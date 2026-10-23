const KEY = 'doe-ring-values';

export function loadRingValues(): Record<string, string> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveRingValues(map: Record<string, string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch { /* ignore */ }
}

export function getRingValue(name: string): number | null {
  const map = loadRingValues();
  const s = map[name];
  if (s == null || s === '') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
