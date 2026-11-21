import { ArrowDown } from "lucide-react";
import { Fragment, useState } from "react";
import CallbackLink from "../components/CallbackLink";
import type { FAQItem } from "../components/FAQSection";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
import { HowWeStart } from "../components/ui/HowWeStart";
import { IndustryCarousel } from "../components/ui/IndustryCarousel";
import { LightPage } from "../components/ui/LightPage";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceHero } from "../components/ui/ServiceHero";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { OtherItServices } from "../components/ui/OtherItServices";
import { itBreadcrumbs, itHref } from "../data/itServices";
import { useLanguage } from "../contexts/LanguageContext";
import { ScreenshotCarousel } from "../components/ui/ScreenshotCarousel";
import { WebPackageCard, WebProjectCard } from "../components/ui/WebCards";
import { webPortfolio as portfolio, webProjects } from "../data/webProjects";
import "./webService.css";

// FAQ — built from the real packages/pricing on this page (bilingual).
// Questions are phrased the way people actually search ("საიტის დამზადება").
const webDevFaq: Record<"ka" | "en", FAQItem[]> = {
  ka: [
    {
      question: "რა ღირს საიტის დამზადება?",
      answer:
        "სავიზიტო საიტის ფასი იწყება 500 ₾-დან, პრემიუმ ვებსაიტი ღირს 700-1000 ₾, ხოლო ონლაინ მაღაზიის ფასი იწყება 1400 ₾-დან. ზუსტ ფასს უფასო კონსულტაციის შემდეგ შემოგთავაზებთ."
    },
    {
      question: "რამდენ ხანში მზადდება ვებსაიტი?",
      answer:
        "სავიზიტო ვებსაიტის დასამზადებლად საშუალოდ 1-დან 2 კვირამდე დროა საჭირო. პრემიუმ კორპორატიული ვებსაიტის შექმნას 2-დან 4 კვირამდე ვუთმობთ, ხოლო ონლაინ მაღაზიის სრულყოფილად გამართვას 4-დან 6 კვირამდე სჭირდება. სამუშაოს ზუსტ ვადებს პროექტის სპეციფიკისა და მოცულობის მიხედვით ინდივიდუალურად ვათანხმებთ."
    },
    {
      question: "რა ტექნოლოგიებზე აშენებთ ვებსაიტებს?",
      answer:
        "პროექტებისთვის ვიყენებთ უახლეს და მოწინავე ტექნოლოგიურ სტეკს, როგორიცაა React, TypeScript, Node.js, Firebase და Vercel. აღნიშნული ტექნოლოგიები უზრუნველყოფს საიტის მაქსიმალურ სისწრაფეს, უმაღლეს უსაფრთხოებასა და SEO-სთვის იდეალურად ოპტიმიზებულ სტრუქტურას."
    },
    {
      question: "ვებსაიტი მობილურზე მორგებული და SEO-ზე ოპტიმიზებული იქნება?",
      answer:
        "რა თქმა უნდა. ჩვენ მიერ შექმნილი ყველა ვებსაიტი სრულად რესპონსიულია და იდეალურად მუშაობს როგორც მობილურსა და ტაბლეტზე, ისე კომპიუტერზე. საიტს ასევე ექნება საბაზისო SEO ოპტიმიზაცია, ინტეგრირებული Google Analytics და უსაფრთხო კავშირისთვის აუცილებელი SSL სერთიფიკატი."
    },
    {
      question: "აკეთებთ ონლაინ მაღაზიას ქართული ბანკებით გადახდით?",
      answer:
        "დიახ, ვქმნით სრულყოფილ ონლაინ მაღაზიებს ქართული ბანკების გადახდის სისტემების სრული ინტეგრაციით. მაღაზიას ასევე ვუკავშირებთ Invento WMS-ს, რომ მართოთ პროდუქტები, ავტომატურად განაახლოთ მარაგები, დაბეჭდოთ საკურიერო ეტიკეტები და აკონტროლოთ შეკვეთები რეალურ დროში."
    },
    {
      question: "შევძლებ ვებსაიტის კონტენტის დამოუკიდებლად მართვას?",
      answer:
        "დიახ, პრემიუმ პაკეტის არჩევის შემთხვევაში საიტს მოჰყვება სრულფასოვანი მართვის სისტემა (CMS) და მოსახერხებელი ადმინ პანელი. ამის დახმარებით, დეველოპერის ჩარევის გარეშე, დამოუკიდებლად შეძლებთ ტექსტების, პროდუქტებისა და სიახლეების განახლებას."
    }
  ],
  en: [
    {
      question: "How much does it cost to build a website?",
      answer:
        "A brochure website starts from 500 ₾, a premium website costs 700-1000 ₾, and an online store starts from 1400 ₾. We'll provide a quote after a free consultation."
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "A landing-page website takes on average 1-2 weeks, a premium corporate website 2-4 weeks, and a full online store 4-6 weeks. We agree on exact timelines individually, based on the project's scope and complexity."
    },
    {
      question: "What technologies do you build websites with?",
      answer:
        "We use a modern, advanced stack such as React, TypeScript, Node.js, Firebase and Vercel. These technologies ensure maximum speed, top-tier security and a structure that is perfectly optimized for SEO."
    },
    {
      question: "Will the website be mobile-responsive and SEO-optimized?",
      answer:
        "Absolutely. Every website we build is fully responsive and works perfectly on mobile, tablet and desktop. It also includes baseline SEO optimization, integrated Google Analytics and an SSL certificate for a secure connection."
    },
    {
      question: "Do you build online stores with Georgian bank payments?",
      answer:
        "Yes, we build online stores with Georgian bank payments and connect them to Invento WMS to sync stock, print shipping labels and track orders in real time."
    },
    {
      question: "Can I manage the website content myself?",
      answer:
        "Yes. With the premium package, the site comes with a full content management system (CMS) and a convenient admin panel. With it, you can update texts, products and news independently, without involving a developer."
    }
  ]
};

