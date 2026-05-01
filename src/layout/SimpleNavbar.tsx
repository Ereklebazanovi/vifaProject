import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  Map,
  Scale,
  ShoppingCart,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

interface IndustryItem {
  nameKa: string;
  nameEn: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

const industries: IndustryItem[] = [
  {
    nameKa: "იურიდიული და საფინანსო სექტორი",
    nameEn: "Legal & Finance",
    slug: "legal-finance",
    icon: Scale,
  },
  {
    nameKa: "სასტუმროები, კოტეჯები და ტურიზმი",
    nameEn: "Hotels, Cottages & Tourism",
    slug: "tourism",
    icon: Map,
  },
  {
    nameKa: "ესთეტიკა და სილამაზე",
    nameEn: "Beauty & Aesthetics",
    slug: "beauty",
    icon: Sparkles,
  },
  {
    nameKa: "E-commerce & საცალო ვაჭრობა",
    nameEn: "E-commerce & Retail",
    slug: "retail",
    icon: ShoppingCart,
  },
  {
    nameKa: "რესტორნები და კვების ინდუსტრია",
    nameEn: "Restaurants & Food Service",
    slug: "food",
    icon: Utensils,
  },
];

interface NavLinkItem {
  num: string;
  label: string;
  path: string;
  hasIndustryDropdown?: boolean;
  generalHref?: string;
  industryService?: "web" | "marketing";
}

const SimpleNavbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [openDropdownFor, setOpenDropdownFor] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setOpenDropdownFor(null);
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navLinksRef.current && !navLinksRef.current.contains(target)) {
        setOpenDropdownFor(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownFor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const ka = currentLanguage === "ka";

  const links: NavLinkItem[] = [
    { num: "01/", label: ka ? "მთავარი" : "HOME", path: "/" },
    {
      num: "02/",
      label: ka ? "ვებ დეველოპმენტი" : "WEB DEV",
      path: "/services/web-development",
      hasIndustryDropdown: true,
      generalHref: "/services/web",
      industryService: "web",
    },
    {
      num: "03/",
      label: ka ? "მარკეტინგი" : "MARKETING",
      path: "/services/digital-advertising",
      hasIndustryDropdown: true,
      generalHref: "/services/marketing",
      industryService: "marketing",
    },
    { num: "04/", label: ka ? "ჩვენ შესახებ" : "ABOUT", path: "/about" },
    { num: "05/", label: ka ? "ბლოგი" : "BLOG", path: "/blog" },
    { num: "06/", label: ka ? "კონტაქტი" : "CONTACT", path: "/contact" },
  ];

  return (
    <>
    <nav
      className={`fixed w-full top-0 z-100 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-8 lg:px-16 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-white text-sm font-semibold tracking-[0.4em] uppercase hover:text-slate-300 transition-colors shrink-0 ml-4"
        >
          VIFA
        </Link>

        <div ref={navLinksRef} className="hidden lg:flex items-center gap-10 ml-16">
          {links.map((link) => {
            const isDropdownItem = !!link.hasIndustryDropdown;
            const isOpen = openDropdownFor === link.path;

            return (
              <div key={link.path} className="relative px-1 -mx-1">
                <button
                  onClick={() => {
                    if (isDropdownItem) {
                      setOpenDropdownFor((prev) =>
                        prev === link.path ? null : link.path,
                      );
                      return;
                    }

                    navigate(link.path);
                  }}
                  className="flex items-center gap-1.5 group"
                  aria-expanded={isDropdownItem ? isOpen : undefined}
                  aria-haspopup={isDropdownItem ? "menu" : undefined}
                >
                  <span className="text-slate-500 text-[10px] font-mono">
                    {link.num}
                  </span>
                  <span
                    className={`text-[15px] tracking-widest uppercase font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-white"
                        : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>

                {isDropdownItem && (
                  <div
                    className={`absolute top-full left-0 pt-2 z-[140] transition-all duration-200 ${
                      isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="min-w-[380px] bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-3">
                      <Link
                        to={link.generalHref!}
                        onClick={() => setOpenDropdownFor(null)}
                        className="group flex w-full items-center rounded-xl px-4 py-3 min-h-[50px] text-base text-white hover:text-blue-300 hover:bg-white/5 transition-all duration-300"
                      >
                        <Layers className="w-4 h-4 mr-3 text-white/60 group-hover:text-blue-300 transition-all duration-300 shrink-0" />
                        <span>{ka ? "ყველა სერვისი" : "All Services"}</span>
                      </Link>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

                      {industries.map((industry) => {
                        const IndustryIcon = industry.icon;

                        return (
                          <Link
                            key={`${link.path}-${industry.slug}`}
                            to={`/industry/${link.industryService}/${industry.slug}`}
                            onClick={() => setOpenDropdownFor(null)}
                            className="group flex w-full items-center rounded-xl px-4 py-3 min-h-[50px] text-base text-slate-200 hover:text-blue-300 hover:bg-white/5 transition-all duration-300"
                          >
                            <IndustryIcon className="w-4 h-4 mr-3 text-white/60 group-hover:text-blue-300 transition-all duration-300 shrink-0" />
                            <span>{ka ? industry.nameKa : industry.nameEn}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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

        {/* Mobile: lang toggle + animated burger */}
        <div className="lg:hidden flex items-center gap-5">
          <LanguageToggle />
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="relative w-6 h-5 flex-shrink-0"
          >
            <span
              className={`absolute left-0 top-0 w-full h-px bg-white rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "top-[10px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[10px] -translate-y-1/2 w-full h-px bg-white rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 w-full h-px bg-white rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "bottom-[10px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </nav>

    {/* ── Mobile Full-Screen Overlay ── */}
    <div
      className={`fixed inset-0 z-[60] bg-black/85 backdrop-blur-2xl flex flex-col lg:hidden transition-opacity duration-300 ${
        mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Spacer for navbar — matches navbar height so links start below it */}
      <div className="h-[72px] shrink-0 border-b border-white/[0.06]" />

      {/* Scrollable area — NO justify-center so accordion scroll works */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav className="px-6 py-4">
          {links.map((link) => {
            const isDropdown = !!link.hasIndustryDropdown;
            const isAccordionOpen = mobileAccordion === link.path;

            return (
              <div key={link.path} className="border-b border-white/[0.07] last:border-0">
                <button
                  onClick={() => {
                    if (isDropdown) {
                      setMobileAccordion(isAccordionOpen ? null : link.path);
                    } else {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/20 text-[9px] font-mono tabular-nums">{link.num}</span>
                    <span className="text-white text-2xl font-light tracking-[0.12em] uppercase group-hover:text-white/40 transition-colors duration-200">
                      {link.label}
                    </span>
                  </div>
                  {isDropdown && (
                    <span
                      className={`w-6 h-6 flex items-center justify-center text-white/30 text-base leading-none transition-transform duration-300 ${
                        isAccordionOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  )}
                </button>

                {/* Accordion */}
                {isDropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isAccordionOpen ? "max-h-[22rem]" : "max-h-0"
                    }`}
                  >
                    <div className="pb-4 pl-8 space-y-0.5">
                      <Link
                        to={link.generalHref!}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 text-white/60 text-xs tracking-widest uppercase py-2.5 hover:text-white transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                        {ka ? "ყველა სერვისი" : "All Services"}
                      </Link>
                      <div className="h-px bg-white/[0.06] my-1.5" />
                      {industries.map((industry) => (
                        <Link
                          key={`mob-${link.path}-${industry.slug}`}
                          to={`/industry/${link.industryService}/${industry.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 text-white/35 text-sm py-2 hover:text-white/70 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/15 shrink-0" />
                          {ka ? industry.nameKa : industry.nameEn}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 px-6 py-5 border-t border-white/[0.07] flex items-center justify-between">
        <LanguageToggle />
        <span className="text-white/15 text-[10px] tracking-widest font-mono">vifadigital.ge</span>
      </div>
    </div>
    </>
  );
};

export default React.memo(SimpleNavbar);
