
"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import SEO from "../components/SEO";
import ServicesSection from "../components/ServicesSection";

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

    "newHome.interactive.processTitle": "როგორ ვმუშაობთ",
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
      "მიმართულებები",

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
  
  FaBullseye,
  FaWhatsapp,
  FaArrowDown,
} from "react-icons/fa";
import { motion } from "framer-motion";

const NewHomeVifa: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  const [showDigitalConsequences, setShowDigitalConsequences] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    document.getElementById("services-header")?.scrollIntoView({ behavior: "smooth" });
  };

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
      <div className={`relative min-h-[75vh] md:min-h-screen overflow-hidden ${getTransitionClasses()}`}>

        {/* Full-screen hero image background */}
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-mobile.webp" />
          <source media="(min-width: 769px)" srcSet="/hero-desktop.webp" />
          <img
            src="/hero-desktop.webp"
            alt=""
            fetchPriority="high"
            loading="eager"
            onLoad={() => setHeroLoaded(true)}
            className={`absolute inset-0 -z-10 w-full h-full object-cover object-center md:object-[65%_center] transition-opacity duration-700 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </picture>

        {/* Dark overlay — stronger center fade, navbar area darkened */}
        <div className="absolute inset-0 -z-10 bg-black/60" />
        {/* Top gradient — navbar readable */}
        <div className="absolute inset-x-0 top-0 h-32 -z-10 bg-linear-to-b from-black/80 to-transparent" />
        {/* Bottom gradient — bottom content readable */}
        <div className="absolute inset-x-0 bottom-0 h-64 -z-10 bg-linear-to-t from-black/60 to-transparent" />
        {/* Bottom section blend — strong fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] md:h-[65%] bg-linear-to-t from-[#050404] via-[#050404]/85 via-30% to-transparent z-10" />

        {/* Content layer */}
        <div className="relative z-10 w-full min-h-[75vh] md:min-h-screen flex flex-col justify-center md:justify-end px-5 sm:px-8 lg:px-16 pt-20">

          {/* Bottom — headline left, stats right on desktop */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-8 md:pb-12 gap-5 md:gap-0">

            {/* Headline + Description + CTA — left on both mobile and desktop */}
            <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl text-left pb-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.35] tracking-tight mb-6 md:mb-4 md:max-w-xl lg:max-w-2xl">
                {currentLanguage === "ka"
                  ? "VIFA - თქვენი ციფრული პარტნიორი"   



                  : "Digital Infrastructure Built to Grow"}
              </h1>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-8 md:mb-6 md:max-w-sm lg:max-w-md">
                {currentLanguage === "ka"
                  ? "თქვენი ბიზნესის სრული ციფრული მხარდაჭერა."

                  : "Vifa builds robust digital systems and automated sales pipelines for your business."}
              </p>
              <button
                onClick={scrollToServices}
                className="group mt-10 inline-flex items-center gap-4 self-start"
              >
                <span className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors duration-200">
                  <FaArrowDown className="text-white text-sm" />
                </span>
                <span className="text-sm tracking-widest uppercase font-medium text-white group-hover:text-blue-400 transition-colors duration-200">
                  {currentLanguage === "ka" ? "სერვისების ნახვა" : "View Services"}
                </span>
              </button>
            </div>

            {/* Stats Block — bottom right, desktop only */}
            <div className="hidden lg:flex items-end gap-10 pb-2 shrink-0">
              {[
                { num: "100+", label: currentLanguage === "ka" ? "ჩაბარებული პროექტი" : "Submitted project" },
                { num: "4", label: currentLanguage === "ka" ? "მთავარი მიმართულება" : "Main direction" },
                { num: "7+", label: currentLanguage === "ka" ? "წელი ინდუსტრიაში" : "Years in industry" },
              ].map((stat, i) => (
                <div key={i} className="flex items-end gap-10">
                  <div className="text-right">
                    <div className="w-6 h-px bg-white/30 mb-3 ml-auto" />
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

          </div>
        </div>
      </div>

      {/* Services Showcase — full width, outside container */}
      <ServicesSection t={t} />

{/* ─── Rest of page ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32" id="services">
        
    

        {/* Interactive Information Section (Simplified & Premium) */}
        <div ref={sectionRef} className="mb-20">

          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
            როგორ{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-fuchsia-400">
              ვმუშაობთ
            </span>
          </h2>

          {/* Default View */}
          <div className={`transition-all duration-700 ${showDigitalConsequences ? "hidden opacity-0" : "block opacity-100"}`}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column - The Process */}
              <div>
            
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div key={stepNum} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0A0A0C] text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 group-hover:border-blue-500/50 group-hover:text-white z-10">
                        {stepNum}
                      </div>
                      
                      {/* Content */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors">
                        <h4 className="font-semibold text-white mb-1">{t(`newHome.interactive.step${stepNum}.title`)}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{t(`newHome.interactive.step${stepNum}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Challenges & Trigger */}
              <div className="lg:pl-10">
                <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
                  {t("newHome.interactive.challengesTitle")}
                </h3>
                
                <div className="space-y-4 mb-12">
                  {[1, 2, 3].map((challengeNum) => (
                    <div key={challengeNum} className="p-5 rounded-2xl bg-[#0A0A0C] border border-white/5 flex gap-4 items-start">
                      <div className="mt-1 text-red-400/50"><FaBullseye /></div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{t(`newHome.interactive.challenge${challengeNum}.title`)}</h4>
                        <p className="text-sm text-gray-400">{t(`newHome.interactive.challenge${challengeNum}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowDigitalConsequences(true);
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-bold tracking-wide rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  {t("newHome.consequences.button")}
                </button>
              </div>

            </div>
          </div>

          {/* Consequences View (When Button Clicked) */}
          {showDigitalConsequences && (
            <motion.div 
              className="animate-fade-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  {t("newHome.consequences.title")}{" "}
                  <span className="text-red-500">
                    {t("newHome.consequences.highlight")}
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {/* 3 Main Consequences Cards (Simplified and darkened) */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#0A0A0C] border border-red-500/20 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl font-medium text-white mb-3 relative z-10">
                      {t(`newHome.consequence${num}.title`)}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                      {t(`newHome.consequence${num}.description`)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowDigitalConsequences(false)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white text-sm font-medium tracking-wide rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300"
                >
                  {t("newHome.consequences.backButton")}
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* Final CTA Section */}
        <div className="mt-32 pt-20 border-t border-white/5 text-center">
          <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
            {t("newHome.final.question")}
          </h3>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold tracking-wide rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <FaWhatsapp className="text-lg" />
            {t("newHome.final.button")}
          </a>
        </div>

      </div>
    </>
  );
};

export default NewHomeVifa;