import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from '../contexts/LanguageContext';
import { useLanguageTransition } from '../hooks/useLanguageTransition';
import { FaShieldAlt, FaLock, FaEye, FaUserShield } from "react-icons/fa";

// Privacy Policy Translations
const privacyTranslations = {
  ka: {
    "privacy.title": "კონფიდენციალურობის პოლიტიკა",
    "privacy.description": "თქვენი პერსონალური მონაცემების დაცვა ჩვენთვის უმნიშვნელოვანესია",
    "privacy.lastUpdated": "ბოლო განახლება",

    "privacy.dataCollection.title": "მონაცემების შეგროვება",
    "privacy.dataCollection.content":
      "ჩვენ ვაგროვებთ თქვენს მიერ ნებაყოფლობით მოწოდებულ ინფორმაციას, როდესაც:\n\n• სარგებლობთ ჩვენი ვებგვერდით\n• მიმართავთ ჩვენს კომპანიას\n• იყენებთ ჩვენს მომსახურებას\n• გამოიწერთ ჩვენს სიახლეებსა თუ განახლებებს\n\nჩვენ მიერ შეგროვებული ინფორმაცია მოიცავს:\n\n• სახელსა და გვარს\n• ელექტრონული ფოსტის მისამართს\n• ტელეფონის ნომერს\n• ბიზნესთან დაკავშირებულ ინფორმაციას",

    "privacy.dataUsage.title": "მონაცემების გამოყენება",
    "privacy.dataUsage.content":
      "თქვენი პერსონალური მონაცემები გამოიყენება შემდეგი მიზნებისთვის:\n\n• თქვენთვის მომსახურების გაწევა\n• თქვენთან კომუნიკაცია და კონსულტაციების ჩატარება\n• ჩვენი სერვისების გაუმჯობესება\n• კანონმდებლობით გათვალისწინებული ვალდებულებების შესრულება\n\nჩვენ არასდროს გადავცემთ ან ვყიდით თქვენს პერსონალურ მონაცემებს მესამე მხარეებზე კომერციული მიზნებისთვის.",

    "privacy.dataSecurity.title": "მონაცემების უსაფრთხოება",
    "privacy.dataSecurity.content":
      "ჩვენ ვიყენებთ ინდუსტრიის სტანდარტებთან შესაბამის უსაფრთხოების ზომებს, მათ შორის:\n\n• SSL შიფრაციას მონაცემთა გადაცემის უზრუნველსაყოფად\n• უსაფრთხო სერვერებსა და დაცულ მონაცემთა ბაზებს\n• მონაცემებზე წვდომის შეზღუდვას, რომელიც ხელმისაწვდომია მხოლოდ ავტორიზებული პერსონალისთვის\n• უსაფრთხოების რეგულარულ აუდიტს\n• დაცულ სარეზერვო ასლებს (ბექაპებს)\n\nმიუხედავად ჩვენი ძალისხმევისა, გთხოვთ, გაითვალისწინოთ, რომ ინტერნეტის საშუალებით მონაცემთა გადაცემა 100%-ით დაცული ვერ იქნება.",

    "privacy.userRights.title": "თქვენი უფლებები",
    "privacy.userRights.content":
      "თქვენ გაქვთ შემდეგი უფლებები:\n\n• მოითხოვოთ თქვენს შესახებ არსებული ინფორმაციის გაცნობა\n• მოითხოვოთ თქვენი მონაცემების გასწორება ან განახლება\n• მოითხოვოთ თქვენი მონაცემების წაშლა\n• შეაჩეროთ თქვენი მონაცემების დამუშავება\n• მოითხოვოთ თქვენი მონაცემების გადატანა (მონაცემთა პორტაბელურობა)\n\nამ უფლებების რეალიზაციისთვის დაგვიკავშირდით ქვემოთ მოცემული საკონტაქტო ინფორმაციით.",
  },
  en: {
    "privacy.title": "Privacy Policy",
    "privacy.description": "Protecting your personal data is of utmost importance to us",
    "privacy.lastUpdated": "Last updated",

    "privacy.dataCollection.title": "Data Collection",
    "privacy.dataCollection.content":
      "We collect information that you voluntarily provide to us when:\n\n• You use our website\n• You contact our company\n• You use our services\n• You subscribe to our newsletters or updates\n\nThe information we collect includes:\n\n• First and last name\n• Email address\n• Phone number\n• Business-related information",

    "privacy.dataUsage.title": "Data Usage",
    "privacy.dataUsage.content":
      "Your personal data is used for the following purposes:\n\n• To provide you with our services\n• To communicate with you and conduct consultations\n• To improve our services\n• To comply with legal obligations\n\nWe never share or sell your personal data to third parties for commercial purposes.",

    "privacy.dataSecurity.title": "Data Security",
    "privacy.dataSecurity.content":
      "We use industry-standard security measures, including:\n\n• SSL encryption for data transmission\n• Secure servers and protected databases\n• Restricted access to data, available only to authorized personnel\n• Regular security audits\n• Protected backup copies\n\nDespite our efforts, please note that data transmission via the internet cannot be 100% secure.",

    "privacy.userRights.title": "Your Rights",
    "privacy.userRights.content":
      "You have the following rights:\n\n• Request access to information we have about you\n• Request correction or update of your data\n• Request deletion of your data\n• Halt processing of your data\n• Request data portability\n\nTo exercise these rights, please contact us using the contact information below.",
  },
};

const PrivacyPolicy: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = privacyTranslations[currentLanguage as keyof typeof privacyTranslations] as Record<string, string>;
    return translations[key] || key;
  };
  const { getTransitionClasses } = useLanguageTransition();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: t('privacy.dataCollection.title'),
      icon: <FaEye className="w-6 h-6" />,
      content: t('privacy.dataCollection.content')
    },
    {
      title: t('privacy.dataUsage.title'),
      icon: <FaLock className="w-6 h-6" />,
      content: t('privacy.dataUsage.content')
    },
    {
      title: t('privacy.dataSecurity.title'),
      icon: <FaShieldAlt className="w-6 h-6" />,
      content: t('privacy.dataSecurity.content')
    },
    {
      title: t('privacy.userRights.title'),
      icon: <FaUserShield className="w-6 h-6" />,
      content: t('privacy.userRights.content')
    }
  ];

  return (
    <div className={`mt-20 min-h-screen transition-colors duration-500 bg-black ${getTransitionClasses()}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <FaShieldAlt className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('privacy.title')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t('privacy.description')}
          </p>
          <div className="mt-4 text-sm text-slate-500">
            {t('privacy.lastUpdated')}: {new Date().toLocaleDateString('ka-GE')}
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-xl flex items-center justify-center text-blue-400 mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
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

export default PrivacyPolicy;