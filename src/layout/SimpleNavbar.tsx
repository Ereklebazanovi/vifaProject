import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

const SimpleNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past 50px
      setIsScrolled(currentScrollY > 50);

      // Show/hide navbar based on scroll direction with faster response
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide navbar (reduced from 300px)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && currentScrollY < 50) {
        // Show navbar when scrolling up and near top (less than 50px)
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    {
      path: "/services/digital-advertising",
      label: t("services.advertising.title"),
    },
    { path: "/services/web-development", label: t("services.webdev.title") },
    { path: "/about", label: t("nav.about") },
    { path: "/start-project", label: t("nav.startProject") },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed w-full top-0 z-[100] transition-transform duration-150 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto px-6  transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          {/* Brand Title - Centered */}
          <div
            className={`text-center transition-all duration-300 ${
              isScrolled ? "mb-2" : "mb-3"
            }`}
          >
            <Link to="/" className="inline-block">
              <h1
                className={`font-light tracking-[0.2em] transition-all duration-300 text-white ${
                  isScrolled ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
                }`}
              >
                VIFA{" "}
                <span className="font-normal text-blue-400">ADVERTISING</span>{" "}
                AGENCY
              </h1>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div
            className={`hidden md:flex justify-center items-center space-x-8 ${getTransitionClasses()}`}
          >
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

          {/* Mobile Navigation */}
          <div
            className={`md:hidden flex justify-center items-center space-x-4 text-xs ${getTransitionClasses()}`}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`px-2 py-1 text-xs font-light transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle - Positioned in top right corner */}
          <div
            className={`absolute transition-all duration-300 ${
              isScrolled ? "top-2 right-3" : "top-4 right-4"
            }`}
          >
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default SimpleNavbar;
