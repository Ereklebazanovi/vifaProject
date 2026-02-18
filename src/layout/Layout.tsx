import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './SimpleNavbar';
import Footer from './ImprovedFooter';
import { useNavigation } from '../contexts/NavigationContext';
// import ChatBot, { ChatBotButton } from '../components/ChatBot';

// Elegant black loading component
const NavigationSpinner = () => (
  <div className="min-h-screen bg-black">
    {/* Pure black gradient background with subtle elegance */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-black to-gray-900/30" />
      <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, rgba(17, 24, 39, 0.2), transparent, transparent)'}} />
    </div>

    {/* Elegant loading indicator */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-8">
        {/* Sophisticated multi-layer spinner */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="w-20 h-20 border border-gray-800/20 rounded-full shadow-2xl"></div>

          {/* Secondary ring with subtle glow */}
          <div className="absolute top-1 left-1 w-18 h-18 border border-gray-700/30 rounded-full"></div>

          {/* Main spinning ring - elegant blue accent */}
          <div className="absolute top-2 left-2 w-16 h-16 border-2 border-gray-800/40 border-t-blue-500 border-r-blue-400 rounded-full animate-spin shadow-lg"></div>

          {/* Inner ring with slower rotation */}
          <div className="absolute top-4 left-4 w-12 h-12 border border-gray-600/30 border-b-blue-300 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>

          {/* Center elegant dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-lg shadow-blue-500/30"></div>

          {/* Subtle outer glow effect */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
        </div>

        {/* Elegant loading text */}
        <div className="text-center space-y-3">
          <p className="text-gray-300 text-lg font-light tracking-[0.2em] animate-pulse font-['Inter','Noto_Sans_Georgian',sans-serif] opacity-80">
            იტვირთება
          </p>

          {/* Sophisticated dot animation */}
          <div className="flex space-x-2 justify-center">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0ms'}}></div>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '200ms'}}></div>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '400ms'}}></div>
          </div>
        </div>
      </div>
    </div>

  </div>
);

const Layout: React.FC = () => {
  const { isNavigating, stopNavigation } = useNavigation();
  const location = useLocation();
  // const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // Determine if current route should show Invento branding
  const isInventoRoute = () => {
    const path = location.pathname;
    return path.includes('/services/web-development') ||
           path.includes('/services/ai-chatbot') ||
           path.includes('/inventowms') ||
           path === '/';
  };

  const isVifaRoute = () => {
    const path = location.pathname;
    return path.includes('/services/digital-advertising') ||
           path.includes('/about');
  };

  // Update favicon based on current route
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;

    const iconPath = isInventoRoute() && !isVifaRoute() ? '/invento.png' : '/viffa.png';

    if (favicon) {
      favicon.href = iconPath;
    }
    if (appleTouchIcon) {
      appleTouchIcon.href = iconPath;
    }
  }, [location.pathname]);

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

  // const toggleChatBot = () => {
  //   setIsChatBotOpen(!isChatBotOpen);
  // };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* ChatBot Components */}
      {/* <ChatBot isOpen={isChatBotOpen} onToggle={toggleChatBot} />
      {!isChatBotOpen && <ChatBotButton onClick={toggleChatBot} />} */}
    </div>
  );
};

export default Layout;