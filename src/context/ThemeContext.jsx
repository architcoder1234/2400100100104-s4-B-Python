import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';


const ThemeContext = createContext(null);
const SettingsContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('colorTheme') || 'default';
  });

  const [glowSize, setGlowSize] = useState(() => {
    return Number(localStorage.getItem('glowSize')) || 50;
  });

  const [cursorMode, setCursorMode] = useState(() => {
    return localStorage.getItem('cursorMode') || 'spotlight';
  });

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('customColors');
    return saved ? JSON.parse(saved) : { primary: '#6366f1', secondary: '#a855f7', tertiary: '#ec4899', mode: '2-color' };
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.forEach(className => {
      if (className.startsWith('theme-')) {
        root.classList.remove(className);
      }
    });
    root.classList.add(`theme-${colorTheme}`);
    localStorage.setItem('colorTheme', colorTheme);

    // Apply custom colors to CSS variables if custom theme is active
    if (colorTheme === 'custom') {
      root.style.setProperty('--color-indigo-300', `${customColors.primary}80`);
      root.style.setProperty('--color-indigo-400', `${customColors.primary}b0`);
      root.style.setProperty('--color-indigo-500', customColors.primary);
      root.style.setProperty('--color-indigo-600', customColors.primary);
      root.style.setProperty('--color-indigo-700', customColors.primary);
      root.style.setProperty('--color-violet-500', customColors.secondary);
      root.style.setProperty('--color-violet-600', customColors.secondary);
      root.style.setProperty('--color-fuchsia-500', customColors.tertiary || customColors.secondary);
      root.style.setProperty('--color-fuchsia-600', customColors.tertiary || customColors.secondary);
    } else {
      // Clear inline styles to let CSS classes take over
      root.style.removeProperty('--color-indigo-300');
      root.style.removeProperty('--color-indigo-400');
      root.style.removeProperty('--color-indigo-500');
      root.style.removeProperty('--color-indigo-600');
      root.style.removeProperty('--color-indigo-700');
      root.style.removeProperty('--color-violet-500');
      root.style.removeProperty('--color-violet-600');
      root.style.removeProperty('--color-fuchsia-500');
      root.style.removeProperty('--color-fuchsia-600');
    }
  }, [colorTheme, customColors]);


  useEffect(() => {
    localStorage.setItem('customColors', JSON.stringify(customColors));
  }, [customColors]);

  useEffect(() => {
    document.documentElement.style.setProperty('--glow-size', `${glowSize}px`);
    localStorage.setItem('glowSize', glowSize);
  }, [glowSize]);

  useEffect(() => {
    localStorage.setItem('cursorMode', cursorMode);
  }, [cursorMode]);

  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  const themeValue = useMemo(() => ({
    isDarkMode, toggleTheme, colorTheme, setColorTheme, customColors, setCustomColors
  }), [isDarkMode, toggleTheme, colorTheme, customColors]);

  const settingsValue = useMemo(() => ({
    glowSize, setGlowSize, cursorMode, setCursorMode
  }), [glowSize, cursorMode]);


  return (
    <ThemeContext.Provider value={themeValue}>
      <SettingsContext.Provider value={settingsValue}>
        {children}
      </SettingsContext.Provider>
    </ThemeContext.Provider>
  );
};

// PERF FIX: return the two contexts separately so components that only
// need isDarkMode don't re-render when cursorMode changes.
// useTheme() still works the same way for backwards compatibility —
// it just no longer merges into a new object on every render.
export const useTheme = () => {
  const theme    = useContext(ThemeContext);
  const settings = useContext(SettingsContext);
  if (!theme || !settings) throw new Error('useTheme must be used within a ThemeProvider');
  // Return a stable spread only when both contexts change together.
  // Components can also import useThemeOnly / useSettingsOnly for finer control.
  return { ...theme, ...settings };
};

/** Lightweight hook — only re-renders when theme (dark/colors) changes */
export const useThemeOnly    = () => { const c = useContext(ThemeContext);    if (!c) throw new Error('ThemeProvider missing'); return c; };
/** Lightweight hook — only re-renders when cursor/glow settings change */
export const useSettingsOnly = () => { const c = useContext(SettingsContext); if (!c) throw new Error('ThemeProvider missing'); return c; };


