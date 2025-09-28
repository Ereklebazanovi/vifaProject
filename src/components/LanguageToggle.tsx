import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-blue-400/50 text-white text-xs font-bold transition-all duration-300 backdrop-blur-sm flex items-center justify-center shadow-lg"
      title={currentLanguage === 'ka' ? 'Switch to English' : 'Switch to Georgian'}
    >
      <motion.span
        key={currentLanguage}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
        className={`${
          currentLanguage === 'ka' ? 'text-blue-400' : 'text-green-400'
        }`}
      >
        {currentLanguage === 'ka' ? 'ქა' : 'EN'}
      </motion.span>
    </motion.button>
  );
};

export default LanguageToggle;