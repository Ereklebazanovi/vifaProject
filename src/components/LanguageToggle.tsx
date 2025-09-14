import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
        isDarkMode
          ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700/50 hover:border-blue-400/30 text-slate-300 hover:text-white'
          : 'bg-slate-100/50 hover:bg-slate-200/50 border-slate-300/50 hover:border-blue-400/30 text-slate-700 hover:text-slate-900'
      }`}
      title={currentLanguage === 'ka' ? 'Switch to English' : 'Switch to Georgian'}
    >
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-semibold ${
          currentLanguage === 'ka' ? 'opacity-100' : 'opacity-50'
        }`}>
          ქა
        </span>
        <motion.div
          className={`w-8 h-4 rounded-full border-2 relative ${
            isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-300 border-slate-400'
          }`}
          animate={{
            backgroundColor: currentLanguage === 'en' ? '#3b82f6' : isDarkMode ? '#475569' : '#cbd5e1',
            borderColor: currentLanguage === 'en' ? '#3b82f6' : isDarkMode ? '#64748b' : '#94a3b8'
          }}
        >
          <motion.div
            className="absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full shadow-sm"
            animate={{
              x: currentLanguage === 'en' ? 16 : 2
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.div>
        <span className={`text-sm font-semibold ${
          currentLanguage === 'en' ? 'opacity-100' : 'opacity-50'
        }`}>
          EN
        </span>
      </div>
    </motion.button>
  );
};

export default LanguageToggle;