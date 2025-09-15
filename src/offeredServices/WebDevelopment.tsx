import { Link } from "react-router-dom";
import {
  FaReact,
  FaMobile,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaRocket,
  FaGlobe,
  FaTachometerAlt,
  FaCrown,
  FaEye,
  FaArrowUp,
  FaDesktop,
  FaServer,
  FaBolt,
} from "react-icons/fa";
import {
  SiFirebase,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { useLanguage } from '../contexts/LanguageContext';

const WebDevelopment = () => {
  const { t } = useLanguage();
  const businessResults = [
    {
      icon: <FaChartLine />,
      title: t('webdev.businessResults.title1'),
      desc: t('webdev.businessResults.desc1'),
      stat: "24/7",
    },
    {
      icon: <FaUsers />,
      title: t('webdev.businessResults.title2'),
      desc: t('webdev.businessResults.desc2'),
      stat: "NON-STOP",
    },
    {
      icon: <FaDollarSign />,
      title: t('webdev.businessResults.title3'),
      desc: t('webdev.businessResults.desc3'),
      stat: "1 CLICK",
    },
    {
      icon: <FaRocket />,
      title: t('webdev.businessResults.title4'),
      desc: t('webdev.businessResults.desc4'),
      stat: "VISIBLE",
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      true 
        ? 'bg-slate-950 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-green-50 text-slate-900'
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
            transform: translateY(20px);
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

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(34, 197, 94, 0.2);
        }

        .hover-scale {
          transition: transform 0.3s ease;
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .tech-card {
          transition: all 0.3s ease;
        }

        .tech-card:hover {
          transform: scale(1.05);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .package-card {
          transition: all 0.5s ease;
        }

        .package-card:hover {
          border-color: rgba(34, 197, 94, 0.8);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.25);
        }
      `}</style>

      {/* Hero Section with Background */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className={`absolute inset-0 ${
          true 
            ? 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-green-900/20' 
            : 'bg-gradient-to-br from-green-50/30 via-blue-50/20 to-transparent'
        }`}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('webdev.hero.title1')}
              </span>
              <br />
              <span className={`drop-shadow-lg ${true ? 'text-white' : 'text-slate-900'}`}>{t('webdev.hero.title2')}</span>
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto fade-in-up delay-100 leading-relaxed ${
              true ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('webdev.hero.description.part1')}{" "}
              <span className="text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded">
                {t('webdev.hero.description.highlight')}
              </span>{" "}
              {t('webdev.hero.description.part2')}{" "}
              <span className="text-blue-400 font-semibold">{t('webdev.hero.description.part3')}</span>
            </p>

            {/* ბიზნეს შედეგები - კომპაქტური */}
            <div className="grid md:grid-cols-4 gap-3 mb-6">
              {businessResults.map((result, i) => (
                <div
                  key={i}
                  className={`hover-lift p-4 rounded-lg border hover:border-green-400/60 group fade-in-up delay-${
                    (i + 1) * 100
                  } ${
                    true
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50'
                      : 'bg-white/70 border-slate-300/50 shadow-lg'
                  }`}
                >
                  <div className="text-2xl text-green-400 mb-2 text-center group-hover:scale-110 transition-transform duration-300">
                    {result.icon}
                  </div>
                  <div className="text-lg font-bold text-center mb-1 text-green-400">
                    {result.stat}
                  </div>
                  <h3 className={`font-bold mb-1 text-center text-sm ${
                    true ? 'text-white' : 'text-slate-900'
                  }`}>
                    {result.title}
                  </h3>
                  <p className={`text-center text-xs ${
                    true ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {result.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* კომპაქტური პაკეტები */}
      <section id="packages" className={`py-12 px-6 ${true ? 'bg-slate-900/50' : 'bg-slate-100/30'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 fade-in-up">
            <h2 className={`text-3xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
              {t('webdev.packages.title')} <span className="text-green-400">{t('webdev.packages.titleHighlight')}</span>
            </h2>
            <p className={`text-lg ${true ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('webdev.packages.subtitle')}
            </p>
          </div>

          {/* პაკეტების ბადე */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {/* ბეისიქ პაკეტი */}
            <div className={`package-card p-6 rounded-2xl border-2 shadow-xl relative overflow-hidden fade-in-up delay-100 ${true ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-blue-400/40' : 'bg-white/80 border-blue-400/60'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3 rounded-xl mb-4 border border-blue-400/30">
                    <FaBolt className="text-3xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-blue-400">
                    {t('webdev.packages.basic.title')}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {t('webdev.packages.basic.description')}
                  </p>

                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {t('webdev.packages.basic.price')}
                  </div>
                  <div className="text-slate-400 text-sm">{t('webdev.packages.basic.priceNote')}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.basic.feature1')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.basic.feature2')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.basic.feature3')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.basic.feature4')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaServer className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.basic.feature5')}
                      </span>{" "}
                      {t('webdev.packages.basic.feature5Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaShieldAlt className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.basic.feature6')}
                      </span>{" "}
                      {t('webdev.packages.basic.feature6Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-green-400 text-sm flex-shrink-0" />
                    <span className="text-green-400 text-sm font-semibold">
                      {t('webdev.packages.basic.delivery')}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/start-project?package=basic"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors"
                  >
                    {t('webdev.packages.basic.button')}
                  </Link>
                </div>
              </div>
            </div>

            {/* სტანდარტი პაკეტი */}
            <div className={`package-card p-6 rounded-2xl border-2 shadow-xl relative overflow-hidden fade-in-up delay-200 ${true ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-400/40' : 'bg-white/80 border-yellow-400/60'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 rounded-xl mb-4 border border-yellow-400/30">
                    <FaDesktop className="text-3xl text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">
                    {t('webdev.packages.standard.title')}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {t('webdev.packages.standard.description')}
                  </p>

                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {t('webdev.packages.standard.price')}
                  </div>
                  <div className="text-slate-400 text-sm">{t('webdev.packages.standard.priceNote')}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-yellow-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.standard.feature1')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-yellow-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.standard.feature2')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-yellow-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.standard.feature3')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-yellow-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.standard.feature4')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaServer className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.standard.feature5')}
                      </span>{" "}
                      {t('webdev.packages.standard.feature5Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTachometerAlt className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.standard.feature6')}
                      </span>{" "}
                      {t('webdev.packages.standard.feature6Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-green-400 text-sm flex-shrink-0" />
                    <span className="text-green-400 text-sm font-semibold">
                      {t('webdev.packages.standard.delivery')}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/start-project?package=standard"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors"
                  >
                    {t('webdev.packages.standard.button')}
                  </Link>
                </div>
              </div>
            </div>

            {/* პრემიუმი პაკეტი */}
            <div className={`package-card p-6 rounded-2xl border-2 shadow-xl relative overflow-hidden fade-in-up delay-300 ${true ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-green-400/60' : 'bg-white/80 border-green-400/70'}`}>
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {t('webdev.packages.premium.popular')}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-xl mb-4 border border-green-400/30">
                    <FaRocket className="text-3xl text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-400">
                    {t('webdev.packages.premium.title')}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {t('webdev.packages.premium.description')}
                  </p>

                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {t('webdev.packages.premium.price')}
                  </div>
                  <div className="text-slate-400 text-sm">{t('webdev.packages.premium.priceNote')}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      4-5 page website
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      Services/products catalog
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.packages.premium.feature3')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.premium.feature4')}
                      </span>{" "}
                      {t('webdev.packages.premium.feature4Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaServer className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.premium.feature5')}
                      </span>{" "}
                      {t('webdev.packages.premium.feature5Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBolt className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.premium.feature6')}
                      </span>{" "}
                      {t('webdev.packages.premium.feature6Note')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-green-400 text-sm flex-shrink-0" />
                    <span className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-green-400 font-semibold">
                        {t('webdev.packages.premium.feature7')}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-green-400 text-sm flex-shrink-0" />
                    <span className="text-green-400 text-sm font-semibold">
                      {t('webdev.packages.premium.delivery')}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/start-project?package=premium"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors"
                  >
                    {t('webdev.packages.premium.button')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SEO გარანტია სექცია */}
          <div className={`rounded-2xl p-8 border fade-in-up delay-400 ${true ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-400/20' : 'bg-gradient-to-r from-green-50/50 to-blue-50/50 border-green-400/30'}`}>
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('webdev.seo.title')}{" "}
                <span className="text-green-400">{t('webdev.seo.titleHighlight')}</span>
              </h3>
              <p className={`max-w-3xl mx-auto ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                {t('webdev.seo.description')}{" "}
                <span className="text-green-400 font-semibold">
                  {t('webdev.seo.descriptionHighlight')}
                </span>{" "}
                {t('webdev.seo.descriptionEnd')}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className={`text-center p-4 rounded-lg ${true ? 'bg-slate-800/30' : 'bg-white/50'}`}>
                <FaDesktop className="text-3xl text-green-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${true ? 'text-white' : 'text-slate-900'}`}>
                  {t('webdev.seo.feature1.title')}
                </h4>
                <p className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.seo.feature1.desc')}</p>
              </div>
              <div className={`text-center p-4 rounded-lg ${true ? 'bg-slate-800/30' : 'bg-white/50'}`}>
                <FaBolt className="text-3xl text-blue-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${true ? 'text-white' : 'text-slate-900'}`}>{t('webdev.seo.feature2.title')}</h4>
                <p className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.seo.feature2.desc')}</p>
              </div>
              <div className={`text-center p-4 rounded-lg ${true ? 'bg-slate-800/30' : 'bg-white/50'}`}>
                <FaShieldAlt className="text-3xl text-purple-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${true ? 'text-white' : 'text-slate-900'}`}>{t('webdev.seo.feature3.title')}</h4>
                <p className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('webdev.seo.feature3.desc')}
                </p>
              </div>
              <div className={`text-center p-4 rounded-lg ${true ? 'bg-slate-800/30' : 'bg-white/50'}`}>
                <FaTachometerAlt className="text-3xl text-yellow-400 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${true ? 'text-white' : 'text-slate-900'}`}>{t('webdev.seo.feature4.title')}</h4>
                <p className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.seo.feature4.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERCEL ENTERPRISE HOSTING SECTION */}
      <section className={`relative py-20 px-6 overflow-hidden ${true ? '' : 'bg-slate-50/30'}`}>
        {/* Dynamic Background */}
        <div className={`absolute inset-0 ${true ? 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/40' : 'bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-slate-50/40'}`}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2020h20v20H0z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-16 right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-56 h-56 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full">
                <FaCrown className="text-3xl text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className={true ? 'text-white' : 'text-slate-900'}>{t('webdev.vercel.title1')}</span>{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('webdev.vercel.title2')}
                </span>
              </h2>
            </div>
            <div className={`backdrop-blur-sm rounded-2xl p-8 border ${true ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-400/20' : 'bg-white/70 border-blue-400/40'}`}>
              <p className={`text-2xl max-w-4xl mx-auto leading-relaxed ${true ? 'text-slate-200' : 'text-slate-700'}`}>
                {t('webdev.vercel.description')}{" "}
                <span className="text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-lg">
                  {t('webdev.vercel.descriptionHighlight')}
                </span>{" "}
                {t('webdev.vercel.descriptionEnd')}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Vercel Benefits */}
            <div className="slide-in-left delay-200">
              <div className={`relative backdrop-blur-sm rounded-3xl p-8 border shadow-2xl overflow-hidden ${true ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-400/40' : 'bg-white/80 border-blue-400/50'}`}>
                {/* Card Background Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                      <SiVercel className="text-4xl text-white" />
                    </div>
                    <div>
                      <h3 className={`text-3xl font-bold ${true ? 'text-white' : 'text-slate-900'}`}>
                        {t('webdev.vercel.hostingTitle')}
                      </h3>
                      <p className="text-blue-400 text-lg">{t('webdev.vercel.hostingSubtitle')}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: <FaBolt className="text-yellow-400" />,
                      title: t('webdev.vercel.feature1.title'),
                      desc: t('webdev.vercel.feature1.desc'),
                    },
                    {
                      icon: <FaGlobe className="text-blue-400" />,
                      title: t('webdev.vercel.feature2.title'),
                      desc: t('webdev.vercel.feature2.desc'),
                    },
                    {
                      icon: <FaShieldAlt className="text-green-400" />,
                      title: t('webdev.vercel.feature3.title'),
                      desc: t('webdev.vercel.feature3.desc'),
                    },
                    {
                      icon: <FaRocket className="text-purple-400" />,
                      title: t('webdev.vercel.feature4.title'),
                      desc: t('webdev.vercel.feature4.desc'),
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
                    >
                      <div className="text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className={`font-semibold mb-1 ${true ? 'text-white' : 'text-slate-900'}`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm ${true ? 'text-slate-300' : 'text-slate-600'}`}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hosting Comparison */}
                <div className={`rounded-lg p-6 border ${true ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-400/30' : 'bg-green-50/50 border-green-400/40'}`}>
                  <h4 className="font-bold text-green-500 mb-4 text-center">
                    {t('webdev.vercel.comparison.title')}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className={`text-sm mb-1 ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t('webdev.vercel.comparison.regular')}
                      </div>
                      <div className="text-red-400 font-semibold">
                        {t('webdev.vercel.comparison.regularSpeed')}
                      </div>
                      <div className="text-red-400 font-semibold">
                        {t('webdev.vercel.comparison.regularPrice')}
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-400 text-sm mb-1">
                        {t('webdev.vercel.comparison.vercel')}
                      </div>
                      <div className="text-green-400 font-semibold">
                        {t('webdev.vercel.comparison.vercelSpeed')}
                      </div>
                      <div className="text-green-400 font-semibold">
                        {t('webdev.vercel.comparison.vercelPrice')}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Right: Analytics Dashboard */}
            <div className="slide-in-right delay-400">
              <div className={`rounded-2xl p-6 border shadow-xl ${true ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-slate-300'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h4 className={`text-xl font-semibold flex items-center gap-2 ${true ? 'text-white' : 'text-slate-900'}`}>
                    <FaChartLine className="text-blue-400" />
                    {t('webdev.analytics.title')}
                  </h4>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    {t('webdev.analytics.live')}
                  </div>
                </div>

                {/* Real-time Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg p-4 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <FaUsers className="text-blue-400" />
                      <FaArrowUp className="text-green-400 text-xs" />
                    </div>
                    <div className={`text-2xl font-bold ${true ? 'text-white' : 'text-slate-900'}`}>1,847</div>
                    <div className="text-blue-400 text-sm">
                      {t('webdev.analytics.todayVisitors')}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <FaEye className="text-green-400" />
                      <span className="text-green-300 text-xs">+31%</span>
                    </div>
                    <div className={`text-2xl font-bold ${true ? 'text-white' : 'text-slate-900'}`}>8.2K</div>
                    <div className="text-green-400 text-sm">{t('webdev.analytics.pageViews')}</div>
                  </div>
                </div>

                {/* Device Stats */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t('webdev.analytics.devices')}
                    </span>
                    <span className={`text-xs ${true ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t('webdev.analytics.last24h')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaMobile className="text-purple-400" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{t('webdev.analytics.mobile')}</span>
                          <span className="text-white font-semibold">72%</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${true ? 'bg-slate-700' : 'bg-slate-300'}`}>
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[72%]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaDesktop className="text-blue-400" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{t('webdev.analytics.desktop')}</span>
                          <span className="text-white font-semibold">28%</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${true ? 'bg-slate-700' : 'bg-slate-300'}`}>
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-[28%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className={`rounded-lg p-4 ${true ? 'bg-slate-700/50' : 'bg-slate-200/50'}`}>
                  <div className={`text-xs mb-3 ${true ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t('webdev.analytics.performance')}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        1.2s
                      </div>
                      <div className={`text-xs ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.analytics.loading')}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">97</div>
                      <div className={`text-xs ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.analytics.speedScore')}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">
                        100%
                      </div>
                      <div className={`text-xs ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.analytics.uptime')}</div>
                    </div>
                  </div>
                </div>

                {/* Analytics Value Prop */}
                <div className={`mt-6 rounded-lg p-4 border ${true ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-400/30' : 'bg-blue-50/50 border-blue-400/40'}`}>
                  <h5 className="font-semibold text-blue-400 mb-2">
                    {t('webdev.analytics.insights.title')}
                  </h5>
                  <ul className={`text-sm space-y-1 ${true ? 'text-slate-300' : 'text-slate-600'}`}>
                    <li>{t('webdev.analytics.insights.1')}</li>
                    <li>{t('webdev.analytics.insights.2')}</li>
                    <li>{t('webdev.analytics.insights.3')}</li>
                    <li>{t('webdev.analytics.insights.4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ტექნოლოგიები - Compact */}
      <section className={`py-12 px-6 ${true ? '' : 'bg-gradient-to-br from-slate-50 to-blue-50/30'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 fade-in-up">
            <h2 className={`text-3xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
              {t('webdev.tech.title')}
              <br />{" "}
              <span className="text-green-500">
                {t('webdev.tech.subtitle')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="tech-card text-center">
              <div className={`p-6 rounded-xl border scale-in delay-100 ${true ? 'bg-slate-800/50 border-slate-700' : 'bg-white/70 border-slate-300'}`}>
                <FaReact className="text-5xl text-blue-400 mx-auto mb-3" />
                <div className={`font-bold text-lg mb-1 ${true ? 'text-white' : 'text-slate-900'}`}>React</div>
                <div className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.tech.react')}</div>
              </div>
            </div>
            <div className="tech-card text-center">
              <div className={`p-6 rounded-xl border scale-in delay-200 ${true ? 'bg-slate-800/50 border-slate-700' : 'bg-white/70 border-slate-300'}`}>
                <SiTypescript className="text-5xl text-blue-500 mx-auto mb-3" />
                <div className={`font-bold text-lg mb-1 ${true ? 'text-white' : 'text-slate-900'}`}>TypeScript</div>
                <div className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.tech.typescript')}</div>
              </div>
            </div>
            <div className="tech-card text-center">
              <div className={`p-6 rounded-xl border scale-in delay-300 ${true ? 'bg-slate-800/50 border-slate-700' : 'bg-white/70 border-slate-300'}`}>
                <SiFirebase className="text-5xl text-yellow-400 mx-auto mb-3" />
                <div className={`font-bold text-lg mb-1 ${true ? 'text-white' : 'text-slate-900'}`}>Firebase</div>
                <div className={`text-sm ${true ? 'text-slate-400' : 'text-slate-600'}`}>{t('webdev.tech.firebase')}</div>
              </div>
            </div>
            <div className="tech-card text-center">
              <div className={`p-6 rounded-xl border scale-in delay-400 border-blue-400/40 ${true ? 'bg-slate-800/50' : 'bg-white/70'}`}>
                <SiVercel className={`text-5xl mx-auto mb-3 ${true ? 'text-white' : 'text-slate-800'}`} />
                <div className="font-bold text-lg mb-1 text-blue-400">
                  Vercel
                </div>
                <div className="text-blue-400 text-sm">{t('webdev.tech.vercel')}</div>
              </div>
            </div>
          </div>

          {/* გარანტიები - Compact */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`hover-lift text-center p-6 rounded-xl border fade-in-up delay-100 ${true ? 'bg-slate-900/50 border-slate-700' : 'bg-white/70 border-slate-300'}`}>
              <FaMobile className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-3 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('webdev.guarantees.1.title')}
              </h3>
              <p className={true ? 'text-slate-400' : 'text-slate-600'}>
                {t('webdev.guarantees.1.desc')}
              </p>
            </div>
            <div className={`hover-lift text-center p-6 rounded-xl border fade-in-up delay-200 ${true ? 'bg-slate-900/50 border-slate-700' : 'bg-white/70 border-slate-300'}`}>
              <FaClock className="text-4xl text-green-400 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-3 ${true ? 'text-white' : 'text-slate-900'}`}>
                {t('webdev.guarantees.2.title')}
              </h3>
              <p className={true ? 'text-slate-400' : 'text-slate-600'}>
                {t('webdev.guarantees.2.desc')}
              </p>
            </div>
            <div className={`hover-lift text-center p-6 rounded-xl border fade-in-up delay-300 ${true ? 'bg-slate-900/50 border-slate-700' : 'bg-white/70 border-slate-300'}`}>
              <FaShieldAlt className="text-4xl text-purple-400 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-3 ${true ? 'text-white' : 'text-slate-900'}`}>{t('webdev.guarantees.3.title')}</h3>
              <p className={true ? 'text-slate-400' : 'text-slate-600'}>
                {t('webdev.guarantees.3.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ფინალური CTA - Compact */}
      <section className={`py-12 px-6 ${true ? 'bg-gradient-to-r from-green-900/40 to-blue-900/40' : 'bg-gradient-to-r from-green-100/50 to-blue-100/50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${true ? 'text-white' : 'text-slate-900'}`}>
              {t('webdev.cta.title')} <span className="text-green-500">{t('webdev.cta.highlight')}</span>{t('webdev.cta.title2')}
            </h2>
            <p className={`text-xl mb-8 leading-relaxed ${true ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('webdev.cta.description')}
              <span className="text-green-500 font-semibold">
                {t('webdev.cta.descriptionHighlight')}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/start-project"
                className="hover-scale bg-gradient-to-r from-green-500 to-blue-500 px-10 py-4 rounded-xl font-bold text-lg shadow-xl"
              >
                {t('webdev.cta.button1')}
              </Link>
              <a
                href="https://wa.me/995555123456"
                className="hover-scale border-2 border-green-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-500/10 transition-all duration-300"
              >
                {t('webdev.cta.button2')}
              </a>
            </div>

            <div className={`rounded-xl p-6 max-w-2xl mx-auto border ${true ? 'bg-slate-800/50 border-slate-600/50' : 'bg-white/70 border-slate-300/50'}`}>
              <p className={`text-lg mb-3 ${true ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('webdev.cta.benefits')}
              </p>
              <p className="text-green-500 font-medium">
                {t('webdev.cta.guarantee')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;
