import React from "react";
import { Link } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,

  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaChartLine,
  FaBullseye,

  FaEye,

  FaRocket,
  FaCheckCircle,
  FaArrowRight,

  FaSearchDollar,

  FaFileAlt,
  FaPlayCircle,
  FaShoppingCart,

} from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const DigitalAdvertising: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const platforms = [
    {
      icon: <FaGoogle />,
      name: "Google Ads",
      description: "Search, Display, YouTube, Shopping",
      color: "from-blue-500 to-green-500",
      audience: t('ads.platforms.google.audience'),
    },
    {
      icon: <FaFacebook />,
      name: "Meta Ads",
      description: "Facebook & Instagram Advertising",
      color: "from-blue-600 to-purple-600",
      audience: t('ads.platforms.meta.audience'),
    },
    {
      icon: <FaYoutube />,
      name: "YouTube Ads",
      description: "Video Advertising & Campaigns",
      color: "from-red-500 to-red-600",
      audience: t('ads.platforms.youtube.audience'),
    },
    {
      icon: <FaTiktok />,
      name: "TikTok Ads",
      description: "Short-form Video Marketing",
      color: "from-black to-red-400",
      audience: t('ads.platforms.tiktok.audience'),
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn Ads",
      description: "B2B Professional Targeting",
      color: "from-blue-700 to-blue-800",
      audience: t('ads.platforms.linkedin.audience'),
    },
  ];

  const services = [
    {
      icon: <FaBullseye />,
      title: t('ads.services.targeting.title'),
      description: t('ads.services.targeting.description'),
      features: [
        "Demographics ანალიზი",
        "Psychographic profiling",
        "Competitor analysis",
        "Custom audiences",
      ],
    },
    {
      icon: <FaFileAlt />,
      title: t('ads.services.strategy.title'),
      description: t('ads.services.strategy.description'),
      features: [
        "Campaign planning",
        "Budget allocation",
        "Bidding strategy",
        "Conversion tracking",
      ],
    },
    {
      icon: <FaPlayCircle />,
      title: t('ads.services.creative.title'),
      description: t('ads.services.creative.description'),
      features: [
        "Ad design",
        "Copy writing",
        "Video production",
        "A/B testing",
      ],
    },
    {
      icon: <FaChartLine />,
      title: t('ads.services.optimization.title'),
      description: t('ads.services.optimization.description'),
      features: [
        "Performance tracking",
        "Cost optimization",
        "Conversion analysis",
        "ROI reporting",
      ],
    },
  ];

  const adTypes = [
    {
      icon: <FaSearchDollar />,
      title: "Search Ads",
      description: t('ads.types.search.description'),
      benefits: [t('ads.types.search.benefit1'), t('ads.types.search.benefit2'), t('ads.types.search.benefit3')],
    },
    {
      icon: <FaEye />,
      title: "Display Ads",
      description: t('ads.types.display.description'),
      benefits: [t('ads.types.display.benefit1'), t('ads.types.display.benefit2'), t('ads.types.display.benefit3')],
    },
    {
      icon: <FaPlayCircle />,
      title: "Video Ads",
      description: t('ads.types.video.description'),
      benefits: [t('ads.types.video.benefit1'), t('ads.types.video.benefit2'), t('ads.types.video.benefit3')],
    },
    {
      icon: <FaShoppingCart />,
      title: "Shopping Ads",
      description: t('ads.types.shopping.description'),
      benefits: [t('ads.types.shopping.benefit1'), t('ads.types.shopping.benefit2'), t('ads.types.shopping.benefit3')],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: t('ads.process.step1.title'),
      description: t('ads.process.step1.description'),
    },
    {
      step: "02",
      title: t('ads.process.step2.title'),
      description: t('ads.process.step2.description'),
    },
    {
      step: "03",
      title: t('ads.process.step3.title'),
      description: t('ads.process.step3.description'),
    },
    {
      step: "04",
      title: t('ads.process.step4.title'),
      description: t('ads.process.step4.description'),
    },
  ];

  const stats = [
    { number: "300%", label: t('ads.stats.roi') },
    { number: "45%", label: t('ads.stats.cpa') },
    { number: "200+", label: t('ads.stats.campaigns') },
    { number: "24/7", label: t('ads.stats.monitoring') },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900'
    }`}>
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .platform-card {
          transition: all 0.3s ease;
        }

        .platform-card:hover {
          transform: scale(1.05);
        }

        .service-card {
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.5);
        }

        .ad-type-card {
          transition: all 0.3s ease;
        }

        .ad-type-card:hover {
          transform: scale(1.05);
          border-color: rgba(239, 68, 68, 0.5);
        }

        .process-card {
          transition: all 0.3s ease;
        }

        .process-card:hover {
          transform: scale(1.05);
        }

        .cta-button {
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        .cta-button:active {
          transform: scale(0.98);
        }

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 fade-in-up ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {t('ads.hero.title')}
              </span>
              <br />
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{t('ads.hero.subtitle')}</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 fade-in-up delay-100 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('ads.hero.description')}
            </p>
           

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto fade-in-up delay-300">
              {stats.map((stat, i) => (
                <div key={i} className={`stat-card text-center delay-${(i + 1) * 100}`}>
                  <div className="text-2xl md:text-3xl font-bold text-red-400 mb-2">
                    {stat.number}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Icons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {platforms.map((platform, i) => (
              <div
                key={i}
                className={`platform-card text-center group cursor-pointer fade-in-up delay-${(i + 1) * 100}`}
              >
                <div
                  className={`text-4xl mb-3 p-4 rounded-2xl bg-gradient-to-r ${platform.color} text-white mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}
                >
                  {platform.icon}
                </div>
                <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{platform.name}</h3>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {platform.description}
                </p>
                <p className="text-xs text-red-400 font-medium">
                  {platform.audience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Types Section */}
      <section className={`py-20 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100/30'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('ads.types.title')}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('ads.types.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adTypes.map((type, i) => (
              <div
                key={i}
                className={`ad-type-card p-6 rounded-2xl border text-center group fade-in-up delay-${(i + 1) * 100} ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-red-400/50' : 'bg-white/80 border-slate-200 hover:border-red-400/30'}`}
              >
                <div className="text-4xl text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{type.title}</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{type.description}</p>
                <div className="space-y-2">
                  {type.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-2 text-sm"
                    >
                      <FaCheckCircle className="text-green-400" />
                      <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t('ads.services.title')}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('ads.services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className={`service-card p-8 rounded-2xl border group fade-in-up delay-${(i + 1) * 100} ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white/80 border-slate-200'}`}
              >
                <div className="text-4xl text-red-400 mb-6 group-hover:scale-110 transition-transform duration-300 scale-in delay-200">
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <FaCheckCircle className="text-green-400" />
                      <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-20 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100/30'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t('ads.process.title')}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('ads.process.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className={`process-card text-center relative fade-in-up delay-${(i + 1) * 100}`}
              >
                <div className="text-6xl font-bold text-red-400/20 mb-4 scale-in delay-200">
                  {step.step}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{step.description}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 text-red-400 fade-in-up delay-400">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${isDarkMode ? 'bg-gradient-to-r from-red-900/40 via-slate-900 to-orange-900/30' : 'bg-gradient-to-r from-slate-100 via-white to-blue-100/50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t('ads.cta.title')} <span className="text-red-400">{t('ads.cta.highlight')}</span> {t('ads.cta.suffix')}
            </h2>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('ads.cta.description')}
            </p>
            <div className="flex justify-center fade-in-up delay-200">
              <Link
                to="/start-project"
                className="cta-button bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 text-center justify-center"
              >
                <FaRocket />
                {t('ads.cta.button1')}
              </Link>
            </div>
            <p className={`mt-6 fade-in-up delay-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('ads.cta.benefits')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalAdvertising;