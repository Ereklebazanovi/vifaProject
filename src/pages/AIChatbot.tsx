"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  FaBatteryFull,
  FaBrain,
  FaCamera,
  FaCheck,
  FaChevronLeft,
  FaCloud,
  FaFacebookMessenger,
  FaGlobe,
  FaImage,
  FaInstagram,
  FaMicrophone,
  FaPhoneAlt,
  FaPlusCircle,
  FaShieldAlt,
  FaSignal,
  FaThumbsUp,
  FaVideo,
  FaWhatsapp,
  FaWifi,
} from "react-icons/fa";
import SEO from "../components/SEO";
import CallbackLink from "../components/CallbackLink";
import FAQSection from "../components/FAQSection";

// Editorial layout: hairlines and type, section labels in the site's own "03/" style.
// No glows, dot grids or gradient text.

/** Label on the left (desktop), title and lead on the right: the same rhythm for every section. */
const SectionTitle = ({ n, label, title, text }: { n: string; label: string; title: string; text?: string }) => (
  <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 lg:col-span-4 lg:pt-3">
      <span className="text-indigo-400">{n}/</span> {label}
    </p>
    <div className="lg:col-span-8">
      <h2 className="text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-white md:text-[2.4rem]">{title}</h2>
      {text && <p className="font-georgian-body mt-4 text-base leading-relaxed text-gray-400 md:text-[17px]">{text}</p>}
    </div>
  </div>
);

type T = (key: string) => string;

/** "7-14", "500₾-დან": a non-breaking hyphen, so big type never breaks a line there. */
const keepTogether = (s: string) => s.replace(/-/g, "‑");

// The phone plays these in turn. Odd lines are the customer, even lines the page's assistant.
const SCENARIOS = [
  { id: "shop", n: 6 },
  { id: "clinic", n: 6 },
  { id: "rent", n: 6 },
  { id: "salon", n: 6 },
] as const;

// Messenger's own colors, so the screen reads as the real app.
const MESSENGER_BLUE = "#0084FF";

/** One conversation, line by line, with the typing bubble before each reply; onDone a while after the end. */
const Conversation = ({ t, id, n, onDone }: { t: T; id: string; n: number; onDone: () => void }) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? n : 0);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    if (shown >= n) {
      const timer = setTimeout(() => done.current(), reduce ? 10000 : 5000);
      return () => clearTimeout(timer);
    }
    const reply = shown % 2 === 1;
    const timer = setTimeout(() => setShown((s) => s + 1), reply ? 1500 : shown === 0 ? 700 : 1100);
    return () => clearTimeout(timer);
  }, [shown, n, reduce]);

  // The customer just wrote and the reply is on its way.
  const typing = shown < n && shown % 2 === 1;
  const avatar = (
    <span className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E4E6EB] text-[11px] font-bold text-[#050505]">
      {t(`chat.${id}.name`).slice(0, 1)}
    </span>
  );

  return (
    <div className="flex h-full flex-col justify-end gap-1.5">
      <p className="mb-2 text-center text-[11px] font-medium text-[#65676B]">{t(`chat.${id}.stamp`)}</p>
      {Array.from({ length: shown }, (_, i) => {
        const page = i % 2 === 1;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex items-end gap-2 ${page ? "justify-start" : "justify-end"}`}
          >
            {page && avatar}
            <p
              // Inline: the site's global `* { max-width: 100% }` beats Tailwind's max-w classes.
              style={{ maxWidth: "78%", ...(page ? {} : { background: MESSENGER_BLUE }) }}
              className={`rounded-[18px] px-3 py-[7px] text-[14.5px] leading-[1.35] ${page ? "bg-[#F0F0F0] text-[#050505]" : "text-white"}`}
            >
              {t(`chat.${id}.m${i + 1}`)}
            </p>
          </motion.div>
        );
      })}
      {typing && (
        <div className="flex items-end gap-2">
          {avatar}
          <span className="flex gap-1 rounded-[18px] bg-[#F0F0F0] px-3.5 py-3" aria-hidden>
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-[#8A8D91]"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
              />
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

/** An iPhone with Messenger open on a business page. Tabs switch the business; it also moves on by itself. */
const MessengerPhone = ({ t }: { t: T }) => {
  const [sc, setSc] = useState(0);
  const s = SCENARIOS[sc];
  const next = useCallback(() => setSc((v) => (v + 1) % SCENARIOS.length), []);
  const name = t(`chat.${s.id}.name`);
  return (
    <div className="mx-auto w-[min(100%,22.5rem)]">
      <div className="rounded-[3.1rem] bg-[#1b1b1e] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        <div className="georgian-readable relative overflow-hidden rounded-[2.5rem] bg-white text-[#050505]">
          <span aria-hidden className="absolute left-1/2 top-2.5 h-6.5 w-23 -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-7 pb-1.5 pt-3.5 text-[13px] font-semibold">
            <span>{t(`chat.${s.id}.time`)}</span>
            <span className="flex items-center gap-1.5 text-[12px]" aria-hidden>
              <FaSignal />
              <FaWifi />
              <FaBatteryFull className="text-[15px]" />
            </span>
          </div>
          <div className="flex items-center gap-2.5 border-b border-black/6 px-3 py-2">
            <FaChevronLeft className="text-[15px]" style={{ color: MESSENGER_BLUE }} aria-hidden />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4E6EB] text-sm font-bold">{name.slice(0, 1)}</span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[15px] font-semibold">{name}</p>
              <p className="truncate text-[11.5px] text-[#65676B]">{t("chat.status")}</p>
            </div>
            <span className="flex items-center gap-4 pr-1 text-[15px]" style={{ color: MESSENGER_BLUE }} aria-hidden>
              <FaPhoneAlt />
              <FaVideo className="text-[17px]" />
            </span>
          </div>
          <div className="h-100 overflow-hidden px-3 py-3 [mask-image:linear-gradient(to_bottom,transparent,black_10%)]">
            <Conversation key={sc} t={t} id={s.id} n={s.n} onDone={next} />
          </div>
          <div className="flex items-center gap-3 px-3 pb-2 pt-1.5 text-[18px]" style={{ color: MESSENGER_BLUE }} aria-hidden>
            <FaPlusCircle />
            <FaCamera />
            <FaImage />
            <FaMicrophone />
            <span className="flex-1 rounded-full bg-[#F0F0F0] px-3 py-1.5 text-[14px] text-[#65676B]">Aa</span>
            <FaThumbsUp />
          </div>
          <span aria-hidden className="mx-auto mb-2 mt-1.5 block h-1.25 w-30 rounded-full bg-black" />
        </div>
      </div>
      <div role="tablist" className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {SCENARIOS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={i === sc}
            onClick={() => setSc(i)}
            className={`border-b pb-1 text-[13px] font-semibold transition-colors ${
              i === sc ? "border-white text-white" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {t(`chat.${x.id}.label`)}
          </button>
        ))}
      </div>
    </div>
  );
};

