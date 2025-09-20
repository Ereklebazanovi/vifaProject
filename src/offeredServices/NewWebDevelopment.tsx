"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import BeautifulBackground from "../components/BeautifulBackground";
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
  FaShoppingCart
} from "react-icons/fa";
import {
  SiFirebase,
  SiTypescript,
  SiVercel,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql
} from "react-icons/si";
import SEO from "../components/SEO";

const NewWebDevelopment: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const [activeService, setActiveService] = useState<number>(0);

  // Main web development services
  const services = [
    {
      id: "frontend-development",
      icon: <FaReact />,
      title: "Frontend Development",
      description: "მოდერნული და ინტერაქტიული ვებ ინტერფეისები",
      color: "blue",
      features: ["React/Next.js", "TypeScript", "Responsive Design", "PWA"]
    },
    {
      id: "backend-development",
      icon: <FaServer />,
      title: "Backend Development",
      description: "მძლავრი სერვერული არქიტექტურა",
      color: "green",
      features: ["Node.js", "API Development", "Database Design", "Cloud Services"]
    },
    {
      id: "mobile-responsive",
      icon: <FaMobile />,
      title: "Mobile Responsive",
      description: "ყველა მოწყობილობაზე სრულყოფილი გამოვლენა",
      color: "purple",
      features: ["Mobile First", "Touch Optimized", "Fast Loading", "Cross-Platform"]
    },
    {
      id: "ecommerce-solutions",
      icon: <FaShoppingCart />,
      title: "E-commerce",
      description: "ონლაინ ვაჭრობის სრული ეკოსისტემა",
      color: "orange",
      features: ["Shopping Cart", "Payment Gateway", "Inventory", "Analytics"]
    },
    {
      id: "cms-development",
      icon: <FaCog />,
      title: "CMS სისტემები",
      description: "კონტენტის მართვის მარტივი სისტემები",
      color: "indigo",
      features: ["Admin Panel", "Content Editor", "User Management", "SEO Tools"]
    },
    {
      id: "database-design",
      icon: <FaDatabase />,
      title: "Database Design",
      description: "ოპტიმიზებული მონაცემთა ბაზები",
      color: "red",
      features: ["SQL/NoSQL", "Data Modeling", "Performance", "Security"]
    },
    {
      id: "ui-ux-design",
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description: "მომხმარებელზე ორიენტირებული დიზაინი",
      color: "pink",
      features: ["User Research", "Wireframes", "Prototypes", "Design Systems"]
    },
    {
      id: "performance-optimization",
      icon: <FaBolt />,
      title: "Performance",
      description: "ულტრასწრაფი ვებსაიტები",
      color: "yellow",
      features: ["Speed Optimization", "SEO", "Core Web Vitals", "CDN"]
    }
  ];

  // Technology stack
  const technologies = [
    { icon: <SiReact />, name: "React", color: "blue" },
    { icon: <SiTypescript />, name: "TypeScript", color: "blue" },
    { icon: <SiNodedotjs />, name: "Node.js", color: "green" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "cyan" },
    { icon: <SiMongodb />, name: "MongoDB", color: "green" },
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "blue" },
    { icon: <SiFirebase />, name: "Firebase", color: "orange" },
    { icon: <SiVercel />, name: "Vercel", color: "black" }
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      orange: "border-orange-400 bg-orange-500/10",
      indigo: "border-indigo-400 bg-indigo-500/10",
      red: "border-red-400 bg-red-500/10",
      pink: "border-pink-400 bg-pink-500/10",
      yellow: "border-yellow-400 bg-yellow-500/10",
      cyan: "border-cyan-400 bg-cyan-500/10",
      black: "border-gray-400 bg-gray-500/10"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400",
      orange: "text-orange-400",
      indigo: "text-indigo-400",
      red: "text-red-400",
      pink: "text-pink-400",
      yellow: "text-yellow-400",
      cyan: "text-cyan-400",
      black: "text-gray-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title="Web Development Services - VIFA"
        description="Professional web development services including React, Node.js, mobile responsive design, and modern web applications."
      />

      {/* Beautiful Animated Background - Full Page Coverage */}
      <BeautifulBackground
        className="fixed inset-0 z-0"
        variant="green"
      />

      <div className="relative z-10 min-h-screen mt-15">
        {/* Main container with top padding to account for fixed navbar */}
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 pb-10 ${getTransitionClasses()}`}>
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <div className="mb-8">
                <span className="text-blue-400 text-sm font-medium tracking-wider uppercase border border-blue-400/30 px-4 py-2 rounded">
                  Web Development Agency
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
                შექმენი თქვენი{" "}
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-medium">
                  ციფრული ბიზნესი
                </span>
                <br />
                <span className="text-slate-300 text-3xl md:text-5xl">მომავლისთვის</span>
              </h1>

              <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                დღევანდელ ციფრულ სამყაროში, თქვენი ვებსაიტი არის თქვენი ბიზნესის სახე.
                ჩვენ ვქმნით მოდერნულ, სწრაფ და ეფექტურ ვებ აპლიკაციებს, რომლებიც
                ზრდის თქვენს ბიზნესს და აუმჯობესებს მომხმარებელთა გამოცდილებას.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
                  <div className="text-sm text-slate-400">განხორციელებული პროექტი</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99%</div>
                  <div className="text-sm text-slate-400">კმაყოფილი კლიენტები</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">10x</div>
                  <div className="text-sm text-slate-400">პერფორმანსის გაუმჯობესება</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                  <div className="text-sm text-slate-400">ტექნიკური მხარდაჭერა</div>
                </div>
              </div>

         
            </div>

            {/* Development Process Visualization */}
            <div className="relative">
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {/* Step 1: Planning */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-blue-400/30 rounded-2xl flex items-center justify-center bg-blue-500/5 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaChartLine className="text-blue-400 text-3xl mb-2 mx-auto" />
                      <div className="text-blue-400 text-xs font-medium">დაგეგმვა</div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 2: Design */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-purple-400/30 rounded-2xl flex items-center justify-center bg-purple-500/5 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaPaintBrush className="text-purple-400 text-3xl mb-2 mx-auto" />
                      <div className="text-purple-400 text-xs font-medium">დიზაინი</div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 3: Development */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-green-400/30 rounded-2xl flex items-center justify-center bg-green-500/5 group-hover:border-green-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaCode className="text-green-400 text-3xl mb-2 mx-auto" />
                      <div className="text-green-400 text-xs font-medium">დეველოპმენტი</div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 4: Launch */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-orange-400/30 rounded-2xl flex items-center justify-center bg-orange-500/5 group-hover:border-orange-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaRocket className="text-orange-400 text-3xl mb-2 mx-auto" />
                      <div className="text-orange-400 text-xs font-medium">ლონჩი</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → UI/UX დიზაინი → ტექნიკური განხორციელება → ტესტირება და ლონჩი
                </p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div id="services" className="max-w-7xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">
                ჩვენი სერვისები
              </h2>
              <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-12 text-sm text-slate-400">
                <div>
                  <span className="text-2xl font-bold text-blue-400">8+</span> სერვისი
                </div>
                <div>
                  <span className="text-2xl font-bold text-green-400">100%</span> ხარისხი
                </div>
                <div>
                  <span className="text-2xl font-bold text-purple-400">24/7</span> მხარდაჭერა
                </div>
              </div>
            </div>

            {/* Services Grid - Fixed height for all cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
                  onClick={() => setActiveService(index)}
                >
                  <div
                    className={`p-6 rounded-xl border-2 h-44 flex flex-col justify-between ${getColorClass(service.color)}
                    ${activeService === index ? 'border-opacity-100 scale-105' : 'border-opacity-30'}
                    transition-all duration-300 group-hover:border-opacity-100`}
                  >
                    <div>
                      <div className={`text-3xl mb-4 ${getTextColorClass(service.color)}`}>
                        {service.icon}
                      </div>
                      <h3 className="text-white font-medium text-lg mb-2 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Service Display */}
            <div className="border border-slate-600 bg-slate-900/30 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    {services[activeService].title}
                  </h3>
                  <p className={`${getTextColorClass(services[activeService].color)}`}>
                    {services[activeService].description}
                  </p>
                </div>
                <div
                  className={`w-20 h-20 border-2 rounded-xl ${getColorClass(services[activeService].color)}
                  flex items-center justify-center animate-pulse`}
                >
                  <span className={`text-2xl ${getTextColorClass(services[activeService].color)}`}>
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
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">
                ტექნოლოგიები რაც ვიყენებთ
              </h2>
              <p className="text-slate-400">
                მოდერნული და სანდო ტექნოლოგიები ყველაზე კარგი შედეგისთვის
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className={`group cursor-pointer p-4 rounded-xl border-2 ${getColorClass(tech.color)}
                  border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-110`}
                >
                  <div className="text-center">
                    <div className={`text-3xl mb-2 ${getTextColorClass(tech.color)} group-hover:scale-110 transition-transform duration-300`}>
                      {tech.icon}
                    </div>
                    <div className="text-white font-medium text-sm">
                      {tech.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-light text-white mb-6">
                მზად ხართ თქვენი ციფრული ბიზნესის ტრანსფორმაციისთვის?
              </h3>
              <p className="text-lg text-slate-400 mb-8">
                დაუკავშირდით ჩვენს გუნდს და დავიწყოთ თქვენი მომავლისგან ვებსაიტის შექმნა დღესვე.
                გარანტირებული ხარისხი და სწრაფი ვადები.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket />
                  პროექტის დაწყება
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaArrowRight />
                  მეტი ინფორმაცია
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewWebDevelopment;