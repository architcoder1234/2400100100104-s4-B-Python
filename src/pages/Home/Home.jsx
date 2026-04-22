// ── Home.jsx ──────────────────────────────────────────────────
// Dashboard page — shows all tool cards and user stats.
// Data (tools array, weather fetch) lives in home.data.js
// Styles live in Home.css
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ListTodo, GraduationCap, Cloud, Zap, Calculator,
  Users, MapPin, TrendingUp, Notebook, Ruler,
  Landmark, Gamepad2, ShieldCheck, ArrowRight,
} from 'lucide-react';

import { getTools, fetchDashboardWeather } from './home.data.js';
import './Home.css';

// ── Icon map: string name → Lucide component ─────────────────
const ICON_MAP = {
  ListTodo, GraduationCap, Cloud, Zap, Calculator,
  Users, MapPin, Notebook, Ruler, Landmark, Gamepad2, ShieldCheck,
};

// ── Draggable "pull down to go to Portfolio" handle ───────────
const PullWire = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="fixed top-0 right-8 sm:right-24 z-50 flex flex-col items-center cursor-grab active:cursor-grabbing origin-top"
      drag="y"
      dragConstraints={{ top: 0, bottom: 80 }}
      dragElastic={0.4}
      whileDrag={{ scale: 1.05 }}
      onDragEnd={(_, info) => { if (info.offset.y > 50) navigate('/'); }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.5 }}
    >
      <div className="pull-wire-line" />
      <div className="pull-wire-knob">
        <span className="text-[12px] font-black uppercase text-indigo-400">Pf</span>
      </div>
      <p className="mt-3 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 animate-pulse">
        ↓ Pull Down
      </p>
    </motion.div>
  );
};

// ── Main Dashboard Component ──────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ todos: 0, students: 0, temp: '--', snakeHi: 0 });
  const [user, setUser]   = useState(null);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) setUser(activeUser);

    const todos    = JSON.parse(localStorage.getItem('react-tools-todo') || '[]');
    const students = JSON.parse(localStorage.getItem('react-tools-students') || '[]');
    const snakeHi  = parseInt(localStorage.getItem('react-tools-snake-hi') || '0');

    setStats(prev => ({ ...prev, todos: todos.filter(t => !t.completed).length, students: students.length, snakeHi }));

    fetchDashboardWeather().then(temp => setStats(prev => ({ ...prev, temp })));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('activeUser');
    setUser(null); // FIX: update state directly — no full page reload needed
  };

  const tools = getTools(stats);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      <PullWire />

      <header className="text-center space-y-4 pt-10">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-500 text-xs font-bold uppercase tracking-widest">
            <TrendingUp size={14} /> System Dashboard v2.0
          </div>

          {user ? (
            <div className="space-y-6">
              <h1 className="text-6xl font-black dark:text-white tracking-tight animate-in slide-in-from-top-4 duration-700">
                Welcome back, <span className="text-indigo-600 dark:text-indigo-400 glow-text animate-glow">{user.name}</span>!
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-bold uppercase tracking-widest opacity-60">
                Your personalized tools are synced and live.
              </p>

              {/* Live stat counters */}
              <div className="flex flex-wrap justify-center gap-4 py-6">
                {[
                  { label: 'Pending Tasks', value: stats.todos,    color: 'text-indigo-500',  path: '/todo'     },
                  { label: 'Students',      value: stats.students, color: 'text-emerald-500', path: '/students' },
                  { label: 'Temperature',   value: stats.temp,     color: 'text-sky-500',     path: '/weather'  },
                  { label: 'Snake Record',  value: stats.snakeHi,  color: 'text-amber-500',   path: '/snake'    },
                ].map(stat => (
                  <button
                    key={stat.label}
                    onClick={() => navigate(stat.path)}
                    className="stat-card flex flex-col items-center px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:scale-110 active:scale-95 transition-all group"
                  >
                    <span className={`text-2xl font-black ${stat.color} group-hover:scale-110 transition-transform`}>{stat.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors border-b border-transparent hover:border-indigo-500"
              >
                Sign Out / Switch Account
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-6xl font-black dark:text-white tracking-tight glow-text animate-glow">Pro Toolset Hub</h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Your high-performance workspace with real-time data persistence and advanced utilities.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => {
          const Icon = ICON_MAP[tool.icon];
          return (
            <NavLink
              key={tool.path}
              to={tool.path}
              className="tool-card glass-card group hover:translate-y-[-8px] transition-all duration-300 p-8 flex flex-col gap-6 cursor-pointer hover:shadow-indigo-500/20 active:scale-[0.98] relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center transition-colors group-hover:bg-indigo-600`}>
                {Icon && <Icon className={`${tool.color} w-8 h-8 group-hover:text-white transition-colors`} />}
              </div>

              {tool.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/50 dark:bg-slate-800/50 rounded-full text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
                  {tool.badge}
                </span>
              )}

              <div className="space-y-2">
                <h3 className="text-2xl font-bold dark:text-white group-hover:text-indigo-500 transition-colors uppercase tracking-tight">{tool.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{tool.desc}</p>
              </div>

              <div className="mt-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight size={12} />
              </div>

              <div className="tool-card-bar" />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
