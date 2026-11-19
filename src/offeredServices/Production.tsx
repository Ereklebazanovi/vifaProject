import { Camera, Plane, Video } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CallbackLink from "../components/CallbackLink";
import type { FAQItem } from "../components/FAQSection";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
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
      question: "რა ღირს ფოტო გადაღება?",
      answer:
        "ფოტო გადაღების ფასი დამოკიდებულია სამუშაოს ტიპსა და მოცულობაზე. ვიღებთ პროდუქტის ფოტოებს, ვაწყობთ საიმიჯო და კომერციულ ფოტოსესიებს. საორიენტაციო ფასი იწყება 300₾-დან. ზუსტ შეთავაზებას უფასო კონსულტაციის შემდეგ მოგიმზადებთ, თქვენი მიზნებისა და კადრების რაოდენობის მიხედვით."
    },
    {
      question: "აკეთებთ რილსების და სარეკლამო ვიდეოს გადაღებას?",
      answer:
        "დიახ. ვქმნით სოციალური მედიის რილსებს, სარეკლამო ვიდეო რგოლებს, კორპორატიულ და პროდუქტის ვიდეოებს. სერვისში შედის გადაღება, მონტაჟი, ფერის კორექცია და სუბტიტრები. რილსების პაკეტი იდეალურია Instagram-ისა და TikTok-ისთვის, სადაც სტაბილური კონტენტი ბრენდის ზრდის მთავარი ბერკეტია."
    },
    {
      question: "გაქვთ დრონით (აერო) გადაღების სერვისი?",
      answer:
        "დიახ. დრონით ვიღებთ უძრავ ქონებას, ღონისძიებებს, სასტუმროებს, მშენებლობებსა და ბუნებას. აეროგადაღება ვიდეოს მასშტაბს მატებს."
    },
    {
      question: "გადაღება სტუდიაში ხდება თუ ლოკაციაზე?",
      answer:
        "ორივე ვარიანტი ხელმისაწვდომია. ვიღებთ სტუდიაში კონტროლირებადი განათებით და თქვენს ლოკაციაზეც, მაგალითად მაღაზიაში, ოფისში, რესტორანში ან ღია სივრცეში. ლოკაციას ერთად ვირჩევთ პროექტის კონცეფციის მიხედვით."
    },
    {
      question: "მზა მასალას რა ვადაში მივიღებ?",
      answer:
        "ფოტოს დამუშავებასა და რეტუშს საშუალოდ 3-7 სამუშაო დღე სჭირდება, ვიდეოს მონტაჟს კი 5-10 სამუშაო დღე. ზუსტი ვადა გადაღების მოცულობაზეა დამოკიდებული. გადაუდებელი პროექტებისთვის სწრაფი მიწოდების ვარიანტიც გვაქვს."
    },
    {
      question: "მზა კონტენტს სოციალური მედიისთვის მოამზადებთ?",
      answer:
        "დიახ. მზა ფოტო და ვიდეო მასალას სწორ ფორმატსა და თანაფარდობაში გადმოგცემთ Instagram-ის, Facebook-ის, TikTok-ისა და YouTube-ისთვის. სურვილის შემთხვევაში, კონტენტის სრულ მართვასაც ვუზრუნველყოფთ ჩვენი ციფრული მარკეტინგის სერვისით."
    }
  ],
  en: [
    {
      question: "How much does a photo shoot cost?",
      answer:
        "Photo shoot pricing depends on what we shoot and how much material you need. We offer product, branding and commercial photography. Estimated pricing starts from 300₾. We prepare an exact quote after a free consultation, based on your goals and the number of final shots."
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
      "პროფესიონალური ფოტო და ვიდეო გადაღება, კომერციული ფოტოგრაფია, რილსები, სარეკლამო ვიდეო და დრონით (აერო) გადაღება ბრენდებისთვის. უფასო კონსულტაცია.",
    "seo.keywords":
      "ფოტო გადაღება, ვიდეო გადაღება, კომერციული ფოტოგრაფია, პროდუქტის ფოტო, რილსების გადაღება, სარეკლამო ვიდეო, დრონით გადაღება, აეროგადაღება, ვიდეო პროდუქცია, ფოტო სესია, vifa production",

    "hero.title": "ფოტო, ვიდეო და დრონით გადაღება ბრენდებისთვის.",
    "hero.description":
      "ვამზადებთ ფოტოებს, სარეკლამო ვიდეოებსა და აეროკადრებს თქვენი კამპანიისთვის.",
    "hero.cta": "უფასო კონსულტაცია",

    "intro":
      "VIFA Production აერთიანებს გადაღებას, მონტაჟსა და დრონით აეროგადაღებას. მასალას იმ პლატფორმის ფორმატში მოგიმზადებთ, სადაც გამოქვეყნებას გეგმავთ.",

    "section.services": "რას გთავაზობთ",
    "section.servicesDesc": "გადაღებასა და დამუშავებას ერთი გუნდი უძღვება.",

    "svc.photo.title": "კომერციული ფოტოგრაფია",
    "svc.photo.desc": "პროდუქტის, ინტერიერისა და კერძების ფოტოები.",
    "svc.video.title": "ვიდეო პროდუქცია & რილსები",
    "svc.video.desc": "სარეკლამო ვიდეოები, რილსები და მონტაჟი.",
    "svc.drone.title": "დრონით / აერო გადაღება",
    "svc.drone.desc": "აერო ფოტო და ვიდეო სივრცეებისთვის.",

    "question.photo": "რას მოიცავს ფოტოსესია?",
    "p.photo":
      "ვიღებთ პროდუქტის ფოტოებს ონლაინ მაღაზიისა და კატალოგისთვის, ვაწყობთ ბრენდისა და გუნდის საიმიჯო ფოტოსესიებს და ვიღებთ კერძებს, ინტერიერებსა და ღონისძიებებს. ვიყენებთ პროფესიონალურ განათებას. გადაღების შემდეგ ვაკეთებთ რეტუშსა და ფერის კორექციას და კადრებს ვამზადებთ ვებსაიტის, სოციალური ქსელის ან ბეჭდური მასალისთვის.",
    "question.video": "რას მოიცავს ვიდეოს მომზადება?",
    "p.video":
      "ვქმნით სარეკლამო, კორპორატიულ და პროდუქტის ვიდეოებს, ასევე მოკლე რილსებს Instagram-ისა და TikTok-ისთვის. სერვისი მოიცავს კონცეფციას, სცენარს, გადაღებას, მონტაჟს, ფერის კორექციას, მუსიკასა და სუბტიტრებს. ვიდეოს არჩეულ პლატფორმაზე გამოსაქვეყნებლად მოგიმზადებთ.",
    "question.drone": "რა პროექტებისთვის გამოდგება დრონით გადაღება?",
    "p.drone":
      "დრონით ვიღებთ უძრავ ქონებას, სასტუმროებს, რესტორნებს, ღონისძიებებს, მშენებლობებსა და ბუნებრივ ლანდშაფტებს. აერო ფოტო და ვიდეო სივრცის მასშტაბის ჩვენებაში გეხმარებათ. საჭიროებისას აეროკადრებს მიწისზედა გადაღებასთან ერთად ვამონტაჟებთ.",

    "section.pricing": "საორიენტაციო ფასები",
    "section.pricingDesc": "ფასი გადაღების მოცულობასა და მიზნებზეა დამოკიდებული. კონსულტაცია უფასოა.",
    "price.note": "ფასი საორიენტაციოა და ზუსტდება უფასო კონსულტაციაზე.",
    "pkg.order": "შეუკვეთე გადაღება",

    "pkg.photo.name": "ფოტო გადაღება",
    "pkg.photo.price": "300₾-დან",
    "pkg.photo.f1": "პროდუქტის ან საიმიჯო ფოტოსესია",
    "pkg.photo.f2": "პროფესიონალური განათება",
    "pkg.photo.f3": "რეტუში და ფერის კორექცია",
    "pkg.photo.f4": "მზა ფაილები საიტისა და სოც. ქსელისთვის",

    "pkg.video.name": "ვიდეო & რილსები",
    "pkg.video.price": "400₾-დან",
    "pkg.video.f1": "სარეკლამო ვიდეო ან რილსები",
    "pkg.video.f2": "გადაღება და სრული მონტაჟი",
    "pkg.video.f3": "ფერის კორექცია და სუბტიტრები",
    "pkg.video.f4": "ფორმატი Instagram / TikTok / YouTube",

    "pkg.drone.name": "დრონით გადაღება",
    "pkg.drone.price": "500₾-დან",
    "pkg.drone.f1": "აერო ფოტო და ვიდეო",
    "pkg.drone.f2": "კინემატოგრაფიული კადრები",
    "pkg.drone.f3": "უძრავი ქონება / ღონისძიება / ბუნება",
    "pkg.drone.f4": "მონტაჟი მიწისზედა კადრებთან ერთად",


  },
  en: {
    "seo.title": "Photo & Video Production | Drone Shooting",
    "seo.description":
      "Professional photo and video production, commercial photography, reels, advertising videos and drone (aerial) shooting for brands. Free consultation.",
    "seo.keywords":
      "photo shoot, video production, commercial photography, product photography, reels shooting, advertising video, drone shooting, aerial photography, photo session, vifa production",

    "hero.title": "Photo, Video & Drone Shooting for Brands.",
    "hero.description":
      "We shoot photography, advertising videos and aerial footage for your campaigns.",
    "hero.cta": "Free Consultation",

    "intro":
      "VIFA Production handles shooting, editing and aerial footage. We prepare the final files in the format required for your planned channels.",

    "section.services": "What We Offer",
    "section.servicesDesc": "One team handles the shoot and editing.",

    "svc.photo.title": "Commercial Photography",
    "svc.photo.desc": "Photography for products, interiors and food.",
    "svc.video.title": "Video Production & Reels",
    "svc.video.desc": "Advertising videos, reels and editing.",
    "svc.drone.title": "Drone / Aerial Shooting",
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

    "section.pricing": "Estimated Pricing",
    "section.pricingDesc": "Pricing depends on the scope and goals of the shoot. The consultation is free.",
    "price.note": "Price is an estimate and is finalized during a free consultation.",
    "pkg.order": "Book a Shoot",

    "pkg.photo.name": "Photo Shoot",
    "pkg.photo.price": "From 300₾",
    "pkg.photo.f1": "Product or image session",
    "pkg.photo.f2": "Professional lighting",
    "pkg.photo.f3": "Retouching and color grading",
    "pkg.photo.f4": "Ready files for web and social",

    "pkg.video.name": "Video & Reels",
    "pkg.video.price": "From 400₾",
    "pkg.video.f1": "Advertising video or reels",
    "pkg.video.f2": "Shooting and full editing",
    "pkg.video.f3": "Color grading and subtitles",
    "pkg.video.f4": "Format for Instagram / TikTok / YouTube",

    "pkg.drone.name": "Drone Shooting",
    "pkg.drone.price": "From 500₾",
    "pkg.drone.f1": "Aerial photo and video",
    "pkg.drone.f2": "Cinematic footage",
    "pkg.drone.f3": "Real estate / event / nature",
    "pkg.drone.f4": "Editing with ground footage",


  },
};

