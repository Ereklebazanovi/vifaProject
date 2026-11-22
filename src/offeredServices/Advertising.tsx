import { ChartNoAxesColumnIncreasing, Megaphone, Search } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";

const copy = {
  ka: {
    seoTitle: "ციფრული რეკლამა Facebook-ზე, Instagram-ზე და Google-ში",
    seoDescription: "Facebook და Instagram რეკლამა, Google Ads და სარეკლამო კამპანიების მართვა. ფასი ინდივიდუალურია, საწყისი კონსულტაცია უფასოა.",
    description: "ვამზადებთ რეკლამის ტექსტსა და ვიზუალს, ვარჩევთ, ვის ვაჩვენოთ, და კამპანიას შედეგის მიხედვით ვასწორებთ.",
    price: "ფასი კონსულტაციაზე",
    sectionTitle: "რეკლამის არხები და კამპანიის მართვა",
    sectionLine: "თავიდანვე ვთანხმდებით, ვის უნდა ვაჩვენოთ რეკლამა და რა შედეგს ელით.",
    cards: [
      { icon: Megaphone, title: "Facebook და Instagram", body: "ვწერთ რეკლამის ტექსტს, ვამზადებთ ვიზუალს და ვარჩევთ, ვის ვაჩვენოთ Facebook-სა და Instagram-ზე." },
      { icon: Search, title: "Google Ads", body: "Google-ში რეკლამას თქვენი შეთავაზებისა და იმ ადამიანების მიხედვით ვგეგმავთ, ვისთანაც გსურთ მისვლა." },
      { icon: ChartNoAxesColumnIncreasing, title: "კამპანიის მართვა", body: "ვაკვირდებით, რა შედეგი მოაქვს თითოეულ რეკლამას და კამპანიას ამის მიხედვით ვასწორებთ." },
    ],
    process: [
      { title: "ვათანხმებთ მიზანს", body: "ერთად ვწყვეტთ, ვის ვაჩვენოთ რეკლამა და რას უნდა მივაღწიოთ." },
      { title: "ვამზადებთ კამპანიას", body: "ვამზადებთ ტექსტსა და ვიზუალს და ვუშვებთ რეკლამას." },
      { title: "ვაფასებთ შედეგებს", body: "ვამოწმებთ შედეგებს და საჭიროების მიხედვით ვცვლით კამპანიას." },
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
    description: "We write the ad copy, make the visuals, choose who sees them and adjust the campaign by its results.",
    price: "Pricing on consultation",
    sectionTitle: "Ad channels and campaign management",
    sectionLine: "We start by agreeing on who you want to reach and what you want the campaign to achieve.",
    cards: [
      { icon: Megaphone, title: "Facebook and Instagram", body: "We prepare the copy and visuals, choose the audience and launch the campaign on the relevant channels." },
      { icon: Search, title: "Google Ads", body: "We plan Google campaigns around your offer and the people you want to reach." },
      { icon: ChartNoAxesColumnIncreasing, title: "Campaign management", body: "We track results and use the data to refine the ads and see what works better." },
    ],
    process: [
      { title: "Agree on the goal", body: "We agree on who to reach and what the ads should achieve." },
      { title: "Prepare the campaign", body: "We prepare the copy and visuals, then launch the ads." },
      { title: "Review the results", body: "We track results and use the data to adjust the campaign." },
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
