import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => 
    localStorage.getItem('notificationsEnabled') !== 'false'
  );
  const [soundsEnabled, setSoundsEnabled] = useState(() => 
    localStorage.getItem('soundsEnabled') !== 'false'
  );

  const playSound = useCallback(() => {
    if (!soundsEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  }, [soundsEnabled]);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    if (!notificationsEnabled) return;
    
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    playSound();
    
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [notificationsEnabled, playSound]);

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => {
      localStorage.setItem('notificationsEnabled', !prev);
      return !prev;
    });
  };

  const toggleSounds = () => {
    setSoundsEnabled(prev => {
      localStorage.setItem('soundsEnabled', !prev);
      return !prev;
    });
  };

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-sky-500" />,
  };

  const colors = {
    success: 'border-emerald-500/20 bg-emerald-500/10',
    error: 'border-rose-500/20 bg-rose-500/10',
    warning: 'border-amber-500/20 bg-amber-500/10',
    info: 'border-sky-500/20 bg-sky-500/10',
  };

  return (
    <NotificationContext.Provider value={{ 
      addToast, 
      removeToast, 
      notificationsEnabled, 
      toggleNotifications, 
      soundsEnabled, 
      toggleSounds 
    }}>
      {children}
      
      {/* Toast Portal */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border backdrop-blur-md shadow-2xl animate-in slide-in-from-right-8 duration-300 ${colors[toast.type] || colors.info}`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type] || icons.info}
              <p className="text-sm font-bold dark:text-white leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors ml-4"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
