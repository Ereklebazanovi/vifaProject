import { Camera, Plane, Video } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CallbackLink from "../components/CallbackLink";
import type { FAQItem } from "../components/FAQSection";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
import { MarketingArtifact } from "../components/ui/MarketingArtifacts";
import { MarketingPage } from "../components/ui/MarketingPage";
import { MarketingServiceCard } from "../components/ui/MarketingServiceCard";
import { MarketingWork } from "../components/ui/MarketingWork";
import { OtherMarketingServices } from "../components/ui/OtherMarketingServices";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceHero } from "../components/ui/ServiceHero";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { WebPackageCard } from "../components/ui/WebCards";
import { useLanguage } from "../contexts/LanguageContext";
import { foodPhoto } from "../data/marketingMedia";
import { marketingBreadcrumbs, marketingHubHref } from "../data/marketingServices";
import { useShorts } from "../hooks/useShorts";

const productionFaq: Record<"ka" | "en", FAQItem[]> = {
  ka: [
    {
      question: "რა ღირს ფოტოგადაღება?",
      answer:
        "ფასს უფასო კონსულტაციის შემდეგ გეტყვით. შეთავაზება დამოკიდებულია იმაზე, რას ვიღებთ, რისთვის გჭირდებათ ფოტოები და რამდენი დამუშავებული კადრი გსურთ."
    },
    {
      question: "იღებთ რილსებსა და სარეკლამო ვიდეოებს?",
      answer:
        "დიახ. ვიღებთ რილსებს, სარეკლამო, კორპორატიულ და პროდუქტის ვიდეოებს. ვიდეოს ვამონტაჟებთ, ფერებს ვამუშავებთ და სუბტიტრებს ვამატებთ. რილსებს Instagram-სა და TikTok-ზე რეგულარულად გამოსაქვეყნებლად ვამზადებთ."
    },
    {
      question: "რას იღებთ დრონით?",
      answer:
        "დრონით ვიღებთ უძრავ ქონებას, ღონისძიებებს, სასტუმროებს, მშენებლობებსა და ბუნებას. ზემოდან გადაღებული კადრებით სივრცის მასშტაბი უკეთ ჩანს."
    },
    {
      question: "სად ტარდება გადაღება?",
      answer:
        "ვიღებთ სტუდიაშიც და თქვენ მიერ შერჩეულ სივრცეშიც. შეგვიძლია მოვიდეთ მაღაზიაში, ოფისში, რესტორანში ან ღია სივრცეში. გადაღების ადგილს და განათებას პროექტის მიხედვით ვარჩევთ."
    },
    {
      question: "როდის მივიღებ მზა მასალას?",
      answer:
        "ფოტოების დამუშავებას საშუალოდ 3-დან 7 სამუშაო დღემდე სჭირდება, ვიდეოს მონტაჟს კი 5-დან 10 სამუშაო დღემდე. ზუსტი ვადა სამუშაოს მოცულობაზეა დამოკიდებული. თუ გეჩქარებათ, უფრო მოკლე ვადაზე შევთანხმდებით."
    },
    {
      question: "მასალას სოციალურ ქსელებში პირდაპირ გამოვაქვეყნებ?",
      answer:
        "დიახ. ფოტოებსა და ვიდეოებს Instagram-ზე, Facebook-ზე, TikTok-ზე ან YouTube-ზე გამოსაქვეყნებლად მოვამზადებთ. სურვილის შემთხვევაში, გვერდების მართვასაც ჩვენ მივხედავთ."
    }
  ],
  en: [
    {
      question: "How much does a photo shoot cost?",
      answer:
        "We quote after a free consultation. Pricing depends on what we shoot, how you’ll use the photos and how many finished images you need."
    },
    {
      question: "Do you shoot reels and advertising videos?",
      answer:
        "Yes. We create social-media reels, advertising spots, corporate and product videos. The service includes filming, editing, color grading and subtitles. The reels package is ideal for Instagram and TikTok, where consistent content is the main lever for brand growth."
    },
    {
      question: "Do you offer drone (aerial) shooting?",
      answer:
        "Yes. We shoot aerial photos and video for real estate, events, hotels, construction and natural landscapes. Aerial footage adds scale to your video."
    },
    {
      question: "Do you shoot in a studio or on location?",
      answer:
        "Both options are available. We can shoot in a studio with controlled lighting, at your store, office or restaurant, or outdoors. We choose the location together based on the project concept."
    },
    {
      question: "How soon will I receive the final material?",
      answer:
        "Photo editing and retouching take 3-7 working days on average, while video editing takes 5-10 working days, depending on the volume. For urgent projects we also offer an express delivery option."
    },
    {
      question: "Will you prepare the content for social media?",
      answer:
        "Yes. We deliver the final photo and video material in the correct format and aspect ratio for Instagram, Facebook, TikTok and YouTube. On request, we can also handle full content management through our digital marketing service."
    }
  ]
};

