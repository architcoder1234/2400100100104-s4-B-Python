// ── Toggle.jsx ───────────────────────────────────────────────
// Reusable toggle switch used in ThemeModal (Settings panel).
// Props: enabled, onToggle, icon (Lucide component), label
// ─────────────────────────────────────────────────────────────

import React, { memo } from 'react';

const Toggle = memo(({ enabled, onToggle, icon: Icon, label }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 group transition-all hover:border-indigo-500/30">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg transition-colors ${enabled ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
        <Icon size={18} />
      </div>
      <span className="text-sm font-bold dark:text-white uppercase tracking-tight">{label}</span>
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
));

export default Toggle;
