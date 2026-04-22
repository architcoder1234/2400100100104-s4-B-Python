// ── CodeBreaker.jsx ──────────────────────────────────────────
// Wordle-style code breaking game (numbers & words).
// Data & logic → codebreaker.data.js
// Styles       → CodeBreaker.css
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Hash, Terminal, Type, Lightbulb, Delete, CornerDownLeft } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { MAX_ATTEMPTS, generateNumericCode, getRandomWord, getFeedback } from './codebreaker.data.js';
import './CodeBreaker.css';

// ── On-screen keyboard ───────────────────────────────────────
const Keyboard = ({ gameMode, onKey, onDelete, onSubmit }) => {
  if (gameMode === 'numbers') {
    const keys = ['7','8','9','4','5','6','1','2','3','DEL','0','ENT'];
    return (
      <div className="grid grid-cols-3 gap-2 w-full">
        {keys.map(k => (
          <button key={k} onClick={() => k === 'DEL' ? onDelete() : k === 'ENT' ? onSubmit() : onKey(k)}
            className={`h-12 flex items-center justify-center rounded-xl font-black text-xs transition-all active:scale-95 ${k === 'ENT' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : k === 'DEL' ? 'bg-slate-200 dark:bg-slate-800 text-slate-500' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white hover:border-indigo-500'}`}>
            {k === 'ENT' ? <CornerDownLeft size={16} /> : k === 'DEL' ? <Delete size={16} /> : k}
          </button>
        ))}
      </div>
    );
  }
  const rows = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['Z','X','C','V','B','N','M']];
  return (
    <div className="flex flex-col gap-1.5 w-full items-center">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1.5">
          {row.map(k => (
            <button key={k} onClick={() => onKey(k)} className="w-8 h-10 flex items-center justify-center rounded-lg font-black text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white hover:border-indigo-500 transition-all active:scale-95">{k}</button>
          ))}
        </div>
      ))}
      <div className="flex gap-2 mt-1">
        <button onClick={onSubmit} className="h-10 px-5 flex items-center gap-2 rounded-lg bg-indigo-600 text-white font-black text-xs hover:bg-indigo-500 transition-all active:scale-95"><CornerDownLeft size={14} /> Enter</button>
        <button onClick={onDelete} className="h-10 px-5 flex items-center gap-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 font-black text-xs transition-all active:scale-95"><Delete size={14} /> Del</button>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
