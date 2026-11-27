import type { ItLanguage } from "../../data/itServices";

// Pricing, timelines and features come from WebDev.tsx and AIChatbot.tsx.
// Keep the visible answers and JSON-LD on the same source of truth.
const ka = [
  {
    question: "რა ღირს ვებსაიტი?",
    answer: "სავიზიტო საიტის ფასი 500 ₾-დან იწყება. პრემიუმ საიტი მართვის პანელით 700-დან 1000 ₾-მდე ღირს, ონლაინ მაღაზია კი 1400 ₾-დან. კონსულტაცია უფასოა. ზუსტ ფასს მას შემდეგ გეტყვით, რაც გავიგებთ, რა გჭირდებათ.",
  },
  {
    question: "რამდენ ხანში მზადდება ვებსაიტი?",
    answer: "სავიზიტო საიტს საშუალოდ 1-2 კვირა სჭირდება, პრემიუმ კორპორატიულ საიტს 2-4 კვირა, ონლაინ მაღაზიას კი 4-6 კვირა. ზუსტ ვადას პროექტის მოცულობის მიხედვით შევათანხმებთ.",
  },
  {
    question: "რამდენ ხანში მზადდება ჩატბოტი?",
    answer: "ჩატბოტს 7-14 სამუშაო დღეში ვამზადებთ. ზუსტი ვადა დამოკიდებულია იმაზე, რა უნდა გააკეთოს ბოტმა და რომელ სისტემებთან უნდა დავაკავშიროთ.",
  },
  {
    question: "შეიძლება ონლაინ მაღაზიაში ბარათით გადახდა?",
    answer: "დიახ. ონლაინ მაღაზიაში ქართული ბანკების გადახდის სისტემებს ვრთავთ. შეგვიძლია მაღაზია Invento WMS-ს დავუკავშიროთ, რომ მართოთ პროდუქტები, ავტომატურად განაახლოთ მარაგები, დაბეჭდოთ საკურიერო სტიკერები და შეკვეთებს რეალურ დროში თვალი ადევნოთ.",
  },
  {
    question: "შემიძლია საიტზე ტექსტები და პროდუქტები თავად შევცვალო?",
    answer: "დიახ. პრემიუმ პაკეტში შედის მართვის პანელი, საიდანაც ტექსტებს, პროდუქტებსა და სიახლეებს თავად განაახლებთ.",
  },
] as const;

const en = [
  {
    question: "How much does a website cost?",
    answer: "Landing pages start at 500 ₾, corporate websites with a CMS cost 700-1,000 ₾, and online stores start at 1,400 ₾. The consultation is free. We give you an exact quote once we know what you need.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Landing pages usually take 1-2 weeks, corporate websites 2-4 weeks, and online stores 4-6 weeks. We agree on a timeline based on the scope.",
  },
  {
    question: "How long does it take to set up a chatbot?",
    answer: "Setup takes 7-14 business days, depending on what the chatbot needs to do and which systems it connects to.",
  },
  {
    question: "Can customers pay by card in my online store?",
    answer: "Yes. We integrate Georgian bank payments. We can also connect your store to Invento WMS so you can manage products, sync stock, print courier labels and track orders in real time.",
  },
  {
    question: "Can I edit my website's content and products?",
    answer: "Yes. The premium package includes a CMS where you can update text, products and news yourself.",
  },
] as const;

export const hubFaqs = { ka, en };

export function getHubFaqSchema(language: ItLanguage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFaqs[language].map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
