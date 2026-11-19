import { ChartNoAxesColumnIncreasing, Megaphone, Search } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";

const copy = {
  ka: {
    seoTitle: "ციფრული რეკლამა Facebook-ზე, Instagram-ზე და Google-ში",
    seoDescription: "Facebook და Instagram რეკლამა, Google Ads და სარეკლამო კამპანიების მართვა. ფასი ინდივიდუალურია, საწყისი კონსულტაცია უფასოა.",
    description: "ვგეგმავთ და ვმართავთ კამპანიებს Facebook-ზე, Instagram-ზე და Google-ში თქვენი ბიზნესის მიზნების მიხედვით.",
    price: "ფასი ინდივიდუალურია, კონსულტაცია უფასოა",
    sectionTitle: "რეკლამის არხები და კამპანიის მართვა",
    sectionLine: "პირველ შეხვედრაზე ვათანხმებთ, ვისთან გსურთ კომუნიკაცია და რა შედეგს ელით კამპანიისგან.",
    cards: [
      { icon: Megaphone, title: "Facebook და Instagram", body: "ვამზადებთ რეკლამის ტექსტსა და ვიზუალს, ვარჩევთ აუდიტორიას და ვუშვებთ კამპანიას შესაბამის არხებზე." },
      { icon: Search, title: "Google Ads", body: "ვგეგმავთ Google-ის რეკლამას თქვენი შეთავაზებისა და იმ აუდიტორიის მიხედვით, რომელსაც გსურთ მიაწვდინოთ ხმა." },
      { icon: ChartNoAxesColumnIncreasing, title: "კამპანიის მართვა", body: "ვაკვირდებით კამპანიის შედეგებს. მონაცემების მიხედვით ვასწორებთ რეკლამას და ვაფასებთ, რა მუშაობს უკეთ." },
    ],
    process: [
      { title: "ვათანხმებთ მიზანს", body: "ერთად ვარჩევთ, ვის ვაჩვენოთ რეკლამა და რა შედეგს ველით." },
      { title: "ვამზადებთ კამპანიას", body: "ვამზადებთ ტექსტსა და ვიზუალს და ვუშვებთ რეკლამას." },
      { title: "ვაფასებთ შედეგებს", body: "ვზომავთ შედეგებს და მონაცემებით ვასწორებთ კამპანიას." },
    ],
    faq: [
      { question: "რა ღირს კამპანიის მართვა?",
        answer: "ფასი ინდივიდუალურია. უფასო კონსულტაციაზე განვიხილავთ მიზანს, არხებსა და სამუშაოს მოცულობას, შემდეგ კი ვათანხმებთ შეთავაზებას." },
      { question: "რომელ არხებზე უშვებთ რეკლამას?",
        answer: "ვმუშაობთ Facebook-ზე, Instagram-ზე და Google Ads-ში. არხს ვარჩევთ კამპანიის მიზნისა და აუდიტორიის მიხედვით." },
      { question: "გაშვების შემდეგაც მართავთ კამპანიას?",
        answer: "დიახ. ვზომავთ შედეგებს და მონაცემების მიხედვით ვასწორებთ კამპანიას." },
    ],
  },
  en: {
    seoTitle: "Digital Advertising on Facebook, Instagram and Google",
    seoDescription: "Facebook and Instagram advertising, Google Ads and campaign management. Get a custom quote in a free initial consultation.",
    description: "We plan and manage campaigns on Facebook, Instagram and Google around your business goals.",
    price: "Custom pricing, free consultation",
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
  return <MarketingServicePage service="advertising" serviceType="Digital Advertising" copy={copy} />;
}
