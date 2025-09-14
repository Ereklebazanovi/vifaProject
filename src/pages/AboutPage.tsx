import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaRocket, 
  FaUsers, 
  FaHeart, 
  FaLightbulb, 
  FaAward,
  FaCode,
  FaCamera,
  FaChartLine,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithub
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { number: "50+", label: t('about.stats.projects'), icon: <FaRocket /> },
    { number: "25+", label: t('about.stats.clients'), icon: <FaUsers /> },
    { number: "3+", label: t('about.stats.experience'), icon: <FaAward /> },
    { number: "24/7", label: t('about.stats.support'), icon: <FaHeart /> }
  ];

  const values = [
    {
      icon: <FaLightbulb />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <FaUsers />,
      title: t('about.values.partnership.title'),
      description: t('about.values.partnership.description')
    },
    {
      icon: <FaHeart />,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: <FaRocket />,
      title: t('about.values.growth.title'),
      description: t('about.values.growth.description')
    }
  ];

  const team = [
    {
      name: t('about.team.ceo.name'),
      role: t('about.team.ceo.role'),
      bio: t('about.team.ceo.bio'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      },
      skills: [t('about.team.ceo.skill1'), t('about.team.ceo.skill2'), t('about.team.ceo.skill3')]
    },
    {
      name: t('about.team.creative.name'),
      role: t('about.team.creative.role'),
      bio: t('about.team.creative.bio'),
      image: "https://images.unsplash.com/photo-1494790108755-2616c88474bd?w=300&h=300&fit=crop",
      social: {
        linkedin: "#",
        instagram: "#"
      },
      skills: [t('about.team.creative.skill1'), t('about.team.creative.skill2'), t('about.team.creative.skill3')]
    },
    {
      name: t('about.team.developer.name'),
      role: t('about.team.developer.role'),
      bio: t('about.team.developer.bio'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      social: {
        github: "#",
        linkedin: "#"
      },
      skills: [t('about.team.developer.skill1'), t('about.team.developer.skill2'), t('about.team.developer.skill3')]
    }
  ];

  const services = [
    {
      icon: <FaCode />,
      title: t('about.services.webdev.title'),
      description: t('about.services.webdev.description')
    },
    {
      icon: <FaCamera />,
      title: t('about.services.content.title'),
      description: t('about.services.content.description')
    },
    {
      icon: <FaInstagram />,
      title: t('about.services.social.title'),
      description: t('about.services.social.description')
    },
    {
      icon: <FaChartLine />,
      title: t('about.services.ads.title'),
      description: t('about.services.ads.description')
    }
  ];

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
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
      `}</style>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-red-500/10 to-transparent' 
            : 'bg-gradient-to-br from-blue-500/5 to-transparent'
        }`}></div>
        
        <motion.div
          style={{ y: y1 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('about.hero.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                VIFA
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('about.hero.description')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="text-4xl text-red-400 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {stat.number}
                </div>
                <div className={`font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100/30'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('about.story.title')} <span className="text-red-400">{t('about.story.titleHighlight')}</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t('about.story.paragraph1')}
              </p>
              <p className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t('about.story.paragraph2')}
              </p>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t('about.story.paragraph3')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('about.values.title')} <span className="text-red-400">{t('about.values.titleHighlight')}</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('about.values.description')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group p-8 backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 transform hover:-translate-y-2 ${
                  isDarkMode
                    ? 'bg-slate-800/50 border-slate-700/50 hover:border-red-400/30'
                    : 'bg-white/60 border-slate-300/40 hover:border-red-400/40 shadow-lg'
                }`}
              >
                <div className="text-4xl text-red-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    

      {/* Services Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('about.whatWeDo.title')} <span className="text-red-400">{t('about.whatWeDo.titleHighlight')}</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('about.whatWeDo.description')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-red-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10"
              >
                <div className="flex items-start space-x-6">
                  <div className="text-4xl text-red-400 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500/10 to-red-600/10 border-t border-red-400/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t('about.cta.title')}
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/start-project"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:shadow-lg hover:shadow-red-500/30"
              >
                {t('about.cta.startProject')}
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold rounded-xl border border-slate-600/30 hover:border-red-400/30 transition-all duration-300"
              >
                {t('about.cta.contactUs')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;