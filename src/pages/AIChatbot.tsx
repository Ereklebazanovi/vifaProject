import { ArrowDown, BookOpen, Check, MessageSquare, Package, Pencil } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { FaFacebookMessenger, FaGlobe, FaInstagram, FaWhatsapp } from "react-icons/fa";
import SEO from "../components/SEO";
import CallbackLink from "../components/CallbackLink";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
import { HowWeStart } from "../components/ui/HowWeStart";
import { LightPage } from "../components/ui/LightPage";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceCard } from "../components/ui/ServiceCard";
import { ServiceHero } from "../components/ui/ServiceHero";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { OtherItServices } from "../components/ui/OtherItServices";
import { itBreadcrumbs, itHref } from "../data/itServices";
import { ChatbotPhoneDemo } from "./ChatbotPhoneDemo";
import "./chatbotService.css";

type T = (key: string) => string;

// AI Chatbot Translations
const aiChatbotTranslations = {
  ka: {
    "seo.title": "ჩატბოტი და AI ბოტის დამზადება ბიზნესისთვის, 500₾-დან",
    "seo.description": "AI ჩატბოტის დამზადება Facebook Messenger-ის, WhatsApp-ის, Instagram-ისა და ვებსაიტისთვის. ჩატ ბოტი ქართულად პასუხობს კლიენტებს 24/7. ფასი 500₾-დან, გაშვება 7-14 დღეში.",


    "demo.title": "საუბრის დემო",
    "chat.status": "პასუხობს წამებში",
    "chat.shop.label": "მაღაზია",
    "chat.shop.time": "3:12",
    "chat.shop.stamp": "დღეს, 03:12",
    "chat.shop.m1": "გამარჯობა, ეს კაბა M ზომაში გაქვთ?",
    "chat.shop.m2": "გამარჯობა! კი, M ზომა მარაგშია, ფასი 89₾.",
    "chat.shop.m3": "თბილისში მიტანა რა ღირს?",
    "chat.shop.m4": "5₾, 1-2 დღეში მოგიტანთ. შეკვეთისთვის დამიტოვეთ ნომერი და მისამართი.",
    "chat.shop.m5": "555 12 34 56, ვაკე, ჭავჭავაძის 10",
    "chat.shop.m6": "მადლობა! შეკვეთა მიღებულია, დილით დაგირეკავთ დასადასტურებლად.",
    "chat.clinic.label": "კლინიკა",
    "chat.clinic.time": "23:40",
    "chat.clinic.stamp": "დღეს, 23:40",
    "chat.clinic.m1": "გამარჯობა, კბილის წმენდა რა ღირს?",
    "chat.clinic.m2": "გამარჯობა! პროფესიული წმენდა 80₾-ია და დაახლოებით 40 წუთი გრძელდება.",
    "chat.clinic.m3": "ხვალ საღამოს თავისუფალი დრო გაქვთ?",
    "chat.clinic.m4": "ხვალ 18:00 და 19:30 თავისუფალია. რომელი გირჩევნიათ?",
    "chat.clinic.m5": "18:00, ნინო ბერიძე, 555 12 34 56",
    "chat.clinic.m6": "ჩაგწერეთ ხვალ 18:00-ზე. გელოდებით!",
    "chat.rent.label": "გაქირავება",
    "chat.rent.time": "7:15",
    "chat.rent.stamp": "დღეს, 07:15",
    "chat.rent.m1": "Hi! Do you have an SUV for 5 days from Friday?",
    "chat.rent.m2": "Hi! Yes, a Toyota RAV4 is free: 120₾ a day, full insurance included.",
    "chat.rent.m3": "Can you bring it to the airport?",
    "chat.rent.m4": "Sure, airport delivery is free. Just send your name and flight time.",
    "chat.rent.m5": "John Smith, landing at 14:30",
    "chat.rent.m6": "Booked! The car will wait for you at Tbilisi Airport on Friday, 14:30.",
    "chat.salon.label": "სალონი",
    "chat.salon.time": "22:05",
    "chat.salon.stamp": "შაბ, 22:05",
    "chat.salon.m1": "გელ-ლაქით მანიკიური რა ღირს?",
    "chat.salon.m2": "გამარჯობა! გელ-ლაქით მანიკიური 45₾-ია, დიზაინით 55₾.",
    "chat.salon.m3": "კვირას მუშაობთ?",
    "chat.salon.m4": "კი, კვირას 11:00-დან 19:00-მდე. დაგიჯავშნოთ?",
    "chat.salon.m5": "კი, 13:00-ზე, ანა, 555 12 34 56",
    "chat.salon.m6": "მზადაა: კვირა, 13:00. გელოდებით!",


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

    "platforms.update": "ფასს ერთხელ ცვლით და ყველა არხზე ერთნაირად იცვლება.",
    "platform.facebook.name": "Messenger",
    "platform.whatsapp.name": "WhatsApp",
    "platform.instagram.name": "Instagram",
    "platform.web.name": "ვებსაიტი",

    "admin.mock.title": "ცოდნის ბაზა",
    "admin.mock.row1.k": "მიტანა თბილისში",
    "admin.mock.row1.v": "5₾",
    "admin.mock.row2.k": "სამუშაო საათები",
    "admin.mock.row2.v": "10:00-20:00",

    "how.step1.title": "გვიზიარებთ ინფორმაციას",
    "how.step1.text": "გვიგზავნით ფასებს, პროდუქტებსა და ხშირ კითხვებს.",
    "how.step2.title": "ვასწავლით და ვამოწმებთ",
    "how.step2.text": "ვცდით თქვენი კლიენტების კითხვებზე.",
    "how.step3.title": "ჩატბოტს ვრთავთ",
    "how.step3.text": "ვრთავთ თქვენს არხებზე და ბოტი იწყებს პასუხს.",

    "pricing.title": "ფასი და ყოველთვიური ხარჯი",
    "pricing.investment.title": "გაშვება",
    "pricing.investment.price": "500₾-დან",
    "pricing.investment.priceNote": "ერთჯერადი საფასური.",
    "pricing.investment.feature1": "AI-ის მომზადება თქვენი ბიზნესისთვის",
    "pricing.investment.feature2": "ოთხივე არხთან დაკავშირება",
    "pricing.investment.feature3": "მართვის პანელი",

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

    "technical.feature1.title": "Google Gemini",
    "technical.feature1.text": "ბუნებრივი ქართული და საუბრის კონტექსტის დამახსოვრება.",
    "technical.feature2.title": "Google Cloud",
    "technical.feature2.text": "მუშაობს დღე-ღამე და ათასობით საუბარს ერთდროულად უძლებს.",
    "technical.feature3.title": "უსაფრთხოება",
    "technical.feature3.text": "მონაცემები დაშიფრულია, GDPR-ის მოთხოვნების დაცვით.",

    "faq.title": "ხშირად დასმული კითხვები",
    "faq.q1.question": "რამდენ ხანში გაეშვება ჩატბოტი?",
    "faq.q1.answer": "7-14 სამუშაო დღე.",
    "faq.q1.details": "მზა AI ასისტენტს მიიღებთ 7-14 სამუშაო დღეში. ზუსტი ვადები დამოკიდებულია თქვენი ბიზნესის სირთულესა და საჭირო ინტეგრაციების რაოდენობაზე.",

    "faq.q2.question": "გაშვების შემდეგ პასუხებს თავად შევცვლი?",
    "faq.q2.answer": "დიახ, ნებისმიერ დროს, რეალურ დროში.",
    "faq.q2.details": "თქვენ შეგიძლიათ თავად დაარედაქტიროთ AI-ს ცოდნის ბაზა და პასუხები თქვენი ადმინ პანელიდან. ცვლილებები ძალაში შედის მომენტალურად.",

    "faq.q3.question": "რა მოხდება, თუ AI-ის ყოველთვიურ ხარჯს არ გადავიხდი?",
    "faq.q3.answer": "თქვენი მონაცემები სრულად შენარჩუნდება.",
    "faq.q3.details": "Google-ის წესების მიხედვით, ჩატბოტი დროებით შეწყვეტს მუშაობას, თუმცა თქვენი ყველა მონაცემი და სისტემის გამართვა სრულად და უსაფრთხოდ შეინახება.",

    "faq.q4.question": "ვებსაიტზეც შეიძლება ჩატბოტის დაყენება?",
    "faq.q4.answer": "რა თქმა უნდა",
    "faq.q4.details": "ვებსაიტის Live Chat Widget-ის ინტეგრაცია ხელმისაწვდომია, ზუსტად იმავე პრინციპით როგორც facebook messenger-ში.",

    "faq.q5.question": "რომელ ენებზე პასუხობს ჩატბოტი?",
    "faq.q5.answer": "ძირითადად, ქართულად და ინგლისურად.",
    "faq.q5.details": "AI-ს აქვს მრავალენოვანი შესაძლებლობები. ჩვენ ტრენინგს ვატარებთ ძირითადად ქართულ და ინგლისურ ენებზე, მაგრამ საჭიროების შემთხვევაში, დამატებითი ენების სწავლება შესაძლებელია.",

    "faq.q6.question": "რა ღირს AI ჩატბოტის დამზადება?",
    "faq.q6.answer": "ერთჯერადი ღირებულება 500₾-დან.",
    "faq.q6.details": "ზუსტი ფასი დამოკიდებულია ბოტის სირთულესა და ინტეგრაციების რაოდენობაზე. გაშვების შემდეგ იხდით მხოლოდ AI-ს გამოყენების ხარჯს, რომელიც მცირე ბიზნესისთვის თვეში დაახლოებით 5₾-დან 10₾-მდეა.",

    "faq.q7.question": "რით განსხვავდება AI ჩატბოტი ჩვეულებრივი ჩატბოტისგან?",
    "faq.q7.answer": "AI ბოტს ესმის თავისუფლად დაწერილი შეკითხვა.",
    "faq.q7.details": "ჩვეულებრივი ჩატ ბოტი მხოლოდ წინასწარ გაწერილ ღილაკებსა და სიტყვებზე რეაგირებს. AI ჩატბოტი თქვენი ბიზნესის ინფორმაციაზეა დატრენინგებული, ესმის ქართულად ნებისმიერად დაწერილი კითხვა და პასუხობს ბუნებრივად, როგორც ცოცხალი ოპერატორი.",

  },
  en: {
    "seo.title": "AI Chatbot for Business",
    "seo.description": "VIFA Digital AI chatbots for Facebook, WhatsApp, and Instagram. 24/7 customer support, sales growth, and cost optimization.",


    "demo.title": "Chat demo",
    "chat.status": "Replies within seconds",
    "chat.shop.label": "Shop",
    "chat.shop.time": "3:12",
    "chat.shop.stamp": "Today, 03:12",
    "chat.shop.m1": "Hi, do you have this dress in size M?",
    "chat.shop.m2": "Hi! Yes, size M is in stock, the price is 89₾.",
    "chat.shop.m3": "How much is delivery in Tbilisi?",
    "chat.shop.m4": "5₾, delivered in 1-2 days. To order, just leave your number and address.",
    "chat.shop.m5": "555 12 34 56, Vake, Chavchavadze 10",
    "chat.shop.m6": "Thank you! Your order is in, we will call you in the morning to confirm.",
    "chat.clinic.label": "Clinic",
    "chat.clinic.time": "23:40",
    "chat.clinic.stamp": "Today, 23:40",
    "chat.clinic.m1": "Hi, how much is a teeth cleaning?",
    "chat.clinic.m2": "Hi! A professional cleaning is 80₾ and takes about 40 minutes.",
    "chat.clinic.m3": "Do you have time tomorrow evening?",
    "chat.clinic.m4": "Tomorrow 18:00 and 19:30 are free. Which one suits you?",
    "chat.clinic.m5": "18:00, Nino Beridze, 555 12 34 56",
    "chat.clinic.m6": "You are booked for tomorrow at 18:00. See you then!",
    "chat.rent.label": "Car rental",
    "chat.rent.time": "7:15",
    "chat.rent.stamp": "Today, 07:15",
    "chat.rent.m1": "Hi! Do you have an SUV for 5 days from Friday?",
    "chat.rent.m2": "Hi! Yes, a Toyota RAV4 is free: 120₾ a day, full insurance included.",
    "chat.rent.m3": "Can you bring it to the airport?",
    "chat.rent.m4": "Sure, airport delivery is free. Just send your name and flight time.",
    "chat.rent.m5": "John Smith, landing at 14:30",
    "chat.rent.m6": "Booked! The car will wait for you at Tbilisi Airport on Friday, 14:30.",
    "chat.salon.label": "Salon",
    "chat.salon.time": "22:05",
    "chat.salon.stamp": "Sat, 22:05",
    "chat.salon.m1": "How much is a gel manicure?",
    "chat.salon.m2": "Hi! A gel manicure is 45₾, with a design 55₾.",
    "chat.salon.m3": "Are you open on Sunday?",
    "chat.salon.m4": "Yes, on Sunday from 11:00 to 19:00. Shall I book you in?",
    "chat.salon.m5": "Yes, 13:00, Ana, 555 12 34 56",
    "chat.salon.m6": "Done: Sunday, 13:00. See you then!",


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

    "platforms.update": "Change a price once and it updates across every channel.",
    "platform.facebook.name": "Messenger",
    "platform.whatsapp.name": "WhatsApp",
    "platform.instagram.name": "Instagram",
    "platform.web.name": "Website",

    "admin.mock.title": "Knowledge base",
    "admin.mock.row1.k": "Delivery in Tbilisi",
    "admin.mock.row1.v": "5₾",
    "admin.mock.row2.k": "Opening hours",
    "admin.mock.row2.v": "10:00-20:00",

    "how.step1.title": "You share the information",
    "how.step1.text": "Send us your prices, products and common questions.",
    "how.step2.title": "We train and test it",
    "how.step2.text": "We test your customers’ questions.",
    "how.step3.title": "We launch the chatbot",
    "how.step3.text": "We connect it to your channels so it can start replying.",

    "pricing.title": "Price and Monthly Cost",
    "pricing.investment.title": "Launch",
    "pricing.investment.price": "From 500₾",
    "pricing.investment.priceNote": "One-time fee.",
    "pricing.investment.feature1": "AI setup for your business",
    "pricing.investment.feature2": "Connection to all four channels",
    "pricing.investment.feature3": "Admin dashboard",

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

    "faq.q3.question": "What happens if I don't pay the monthly AI bill?",
    "faq.q3.answer": "Your data will be fully preserved.",
    "faq.q3.details": "According to Google's policies, the chatbot will temporarily stop working, but all your data and system configuration will be fully and securely saved.",

    "faq.q4.question": "Can I add the chatbot to my website?",
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

  },
};

const whatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20AI%20ჩატბოტის%20სერვისით.%20მსურს%20უფასო%20კონსულტაცია.";

const chatChannels = [
  { key: "facebook", Icon: FaFacebookMessenger, color: "#0084ff" },
  { key: "instagram", Icon: FaInstagram, color: "#cc3065" },
  { key: "whatsapp", Icon: FaWhatsapp, color: "#128466" },
] as const;
const heroChannels = [...chatChannels, { key: "web", Icon: FaGlobe, color: "#594e97" }] as const;

const inboxRows = [
  { channel: heroChannels[0], scenario: "shop", message: "m1" },
  { channel: heroChannels[1], scenario: "clinic", message: "m1" },
  { channel: heroChannels[2], scenario: "salon", message: "m1" },
  { channel: heroChannels[3], scenario: "rent", message: "m1" },
  { channel: heroChannels[0], scenario: "shop", message: "m3" },
] as const;
const usageBands = ["small", "medium", "large"] as const;
const formatLari = (price: string) => price.replace(/(\d)₾/g, "$1 ₾");

function ChatbotOwnerPreview({ t, en }: { t: T; en: boolean }) {
  return (
    <article className="chatbot-owner-preview" aria-labelledby="chatbot-owner-title">
      <h3 id="chatbot-owner-title" className="chatbot-owner-title">{en ? "You update the information" : "ინფორმაციას თავად ცვლით"}</h3>
      <div className="chatbot-owner-panel">
        <div className="chatbot-owner-window">
          <div className="it-browser-bar chatbot-owner-bar">
            <div className="it-browser-dots" aria-hidden="true">
              <span className="it-browser-dot" /><span className="it-browser-dot" /><span className="it-browser-dot" />
            </div>
            <strong className="it-browser-pill">{en ? "Dashboard" : "მართვის პანელი"}</strong>
            <span className="chatbot-owner-demo-label">{en ? "Demo" : "დემო"}</span>
          </div>
          <div className="chatbot-owner-grid">
            <article className="chatbot-owner-inbox">
              <h4><MessageSquare size={18} aria-hidden="true" />{en ? "Recent conversations" : "ბოლო საუბრები"}</h4>
              <ul role="list">
                {inboxRows.map(({ channel: { key, Icon, color }, scenario, message }) => {
                  const time = t(`chat.${scenario}.time`);
                  return (
                    <li key={`${scenario}-${message}`}>
                      <Icon color={color} aria-label={t(`platform.${key}.name`)} role="img" />
                      <span lang={scenario === "rent" ? "en" : undefined}>
                        {t(`chat.${scenario}.${message}`).replace(/^(?:გამარჯობა, |Hi[!,] )/u, "")}
                      </span>
                      <time dateTime={time.padStart(5, "0")}>{time}</time>
                    </li>
                  );
                })}
              </ul>
            </article>
            <div className="chatbot-owner-details">
              <article>
                <h4><Package size={18} aria-hidden="true" />{en ? "New order" : "ახალი შეკვეთა"}</h4>
                <div className="chatbot-owner-order">
                  <span>Messenger</span>
                  <dl>
                    <div><dt>{en ? "Item" : "ნივთი"}</dt><dd>{en ? "Dress · size M" : "კაბა · ზომა M"}</dd></div>
                    <div><dt>{en ? "Price" : "ფასი"}</dt><dd>89 ₾</dd></div>
                    <div><dt>{t("admin.mock.row1.k")}</dt><dd>{formatLari(t("admin.mock.row1.v"))}</dd></div>
                  </dl>
                </div>
              </article>
              <article>
                <h4><BookOpen size={18} aria-hidden="true" />{t("admin.mock.title")}</h4>
                <div className="chatbot-knowledge">
                  <dl>{[1, 2].map((number) => (
                    <div key={number}>
                      <dt>{t(`admin.mock.row${number}.k`)}</dt>
                      <dd>{formatLari(t(`admin.mock.row${number}.v`))}<Pencil size={13} aria-hidden="true" /></dd>
                    </div>
                  ))}</dl>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <p className="chatbot-owner-note">{t("platforms.update")}</p>
    </article>
  );
}

