"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import SEO from "../components/SEO";

// NewHome Translations
const newHomeTranslations = {
  ka: {
    "seo.home.title":
      "VIFA Digital - ციფრული მარკეტინგი საქართველოში | vifadigital.ge",
    "seo.home.description":
      "VIFA Digital - ციფრული მარკეტინგის სერვისები: ვიდეო გადაღება, ფოტოგრაფია, სოციალური მედია მართვა, კონტენტის შექმნა. სრული მარკეტინგ პაკეტი თქვენი ბიზნესისთვის.",

    "ome.badge": "გააციფრულე შენი ბიზნესი",
    "newHome.hero.title": "შექმენი კომუნიკაციის ხიდი",
    "newHome.hero.titleStart": "შექმენი",
    "newHome.hero.titleGradient": "კომუნიკაციის ხიდი",
    "newHome.hero.brand": "ბრენდსა და მომხმარებელს ",
    "newHome.hero.connection": "შორის",
    "newHome.hero.description":
      "ჩვენი ყველა პროექტი იწყება თქვენი ბიზნესის საჭიროებების ღრმა ანალიზით. ეს საწყისი კვლევა უზრუნველყოფს, რომ მიღებული სტრატეგია ზუსტად იყოს მორგებული თქვენს უნიკალურ მიზნებსა და ეფექტურ შედეგებს.",

    "newHome.visual.description": "ვირტუალური საკომუნიკაციო ხიდი",
    "newHome.visual.brand": "ბრენდი",
    "newHome.visual.audience": "აუდიტორია",

    "newHome.services.research.title": "კვლევა & ანალიზი",
    "newHome.services.research.description":
      "ღრმა ბაზრის კვლევა, კონკურენტების ანალიზი და თქვენი ბიზნესის უნიკალური შესაძლებლობების გამოვლენა",

    "newHome.services.strategy.title": "სტრატეგია & დაგეგმვა",
    "newHome.services.strategy.description":
      "პერსონალიზირებული ტექნოლოგიური განვითარების სტრატეგიები, რომელიც მორგებულია თქვენს ბიზნეს მიზნებზე და ბიუჯეტზე",

    "newHome.services.execution.title": "განხორციელება",
    "newHome.services.execution.description":
      "პროფესიონალური პროდუქტის შექმნა, მუდმივი ოპტიმიზაცია და გამჭირვალე რეპორტინგი შედეგების მისაღწევად",

    "newHome.interactive.processTitle": "როგორ მუშაობს",
    "newHome.interactive.processTitleHighlight": "VIFA-ს გუნდი?",

    "newHome.interactive.step1.title": "1. კვლევა",
    "newHome.interactive.step1.subtitle": "აუდიტორიის გაცნობა",
    "newHome.interactive.step1.description":
      "ვადგენთ თქვენი კლიენტების მოთხოვნებს და იმ სირთულეებს, რასაც ისინი აწყდებიან. ეს გვეხმარება ზუსტად განვსაზღვროთ, როგორ შეუძლია თქვენს პროდუქტს ან სერვისს შესთავაზოს მათ რეალური სარგებელი.",

    "newHome.interactive.step2.title": "2. სტრატეგია",
    "newHome.interactive.step2.subtitle": "სწორი გზის დაგეგმვა",
    "newHome.interactive.step2.description":
      "ვქმნით კონკრეტულ და მიზანმიმართულ გეგმას, რომელიც პასუხობს კითხვებს: რა კონტენტით, რომელ პლატფორმებზე და რამხელა ბიუჯეტით უნდა მიაღწიოთ წარმატებას.",

    "newHome.interactive.step3.title": "3. განხორციელება",
    "newHome.interactive.step3.subtitle": "კამპანიების გაშვება",
    "newHome.interactive.step3.description":
      "აქტიური ფაზა მოიცავს: რეკლამების გაშვებას, კონტენტის გამოქვეყნებას და ყველა მიმდინარე პროცესის ეფექტურ მართვასა და კონტროლს.",

    "newHome.interactive.step4.title": "4. შედეგი",
    "newHome.interactive.step4.subtitle": "შედეგების ანალიზი",
    "newHome.interactive.step4.description":
      "ვაანალიზებთ მიღებულ რეალურ შედეგებს. მიღებული მონაცემების საფუძველზე, ვახდენთ სტრატეგიის ოპტიმიზაციას იმ კომპონენტების გასაუმჯობესებლად, რომლებიც არ მუშაობს სასურველი ეფექტით.",

    "newHome.interactive.challengesTitle": "21-ე საუკუნის გამოწვევები",

    "newHome.interactive.challenge1.title": "ინფორმაციის სიჭარბე",
    "newHome.interactive.challenge1.description":
      "ინფორმაციის სიჭარბის პირობებში, მომხმარებლის ყურადღების მოსაზიდად მხოლოდ 3 - 8 წამი გაქვთ. პირველი შთაბეჭდილება გადამწყვეტია. ჩვენ ვქმნით პროდუქტს, რომელიც მომენტალურად გადმოსცემს მთავარ სათქმელს.",

    "newHome.interactive.challenge2.title": "მობილური გამოცდილება",
    "newHome.interactive.challenge2.description":
      "ტრეფიკის 75%-ზე მეტი მოდის სმარტფონებიდან. თქვენი ვებსაიტი აუცილებლად უნდა იყოს სრულად ადაპტირებული, სწრაფი და უზრუნველყოფდეს უმაღლეს მობილურ გამოცდილებას, რათა არ დაკარგოთ პოტენციური კლიენტები.",

    "newHome.interactive.challenge3.title": "ახალი ტექნოლოგიები",
    "newHome.interactive.challenge3.description":
      "ხელოვნური ინტელექტი (AI), პროცესების ავტომატიზაცია და ციფრული პლატფორმების მუდმივი ევოლუცია მოითხოვს უწყვეტ ადაპტაციას.",

    "newHome.interactive.challenge4.title": "გლობალური კონკურენცია",
    "newHome.interactive.challenge4.description":
      "ონლაინ სივრცეში კონკურენცია გლობალურია. უნიკალური სტრატეგია და პროფესიონალური მიდგომა აუცილებელია იმისათვის, რომ გამოირჩეთ და მოიპოვოთ მომხმარებლის ყურადღება",

    "newHome.final.question": "მზად ხარ დაიწყო თანამშრომლობა?",
    "newHome.final.button": "უფასო კონსულტაცია",

    "newHome.services.sectionTitle": "ჩვენი სერვისები",
    "newHome.services.sectionSubtitle":
      "მომავლის ტექნოლოგიები თქვენი ბიზნესის წარმატებისთვის",

    "newHome.services.webdev.title": "Web Development",
    "newHome.services.webdev.description":
      "ბიზნესის სრული ციფრული ტრანსფორმაციისთვის განკუთვნილი თანამედროვე ვებ სისტემები",
    "newHome.services.webdev.feature1": "სავიზიტო და კორპორატიული ვებ-გვერდები",
    "newHome.services.webdev.feature2": "ონლაინ გაყიდვების სისტემები",
    "newHome.services.webdev.feature3": "ბიზნეს პროცესების ავტომატიზაცია",
    "newHome.services.webdev.cta": "იხილეთ მეტი",

    "newHome.services.ai.title": "AI Chatbot",
    "newHome.services.ai.description":
      "მომხმარებელთან კომუნიკაციისა და ბიზნეს პროცესების სრული ავტომატიზაცია AI ტექნოლოგიებით",
    "newHome.services.ai.greeting": "🇬🇪 გამარჯობა!",
    "newHome.services.ai.thinking": "🤖 AI ფიქრობს...",
    "newHome.services.ai.feature1": "მომსახურება ყველა პლატფორმაზე",
    "newHome.services.ai.feature2": "ქართულად კომუნიკაციის მხარდაჭერა",
    "newHome.services.ai.feature3": "24 საათის განმავლობაში პასუხი",
    "newHome.services.ai.cta": "იხილეთ მეტი",

    "newHome.services.marketing.title": "Digital Marketing",
    "newHome.services.marketing.description":
      "სარეკლამო სტრატეგიები თქვენი ბიზნესის მასშტაბური ზრდის და ბაზარზე ლიდერობის ისთვის",
    "newHome.services.marketing.feature1": "სოციალური მედიის მძლავრი ბრენდინგი",
    "newHome.services.marketing.feature2": "მოგებაზე ორიენტირებული კამპანიები",
    "newHome.services.marketing.feature3": "შედეგების ანალიზი და პროგნოზირება",
    "newHome.services.marketing.cta": "იხილეთ მეტი",

    "newHome.services.invento.title": "Invento System",
    "newHome.services.invento.description": "მართეთ საწყობი, გაყიდვები და ფინანსები ერთ სივრცეში. ქართული SaaS პლატფორმა.",
    "newHome.services.invento.feature1": "რეალურ დროში მარაგების მართვა",
    "newHome.services.invento.feature2": "ავტომატური ინვოისინგი",
    "newHome.services.invento.feature3": "Excel რეპორტები და ანალიტიკა",
    "newHome.services.invento.cta": "იხილეთ მეტი",

    "newHome.consequences.title": "რა მოსდის ბიზნესს",
    "newHome.consequences.highlight": "ციფრული არსებობის გარეშე",
    "newHome.consequences.button": "რატომ არის ციფრული არსებობა აუცილებელი?",
    "newHome.consequences.backButton": "უკან დაბრუნება",

    "newHome.hero.button1": "ვებ განვითარება",
    "newHome.hero.button2": "მარკეტინგი",
    "newHome.hero.button3": "AI სერვისი",
    "newHome.hero.button4": "Invento Software",
    "newHome.hero.button5": "უფასო კონსულტაცია",

    "newHome.consequence1.title": "გაყიდვების შემცირება",
    "newHome.consequence1.description":
      "ციფრული Дани წარუმატებელი პირდაპირ იწვევს პოტენციური კლიენტების 80%-ის დაკარგვას. თუ თქვენი პროდუქტი ონლაინ არ იძებნება, ავტომატურად ხდება გაყიდვების მნიშვნელოვანი შემცირება.",

    "newHome.consequence2.title": "კონკურენტებთან ჩამორჩენა",
    "newHome.consequence2.description":
      "კონკურენტები, რომლებიც არიან ციფრულ ბაზარზე ბევრად მარტივად აღწევენ სამიზნე აუდიტორიას. ეს უზრუნველყოფს მათ სწრაფ ზრდას და ბაზარზე დომინირებას. ონლაინ სერვისის გარეშე, თქვენი ბიზნესი მუდმივად ჩამორჩენაშია.",

    "newHome.consequence3.title": "ნდობის დაკარგვა",
    "newHome.consequence3.description":
      "თანამედროვე მომხმარებლები უნდობლობით ეკიდებიან ისეთ ბიზნესებს, რომლებსაც სათანადო ციფრული წყაროები არ გააჩნიათ. კვლევები ადასტურებს, რომ კლიენტები ონლაინ სერვისებს (ვებგვერდი, აქტიური სოციალური არხები) სანდოობის უმთავრეს ფაქტორად მიიჩნევენ. მისი germania პირდაპირ აზიანებს თქვენი ბიზნესის რეპუტაციას.",

    "newHome.consequence4.title": "24/7 ხელმისაწვდომობა",
    "newHome.consequence4.description":
      "ციფრული პლატფორმის გარეშე შეუძლებელია 24/7 ხელმისაწვდომობის უზრუნველყოფა. ეს ნიშნავს, რომ თქვენი ბიზნესი მუდმივად კარგავს შესაძლებლობებს და მომხმარებელს, რადგან ვერ ემსახურება მათ არასამუშაო საათებში. ონლაინ სერვისები არის შეუჩერებელი გაყიდვების გარანტია.",

    "newHome.consequence5.title": "მონაცემთა ანალიზი",
    "newHome.consequence5.description":
      "ციფრული ანალიტიკის გარეშე, თქვენი ბიზნესი ვერ მიიღებს მონაცემებზე დაფუძნებულ, ინფორმირებულ გადაწყვეტილებებს. ეფექტური ზრდისთვის აუცილებელია შედეგების ანალიზი. ანალიტიკის Anii პირდაპირ ხელს უწყობს ბრმა მართვას და არასწორი ინვესტიციების რისკს.",
  },
  en: {
    "seo.home.title":
      "VIFA Digital - Digital Marketing in Georgia | vifadigital.ge",
    "seo.home.description":
      "VIFA Digital - Digital marketing services: video production, photography, social media management, content creation. Full marketing package for your business.",

    "newHome.badge": "Digitize Your Business",
    "newHome.hero.title": "Build a Communication Bridge",
    "newHome.hero.titleStart": "Build a",
    "newHome.hero.titleGradient": "Communication Bridge",
    "newHome.hero.brand": "Between the Brand",
    "newHome.hero.connection": "and the Customer",
    "newHome.hero.description":
      "Every project we undertake begins with a deep analysis of your business needs. This initial research ensures that the resulting strategy is precisely tailored to your unique goals and drives effective results.",

    "newHome.visual.description": "Virtual Communication Bridge",
    "newHome.visual.brand": "Brand",
    "newHome.visual.audience": "Audience",

    "newHome.services.research.title": "Research & Analysis",
    "newHome.services.research.description":
      "Deep market research, competitor analysis, and identification of unique opportunities for your business.",

    "newHome.services.strategy.title": "Strategy & Planning",
    "newHome.services.strategy.description":
      "Personalized technology solutions strategy tailored to your business goals and budget.",

    "newHome.services.execution.title": "Execution",
    "newHome.services.execution.description":
      "Professional product creation, continuous optimization, and transparent reporting to achieve results.",

    "newHome.interactive.processTitle": "How does the",
    "newHome.interactive.processTitleHighlight": " VIFA team work?",

    "newHome.interactive.step1.title": "1. Research",
    "newHome.interactive.step1.subtitle": "Audience Discovery",
    "newHome.interactive.step1.description":
      "We define your clients' needs and the challenges they face. This helps us precisely determine how your product or service can offer them real value.",

    "newHome.interactive.step2.title": "2. Strategy",
    "newHome.interactive.step2.subtitle": "Planning the Right Course",
    "newHome.interactive.step2.description":
      "We create a concrete, targeted plan that answers: What content, on which platforms, and with what budget should you use to achieve success.",

    "newHome.interactive.step3.title": "3. Implementation",
    "newHome.interactive.step3.subtitle": "Campaign Launch",
    "newHome.interactive.step3.description":
      "The active phase involves: launching advertisements, publishing content, and effective management and control of all ongoing processes.",

    "newHome.interactive.step4.title": "4. Results",
    "newHome.interactive.step4.subtitle": "Analysis of Outcomes",
    "newHome.interactive.step4.description":
      "We analyze the actual results achieved. Based on the data, we optimize the strategy to improve components that are not delivering the desired effect.",

    "newHome.interactive.challengesTitle": "21st Century Challenges",

    "newHome.interactive.challenge1.title": "Information Overload",
    "newHome.interactive.challenge1.description":
      "In an environment of information overload, you have only 3-8 seconds to capture a user's attention. The first impression is critical. We create products that instantly convey the main message.",

    "newHome.interactive.challenge2.title": "Mobile Experience",
    "newHome.interactive.challenge2.description":
      "Over 75% of traffic comes from smartphones. Your website must be fully responsive, fast, and ensure a superior mobile experience to avoid losing potential clients.",

    "newHome.interactive.challenge3.title": "New Technologies",
    "newHome.interactive.challenge3.description":
      "Artificial Intelligence (AI), process automation, and the continuous evolution of digital platforms demand constant adaptation.",

    "newHome.interactive.challenge4.title": "Global Competition",
    "newHome.interactive.challenge4.description":
      "Competition in the online space is global. A unique strategy and professional approach are essential to stand out and capture customer attention.",

    "newHome.final.question": "Ready to Start a Collaboration?",
    "newHome.final.button": "Free Consultation",

    "newHome.services.sectionTitle": "Our Services",
    "newHome.services.sectionSubtitle":
      "Technologies of the Future for Your Business Success",

    "newHome.services.webdev.title": "Web Development",
    "newHome.services.webdev.description":
      "Modern web systems designed for the complete digital transformation of your business.",
    "newHome.services.webdev.feature1": "Business Card and Corporate Websites",
    "newHome.services.webdev.feature2": "Online Sales Systems",
    "newHome.services.webdev.feature3": "Business Process Automation",
    "newHome.services.webdev.cta": "See More",

    "newHome.services.ai.title": "AI Chatbot",
    "newHome.services.ai.description":
      "Complete automation of customer communication and business processes using AI technologies.",
    "newHome.services.ai.greeting": "🇬🇪 Hello!",
    "newHome.services.ai.thinking": "🤖 AI is Thinking...",
    "newHome.services.ai.feature1": "Service Across All Platforms",
    "newHome.services.ai.feature2": "Georgian Language Communication Support",
    "newHome.services.ai.feature3": "24-Hour Response",
    "newHome.services.ai.cta": "See More",

    "newHome.services.marketing.title": "Digital Marketing",
    "newHome.services.marketing.description":
      "Advertising strategies for the scalable growth and market leadership of your business.",
    "newHome.services.marketing.feature1": "Powerful Social Media Branding",
    "newHome.services.marketing.feature2": "Profit-Oriented Campaigns",
    "newHome.services.marketing.feature3": "Results Analysis and Forecasting",
    "newHome.services.marketing.cta": "See More",

    "newHome.services.invento.title": "Invento System",
    "newHome.services.invento.description": "Manage inventory, sales and finances in one place. Georgian SaaS platform.",
    "newHome.services.invento.feature1": "Real-time inventory management",
    "newHome.services.invento.feature2": "Automatic invoicing",
    "newHome.services.invento.feature3": "Excel reports and analytics",
    "newHome.services.invento.cta": "See More",

    "newHome.consequences.title": "What Happens to a Business",
    "newHome.consequences.highlight": "Without a Digital Presence",
    "newHome.consequences.button": "Why is a Digital Presence Essential?",
    "newHome.consequences.backButton": "Go Back",

    "newHome.hero.button1": "Web Development",
    "newHome.hero.button2": "Marketing",
    "newHome.hero.button3": "AI Service",
    "newHome.hero.button4": "Invento Software",
    "newHome.hero.button5": "Free Consultation",

    "newHome.consequence1.title": "Decline in Sales",
    "newHome.consequence1.description":
      "Failure to succeed in the digital sphere directly leads to the loss of 80% of potential clients. If your product cannot be found online, sales automatically suffer a significant decline.",

    "newHome.consequence2.title": "Lagging Behind Competitors",
    "newHome.consequence2.description":
      "Competitors in the digital market reach the target audience much more easily, ensuring rapid growth and market dominance. Without an online presence, your business will constantly lag behind.",

    "newHome.consequence3.title": "Loss of Trust",
    "newHome.consequence3.description":
      "Modern consumers distrust businesses that lack adequate digital resources. Studies confirm that clients consider online services (website, active social channels) as the main factor of trustworthiness. The absence of these directly harms your business's reputation.",

    "newHome.consequence4.title": "Lack of 24/7 Accessibility",
    "newHome.consequence4.description":
      "Without a digital platform, ensuring 24/7 accessibility is impossible. This means your business constantly misses opportunities and loses customers because it cannot serve them outside of working hours. Online services guarantee uninterrupted sales.",

    "newHome.consequence5.title": "Lack of Data Analysis",
    "newHome.consequence5.description":
      "Without digital analytics, your business cannot make data-driven, informed decisions. Analyzing results is essential for effective growth. The absence of analytics directly contributes to blind management and the risk of incorrect investments.",
  },
};

