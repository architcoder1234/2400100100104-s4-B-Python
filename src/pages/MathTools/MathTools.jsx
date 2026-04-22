// ── MathTools.jsx ────────────────────────────────────────────
// Calculator + Armstrong number checker page.
// Logic  → math.utils.js
// Styles → MathTools.css
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Calculator as CalcIcon, Hash, X } from 'lucide-react';
import { handleCalcButton, isArmstrong, CALC_BUTTONS } from './math.utils.js';
import './MathTools.css';

const MathTools = () => {
  const [display,   setDisplay]   = useState('0');
  const [equation,  setEquation]  = useState('');
  const [armNumber, setArmNumber] = useState('');
  const [armResult, setArmResult] = useState(null);

  const onCalc = (val) => {
    const next = handleCalcButton(val, display, equation);
    setDisplay(next.display);
    setEquation(next.equation);
  };

  const onArmChange = (val) => {
    setArmNumber(val);
    setArmResult(isArmstrong(val));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-700">

      {/* ── Calculator ── */}
      <div className="glass-card p-8 flex flex-col gap-6">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <CalcIcon className="w-5 h-5 text-indigo-500" /> Professional Calculator
        </h3>
        <div className="bg-slate-900 text-right p-6 rounded-2xl shadow-inner border border-slate-700">
          <div className="text-xs text-slate-400 h-4 mb-1">{equation}</div>
          <div className="text-4xl font-mono text-white truncate">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CALC_BUTTONS.map((btn) => (
            <button
              key={btn}
              onClick={() => onCalc(btn)}
              className={`p-4 rounded-xl font-bold transition-all active:scale-95 ${
                btn === '=' ? 'bg-indigo-600 text-white border border-indigo-400' :
                btn === 'C' ? 'bg-rose-500 text-white' :
                ['/','*','-','+'].includes(btn)
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {btn === '*' ? <X className="mx-auto w-4 h-4" /> : btn}
            </button>
          ))}
        </div>
      </div>

      {/* ── Armstrong Checker ── */}
      <div className="glass-card p-8 space-y-8 h-fit">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-indigo-500" /> Armstrong Number Tester
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          An Armstrong number (e.g., 153) equals the sum of its own digits each raised to the power of the number of digits.
        </p>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter a number..."
            value={armNumber}
            onChange={(e) => onArmChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white"
          />
          {armResult !== null && (
            <div className={`p-4 rounded-xl flex items-center gap-2 font-bold ${armResult ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'}`}>
              <Hash className="w-4 h-4" />
              {armResult ? 'Yes! It is an Armstrong Number.' : 'No, not an Armstrong number.'}
            </div>
          )}
        </div>
        <div className="pt-6 border-t dark:border-slate-800 grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <span className="block text-xs font-bold text-slate-500 uppercase">Input</span>
            <span className="text-lg font-mono dark:text-white">{armNumber || '-'}</span>
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <span className="block text-xs font-bold text-slate-500 uppercase">Digits</span>
            <span className="text-lg font-mono dark:text-white">{armNumber.length || '0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathTools;