// AI Chatbot Translations
const aiChatbotTranslations = {
  ka: {
    "seo.title": "ჩატბოტი და AI ბოტის დამზადება ბიზნესისთვის, 500₾-დან",
    "seo.description": "AI ჩატბოტის დამზადება Facebook Messenger-ის, WhatsApp-ის, Instagram-ისა და ვებსაიტისთვის. ჩატ ბოტი ქართულად პასუხობს კლიენტებს 24/7. ფასი 500₾-დან, გაშვება 7-14 დღეში.",

    "hero.titleHighlight": "ჩატბოტის დამზადება 7-14 დღეში",
    "hero.lead": "AI ასისტენტმა თქვენს Facebook გვერდზე იცის თქვენი ფასები, მარაგი და მიწოდების პირობები. კლიენტს წამებში პასუხობს, შეკვეთას კი ნომრით და მისამართით გიტოვებთ.",
    "hero.fact1.value": "24/7",
    "hero.fact1.label": "ღამითაც პასუხობს",
    "hero.fact2.value": "7-14 დღე",
    "hero.fact2.label": "გაშვებამდე",
    "hero.fact3.value": "500₾-დან",
    "hero.fact3.label": "ერთჯერადად",

    "chat.status": "პასუხობს წამებში",
    "chat.shop.label": "მაღაზია",
    "chat.shop.name": "Lumi Store",
    "chat.shop.time": "3:12",
    "chat.shop.stamp": "დღეს, 03:12",
    "chat.shop.m1": "გამარჯობა, ეს კაბა M ზომაში გაქვთ?",
    "chat.shop.m2": "გამარჯობა! კი, M ზომა მარაგშია, ფასი 89₾.",
    "chat.shop.m3": "თბილისში მიტანა რა ღირს?",
    "chat.shop.m4": "5₾, 1-2 დღეში მოგიტანთ. შეკვეთისთვის დამიტოვეთ ნომერი და მისამართი.",
    "chat.shop.m5": "555 12 34 56, ვაკე, ჭავჭავაძის 10",
    "chat.shop.m6": "მადლობა! შეკვეთა მიღებულია, დილით დაგირეკავთ დასადასტურებლად.",
    "chat.clinic.label": "კლინიკა",
    "chat.clinic.name": "Lumi Dental",
    "chat.clinic.time": "23:40",
    "chat.clinic.stamp": "დღეს, 23:40",
    "chat.clinic.m1": "გამარჯობა, კბილის წმენდა რა ღირს?",
    "chat.clinic.m2": "გამარჯობა! პროფესიული წმენდა 80₾-ია და დაახლოებით 40 წუთი გრძელდება.",
    "chat.clinic.m3": "ხვალ საღამოს თავისუფალი დრო გაქვთ?",
    "chat.clinic.m4": "ხვალ 18:00 და 19:30 თავისუფალია. რომელი გირჩევნიათ?",
    "chat.clinic.m5": "18:00, ნინო ბერიძე, 555 12 34 56",
    "chat.clinic.m6": "ჩაგწერეთ ხვალ 18:00-ზე. გელოდებით!",
    "chat.rent.label": "გაქირავება",
    "chat.rent.name": "Lumi Cars",
    "chat.rent.time": "7:15",
    "chat.rent.stamp": "დღეს, 07:15",
    "chat.rent.m1": "Hi! Do you have an SUV for 5 days from Friday?",
    "chat.rent.m2": "Hi! Yes, a Toyota RAV4 is free: 120₾ a day, full insurance included.",
    "chat.rent.m3": "Can you bring it to the airport?",
    "chat.rent.m4": "Sure, airport delivery is free. Just send your name and flight time.",
    "chat.rent.m5": "John Smith, landing at 14:30",
    "chat.rent.m6": "Booked! The car will wait for you at Tbilisi Airport on Friday, 14:30.",
    "chat.salon.label": "სალონი",
    "chat.salon.name": "Lumi Beauty",
    "chat.salon.time": "22:05",
    "chat.salon.stamp": "შაბ, 22:05",
    "chat.salon.m1": "გელ-ლაქით მანიკიური რა ღირს?",
    "chat.salon.m2": "გამარჯობა! გელ-ლაქით მანიკიური 45₾-ია, დიზაინით 55₾.",
    "chat.salon.m3": "კვირას მუშაობთ?",
    "chat.salon.m4": "კი, კვირას 11:00-დან 19:00-მდე. დაგიჯავშნოთ?",
    "chat.salon.m5": "კი, 13:00-ზე, ანა, 555 12 34 56",
    "chat.salon.m6": "მზადაა: კვირა, 13:00. გელოდებით!",

    "log.label": "ერთი ღამე",
    "log.title": "შეკვეთა, რომელიც ღამის სამ საათზე შემოვიდა",
    "log.text": "მაღაზია დაკეტილია, გუნდს სძინავს. ასე მიდის საუბარი, როცა ასისტენტი ჩართულია.",
    "log.r1.time": "03:12",
    "log.r1.text": "კლიენტი კითხულობს, აქვთ თუ არა კაბა M ზომაში. ასისტენტი პასუხობს: მარაგშია, ფასი 89₾.",
    "log.r2.time": "03:13",
    "log.r2.text": "კლიენტი კითხულობს მიტანის ფასს. ასისტენტი პასუხობს: თბილისში 5₾, 1-2 დღეში.",
    "log.r3.time": "03:14",
    "log.r3.text": "კლიენტი ტოვებს ნომერს და მისამართს. ასისტენტი შეკვეთას იწერს.",
    "log.r4.time": "09:00",
    "log.r4.text": "გუნდი სამსახურში მოდის. შეკვეთა უკვე სიაშია, რჩება მხოლოდ დარეკვა და დადასტურება.",

    "qa.label": "კითხვები",
    "qa.title": "კითხვები, რომლებზეც ყოველდღე პასუხობთ",
    "qa.text": "პასუხები თქვენი ინფორმაციიდან მოდის: ფასები, მარაგი, სამუშაო საათები, მისამართი.",
    "qa.q1": "M ზომა გაქვთ?",
    "qa.a1": "კი, M მარაგშია. ფასი 89₾.",
    "qa.q2": "მიტანა რამდენია?",
    "qa.a2": "თბილისში 5₾, 1-2 დღეში.",
    "qa.q3": "რომლამდე მუშაობთ?",
    "qa.a3": "ყოველდღე, 10:00-დან 20:00-მდე.",
    "qa.q4": "განვადებით შეიძლება?",
    "qa.a4": "კი, ბანკის განვადებით. განაცხადის ბმულს ახლავე გამოგიგზავნით.",
    "qa.q5": "ხვალ ჩაწერა შეიძლება?",
    "qa.a5": "ხვალ 12:00 და 15:30 თავისუფალია. რომელი გირჩევნიათ?",
    "qa.q6": "სად მდებარეობთ?",
    "qa.a6": "ვაკე, ჭავჭავაძის 10. რუკას ახლავე გამოგიგზავნით.",

    "platforms.label": "არხები",
    "platforms.title": "ინტეგრაცია ყველა მთავარ პლატფორმაზე",
    "platforms.subtitle": "ოთხივე არხი ერთ ცოდნის ბაზას იყენებს. ფასს ერთხელ ცვლით და ყველგან ერთნაირად იცვლება.",
    "platform.facebook.name": "Messenger",
    "platform.facebook.text": "შეტყობინებები თქვენს Facebook გვერდზე.",
    "platform.whatsapp.name": "WhatsApp Business",
    "platform.whatsapp.text": "თქვენი WhatsApp Business ნომერი.",
    "platform.instagram.name": "Instagram Direct",
    "platform.instagram.text": "Instagram-ის პირადი შეტყობინებები.",
    "platform.web.name": "ვებსაიტი",
    "platform.web.text": "ჩატის ფანჯარა საიტის კუთხეში.",

    "admin.label": "მართვა",
    "admin.title": "ადმინ პანელი: სრული კონტროლი",
    "admin.text": "ფასი შეიცვალა ან ახალი პროდუქტი შემოვიდა? ჩაწერეთ პანელში და ასისტენტი მომდევნო პასუხშივე ახალ ინფორმაციას გამოიყენებს.",
    "admin.point1": "ფასები, პროდუქტები და კითხვა-პასუხები ერთ ადგილას",
    "admin.point2": "საუბრების ისტორია და დეტალური ანალიტიკა",
    "admin.point3": "ბრაუზერიდან, პროგრამისტის გარეშე",
    "admin.mock.title": "ცოდნის ბაზა",
    "admin.mock.row1.k": "მიტანა თბილისში",
    "admin.mock.row1.v": "5₾",
    "admin.mock.row2.k": "სამუშაო საათები",
    "admin.mock.row2.v": "10:00-20:00",
    "admin.mock.row3.k": "ფასდაკლება",
    "admin.mock.row3.v": "20% ფეხსაცმელზე",
    "admin.mock.saved": "შენახულია",

    "how.label": "პროცესი",
    "how.title": "გაშვება 7-14 დღეში",
    "how.step": "ნაბიჯი",
    "how.step1.title": "გვიზიარებთ ინფორმაციას",
    "how.step1.text": "ფასები, პროდუქტები, მიწოდების პირობები და კითხვები, რომლებსაც კლიენტები ყველაზე ხშირად სვამენ.",
    "how.step2.title": "ვასწავლით და ვამოწმებთ",
    "how.step2.text": "ასისტენტს თქვენს ბიზნესზე ვამზადებთ და ერთად ვცდით, სანამ ყველა პასუხი ზუსტი არ იქნება.",
    "how.step3.title": "ირთვება თქვენს გვერდზე",
    "how.step3.text": "პასუხობს დღე-ღამე, ინფორმაციას კი თავად ანახლებთ პანელიდან.",

    "pricing.label": "ფასი",
    "pricing.title": "ფასი და ყოველთვიური ხარჯი",
    "pricing.description": "ერთხელ იხდით გაშვებას, შემდეგ კი მხოლოდ AI-ს რეალურ მოხმარებას. დამალული გადასახადი არ არის.",
    "pricing.investment.title": "გაშვება",
    "pricing.investment.price": "500₾-დან",
    "pricing.investment.priceNote": "ერთჯერადად. ზუსტი ფასი დამოკიდებულია მოთხოვნებზე.",
    "pricing.investment.includes": "მოიცავს:",
    "pricing.investment.feature1": "AI-ს მომზადებას თქვენი ბიზნესის ინფორმაციაზე",
    "pricing.investment.feature2": "Messenger-თან, WhatsApp-თან და სხვა არხებთან დაკავშირებას",
    "pricing.investment.feature3": "ადმინ პანელს, საიდანაც ინფორმაციას თავად ცვლით",
    "pricing.investment.feature4": "ანალიტიკას და სტატისტიკას",
    "pricing.investment.feature5": "საწყის ტექნიკურ მხარდაჭერას, უფასოდ",

    "pricing.monthly.title": "ყოველთვიურად",
    "pricing.monthly.price": "5₾-დან",
    "pricing.monthly.priceNote": "Google Gemini-ს მოხმარება, საუბრების რაოდენობის მიხედვით.",
    "pricing.monthly.note": "ყოველთვიურად მიიღებთ ანგარიშს, რამდენი დაიხარჯა.",
    "pricing.examples.small": "მცირე ბიზნესი",
    "pricing.examples.smallQueries": "500 საუბარი თვეში",
    "pricing.examples.smallCost": "5-10₾",
    "pricing.examples.medium": "საშუალო ბიზნესი",
    "pricing.examples.mediumQueries": "2,000 საუბარი თვეში",
    "pricing.examples.mediumCost": "20-35₾",
    "pricing.examples.large": "დიდი ბიზნესი",
    "pricing.examples.largeQueries": "10,000 საუბარი თვეში",
    "pricing.examples.largeCost": "100-160₾",

    "technical.label": "ტექნოლოგია",
    "technical.title": "რაზე დგას ასისტენტი",
    "technical.feature1.title": "Google Gemini",
    "technical.feature1.text": "ბუნებრივი ქართული და საუბრის კონტექსტის დამახსოვრება.",
    "technical.feature2.title": "Google Cloud",
    "technical.feature2.text": "მუშაობს დღე-ღამე და ათასობით საუბარს ერთდროულად უძლებს.",
    "technical.feature3.title": "უსაფრთხოება",
    "technical.feature3.text": "მონაცემები დაშიფრულია, GDPR-ის მოთხოვნების დაცვით.",

    "faq.title": "ხშირად დასმული შეკითხვები",
    "faq.q1.question": "რამდენ დროს მოითხოვს ჩატბოტის გაშვება?",
    "faq.q1.answer": "7-14 სამუშაო დღე.",
    "faq.q1.details": "მზა AI ასისტენტს მიიღებთ 7-14 სამუშაო დღეში. ზუსტი ვადები დამოკიდებულია თქვენი ბიზნესის სირთულესა და საჭირო ინტეგრაციების რაოდენობაზე.",

    "faq.q2.question": "შესაძლებელია თუ არა კონტენტის შეცვლა გაშვების შემდეგ?",
    "faq.q2.answer": "დიახ, ნებისმიერ დროს, რეალურ დროში.",
    "faq.q2.details": "თქვენ შეგიძლიათ თავად დაარედაქტიროთ AI-ს ცოდნის ბაზა და პასუხები თქვენი ადმინ პანელიდან. ცვლილებები ძალაში შედის მომენტალურად.",

    "faq.q3.question": "რა მოხდება Google API-ის გადახდის შეფერხების შემთხვევაში?",
    "faq.q3.answer": "თქვენი მონაცემები სრულად შენარჩუნდება.",
    "faq.q3.details": "Google-ის წესების მიხედვით, ჩატბოტი დროებით შეწყვეტს მუშაობას, თუმცა თქვენი ყველა მონაცემი და სისტემის გამართვა სრულად და უსაფრთხოდ შეინახება.",

    "faq.q4.question": "არის თუ არა შესაძლებელი ვებსაიტზე ინტეგრაცია?",
    "faq.q4.answer": "რა თქმა უნდა",
    "faq.q4.details": "ვებსაიტის Live Chat Widget-ის ინტეგრაცია ხელმისაწვდომია, ზუსტად იმავე პრინციპით როგორც facebook messenger-ში.",

    "faq.q5.question": "რამდენ ენაზე შეუძლია AI-ს საუბარი?",
    "faq.q5.answer": "ძირითადად, ქართულად და ინგლისურად.",
    "faq.q5.details": "AI-ს აქვს მრავალენოვანი შესაძლებლობები. ჩვენ ტრენინგს ვატარებთ ძირითადად ქართულ და ინგლისურ ენებზე, მაგრამ საჭიროების შემთხვევაში, დამატებითი ენების სწავლება შესაძლებელია.",

    "faq.q6.question": "რა ღირს AI ჩატბოტის დამზადება?",
    "faq.q6.answer": "ერთჯერადი ღირებულება 500₾-დან.",
    "faq.q6.details": "ზუსტი ფასი დამოკიდებულია ბოტის სირთულესა და ინტეგრაციების რაოდენობაზე. გაშვების შემდეგ იხდით მხოლოდ AI-ს გამოყენების ხარჯს, რომელიც მცირე ბიზნესისთვის თვეში დაახლოებით 5₾-დან 10₾-მდეა.",

    "faq.q7.question": "რით განსხვავდება AI ჩატბოტი ჩვეულებრივი ჩატ ბოტისგან?",
    "faq.q7.answer": "AI ბოტს ესმის თავისუფლად დაწერილი შეკითხვა.",
    "faq.q7.details": "ჩვეულებრივი ჩატ ბოტი მხოლოდ წინასწარ გაწერილ ღილაკებსა და სიტყვებზე რეაგირებს. AI ჩატბოტი თქვენი ბიზნესის ინფორმაციაზეა დატრენინგებული, ესმის ქართულად ნებისმიერად დაწერილი კითხვა და პასუხობს ბუნებრივად, როგორც ცოცხალი ოპერატორი.",

    "cta.question": "ვნახოთ, როგორ იმუშავებს თქვენს გვერდზე",
    "cta.text": "უფასო კონსულტაციაზე გაჩვენებთ, როგორ უპასუხებდა ასისტენტი თქვენს კლიენტებს.",
    "cta.button": "უფასო კონსულტაცია",
    "cta.order": "შეუკვეთეთ AI ჩატბოტი",
    "consultation.whatsapp": "უფასო კონსულტაცია",
    "phone.number": "557 62 42 43",
  },
    en: {
    "seo.title": "AI Chatbot for Business",
    "seo.description": "VIFA Digital AI chatbots for Facebook, WhatsApp, and Instagram. 24/7 customer support, sales growth, and cost optimization.",

    "hero.titleHighlight": "Built and launched in 7-14 days",
    "hero.lead": "An AI assistant on your Facebook page that knows your prices, stock and delivery terms. It answers customers in seconds and leaves you the order with a phone number and address.",
    "hero.fact1.value": "24/7",
    "hero.fact1.label": "Answers at night too",
    "hero.fact2.value": "7-14 days",
    "hero.fact2.label": "To launch",
    "hero.fact3.value": "From 500₾",
    "hero.fact3.label": "One-time",

    "chat.status": "Replies within seconds",
    "chat.shop.label": "Shop",
    "chat.shop.name": "Lumi Store",
    "chat.shop.time": "3:12",
    "chat.shop.stamp": "Today, 03:12",
    "chat.shop.m1": "Hi, do you have this dress in size M?",
    "chat.shop.m2": "Hi! Yes, size M is in stock, the price is 89₾.",
    "chat.shop.m3": "How much is delivery in Tbilisi?",
    "chat.shop.m4": "5₾, delivered in 1-2 days. To order, just leave your number and address.",
    "chat.shop.m5": "555 12 34 56, Vake, Chavchavadze 10",
    "chat.shop.m6": "Thank you! Your order is in, we will call you in the morning to confirm.",
    "chat.clinic.label": "Clinic",
    "chat.clinic.name": "Lumi Dental",
    "chat.clinic.time": "23:40",
    "chat.clinic.stamp": "Today, 23:40",
    "chat.clinic.m1": "Hi, how much is a teeth cleaning?",
    "chat.clinic.m2": "Hi! A professional cleaning is 80₾ and takes about 40 minutes.",
    "chat.clinic.m3": "Do you have time tomorrow evening?",
    "chat.clinic.m4": "Tomorrow 18:00 and 19:30 are free. Which one suits you?",
    "chat.clinic.m5": "18:00, Nino Beridze, 555 12 34 56",
    "chat.clinic.m6": "You are booked for tomorrow at 18:00. See you then!",
    "chat.rent.label": "Car rental",
    "chat.rent.name": "Lumi Cars",
    "chat.rent.time": "7:15",
    "chat.rent.stamp": "Today, 07:15",
    "chat.rent.m1": "Hi! Do you have an SUV for 5 days from Friday?",
    "chat.rent.m2": "Hi! Yes, a Toyota RAV4 is free: 120₾ a day, full insurance included.",
    "chat.rent.m3": "Can you bring it to the airport?",
    "chat.rent.m4": "Sure, airport delivery is free. Just send your name and flight time.",
    "chat.rent.m5": "John Smith, landing at 14:30",
    "chat.rent.m6": "Booked! The car will wait for you at Tbilisi Airport on Friday, 14:30.",
    "chat.salon.label": "Salon",
    "chat.salon.name": "Lumi Beauty",
    "chat.salon.time": "22:05",
    "chat.salon.stamp": "Sat, 22:05",
    "chat.salon.m1": "How much is a gel manicure?",
    "chat.salon.m2": "Hi! A gel manicure is 45₾, with a design 55₾.",
    "chat.salon.m3": "Are you open on Sunday?",
    "chat.salon.m4": "Yes, on Sunday from 11:00 to 19:00. Shall I book you in?",
    "chat.salon.m5": "Yes, 13:00, Ana, 555 12 34 56",
    "chat.salon.m6": "Done: Sunday, 13:00. See you then!",

    "log.label": "One night",
    "log.title": "An order that came in at three in the morning",
    "log.text": "The shop is closed and the team is asleep. This is how the conversation goes with the assistant switched on.",
    "log.r1.time": "03:12",
    "log.r1.text": "The customer asks whether the dress comes in size M. The assistant answers: in stock, 89₾.",
    "log.r2.time": "03:13",
    "log.r2.text": "The customer asks about delivery. The assistant answers: 5₾ in Tbilisi, within 1-2 days.",
    "log.r3.time": "03:14",
    "log.r3.text": "The customer leaves a number and an address. The assistant takes down the order.",
    "log.r4.time": "09:00",
    "log.r4.text": "The team comes in. The order is already on the list, all that is left is a call to confirm.",

    "qa.label": "Questions",
    "qa.title": "Questions you answer every day",
    "qa.text": "The answers come from your own information: prices, stock, opening hours, address.",
    "qa.q1": "Do you have size M?",
    "qa.a1": "Yes, M is in stock. The price is 89₾.",
    "qa.q2": "How much is delivery?",
    "qa.a2": "5₾ in Tbilisi, within 1-2 days.",
    "qa.q3": "Until when are you open?",
    "qa.a3": "Every day, from 10:00 to 20:00.",
    "qa.q4": "Can I pay in installments?",
    "qa.a4": "Yes, with a bank installment plan. I will send you the application link now.",
    "qa.q5": "Can I book for tomorrow?",
    "qa.a5": "Tomorrow 12:00 and 15:30 are free. Which one suits you?",
    "qa.q6": "Where are you located?",
    "qa.a6": "Vake, Chavchavadze 10. I will send you the map now.",

    "platforms.label": "Channels",
    "platforms.title": "Integration on All Major Platforms",
    "platforms.subtitle": "All four channels share one knowledge base. Change a price once and it changes everywhere.",
    "platform.facebook.name": "Messenger",
    "platform.facebook.text": "Messages on your Facebook page.",
    "platform.whatsapp.name": "WhatsApp Business",
    "platform.whatsapp.text": "Your WhatsApp Business number.",
    "platform.instagram.name": "Instagram Direct",
    "platform.instagram.text": "Instagram direct messages.",
    "platform.web.name": "Website",
    "platform.web.text": "A chat window in the corner of your site.",

    "admin.label": "Control",
    "admin.title": "Admin Panel: Full Control",
    "admin.text": "A price changed or a new product came in? Type it into the panel and the assistant uses it from the very next answer.",
    "admin.point1": "Prices, products and Q&A in one place",
    "admin.point2": "Conversation history and detailed analytics",
    "admin.point3": "From the browser, no developer needed",
    "admin.mock.title": "Knowledge base",
    "admin.mock.row1.k": "Delivery in Tbilisi",
    "admin.mock.row1.v": "5₾",
    "admin.mock.row2.k": "Opening hours",
    "admin.mock.row2.v": "10:00-20:00",
    "admin.mock.row3.k": "Discount",
    "admin.mock.row3.v": "20% on shoes",
    "admin.mock.saved": "Saved",

    "how.label": "Process",
    "how.title": "Live in 7-14 Days",
    "how.step": "Step",
    "how.step1.title": "You share the information",
    "how.step1.text": "Prices, products, delivery terms and the questions customers ask most often.",
    "how.step2.title": "We train and test it",
    "how.step2.text": "We prepare the assistant on your business and test it together until every answer is right.",
    "how.step3.title": "It goes live on your page",
    "how.step3.text": "It answers day and night, and you update the information yourself from the panel.",

    "pricing.label": "Pricing",
    "pricing.title": "Price and Monthly Cost",
    "pricing.description": "You pay once for the launch, then only for actual AI usage. No hidden fees.",
    "pricing.investment.title": "Launch",
    "pricing.investment.price": "From 500₾",
    "pricing.investment.priceNote": "One-time. The exact price depends on your requirements.",
    "pricing.investment.includes": "Includes:",
    "pricing.investment.feature1": "Training the AI on your business information",
    "pricing.investment.feature2": "Connecting Messenger, WhatsApp and other channels",
    "pricing.investment.feature3": "An admin panel to change the information yourself",
    "pricing.investment.feature4": "Analytics and statistics",
    "pricing.investment.feature5": "Initial technical support, free of charge",

    "pricing.monthly.title": "Monthly",
    "pricing.monthly.price": "From 5₾",
    "pricing.monthly.priceNote": "Google Gemini usage, based on the number of conversations.",
    "pricing.monthly.note": "Every month you get a report of what was spent.",
    "pricing.examples.small": "Small business",
    "pricing.examples.smallQueries": "500 conversations a month",
    "pricing.examples.smallCost": "5-10₾",
    "pricing.examples.medium": "Medium business",
    "pricing.examples.mediumQueries": "2,000 conversations a month",
    "pricing.examples.mediumCost": "20-35₾",
    "pricing.examples.large": "Large business",
    "pricing.examples.largeQueries": "10,000 conversations a month",
    "pricing.examples.largeCost": "100-160₾",

    "technical.label": "Technology",
    "technical.title": "What the Assistant Runs On",
    "technical.feature1.title": "Google Gemini",
    "technical.feature1.text": "Natural Georgian and memory of the conversation context.",
    "technical.feature2.title": "Google Cloud",
    "technical.feature2.text": "Runs day and night and handles thousands of conversations at once.",
    "technical.feature3.title": "Security",
    "technical.feature3.text": "Data is encrypted, in line with GDPR requirements.",

    "faq.title": "Frequently Asked Questions",
    "faq.q1.question": "How long does it take to launch the chatbot?",
    "faq.q1.answer": "7-14 business days.",
    "faq.q1.details": "You will receive the ready AI assistant within 7-14 business days. The exact timeline depends on the complexity of your business and the number of required integrations.",

    "faq.q2.question": "Is it possible to change the content after launch?",
    "faq.q2.answer": "Yes, anytime, in real-time.",
    "faq.q2.details": "You can edit the AI's knowledge base and responses yourself from your admin panel. Changes take effect instantly.",

    "faq.q3.question": "What happens if there is a delay in Google API payment?",
    "faq.q3.answer": "Your data will be fully preserved.",
    "faq.q3.details": "According to Google's policies, the chatbot will temporarily stop working, but all your data and system configuration will be fully and securely saved.",

    "faq.q4.question": "Is it possible to integrate on a website?",
    "faq.q4.answer": "Of course",
    "faq.q4.details": "Website Live Chat Widget integration is available, operating on the exact same principle as in Facebook Messenger.",

    "faq.q5.question": "How many languages can the AI speak?",
    "faq.q5.answer": "Primarily, Georgian and English.",
    "faq.q5.details": "The AI has multilingual capabilities. We primarily conduct training in Georgian and English, but training for additional languages is possible if needed.",

    "faq.q6.question": "How much does an AI chatbot cost?",
    "faq.q6.answer": "A one-time fee from 500₾.",
    "faq.q6.details": "The exact price depends on the bot's complexity and the number of integrations. After launch you only pay for AI usage, which for a small business is roughly 5₾ to 10₾ per month.",

    "faq.q7.question": "How is an AI chatbot different from a regular chat bot?",
    "faq.q7.answer": "An AI bot understands freely written questions.",
    "faq.q7.details": "A regular chat bot only reacts to pre-set buttons and keywords. An AI chatbot is trained on your business information, understands questions written any way in Georgian, and answers naturally, like a live operator.",

    "cta.question": "Let's see how it would work on your page",
    "cta.text": "In a free consultation we show you how the assistant would answer your customers.",
    "cta.button": "Free Consultation",
    "cta.order": "Order an AI Chatbot",
    "consultation.whatsapp": "Free Consultation",
    "phone.number": "557 62 42 43",
  },
};


