import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './SimpleNavbar';
import Footer from './ImprovedFooter';
import { useNavigation } from '../contexts/NavigationContext';
// import ChatBot, { ChatBotButton } from '../components/ChatBot';

// Top progress bar — non-intrusive, matches site's indigo accent
const NavigationProgressBar = ({ isNavigating }: { isNavigating: boolean }) => (
  <div
    className="fixed top-0 left-0 right-0 z-9999 h-0.5 pointer-events-none"
    style={{ opacity: isNavigating ? 1 : 0, transition: 'opacity 0.3s ease' }}
  >
    {/* Glow layer */}
    <div
      className="absolute inset-0 bg-indigo-500 blur-sm opacity-60"
      style={{
        transform: isNavigating ? 'scaleX(0.85)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: isNavigating
          ? 'transform 2.5s cubic-bezier(0.1, 0.4, 0.2, 1)'
          : 'transform 0.2s ease-out',
      }}
    />
    {/* Main bar */}
    <div
      className="absolute inset-0 bg-linear-to-r from-indigo-500 via-violet-400 to-indigo-500"
      style={{
        transform: isNavigating ? 'scaleX(0.85)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: isNavigating
          ? 'transform 2.5s cubic-bezier(0.1, 0.4, 0.2, 1)'
          : 'transform 0.2s ease-out',
      }}
    />
    {/* Leading shine dot */}
    {isNavigating && (
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/80 blur-sm" />
    )}
  </div>
);

const Layout: React.FC = () => {
  const { isNavigating, stopNavigation } = useNavigation();
  const location = useLocation();
  // const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // Determine if current route should show Invento branding
  const isInventoRoute = () => {
    const path = location.pathname;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

    // If we're on inventogeo.com domain, show Invento branding
    if (hostname.includes('inventogeo.com')) return true;

    // For specific routes, show Invento branding
    return path.includes('/services/web-development') ||
           path.includes('/services/ai-chatbot') ||
           path.includes('/inventowms') ||
           path === '/';
  };

  const isVifaRoute = () => {
    const path = location.pathname;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

    // If we're on vifadigital.ge domain, show VIFA branding
    if (hostname.includes('vifadigital.ge')) return true;

    // For specific routes, show VIFA branding
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

  // const toggleChatBot = () => {
  //   setIsChatBotOpen(!isChatBotOpen);
  // };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <NavigationProgressBar isNavigating={isNavigating} />
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