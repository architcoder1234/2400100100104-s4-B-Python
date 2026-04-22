// ── UnitConverter.jsx ────────────────────────────────────────
// Scientific unit converter — length, weight, temperature.
// Data & logic → units.data.js
// Styles       → UnitConverter.css
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Ruler, Scale, Thermometer, ArrowRightLeft, Zap, Info } from 'lucide-react';
import { UNIT_OPTIONS, MODE_DEFAULTS, convert } from './units.data.js';
import './UnitConverter.css';

const MODES = [
  { id: 'length', icon: Ruler       },
  { id: 'weight', icon: Scale       },
  { id: 'temp',   icon: Thermometer },
];

const UnitConverter = () => {
  const [mode,   setMode]   = useState('length');
  const [value,  setValue]  = useState(1);
  const [from,   setFrom]   = useState('meters');
  const [to,     setTo]     = useState('feet');
  const [result, setResult] = useState(0);

  // Recalculate whenever inputs change
  useEffect(() => {
    setResult(convert(value, from, to, mode));
  }, [value, from, to, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    const defaults = MODE_DEFAULTS[newMode];
    setFrom(defaults.from);
    setTo(defaults.to);
  };

  // Filter options: "from" selector hides miles; "to" selector shows all
  const fromOptions = UNIT_OPTIONS[mode].filter(o => o.value !== 'miles');
  const toOptions   = UNIT_OPTIONS[mode];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">

      {/* Header */}
      <div className="glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group border-none shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Ruler className="text-white w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold dark:text-white">Scientific Unit Converter</h2>
            <p className="text-slate-500 font-medium">Measurement Hub & Universal Logic.</p>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="flex gap-2 relative z-10">
          {MODES.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleModeChange(id)}
              className={`p-4 rounded-xl transition-all ${mode === id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-500'}`}
            >
              <Icon size={24} />
            </button>
          ))}
        </div>
      </div>

      {/* Converter panel */}
      <div className="glass-card p-12 space-y-12 border-none shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* From */}
          <div className="space-y-6">
            <label className="block text-xs font-black uppercase text-indigo-500 tracking-widest flex items-center gap-2">
              <Zap size={14} /> Enter Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl text-4xl font-black outline-none focus:ring-4 focus:ring-indigo-500/10 dark:text-white transition-all shadow-inner"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold dark:text-white outline-none cursor-pointer"
            >
              {fromOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* To */}
          <div className="relative flex flex-col items-center">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0 hidden md:block" />
            <div className="w-16 h-16 bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center rounded-full z-10 shadow-xl opacity-50 mb-8">
              <ArrowRightLeft className="text-indigo-500" />
            </div>

            <div className="w-full space-y-6 relative z-10">
              <label className="block text-xs font-black uppercase text-indigo-500 tracking-widest text-right">
                Target Unit
              </label>
              <div className="p-10 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <span className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Converted Result</span>
                <div className="text-5xl font-black text-white leading-tight">
                  {result % 1 !== 0 ? result.toFixed(4) : result}
                </div>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-6 p-4 bg-white/10 border-none rounded-xl font-bold text-white outline-none cursor-pointer text-sm"
                >
                  {toOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
          <Info className="text-indigo-500 shrink-0" size={18} />
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            This converter uses standard scientific ratios for high-accuracy results. Suitable for engineering, culinary, and academic purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
