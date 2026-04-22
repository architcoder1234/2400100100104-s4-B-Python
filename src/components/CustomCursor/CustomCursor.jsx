// ── CustomCursor.jsx ─────────────────────────────────────────
// Custom animated cursor overlay — rocket 🚀, crosshair ⊕, minimal ⭕.
// Controlled by cursorMode in ThemeContext.
// Uses requestAnimationFrame + passive listeners for zero jank.
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CustomCursor = memo(() => {
  const { cursorMode } = useTheme();
  const cursorRef   = useRef(null);
  const rotationRef = useRef(0);
  const prevPosRef  = useRef({ x: -100, y: -100 });
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    if (cursorMode === 'none') {
      document.body.style.cursor = 'default';
      return;
    }
    document.body.style.cursor = 'none';

    let rafId = null;
    const handleMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const dx = e.clientX - prevPosRef.current.x;
        const dy = e.clientY - prevPosRef.current.y;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          rotationRef.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        }
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0) rotate(${rotationRef.current}deg)`;
        }
        prevPosRef.current = { x: e.clientX, y: e.clientY };
        rafId = null;
      });
    };

    const handleClick = (e) => {
      if (cursorMode !== 'rocket') return;
      const bulletId = Date.now();
      const rot = rotationRef.current;
      setBullets(prev => [...prev, { id: bulletId, x: e.clientX, y: e.clientY, rotation: rot }]);
      setTimeout(() => setBullets(prev => prev.filter(b => b.id !== bulletId)), 800);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleClick);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.cursor = 'default';
    };
  }, [cursorMode]);

  if (cursorMode === 'none' || cursorMode === 'spotlight') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <div ref={cursorRef} className="absolute top-0 left-0 will-change-transform">
        {cursorMode === 'rocket' && <span className="text-3xl">🚀</span>}
        {cursorMode === 'crosshair' && (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-indigo-500/80 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <div className="absolute h-full w-[1px] bg-indigo-500/80 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
            <div className="absolute w-6 h-6 border border-indigo-500/40 rounded-full animate-ping opacity-20" />
            <div className="absolute w-8 h-8 border-[0.5px] border-indigo-400/30 rounded-full" />
          </div>
        )}
        {cursorMode === 'minimal' && (
          <div className="w-6 h-6 border-2 border-white/60 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        )}
      </div>

      {cursorMode === 'rocket' && bullets.map(bullet => (
        <motion.div key={bullet.id}
          initial={{ x: bullet.x, y: bullet.y, opacity: 1, scale: 1 }}
          animate={{ x: bullet.x + Math.sin(bullet.rotation * Math.PI / 180) * 1000, y: bullet.y - Math.cos(bullet.rotation * Math.PI / 180) * 1000, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bullet-shoot absolute"
          style={{ rotate: `${bullet.rotation}deg` }}
        />
      ))}
    </div>
  );
});

export default CustomCursor;
