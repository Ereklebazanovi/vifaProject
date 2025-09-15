import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaChartLine,
  FaCalendarAlt,
  FaUsers,
  FaCamera,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaStar,
  FaRocket,
  FaBullseye,
  FaCrown,
} from "react-icons/fa";
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const SocialMediaService = () => {
  const [activeTab, setActiveTab] = useState("facebook");
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();

  // Animation classes - immediately available, no delays
  const animationClasses = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Space Grotesk', 'Inter', sans-serif;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    
    .fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }
    
    .slide-in-left {
      animation: slideInLeft 0.7s ease-out forwards;
      opacity: 0;
      transform: translateX(-50px);
    }
    
    .slide-in-right {
      animation: slideInRight 0.7s ease-out forwards;
      opacity: 0;
      transform: translateX(50px);
    }
    
    .scale-in {
      animation: scaleIn 0.5s ease-out forwards;
      opacity: 0;
      transform: scale(0.8);
    }
    
    .platform-tab {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .platform-tab:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
    
    .service-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .process-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .process-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
    }
    
    .testimonial-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }
    
    .contact-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
    }
    
    .cta-button {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .cta-button:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
    }
    
    .platform-icon {
      transition: all 0.3s ease;
    }
    
    .platform-icon:hover {
      transform: scale(1.2) rotate(5deg);
    }
    
    /* Staggered animation delays for better visual flow */
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleIn {
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    /* Smooth page transition */
    .page-transition {
      animation: pageSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      opacity: 0;
    }
    
    @keyframes pageSlideIn {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  // Initialize immediately without waiting
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const platforms = [
    {
      id: "facebook",
      icon: <FaFacebook />,
      name: "Facebook",
      description: t('social.platforms.facebook.description'),
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-700/20",
      borderColor: "border-blue-500/30",
      features: [
        t('social.platforms.facebook.feature1'),
        t('social.platforms.facebook.feature2'),
        t('social.platforms.facebook.feature3'),
        t('social.platforms.facebook.feature4'),
        t('social.platforms.facebook.feature5'),
      ],
      stats: t('social.platforms.facebook.stats'),
      bestFor: t('social.platforms.facebook.bestFor'),
    },
    {
      id: "instagram",
      icon: <FaInstagram />,
      name: "Instagram",
      description: t('social.platforms.instagram.description'),
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
      borderColor: "border-pink-500/30",
      features: [
        t('social.platforms.instagram.feature1'),
        t('social.platforms.instagram.feature2'),
        t('social.platforms.instagram.feature3'),
        t('social.platforms.instagram.feature4'),
        t('social.platforms.instagram.feature5'),
      ],
      stats: t('social.platforms.instagram.stats'),
      bestFor: t('social.platforms.instagram.bestFor'),
    },
    {
      id: "tiktok",
      icon: <FaTiktok />,
      name: "TikTok",
      description: t('social.platforms.tiktok.description'),
      color: "from-black to-red-500",
      bgColor: "bg-gradient-to-br from-gray-900/20 to-red-500/20",
      borderColor: "border-red-500/30",
      features: [
        t('social.platforms.tiktok.feature1'),
        t('social.platforms.tiktok.feature2'),
        t('social.platforms.tiktok.feature3'),
        t('social.platforms.tiktok.feature4'),
        t('social.platforms.tiktok.feature5'),
      ],
      stats: t('social.platforms.tiktok.stats'),
      bestFor: t('social.platforms.tiktok.bestFor'),
    },
    {
      id: "youtube",
      icon: <FaYoutube />,
      name: "YouTube",
      description: t('social.platforms.youtube.description'),
      color: "from-red-500 to-red-600",
      bgColor: "bg-gradient-to-br from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
      features: [
        t('social.platforms.youtube.feature1'),
        t('social.platforms.youtube.feature2'),
        t('social.platforms.youtube.feature3'),
        t('social.platforms.youtube.feature4'),
        t('social.platforms.youtube.feature5'),
      ],
      stats: t('social.platforms.youtube.stats'),
      bestFor: t('social.platforms.youtube.bestFor'),
    },
  ];

  const services = [
    {
      icon: <FaCalendarAlt />,
      title: t('social.services.planning.title'),
      description: t('social.services.planning.description'),
      features: [
        t('social.services.planning.feature1'),
        t('social.services.planning.feature2'),
        t('social.services.planning.feature3'),
        t('social.services.planning.feature4'),
      ],
    },
    {
      icon: <FaCamera />,
      title: t('social.services.visual.title'),
      description: t('social.services.visual.description'),
      features: [
        t('social.services.visual.feature1'),
        t('social.services.visual.feature2'),
        t('social.services.visual.feature3'),
        t('social.services.visual.feature4'),
      ],
    },
    {
      icon: <FaUsers />,
      title: t('social.services.community.title'),
      description: t('social.services.community.description'),
      features: [
        t('social.services.community.feature1'),
        t('social.services.community.feature2'),
        t('social.services.community.feature3'),
        t('social.services.community.feature4'),
      ],
    },
    {
      icon: <FaChartLine />,
      title: t('social.services.analytics.title'),
      description: t('social.services.analytics.description'),
      features: [
        t('social.services.analytics.feature1'),
        t('social.services.analytics.feature2'),
        t('social.services.analytics.feature3'),
        t('social.services.analytics.feature4'),
      ],
    },
  ];

  const testimonials = [
    {
      text: t('social.testimonials.testimonial1.text'),
      author: t('social.testimonials.testimonial1.author'),
      business: t('social.testimonials.testimonial1.business'),
      rating: 5,
      platform: t('social.testimonials.testimonial1.platform'),
    },
    {
      text: t('social.testimonials.testimonial2.text'),
      author: t('social.testimonials.testimonial2.author'),
      business: t('social.testimonials.testimonial2.business'),
      rating: 5,
      platform: t('social.testimonials.testimonial2.platform'),
    },
    {
      text: t('social.testimonials.testimonial3.text'),
      author: t('social.testimonials.testimonial3.author'),
      business: t('social.testimonials.testimonial3.business'),
      rating: 5,
      platform: t('social.testimonials.testimonial3.platform'),
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: t('social.process.step1.title'),
      description: t('social.process.step1.description'),
      icon: <FaBullseye />,
    },
    {
      step: "02",
      title: t('social.process.step2.title'),
      description: t('social.process.step2.description'),
      icon: <FaCamera />,
    },
    {
      step: "03",
      title: t('social.process.step3.title'),
      description: t('social.process.step3.description'),
      icon: <FaRocket />,
    },
    {
      step: "04",
      title: t('social.process.step4.title'),
      description: t('social.process.step4.description'),
      icon: <FaChartLine />,
    },
  ];

  const getCurrentPlatform = () => {
    return platforms.find((p) => p.id === activeTab) || platforms[0];
  };

  const socialStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('seo.services.social.title'),
    "description": t('seo.services.social.description'),
    "provider": {
      "@type": "Organization",
      "name": "Vifa Digital",
      "url": "https://vifa.ge"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Georgia"
    }
  };

  return (
    <>
      <SEO
        title={t('seo.services.social.title')}
        description={t('seo.services.social.description')}
        keywords={t('seo.services.social.keywords')}
        type="service"
        structuredData={socialStructuredData}
      />
      <style>{animationClasses}</style>
      <div className={`min-h-screen transition-colors duration-500 ${isLoaded ? 'page-transition' : ''} ${
        true 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-white to-pink-50 text-slate-900'
      }`}>
        {/* Hero Section with Platform Showcase */}
        <section className={`py-12 px-6 ${
          true 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
            : 'bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-transparent'
        }`}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-12 fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('social.hero.title')} <br />
                <span className={true ? 'text-white' : 'text-slate-900'}>{t('social.hero.subtitle')}</span>
              </h1>
              <p className={`text-lg mb-6 max-w-3xl mx-auto leading-relaxed ${
                true ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t('social.hero.description')}
              </p>
            </div>

            {/* Platform Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 fade-in-up delay-200">
              {platforms.map((platform, index) => (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`platform-tab flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                    activeTab === platform.id
                      ? `bg-gradient-to-r ${platform.color} shadow-lg text-white`
                      : true 
                        ? "bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white"
                        : "bg-white hover:bg-slate-100 border border-slate-300 text-slate-900"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Active Platform Details */}
            <div
              className={`p-6 rounded-2xl ${
                getCurrentPlatform().bgColor
              } border ${getCurrentPlatform().borderColor} backdrop-blur-sm fade-in-up delay-300`}
              key={activeTab}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="slide-in-left delay-400">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`text-3xl p-3 rounded-full bg-gradient-to-r ${
                        getCurrentPlatform().color
                      }`}
                    >
                      {getCurrentPlatform().icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${true ? 'text-white' : 'text-slate-900'}`}>
                        {getCurrentPlatform().name}
                      </h3>
                      <p className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                        {getCurrentPlatform().description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className={`flex items-center gap-2 text-xs mb-1 ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                      <FaUsers className="text-blue-400" />
                      <span>{getCurrentPlatform().stats}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                      <FaBullseye className="text-green-400" />
                      <span>{getCurrentPlatform().bestFor}</span>
                    </div>
                  </div>
                </div>

                <div className="slide-in-right delay-400">
                  <h4 className="text-sm font-semibold mb-3 text-blue-400">
                    {t('social.platformServices.title')}
                  </h4>
                  <ul className="space-y-2">
                    {getCurrentPlatform().features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <FaCheckCircle className="text-green-400 flex-shrink-0 text-xs" />
                        <span className={true ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Success Stats */}
        <section className={`py-12 px-6 ${true ? 'bg-slate-900' : 'bg-slate-100/30'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 fade-in-up">
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${true ? 'text-white' : 'text-slate-900'}`}>
                <FaCrown className="inline text-yellow-400 mr-2" />
                {t('social.stats.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  platform: "Instagram",
                  icon: <FaInstagram />,
                  color: "from-pink-500 to-purple-500",
                  stat: t('social.stats.instagram.stat'),
                  desc: t('social.stats.instagram.desc'),
                },
                {
                  platform: "Facebook",
                  icon: <FaFacebook />,
                  color: "from-blue-600 to-blue-700",
                  stat: t('social.stats.facebook.stat'),
                  desc: t('social.stats.facebook.desc'),
                },
                {
                  platform: "TikTok",
                  icon: <FaTiktok />,
                  color: "from-gray-900 to-red-500",
                  stat: t('social.stats.tiktok.stat'),
                  desc: t('social.stats.tiktok.desc'),
                },
                {
                  platform: "YouTube",
                  icon: <FaYoutube />,
                  color: "from-red-500 to-red-600",
                  stat: t('social.stats.youtube.stat'),
                  desc: t('social.stats.youtube.desc'),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`service-card p-6 rounded-2xl text-center fade-in-up ${true ? `bg-gradient-to-br ${item.color} bg-opacity-20 border border-opacity-30` : 'bg-white/80 border border-slate-300'}`}
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  <div className="text-4xl mb-4 opacity-80">{item.icon}</div>
                  <div className={`text-2xl font-bold mb-2 ${true ? 'text-white' : 'text-slate-900'}`}>{item.stat}</div>
                  <div className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={`py-16 px-6 ${true ? 'bg-slate-800' : 'bg-slate-100/30'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('social.services.title')}
              </h2>
              <p className={`text-lg ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('social.services.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <div
                  key={i}
                  className={`service-card p-8 rounded-2xl border hover:border-blue-400/50 group fade-in-up ${true ? 'bg-slate-900 border-slate-700' : 'bg-white/80 border-slate-300'}`}
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  <div className="text-4xl text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300 scale-in delay-200">
                    {service.icon}
                  </div>
                  <h3 className={`text-2xl font-semibold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                  <p className={`mb-6 ${true ? 'text-slate-300' : 'text-slate-600'}`}>{service.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <FaCheckCircle className="text-green-400" />
                        <span className={true ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={`py-16 px-6 ${true ? '' : 'bg-gradient-to-br from-slate-50 to-blue-50/30'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('social.process.title')}
              </h2>
              <p className={`text-lg ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('social.process.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className={`process-card text-center relative p-6 rounded-2xl border hover:border-blue-400/50 fade-in-up ${true ? 'bg-slate-900 border-slate-700' : 'bg-white/80 border-slate-300'}`}
                  style={{ animationDelay: `${(i + 1) * 0.2}s` }}
                >
                  <div className="text-6xl font-bold text-blue-400/20 mb-4">
                    {step.step}
                  </div>
                  <div className="text-3xl text-blue-400 mb-4 scale-in delay-400">
                    {step.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={true ? 'text-slate-400' : 'text-slate-600'}>{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 text-blue-400 z-10 fade-in-up delay-600">
                      <FaArrowRight className={`p-2 rounded-full text-3xl ${true ? 'bg-slate-900' : 'bg-white'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`py-16 px-6 ${true ? 'bg-slate-800' : 'bg-slate-100/30'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('social.testimonials.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={`testimonial-card p-8 rounded-2xl border hover:border-blue-400/50 fade-in-up ${true ? 'bg-slate-900 border-slate-700' : 'bg-white/80 border-slate-300'}`}
                  style={{ animationDelay: `${(i + 1) * 0.2}s` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <FaStar key={idx} className="text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaQuoteLeft className="text-blue-400 text-xl" />
                    <span className="text-xs bg-blue-500/20 px-2 py-1 rounded-full text-blue-400">
                      {testimonial.platform}
                    </span>
                  </div>
                  <p className={`mb-6 text-lg leading-relaxed ${true ? 'text-slate-300' : 'text-slate-700'}`}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className={`font-semibold text-lg ${true ? 'text-white' : 'text-slate-900'}`}>
                      {testimonial.author}
                    </h4>
                    <p className={true ? 'text-slate-400' : 'text-slate-600'}>{testimonial.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className={`py-16 px-6 relative overflow-hidden ${true ? 'bg-gradient-to-br from-blue-900/40 via-slate-900 to-purple-900/30' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="fade-in-up">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('social.cta.title')} <span className="text-blue-500">{t('social.cta.highlight')}</span> {t('social.cta.subtitle')}
                <br />
                <span className={`text-2xl md:text-3xl ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                  {t('social.cta.suffix')}
                </span>
              </h2>

              <div className="flex justify-center gap-6 mb-8 fade-in-up delay-200">
                {[
                  { icon: <FaInstagram />, name: "Instagram" },
                  { icon: <FaFacebook />, name: "Facebook" },
                  { icon: <FaTiktok />, name: "TikTok" },
                  { icon: <FaYoutube />, name: "YouTube" },
                ].map((platform, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl mb-2 platform-icon">
                      {platform.icon}
                    </div>
                    <div className={`text-xs ${true ? 'text-slate-400' : 'text-slate-600'}`}>{platform.name}</div>
                  </div>
                ))}
              </div>

              <p className={`text-xl mb-8 leading-relaxed ${true ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('social.cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 fade-in-up delay-400">
                <Link
                  to="/start-project"
                  className="cta-button bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full font-semibold inline-flex items-center justify-center gap-3 shadow-2xl"
                >
                  <FaRocket className="text-xl" />
                  <span>{t('social.cta.button')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`py-16 px-6 ${true ? 'bg-slate-950' : 'bg-slate-100/30'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('social.faq.title')}
              </h2>
              <p className={`text-lg ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('social.faq.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: t('social.faq.q1.question'),
                  a: t('social.faq.q1.answer'),
                },
                {
                  q: t('social.faq.q2.question'),
                  a: t('social.faq.q2.answer'),
                },
                {
                  q: t('social.faq.q3.question'),
                  a: t('social.faq.q3.answer'),
                },
                {
                  q: t('social.faq.q4.question'),
                  a: t('social.faq.q4.answer'),
                },
                {
                  q: t('social.faq.q5.question'),
                  a: t('social.faq.q5.answer'),
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 border hover:border-blue-400/50 transition-all duration-300 fade-in-up ${true ? 'bg-slate-900 border-slate-700' : 'bg-white/80 border-slate-300'}`}
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">
                    {faq.q}
                  </h3>
                  <p className={`leading-relaxed ${true ? 'text-slate-300' : 'text-slate-700'}`}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`py-16 px-6 ${true ? 'bg-slate-900' : 'bg-slate-100/30'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('social.contact.title')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8 fade-in-up delay-200">
                {[
                  { emoji: "📱", title: t('social.contact.phone.title'), info: t('social.contact.phone.info') },
                  { emoji: "📧", title: t('social.contact.email.title'), info: t('social.contact.email.info') },
                  { emoji: "💬", title: t('social.contact.social.title'), info: t('social.contact.social.info') },
                ].map((contact, i) => (
                  <div 
                    key={i}
                    className={`contact-card p-6 rounded-xl border hover:border-blue-400/50 fade-in-up ${true ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-slate-300'}`}
                    style={{ animationDelay: `${(i + 1) * 0.1 + 0.3}s` }}
                  >
                    <div className="text-3xl mb-3">{contact.emoji}</div>
                    <h3 className={`font-semibold mb-2 ${true ? 'text-white' : 'text-slate-900'}`}>{contact.title}</h3>
                    <p className="text-blue-400">{contact.info}</p>
                  </div>
                ))}
              </div>
              <p className={true ? 'text-slate-400' : 'text-slate-600'}>
                {t('social.contact.hours')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SocialMediaService;