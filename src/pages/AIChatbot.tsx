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
        "95%-ით სწრაფი კომუნიკაცია ელფოსტასთან შედარებით.",
        "3-ჯერ მაღალი კონვერსიის (გაყიდვის) მაჩვენებელი.",
        "მყისიერი კომუნიკაცია 24/7 რეჟიმში",
      ],
    },
    {
      icon: <FaWhatsapp />,
      name: "WhatsApp Business",
      color: "green",
      stats: "წვდომა 2.3 მილიონზე მეტ პოტენციურ კლიენტზე საქართველოში.",
      features: [
        "ელფოსტისგან განსხვავებით, თქვენი შეტყობინებები 98%-ით ხვდება ადრესატთან.	",
        "მდიდარი მულტიმედია ფუნქციები (სურათები, დოკუმენტები, ვიდეო).",
        "მობილური კომუნიკაციის ლიდერი",
      ],
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      color: "pink",
      stats: "18-34 წლის ასაკის 80% მომხმარებელი",
      features: [
        "ვიზუალური ძალა და მაღალი conversion",
        "Stories და Direct ინტეგრაცია",
        "სრული ფუნქციონალური ეკოსისტემა",
      ],
    },
  ];

  const technicalFeatures = [
    {
      icon: <FaBrain />,
      title: "Google Gemini AI",
      features: [
        "ქართული ენის სრული მხარდაჭერა",
        "კონტექსტური მეხსიერება",
        "მულტი-ტასკინგი",
      ],
    },
    {
      icon: <FaCloud />,
      title: "მოდერნული ინფრასტრუქტურა",
      features: [
        "99.9% Uptime",
        "0.5 წამი საშუალო პასუხის დრო",
        "ათასობით ერთდროული მომხმარებელი",
      ],
    },
    {
      icon: <FaShieldAlt />,
      title: "უსაფრთხოება",
      features: [
        "ბანკის დონის უსაფრთხოება",
        "GDPR კომპლაინსი",
        "ყველა მონაცემი დაშიფრულია",
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
      question: "რამდენ დროს საჭიროებს ჩატბოტის გაშვება?",
      answer: "მზა AI ასისტენტს მიიღებთ 7-14 სამუშაო დღეში.",
      details:
        "დრო დამოკიდებულია თქვენი ბიზნესის სირთულესა და საჭირო ინტეგრაციების რაოდენობაზე.",
    },
    {
      question: "შემიძლია თუ არა კონტენტის შეცვლა გაშვების შემდეგ?",
      answer: "დიახ, ნებისმიერ დროს.",
      details:
        "თქვენ შეგიძლიათ დაარედაქტიროთ AI-ს ცოდნის ბაზა და პასუხები ადმინ პანელიდან, ცვლილებები ძალაში შედის რეალურ დროში.",
    },
    {
      question: "რა მოხდება Google API-ის გადახდის შეფერხების შემთხვევაში?",
      answer: "მონაცემები და კონფიგურაცია შენარჩუნდება.",
      details:
        "Google-ის წესების თანახმად, ჩატბოტი დროებით შეწყვეტს მუშაობას, თუმცა თქვენი ყველა მონაცემი და სისტემის გამართვა სრულად შეინახება.",
    },
    {
      question: "არის თუ არა შესაძლებელი ვებსაიტზე ინტეგრაცია?",
      answer: "დიახ, რა თქმა უნდა.",
      details:
        "ვებსაიტის (Web Widget) ინტეგრაცია შესაძლებელია Business და Enterprise პაკეტების ფარგლებში.",
    },
    {
      question: "რამდენ ენაზე შეუძლია AI-ს საუბარი?",
      answer: "ძირითადად, ქართულად და ინგლისურად.",
      details:
        "AI-ს შეუძლია მუშაობა მრავალ ენაზე, თუმცა ძირითად ტრენინგს გადიან ქართულ და ინგლისურ ენებზე. საჭიროების შემთხვევაში, დამატებითი ენების სწავლება შესაძლებელია.",
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

      <div className="relative z-10 min-h-screen mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-25 sm:pt-28 md:pt-34 pb-10 ${getTransitionClasses()}`}
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-['Inter','Noto_Sans_Georgian',sans-serif]">
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
                  <p className="text-lg text-blue-400 font-bold mb-2 font-['Inter','Noto_Sans_Georgian',sans-serif]">
                    იხილეთ როგორ მუშაობს ჩვენი AI ასისტენტი →
                  </p>
                  <p className="text-sm text-slate-400 font-['Inter','Noto_Sans_Georgian',sans-serif]">
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
            <div className="text-center mb-16">
              <h2 className="text-2xl text-slate-300">
                ინტეგრაცია ყველა მთავარ პლატფორმაზე
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`p-8 rounded-2xl border-2 ${getColorClass()} border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105`}
                >
                  <div
                    className={`text-4xl ${getTextColorClass()} mb-4`}
                  >
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
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
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                ფინანსური სტრუქტურა და API ხარჯები
              </h2>
              <p className="text-xl text-slate-300">
                ჩვენი საბოლოო ფასი დამოკიდებულია პროექტის სირთულესა და თქვენს
                ინდივიდუალურ მოთხოვნებზე
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* One-time Investment */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-slate-800/30 rounded-2xl p-8 border border-slate-600"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  <FaRocket className="text-blue-400 mr-3 inline" />
                  ერთჯერადი საწყისი ინვესტიცია
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">
                      შექმნა და კონფიგურაცია
                    </span>
                    <span className="text-blue-400 font-bold">500₾-დან</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    ფასი განისაზღვრება ინდივიდუალურად. მოიცავს: AI ტრენინგს
                    თქვენს ბიზნეს მონაცემებზე, პლატფორმების ინტეგრაცია
                    (WhatsApp, Messenger), სრული ადმინ პანელი, ანალიტიკა და
                    უფასო მხარდაჭერა
                  </div>
                </div>
              </motion.div>

              {/* Operational Costs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-slate-800/30 rounded-2xl p-8 border border-slate-600"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  <FaCloud className="text-blue-400 mr-3 inline" />
                  ყოველთვიური ოპერაციული ხარჯები
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Google Gemini API</span>
                    <span className="text-blue-400 font-bold">
                      0.20₾ - 0.40₾/1000 ტოკენზე
                    </span>
                  </div>
                  <div className="text-sm text-slate-400">
                    სრული გამჭვირვალობა: ხარჯი გენერირდება უშუალოდ თქვენს Google
                    Cloud ანგარიშზე. არანაირი დამალული ხარჯი და რეალურ დროში
                    მონიტორინგი
                  </div>
                </div>
              </motion.div>
            </div>

            {/* API Cost Examples */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/30">
              <h4 className="text-xl font-bold text-white mb-4 text-center">
                რეალური მაგალითები: სავარაუდო თვიური API ღირებულება
              </h4>
              <p className="text-sm text-slate-400 mb-6 text-center">
                შენიშვნა: ხარჯი დამოკიდებულია დამუშავებული ინფორმაციის
                მოცულობაზე (ტოკენებზე), და არა მხოლოდ შეკითხვების რაოდენობაზე
              </p>
              <div className="grid md:grid-cols-3 gap-6">
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
          </div>

          {/* Admin Panel Features */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                <FaCog className="text-blue-400 mr-3 inline" />
                ადმინ პანელი - სრული კონტროლი
              </h2>
              <p className="text-xl text-slate-300">
                მართეთ ყველაფერი მარტივად, რეალურ დროში
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl p-6 border border-slate-700/30"
              >
                {/* cool s */}
                <div className="grid md:grid-cols-2 gap-6">
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
                        <div key={feature} className="flex items-center gap-2">
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
                          <span className="text-slate-300 text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Technical Features */}
          <div className="max-w-5xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                ტექნიკური უპირატესობები
              </h2>
              <p className="text-xl text-slate-300">
                მოწინავე ტექნოლოგიები საუკეთესო შედეგისთვის
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {technicalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/30 text-center"
                >
                  <div className="text-4xl text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="text-slate-300 text-sm">
                        {item}
                      </div>
                    ))}
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
            <p className="text-slate-300">
              მიიღეთ პასუხები ყველაზე ხშირ კითხვებზე
            </p>
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
      <div className="relative z-10 min-h-screen mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-25 sm:pt-28 md:pt-34 pb-10 ${getTransitionClasses()}`}
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
                  მზად ხართ რომ გადააქციოთ თქვენი ბიზნესი?
                </h3>
                <p className="text-xl text-slate-300 mb-8">
                  ჩვენ არ ვქმნით უბრალო ჩატბოტებს - ჩვენ ვქმნით ციფრულ
                  გაყიდვების მანქანებს თქვენი ბიზნესისთვის
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/start-project"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaRocket />
                    უფასო კონსულტაცია
                  </Link>
                  <a
                    href="tel:+995555123456"
                    className="inline-flex items-center gap-2 border-2 border-blue-400 text-blue-400 px-8 py-4 text-lg font-medium hover:bg-blue-400 hover:text-white transition-all duration-300 rounded-lg"
                  >
                    <FaWhatsapp />
                    555 123 456
                  </a>
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
