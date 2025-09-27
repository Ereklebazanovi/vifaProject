"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaBrain,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaRocket,
  FaChartLine,
  FaStore,
  FaUtensils,
  FaCheck,
  FaMoneyBillAlt,
  FaClock,
  FaUsers,
  FaShieldAlt,
  FaCog,
  FaHospital,
  FaTools,
  
  FaCloud,
 
  FaPlayCircle,
  FaCode,
  FaPhoneAlt,
} from "react-icons/fa";
import SEO from "../components/SEO";
import Silk from "../components/Silk";

const AIChatbot: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  // const [activePackage, setActivePackage] = useState<number>(1);

  const platforms = [
    {
      icon: <FaFacebook />,
      name: "Facebook Messenger",
      color: "blue",
      stats: "2.9 მილიარდი აქტიური მომხმარებელი",
      features: [
        "95%-ით უფრო სწრაფი ვიდრე ელ-ფოსტა",
        "3x უფრო მაღალი conversion rate",
        "ინსტანტ კომუნიკაცია"
      ]
    },
    {
      icon: <FaWhatsapp />,
      name: "WhatsApp Business",
      color: "green",
      stats: "საქართველოში 2.5 მილიონი მომხმარებელი",
      features: [
        "98% გახსნის მაჩვენებელი",
        "მულტიმედია ფუნქციონალი",
        "მობილური კომუნიკაციის ლიდერი"
      ]
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      color: "pink",
      stats: "18-34 წლის ასაკის 80% მომხმარებელი",
      features: [
        "ვიზუალური ძალა და მაღალი conversion",
        "Stories და Direct ინტეგრაცია",
        "სრული ფუნქციონალური ეკოსისტემა"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FaClock />,
      title: "24/7 ხელმისაწვდომობა",
      description: "არ კარგავთ არცერთ კლიენტს - ღამის 2 საათზეც კი პასუხობს. საშუალოდ 0.5 წამში პასუხი.",
      color: "blue"
    },
    {
      icon: <FaMoneyBillAlt />,
      title: "ეფექტური გაყიდვები",
      description: "ლიდების კვალიფიკაცია, უფროსტრაცია-ფრი შოპინგი და ავტომატური Up-selling/Cross-selling.",
      color: "green"
    },
    {
      icon: <FaChartLine />,
      title: "ხარჯების შემცირება",
      description: "1 ჩატბოტი = 3-5 თანამშრომელი. მინიმუმ 3000-8000 ლარის ეკონომია თვეში.",
      color: "purple"
    },
    {
      icon: <FaUsers />,
      title: "გამოცდილების გაუმჯობესება",
      description: "ინსტანტ პასუხები, პერსონალიზირებული მიდგომა და ენების მხარდაჭერა.",
      color: "orange"
    }
  ];

  const statistics = [
    { value: "67%", label: "კომპანიებისა იყენებს ჩატბოტებს მსოფლიოში", color: "blue" },
    { value: "3x", label: "უფრო მაღალი conversion rate", color: "green" },
    { value: "85%", label: "კლიენტთა კმაყოფილების მაჩვენებელი", color: "purple" },
    { value: "300-800%", label: "ROI ინვესტიციის უკუგება 3-6 თვეში", color: "orange" }
  ];

  const industries = [
    {
      icon: <FaStore />,
      title: "E-commerce",
      description: "პროდუქტის ძებნა, რეკომენდაციები, კალათაში დამატება და შეკვეთის ტრეკინგი",
      result: "საშუალოდ 35% გაყიდვების ზრდა",
      features: ["პროდუქტის ძებნა კატეგორიების მიხედვით", "ინტელექტუალური რეკომენდაციები", "კალათაში დამატება და checkout", "შეკვეთის სტატუსის ტრეკინგი"]
    },
    {
      icon: <FaTools />,
      title: "სერვისები",
      description: "დანიშვნების ბუკინგი, კონსულტაციები, კალკულატორი და ექსპერტის არჩევა",
      result: "60% მეტი ბუკინგი",
      features: ["დანიშვნების ავტომატური ბუკინგი", "კონსულტაციების რეზერვაცია", "საფასური კალკულატორი", "ექსპერტის არჩევა"]
    },
    {
      icon: <FaUtensils />,
      title: "HoReCa",
      description: "ინტერაქტიული მენიუ, პერსონალიზირებული რეკომენდაციები და მიტანის ტრეკინგი",
      result: "50% მეტი ონლაინ შეკვეთა",
      features: ["ინტერაქტიული მენიუ", "პერსონალიზირებული რეკომენდაციები", "ონლაინ შეკვეთა და გადახდა", "მიტანის ტრეკინგი"]
    },
    {
      icon: <FaHospital />,
      title: "ჯანდაცვა",
      description: "სპეციალისტებთან ჩაწერა, სიმპტომების სკრინინგი და სერვისების აღწერა",
      result: "40% ნაკლები გაუქმებული ვიზიტი",
      features: ["სპეციალისტებთან ჩაწერა", "სიმპტომების პრე-სკრინინგი", "სერვისების აღწერა და ფასები", "მომზადების ინსტრუქციები"]
    }
  ];

  const packages = [
    {
      name: "STARTER",
      price: "800₾",
      period: "ერთჯერადი",
      description: "მცირე ბიზნესისთვის",
      ideal: "მაღაზიები, კაფეები, სალონები",
      features: [
        "1 პლატფორმა (Facebook ან WhatsApp)",
        "ძირითადი ფუნქციონალი",
        "10 სტანდარტული კითხვა-პასუხი",
        "ბაზისური ადმინ პანელი",
        "1 თვე უფასო მხარდაჭერა"
      ],
      color: "blue"
    },
    {
      name: "BUSINESS",
      price: "1200₾",
      period: "ერთჯერადი",
      description: "საშუალო ბიზნესისთვის",
      ideal: "სერვისები, ონლაინ მაღაზიები, კლინიკები",
      features: [
        "2 პლატფორმა",
        "მოწინავე ფუნქციონალი (ბუკინგი, პეიმენტი)",
        "25 კასტომ კითხვა-პასუხი",
        "სრული ადმინ პანელი + ანალიტიკა",
        "CRM ინტეგრაცია (ოფციონალური)",
        "2 თვე უფასო მხარდაჭერა"
      ],
      color: "green",
      popular: true
    },
    {
      name: "ENTERPRISE",
      price: "1500₾",
      period: "ერთჯერადი",
      description: "დიდი ბიზნესისთვის",
      ideal: "ქსელები, კორპორაციები, ფრანშიზები",
      features: [
        "ყველა 3 პლატფორმა",
        "სრული კასტომიზაცია",
        "ულიმიტო კითხვა-პასუხი",
        "AI-ის გაძლიერებული ტრენინგი",
        "რეალურ დროში მულტი-ოპერატორი",
        "API ინტეგრაციები",
        "3 თვე უფასო მხარდაჭერა + პრიორიტეტული"
      ],
      color: "purple"
    }
  ];

  const technicalFeatures = [
    {
      icon: <FaBrain />,
      title: "Google Gemini AI",
      features: ["ქართული ენის სრული მხარდაჭერა", "კონტექსტური მეხსიერება", "მულტი-ტასკინგი"]
    },
    {
      icon: <FaCloud />,
      title: "მოდერნული ინფრასტრუქტურა",
      features: ["99.9% Uptime", "0.5 წამი საშუალო პასუხის დრო", "ათასობით ერთდროული მომხმარებელი"]
    },
    {
      icon: <FaShieldAlt />,
      title: "უსაფრთხოება",
      features: ["ბანკის დონის უსაფრთხოება", "GDPR კომპლაინსი", "ყველა მონაცემი დაშიფრულია"]
    }
  ];

  const apiCosts = [
    { business: "მცირე ბიზნესი", queries: "500 შეკითხვა/თვე", cost: "2-5 ლარი" },
    { business: "საშუალო ბიზნესი", queries: "2000 შეკითხვა/თვე", cost: "5-15 ლარი" },
    { business: "დიდი ბიზნესი", queries: "10000 შეკითხვა/თვე", cost: "20-50 ლარი" }
  ];

  const faq = [
    {
      question: "რამდენ დრში ვიღებ მზა ჩატბოტს?",
      answer: "7-14 დღეში, პაკეტისა და სირთულის მიხედვით."
    },
    {
      question: "შემიძლია თუ არა ჩატბოტის შეცვლა გაშვების შემდეგ?",
      answer: "დიახ! ადმინ პანელიდან ნებისმიერ დროს, რეალურ დროში."
    },
    {
      question: "რა მოხდება თუ Google API ვერ გადავიხდი?",
      answer: "ჩატბოტი შეწყვეტს მუშაობას, მაგრამ ყველა მონაცემი და კონფიგურაცია შენარჩუნდება."
    },
    {
      question: "არის თუ არა შესაძლებელი ინტეგრაცია ჩემს ვებსაიტთან?",
      answer: "დიახ, Business და Enterprise პაკეტებში."
    },
    {
      question: "რამდენი ენა შეუძლია ჩატბოტს?",
      answer: "ძირითადად ქართული და ინგლისური, მაგრამ შესაძლებელია სხვა ენების დამატება."
    }
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      pink: "border-pink-400 bg-pink-500/10",
      orange: "border-orange-400 bg-orange-500/10"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400",
      pink: "text-pink-400",
      orange: "text-orange-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title="AI ჩატბოტები - თქვენი ბიზნესის ციფრული რევოლუცია - VIFA"
        description="AI ჩატბოტები Facebook, WhatsApp და Instagram-ისთვის. 24/7 მომხმარებელთა მხარდაჭერა, გაყიდვების ზრდა და ხარჯების ოპტიმიზაცია. Google Gemini AI ტექნოლოგია."
      />

      {/* Silk Shader Background */}
      <div className="fixed inset-0 z-0">
        <Silk
          speed={3}
          scale={1.2}
          color="#1e293b"
          noiseIntensity={0.8}
          rotation={0.1}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-orange-900/20"></div>
      </div>

      <div className="relative z-10 min-h-screen mt-15">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-25 sm:pt-28 md:pt-34 pb-10 ${getTransitionClasses()}`}>

          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-500/20 rounded-full border border-orange-400/30 mb-6">
                  <FaBrain className="text-orange-400 text-2xl" />
                  <span className="text-orange-400 font-medium">AI ჩატბოტები</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  თქვენი ბიზნესის <span className="text-orange-400">ციფრული რევოლუცია</span>
                </h1>

                <p className="text-xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
                  AI ჩატბოტი არის ხელოვნური ინტელექტით აღჭურვილი ციფრული ასისტენტი, რომელიც ავტომატურად
                  პასუხობს მომხმარებელთა კითხვებს, ეხმარება პროდუქტების არჩევაში და ახორციელებს გაყიდვებს 24/7 რეჟიმში.
                  ეს არის თქვენი ყველაზე ეფექტური თანამშრომელი, რომელიც არასდროს დასცქერის და ყოველთვის ხელმისაწვდომია.
                </p>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              >
                {statistics.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-3xl font-bold ${getTextColorClass(stat.color)} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Platforms Section - Enhanced */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">ჩვენი პლატფორმები</h2>
              <p className="text-xl text-slate-300">მხარდაჭერა ყველა მთავარ პლატფორმაზე გლობალური გავლენით</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`p-8 rounded-2xl border-2 ${getColorClass(platform.color)} border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105`}
                >
                  <div className={`text-4xl ${getTextColorClass(platform.color)} mb-4`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                  <p className={`text-sm ${getTextColorClass(platform.color)} mb-4 font-medium`}>
                    {platform.stats}
                  </p>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <FaCheck className={`${getTextColorClass(platform.color)} mt-1 flex-shrink-0`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section - Enhanced */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">რატომ არის AI ჩატბოტი აუცილებელი?</h2>
              <p className="text-xl text-slate-300">ბიზნესისთვის უდიდესი სარგებელი და ტრანსფორმაცია</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 ${getColorClass(benefit.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-opacity-30`}>
                    <span className={`text-3xl ${getTextColorClass(benefit.color)}`}>
                      {benefit.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cost Structure Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">ღია და გამჭვირვალე ღირებულება</h2>
              <p className="text-xl text-slate-300">მხოლოდ Google API ღირებულება - სრული კონტროლი თქვენს ხელში</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* One-time Investment */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-400/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  <FaRocket className="text-blue-400 mr-3 inline" />
                  ერთჯერადი ინვესტიცია
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">შექმნა და კონფიგურაცია</span>
                    <span className="text-blue-400 font-bold">800-1500₾</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    მოიცავს: AI ტრენინგი, პლატფორმების ინტეგრაცია, ადმინ პანელი,
                    ანალიტიკა, დოკუმენტაცია და უფასო მხარდაჭერა
                  </div>
                </div>
              </motion.div>

              {/* Operational Costs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-400/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  <FaCloud className="text-green-400 mr-3 inline" />
                  ოპერაციული ხარჯები
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg text-green-400 font-medium">Google Gemini API</div>
                    <div className="text-sm text-slate-400">1000 შეკითხვა ≈ 1-3 ლარი</div>
                  </div>
                  <div className="text-sm text-slate-300">
                    ✅ სრული გამჭვირვალება - ხედავთ ყოველ ლარს<br/>
                    ✅ თქვენი Google Cloud ანგარიში<br/>
                    ✅ No Hidden Fees - 0% საკომისიო
                  </div>
                </div>
              </motion.div>
            </div>

            {/* API Cost Examples */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/30">
              <h4 className="text-xl font-bold text-white mb-6 text-center">რეალური მაგალითები - თვიური API ღირებულება</h4>
              <div className="grid md:grid-cols-3 gap-6">
                {apiCosts.map((cost) => (
                  <div key={cost.business} className="text-center">
                    <div className="text-white font-medium mb-2">{cost.business}</div>
                    <div className="text-slate-400 text-sm mb-2">{cost.queries}</div>
                    <div className="text-2xl font-bold text-green-400">{cost.cost}</div>
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
              <p className="text-xl text-slate-300">მართეთ ყველაფერი მარტივად, რეალურ დროში</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl p-8 border border-slate-700/30"
            >
        {/* cool */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-6">რას შეძლებთ:</h4>
                  <div className="space-y-4">
                    {[
                      "რეალურ დროში რედაქტირება",
                      "ახალი კითხვა-პასუხების დამატება",
                      "პროდუქტების მენეჯმენტი",
                      "საუბრების ისტორია",
                      "დეტალური ანალიტიკა"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <FaCheck className="text-green-400" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-6">როგორ მუშაობს:</h4>
                  <div className="space-y-4">
                    {[
                      "შედით ბრაუზერიდან ნებისმიერი მოწყობილობიდან",
                      "აირჩიეთ სექცია (პროდუქტები, კითხვები)",
                      "შეცვალეთ ტექსტი მარტივ ედიტორში",
                      "დააჭირეთ 'შენახვა' - მაშინვე ძალაში შედის!"
                    ].map((step, index) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
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

          {/* Industries Section - Enhanced */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">ინდუსტრიული გამოყენება</h2>
              <p className="text-xl text-slate-300">რეალური შედეგები სხვადასხვა ბიზნეს სფეროში</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30 hover:border-orange-400/40 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl text-orange-400 mr-4">{industry.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                      <div className="text-green-400 font-medium text-sm">{industry.result}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">{industry.description}</p>
                  <div className="space-y-2">
                    {industry.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300">
                        <FaCheck className="text-orange-400 flex-shrink-0 text-xs" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technical Features */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">ტექნიკური უპირატესობები</h2>
              <p className="text-xl text-slate-300">მოწინავე ტექნოლოგიები საუკეთესო შედეგისთვის</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {technicalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30 text-center"
                >
                  <div className="text-4xl text-blue-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="text-slate-300 text-sm">{item}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Packages - Enhanced */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">საფასური პაკეტები</h2>
              <p className="text-xl text-slate-300">აირჩიეთ თქვენი ბიზნესისთვის შესაფერისი პაკეტი</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative p-8 rounded-2xl border-2 ${getColorClass(pkg.color)} ${
                    pkg.popular ? 'border-opacity-100 scale-105' : 'border-opacity-30'
                  } hover:border-opacity-100 transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        პოპულარული
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-slate-400 mb-2">{pkg.description}</p>
                    <div className="text-4xl font-bold text-white mb-1">{pkg.price}</div>
                    <div className="text-slate-400 mb-3">{pkg.period}</div>
                    <div className={`text-sm ${getTextColorClass(pkg.color)} font-medium`}>
                      იდეალურია: {pkg.ideal}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <FaCheck className={`${getTextColorClass(pkg.color)} flex-shrink-0 mt-1`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/start-project"
                    className={`block text-center py-3 px-6 rounded-lg transition-colors font-medium ${
                      pkg.popular
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : `border-2 ${getColorClass(pkg.color).includes('blue') ? 'border-blue-400 text-blue-400 hover:bg-blue-400' :
                            getColorClass(pkg.color).includes('purple') ? 'border-purple-400 text-purple-400 hover:bg-purple-400' :
                            'border-green-400 text-green-400 hover:bg-green-400'} hover:text-white`
                    }`}
                  >
                    {pkg.popular ? 'შეუკვეთე ახლავე' : 'მეტი ინფორმაცია'}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="max-w-4xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">დაწყების პროცესი</h2>
              <p className="text-xl text-slate-300">4 მარტივი ნაბიჯი მზა ჩატბოტამდე</p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "უფასო კონსულტაცია",
                  desc: "თქვენი ბიზნესის ანალიზი, ჩატბოტის პოტენციალის შეფასება და საფასურის განსაზღვრა (30 წუთი)",
                  icon: <FaPhoneAlt />
                },
                {
                  title: "ლაივ დემონსტრაცია",
                  desc: "მუშა ჩატბოტის ჩვენება თქვენი ინდუსტრიიდან და ფუნქციონალის დეტალური წარმოდგენა",
                  icon: <FaPlayCircle />
                },
                {
                  title: "განვითარება",
                  desc: "ჩატბოტის შექმნა, AI ტრენინგი, ადმინ პანელის დამზადება და ტესტირება (7-14 დღე)",
                  icon: <FaCode />
                },
                {
                  title: "გაშვება და ტრენინგი",
                  desc: "პლატფორმებზე ინტეგრაცია, თქვენი გუნდისთვის ტრენინგი და გარანტირებული მხარდაჭერა",
                  icon: <FaRocket />
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center border-2 border-orange-400/30 flex-shrink-0">
                    <span className="text-orange-400 text-xl">{step.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-orange-400 font-bold text-lg">{index + 1}.</span>
                      <h3 className="text-xl font-medium text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">ხშირი კითხვები</h2>
              <p className="text-xl text-slate-300">პასუხები ყველაზე ხშირ კითხვებზე</p>
            </div>

            <div className="space-y-6">
              {faq.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30"
                >
                  <h4 className="text-lg font-medium text-white mb-3">❓ {item.question}</h4>
                  <p className="text-slate-300">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-2xl p-8 border border-orange-400/20"
              >
                <h3 className="text-3xl font-bold text-white mb-6">
                  მზად ხართ რომ გადააქციოთ თქვენი ბიზნესი?
                </h3>
                <p className="text-xl text-slate-300 mb-8">
                  ჩვენ არ ვქმნით უბრალო ჩატბოტებს - ჩვენ ვქმნით ციფრულ გაყიდვების მანქანებს თქვენი ბიზნესისთვის
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/start-project"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 text-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaRocket />
                    უფასო კონსულტაცია
                  </Link>
                  <a
                    href="tel:+995555123456"
                    className="inline-flex items-center gap-2 border-2 border-orange-400 text-orange-400 px-8 py-4 text-lg font-medium hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-lg"
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