// ── Auth.jsx ─────────────────────────────────────────────────
// Login / Registration page.
// Styles → Auth.css
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './Auth.css';

const Auth = () => {
  const { addToast } = useNotification();
  const navigate     = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (
        stored &&
        (stored.email === userData.email || stored.name === userData.name) &&
        stored.password === userData.password
      ) {
        localStorage.setItem('activeUser', JSON.stringify({ name: stored.name }));
        addToast(`Welcome back, ${stored.name}!`, 'success');
        navigate('/dashboard');
        setTimeout(() => window.location.reload(), 100);
      } else {
        addToast('Invalid credentials provided.', 'error');
      }
    } else {
      localStorage.setItem('user', JSON.stringify(userData));
      addToast('Profile created! Please log in.', 'success');
      setIsLogin(true);
    }
  };

  const fields = [
    ...(!isLogin ? [{ icon: User,  type: 'text',     placeholder: 'Full Name',      key: 'name'     }] : []),
    {               icon: Mail,  type: 'email',    placeholder: 'Email Address',   key: 'email'    },
    {               icon: Lock,  type: 'password', placeholder: 'Password',        key: 'password' },
  ];

  return (
    <div className="flex justify-center items-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-10 w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold dark:text-white">{isLogin ? 'Login' : 'Registration'}</h2>
          <p className="text-slate-500 mt-2">{isLogin ? 'Access your dashboard' : 'Create a new account'}</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form-enter space-y-5">
          {fields.map(({ icon: Icon, type, placeholder, key }) => (
            <div key={key} className="auth-field relative group">
              <Icon className="auth-icon absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors" />
              <input
                required
                type={type}
                placeholder={placeholder}
                value={userData[key]}
                onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
              />
            </div>
          ))}
          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all">
            {isLogin ? 'Login Now' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
