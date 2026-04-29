import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

const SimpleNavbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { currentLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 60);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const ka = currentLanguage === "ka";

  const links = [
    { num: "01/", label: ka ? "მთავარი"      : "HOME",     path: "/" },
    { num: "02/", label: ka ? "სერვისები"    : "SERVICES", path: "/services/web-development" },
    { num: "03/", label: ka ? "AI ჩატბოტი"  : "AI",       path: "/services/ai-chatbot" },
    { num: "04/", label: ka ? "ჩვენ შესახებ" : "ABOUT",    path: "/about" },
    { num: "05/", label: ka ? "ბლოგი"        : "BLOG",     path: "/blog" },
    { num: "06/", label: ka ? "კონტაქტი"     : "CONTACT",  path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-100 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-8 lg:px-16 py-5 flex items-center justify-between">

        {/* Left: Logo */}
        <Link
          to="/"
          className="text-white text-xs font-semibold tracking-[0.4em] uppercase hover:text-slate-300 transition-colors shrink-0"
        >
          VIFA
        </Link>

        {/* Center-left: numbered links */}
        <div className="hidden lg:flex items-center gap-10 ml-16">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="flex items-center gap-1.5 group"
            >
              <span className="text-slate-500 text-[10px] font-mono">{link.num}</span>
              <span
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-white"
                    : "text-slate-200 group-hover:text-white"
                }`}
              >
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right: contact info + language toggle */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="text-right">
            <p className="text-slate-300 text-xs tracking-wider">vifadigital.ge</p>
            <Link
              to="/contact"
              className="text-slate-500 text-[10px] tracking-widest uppercase hover:text-slate-300 transition-colors"
            >
              {ka ? "კონტაქტი" : "GET IN TOUCH"}
            </Link>
          </div>
          <LanguageToggle />
        </div>

        {/* Mobile: just language toggle */}
        <div className="lg:hidden">
          <LanguageToggle />
        </div>

      </div>
    </nav>
  );
};

export default React.memo(SimpleNavbar);
