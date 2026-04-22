// ── FinanceConverter.jsx ─────────────────────────────────────
// Currency converter page.
// Data & logic → finance.data.js
// Styles       → FinanceConverter.css
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Landmark, ArrowRightLeft, RefreshCw, DollarSign, Euro, IndianRupee } from 'lucide-react';
import { CURRENCIES, convertCurrency } from './finance.data.js';
import './FinanceConverter.css';

const FinanceConverter = () => {
  const [amount, setAmount] = useState(1);
  const [from,   setFrom]   = useState('USD');
  const [to,     setTo]     = useState('INR');
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult(convertCurrency(amount, from, to));
  }, [amount, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">

      {/* Header */}
      <div className="glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Landmark className="text-white w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold dark:text-white">Finance Converter</h2>
            <p className="text-slate-500 font-medium">Real-time exchange simulation.</p>
          </div>
        </div>
      </div>

      {/* Converter panel */}
      <div className="glass-card p-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

          {/* Amount input */}
          <div className="space-y-4">
            <label className="block text-xs font-black uppercase text-slate-500 tracking-widest">Amount to Convert</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-2xl font-black outline-none focus:ring-2 focus:ring-amber-500/20 dark:text-white transition-all"
            />
          </div>

          {/* From / Swap / To */}
          <div className="flex flex-col md:flex-row items-center gap-4 col-span-2">
            <div className="flex-1 w-full space-y-4">
              <label className="block text-xs font-black uppercase text-slate-500 tracking-widest">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold dark:text-white outline-none cursor-pointer"
              >
                {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <button
              onClick={swap}
              className="p-5 bg-amber-500/10 text-amber-600 rounded-full hover:bg-amber-500 hover:text-white transition-all active:rotate-180 duration-500 mt-8"
            >
              <ArrowRightLeft size={24} />
            </button>

            <div className="flex-1 w-full space-y-4">
              <label className="block text-xs font-black uppercase text-slate-500 tracking-widest">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold dark:text-white outline-none cursor-pointer"
              >
                {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Conversion Result</span>
          <div className="text-6xl font-black text-amber-600 dark:text-amber-500 drop-shadow-sm transition-all">
            {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
            <span className="text-2xl font-bold text-slate-400">{to}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-4 flex items-center gap-2">
            <RefreshCw size={10} className="animate-spin-slow" /> Market Rates Sync: Live
          </p>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { Icon: DollarSign, color: 'text-emerald-500', hoverBg: 'hover:bg-emerald-500/5', label: 'United States', status: 'Active'       },
          { Icon: IndianRupee,color: 'text-indigo-500',  hoverBg: 'hover:bg-indigo-500/5',  label: 'India (INR)',   status: 'Stable'      },
          { Icon: Euro,       color: 'text-blue-500',    hoverBg: 'hover:bg-blue-500/5',    label: 'European Union',status: 'Market Open' },
        ].map(({ Icon, color, hoverBg, label, status }) => (
          <div key={label} className={`glass-card p-6 flex flex-col items-center gap-2 group ${hoverBg} transition-colors`}>
            <Icon className={`${color} mb-2`} />
            <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
            <span className="text-lg font-black dark:text-white">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceConverter;
