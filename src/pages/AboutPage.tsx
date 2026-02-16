import { Link } from "react-router-dom";
import { useEffect } from "react";
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

// AboutPage Translations///
const aboutPageTranslations = {
  ka: {
    "seo.about.title": "ჩვენ შესახებ - Invento Technologies & VIFA Digital კოლაბორაცია | inventogeo.com",
    "seo.about.description": "Invento Technologies და VIFA Digital კოლაბორაცია. ტექნოლოგიური გადაწყვეტილებები და მარკეტინგის სერვისები საქართველოში. inventogeo.com",
    "seo.about.keywords": "Invento Technologies, VIFA Digital, კოლაბორაცია, ტექნოლოგიები, ციფრული მარკეტინგი, inventogeo.com",
    "about.services.webdev.title": "ვებ განვითარება",
    "about.services.webdev.description": "თანამედროვე, სწრაფი და მობილურზე ოპტიმიზირებული ვებსაიტები",
    "about.services.content.title": "კონტენტ პროდუქცია",
    "about.services.content.description": "პროფესიონალური ფოტო და ვიდეო მასალების შექმნა",
    "about.services.social.title": "სოციალური მედია",
    "about.services.social.description": "Instagram და Facebook გვერდების მართვა და ზრდა",
    "about.services.ads.title": "ციფრული რეკლამა",
    "about.services.ads.description": "Google Ads და სოციალური მედიის რეკლამები",
    "about.values.innovation.title": "ინოვაცია",
    "about.values.innovation.description": "ყოველთვის ვეძებთ ახალ და ეფექტურ გზებს",
    "about.values.partnership.title": "პარტნიორობა",
    "about.values.partnership.description": "ჩვენ არ ვართ მხოლოდ მომსახურების მწარმოებლები, არამედ თქვენი პარტნიორები",
    "about.values.quality.title": "ხარისხი",
    "about.values.quality.description": "ყოველი პროექტი შესრულებულია უმაღლესი ხარისხის სტანდარტებით",
    "about.values.growth.title": "ზრდა",
    "about.values.growth.description": "ჩვენი მიზანია თქვენი ბიზნესის მდგრადი ზრდა",
    "about.values.title": "ჩვენი",
    "about.values.titleHighlight": "ღირებულებები",
    "about.cta.title": "მზად ხარ დაიწყო თანამშრომლობა?",
    "about.cta.startProject": "დაიწყე პროექტი",
  },
  en: {
    "seo.about.title": "About Us - Invento Technologies & VIFA Digital Collaboration | inventogeo.com",
    "seo.about.description": "Invento Technologies and VIFA Digital collaboration. Technology solutions and marketing services in Georgia. inventogeo.com",
    "seo.about.keywords": "Invento Technologies, VIFA Digital, collaboration, technology solutions, digital marketing, inventogeo.com",
    "about.services.webdev.title": "Web Development",
    "about.services.webdev.description": "Modern, fast and mobile optimized websites",
    "about.services.content.title": "Content Production",
    "about.services.content.description": "Professional photography and video production",
    "about.services.social.title": "Social Media",
    "about.services.social.description": "Instagram and Facebook page management and growth",
    "about.services.ads.title": "Digital Ads",
    "about.services.ads.description": "Google Ads and social media advertising",
    "about.values.innovation.title": "Innovation",
    "about.values.innovation.description": "Always looking for new and effective ways",
    "about.values.partnership.title": "Partnership",
    "about.values.partnership.description": "We are not just service providers, we are your partners",
    "about.values.quality.title": "Quality",
    "about.values.quality.description": "Every project is executed to the highest quality standards",
    "about.values.growth.title": "Growth",
    "about.values.growth.description": "Our goal is sustainable growth of your business",
    "about.values.title": "Our",
    "about.values.titleHighlight": "Values",
    "about.cta.title": "Ready to start collaborating?",
    "about.cta.startProject": "Start Project",
    "about.story.heading": "We are Vifa Digital",
    "about.story.paragraph1": "VIFA was created in 2020, when our team decided to create a digital agency that would help Georgian businesses function successfully in the digital space. Today we are a leading digital agency in Georgia, serving both small businesses and large corporations. Our goal is to create unique and effective digital solutions for every client.",
    "about.story.paragraph2": "We deeply analyze the specifics of the local market and know what your business needs to succeed. Our goal is to increase the competitiveness of our clients in the digital world. Every project, whether it's a small business or a large corporation, is created with an individual strategy. We ensure that you get a real strategic advantage and digital solutions that directly impact your results.",
    "about.services.heading": "Services",
    "about.portfolio.heading": "Our",
    "about.portfolio.subheading": "Successful projects",
    "about.portfolio.swipeHint": "Scroll to see videos",
    "about.story.title": "About Vifa Digital",
  },
};

