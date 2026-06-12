import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useLanguageTransition = () => {
  const { currentLanguage } = useLanguage();
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const previousLanguage = useRef(currentLanguage);

  useEffect(() => {
    // Only trigger transition if language actually changed (not on initial mount)
    if (previousLanguage.current !== currentLanguage) {
      setIsLanguageChanging(true);
      const timer = setTimeout(() => {
        setIsLanguageChanging(false);
      }, 400);
      previousLanguage.current = currentLanguage;
      return () => clearTimeout(timer);
    } else {
      // Set the previous language on initial mount
      previousLanguage.current = currentLanguage;
    }
  }, [currentLanguage]);

  const getTransitionClasses = () => {
    return `language-transition ${
      isLanguageChanging ? 'language-fade-out' : 'language-fade-in'
    }`;
  };

  return {
    isLanguageChanging,
    getTransitionClasses
  };
};