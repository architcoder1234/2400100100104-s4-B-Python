// ── PageSpinner.jsx ──────────────────────────────────────────
// Shown by React.Suspense while a lazy page chunk loads.
// ─────────────────────────────────────────────────────────────
import React from 'react';

const PageSpinner = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin" />
        <div className="absolute inset-2 bg-indigo-500/10 rounded-full flex items-center justify-center text-lg">⚡</div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Loading...</p>
    </div>
  </div>
);

export default PageSpinner;