export default function AIChatbot() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const language = currentLanguage === "en" ? "en" : "ka";
  const en = language === "en";
  const translations: Record<string, string> = aiChatbotTranslations[language];
  const t: T = (key) => translations[key];
  const title = en ? "AI Chatbot for Your Business." : "AI ჩატბოტი თქვენი ბიზნესისთვის.";
  const breadcrumbs = itBreadcrumbs("chatbot", language);
  const faqForSchema = [6, 1, 2, 3, 4, 5, 7].map((number) => {
    const key = `faq.q${number}`;
    return { question: t(`${key}.question`), answer: `${t(`${key}.answer`)} ${t(`${key}.details`)}`.trim() };
  });
  const detailItems = [
    {
      question: en ? "What does the chatbot say to customers?" : "რას პასუხობს ჩატბოტი კლიენტებს?",
      answer: (
        <div className="chatbot-faq-details">
          <p>{t("qa.text")}</p>
          <dl>{[1, 2, 3, 4, 5, 6].map((number) => (
            <div key={number}><dt>{t(`qa.q${number}`)}</dt><dd>{t(`qa.a${number}`)}</dd></div>
          ))}</dl>
        </div>
      ),
    },
    {
      question: en ? "What is the chatbot built on?" : "რა ტექნოლოგიით მუშაობს ჩატბოტი?",
      answer: (
        <dl className="chatbot-faq-details">
          {[1, 2, 3].map((number) => (
            <div key={number}><dt>{t(`technical.feature${number}.title`)}</dt><dd>{t(`technical.feature${number}.text`)}</dd></div>
          ))}
        </dl>
      ),
    },
  ];
  const setupPrice = formatLari(t("pricing.investment.price"));
  const monthlyPrice = formatLari(t("pricing.monthly.price"));
  const timeline = en ? "7-14 business days" : "7-14 სამუშაო დღე";

  return (
    <LightPage className="chatbot-service" tone="chatbot" whatsappHref={whatsappUrl}>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        url="https://vifadigital.ge/services/ai-chatbot"
        serviceSchema={{
          name: "AI ჩატბოტი ბიზნესისთვის",
          description:
            "AI ჩატბოტის დამზადება და ინტეგრაცია: 24/7 მომხმარებელთა მხარდაჭერა, ავტომატური პასუხები და ლიდების გენერაცია ქართულ ენაზე.",
          serviceType: "AI Chatbot Development",
          offers: [{ name: "AI ჩატბოტის ინტეგრაცია (setup)", price: 500 }],
        }}
        breadcrumbs={breadcrumbs}
        faq={faqForSchema}
      />
      <SiteNav consultationHref={whatsappUrl} activeLink={itHref} language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="chatbot-hero-title" breadcrumbs={breadcrumbs} title={title}
          description={en
            ? "Answers in Georgian and takes orders and bookings."
            : "ქართულად პასუხობს კლიენტებს, იღებს შეკვეთებსა და ჯავშნებს."}
          actions={<>
            <a className="it-pill-button" href="#pricing">{en ? "See pricing" : "ფასების ნახვა"} <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="it-more-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {en ? "Consult on WhatsApp" : "კონსულტაცია WhatsApp-ზე"} ›
            </a>
          </>}
          facts={<>
            <ul className="chatbot-facts" role="list">
              <li><strong>24/7</strong><span>{en ? "Customer replies" : "პასუხები"}</span></li>
              <li><strong>7-14</strong><span>{en ? "Business days to launch" : "სამუშაო დღე გაშვებამდე"}</span></li>
              <li><strong>{setupPrice}</strong><span>{en ? "One-time setup" : "ერთჯერადად"}</span></li>
            </ul>
            <ul className="chatbot-hero-channels" aria-label={en ? "Channels" : "არხები"} role="list">
              {heroChannels.map(({ key, Icon, color }) => (
                <li key={key}><Icon color={color} aria-hidden="true" />{t(`platform.${key}.name`)}</li>
              ))}
            </ul>
          </>}>
          <ChatbotPhoneDemo t={t} language={language} />
        </ServiceHero>

        <section className="it-section it-col chatbot-section" aria-labelledby="chatbot-capabilities-title">
          <SectionHeading id="chatbot-capabilities-title">{en ? "What the chatbot does" : "რას აკეთებს ჩატბოტი"}</SectionHeading>
          <div className="chatbot-capabilities">
            <ServiceCard variant="package" title={en ? "Answers on your behalf" : "პასუხობს თქვენს ნაცვლად"}>
              <div className="chatbot-example"><p>{t("qa.q1")}</p><p>{t("qa.a1")}</p></div>
            </ServiceCard>
            <ServiceCard variant="package" title={en ? "Takes orders and bookings" : "იღებს შეკვეთებსა და ჯავშნებს"}>
              <div className="chatbot-example"><p>{t("qa.q5")}</p><p>{t("qa.a5")}</p></div>
            </ServiceCard>
          </div>
          <ChatbotOwnerPreview t={t} en={en} />
        </section>

        <HowWeStart language={language} showActions={false}
          processSteps={[
            { title: t("how.step1.title"), body: t("how.step1.text") },
            { title: t("how.step2.title"), body: t("how.step2.text") },
            { title: t("how.step3.title"), body: t("how.step3.text") },
          ]}
          example={{
            inquiry: en ? "Hello, I'd like a chatbot." : "გამარჯობა, ჩატბოტი მაინტერესებს.",
            project: en ? "AI chatbot" : "AI ჩატბოტი",
            price: setupPrice, timeline,
            readyChat: {
              label: en ? "Chatbot is live" : "ჩატბოტი ჩართულია",
              question: en ? "Are you open on Sunday?" : "კვირას მუშაობთ?",
              answer: en ? "Yes, from 11:00 to 19:00." : "კი, 11:00-დან 19:00-მდე.",
            },
          }} />

        <section id="pricing" className="it-section it-col chatbot-section chatbot-pricing" aria-labelledby="chatbot-pricing-title">
          <SectionHeading id="chatbot-pricing-title">{t("pricing.title")}</SectionHeading>
          <div className="chatbot-prices">
            <ServiceCard variant="package" highlighted title={t("pricing.investment.title")} facts={<strong className="chatbot-price">{setupPrice}</strong>}
              body={t("pricing.investment.priceNote")}>
              <ul className="chatbot-inclusions" role="list">
                {[1, 2, 3].map((number) => (
                  <li key={number}><Check size={16} aria-hidden="true" />{t(`pricing.investment.feature${number}`)}</li>
                ))}
              </ul>
              <a className="it-pill-button it-package-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {en ? "Consult on WhatsApp" : "კონსულტაცია WhatsApp-ზე"}
              </a>
            </ServiceCard>
            <ServiceCard variant="package" title={t("pricing.monthly.title")} facts={<strong className="chatbot-price">{monthlyPrice}</strong>}
              body={t("pricing.monthly.priceNote")}>
              <dl className="chatbot-usage">
                {usageBands.map((band) => (
                  <div key={band}>
                    <dt><strong>{t(`pricing.examples.${band}`)}</strong><span>{t(`pricing.examples.${band}Queries`)}</span></dt>
                    <dd>{formatLari(t(`pricing.examples.${band}Cost`))}</dd>
                  </div>
                ))}
              </dl>
              <p className="chatbot-monthly-note">{t("pricing.monthly.note")}</p>
            </ServiceCard>
          </div>
        </section>

        <FaqSection id="chatbot-faq" title={t("faq.title")} items={[...faqForSchema, ...detailItems]} />
        <OtherItServices current="chatbot" language={language} />
        <ContactBlock whatsappHref={whatsappUrl} language={language}>
          <CallbackLink product="chatbot" className="it-callback" />
        </ContactBlock>
        <SiteFooter language={language} />
      </main>
    </LightPage>
  );
}
