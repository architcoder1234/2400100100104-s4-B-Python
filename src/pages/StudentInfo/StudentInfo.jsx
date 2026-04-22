// ── StudentInfo.jsx ──────────────────────────────────────────
// NEW: live search bar + sort by name / marks / branch.
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useMemo } from 'react';
import { GraduationCap, Trophy, BookOpen, Layers, Search, ArrowUpDown } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { getStatus, getStatusColors, DEFAULT_STUDENTS } from './student.utils.js';
import './StudentInfo.css';

const StudentInfo = () => {
  const { addToast } = useNotification();
  const [students,   setStudents]   = useState(() => JSON.parse(localStorage.getItem('react-tools-students') || 'null') || DEFAULT_STUDENTS);
  const [newStudent, setNewStudent] = useState({ name: '', branch: '', marks: '' });
  const [query,      setQuery]      = useState('');
  const [sortBy,     setSortBy]     = useState('name'); // name | marks | branch

  useEffect(() => { localStorage.setItem('react-tools-students', JSON.stringify(students)); }, [students]);

  const addStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.branch || !newStudent.marks) return;
    const marksVal = parseInt(newStudent.marks);
    setStudents([{ id: Date.now(), ...newStudent, marks: marksVal, status: getStatus(marksVal) }, ...students]);
    setNewStudent({ name: '', branch: '', marks: '' });
    addToast(`Enrolled ${newStudent.name}!`, 'success');
  };

  // ── Search + sort ────────────────────────────────────────
  const displayed = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.branch.toLowerCase().includes(q) ||
      String(s.marks).includes(q)
    );
    return [...filtered].sort((a, b) => {
      if (sortBy === 'marks')  return b.marks - a.marks;
      if (sortBy === 'branch') return a.branch.localeCompare(b.branch);
      return a.name.localeCompare(b.name);
    });
  }, [students, query, sortBy]);

  const avg = students.length ? Math.round(students.reduce((a, b) => a + b.marks, 0) / students.length) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-6 duration-700 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center bg-indigo-600/10 p-8 rounded-3xl border border-indigo-500/20">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-indigo-500/30">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold dark:text-white">Academic Performance</h2>
            <p className="text-indigo-500 font-semibold tracking-wide uppercase text-xs">Student Information Portal</p>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="px-6 py-3 glass-card text-center border-none shadow-none">
            <span className="block text-2xl font-bold dark:text-white">{students.length}</span>
            <span className="text-[10px] uppercase font-bold text-slate-500">Enrolled</span>
          </div>
          <div className="px-6 py-3 glass-card text-center border-none shadow-none text-emerald-600">
            <span className="block text-2xl font-bold">{avg}%</span>
            <span className="text-[10px] uppercase font-bold">Avg Marks</span>
          </div>
        </div>
      </div>

      {/* Add student form */}
      <form onSubmit={addStudent} className="glass-card p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end border-indigo-500/10">
        {[
          { label: 'Full Name',  key: 'name',   type: 'text',   ph: 'e.g. John Doe'         },
          { label: 'Branch',     key: 'branch', type: 'text',   ph: 'e.g. Computer Science'  },
          { label: 'Marks (%)',  key: 'marks',  type: 'number', ph: '0-100'                  },
        ].map(({ label, key, type, ph }) => (
          <div key={key} className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500">{label}</label>
            <input required type={type} min={type==='number'?0:undefined} max={type==='number'?100:undefined}
              value={newStudent[key]} onChange={e => setNewStudent({ ...newStudent, [key]: e.target.value })}
              placeholder={ph}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white" />
          </div>
        ))}
        <button type="submit" className="w-full p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
          <Layers className="w-4 h-4" /> Add Record
        </button>
      </form>

      {/* Search + sort bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, branch, or marks..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white text-sm" />
        </div>
        <div className="relative">
          <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="pl-8 pr-10 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white text-sm font-bold cursor-pointer appearance-none">
            <option value="name">Sort: Name A–Z</option>
            <option value="marks">Sort: Marks ↓</option>
            <option value="branch">Sort: Branch A–Z</option>
          </select>
        </div>
        {query && (
          <div className="flex items-center text-xs font-bold text-slate-400 px-2">
            {displayed.length} result{displayed.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map(student => (
          <div key={student.id} className="student-card glass-card p-6 flex flex-col gap-6 hover:translate-y-[-4px] transition-transform duration-300 group hover:shadow-indigo-500/10">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="student-avatar w-16 h-16 rounded-full border-2 border-indigo-500/20 p-1 bg-white shadow-inner overflow-hidden transition-all">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                  <BookOpen className="w-6 h-6 text-indigo-500 group-hover:text-white" />
                </div>
              </div>
              <span className={`status-badge ${getStatusColors(student.marks)}`}>{student.status}</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold dark:text-white">{student.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1"><Layers className="w-3 h-3" /> {student.branch}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Marks</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{student.marks}%</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-indigo-500/30 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
        {displayed.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-400 font-medium">No students match "{query}"</div>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
