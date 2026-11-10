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
  FaBrain,
  FaFacebookMessenger,
  FaWhatsapp,
  FaInstagram,
  FaGlobe,
  FaCheck,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";
import SEO from "../components/SEO";
import CallbackLink from "../components/CallbackLink";
import FAQSection from "../components/FAQSection";

// One card style and one heading style for every section, so the page reads as one system.
const card = "rounded-2xl border border-white/10 bg-white/3";

const SectionHead = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div className="mx-auto mb-12 w-[min(100%,42rem)] text-center">
    <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
      <span className="h-px w-6 bg-indigo-500/70" />
      {eyebrow}
      <span className="h-px w-6 bg-indigo-500/70" />
    </span>
    <h2 className="text-2xl font-bold tracking-tight text-white md:text-[2rem] md:leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-[17px]">{subtitle}</p>}
  </div>
);

type T = (key: string) => string;

/** "7-14", "500₾-დან": a non-breaking hyphen, so big headings never break a line there. */
const keepTogether = (s: string) => s.replace(/-/g, "‑");

// The hero phone plays these in turn. Odd lines are the customer, even lines the assistant.
const SCENARIOS = [
  { id: "shop", n: 6 },
  { id: "clinic", n: 6 },
  { id: "rent", n: 6 },
  { id: "salon", n: 6 },
] as const;

/** One conversation, line by line, with "typing" before each reply; onDone a few seconds after the end. */
const Conversation = ({ t, id, n, onDone }: { t: T; id: string; n: number; onDone: () => void }) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? n : 0);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    if (shown >= n) {
      const timer = setTimeout(() => done.current(), reduce ? 10000 : 4500);
      return () => clearTimeout(timer);
    }
    const reply = shown % 2 === 1;
    const timer = setTimeout(() => setShown((s) => s + 1), reply ? 1500 : shown === 0 ? 700 : 1100);
    return () => clearTimeout(timer);
  }, [shown, n, reduce]);

  // The customer just wrote and the reply is on its way.
  const typing = shown < n && shown % 2 === 1;

  return (
    <div className="flex h-full flex-col justify-end gap-2.5">
      {Array.from({ length: shown }, (_, i) => {
        const bot = i % 2 === 1;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex ${bot ? "justify-start" : "justify-end"}`}
          >
            <p
              // Inline: the site's global `* { max-width: 100% }` beats Tailwind's max-w classes.
              style={{ maxWidth: "85%" }}
              className={`rounded-[1.2rem] px-3.5 py-2 text-left text-[14px] leading-snug ${
                bot ? "rounded-bl-md bg-white/8 text-gray-100" : "rounded-br-md bg-linear-to-br from-indigo-500 to-violet-600 text-white"
              }`}
            >
              {t(`chat.${id}.m${i + 1}`)}
            </p>
          </motion.div>
        );
      })}
      {typing && (
        <div className="flex justify-start">
          <span className="flex gap-1 rounded-[1.2rem] rounded-bl-md bg-white/8 px-4 py-3" aria-hidden>
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-gray-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
              />
            ))}
          </span>
        </div>
      )}
      {shown >= n && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-1 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
        >
          <FaCheck className="text-[10px]" />
          {t("chat.done")}
        </motion.p>
      )}
    </div>
  );
};

/** A phone with a live Messenger conversation; tabs switch the business, and it moves on by itself. */
const ChatShowcase = ({ t }: { t: T }) => {
  const [sc, setSc] = useState(0);
  const s = SCENARIOS[sc];
  const next = useCallback(() => setSc((v) => (v + 1) % SCENARIOS.length), []);
  return (
    <div className="relative mx-auto w-[min(100%,25rem)]">
      <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="relative rounded-[2.6rem] border border-white/15 bg-linear-to-b from-white/10 to-white/2 p-2.5 shadow-2xl shadow-black/60">
        <div className="overflow-hidden rounded-[2.1rem] bg-[#0b0b10]">
          <div className="flex items-center gap-3 border-b border-white/7 px-5 pb-3.5 pt-5 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              {t(`chat.${s.id}.name`).slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-white">{t(`chat.${s.id}.name`)}</p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t("chat.online")}
              </p>
            </div>
            <span className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] font-medium text-gray-300">{t(`chat.${s.id}.time`)}</span>
          </div>
          <div className="h-105 overflow-hidden px-4 py-4 [mask-image:linear-gradient(to_bottom,transparent,black_14%)]">
            <Conversation key={sc} t={t} id={s.id} n={s.n} onDone={next} />
          </div>
          <div className="flex items-center gap-2 border-t border-white/7 px-4 py-3">
            <span className="flex-1 rounded-full bg-white/5 px-4 py-2 text-left text-[13px] text-gray-500">{t("chat.input")}</span>
            <FaFacebookMessenger className="text-lg text-indigo-300" aria-hidden />
          </div>
        </div>
      </div>
      <div className="relative mt-6 flex flex-wrap justify-center gap-2" role="tablist">
        {SCENARIOS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={i === sc}
            onClick={() => setSc(i)}
            className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 ${
              i === sc ? "bg-white text-black" : "border border-white/10 text-gray-300 hover:border-white/30"
            }`}
          >
            {t(`chat.${x.id}.label`)}
          </button>
        ))}
      </div>
    </div>
  );
};

