import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import TrueFocus from "../components/TrueFocus";
import {
  FaArrowRight,
  FaCheckCircle,
  FaServer,
  FaFileInvoiceDollar,
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebookMessenger,
  FaRocket,
  FaStore,
  FaInstagram,
  FaPrint,
  FaBoxes,
  FaChartLine,
  FaFileExcel // [NEW] დავამატეთ ექსელის აიქონი
} from "react-icons/fa";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";

// --- Translations ---
const businessSolutionTranslations = {
  ka: {
    "seo.business.title": "ბიზნეს ავტომატიზაცია - VIFA | vifadigital.ge",
    "seo.business.description":
      "საწყობის, გაყიდვების და ბუღალტერიის მართვის სისტემები. ექსელის რეპორტები და ერთჯერადი გადახდა.",

    "business.hero.title": "BUSINESS AUTOMATION",
    "business.hero.subtitle": "მართე საწყობი, გაყიდვები და ბუღალტერია ერთი პლატფორმიდან. ყოველთვიური გადასახადების გარეშე.",
    
    // Stats
    "business.stats.cost": "0₾ ხარჯი",
    "business.stats.costDesc": "ყოველთვიური გადასახადის გარეშე",
    "business.stats.license": "Lifetime",
    "business.stats.licenseDesc": "უვადო სარგებლობა",
    "business.stats.native": "Native",
    "business.stats.nativeDesc": "100% ქართული ინტერფეისი",
    "business.stats.support": "Support",
    "business.stats.supportDesc": "მხარდაჭერა და ტრენინგი",

    // Steps (How it Works)
    "steps.title": "სულ 3 მარტივი ნაბიჯი",
    "steps.subtitle": "სისტემის დანერგვა უფრო მარტივია, ვიდრე გგონიათ",
    "step.1.title": "1. შეკვეთა",
    "step.1.desc": "იღებთ შეკვეთას სოციალურ ქსელში და შეგყავთ სისტემაში რამდენიმე წამში.",
    "step.2.title": "2. ბეჭდვა",
    "step.2.desc": "ერთი კლიკით ბეჭდავთ საკურიერო ლეიბლს და აკრავთ ამანათს.",
    "step.3.title": "3. რეპორტები",
    "step.3.desc": "სისტემა აგენერირებს ექსელს (Excel) დღიური გაყიდვებით და ნაშთებით.", // [UPDATED]

    // Solution Highlights
    "business.solution.labels": "Smart Labels",
    "business.solution.labelsDesc": "საკურიერო ლეიბლების ბეჭდვა 1 კლიკში",
    "business.solution.inventory": "Live Inventory",
    "business.solution.inventoryDesc": "ზუსტი ნაშთები და ვარიანტები",
    "business.solution.accounting": "Accounting & Excel", // [UPDATED]
    "business.solution.accountingDesc": "ფინანსური რეპორტები და ექსპორტი 1 კლიკით", // [UPDATED]

    // Pricing Titles
    "business.pricing.title": "სერვისის პაკეტები",
    "business.pricing.subtitle": "აირჩიეთ სისტემა თქვენი ბიზნესის საჭიროებების მიხედვით",
    "business.pricing.onetime": "ერთჯერადი გადახდა",

    // Package 1: Start Manager
    "pkg.start.title": "Start Manager",
    "pkg.start.price": "499₾",
    "pkg.start.bestFor": "საუკეთესოა: Facebook / Instagram / TikTok სელერებისთვის",
    "pkg.start.desc": "დაივიწყეთ რვეულები. მართეთ შეკვეთები და კლიენტები მარტივად.",
    "pkg.start.f1": "სისტემის ინსტალაცია და გამართვა",
    "pkg.start.f2": "საკურიერო ლეიბლების ბეჭდვა (1 კლიკში)",
    "pkg.start.f3": "მომხმარებელთა ბაზა (CRM)",
    "pkg.start.f4": "მექანიკური შეკვეთების გატარება",
    "pkg.start.f5": "გაყიდვების რეპორტი (Excel Export)", // [UPDATED]

    // Package 2: Smart Warehouse
    "pkg.warehouse.title": "Smart Warehouse",
    "pkg.warehouse.price": "999₾",
    "pkg.warehouse.bestFor": "საუკეთესოა: მაღაზიებისთვის და საწყობებისთვის",
    "pkg.warehouse.desc": "სრული კონტროლი მარაგებზე, ზომებსა და ფერებზე.",
    "pkg.warehouse.f1": "ყველაფერი Start Manager-დან",
    "pkg.warehouse.f2": "ვარიანტების კონტროლი (ფერი/ზომა)",
    "pkg.warehouse.f3": "მარაგების ისტორია (ვინ, რა, როდის გაყიდა)",
    "pkg.warehouse.f4": "სრული ბუღალტრული Excel რეპორტები", // [UPDATED]
    "pkg.warehouse.f5": "პერსონალის ტრენინგი",

    // Package 3: E-commerce
    "pkg.ecom.title": "Full E-commerce",
    "pkg.ecom.price": "1999₾-დან",
    "pkg.ecom.bestFor": "საუკეთესოა: ბრენდებისთვის, ვისაც ზრდა სურს",
    "pkg.ecom.desc": "თქვენი პირადი ონლაინ მაღაზია ავტომატური საწყობით.",
    "pkg.ecom.f1": "საკუთარი ვებსაიტი (.ge დომენზე)",
    "pkg.ecom.f2": "გადახდა ნებისმიერი ქართული ბარათით",
    "pkg.ecom.f3": "საწყობის და საიტის სინქრონიზაცია",
    "pkg.ecom.f4": "SEO ოპტიმიზაცია და Googleში გამოჩენა",
    "pkg.ecom.f5": "Facebook Pixel-ის გამართვა",

    // FAQ
    "faq.title": "ხშირად დასმული კითხვები",
    "faq.1.q": "მჭირდება თუ არა სერვერის გადასახადის გადახდა?",
    "faq.1.a": "არა. მცირე და საშუალო ბიზნესისთვის ჩვენ ვიყენებთ Google-ის უფასო ლიმიტებს. თქვენ იხდით მხოლოდ სისტემის აწყობაში.",
    "faq.2.q": "რამდენად რთულია სისტემის სწავლა?",
    "faq.2.a": "სისტემა შექმნილია მაქსიმალური სიმარტივისთვის. 15-წუთიანი ტრენინგი საკმარისია ნებისმიერი თანამშრომლისთვის.",
    "faq.3.q": "შემიძლია თუ არა მოგვიანებით ფუნქციების დამატება?",
    "faq.3.a": "რა თქმა უნდა. ნებისმიერ დროს შეგვიძლია დავამატოთ ვებსაიტი ან გავზარდოთ ფუნქციონალი.",

    // Why Us
    "business.why.title": "რატომ ერთჯერადი გადახდა?",
    "business.why.econ": "ეკონომია",
    "business.why.econDesc": "არ იხდით ყოველთვიურ სააბონენტოს უცხოურ პლატფორმებში.",
    "business.why.own": "საკუთრება",
    "business.why.ownDesc": "სისტემა სრულად თქვენია, მონაცემები ინახება თქვენს სივრცეში.",
    "business.why.simple": "სიმარტივე",
    "business.why.simpleDesc": "სისტემა მორგებულია ქართულ რეალობას.",

    "business.cta.title": "გსურთ დაწყება?",
    "business.cta.subtitle": "დაგვიკავშირდით დეტალების უკეთ გასაცნობისათვის (კონსულტაცია უფასოა)",
    "btn.call": "დაგვირეკეთ",
    "btn.whatsapp": "WhatsApp",
    "btn.messenger": "Messenger",
  },
  en: {
    "seo.business.title": "Business Automation - VIFA | vifadigital.com",
    "seo.business.description":
      "Warehouse, sales, and accounting management systems. Excel reports included. One-time payment.",

    "business.hero.title": "BUSINESS AUTOMATION",
    "business.hero.subtitle": "Manage warehouse, sales, and accounting from one platform. No monthly fees.",

    // Stats
    "business.stats.cost": "0₾ Cost",
    "business.stats.costDesc": "No Monthly Fees",
    "business.stats.license": "Lifetime",
    "business.stats.licenseDesc": "Lifetime Usage",
    "business.stats.native": "Native",
    "business.stats.nativeDesc": "100% Georgian Interface",
    "business.stats.support": "Support",
    "business.stats.supportDesc": "Support & Training",

    // Steps
    "steps.title": "3 Simple Steps",
    "steps.subtitle": "Implementation is easier than you think",
    "step.1.title": "1. Order",
    "step.1.desc": "Receive order on social media and enter it in 10 seconds.",
    "step.2.title": "2. Print",
    "step.2.desc": "Print courier label in 1 click and attach to package.",
    "step.3.title": "3. Analytics",
    "step.3.desc": "System automatically generates Excel reports with sales and stock.",

    // Solution Highlights
    "business.solution.labels": "Smart Labels",
    "business.solution.labelsDesc": "Print courier labels in 1 click",
    "business.solution.inventory": "Live Inventory",
    "business.solution.inventoryDesc": "Exact stock & variants",
    "business.solution.accounting": "Accounting & Excel",
    "business.solution.accountingDesc": "Financial reports & Excel export",

    // Pricing Titles
    "business.pricing.title": "Service Packages",
    "business.pricing.subtitle": "Choose the system based on your business needs",
    "business.pricing.onetime": "One-Time Payment",

    // Package 1
    "pkg.start.title": "Start Manager",
    "pkg.start.price": "499₾",
    "pkg.start.bestFor": "Best for: Instagram / TikTok Sellers",
    "pkg.start.desc": "Forget notebooks. Manage orders and clients easily.",
    "pkg.start.f1": "System installation & setup",
    "pkg.start.f2": "Courier label printing (1 click)",
    "pkg.start.f3": "Customer database (CRM)",
    "pkg.start.f4": "Manual order entry",
    "pkg.start.f5": "Sales Report (Excel Export)",

    // Package 2
    "pkg.warehouse.title": "Smart Warehouse",
    "pkg.warehouse.price": "999₾",
    "pkg.warehouse.bestFor": "Best for: Stores & Warehouses",
    "pkg.warehouse.desc": "Full control over stock, sizes, and colors.",
    "pkg.warehouse.f1": "Everything in Start Manager",
    "pkg.warehouse.f2": "Variant control (Color/Size)",
    "pkg.warehouse.f3": "Stock history (Who sold what & when)",
    "pkg.warehouse.f4": "Full Accounting Excel Reports",
    "pkg.warehouse.f5": "Staff training",

    // Package 3
    "pkg.ecom.title": "Full E-commerce",
    "pkg.ecom.price": "From 1999₾",
    "pkg.ecom.bestFor": "Best for: Scaling Brands",
    "pkg.ecom.desc": "Your own online store with automated warehouse.",
    "pkg.ecom.f1": "Custom website (.ge domain)",
    "pkg.ecom.f2": "Payments with any Georgian card",
    "pkg.ecom.f3": "Warehouse & Site synchronization",
    "pkg.ecom.f4": "SEO Optimization & Google Ranking",
    "pkg.ecom.f5": "Facebook Pixel setup",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.1.q": "Do I need to pay monthly server fees?",
    "faq.1.a": "No. We use Google's free tiers for small businesses. You only pay for the setup.",
    "faq.2.q": "Is it hard to learn?",
    "faq.2.a": "The system is designed for simplicity. A 15-minute training is enough.",
    "faq.3.q": "Can I upgrade later?",
    "faq.3.a": "Yes. We can add a website or upgrade functionality at any time.",

    // Why Us
    "business.why.title": "Why One-Time Payment?",
    "business.why.econ": "Economy",
    "business.why.econDesc": "Save thousands yearly on subscriptions.",
    "business.why.own": "Ownership",
    "business.why.ownDesc": "The system is yours. Data is on your cloud.",
    "business.why.simple": "Simplicity",
    "business.why.simpleDesc": "Tailored for the local market.",

    "business.cta.title": "Ready to Start?",
    "business.cta.subtitle": "Contact us for a free demo",
    "btn.call": "Call Us",
    "btn.whatsapp": "WhatsApp",
    "btn.messenger": "Messenger",
  },
};