const AIChatbot: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const { stopNavigation } = useNavigation();
  const { currentLanguage } = useLanguage();
  // const [activePackage, setActivePackage] = useState<number>(1);

  const t = (key: string): string => {
    const translations = aiChatbotTranslations[currentLanguage as keyof typeof aiChatbotTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  // FAQPage schema source — mirrors the visible FAQ section below (faq.q1..q5),
  // localized automatically via t(). Keeps schema in sync with on-page content.
  const faqForSchema = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    question: t(`faq.q${n}.question`),
    answer: `${t(`faq.q${n}.answer`)} ${t(`faq.q${n}.details`)}`.trim(),
  }));

  const en = currentLanguage === "en";
  const breadcrumbItems = [
    { name: en ? "Home" : "მთავარი", url: "https://vifadigital.ge/" },
    { name: en ? "AI Chatbot" : "AI ჩატბოტი", url: "https://vifadigital.ge/services/ai-chatbot" },
  ];

  const whatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20AI%20ჩატბოტის%20სერვისით.%20მსურს%20უფასო%20კონსულტაცია.";

  // Scroll to top and stop navigation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Stop navigation spinner when component is fully loaded
    setTimeout(() => stopNavigation(), 50);
  }, [stopNavigation]);

  // Each channel in its own brand color: the real apps, not decoration.
  const platforms = [
    { icon: <FaFacebookMessenger />, key: "facebook", color: "#0084FF" },
    { icon: <FaWhatsapp />, key: "whatsapp", color: "#25D366" },
    { icon: <FaInstagram />, key: "instagram", color: "#E4405F" },
    { icon: <FaGlobe />, key: "web", color: "#A5B4FC" },
  ];

  const technicalFeatures = [
    { key: "feature1", icon: <FaBrain /> },
    { key: "feature2", icon: <FaCloud /> },
    { key: "feature3", icon: <FaShieldAlt /> },
  ];

  const apiCosts = [
    { key: "small" },
    { key: "medium" },
    { key: "large" },
  ];

  const reduceMotion = useReducedMotion();

  return (
    <>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        url="https://vifadigital.ge/services/ai-chatbot"
        serviceSchema={{
          name: "AI ჩატბოტი ბიზნესისთვის",
          description:
            "AI ჩატბოტის დამზადება და ინტეგრაცია: 24/7 მომხმარებელთა მხარდაჭერა, ავტომატური პასუხები და ლიდების გენერაცია ქართულ ენაზე.",
          serviceType: "AI Chatbot Development",
          offers: [
            { name: "AI ჩატბოტის ინტეგრაცია (setup)", price: 500 },
          ],
        }}
        breadcrumbs={breadcrumbItems}
        faq={faqForSchema}
      />

      {/* Site-consistent dark background */}
      <div className="fixed inset-0 z-0 bg-[#060608]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_65%_-5%,rgba(99,102,241,0.06)_0%,transparent_65%)]" />
      </div>

      <main
        className={`relative z-10 min-h-screen text-white selection:bg-indigo-500/30 ${getTransitionClasses()}`}
      >
        <div className="mx-auto w-[min(100%,72rem)] px-5 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          {/* ── Hero: the offer on the left, the real Messenger screen on the right ── */}
          <section className="grid gap-16 pb-20 md:pb-28 lg:grid-cols-12 lg:items-center lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">
                <span className="text-indigo-400">03/</span> {en ? "AI Chatbot" : "AI ჩატბოტი"}
              </p>
              <h1 className="text-balance text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[2.9rem]">
                {en ? "AI Chatbot for Your Business" : "AI ჩატბოტი თქვენი ბიზნესისთვის"}
              </h1>
              <div className="mt-1 text-balance text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-indigo-400 sm:text-5xl lg:text-[2.9rem]">
                {keepTogether(t("hero.titleHighlight"))}
              </div>
              <p className="font-georgian-body mt-7 w-[min(100%,34rem)] text-[17px] leading-relaxed text-gray-300">{t("hero.lead")}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-500"
                >
                  <FaWhatsapp className="text-lg" />
                  {t("consultation.whatsapp")}
                </a>
                <CallbackLink product="chatbot" shape="rounded" />
              </div>

              <div className="mt-12 grid w-[min(100%,34rem)] grid-cols-3 border-t border-white/10">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={`pt-5 ${n > 1 ? "border-l border-white/10 pl-4 sm:pl-6" : "pr-4"}`}>
                    <p className="text-2xl font-extrabold text-white sm:text-[1.9rem]">{keepTogether(t(`hero.fact${n}.value`))}</p>
                    <p className="font-georgian-body mt-1 text-[13px] text-gray-400 sm:text-sm">{t(`hero.fact${n}.label`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <MessengerPhone t={t} />
            </motion.div>
          </section>

          {/* ── 01 One night: the same conversation as a log ── */}
          <section className="border-t border-white/10 py-20 md:py-28">
            <SectionTitle n="01" label={t("log.label")} title={t("log.title")} text={t("log.text")} />
            <div className="mt-12 grid lg:grid-cols-12 lg:gap-10">
              <ol className="lg:col-span-8 lg:col-start-5">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-white/10 py-5 first:border-t sm:grid-cols-[6rem_1fr]">
                    <span className={`text-xl font-bold tabular-nums ${n === 4 ? "text-indigo-400" : "text-white"}`}>{t(`log.r${n}.time`)}</span>
                    <p className="font-georgian-body text-[15px] leading-relaxed text-gray-300 md:text-base">{t(`log.r${n}.text`)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── 02 Questions and the answers it gives ── */}
          <section className="border-t border-white/10 py-20 md:py-28">
            <SectionTitle n="02" label={t("qa.label")} title={t("qa.title")} text={t("qa.text")} />
            <div className="mt-12 grid lg:grid-cols-12 lg:gap-10">
              <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="border-b border-white/10 py-5 first:border-t sm:[&:nth-child(2)]:border-t">
                    <dt className="font-georgian-body text-base font-semibold text-white">{t(`qa.q${n}`)}</dt>
                    <dd className="font-georgian-body mt-1.5 text-[15px] leading-relaxed text-gray-400">{t(`qa.a${n}`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ── 03 Channels, as a ruled grid ── */}
          <section className="border-t border-white/10 py-20 md:py-28">
            <SectionTitle n="03" label={t("platforms.label")} title={t("platforms.title")} text={t("platforms.subtitle")} />
            <ul className="mt-12 grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-4">
              {platforms.map((platform) => (
                <li key={platform.key} className="border-b border-r border-white/10 p-5 md:p-8">
                  <span className="text-2xl" style={{ color: platform.color }}>
                    {platform.icon}
                  </span>
                  <p className="mt-6 text-base font-bold text-white">{t(`platform.${platform.key}.name`)}</p>
                  <p className="font-georgian-body mt-1.5 text-sm leading-relaxed text-gray-400">{t(`platform.${platform.key}.text`)}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 04 Admin panel: the text beside a small knowledge-base screen ── */}
          <section className="border-t border-white/10 py-20 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">
                  <span className="text-indigo-400">04/</span> {t("admin.label")}
                </p>
                <h2 className="mt-5 text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-white md:text-[2.4rem]">{t("admin.title")}</h2>
                <p className="font-georgian-body mt-4 text-base leading-relaxed text-gray-400 md:text-[17px]">{t("admin.text")}</p>
                <ul className="mt-8 border-t border-white/10">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="font-georgian-body flex items-start gap-3 border-b border-white/10 py-3.5 text-[15px] text-gray-300">
                      <FaCheck className="mt-1.5 shrink-0 text-xs text-indigo-400" />
                      {t(`admin.point${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]">
                  <div className="flex items-center gap-2 border-b border-white/7 px-5 py-3.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 text-sm font-semibold text-gray-300">{t("admin.mock.title")}</span>
                  </div>
                  <div className="space-y-3 p-5 md:p-6">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 ${
                          n === 1 ? "border-indigo-400/50 bg-indigo-500/6" : "border-white/7 bg-white/2"
                        }`}
                      >
                        <span className="font-georgian-body text-sm text-gray-400">{t(`admin.mock.row${n}.k`)}</span>
                        <span className="flex items-center text-sm font-semibold text-white">
                          {t(`admin.mock.row${n}.v`)}
                          {n === 1 && !reduceMotion && (
                            <motion.span
                              aria-hidden
                              className="ml-0.5 inline-block h-4 w-px bg-indigo-300"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-end pt-1">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-black">
                        <FaCheck className="text-[10px]" />
                        {t("admin.mock.saved")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 05 Process ── */}
          <section className="border-t border-white/10 py-20 md:py-28">
            <SectionTitle n="05" label={t("how.label")} title={t("how.title")} />
            <div className="mt-12 grid lg:grid-cols-12 lg:gap-10">
              <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:col-span-8 lg:col-start-5">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="relative border-t border-white/15 pt-5 before:absolute before:-top-px before:left-0 before:h-px before:w-10 before:bg-indigo-400">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                      {t("how.step")} {n}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-white">{t(`how.step${n}.title`)}</h3>
                    <p className="font-georgian-body mt-2 text-[15px] leading-relaxed text-gray-400">{t(`how.step${n}.text`)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── 06 Pricing: one ruled box, two halves ── */}
          <section className="border-t border-white/10 py-20 md:py-28">
            <SectionTitle n="06" label={t("pricing.label")} title={t("pricing.title")} text={t("pricing.description")} />
            <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 md:grid-cols-2">
              <div className="p-7 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{t("pricing.investment.title")}</p>
                <p className="mt-4 text-5xl font-extrabold tracking-tight text-white">{t("pricing.investment.price")}</p>
                <p className="font-georgian-body mt-3 text-[15px] text-gray-400">{t("pricing.investment.priceNote")}</p>
                <p className="mb-2 mt-8 text-[13px] font-semibold text-gray-300">{t("pricing.investment.includes")}</p>
                <ul className="border-t border-white/10">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="font-georgian-body flex items-start gap-3 border-b border-white/10 py-3 text-[15px] text-gray-300">
                      <FaCheck className="mt-1.5 shrink-0 text-xs text-indigo-400" />
                      {t(`pricing.investment.feature${num}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col border-t border-white/10 p-7 md:border-l md:border-t-0 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{t("pricing.monthly.title")}</p>
                <p className="mt-4 text-5xl font-extrabold tracking-tight text-white">{t("pricing.monthly.price")}</p>
                <p className="font-georgian-body mt-3 text-[15px] text-gray-400">{t("pricing.monthly.priceNote")}</p>
                <div className="mt-8 border-t border-white/10">
                  {apiCosts.map((cost) => (
                    <div key={cost.key} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4">
                      <div>
                        <p className="text-[15px] font-semibold text-white">{t(`pricing.examples.${cost.key}`)}</p>
                        <p className="font-georgian-body mt-0.5 text-sm text-gray-500">{t(`pricing.examples.${cost.key}Queries`)}</p>
                      </div>
                      <p className="whitespace-nowrap text-xl font-bold text-white">{t(`pricing.examples.${cost.key}Cost`)}</p>
                    </div>
                  ))}
                </div>
                <p className="font-georgian-body mt-auto pt-6 text-sm text-gray-500">{t("pricing.monthly.note")}</p>
              </div>
            </div>
          </section>

          {/* ── 07 Technology ── */}
          <section className="border-t border-white/10 pt-20 md:pt-28">
            <SectionTitle n="07" label={t("technical.label")} title={t("technical.title")} />
            <div className="mt-12 grid lg:grid-cols-12 lg:gap-10">
              <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
                {technicalFeatures.map((feature) => (
                  <div key={feature.key} className="border-t border-white/10 pt-5">
                    <dt className="flex items-center gap-2.5 text-base font-bold text-white">
                      <span className="text-indigo-300">{feature.icon}</span>
                      {t(`technical.${feature.key}.title`)}
                    </dt>
                    <dd className="font-georgian-body mt-2 text-sm leading-relaxed text-gray-400">{t(`technical.${feature.key}.text`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        {/* ── FAQ (shared component) ── */}
        <section className="py-12">
          <FAQSection items={faqForSchema} eyebrow="FAQ" title={t("faq.title")} />
        </section>

        {/* ── CTA: a ruled band, the line on the left and the buttons on the right ── */}
        <section className="mx-auto w-[min(100%,72rem)] px-5 pb-24 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 border-y border-white/10 py-14 md:grid-cols-[1fr_auto] md:gap-12 md:py-20">
            <div>
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.6rem]">{t("cta.question")}</h2>
              <p className="font-georgian-body mt-4 text-base leading-relaxed text-gray-400 md:text-[17px]">{t("cta.text")}</p>
            </div>
            <div className="flex flex-col gap-3 whitespace-nowrap sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-500"
              >
                <FaWhatsapp className="text-lg" />
                {t("cta.order")}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/5"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AIChatbot;
