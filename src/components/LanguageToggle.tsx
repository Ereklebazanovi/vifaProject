import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center space-x-1 px-2 py-3 rounded-full bg-blue-900/50 hover:bg-blue-800/50 text-white font-medium text-xs transition-all duration-300"
      title={currentLanguage === 'ka' ? 'Switch to English' : 'Switch to Georgian'}
      style={{ position: 'absolute', top: '10px', right: '10px', height: '28px', width: '60px' }}
    >
      <span className={`transition-opacity duration-300 ${
        currentLanguage === 'ka' ? 'opacity-100' : 'opacity-50'
      }`}>
        ქა
      </span>
      <motion.div
        className="w-8 h-4 rounded-full bg-gray-700 flex items-center p-0.5"
        animate={{
          backgroundColor: currentLanguage === 'en' ? '#3b82f6' : '#4b5563'
        }}
      >
        <motion.div
          className="w-3 h-3 bg-white rounded-full shadow-md"
          animate={{ x: currentLanguage === 'en' ? '20px' : '0px' }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        />
      </motion.div>
      <span className={`transition-opacity duration-300 ${
        currentLanguage === 'en' ? 'opacity-100' : 'opacity-50'
      }`}>
        EN
      </span>
    </motion.button>
  );
};

export default LanguageToggle;