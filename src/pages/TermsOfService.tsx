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

// Terms of Service Translations for Invento Technologies
const termsTranslations = {
  ka: {
    "terms.title": "მომსახურების პირობები",
    "terms.description": "Invento Technologies-ის სერვისების გამოყენების წესები და პირობები",
    "terms.lastUpdated": "ბოლო განახლება",

    "terms.services.title": "ჩვენი სერვისები",
    "terms.services.content":
      "Invento Technologies გთავაზობთ შემდეგ მომსახურებას:\n\n• ვებგვერდების შექმნა და ტექნიკური მხარდაჭერა\n• პერსონალიზებული ციფრული სისტემების შემუშავება\n• ვებ-აპლიკაციების განვითარება\n• UI/UX დიზაინის წარმოება\n• ციფრული კონსულტაცია და სტრატეგია\n\nყველა სერვისს გთავაზობთ მაღალი ტექნოლოგიური სტანდარტებით, წინასწარ შეთანხმებული ვადებისა და ბიუჯეტის ფარგლებში.",

    "terms.userResponsibilities.title": "კლიენტის ვალდებულებები",
    "terms.userResponsibilities.content":
      "ჩვენი სერვისების გამოყენებისას თქვენ ვალდებული ხართ:\n\n• მოგვაწოდოთ ზუსტი ბიზნეს-ინფორმაცია პროექტისთვის\n• დროულად განახორციელოთ ხელშეკრულებით გათვალისწინებული გადახდები\n• აქტიურად ითანამშრომლოთ ჩვენს დეველოპერულ გუნდთან\n• არ გამოიყენოთ ჩვენი ტექნოლოგიები არაკანონიერი მიზნებისთვის\n• დაიცვათ ინტელექტუალური საკუთრების შეთანხმებული პირობები\n\nაღნიშნული პირობების დარღვევის შემთხვევაში, კომპანია იტოვებს უფლებას შეაჩეროს მომსახურება.",

    "terms.limitations.title": "პასუხისმგებლობის შეზღუდვა",
    "terms.limitations.content":
      "Invento Technologies-ის პასუხისმგებლობა შემოიფარგლება შემდეგით:\n\n• ჩვენი პასუხისმგებლობა არ აღემატება კონკრეტული პროექტის ჯამურ ღირებულებას\n• არ ვართ პასუხისმგებლები მესამე მხარის სერვისების (მაგ: ჰოსტინგი, API) დროებით შეფერხებებზე\n• ციფრული პროდუქტის ეფექტურობა დამოკიდებულია კლიენტის მიერ მოწოდებული ინფორმაციის სისწორეზე\n\nყველა ტექნიკური გარანტია განისაზღვრება ინდივიდუალური ხელშეკრულების საფუძველზე.",

    "terms.termination.title": "ხელშეკრულების შეწყვეტა",
    "terms.termination.content":
      "თანამშრომლობის შეწყვეტა შესაძლებელია:\n\n• მხარეთა ორმხრივი წერილობითი შეთანხმებით\n• პირობების ან გადახდის ვალდებულებების უხეში დარღვევის შემთხვევაში\n• ფორსმაჟორული გარემოებების დადგომისას\n\nმომსახურების შეწყვეტის შემდეგ:\n\n• ყველა მიმდინარე ტექნიკური სამუშაო წყდება\n• ხდება შესრულებული ეტაპების საბოლოო ანაზღაურება\n• კონფიდენციალურობის პირობები რჩება უვადო ძალაში",
  },
  en: {
    "terms.title": "Terms of Service",
    "terms.description": "Rules and conditions for using Invento Technologies services",
    "terms.lastUpdated": "Last updated",

    "terms.services.title": "Our Services",
    "terms.services.content":
      "Invento Technologies offers the following services:\n\n• Website creation and technical support\n• Development of personalized digital systems\n• Web application development\n• UI/UX design production\n• Digital consulting and strategy\n\nAll services are provided according to high technological standards, within agreed timelines and budgets.",

    "terms.userResponsibilities.title": "Client Responsibilities",
    "terms.userResponsibilities.content":
      "When using our services, you are obligated to:\n\n• Provide accurate business information for the project\n• Make timely payments as specified in the contract\n• Actively cooperate with our development team\n• Not use our technologies for illegal purposes\n• Respect the agreed intellectual property terms\n\nIn case of violation, the company reserves the right to suspend services.",

    "terms.limitations.title": "Limitation of Liability",
    "terms.limitations.content":
      "Invento Technologies' liability is limited to:\n\n• Our liability does not exceed the total value of the specific project\n• We are not responsible for temporary failures of third-party services (e.g., hosting, API)\n• The effectiveness of the digital product depends on the accuracy of client-provided information\n\nAll technical warranties are defined based on individual contracts.",

    "terms.termination.title": "Contract Termination",
    "terms.termination.content":
      "Collaboration can be terminated:\n\n• By mutual written agreement of the parties\n• In case of gross breach of terms or payment obligations\n• Upon occurrence of force majeure circumstances\n\nAfter termination of service:\n\n• All ongoing technical work ceases\n• Final compensation for completed stages is processed\n• Confidentiality terms remain in effect indefinitely",
  },
};

const TermsOfService: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = termsTranslations[currentLanguage as keyof typeof termsTranslations] as Record<string, string>;
    return translations[key] || key;
  };
  const { getTransitionClasses } = useLanguageTransition();

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