// ── LoadingScreen.jsx ────────────────────────────────────────
// Startup animation shown once when the app first loads.
// Uses PURE CSS keyframes (defined in src/index.css) — zero
// per-frame JS re-renders, smooth on any device.
//
// To change the name shown: edit firstName / lastName below.
// To change duration:       edit DURATION and also the
//                           setTimeout in App.jsx (must match).
// ─────────────────────────────────────────────────────────────

import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  // ── Config — edit these to personalise ───────────────────
  const DURATION  = 1600;         // ms (match App.jsx timer)
  const firstName = 'ARCHIT';
  const lastName  = 'SRIVASTAVA';
  // ─────────────────────────────────────────────────────────

  const firstDelay   = 0.3;
  const charGap      = 0.055;
  const lastStart    = firstDelay + firstName.length * charGap + 0.2;
  const underlineDel = lastStart  + lastName.length  * charGap + 0.05;
  const subtitleDel  = underlineDel + 0.2;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-[1000] bg-[#060612] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="loader-blob absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full" style={{ filter: 'blur(80px)' }} />
        <div className="loader-blob absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-600/10 rounded-full" style={{ filter: 'blur(80px)', animationDelay: '1.2s' }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6">

        {/* Icon */}
        <div className="loader-icon relative">
          <div className="absolute inset-0 rounded-[28px] bg-indigo-500 opacity-30 blur-xl scale-125" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[28px] flex items-center justify-center text-4xl shadow-2xl shadow-indigo-500/40">
            ⚡
          </div>
        </div>

        {/* Name */}
        <div className="text-center space-y-3" style={{ perspective: '800px' }}>
          <div className="text-5xl md:text-7xl font-black tracking-[0.12em] text-white leading-none">
            {firstName.split('').map((char, i) => (
              <span key={i} className="loader-letter" style={{ animationDelay: `${firstDelay + i * charGap}s` }}>{char}</span>
            ))}
          </div>
          <div className="text-5xl md:text-7xl font-black tracking-[0.12em] leading-none"
            style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {lastName.split('').map((char, i) => (
              <span key={i} className="loader-letter" style={{ animationDelay: `${lastStart + i * charGap}s` }}>{char}</span>
            ))}
          </div>
          <div className="loader-underline mx-auto h-[2px] w-48 rounded-full opacity-0"
            style={{ background: 'linear-gradient(90deg, transparent, #818cf8, #c084fc, transparent)', animationDelay: `${underlineDel}s` }} />
          <p className="loader-subtitle text-[11px] font-black uppercase tracking-[0.45em] text-indigo-400 mt-3 opacity-0"
            style={{ animationDelay: `${subtitleDel}s` }}>
            React Project Portfolio
          </p>
        </div>

        {/* Progress bar — pure CSS, no JS counter */}
        <div className="loader-progress-wrap w-64 space-y-2 opacity-0">
          <div className="w-full h-[3px] rounded-full bg-white/5 overflow-hidden">
            <div className="loader-bar-inner h-full rounded-full"
              style={{ animationDuration: `${DURATION}ms`, background: 'linear-gradient(90deg, #6366f1, #a855f7, #38bdf8)', boxShadow: '0 0 10px rgba(99,102,241,0.6)' }} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Initializing Ecosystem</span>
            <span className="text-[9px] font-black text-indigo-500">v1.2.0</span>
          </div>
        </div>
      </div>

      <div className="loader-footer absolute bottom-10 text-[9px] font-black uppercase tracking-[0.35em] text-slate-700 opacity-0">
        Logic & Innovation Suite v1.2.0
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
