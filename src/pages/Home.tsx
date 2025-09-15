import React from "react";
import { Link } from "react-router-dom";
import {
  
  FaChartLine,
  FaInstagram,
  FaCode,
  FaRocket,
  FaUsers,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import OfficeLocation from "../ui/OfficeLocation";
import SEO from "../components/SEO";
import { siteConfig } from "../config/siteConfig";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import WebDevelopment from "../offeredServices/WebDevelopment";
import DigitalAdvertising from "../offeredServices/DigitalAdvertising";
import SocialMediaService from "../offeredServices/SocialMediaService";

// Lightweight CSS animations instead of framer-motion
const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    description: t("seo.home.description"),
    url: siteConfig.url,
    logo: `${siteConfig.url}/vifa.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location.countryCode,
      addressLocality: siteConfig.location.city,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.email,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ],
    offers: {
      "@type": "Offer",
      category: "Digital Marketing Services",
    },
  };

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        keywords={t("seo.home.keywords")}
        type="website"
        structuredData={homeStructuredData}
      />
      <div
        className={`relative overflow-hidden transition-colors duration-500 ${
          isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* Theme-Aware Background */}
        <div className="fixed inset-0 z-0">
          {isDarkMode ? (
            <>
              {/* Space Background for Dark Mode */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat background-layer"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  filter: "brightness(0.4) contrast(1.3) saturate(1.2)",
                }}
              ></div>
              <div className="absolute inset-0 bg-slate-900/40"></div>
            </>
          ) : (
            <>
              {/* Same Space Background with Balanced Light Mode Effects */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat background-layer"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                  filter:
                    "brightness(1.8) contrast(0.6) saturate(0.4) blur(1px)",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 via-slate-200/70 to-slate-300/60"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-100/30 to-slate-200/40"></div>
            </>
          )}
        </div>

        {/* Enhanced Dark Overlay for Perfect Readability */}
        {/* <div className="fixed inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-950/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60"></div>
      </div> */}

        {/* Content Container */}
        <div className="relative z-20">
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .body-text {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
          letter-spacing: -0.01em;
        }
        
        .button-text {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }

        @keyframes particle {
          0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px) scale(1); opacity: 0; }
        }

        @keyframes morphing {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1); }
        }

        @keyframes backgroundShift {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) rotate(1deg); }
          50% { transform: scale(1.02) rotate(-0.5deg); }
          75% { transform: scale(1.03) rotate(0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .background-layer {
          animation: backgroundShift 20s ease-in-out infinite;
        }

        .animated-gradient {
          background: linear-gradient(-45deg, #0f172a, #1e293b, #0369a1, #7c3aed, #059669, #0f172a);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .particle-system::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(59, 130, 246, 0.4), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(139, 92, 246, 0.3), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(16, 185, 129, 0.3), transparent);
          background-repeat: repeat;
          background-size: 200px 150px;
          animation: particle 20s linear infinite;
          z-index: 1;
        }

        .morphing-blob {
          animation: morphing 8s ease-in-out infinite;
          filter: blur(40px);
        }

        .geometric-pattern {
          background-image: 
            linear-gradient(30deg, transparent 12%, rgba(59, 130, 246, 0.05) 12%, rgba(59, 130, 246, 0.05) 14%, transparent 14%, transparent 35%, rgba(139, 92, 246, 0.05) 35%, rgba(139, 92, 246, 0.05) 37%, transparent 37%, transparent 58%, rgba(16, 185, 129, 0.05) 58%, rgba(16, 185, 129, 0.05) 60%, transparent 60%, transparent 81%, rgba(59, 130, 246, 0.05) 81%, rgba(59, 130, 246, 0.05) 83%, transparent 83%);
          background-size: 75px 130px;
        }

        .glass-morphism {
          backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(17, 25, 40, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.125);
        }

        .fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }

        .service-card {
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.25);
          backdrop-filter: blur(20px);
        }

        .portfolio-card {
          transition: all 0.3s ease;
        }

        .portfolio-card:hover {
          transform: translateY(-5px);
        }

        .portfolio-card img {
          transition: transform 0.3s ease;
        }

        .portfolio-card:hover img {
          transform: scale(1.05);
        }

        .cta-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: scale(1.05);
          animation: glow 2s ease-in-out infinite alternate;
        }

        .cta-button:active {
          transform: scale(0.98);
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-elements::before,
        .floating-elements::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6));
          border-radius: 50%;
          animation: floatUp 6s ease-in-out infinite;
        }

        .floating-elements::before {
          left: 10%;
          animation-delay: 0s;
        }

        .floating-elements::after {
          left: 80%;
          animation-delay: 3s;
        }
      `}</style>

          {/* HERO SECTION WITH CREATIVE VISUALS */}
          <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Floating geometric shapes */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              {/* Main Hero */}
              <div className="text-center mb-20 fade-in">
                <h1 className={`hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>
                  {t("home.hero.title").split(" ").map((word, i) => (
                    <span key={i} className={i === 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h1>
                <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                  {t("home.hero.subtitle")}
                </p>
              </div>

              {/* Problem-Solution Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-20">
                {/* Problem Card */}
                <div className={`p-8 rounded-3xl backdrop-blur-sm border-2 border-dashed transition-all duration-500 hover:scale-105 fade-in delay-200 ${
                  isDarkMode
                    ? "bg-red-900/10 border-red-400/30 hover:border-red-400/50"
                    : "bg-red-50/80 border-red-300/50 hover:border-red-400/60"
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? "text-red-300" : "text-red-700"
                    }`}>
                      {t("home.problems.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: "📉", text: t("home.problems.lowSales") },
                      { icon: "👻", text: t("home.problems.noOnlinePresence") },
                      { icon: "💸", text: t("home.problems.ineffectiveMarketing") }
                    ].map((problem, i) => (
                      <div key={i} className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? "bg-slate-800/30" : "bg-white/60"
                      }`}>
                        <span className="text-2xl">{problem.icon}</span>
                        <p className={`${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                          {problem.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution Card */}
                <div className={`p-8 rounded-3xl backdrop-blur-sm border-2 border-dashed transition-all duration-500 hover:scale-105 fade-in delay-400 ${
                  isDarkMode
                    ? "bg-green-900/10 border-green-400/30 hover:border-green-400/50"
                    : "bg-green-50/80 border-green-300/50 hover:border-green-400/60"
                }`}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <FaRocket className="text-white text-2xl" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? "text-green-300" : "text-green-700"
                    }`}>
                      {t("home.solutions.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <FaChartLine />, text: t("home.solutions.digitalStrategy") },
                      { icon: <FaUsers />, text: t("home.solutions.brandVisibility") },
                      { icon: <FaRocket />, text: t("home.solutions.targetedMarketing") }
                    ].map((solution, i) => (
                      <div key={i} className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? "bg-slate-800/30" : "bg-white/60"
                      }`}>
                        <div className="text-green-500 text-xl mt-1">{solution.icon}</div>
                        <p className={`${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                          {solution.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center fade-in delay-600">
                <div className="inline-flex items-center gap-4 p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20">
                  <Link
                    to="/start-project"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {t("home.hero.getStarted")}
                  </Link>
                  <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    უფასო კონსულტაცია
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* STATS & ACHIEVEMENTS SECTION */}
          <section className={`py-20 px-6 ${isDarkMode ? 'bg-slate-900/30' : 'bg-slate-50/50'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                {[
                  {
                    number: "50+",
                    label: "დასრულებული პროექტი",
                    icon: <FaRocket />,
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    number: "98%",
                    label: "კმაყოფილი კლიენტები",
                    icon: <FaUsers />,
                    color: "from-green-500 to-green-600"
                  },
                  {
                    number: "2.5x",
                    label: "საშუალო ROI გაზრდა",
                    icon: <FaChartLine />,
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    number: "24/7",
                    label: "მხარდაჭერა",
                    icon: <FaCheckCircle />,
                    color: "from-orange-500 to-orange-600"
                  }
                ].map((stat, i) => (
                  <div key={i} className={`text-center p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 fade-in delay-${(i + 1) * 100} ${
                    isDarkMode
                      ? "bg-slate-800/20 border-slate-700/30"
                      : "bg-white/80 border-slate-200/50"
                  }`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CREATIVE PROCESS VISUALIZATION */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 fade-in">
                <h2 className={`section-title text-4xl md:text-5xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>
                  {t("home.journey.title")}
                </h2>
                <p className={`text-xl max-w-3xl mx-auto ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                  ყოველი წარმატებული პროექტი იწყება სწორი მეთოდოლოგიით
                </p>
              </div>

              {/* Process Flow */}
              <div className="relative">
                {/* Connection Lines */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30"></div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
                  {[
                    {
                      step: "01",
                      icon: <FaUsers />,
                      title: t("home.journey.step1.title"),
                      desc: t("home.journey.step1.description"),
                      color: "from-blue-400 to-blue-600",
                      bg: "from-blue-500/10 to-blue-600/10",
                      details: ["კონკურენტების ანალიზი", "აუდიტორიის კვლევა", "სტრატეგიის დაგეგმვა"]
                    },
                    {
                      step: "02",
                      icon: <FaRocket />,
                      title: t("home.journey.step2.title"),
                      desc: t("home.journey.step2.description"),
                      color: "from-purple-400 to-purple-600",
                      bg: "from-purple-500/10 to-purple-600/10",
                      details: ["კრეატიული შემუშავება", "ტექნიკური განხორციელება", "ხარისხის კონტროლი"]
                    },
                    {
                      step: "03",
                      icon: <FaChartLine />,
                      title: t("home.journey.step3.title"),
                      desc: t("home.journey.step3.description"),
                      color: "from-green-400 to-green-600",
                      bg: "from-green-500/10 to-green-600/10",
                      details: ["შედეგების ანალიზი", "A/B ტესტირება", "სტრატეგიის გამოსწორება"]
                    }
                  ].map((step, i) => (
                    <div key={i} className={`relative fade-in delay-${(i + 1) * 200}`}>
                      {/* Step Card */}
                      <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 group ${
                        isDarkMode
                          ? "bg-slate-800/30 border-slate-700/30"
                          : "bg-white/80 border-slate-200/50"
                      }`}>
                        {/* Background Pattern */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.bg} rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>

                        <div className="relative z-10">
                          {/* Step Number */}
                          <div className="text-right mb-4">
                            <span className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20`}>
                              {step.step}
                            </span>
                          </div>

                          {/* Icon */}
                          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-3xl shadow-2xl group-hover:scale-110 transition-transform`}>
                            {step.icon}
                          </div>

                          {/* Content */}
                          <h3 className={`text-2xl font-bold mb-4 text-center ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}>
                            {step.title}
                          </h3>
                          <p className={`text-center mb-6 ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}>
                            {step.desc}
                          </p>

                          {/* Details */}
                          <div className="space-y-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                                <span className={`text-sm ${
                                  isDarkMode ? "text-slate-300" : "text-slate-600"
                                }`}>
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Arrow for connection */}
                        {i < 2 && (
                          <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
                            →
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* OUR APPROACH SECTION */}
          <section className="relative py-16 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12 fade-in">
              <h2 className={`section-title text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                {t("home.approach.title")}
              </h2>
              <p className={`text-lg ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                {t("home.approach.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaCode />,
                  title: t("home.services.webdev.title"),
                  desc: t("home.approach.webdev.description"),
                  benefits: [
                    t("home.approach.webdev.benefit1"),
                    t("home.approach.webdev.benefit2"),
                    t("home.approach.webdev.benefit3")
                  ]
                },
                {
                  icon: <FaChartLine />,
                  title: t("home.services.ads.title"),
                  desc: t("home.approach.ads.description"),
                  benefits: [
                    t("home.approach.ads.benefit1"),
                    t("home.approach.ads.benefit2"),
                    t("home.approach.ads.benefit3")
                  ]
                },
                {
                  icon: <FaInstagram />,
                  title: t("home.services.social.title"),
                  desc: t("home.approach.social.description"),
                  benefits: [
                    t("home.approach.social.benefit1"),
                    t("home.approach.social.benefit2"),
                    t("home.approach.social.benefit3")
                  ]
                }
              ].map((service, i) => (
                <div key={i} className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 fade-in delay-${(i + 1) * 100} ${
                  isDarkMode
                    ? "bg-slate-900/20 border-slate-700/30 hover:border-blue-400/50"
                    : "bg-white/80 border-slate-300/50 hover:border-blue-500/50 shadow-lg"
                }`}>
                  <div className="text-4xl text-blue-400 mb-6 mx-auto w-fit">
                    {service.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 text-center ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-center mb-6 ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {service.desc}
                  </p>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-400 text-sm" />
                        <span className={`text-sm ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link
                      to={`/services/${service.title === t("home.services.webdev.title") ? "web-development" :
                           service.title === t("home.services.ads.title") ? "digital-advertising" : "social-media"}`}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      {t("home.approach.learnMore")} <FaRocket />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section className="relative py-12 px-6 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto">
              <h2
                className={`section-title text-2xl md:text-4xl font-bold text-center mb-4 fade-in ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {t("home.whyUs.title")}
              </h2>
              <p
                className={`body-text text-center text-base md:text-lg mb-8 fade-in delay-100 ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {t("home.whyUs.subtitle")}
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FaUsers />,
                    title: t("home.whyUs.experience.title"),
                    desc: t("home.whyUs.experience.description"),
                  },
                  {
                    icon: <FaRocket />,
                    title: t("home.whyUs.results.title"),
                    desc: t("home.whyUs.results.description"),
                  },
                  {
                    icon: <FaShoppingCart />,
                    title: t("home.whyUs.support.title"),
                    desc: t("home.whyUs.support.description"),
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`text-center p-6 backdrop-blur-sm rounded-xl border transition-all duration-300 fade-in delay-${
                      (i + 1) * 100
                    } ${
                      isDarkMode
                        ? "bg-slate-900/15 border-slate-700/25 hover:border-blue-400/30"
                        : "bg-white/60 border-slate-300/40 hover:border-blue-500/50 shadow-lg"
                    }`}
                  >
                    <div className="text-4xl text-blue-400 mb-4 mx-auto w-fit">
                      {item.icon}
                    </div>
                    <h3
                      className={`section-title text-lg font-semibold mb-3 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`body-text text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OFFICE LOCATION SECTION */}
          <section
            id="location"
            className="relative py-12 px-6 max-w-7xl mx-auto overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-center mb-8 fade-in">
                <h2
                  className={`section-title text-2xl md:text-4xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t("office.title")}
                </h2>
                <p
                  className={`body-text text-base md:text-lg ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {t("office.subtitle")}
                </p>
              </div>

              <div className="fade-in delay-200">
                <OfficeLocation
                  address={t("office.address.full")}
                  coordinates={{ lat: 41.551398, lng: 44.98889 }}
                  businessHours={[
                    t("office.hours.weekdays"),
                    t("office.hours.saturday"),
                    t("office.hours.sunday"),
                  ]}
                  phone="+995 555 123 456"
                  email="info@vifa.ge"
                />
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="relative py-16 text-center px-6 overflow-hidden">
            {/* Subtle Focus Overlay */}
            <div className="absolute inset-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto fade-in">
              <h2
                className={`hero-title text-3xl md:text-5xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {t("home.cta.title").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-blue-400">
                  {t("home.cta.title").split(" ").slice(-1)}
                </span>
              </h2>
              <p
                className={`body-text text-lg md:text-xl mb-8 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {t("home.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="tel:+995555123456"
                  className="button-text cta-button bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg font-semibold text-white shadow-lg text-lg"
                >
                  {t("home.cta.callNow")}
                </a>
                <a
                  href="https://wa.me/995555123456"
                  className="button-text cta-button bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-semibold text-white transition-colors text-lg"
                >
                  💬 WhatsApp
                </a>
              </div>

              <p className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                {t("home.cta.benefits")}
              </p>
            </div>
          </section>

          <section>
            <WebDevelopment />
          </section>
          <section>
            <DigitalAdvertising />
          </section>

          <section>
            <SocialMediaService />
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
