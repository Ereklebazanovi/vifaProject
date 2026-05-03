import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const ka = currentLanguage === 'ka';

  return (
    <button
      onClick={toggleLanguage}
      title={ka ? 'Switch to English' : 'Switch to Georgian'}
      className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-white/3 p-0.5 hover:border-white/20 transition-colors duration-200"
    >
      <span className={`relative z-10 px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 ${ka ? 'text-white' : 'text-white/30'}`}>
        ქა
      </span>
      <span className={`relative z-10 px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 ${!ka ? 'text-white' : 'text-white/30'}`}>
        EN
      </span>
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-white/10"
        animate={{ left: ka ? '2px' : 'calc(50% + 2px)', width: 'calc(50% - 4px)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </button>
  );
};

export default LanguageToggle;