const webDevTranslations = {
  ka: {
    "seo.webdev.title": "საიტის დამზადება - ვებსაიტი და ონლაინ მაღაზია 500₾-დან",
    "seo.webdev.description":
      "ვებსაიტის დამზადება 500₾-დან: სავიზიტო საიტი, კორპორატიული ვებსაიტი CMS ადმინ პანელით და ონლაინ მაღაზია. უნიკალური დიზაინი, SEO ოპტიმიზაცია, SSL და უფასო ჰოსტინგი.",
    "webdev.hero.overline": "ვებ დეველოპმენტი",
    "webdev.hero.main_title": "ვებსაიტის დამზადება თქვენი ბიზნესისთვის.",
    "webdev.hero.description": "ვქმნით პრემიუმ კლასის ვებგვერდებს და E-commerce პლატფორმებს, რომლებიც ზრდის თქვენს გაყიდვებს.",
    "webdev.pricing.title": "აირჩიეთ პაკეტი",
    "webdev.pricing.landing.title": "სავიზიტო საიტი",
    "webdev.pricing.landing.description": "წარუდგინეთ კლიენტებს თქვენი ბიზნესი 2-4 გვერდზე.",
    "webdev.pricing.landing.price": "500 ₾-დან",
    "webdev.pricing.landing.feature1": "მომსახურების გვერდი",
    "webdev.pricing.landing.feature2": "საკონტაქტო ფორმა",
    "webdev.pricing.landing.feature3": "Google Analytics-ის ჩართვა",
    "webdev.pricing.corporate.title": "პრემიუმ ვებსაიტი",
    "webdev.pricing.corporate.description": "განაახლეთ კომპანიის ვებსაიტი თავად.",
    "webdev.pricing.corporate.price": "700-1000 ₾",
    "webdev.pricing.corporate.feature1": "კონტენტის მართვის პანელი (CMS)",
    "webdev.pricing.corporate.feature2": "რამდენიმე ენის მხარდაჭერა",
    "webdev.pricing.corporate.feature3": "ავტომატური სარეზერვო ასლები",
    "webdev.pricing.ai.feature1": "Google Gemini AI",
    "webdev.pricing.ai.feature2": "3 პლატფორმაზე ინტეგრაცია",
    "webdev.pricing.ai.feature3": "ქართული ენის მხარდაჭერა",
    "webdev.pricing.ai.feature4": "რეალურ დროში რედაქტირება",
    "webdev.pricing.ai.feature5": "დეტალური ანალიტიკა",
    "webdev.pricing.ecommerce.title": "ონლაინ მაღაზია",
    "webdev.pricing.ecommerce.description": "მიიღეთ შეკვეთები და გადახდები ონლაინ.",
    "webdev.pricing.ecommerce.price": "1400 ₾-დან",
    "webdev.pricing.ecommerce.feature1": "ქართული ბანკების გადახდის სისტემები",
    "webdev.pricing.ecommerce.feature2": "მარაგების სინქრონიზაცია Invento WMS-თან",
    "webdev.pricing.ecommerce.feature3": "საკურიერო ეტიკეტები და ინვოისები",
    "webdev.pricing.consultation": "კონსულტაცია უფასოა",
    "webdev.pricing.cta": "პაკეტების ნახვა",
    "webdev.cta.question": "მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?",
    "webdev.cta.button": "დაგვიკავშირდი WhatsApp-ზე",
    "webdev.whatsapp.consult": "კონსულტაცია WhatsApp-ზე",

    "webdev.content.eyebrow": "სერვისის შესახებ",
    "webdev.content.intro":
      "ვებსაიტი დღეს ბიზნესის მთავარი ციფრული ვიტრინაა. VIFA Digital აკეთებს საიტის დამზადებას სრული ციკლით: დიზაინიდან და დეველოპმენტიდან SEO ოპტიმიზაციამდე და გაშვებამდე. ვქმნით სწრაფ, მობილურზე მორგებულ და კონვერსიაზე ორიენტირებულ ვებგვერდებს, რომლებიც რეალურ შედეგს, ვიზიტორებსა და გაყიდვებს მოგიტანთ.",
    "webdev.content.question_1": "როგორ ამზადებთ კორპორატიულ ვებსაიტს?",
    "webdev.content.p_1":
      "ვაკეთებთ კორპორატიული ვებსაიტებისა და სავიზიტო საიტების დამზადებას მცირე და საშუალო ბიზნესისთვის. თითოეული ვებგვერდი იქმნება უნიკალური დიზაინით, თქვენი ბრენდის სტილზე მორგებით და სუფთა, სწრაფი კოდით (React, TypeScript). საიტი თავიდანვე SEO-ზე ოპტიმიზებულია, რათა Google-ში სწორ სიტყვებზე გამოჩნდეს და ახალი კლიენტები მოიზიდოს.",
    "webdev.content.question_2": "როგორ ვმართავ მარაგებსა და შეკვეთებს ონლაინ მაღაზიაში?",
    "webdev.content.p_2":
      "ონლაინ მაღაზიას ვუკავშირებთ Invento WMS-ს. სისტემა ავტომატურად აახლებს მარაგებს, ბეჭდავს საკურიერო ეტიკეტებს და შეკვეთების კონტროლის საშუალებას გაძლევთ რეალურ დროში.",
    "webdev.content.question_3": "როდის მჭირდება ცალკე გვერდი რეკლამისთვის?",
    "webdev.content.p_3":
      "სარეკლამო კამპანიებისთვის ვამზადებთ ლენდინგ პეიჯებს (landing page), რომლებიც ერთ მკაფიო მიზანზეა აწყობილი - ლიდის ან გაყიდვის მიღებაზე. სწრაფი ჩატვირთვა, გასაგები მესიჯი და ძლიერი call-to-action ზრდის რეკლამის ეფექტურობას და ამცირებს მოზიდვის ღირებულებას.",
  },
  en: {
    "seo.webdev.title": "Website Development in Georgia - from 500₾",
    "seo.webdev.description":
      "Website and online store development from 500₾: landing pages, corporate websites with a CMS admin panel and eCommerce. Unique design, mobile-responsive, SEO and free hosting.",
    "webdev.hero.overline": "Web Development",
    "webdev.hero.main_title": "Website Development for Your Business.",
    "webdev.hero.description": "We build premium websites and E-commerce platforms that drive your sales and growth.",
    "webdev.pricing.title": "Choose Your Package",
    "webdev.pricing.landing.title": "Brochure Website",
    "webdev.pricing.landing.description": "Introduce your business in 2-4 pages.",
    "webdev.pricing.landing.price": "From 500 ₾",
    "webdev.pricing.landing.feature1": "Services page",
    "webdev.pricing.landing.feature2": "Contact form",
    "webdev.pricing.landing.feature3": "Google Analytics setup",
    "webdev.pricing.corporate.title": "Premium Website",
    "webdev.pricing.corporate.description": "Update your company website yourself.",
    "webdev.pricing.corporate.price": "700-1000 ₾",
    "webdev.pricing.corporate.feature1": "Content management panel (CMS)",
    "webdev.pricing.corporate.feature2": "Multilingual support",
    "webdev.pricing.corporate.feature3": "Automatic backups",
    "webdev.pricing.ai.feature1": "Google Gemini AI",
    "webdev.pricing.ai.feature2": "3 Platform Integration",
    "webdev.pricing.ai.feature3": "Georgian Language Support",
    "webdev.pricing.ai.feature4": "Real-time Editing",
    "webdev.pricing.ai.feature5": "Detailed Analytics",
    "webdev.pricing.ecommerce.title": "Online Store",
    "webdev.pricing.ecommerce.description": "Take orders and accept payments online.",
    "webdev.pricing.ecommerce.price": "From 1400 ₾",
    "webdev.pricing.ecommerce.feature1": "Georgian bank payments",
    "webdev.pricing.ecommerce.feature2": "Stock sync with Invento WMS",
    "webdev.pricing.ecommerce.feature3": "Shipping labels and invoicing",
    "webdev.pricing.consultation": "Consultation is Free",
    "webdev.pricing.cta": "Start Project",
    "webdev.cta.question": "Ready for Digital Transformation?",
    "webdev.cta.button": "Contact us on WhatsApp",
    "webdev.whatsapp.consult": "Consult on WhatsApp",
  },
};

const whatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20ვებ%20განვითარების%20სერვისით.%20მსურს%20უფასო%20კონსულტაცია.";
const portfolioWhatsappUrl = "https://wa.me/995557624243?text=" +
  encodeURIComponent("გამარჯობა, მინდა სხვა ნამუშევრებიც ვნახო.");
const packageLinks = {
  landing: "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20სავიზიტო%20ვებსაიტის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
  corporate: "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20პრემიუმ%20ვებსაიტის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
  ecommerce: "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20ონლაინ%20მაღაზიისა%20და%20WMS%20სისტემის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
};

const timelines = {
  ka: { landing: "1-2 კვირა", corporate: "2-4 კვირა", ecommerce: "4-6 კვირა" },
  en: { landing: "1-2 weeks", corporate: "2-4 weeks", ecommerce: "4-6 weeks" },
} as const;

const { lifeStore, all4kids, darchiaPartners, geoMarti, adressRealty, geoTechnic, legard } = webProjects;
const featuredProjects = [all4kids, geoMarti, darchiaPartners, adressRealty, geoTechnic, legard, lifeStore];

const englishDetails: FAQItem[] = [
  {
    question: "What does website development include?",
    answer: "VIFA Digital handles the full website development process, from design and development to SEO optimization and launch. We build fast, mobile-responsive websites.",
  },
  {
    question: "How do you build a corporate website?",
    answer: "We build corporate and landing-page websites for small and medium businesses. Design follows your brand, with React and TypeScript and a structure that is optimized for search from the start.",
  },
  {
    question: "How do I manage stock and orders in my online store?",
    answer: "We connect your store to Invento WMS, which syncs stock automatically, prints shipping labels and lets you track orders in real time.",
  },
  {
    question: "When do I need a separate page for an ad campaign?",
    answer: "We build landing pages around one goal, such as a lead or a sale. The page combines a clear message, a direct call to action and fast loading.",
  },
];

