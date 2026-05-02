"use client";

import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaChartLine,
  FaQuoteLeft,
  FaArrowRight,
  FaLayerGroup,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

// AboutPage Translations
const aboutPageTranslations = {
  ka: {
    "seo.about.title": "ჩვენ შესახებ | VIFA DIGITAL",
    "seo.about.description": "VIFA - ტექნოლოგიური და კრეატიული სააგენტო. ციფრული ტრანსფორმაცია, ვებ დეველოპმენტი, მარკეტინგი და ქონთენთ პროდუქცია.",
    "seo.about.keywords": "VIFA, სააგენტო, ციფრული მარკეტინგი, ვებ დეველოპმენტი, ფოტო ვიდეო გადაღება, საქართველო",
    
    "about.hero.title": "ჩვენს შესახებ",
    "about.hero.subtitle": "ციფრული ტრანსფორმაციის სააგენტო",
    
    "about.intro.p1": "VIFA წარმოადგენს ტექნოლოგიურ და კრეატიულ სააგენტოს, რომელიც 2020 წლიდან აქტიურად პოზიციონირებს ქართულ ბაზარზე. ჩვენი საქმიანობის მთავარი პრიორიტეტია ადგილობრივი ბიზნესების ციფრული ტრანსფორმაცია და მათი პოტენციალის რეალურ წარმატებად გარდაქმნა.",
    "about.intro.p2": "დაარსების დღიდან, VIFA-მ წარმატებით განახორციელა მრავალი კომპლექსური პროექტი სხვადასხვა ინდუსტრიაში - მათ შორის ტურიზმის, სილამაზისა და ჯანმრთელობის, რითეილისა და B2B სექტორებში. ჩვენი გუნდი აერთიანებს მაღალი კვალიფიკაციის მქონე ექსპერტებს, რომლებიც ორიენტირებულნი არიან არა მხოლოდ პროექტის ვიზუალურ ან ტექნიკურ სრულყოფაზე, არამედ პარტნიორი კომპანიების გრძელვადიან ეკონომიკურ პროგრესზე.",
    
    "about.philosophy.title": "ჩვენი მიდგომა",
    "about.philosophy.quote": "ვქმნით სისტემებს, რომლებიც მუშაობს.",
    "about.philosophy.desc": "ჩვენი სამუშაო პროცესი პრაგმატულია. იქნება ეს ტექნიკური არქიტექტურის შექმნა, ბრენდინგი თუ მარკეტინგული კამპანია, ყველაფერი ემსახურება ერთ მიზანს: მომხმარებლის იდეალურ გამოცდილებას და ბიზნესის ზრდას. ვმუშაობთ ზედმეტი ბიუროკრატიისა და შაბლონების გარეშე.",
    
    "about.why.title": "რატომ VIFA?",
    "about.why.exp.title": "პრაქტიკული გამოცდილება",
    "about.why.exp.desc": "2020 წლიდან ვმუშაობთ რეალურ პროექტებზე. ჩვენ არ ვიყენებთ შაბლონურ მეთოდებს - ვაანალიზებთ თქვენს სპეციფიკას და ვქმნით იმას, რაც ზუსტად ახლა სჭირდება თქვენს ბიზნესს.",
    "about.why.fullservice.title": "360° ციფრული მხარდაჭერა",
    "about.why.fullservice.desc": "ვებ-დეველოპმენტი, სოციალური მედიის მართვა, ციფრული რეკლამა და პროფესიონალური ფოტო/ვიდეო პროდუქცია - ყველაფერი ერთ სივრცეში, ბრენდის ერთიანი და ეფექტური კომუნიკაციისთვის.",
    "about.why.results.title": "გაზომვადი შედეგები",
    "about.why.results.desc": "არ ვქმნით პროდუქტს მხოლოდ ვიზუალისთვის. ჩვენი მიზანია კონვერსიის ზრდა, ოპერაციების გამარტივება და რეალური ბიზნეს-ღირებულების შექმნა.",
    
    "about.portfolio.title": "პორტფოლიო",
    "about.portfolio.subtitle": "ჩვენი წარმატებული პროექტები",
    "about.portfolio.swipe": "გასქროლეთ ვიდეოების სანახავად",

    "about.outro": "დღეს VIFA არის თქვენი სტრატეგიული პარტნიორი ციფრული განვითარების გზაზე, რომელიც გეხმარებათ იდეების რეალურ ბიზნეს შედეგებად გარდაქმნაში.",
    "about.cta.button": "დაიწყე პროექტი",
  },
  en: {
    "seo.about.title": "About Us | VIFA DIGITAL",
    "seo.about.description": "VIFA - Technology and Creative Agency. Digital transformation, web development, marketing, and content production.",
    "seo.about.keywords": "VIFA, creative agency, digital marketing, web development, photo video production, Georgia",
    
    "about.hero.title": "About Us",
    "about.hero.subtitle": "Digital Transformation Agency",
    
    "about.intro.p1": "VIFA is a technological and creative agency that has been actively positioning itself in the Georgian market since 2020. Our main priority is the digital transformation of local businesses and converting their potential into real success.",
    "about.intro.p2": "Since its inception, VIFA has successfully executed numerous complex projects across various industries - including tourism, health and beauty, retail, and B2B sectors. Our team brings together highly qualified experts who focus not only on the visual or technical perfection of the project but also on the long-term economic progress of our partner companies.",
    
    "about.philosophy.title": "Our Approach",
    "about.philosophy.quote": "We build systems that work.",
    "about.philosophy.desc": "Our workflow is pragmatic. Whether it's building technical architecture, branding, or a marketing campaign, everything serves one goal: an ideal user experience and continuous business growth. We work without unnecessary bureaucracy or templates.",
    
    "about.why.title": "Why VIFA?",
    "about.why.exp.title": "Practical Experience",
    "about.why.exp.desc": "Working on real projects since 2020. We don't use template methods - we analyze your specifics and build exactly what your business needs right now.",
    "about.why.fullservice.title": "360° Digital Support",
    "about.why.fullservice.desc": "Web development, social media management, digital advertising, and professional photo/video production - everything in one place for your brand's unified and effective communication.",
    "about.why.results.title": "Measurable Results",
    "about.why.results.desc": "We don't create products just for aesthetics. Our goal is to increase conversion, streamline operations, and create real business value.",
    
    "about.portfolio.title": "Portfolio",
    "about.portfolio.subtitle": "Our Successful Projects",
    "about.portfolio.swipe": "Swipe to see videos",

    "about.outro": "Today, VIFA is your strategic partner on the path to digital development, helping you transform ideas into real business results.",
    "about.cta.button": "Start Project",
  },
};

const AboutPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  const t = (key: string): string => {
    const translations = aboutPageTranslations[currentLanguage as keyof typeof aboutPageTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whyVifaFeatures = [
    {
      icon: <FaChartLine />,
      color: "text-blue-400",
      titleKey: "about.why.exp.title",
      descKey: "about.why.exp.desc",
    },
    {
      icon: <FaLayerGroup />,
      color: "text-purple-400",
      titleKey: "about.why.fullservice.title",
      descKey: "about.why.fullservice.desc",
    },
    {
      icon: <FaBullseye />,
      color: "text-emerald-400",
      titleKey: "about.why.results.title",
      descKey: "about.why.results.desc",
    },
  ];

  return (
    <>
      <SEO
        title={t("seo.about.title")}
        description={t("seo.about.description")}
        url="https://vifadigital.ge/about"
      />

      {/* Modern Dark Background Layer */}
      <div className="fixed inset-0 z-0 bg-[#060608]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.03)_0%,transparent_50%)]" />
      </div>

      <div className={`relative z-10 w-full min-h-screen pt-32 pb-24 ${getTransitionClasses()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ── 1. Hero & Intro ── */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4 block">
              {t("about.hero.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-10">
              {t("about.hero.title")}
            </h1>
            
            <div className="space-y-6 text-base sm:text-lg text-gray-400 leading-relaxed text-justify sm:text-center">
              <p>{t("about.intro.p1")}</p>
              <p>{t("about.intro.p2")}</p>
            </div>
          </div>

          {/* ── 2. Philosophy (Glassmorphism Quote Banner) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto mb-32"
          >
            <div className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="text-4xl sm:text-5xl text-white/10 shrink-0">
                  <FaQuoteLeft />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
                    {t("about.philosophy.title")}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-medium text-white leading-tight mb-4 italic">
                    "{t("about.philosophy.quote")}"
                  </p>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">
                    {t("about.philosophy.desc")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 3. Why VIFA? (Bento Grid) ── */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">
                {t("about.why.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {whyVifaFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-[#0A0A0C] border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div className={`text-2xl mb-6 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── 4. Portfolio Shorts (Design Matched to Vifa) ── */}
          <div className="max-w-7xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                {t("about.portfolio.title")}
              </h2>
              <p className="text-gray-500">
                {t("about.portfolio.subtitle")}
              </p>
            </div>

            {/* Horizontal Scrollable Container */}
            <div className="relative">
              <div
                className="flex gap-6 overflow-x-auto pb-8 scroll-smooth scrollbar-hide snap-x px-4 sm:px-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />

                {/* Video 1 */}
                <div className="snap-center flex-shrink-0 w-[280px] h-[500px] bg-[#0A0A0C] border border-white/[0.05] rounded-2xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/Mg9yzpeICo4"
                    title="Portfolio 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                {/* Video 2 */}
                <div className="snap-center flex-shrink-0 w-[280px] h-[500px] bg-[#0A0A0C] border border-white/[0.05] rounded-2xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/QCL5rC97NHU"
                    title="Portfolio 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                {/* Video 3 */}
                <div className="snap-center flex-shrink-0 w-[280px] h-[500px] bg-[#0A0A0C] border border-white/[0.05] rounded-2xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/ILLhmaWTzjE"
                    title="Portfolio 3"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                {/* Video 4 */}
                <div className="snap-center flex-shrink-0 w-[280px] h-[500px] bg-[#0A0A0C] border border-white/[0.05] rounded-2xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/PRkEkx5KHc0"
                    title="Portfolio 4"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                {/* Video 5 */}
                <div className="snap-center flex-shrink-0 w-[280px] h-[500px] bg-[#0A0A0C] border border-white/[0.05] rounded-2xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/8UQypoxIP9c"
                    title="Portfolio 5"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-2 md:hidden">
              <p className="text-gray-500 text-xs">
                {t("about.portfolio.swipe")}
              </p>
            </div>
          </div>

          {/* ── 5. Outro & CTA ── */}
          <div className="max-w-3xl mx-auto text-center border-t border-white/[0.05] pt-20">
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10">
              {t("about.outro")}
            </p>
           
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutPage;