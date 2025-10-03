import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './SimpleNavbar';
import Footer from './ImprovedFooter';
import { useNavigation } from '../contexts/NavigationContext';

// Beautiful blue loading component
const NavigationSpinner = () => (
  <div className="min-h-screen bg-black">
    {/* Enhanced dark gradient background with beautiful blue-black mix */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-slate-950/80" />
      <div className="absolute inset-0 bg-slate-950/30" />
    </div>

    {/* Enhanced loading indicator */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-6">
        {/* Beautiful multi-layer spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-2 border-slate-800/40 rounded-full"></div>
          {/* Middle ring */}
          <div className="absolute top-1 left-1 w-14 h-14 border-2 border-blue-900/30 rounded-full"></div>
          {/* Inner spinning ring */}
          <div className="absolute top-2 left-2 w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>

        {/* Loading text with animation */}
        <div className="text-center space-y-2">
          <p className="text-blue-400 text-lg font-thin tracking-wide animate-pulse font-['Inter','Noto_Sans_Georgian',sans-serif]">იტვირთება</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Layout: React.FC = () => {
  const { isNavigating, stopNavigation } = useNavigation();
  const location = useLocation();

  // Stop navigation when location changes
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        stopNavigation();
      }, 500); // Small delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [location, isNavigating, stopNavigation]);

  // Also stop navigation immediately on path change
  useEffect(() => {
    stopNavigation();
  }, [location.pathname, stopNavigation]);

  if (isNavigating) {
    return <NavigationSpinner />;
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;