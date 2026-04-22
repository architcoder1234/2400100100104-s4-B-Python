// ── Weather.jsx ──────────────────────────────────────────────
// Live weather forecast page using wttr.in API.
// Styles → Weather.css
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { CloudSun, Search, Wind, Droplets, Thermometer, MapPin, Navigation, Cloud, AlertCircle, RefreshCcw, Eye } from 'lucide-react';
import './Weather.css';

const Weather = () => {
  const [city,    setCity]    = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchWeather = async (e, signal) => {
    if (e) e.preventDefault();
    if (!city.trim()) return;
    setLoading(true); setError(null);
    try {
      const res  = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { signal });
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      const c    = data.current_condition[0];
      setWeather({
        temp: parseInt(c.temp_C), feelsLike: parseInt(c.FeelsLikeC),
        condition: c.weatherDesc[0].value, humidity: parseInt(c.humidity),
        wind: parseInt(c.windspeedKmph),   visibility: parseInt(c.visibility),
      });
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError('Could not find weather for this city. Please try another.');
    } finally {
      if (!signal || !signal.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();
    fetchWeather(null, ctrl.signal);
    return () => ctrl.abort();
  }, []);

  const stats = weather ? [
    { label: 'Feels Like',  value: `${weather.feelsLike}°C`, icon: Thermometer, color: 'text-rose-500',    border: 'hover:border-rose-500'    },
    { label: 'Humidity',    value: `${weather.humidity}%`,   icon: Droplets,    color: 'text-sky-500',     border: 'hover:border-sky-500'     },
    { label: 'Wind Speed',  value: `${weather.wind} km/h`,   icon: Wind,        color: 'text-emerald-500', border: 'hover:border-emerald-500' },
    { label: 'Visibility',  value: `${weather.visibility}km`,icon: Eye,         color: 'text-amber-500',   border: 'hover:border-amber-500'   },
  ] : [];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-6 duration-700 pb-10">
      <div className="glass-card p-12 space-y-12 overflow-hidden relative group border-none shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-sky-500/10 transition-all duration-700" />

        {/* Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700">
              <CloudSun className="text-indigo-500 w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold dark:text-white leading-none tracking-tight">SkyForecast</h2>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-2 block animate-pulse">Live Data Sync Active</span>
            </div>
          </div>
          <form onSubmit={fetchWeather} className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 group/input">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors" />
              <input type="text" placeholder="City (e.g. Mumbai, Tokyo)..." value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all" />
            </div>
            <button type="submit" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2">
              {loading ? <RefreshCcw size={18} className="animate-spin" /> : <Search size={18} />} Search
            </button>
          </form>
        </div>

        {/* Error */}
        {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm font-bold flex items-center gap-2"><AlertCircle size={18} /> {error}</div>}

        {/* Temp display */}
        {weather && (
          <div className={`transition-all duration-500 ${loading ? 'opacity-30 blur-sm' : ''} flex flex-col items-center py-10`}>
            <div className="flex items-center gap-2 mb-2 text-indigo-500 uppercase font-black text-[10px] tracking-[0.3em]">
              <Navigation className="w-3 h-3 animate-bounce" /> Currently in
            </div>
            <h1 className="text-8xl md:text-9xl font-black dark:text-white mb-2 tracking-tighter drop-shadow-2xl">{weather.temp}°C</h1>
            <h2 className="text-3xl font-bold dark:text-gray-300 uppercase tracking-[0.2em]">{city}</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-semibold mt-4 py-2 px-8 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center gap-2">
              <Cloud size={18} className="text-indigo-400" /> {weather.condition}
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !weather && (
          <div className="flex flex-col items-center py-16 gap-4">
            <div className="w-32 h-24 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
            <div className="w-48 h-6  bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        )}

        {/* Stat grid */}
        {weather && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {stats.map(({ label, value, icon: Icon, color, border }) => (
              <div key={label} className={`p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-2 group ${border} transition-all`}>
                <Icon className={`${color} w-6 h-6 mb-2`} />
                <span className="text-[10px] uppercase font-bold text-slate-500">{label}</span>
                <span className="text-xl font-bold dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest pt-4 opacity-50">
          Data from wttr.in · Global Observation Network
        </p>
      </div>
    </div>
  );
};

export default Weather;
