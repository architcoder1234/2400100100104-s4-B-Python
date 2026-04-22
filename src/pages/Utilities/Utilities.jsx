import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, Plus, Minus, ArrowRight, History, Palette } from 'lucide-react';
import './Utilities.css';

const Utilities = () => {
  const navigate = useNavigate();
  // Stopwatch State
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  // Counter State
  const [count, setCount] = useState(0);

  // Palindrome State
  const [word, setWord] = useState('');
  const [isPalindrome, setIsPalindrome] = useState(null);

  // PERF FIX: use Date.now() diff so we fire only every 100ms (10× fewer
  // re-renders) while keeping millisecond-accurate display.
  const startRef = useRef(0);
  const startTimer = () => { startRef.current = Date.now() - time; setRunning(true); };
  const stopTimer  = () => setRunning(false);
  const resetTimer = () => { setTime(0); setRunning(false); setLaps([]); };
  const recordLap  = () => setLaps([...laps, time]);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startRef.current);
      }, 100); // 100ms is enough for a smooth display
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const formatTime = (t) => {
    const mins = Math.floor(t / 60000).toString().padStart(2, '0');
    const secs = Math.floor((t % 60000) / 1000).toString().padStart(2, '0');
    const ms = Math.floor((t % 1000) / 10).toString().padStart(2, '0');
    return `${mins}:${secs}:${ms}`;
  };

  // Palindrome Logic
  const checkPalindrome = (val) => {
    setWord(val);
    const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '');
    setIsPalindrome(clean === clean.split('').reverse().join('') && clean.length > 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in slide-in-from-bottom-5 duration-700">

      {/* Stopwatch Card */}
      <div className="glass-card p-6 space-y-6 flex flex-col items-center flex-grow min-h-[400px]">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-500" /> Stopwatch
        </h3>
        <div className="text-5xl font-mono dark:text-white tabular-nums bg-slate-100 dark:bg-slate-800 p-4 rounded-xl shadow-inner w-full text-center">
          {formatTime(time)}
        </div>
        <div className="flex gap-4">
          {!running ? (
            <button onClick={startTimer} className="p-4 bg-emerald-500 text-white rounded-full hover:shadow-lg hover:emerald-500/30 transition-all"><Play fill="currentColor" /></button>
          ) : (
            <button onClick={stopTimer} className="p-4 bg-amber-500 text-white rounded-full hover:shadow-lg hover:amber-500/30 transition-all"><Pause fill="currentColor" /></button>
          )}
          <button onClick={resetTimer} className="p-4 bg-rose-500 text-white rounded-full hover:shadow-lg hover:rose-500/30 transition-all"><RotateCcw /></button>
          <button onClick={recordLap} disabled={!running} className="px-6 py-2 bg-indigo-600 text-white rounded-xl disabled:opacity-50 font-bold">Lap</button>
        </div>
        <div className="w-full space-y-2 overflow-y-auto max-h-32 pr-2">
          {laps.map((lap, i) => (
            <div key={i} className="flex justify-between p-2 text-sm bg-slate-50 dark:bg-slate-800/30 rounded-lg dark:text-slate-100">
              <span className="font-semibold text-indigo-500">Lap {i + 1}</span>
              <span>{formatTime(lap)}</span>
            </div>
          )).reverse()}
        </div>
      </div>

      {/* Counter Card */}
      <div className="glass-card p-6 space-y-6 flex flex-col items-center">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-500" /> Smart Counter
        </h3>
        <div className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400 py-6">{count}</div>
        <div className="flex gap-4 w-full">
          <button onClick={() => setCount(count - 1)} className="flex-1 p-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"><Minus className="mx-auto" /></button>
          <button onClick={() => setCount(0)} className="px-6 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-bold uppercase tracking-wider">Reset</button>
          <button onClick={() => setCount(count + 1)} className="flex-1 p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all"><Plus className="mx-auto" /></button>
        </div>
      </div>

      {/* Palindrome Checker Card */}
      <div className="glass-card p-6 space-y-6">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-500" /> Palindrome Checker
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Enter text below to check if it's a palindrome.</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Type word..."
            onChange={(e) => checkPalindrome(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white"
          />
          {word && (
            <div className={`p-4 rounded-xl flex items-center gap-2 font-bold ${isPalindrome ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'}`}>
              <CheckCircle2 className="w-4 h-4" />
              {isPalindrome ? 'It IS a Palindrome!' : 'NOT a Palindrome'}
            </div>
          )}
        </div>
      </div>

      {/* Gradient Generator Card */}
      <div className="glass-card p-6 space-y-6 flex flex-col items-center bg-gradient-to-br from-indigo-500/5 to-purple-500/5 hover:from-indigo-500/10 hover:to-purple-500/10 transition-all border-indigo-500/20 group">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Palette className="w-8 h-8 text-indigo-500" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold dark:text-white">Gradient Forge</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Design custom premium buttons with live interactive previews.</p>
        </div>
        <button 
          onClick={() => navigate('/gradient-generator')}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Launch Forge <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};

const CheckCircle2 = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;

export default Utilities;
