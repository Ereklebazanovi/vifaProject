"use client";

import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  FaBrain,
  FaFacebook,
  FaRocket,
  FaCheck,
  FaShieldAlt,
  FaCog,
  FaCloud,
  FaCommentDots,
  FaPhone,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { ChatbotDemoTerminal } from "../components/Terminal";
import { AIConnectionDemo } from "../components/AIConnectionDemo";

// AI Chatbot Translations
const aiChatbotTranslations = {
  ka: {
    "seo.title": "Invento AI - ჩატბოტები თქვენი ბიზნესისთვის | Invento Technologies",
    "seo.description": "Invento AI ჩატბოტები Facebook, WhatsApp და Instagram-ისთვის. 24/7 მომხმარებელთა მხარდაჭერა, გაყიდვების ზრდა და ხარჯების ოპტიმიზაცია. Google Gemini AI ტექნოლოგია.",

    "hero.title": "Invento AI -",
    "hero.titleHighlight": "თქვენი ბიზნესის ციფრული რევოლუცია",
    "hero.feature1.title": "24/7 ავტომატური მომსახურება",
    "hero.feature1.description": "- თქვენი კლიენტები პასუხს მიიღებენ ნებისმიერ დროს",
    "hero.feature2.title": "სპეციალიზებული ტრენინგი",
    "hero.feature2.description": "- AI სწავლობს თქვენი ბიზნესის სპეციფიკას",
    "hero.feature3.title": "გაზრდილი მოგება",
    "hero.feature3.description": "- დაზოგეთ თანხა და მიიღეთ გამოტოვებული შემოსავალი",
    "hero.demoLabel": "იხილეთ როგორ მუშაობს Invento AI ასისტენტი →",
    "hero.demoDescription": "რეალური საუბარი სალონის მფლობელთან",

    "platforms.title": "ინტეგრაცია ყველა მთავარ პლატფორმაზე",
    "platform.facebook.name": "Facebook Messenger",
    "platform.facebook.stats": "2.3 მილიონზე მეტი აქტიური მომხმარებელი საქართველოში",
    "platform.facebook.feature1": "მყისიერი პასუხი და კომუნიკაცია 24/7 რეჟიმში.",
    "platform.facebook.feature2": "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
    "platform.facebook.feature3": "მყისიერი კომუნიკაცია 24/7 რეჟიმში",

    "platform.whatsapp.name": "WhatsApp Business",
    "platform.whatsapp.stats": "2.3 მილიონზე მეტი აქტიური მომხმარებელი საქართველოში",
    "platform.whatsapp.feature1": "მყისიერი პასუხი და კომუნიკაცია 24/7 რეჟიმში.",
    "platform.whatsapp.feature2": "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
    "platform.whatsapp.feature3": "მყისიერი კომუნიკაცია 24/7 რეჟიმში",

    "platform.instagram.name": "Instagram Direct",
    "platform.instagram.stats": "2.3 მილიონზე მეტი აქტიური მომხმარებელი საქართველოში",
    "platform.instagram.feature1": "მყისიერი პასუხი და კომუნიკაცია 24/7 რეჟიმში.",
    "platform.instagram.feature2": "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
    "platform.instagram.feature3": "მყისიერი კომუნიკაცია 24/7 რეჟიმში",

    "pricing.title": "ფინანსური სტრუქტურა და API ხარჯები",
    "pricing.description": "ჩვენი ფასები მორგებულია კონკრეტული პროექტის სირთულესა და საჭიროებებზე. გთავაზობთ გამჭირვალე და მარტივად გასაგებ საფასო მოდელს:",
    "pricing.investment.title": "საწყისი ინვესტიცია",
    "pricing.investment.price": "300₾-დან",
    "pricing.investment.priceNote": "ფასი დამოკიდებულია მოთხოვნებზე",
    "pricing.investment.includes": "მოიცავს:",
    "pricing.investment.feature1": "AI მოდელის დატრენინგება თქვენი ბიზნეს ლოგიკისთვის",
    "pricing.investment.feature2": "WhatsApp, Messenger და სხვა პლატფორმებთან ინტეგრაცია",
    "pricing.investment.feature3": "სრულად ფუნქციონალური ადმინ პანელი",
    "pricing.investment.feature4": "ანალიტიკა და სტატისტიკა",
    "pricing.investment.feature5": "საწყისი ტექნიკური მხარდაჭერა – უფასოდ",

    "pricing.monthly.title": "ყოველთვიური ხარჯები",
    "pricing.monthly.subtitle": "კომპანიის მართვისა და უსაფრთხოების ქვეშ",
    "pricing.monthly.api": "თქვენი გამოყენების დანახარჯები",
    "pricing.monthly.price": "0.20₾ – 0.40₾ / 1,000 ტოკენზე",
    "pricing.monthly.billing.title": "ბილინგი:",
    "pricing.monthly.billing.description": "Gemini AI-ს ხარჯები მორგებულია მხოლოდ თქვენს ჩატბოტზე. ყოველთვიურად მიიღებთ დეტალურ ანგარიშს გამოყენების შესახებ.",
    "pricing.monthly.monitoring.title": "მონიტორინგი: ხარჯების დინამიური ნახვა რეალურ დროში.",
    "pricing.monthly.monitoring.description": "არანაირი დამალული გადასახადი.",
    "pricing.monthly.transparency.title": "სრული უსაფრთხოება:",
    "pricing.monthly.transparency.description": "Google Cloud-ის უმაღლესი დონის უსაფრთხოება + ჩვენი დამატებითი ზედამხედველობა. თქვენი მონაცემები 100% -ით დაცულია.",

    "pricing.examples.title": "სავარაუდო API ხარჯები (ტოკენების გამოყენების მიხედვით)",
    "pricing.examples.note": "შენიშვნა: ხარჯი დამოკიდებულია ტოკენების რაოდენობაზე, ანუ დამუშავებული ინფორმაციის მოცულობაზე.",
    "pricing.examples.small": "მცირე ბიზნესი",
    "pricing.examples.smallQueries": "500 დიალოგი/კომუნიკაცია",
    "pricing.examples.smallCost": "5₾ - 10₾",
    "pricing.examples.medium": "საშუალო ბიზნესი",
    "pricing.examples.mediumQueries": "2,000 დიალოგი/კომუნიკაცია",
    "pricing.examples.mediumCost": "20₾ - 35₾",
    "pricing.examples.large": "დიდი ბიზნესი",
    "pricing.examples.largeQueries": "10,000 დიალოგი/კომუნიკაცია",
    "pricing.examples.largeCost": "100₾ - 160₾",

    "admin.title": "ადმინ პანელი - სრული კონტროლი",
    "admin.canDo": "რას შეძლებთ:",
    "admin.canDo.feature1": "რეალურ დროში რედაქტირება",
    "admin.canDo.feature2": "ახალი კითხვა-პასუხების დამატება",
    "admin.canDo.feature3": "პროდუქტების მენეჯმენტი",
    "admin.canDo.feature4": "საუბრების ისტორია",
    "admin.canDo.feature5": "დეტალური ანალიტიკა",
    "admin.howWorks": "როგორ მუშაობს:",
    "admin.howWorks.step1": "შედით ბრაუზერიდან კომპანიის მოცემულ ბმულზე",
    "admin.howWorks.step2": "აირჩიეთ სექცია (პროდუქტები, კითხვები)",
    "admin.howWorks.step3": "შეცვალეთ ტექსტი ედიტორში",
    "admin.howWorks.step4": "დააჭირეთ 'შენახვა' - მაშინვე ძალაში შედის!",

    "technical.title": "ტექნიკური უპირატესობები",
    "technical.subtitle": "მოწინავე ტექნოლოგიები საუკეთესო შედეგისთვის",
    "technical.feature1.title": "ინტელექტუალური ბირთვი: Google Gemini",
    "technical.feature1.point1": "ქართული ენის სრული მხარდაჭერა - ზუსტი და ბუნებრივი კომუნიკაცია.",
    "technical.feature1.point2": "კონტექსტური მეხსიერება - სისტემას ახსოვს საუბრის ისტორია და არ იმეორებს შეცდომებს.",
    "technical.feature1.point3": "მულტი-ტასკინგი - რთული ამოცანების ერთდროულად და ეფექტურად შესრულება.",

    "technical.feature2.title": "ოპერაციული საიმედოობა და სისწრაფე",
    "technical.feature2.point1": "99.9% Uptime - თქვენი სერვისი ხელმისაწვდომია თითქმის 24/7 შეფერხების გარეშე.",
    "technical.feature2.point2": "0.5 წამი საშუალო პასუხის დრო - მყისიერი რეაგირება მომხმარებლის მოთხოვნებზე.",
    "technical.feature2.point3": "ათასობით ერთდროული მომხმარებელი - მარტივი მასშტაბირება, ნებისმიერი დატვირთვისთვის მზადყოფნა.",

    "technical.feature3.title": "უსაფრთხოება და კონფიდენციალურობა",
    "technical.feature3.point1": "ბანკის დონის უსაფრთხოება - თქვენი მონაცემების დაცვა უმაღლესი სტანდარტით.",
    "technical.feature3.point2": "GDPR დაცვა - მონაცემთა დაცვის საერთაშორისო მოთხოვნებთან სრული შესაბამისობა.",
    "technical.feature3.point3": "ყველა მონაცემი დაშიფრულია - ინფორმაციის სრული კონფიდენციალურობა გადაცემისა და შენახვისას.",

    "faq.title": "ხშირად დასმული შეკითხვები",
    "faq.q1.question": "რამდენ დროს მოითხოვს ჩატბოტის გაშვება?",
    "faq.q1.answer": "7-14 სამუშაო დღე.",
    "faq.q1.details": "მზა AI ასისტენტს მიიღებთ 7-14 სამუშაო დღეში. ზუსტი ვადები დამოკიდებულია თქვენი ბიზნესის სირთულესა და საჭირო ინტეგრაციების რაოდენობაზე.",

    "faq.q2.question": "შესაძლებელია თუ არა კონტენტის შეცვლა გაშვების შემდეგ?",
    "faq.q2.answer": "დიახ, ნებისმიერ დროს, რეალურ დროში.",
    "faq.q2.details": "თქვენ შეგიძლიათ თავად დაარედაქტიროთ AI-ს ცოდნის ბაზა და პასუხები თქვენი ადმინ პანელიდან. ცვლილებები ძალაში შედის მომენტალურად.",

    "faq.q3.question": "რა მოხდება Google API-ის გადახდის შეფერხების შემთხვევაში?",
    "faq.q3.answer": "თქვენი მონაცემები სრულად შენარჩუნდება.",
    "faq.q3.details": "Google-ის წესების მიხედვით, ჩატბოტი დროებით შეწყვეტს მუშაობას, თუმცა თქვენი ყველა მონაცემი და სისტემის გამართვა სრულად და უსაფრთხოდ შეინახება.",

    "faq.q4.question": "არის თუ არა შესაძლებელი ვებსაიტზე ინტეგრაცია?",
    "faq.q4.answer": "რა თქმა უნდა",
    "faq.q4.details": "ვებსაიტის Live Chat Widget-ის ინტეგრაცია ხელმისაწვდომია, ზუსტად იმავე პრინციპით როგორც facebook messenger-ში.",

    "faq.q5.question": "რამდენ ენაზე შეუძლია AI-ს საუბარი?",
    "faq.q5.answer": "ძირითადად, ქართულად და ინგლისურად.",
    "faq.q5.details": "AI-ს აქვს მრავალენოვანი შესაძლებლობები. ჩვენ ტრენინგს ვატარებთ ძირითადად ქართულ და ინგლისურ ენებზე, მაგრამ საჭიროების შემთხვევაში, დამატებითი ენების სწავლება შესაძლებელია.",

    "cta.question": "მზად ხარ გამოსცადო?",
    "cta.button": "უფასო კონსულტაცია",
    "consultation.whatsapp": "უფასო კონსულტაცია",
    "phone.number": "557 62 42 43",
  },
    en: {
    "seo.title": "Invento AI - Chatbots for Your Business | Invento Technologies",
    "seo.description": "Invento AI Chatbots for Facebook, WhatsApp, and Instagram. 24/7 customer support, sales growth, and cost optimization. Powered by Google Gemini AI technology.",

    "hero.title": "Invento AI -",
    "hero.titleHighlight": "Your Business's Digital Revolution",
    "hero.feature1.title": "24/7 Automatic Service",
    "hero.feature1.description": "- Your clients will receive answers anytime",
    "hero.feature2.title": "Specialized Training",
    "hero.feature2.description": "- AI learns your business specifics",
    "hero.feature3.title": "Increased Profit",
    "hero.feature3.description": "- Save money and recover missed revenue",
    "hero.demoLabel": "See how Invento AI assistant works →",
    "hero.demoDescription": "A real conversation with a barber shop owner",

    "platforms.title": "Integration on All Major Platforms",
    "platform.facebook.name": "Facebook Messenger",
    "platform.facebook.stats": "Over 2.3 million active users in Georgia",
    "platform.facebook.feature1": "Instant response and 24/7 communication.",
    "platform.facebook.feature2": "3 times higher conversion (sales) rate.",
    "platform.facebook.feature3": "Instant 24/7 communication.",

    "platform.whatsapp.name": "WhatsApp Business",
    "platform.whatsapp.stats": "Over 2.3 million active users in Georgia",
    "platform.whatsapp.feature1": "Instant response and 24/7 communication.",
    "platform.whatsapp.feature2": "3 times higher conversion (sales) rate.",
    "platform.whatsapp.feature3": "Instant 24/7 communication.",

    "platform.instagram.name": "Instagram Direct",
    "platform.instagram.stats": "Over 2.3 million active users in Georgia",
    "platform.instagram.feature1": "Instant response and 24/7 communication.",
    "platform.instagram.feature2": "3 times higher conversion (sales) rate.",
    "platform.instagram.feature3": "Instant 24/7 communication.",

    "pricing.title": "Financial Structure and API Costs",
    "pricing.description": "Our pricing is tailored to the complexity and needs of a specific project. We offer a transparent and easy-to-understand pricing model:",
    "pricing.investment.title": "Initial Investment",
    "pricing.investment.price": "Starting from 300₾",
    "pricing.investment.priceNote": "Price depends on requirements",
    "pricing.investment.includes": "Includes:",
    "pricing.investment.feature1": "Training the AI model for your business logic",
    "pricing.investment.feature2": "Integration with WhatsApp, Messenger, and other platforms",
    "pricing.investment.feature3": "Fully functional Admin Panel",
    "pricing.investment.feature4": "Analytics and Statistics",
    "pricing.investment.feature5": "Initial technical support – free of charge",

    "pricing.monthly.title": "Monthly Costs",
    "pricing.monthly.subtitle": "Under company management and security",
    "pricing.monthly.api": "Your usage costs",
    "pricing.monthly.price": "0.20₾ – 0.40₾ / per 1,000 tokens",
    "pricing.monthly.billing.title": "Billing:",
    "pricing.monthly.billing.description": "Gemini AI costs are allocated solely to your chatbot. You will receive a detailed monthly usage report.",
    "pricing.monthly.monitoring.title": "Monitoring: Dynamic, real-time viewing of costs.",
    "pricing.monthly.monitoring.description": "No hidden fees.",
    "pricing.monthly.transparency.title": "Full Security:",
    "pricing.monthly.transparency.description": "Top-level Google Cloud security + our additional oversight. Your data is 100% protected.",

    "pricing.examples.title": "Estimated API Costs (Based on Token Usage)",
    "pricing.examples.note": "Note: Cost depends on the number of tokens, i.e., the volume of information processed.",
    "pricing.examples.small": "Small Business",
    "pricing.examples.smallQueries": "500 Dialogues/Communications",
    "pricing.examples.smallCost": "5₾ - 10₾",
    "pricing.examples.medium": "Medium Business",
    "pricing.examples.mediumQueries": "2,000 Dialogues/Communications",
    "pricing.examples.mediumCost": "20₾ - 35₾",
    "pricing.examples.large": "Large Business",
    "pricing.examples.largeQueries": "10,000 Dialogues/Communications",
    "pricing.examples.largeCost": "100₾ - 160₾",

    "admin.title": "Admin Panel - Full Control",
    "admin.canDo": "What you can do:",
    "admin.canDo.feature1": "Real-time Editing",
    "admin.canDo.feature2": "Adding New Q&A",
    "admin.canDo.feature3": "Product Management",
    "admin.canDo.feature4": "Conversation History",
    "admin.canDo.feature5": "Detailed Analytics",
    "admin.howWorks": "How it Works:",
    "admin.howWorks.step1": "Access the company-provided link via your browser",
    "admin.howWorks.step2": "Select a section (Products, Questions)",
    "admin.howWorks.step3": "Edit the text in the editor",
    "admin.howWorks.step4": "Click 'Save' - the change takes effect immediately!",

    "technical.title": "Technical Advantages",
    "technical.subtitle": "Advanced Technologies for the Best Results",
    "technical.feature1.title": "Intellectual Core: Google Gemini",
    "technical.feature1.point1": "Full Georgian language support - accurate and natural communication.",
    "technical.feature1.point2": "Contextual memory - the system remembers the conversation history and avoids repeating errors.",
    "technical.feature1.point3": "Multi-tasking - simultaneous and efficient execution of complex tasks.",

    "technical.feature2.title": "Operational Reliability and Speed",
    "technical.feature2.point1": "99.9% Uptime - your service is available almost 24/7 without interruption.",
    "technical.feature2.point2": "0.5 second average response time - instant reaction to customer requests.",
    "technical.feature2.point3": "Thousands of simultaneous users - easy scalability, ready for any load.",

    "technical.feature3.title": "Security and Confidentiality",
    "technical.feature3.point1": "Bank-level security - protecting your data with the highest standards.",
    "technical.feature3.point2": "GDPR Compliance - full adherence to international data protection requirements.",
    "technical.feature3.point3": "All data is encrypted - complete information confidentiality during transmission and storage.",

    "faq.title": "Frequently Asked Questions",
    "faq.q1.question": "How long does it take to launch the chatbot?",
    "faq.q1.answer": "7-14 business days.",
    "faq.q1.details": "You will receive the ready AI assistant within 7-14 business days. The exact timeline depends on the complexity of your business and the number of required integrations.",

    "faq.q2.question": "Is it possible to change the content after launch?",
    "faq.q2.answer": "Yes, anytime, in real-time.",
    "faq.q2.details": "You can edit the AI's knowledge base and responses yourself from your admin panel. Changes take effect instantly.",

    "faq.q3.question": "What happens if there is a delay in Google API payment?",
    "faq.q3.answer": "Your data will be fully preserved.",
    "faq.q3.details": "According to Google's policies, the chatbot will temporarily stop working, but all your data and system configuration will be fully and securely saved.",

    "faq.q4.question": "Is it possible to integrate on a website?",
    "faq.q4.answer": "Of course",
    "faq.q4.details": "Website Live Chat Widget integration is available, operating on the exact same principle as in Facebook Messenger.",

    "faq.q5.question": "How many languages can the AI speak?",
    "faq.q5.answer": "Primarily, Georgian and English.",
    "faq.q5.details": "The AI has multilingual capabilities. We primarily conduct training in Georgian and English, but training for additional languages is possible if needed.",

    "cta.question": "Ready to Test it Out?",
    "cta.button": "Free Consultation",
    "consultation.whatsapp": "Free Consultation",
    "phone.number": "557 62 42 43",
  },
};