const AboutPage = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = aboutPageTranslations[currentLanguage as keyof typeof aboutPageTranslations] as Record<string, string>;
    return translations[key] || key;
  };
  const { getTransitionClasses } = useLanguageTransition();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("seo.about.title"),
    description: t("seo.about.description"),
    mainEntity: {
      "@type": "Organization",
      name: "Invento Technologies & VIFA Digital",
      description: t("seo.about.description"),
      url: "https://inventogeo.com/about",
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
        url="https://inventogeo.com/about"
        type="website"
        structuredData={aboutStructuredData}
      />

      {/* Beautiful Animated Background - Full Page Coverage */}
      <BeautifulBackground className="fixed inset-0 z-0" variant="blue" />

      <div className="relative z-10 min-h-screen mt-16">
        <div
          className={`container mx-auto px-4 sm:px-6 !max-w-7xl lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <motion.div></motion.div>

          {/* Our Story Section */}
          <motion.div
            className={`max-w-3xl mx-auto mb-24 mt-28 ${getTransitionClasses()}`}
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
                {currentLanguage === "ka" ? "ჩვენ ვართ" : "We are"}{" "}
                <span className="text-blue-400">Vifa Digital</span>
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
                {currentLanguage === "ka"
                  ? "VIFA შეიქმნა 2020 წელს, ჩვენმა გუნდმა გადაწყვიტა შეექმნა ციფრული სააგენტო, რომელიც ციფრულ სივრცეში ქართულ ბიზნესებს წარმატებულად ფუნქციონირებაში დაეხმარებოდა. დღეს ჩვენ ვართ წამყვანი ციფრული სააგენტო საქართველოში, რომელიც მომსახურებას უწევს როგორც მცირე ბიზნესებს, ასევე დიდ კორპორაციებს. ჩვენი მიზანია ყოველი მომხმარებლებისთვის შევქმნათ უნიკალური და ეფექტური ციფრული გადაწყვეტილება."
                  : "VIFA was created in 2020, when our team decided to create a digital agency that would help Georgian businesses function successfully in the digital space. Today we are a leading digital agency in Georgia, serving both small businesses and large corporations. Our goal is to create unique and effective digital solutions for every client."}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {currentLanguage === "ka"
                  ? "ჩვენ სიღრმისეულად ვაანალიზებთ ადგილობრივი ბაზრის სპეციფიკას და ვიცით, რა სჭირდება თქვენს ბიზნესს წარმატების მისაღწევად. ჩვენი მიზანია, გავზარდოთ ჩვენი კლიენტების კონკურენტუნარიანობა ციფრულ სამყაროში. თითოეული პროექტი, იქნება ეს მცირე ბიზნესი თუ მსხვილი კორპორაცია, იქმნება ინდივიდუალური სტრატეგიით. ჩვენ ვუზრუნველყოფთ, რომ თქვენ მიიღოთ რეალური სტრატეგიული უპირატესობა და ციფრული გადაწყვეტილებები, რომლებიც პირდაპირ აისახება შედეგებზე."
                  : "We deeply analyze the specifics of the local market and know what your business needs to succeed. Our goal is to increase the competitiveness of our clients in the digital world. Every project, whether it's a small business or a large corporation, is created with an individual strategy. We ensure that you get a real strategic advantage and digital solutions that directly impact your results."}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* What We Do Section */}
          <motion.div
            className={`max-w-6xl mx-auto mb-24 ${getTransitionClasses()}`}
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
                <span className="text-blue-400">
                  {currentLanguage === "ka" ? "სერვისები" : t("about.services.heading")}
                </span>
              </h2>
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
          <div className={`max-w-6xl mx-auto mb-24 ${getTransitionClasses()}`}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                {t("about.values.title")}{" "}
                <span className="text-blue-400">
                  {t("about.values.titleHighlight")}
                </span>
              </h2>
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
          <div className={`max-w-7xl mx-auto mb-24 ${getTransitionClasses()}`}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">
                {currentLanguage === "ka" ? "ჩვენი" : t("about.portfolio.heading")}{" "}
                <span className="text-blue-400">
                  {currentLanguage === "ka" ? "პორტფოლიო" : "Portfolio"}
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                {currentLanguage === "ka"
                  ? "წარმატებული პროექტები"
                  : t("about.portfolio.subheading")}
              </p>
            </div>

            {/* Horizontal Scrollable Container */}
            <div className="relative">
              <div
                className="flex gap-4 overflow-x-auto pb-6 scroll-smooth scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                  `,
                  }}
                />

                {/* Shorts Video 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/Mg9yzpeICo4"
                      title="Portfolio Shorts 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full rounded-2xl"
                      loading="lazy"
                    />

                    {/* Overlay Info - positioned to not block iframe */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pointer-events-none"></div>
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
                      src="https://www.youtube-nocookie.com/embed/QCL5rC97NHU"
                      title="Portfolio Shorts 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/8UQypoxIP9c"
                      title="Portfolio Shorts 5"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/TazE0o2dLUI"
                      title="Portfolio Shorts 6"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />
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
                      src="https://www.youtube.com/embed/ILLhmaWTzjE"
                      title="Portfolio Shorts 3"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />
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
                      src="https://www.youtube.com/embed/PRkEkx5KHc0"
                      title="Portfolio Shorts 4"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                </motion.div>

                {/* Shorts Video 5 */}

                {/* Shorts Video 6 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/uXTAkbFCsQo"
                      title="Portfolio Shorts 6"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex-shrink-0 w-[280px] h-[500px] bg-black/50 backdrop-blur-md border border-slate-800/30 hover:border-blue-400/50 rounded-2xl overflow-hidden hover:bg-black/70 transition-all duration-300 relative group"
                >
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/Qpq3OY2BbMc"
                      title="Portfolio Shorts 6"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-400 animate-pulse">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="text-center mt-6 md:hidden">
              <p className="text-slate-400 text-sm">
                {currentLanguage === "ka"
                  ? "გასქროლე ვიდეოების სანახავად"
                  : t("about.portfolio.swipeHint")}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`max-w-3xl mx-auto text-center ${getTransitionClasses()}`}>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-12">
              <h2 className="text-3xl font-light text-white mb-6">
                {t("about.cta.title")}
              </h2>

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
