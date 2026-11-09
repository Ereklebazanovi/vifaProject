"use client";

import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  <div className="mx-auto mb-12 max-w-2xl text-center">
    <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
      <span className="h-px w-6 bg-indigo-500/70" />
      {eyebrow}
      <span className="h-px w-6 bg-indigo-500/70" />
    </span>
    <h2 className="text-2xl font-bold tracking-tight text-white md:text-[2rem] md:leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-[17px]">{subtitle}</p>}
  </div>
);

/** A Messenger-style example conversation: what the assistant actually does for a shop. */
const ChatExample = ({ t }: { t: (key: string) => string }) => {
  const messages: ["customer" | "bot", string][] = [
    ["customer", t("chat.c1")], ["bot", t("chat.b1")],
    ["customer", t("chat.c2")], ["bot", t("chat.b2")],
    ["customer", t("chat.c3")], ["bot", t("chat.b3")],
  ];
  return (
    <figure className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c11] shadow-2xl shadow-indigo-950/40">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-sm font-bold text-indigo-300">LS</span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-white">{t("chat.name")}</p>
            <p className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t("chat.status")}
            </p>
          </div>
          <FaFacebookMessenger className="text-xl text-indigo-300" aria-hidden />
        </div>
        <div className="space-y-3 px-5 py-6">
          {messages.map(([who, text], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.25 }}
              className={`flex ${who === "customer" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                  who === "customer" ? "rounded-br-md bg-indigo-600 text-white" : "rounded-bl-md bg-white/7 text-gray-100"
                }`}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-gray-500">{t("chat.caption")}</figcaption>
    </figure>
  );
};

