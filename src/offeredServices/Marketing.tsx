"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useLanguage } from "../contexts/LanguageContext";
import TrueFocus from "../components/TrueFocus";
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
  FaRocket,
  FaArrowRight,
  FaCheckCircle,
  FaBullseye,
  FaBolt,
  FaCog,
} from "react-icons/fa";
import SEO from "../components/SEO";

// Marketing Translations
const marketingTranslations = {
  ka: {
    "seo.marketing.title": "ციფრული მარკეტინგი - VIFA | vifadigital.ge",
    "seo.marketing.description": "ციფრული მარკეტინგის სერვისები: ვიდეო გადაღება, ფოტოგრაფია, სოციალური მედია მართვა, კონტენტის შექმნა. სრული მარკეტინგ ხსნარი თქვენი ბიზნესისთვის.",
    "seo.marketing.keywords": "დიჯიტალური მარკეტინგი, სოციალური მედია მართვა, ვიდეო გადაღება, ფოტოგრაფია, კონტენტის შექმნა, ბრენდინგი, მარკეტინგის სააგენტო",
    "page.title": "Digital Marketing",
    "section.strategy": "სტრატეგია",
    "section.content": "კონტენტი",
    "section.distribution": "გავრცელება",
    "section.results": "შედეგები",
    "section.description": "ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → კრეატიური კონტენტი → მიზნობრივი გავრცელება → მონიტორინგი და ოპტიმიზაცია",
    "section.whatWe": "რას გთავაზობთ",
    "section.socialPlatforms": "სოციალური მედია პლატფორმები",
    "section.socialDesc": "ყველა მთავარ პლატფორმაზე შენი ბრენდის წარმატებული წარდგენა",
    "section.pricing": "ინდივიდუალური ფასები",
    "section.pricingDesc": "ყველა პროექტი უნიკალურია. ჩვენი მიზანია მაქსიმალური ღირებულების მიწოდება კლიენტის ბიუჯეტისა და მოთხოვნების მიხედვით.",
    "package.basic": "საწყისი პაკეტი",
    "package.standard": "სტანდარტული პაკეტი",
    "package.premium": "პრემიუმ პაკეტი",
    "price.estimate": "საორიენტაციო",
    "price.note": "ფასები ცვალებადია და დამოკიდებულია მომხმარებლის მოთხოვნებსა და მიზნებზე.",
    "pricing.needs": "თქვენი მოთხოვნების მიხედვით",
    "pricing.needsDesc": "ბაზისური ბრენდინგიდან სრულ მარკეტინგ სტრატეგიამდე - ყველა პროექტს განსხვავებული მიდგომა სჭირდება.",
    "pricing.estimate": "სწრაფი შეფასება",
    "pricing.estimateDesc": "უფასო კონსულტაციის მაქსიმუმ 12 საათში მიიღებთ ზუსტ ფასს და პროექტის გეგმას.",
    "pricing.transparent": "გამჭირვალე პროცესი",
    "pricing.transparentDesc": "ჩვენი მიზანია, ყველა ეტაპი იყოს მაქსიმალურად ღია და გასაგები. ნდობაზე დაფუძნებული თანამშრომლობა ყოველთვის მომგებიანია.",
    "cta.title": "მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?",
    "cta.button": "პროექტის დაწყება",
    "service.videoProd": "ვიდეო გადაღება",
    "service.videoDesc": "პროფესიონალური ვიდეო კონტენტის შექმნა",
    "service.video1": "4K ვიდეო ხარისხი",
    "service.video2": "დრონით გადაღება",
    "service.video3": "პოსტ-პროდუქცია",
    "service.video4": "მონტაჟი",
    "service.photo": "ფოტო გადაღება",
    "service.photoDesc": "სპეციალური ფოტო სესიები ბრენდებისთვის",
    "service.photo1": "სტუდიური გადაღება",
    "service.photo2": "ლოკაციური სესიები",
    "service.photo3": "პროდუქტის ფოტოები",
    "service.photo4": "რეტუშირება",
    "service.social": "სოციალური მედია",
    "service.socialDesc": "სრული სოციალური მედიის მართვა",
    "service.social1": "კონტენტ დაგეგმვა",
    "service.social2": "Community Management",
    "service.social3": "Analytics",
    "service.social4": "Engagement",
    "service.content": "კონტენტის შექმნა",
    "service.contentDesc": "ორიგინალური და ეფექტური კონტენტი",
    "service.content1": "კოპირაიტინგი",
    "service.content2": "სცენარების წერა",
    "service.content3": "Blog პოსტები",
    "service.content4": "Caption-ები",
    "service.strategy": "მარკეტინგ სტრატეგია",
    "service.strategyDesc": "ინდივიდუალური მარკეტინგ გეგმები",
    "service.strategy1": "ბაზრის ანალიზი",
    "service.strategy2": "კონკურენტების შესწავლა",
    "service.strategy3": "ROI გაანგარიშება",
    "service.strategy4": "KPI განსაზღვრა",
    "service.brand": "საკომუნიკაციო მიზნები",
    "service.brandDesc": "ბრენდის პოზიციონირება და მესიჯინგი",
    "service.brand1": "Brand Voice",
    "service.brand2": "Target Audience",
    "service.brand3": "Messaging Framework",
    "service.brand4": "Brand Guidelines",
    "service.design": "გრაფიკული დიზაინი",
    "service.designDesc": "ვიზუალური იდენტობის შექმნა",
    "service.design1": "Banner დიზაინი",
    "service.design2": "Post Templates",
    "service.design3": "Infographics",
    "service.design4": "Brand Materials",
    "service.logo": "ლოგოს შექმნა",
    "service.logoDesc": "უნიკალური ლოგო დიზაინი და ბრენდ იდენტიტი",
    "service.logo1": "კონცეპტუალური დიზაინი",
    "service.logo2": "ვექტორული ფაილები",
    "service.logo3": "Brand Identity",
    "service.logo4": "Usage Guidelines",
    "pkg.basic1": "საკომუნიკაციო მიზნების ჩამოყალიბება",
    "pkg.basic2": "საკომუნიკაციო მიზნების მიხედვით ვიდეო რილები",
    "pkg.basic3": "სპეციალური ფოტო სესიები ბრენდებისთვის",
    "pkg.basic4": "ბრენდის იდენტობის განვითარება",
    "pkg.basic5": "თვეში 10+ პოსტი სოციალურ მედიაში",
    "pkg.std1": "საკომუნიკაციო მიზნების ჩამოყალიბება",
    "pkg.std2": "კონტენტის შექმნა",
    "pkg.std3": "ვიდეო გადაღება",
    "pkg.std4": "ფოტო გადაღება",
    "pkg.std5": "სოციალური მედიის მენეჯმენტი",
    "pkg.std6": "სოციალური მედიის პოსტერების შექმნა",
    "pkg.prem1": "საკომუნიკაციო მიზნების ჩამოყალიბება",
    "pkg.prem2": "კონტენტის შექმნა",
    "pkg.prem3": "ვიდეო გადაღება",
    "pkg.prem4": "ფოტო გადაღება",
    "pkg.prem5": "სოციალური მედიის მენეჯმენტი",
    "pkg.prem6": "სოციალური მედიის პოსტერების შექმნა",
    "pkg.prem7": "ლოგოს შექმნა",
  },
  en: {
    "seo.marketing.title": "Digital Marketing - VIFA | vifadigital.ge",
    "seo.marketing.description": "Digital marketing services: video production, photography, social media management, content creation. Complete marketing solution for your business.",
    "seo.marketing.keywords": "digital marketing, social media management, video production, photography, content creation, branding, marketing agency",
    "page.title": "Digital Marketing",
    "section.strategy": "Strategy",
    "section.content": "Content",
    "section.distribution": "Distribution",
    "section.results": "Results",
    "section.description": "Our Approach: Strategic Planning → Creative Content → Targeted Distribution → Monitoring & Optimization",
    "section.whatWe": "What We Offer",
    "section.socialPlatforms": "Social Media Platforms",
    "section.socialDesc": "Successful brand representation on all major platforms",
    "section.pricing": "Individual Pricing",
    "section.pricingDesc": "Every project is unique. Our goal is to deliver maximum value according to your budget and requirements.",
    "package.basic": "Basic Package",
    "package.standard": "Standard Package",
    "package.premium": "Premium Package",
    "price.estimate": "Estimated",
    "price.note": "Prices vary and depend on client requirements and goals.",
    "pricing.needs": "According to Your Needs",
    "pricing.needsDesc": "From basic branding to full marketing strategy - every project needs a different approach.",
    "pricing.estimate": "Fast Estimate",
    "pricing.estimateDesc": "Get an exact price and project plan in maximum 12 hours with our free consultation.",
    "pricing.transparent": "Transparent Process",
    "pricing.transparentDesc": "Our goal is to make every stage as clear and understandable as possible. Trust-based collaboration is always beneficial.",
    "cta.title": "Ready for Your Business Digital Transformation?",
    "cta.button": "Start Project",
    "service.videoProd": "Video Production",
    "service.videoDesc": "Professional video content creation",
    "service.video1": "4K Video Quality",
    "service.video2": "Drone Footage",
    "service.video3": "Post-Production",
    "service.video4": "Editing",
    "service.photo": "Photo Shooting",
    "service.photoDesc": "Special photo sessions for brands",
    "service.photo1": "Studio Shooting",
    "service.photo2": "Location Sessions",
    "service.photo3": "Product Photography",
    "service.photo4": "Retouching",
    "service.social": "Social Media",
    "service.socialDesc": "Full social media management",
    "service.social1": "Content Planning",
    "service.social2": "Community Management",
    "service.social3": "Analytics",
    "service.social4": "Engagement",
    "service.content": "Content Creation",
    "service.contentDesc": "Original and effective content",
    "service.content1": "Copywriting",
    "service.content2": "Script Writing",
    "service.content3": "Blog Posts",
    "service.content4": "Captions",
    "service.strategy": "Marketing Strategy",
    "service.strategyDesc": "Individual marketing plans",
    "service.strategy1": "Market Analysis",
    "service.strategy2": "Competitor Research",
    "service.strategy3": "ROI Calculation",
    "service.strategy4": "KPI Definition",
    "service.brand": "Communication Goals",
    "service.brandDesc": "Brand positioning and messaging",
    "service.brand1": "Brand Voice",
    "service.brand2": "Target Audience",
    "service.brand3": "Messaging Framework",
    "service.brand4": "Brand Guidelines",
    "service.design": "Graphic Design",
    "service.designDesc": "Visual identity creation",
    "service.design1": "Banner Design",
    "service.design2": "Post Templates",
    "service.design3": "Infographics",
    "service.design4": "Brand Materials",
    "service.logo": "Logo Design",
    "service.logoDesc": "Unique logo design and brand identity",
    "service.logo1": "Conceptual Design",
    "service.logo2": "Vector Files",
    "service.logo3": "Brand Identity",
    "service.logo4": "Usage Guidelines",
    "pkg.basic1": "Communication Goals Definition",
    "pkg.basic2": "Video Reels According to Goals",
    "pkg.basic3": "Special Photo Sessions for Brands",
    "pkg.basic4": "Brand Identity Development",
    "pkg.basic5": "10+ Social Media Posts per Month",
    "pkg.std1": "Communication Goals Definition",
    "pkg.std2": "Content Creation",
    "pkg.std3": "Video Production",
    "pkg.std4": "Photo Shooting",
    "pkg.std5": "Social Media Management",
    "pkg.std6": "Social Media Poster Creation",
    "pkg.prem1": "Communication Goals Definition",
    "pkg.prem2": "Content Creation",
    "pkg.prem3": "Video Production",
    "pkg.prem4": "Photo Shooting",
    "pkg.prem5": "Social Media Management",
    "pkg.prem6": "Social Media Poster Creation",
    "pkg.prem7": "Logo Design",
  },
};

