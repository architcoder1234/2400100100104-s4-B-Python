import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, Code2, GraduationCap, Briefcase,
  ExternalLink, Terminal, Cpu, Dna, Download,
  Award, BookOpen, Sun, Moon, Shield, Zap, User,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Portfolio.css';

// ── Brand SVG icons ──────────────────────────────────────────
const GithubIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);

// ── YOUR DATA ────────────────────────────────────────────────
const NAME = 'Archit Srivastava';
const TITLE = 'Full-Stack Developer & CS Student';
const RESUME_URL = '/resume.pdf';
const BIO =
  'CS fresher at UCER Allahabad building polished web experiences with React and Vite. ' +
  'I focus on real performance — 60 FPS canvas games, offline-first data layers, ' +
  'and keyboard-driven UX that feels snappy at every step.';

const CONTACT = [
  { icon: Mail, label: 'archit33221@gmail.com', href: 'mailto:archit33221@gmail.com' },
  { icon: Phone, label: '+91 74598 25472', href: 'tel:+917459825472' },
  { icon: GithubIcon, label: 'github.com/architcoder1234', href: 'https://github.com/architcoder1234' },
  { icon: LinkedinIcon, label: 'linkedin.com/in/YOUR-SLUG', href: 'https://linkedin.com/in/YOUR-SLUG' }, // ← CHANGE THIS
];

const EDUCATION = [
  { degree: 'B.Tech — Computer Science & Engineering', school: 'UCER Allahabad', duration: '2024 – 2028', grade: 'Pursuing' },
];

const SKILLS = [
  { name: 'React', usageText: 'Powers the full project architecture — functional components, hooks (useState/useEffect/useRef), Context API for global state, and React Router for instant view transitions.' },
  { name: 'JavaScript', usageText: 'Handles all app logic: Weather API requests via wttr.in, real-time delta-vector math in the snake game, and the fuzzy-search filter behind the Ctrl+K command palette.' },
  { name: 'Three.js', usageText: 'Creates the interactive 3D globe on this page — wireframe geometry, orbiting rings, 900-point surface dots, and React-state-driven skill label overlay at 60 FPS.' },
  { name: 'CSS/Tailwind', usageText: 'Builds the glassmorphism aesthetic across the whole project. CSS custom properties drive the 5-theme color system (indigo, ocean, sunset, forest, berry) that updates at runtime.' },
  { name: 'Vite', usageText: 'Project bundler and dev server — sub-50ms HMR, tree-shaken production builds, and Tailwind v4 plugin wired directly into the pipeline.' },
  { name: 'LocalStorage', usageText: 'Serialises snake high scores, map search history (capped at 5 entries), to-do tasks, notes, and all theme settings — full offline persistence, zero backend.' },
  { name: 'Framer Motion', usageText: 'Drives all page transitions via AnimatePresence + PageWrapper, and the scroll-reveal animations on this very portfolio page.' },
];

const CURRENTLY_LEARNING = ['TypeScript', 'Node.js', 'Express', 'MongoDB'];

const PROJECTS = [
  {
    name: 'Pro Toolset Hub',
    desc: '12+ integrated tools in one workspace: real-time weather (wttr.in API), a mouse-controlled Snake game, a geographic map explorer, a finance converter, unit converter, auto-saving notes, palindrome checker, stopwatch, student records, and a Ctrl+K command palette with fuzzy search.',
    tech: 'React • Vite • Context API • framer-motion • LocalStorage',
    color: '#6366f1',
    github: 'https://github.com/architcoder1234',
    live: '#',
  },
  {
    name: 'Neon Snake Arena',
    desc: 'Mouse-controlled snake game built on HTML Canvas. The snake steers via Math.atan2 trigonometry at 60 FPS, with a glowing indigo trail, food collision detection, tail self-intersection check, and a persistent localStorage high-score board.',
    tech: 'React • HTML Canvas • requestAnimationFrame • Math.atan2',
    color: '#10b981',
    github: 'https://github.com/architcoder1234',
    live: '#',
  },
  {
    name: 'Cortex Cracker',
    desc: 'Terminal-themed Mastermind-style logic puzzle (renamed "Cortex Cracker" in-app). Two modes: Numeric (4-digit code) and Word Mode (10-word database with clues). Colour-coded green/yellow/red feedback, hint system with attempt penalty, and win/loss animations.',
    tech: 'React • Game Logic • CSS Animations • NotificationContext',
    color: '#f43f5e',
    github: 'https://github.com/architcoder1234',
    live: '#',
  },
];

const ACHIEVEMENTS = [
  { icon: Award, title: 'Solved 100+ problems on LeetCode', sub: 'DSA — ← CHANGE THIS to your exact count' },
  { icon: Award, title: 'Meta Front-End Developer Certificate', sub: 'Coursera · 2024' },
  { icon: Shield, title: 'CS50x — Introduction to Computer Science', sub: 'Harvard / edX · 2024' },
  { icon: Award, title: 'Built Pro Toolset Hub — 12+ tools in React', sub: 'Open Source · 2025' },
  { icon: BookOpen, title: 'Completed Wireshark & SQLMap lab exercises', sub: 'Cybersecurity fundamentals · 2025' },
];

const TECHNICAL_INSIGHTS = [
  {
    icon: Dna,
    title: 'Neon Snake: vector trailing physics',
    stack: 'React • Canvas API • Math.atan2',
    description:
      'The snake steers toward the cursor via trigonometric delta vectors. Math.atan2(dy, dx) gives the target angle; ' +
      'a 0.15 smoothing factor blends current angle toward target each frame, creating organic curves. ' +
      'Each tail segment snaps exactly 8 px behind its leader — a pure physics chain at 60 FPS with no physics library.',
  },
  {
    icon: Cpu,
    title: 'Map engine: localStorage caching layer',
    stack: 'React state • Browser Storage API',
    description:
      'On every valid search the interceptor checks for duplicates, then calls .slice(0, 4) to cap the history at 5 entries ' +
      'before serialising to localStorage. The Google Maps iframe URL rebuilds reactively via useEffect whenever ' +
      'address, zoom level, or map type (road / satellite / terrain) changes.',
  },
  {
    icon: Terminal,
    title: 'Command palette: global route injection',
    stack: 'window keydown • React Router • useMemo',
    description:
      "A window keydown listener (Ctrl+K) sets isPaletteOpen state in AppContent. Inside CommandPalette, " +
      "a useMemo fuzzy-filter scans the full tool index on every keystroke. " +
      "On Enter it calls React Router's navigate(), hot-swapping the active view with zero DOM traversal.",
  },
  {
    icon: Zap,
    title: '5-theme color system via CSS custom properties',
    stack: 'CSS variables • ThemeContext • Tailwind v4',
    description:
      'Five color themes (default, ocean, sunset, forest, berry) are implemented as CSS classes on <html>. ' +
      'Each overrides --color-indigo-* and --color-violet-* custom properties. ' +
      'Tailwind v4 reads these variables at runtime, so every utility class (bg-indigo-600, text-indigo-500, etc.) ' +
      'updates across all 12+ pages with a single className change — no component re-renders.',
  },
];

