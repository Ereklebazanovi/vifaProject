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
  const [btnHovered, setBtnHovered] = useState(false);
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

  const scrollToCards = () => {
    document
      .getElementById("services-cards")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleIndustryLinks = (serviceId: string) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  const ka = currentLanguage === "ka";

  return (
    <section className="w-full pt-10 pb-16 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div>
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

          <button
            onClick={scrollToCards}
            className="group relative inline-flex items-center gap-4 self-start md:self-auto h-14"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            <span
              className="absolute top-1/2 -translate-y-1/2 rounded-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{
                width: btnHovered ? "40px" : "56px",
                height: btnHovered ? "40px" : "56px",
                left: btnHovered ? "calc(100% - 56px)" : "0",
              }}
            />
            <span className="relative z-10 text-white font-semibold text-sm tracking-wide whitespace-nowrap pl-18">
              {ka ? "სერვისების ნახვა" : "View Services"}
            </span>
            <svg
              className="relative z-10 shrink-0 text-white"
              width="16"
              height="12"
              viewBox="0 0 19 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5303 7.03033C18.8232 6.73744 18.8232 6.26256 18.5303 5.96967L13.7574 1.1967C13.4645 0.903806 12.9896 0.903806 12.6967 1.1967C12.4038 1.48959 12.4038 1.96447 12.6967 2.25736L16.9393 6.5L12.6967 10.7426C12.4038 11.0355 12.4038 11.5104 12.6967 11.8033C12.9896 12.0962 13.4645 12.0962 13.7574 11.8033L18.5303 7.03033ZM0 7.25H18V5.75H0V7.25Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="border-t border-white/10 mb-0" />

        <div id="services-cards">
          {services.map((service, i) => {
            const isExpandable = service.hasIndustryLinks;
            const isExpanded = expandedServiceId === service.id;

            return (
              <div key={service.id}>
                <div
                  className="group relative flex items-center gap-4 sm:gap-6 md:gap-12 py-6 md:py-10 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/3 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12"
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
                      className="shrink-0 relative overflow-hidden w-6 h-6 text-white/30 group-hover:text-white transition-colors duration-300"
                    >
                      <span className="absolute inset-0 flex items-center justify-center transition-all duration-400 group-hover:translate-x-8 group-hover:-translate-y-8">
                        <ArrowDiagonalSVG />
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center -translate-x-8 translate-y-8 transition-all duration-400 group-hover:translate-x-0 group-hover:translate-y-0">
                        <ArrowDiagonalSVG />
                      </span>
                    </span>
                  ) : (
                    <Link
                      to={service.href}
                      onClick={service.onClick}
                      aria-label={service.title}
                      className="shrink-0 relative overflow-hidden w-6 h-6 text-white/30 group-hover:text-white transition-colors duration-300"
                    >
                      <span className="absolute inset-0 flex items-center justify-center transition-all duration-400 group-hover:translate-x-8 group-hover:-translate-y-8">
                        <ArrowDiagonalSVG />
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center -translate-x-8 translate-y-8 transition-all duration-400 group-hover:translate-x-0 group-hover:translate-y-0">
                        <ArrowDiagonalSVG />
                      </span>
                    </Link>
                  )}
                </div>

                {isExpandable && (
                  <div
                    className={`-mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 overflow-hidden transition-all duration-500 ease-out border-b border-white/10 ${
                      isExpanded ? "max-h-96 opacity-100 py-4 md:py-6" : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 md:p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Link
                          to={service.generalHref!}
                          onClick={startNavigation}
                          className="group relative flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/15 hover:-translate-y-0.5"
                        >
                          <div className="flex items-center gap-3">
                            <Layers className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors" />
                            <span className="text-sm text-white">
                              {ka ? "ყველა სერვისი" : "All Services"}
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>

                        {industries.map((industry) => {
                          const IndustryIcon = industry.icon;

                          return (
                            <Link
                              key={`${service.id}-${industry.slug}`}
                              to={`/industry/${service.industryService}/${industry.slug}`}
                              onClick={startNavigation}
                              className="group relative flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/15 hover:-translate-y-0.5"
                            >
                              <div className="flex items-center gap-3">
                                <IndustryIcon className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors" />
                                <span className="text-sm text-white/85">
                                  {ka ? industry.nameKa : industry.nameEn}
                                </span>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                          );
                        })}
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
