"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
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

const Marketing: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const [activeService, setActiveService] = useState<number>(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Main advertising services
  const services = [
    {
      id: "video-production",
      icon: <FaVideo />,
      title: "ვიდეო გადაღება",
      description: "პროფესიონალური ვიდეო კონტენტის შექმნა",
      color: "red",
      features: [
        "4K ვიდეო ხარისხი",
        "დრონით გადაღება",
        "პოსტ-პროდუქცია",
        "მონტაჟი",
      ],
    },
    {
      id: "photo-shooting",
      icon: <FaCamera />,
      title: "ფოტო გადაღება",
      description: "სპეციალური ფოტო სესიები ბრენდებისთვის",
      color: "blue",
      features: [
        "სტუდიური გადაღება",
        "ლოკაციური სესიები",
        "პროდუქტის ფოტოები",
        "რეტუშირება",
      ],
    },
    {
      id: "social-media",
      icon: <FaShare />,
      title: "სოციალური მედია",
      description: "სრული სოციალური მედიის მართვა",
      color: "green",
      features: [
        "კონტენტ დაგეგმვა",
        "Community Management",
        "Analytics",
        "Engagement",
      ],
    },
    {
      id: "content-creation",
      icon: <FaEdit />,
      title: "კონტენტის შექმნა",
      description: "ორიგინალური და ეფექტური კონტენტი",
      color: "purple",
      features: [
        "კოპირაიტინგი",
        "სცენარების წერა",
        "Blog პოსტები",
        "Caption-ები",
      ],
    },
    {
      id: "marketing-strategy",
      icon: <FaChartLine />,
      title: "მარკეტინგ სტრატეგია",
      description: "ინდივიდუალური მარკეტინგ გეგმები",
      color: "orange",
      features: [
        "ბაზრის ანალიზი",
        "კონკურენტების შესწავლა",
        "ROI გაანგარიშება",
        "KPI განსაზღვრა",
      ],
    },
    {
      id: "brand-positioning",
      icon: <FaBullseye />,
      title: "საკომუნიკაციო მიზნები",
      description: "ბრენდის პოზიციონირება და მესიჯინგი",
      color: "pink",
      features: [
        "Brand Voice",
        "Target Audience",
        "Messaging Framework",
        "Brand Guidelines",
      ],
    },
    {
      id: "graphic-design",
      icon: <FaPaintBrush />,
      title: "გრაფიკული დიზაინი",
      description: "ვიზუალური იდენტობის შექმნა",
      color: "indigo",
      features: [
        "Banner დიზაინი",
        "Post Templates",
        "Infographics",
        "Brand Materials",
      ],
    },
    {
      id: "logo-design",
      icon: <FaStar />,
      title: "ლოგოს შექმნა",
      description: "უნიკალური ლოგო დიზაინი და ბრენდ იდენტიტი",
      color: "yellow",
      features: [
        "კონცეპტუალური დიზაინი",
        "ვექტორული ფაილები",
        "Brand Identity",
        "Usage Guidelines",
      ],
    },
  ];

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
        title="Digital Advertising Services - VIFA"
        description="Professional digital advertising services including video production, photography, social media management, and creative content."
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
          <div className="max-w-6xl mx-auto mb-32 mt-26">
            <div className="text-center mb-16">
              <div className="mb-8 flex justify-center">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                  <TrueFocus
                    sentence="Digital Marketing"
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
                        სტრატეგია
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
                        კონტენტი
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
                        გავრცელება
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
                        შედეგები
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
            {/* Basic Package */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6 rounded-xl border border-red-500/20 flex flex-col h-full">
              <div className="text-4xl mb-4 text-red-400">
                <FaVideo />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">
                ბაზისური პაკეტი
              </h4>
              <div className="text-slate-300 text-sm mb-4 leading-relaxed space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-red-400 text-xs" />
                  <span>საკომუნიკაციო მიზნების ჩამოყალიბება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-red-400 text-xs" />
                  <span>საკომუნიკაციო მიზნების მიხედვით ვიდეო რილები</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-red-400 text-xs" />
                  <span>სპეციალური ფოტო სესიები ბრენდებისთვის</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-red-400 text-xs" />
                  <span>ბრენდის იდენტობის განვითარება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-red-400 text-xs" />
                  <span>თვეში 10+ პოსტი სოციალურ მედიაში</span>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-red-400 mt-6">
                  1000₾
                  <span className="text-sm text-slate-400"> საორიენტაციო</span>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  ფასები ცვალებადია და დამოკიდებულია მომხმარებლის მოთხოვნებსა და
                  მიზნებზე.
                </div>
              </div>
            </div>

            {/* Standard Package */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20 flex flex-col h-full">
              <div className="text-4xl mb-4 text-green-400">
                <FaShare />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">
                სტანდარტული პაკეტი
              </h4>
              <div className="text-slate-300 text-sm mb-4 leading-relaxed space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>საკომუნიკაციო მიზნების ჩამოყალიბება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>კონტენტის შექმნა</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>ვიდეო გადაღება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>ფოტო გადაღება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>სოციალური მედიის მენეჯმენტი</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>სოციალური მედიის პოსტერების შექმნა</span>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-green-400 mt-6">
                  1500₾
                  <span className="text-sm text-slate-400"> საორიენტაციო</span>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  ფასები ცვალებადია და დამოკიდებულია მომხმარებლის მოთხოვნებსა და
                  მიზნებზე.
                </div>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 flex flex-col h-full">
              <div className="text-4xl mb-4 text-purple-400">
                <FaStar />
              </div>
              <h4 className="text-xl font-medium text-white mb-3">
                პრემიუმ პაკეტი
              </h4>
              <div className="text-slate-300 text-sm mb-4 leading-relaxed space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>საკომუნიკაციო მიზნების ჩამოყალიბება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>კონტენტის შექმნა</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>ვიდეო გადაღება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>ფოტო გადაღება</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>სოციალური მედიის მენეჯმენტი</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>სოციალური მედიის პოსტერების შექმნა</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-400 text-xs" />
                  <span>ლოგოს შექმნა</span>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-2xl font-bold text-purple-400 mt-6">
                  2000₾
                  <span className="text-sm text-slate-400"> საორიენტაციო</span>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  ფასები ცვალებადია და დამოკიდებულია მომხმარებლის მოთხოვნებსა და
                  მიზნებზე.
                </div>
              </div>
            </div>
          </div>
          {/* Services Grid */}
          <div className="max-w-6xl mx-auto mb-32 mt-18">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">
                რას გთავაზობთ
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
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
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
                სოციალური მედია პლატფორმები
              </h2>
              <p className="text-slate-400">
                ყველა მთავარ პლატფორმაზე შენი ბრენდის წარმატებული წარდგენა
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
                ინდივიდუალური ფასები
              </h3>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                ყველა პროექტი უნიკალურია. ჩვენი მიზანია მაქსიმალური ღირებულების
                მიწოდება კლიენტის ბიუჯეტისა და მოთხოვნების მიხედვით.
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
                    თქვენი მოთხოვნების მიხედვით
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    ბაზისური ბრენდინგიდან სრულ მარკეტინგ სტრატეგიამდე - ყველა
                    პროექტს განსხვავებული მიდგომა სჭირდება.
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4 text-green-400">
                    <FaBolt />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    სწრაფი შეფასება
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    უფასო კონსულტაციის მაქსიმუმ 12 საათში მიიღებთ ზუსტ ფასს და
                    პროექტის გეგმას.
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4 text-purple-400">
                    <FaCog />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    გამჭირვალე პროცესი
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    ჩვენი მიზანია, ყველა ეტაპი იყოს მაქსიმალურად ღია და
                    გასაგები. ნდობაზე დაფუძნებული თანამშრომლობა ყოველთვის
                    მომგებიანია.
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
                მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?
              </h3>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-12">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket />
                  პროექტის დაწყება
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