const productionTranslations = {
  ka: {
    "seo.title": "ფოტო და ვიდეო გადაღება | დრონით გადაღება",
    "seo.description":
      "ფოტოსესიები, სარეკლამო ვიდეოები, რილსები და დრონით გადაღება ბრენდებისთვის. ფასს უფასო კონსულტაციაზე ვათანხმებთ.",
    "seo.keywords":
      "ფოტო გადაღება, ვიდეო გადაღება, კომერციული ფოტოგრაფია, პროდუქტის ფოტო, რილსების გადაღება, სარეკლამო ვიდეო, დრონით გადაღება, აეროგადაღება, ვიდეო პროდუქცია, ფოტო სესია, vifa production",

    "hero.title": "ფოტო და ვიდეო გადაღება ბრენდებისთვის",
    "hero.description":
      "ფოტოები, სარეკლამო ვიდეოები, რილსები და დრონით გადაღება.",
    "hero.cta": "უფასო კონსულტაცია",

    "intro":
      "VIFA Production დაგეგმავს გადაღებას, დაამუშავებს ფოტოებს და დაამონტაჟებს ვიდეოს. ფაილებს გამოსაქვეყნებლად საჭირო ფორმატში ჩაგაბარებთ.",

    "section.services": "რას გთავაზობთ",

    "svc.photo.title": "კომერციული ფოტოგრაფია",
    "svc.photo.desc": "პროდუქტის, ინტერიერისა და კერძების ფოტოები.",
    "svc.video.title": "ვიდეო და რილსების გადაღება",
    "svc.video.desc": "სარეკლამო ვიდეოები, რილსები და მონტაჟი.",
    "svc.drone.title": "დრონით გადაღება",
    "svc.drone.desc": "ფოტო და ვიდეო, რომლებიც სივრცეს ზემოდან აჩვენებს.",

    "question.photo": "რას მოიცავს ფოტოსესია?",
    "p.photo":
      "ვიღებთ პროდუქტებს ონლაინ მაღაზიისა და კატალოგისთვის, ასევე კერძებს, ინტერიერსა და ღონისძიებებს. ვაწყობთ ბრენდისა და გუნდის ფოტოსესიებს. ვიყენებთ პროფესიონალურ განათებას. შემდეგ ვამუშავებთ ფოტოებსა და ფერებს და ფაილებს ვამზადებთ საიტისთვის, სოციალური ქსელისთვის ან ბეჭდვისთვის.",
    "question.video": "რას მოიცავს ვიდეოს მომზადება?",
    "p.video":
      "ვქმნით სარეკლამო, კორპორატიულ და პროდუქტის ვიდეოებს, ასევე მოკლე რილსებს Instagram-სა და TikTok-ზე გამოსაქვეყნებლად. ვამზადებთ იდეას და სცენარს. გადაღების შემდეგ ვიდეოს ვამონტაჟებთ, ფერებს ვამუშავებთ, მუსიკასა და სუბტიტრებს ვამატებთ. ფაილს არჩეულ პლატფორმაზე გამოსაქვეყნებლად მოვამზადებთ.",
    "question.drone": "რა პროექტებისთვის გამოდგება დრონით გადაღება?",
    "p.drone":
      "დრონით ვიღებთ უძრავ ქონებას, სასტუმროებს, რესტორნებს, ღონისძიებებს, მშენებლობებსა და ბუნებას. ზემოდან გადაღებულ ფოტოებსა და ვიდეოზე სივრცის მასშტაბი კარგად ჩანს. საჭიროებისას ამ კადრებს მიწიდან გადაღებულ მასალასთან ერთად ვამონტაჟებთ.",

    "section.pricing": "რა შედის გადაღებაში",
    "section.pricingDesc": "ფასს უფასო კონსულტაციაზე ვათანხმებთ, სამუშაოს მოცულობის მიხედვით.",
    "pkg.order": "დაგვიკავშირდით",

    "pkg.photo.name": "ფოტოგადაღება",
    "pkg.photo.f1": "პროდუქტის ან ბრენდის ფოტოსესია",
    "pkg.photo.f2": "პროფესიონალური განათება",
    "pkg.photo.f3": "ფოტოებისა და ფერების დამუშავება",
    "pkg.photo.f4": "მზა ფაილები საიტისა და სოციალური ქსელებისთვის",

    "pkg.video.name": "ვიდეო და რილსები",
    "pkg.video.f1": "სარეკლამო ვიდეო ან რილსები",
    "pkg.video.f2": "გადაღება და სრული მონტაჟი",
    "pkg.video.f3": "ფერების დამუშავება და სუბტიტრები",
    "pkg.video.f4": "მზა ვიდეო Instagram-ზე, TikTok-ზე ან YouTube-ზე გამოსაქვეყნებლად",

    "pkg.drone.name": "დრონით გადაღება",
    "pkg.drone.f1": "ფოტო და ვიდეო ჰაერიდან",
    "pkg.drone.f2": "ფართო ხედები და სივრცის მასშტაბი",
    "pkg.drone.f3": "უძრავი ქონება, ღონისძიებები და ბუნება",
    "pkg.drone.f4": "მიწიდან და ჰაერიდან გადაღებული კადრების გაერთიანება",


  },
  en: {
    "seo.title": "Photo & Video Production | Drone Shooting",
    "seo.description":
      "Commercial photography, advertising videos, reels and drone footage for brands. Pricing is agreed during a free consultation.",
    "seo.keywords":
      "photo shoot, video production, commercial photography, product photography, reels shooting, advertising video, drone shooting, aerial photography, photo session, vifa production",

    "hero.title": "Photo and video production for brands",
    "hero.description":
      "Photos, advertising videos, reels and drone footage.",
    "hero.cta": "Free Consultation",

    "intro":
      "VIFA Production handles shooting, editing and aerial footage. We prepare the final files in the format required for your planned channels.",

    "section.services": "What We Offer",

    "svc.photo.title": "Commercial Photography",
    "svc.photo.desc": "Photography for products, interiors and food.",
    "svc.video.title": "Video production and reels",
    "svc.video.desc": "Advertising videos, reels and editing.",
    "svc.drone.title": "Drone photography and video",
    "svc.drone.desc": "Aerial photos and video for spaces.",

    "question.photo": "What does a photo shoot include?",
    "p.photo":
      "We shoot products for online stores and catalogs, brand and team portraits, food, interiors and events. We use professional lighting, retouch and color grade the photos, and format the files for websites, social media or print.",
    "question.video": "What does video production include?",
    "p.video":
      "We make advertising, corporate and product videos, plus short reels for Instagram and TikTok. We handle the concept, script, shoot, editing, color grading, music and subtitles. The video is ready to publish on your chosen platform.",
    "question.drone": "Which projects suit drone filming?",
    "p.drone":
      "We shoot real estate, hotels, restaurants, events, construction and landscapes. Aerial photography and video show the scale of a location. We can also edit aerial and ground footage together.",

    "section.pricing": "What’s included in a shoot",
    "section.pricingDesc": "We agree on the price during a free consultation, based on the scope of work.",
    "pkg.order": "Book a Shoot",

    "pkg.photo.name": "Photo Shoot",
    "pkg.photo.f1": "Product or image session",
    "pkg.photo.f2": "Professional lighting",
    "pkg.photo.f3": "Retouching and color grading",
    "pkg.photo.f4": "Ready files for web and social",

    "pkg.video.name": "Video and reels",
    "pkg.video.f1": "Advertising video or reels",
    "pkg.video.f2": "Shooting and full editing",
    "pkg.video.f3": "Color grading and subtitles",
    "pkg.video.f4": "Files ready for Instagram, TikTok or YouTube",

    "pkg.drone.name": "Drone Shooting",
    "pkg.drone.f1": "Aerial photo and video",
    "pkg.drone.f2": "Cinematic footage",
    "pkg.drone.f3": "Real estate, events and nature",
    "pkg.drone.f4": "Editing with ground footage",


  },
};

