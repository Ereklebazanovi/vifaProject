import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './SimpleNavbar';
import Footer from './ImprovedFooter';
import FloatingContact from '../components/FloatingContact';
import { useNavigation } from '../contexts/NavigationContext';
import { facebookPixel } from '../utils/facebookPixel';
// import ChatBot, { ChatBotButton } from '../components/ChatBot';

// Top progress bar — triggers on any route change automatically
const NavigationProgressBar = ({ active }: { active: boolean }) => (
  <div className="fixed top-0 left-0 right-0 z-9999 h-0.75 pointer-events-none overflow-hidden">
    {/* Glow */}
    <div
      className="absolute inset-0 bg-indigo-400 blur-[3px]"
      style={{
        transform: active ? 'translateX(0)' : 'translateX(-100%)',
        transition: active ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s ease-in',
        opacity: 0.7,
      }}
    />
    {/* Main bar */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, #6366f1, #a78bfa, #818cf8)',
        transform: active ? 'translateX(0)' : 'translateX(-100%)',
        transition: active ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s ease-in',
      }}
    />
  </div>
);

const Layout: React.FC = () => {
  const { stopNavigation } = useNavigation();
  const location = useLocation();
  const [barActive, setBarActive] = useState(false);
  const prevPath = useRef(location.pathname);
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

  // Show progress bar on any route change
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setBarActive(true);
      const t = setTimeout(() => setBarActive(false), 700);
      return () => clearTimeout(t);
    }
  }, [location.pathname]);

  // Scroll to top on route change — in an SPA the path changes but the scroll
  // position is otherwise kept, leaving the new page frozen mid-scroll (e.g.
  // clicking a "Related services" link at the bottom of an industry page).
  // Hash anchors (#pricing) don't change pathname, so they're unaffected.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Also stop manual navigation state
  useEffect(() => {
    stopNavigation();
  }, [location.pathname, stopNavigation]);

  // Global WhatsApp click tracker. One delegated listener captures every wa.me
  // link click site-wide, fires a Meta Pixel "Contact" event with the source
  // path so Meta's ad algorithm can optimize for real conversions (not just
  // PageViews). Without this, low-budget conversion campaigns burn money on
  // cold traffic Meta can't tell apart from genuine leads.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null;
      if (!link) return;
      facebookPixel.trackStandardEvent('Contact', {
        content_name: 'whatsapp_click',
        content_category: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // const toggleChatBot = () => {
  //   setIsChatBotOpen(!isChatBotOpen);
  // };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <NavigationProgressBar active={barActive} />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Restrained site-wide WhatsApp button (hidden on routes with their own contact bar) */}
      <FloatingContact />

      {/* ChatBot Components */}
      {/* <ChatBot isOpen={isChatBotOpen} onToggle={toggleChatBot} />
      {!isChatBotOpen && <ChatBotButton onClick={toggleChatBot} />} */}
    </div>
  );
};

export default Layout;