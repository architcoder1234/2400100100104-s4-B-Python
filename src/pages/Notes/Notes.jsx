// ── Notes.jsx ────────────────────────────────────────────────
// NEW: hashtag detection — type #tag in your note and it
// appears as a clickable colour chip below the editor.
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useMemo } from 'react';
import { Notebook, Trash2, Edit3, Clock, AlertCircle, Download, BookOpen, Hash, X } from 'lucide-react';
import './Notes.css';

// Palette of colours for tag chips (cycles through)
const TAG_COLORS = [
  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
];

const Notes = () => {
  const [note,      setNote]      = useState(() => localStorage.getItem('react-tools-notes') || 'Start typing your notes here...\n\nTip: use #hashtags to organize ideas!');
  const [lastSaved, setLastSaved] = useState('');
  const [saving,    setSaving]    = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  // Auto-save 1 s debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setSaving(true);
      localStorage.setItem('react-tools-notes', note);
      setTimeout(() => { setLastSaved(new Date().toLocaleTimeString()); setSaving(false); }, 400);
    }, 1000);
    return () => clearTimeout(t);
  }, [note]);

  // Extract unique tags from note text
  const tags = useMemo(() => {
    const matches = note.match(/#[\w]+/g) || [];
    return [...new Set(matches)];
  }, [note]);

  // If an activeTag filter is set, count matching lines
  const displayedNote = useMemo(() => {
    if (!activeTag) return note;
    return note.split('\n').filter(line => line.includes(activeTag)).join('\n') || '(no lines contain this tag)';
  }, [note, activeTag]);

  const wordCount   = note.trim() ? note.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  const downloadNote = () => {
    const el = document.createElement('a');
    el.href    = URL.createObjectURL(new Blob([note], { type: 'text/plain' }));
    el.download = `Note_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(el); el.click(); document.body.removeChild(el);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">
      {/* Header */}
      <div className="glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group border-none shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-teal-500/20 transition-all duration-700" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-500">
            <Notebook className="text-white w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold dark:text-white tracking-tight">QuickPro Notes</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`saving-dot ${saving ? 'syncing' : 'saved'}`} />
              <p className="text-slate-500 text-sm font-medium">{saving ? 'Saving...' : 'Auto-saved'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button onClick={downloadNote} className="p-4 bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white rounded-xl transition-all flex items-center gap-2">
            <Download size={20} /><span className="text-xs font-bold uppercase hidden lg:block">Export</span>
          </button>
          <button onClick={() => { if (window.confirm('Clear all notes?')) setNote(''); }}
            className="p-4 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Tag chips */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center animate-in fade-in duration-300">
          <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            <Hash size={12} /> Tags:
          </span>
          {activeTag && (
            <button onClick={() => setActiveTag(null)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-600 transition-all hover:bg-slate-300">
              <X size={10} /> Clear filter
            </button>
          )}
          {tags.map((tag, i) => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 active:scale-95 ${TAG_COLORS[i % TAG_COLORS.length]} ${activeTag === tag ? 'ring-2 ring-offset-1 ring-indigo-500/50 scale-105' : ''}`}>
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Editor */}
      <div className="glass-card p-0 overflow-hidden border-none shadow-2xl flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-8 py-5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Edit3 className="text-teal-500" size={18} />
            <span className="text-xs font-black uppercase text-slate-500 tracking-widest">
              {activeTag ? `Filtered by ${activeTag}` : 'Document Editor'}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 dark:border-slate-700 pr-6">
              <BookOpen size={12} className="text-teal-500" /> {readingTime} Min Read
            </div>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2 tracking-wider uppercase">
              <Clock size={12} /> <span className="text-teal-500">{lastSaved || 'Not saved yet'}</span>
            </span>
          </div>
        </div>

        {/* Textarea — shows full note always; tag filter shows a read-only preview */}
        {activeTag ? (
          <div className="flex-1 p-12 text-xl leading-relaxed dark:text-slate-200 font-medium min-h-[400px] bg-indigo-500/5 whitespace-pre-wrap">
            {displayedNote}
          </div>
        ) : (
          <textarea value={note} onChange={e => setNote(e.target.value)}
            className="notes-textarea flex-1 w-full p-12 bg-transparent outline-none resize-none text-xl leading-relaxed dark:text-slate-200 font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700 min-h-[400px]" />
        )}

        {/* Footer */}
        <div className="px-8 py-4 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 opacity-50">
            <AlertCircle size={12} /> Stored locally in your browser
          </div>
          <div className="flex items-center gap-6">
            <div className="text-[10px] font-black text-teal-600 uppercase tracking-widest"><span className="opacity-40">Words: </span>{wordCount}</div>
            <div className="text-[10px] font-black text-teal-600 uppercase tracking-widest"><span className="opacity-40">Tags: </span>{tags.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