const BusinessSolutions: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  const t = (key: string): string => {
    const translations = businessSolutionTranslations[
      currentLanguage as keyof typeof businessSolutionTranslations
    ] as Record<string, string>;
    return translations[key] || key;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "start-manager",
      icon: <FaInstagram />,
      title: t("pkg.start.title"),
      price: t("pkg.start.price"),
      desc: t("pkg.start.desc"),
      color: "blue",
      features: [
        t("pkg.start.f1"),
        t("pkg.start.f2"),
        t("pkg.start.f3"),
        t("pkg.start.f4"),
        t("pkg.start.f5"),
      ],
    },
    {
      id: "smart-warehouse",
      icon: <FaStore />,
      title: t("pkg.warehouse.title"),
      price: t("pkg.warehouse.price"),
      desc: t("pkg.warehouse.desc"),
      color: "purple",
      features: [
        t("pkg.warehouse.f1"),
        t("pkg.warehouse.f2"),
        t("pkg.warehouse.f3"),
        t("pkg.warehouse.f4"),
        t("pkg.warehouse.f5"),
      ],
    },
    {
      id: "full-ecommerce",
      icon: <FaRocket />,
      title: t("pkg.ecom.title"),
      price: t("pkg.ecom.price"),
      desc: t("pkg.ecom.desc"),
      color: "orange",
      features: [
        t("pkg.ecom.f1"),
        t("pkg.ecom.f2"),
        t("pkg.ecom.f3"),
        t("pkg.ecom.f4"),
        t("pkg.ecom.f5"),
      ],
    },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10 text-blue-400",
      purple: "border-purple-400 bg-purple-500/10 text-purple-400",
      orange: "border-orange-400 bg-orange-500/10 text-orange-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title={t("seo.business.title")}
        description={t("seo.business.description")}
        url="https://vifadigital.ge/business-solutions"
      />

      {/* --- Background (Same as WebDev) --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>
        <div className="absolute inset-0 tech-grid opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/15 via-transparent to-purple-950/15 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-950/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-950/20 to-transparent"></div>
        <div className="absolute inset-0 bg-noise opacity-2"></div>
      </div>

      <style>{`
        .tech-grid {
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          animation: grid-move 20s linear infinite;
        }
        @keyframes grid-move {
          0% { background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
          100% { background-position: 100px 100px, 100px 100px, 20px 20px, 20px 20px; }
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 min-h-screen mt-50">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 language-transition language-fade-in ${getTransitionClasses()}`}
        >
          {/* --- Hero Section --- */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-16">
              <div className="mb-8 flex justify-center">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                  <TrueFocus
                    sentence="BUSINESS AUTOMATION"
                    blurAmount={4}
                    borderColor="#8b5cf6"
                    glowColor="rgba(139, 92, 246, 0.6)"
                    animationDuration={0.8}
                    pauseBetweenAnimations={2}
                  />
                </div>
              </div>

              <motion.p
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                {t("business.hero.subtitle")}
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 mt-14"
              >
                {[
                    { label: t("business.stats.cost"), desc: t("business.stats.costDesc"), color: "text-blue-400" },
                    { label: t("business.stats.license"), desc: t("business.stats.licenseDesc"), color: "text-green-400" },
                    { label: t("business.stats.native"), desc: t("business.stats.nativeDesc"), color: "text-purple-400" },
                    { label: t("business.stats.support"), desc: t("business.stats.supportDesc"), color: "text-orange-400" },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                            {stat.label}
                        </div>
                        <div className="text-sm text-slate-400">
                            {stat.desc}
                        </div>
                    </div>
                ))}
              </motion.div>
            </div>

             {/* --- How It Works (Steps) --- */}
             <div className="mb-32">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-light text-white mb-4">{t("steps.title")}</h3>
                <p className="text-slate-400">{t("steps.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-2xl font-bold mb-6 border border-blue-500/40">
                      1
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{t("step.1.title")}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{t("step.1.desc")}</p>
                  </div>
                  {/* Arrow for Desktop */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-600 text-2xl z-10">→</div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 rounded-2xl border border-purple-500/30 bg-slate-900/50 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-2xl font-bold mb-6 border border-purple-500/40">
                      2
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{t("step.2.title")}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{t("step.2.desc")}</p>
                  </div>
                  {/* Arrow for Desktop */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-600 text-2xl z-10">→</div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 rounded-2xl border border-green-500/30 bg-slate-900/50 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-2xl font-bold mb-6 border border-green-500/40">
                      3
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{t("step.3.title")}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{t("step.3.desc")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Solution Highlights (Process Flow) --- */}
            <div className="relative mb-32">
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {[
                    { icon: <FaPrint />, title: t("business.solution.labels"), desc: t("business.solution.labelsDesc"), color: "blue" },
                    { icon: <FaBoxes />, title: t("business.solution.inventory"), desc: t("business.solution.inventoryDesc"), color: "purple" },
                    { icon: <FaFileExcel />, title: t("business.solution.accounting"), desc: t("business.solution.accountingDesc"), color: "green" }, // Updated Icon
                ].map((item, i) => (
                    <React.Fragment key={i}>
                        <div className="group cursor-pointer">
                            <div className={`w-40 h-40 border-2 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:scale-110 
                                ${item.color === 'blue' ? 'border-blue-400/30 bg-blue-500/5 group-hover:border-blue-400' : 
                                  item.color === 'purple' ? 'border-purple-400/30 bg-purple-500/5 group-hover:border-purple-400' :
                                  'border-green-400/30 bg-green-500/5 group-hover:border-green-400'}`}>
                                <div className={`text-4xl mb-3 
                                    ${item.color === 'blue' ? 'text-blue-400' : 
                                      item.color === 'purple' ? 'text-purple-400' :
                                      'text-green-400'}`}>
                                    {item.icon}
                                </div>
                                <div className={`text-sm font-bold mb-1
                                    ${item.color === 'blue' ? 'text-blue-400' : 
                                      item.color === 'purple' ? 'text-purple-400' :
                                      'text-green-400'}`}>
                                    {item.title}
                                </div>
                                <div className="text-[10px] text-slate-400 text-center leading-tight">
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* --- Pricing Packages (One-Time Payment) --- */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                  {t("business.pricing.onetime")}
              </span>
              <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">
                {t("business.pricing.title")}
              </h3>
              <p className="text-slate-400">{t("business.pricing.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 !max-w-7xl mx-auto">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-slate-700/50 bg-slate-900/40"
                    >
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500
                            ${pkg.color === 'blue' ? 'from-blue-500 to-cyan-500' : 
                              pkg.color === 'purple' ? 'from-purple-500 to-pink-500' : 
                              'from-orange-500 to-amber-500'}`} />
                         
                         {/* Best For Badge */}
                         <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{ color: pkg.color === 'blue' ? '#60A5FA' : pkg.color === 'purple' ? '#C084FC' : '#FB923C' }} />
                        
                        <div className="relative p-8 flex flex-col h-full">
                            {/* Target Audience Label */}
                            <div className="mb-4 inline-flex">
                                <span className={`text-xs font-bold uppercase tracking-wider py-1 px-2 rounded ${
                                    pkg.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 
                                    pkg.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 
                                    'bg-orange-500/10 text-orange-400'
                                }`}>
                                    {pkg.id === "start-manager" ? t("pkg.start.bestFor") : 
                                     pkg.id === "smart-warehouse" ? t("pkg.warehouse.bestFor") : 
                                     t("pkg.ecom.bestFor")}
                                </span>
                            </div>

                             {/* Icon & Title */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${getColorClass(pkg.color)}`}>
                                    {pkg.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">{pkg.title}</h4>
                                    <div className={`text-sm font-medium opacity-80 ${
                                         pkg.color === 'blue' ? 'text-blue-400' : 
                                         pkg.color === 'purple' ? 'text-purple-400' : 
                                         'text-orange-400'
                                    }`}>
                                        {t("business.pricing.onetime")}
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-black text-white">{pkg.price}</span>
                            </div>

                            <p className="text-slate-400 text-sm mb-8 leading-relaxed border-b border-slate-700/50 pb-6">
                                {pkg.desc}
                            </p>

                            {/* Features */}
                            <ul className="space-y-4 mb-8 flex-grow">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                        <FaCheckCircle className={`mt-0.5 shrink-0 ${
                                            pkg.color === 'blue' ? 'text-blue-500' : 
                                            pkg.color === 'purple' ? 'text-purple-500' : 
                                            'text-orange-500'
                                        }`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* --- FAQ Section --- */}
          <div className="mb-32 max-w-4xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">{t("faq.title")}</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-colors">
                            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-3">
                                <span className="text-blue-400">Q:</span> {t(`faq.${num}.q`)}
                            </h4>
                            <p className="text-slate-400 text-sm pl-7 leading-relaxed">
                                {t(`faq.${num}.a`)}
                            </p>
                        </div>
                    ))}
                </div>
           </div>

          {/* --- Why Choose Us (Info) --- */}
          <div className="mb-32 !max-w-5xl mx-auto">
             <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/30 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{t("business.why.title")}</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: t("business.why.econ"), desc: t("business.why.econDesc"), icon: <FaFileInvoiceDollar /> },
                        { title: t("business.why.own"), desc: t("business.why.ownDesc"), icon: <FaServer /> },
                        { title: t("business.why.simple"), desc: t("business.why.simpleDesc"), icon: <FaCheckCircle /> },
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <div className="w-12 h-12 mx-auto bg-slate-800 rounded-full flex items-center justify-center text-blue-400 text-xl mb-4">
                                {item.icon}
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* --- CTA / Contact --- */}
          <div className="text-center mb-32">
            <h3 className="text-3xl font-light text-white mb-4">
               {t("business.cta.title")}
            </h3>
            <p className="text-slate-400 mb-10">{t("business.cta.subtitle")}</p>

            <div className="flex flex-wrap justify-center gap-6">
                 {/* Call Button */}
                 <a href="tel:+995555123456" className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700 hover:border-slate-500">
                    <FaPhoneAlt className="text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{t("btn.call")}</span>
                 </a>

                 {/* WhatsApp Button */}
                 <a href="https://wa.me/995555123456" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-white transition-all border border-[#25D366]/30 hover:border-[#25D366]">
                    <FaWhatsapp className="text-[#25D366] text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{t("btn.whatsapp")}</span>
                 </a>

                 {/* Messenger Button */}
                 <a href="https://m.me/vifadigital" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0084FF]/10 hover:bg-[#0084FF]/20 text-white transition-all border border-[#0084FF]/30 hover:border-[#0084FF]">
                    <FaFacebookMessenger className="text-[#0084FF] text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{t("btn.messenger")}</span>
                 </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
///
export default BusinessSolutions;