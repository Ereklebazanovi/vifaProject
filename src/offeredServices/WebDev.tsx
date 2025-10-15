"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import {
  FaReact,
  FaMobile,
  FaRocket,
  FaCode,
  FaDatabase,
  FaPaintBrush,
  FaCog,
  FaCheckCircle,
  FaArrowRight,
  FaChartLine,
  FaBolt,
  FaServer,
  FaBrain,
  FaBullseye,
  FaFacebook,
} from "react-icons/fa";
import {
  SiFirebase,
  SiTypescript,
  SiVercel,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";
import SEO from "../components/SEO";
import RotatingText from "../components/RotatingText";
import Silk from "../components/Silk";
import TrueFocus from "../components/TrueFocus";

const WebDev: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const { startNavigation, stopNavigation } = useNavigation();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<number>(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (path: string) => {
    startNavigation();
    navigate(path);
    // Very short timeout for fast UX
    setTimeout(() => stopNavigation(), 300);
  };

  // Main web development services
  const services = [
    {
      id: "frontend-development",
      icon: <FaReact />,
      title: "Frontend Development",
      description: "მოდერნული და ინტერაქტიული ვებ ინტერფეისები",
      color: "blue",
      features: ["React/Next.js", "TypeScript", "Responsive Design", "PWA"],
    },
    {
      id: "backend-development",
      icon: <FaServer />,
      title: "Backend Development",
      description: "მძლავრი სერვერული არქიტექტურა",
      color: "green",
      features: [
        "Node.js",
        "API Development",
        "Database Design",
        "Cloud Services",
      ],
    },
    {
      id: "mobile-responsive",
      icon: <FaMobile />,
      title: "Mobile Responsive",
      description: "იდეალური ხილვადობა ყველა მოწყობილობაზე",
      color: "purple",
      features: [
        "Mobile First",
        "Touch Optimized",
        "Fast Loading",
        "Cross-Platform",
      ],
    },
    {
      id: "ai-integrations",
      icon: <FaBrain />,
      title: "AI ინტეგრაციები",
      description: "მარტივი კავშირი ხელოვნური ინტელექტის API-ებთან",
      color: "cyan",
      features: [
        "Chatbot APIs",
        "AI Analysis",
        "Smart Automation",
        "Custom AI",
      ],
    },
    {
      id: "cms-development",
      icon: <FaCog />,
      title: "CMS სისტემები",
      description: "კონტენტის მართვა მარტივად და ეფექტურად",
      color: "indigo",
      features: [
        "Admin Panel",
        "Content Editor",
        "User Management",
        "SEO Tools",
      ],
    },
    {
      id: "database-design",
      icon: <FaDatabase />,
      title: "Database Design",
      description: "ოპტიმიზებული მონაცემთა ბაზები",
      color: "red",
      features: ["SQL/NoSQL", "Data Modeling", "Performance", "Security"],
    },
    {
      id: "ui-ux-design",
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description: "მომხმარებელზე ორიენტირებული დიზაინი",
      color: "pink",
      features: ["User Research", "Wireframes", "Prototypes", "Design Systems"],
    },
    {
      id: "performance-optimization",
      icon: <FaBolt />,
      title: "Performance",
      description: "ულტრასწრაფი ვებსაიტები",
      color: "yellow",
      features: ["Speed Optimization", "SEO", "Core Web Vitals", "CDN"],
    },
  ];

  // Technology stack - მხოლოდ ის ტექნოლოგიები რომლებსაც ნამდვილად ვიყენებთ
  const technologies = [
    { icon: <SiReact />, name: "React", color: "blue" },
    { icon: <SiTypescript />, name: "TypeScript", color: "blue" },
    { icon: <SiNodedotjs />, name: "Node.js", color: "green" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "cyan" },
    { icon: <SiFirebase />, name: "Firebase", color: "emerald" },
    { icon: <SiVercel />, name: "Vercel", color: "black" },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      emerald: "border-emerald-400 bg-emerald-500/10",
      violet: "border-violet-400 bg-violet-500/10",
      indigo: "border-indigo-400 bg-indigo-500/10",
      red: "border-red-400 bg-red-500/10",
      pink: "border-pink-400 bg-pink-500/10",
      yellow: "border-yellow-400 bg-yellow-500/10",
      cyan: "border-cyan-400 bg-cyan-500/10",
      black: "border-gray-400 bg-gray-500/10",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400",
      emerald: "text-emerald-400",
      violet: "text-violet-400",
      indigo: "text-indigo-400",
      red: "text-red-400",
      pink: "text-pink-400",
      yellow: "text-yellow-400",
      cyan: "text-cyan-400",
      black: "text-gray-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title="Web Development Services - VIFA"
        description="Professional web development services including React, Node.js, mobile responsive design, and modern web applications."
        url="https://vifadigital.ge/services/web-development"
      />

      {/* Professional Tech Background - Ultra Dark */}
      <div className="fixed inset-0 z-0">
        {/* Ultra dark base */}
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>

        {/* Very subtle tech grid overlay */}
        <div className="absolute inset-0 tech-grid opacity-5"></div>

        {/* Minimal animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/15 via-transparent to-purple-950/15 animate-pulse-slow"></div>

        {/* Darker accent overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-950/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-950/20 to-transparent"></div>

        {/* Very subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-2"></div>
      </div>

      <style>{`
        /* Professional tech grid pattern */
        .tech-grid {
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
          100% { background-position: 100px 100px, 100px 100px, 20px 20px, 20px 20px; }
        }

        /* Subtle noise texture */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Slow pulse animation - darker */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Performance optimizations */
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .tech-grid,
          .animate-pulse-slow {
            animation: none;
          }
          .bg-noise {
            display: none;
          }
        }

        /* Additional professional elements */
        .tech-accent {
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 50%,
            rgba(59, 130, 246, 0.1) 100%);
        }
      `}</style>

      <div className="relative z-10 min-h-screen mt-50">
        {/* Main container with top padding to account for fixed navbar */}
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 language-transition language-fade-in ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <div className="mb-8 flex justify-center">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                  <TrueFocus
                    sentence="WEB DEVELOPMENT"
                    blurAmount={4}
                    borderColor="#8b5cf6"
                    glowColor="rgba(139, 92, 246, 0.6)"
                    animationDuration={0.8}
                    pauseBetweenAnimations={2}
                  />
                </div>
              </div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 mt-14"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    Individual
                  </div>
                  <div className="text-sm text-slate-400">პირადი მიდგომა</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    Quality
                  </div>
                  <div className="text-sm text-slate-400">
                    ხარისხზე ფოკუსირება
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    Fresh
                  </div>
                  <div className="text-sm text-slate-400">
                    ახალი ტექნოლოგიები
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    Flexible
                  </div>
                  <div className="text-sm text-slate-400">მოქნილი ვადები</div>
                </div>
              </motion.div>
            </div>

            {/* Development Process Visualization */}
            <div className="relative">
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {/* Step 1: Planning */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-blue-400/30 rounded-2xl flex items-center justify-center bg-blue-500/5 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaChartLine className="text-blue-400 text-3xl mb-2 mx-auto" />
                      <div className="text-blue-400 text-xs font-medium">
                        დაგეგმვა
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 2: Design */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-purple-400/30 rounded-2xl flex items-center justify-center bg-purple-500/5 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaPaintBrush className="text-purple-400 text-3xl mb-2 mx-auto" />
                      <div className="text-purple-400 text-xs font-medium">
                        დიზაინი
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 3: Development */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-green-400/30 rounded-2xl flex items-center justify-center bg-green-500/5 group-hover:border-green-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaCode className="text-green-400 text-3xl mb-2 mx-auto" />
                      <div className="text-green-400 text-xs font-medium">
                        დეველოპმენტი
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 4: Launch */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-violet-400/30 rounded-2xl flex items-center justify-center bg-violet-500/5 group-hover:border-violet-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaRocket className="text-violet-400 text-3xl mb-2 mx-auto" />
                      <div className="text-violet-400 text-xs font-medium">
                        გაშვება
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → UI/UX დიზაინი →
                  ტექნიკური განხორციელება → ტესტირება და გაშვება
                </p>
              </div>
            </div>
          </div>

          {/* Main Services Highlight - რაღაც ასე უნდა იყოს პიორიტეტი */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h3
                className="text-4xl font-bold text-white mb-6 tracking-tight"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                ჩვენი ძირითადი სერვისები
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {/* Website Development - პირველი პრიორიტეტი */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 via-slate-800/50 to-slate-900/60 rounded-2xl p-6 sm:p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02] group backdrop-blur-sm"
              >
                {/* Header Section - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4 sm:gap-0">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center sm:mr-4 group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                    <FaCode className="text-blue-400 text-2xl" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      ვებსაიტის შექმნა
                    </h4>
                    <div className="text-blue-400 font-medium text-sm sm:text-base">
                      პროფესიონალური ვებგვერდები
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                  თანამედროვე, სწრაფი და SEO-ოპტიმიზირებული ვებსაიტი, რომელიც
                  ზრდის თქვენი ბიზნესის ხილვადობას და მომხმარებლების ჩართულობას.
                </p>

                {/* Features - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center text-slate-300">
                    <FaMobile className="text-blue-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">მობილური ოპტიმიზაცია</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <FaChartLine className="text-blue-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">SEO-ღია სტრუქტურა</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <FaBolt className="text-blue-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">სწრაფი ჩატვირთვა</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <FaCog className="text-blue-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">მარტივი ადმინ პანელი</span>
                  </div>
                </div>

                {/* Footer - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-700">
                  <div className="text-slate-400 text-center sm:text-left">
                    <span className="text-xs sm:text-sm">
                      ფასი დამოკიდებულია
                    </span>
                    <div className="text-base sm:text-lg font-medium text-blue-400">
                      პროექტზე
                    </div>
                  </div>
                  <Link
                    to="/start-project"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium text-center text-sm sm:text-base w-full sm:w-auto"
                  >
                    დაიწყე ახლავე
                  </Link>
                </div>
              </motion.div>

              {/* AI Chatbot - მეორე პრიორიტეტი */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-cyan-950/30 via-slate-800/50 to-slate-900/60 rounded-2xl p-6 sm:p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.02] group backdrop-blur-sm"
              >
                {/* Header Section - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4 sm:gap-0">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center sm:mr-4 group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
                    <FaBrain className="text-cyan-400 text-2xl" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      AI ჩატბოტი
                    </h4>
                    <div className="text-cyan-400 font-medium text-sm sm:text-base">
                      ავტომატური მომხმარებელთა მხარდაჭერა
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                  ინტელექტუალური ჩატბოტი, რომელიც 24/7 პასუხობს მომხმარებელთა
                  კითხვებს და უზრუნველყოფს სწრაფ მხარდაჭერას.
                </p>

                {/* Features - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center text-slate-300">
                    <FaRocket className="text-cyan-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">დაფუძნებული ბიზნეს ლოგიკაზე</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <FaBullseye className="text-cyan-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">ინტელექტუალური პასუხები</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <FaDatabase className="text-cyan-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">კლიენტების მოზიდვა</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <FaFacebook className="text-cyan-400 mr-3 flex-shrink-0 text-sm" />
                    <span className="text-sm">Social Media ინტეგრაცია</span>
                  </div>
                </div>

                {/* Footer - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-700">
                  <div className="text-slate-400 text-center sm:text-left">
                    <span className="text-xs sm:text-sm">
                      ფასი დამოკიდებულია
                    </span>
                    <div className="text-base sm:text-lg font-medium text-cyan-400">
                      პროექტზე
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavigation("/services/ai-chatbot")}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors font-medium cursor-pointer text-center text-sm sm:text-base w-full sm:w-auto"
                  >
                    მეტი ინფორმაცია
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Pricing Approach Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3
                className="text-3xl font-semibold text-white mb-4 tracking-tight"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                ინდივიდუალური ფასები
              </h3>
            </div>
            {/* ერე */}
            {/* Why Individual Pricing */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600/30 mb-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4 text-blue-400">
                    <FaBullseye />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    თქვენი პროექტის სპეციფიკა
                  </h4>
                  <p className="text-slate-300 text-sm leading-loose">
                    თითოეული პროექტი მოითხოვს უნიკალურ ანალიზს და სპეციფიკურ
                    სტრატეგიას, რათა მივაღწიოთ მაქსიმალურ შედეგს.
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4 text-green-400">
                    <FaBolt />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    პროექტის სწრაფი შეფასება
                  </h4>
                  <p className="text-slate-300 text-sm leading-loose">
                    უფასო კონსულტაციის შემდეგ, ჩვენ გარანტიას გაძლევთ, რომ
                    მაქსიმუმ 12 საათში მიიღებთ ზუსტ ფინანსურ შეთავაზებას და
                    დეტალურ გეგმას პროექტის განსახორციელებლად.
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4 text-purple-400">
                    <FaCog />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">
                    პროცესის გამჭვირვალობა{" "}
                  </h4>
                  <p className="text-slate-300 text-sm leading-loose">
                    ჩვენი თანამშრომლობა ეფუძნება მაქსიმალურ ღიაობას მუშაობის
                    ყველა ეტაპზე. მკაფიო პროცესი უზრუნველყოფს ორმხრივ მომგებიან
                    და ეფექტურ შედეგებს.
                  </p>
                </div>
              </div>
            </div>

            {/* Price Ranges */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Landing Pages */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
                <div className="text-4xl mb-4 text-blue-400">
                  <FaRocket />
                </div>
                <h4 className="text-xl font-medium text-white mb-3">
                  სავიზიტო ვებსაიტი
                </h4>
                <p className="text-slate-300 text-sm mb-4 leading-loose">
                  კომპაქტური და ეფექტური ვებგვერდი 2-4 გვერდით, რომელიც
                  შექმნილია თქვენი სერვისების ან პროდუქტების მიმზიდველი
                  პრეზენტაციისთვის. იდეალური გამოსავალი მცირე ბიზნესისთვის ან
                  პირადი ბრენდისთვის, რომელიც სწრაფად გაზრდის თქვენს ონლაინ
                  ხილვადობას და მოიზიდავს ახალ კლიენტებს.
                </p>
                <div className="text-2xl font-bold text-blue-400 mt-16">
                  300₾<span className="text-sm text-slate-400">-დან</span>
                </div>
              </div>

              {/* Corporate Websites */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
                <div className="text-4xl mb-4 text-green-400">
                  <FaCode />
                </div>
                <h4 className="text-xl font-medium text-white mb-3">
                  სტანდარტული ბიზნეს ვებსაიტი
                </h4>
                <p className="text-slate-300 text-sm mb-4 leading-loose">
                  სრულფასოვანი და პროფესიონალური ვებგვერდი თქვენი კომპანიისთვის.
                  მრავალგვერდიანი სტრუქტურა, მარტივი კონტენტის მართვის სისტემა
                  (CMS), SEO ოპტიმიზაცია საძიებო სისტემებში უმაღლესი
                  პოზიციებისთვის და მოქნილი ადმინისტრაციული პანელი. მარტივად
                  მართვადი კონტენტი, ონლაინ ხილვადობა და მეტი პოტენციური
                  მომხარებელი.
                </p>
                <div className="text-2xl font-bold text-green-400 mt-9">
                  600₾<span className="text-sm text-slate-400">-დან</span>
                </div>
              </div>

              {/* AI Chatbots */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                <div className="text-4xl mb-4 text-purple-400">
                  <FaBrain />
                </div>
                <h4 className="text-xl font-medium text-white mb-3">
                  AI ჩატბოტი
                </h4>
                <p className="text-slate-300 text-sm mb-4 leading-loose">
                  ინტელექტუალური ასისტენტი სოციალურ ქსელებში, რომელიც
                  უზრუნველყოფს სწრაფ და პროფესიონალურ პასუხებს თქვენი
                  მომხმარებლებისთვის. დაფუძნებულია თქვენი ბიზნესის ლოგიკაზე და
                  ხშირად დასმულ შეკითხვებზე. ავტომატურად ამცირებს რესურსების
                  ხარჯს, ზრდის კლიენტების კმაყოფილებას და შესაბამისად იზრდება
                  გაყიდვები.
                </p>
                <div className="text-2xl font-bold text-purple-400 mt-16">
                  300₾<span className="text-sm text-slate-400">-დან</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-15">
              <h3 className="text-3xl font-light text-white">
                კონსულტაცია და თანამშრომლობის დაგეგმვა უფასოა
              </h3>
            </div>
          </div>

          {/* Services Grid */}
          <div id="services" className="!max-w-7xl mx-auto mb-32">
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
                    className={`p-6 rounded-xl border-2 h-44 flex flex-col justify-between ${getColorClass(
                      service.color
                    )}
                    ${
                      activeService === index
                        ? "border-opacity-100 scale-105"
                        : "border-opacity-30"
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
                    <p className="text-slate-300 text-sm leading-loose">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Service Display */}
            <div className="border border-slate-700/30 bg-black/50 p-8 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    {services[activeService].title}
                  </h3>
                  <p
                    className={`${getTextColorClass(
                      services[activeService].color
                    )}`}
                  >
                    {services[activeService].description}
                  </p>
                </div>
                <div
                  className={`w-20 h-20 border-2 rounded-xl ${getColorClass(
                    services[activeService].color
                  )}
                  flex items-center justify-center animate-pulse`}
                >
                  <span
                    className={`text-2xl ${getTextColorClass(
                      services[activeService].color
                    )}`}
                  >
                    {services[activeService].icon}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services[activeService].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400 text-sm" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="!max-w-7xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">
                ტექნოლოგიები
              </h2>
              <p className="text-slate-400">
                მოდერნული და სანდო ტექნოლოგიები, რომლებსაც ნამდვილად ვიყენებთ
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer p-6 rounded-xl border-2 ${getColorClass(
                    tech.color
                  )}
                  border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105`}
                >
                  <div className="text-center">
                    <div
                      className={`text-4xl mb-3 ${getTextColorClass(
                        tech.color
                      )} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {tech.icon}
                    </div>
                    <div className="text-white font-medium text-base">
                      {tech.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-light mb-6">
                მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?
              </h3>

              <div className="flex justify-center gap-4 mt-11 mb-7">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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

export default WebDev;