export default function WebDev() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const en = currentLanguage === "en";
  const [showAllProjects, setShowAllProjects] = useState(false);
  const language = en ? "en" : "ka";
  const translations: Record<string, string> = webDevTranslations[language];
  const t = (key: string) => translations[key] ?? key;
  const faqItems = webDevFaq[language];
  const details = en ? englishDetails : [
    { question: "რას მოიცავს ვებსაიტის დამზადება?", answer: t("webdev.content.intro") },
    ...[1, 2, 3].map((n) => ({ question: t("webdev.content.question_" + n), answer: t("webdev.content.p_" + n) })),
  ];
  const breadcrumbItems = itBreadcrumbs("web", language);

  return (
    <LightPage className="web-service" tone="web" whatsappHref={whatsappUrl}>
      <SEO
        title={t("seo.webdev.title")}
        description={t("seo.webdev.description")}
        url="https://vifadigital.ge/services/web"
        serviceSchema={{
          name: "ვებსაიტის დამზადება და ვებ დეველოპმენტი",
          description:
            "საიტის დამზადება, კორპორატიული ვებსაიტები, eCommerce პლატფორმები და ვებ აპლიკაციები React/Node.js ტექნოლოგიებზე.",
          serviceType: "Web Development",
          offers: [
            { name: "Landing Page საიტი", price: 500 },
            { name: "კორპორატიული საიტი (CMS)", minPrice: 700, maxPrice: 1000 },
            { name: "AI ინტეგრირებული ვებსაიტი", price: 300 },
            { name: "eCommerce ონლაინ მაღაზია", price: 1400 },
          ],
        }}
        breadcrumbs={breadcrumbItems}
        faq={faqItems}
      />
      <SiteNav consultationHref={whatsappUrl} activeLink={itHref} language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="web-hero-title" breadcrumbs={breadcrumbItems} title={t("webdev.hero.main_title")}
            description={en
              ? "Landing pages, corporate websites with a CMS and online stores with Georgian bank payments."
              : "სავიზიტო და კორპორატიული საიტები, ონლაინ მაღაზიები ბარათით გადახდით."}
            actions={<>
              <a className="it-pill-button" href="#pricing">{en ? "See packages" : t("webdev.pricing.cta")} <ArrowDown size={16} aria-hidden="true" /></a>
              <a className="it-more-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t("webdev.whatsapp.consult")} ›</a>
            </>}>
          <ScreenshotCarousel language={language} controlsLabel={en ? "Featured projects" : "გამორჩეული პროექტები"}
            slides={featuredProjects.map(({ name, href, image, category }) => ({
              name, href, image, caption: `${name} · ${category[language]}`,
            }))} />
        </ServiceHero>

        <section id="pricing" className="it-section it-col web-pricing" aria-labelledby="web-pricing-title">
          <SectionHeading id="web-pricing-title">{t("webdev.pricing.title")}</SectionHeading>
          <div className="web-packages">
            {(["landing", "corporate", "ecommerce"] as const).map((key) => {
              const base = "webdev.pricing." + key + ".";
              return (
                <WebPackageCard key={key} highlighted={key === "ecommerce"} title={t(base + "title")}
                  price={t(base + "price")} timeline={timelines[language][key]} body={t(base + "description")}
                  features={[1, 2, 3].map((num) => t(base + "feature" + num))}
                  href={packageLinks[key]} action={t("webdev.whatsapp.consult")} />
              );
            })}
          </div>
          <p className="web-consultation-note">{t("webdev.pricing.consultation")}</p>
        </section>

        <section className="it-section it-col web-portfolio" aria-labelledby="web-portfolio-title">
          <SectionHeading id="web-portfolio-title">{en ? "Selected projects" : "შერჩეული ნამუშევრები"}</SectionHeading>
          <div className="web-project-grid" data-expanded={showAllProjects}>
            {portfolio.map((project, index) => (
              <Fragment key={project.href}>
                {index === 4 && (
                  <button type="button" className="it-pill-button web-project-toggle" aria-expanded={showAllProjects}
                    onClick={() => setShowAllProjects((shown) => !shown)}>
                    {showAllProjects ? (en ? "Show less" : "ნაკლების ნახვა") : (en ? "Show more" : "მეტის ნახვა")}
                  </button>
                )}
                <WebProjectCard project={project} language={language}
                  className={index < 4 ? "" : "web-project-extra"} />
              </Fragment>
            ))}
          </div>
          <p className="web-consultation-note">
            <a className="web-portfolio-more" href={portfolioWhatsappUrl} target="_blank" rel="noopener noreferrer">
              {en ? "Message us to see more of our work" : "სხვა ნამუშევრების სანახავად მოგვწერეთ"} ›
            </a>
          </p>
        </section>

        <IndustryCarousel language={language} />
        <HowWeStart language={language} whatsappHref={whatsappUrl} />

        <FaqSection id="web-faq" title={en ? "Frequently asked questions" : "ხშირად დასმული კითხვები"}
          items={[...faqItems, ...details, {
            question: en ? "What does the AI chatbot package include?" : "რას მოიცავს AI ჩატბოტის პაკეტი?",
            answer: <ul className="web-faq-list">{[1, 2, 3, 4, 5].map((num) => (
              <li key={num}>{t("webdev.pricing.ai.feature" + num)}</li>
            ))}</ul>,
          }]} />
        <OtherItServices current="web" language={language} />
        <ContactBlock whatsappHref={whatsappUrl} language={language}>
          <CallbackLink product="web" className="it-callback" />
        </ContactBlock>
        <SiteFooter language={language} />
      </main>
    </LightPage>
  );
}
