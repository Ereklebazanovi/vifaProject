"use client";

import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaVideo,
  FaHelicopter,
  FaInstagram,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import FAQSection from "../components/FAQSection";
import type { FAQItem } from "../components/FAQSection";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

// FAQ — phrased the way Georgians actually search ("დრონით გადაღება", "რილსების გადაღება").
// The SAME items feed the visible accordion AND the FAQPage schema.
const productionFaq: Record<"ka" | "en", FAQItem[]> = {
  ka: [
    {
      question: "რა ღირს ფოტო გადაღება?",
      answer:
        "ფოტო გადაღების ფასი დამოკიდებულია გადაღების ტიპსა და მოცულობაზე — პროდუქტის ფოტო, საიმიჯო ფოტოსესია თუ კომერციული ფოტოგრაფია. საორიენტაციო ფასი იწყება 300₾-დან. ზუსტ შეთავაზებას უფასო კონსულტაციის შემდეგ მოგიმზადებთ, თქვენი მიზნებისა და კადრების რაოდენობის მიხედვით."
    },
    {
      question: "აკეთებთ რილსების და სარეკლამო ვიდეოს გადაღებას?",
      answer:
        "დიახ. ვქმნით სოციალური მედიის რილსებს, სარეკლამო ვიდეო რგოლებს, კორპორატიულ და პროდუქტის ვიდეოებს. სერვისში შედის გადაღება, მონტაჟი, ფერის კორექცია და სუბტიტრები. რილსების პაკეტი იდეალურია Instagram-ისა და TikTok-ისთვის, სადაც სტაბილური კონტენტი ბრენდის ზრდის მთავარი ბერკეტია."
    },
    {
      question: "გაქვთ დრონით (აერო) გადაღების სერვისი?",
      answer:
        "დიახ, ვუზრუნველყოფთ პროფესიონალურ დრონით გადაღებას — აერო ფოტო და ვიდეო უძრავი ქონების, ღონისძიებების, სასტუმროების, მშენებლობებისა და ბუნების კადრებისთვის. აეროგადაღება ვიდეო კონტენტს კინემატოგრაფიულ მასშტაბსა და პრემიუმ აღქმას მატებს."
    },
    {
      question: "გადაღება სტუდიაში ხდება თუ ლოკაციაზე?",
      answer:
        "ორივე ვარიანტი ხელმისაწვდომია. გვაქვს სტუდიური გადაღების შესაძლებლობა კონტროლირებადი განათებით, ასევე გამოვდივართ თქვენს ლოკაციაზე — მაღაზიაში, ოფისში, რესტორანში თუ ღია სივრცეში. ლოკაციას ერთად ვირჩევთ პროექტის კონცეფციის მიხედვით."
    },
    {
      question: "მზა მასალას რა ვადაში მივიღებ?",
      answer:
        "ფოტო მასალის დამუშავებას და რეტუშს საშუალოდ 3-7 სამუშაო დღე სჭირდება, ვიდეოს მონტაჟს კი 5-10 სამუშაო დღე — გადაღების მოცულობის მიხედვით. გადაუდებელი პროექტებისთვის სწრაფი მიწოდების ვარიანტიც გვაქვს."
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
        "Photo shoot pricing depends on the type and volume — product photography, image/branding sessions, or commercial photography. Estimated pricing starts from 300₾. We prepare an exact quote after a free consultation, based on your goals and the number of final shots."
    },
    {
      question: "Do you shoot reels and advertising videos?",
      answer:
        "Yes. We create social-media reels, advertising spots, corporate and product videos. The service includes filming, editing, color grading and subtitles. The reels package is ideal for Instagram and TikTok, where consistent content is the main lever for brand growth."
    },
    {
      question: "Do you offer drone (aerial) shooting?",
      answer:
        "Yes, we provide professional drone shooting — aerial photo and video for real estate, events, hotels, construction and nature shots. Aerial footage adds cinematic scale and a premium feel to your video content."
    },
    {
      question: "Do you shoot in a studio or on location?",
      answer:
        "Both options are available. We can shoot in a studio with controlled lighting, or come to your location — store, office, restaurant or outdoors. We choose the location together based on the project concept."
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

    "hero.overline": "ფოტო & ვიდეო პროდუქცია",
    "hero.title": "ფოტო, ვიდეო და დრონით გადაღება ბრენდებისთვის.",
    "hero.description":
      "ვქმნით მაღალი ხარისხის ვიზუალურ კონტენტს, რომელიც ბრენდს ყიდის — კომერციული ფოტოგრაფიიდან სარეკლამო ვიდეომდე და კინემატოგრაფიულ აეროგადაღებამდე.",
    "hero.cta": "უფასო კონსულტაცია",

    "intro":
      "ვიზუალი პირველი შთაბეჭდილებაა, რომელსაც თქვენი ბრენდი ტოვებს. სუსტი ფოტო და უხარისხო ვიდეო კლიენტს აშორებს, ხოლო პროფესიონალური კონტენტი ნდობას, აღქმად ღირებულებასა და გაყიდვებს ზრდის. VIFA Production აერთიანებს გადაღების, მონტაჟისა და დრონით აეროგადაღების სრულ ციკლს, რომ თქვენი პროდუქტი, სივრცე თუ მომსახურება ისე გამოიყურებოდეს, როგორც იმსახურებს — პრემიუმ დონეზე და ნებისმიერ პლატფორმაზე გასაშვებად მზად.",

    "section.services": "რას გთავაზობთ",
    "section.servicesDesc": "სრული ვიზუალური პროდუქცია ერთ სივრცეში — გადაღებიდან მზა კონტენტამდე.",

    "svc.photo.title": "კომერციული ფოტოგრაფია",
    "svc.photo.desc":
      "პროდუქტის ფოტო, საიმიჯო ფოტოსესია, ინტერიერისა და კერძების გადაღება. პროფესიონალური განათება, რეტუში და ფერის კორექცია — მზად კატალოგისთვის, საიტისა და სოციალური ქსელისთვის.",
    "svc.video.title": "ვიდეო პროდუქცია & რილსები",
    "svc.video.desc":
      "სარეკლამო ვიდეო რგოლები, კორპორატიული ვიდეო, პროდუქტის ვიდეო და სოციალური მედიის რილსები. სრული ციკლი: სცენარი, გადაღება, მონტაჟი, ფერი და სუბტიტრები.",
    "svc.drone.title": "დრონით / აერო გადაღება",
    "svc.drone.desc":
      "პროფესიონალური დრონით აერო ფოტო და ვიდეო — უძრავი ქონება, სასტუმროები, ღონისძიებები, მშენებლობა და ბუნება. კინემატოგრაფიული მასშტაბი თქვენი ბრენდის ვიდეოსთვის.",

    "section.deep": "გადაღების მიმართულებები",
    "h2.photo": "ფოტო გადაღება და კომერციული ფოტოგრაფია",
    "p.photo":
      "ვაკეთებთ პროდუქტის ფოტოს ონლაინ მაღაზიისა და კატალოგისთვის, საიმიჯო ფოტოსესიას ბრენდებისა და გუნდისთვის, ასევე კერძების, ინტერიერისა და ღონისძიების ფოტოგრაფიას. თითოეული კადრი გადის პროფესიონალურ დამუშავებას — რეტუშს, ფერის კორექციასა და სწორ ფორმატში მომზადებას, რომ ერთნაირად კარგად გამოიყურებოდეს საიტზე, სოციალურ ქსელსა და ბეჭდურ მასალაში.",
    "h2.video": "ვიდეო გადაღება, სარეკლამო ვიდეო და რილსები",
    "p.video":
      "ვიდეო დღეს ყველაზე ეფექტური ფორმატია ყურადღების მისაპყრობად. ვქმნით სარეკლამო ვიდეო რგოლებს, კორპორატიულ პრეზენტაციებს, პროდუქტის ვიდეოსა და მოკლე რილსებს Instagram-ისა და TikTok-ისთვის. სრულ სერვისში შედის კონცეფცია, გადაღება მაღალი ხარისხის ტექნიკით, მონტაჟი, ფერის კორექცია, მუსიკა და სუბტიტრები — მზა მასალა, რომელიც პირდაპირ პლატფორმაზე იტვირთება.",
    "h2.drone": "დრონით გადაღება და აეროგადაღება",
    "p.drone":
      "აერო კადრი მაშინვე ცვლის ვიდეოს აღქმას — მატებს მასშტაბსა და კინემატოგრაფიულ ხარისხს. დრონით გადაღება იდეალურია უძრავი ქონების, სასტუმროების, რესტორნების, ღონისძიებების, მშენებლობისა და ბუნებრივი ლანდშაფტებისთვის. აეროგადაღებას ვუთავსებთ მიწისზედა კადრებსა და მონტაჟს, რომ მიიღოთ სრული, დასრულებული რგოლი.",

    "section.platforms": "სად მუშაობს კონტენტი",
    "section.pricing": "საორიენტაციო ფასები",
    "section.pricingDesc": "ყველა პროექტი ინდივიდუალურია. ფასი დამოკიდებულია გადაღების მოცულობასა და მიზნებზე — კონსულტაცია უფასოა.",
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

    "related.title": "დაკავშირებული სერვისები",
    "related.marketing": "ციფრული მარკეტინგი",
    "related.web": "ვებსაიტის დამზადება",

    "cta.title": "მზად ხარ პრემიუმ ვიზუალური კონტენტისთვის?",
    "cta.button": "დაგვიკავშირდი WhatsApp-ზე",
  },
  en: {
    "seo.title": "Photo & Video Production | Drone Shooting",
    "seo.description":
      "Professional photo and video production, commercial photography, reels, advertising videos and drone (aerial) shooting for brands. Free consultation.",
    "seo.keywords":
      "photo shoot, video production, commercial photography, product photography, reels shooting, advertising video, drone shooting, aerial photography, photo session, vifa production",

    "hero.overline": "Photo & Video Production",
    "hero.title": "Photo, Video & Drone Shooting for Brands.",
    "hero.description":
      "We create high-quality visual content that sells your brand — from commercial photography to advertising video and cinematic aerial footage.",
    "hero.cta": "Free Consultation",

    "intro":
      "Visuals are the first impression your brand makes. Weak photos and low-quality video push customers away, while professional content builds trust, perceived value and sales. VIFA Production combines the full cycle of shooting, editing and aerial drone footage so your product, space or service looks exactly as it deserves — premium, and ready to publish on any platform.",

    "section.services": "What We Offer",
    "section.servicesDesc": "Full visual production in one place — from the shoot to ready-to-publish content.",

    "svc.photo.title": "Commercial Photography",
    "svc.photo.desc":
      "Product photography, image/branding sessions, interior and food shoots. Professional lighting, retouching and color grading — ready for catalogs, websites and social media.",
    "svc.video.title": "Video Production & Reels",
    "svc.video.desc":
      "Advertising spots, corporate video, product video and social-media reels. Full cycle: script, shooting, editing, color and subtitles.",
    "svc.drone.title": "Drone / Aerial Shooting",
    "svc.drone.desc":
      "Professional aerial photo and video — real estate, hotels, events, construction and nature. Cinematic scale for your brand video.",

    "section.deep": "Shooting Directions",
    "h2.photo": "Photo Shoots & Commercial Photography",
    "p.photo":
      "We shoot product photography for online stores and catalogs, image sessions for brands and teams, as well as food, interior and event photography. Every shot goes through professional processing — retouching, color grading and correct formatting — so it looks equally great on a website, social media and in print.",
    "h2.video": "Video Production, Advertising Videos & Reels",
    "p.video":
      "Video is the most effective format for capturing attention today. We create advertising spots, corporate presentations, product video and short reels for Instagram and TikTok. The full service includes concept, shooting with high-quality equipment, editing, color grading, music and subtitles — ready material that uploads straight to the platform.",
    "h2.drone": "Drone Shooting & Aerial Footage",
    "p.drone":
      "An aerial shot instantly changes how a video is perceived — adding scale and cinematic quality. Drone shooting is ideal for real estate, hotels, restaurants, events, construction and natural landscapes. We combine aerial with ground footage and editing to deliver a complete, finished video.",

    "section.platforms": "Where the Content Works",
    "section.pricing": "Estimated Pricing",
    "section.pricingDesc": "Every project is unique. Pricing depends on the scope and goals of the shoot — the consultation is free.",
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

    "related.title": "Related Services",
    "related.marketing": "Digital Marketing",
    "related.web": "Website Development",

    "cta.title": "Ready for premium visual content?",
    "cta.button": "Contact us on WhatsApp",
  },
};

const Production: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const ka = currentLanguage !== "en";

  const whatsappUrl =
    "https://wa.me/995577175132?text=" +
    encodeURIComponent("გამარჯობა, დავინტერესდი ფოტო/ვიდეო გადაღების სერვისით. მსურს უფასო კონსულტაცია.");

  const t = (key: string): string => {
    const translations = productionTranslations[
      currentLanguage as keyof typeof productionTranslations
    ] as Record<string, string>;
    return translations[key] || key;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { icon: <FaCamera />, title: t("svc.photo.title"), desc: t("svc.photo.desc") },
    { icon: <FaVideo />, title: t("svc.video.title"), desc: t("svc.video.desc") },
    { icon: <FaHelicopter />, title: t("svc.drone.title"), desc: t("svc.drone.desc") },
  ];

  const deepSections = [
    { h: t("h2.photo"), p: t("p.photo") },
    { h: t("h2.video"), p: t("p.video") },
    { h: t("h2.drone"), p: t("p.drone") },
  ];

  const packages = [
    {
      key: "photo",
      icon: <FaCamera />,
      name: t("pkg.photo.name"),
      price: t("pkg.photo.price"),
      features: [t("pkg.photo.f1"), t("pkg.photo.f2"), t("pkg.photo.f3"), t("pkg.photo.f4")],
    },
    {
      key: "video",
      icon: <FaVideo />,
      name: t("pkg.video.name"),
      price: t("pkg.video.price"),
      features: [t("pkg.video.f1"), t("pkg.video.f2"), t("pkg.video.f3"), t("pkg.video.f4")],
    },
    {
      key: "drone",
      icon: <FaHelicopter />,
      name: t("pkg.drone.name"),
      price: t("pkg.drone.price"),
      features: [t("pkg.drone.f1"), t("pkg.drone.f2"), t("pkg.drone.f3"), t("pkg.drone.f4")],
    },
  ];

  const platforms = [
    { icon: <FaInstagram />, name: "Instagram" },
    { icon: <FaVideo />, name: "TikTok" },
    { icon: <FaVideo />, name: "YouTube" },
    { icon: <FaCamera />, name: "Facebook" },
  ];

  const faqItems = productionFaq[ka ? "ka" : "en"];

  const breadcrumbItems = [
    { name: ka ? "მთავარი" : "Home", url: "https://vifadigital.ge/" },
    { name: ka ? "ციფრული მარკეტინგი" : "Digital Marketing", url: "https://vifadigital.ge/services/marketing" },
    { name: ka ? "ფოტო & ვიდეო პროდუქცია" : "Photo & Video Production", url: "https://vifadigital.ge/services/production" },
  ];

  return (
    <div className={`bg-[#060608] min-h-screen text-white ${getTransitionClasses()}`}>
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

      {/* ── Hero ── */}
      <section className="relative min-h-[72vh] w-full flex items-center overflow-hidden pt-32 pb-16 lg:pt-0 lg:pb-0">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_55%_at_60%_-5%,rgba(99,102,241,0.08)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060608] to-transparent z-0" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Breadcrumbs items={breadcrumbItems} className="mb-5" />
            <span className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-indigo-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
                {t("hero.overline")}
              </span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug lg:leading-[1.15] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 max-w-xl">
              {t("hero.description")}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors duration-300"
            >
              {t("hero.cta")}
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* ── Intro lead ── */}
        <section className="mb-24 max-w-3xl">
          <p className="font-georgian-body text-lg leading-[1.85] text-gray-200 md:text-xl">
            {t("intro")}
          </p>
        </section>

        {/* ── Services Grid ── */}
        <section className="mb-28">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">{t("section.services")}</h2>
            <p className="text-gray-400 max-w-xl">{t("section.servicesDesc")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-colors flex flex-col"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400">
                  {s.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="font-georgian-body text-gray-400 text-sm leading-[1.8]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Deep H2 content (keyword landing) ── */}
        <section className="mb-28">
          <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
            <span className="h-px w-8 bg-indigo-500" />
            {t("section.deep")}
          </span>
          <div className="mt-4 max-w-3xl space-y-12">
            {deepSections.map((sec) => (
              <div key={sec.h}>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-[1.75rem] md:leading-snug">
                  {sec.h}
                </h2>
                <p className="font-georgian-body text-[15px] leading-[1.9] text-gray-400 md:text-base">
                  {sec.p}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing (estimates) ── */}
        <section className="mb-28">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">{t("section.pricing")}</h2>
            <p className="text-gray-400">{t("section.pricingDesc")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.key}
                className="bg-white/[0.02] p-8 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-colors flex flex-col"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl text-indigo-400">
                  {pkg.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                <div className="text-3xl font-black text-indigo-400 mb-1 mt-3">{pkg.price}</div>
                <div className="text-xs text-gray-500 mb-8">{t("price.note")}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FaCheckCircle className="text-xs mt-1 text-indigo-500" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 px-4 rounded-xl border border-white/15 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 mt-auto"
                >
                  {t("pkg.order")}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Platforms ── */}
        <section className="mb-28">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight">{t("section.platforms")}</h2>
          </div>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="px-6 py-4 rounded-full border border-white/10 bg-white/[0.02] flex items-center gap-3"
              >
                <span className="text-indigo-400">{p.icon}</span>
                <span className="text-gray-300 text-sm font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related services (internal links — completes the cluster, no navbar) ── */}
        <section className="mb-28 border-t border-white/10 pt-16">
          <h2 className="mb-8 text-xl font-bold tracking-tight md:text-2xl">{t("related.title")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/services/marketing"
              className="group flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5 transition-colors hover:border-indigo-500/60"
            >
              <span className="text-[15px] font-semibold text-white">{t("related.marketing")}</span>
              <ArrowRight className="h-4 w-4 text-indigo-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services/web"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
            >
              <span className="text-[15px] font-medium text-gray-200">{t("related.web")}</span>
              <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* ── FAQ (visible — matches FAQPage schema) ── */}
        <FAQSection
          items={faqItems}
          eyebrow="FAQ"
          title={ka ? "ხშირად დასმული კითხვები" : "Frequently Asked Questions"}
        />

        {/* ── CTA ── */}
        <section className="border-t border-white/10 pt-16 mt-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
              {t("cta.title")}
            </h2>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              <FaWhatsapp className="text-lg" />
              {t("cta.button")}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Production;
