import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-8 h-8 rounded-full bg-gradient-to-br from-slate-700/60 to-slate-800/80 hover:from-slate-600/80 hover:to-slate-700/90 border border-slate-500/40 hover:border-blue-400/60 text-white text-xs font-semibold transition-all duration-300 backdrop-blur-md flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-blue-500/20"
      title={currentLanguage === 'ka' ? 'Switch to English' : 'Switch to Georgian'}
    >
      <motion.span
        key={currentLanguage}
        initial={{ opacity: 0, scale: 0.5, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 4 }}
        transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
        className={`${
          currentLanguage === 'ka'
            ? 'bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'
        }`}
      >
        {currentLanguage === 'ka' ? 'ქა' : 'EN'}
      </motion.span>

      {/* Subtle glow effect */}
      <motion.div
        animate={{
          boxShadow: currentLanguage === 'ka'
            ? 'inset 0 0 8px rgba(96, 165, 250, 0.3)'
            : 'inset 0 0 8px rgba(74, 222, 128, 0.3)'
        }}
        className="absolute inset-0 rounded-full pointer-events-none"
      />
    </motion.button>
  );
};

export default LanguageToggle;