const CodeBreaker = () => {
  const { addToast } = useNotification();
  const [gameMode,     setGameMode]     = useState('numbers');
  const [targetCode,   setTargetCode]   = useState('');
  const [targetClue,   setTargetClue]   = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [history,      setHistory]      = useState([]);
  const [gameState,    setGameState]    = useState('playing');
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [hintIndex,    setHintIndex]    = useState(-1);

  useEffect(() => { generateCode(); }, [gameMode]);

  const generateCode = () => {
    if (gameMode === 'numbers') {
      setTargetCode(generateNumericCode()); setTargetClue('');
    } else {
      const entry = getRandomWord();
      setTargetCode(entry.word); setTargetClue(entry.clue);
    }
    setHistory([]); setCurrentGuess(''); setGameState('playing'); setAttemptsUsed(0); setHintIndex(-1);
  };

  const handleKey   = (char) => { if (gameState !== 'playing' || currentGuess.length >= targetCode.length) return; setCurrentGuess(p => p + char.toUpperCase()); };
  const handleDelete = () => { if (gameState !== 'playing') return; setCurrentGuess(p => p.slice(0, -1)); };

  const handleSubmit = () => {
    if (gameState !== 'playing' || currentGuess.length !== targetCode.length) return;
    const feedback   = getFeedback(currentGuess, targetCode);
    const newHistory = [{ guess: currentGuess, feedback }, ...history];
    setHistory(newHistory); setAttemptsUsed(p => p + 1); setCurrentGuess('');
    if (currentGuess === targetCode) { setGameState('won');  addToast('SECURITY BREACHED!', 'success'); }
    else if (newHistory.length >= MAX_ATTEMPTS) { setGameState('lost'); addToast('NODE LOCKDOWN!', 'error'); }
  };

  const requestHint = () => {
    if (gameState !== 'playing' || attemptsUsed >= MAX_ATTEMPTS - 2) { addToast('Hint Rejected.', 'warning'); return; }
    setAttemptsUsed(p => p + 2);
    setHistory(p => [{ guess: targetCode, feedback: 'penalty' }, ...p]);
    const newIdx = hintIndex + 1;
    if (newIdx < targetCode.length) { setHintIndex(newIdx); addToast(`Hint: starts with "${targetCode.slice(0, newIdx + 1)}"`, 'info'); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-700">

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30"><Terminal size={28} /></div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Cortex Cracker</h2>
            <div className="flex items-center gap-2 opacity-50"><ShieldCheck size={12} /><span className="text-[10px] font-bold uppercase tracking-widest">Protocol v2.0</span></div>
          </div>
        </div>
        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          {['numbers','words'].map(mode => (
            <button key={mode} onClick={() => setGameMode(mode)} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${gameMode === mode ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              {mode === 'numbers' ? <><Hash size={12}/> Numeric</> : <><Type size={12}/> Word Mode</>}
            </button>
          ))}
        </div>
      </div>

      {/* Clue */}
      {gameMode === 'words' && (
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl flex items-center gap-6 animate-in slide-in-from-top-4 duration-500">
          <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl"><Lightbulb className="animate-pulse" /></div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-1">Encrypted System Clue</p>
            <p className="text-lg font-bold dark:text-white italic">"{targetClue}"</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Input panel */}
        <div className="space-y-6">
          <div className="glass-card p-8 flex flex-col items-center gap-6 border-indigo-500/10">
            {/* Letter boxes */}
            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: targetCode.length }).map((_, i) => (
                <div key={i} className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${currentGuess[i] ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500 scale-105' : 'border-slate-200 dark:border-slate-800 dark:text-white'}`}>
                  {currentGuess[i] || ''}
                </div>
              ))}
            </div>
            <Keyboard gameMode={gameMode} onKey={handleKey} onDelete={handleDelete} onSubmit={handleSubmit} />
            <div className="w-full flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Attempts: <span className="text-indigo-500">{attemptsUsed}</span> / {MAX_ATTEMPTS}</p>
              <button onClick={requestHint} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                <Lightbulb size={12} /> Hint (-2 attempts)
              </button>
            </div>
          </div>

          {/* Win/Loss */}
          {gameState !== 'playing' && (
            <div className={`p-8 rounded-3xl border-2 animate-in zoom-in-95 duration-300 text-center space-y-4 ${gameState === 'won' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'}`}>
              <h3 className="text-4xl font-black uppercase tracking-tighter">{gameState === 'won' ? 'Uplink Established' : 'Access Denied'}</h3>
              <p className="font-bold opacity-80 uppercase text-xs tracking-widest">Secret: <span className="text-2xl font-black">{targetCode}</span></p>
              <button onClick={generateCode} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">Next Protocol</button>
            </div>
          )}
        </div>

        {/* History log */}
        <div className="glass-card p-0 flex flex-col bg-slate-50/50 dark:bg-slate-900/50 min-h-[500px]">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400">Decryption History</h3>
            <div className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-10 py-20 grayscale"><ShieldCheck size={64} /><p className="text-[10px] font-black uppercase tracking-widest">Awaiting first guess...</p></div>
            ) : (
              history.map((entry, idx) => (
                <div key={idx} className="animate-in slide-in-from-right-4 duration-300">
                  {entry.feedback === 'penalty' ? (
                    <div className="h-10 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Penalty: Hint Injected</div>
                  ) : (
                    <div className="flex gap-1.5">
                      {entry.guess.split('').map((char, i) => (
                        <div key={i} className={`flex-1 h-10 rounded-xl flex items-center justify-center font-black text-base border-2 transition-all ${entry.feedback[i] === 'green' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : entry.feedback[i] === 'yellow' ? 'bg-amber-500/10 border-amber-500/30 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400 opacity-60'}`}>{char}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBreaker;
