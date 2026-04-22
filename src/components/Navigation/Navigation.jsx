// ── Navigation.jsx ───────────────────────────────────────────
// Top sticky nav bar — logo, search bar, dark-mode toggle, settings button.
// Wrapped in React.memo to prevent re-renders from unrelated state.
// Props: onThemeClick, onSearchClick
// ─────────────────────────────────────────────────────────────

import React, { useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Palette, Sun, Moon, X, Search, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Navigation.css';

const Navigation = memo(({ onThemeClick, onSearchClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="nav-bar bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl text-slate-900 dark:text-white px-6 py-3.5 flex gap-6 items-center shadow-2xl dark:shadow-[0_8px_30px_rgba(99,102,241,0.15)] rounded-3xl border border-white/40 dark:border-white/10 transition-colors duration-700">

        {/* Logo → Dashboard */}
        <NavLink to="/dashboard" className="flex items-center gap-4 hover:opacity-80 transition-all group shrink-0">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-lg text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">⚡</div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 leading-none mb-1">Creative Developer</span>
            <span className="text-xl font-bold tracking-tight">Archit Srivastava</span>
          </div>
        </NavLink>

        {/* Search bar (desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <button onClick={onSearchClick}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/40 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-2xl border border-slate-200/80 dark:border-white/10 transition-all text-slate-500 shadow-inner group"
            title="Global Search (Ctrl+K)">
            <Search size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
            <span className="text-sm font-medium tracking-wide opacity-80 mr-auto dark:text-slate-400 group-hover:dark:text-slate-300">
              Search tools, apps, and utilities...
            </span>
            <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <span className="px-2 py-0.5 bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-white/10 text-[10px] font-black text-slate-400 dark:text-slate-500">CTRL</span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-white/10 text-[10px] font-black text-slate-400 dark:text-slate-500">K</span>
            </div>
          </button>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
          {/* Mobile search */}
          <button onClick={onSearchClick} className="lg:hidden p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-slate-500 dark:text-slate-400 group border border-slate-200 dark:border-slate-700/50">
            <Search size={20} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Dark mode toggle */}
          <button onClick={toggleTheme}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-yellow-500 dark:text-yellow-400 shadow-inner group border border-slate-200 dark:border-slate-700/50"
            title="Quick Theme Toggle">
            {isDarkMode
              ? <Sun  size={20} className="group-hover:rotate-90 transition-transform"  />
              : <Moon size={20} className="group-hover:-rotate-12 transition-transform" />}
          </button>

          {/* Settings (desktop) */}
          <button onClick={onThemeClick}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-indigo-500 dark:text-indigo-400 shadow-inner group border border-slate-200 dark:border-slate-700/50 hidden sm:flex"
            title="System Settings">
            <Palette size={20} className="group-hover:rotate-45 transition-transform" />
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-indigo-500 dark:text-indigo-400 group border border-slate-200 dark:border-slate-700/50">
            {isMobileMenuOpen
              ? <X    size={20} className="group-hover:rotate-90 transition-transform"  />
              : <Menu size={20} className="group-hover:scale-110 transition-transform" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[115%] inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl rounded-3xl p-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setIsMobileMenuOpen(false); onThemeClick(); }}
              className="p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-3 sm:hidden">
              <Palette size={18} className="text-indigo-500" /> Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Navigation;