// Skill labels that orbit the globe — now fully theme-aware for maximum legibility!
const GLOBE_SKILLS_DARK = [
  { text: 'React', color: '#61dafb' },
  { text: 'JavaScript', color: '#f7df1e' },
  { text: 'Three.js', color: '#a78bfa' },
  { text: 'Java', color: '#f89820' },
  { text: 'Python', color: '#4ade80' },
  { text: 'CyberSec', color: '#f87171' },
  { text: 'Tailwind', color: '#38bdf8' },
  { text: 'Vite', color: '#c084fc' },
  { text: 'Framer', color: '#ec4899' },
  { text: 'C / C++', color: '#fbbf24' },
  { text: 'LocalStorage', color: '#34d399' },
  { text: 'SQL / DB', color: '#00758F' },
  { text: 'WampServer', color: '#f472b6' },
];

const GLOBE_SKILLS_LIGHT = [
  { text: 'React', color: '#0284c7' },
  { text: 'JavaScript', color: '#c2410c' },
  { text: 'Three.js', color: '#6d28d9' },
  { text: 'Java', color: '#c2410c' },
  { text: 'Python', color: '#15803d' },
  { text: 'CyberSec', color: '#b91c1c' },
  { text: 'Tailwind', color: '#0369a1' },
  { text: 'Vite', color: '#7e22ce' },
  { text: 'Framer', color: '#be185d' },
  { text: 'C / C++', color: '#b45309' },
  { text: 'LocalStorage', color: '#047857' },
  { text: 'SQL / DB', color: '#005C72' },
  { text: 'WampServer', color: '#9d174d' },
];

const getGlobeSkills = (isDarkMode) => isDarkMode ? GLOBE_SKILLS_DARK : GLOBE_SKILLS_LIGHT;


