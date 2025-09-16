import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaAward,
  FaArrowUp,
  FaCode,
  FaCamera,
  FaShare,
  FaBullhorn
} from 'react-icons/fa';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { useLanguageTransition } from '../hooks/useLanguageTransition';

const AboutPage = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t('seo.about.title'),
    "description": t('seo.about.description'),
    "mainEntity": {
      "@type": "Organization",
      "name": "Vifa Digital",
      "description": t('seo.about.description'),
      "url": "https://vifa.ge/about"
    }
  };

  // Stats data
  const stats = [
    {
      number: "50+",
      label: t('about.stats.projects'),
      color: "text-blue-400"
    },
    {
      number: "100+",
      label: t('about.stats.clients'),
      color: "text-green-400"
    },
    {
      number: "3+",
      label: t('about.stats.experience'),
      color: "text-purple-400"
    },
    {
      number: "24/7",
      label: t('about.stats.support'),
      color: "text-yellow-400"
    }
  ];

  // Services data
  const services = [
    {
      icon: <FaCode className="text-4xl text-blue-400" />,
      title: t('about.services.webdev.title'),
      description: t('about.services.webdev.description')
    },
    {
      icon: <FaCamera className="text-4xl text-green-400" />,
      title: t('about.services.content.title'),
      description: t('about.services.content.description')
    },
    {
      icon: <FaShare className="text-4xl text-purple-400" />,
      title: t('about.services.social.title'),
      description: t('about.services.social.description')
    },
    {
      icon: <FaBullhorn className="text-4xl text-orange-400" />,
      title: t('about.services.ads.title'),
      description: t('about.services.ads.description')
    }
  ];

  // Team values
  const values = [
    {
      icon: <FaLightbulb className="text-4xl text-yellow-400" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-400" />,
      title: t('about.values.partnership.title'),
      description: t('about.values.partnership.description')
    },
    {
      icon: <FaAward className="text-4xl text-green-400" />,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: <FaArrowUp className="text-4xl text-purple-400" />,
      title: t('about.values.growth.title'),
      description: t('about.values.growth.description')
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: t('about.team.ceo.name'),
      role: t('about.team.ceo.role'),
      bio: t('about.team.ceo.bio'),
      skills: [t('about.team.ceo.skill1'), t('about.team.ceo.skill2'), t('about.team.ceo.skill3')]
    },
    {
      name: t('about.team.creative.name'),
      role: t('about.team.creative.role'),
      bio: t('about.team.creative.bio'),
      skills: [t('about.team.creative.skill1'), t('about.team.creative.skill2'), t('about.team.creative.skill3')]
    },
    {
      name: t('about.team.developer.name'),
      role: t('about.team.developer.role'),
      bio: t('about.team.developer.bio'),
      skills: [t('about.team.developer.skill1'), t('about.team.developer.skill2'), t('about.team.developer.skill3')]
    }
  ];

  return (
    <>
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords={t('seo.about.keywords')}
        type="website"
        structuredData={aboutStructuredData}
      />

      {/* Video Background - Full Page Coverage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          {/* Always show dark background first for smooth loading */}
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Video loads on top with smooth fade */}
          {!videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: `brightness(0.4) contrast(1.2) saturate(1.1)`,
              }}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
            >
              <source src="/about-hero-videooo.mp4" type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-slate-950/30" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className={`container mx-auto px-8 py-10 ${getTransitionClasses()}`}>

          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-24 mt-25">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight"
              >
                {t('about.hero.title')}{" "}
                <span className="text-blue-400">Vifa Digital</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                {t('about.hero.description')}
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-6">
                {t('about.story.title')}{" "}
                <span className="text-blue-400">{t('about.story.titleHighlight')}</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>{t('about.story.paragraph1')}</p>
              <p>{t('about.story.paragraph2')}</p>
              <p>{t('about.story.paragraph3')}</p>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                {t('about.whatWeDo.title')}{" "}
                <span className="text-blue-400">{t('about.whatWeDo.titleHighlight')}</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                {t('about.whatWeDo.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 rounded-xl p-6 text-center hover:bg-slate-800/60 transition-all duration-300"
                >
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                {t('about.values.title')}{" "}
                <span className="text-blue-400">{t('about.values.titleHighlight')}</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                {t('about.values.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-purple-400/30 rounded-xl p-6 text-center hover:bg-slate-800/60 transition-all duration-300"
                >
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                ჩვენი <span className="text-blue-400">გუნდი</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-12">
              <h2 className="text-3xl font-light text-white mb-6">
                {t('about.cta.title')}
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {t('about.cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/start-project"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t('about.cta.startProject')}
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                >
                  {t('about.cta.contactUs')}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutPage;