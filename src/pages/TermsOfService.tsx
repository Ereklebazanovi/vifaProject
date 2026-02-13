import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaFileContract,
  FaBalanceScale,
  FaExclamationTriangle,
  FaHandshake,
} from "react-icons/fa";

// Terms of Service Translations
const termsTranslations = {
  ka: {
    "terms.title": "მომსახურების პირობები",
    "terms.description": "ჩვენი სერვისების გამოყენების წესები და პირობები",
    "terms.lastUpdated": "ბოლო განახლება",

    "terms.services.title": "ჩვენი სერვისები",
    "terms.services.content":
      "Vifa Digital გთავაზობთ შემდეგ მომსახურებას:\n\n• ვებგვერდების შექმნა და განვითარება\n• ციფრული მარკეტინგის მომსახურება\n• სოციალური მედიის მართვა\n• კონტენტის შექმნა და წარმოება\n• SEO (საძიებო სისტემის) ოპტიმიზაცია\n• ბრენდინგის მომსახურება\n\nყველა სერვისს გთავაზობთ პროფესიონალური სტანდარტებით, შეთანხმებული ვადების და ბიუჯეტის ფარგლებში.",

    "terms.userResponsibilities.title": "კლიენტის ვალდებულებები",
    "terms.userResponsibilities.content":
      "ჩვენი სერვისების გამოყენებისას თქვენ ვალდებული ხართ:\n\n• მოგვაწოდოთ ზუსტი და სრულყოფილი ინფორმაცია\n• დროულად განახორციელოთ შეთანხმებული გადახდები\n• ითანამშრომლოთ ჩვენს გუნდთან\n• არ გამოიყენოთ ჩვენი სერვისები არაკანონიერი მიზნებისთვის\n• არ დაარღვიოთ ინტელექტუალური საკუთრების უფლებები\n• წინასწარ შეგვატყობინოთ ნებისმიერი ცვლილების შესახებ\n\nაღნიშნული პირობების დარღვევის შემთხვევაში, შესაძლებელია ხელშეკრულების შეწყვეტა.",

    "terms.limitations.title": "პასუხისმგებლობის შეზღუდვა",
    "terms.limitations.content":
      "Vifa Digital-ის პასუხისმგებლობა შემოიფარგლება შემდეგით:\n\n• ჩვენი პასუხისმგებლობა არ აღემატება პროექტის ღირებულებას\n• არ ვართ პასუხისმგებლები არაპირდაპირი ზარალისთვის\n• ვერ მოგცემთ ზუსტ გარანტიას კონკრეტული ბიზნესის შედეგების მიღწევაში\n• არ ვართ პასუხისმგებლები მესამე მხარის პლატფორმების ფუნქციონირებაზე\n\nყველა გარანტია შემოიფარგლება ხელშეკრულების პირობებით.",

    "terms.termination.title": "ხელშეკრულების შეწყვეტა",
    "terms.termination.content":
      "ხელშეკრულების შეწყვეტა შესაძლებელია:\n\n• ორმხრივი შეთანხმებით\n• ერთ-ერთი მხარის მიერ 30-დღიან ვადაში წინასწარი შეტყობინებით\n• პირობების დარღვევის შემთხვევაში\n• გადახდის ვალდებულებების დარღვევისას\n\nხელშეკრულების შეწყვეტის შემდეგ:\n\n• ყველა სამუშაო წყდება\n• შესრულებული სამუშაოს ანაზღაურება ხდება\n• კონფიდენციალურობის ვალდებულებები ძალაში რჩება",
  },
  en: {
    "terms.title": "Terms of Service",
    "terms.description": "Rules and conditions for using our services",
    "terms.lastUpdated": "Last updated",

    "terms.services.title": "Our Services",
    "terms.services.content":
      "Vifa Digital offers the following services:\n\n• Website creation and development\n• Digital marketing services\n• Social media management\n• Content creation and production\n• SEO (Search Engine Optimization)\n• Branding services\n\nAll services are provided according to professional standards, within agreed timelines and budgets.",

    "terms.userResponsibilities.title": "Client Responsibilities",
    "terms.userResponsibilities.content":
      "When using our services, you are obligated to:\n\n• Provide accurate and complete information\n• Make timely agreed payments\n• Cooperate with our team\n• Not use our services for illegal purposes\n• Not infringe intellectual property rights\n• Notify us in advance of any changes\n\nIn case of violation of these terms, the contract may be terminated.",

    "terms.limitations.title": "Limitation of Liability",
    "terms.limitations.content":
      "Vifa Digital's liability is limited to:\n\n• Our liability does not exceed the project value\n• We are not responsible for indirect damages\n• We cannot provide exact guarantees for achieving specific business results\n• We are not responsible for third-party platform functionality\n\nAll warranties are limited to the terms of the contract.",

    "terms.termination.title": "Contract Termination",
    "terms.termination.content":
      "Contract termination is possible:\n\n• By mutual agreement\n• By either party with 30-day advance notice\n• In case of breach of conditions\n• In case of failure to meet payment obligations\n\nAfter contract termination:\n\n• All work ceases\n• Completed work is compensated\n• Confidentiality obligations remain in effect",
  },
};

const TermsOfService: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = termsTranslations[currentLanguage as keyof typeof termsTranslations] as Record<string, string>;
    return translations[key] || key;
  };
  const { getTransitionClasses } = useLanguageTransition();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: t("terms.services.title"),
      icon: <FaHandshake className="w-6 h-6" />,
      content: t("terms.services.content"),
    },
    {
      title: t("terms.userResponsibilities.title"),
      icon: <FaBalanceScale className="w-6 h-6" />,
      content: t("terms.userResponsibilities.content"),
    },
    {
      title: t("terms.limitations.title"),
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      content: t("terms.limitations.content"),
    },
    {
      title: t("terms.termination.title"),
      icon: <FaFileContract className="w-6 h-6" />,
      content: t("terms.termination.content"),
    },
  ];

  return (
    <div
      className={`mt-20 min-h-screen transition-colors duration-500 bg-black ${getTransitionClasses()}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <FaFileContract className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("terms.title")}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t("terms.description")}
          </p>
          <div className="mt-4 text-sm text-slate-500">
            {t("terms.lastUpdated")}: {new Date().toLocaleDateString("ka-GE")}
          </div>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/20 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl flex items-center justify-center text-purple-400 mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
