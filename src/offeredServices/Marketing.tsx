"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useLanguage } from "../contexts/LanguageContext";

import {
  FaVideo,
  FaCamera,
  FaShare,
  FaEdit,
  FaChartLine,
  FaPaintBrush,
  FaStar,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaArrowRight,
  FaCheckCircle,
  FaBullseye,
} from "react-icons/fa";
import SEO from "../components/SEO";

// Marketing Translations
const marketingTranslations = {
  ka: {
    "seo.marketing.title": "ციფრული მარკეტინგი - VIFA DIGITAL",
    "seo.marketing.description": "VIFA Digital გთავაზობთ პრემიუმ ციფრული მარკეტინგის სერვისებს: ვიდეო/ფოტო პროდუქცია, სოციალური მედიის მართვა და სტრატეგიული კონტენტის შექმნა.",
    "seo.marketing.keywords": "ციფრული მარკეტინგი, სოციალური მედია მართვა, ვიდეო გადაღება, ფოტოგრაფია, კონტენტის შექმნა, ბრენდინგი, მარკეტინგის სააგენტო vifa digital",
    
    "marketing.hero.overline": "ციფრული მარკეტინგი",
    "marketing.hero.main_title": "ბრენდის სტრატეგიული ზრდა და გაყიდვები.",
    "marketing.hero.description": "ვქმნით მონაცემებზე დაფუძნებულ მარკეტინგულ კამპანიებს, პროფესიონალურ ვიდეო კონტენტს და ვმართავთ სოციალურ მედიას თქვენი ბიზნესის სრული მასშტაბირებისთვის.",

    "page.title": "Digital Marketing",
    "section.strategy": "სტრატეგია",
    "section.content": "კონტენტი",
    "section.distribution": "გავრცელება",
    "section.results": "შედეგები",
    "section.description": "ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → კრეატიური კონტენტი → მიზნობრივი გავრცელება → მონიტორინგი და ოპტიმიზაცია",
    "section.whatWe": "რას გთავაზობთ",
    "section.socialPlatforms": "სოციალური მედია პლატფორმები",
    "section.socialDesc": "ყველა მთავარ პლატფორმაზე შენი ბრენდის წარმატებული წარდგენა",
    "section.pricing": "პრემიუმ პაკეტები",
    "section.pricingDesc": "ყველა პროექტი უნიკალურია. ჩვენი მიზანია მაქსიმალური ღირებულების მიწოდება კლიენტის მიზნების მიხედვით.",
    "package.basic": "Core",
    "package.standard": "Growth",
    "package.premium": "Scale",
    "price.estimate": "საორიენტაციო",
    "price.note": "ფასები ცვალებადია და დამოკიდებულია მომხმარებლის მოთხოვნებსა და მიზნებზე.",
    "cta.title": "მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?",
    "cta.button": "დაიწყე პროექტი",
    "service.videoProd": "ვიდეო პროდუქცია",
    "service.videoDesc": "პროფესიონალური ვიდეო კონტენტის შექმნა",
    "service.photo": "ფოტოგრაფია",
    "service.photoDesc": "სპეციალური ფოტო სესიები ბრენდებისთვის",
    "service.social": "სოციალური მედია",
    "service.socialDesc": "სრული სოციალური მედიის მართვა",
    "service.content": "კონტენტის შექმნა",
    "service.contentDesc": "ორიგინალური და ეფექტური კონტენტი",
    "service.strategy": "მარკეტინგ სტრატეგია",
    "service.strategyDesc": "ინდივიდუალური მარკეტინგ გეგმები",
    "service.brand": "ბრენდ პოზიციონირება",
    "service.brandDesc": "ბრენდის პოზიციონირება და მესიჯინგი",
    "service.design": "გრაფიკული დიზაინი",
    "service.designDesc": "ვიზუალური იდენტობის შექმნა",
    "service.logo": "ლოგოს შექმნა",
    "service.logoDesc": "უნიკალური ლოგო დიზაინი და ბრენდ იდენტიტი",
    "pkg.basic1": "საკომუნიკაციო მიზნების ჩამოყალიბება",
    "pkg.basic2": "მიზნების მიხედვით ვიდეო რილები",
    "pkg.basic3": "ფოტო სესიები ბრენდებისთვის",
    "pkg.basic4": "ბრენდის იდენტობის განვითარება",
    "pkg.basic5": "თვეში 10+ პოსტი სოციალურ მედიაში",
    "pkg.std1": "ყველაფერი Core პაკეტიდან",
    "pkg.std2": "გაფართოებული კონტენტის შექმნა",
    "pkg.std3": "პროფესიონალური ვიდეო გადაღება",
    "pkg.std4": "სოციალური მედიის სრული მენეჯმენტი",
    "pkg.std5": "ყოველკვირეული ანალიტიკა",
    "pkg.std6": "სარეკლამო კამპანიების მართვა",
    "pkg.prem1": "ყველაფერი Growth პაკეტიდან",
    "pkg.prem2": "ყოველდღიური კონტენტ მენეჯმენტი",
    "pkg.prem3": "დრონით და სტუდიური გადაღებები",
    "pkg.prem4": "კომპლექსური სარეკლამო სტრატეგია",
    "pkg.prem5": "ბრენდის სრული რებრენდინგი (საჭიროებისას)",
    "pkg.prem6": "24/7 Community მენეჯმენტი",
    "pkg.prem7": "პრიორიტეტული მხარდაჭერა",
  },
  en: {
    "seo.marketing.title": "Digital Marketing - VIFA DIGITAL",
    "seo.marketing.description": "VIFA Digital offers premium digital marketing services: video/photo production, social media management, and strategic content creation.",
    "seo.marketing.keywords": "digital marketing, social media management, video production, photography, content creation, branding, marketing agency vifa digital",
    
    "marketing.hero.overline": "Digital Marketing",
    "marketing.hero.main_title": "Strategic Brand Growth & Sales.",
    "marketing.hero.description": "We create data-driven marketing campaigns, professional video content, and manage social media to fully scale your business operations.",

    "page.title": "Digital Marketing",
    "section.strategy": "Strategy",
    "section.content": "Content",
    "section.distribution": "Distribution",
    "section.results": "Results",
    "section.description": "Our Approach: Strategic Planning → Creative Content → Targeted Distribution → Monitoring & Optimization",
    "section.whatWe": "What We Offer",
    "section.socialPlatforms": "Social Media Platforms",
    "section.socialDesc": "Successful brand representation on all major platforms",
    "section.pricing": "Premium Packages",
    "section.pricingDesc": "Every project is unique. Our goal is to deliver maximum value according to your business goals.",
    "package.basic": "Core",
    "package.standard": "Growth",
    "package.premium": "Scale",
    "price.estimate": "Estimated",
    "price.note": "Prices vary and depend on client requirements and goals.",
    "cta.title": "Ready for Your Business Digital Transformation?",
    "cta.button": "Start Project",
    "service.videoProd": "Video Production",
    "service.videoDesc": "Professional video content creation",
    "service.photo": "Photography",
    "service.photoDesc": "Special photo sessions for brands",
    "service.social": "Social Media",
    "service.socialDesc": "Full social media management",
    "service.content": "Content Creation",
    "service.contentDesc": "Original and effective content",
    "service.strategy": "Marketing Strategy",
    "service.strategyDesc": "Individual marketing plans",
    "service.brand": "Brand Positioning",
    "service.brandDesc": "Brand positioning and messaging",
    "service.design": "Graphic Design",
    "service.designDesc": "Visual identity creation",
    "service.logo": "Logo Design",
    "service.logoDesc": "Unique logo design and brand identity",
    "pkg.basic1": "Communication Goals Definition",
    "pkg.basic2": "Video Reels According to Goals",
    "pkg.basic3": "Photo Sessions for Brands",
    "pkg.basic4": "Brand Identity Development",
    "pkg.basic5": "10+ Social Media Posts per Month",
    "pkg.std1": "Everything in Core Package",
    "pkg.std2": "Advanced Content Creation",
    "pkg.std3": "Professional Video Production",
    "pkg.std4": "Full Social Media Management",
    "pkg.std5": "Weekly Analytics",
    "pkg.std6": "Ad Campaign Management",
    "pkg.prem1": "Everything in Growth Package",
    "pkg.prem2": "Daily Content Management",
    "pkg.prem3": "Drone & Studio Shoots",
    "pkg.prem4": "Complex Advertising Strategy",
    "pkg.prem5": "Full Brand Identity Refresh",
    "pkg.prem6": "24/7 Community Management",
    "pkg.prem7": "Priority Support",
  },
};

