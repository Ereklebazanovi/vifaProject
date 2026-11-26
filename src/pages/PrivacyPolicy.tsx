import { EditorialPage } from "../components/ui/EditorialPage";
import React, { useEffect } from "react";
import { useLanguage } from '../contexts/LanguageContext';
import { useLanguageTransition } from '../hooks/useLanguageTransition';
import { FaShieldAlt, FaLock, FaEye, FaUserShield, FaRobot } from "react-icons/fa";
import SEO from "../components/SEO";

// Privacy Policy Translations for VIFA Digital
const privacyTranslations = {
  ka: {
    "privacy.title": "კონფიდენციალურობის პოლიტიკა",
    "privacy.description": "VIFA Digital-ისთვის თქვენი პერსონალური მონაცემების დაცვა უმნიშვნელოვანესია",
    "privacy.lastUpdated": "ბოლო განახლება",

    "privacy.dataCollection.title": "მონაცემების შეგროვება",
    "privacy.dataCollection.content":
      "VIFA Digital აგროვებს თქვენ მიერ ნებაყოფლობით მოწოდებულ ინფორმაციას, როდესაც:\n\n• სარგებლობთ ჩვენი ვებგვერდით\n• მიმართავთ ჩვენს გუნდს\n• იყენებთ ჩვენს ციფრულ მომსახურებას\n• გამოიწერთ ჩვენს სიახლეებსა თუ განახლებებს\n\nჩვენ მიერ შეგროვებული ინფორმაცია მოიცავს:\n\n• სახელსა და გვარს\n• ელექტრონული ფოსტის მისამართს\n• ტელეფონის ნომერს\n• ბიზნესთან დაკავშირებულ ინფორმაციას",

    "privacy.dataUsage.title": "მონაცემების გამოყენება",
    "privacy.dataUsage.content":
      "თქვენი პერსონალური მონაცემები გამოიყენება შემდეგი მიზნებისთვის:\n\n• თქვენთვის ციფრული მომსახურების გაწევა\n• თქვენთან კომუნიკაცია და კონსულტაციების ჩატარება\n• ჩვენი სერვისების გაუმჯობესება\n• კანონმდებლობით გათვალისწინებული ვალდებულებების შესრულება\n\nVIFA Digital არასდროს გადასცემს ან ყიდის თქვენს პერსონალურ მონაცემებს მესამე მხარეებზე კომერციული მიზნებისთვის.",

    "privacy.dataSecurity.title": "მონაცემების უსაფრთხოება",
    "privacy.dataSecurity.content":
      "ჩვენ ვიყენებთ თანამედროვე უსაფრთხოების ზომებს, მათ შორის:\n\n• SSL შიფრაციას მონაცემთა გადაცემის უზრუნველსაყოფად\n• უსაფრთხო სერვერებსა და დაცულ მონაცემთა ბაზებს\n• მონაცემებზე წვდომის მკაცრ შეზღუდვას\n• უსაფრთხოების რეგულარულ აუდიტს\n\nმიუხედავად ჩვენი ძალისხმევისა, გთხოვთ, გაითვალისწინოთ, რომ ინტერნეტის საშუალებით მონაცემთა გადაცემა 100%-ით დაცული ვერ იქნება.",

    "privacy.chatbotDemo.title": "ჩატბოტის დემო",
    "privacy.chatbotDemo.content":
      "ჩატბოტის გვერდზე, „სცადეთ თავად“-ში დაწერილ შეტყობინებებს პასუხის მოსამზადებლად Google Gemini-ს (Google) ვუგზავნით.\n\n• საუბრებს 90 დღე ვინახავთ, რომ ვნახოთ, რას კითხულობენ, და ბოტი გავაუმჯობესოთ. შემდეგ ავტომატურად იშლება.\n• IP მისამართს არ ვინახავთ. ლიმიტის დასათვლელად ვიყენებთ მისგან მიღებულ შეუქცევად კოდს, რომელიც 30 დღეში იშლება.\n\nგთხოვთ, ამ ჩატში პირადი მონაცემები არ ჩაწეროთ.",

    "privacy.userRights.title": "თქვენი უფლებები",
    "privacy.userRights.content":
      "თქვენ გაქვთ შემდეგი უფლებები:\n\n• მოითხოვოთ თქვენ შესახებ არსებული ინფორმაციის გაცნობა\n• მოითხოვოთ თქვენი მონაცემების გასწორება ან განახლება\n• მოითხოვოთ თქვენი მონაცემების წაშლა\n• შეაჩეროთ თქვენი მონაცემების დამუშავება\n\nამ უფლებების რეალიზაციისთვის დაგვიკავშირდით VIFA Digital-ის საკონტაქტო არხების მეშვეობით.",
  },
  en: {
    "privacy.title": "Privacy Policy",
    "privacy.description": "Protecting your personal data is of utmost importance to VIFA Digital",
    "privacy.lastUpdated": "Last updated",

    "privacy.dataCollection.title": "Data Collection",
    "privacy.dataCollection.content":
      "VIFA Digital collects information that you voluntarily provide to us when:\n\n• You use our website\n• You contact our team\n• You use our digital services\n• You subscribe to our newsletters or updates\n\nThe information we collect includes:\n\n• First and last name\n• Email address\n• Phone number\n• Business-related information",

    "privacy.dataUsage.title": "Data Usage",
    "privacy.dataUsage.content":
      "Your personal data is used for the following purposes:\n\n• To provide you with our digital services\n• To communicate with you and conduct consultations\n• To improve our services\n• To comply with legal obligations\n\nVIFA Digital never shares or sells your personal data to third parties for commercial purposes.",

    "privacy.dataSecurity.title": "Data Security",
    "privacy.dataSecurity.content":
      "We use modern security measures, including:\n\n• SSL encryption for data transmission\n• Secure servers and protected databases\n• Restricted access to data\n• Regular security audits\n\nDespite our efforts, please note that data transmission via the internet cannot be 100% secure.",

    "privacy.chatbotDemo.title": "Chatbot demo",
    "privacy.chatbotDemo.content":
      "Messages written in \"Try it yourself\" on the chatbot page are sent to Google Gemini (Google) to prepare the reply.\n\n• We keep the chats for 90 days to see what people ask and improve the bot. After that they are deleted automatically.\n• We do not store IP addresses. To count the limit we use a one-way code derived from it, deleted within 30 days.\n\nPlease don't share personal details in this chat.",

    "privacy.userRights.title": "Your Rights",
    "privacy.userRights.content":
      "You have the following rights:\n\n• Request access to information we have about you\n• Request correction or update of your data\n• Request deletion of your data\n• Halt processing of your data\n\nTo exercise these rights, please contact us via VIFA Digital official channels.",
  },
};

