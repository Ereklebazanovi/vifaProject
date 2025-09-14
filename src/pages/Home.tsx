import React from "react";
import { Link } from "react-router-dom";
import {
  FaCamera,
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

// Lightweight CSS animations instead of framer-motion
const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "description": t('seo.home.description'),
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/vifa.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": siteConfig.location.countryCode,
      "addressLocality": siteConfig.location.city
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "contactType": "customer service",
      "email": siteConfig.email
    },
    "sameAs": [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin
    ],
    "offers": {
      "@type": "Offer",
      "category": "Digital Marketing Services"
    }
  };

  return (
    <>
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords={t('seo.home.keywords')}
        type="website"
        structuredData={homeStructuredData}
      />
      <div className={`relative overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-slate-950 text-white'
          : 'bg-white text-slate-900'
      }`}>
      {/* Theme-Aware Background */}
      <div className="fixed inset-0 z-0">
        {isDarkMode ? (
          <>
            {/* Space Background for Dark Mode */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat background-layer"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
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
                filter: "brightness(1.8) contrast(0.6) saturate(0.4) blur(1px)",
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

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="relative py-9 px-6 max-w-7xl mx-auto overflow-hidden"
        >
          {/* Contextual Background Elements */}
          <div className="absolute inset-0"></div>

          {/* Subtle Service Accents */}
          <div className="absolute top-20 right-20 text-blue-300/5 text-5xl">
            <FaCode />
          </div>
          <div className="absolute bottom-20 left-20 text-slate-300/5 text-4xl">
            <FaCamera />
          </div>
          <div className="absolute top-1/2 right-10 text-blue-200/5 text-3xl">
            <FaChartLine />
          </div>

          {/* Soft Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 "></div>

          <div className="relative z-10">
            <div className="text-center mb-8 fade-in">
              <h2 className={`section-title text-2xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {t('home.services.title')}
              </h2>
              <p className={`body-text text-base md:text-lg ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t('home.services.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: <FaCode />,
                  title: t('home.services.webdev.title'),
                  desc: t('home.services.webdev.description'),
                  price: t('home.services.webdev.price'),
                  link: "/services/web-development",
                  features: [
                    "Enterprise Hosting (Vercel) - 99.99% Uptime",
                    t('webdev.features.lightningSpeed'),
                    "Professional SEO + Google Analytics",
                    "Mobile Optimized + SSL Security",
                  ],
                },
                {
                  icon: <FaCamera />,
                  title: t('home.services.ads.title'),
                  desc: t('home.services.ads.description'),
                  price: t('home.services.ads.price'),
                  link: "/services/digital-advertising",
                  features: [
                    "Google & Meta Ads",
                    t('ads.features.targetAudience'),
                    t('ads.features.abTesting'),
                    t('ads.features.roiTracking'),
                  ],
                },
                {
                  icon: <FaInstagram />,
                  title: t('home.services.social.title'),
                  desc: t('home.services.social.description'),
                  price: t('home.services.social.price'),
                  link: "/services/social-media",
                  features: [
                    t('social.features.postsPerWeek'),
                    t('social.features.storiesReels'),
                    t('social.features.commentManagement'),
                    t('social.features.monthlyReports'),
                  ],
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className={`service-card p-6 backdrop-blur-sm rounded-2xl border relative overflow-hidden fade-in delay-${
                    (i + 1) * 100
                  } ${
                    isDarkMode
                      ? 'bg-slate-900/20 border-slate-700/30 hover:border-blue-400/40'
                      : 'bg-white/60 border-slate-300/50 hover:border-blue-500/50 shadow-lg'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                    {service.price}
                  </div>

                  <div className="text-3xl text-blue-400 mb-4 transition-transform hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className={`section-title text-xl font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`body-text text-sm leading-relaxed mb-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {service.desc}
                  </p>

                  <div className="space-y-1 mb-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-xs ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        <FaCheckCircle className="text-green-400 text-xs" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={service.link}
                    className="block mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition-all w-full cta-button text-center text-sm"
                  >
                    {t('home.services.webdev.button')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className={`section-title text-2xl md:text-4xl font-bold text-center mb-4 fade-in ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('home.whyUs.title')}
            </h2>
            <p className={`body-text text-center text-base md:text-lg mb-8 fade-in delay-100 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('home.whyUs.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaUsers />,
                  title: t('home.whyUs.experience.title'),
                  desc: t('home.whyUs.experience.description'),
                },
                {
                  icon: <FaRocket />,
                  title: t('home.whyUs.results.title'),
                  desc: t('home.whyUs.results.description'),
                },
                {
                  icon: <FaShoppingCart />,
                  title: t('home.whyUs.support.title'),
                  desc: t('home.whyUs.support.description'),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`text-center p-6 backdrop-blur-sm rounded-xl border transition-all duration-300 fade-in delay-${
                    (i + 1) * 100
                  } ${
                    isDarkMode
                      ? 'bg-slate-900/15 border-slate-700/25 hover:border-blue-400/30'
                      : 'bg-white/60 border-slate-300/40 hover:border-blue-500/50 shadow-lg'
                  }`}
                >
                  <div className="text-4xl text-blue-400 mb-4 mx-auto w-fit">
                    {item.icon}
                  </div>
                  <h3 className={`section-title text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`body-text text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
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
              <h2 className={`section-title text-2xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {t('office.title')}
              </h2>
              <p className={`body-text text-base md:text-lg ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t('office.subtitle')}
              </p>
            </div>

            <div className="fade-in delay-200">
              <OfficeLocation
                address={t('office.address.full')}
                coordinates={{ lat: 41.551398, lng: 44.98889 }}
                businessHours={[
                  t('office.hours.weekdays'),
                  t('office.hours.saturday'),
                  t('office.hours.sunday'),
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
            <h2 className={`hero-title text-3xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('home.cta.title').split(' ').slice(0, -1).join(' ')} <span className="text-blue-400">{t('home.cta.title').split(' ').slice(-1)}</span>
            </h2>
            <p className={`body-text text-lg md:text-xl mb-8 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('home.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:+995555123456"
                className="button-text cta-button bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg font-semibold text-white shadow-lg text-lg"
              >
                {t('home.cta.callNow')}
              </a>
              <a
                href="https://wa.me/995555123456"
                className="button-text cta-button bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-semibold text-white transition-colors text-lg"
              >
                💬 WhatsApp
              </a>
            </div>

            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
              {t('home.cta.benefits')}
            </p>
          </div>
        </section>
      </div>
      </div>
    </>
  );
};

export default Home;
