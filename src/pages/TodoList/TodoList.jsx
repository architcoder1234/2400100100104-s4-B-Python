// ── TodoList.jsx ─────────────────────────────────────────────
// NEW: drag-to-reorder tasks using HTML5 drag-and-drop API.
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, CheckCircle, Circle, ListTodo, GripVertical } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './TodoList.css';

const DEFAULT_TASKS = [
  { id: 1, text: 'Design Dashboard Layout',  completed: true  },
  { id: 2, text: 'Fix Routing Logic',        completed: true  },
  { id: 3, text: 'Add Student Info Section', completed: false },
];

const TodoList = () => {
  const { addToast } = useNotification();
  const [tasks,  setTasks]  = useState(() => JSON.parse(localStorage.getItem('react-tools-todo') || 'null') || DEFAULT_TASKS);
  const [newTodo, setNewTodo] = useState('');
  const dragItem  = useRef(null);
  const dragOver  = useRef(null);

  useEffect(() => { localStorage.setItem('react-tools-todo', JSON.stringify(tasks)); }, [tasks]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo(''); addToast('New task recorded!', 'success');
  };

  const deleteTodo = (id) => { setTasks(tasks.filter(t => t.id !== id)); addToast('Task removed.', 'info'); };

  const toggleTodo = (id) => setTasks(tasks.map(t => {
    if (t.id !== id) return t;
    if (!t.completed) addToast('Goal achieved! Great job.', 'success');
    return { ...t, completed: !t.completed };
  }));

  // ── Drag handlers ────────────────────────────────────────
  const onDragStart = (e, idx) => {
    dragItem.current = idx;
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };
  const onDragEnter = (idx) => { dragOver.current = idx; };
  const onDragEnd   = (e) => {
    e.currentTarget.classList.remove('dragging');
    if (dragItem.current === null || dragOver.current === null || dragItem.current === dragOver.current) return;
    const reordered = [...tasks];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOver.current, 0, moved);
    setTasks(reordered);
    dragItem.current = null; dragOver.current = null;
  };

  const pending   = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t =>  t.completed).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/20 rounded-xl"><ListTodo className="w-6 h-6 text-indigo-500" /></div>
        <div>
          <h2 className="text-3xl font-bold dark:text-white">Active Tasks</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Drag the handle to reorder tasks.</p>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={addTodo} className="flex gap-4 p-2 glass-card border-none shadow-indigo-500/5">
        <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input flex-1 px-6 py-4 bg-transparent outline-none dark:text-white font-medium" />
        <button type="submit" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Task
        </button>
      </form>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div key={task.id} draggable
            onDragStart={e => onDragStart(e, idx)}
            onDragEnter={() => onDragEnter(idx)}
            onDragEnd={onDragEnd}
            onDragOver={e => e.preventDefault()}
            className={`task-item group flex items-center justify-between p-5 glass-card border-none transition-all duration-300 select-none ${task.completed ? 'completed opacity-60' : 'hover:scale-[1.01]'}`}
          >
            <div className="flex items-center gap-3">
              {/* Drag handle */}
              <div className="drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100">
                <GripVertical size={18} />
              </div>
              <button onClick={() => toggleTodo(task.id)}
                className={`transition-colors ${task.completed ? 'text-emerald-500' : 'text-slate-400 hover:text-indigo-500'}`}>
                {task.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>
              <span className={`task-text text-lg font-medium dark:text-white ${task.completed ? 'line-through text-slate-400' : ''}`}>
                {task.text}
              </span>
            </div>
            <button onClick={() => deleteTodo(task.id)}
              className="p-2 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-medium italic">No tasks. Your schedule is clear!</div>
        )}
      </div>

      <div className="flex justify-between items-center px-4 py-2 border-t border-slate-200 dark:border-slate-800 opacity-50 text-xs font-bold uppercase tracking-widest dark:text-slate-400">
        <span>{pending} Pending</span>
        <span>{completed} Completed</span>
      </div>
    </div>
  );
};

export default TodoList;