const PrivacyPolicy: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = privacyTranslations[currentLanguage as keyof typeof privacyTranslations] as Record<string, string>;
    return translations[key] || key;
  };
  const { getTransitionClasses } = useLanguageTransition();

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
      title: t('privacy.chatbotDemo.title'),
      icon: <FaRobot className="w-6 h-6" />,
      content: t('privacy.chatbotDemo.content')
    },
    {
      title: t('privacy.userRights.title'),
      icon: <FaUserShield className="w-6 h-6" />,
      content: t('privacy.userRights.content')
    }
  ];

  return (
    <EditorialPage>
      <SEO
        title={t("privacy.title")}
        description={t("privacy.description")}
        url="https://vifadigital.ge/privacy"
        type="website"
      />
      <div className={`ed-wrap ed-reading ${getTransitionClasses()}`}>
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="ed-icon ed-icon-large">
              <FaShieldAlt className="w-8 h-8 ed-ink" />
            </div>
          </div>
          <h1 className="ed-legal-title mb-6">
            {t('privacy.title')}
          </h1>
          <p className="ed-intro">
            {t('privacy.description')}
          </p>
          <div className="mt-4 text-sm ed-muted">
            {t('privacy.lastUpdated')}: {currentLanguage === 'en' ? '24 November 2026' : '24 ნოემბერი, 2026'}
          </div>
        </header>

        <div className="space-y-5">
          {sections.map((section, index) => (
            <div
              key={index}
              className="ed-card p-5 sm:p-8"
            >
              <div className="flex items-center mb-6">
                <div className="ed-icon mr-4 shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold ed-ink">{section.title}</h2>
              </div>
              <div className="ed-prose whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorialPage>
  );
};

export default PrivacyPolicy;
