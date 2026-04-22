import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isPortfolio = location.pathname === '/portfolio';

  // Dynamic animation variants — Portfolio gets a massive physical drop-down bounce!
  const pageVariants = isPortfolio
    ? {
        initial: { y: -800, opacity: 0, scale: 0.9 },
        animate: { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          transition: { type: 'spring', damping: 14, stiffness: 80, mass: 1.2, delay: 0.1 } 
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
      }
    : {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
      };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full h-full"
    >
      {!isHome && (
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md rounded-xl text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-all active:scale-95 group z-50 relative"
        >
          <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={16} strokeWidth={3} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Hub</span>
        </button>
      )}
      
      {children}
    </motion.div>
  );
};

export default PageWrapper;
