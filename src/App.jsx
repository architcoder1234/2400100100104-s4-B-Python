// ── App.jsx ──────────────────────────────────────────────────
// Root of the application.
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';

import LoadingScreen  from './components/LoadingScreen';
import Navigation     from './components/Navigation';
import ThemeModal     from './components/ThemeModal';
import CustomCursor   from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import PageWrapper    from './components/PageWrapper';
import ErrorBoundary  from './components/ErrorBoundary';
import PageSpinner    from './components/PageSpinner';

// ── Lazy pages ────────────────────────────────────────────────
const Home              = React.lazy(() => import('./pages/Home'));
const TodoList          = React.lazy(() => import('./pages/TodoList'));
const StudentInfo       = React.lazy(() => import('./pages/StudentInfo'));
const Weather           = React.lazy(() => import('./pages/Weather'));
const MapView           = React.lazy(() => import('./pages/MapView'));
const Utilities         = React.lazy(() => import('./pages/Utilities'));
const MathTools         = React.lazy(() => import('./pages/MathTools'));
const Auth              = React.lazy(() => import('./pages/Auth'));
const FinanceConverter  = React.lazy(() => import('./pages/FinanceConverter'));
const UnitConverter     = React.lazy(() => import('./pages/UnitConverter'));
const Notes             = React.lazy(() => import('./pages/Notes'));
const SnakeGame         = React.lazy(() => import('./pages/SnakeGame'));
const CodeBreaker       = React.lazy(() => import('./pages/CodeBreaker'));
const Portfolio         = React.lazy(() => import('./pages/Portfolio'));
const Themes            = React.lazy(() => import('./pages/Themes'));
const GradientGenerator = React.lazy(() => import('./pages/GradientGenerator'));
const NotFound          = React.lazy(() => import('./pages/NotFound'));

// ── Route table ───────────────────────────────────────────────
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* PageSpinner shown while lazy chunk loads — no more blank screen */}
      <React.Suspense fallback={<PageSpinner />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                   element={<Portfolio />} />
          <Route path="/dashboard"          element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/todo"               element={<PageWrapper><TodoList /></PageWrapper>} />
          <Route path="/students"           element={<PageWrapper><StudentInfo /></PageWrapper>} />
          <Route path="/weather"            element={<PageWrapper><Weather /></PageWrapper>} />
          <Route path="/map"                element={<PageWrapper><MapView /></PageWrapper>} />
          <Route path="/finance"            element={<PageWrapper><FinanceConverter /></PageWrapper>} />
          <Route path="/units"              element={<PageWrapper><UnitConverter /></PageWrapper>} />
          <Route path="/notes"              element={<PageWrapper><Notes /></PageWrapper>} />
          <Route path="/utilities"          element={<PageWrapper><Utilities /></PageWrapper>} />
          <Route path="/math"               element={<PageWrapper><MathTools /></PageWrapper>} />
          <Route path="/snake"              element={<PageWrapper><SnakeGame /></PageWrapper>} />
          <Route path="/codebreaker"        element={<PageWrapper><CodeBreaker /></PageWrapper>} />
          <Route path="/auth"               element={<PageWrapper><Auth /></PageWrapper>} />
          <Route path="/themes"             element={<PageWrapper><Themes /></PageWrapper>} />
          <Route path="/gradient-generator" element={<PageWrapper><GradientGenerator /></PageWrapper>} />
          <Route path="/portfolio"          element={<Navigate to="/" replace />} />
          {/* Dedicated 404 page instead of silent redirect */}
          <Route path="*"                   element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </React.Suspense>
    </AnimatePresence>
  );
};

// ── App shell ─────────────────────────────────────────────────
const AppContent = () => {
  const { colorTheme, cursorMode } = useTheme();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isPaletteOpen,    setIsPaletteOpen]    = useState(false);
  const location    = useLocation();
  const isPortfolio = location.pathname === '/';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsPaletteOpen(p => !p); }
    };
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        rafId = null;
      });
    };
    window.addEventListener('keydown',   handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('keydown',   handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${cursorMode !== 'none' ? 'cursor-none' : ''}`}>
      <CustomCursor />
      {colorTheme === 'cyber' && (
        <> <div className="comet-layer comet-1" /> <div className="comet-layer comet-2" /> <div className="comet-layer comet-3" /> <div className="asteroid-layer" /> </>
      )}
      <AnimatePresence>
        {!isPortfolio && (
          <motion.div
            initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-4 sm:top-6 z-50 w-full px-4 sm:px-8 max-w-7xl mx-auto"
          >
            <Navigation onThemeClick={() => setIsThemeModalOpen(true)} onSearchClick={() => setIsPaletteOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeModal    isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
      <CommandPalette isOpen={isPaletteOpen}   onClose={() => setIsPaletteOpen(false)} />

      {/* ErrorBoundary wraps routes — one crash won't kill the whole app */}
      <main className={`flex-1 relative z-10 w-full transition-all duration-500 ${!isPortfolio ? 'p-8 max-w-7xl mx-auto' : ''}`}>
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
      </main>

      {!isPortfolio && (
        <footer className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">v1.2.0-STABLE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Last Sync: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Designed by Archit Srivastava — Logic & Tools Suite
          </div>
        </footer>
      )}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 1600); return () => clearTimeout(t); }, []);
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading ? <LoadingScreen key="loading" /> : <AppContent key="content" />}
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
