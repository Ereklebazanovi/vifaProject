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
import TechStackShowcase from "../components/TechStackShowcase";

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
      />

      {/* Silk Shader Background */}
      <div className="fixed inset-0 z-0">
        <Silk
          speed={3}
          scale={1.2}
          color="#0f172a"
          noiseIntensity={0.8}
          rotation={0.1}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Subtle blue accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black"></div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          }
          25% {
            background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);
          }
          50% {
            background: linear-gradient(135deg, #334155 0%, #475569 50%, #334155 100%);
          }
          75% {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #334155 100%);
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

        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 35s ease-in-out infinite;
        }

        .animate-float-diagonal {
          animation: float-diagonal 25s ease-in-out infinite;
        }

        /* Reduce animation on mobile and slow connections */
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .animate-gradient-shift,
          .animate-float-slow,
          .animate-float-reverse,
          .animate-float-diagonal {
            animation: none;
          }
        }
      `}</style>

      <div className="relative z-10 min-h-screen mt-50">
        {/* Main container with top padding to account for fixed navbar */}
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 language-transition language-fade-in ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-15">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center">
                {/* Unified container for both texts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center gap-2 sm:gap-3 md:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {/* Left side - Creative text */}
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-widest"
                    style={{
                      fontFamily:
                        'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      letterSpacing: "0.09em",
                    }}
                  >
                    creative{" "}
                  </h2>

               

                  {/* Right side - Rotating text box */}
                  <div className="ml-2 sm:ml-3">
                    <RotatingText
                      texts={[
                        "𝕥𝕙𝕚𝕟𝕜𝕚𝕟𝕘",
                        "𝕤𝕠𝕝𝕦𝕥𝕚𝕠𝕟𝕤",
                        "𝕚𝕟𝕟𝕠𝕧𝕒𝕥𝕚𝕠𝕟",
                        "𝕗𝕦𝕥𝕦𝕣𝕖",
                        "𝕕𝕖𝕤𝕚𝕘𝕟",
                        "𝕧𝕚𝕤𝕚𝕠𝕟",
                        "𝕚𝕕𝕖𝕒𝕤",
                      ]}
                      mainClassName="px-4 py-2 bg-slate-900/30 backdrop-blur-md text-blue-400 justify-center items-center rounded-lg font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-lg tracking-normal shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all duration-300 hover:scale-102 border border-blue-400/20 hover:border-blue-400/40"
                      elementLevelClassName="inline-block transition-all duration-200 ease-out"
                      style={{
                        fontFamily:
                          "Inter, system-ui, -apple-system, sans-serif",
                        fontWeight: "500",
                      }}
                      staggerFrom="center"
                      initial={{
                        y: "120%",
                        opacity: 0,
                        rotateX: 90,
                        scale: 0.8,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        scale: 1,
                      }}
                      exit={{
                        y: "-120%",
                        opacity: 0,
                        rotateX: -90,
                        scale: 0.8,
                      }}
                      staggerDuration={0.035}
                      splitLevelClassName="overflow-hidden perspective-1000"
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        mass: 0.8,
                      }}
                      rotationInterval={3000}
                    />
                  </div>
                </motion.div>
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

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Website Development - პირველი პრიორიტეტი */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 via-slate-800/40 to-slate-900/60 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                    <FaCode className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      ვებსაიტის შექმნა
                    </h4>
                    <div className="text-blue-400 font-medium">
                      პროფესიონალური ვებგვერდები
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-loose">
                  თანამედროვე, სწრაფი და SEO-ოპტიმიზირებული ვებსაიტი, რომელიც
                  ზრდის თქვენი ბიზნესის ხილვადობას და მომხმარებლების ჩართულობას.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-300">
                    <FaMobile className="text-blue-400 mr-3 flex-shrink-0" />
                    მობილური ოპტიმიზაცია
                  </li>
                  <li className="flex items-center text-slate-300">
                    <FaChartLine className="text-blue-400 mr-3 flex-shrink-0" />
                    SEO-ღია სტრუქტურა
                  </li>
                  <li className="flex items-center text-slate-300">
                    <FaBolt className="text-blue-400 mr-3 flex-shrink-0" />
                    სწრაფი ჩატვირთვა
                  </li>
                  <li className="flex items-center text-slate-300">
                    <FaCog className="text-blue-400 mr-3 flex-shrink-0" />
                    მარტივი ადმინ პანელი
                  </li>
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="text-slate-400">
                    <span className="text-sm">ფასი დამოკიდებულია</span>
                    <div className="text-lg font-medium text-blue-400">
                      პროექტზე
                    </div>
                  </div>
                  <Link
                    to="/start-project"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
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
                className="bg-gradient-to-br from-cyan-950/30 via-slate-800/40 to-slate-900/60 rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-cyan-500/30 transition-colors">
                    <FaBrain className="text-cyan-400 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      AI ჩატბოტი
                    </h4>
                    <div className="text-cyan-400 font-medium">
                      ავტომატური მომხმარებელთა მხარდაჭერა
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-loose">
                  ინტელექტუალური ჩატბოტი, რომელიც 24/7 პასუხობს მომხმარებელთა
                  კითხვებს და უზრუნველყოფს სწრაფ მხარდაჭერას.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-300">
                    <FaRocket className="text-cyan-400 mr-3 flex-shrink-0" />
                    დაფუძნებული თქვენს ბიზნეს ლოგიკაზე
                  </li>
                  <li className="flex items-center text-slate-300">
                    <FaBullseye className="text-cyan-400 mr-3 flex-shrink-0" />
                    ინტელექტუალური პასუხები
                  </li>
                  <li className="flex items-center text-slate-300">
                    <FaDatabase className="text-cyan-400 mr-3 flex-shrink-0" />
                    ახალი კლიენტების მოზიდვა და გაყიდვების ზრდა
                  </li>
                  <li className="flex items-center text-slate-300">
                    <FaFacebook className="text-cyan-400 mr-3 flex-shrink-0" />
                    Facebook/Instagram/WhatsApp ინტეგრაცია
                  </li>
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="text-slate-400">
                    <span className="text-sm">ფასი დამოკიდებულია</span>
                    <div className="text-lg font-medium text-blue-400">
                      პროექტზე
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavigation("/services/ai-chatbot")}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors font-medium cursor-pointer"
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

          {/* Interactive Technology Stack Showcase */}
          <div className="!max-w-7xl mx-auto mb-32">
            <TechStackShowcase />
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