/** A short fact beside the phone. */
const Callout = ({ t, n, side }: { t: T; n: number; side: "left" | "right" }) => (
  <div className={`${card} p-5 ${side === "left" ? "lg:text-right" : ""}`}>
    <p className="bg-linear-to-r from-indigo-200 to-violet-300 bg-clip-text text-lg font-bold text-transparent">{t(`callout.${n}.title`)}</p>
    <p className="mt-1 text-sm leading-relaxed text-gray-400">{t(`callout.${n}.text`)}</p>
  </div>
);

/** Two rows of real customer questions drifting in opposite directions. */
const QuestionMarquee = ({ t }: { t: T }) => {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-3">
      {[[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12]].map((row, r) => {
        const items = row.map((n) => t(`questions.q${n}`));
        return (
          <div key={r} className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <motion.div
              className="flex w-max"
              animate={reduce ? undefined : { x: r ? ["-50%", "0%"] : ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              {[...items, ...items].map((q, i) => (
                <span
                  key={i}
                  aria-hidden={i >= items.length}
                  className="mr-3 whitespace-nowrap rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-gray-300"
                >
                  {q}
                </span>
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

/** The animated wires of the channels diagram (desktop only): four in, one out. */
const FlowLines = ({ kind }: { kind: "in" | "out" }) => {
  const reduce = useReducedMotion();
  const ys = kind === "in" ? [24, 88, 152, 216] : [120];
  return (
    <svg aria-hidden viewBox="0 0 120 240" className="hidden h-60 w-30 shrink-0 lg:block" fill="none">
      <defs>
        <linearGradient id={`flow-${kind}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="120" y2="0">
          <stop offset="0" stopColor="#818cf8" stopOpacity={kind === "in" ? 0.25 : 0.9} />
          <stop offset="1" stopColor="#a78bfa" stopOpacity={kind === "in" ? 0.9 : 0.25} />
        </linearGradient>
      </defs>
      {ys.map((y) => (
        <motion.path
          key={y}
          d={kind === "in" ? `M0 ${y} C 60 ${y}, 60 120, 120 120` : "M0 120 L120 120"}
          stroke={`url(#flow-${kind})`}
          strokeWidth={1.5}
          strokeDasharray="4 6"
          animate={reduce ? undefined : { strokeDashoffset: [0, -20] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
};

// AI Chatbot Translations
const aiChatbotTranslations = {
  ka: {
    "seo.title": "ჩატბოტი და AI ბოტის დამზადება ბიზნესისთვის, 500₾-დან",
    "seo.description": "AI ჩატბოტის დამზადება Facebook Messenger-ის, WhatsApp-ის, Instagram-ისა და ვებსაიტისთვის. ჩატ ბოტი ქართულად პასუხობს კლიენტებს 24/7. ფასი 500₾-დან, გაშვება 7-14 დღეში.",

    "hero.badge": "ასისტენტი, რომელსაც არასდროს სძინავს",
    "hero.titleHighlight": "ჩატბოტის დამზადება 7-14 დღეში",
    "hero.lead": "AI ასისტენტი სწავლობს თქვენს პროდუქტებს, ფასებს და პირობებს, კლიენტებს წამებში პასუხობს და მათ ნომერს მოთხოვნასთან ერთად გიტოვებთ.",
    "hero.fact1.value": "24/7",
    "hero.fact1.label": "უწყვეტად",
    "hero.fact2.value": "7-14 დღე",
    "hero.fact2.label": "გაშვებამდე",
    "hero.fact3.value": "500₾-დან",
    "hero.fact3.label": "ერთჯერადი ფასი",

    "callout.1.title": "24/7",
    "callout.1.text": "ღამითაც და შაბათ-კვირასაც პასუხობს.",
    "callout.2.title": "წამებში",
    "callout.2.text": "კლიენტი პასუხს აღარ ელოდება და სხვასთან არ მიდის.",
    "callout.3.title": "ნომერი და შეკვეთა",
    "callout.3.text": "მზა სახით გადაეცემა თქვენს გუნდს.",
    "callout.4.title": "ქართულად და ინგლისურად",
    "callout.4.text": "წერს ბუნებრივად, როგორც ადამიანი.",

    "chat.online": "ონლაინ",
    "chat.input": "შეტყობინება...",
    "chat.done": "მოთხოვნა გადაეცა გუნდს",
    "chat.shop.label": "მაღაზია",
    "chat.shop.name": "Lumi Store",
    "chat.shop.time": "03:12",
    "chat.shop.m1": "გამარჯობა, ეს კაბა M ზომაში გაქვთ?",
    "chat.shop.m2": "გამარჯობა! კი, M ზომა მარაგშია, ფასი 89₾.",
    "chat.shop.m3": "თბილისში მიტანა რა ღირს?",
    "chat.shop.m4": "5₾, 1-2 დღეში მოგიტანთ. შეკვეთისთვის დამიტოვეთ ნომერი და მისამართი.",
    "chat.shop.m5": "555 12 34 56, ვაკე, ჭავჭავაძის 10",
    "chat.shop.m6": "მადლობა! შეკვეთა მიღებულია, დილით დაგიკავშირდებით დასადასტურებლად.",
    "chat.clinic.label": "კლინიკა",
    "chat.clinic.name": "Lumi Dental",
    "chat.clinic.time": "23:40",
    "chat.clinic.m1": "გამარჯობა, კბილის წმენდა რა ღირს?",
    "chat.clinic.m2": "გამარჯობა! პროფესიული წმენდა 80₾-ია და დაახლოებით 40 წუთი გრძელდება.",
    "chat.clinic.m3": "ხვალ საღამოს თავისუფალი დრო გაქვთ?",
    "chat.clinic.m4": "ხვალ 18:00 და 19:30 თავისუფალია. რომელი გირჩევნიათ?",
    "chat.clinic.m5": "18:00, ნინო ბერიძე, 555 12 34 56",
    "chat.clinic.m6": "ჩაგწერეთ ხვალ 18:00-ზე. გელოდებით!",
    "chat.rent.label": "გაქირავება",
    "chat.rent.name": "Lumi Cars",
    "chat.rent.time": "07:15",
    "chat.rent.m1": "Hi! Do you have an SUV for 5 days from Friday?",
    "chat.rent.m2": "Hi! Yes, a Toyota RAV4 is free: 120₾ a day, full insurance included.",
    "chat.rent.m3": "Can you bring it to the airport?",
    "chat.rent.m4": "Sure, airport delivery is free. Just send your name and flight time.",
    "chat.rent.m5": "John Smith, landing at 14:30",
    "chat.rent.m6": "Booked! The car will wait for you at Tbilisi Airport on Friday, 14:30.",
    "chat.salon.label": "სალონი",
    "chat.salon.name": "Lumi Beauty",
    "chat.salon.time": "შაბ, 22:05",
    "chat.salon.m1": "გელ-ლაქით მანიკიური რა ღირს?",
    "chat.salon.m2": "გამარჯობა! გელ-ლაქით მანიკიური 45₾-ია, დიზაინით 55₾.",
    "chat.salon.m3": "კვირას მუშაობთ?",
    "chat.salon.m4": "კი, კვირას 11:00-დან 19:00-მდე. დაგიჯავშნოთ?",
    "chat.salon.m5": "კი, 13:00-ზე, ანა, 555 12 34 56",
    "chat.salon.m6": "მზადაა: კვირა, 13:00. გელოდებით!",

    "questions.title": "კითხვები, რომლებსაც ყოველდღე პასუხობს",
    "questions.q1": "რა ღირს?",
    "questions.q2": "M ზომა გაქვთ?",
    "questions.q3": "მიტანა რამდენია?",
    "questions.q4": "სად მდებარეობთ?",
    "questions.q5": "რომლამდე მუშაობთ?",
    "questions.q6": "განვადება შესაძლებელია?",
    "questions.q7": "ხვალ ჩაწერა შეიძლება?",
    "questions.q8": "მარაგშია?",
    "questions.q9": "რა ფერები გაქვთ?",
    "questions.q10": "ფასდაკლება არის?",
    "questions.q11": "აეროპორტში მოიტანთ?",
    "questions.q12": "კვირას ხსნით?",

    "eyebrow.platforms": "არხები",
    "platforms.title": "ინტეგრაცია ყველა მთავარ პლატფორმაზე",
    "platforms.subtitle": "კლიენტი წერს იქ, სადაც მისთვის მოსახერხებელია. ასისტენტი პასუხობს, თქვენ კი მზა მოთხოვნას იღებთ.",
    "platform.facebook.name": "Messenger",
    "platform.whatsapp.name": "WhatsApp",
    "platform.instagram.name": "Instagram",
    "platform.web.name": "ვებსაიტი",
    "flow.core": "AI ასისტენტი",
    "flow.team": "თქვენს გუნდს",
    "flow.badge": "ახალი შეკვეთა",
    "flow.row1.k": "სახელი",
    "flow.row1.v": "ნინო",
    "flow.row2.k": "ტელეფონი",
    "flow.row2.v": "555 12 34 56",
    "flow.row3.k": "შეკვეთა",
    "flow.row3.v": "კაბა, M ზომა",
    "flow.row4.k": "მისამართი",
    "flow.row4.v": "ვაკე",

    "eyebrow.admin": "მართვა",
    "admin.title": "ადმინ პანელი: სრული კონტროლი",
    "admin.text": "ფასი შეიცვალა ან ახალი პროდუქტი შემოვიდა? ჩაწერეთ პანელში და ასისტენტი მაშინვე ახალ ინფორმაციას იტყვის.",
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
    "admin.mock.saved": "შენახულია, ასისტენტმა უკვე იცის",

    "eyebrow.how": "პროცესი",
    "how.title": "გაშვება 7-14 დღეში",
    "how.step1.title": "გვიზიარებთ ინფორმაციას",
    "how.step1.text": "ფასები, პროდუქტები, მიწოდების პირობები და კითხვები, რომლებსაც კლიენტები ყველაზე ხშირად სვამენ.",
    "how.step2.title": "ვასწავლით და ვამოწმებთ",
    "how.step2.text": "ასისტენტს თქვენს ბიზნესზე ვამზადებთ და ერთად ვცდით, სანამ ყველა პასუხი ზუსტი არ იქნება.",
    "how.step3.title": "ირთვება თქვენს გვერდზე",
    "how.step3.text": "პასუხობს დღე-ღამე, ინფორმაციას კი თავად ანახლებთ მარტივი პანელიდან.",

    "eyebrow.pricing": "ფასი",
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

    "eyebrow.tech": "ტექნოლოგია",
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

    "cta.question": "მზად ხართ გამოსცადოთ?",
    "cta.text": "უფასო კონსულტაციაზე გაჩვენებთ, როგორ იმუშავებს ასისტენტი თქვენს გვერდზე.",
    "cta.button": "უფასო კონსულტაცია",
    "cta.order": "შეუკვეთეთ AI ჩატბოტი",
    "consultation.whatsapp": "უფასო კონსულტაცია",
    "phone.number": "557 62 42 43",
  },
    en: {
    "seo.title": "AI Chatbot for Business",
    "seo.description": "VIFA Digital AI chatbots for Facebook, WhatsApp, and Instagram. 24/7 customer support, sales growth, and cost optimization.",

    "hero.badge": "An assistant that never sleeps",
    "hero.titleHighlight": "Built and launched in 7-14 days",
    "hero.lead": "The AI assistant learns your products, prices and terms, answers customers in seconds and hands you their number together with the request.",
    "hero.fact1.value": "24/7",
    "hero.fact1.label": "Non-stop",
    "hero.fact2.value": "7-14 days",
    "hero.fact2.label": "To launch",
    "hero.fact3.value": "From 500₾",
    "hero.fact3.label": "One-time price",

    "callout.1.title": "24/7",
    "callout.1.text": "Answers at night and on weekends too.",
    "callout.2.title": "In seconds",
    "callout.2.text": "Customers stop waiting and stop leaving for someone else.",
    "callout.3.title": "Number and order",
    "callout.3.text": "Handed to your team, ready to act on.",
    "callout.4.title": "Georgian and English",
    "callout.4.text": "Writes naturally, like a person.",

    "chat.online": "Online",
    "chat.input": "Message...",
    "chat.done": "Request sent to the team",
    "chat.shop.label": "Shop",
    "chat.shop.name": "Lumi Store",
    "chat.shop.time": "03:12",
    "chat.shop.m1": "Hi, do you have this dress in size M?",
    "chat.shop.m2": "Hi! Yes, size M is in stock, the price is 89₾.",
    "chat.shop.m3": "How much is delivery in Tbilisi?",
    "chat.shop.m4": "5₾, delivered in 1-2 days. To order, just leave your number and address.",
    "chat.shop.m5": "555 12 34 56, Vake, Chavchavadze 10",
    "chat.shop.m6": "Thank you! Your order is in, we will call you in the morning to confirm.",
    "chat.clinic.label": "Clinic",
    "chat.clinic.name": "Lumi Dental",
    "chat.clinic.time": "23:40",
    "chat.clinic.m1": "Hi, how much is a teeth cleaning?",
    "chat.clinic.m2": "Hi! A professional cleaning is 80₾ and takes about 40 minutes.",
    "chat.clinic.m3": "Do you have time tomorrow evening?",
    "chat.clinic.m4": "Tomorrow 18:00 and 19:30 are free. Which one suits you?",
    "chat.clinic.m5": "18:00, Nino Beridze, 555 12 34 56",
    "chat.clinic.m6": "You are booked for tomorrow at 18:00. See you then!",
    "chat.rent.label": "Car rental",
    "chat.rent.name": "Lumi Cars",
    "chat.rent.time": "07:15",
    "chat.rent.m1": "Hi! Do you have an SUV for 5 days from Friday?",
    "chat.rent.m2": "Hi! Yes, a Toyota RAV4 is free: 120₾ a day, full insurance included.",
    "chat.rent.m3": "Can you bring it to the airport?",
    "chat.rent.m4": "Sure, airport delivery is free. Just send your name and flight time.",
    "chat.rent.m5": "John Smith, landing at 14:30",
    "chat.rent.m6": "Booked! The car will wait for you at Tbilisi Airport on Friday, 14:30.",
    "chat.salon.label": "Salon",
    "chat.salon.name": "Lumi Beauty",
    "chat.salon.time": "Sat, 22:05",
    "chat.salon.m1": "How much is a gel manicure?",
    "chat.salon.m2": "Hi! A gel manicure is 45₾, with a design 55₾.",
    "chat.salon.m3": "Are you open on Sunday?",
    "chat.salon.m4": "Yes, on Sunday from 11:00 to 19:00. Shall I book you in?",
    "chat.salon.m5": "Yes, 13:00, Ana, 555 12 34 56",
    "chat.salon.m6": "Done: Sunday, 13:00. See you then!",

    "questions.title": "Questions it answers every day",
    "questions.q1": "How much is it?",
    "questions.q2": "Do you have size M?",
    "questions.q3": "How much is delivery?",
    "questions.q4": "Where are you located?",
    "questions.q5": "Until when are you open?",
    "questions.q6": "Can I pay in installments?",
    "questions.q7": "Can I book for tomorrow?",
    "questions.q8": "Is it in stock?",
    "questions.q9": "Which colors do you have?",
    "questions.q10": "Any discounts?",
    "questions.q11": "Can you deliver to the airport?",
    "questions.q12": "Are you open on Sunday?",

    "eyebrow.platforms": "Channels",
    "platforms.title": "Integration on All Major Platforms",
    "platforms.subtitle": "Customers write wherever suits them. The assistant answers, and you get a ready request.",
    "platform.facebook.name": "Messenger",
    "platform.whatsapp.name": "WhatsApp",
    "platform.instagram.name": "Instagram",
    "platform.web.name": "Website",
    "flow.core": "AI assistant",
    "flow.team": "To your team",
    "flow.badge": "New order",
    "flow.row1.k": "Name",
    "flow.row1.v": "Nino",
    "flow.row2.k": "Phone",
    "flow.row2.v": "555 12 34 56",
    "flow.row3.k": "Order",
    "flow.row3.v": "Dress, size M",
    "flow.row4.k": "Address",
    "flow.row4.v": "Vake",

    "eyebrow.admin": "Control",
    "admin.title": "Admin Panel: Full Control",
    "admin.text": "A price changed or a new product came in? Type it into the panel and the assistant says the new thing right away.",
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
    "admin.mock.saved": "Saved, the assistant already knows",

    "eyebrow.how": "Process",
    "how.title": "Live in 7-14 Days",
    "how.step1.title": "You share the information",
    "how.step1.text": "Prices, products, delivery terms and the questions customers ask most often.",
    "how.step2.title": "We train and test it",
    "how.step2.text": "We prepare the assistant on your business and test it together until every answer is right.",
    "how.step3.title": "It goes live on your page",
    "how.step3.text": "It answers day and night, and you update the information yourself from a simple panel.",

    "eyebrow.pricing": "Pricing",
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

    "eyebrow.tech": "Technology",
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

    "cta.question": "Ready to Try It?",
    "cta.text": "In a free consultation we will show you how the assistant would work on your page.",
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

  const platforms = [
    { icon: <FaFacebookMessenger />, key: "facebook" },
    { icon: <FaWhatsapp />, key: "whatsapp" },
    { icon: <FaInstagram />, key: "instagram" },
    { icon: <FaGlobe />, key: "web" },
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
        {/* Hero backdrop: a dot grid fading out, and two soft glows */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-275 overflow-hidden">
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
          <div className="absolute -top-48 right-[-8%] h-150 w-150 rounded-full bg-violet-600/20 blur-[140px]" />
          <div className="absolute left-[-10%] top-72 h-125 w-125 rounded-full bg-indigo-600/15 blur-[140px]" />
        </div>

        <div className="mx-auto w-[min(100%,72rem)] px-5 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          {/* ── Hero ── */}
          <section className="mb-16 text-center md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t("hero.badge")}
              </span>
              <h1 className="w-[min(100%,56rem)] text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
                {en ? "AI Chatbot for Your Business" : "AI ჩატბოტი თქვენი ბიზნესისთვის"}
              </h1>
              <p className="mt-2 w-[min(100%,56rem)] bg-linear-to-r from-indigo-300 via-violet-400 to-fuchsia-400 bg-clip-text text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-transparent sm:text-5xl md:text-6xl md:leading-[1.08]">
                {keepTogether(t("hero.titleHighlight"))}
              </p>
              <p className="mx-auto mt-7 w-[min(100%,42rem)] text-base leading-relaxed text-gray-300 md:text-lg">{t("hero.lead")}</p>

              <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
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

              <div className="mt-12 grid w-[min(100%,32rem)] grid-cols-3 divide-x divide-white/10">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="px-2">
                    <p className="bg-linear-to-b from-white to-white/60 bg-clip-text text-xl font-extrabold text-transparent sm:text-3xl">
                      {keepTogether(t(`hero.fact${n}.value`))}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">{t(`hero.fact${n}.label`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── Live demo: the phone, with facts on both sides ── */}
          <section className="mb-24 md:mb-28">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
              <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
                {[1, 2].map((n) => (
                  <Callout key={n} t={t} n={n} side="left" />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <ChatShowcase t={t} />
              </motion.div>
              <div className="order-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[3, 4].map((n) => (
                  <Callout key={n} t={t} n={n} side="right" />
                ))}
              </div>
            </div>
          </section>

          {/* ── The questions it answers ── */}
          <section className="mb-24 md:mb-32">
            <p className="mb-6 text-center text-sm font-medium text-gray-400">{t("questions.title")}</p>
            <QuestionMarquee t={t} />
          </section>

          {/* ── Channels: four in, one assistant, a ready request out ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.platforms")} title={t("platforms.title")} subtitle={t("platforms.subtitle")} />
            <div className={`${card} relative overflow-hidden px-6 py-10 md:px-10 md:py-14`}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]"
              />
              <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-0">
                <ul className="grid w-[min(100%,24rem)] grid-cols-2 gap-3 lg:w-48 lg:grid-cols-1 lg:gap-4">
                  {platforms.map((platform) => (
                    <li
                      key={platform.key}
                      className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d13] px-4 text-sm font-semibold text-white"
                    >
                      <span className="text-lg text-indigo-300">{platform.icon}</span>
                      {t(`platform.${platform.key}.name`)}
                    </li>
                  ))}
                </ul>
                <FlowLines kind="in" />
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-indigo-400/50"
                      animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-center shadow-[0_0_60px_rgba(99,102,241,0.45)]">
                    <FaBrain className="text-2xl text-white" />
                    <span className="mt-1.5 px-2 text-[11px] font-bold leading-tight text-white">{t("flow.core")}</span>
                  </span>
                </div>
                <FlowLines kind="out" />
                <div className="w-[min(100%,24rem)] rounded-2xl border border-white/10 bg-[#0d0d13] p-5 lg:w-64">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">{t("flow.team")}</p>
                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {t("flow.badge")}
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex justify-between gap-3">
                        <dt className="text-gray-500">{t(`flow.row${n}.k`)}</dt>
                        <dd className="text-right text-gray-200">{t(`flow.row${n}.v`)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>

          {/* ── Admin panel: the text beside a small knowledge-base mock ── */}
          <section className="mb-24 grid items-center gap-12 md:mb-32 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
                <span className="h-px w-6 bg-indigo-500/70" />
                {t("eyebrow.admin")}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-[2rem] md:leading-tight">{t("admin.title")}</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-[17px]">{t("admin.text")}</p>
              <ul className="mt-7 space-y-3.5">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15">
                      <FaCheck className="text-[10px] text-indigo-300" />
                    </span>
                    {t(`admin.point${n}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-violet-600/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d13] shadow-2xl shadow-black/50">
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
                      <span className="text-sm text-gray-400">{t(`admin.mock.row${n}.k`)}</span>
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
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                      <FaCheck className="text-[10px]" />
                      {t("admin.mock.saved")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Process: a timeline of three steps ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.how")} title={t("how.title")} />
            <ol className="relative grid gap-12 md:grid-cols-3 md:gap-6">
              <span
                aria-hidden
                className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-linear-to-r from-indigo-500/10 via-indigo-400/60 to-indigo-500/10 md:block"
              />
              {[1, 2, 3].map((n) => (
                <li key={n} className="relative text-center">
                  <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-indigo-400/40 bg-[#0b0b12] text-base font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)]">
                    {n}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-white">{t(`how.step${n}.title`)}</h3>
                  <p className="mx-auto mt-2 w-[min(100%,20rem)] text-[15px] leading-relaxed text-gray-400">{t(`how.step${n}.text`)}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Pricing ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.pricing")} title={t("pricing.title")} subtitle={t("pricing.description")} />

            <div className="grid gap-5 lg:grid-cols-2">
              {/* One-time launch, with a glowing edge */}
              <div className="rounded-2xl bg-linear-to-b from-indigo-400/60 via-indigo-500/15 to-white/5 p-px shadow-[0_0_60px_-20px_rgba(99,102,241,0.6)]">
                <div className="flex h-full flex-col rounded-[15px] bg-[#0b0b12] p-7 md:p-9">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-300">{t("pricing.investment.title")}</p>
                  <p className="mt-3 text-5xl font-extrabold tracking-tight text-white">{t("pricing.investment.price")}</p>
                  <p className="mt-2 text-[15px] text-gray-400">{t("pricing.investment.priceNote")}</p>
                  <div className="my-7 h-px bg-white/10" />
                  <p className="mb-4 text-[15px] font-semibold text-gray-200">{t("pricing.investment.includes")}</p>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <li key={num} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-300">
                        <FaCheck className="mt-1.5 shrink-0 text-xs text-indigo-400" />
                        {t(`pricing.investment.feature${num}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Monthly usage, with the three sizes as a table */}
              <div className={`${card} flex flex-col p-7 md:p-9`}>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-300">{t("pricing.monthly.title")}</p>
                <p className="mt-3 text-5xl font-extrabold tracking-tight text-white">{t("pricing.monthly.price")}</p>
                <p className="mt-2 text-[15px] text-gray-400">{t("pricing.monthly.priceNote")}</p>
                <div className="my-7 h-px bg-white/10" />
                <div className="divide-y divide-white/10 rounded-xl border border-white/10">
                  {apiCosts.map((cost) => (
                    <div key={cost.key} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-[15px] font-semibold text-white">{t(`pricing.examples.${cost.key}`)}</p>
                        <p className="text-sm text-gray-500">{t(`pricing.examples.${cost.key}Queries`)}</p>
                      </div>
                      <p className="whitespace-nowrap text-lg font-bold text-indigo-300">{t(`pricing.examples.${cost.key}Cost`)}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-auto pt-6 text-sm text-gray-500">{t("pricing.monthly.note")}</p>
              </div>
            </div>
          </section>

          {/* ── Technology, as one quiet strip ── */}
          <section>
            <SectionHead eyebrow={t("eyebrow.tech")} title={t("technical.title")} />
            <div className={`${card} grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0`}>
              {technicalFeatures.map((feature) => (
                <div key={feature.key} className="flex items-start gap-4 p-6 md:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-lg text-indigo-300">
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{t(`technical.${feature.key}.title`)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{t(`technical.${feature.key}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── FAQ (shared component) ── */}
        <section className="py-12">
          <FAQSection items={faqForSchema} eyebrow="FAQ" title={t("faq.title")} />
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto w-[min(100%,64rem)] px-5 pb-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b12] px-6 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-96 w-xl -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[120px]" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">{t("cta.question")}</h2>
              <p className="mx-auto mt-5 w-[min(100%,36rem)] text-base leading-relaxed text-gray-300 md:text-lg">{t("cta.text")}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-gray-200"
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
          </div>
        </section>
      </main>
    </>
  );
};

export default AIChatbot;
