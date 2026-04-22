// ── SnakeGame.jsx ─────────────────────────────────────────────
// FIXES: React import, stale closure via gameStateRef
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Play, RotateCcw, MousePointer2, Zap } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './SnakeGame.css';

const SnakeGame = () => {
  const canvasRef    = useRef(null);
  const { addToast } = useNotification();
  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('react-tools-snake-hi') || 0));
  const [gameState, setGameState] = useState('idle');

  // FIX: mirror state in a ref so rAF loop always reads current value
  const gameStateRef = useRef('idle');
  const setGame = (s) => { gameStateRef.current = s; setGameState(s); };

  const snakeRef   = useRef({ segments: [{ x: 100, y: 100 }], angle: 0, speed: 4, size: 15 });
  const foodRef    = useRef({ x: 300, y: 300 });
  const mouseRef   = useRef({ x: 100, y: 100 });
  const requestRef = useRef();
  const scoreRef   = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);

  useEffect(() => {
    const resize = () => { const c = canvasRef.current; if (!c) return; c.width = c.offsetWidth; c.height = c.offsetHeight; };
    window.addEventListener('resize', resize); resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const spawnFood = () => {
    const c = canvasRef.current;
    foodRef.current = { x: Math.random() * (c.width - 40) + 20, y: Math.random() * (c.height - 40) + 20 };
  };

  const initGame = () => {
    const c = canvasRef.current;
    snakeRef.current = { segments: Array(10).fill(0).map(() => ({ x: c.width/2, y: c.height/2 })), angle: 0, speed: 4, size: 15 };
    setScore(0); scoreRef.current = 0; spawnFood(); setGame('playing');
  };

  const update = () => {
    if (gameStateRef.current !== 'playing') return;
    const snake = snakeRef.current;
    const head  = { ...snake.segments[0] };
    const dx = mouseRef.current.x - head.x, dy = mouseRef.current.y - head.y;
    if (Math.sqrt(dx*dx+dy*dy) > 5) {
      let diff = Math.atan2(dy,dx) - snake.angle;
      while (diff < -Math.PI) diff += Math.PI*2; while (diff > Math.PI) diff -= Math.PI*2;
      snake.angle += diff * 0.15;
      head.x += Math.cos(snake.angle) * snake.speed;
      head.y += Math.sin(snake.angle) * snake.speed;
    }
    const newSegs = [head]; let prev = head;
    for (let i = 1; i < snake.segments.length; i++) {
      const seg = snake.segments[i], sdx = prev.x-seg.x, sdy = prev.y-seg.y, d = Math.sqrt(sdx*sdx+sdy*sdy);
      if (d > 8) { const a = Math.atan2(sdy,sdx); newSegs.push({ x: prev.x-Math.cos(a)*8, y: prev.y-Math.sin(a)*8 }); }
      else newSegs.push({ ...seg });
      prev = newSegs[i];
    }
    snake.segments = newSegs;
    const fdx = head.x-foodRef.current.x, fdy = head.y-foodRef.current.y;
    if (Math.sqrt(fdx*fdx+fdy*fdy) < 30) {
      setScore(s => { const next = s+10; scoreRef.current = next; if (next > highScore) { setHighScore(next); localStorage.setItem('react-tools-snake-hi', next.toString()); } return next; });
      snake.segments.push(...Array(3).fill(0).map(() => ({ ...snake.segments[snake.segments.length-1] })));
      snake.speed = Math.min(8, 4 + scoreRef.current / 200);
      spawnFood(); addToast('Data eaten! +10', 'info');
    }
    for (let i = 20; i < snake.segments.length; i++) {
      const seg = snake.segments[i];
      if (Math.sqrt((head.x-seg.x)**2+(head.y-seg.y)**2) < 10) { setGame('gameOver'); addToast('System crash!', 'error'); return; }
    }
    const c = canvasRef.current;
    if (head.x < 0 || head.x > c.width || head.y < 0 || head.y > c.height) { setGame('gameOver'); addToast('Out of bounds!', 'error'); }
  };

  const draw = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(99,102,241,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width;  i += 40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke(); }
    for (let i = 0; i < canvas.height; i += 40) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke(); }
    if (gameStateRef.current === 'idle') return;
    ctx.shadowBlur = 15; ctx.shadowColor = '#6366f1'; ctx.fillStyle = '#6366f1';
    ctx.beginPath(); ctx.arc(foodRef.current.x, foodRef.current.y, 8, 0, Math.PI*2); ctx.fill();
    snakeRef.current.segments.forEach((seg, i) => {
      const alpha = 1 - (i / snakeRef.current.segments.length) * 0.8;
      ctx.shadowBlur = i===0?20:10; ctx.shadowColor = i===0?'#4f46e5':'#818cf8';
      ctx.fillStyle = i===0?'#4f46e5':`rgba(129,140,248,${alpha})`;
      const r = i===0?12:Math.max(2, 8-(i/snakeRef.current.segments.length)*4);
      ctx.beginPath(); ctx.arc(seg.x, seg.y, r, 0, Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]); // eslint-disable-line

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex justify-between items-center bg-indigo-600 shadow-xl shadow-indigo-500/20 p-6 rounded-3xl text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl"><Zap className="w-6 h-6 animate-pulse" /></div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Neon Chaser</h2>
            <div className="flex items-center gap-2 opacity-80"><MousePointer2 size={12} /><span className="text-[10px] font-bold uppercase tracking-widest">Mouse Controlled Arena</span></div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-right"><p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Live Score</p><p className="text-3xl font-black tabular-nums">{score}</p></div>
          <div className="text-right border-l border-white/10 pl-8"><p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Record</p><div className="flex items-center gap-2"><Trophy size={16} className="text-yellow-400" /><p className="text-3xl font-black tabular-nums">{highScore}</p></div></div>
        </div>
      </div>
      <div className="flex-1 relative glass-card p-0 overflow-hidden cursor-none">
        <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full block bg-slate-50 dark:bg-slate-900/50" />
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-6 animate-in zoom-in-90 duration-300">
              {gameState === 'gameOver' && (<div className="space-y-2 pb-4"><h3 className="text-5xl font-black text-white uppercase tracking-tighter">System Offline</h3><p className="text-rose-400 font-bold uppercase text-xs tracking-[0.3em]">Score: {score}</p></div>)}
              <button onClick={initGame} className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center gap-3 mx-auto">
                {gameState === 'idle' ? <><Play size={20}/> Enter Arena</> : <><RotateCcw size={20}/> Reboot System</>}
              </button>
              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">Guide snake with your cursor. Avoid walls & self-collision.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
