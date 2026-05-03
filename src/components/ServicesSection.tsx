import React, { useState } from "react";
import {
  ArrowUpRight,
  Layers,
  Map,
  Scale,
  ShoppingCart,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigation } from "../contexts/NavigationContext";

interface ServicesSectionProps {
  t: (key: string) => string;
}

interface IndustryItem {
  nameKa: string;
  nameEn: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconHoverColor: string;
}

const industries: IndustryItem[] = [
  {
    nameKa: "იურიდიული და ბუღალტერიის სექტორი",
    nameEn: "Legal & Finance",
    slug: "legal-finance",
    icon: Scale,
    iconColor: "text-amber-700/60",
    iconHoverColor: "group-hover:text-amber-500/80",
  },
  {
    nameKa: "სასტუმროები, კოტეჯები და ტურიზმი",
    nameEn: "Hotels, Cottages & Tourism",
    slug: "tourism",
    icon: Map,
    iconColor: "text-emerald-700/60",
    iconHoverColor: "group-hover:text-emerald-500/80",
  },
  {
    nameKa: "ესთეტიკა და სილამაზე",
    nameEn: "Beauty & Aesthetics",
    slug: "beauty",
    icon: Sparkles,
    iconColor: "text-rose-700/60",
    iconHoverColor: "group-hover:text-rose-400/80",
  },
  {
    nameKa: "E-commerce & საცალო ვაჭრობა",
    nameEn: "E-commerce & Retail",
    slug: "retail",
    icon: ShoppingCart,
    iconColor: "text-indigo-600/60",
    iconHoverColor: "group-hover:text-indigo-400/80",
  },
  {
    nameKa: "რესტორნები და კვების ინდუსტრია",
    nameEn: "Restaurants & Food Service",
    slug: "food",
    icon: Utensils,
    iconColor: "text-orange-700/60",
    iconHoverColor: "group-hover:text-orange-500/80",
  },
];

const ArrowDiagonalSVG: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.340728 29.2063C0.722095 29.5875 1.34043 29.5875 1.72188 29.2063L29.0656 1.8625C29.4469 1.48106 29.4469 0.862698 29.0656 0.481253C28.6842 0.100002 28.0658 0.100002 27.6844 0.481253L0.340728 27.825C-0.0406592 28.2064 -0.0406592 28.8248 0.340728 29.2063Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.375 26.5625C28.9143 26.5625 29.3516 26.1252 29.3516 25.5859V1.17188C29.3516 0.632618 28.9143 0.195312 28.375 0.195312H3.96094C3.42168 0.195312 2.98438 0.632618 2.98438 1.17188C2.98438 1.71113 3.42168 2.14844 3.96094 2.14844H27.3984V25.5859C27.3984 26.1252 27.8357 26.5625 28.375 26.5625Z"
      fill="currentColor"
    />
  </svg>
);

