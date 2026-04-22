import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Palette, Copy, Check, MousePointer2, Settings2, Sparkles, Wand2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import './GradientGenerator.css';

const GradientGenerator = () => {
  const { colorTheme, setColorTheme, customColors, setCustomColors } = useTheme();
  const { addToast } = useNotification();
  
  const [color1, setColor1] = useState(customColors?.primary || '#6366f1');
  const [color2, setColor2] = useState(customColors?.secondary || '#a855f7');
  const [color3, setColor3] = useState(customColors?.tertiary || '#ec4899');
  const [numColors, setNumColors] = useState(customColors?.mode === '3-color' ? 3 : 2);
  const [angle, setAngle] = useState(135);
  const [text, setText] = useState('Explore the Future');
  const [borderRadius, setBorderRadius] = useState(16);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [activeTab, setActiveTab] = useState('design'); // design | result

  const gradientStyle = numColors === 3 
    ? `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`
    : `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  
  // Live update the system if custom theme is already active
  useEffect(() => {
    if (colorTheme === 'custom') {
      setCustomColors({ 
        primary: color1, 
        secondary: color2, 
        tertiary: color3,
        mode: numColors === 3 ? '3-color' : '2-color'
      });
    }
  }, [color1, color2, color3, numColors, colorTheme, setCustomColors]);

  const copyToClipboard = () => {
    const css = `background: ${gradientStyle};\nborder-radius: ${borderRadius}px;\npadding: 12px 24px;\ncolor: white;\nborder: none;\ncursor: pointer;\ntransition: all 0.3s ease;`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyToSystem = () => {
    setCustomColors({ 
      primary: color1, 
      secondary: color2, 
      tertiary: color3,
      mode: numColors === 3 ? '3-color' : '2-color' 
    });
    setColorTheme('custom');
    setApplied(true);
    if (typeof addToast === 'function') {
      addToast('Project-wide theme updated!', 'success');
    }
    setTimeout(() => setApplied(false), 3000);
  };



  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl dark:bg-indigo-400/10 dark:text-indigo-400">
              <Palette size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black dark:text-white tracking-tight leading-none">Gradient Forge</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Craft premium buttons for your ecosystem</p>
            </div>
          </div>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('design')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'design' ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Design
          </button>
          <button 
            onClick={() => setActiveTab('result')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'result' ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Output
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-500">
                <Settings2 size={16} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Configuration</h3>
              </div>

              <div className="space-y-6">
                {/* Mode Toggle */}
                <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                  {[2, 3].map(n => (
                    <button
                      key={n}
                      onClick={() => setNumColors(n)}
                      className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${numColors === n ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'text-slate-500'}`}
                    >
                      {n} Colors
                    </button>
                  ))}
                </div>

                {/* Colors */}
                <div className={`grid ${numColors === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Primary</label>
                    <input 
                      type="color" value={color1} onChange={(e) => setColor1(e.target.value)}
                      className="w-full h-10 rounded-xl cursor-pointer bg-transparent border-2 border-slate-100 dark:border-slate-800 p-1 hover:border-indigo-500/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secondary</label>
                    <input 
                      type="color" value={color2} onChange={(e) => setColor2(e.target.value)}
                      className="w-full h-10 rounded-xl cursor-pointer bg-transparent border-2 border-slate-100 dark:border-slate-800 p-1 hover:border-indigo-500/30 transition-all"
                    />
                  </div>
                  {numColors === 3 && (
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tertiary</label>
                      <input 
                        type="color" value={color3} onChange={(e) => setColor3(e.target.value)}
                        className="w-full h-10 rounded-xl cursor-pointer bg-transparent border-2 border-slate-100 dark:border-slate-800 p-1 hover:border-indigo-500/30 transition-all"
                      />
                    </div>
                  )}
                </div>


                {/* Angle Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Gradient Angle</label>
                    <span className="text-[10px] font-bold text-indigo-500">{angle}°</span>
                  </div>
                  <input 
                    type="range" min="0" max="360" value={angle} 
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Rounded Corners Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Border Radius</label>
                    <span className="text-[10px] font-bold text-indigo-500">{borderRadius}px</span>
                  </div>
                  <input 
                    type="range" min="0" max="48" value={borderRadius} 
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Button Text */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Button Label</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={text} 
                      onChange={(e) => setText(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none dark:text-white text-sm font-bold"
                      placeholder="Button text..."
                    />
                    <MousePointer2 size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === 'design' ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card h-full flex flex-col items-center justify-center p-12 min-h-[400px] relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[image:radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px] rounded-full" />
                </div>

                <div className="relative z-10 space-y-12 flex flex-col items-center w-full">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Wand2 size={24} className="text-yellow-500 animate-pulse" />
                      <h4 className="text-xl font-bold dark:text-white">Live Evolution</h4>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Interact with your creation below</p>
                  </div>

                  {/* THE BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{ 
                      background: gradientStyle,
                      borderRadius: `${borderRadius}px`,
                      boxShadow: `0 10px 30px -10px ${color1}66`
                    }}
                    className="px-10 py-5 text-white font-black uppercase tracking-[0.2em] text-lg transition-all shadow-2xl relative group overflow-hidden"
                  >
                    <span className="relative z-10">{text}</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  </motion.button>

                  <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg">
                    {[
                      { label: 'HEX A', val: color1.toUpperCase() },
                      { label: 'HEX B', val: color2.toUpperCase() },
                      { label: 'DIR', val: `${angle}°` },
                      { label: 'RAD', val: `${borderRadius}px` },
                    ].map((stat, i) => (
                      <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-[10px] font-bold text-indigo-500 mt-1">{stat.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="code"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card h-full p-8 min-h-[400px] flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-500" />
                    <h3 className="text-sm font-black uppercase tracking-widest dark:text-white">Styles Output</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={applyToSystem}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                    >
                      {applied ? <Check size={16} /> : <Globe size={16} />}
                      <span className="text-xs font-bold uppercase tracking-wider">{applied ? 'Applied!' : 'Apply Globally'}</span>
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <span className="text-xs font-bold uppercase tracking-wider">{copied ? 'Copied!' : 'Copy CSS'}</span>
                    </button>
                  </div>

                </div>

                <div className="flex-1 bg-slate-950 rounded-2xl p-6 font-mono text-xs overflow-auto border border-white/5 relative group">
                  <div className="absolute top-4 right-4 text-slate-700 text-[8px] font-black uppercase tracking-widest group-hover:text-slate-500 transition-colors">CSS (Tailwind or Raw)</div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-indigo-400">/* Raw CSS */</span>
                      <pre className="text-slate-300 mt-2">
{`.custom-btn {
  background: ${gradientStyle};
  border-radius: ${borderRadius}px;
  padding: 12px 24px;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.custom-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 10px 20px -5px ${color1}66;
}`}
                      </pre>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <span className="text-indigo-400">/* Tailwind Class */</span>
                      <pre className="text-slate-300 mt-2 whitespace-pre-wrap">
{`className="bg-[${gradientStyle}] rounded-[${borderRadius}px] px-6 py-3 text-white font-bold uppercase tracking-wider hover:translate-y-[-2px] hover:brightness-110 transition-all shadow-lg hover:shadow-[0_10px_20px_-5px_${color1}66]"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