import {
  FaCogs,
  FaBriefcase,
  FaChartLine,
  FaBullseye,
  FaBrain,
  FaLaptopCode,
  FaChartPie,
  FaArrowRight,
  FaLightbulb,
  FaSearch,
  FaRocket,
  FaWarehouse,
  FaWhatsapp,
} from "react-icons/fa";

import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiFacebook,
  SiGoogle,
  SiInstagram,
} from "react-icons/si";
import { motion } from "framer-motion";

const NewHomeVifa: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const { startNavigation } = useNavigation();
  const [showDigitalConsequences, setShowDigitalConsequences] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 1.5;
    const handleTimeUpdate = () => {
      if (video.duration && video.duration - video.currentTime < 0.6) {
        setVideoFading(true);
      }
    };
    const handleSeeked = () => {
      if (video.currentTime < 0.3) setVideoFading(false);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeked", handleSeeked);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // WhatsApp URL for consultation
  const whatsappUrl = "https://wa.me/995557624243";

  const t = (key: string): string => {
    const translations = newHomeTranslations[
      currentLanguage as keyof typeof newHomeTranslations
    ] as Record<string, string>;
    return translations[key] || key;
  };

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        url="https://inventogeo.com"
      />

      {/* ─── Cinematic Hero — Full Screen ─── */}
      <div className={`relative min-h-screen overflow-hidden ${getTransitionClasses()}`}>

        {/* Full-screen video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 -z-10 w-full h-full object-cover transition-opacity duration-700 ${videoFading ? "opacity-0" : "opacity-100"}`}
        >
          <source src="/videoHero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — stronger center fade, navbar area darkened */}
        <div className="absolute inset-0 -z-10 bg-black/60" />
        {/* Top gradient — navbar readable */}
        <div className="absolute inset-x-0 top-0 h-32 -z-10 bg-linear-to-b from-black/80 to-transparent" />
        {/* Bottom gradient — bottom content readable */}
        <div className="absolute inset-x-0 bottom-0 h-64 -z-10 bg-linear-to-t from-black/80 to-transparent" />

        {/* Content layer */}
        <div className="relative z-10 w-full min-h-screen flex flex-col px-8 lg:px-16">

          {/* Middle — service labels left only */}
          <div className="flex flex-1 items-center pt-24">
            
          </div>

          {/* Bottom — stats left, description+CTA right */}
          <div className="flex items-end justify-between pb-12">

            {/* Stats Block — bottom left, desktop only */}
            <div className="hidden lg:flex items-end gap-10 pb-2">
              {[
                { num: "100+", label: currentLanguage === "ka" ? "ჩაბარებული პროექტი" : "Submitted project" },
                { num: "4", label: currentLanguage === "ka" ? "მთავარი მიმართულება" : "Main direction" },
                { num: "7+", label: currentLanguage === "ka" ? "წელი ინდუსტრიაში" : "Years in industry" },
              ].map((stat, i) => (
                <div key={i} className="flex items-end gap-10">
                  <div>
                    <div className="w-6 h-px bg-white/30 mb-3" />
                    <div className="text-4xl font-extralight text-white leading-none tracking-tight">
                      {stat.num}
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-2 font-normal">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/10 mb-4" />}
                </div>
              ))}
            </div>

            {/* Description + CTA — bottom right, fixed width */}
            <div className="w-[420px] shrink-0 text-right pb-2">
              <p className="text-slate-300 text-base leading-relaxed mb-5">
                {currentLanguage === "ka"
                  ? "Vifa აშენებს გამართულ ციფრულ ინფრასტრუქტურას და გაყიდვების ავტომატიზებულ სისტემებს, რომლებიც თქვენი ბიზნესის ზრდაზე მუშაობს"
                  : "Vifa builds robust digital infrastructure and automated sales systems that work to grow your business."}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white/60 text-white text-xs font-semibold px-5 py-2.5 tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-200"
              >
                {currentLanguage === "ka" ? "დაჯავშნე კონსულტაცია" : "Start a Project"}
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Rest of page ─── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Futuristic Services Showcase */}
          <div className="mt-20 mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {t("newHome.services.sectionTitle")}
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                {t("newHome.services.sectionSubtitle")}
              </p>
            </div>

            {/* Elegant Compact Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Web Development - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-cyan-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaLaptopCode className="text-cyan-400 text-xl" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {t("newHome.services.webdev.title")}
                      </h3>
                      <div className="flex space-x-2 mt-1">
                        <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                          <SiReact className="text-cyan-400 text-xs" />
                        </div>
                        <div className="w-6 h-6 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-all duration-300">
                          <SiNodedotjs className="text-green-400 text-xs" />
                        </div>
                        <div className="w-6 h-6 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                          <SiTypescript className="text-blue-400 text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.webdev.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                      {t("newHome.services.webdev.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                      {t("newHome.services.webdev.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                      {t("newHome.services.webdev.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link
                    to="/services/web-development"
                    className="block"
                    onClick={startNavigation}
                  >
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 group-hover/btn:border-cyan-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-cyan-500/20 group-hover/btn:to-blue-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-cyan-400 font-semibold text-sm group-hover/btn:text-cyan-300 transition-colors">
                          {t("newHome.services.webdev.cta")}
                        </span>
                        <FaArrowRight className="text-cyan-400 text-sm group-hover/btn:text-cyan-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Invento System - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-orange-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaWarehouse className="text-orange-400 text-xl" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                        {t("newHome.services.invento.title")}
                      </h3>
                      <div className="flex space-x-2 mt-1">
                        <div className="w-6 h-6 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                          <span className="text-orange-400 text-xs font-bold">₾</span>
                        </div>
                        <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300">
                          <span className="text-red-400 text-xs font-bold">📊</span>
                        </div>
                        <div className="w-6 h-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
                          <span className="text-yellow-400 text-xs font-bold">📦</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.invento.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-orange-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                      {t("newHome.services.invento.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-orange-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                      {t("newHome.services.invento.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-orange-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                      {t("newHome.services.invento.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link to="/inventowms" className="block">
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20 group-hover/btn:border-orange-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-orange-500/20 group-hover/btn:to-red-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-orange-400 font-semibold text-sm group-hover/btn:text-orange-300 transition-colors">
                          {t("newHome.services.invento.cta")}
                        </span>
                        <FaArrowRight className="text-orange-400 text-sm group-hover/btn:text-orange-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* AI Chatbot - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-purple-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaBrain className="text-purple-400 text-xl animate-pulse" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {t("newHome.services.ai.title")}
                      </h3>
                      {/* Compact Chat Interface */}
                      <div className="relative bg-gradient-to-br from-black/30 to-purple-900/20 backdrop-blur-sm rounded-lg p-2 mt-2 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                        <div className="space-y-1">
                          <div className="flex justify-end">
                            <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white text-xs px-2 py-1 rounded border border-blue-400/30">
                              {t("newHome.services.ai.greeting")}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-xs px-2 py-1 rounded border border-purple-400/30">
                              {t("newHome.services.ai.thinking")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.ai.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {t("newHome.services.ai.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {t("newHome.services.ai.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {t("newHome.services.ai.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link to="/services/ai-chatbot" className="block">
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 group-hover/btn:border-purple-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-purple-500/20 group-hover/btn:to-pink-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-purple-400 font-semibold text-sm group-hover/btn:text-purple-300 transition-colors">
                          {t("newHome.services.ai.cta")}
                        </span>
                        <FaArrowRight className="text-purple-400 text-sm group-hover/btn:text-purple-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Digital Marketing - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-green-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaChartPie className="text-green-400 text-xl" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                        {t("newHome.services.marketing.title")}
                      </h3>
                      <div className="flex space-x-2 mt-1">
                        <div className="w-6 h-6 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                          <SiFacebook className="text-blue-400 text-xs" />
                        </div>
                        <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300">
                          <SiGoogle className="text-red-400 text-xs" />
                        </div>
                        <div className="w-6 h-6 bg-pink-500/10 border border-pink-500/30 rounded-lg flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                          <SiInstagram className="text-pink-400 text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.marketing.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-green-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></div>
                      {t("newHome.services.marketing.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-green-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></div>
                      {t("newHome.services.marketing.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-green-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></div>
                      {t("newHome.services.marketing.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link to="/services/digital-advertising" className="block">
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 group-hover/btn:border-green-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-green-500/20 group-hover/btn:to-emerald-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-green-400 font-semibold text-sm group-hover/btn:text-green-300 transition-colors">
                          {t("newHome.services.marketing.cta")}
                        </span>
                        <FaArrowRight className="text-green-400 text-sm group-hover/btn:text-green-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {/* Research Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-blue-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-blue-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaSearch />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.research.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.research.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>

            {/* Strategy Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-purple-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-purple-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaLightbulb />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.strategy.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.strategy.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>

            {/* Execution Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-green-500/10 border border-green-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-green-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-green-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaRocket />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.execution.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.execution.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Interactive Information Section */}
          <div
            ref={sectionRef}
            className="max-w-6xl mx-auto mt-24 mb-20"
            style={{ position: "relative" }}
          >
            {/* მთავარი კონტენტი */}
            <div className={showDigitalConsequences ? "hidden" : "block"}>
              {/* Section Header */}
              <div className="text-center mb-12"></div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {t("newHome.interactive.processTitle")}{" "}
                      <span className="text-green-400">
                        {t("newHome.interactive.processTitleHighlight")}
                      </span>
                    </h3>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div
                        key={stepNum}
                        className="flex items-start gap-6 group"
                      >
                        {/* Step Circle with Animation */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-400/30 flex items-center justify-center group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                              {stepNum}
                            </div>
                          </div>
                          {/* Connection Line */}
                          {stepNum < 4 && (
                            <div className="w-px h-12 bg-gradient-to-b from-blue-400/30 to-green-400/30 mx-auto mt-2"></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 pb-8">
                          <h4 className="text-lg font-medium text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {t(`newHome.interactive.step${stepNum}.title`)}
                          </h4>
                          <p className="text-blue-400 text-sm font-medium mb-2">
                            {t(`newHome.interactive.step${stepNum}.subtitle`)}
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {t(
                              `newHome.interactive.step${stepNum}.description`
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - 21st Century Challenges */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-8">
                      {t("newHome.interactive.challengesTitle")}
                    </h3>
                  </div>

                  {/* Challenge Cards */}
                  <div className="grid gap-6">
                    {[1, 2, 3, 4].map((challengeNum) => (
                      <div key={challengeNum} className="group">
                        <div className="bg-black/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:bg-black/50 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 flex items-center justify-center text-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                {challengeNum === 1 && <FaCogs />}
                                {challengeNum === 2 && <FaBriefcase />}
                                {challengeNum === 3 && <FaChartLine />}
                                {challengeNum === 4 && <FaBullseye />}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.title`
                                )}
                              </h4>
                              <p className="text-slate-400 text-sm leading-relaxed">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.description`
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Consequences Trigger */}
              <div className="text-center mt-16">
                <button
                  onClick={() => {
                    setShowDigitalConsequences(true);
                    // Scroll to section top with smooth animation
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {t("newHome.consequences.button")}
                </button>
              </div>
            </div>

            {/* რა მოსდის ბიზნესს ციფრული არსებობის გარეშე */}
            {showDigitalConsequences && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                    {t("newHome.consequences.title")}{" "}
                    <span className="text-red-400">
                      {t("newHome.consequences.highlight")}
                    </span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* პრობლემა 1 */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence1.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence1.description")}
                    </p>
                  </div>

                  {/* პრობლემა 2 */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence2.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence2.description")}
                    </p>
                  </div>

                  {/* პრობლემა 3 */}
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence3.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence3.description")}
                    </p>
                  </div>

                  {/* პრობლემა 5 */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence4.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence4.description")}
                    </p>
                  </div>

                  {/* პრობლემა 6 */}
                  <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence5.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence5.description")}
                    </p>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowDigitalConsequences(false)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {t("newHome.consequences.backButton")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-32">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-light text-white mb-6">
                {t("newHome.final.question")}
              </h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 text-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-xl" />
                {t("newHome.final.button")}
              </a>
            </div>
          </div>
      </div>

      {/* Compact Animations */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .rotate-y-6 {
          transform: rotateY(6deg);
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes typing-dots-mini {
          0%, 20% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 2.5s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }

        .typing-dots-mini span {
          display: inline-block;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: #a855f7;
          margin: 0 0.5px;
          animation: typing-dots-mini 1.2s ease-in-out infinite;
        }

        .typing-dots-mini span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-mini span:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots-mini span:nth-child(3) { animation-delay: 0.3s; }

        /* Futuristic AI Chat Animation */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes typing-dots-ai {
          0%, 20% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }

        .typing-dots-ai span {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          margin: 0 1px;
          animation: typing-dots-ai 1.4s ease-in-out infinite;
        }

        .typing-dots-ai span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-ai span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-ai span:nth-child(3) { animation-delay: 0.4s; }

        /* Futuristic Hover Effects */
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default NewHomeVifa;
