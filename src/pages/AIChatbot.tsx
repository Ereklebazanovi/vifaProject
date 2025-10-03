"use client";

import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import {
  FaBrain,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaRocket,
  FaCheck,
  FaShieldAlt,
  FaCog,
  FaCloud,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { ChatbotDemoTerminal } from "../components/Terminal";
import { AIConnectionDemo } from "../components/AIConnectionDemo";

const AIChatbot: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const { stopNavigation } = useNavigation();
  // const [activePackage, setActivePackage] = useState<number>(1);

  // Scroll to top and stop navigation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Stop navigation spinner when component is fully loaded
    setTimeout(() => stopNavigation(), 50);
  }, [stopNavigation]);

  const platforms = [
    {
      icon: <FaFacebook />,
      name: "Facebook Messenger",
      color: "blue",
      stats: "2.3 მილიონზე მეტი აქტიური მომხმარებელი საქართველოში",
      features: [
        "მყისიერი პასუხი და კომუნიკაცია 24/7 რეჟიმში.",

        "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
        "მყისიერი კომუნიკაცია 24/7 რეჟიმში",
      ],
    },
    {
      icon: <FaWhatsapp />,
      name: "WhatsApp Business",
      color: "green",
      stats: "2.3 მილიონზე მეტი აქტიური მომხმარებელი საქართველოში",
      features: [
        "მყისიერი პასუხი და კომუნიკაცია 24/7 რეჟიმში.",
        "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
        "მყისიერი კომუნიკაცია 24/7 რეჟიმში",
      ],
    },
    {
      icon: <FaInstagram />,
      name: "Instagram Direct",
      color: "pink",
      stats: "2.3 მილიონზე მეტი აქტიური მომხმარებელი საქართველოში",
      features: [
        "მყისიერი პასუხი და კომუნიკაცია 24/7 რეჟიმში.",
        "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
        "მყისიერი კომუნიკაცია 24/7 რეჟიმში",
      ],
    },
  ];

  const technicalFeatures = [
    {
      icon: <FaBrain />,
      title: "ინტელექტუალური ბირთვი: Google Gemini",
      subtitle: "",
      features: [
        "ქართული ენის სრული მხარდაჭერა - ზუსტი და ბუნებრივი კომუნიკაცია.",
        "კონტექსტური მეხსიერება - სისტემას ახსოვს საუბრის ისტორია და არ იმეორებს შეცდომებს.",
        "მულტი-ტასკინგი - რთული ამოცანების ერთდროულად და ეფექტურად შესრულება.",
      ],
    },
    {
      icon: <FaCloud />,
      title: "ოპერაციული საიმედოობა და სისწრაფე",
      subtitle: "",
      features: [
        "99.9% Uptime - თქვენი სერვისი ხელმისაწვდომია თითქმის 24/7 შეფერხების გარეშე.",
        "0.5 წამი საშუალო პასუხის დრო - მყისიერი რეაგირება მომხმარებლის მოთხოვნებზე.",
        "ათასობით ერთდროული მომხმარებელი - მარტივი მასშტაბირება, ნებისმიერი დატვირთვისთვის მზადყოფნა.",
      ],
    },
    {
      icon: <FaShieldAlt />,
      title: "უსაფრთხოება და კონფიდენციალურობა",
      subtitle: "",
      features: [
        "ბანკის დონის უსაფრთხოება - თქვენი მონაცემების დაცვა უმაღლესი სტანდარტით.",
        "GDPR დაცვა - მონაცემთა დაცვის საერთაშორისო მოთხოვნებთან სრული შესაბამისობა.",
        "ყველა მონაცემი დაშიფრულია - ინფორმაციის სრული კონფიდენციალურობა გადაცემისა და შენახვისას.",
      ],
    },
  ];

  const apiCosts = [
    {
      business: "მცირე ბიზნესი",
      queries: "500 დიალოგი/კომუნიკაცია",
      cost: "5₾ - 10₾",
    },
    {
      business: "საშუალო ბიზნესი",
      queries: "2,000 დიალოგი/კომუნიკაცია",
      cost: "20₾ - 35₾",
    },
    {
      business: "დიდი ბიზნესი",
      queries: "10,000 დიალოგი/კომუნიკაცია",
      cost: "100₾ - 160₾",
    },
  ];

  const faq = [
    {
      question: "რამდენ დროს მოითხოვს ჩატბოტის გაშვება?",
      answer: "7-14 სამუშაო დღე.",
      details:
        "მზა AI ასისტენტს მიიღებთ 7-14 სამუშაო დღეში. ზუსტი ვადები დამოკიდებულია თქვენი ბიზნესის სირთულესა და საჭირო ინტეგრაციების რაოდენობაზე.",
    },
    {
      question: "შესაძლებელია თუ არა კონტენტის შეცვლა გაშვების შემდეგ?",
      answer: "დიახ, ნებისმიერ დროს, რეალურ დროში.",
      details:
        "თქვენ შეგიძლიათ თავად დაარედაქტიროთ AI-ს ცოდნის ბაზა და პასუხები ჩვენი ადმინ პანელიდან. ცვლილებები ძალაში შედის მყისიერად.",
    },
    {
      question: "რა მოხდება Google API-ის გადახდის შეფერხების შემთხვევაში?",
      answer: "თქვენი მონაცემები სრულად შენარჩუნდება.",
      details:
        "Google-ის წესების მიხედვით, ჩატბოტი დროებით შეწყვეტს მუშაობას, თუმცა თქვენი ყველა მონაცემი და სისტემის გამართვა სრულად და უსაფრთხოდ შეინახება.",
    },
    {
      question: "არის თუ არა შესაძლებელი ვებსაიტზე ინტეგრაცია?",
      answer: "რა თქმა უნდა, დიახ (Web Widget).",
      details:
        "ვებსაიტის Live Chat Widget-ის ინტეგრაცია ხელმისაწვდომია Business და Enterprise პაკეტების ფარგლებში.",
    },
    {
      question: "რამდენ ენაზე შეუძლია AI-ს საუბარი?",
      answer: "ძირითადად, ქართულად და ინგლისურად.",
      details:
        "AI-ს აქვს მრავალენოვანი შესაძლებლობები. ჩვენ ტრენინგს ვატარებთ ძირითადად ქართულ და ინგლისურ ენებზე, მაგრამ საჭიროების შემთხვევაში, დამატებითი ენების სწავლება შესაძლებელია.",
    },
  ];

  const getColorClass = () => {
    // Simplified to use only subtle blue tones
    return "border-slate-600 bg-slate-800/30";
  };

  const getTextColorClass = () => {
    // Simplified to use only blue tones
    return "text-blue-400";
  };

  return (
    <>
      <SEO
        title="AI ჩატბოტები - თქვენი ბიზნესის ციფრული რევოლუცია - VIFA"
        description="AI ჩატბოტები Facebook, WhatsApp და Instagram-ისთვის. 24/7 მომხმარებელთა მხარდაჭერა, გაყიდვების ზრდა და ხარჯების ოპტიმიზაცია. Google Gemini AI ტექნოლოგია."
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
                  თქვენი ბიზნესის{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
                    ციფრული რევოლუცია
                  </span>
                </h1>
                {/* AI Connection Demo */}
                <AIConnectionDemo />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 leading-relaxed font-['Inter','Noto_Sans_Georgian',sans-serif]">
                      <span className="text-blue-400 font-bold">
                        24/7 ავტომატური მომსახურება
                      </span>{" "}
                      - თქვენი კლიენტები პასუხს მიიღებენ ნებისმიერ დროს
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 leading-relaxed font-['Inter','Noto_Sans_Georgian',sans-serif]">
                      <span className="text-blue-400 font-bold">
                        სპეციალიზებული ტრენინგი
                      </span>{" "}
                      - AI სწავლობს თქვენი ბიზნესის სპეციფიკას
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 leading-relaxed font-['Inter','Noto_Sans_Georgian',sans-serif]">
                      <span className="text-blue-400 font-bold">
                        გაზრდილი მოგება
                      </span>{" "}
                      - დაზოგეთ თანხა და მიიღეთ გამოტოვებული შემოსავალი
                    </p>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-base sm:text-lg text-blue-400 font-bold mb-2 font-['Inter','Noto_Sans_Georgian',sans-serif]">
                    იხილეთ როგორ მუშაობს ჩვენი AI ასისტენტი →
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-['Inter','Noto_Sans_Georgian',sans-serif]">
                    რეალური საუბარი სალონის მფლობელთან
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
                ინტეგრაცია ყველა მთავარ პლატფორმაზე
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`p-4 sm:p-6 lg:p-8 rounded-2xl border-2 ${getColorClass()} border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105`}
                >
                  <div className={`text-4xl ${getTextColorClass()} mb-4`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {platform.name}
                  </h3>
                  <p
                    className={`text-sm ${getTextColorClass()} mb-4 font-medium`}
                  >
                    {platform.stats}
                  </p>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-slate-300"
                      >
                        <FaCheck
                          className={`${getTextColorClass()} mt-1 flex-shrink-0`}
                        />
                        <span className="text-sm">{feature}</span>
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
                ფინანსური სტრუქტურა და API ხარჯები
              </h2>
              <p className="text-xl text-slate-300">
                ჩვენი ფასები მორგებულია კონკრეტული პროექტის სირთულესა და
                საჭიროებებზე. გთავაზობთ გამჭირვალე და მარტივად გასაგებ საფასო
                მოდელს:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {/* One-time Investment */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-600 h-full"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  <FaRocket className="text-blue-400 mr-3 inline" />
                  საწყისი ინვესტიცია
                </h3>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      300₾-დან
                    </div>
                    <div className="text-sm text-slate-400">
                      ფასი დამოკიდებულია მოთხოვნებზე
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mb-4">მოიცავს:</div>
                  <div className="space-y-3">
                    {[
                      "AI მოდელის გაწვრთნა თქვენი მონაცემებით",
                      "WhatsApp, Messenger და სხვა პლატფორმებთან ინტეგრაცია",
                      "სრულად ფუნქციონალური ადმინ პანელი",
                      "ანალიტიკა და სტატისტიკა",
                      "საწყისი ტექნიკური მხარდაჭერა – უფასოდ",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">
                          {feature}
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
                className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-600 h-full"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  <FaCloud className="text-blue-400 mr-3 inline" />
                  ყოველთვიური ხარჯები
                </h3>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      Google Gemini API
                    </div>
                    <div className="text-sm text-slate-400">
                      0.20₾ – 0.40₾ / 1,000 ტოკენზე
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-slate-300 text-sm font-medium">
                          ბილინგი:{" "}
                        </span>
                        <span className="text-slate-300 text-sm">
                          ხარჯი გენერირდება უშუალოდ თქვენს Google Cloud
                          ანგარიშზე
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-slate-300 text-sm font-medium">
                          მონიტორინგი:{" "}
                        </span>
                        <span className="text-slate-300 text-sm">
                          რეალურ დროში ხარჯების ნახვა
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-blue-400 text-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-slate-300 text-sm font-medium">
                          გამჭვირვალობა:{" "}
                        </span>
                        <span className="text-slate-300 text-sm">
                          არანაირი დამალული გადასახადი
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* API Cost Examples */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/30 mb-8">
              <h4 className="text-xl font-bold text-white mb-4 text-center">
                სავარაუდო API ხარჯები (ტოკენების გამოყენების მიხედვით)
              </h4>
              <p className="text-sm text-slate-400 mb-6 text-center">
                შენიშვნა: ხარჯი დამოკიდებულია ტოკენების რაოდენობაზე, ანუ
                დამუშავებული ინფორმაციის მოცულობაზე.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {apiCosts.map((cost) => (
                  <div key={cost.business} className="text-center">
                    <div className="text-white font-medium mb-2">
                      {cost.business}
                    </div>
                    <div className="text-slate-400 text-sm mb-2">
                      {cost.queries}
                    </div>
                    <div className="text-2xl font-bold text-blue-400">
                      {cost.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Panel Section */}
            <div className="!max-w-6xl mx-auto mb-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                  <FaCog className="text-blue-400 mr-3 inline" />
                  ადმინ პანელი - სრული კონტროლი
                </h2>
              </div>

              <div className="mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl p-6 border border-slate-700/30"
                >
                  {/* cool s */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">
                        რას შეძლებთ:
                      </h4>
                      <div className="space-y-3">
                        {[
                          "რეალურ დროში რედაქტირება",
                          "ახალი კითხვა-პასუხების დამატება",
                          "პროდუქტების მენეჯმენტი",
                          "საუბრების ისტორია",
                          "დეტალური ანალიტიკა",
                        ].map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <FaCheck className="text-blue-400 text-sm" />
                            <span className="text-slate-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">
                        როგორ მუშაობს:
                      </h4>
                      <div className="space-y-3">
                        {[
                          "შედით ბრაუზერიდან ნებისმიერი მოწყობილობიდან",
                          "აირჩიეთ სექცია (პროდუქტები, კითხვები)",
                          "შეცვალეთ ტექსტი მარტივ ედიტორში",
                          "დააჭირეთ 'შენახვა' - მაშინვე ძალაში შედის!",
                        ].map((step, index) => (
                          <div key={step} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-slate-300 text-sm">
                              {step}
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
                ტექნიკური უპირატესობები
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 px-4">
                მოწინავე ტექნოლოგიები საუკეთესო შედეგისთვის
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {technicalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-800/50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/30"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="text-3xl sm:text-4xl lg:text-5xl text-blue-400 flex-shrink-0 mt-1 sm:mt-2">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                        {feature.title}
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {feature.features.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 sm:gap-3">
                            <FaCheck className="text-blue-400 text-xs sm:text-sm mt-1 flex-shrink-0" />
                            <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                              {item}
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
              ხშირად დასმული შეკითხვები
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 rounded-xl p-6 border border-slate-600/30 hover:border-blue-400/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  {item.question}
                </h3>
                <div className="ml-4">
                  <p className="text-blue-300 font-medium mb-2">
                    {item.answer}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.details}
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
                className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl p-8 border border-blue-400/20"
              >
                <h3 className="text-3xl font-bold text-white mb-6">
                  მზად ხარ გამოსცადო?
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/start-project"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaRocket />
                    უფასო კონსულტაცია
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
