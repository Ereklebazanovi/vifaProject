import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './ImprovedNavbar';
import Footer from './ImprovedFooter';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-white text-slate-900'
    }`}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;