// ── Animation helpers ────────────────────────────────────────
// Reusable scroll-reveal wrapper
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Zero-Gravity Physical Chaos Map
  const zeroG = useMemo(() => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 1000,
    rotate: (Math.random() - 0.5) * 180,
    scale: 0.3 + Math.random() * 0.5,
    damping: 10 + Math.random() * 5,
    stiffness: 25 + Math.random() * 20,
    mass: 1.5 + Math.random() * 1.5,
    hangTime: 1.2 + Math.random() * 0.4
  }), []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: zeroG.x, y: zeroG.y, rotate: zeroG.rotate, scale: zeroG.scale }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : {}}
      transition={{ 
        type: 'spring', 
        damping: zeroG.damping, 
        stiffness: zeroG.stiffness,
        mass: zeroG.mass,
        delay: delay + zeroG.hangTime 
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Three.js Globe Background ────────────────────────────────
// FIXED: skill labels via React state (no raw DOM injection)
// FIXED: light-mode star/wire opacity raised so globe is visible
// FIXED: no GLTFLoader / no avatar.glb dependency
function GlobeBackground({ isDarkMode }) {
  const mountRef = useRef(null);
  const labelsRef = useRef([]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 500);
    camera.position.set(0, 0, 7);

    // Starfield — light-mode opacity fixed (was 0.3, now 0.55)
    const starCount = 1800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 300;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: isDarkMode ? 0x8b8cf8 : 0x4338ca,
        size: 0.3,
        transparent: true,
        opacity: isDarkMode ? 0.65 : 0.55,
      })
    );
    scene.add(stars);

    // Background floating wireframe shapes
    const bgShapes = [];
    const fgGeos = [
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.TetrahedronGeometry(1.3, 0),
      new THREE.IcosahedronGeometry(1.0, 0),
    ];
    const shapeColors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x10b981];
    for (let i = 0; i < 14; i++) {
      const mesh = new THREE.Mesh(
        fgGeos[i % fgGeos.length],
        new THREE.MeshBasicMaterial({
          color: shapeColors[i % 4], wireframe: true,
          transparent: true, opacity: isDarkMode ? 0.13 : 0.20,
        })
      );
      mesh.position.set(
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 60 - 20
      );
      mesh.scale.setScalar(1.8 + Math.random() * 3.5);
      bgShapes.push({ mesh, rx: (Math.random() - 0.5) * 0.003, ry: (Math.random() - 0.5) * 0.004 });
      scene.add(mesh);
    }

    // Globe group — scale 1.6 same as your original
    const globeScale = 1.6;
    const globeGroup = new THREE.Group();
    globeGroup.scale.setScalar(globeScale);
    scene.add(globeGroup);

    const mkRing = (r, tube, color, opacity, rotX, rotZ = 0) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 8, 120),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      );
      m.rotation.set(rotX, 0, rotZ);
      return m;
    };
    const ring1 = mkRing(1.52, 0.012, isDarkMode ? 0x818cf8 : 0x4f46e5, isDarkMode ? 0.45 : 0.65, Math.PI / 2.5);
    const ring2 = mkRing(1.72, 0.007, isDarkMode ? 0x6366f1 : 0x3730a3, isDarkMode ? 0.32 : 0.50, Math.PI / 3, 0.4);
    globeGroup.add(ring1, ring2);

    // Wireframe sphere — light-mode opacity fixed (was 0.35, now 0.55)
    const globeLines = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 32, 32)),
      new THREE.LineBasicMaterial({
        color: isDarkMode ? 0x6366f1 : 0x4338ca,
        transparent: true, opacity: isDarkMode ? 0.30 : 0.55,
      })
    );
    globeGroup.add(globeLines);

    // Surface dots
    const dotPts = [];
    for (let i = 0; i < 900; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dotPts.push(
        1.01 * Math.sin(phi) * Math.cos(theta),
        1.01 * Math.cos(phi),
        1.01 * Math.sin(phi) * Math.sin(theta)
      );
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(dotPts), 3));
    const dots = new THREE.Points(
      dotGeo,
      new THREE.PointsMaterial({ color: isDarkMode ? 0xa5b4fc : 0x312e81, size: 0.03, transparent: true, opacity: 1 })
    );
    globeGroup.add(dots);

    // Inner glow
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.97, 32, 32),
      new THREE.MeshBasicMaterial({ color: isDarkMode ? 0x4338ca : 0x818cf8, transparent: true, opacity: isDarkMode ? 0.10 : 0.07 })
    ));

    // Skill label anchors — 3D positions only; rendering handled by React overlay
    const skillsGroup = new THREE.Group();
    scene.add(skillsGroup);

    const skillAnchors = getGlobeSkills(isDarkMode).map(() => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.set((Math.random() - 0.5) * Math.PI, Math.random() * Math.PI * 2, 0);
      const anchor = new THREE.Object3D();
      anchor.position.set(0, 0, globeScale * 1.6 + 0.4 + Math.random() * 0.5);
      orbitGroup.add(anchor);
      skillsGroup.add(orbitGroup);
      return {
        orbitGroup,
        anchor,
        speed: (Math.random() > 0.5 ? 1 : -1) * (0.0018 + Math.random() * 0.0025),
      };
    });

    // Drag to rotate — skips clicks on links/buttons/inputs
    let dragging = false, prevX = 0, prevY = 0;
    let velX = 0.0022, velY = 0.0008;

    const onDown = (e) => {
      if (e.target.closest('a, button, input, textarea, select')) return;
      dragging = true; prevX = e.clientX; prevY = e.clientY;
    };
    const onUp = () => { dragging = false; };
    const onMove = (e) => {
      if (!dragging) return;
      velX = (e.clientX - prevX) * 0.0045;
      velY = (e.clientY - prevY) * 0.0045;
      prevX = e.clientX; prevY = e.clientY;
    };
    const onTouchDown = (e) => {
      if (e.target.closest('a, button, input, textarea, select')) return;
      dragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      velX = (e.touches[0].clientX - prevX) * 0.0045;
      velY = (e.touches[0].clientY - prevY) * 0.0045;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchstart', onTouchDown, { passive: true });
    document.addEventListener('touchend', onUp);
    document.addEventListener('touchmove', onTouchMove, { passive: true });

    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const worldVec = new THREE.Vector3();
    let frame;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!dragging) { velX = velX * 0.97 + 0.0008; velY *= 0.97; }

      globeLines.rotation.y += velX; globeLines.rotation.x += velY;
      dots.rotation.y += velX; dots.rotation.x += velY;
      ring1.rotation.z += 0.003; ring2.rotation.z -= 0.002;
      stars.rotation.y += 0.00012; stars.rotation.x += 0.00007;
      skillsGroup.rotation.y += velX * 0.5;
      skillsGroup.rotation.x += velY * 0.5;
      bgShapes.forEach(({ mesh, rx, ry }) => { mesh.rotation.x += rx; mesh.rotation.y += ry; });
      skillAnchors.forEach(sa => { sa.orbitGroup.rotation.y += sa.speed; });

      // Project 3D positions → 2D for React overlay via ultra-fast direct DOM refs
      const cW = el.clientWidth, cH = el.clientHeight;
      skillAnchors.forEach((sa, i) => {
        sa.anchor.getWorldPosition(worldVec);
        const proj = worldVec.clone().project(camera);

        const x = (proj.x * 0.5 + 0.5) * cW;
        const y = (proj.y * -0.5 + 0.5) * cH;
        const behind = proj.z > 1;

        const node = labelsRef.current[i];
        if (node) {
          node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${behind ? 0.6 : 1})`;
          node.style.opacity = behind ? (isDarkMode ? '0.15' : '0.05') : '1';
          node.style.zIndex = behind ? '1' : '15';
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchstart', onTouchDown);
      document.removeEventListener('touchend', onUp);
      document.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el?.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [isDarkMode]); // rebuild when theme changes

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Three.js canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        style={{ touchAction: 'none' }}
      />

      {/* React-rendered skill labels — utilizing ultra-fast Ref mutations for 60FPS sync */}
      {getGlobeSkills(isDarkMode).map((sk, i) => (
        <div
          key={sk.text}
          ref={el => labelsRef.current[i] = el}
          className={[
            'absolute top-0 left-0 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest',
            'whitespace-nowrap select-none pointer-events-none',
            'backdrop-blur-md border border-white/10 dark:border-white/10 transition-opacity duration-150',
            isDarkMode ? 'bg-black/55' : 'bg-white/80 shadow-sm',
          ].join(' ')}
          style={{ color: sk.color }}
        >
          {sk.text}
        </div>
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(5,4,18,0.55) 100%)'
            : 'radial-gradient(ellipse at center, transparent 40%, rgba(238,236,255,0.55) 100%)',
        }}
      />
    </div>
  );
}

// ── Shared components ────────────────────────────────────────
function Card({ children, className = '', accent = false }) {
  return (
    <div className={[
      'relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl',
      'border border-slate-200/60 dark:border-white/8 rounded-3xl',
      'shadow-xl shadow-slate-200/40 dark:shadow-black/30',
      accent ? 'border-t-2 border-t-indigo-500' : '',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}

function SectionHeading({ icon: Icon, label, sub }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-indigo-500" />
      </div>
      <div>
        <h2 className="text-lg font-black dark:text-white uppercase tracking-tight leading-none">{label}</h2>
        {sub && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{sub}</p>}
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent ml-2" />
    </div>
  );
}

// ── Portfolio Rope-Pull + Letter-Drop Loading Screen ────────
function PortfolioLoadingScreen({ onDone }) {
  const { colorTheme } = useTheme();

  // Read live CSS custom properties from the active theme
  const [tc, setTc] = useState({ c300:'#a5b4fc', c400:'#818cf8', c500:'#6366f1', c600:'#4f46e5', v500:'#8b5cf6' });
  useEffect(() => {
    const s = getComputedStyle(document.documentElement);
    setTc({
      c300: s.getPropertyValue('--color-indigo-300').trim() || '#a5b4fc',
      c400: s.getPropertyValue('--color-indigo-400').trim() || '#818cf8',
      c500: s.getPropertyValue('--color-indigo-500').trim() || '#6366f1',
      c600: s.getPropertyValue('--color-indigo-600').trim() || '#4f46e5',
      v500: s.getPropertyValue('--color-violet-500').trim() || '#8b5cf6',
    });
  }, [colorTheme]);

  // Phases: idle → pulled → letters → exit
  const [phase, setPhase] = useState('idle');
  const [progress, setProgress] = useState(0);

  // Letter-drop chars
  const line1 = "ARCHIT'S";
  const line2 = 'PORTFOLIO';
  const charGap = 0.07; // seconds between each letter
  // letter animation starts at 0.2s after 'letters' phase
  const line2Start = 0.2 + line1.length * charGap + 0.2;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('pulled'),  1000); // rope jerks
    const t2 = setTimeout(() => setPhase('letters'), 1600); // rope fades → letter screen
    const t3 = setTimeout(() => setPhase('exit'),    4200); // fade out
    const t4 = setTimeout(() => onDone(),             4600); // unmount
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  // Smooth progress bar — runs from letters phase start to exit
  useEffect(() => {
    if (phase !== 'letters') return;
    const duration = 2600; // ms from letters → exit
    const start = Date.now();
    let raf;
    const tick = () => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const showRope    = phase === 'idle' || phase === 'pulled';
  const showLetters = phase === 'letters' || phase === 'exit';
  const isExit      = phase === 'exit';
  const isPulled    = phase !== 'idle';

  return (
    <>
      <style>{`
        @keyframes rope-sway {
          0%,100% { transform: rotate(0deg); }
          30%     { transform: rotate(6deg); }
          70%     { transform: rotate(-6deg); }
        }
        @keyframes rope-pull {
          0%   { transform: scaleY(1)    translateY(0); }
          35%  { transform: scaleY(1.28) translateY(14px); }
          65%  { transform: scaleY(0.94) translateY(-4px); }
          100% { transform: scaleY(1)    translateY(0); }
        }
        @keyframes pf-blink {
          0%,100% { opacity:0.35; }
          50%     { opacity:0.9; }
        }
        @keyframes pf-letter-drop {
          0%   { opacity:0; transform: translateY(-80px) rotateX(-80deg); }
          60%  { opacity:1; transform: translateY(4px)   rotateX(5deg); }
          100% { opacity:1; transform: translateY(0)     rotateX(0deg); }
        }
        @keyframes pf-underline {
          from { transform: scaleX(0); opacity:0; }
          to   { transform: scaleX(1); opacity:1; }
        }
        @keyframes pf-subtitle {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      {/* ── ROPE PHASE — no curtains, just rope on dark bg ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 500, overflow: 'hidden',
        opacity: showLetters ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: showLetters ? 'none' : 'auto',
        background: '#060612',
      }}>
        {/* Center: rope */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          {/* Ceiling hook */}
          <div style={{
            width: 18, height: 10, borderRadius: '0 0 9px 9px',
            background: tc.c400,
            boxShadow: `0 0 12px ${tc.c400}b0`,
          }} />

          {/* Rope */}
          <div style={{
            transformOrigin: 'top center', willChange: 'transform',
            animation: isPulled
              ? 'rope-pull 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards'
              : 'rope-sway 2s ease-in-out infinite',
          }}>
            <div style={{
              width: 8, height: 120, margin: '0 auto', borderRadius: 4,
              background: `repeating-linear-gradient(180deg,${tc.c300} 0,${tc.c500} 6px,${tc.c600} 12px,${tc.c300} 18px)`,
              boxShadow: `0 0 14px ${tc.c500}88`,
            }} />
            {/* Knob */}
            <div style={{
              width: 38, height: 38, margin: '0 auto', borderRadius: '50%',
              background: `linear-gradient(135deg,${tc.c500},${tc.v500})`,
              boxShadow: isPulled ? `0 0 28px ${tc.c500}f0` : `0 0 16px ${tc.c500}99`,
              border: `2px solid ${tc.c300}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 16, transition: 'box-shadow 0.2s',
            }}>
              {isPulled ? '✓' : '↓'}
            </div>
          </div>

          {/* Hint */}
          <p style={{
            marginTop: 8, fontSize: 9, fontWeight: 900,
            letterSpacing: '0.4em', textTransform: 'uppercase',
            color: tc.c400, opacity: isPulled ? 0 : 0.7,
            transition: 'opacity 0.2s ease',
            animation: isPulled ? 'none' : 'pf-blink 2s ease-in-out infinite',
          }}>Pull to Open Portfolio</p>
        </div>
      </div>

      {/* ── LETTER-DROP LOADING SCREEN PHASE ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 499, overflow: 'hidden',
        background: '#060612',
        opacity: isExit ? 0 : (showLetters ? 1 : 0),
        transition: 'opacity 0.45s ease',
        pointerEvents: showLetters && !isExit ? 'auto' : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
      }}>
        {/* Ambient glows — theme-colored */}
        <div style={{
          position: 'absolute', top: '20%', left: '25%',
          width: 400, height: 400, borderRadius: '50%',
          background: tc.c500, opacity: 0.07, filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '25%',
          width: 400, height: 400, borderRadius: '50%',
          background: tc.v500, opacity: 0.07, filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -8, borderRadius: 28,
            background: tc.c500, opacity: 0.3, filter: 'blur(16px)',
          }} />
          <div style={{
            position: 'relative', width: 72, height: 72, borderRadius: 22,
            background: `linear-gradient(135deg,${tc.c500},${tc.v500})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, boxShadow: `0 8px 32px ${tc.c500}70`,
            animation: showLetters ? 'pf-subtitle 0.5s ease 0.1s both' : 'none',
          }}>⚡</div>
        </div>

        {/* Letter-drop name */}
        <div style={{ textAlign: 'center', perspective: '600px' }}>
          {/* Line 1: ARCHIT'S */}
          <div style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 900,
            letterSpacing: '0.12em', color: '#fff', lineHeight: 1.1,
            marginBottom: 6,
          }}>
            {showLetters && line1.split('').map((ch, i) => (
              <span key={i} style={{
                display: 'inline-block',
                animation: `pf-letter-drop 0.55s cubic-bezier(0.215,0.61,0.355,1) ${0.2 + i * charGap}s both`,
                willChange: 'transform, opacity',
              }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>

          {/* Line 2: PORTFOLIO — theme gradient */}
          <div style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 900,
            letterSpacing: '0.12em', lineHeight: 1.1,
            background: `linear-gradient(135deg,${tc.c400} 0%,${tc.v500} 50%,${tc.c300} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {showLetters && line2.split('').map((ch, i) => (
              <span key={i} style={{
                display: 'inline-block',
                animation: `pf-letter-drop 0.55s cubic-bezier(0.215,0.61,0.355,1) ${line2Start + i * charGap}s both`,
                willChange: 'transform, opacity',
              }}>
                {ch}
              </span>
            ))}
          </div>

          {/* Glowing underline — theme color */}
          <div style={{
            margin: '12px auto 0',
            height: 2, width: 160, borderRadius: 2,
            background: `linear-gradient(90deg,transparent,${tc.c400},${tc.v500},transparent)`,
            transformOrigin: 'center',
            animation: showLetters
              ? `pf-underline 0.7s ease ${line2Start + line2.length * charGap + 0.1}s both`
              : 'none',
          }} />

          {/* Subtitle */}
          <p style={{
            marginTop: 10, fontSize: 10, fontWeight: 900,
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: tc.c400,
            animation: showLetters
              ? `pf-subtitle 0.5s ease ${line2Start + line2.length * charGap + 0.35}s both`
              : 'none',
          }}>Opening...</p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: 220,
          animation: showLetters ? 'pf-subtitle 0.5s ease 1.2s both' : 'none',
        }}>
          <div style={{
            width: '100%', height: 3, borderRadius: 3,
            background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 3,
              width: `${progress}%`,
              background: `linear-gradient(90deg,${tc.c500},${tc.v500},${tc.c300})`,
              boxShadow: `0 0 10px ${tc.c500}b0`,
              transition: 'width 0.1s linear',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Loading Portfolio
            </span>
            <span style={{ fontSize: 9, fontWeight: 900, color: tc.c500 }}>{progress}%</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Portfolio Page ───────────────────────────────────────────
// ── Icon name ↔ component map (for localStorage storage of icons) ────
const ICON_MAP = { Award, BookOpen, Shield, Zap, Cpu, Dna, Terminal, Mail, Phone, Code2, GraduationCap, Briefcase, ExternalLink, User };
const ICON_NAMES = Object.keys(ICON_MAP);

// ── Serialize/deserialize icons (stored as string names) ─────
const serializeAchievements  = (arr) => arr.map(a => ({ ...a, icon: Object.keys(ICON_MAP).find(k => ICON_MAP[k] === a.icon) || 'Award' }));
const deserializeAchievements = (arr) => arr.map(a => ({ ...a, icon: ICON_MAP[a.icon] || Award }));
const serializeInsights  = (arr) => arr.map(a => ({ ...a, icon: Object.keys(ICON_MAP).find(k => ICON_MAP[k] === a.icon) || 'Terminal' }));
const deserializeInsights = (arr) => arr.map(a => ({ ...a, icon: ICON_MAP[a.icon] || Terminal }));

// ── Default data snapshots (serialized for storage comparison) ──────
const DEFAULT_DATA = {
  name: NAME, title: TITLE, bio: BIO,
  contact: CONTACT.map(c => ({ label: c.label, href: c.href })),
  education: EDUCATION,
  skills: SKILLS,
  currentlyLearning: CURRENTLY_LEARNING,
  projects: PROJECTS,
  achievements: serializeAchievements(ACHIEVEMENTS),
  insights: serializeInsights(TECHNICAL_INSIGHTS),
};

function loadPfData() {
  try { return JSON.parse(localStorage.getItem('pf_data_v2')) || DEFAULT_DATA; }
  catch { return DEFAULT_DATA; }
}

// ────────────────────────────────────────────────────────────────────
// ── Inline field components ─────────────────────────────────────────
const Field = ({ label, value, onChange, multiline, rows = 3, placeholder = '' }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[9px] font-black uppercase tracking-widest text-indigo-500">{label}</label>}
    {multiline
      ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl text-sm bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none leading-relaxed" />
      : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
    }
  </div>
);

const AddBtn = ({ onClick, label = 'Add Item' }) => (
  <button onClick={onClick}
    className="w-full py-2 rounded-xl border-2 border-dashed border-indigo-500/30 text-indigo-500 text-[10px] font-black uppercase tracking-widest hover:border-indigo-500/60 hover:bg-indigo-500/5 transition-all">
    + {label}
  </button>
);

const DelBtn = ({ onClick }) => (
  <button onClick={onClick} className="shrink-0 w-7 h-7 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center text-sm transition-all">✕</button>
);

// ────────────────────────────────────────────────────────────────────
// ── Full-Screen Portfolio Editor Drawer ─────────────────────────────
function PortfolioEditor({ onClose, onSave }) {
  const [tab, setTab] = useState(0);
  const [d, setD] = useState(() => loadPfData()); // draft

  const save = () => { localStorage.setItem('pf_data_v2', JSON.stringify(d)); onSave(d); onClose(); };

  const upd = (key, val) => setD(prev => ({ ...prev, [key]: val }));

  const TABS = ['Basic Info', 'Contact', 'Education', 'Skills', 'Projects', 'Achievements', 'Tech Insights'];

  // ── array helpers ──
  const arrAdd  = (key, item) => upd(key, [...d[key], item]);
  const arrDel  = (key, i)    => upd(key, d[key].filter((_, idx) => idx !== i));
  const arrUpd  = (key, i, patch) => upd(key, d[key].map((item, idx) => idx === i ? { ...item, ...patch } : item));

  return (
    <div className="fixed inset-0 z-[600] flex flex-col" style={{ background: 'rgba(6,6,18,0.85)', backdropFilter: 'blur(12px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Portfolio Editor</p>
          <p className="text-white font-black text-lg leading-tight">Edit Everything</p>
        </div>
        <div className="flex gap-3">
          <button onClick={save}
            className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white"
            style={{ background: 'var(--color-indigo-500)' }}>✓ Save All</button>
          <button onClick={onClose}
            className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 text-slate-400 hover:text-white hover:border-white/40 transition-all">✕ Cancel</button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 px-6 py-3 border-b border-white/10 overflow-x-auto shrink-0">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${tab === i ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            style={tab === i ? { background: 'var(--color-indigo-500)' } : {}}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {/* ─ 0: Basic Info ─ */}
        {tab === 0 && <>
          <Field label="Full Name" value={d.name} onChange={v => upd('name', v)} />
          <Field label="Title / Role" value={d.title} onChange={v => upd('title', v)} />
          <Field label="Bio" value={d.bio} onChange={v => upd('bio', v)} multiline rows={4} />
        </>}

        {/* ─ 1: Contact ─ */}
        {tab === 1 && <>
          {d.contact.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Link {i + 1}</p>
                <DelBtn onClick={() => arrDel('contact', i)} />
              </div>
              <Field label="Display Label" value={c.label} onChange={v => arrUpd('contact', i, { label: v })} placeholder="e.g. archit@gmail.com" />
              <Field label="URL / href" value={c.href} onChange={v => arrUpd('contact', i, { href: v })} placeholder="e.g. mailto:archit@gmail.com" />
            </div>
          ))}
          <AddBtn label="Add Contact Link" onClick={() => arrAdd('contact', { label: '', href: '' })} />
        </>}

        {/* ─ 2: Education ─ */}
        {tab === 2 && <>
          {d.education.map((e, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Entry {i + 1}</p>
                <DelBtn onClick={() => arrDel('education', i)} />
              </div>
              <Field label="Degree / Programme" value={e.degree} onChange={v => arrUpd('education', i, { degree: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="School / College" value={e.school} onChange={v => arrUpd('education', i, { school: v })} />
                <Field label="Duration" value={e.duration} onChange={v => arrUpd('education', i, { duration: v })} placeholder="2024 – 2028" />
              </div>
              <Field label="Grade / Status" value={e.grade} onChange={v => arrUpd('education', i, { grade: v })} placeholder="e.g. Pursuing / 8.5 CGPA" />
            </div>
          ))}
          <AddBtn label="Add Education" onClick={() => arrAdd('education', { degree: '', school: '', duration: '', grade: '' })} />
        </>}

        {/* ─ 3: Skills ─ */}
        {tab === 3 && <>
          <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-2">Skills</p>
          {d.skills.map((s, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.name || `Skill ${i+1}`}</p>
                <DelBtn onClick={() => arrDel('skills', i)} />
              </div>
              <Field label="Skill Name" value={s.name} onChange={v => arrUpd('skills', i, { name: v })} />
              <Field label="Usage / Description" value={s.usageText} onChange={v => arrUpd('skills', i, { usageText: v })} multiline rows={2} />
            </div>
          ))}
          <AddBtn label="Add Skill" onClick={() => arrAdd('skills', { name: '', usageText: '' })} />

          <div className="pt-2 border-t border-white/10">
            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-3">Currently Learning (comma-separated)</p>
            <Field value={d.currentlyLearning.join(', ')}
              onChange={v => upd('currentlyLearning', v.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="TypeScript, Node.js, MongoDB" />
          </div>
        </>}

        {/* ─ 4: Projects ─ */}
        {tab === 4 && <>
          {d.projects.map((p, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{p.name || `Project ${i+1}`}</p>
                <DelBtn onClick={() => arrDel('projects', i)} />
              </div>
              <Field label="Project Name" value={p.name} onChange={v => arrUpd('projects', i, { name: v })} />
              <Field label="Description" value={p.desc} onChange={v => arrUpd('projects', i, { desc: v })} multiline rows={3} />
              <Field label="Tech Stack" value={p.tech} onChange={v => arrUpd('projects', i, { tech: v })} placeholder="React • Node.js • MongoDB" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="GitHub URL" value={p.github} onChange={v => arrUpd('projects', i, { github: v })} />
                <Field label="Live Demo URL" value={p.live} onChange={v => arrUpd('projects', i, { live: v })} placeholder="# or https://..." />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-indigo-500">Card Color</label>
                <input type="color" value={p.color} onChange={e => arrUpd('projects', i, { color: e.target.value })}
                  className="w-10 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent" />
                <span className="text-xs text-slate-400">{p.color}</span>
              </div>
            </div>
          ))}
          <AddBtn label="Add Project" onClick={() => arrAdd('projects', { name: '', desc: '', tech: '', color: '#6366f1', github: '', live: '#' })} />
        </>}

        {/* ─ 5: Achievements ─ */}
        {tab === 5 && <>
          {d.achievements.map((a, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{a.title?.slice(0,30) || `Achievement ${i+1}`}</p>
                <DelBtn onClick={() => arrDel('achievements', i)} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black uppercase tracking-widest text-indigo-500">Icon</label>
                <select value={a.icon} onChange={e => arrUpd('achievements', i, { icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none">
                  {ICON_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <Field label="Title" value={a.title} onChange={v => arrUpd('achievements', i, { title: v })} />
              <Field label="Subtitle (e.g. Coursera · 2024)" value={a.sub} onChange={v => arrUpd('achievements', i, { sub: v })} />
            </div>
          ))}
          <AddBtn label="Add Achievement" onClick={() => arrAdd('achievements', { icon: 'Award', title: '', sub: '' })} />
        </>}

        {/* ─ 6: Technical Insights ─ */}
        {tab === 6 && <>
          {d.insights.map((ins, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{ins.title?.slice(0,30) || `Insight ${i+1}`}</p>
                <DelBtn onClick={() => arrDel('insights', i)} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black uppercase tracking-widest text-indigo-500">Icon</label>
                <select value={ins.icon} onChange={e => arrUpd('insights', i, { icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none">
                  {ICON_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <Field label="Title" value={ins.title} onChange={v => arrUpd('insights', i, { title: v })} />
              <Field label="Tech Stack" value={ins.stack} onChange={v => arrUpd('insights', i, { stack: v })} placeholder="React • Canvas API" />
              <Field label="Description" value={ins.description} onChange={v => arrUpd('insights', i, { description: v })} multiline rows={3} />
            </div>
          ))}
          <AddBtn label="Add Technical Insight" onClick={() => arrAdd('insights', { icon: 'Terminal', title: '', stack: '', description: '' })} />
        </>}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSkill,      setActiveSkill]      = useState(null);
  const [activeSection,    setActiveSection]     = useState('hero');
  const [scrollProgress,   setScrollProgress]    = useState(0);
  const [showBackToTop,    setShowBackToTop]      = useState(false);
  const [countersStarted,  setCountersStarted]   = useState(false);
  // Only show loading screen on first visit — skip it when navigating back
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(
    () => !sessionStorage.getItem('portfolio_visited')
  );
  const [isEditorOpen,     setIsEditorOpen]      = useState(false);
  const navigate   = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const heroRef    = useRef(null);

  // ── Photo upload ──────────────────────────────────────────
  const [photo, setPhoto] = useState(() => localStorage.getItem('pf_photo') || null);
  const photoInputRef = useRef(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhoto(ev.target.result); localStorage.setItem('pf_photo', ev.target.result); };
    reader.readAsDataURL(file);
  };

  // ── Portfolio data ────────────────────────────────────────
  const [pfData, setPfData] = useState(loadPfData);
  const onSave = (saved) => setPfData(saved);

  const displayName         = pfData.name        || NAME;
  const displayTitle        = pfData.title        || TITLE;
  const displayBio          = pfData.bio          || BIO;
  const displayContact      = pfData.contact      || CONTACT.map(c => ({ label: c.label, href: c.href }));
  const displayEdu          = pfData.education    || EDUCATION;
  const displaySkills       = pfData.skills       || SKILLS;
  const displayLearning     = pfData.currentlyLearning || CURRENTLY_LEARNING;
  const displayProjects     = pfData.projects     || PROJECTS;
  const displayAchievements = deserializeAchievements(pfData.achievements || serializeAchievements(ACHIEVEMENTS));
  const displayInsights     = deserializeInsights(pfData.insights       || serializeInsights(TECHNICAL_INSIGHTS));

  const SKILL_LEVELS = {
    'React': 90, 'JavaScript': 88, 'Three.js': 72, 'CSS/Tailwind': 85,
    'Vite': 80, 'LocalStorage': 78, 'Framer Motion': 75,
  };

  const NAV_LINKS = [
    { label: 'About',    id: 'about'    },
    { label: 'Skills',   id: 'skills'   },
    { label: 'Projects', id: 'projects' },
    { label: 'Insights', id: 'insights' },
    { label: 'Contact',  id: 'contact'  },
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // ── Scroll progress + back-to-top + active section ───────
  useEffect(() => {
    const handleScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(pct);
      setShowBackToTop(el.scrollTop > 400);
      if (el.scrollTop > 200) setCountersStarted(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Active nav section via IntersectionObserver ───────────
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'insights', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // ── Animated counter hook ─────────────────────────────────
  const Counter = ({ target, suffix = '' }) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (!countersStarted) return;
      let start = 0;
      const step = Math.ceil(target / 50);
      const t = setInterval(() => {
        start = Math.min(start + step, target);
        setVal(start);
        if (start >= target) clearInterval(t);
      }, 30);
      return () => clearInterval(t);
    }, [countersStarted, target]);
    return <span>{val}{suffix}</span>;
  };

  // ── 3D tilt handler for project cards ────────────────────
  const handleTilt = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  };
  const resetTilt = (el) => { el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)'; };

  // ── STAT cards data ───────────────────────────────────────
  const STATS = [
    { label: 'Tools Built',    value: 12, suffix: '+'  },
    { label: 'Projects Live',  value: 3,  suffix: ''   },
    { label: 'LeetCode',       value: 100, suffix: '+' },
    { label: 'Certs Earned',   value: 3,  suffix: ''   },
  ];

  return (
    <div className="w-full relative font-sans overflow-x-hidden">
      {/* ── Scroll progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-transparent">
        <div
          className="h-full transition-none"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7, #38bdf8)' }}
        />
      </div>

      {isPortfolioLoading && <PortfolioLoadingScreen onDone={() => { sessionStorage.setItem('portfolio_visited', '1'); setIsPortfolioLoading(false); }} />}
      {isEditorOpen && <PortfolioEditor onClose={() => setIsEditorOpen(false)} onSave={onSave} />}

      <GlobeBackground isDarkMode={isDarkMode} />

      {/* Page tint */}
      <div className="fixed inset-0 z-[1] pointer-events-none transition-colors duration-500"
        style={{ background: isDarkMode ? 'rgba(5,4,18,0.55)' : 'rgba(240,238,255,0.6)' }} />

      {/* ── Floating Nav ─────────────────────────────────────── */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <div className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-2xl shadow-slate-300/30 dark:shadow-black/50">
          <button onClick={() => scrollTo('hero')}
            className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs mr-1 hover:scale-110 transition-transform shadow-lg shadow-indigo-500/40">
            ⚡
          </button>
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`relative px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${activeSection === id ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400'}`}>
              {activeSection === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-indigo-600"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {label}
            </button>
          ))}
          <button onClick={toggleTheme}
            className="w-7 h-7 ml-1 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      {/* ── Back to top ──────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl shadow-indigo-500/40 flex items-center justify-center transition-all hover:scale-110"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section id="hero" className="min-h-screen flex items-center pt-24 pb-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text content */}
            <div className="space-y-8">
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Opportunities
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                className="space-y-2"
              >
                <p className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500">Hello, I'm</p>
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black dark:text-white leading-[1.05] tracking-tight">
                  {displayName.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500' : 'block'}>
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-lg font-semibold text-slate-500 dark:text-slate-400 mt-3">{displayTitle}</p>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg"
              >
                {displayBio}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <a href={RESUME_URL} download
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: '1px solid rgba(139,92,246,0.4)', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95">
                  <Download size={14} /> Download CV
                </a>
                <a href="https://github.com/architcoder1234" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-widest hover:bg-white/25 transition-all hover:-translate-y-0.5 active:scale-95">
                  <GithubIcon size={14} /> GitHub
                </a>
                <button onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 dark:bg-white/5 border border-white/30 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-widest hover:bg-white/25 transition-all hover:-translate-y-0.5 active:scale-95 group">
                  <Zap size={14} className="group-hover:scale-110 transition-transform text-indigo-500" /> Dashboard →
                </button>
              </motion.div>

              {/* Stat counters */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-200/60 dark:border-white/10"
              >
                {STATS.map(({ label, value, suffix }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-black text-indigo-500 tabular-nums">
                      <Counter target={value} suffix={suffix} />
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — photo + editor button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative group">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-4 border-indigo-500/30 overflow-hidden cursor-pointer shadow-2xl shadow-indigo-500/20"
                  onClick={() => photoInputRef.current?.click()}>
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex flex-col items-center justify-center gap-2 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                      <User size={64} className="text-indigo-400 opacity-50" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-60">Click to upload</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="text-white text-xs font-black uppercase tracking-wider">Change Photo</span>
                  </div>
                </div>
                <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />

                {/* Online indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
              </div>

              {/* Edit portfolio button */}
              <button onClick={() => setIsEditorOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-indigo-500 hover:border-indigo-500/30 transition-all">
                <Terminal size={12} /> Edit Portfolio Content
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ABOUT + EDUCATION TIMELINE
        ══════════════════════════════════════════════════════ */}
        <section id="about" className="py-20 space-y-12">
          <Reveal>
            <SectionHeading icon={User} label="About Me" sub="Background & Education" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <Reveal className="lg:col-span-2" delay={0.1}>
              <Card className="p-8 h-full space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Get in Touch</h3>
                <div className="space-y-4">
                  {displayContact.map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-500/5 border border-transparent hover:border-indigo-500/20 transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {i === 0 && <Mail size={14} className="text-indigo-500 group-hover:text-white" />}
                        {i === 1 && <Phone size={14} className="text-indigo-500 group-hover:text-white" />}
                        {i === 2 && <GithubIcon size={14} className="text-indigo-500 group-hover:text-white" />}
                        {i === 3 && <LinkedinIcon size={14} className="text-indigo-500 group-hover:text-white" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300 truncate font-medium group-hover:text-indigo-500 transition-colors">{c.label}</span>
                    </a>
                  ))}
                </div>

                {/* Currently learning chips */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Currently Learning</p>
                  <div className="flex flex-wrap gap-2">
                    {displayLearning.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold border border-indigo-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Education Timeline */}
            <Reveal className="lg:col-span-3" delay={0.2}>
              <Card className="p-8 h-full space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Education Timeline</h3>
                <div className="relative space-y-6 pl-6">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent rounded-full" />
                  {displayEdu.map((edu, i) => (
                    <div key={i} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-900 shadow-sm shadow-indigo-500/30" />
                      <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 hover:border-indigo-500/30 transition-all">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-black dark:text-white text-sm leading-tight">{edu.degree}</h4>
                          <span className="px-2.5 py-1 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider shrink-0 border border-indigo-500/20">
                            {edu.grade}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <GraduationCap size={12} /> {edu.school}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{edu.duration}</p>
                      </div>
                    </div>
                  ))}

                  {/* Achievements inline */}
                  {displayAchievements.slice(0, 3).map((a, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-2 border-purple-500 bg-white dark:bg-slate-900 shadow-sm shadow-purple-500/30" />
                      <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/15 hover:border-purple-500/30 transition-all flex items-start gap-3">
                        <a.icon size={16} className="text-purple-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold dark:text-white leading-tight">{a.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{a.sub}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════════════════ */}
        <section id="skills" className="py-20 space-y-12">
          <Reveal>
            <SectionHeading icon={Code2} label="Technical Skills" sub="What I build with" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skill bars */}
            <Reveal delay={0.1}>
              <Card className="p-8 space-y-5">
                {displaySkills.map((skill, i) => {
                  const pct = SKILL_LEVELS[skill.name] || 70;
                  const isActive = activeSkill === skill.name;
                  return (
                    <div key={i} className="space-y-2 cursor-pointer group" onClick={() => setActiveSkill(isActive ? null : skill.name)}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-black dark:text-white uppercase tracking-tight group-hover:text-indigo-500 transition-colors">{skill.name}</span>
                        <span className="text-[10px] font-bold text-indigo-500">{pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }}
                        />
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1 overflow-hidden"
                          >
                            {skill.usageText}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center pt-2 opacity-50">Click a skill to see how I use it</p>
              </Card>
            </Reveal>

            {/* Skill category grid */}
            <Reveal delay={0.2}>
              <Card className="p-8 space-y-5">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-2">Skill Domains</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Frontend',  skills: ['React', 'Tailwind', 'Framer Motion', 'Three.js'], color: 'indigo' },
                    { label: 'Language',  skills: ['JavaScript', 'Java', 'Python', 'C / C++'],        color: 'violet' },
                    { label: 'Tools',     skills: ['Vite', 'Git', 'WampServer', 'VS Code'],           color: 'purple' },
                    { label: 'Concepts',  skills: ['OOP', 'DSA', 'REST APIs', 'LocalStorage'],        color: 'sky'    },
                  ].map(({ label, skills, color }) => (
                    <div key={label} className={`p-4 rounded-2xl bg-${color}-500/5 border border-${color}-500/20 hover:border-${color}-500/40 transition-all`}>
                      <p className={`text-[10px] font-black uppercase tracking-widest text-${color}-500 mb-3`}>{label}</p>
                      <div className="space-y-1.5">
                        {skills.map(s => (
                          <div key={s} className="flex items-center gap-2">
                            <div className={`w-1 h-1 rounded-full bg-${color}-500`} />
                            <span className="text-xs font-semibold dark:text-slate-300 text-slate-600">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security tools */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Security / Extras</p>
                  <div className="flex flex-wrap gap-2">
                    {['Wireshark', 'SQLMap', 'CS50x', 'MySQL', 'WampServer'].map(t => (
                      <span key={t} className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════════════════ */}
        <section id="projects" className="py-20 space-y-12">
          <Reveal>
            <SectionHeading icon={Briefcase} label="Projects" sub="What I've shipped" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/60 dark:border-white/8 rounded-3xl overflow-hidden shadow-xl group cursor-default"
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
                  onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                  onMouseLeave={(e) => resetTilt(e.currentTarget)}
                >
                  {/* Gradient accent top bar */}
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }} />

                  {/* Featured badge on first project */}
                  {i === 0 && (
                    <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white"
                      style={{ background: project.color }}>
                      ★ Featured
                    </div>
                  )}

                  <div className="p-7 space-y-5">
                    {/* Project icon */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black"
                      style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}>
                      {i === 0 ? '⚡' : i === 1 ? '🎮' : '🔐'}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {project.desc}
                      </p>
                    </div>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.split('•').map(t => t.trim()).filter(Boolean).map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider dark:text-slate-300 text-slate-600"
                          style={{ background: `${project.color}12`, border: `1px solid ${project.color}25` }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-white/5">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-indigo-500 transition-colors">
                        <GithubIcon size={13} /> GitHub
                      </a>
                      {project.live && project.live !== '#' && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-indigo-500 transition-colors">
                          <ExternalLink size={13} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TECHNICAL INSIGHTS
        ══════════════════════════════════════════════════════ */}
        <section id="insights" className="py-20 space-y-12">
          <Reveal>
            <SectionHeading icon={Terminal} label="Technical Insights" sub="How it works under the hood" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {displayInsights.map((ins, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="group p-7 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/8 rounded-3xl hover:border-indigo-500/30 hover:shadow-indigo-500/10 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setActiveSkill(activeSkill === `ins-${i}` ? null : `ins-${i}`)}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                      <ins.icon size={20} className="text-indigo-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h4 className="font-black dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-tight">{ins.title}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {ins.stack.split('•').map(t => t.trim()).filter(Boolean).map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold border border-indigo-500/15">{s}</span>
                        ))}
                      </div>
                      <AnimatePresence>
                        {activeSkill === `ins-${i}` && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2 overflow-hidden"
                          >
                            {ins.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={`text-slate-300 text-xs transition-transform ${activeSkill === `ins-${i}` ? 'rotate-90' : ''}`}>▶</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CONTACT FORM
        ══════════════════════════════════════════════════════ */}
        <section id="contact" className="py-20 space-y-12 pb-32">
          <Reveal>
            <SectionHeading icon={Mail} label="Let's Connect" sub="Get in touch" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — availability card */}
            <Reveal className="lg:col-span-2" delay={0.1}>
              <Card className="p-8 h-full space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                  <Mail className="text-white w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black dark:text-white">Open to Work</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    I'm actively looking for internships and open-source collaborations. Let's build something amazing together.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Mail,         label: displayContact[0]?.label || 'archit33221@gmail.com' },
                    { icon: GithubIcon,   label: 'github.com/architcoder1234' },
                    { icon: LinkedinIcon, label: 'LinkedIn Profile' },
                  ].map(({ icon: Icon, label }, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <Icon size={14} className="text-indigo-500 shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex gap-3">
                  <a href={`mailto:${displayContact[0]?.label}`}
                    className="flex-1 text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/30">
                    Email Me
                  </a>
                  <a href="https://github.com/architcoder1234" target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold rounded-xl text-sm dark:text-white transition-all">
                    GitHub
                  </a>
                </div>
              </Card>
            </Reveal>

            {/* Right — mock contact form */}
            <Reveal className="lg:col-span-3" delay={0.2}>
              <Card className="p-8 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Send a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Name</label>
                    <input readOnly placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-not-allowed opacity-60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Email</label>
                    <input readOnly placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-not-allowed opacity-60" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</label>
                  <input readOnly placeholder="Internship Opportunity / Collaboration"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-not-allowed opacity-60" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                  <textarea readOnly rows={4} placeholder="Hi Archit, I'd love to work with you on..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none transition-all cursor-not-allowed opacity-60" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Form UI only — use email link to contact
                  </p>
                  <a href={`mailto:${displayContact[0]?.label || 'archit33221@gmail.com'}`}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/30 active:scale-95">
                    <Mail size={14} /> Send Email →
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>

          {/* Footer strip */}
          <Reveal delay={0.3}>
            <div className="text-center py-8 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Designed & Built by {displayName}
              </p>
              <p className="text-[9px] text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                React · Vite · Three.js · Framer Motion · Tailwind CSS
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
