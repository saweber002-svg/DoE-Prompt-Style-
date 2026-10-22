import { useState, useEffect } from 'react';

export function SettingsBar() {
  const [sounds, setSounds] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('doe-sounds');
    if (saved === '1') setSounds(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('doe-sounds', sounds ? '1' : '0');
  }, [sounds]);

  return (
    <div className="fixed bottom-3 right-3 text-xs flex items-center gap-2 bg-black/60 border border-amber-800/40 rounded px-2 py-1">
      <label className="flex items-center gap-1 cursor-pointer">
        <input type="checkbox" checked={sounds} onChange={e => setSounds(e.target.checked)} className="accent-amber-500" />
        <span className="text-amber-200/70">Sounds</span>
      </label>
      <span className="text-amber-200/40">{sounds ? 'on' : 'off'}</span>
    </div>
  );
}