const ServicesSection: React.FC<ServicesSectionProps> = ({ t }) => {
  const { currentLanguage } = useLanguage();
  const { startNavigation } = useNavigation();
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const services = [
    {
      id: "web-development",
      industryService: "web" as const,
      title: t("newHome.services.webdev.title"),
      description: t("newHome.services.webdev.description"),
      href: "/services/web-development",
      generalHref: "/services/web",
      onClick: startNavigation,
      hasIndustryLinks: true,
    },
    {
      id: "digital-marketing",
      industryService: "marketing" as const,
      title: t("newHome.services.marketing.title"),
      description: t("newHome.services.marketing.description"),
      href: "/services/digital-advertising",
      generalHref: "/services/marketing",
      onClick: undefined,
      hasIndustryLinks: true,
    },
    {
      id: "invento",
      title: t("newHome.services.invento.title"),
      description: t("newHome.services.invento.description"),
      href: "/inventowms",
      onClick: undefined,
      hasIndustryLinks: false,
    },
    {
      id: "ai-chatbot",
      title: t("newHome.services.ai.title"),
      description: t("newHome.services.ai.description"),
      href: "/services/ai-chatbot",
      onClick: undefined,
      hasIndustryLinks: false,
    },
  ];


  const toggleIndustryLinks = (serviceId: string) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  const ka = currentLanguage === "ka";

  return (
    <section className="w-full pt-6 md:pt-10 pb-16 bg-[#050404]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div id="services-header" className="mb-5 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-500 block" />
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
              {t("newHome.services.sectionTitle")}
            </span>
          </div>
          <h2 className="text-2xl md:text-[42px] font-bold leading-snug text-white max-w-xl">
            {t("newHome.services.sectionSubtitle")}
          </h2>
        </div>

        <div className="border-t border-white/10 mb-0" />

        <div id="services-cards">
          {services.map((service, i) => {
            const isExpandable = service.hasIndustryLinks;
            const isExpanded = expandedServiceId === service.id;

            return (
              <div key={service.id}>
                <div
                  className="group relative flex items-center gap-4 sm:gap-6 md:gap-12 py-6 md:py-10 border-b border-white/10 cursor-pointer -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12"
                  onClick={isExpandable ? () => toggleIndustryLinks(service.id) : undefined}
                  role={isExpandable ? "button" : undefined}
                  tabIndex={isExpandable ? 0 : undefined}
                  onKeyDown={
                    isExpandable
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            toggleIndustryLinks(service.id);
                          }
                        }
                      : undefined
                  }
                  aria-expanded={isExpandable ? isExpanded : undefined}
                >
                  <span
                    className="hidden md:block flex-none text-[80px] lg:text-[96px] font-black leading-none select-none w-32 lg:w-40 text-right shrink-0"
                    style={{
                      backgroundImage: "url('/herophoto.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                    }}
                  >
                    0{i + 1}
                  </span>

                  <span className="hidden md:block w-px h-16 bg-white/10 shrink-0 group-hover:bg-blue-500/50 transition-colors duration-300" />

                  <div className="flex-1 min-w-0">
                    <span className="md:hidden text-xs font-mono text-blue-500/70 mb-1 block tracking-widest">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {isExpandable ? (
                        <span>{service.title}</span>
                      ) : (
                        <Link to={service.href} onClick={service.onClick}>
                          {service.title}
                        </Link>
                      )}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>

                  {isExpandable ? (
                    <span
                      aria-label={service.title}
                      className="shrink-0 w-6 h-6 text-white/30 group-hover:text-white transition-colors duration-300"
                    >
                      <ArrowDiagonalSVG />
                    </span>
                  ) : (
                    <Link
                      to={service.href}
                      onClick={service.onClick}
                      aria-label={service.title}
                      className="shrink-0 w-6 h-6 text-white/30 group-hover:text-white transition-colors duration-300"
                    >
                      <ArrowDiagonalSVG />
                    </Link>
                  )}
                </div>

                {isExpandable && (
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out border-b border-white/10 ${
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                  <div className="overflow-hidden">
                  <div className={`py-4 md:py-5`}>
                    {/* Header row */}
                    <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-mono mb-3">
                      {ka ? "აირჩიე სფერო" : "Choose a sector"}
                    </p>

                    {/* All Services pill */}
                    <Link
                      to={service.generalHref!}
                      onClick={startNavigation}
                      className="group inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    >
                      <Layers className="w-3.5 h-3.5 text-white/50 group-hover:text-white/90 transition-colors" />
                      <span className="text-xs text-white/70 font-medium tracking-wide group-hover:text-white transition-colors">
                        {ka ? "ზოგადი სერვისები" : "All Services"}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white/70 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
                    </Link>

                    {/* Industry grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                      {industries.map((industry) => {
                        const IndustryIcon = industry.icon;
                        return (
                          <Link
                            key={`${service.id}-${industry.slug}`}
                            to={`/industry/${service.industryService}/${industry.slug}`}
                            onClick={startNavigation}
                            className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-white/6 bg-white/3 hover:bg-white/7 hover:border-white/20 transition-all duration-200"
                          >
                            <div className="flex items-center gap-2.5">
                              <IndustryIcon className={`w-3.5 h-3.5 shrink-0 transition-colors ${industry.iconColor} ${industry.iconHoverColor}`} />
                              <span className="text-xs text-white/55 group-hover:text-white/90 transition-colors leading-snug">
                                {ka ? industry.nameKa : industry.nameEn}
                              </span>
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-white/60 shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