const serviceKeys = ["photo", "video", "drone"] as const;
const serviceIcons = { photo: Camera, video: Video, drone: Plane };
const serviceArtifacts = { photo: "photo", video: "reel", drone: "aerial" } as const;
const heroPhotos = [foodPhoto(11), foodPhoto(2)];
const whatsappUrl =
  "https://wa.me/995577175132?text=" +
  encodeURIComponent("გამარჯობა, მაინტერესებს ფოტო და ვიდეო გადაღება. მსურს უფასო კონსულტაცია.");

export default function Production() {
  const { currentLanguage: language, toggleLanguage } = useLanguage();
  const shorts = useShorts();
  const ka = language === "ka";
  const translations: Record<string, string> = productionTranslations[language];
  const t = (key: string) => translations[key] ?? key;
  const faqItems = productionFaq[language];
  const breadcrumbItems = marketingBreadcrumbs(language, "production");

  return (
    <MarketingPage tone="production" whatsappHref={whatsappUrl}>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        keywords={t("seo.keywords")}
        url="https://vifadigital.ge/services/production"
        serviceSchema={{
          name: ka
            ? "ფოტო და ვიდეო გადაღება, დრონით (აერო) გადაღება"
            : "Photo and Video Production, Drone (Aerial) Shooting",
          description: t("seo.description"),
          serviceType: "Photo and Video Production",
        }}
        breadcrumbs={breadcrumbItems}
        faq={faqItems}
      />
      <SiteNav consultationHref={whatsappUrl} activeLink={marketingHubHref}
        language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="production-title" breadcrumbs={breadcrumbItems} title={t("hero.title")} description={t("hero.description")}
          actions={<>
            <a className="it-pill-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={19} aria-hidden="true" />{t("hero.cta")}
            </a>
            <CallbackLink product="production" className="it-callback" />
          </>}>
          <div className="marketing-production-panel marketing-hero-panel">
            {heroPhotos.map(photo => <img key={photo.src} src={photo.src} alt={ka ? photo.altKa : photo.altEn}
              width={photo.w} height={photo.h} decoding="async" />)}
          </div>
        </ServiceHero>

        <section className="it-section it-col marketing-section" aria-labelledby="production-services-title">
          <SectionHeading id="production-services-title">{t("section.services")}</SectionHeading>
          <div className="marketing-service-grid marketing-production-services">
            {serviceKeys.map(key => <MarketingServiceCard key={key} icon={serviceIcons[key]}
              title={t(`svc.${key}.title`)} body={t(`svc.${key}.desc`)}
              artifact={<MarketingArtifact kind={serviceArtifacts[key]} language={language} />} />)}
          </div>
        </section>

        <section className="it-section it-col marketing-section" aria-labelledby="production-pricing-title">
          <SectionHeading id="production-pricing-title">{t("section.pricing")}</SectionHeading>
          <div className="marketing-pricing-grid">
            {serviceKeys.map(key => <WebPackageCard key={key} title={t(`pkg.${key}.name`)}
              features={[1, 2, 3, 4].map(index => t(`pkg.${key}.f${index}`))}
              href={whatsappUrl} action={t("pkg.order")} />)}
          </div>
          <p className="marketing-price-note">{t("section.pricingDesc")}</p>
        </section>

        <MarketingWork language={language} shorts={shorts} photoNumbers={[10, 14]} />

        <FaqSection title={ka ? "ხშირად დასმული კითხვები" : "Frequently asked questions"} items={[
          ...faqItems,
          {
            question: ka ? "რას მოიცავს გადაღების პროცესი?" : "What does production include?",
            answer: t("intro"),
          },
          ...serviceKeys.map(key => ({ question: t(`question.${key}`), answer: t(`p.${key}`) })),
        ]} />
        <OtherMarketingServices current="production" language={language} />
        <ContactBlock whatsappHref={whatsappUrl} language={language}>
          <CallbackLink product="production" className="it-callback" />
        </ContactBlock>
      </main>
      <SiteFooter language={language} />
    </MarketingPage>
  );
}
