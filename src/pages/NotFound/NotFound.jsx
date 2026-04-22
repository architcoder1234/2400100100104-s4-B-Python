// ── NotFound.jsx ─────────────────────────────────────────────
// 404 page — shown for any unknown route.
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-8 max-w-lg">
        {/* Glitchy 404 */}
        <div className="relative select-none">
          <p className="text-[10rem] font-black leading-none tracking-tighter text-slate-100 dark:text-slate-800">404</p>
          <p className="text-[10rem] font-black leading-none tracking-tighter text-indigo-500/20 absolute inset-0 blur-sm">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">⚡</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tight">Page not found</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            The route you are looking for doesn't exist or was moved.
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-white font-bold rounded-xl transition-all"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all"
          >
            <Home size={16} /> Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
