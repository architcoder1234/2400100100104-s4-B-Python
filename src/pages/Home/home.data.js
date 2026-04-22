// ── home.data.js ─────────────────────────────────────────────
// All the tool cards shown on the Dashboard grid.
// Edit this file to add, remove, or reorder cards.

export const getTools = (stats) => [
  {
    title: 'To-Do List', path: '/todo',
    icon: 'ListTodo', color: 'text-indigo-500', bg: 'bg-indigo-500/10',
    desc: 'Manage your daily tasks.',
    badge: stats.todos > 0 ? `${stats.todos} Pending` : 'Clear',
  },
  {
    title: 'Student Info', path: '/students',
    icon: 'GraduationCap', color: 'text-emerald-500', bg: 'bg-emerald-500/10',
    desc: 'Academic records.',
    badge: `${stats.students} Enrolled`,
  },
  {
    title: 'Weather App', path: '/weather',
    icon: 'Cloud', color: 'text-sky-500', bg: 'bg-sky-500/10',
    desc: 'Live forecast data.',
    badge: stats.temp,
  },
  {
    title: 'Geographic Map', path: '/map',
    icon: 'MapPin', color: 'text-rose-500', bg: 'bg-rose-500/10',
    desc: 'Global maps.',
  },
  {
    title: 'Finance Center', path: '/finance',
    icon: 'Landmark', color: 'text-amber-500', bg: 'bg-amber-500/10',
    desc: 'Currency converter.',
  },
  {
    title: 'Unit Converter', path: '/units',
    icon: 'Ruler', color: 'text-indigo-500', bg: 'bg-indigo-500/10',
    desc: 'Length & Weight.',
  },
  {
    title: 'Quick Notes', path: '/notes',
    icon: 'Notebook', color: 'text-teal-500', bg: 'bg-teal-500/10',
    desc: 'Secure scratchpad.',
  },
  {
    title: 'Utility Suite', path: '/utilities',
    icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-500/10',
    desc: 'Stopwatch & Tools.',
  },
  {
    title: 'Snake Arena', path: '/snake',
    icon: 'Gamepad2', color: 'text-indigo-500', bg: 'bg-indigo-500/10',
    desc: 'Mouse-controlled game.',
    badge: stats.snakeHi > 0 ? `Record: ${stats.snakeHi}` : 'New Game',
  },
  {
    title: 'Code Breaker', path: '/codebreaker',
    icon: 'ShieldCheck', color: 'text-emerald-500', bg: 'bg-emerald-500/10',
    desc: 'Crack the 4-digit code.', badge: 'Security',
  },
  {
    title: 'Math Studio', path: '/math',
    icon: 'Calculator', color: 'text-pink-500', bg: 'bg-pink-500/10',
    desc: 'Calc & Theory.',
  },
  {
    title: 'Security Auth', path: '/auth',
    icon: 'Users', color: 'text-cyan-500', bg: 'bg-cyan-500/10',
    desc: 'Login & Reg.',
  },
];

/** Fetches quick weather temp for the dashboard stat card */
export async function fetchDashboardWeather() {
  try {
    const res = await fetch('https://wttr.in/New%20Delhi?format=j1');
    const data = await res.json();
    return data.current_condition[0].temp_C + '°C';
  } catch {
    return '--';
  }
}
