import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const SimpleNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past 100px
      setIsScrolled(currentScrollY > 100);

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down & past 300px - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    { path: "/services/digital-advertising", label: t("services.advertising.title") },
    { path: "/services/web-development", label: t("services.webdev.title") },
    { path: "/about", label: t("nav.about") }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className={`max-w-4xl mx-auto px-6 transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-8'
        }`}>

          {/* Brand Title - Centered */}
          <div className={`text-center transition-all duration-300 ${
            isScrolled ? 'mb-3' : 'mb-6'
          }`}>
            <Link to="/" className="inline-block">
              <h1 className={`font-light tracking-[0.2em] transition-all duration-300 text-white ${
                isScrolled ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'
              }`}>
                VIFA <span className="font-normal text-blue-400">ADVERTISING</span> AGENCY
              </h1>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="flex justify-center items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-400 border-b border-blue-400"
                    : "text-slate-300 hover:text-white hover:text-blue-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle - Positioned in top right corner */}
          <LanguageToggle />
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-32" />
    </>
  );
};

export default SimpleNavbar;