const serviceKeys = ["photo", "video", "drone"] as const;
const serviceIcons = { photo: Camera, video: Video, drone: Plane };
const heroPhotos = [foodPhoto(11), foodPhoto(2)];
const whatsappUrl =
  "https://wa.me/995577175132?text=" +
  encodeURIComponent("გამარჯობა, დავინტერესდი ფოტო/ვიდეო გადაღების სერვისით. მსურს უფასო კონსულტაცია.");

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
          offers: [
            { name: ka ? "ფოტო გადაღება" : "Photo Shoot", price: 300 },
            { name: ka ? "ვიდეო & რილსები" : "Video & Reels", price: 400 },
            { name: ka ? "დრონით გადაღება" : "Drone Shooting", price: 500 },
          ],
        }}
        breadcrumbs={breadcrumbItems}
        faq={faqItems}
      />
      <SiteNav consultationHref={whatsappUrl} activeLink={marketingHubHref}
        language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="production-title" breadcrumbs={breadcrumbItems} fullBreadcrumbsOnMobile title={t("hero.title")} description={t("hero.description")}
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
          <p className="marketing-section-copy">{t("section.servicesDesc")}</p>
          <div className="marketing-service-grid marketing-production-services">
            {serviceKeys.map(key => <MarketingServiceCard key={key} icon={serviceIcons[key]}
              title={t(`svc.${key}.title`)} body={t(`svc.${key}.desc`)} />)}
          </div>
        </section>

        <section className="it-section it-col marketing-section" aria-labelledby="production-pricing-title">
          <SectionHeading id="production-pricing-title">{t("section.pricing")}</SectionHeading>
          <div className="marketing-pricing-grid">
            {serviceKeys.map(key => <WebPackageCard key={key} title={t(`pkg.${key}.name`)}
              price={t(`pkg.${key}.price`).replace(/(?<=\d)₾/g, " ₾")} body={t("price.note")}
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