const Marketing: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const { currentLanguage } = useLanguage();
  const [activeService, setActiveService] = useState<number>(0);

  const t = (key: string): string => {
    const translations = marketingTranslations[currentLanguage as keyof typeof marketingTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Main advertising services
  const getServices = () => [
    {
      id: "video-production",
      icon: <FaVideo />,
      title: t("service.videoProd"),
      description: t("service.videoDesc"),
      color: "red",
      features: [
        t("service.video1"),
        t("service.video2"),
        t("service.video3"),
        t("service.video4"),
      ],
    },
    {
      id: "photo-shooting",
      icon: <FaCamera />,
      title: t("service.photo"),
      description: t("service.photoDesc"),
      color: "blue",
      features: [
        t("service.photo1"),
        t("service.photo2"),
        t("service.photo3"),
        t("service.photo4"),
      ],
    },
    {
      id: "social-media",
      icon: <FaShare />,
      title: t("service.social"),
      description: t("service.socialDesc"),
      color: "green",
      features: [
        t("service.social1"),
        t("service.social2"),
        t("service.social3"),
        t("service.social4"),
      ],
    },
    {
      id: "content-creation",
      icon: <FaEdit />,
      title: t("service.content"),
      description: t("service.contentDesc"),
      color: "purple",
      features: [
        t("service.content1"),
        t("service.content2"),
        t("service.content3"),
        t("service.content4"),
      ],
    },
    {
      id: "marketing-strategy",
      icon: <FaChartLine />,
      title: t("service.strategy"),
      description: t("service.strategyDesc"),
      color: "orange",
      features: [
        t("service.strategy1"),
        t("service.strategy2"),
        t("service.strategy3"),
        t("service.strategy4"),
      ],
    },
    {
      id: "brand-positioning",
      icon: <FaBullseye />,
      title: t("service.brand"),
      description: t("service.brandDesc"),
      color: "pink",
      features: [
        t("service.brand1"),
        t("service.brand2"),
        t("service.brand3"),
        t("service.brand4"),
      ],
    },
    {
      id: "graphic-design",
      icon: <FaPaintBrush />,
      title: t("service.design"),
      description: t("service.designDesc"),
      color: "indigo",
      features: [
        t("service.design1"),
        t("service.design2"),
        t("service.design3"),
        t("service.design4"),
      ],
    },
    {
      id: "logo-design",
      icon: <FaStar />,
      title: t("service.logo"),
      description: t("service.logoDesc"),
      color: "yellow",
      features: [
        t("service.logo1"),
        t("service.logo2"),
        t("service.logo3"),
        t("service.logo4"),
      ],
    },
  ];

  const services = getServices();

  // Marketing Packages
  const getPackages = () => [
    {
      id: "basic",
      name: t("package.basic"),
      icon: <FaVideo />,
      price: "1000₾",
      color: "red",
      features: [
        t("pkg.basic1"),
        t("pkg.basic2"),
        t("pkg.basic3"),
        t("pkg.basic4"),
        t("pkg.basic5"),
      ],
    },
    {
      id: "standard",
      name: t("package.standard"),
      icon: <FaShare />,
      price: "1500₾",
      color: "green",
      features: [
        t("pkg.std1"),
        t("pkg.std2"),
        t("pkg.std3"),
        t("pkg.std4"),
        t("pkg.std5"),
        t("pkg.std6"),
      ],
    },
    {
      id: "premium",
      name: t("package.premium"),
      icon: <FaStar />,
      price: "2000₾",
      color: "purple",
      features: [
        t("pkg.prem1"),
        t("pkg.prem2"),
        t("pkg.prem3"),
        t("pkg.prem4"),
        t("pkg.prem5"),
        t("pkg.prem6"),
        t("pkg.prem7"),
      ],
    },
  ];

  const packages = getPackages();

  // Social media platforms
  const platforms = [
    { icon: <FaInstagram />, name: "Instagram", color: "pink" },
    { icon: <FaFacebook />, name: "Facebook", color: "blue" },
    { icon: <FaYoutube />, name: "YouTube", color: "red" },
    { icon: <FaTiktok />, name: "TikTok", color: "black" },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      red: "border-red-400 bg-red-500/10",
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      orange: "border-orange-400 bg-orange-500/10",
      pink: "border-pink-400 bg-pink-500/10",
      indigo: "border-indigo-400 bg-indigo-500/10",
      yellow: "border-yellow-400 bg-yellow-500/10",
      black: "border-gray-400 bg-gray-500/10",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      red: "text-red-400",
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400",
      orange: "text-orange-400",
      pink: "text-pink-400",
      indigo: "text-indigo-400",
      yellow: "text-yellow-400",
      black: "text-gray-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title={t("seo.marketing.title")}
        description={t("seo.marketing.description")}
        keywords={t("seo.marketing.keywords")}
        url="https://vifadigital.ge/services/digital-advertising"
      />

      {/* Professional Marketing Background - Ultra Dark */}
      <div className="fixed inset-0 z-0">
        {/* Ultra dark base */}
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>

        {/* Very subtle marketing elements */}
        <div className="absolute inset-0 marketing-pattern opacity-4"></div>

        {/* Minimal animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/15 via-transparent to-orange-950/15 animate-marketing-glow"></div>

        {/* Darker depth layers */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-950/25 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-950/25 to-transparent"></div>

        {/* Very subtle branding accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-950/5 via-transparent to-amber-950/5"></div>

        {/* Reduced texture overlay */}
        <div className="absolute inset-0 bg-marketing-texture opacity-2"></div>
      </div>

      <style>{`
        /* Professional marketing pattern */
        .marketing-pattern {
          background-image:
            radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
            linear-gradient(45deg, rgba(239, 68, 68, 0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(245, 158, 11, 0.02) 25%, transparent 25%);
          background-size: 200px 200px, 200px 200px, 60px 60px, 60px 60px;
          animation: marketing-drift 25s linear infinite;
        }

        @keyframes marketing-drift {
          0% { background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
          100% { background-position: 200px 200px, -200px -200px, 60px 60px, -60px -60px; }
        }

        /* Marketing glow animation - darker */
        @keyframes marketing-glow {
          0%, 100% { opacity: 0.1; transform: translateX(-50px); }
          50% { opacity: 0.2; transform: translateX(50px); }
        }

        .animate-marketing-glow {
          animation: marketing-glow 8s ease-in-out infinite;
        }

        /* Sophisticated marketing texture */
        .bg-marketing-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* Performance optimizations */
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .marketing-pattern,
          .animate-marketing-glow {
            animation: none;
          }
          .bg-marketing-texture {
            display: none;
          }
        }

        /* Professional accent elements */
        .marketing-accent {
          background: linear-gradient(135deg,
            rgba(239, 68, 68, 0.1) 0%,
            rgba(245, 158, 11, 0.1) 100%);
        }

        /* Subtle brand consistent elements */
        .brand-consistent {
          background: radial-gradient(ellipse at center,
            rgba(239, 68, 68, 0.05) 0%,
            rgba(245, 158, 11, 0.03) 50%,
            transparent 100%);
        }
      `}</style>

      <div className="relative z-10 min-h-screen mt-17">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32 mt-24">
            <div className="text-center mb-16">
              <div className="mb-8 flex justify-center">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                  <TrueFocus
                    sentence={t("page.title")}
                    blurAmount={4}
                    borderColor="#ef4444"
                    glowColor="rgba(239, 68, 68, 0.6)"
                    animationDuration={0.8}
                    pauseBetweenAnimations={2}
                  />
                </div>
              </div>
            </div>

            {/* Digital Marketing Process Visualization */}
            <div className="relative">
              <div className="flex justify-center items-center gap-3 sm:gap-6 lg:gap-8 flex-wrap">
                {/* Step 1: Strategy */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-blue-400/30 rounded-2xl flex items-center justify-center bg-blue-500/5 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaChartLine className="text-blue-400 text-3xl mb-2 mx-auto" />
                      <div className="text-blue-400 text-xs font-medium">
                        {t("section.strategy")}
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 2: Content */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-red-400/30 rounded-2xl flex items-center justify-center bg-red-500/5 group-hover:border-red-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaVideo className="text-red-400 text-3xl mb-2 mx-auto" />
                      <div className="text-red-400 text-xs font-medium">
                        {t("section.content")}
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 3: Distribution */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-green-400/30 rounded-2xl flex items-center justify-center bg-green-500/5 group-hover:border-green-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaShare className="text-green-400 text-3xl mb-2 mx-auto" />
                      <div className="text-green-400 text-xs font-medium">
                        {t("section.distribution")}
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 4: Results */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-purple-400/30 rounded-2xl flex items-center justify-center bg-purple-500/5 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaBullseye className="text-purple-400 text-3xl mb-2 mx-auto" />
                      <div className="text-purple-400 text-xs font-medium">
                        {t("section.results")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → კრეატიული კონტენტი →
                  მიზნობრივი გავრცელება → მონიტორინგი და ოპტიმიზაცია
                </p>
              </div>
            </div>
          </div>

          {/* Marketing Packages */}
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
                red: {
                  bg: "from-red-500/10 to-orange-500/10",
                  border: "border-red-500/20",
                  text: "text-red-400",
                  icon: "text-red-400",
                },
                green: {
                  bg: "from-green-500/10 to-emerald-500/10",
                  border: "border-green-500/20",
                  text: "text-green-400",
                  icon: "text-green-400",
                },
                purple: {
                  bg: "from-purple-500/10 to-pink-500/10",
                  border: "border-purple-500/20",
                  text: "text-purple-400",
                  icon: "text-purple-400",
                },
              };

              const colors = colorMap[pkg.color] || colorMap.red;

              return (
                <div
                  key={pkg.id}
                  className={`bg-gradient-to-br ${colors.bg} p-6 rounded-xl ${colors.border} border flex flex-col h-full`}
                >
                  <div className={`text-4xl mb-4 ${colors.icon}`}>{pkg.icon}</div>
                  <h4 className="text-xl font-medium text-white mb-3">{pkg.name}</h4>
                  <div className="text-slate-300 text-sm mb-4 leading-relaxed space-y-2 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheckCircle className={`${colors.icon} text-xs`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className={`text-2xl font-bold ${colors.text} mt-6`}>
                      {pkg.price}
                      <span className="text-sm text-slate-400"> {t("price.estimate")}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">{t("price.note")}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Services Grid */}
          <div className="max-w-6xl mx-auto mb-32 mt-18">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">
                {t("section.whatWe")}
              </h2>
            </div>

            {/* Services Grid - Fixed height for all cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group transition-all duration-300 hover:scale-105`}
                  onClick={() => setActiveService(index)}
                >
                  <div
                    className={`p-6 rounded-xl border-2 h-44 flex flex-col justify-between bg-black/60 backdrop-blur-lg ${getColorClass(
                      service.color
                    ).replace("bg-", "border-")}
                    ${
                      activeService === index
                        ? "border-opacity-100 scale-105"
                        : "border-opacity-40"
                    }
                    transition-all duration-300 group-hover:border-opacity-100`}
                  >
                    <div>
                      <div
                        className={`text-3xl mb-4 ${getTextColorClass(
                          service.color
                        )}`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-white font-medium text-lg mb-2 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media Platforms */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">
                {t("section.socialPlatforms")}
              </h2>
              <p className="text-slate-400">
                {t("section.socialDesc")}
              </p>
            </div>

            <div className="flex justify-center items-center gap-3 sm:gap-6 lg:gap-8 flex-wrap">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer p-6 rounded-xl border-2 bg-black/60 backdrop-blur-lg ${getColorClass(
                    platform.color
                  ).replace("bg-", "border-")}
                  border-opacity-40 hover:border-opacity-100 transition-all duration-300 hover:scale-110`}
                >
                  <div className="text-center">
                    <div
                      className={`text-4xl mb-3 ${getTextColorClass(
                        platform.color
                      )} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {platform.icon}
                    </div>
                    <div className="text-white font-medium">
                      {platform.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Marketing Packages Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-light text-white mb-4">
                {t("section.pricing")}
              </h3>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                {t("section.pricingDesc")}
              </p>
            </div>

            {/* Why Individual Pricing */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600/30 mb-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4 text-blue-400">
                    <FaBullseye />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    {t("pricing.needs")}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t("pricing.needsDesc")}
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4 text-green-400">
                    <FaBolt />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    {t("pricing.estimate")}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t("pricing.estimateDesc")}
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4 text-purple-400">
                    <FaCog />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    {t("pricing.transparent")}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t("pricing.transparentDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
            
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-light mb-6">
                {t("cta.title")}
              </h3>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-12">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket />
                  {t("cta.button")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketing;
