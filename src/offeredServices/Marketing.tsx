"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
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
  FaLinkedin,
  FaRocket,
  FaArrowRight,
  FaCheckCircle,
  FaBullseye,
  FaBolt,
  FaCog,
} from "react-icons/fa";
import SEO from "../components/SEO";
import Silk from "../components/Silk";
import TrueFocus from "../components/TrueFocus";

const Marketing: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const [activeService, setActiveService] = useState<number>(0);

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
    { icon: <FaLinkedin />, name: "LinkedIn", color: "blue" },
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
      />

      {/* Silk Shader Background */}
      <div className="fixed inset-0 z-0">
        <Silk
          speed={4}
          scale={1.1}
          color="#2d1b69"
          noiseIntensity={0.9}
          rotation={0.15}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55"></div>
        {/* Subtle purple accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-slate-900/30"></div>
      </div>

      <style>{`
        @keyframes gradient-shift-marketing {
          0%, 100% {
            background: linear-gradient(135deg, #581c87 0%, #1e293b 50%, #581c87 100%);
          }
          25% {
            background: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #ec4899 100%);
          }
          50% {
            background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #d946ef 100%);
          }
          75% {
            background: linear-gradient(135deg, #6366f1 0%, #581c87 50%, #7c3aed 100%);
          }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -20px) rotate(90deg); }
          50% { transform: translate(-20px, -40px) rotate(180deg); }
          75% { transform: translate(-40px, 20px) rotate(270deg); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-30px, 20px) rotate(-90deg); }
          50% { transform: translate(20px, 40px) rotate(-180deg); }
          75% { transform: translate(40px, -20px) rotate(-270deg); }
        }

        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -30px) scale(1.1); }
          50% { transform: translate(-30px, -50px) scale(0.9); }
          75% { transform: translate(-50px, 30px) scale(1.05); }
        }

        .animate-gradient-shift-marketing {
          animation: gradient-shift-marketing 25s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 28s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 32s ease-in-out infinite;
        }

        .animate-float-diagonal {
          animation: float-diagonal 30s ease-in-out infinite;
        }

        /* Reduce animation on mobile and slow connections */
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .animate-gradient-shift-marketing,
          .animate-float-slow,
          .animate-float-reverse,
          .animate-float-diagonal {
            animation: none;
          }
        }
      `}</style>

      <div className="relative z-10 min-h-screen mt-17">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32 mt-20">
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light pt-10"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  lineHeight: "1.7",
                }}
              >
                დღევანდელ ციფრულ ეპოქაში თქვენი ბრენდი უნდა იყოს ხილული,
                მიმზიდველი და დამაჯერებელი. ჩვენ ვქმნით სრულყოფილ ციფრულ
                ეკოსისტემას თქვენი ბიზნესისთვის — ვიდეოკონტენტიდან დაწყებული
                სოციალურ მედიამდე.{" "}
              </motion.p>
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
                  კომუნიკაციის მიზნებზე.
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
                  კომუნიკაციის მიზნებზე.
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
                  კომუნიკაციის მიზნებზე.
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
                    გამჭვირვალე პროცესი
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
              <h3 className="text-3xl font-light text-white mb-4">
                კონსულტაცია და თანამშრომლობის დაგეგმვა უფასოა
              </h3>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-light text-blue-800 mb-6">
                მზად ხართ თქვენი ციფრული ბიზნესის ტრანსფორმაციისთვის?
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
