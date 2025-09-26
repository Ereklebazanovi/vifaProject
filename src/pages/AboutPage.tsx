import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BeautifulBackground from "../components/BeautifulBackground";
import {
  FaLightbulb,
  FaHandshake,
  FaAward,
  FaArrowUp,
  FaCode,
  FaCamera,
  FaShare,
  FaBullhorn,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

const AboutPage = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("seo.about.title"),
    description: t("seo.about.description"),
    mainEntity: {
      "@type": "Organization",
      name: "Vifa Digital",
      description: t("seo.about.description"),
      url: "https://vifa.ge/about",
    },
  };

  // Services data
  const services = [
    {
      icon: <FaCode className="text-4xl text-blue-400" />,
      title: t("about.services.webdev.title"),
      description: t("about.services.webdev.description"),
    },
    {
      icon: <FaCamera className="text-4xl text-green-400" />,
      title: t("about.services.content.title"),
      description: t("about.services.content.description"),
    },
    {
      icon: <FaShare className="text-4xl text-purple-400" />,
      title: t("about.services.social.title"),
      description: t("about.services.social.description"),
    },
    {
      icon: <FaBullhorn className="text-4xl text-orange-400" />,
      title: t("about.services.ads.title"),
      description: t("about.services.ads.description"),
    },
  ];

  // Team values
  const values = [
    {
      icon: <FaLightbulb className="text-4xl text-yellow-400" />,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-400" />,
      title: t("about.values.partnership.title"),
      description: t("about.values.partnership.description"),
    },
    {
      icon: <FaAward className="text-4xl text-green-400" />,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
    {
      icon: <FaArrowUp className="text-4xl text-purple-400" />,
      title: t("about.values.growth.title"),
      description: t("about.values.growth.description"),
    },
  ];

  // Team members
  return (
    <>
      <SEO
        title={t("seo.about.title")}
        description={t("seo.about.description")}
        keywords={t("seo.about.keywords")}
        type="website"
        structuredData={aboutStructuredData}
      />

      {/* Beautiful Animated Background - Full Page Coverage */}
      <BeautifulBackground className="fixed inset-0 z-0" variant="blue" />

      <div className="relative z-10 min-h-screen mt-16">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <motion.div>
          </motion.div>

          {/* Our Story Section */}
          <motion.div
            className="max-w-3xl mx-auto mb-24 mt-28"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-light text-white mb-6">
                ჩვენ ვართ <span className="text-blue-400">Vifa Digital</span>
              </h2>
            </motion.div>

            <motion.div
              className="mx-auto max-w-2xl px-4 space-y-8 text-slate-200 text-lg leading-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Vifa Digital შეიქმნა 2021 წელს, ჩვენმა გუნდმა გადაწყვიტა შეექმნა ციფრული სააგენტო, რომელიც დაეხმარებოდა ქართულ ბიზნესებს წარმატებულად ფუნქციონირებაში ციფრულ სივრცეში.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                დღეს ჩვენ ვართ წამყვანი ციფრული სააგენტო საქართველოში, რომელიც მომსახურებას უწევს როგორც მცირე ბიზნესებს, ასევე დიდ კორპორაციებს. ჩვენი მიზანია ყოველი კლიენტისთვის შევქმნათ უნიკალური და ეფექტური ციფრული გადაწყვეტილება.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* What We Do Section */}
          <motion.div
            className="max-w-6xl mx-auto mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <h2 className="text-3xl font-light text-white mb-6">
                {t("about.whatWeDo.title")}{" "}
                <span className="text-blue-400">
                  {t("about.whatWeDo.titleHighlight")}
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                {t("about.whatWeDo.description")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-xl p-6 text-center hover:bg-black/70 transition-all duration-300"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                {t("about.values.title")}{" "}
                <span className="text-blue-400">
                  {t("about.values.titleHighlight")}
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                {t("about.values.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-purple-400/50 rounded-xl p-6 text-center hover:bg-black/70 transition-all duration-300"
                >
                  <div className="mb-4">{value.icon}</div>
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


          {/* Portfolio Section - Shorts Style */}
          <div className="max-w-7xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                ჩვენი <span className="text-blue-400">პორტფოლიო</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                ნახეთ ჩვენი წარმატებული პროექტები და კლიენტების შედეგები
              </p>
            </div>

            {/* Horizontal Scrollable Container */}
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-6 scroll-smooth scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                  `
                }} />

                {/* Shorts Video 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/TazE0o2dLUI"
                      title="Portfolio Shorts 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full rounded-2xl"
                      loading="lazy"
                    />

                    {/* Overlay Info - positioned to not block iframe */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pointer-events-none">
                      <h3 className="text-white font-semibold text-lg mb-2">რესტორნის მარკეტინგი</h3>
                      <p className="text-slate-300 text-sm">სოციალური მედია კამპანია</p>
                    </div>
                  </div>
                </motion.div>

                {/* Shorts Video 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/aOeZnTV3V3k"
                      title="Portfolio Shorts 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full rounded-2xl"
                      loading="lazy"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pointer-events-none">
                      <h3 className="text-white font-semibold text-lg mb-2">ვებსაიტის განვითარება</h3>
                      <p className="text-slate-300 text-sm">E-commerce პლატფორმა</p>
                    </div>
                  </div>
                </motion.div>

                {/* Shorts Video 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/VIDEO_ID_3?autoplay=0&mute=1"
                      title="Portfolio Shorts 3"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">ბრენდინგი</h3>
                      <p className="text-slate-300 text-sm">ლოგო და ვიზუალური იდენტობა</p>
                    </div>

                  </div>
                </motion.div>

                {/* Shorts Video 4 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/VIDEO_ID_4?autoplay=0&mute=1"
                      title="Portfolio Shorts 4"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">კონტენტ მარკეტინგი</h3>
                      <p className="text-slate-300 text-sm">ვიდეო პროდუქცია</p>
                    </div>

                  </div>
                </motion.div>

                {/* Shorts Video 5 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/VIDEO_ID_5?autoplay=0&mute=1"
                      title="Portfolio Shorts 5"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">SEO ოპტიმიზაცია</h3>
                      <p className="text-slate-300 text-sm">Google რეიტინგის გაუმजობესება</p>
                    </div>

                  </div>
                </motion.div>

                {/* Shorts Video 6 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/VIDEO_ID_6?autoplay=0&mute=1"
                      title="Portfolio Shorts 6"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">PPC რეკლამა</h3>
                      <p className="text-slate-300 text-sm">Google Ads კამპანია</p>
                    </div>

                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-400 animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="text-center mt-6 md:hidden">
              <p className="text-slate-400 text-sm">👈 გადაფურცლე ვიდეოების სანახავად</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-12">
              <h2 className="text-3xl font-light text-white mb-6">
                {t("about.cta.title")}
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {t("about.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/start-project"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t("about.cta.startProject")}
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
