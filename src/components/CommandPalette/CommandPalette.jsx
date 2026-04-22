// ── CommandPalette.jsx ───────────────────────────────────────
// Global Ctrl+K search palette.
// NEW: full ↑↓ keyboard navigation + highlighted selected row.
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ListTodo, GraduationCap, Cloud, Zap, Calculator, Users, MapPin, Notebook, Ruler, Landmark, Gamepad2, ShieldCheck, User, ChevronRight } from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState(0);
  const navigate   = useNavigate();
  const listRef    = useRef(null);
  const inputRef   = useRef(null);

  const tools = useMemo(() => [
    { title: 'My Portfolio',      path: '/',           icon: User,        category: 'General'      },
    { title: 'Hub Dashboard',     path: '/dashboard',  icon: Zap,         category: 'General'      },
    { title: 'To-Do List',        path: '/todo',       icon: ListTodo,    category: 'Productivity' },
    { title: 'Student Directory', path: '/students',   icon: GraduationCap, category: 'Education'  },
    { title: 'Weather Forecast',  path: '/weather',    icon: Cloud,       category: 'Utilities'    },
    { title: 'Geographic Map',    path: '/map',        icon: MapPin,      category: 'Utilities'    },
    { title: 'Finance Center',    path: '/finance',    icon: Landmark,    category: 'Finance'      },
    { title: 'Unit Converter',    path: '/units',      icon: Ruler,       category: 'Math'         },
    { title: 'Quick Notes',       path: '/notes',      icon: Notebook,    category: 'Productivity' },
    { title: 'Utility Suite',     path: '/utilities',  icon: Zap,         category: 'General'      },
    { title: 'Math Studio',       path: '/math',       icon: Calculator,  category: 'Math'         },
    { title: 'Snake Arena',       path: '/snake',      icon: Gamepad2,    category: 'Games'        },
    { title: 'Code Breaker',      path: '/codebreaker',icon: ShieldCheck, category: 'Games'        },
    { title: 'Security Auth',     path: '/auth',       icon: Users,       category: 'General'      },
  ], []);

  const filtered = useMemo(() =>
    query === '' ? tools : tools.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
    ), [query, tools]);

  // Reset on open
  useEffect(() => { if (isOpen) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [isOpen]);

  // Reset selection when results change
  useEffect(() => { setSelected(0); }, [filtered]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const open = (path) => { navigate(path); onClose(); };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filtered.length > 0) open(filtered[selected].path);
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in slide-in-from-top-4 duration-200">
        {/* Search input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tools, games, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium dark:text-white"
          />
          <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-500 shrink-0">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((tool, idx) => (
                <button
                  key={tool.path}
                  data-idx={idx}
                  onClick={() => open(tool.path)}
                  onMouseEnter={() => setSelected(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group active:scale-[0.98] ${
                    idx === selected
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-500/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-all ${idx === selected ? 'bg-indigo-600 text-white' : 'bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                      <tool.icon size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className={`font-bold uppercase tracking-tight text-sm transition-colors ${idx === selected ? 'text-indigo-600 dark:text-indigo-400' : 'dark:text-white'}`}>
                        {tool.title}
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 opacity-60">{tool.category}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`transition-all ${idx === selected ? 'text-indigo-500 translate-x-1' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm font-bold dark:text-white uppercase">No results</p>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          <span className="flex gap-4">
            <span>↑↓ Navigate</span>
            <span>⏎ Open</span>
            <span>ESC Close</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
