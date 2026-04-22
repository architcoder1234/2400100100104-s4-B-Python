// ── ThemeModal.jsx ───────────────────────────────────────────
// Settings popup modal (dark/light, accent colour, cursor, notifications).
// Opened by the ⚙️ button in Navigation.
// Styles: inline Tailwind only.
// ─────────────────────────────────────────────────────────────

import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, Sun, Moon, X, Bell, Volume2, ArrowRight } from 'lucide-react';
import { useTheme }        from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import Toggle              from '../Toggle';

const ThemeModal = memo(({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, colorTheme, setColorTheme, glowSize, setGlowSize, cursorMode, setCursorMode } = useTheme();
  const { notificationsEnabled, toggleNotifications, soundsEnabled, toggleSounds } = useNotification();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md glass-card p-8 space-y-8 animate-in zoom-in-95 duration-300 shadow-2xl border-indigo-500/20">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold dark:text-white leading-none">System Settings</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-60">Personalize your toolset</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-500 hover:text-red-500 hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* ── Appearance ── */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Appearance</h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => { if (isDarkMode) toggleTheme(); }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${!isDarkMode ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-indigo-500/30'}`}>
                <Sun size={20} className={!isDarkMode ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="text-[10px] font-black uppercase dark:text-white">Light</span>
              </button>
              <button onClick={() => { if (!isDarkMode) toggleTheme(); }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${isDarkMode ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-indigo-500/30'}`}>
                <Moon size={20} className={isDarkMode ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="text-[10px] font-black uppercase dark:text-white">Dark</span>
              </button>
            </div>

            {/* Accent colour */}
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mt-6">Accent Gradient</h4>
            <div className="relative">
              <select value={colorTheme} onChange={(e) => setColorTheme(e.target.value)}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer">
                <option value="default">Default Indigo</option>
                <option value="ocean">Ocean Blue</option>
                <option value="sunset">Sunset Warmth</option>
                <option value="forest">Forest Green</option>
                <option value="berry">Berry Purple</option>
                <option value="cyber">Cyber Dark</option>
                <option value="custom">Custom Forge</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-indigo-500">
                <Palette size={16} />
              </div>
            </div>

            {/* Glow size */}
            <div className="pt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Cursor Glow Size</h4>
                <span className="text-xs font-bold text-slate-400">{glowSize}px</span>
              </div>
              <input type="range" min="0" max="800" value={glowSize} onChange={(e) => setGlowSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>

            {/* Cursor style */}
            <div className="pt-4 space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Interactive Cursor Style</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none',      label: 'Default',   icon: '🖱️' },
                  { id: 'spotlight', label: 'Spotlight',  icon: '✨' },
                  { id: 'rocket',    label: 'Rocket',     icon: '🚀' },
                  { id: 'crosshair', label: 'Crosshair',  icon: '⊕'  },
                  { id: 'minimal',   label: 'Minimal',    icon: '⭕'  },
                ].map((mode) => (
                  <button key={mode.id} onClick={() => setCursorMode(mode.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${cursorMode === mode.id ? 'border-indigo-500 bg-indigo-500/5 text-indigo-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-indigo-500/20'}`}>
                    <span className="text-sm">{mode.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── System Preferences ── */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">System Preferences</h4>
            <div className="space-y-2">
              <Toggle enabled={notificationsEnabled} onToggle={toggleNotifications} icon={Bell}    label="Notifications" />
              <Toggle enabled={soundsEnabled}        onToggle={toggleSounds}        icon={Volume2} label="System Sounds" />
            </div>
          </div>

          {/* ── Gradient Forge CTA ── */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button onClick={() => { onClose(); navigate('/gradient-generator'); }}
              className="w-full flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform"><Palette size={18} /></div>
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-tight">Gradient Forge</p>
                  <p className="text-[9px] font-medium opacity-80">Build your own custom buttons</p>
                </div>
              </div>
              <div className="p-2 bg-white/10 rounded-full group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></div>
            </button>
          </div>
        </div>

        <p className="text-center text-[9px] font-black uppercase tracking-widest text-slate-400">
          Settings are synced to your local workspace
        </p>
      </div>
    </div>
  );
});

export default ThemeModal;
