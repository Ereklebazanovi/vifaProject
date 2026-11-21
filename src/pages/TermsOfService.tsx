import { EditorialPage } from "../components/ui/EditorialPage";
import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaFileContract,
  FaBalanceScale,
  FaExclamationTriangle,
  FaHandshake,
} from "react-icons/fa";
import SEO from "../components/SEO";

// Terms of Service Translations for VIFA Digital
const termsTranslations = {
  ka: {
    "terms.title": "მომსახურების პირობები",
    "terms.description": "VIFA Digital-ის სერვისების გამოყენების წესები და პირობები",
    "terms.lastUpdated": "ბოლო განახლება",

    "terms.services.title": "ჩვენი სერვისები",
    "terms.services.content":
      "VIFA Digital გთავაზობთ შემდეგ მომსახურებას:\n\n• ვებგვერდების შექმნა და ტექნიკური მხარდაჭერა\n• ციფრული მარკეტინგი და კონტენტის წარმოება\n• AI ჩატბოტების ინტეგრაცია\n• საწყობის პროგრამა და ბიზნეს ავტომატიზაცია\n• ციფრული კონსულტაცია და სტრატეგია\n\nყველა სერვისს გთავაზობთ მაღალი ტექნოლოგიური სტანდარტებით, წინასწარ შეთანხმებული ვადებისა და ბიუჯეტის ფარგლებში.",

    "terms.userResponsibilities.title": "კლიენტის ვალდებულებები",
    "terms.userResponsibilities.content":
      "ჩვენი სერვისების გამოყენებისას თქვენ ვალდებული ხართ:\n\n• მოგვაწოდოთ ზუსტი ბიზნეს-ინფორმაცია პროექტისთვის\n• დროულად განახორციელოთ ხელშეკრულებით გათვალისწინებული გადახდები\n• აქტიურად ითანამშრომლოთ ჩვენს დეველოპერულ გუნდთან\n• არ გამოიყენოთ ჩვენი ტექნოლოგიები არაკანონიერი მიზნებისთვის\n• დაიცვათ ინტელექტუალური საკუთრების შეთანხმებული პირობები\n\nაღნიშნული პირობების დარღვევის შემთხვევაში, კომპანია იტოვებს უფლებას შეაჩეროს მომსახურება.",

    "terms.limitations.title": "პასუხისმგებლობის შეზღუდვა",
    "terms.limitations.content":
      "VIFA Digital-ის პასუხისმგებლობა შემოიფარგლება შემდეგით:\n\n• ჩვენი პასუხისმგებლობა არ აღემატება კონკრეტული პროექტის ჯამურ ღირებულებას\n• არ ვართ პასუხისმგებლები მესამე მხარის სერვისების (მაგ: ჰოსტინგი, API) დროებით შეფერხებებზე\n• ციფრული პროდუქტის ეფექტურობა დამოკიდებულია კლიენტის მიერ მოწოდებული ინფორმაციის სისწორეზე\n\nყველა ტექნიკური გარანტია განისაზღვრება ინდივიდუალური ხელშეკრულების საფუძველზე.",

    "terms.termination.title": "ხელშეკრულების შეწყვეტა",
    "terms.termination.content":
      "თანამშრომლობის შეწყვეტა შესაძლებელია:\n\n• მხარეთა ორმხრივი წერილობითი შეთანხმებით\n• პირობების ან გადახდის ვალდებულებების უხეში დარღვევის შემთხვევაში\n• ფორსმაჟორული გარემოებების დადგომისას\n\nმომსახურების შეწყვეტის შემდეგ:\n\n• ყველა მიმდინარე ტექნიკური სამუშაო წყდება\n• ხდება შესრულებული ეტაპების საბოლოო ანაზღაურება\n• კონფიდენციალურობის პირობები რჩება უვადო ძალაში",
  },
  en: {
    "terms.title": "Terms of Service",
    "terms.description": "Rules and conditions for using VIFA Digital services",
    "terms.lastUpdated": "Last updated",

    "terms.services.title": "Our Services",
    "terms.services.content":
      "VIFA Digital offers the following services:\n\n• Website creation and technical support\n• Digital marketing and content production\n• AI chatbot integration\n• Warehouse management software and business automation\n• Digital consulting and strategy\n\nAll services are provided according to high technological standards, within agreed timelines and budgets.",

    "terms.userResponsibilities.title": "Client Responsibilities",
    "terms.userResponsibilities.content":
      "When using our services, you are obligated to:\n\n• Provide accurate business information for the project\n• Make timely payments as specified in the contract\n• Actively cooperate with our development team\n• Not use our technologies for illegal purposes\n• Respect the agreed intellectual property terms\n\nIn case of violation, the company reserves the right to suspend services.",

    "terms.limitations.title": "Limitation of Liability",
    "terms.limitations.content":
      "VIFA Digital's liability is limited to:\n\n• Our liability does not exceed the total value of the specific project\n• We are not responsible for temporary failures of third-party services (e.g., hosting, API)\n• The effectiveness of the digital product depends on the accuracy of client-provided information\n\nAll technical warranties are defined based on individual contracts.",

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
    <EditorialPage>
      <SEO
        title={t("terms.title")}
        description={t("terms.description")}
        url="https://vifadigital.ge/terms"
        type="website"
      />
      <div className={`ed-wrap ed-reading ${getTransitionClasses()}`}>
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="ed-icon ed-icon-large">
              <FaFileContract className="w-8 h-8 ed-ink" />
            </div>
          </div>
          <h1 className="ed-legal-title mb-6">
            {t("terms.title")}
          </h1>
          <p className="ed-intro">
            {t("terms.description")}
          </p>
          <div className="mt-4 text-sm ed-muted">
            {t("terms.lastUpdated")}: {new Date().toLocaleDateString("ka-GE")}
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
                <h2 className="text-2xl font-bold ed-ink">
                  {section.title}
                </h2>
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

export default TermsOfService;
