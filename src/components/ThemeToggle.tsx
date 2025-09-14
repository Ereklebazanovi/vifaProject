import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full p-1 transition-all duration-500 ease-in-out
        ${isDarkMode 
          ? 'bg-gradient-to-r from-slate-700 to-slate-800 shadow-inner' 
          : 'bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg'
        }
        hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDarkMode ? 'focus:ring-slate-400' : 'focus:ring-blue-400'}
        ${className}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <div
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-500 ease-in-out
          flex items-center justify-center text-xs
          ${isDarkMode
            ? 'transform translate-x-8 bg-slate-200 text-slate-800 shadow-md'
            : 'transform translate-x-0 bg-white text-yellow-500 shadow-lg'
          }
        `}
      >
        {isDarkMode ? (
          <FaMoon className="w-3 h-3 transition-all duration-300" />
        ) : (
          <FaSun className="w-3 h-3 transition-all duration-300 animate-spin" />
        )}
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <FaSun 
          className={`w-3 h-3 transition-all duration-500 ${
            isDarkMode 
              ? 'opacity-40 text-slate-400' 
              : 'opacity-0 text-yellow-300'
          }`} 
        />
        <FaMoon 
          className={`w-3 h-3 transition-all duration-500 ${
            isDarkMode 
              ? 'opacity-0 text-slate-300' 
              : 'opacity-40 text-blue-200'
          }`} 
        />
      </div>

      {/* Shine Effect */}
      <div className={`
        absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-r from-transparent via-white to-transparent'
          : 'bg-gradient-to-r from-transparent via-yellow-200 to-transparent'
        }
      `} />
    </button>
  );
};

export default ThemeToggle;