const Marketing: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const { currentLanguage } = useLanguage();
  const [activeService, setActiveService] = useState<number>(0);

  // WhatsApp URL
  const whatsappUrl = "https://wa.me/995577175132?text=გამარჯობა,%20დავინტერესდი%20ციფრული%20მარკეტინგის%20სერვისით.%20მსურს%20უფასო%20კონსულტაცია.";

  const t = (key: string): string => {
    const translations = marketingTranslations[currentLanguage as keyof typeof marketingTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Premium Muted Color Classes Helper
  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      rose: "text-rose-400/80 group-hover:text-rose-400",
      sky: "text-sky-400/80 group-hover:text-sky-400",
      emerald: "text-emerald-400/80 group-hover:text-emerald-400",
      purple: "text-purple-400/80 group-hover:text-purple-400",
      amber: "text-amber-400/80 group-hover:text-amber-400",
      pink: "text-pink-400/80 group-hover:text-pink-400",
      indigo: "text-indigo-400/80 group-hover:text-indigo-400",
      yellow: "text-yellow-400/80 group-hover:text-yellow-400",
    };
    return colors[color] || "text-gray-400 group-hover:text-white";
  };

  // Process Steps Data (For Bento Box)
  const processSteps = [
    { num: "01", key: "section.strategy", icon: FaChartLine, color: "amber" },
    { num: "02", key: "section.content", icon: FaVideo, color: "rose" },
    { num: "03", key: "section.distribution", icon: FaShare, color: "emerald" },
    { num: "04", key: "section.results", icon: FaBullseye, color: "indigo" },
  ];

  // Main advertising services
  const getServices = () => [
    { id: "video-production", icon: <FaVideo />, title: t("service.videoProd"), description: t("service.videoDesc"), color: "rose" },
    { id: "photo-shooting", icon: <FaCamera />, title: t("service.photo"), description: t("service.photoDesc"), color: "sky" },
    { id: "social-media", icon: <FaShare />, title: t("service.social"), description: t("service.socialDesc"), color: "emerald" },
    { id: "content-creation", icon: <FaEdit />, title: t("service.content"), description: t("service.contentDesc"), color: "purple" },
    { id: "marketing-strategy", icon: <FaChartLine />, title: t("service.strategy"), description: t("service.strategyDesc"), color: "amber" },
    { id: "brand-positioning", icon: <FaBullseye />, title: t("service.brand"), description: t("service.brandDesc"), color: "pink" },
    { id: "graphic-design", icon: <FaPaintBrush />, title: t("service.design"), description: t("service.designDesc"), color: "indigo" },
    { id: "logo-design", icon: <FaStar />, title: t("service.logo"), description: t("service.logoDesc"), color: "yellow" },
  ];
  const services = getServices();

  // Marketing Packages
  const getPackages = () => [
    {
      id: "basic",
      name: t("package.basic"),
      icon: <FaVideo />,
      price: "1000₾",
      color: "rose",
      features: [t("pkg.basic1"), t("pkg.basic2"), t("pkg.basic3"), t("pkg.basic4"), t("pkg.basic5")],
    },
    {
      id: "standard",
      name: t("package.standard"),
      icon: <FaShare />,
      price: "1500₾",
      color: "emerald",
      features: [t("pkg.std1"), t("pkg.std2"), t("pkg.std3"), t("pkg.std4"), t("pkg.std5"), t("pkg.std6")],
    },
    {
      id: "premium",
      name: t("package.premium"),
      icon: <FaStar />,
      price: "2000₾",
      color: "amber",
      features: [t("pkg.prem1"), t("pkg.prem2"), t("pkg.prem3"), t("pkg.prem4"), t("pkg.prem5"), t("pkg.prem6"), t("pkg.prem7")],
    },
  ];
  const packages = getPackages();

  // Social media platforms
  // Social media platforms
  const platforms = [
    { icon: <FaInstagram />, name: "Instagram", color: "pink", link: "https://www.instagram.com/vifaproduction/" },
    { icon: <FaFacebook />, name: "Facebook", color: "sky", link: "https://www.facebook.com/vifageo" },
    { icon: <FaYoutube />, name: "YouTube", color: "rose", link: "https://www.youtube.com/@vifaprodaction3750" },
    { icon: <FaTiktok />, name: "TikTok", color: "purple", link: "https://www.tiktok.com/@vifadigital" },
  ];
  return (
    <div className={`bg-[#060608] min-h-screen ${getTransitionClasses()}`}>
      <SEO
        title={t("seo.marketing.title")}
        description={t("seo.marketing.description")}
        keywords={t("seo.marketing.keywords")}
        url="https://vifadigital.ge/services/marketing"
      />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-start overflow-hidden pt-32 lg:pt-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-image-scale opacity-60"
            style={{ backgroundImage: 'url("/marketphoto.png")' }}
          />
        </div>
{/* sadasd */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent" />
        <div className="absolute inset-0 z-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060608] to-transparent z-0" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-0">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 font-semibold mb-4 block">
              {t("marketing.hero.overline")}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-snug lg:leading-[1.15] mb-6">
              {t("marketing.hero.main_title")}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 max-w-xl">
              {t("marketing.hero.description")}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors duration-300"
            >
              {t("cta.button")}
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>

        <style>{`
          @keyframes image-scale {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .animate-image-scale {
            animation: image-scale 30s ease-in-out infinite alternate;
          }
        `}</style>
      </section>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* ── Process Bento Box ── */}
        <section className="mb-32 mt-[-2rem] sm:mt-[-4rem] relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="relative p-5 sm:p-6 bg-[#060608] hover:bg-white/[0.02] transition-colors duration-500 group flex flex-col justify-between min-h-[120px] sm:min-h-[140px]"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-300">
                      <Icon className={`text-base sm:text-lg transition-colors duration-300 ${getIconColor(step.color)}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                      {step.num}
                    </span>
                  </div>
                  <span className="block text-sm sm:text-base font-medium text-gray-300 group-hover:text-white transition-colors">
                    {t(step.key)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
            <p className="text-gray-500 text-xs sm:text-sm tracking-wide">
              {t("section.description")}
            </p>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-white mb-4">
              {t("section.whatWe")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-6 rounded-2xl bg-[#0A0A0C] border ${
                  activeService === index ? "border-white/20" : "border-white/[0.05]"
                } hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col h-full`}
                onClick={() => setActiveService(index)}
              >
                <div className={`text-2xl mb-4 transition-colors ${getIconColor(service.color)}`}>
                  {service.icon}
                </div>
                <h3 className="text-white font-medium text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Marketing Packages (SaaS Style) ── */}
        <section className="mb-32">
          <div className="mb-12 max-w-2xl">
            <h3 className="text-3xl font-light text-white mb-4">
              {t("section.pricing")}
            </h3>
            <p className="text-gray-400">
              {t("section.pricingDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#0A0A0C] p-8 rounded-2xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col h-full group"
              >
                <div className={`text-2xl mb-6 transition-colors ${getIconColor(pkg.color)}`}>
                  {pkg.icon}
                </div>
                <h4 className="text-xl font-medium text-white mb-2">{pkg.name}</h4>
                <div className="text-3xl font-bold text-white mb-1 mt-4">
                  {pkg.price}
                </div>
                <div className="text-xs text-gray-500 mb-8">{t("price.note")}</div>
                
                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className={`text-xs mt-1 transition-colors ${getIconColor(pkg.color).split(' ')[0]}`} />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 px-4 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 mt-auto"
                >
                  შეუკვეთე პაკეტი
                </a>
              </div>
            ))}
          </div>
        </section>

     {/* ── Social Platforms Minimal ── */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-white mb-2">
              {t("section.socialPlatforms")}
            </h2>
          </div>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {platforms.map((platform) => (
              <a // <-- აქ div შეიცვალა a ტეგით
                key={platform.name}
                href={platform.link} // <-- აქ დაემატა ლინკი
                target="_blank" // <-- ხსნის ახალ ტაბში
                rel="noopener noreferrer" // <-- უსაფრთხოებისთვის
                className="group px-6 py-4 rounded-full border border-white/[0.05] bg-white/[0.02] flex items-center gap-3 hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer"
              >
                <span className={`transition-colors ${getIconColor(platform.color)}`}>{platform.icon}</span>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{platform.name}</span>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Marketing;