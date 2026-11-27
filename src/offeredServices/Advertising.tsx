import { ChartNoAxesColumnIncreasing, Megaphone, Search } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";

const copy = {
  ka: {
    seoTitle: "ციფრული რეკლამა Facebook-ზე, Instagram-ზე და Google-ში",
    seoDescription: "Facebook და Instagram რეკლამა, Google Ads და სარეკლამო კამპანიების მართვა. ფასი ინდივიდუალურია, საწყისი კონსულტაცია უფასოა.",
    description: "კამპანიები Facebook-ზე, Instagram-ზე და Google-ში.",
    price: "ფასი კონსულტაციაზე",
    sectionTitle: "რეკლამის არხები და კამპანიის მართვა",
    cards: [
      { icon: Megaphone, title: "Facebook და Instagram", body: "ვამზადებთ ტექსტსა და ვიზუალს და ვარჩევთ, ვის ვაჩვენოთ." },
      { icon: Search, title: "Google Ads", body: "Google-ში რეკლამას თქვენი შეთავაზების მიხედვით ვგეგმავთ." },
      { icon: ChartNoAxesColumnIncreasing, title: "კამპანიის მართვა", body: "ვაკვირდებით შედეგებს და რეკლამას მათ მიხედვით ვასწორებთ." },
    ],
    faq: [
      { question: "რა ღირს კამპანიის მართვა?",
        answer: "ფასს უფასო კონსულტაციაზე ვათანხმებთ. ჯერ ვარკვევთ მიზანს, ვარჩევთ არხებს და ვადგენთ სამუშაოს მოცულობას." },
      { question: "რომელ არხებზე უშვებთ რეკლამას?",
        answer: "რეკლამას ვუშვებთ Facebook-ზე, Instagram-ზე და Google-ში. არხს მიზნისა და იმ ადამიანების მიხედვით ვარჩევთ, ვისაც უნდა მივწვდეთ." },
      { question: "გაშვების შემდეგაც მართავთ კამპანიას?",
        answer: "დიახ. გაშვების შემდეგ ვამოწმებთ შედეგებს და საჭიროებისამებრ ვასწორებთ კამპანიას." },
    ],
  },
  en: {
    seoTitle: "Digital Advertising on Facebook, Instagram and Google",
    seoDescription: "Facebook and Instagram advertising, Google Ads and campaign management. Get a custom quote in a free initial consultation.",
    description: "Campaigns on Facebook, Instagram and Google.",
    price: "Pricing on consultation",
    sectionTitle: "Ad channels and campaign management",
    cards: [
      { icon: Megaphone, title: "Facebook and Instagram", body: "We make the copy and visuals and choose who sees them." },
      { icon: Search, title: "Google Ads", body: "We plan Google ads around your offer." },
      { icon: ChartNoAxesColumnIncreasing, title: "Campaign management", body: "We watch the results and adjust the ads." },
    ],
    faq: [
      { question: "How much does campaign management cost?",
        answer: "Pricing is bespoke. In a free consultation, we discuss your goals, channels and scope before agreeing on a proposal." },
      { question: "Which channels do you advertise on?",
        answer: "We work with Facebook, Instagram and Google Ads. We recommend channels based on the campaign goal and audience." },
      { question: "Do you manage the campaign after launch?",
        answer: "Yes. We measure results and adjust the campaign using the data." },
    ],
  },
};

export default function Advertising() {
  return <MarketingServicePage service="advertising" serviceType="Digital Advertising" copy={copy}
    cardArtifacts={["sponsored", "search", "audience"]} />;
}