const AIChatbot: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const { stopNavigation } = useNavigation();
  const { currentLanguage } = useLanguage();
  // const [activePackage, setActivePackage] = useState<number>(1);

  const t = (key: string): string => {
    const translations = aiChatbotTranslations[currentLanguage as keyof typeof aiChatbotTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  const whatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20AI%20ჩატბოტის%20სერვისით.%20მსურს%20უფასო%20კონსულტაცია.";

  // Scroll to top and stop navigation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Stop navigation spinner when component is fully loaded
    setTimeout(() => stopNavigation(), 50);
  }, [stopNavigation]);

  const platforms = [
    { icon: <FaFacebook />, key: "facebook", color: "blue" },
  ];

  const technicalFeatures = [
    { key: "feature1", icon: <FaBrain /> },
    { key: "feature2", icon: <FaCloud /> },
    { key: "feature3", icon: <FaShieldAlt /> },
  ];

  const apiCosts = [
    { key: "small" },
    { key: "medium" },
    { key: "large" },
  ];

  const faq = [
    { key: "q1" },
    { key: "q2" },
    { key: "q3" },
    { key: "q4" },
    { key: "q5" },
  ];

  const getColorClass = () => {
    return "border-slate-600 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-800/70 hover:to-slate-900/70";
  };

  const getTextColorClass = () => {
    return "text-blue-400";
  };

  return (
    <>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        url="https://inventogeo.com/services/ai-chatbot"
      />

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/8294604/pexels-photo-8294604.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-transparent to-blue-900/30"></div>
      </div>

      <div className="relative z-10 min-h-screen lg:mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-55 sm:pt-28 md:pt-34 pb-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section - Side-to-Side Layout */}
          <div className="max-w-7xl mx-auto mb-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content & Connection Demo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 max-w-lg flex flex-col justify-center h-full"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-['Inter','Noto_Sans_Georgian',sans-serif] text-center lg:text-left">
                  {t("hero.title")}{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
                    {t("hero.titleHighlight")}
                  </span>
                </h1>
                {/* AI Connection Demo */}
                <AIConnectionDemo />

                {/* WhatsApp Consultation Button */}
                <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-xl p-4 border border-green-500/30 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-green-400 font-semibold mb-1">{t("consultation.whatsapp")}</p>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <FaPhone className="text-green-400 text-sm" />
                        <span className="text-green-300 text-sm">{t("phone.number")}</span>
                      </div>
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/25"
                    >
                      <FaCommentDots size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 leading-relaxed font-['Inter','Noto_Sans_Georgian',sans-serif]">
                      <span className="text-blue-400 font-bold">
                        {t("hero.feature1.title")}
                      </span>{" "}
                      {t("hero.feature1.description")}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 leading-relaxed font-['Inter','Noto_Sans_Georgian',sans-serif]">
                      <span className="text-blue-400 font-bold">
                        {t("hero.feature2.title")}
                      </span>{" "}
                      {t("hero.feature2.description")}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 leading-relaxed font-['Inter','Noto_Sans_Georgian',sans-serif]">
                      <span className="text-blue-400 font-bold">
                        {t("hero.feature3.title")}
                      </span>{" "}
                      {t("hero.feature3.description")}
                    </p>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-base sm:text-lg text-blue-400 font-bold mb-2 font-['Inter','Noto_Sans_Georgian',sans-serif]">
                    {t("hero.demoLabel")}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-['Inter','Noto_Sans_Georgian',sans-serif]">
                    {t("hero.demoDescription")}
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Terminal Demo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:pl-8"
              >
                <ChatbotDemoTerminal />
              </motion.div>
            </div>
          </div>

          {/* Platforms Section - Enhanced */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl text-slate-300">
                {t("platforms.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: platforms.indexOf(platform) * 0.2 }}
                  whileHover={{ y: -10 }}
                  className={`p-4 sm:p-6 lg:p-8 rounded-3xl border-2 ${getColorClass()} border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm`}
                >
                  <div className={`text-4xl ${getTextColorClass()} mb-4`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {t(`platform.${platform.key}.name`)}
                  </h3>
                  <p
                    className={`text-sm ${getTextColorClass()} mb-4 font-medium`}
                  >
                    {t(`platform.${platform.key}.stats`)}
                  </p>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-slate-300"
                      >
                        <FaCheck
                          className={`${getTextColorClass()} mt-1 flex-shrink-0`}
                        />
                        <span className="text-sm">{t(`platform.${platform.key}.feature${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cost Structure Section */}
          <div className="!max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t("pricing.title")}
              </h2>
              <p className="text-xl text-slate-300">
                {t("pricing.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {/* One-time Investment */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/20 to-slate-800/30 rounded-3xl p-4 sm:p-6 lg:p-8 border border-blue-500/30 h-full hover:border-blue-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  <FaRocket className="text-blue-400 mr-3 inline" />
                  {t("pricing.investment.title")}
                </h3>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {t("pricing.investment.price")}
                    </div>
                    <div className="text-sm text-slate-400">
                      {t("pricing.investment.priceNote")}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mb-4">{t("pricing.investment.includes")}</div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="flex items-start gap-3">
                        <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">
                          {t(`pricing.investment.feature${num}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Operational Costs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-cyan-900/20 to-slate-800/30 rounded-3xl p-4 sm:p-6 lg:p-8 border border-cyan-500/30 h-full hover:border-cyan-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  <FaCloud className="text-blue-400 mr-3 inline" />
                  {t("pricing.monthly.title")}
                </h3>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {t("pricing.monthly.api")}
                    </div>
                    <div className="text-sm text-slate-400">
                      {t("pricing.monthly.price")}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-slate-300 text-sm font-medium">
                          {t("pricing.monthly.billing.title")}{" "}
                        </span>
                        <span className="text-slate-300 text-sm">
                          {t("pricing.monthly.billing.description")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-slate-300 text-sm font-medium">
                          {t("pricing.monthly.monitoring.title")}{" "}
                        </span>
                        <span className="text-slate-300 text-sm">
                          {t("pricing.monthly.monitoring.description")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-slate-300 text-sm font-medium">
                          {t("pricing.monthly.transparency.title")}{" "}
                        </span>
                        <span className="text-slate-300 text-sm">
                          {t("pricing.monthly.transparency.description")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* API Cost Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-purple-900/20 via-slate-800/40 to-slate-900/30 rounded-3xl p-8 border border-purple-500/30 mb-8 backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
              <h4 className="text-xl font-bold text-white mb-4 text-center">
                {t("pricing.examples.title")}
              </h4>
              <p className="text-sm text-slate-400 mb-6 text-center">
                {t("pricing.examples.note")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {apiCosts.map((cost) => (
                  <div key={cost.key} className="text-center">
                    <div className="text-white font-medium mb-2">
                      {t(`pricing.examples.${cost.key}`)}
                    </div>
                    <div className="text-slate-400 text-sm mb-2">
                      {t(`pricing.examples.${cost.key}Queries`)}
                    </div>
                    <div className="text-2xl font-bold text-blue-400">
                      {t(`pricing.examples.${cost.key}Cost`)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Admin Panel Section */}
            <div className="!max-w-6xl mx-auto mb-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                  <FaCog className="text-blue-400 mr-3 inline" />
                  {t("admin.title")}
                </h2>
              </div>

              <div className="mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-emerald-900/20 via-slate-800/40 to-blue-900/20 rounded-3xl p-6 border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  {/* cool s */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">
                        {t("admin.canDo")}
                      </h4>
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div
                            key={num}
                            className="flex items-center gap-2"
                          >
                            <FaCheck className="text-blue-400 text-sm" />
                            <span className="text-slate-300 text-sm">
                              {t(`admin.canDo.feature${num}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">
                        {t("admin.howWorks")}
                      </h4>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((step, index) => (
                          <div key={step} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-slate-300 text-sm">
                              {t(`admin.howWorks.step${step}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Technical Features */}
          <div className="!max-w-6xl mx-auto mb-24">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t("technical.title")}
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 px-4">
                {t("technical.subtitle")}
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {technicalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.01, y: -5 }}
                  className="bg-gradient-to-br from-indigo-900/20 via-slate-800/40 to-slate-900/30 rounded-3xl p-4 sm:p-6 lg:p-8 border border-indigo-500/30 backdrop-blur-sm hover:border-indigo-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="text-3xl sm:text-4xl lg:text-5xl text-blue-400 flex-shrink-0 mt-1 sm:mt-2">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                        {t(`technical.${feature.key}.title`)}
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {[1, 2, 3].map((pointNum) => (
                          <div
                            key={pointNum}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <FaCheck className="text-blue-400 text-xs sm:text-sm mt-1 flex-shrink-0" />
                            <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                              {t(`technical.${feature.key}.point${pointNum}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full !max-w-5xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("faq.title")}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.01 }}
                className="bg-gradient-to-r from-slate-800/50 via-slate-700/40 to-slate-800/30 rounded-2xl p-6 border border-slate-600/30 hover:border-blue-400/60 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  {t(`faq.${item.key}.question`)}
                </h3>
                <div className="ml-4">
                  <p className="text-blue-300 font-medium mb-2">
                    {t(`faq.${item.key}.answer`)}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(`faq.${item.key}.details`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Back inside container */}
      <div className="relative z-10 min-h-screen">
        <div
          className={`!max-w-5xl container mx-auto px-4 sm:px-6 lg:px-8 pb-10 ${getTransitionClasses()}`}
        >
          {/* CTA Section */}

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-r from-blue-500/20 via-blue-600/15 to-blue-700/20 rounded-3xl p-8 border border-blue-400/40 backdrop-blur-sm hover:border-blue-300/80 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <h3 className="text-3xl font-bold text-white mb-6">
                  {t("cta.question")}
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* არსებული "უფასო კონსულტაცია" ღილაკი */}
  <Link
    to="/start-project"
    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
  >
    <FaRocket />
    {t("cta.button")}
  </Link>

  {/* ახალი "მოითხოვე AI ჩატბოტი" ღილაკი */}
  <Link
    to="/services/ai-chatbot/request"
    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 border border-purple-400/50"
  >
    <FaBrain />
    {currentLanguage === 'ka' ? 'მოითხოვე AI ჩატბოტი' : 'Request AI Chatbot'}
  </Link>
</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
