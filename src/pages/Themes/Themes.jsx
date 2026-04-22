import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, Check } from 'lucide-react';
import './Themes.css';

const availableThemes = [
  {
    id: 'default',
    name: 'Default Indigo',
    preview: ['#6366f1', '#8b5cf6'],
    desc: 'Classic indigo-violet gradient',
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    preview: ['#0ea5e9', '#3b82f6'],
    desc: 'Cool ocean-inspired blues',
  },
  {
    id: 'sunset',
    name: 'Sunset Warmth',
    preview: ['#f97316', '#f43f5e'],
    desc: 'Warm orange and rose tones',
  },
  {
    id: 'forest',
    name: 'Forest Green',
    preview: ['#10b981', '#14b8a6'],
    desc: 'Fresh greens and teals',
  },
  {
    id: 'berry',
    name: 'Berry Purple',
    preview: ['#a855f7', '#d946ef'],
    desc: 'Deep purple and pink',
  },
  {
    id: 'cyber',
    name: 'Cyber Dark',
    preview: ['#00f2ff', '#7000ff'],
    desc: 'Neon-cyan futuristic high contrast',
  },
];

const Themes = () => {
  const { colorTheme, setColorTheme, customColors } = useTheme();

  const themes = [
    ...availableThemes,
    {
      id: 'custom',
      name: 'Custom Forge',
      preview: customColors.mode === '3-color' 
        ? [customColors.primary, customColors.secondary, customColors.tertiary]
        : [customColors.primary, customColors.secondary],
      desc: 'Your personalized color palette',
    }
  ];



  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl dark:bg-indigo-400/10 dark:text-indigo-400">
          <Palette size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white tracking-tight">Appearance</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Customize the colors across your entire workspace.
          </p>
        </div>
      </div>

      {/* Theme cards */}
      <div className="glass-card p-6 space-y-4">
        <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
          Global Color Gradient
        </label>

        <div className="grid grid-cols-1 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                colorTheme === theme.id
                  ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                  : 'border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {/* Color preview swatch */}
              <div className="flex gap-1 shrink-0">
                {theme.preview.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full shadow-sm"
                    style={{ background: color }}
                  />
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 dark:text-white text-sm">{theme.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{theme.desc}</p>
              </div>

              {colorTheme === theme.id && (
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-xl border border-indigo-500/20 mt-2">
          <p className="text-sm text-indigo-600 dark:text-indigo-300">
            Selected gradient applies to backgrounds and accents across all pages in both light and dark mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Themes;