// AI Chatbot Translations
const aiChatbotTranslations = {
  ka: {
    "seo.title": "ჩატბოტი და AI ბოტის დამზადება ბიზნესისთვის, 500₾-დან",
    "seo.description": "AI ჩატბოტის დამზადება Facebook Messenger-ის, WhatsApp-ის, Instagram-ისა და ვებსაიტისთვის. ჩატ ბოტი ქართულად პასუხობს კლიენტებს 24/7. ფასი 500₾-დან, გაშვება 7-14 დღეში.",

    "hero.titleHighlight": "ჩატბოტის დამზადება 7-14 დღეში",
    "hero.lead": "AI ასისტენტი სწავლობს თქვენს პროდუქტებს, ფასებს და პირობებს, კლიენტებს წამებში პასუხობს და მათ ნომერს მოთხოვნასთან ერთად გიტოვებთ.",
    "hero.fact1.value": "24/7",
    "hero.fact1.label": "უწყვეტად",
    "hero.fact2.value": "7-14 დღე",
    "hero.fact2.label": "გაშვებამდე",
    "hero.fact3.value": "500₾-დან",
    "hero.fact3.label": "ერთჯერადი ფასი",

    "chat.name": "Lumi Store",
    "chat.status": "პასუხობს წამებში",
    "chat.c1": "გამარჯობა, ეს კაბა M ზომაში გაქვთ?",
    "chat.b1": "გამარჯობა! კი, M ზომა მარაგშია, ფასი 89₾.",
    "chat.c2": "თბილისში მიტანა რა ღირს?",
    "chat.b2": "თბილისში მიტანა 5₾-ია, 1-2 დღეში. შეკვეთისთვის დამიტოვეთ ნომერი და მისამართი.",
    "chat.c3": "555 12 34 56, ვაკე, ჭავჭავაძის 10",
    "chat.b3": "მადლობა! შეკვეთა მიღებულია, დასადასტურებლად მალე დაგიკავშირდებით.",
    "chat.caption": "საუბრის მაგალითი: ტანსაცმლის მაღაზია Messenger-ში",

    "eyebrow.how": "პროცესი",
    "how.title": "როგორ ვაწყობთ",
    "how.step1.title": "გვიზიარებთ ინფორმაციას",
    "how.step1.text": "ფასები, პროდუქტები, მიწოდების პირობები და კითხვები, რომლებსაც კლიენტები ყველაზე ხშირად სვამენ.",
    "how.step2.title": "ვასწავლით და ვამოწმებთ",
    "how.step2.text": "ასისტენტს თქვენს ბიზნესზე ვამზადებთ და ერთად ვცდით, სანამ ყველა პასუხი ზუსტი არ იქნება.",
    "how.step3.title": "ირთვება თქვენს გვერდზე",
    "how.step3.text": "პასუხობს დღე-ღამე, ინფორმაციას კი თავად ანახლებთ მარტივი პანელიდან.",

    "eyebrow.platforms": "არხები",
    "platforms.title": "ინტეგრაცია ყველა მთავარ პლატფორმაზე",
    "platforms.subtitle": "ერთი ასისტენტი და ერთი ცოდნის ბაზა ყველა არხისთვის.",
    "platform.facebook.name": "Facebook Messenger",
    "platform.facebook.text": "პასუხობს Facebook გვერდის შეტყობინებებს.",
    "platform.whatsapp.name": "WhatsApp Business",
    "platform.whatsapp.text": "პასუხობს თქვენს WhatsApp Business ნომერზე.",
    "platform.instagram.name": "Instagram Direct",
    "platform.instagram.text": "პასუხობს Instagram-ის პირად შეტყობინებებს.",
    "platform.web.name": "ვებსაიტი",
    "platform.web.text": "ჩატის ფანჯარა თქვენს საიტზე, იმავე ცოდნით.",

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

    "eyebrow.admin": "მართვა",
    "admin.title": "ადმინ პანელი: სრული კონტროლი",
    "admin.subtitle": "ფასებს, პროდუქტებს და პასუხებს თავად ცვლით, პროგრამისტის გარეშე.",
    "admin.canDo": "რას შეძლებთ",
    "admin.canDo.feature1": "რეალურ დროში რედაქტირება",
    "admin.canDo.feature2": "ახალი კითხვა-პასუხების დამატება",
    "admin.canDo.feature3": "პროდუქტების მენეჯმენტი",
    "admin.canDo.feature4": "საუბრების ისტორია",
    "admin.canDo.feature5": "დეტალური ანალიტიკა",
    "admin.howWorks": "როგორ მუშაობს",
    "admin.howWorks.step1": "შედით ბრაუზერიდან კომპანიის მოცემულ ბმულზე",
    "admin.howWorks.step2": "აირჩიეთ სექცია (პროდუქტები, კითხვები)",
    "admin.howWorks.step3": "შეცვალეთ ტექსტი ედიტორში",
    "admin.howWorks.step4": "დააჭირეთ „შენახვა“: ცვლილება მაშინვე ამოქმედდება",

    "eyebrow.tech": "ტექნოლოგია",
    "technical.title": "ტექნიკური უპირატესობები",
    "technical.subtitle": "რაზე დგას ასისტენტი და როგორ იცავს თქვენს მონაცემებს.",
    "technical.feature1.title": "Google Gemini",
    "technical.feature1.point1": "ბუნებრივი ქართული: ესმის თავისუფლად დაწერილი კითხვა.",
    "technical.feature1.point2": "ახსოვს საუბრის კონტექსტი და ნათქვამს არ იმეორებს.",
    "technical.feature1.point3": "ერთ შეტყობინებაში დასმულ რამდენიმე კითხვასაც ხვდება.",

    "technical.feature2.title": "საიმედოობა და სისწრაფე",
    "technical.feature2.point1": "მუშაობს Google Cloud-ზე, დღე-ღამე, შესვენების გარეშე.",
    "technical.feature2.point2": "პასუხობს წამებში, დატვირთვის მიუხედავად.",
    "technical.feature2.point3": "ერთდროულად ათასობით საუბარს უძლებს.",

    "technical.feature3.title": "უსაფრთხოება",
    "technical.feature3.point1": "მონაცემები დაშიფრულია გადაცემისას და შენახვისას.",
    "technical.feature3.point2": "Google Cloud-ის დაცვა და ჩვენი დამატებითი ზედამხედველობა.",
    "technical.feature3.point3": "GDPR-ის მოთხოვნებთან შესაბამისობა.",

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

    "hero.titleHighlight": "Built and launched in 7-14 days",
    "hero.lead": "The AI assistant learns your products, prices and terms, answers customers in seconds and hands you their number together with the request.",
    "hero.fact1.value": "24/7",
    "hero.fact1.label": "Non-stop",
    "hero.fact2.value": "7-14 days",
    "hero.fact2.label": "To launch",
    "hero.fact3.value": "From 500₾",
    "hero.fact3.label": "One-time price",

    "chat.name": "Lumi Store",
    "chat.status": "Replies in seconds",
    "chat.c1": "Hi, do you have this dress in size M?",
    "chat.b1": "Hi! Yes, size M is in stock, the price is 89₾.",
    "chat.c2": "How much is delivery in Tbilisi?",
    "chat.b2": "Delivery in Tbilisi is 5₾, within 1-2 days. To order, just leave your number and address.",
    "chat.c3": "555 12 34 56, Vake, Chavchavadze 10",
    "chat.b3": "Thank you! Your order is received, we will contact you shortly to confirm.",
    "chat.caption": "Example conversation: a clothing store on Messenger",

    "eyebrow.how": "Process",
    "how.title": "How We Set It Up",
    "how.step1.title": "You share the information",
    "how.step1.text": "Prices, products, delivery terms and the questions customers ask most often.",
    "how.step2.title": "We train and test it",
    "how.step2.text": "We prepare the assistant on your business and test it together until every answer is right.",
    "how.step3.title": "It goes live on your page",
    "how.step3.text": "It answers day and night, and you update the information yourself from a simple panel.",

    "eyebrow.platforms": "Channels",
    "platforms.title": "Integration on All Major Platforms",
    "platforms.subtitle": "One assistant and one knowledge base for every channel.",
    "platform.facebook.name": "Facebook Messenger",
    "platform.facebook.text": "Answers your Facebook page messages.",
    "platform.whatsapp.name": "WhatsApp Business",
    "platform.whatsapp.text": "Answers on your WhatsApp Business number.",
    "platform.instagram.name": "Instagram Direct",
    "platform.instagram.text": "Answers Instagram direct messages.",
    "platform.web.name": "Website",
    "platform.web.text": "A chat window on your site, with the same knowledge.",

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

    "eyebrow.admin": "Control",
    "admin.title": "Admin Panel: Full Control",
    "admin.subtitle": "Change prices, products and answers yourself, no developer needed.",
    "admin.canDo": "What you can do",
    "admin.canDo.feature1": "Real-time Editing",
    "admin.canDo.feature2": "Adding New Q&A",
    "admin.canDo.feature3": "Product Management",
    "admin.canDo.feature4": "Conversation History",
    "admin.canDo.feature5": "Detailed Analytics",
    "admin.howWorks": "How it works",
    "admin.howWorks.step1": "Access the company-provided link via your browser",
    "admin.howWorks.step2": "Select a section (Products, Questions)",
    "admin.howWorks.step3": "Edit the text in the editor",
    "admin.howWorks.step4": "Click \"Save\": the change takes effect immediately",

    "eyebrow.tech": "Technology",
    "technical.title": "Technical Advantages",
    "technical.subtitle": "What the assistant runs on and how it protects your data.",
    "technical.feature1.title": "Google Gemini",
    "technical.feature1.point1": "Natural Georgian: understands freely written questions.",
    "technical.feature1.point2": "Remembers the conversation context and does not repeat itself.",
    "technical.feature1.point3": "Catches several questions asked in a single message.",

    "technical.feature2.title": "Reliability and Speed",
    "technical.feature2.point1": "Runs on Google Cloud, day and night, without breaks.",
    "technical.feature2.point2": "Replies in seconds, whatever the load.",
    "technical.feature2.point3": "Handles thousands of conversations at once.",

    "technical.feature3.title": "Security",
    "technical.feature3.point1": "Data is encrypted in transit and at rest.",
    "technical.feature3.point2": "Google Cloud protection plus our own oversight.",
    "technical.feature3.point3": "Compliant with GDPR requirements.",

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
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          {/* ── Hero ── */}
          <section className="mb-24 grid items-center gap-14 md:mb-32 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
                <span className="h-px w-8 bg-indigo-500" />
                {en ? "AI Chatbot" : "AI ჩატბოტი"}
              </span>
              <h1 className="text-3xl font-extrabold leading-[1.2] tracking-tight text-white md:text-[2.6rem] md:leading-[1.15]">
                {en ? "AI Chatbot for Your Business" : "AI ჩატბოტი თქვენი ბიზნესისთვის"}
              </h1>
              <p className="mt-2 block bg-linear-to-r from-indigo-400 to-indigo-600 bg-clip-text text-3xl font-extrabold leading-[1.2] tracking-tight text-transparent md:text-[2.6rem] md:leading-[1.15]">
                {t("hero.titleHighlight")}
              </p>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 md:text-[17px]">{t("hero.lead")}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-500"
                >
                  <FaWhatsapp className="text-lg" />
                  {t("consultation.whatsapp")}
                </a>
                <CallbackLink product="chatbot" shape="rounded" />
              </div>

              <div className={`${card} mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10`}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="px-3 py-4 text-center sm:px-5">
                    <p className="text-lg font-bold text-white sm:text-2xl">{t(`hero.fact${n}.value`)}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-400 sm:text-sm">{t(`hero.fact${n}.label`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ChatExample t={t} />
            </motion.div>
          </section>

          {/* ── How it works ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.how")} title={t("how.title")} />
            <ol className="grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <li key={n} className={`${card} p-7`}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/40 text-sm font-bold text-indigo-300">
                    {n}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{t(`how.step${n}.title`)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-400">{t(`how.step${n}.text`)}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Platforms ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.platforms")} title={t("platforms.title")} subtitle={t("platforms.subtitle")} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {platforms.map((platform) => (
                <div
                  key={platform.key}
                  className={`${card} flex flex-col items-center p-7 text-center transition-colors hover:border-indigo-500/40`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-300">
                    {platform.icon}
                  </span>
                  <h3 className="mt-5 text-base font-bold text-white">{t(`platform.${platform.key}.name`)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-400">{t(`platform.${platform.key}.text`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Pricing ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.pricing")} title={t("pricing.title")} subtitle={t("pricing.description")} />

            <div className="grid gap-5 lg:grid-cols-2">
              {/* One-time launch */}
              <div className={`${card} flex flex-col p-7 md:p-9`}>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-300">{t("pricing.investment.title")}</p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">{t("pricing.investment.price")}</p>
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

              {/* Monthly usage, with the three sizes as a table */}
              <div className={`${card} flex flex-col p-7 md:p-9`}>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-300">{t("pricing.monthly.title")}</p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">{t("pricing.monthly.price")}</p>
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

          {/* ── Admin Panel ── */}
          <section className="mb-24 md:mb-32">
            <SectionHead eyebrow={t("eyebrow.admin")} title={t("admin.title")} subtitle={t("admin.subtitle")} />
            <div className="grid gap-5 md:grid-cols-2">
              <div className={`${card} p-7 md:p-9`}>
                <h3 className="mb-5 text-lg font-bold text-white">{t("admin.canDo")}</h3>
                <ul className="space-y-3.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-300">
                      <FaCheck className="mt-1.5 shrink-0 text-xs text-indigo-400" />
                      {t(`admin.canDo.feature${num}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${card} p-7 md:p-9`}>
                <h3 className="mb-5 text-lg font-bold text-white">{t("admin.howWorks")}</h3>
                <ol className="space-y-3.5">
                  {[1, 2, 3, 4].map((step) => (
                    <li key={step} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-300">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-indigo-500/40 text-xs font-bold text-indigo-300">
                        {step}
                      </span>
                      {t(`admin.howWorks.step${step}`)}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ── Technical Features ── */}
          <section>
            <SectionHead eyebrow={t("eyebrow.tech")} title={t("technical.title")} subtitle={t("technical.subtitle")} />
            <div className="grid gap-5 md:grid-cols-3">
              {technicalFeatures.map((feature) => (
                <div key={feature.key} className={`${card} p-7`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl text-indigo-300">
                    {feature.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{t(`technical.${feature.key}.title`)}</h3>
                  <ul className="mt-4 space-y-3">
                    {[1, 2, 3].map((pointNum) => (
                      <li key={pointNum} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-400">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                        {t(`technical.${feature.key}.point${pointNum}`)}
                      </li>
                    ))}
                  </ul>
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
        <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-6">
          <div className="rounded-3xl border border-indigo-500/25 bg-linear-to-b from-indigo-950/40 to-transparent px-6 py-12 text-center md:px-12 md:py-14">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{t("cta.question")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400 md:text-[17px]">{t("cta.text")}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
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
