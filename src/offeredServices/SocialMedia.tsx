import { CalendarDays, PanelsTopLeft, PenLine } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";
import { MarketingWork } from "../components/ui/MarketingWork";
import { socialMediaMonthlyPrices } from "../data/marketingServices";
import { useShorts } from "../hooks/useShorts";
import { packages, SocialMediaPackages } from "./SocialMediaPackages";

const copy = {
  ka: {
    seoTitle: "სოციალური მედიის მართვა (SMM) და კონტენტის შექმნა",
    seoDescription: "სოციალური მედიის მართვა, პოსტების გეგმა, ფოტოები და რილსები. შეადარეთ Core, Growth და Scale. გვერდების მართვა 1000 ₾-დან თვეში.",
    description: "ვგეგმავთ, ვამზადებთ და ვაქვეყნებთ პოსტებსა და რილსებს.",
    price: "1000 ₾-დან თვეში",
    sectionTitle: "რას მოიცავს გვერდების მართვა",
    cards: [
      { icon: CalendarDays, title: "კონტენტის გეგმა", body: "ვადგენთ თემებს და ვწყვეტთ, რა როდის გამოქვეყნდება." },
      { icon: PenLine, title: "კონტენტის შექმნა", body: "ვწერთ ტექსტებს, ვაფორმებთ პოსტებს, ვიღებთ ფოტოებსა და რილსებს." },
      { icon: PanelsTopLeft, title: "გვერდების მართვა", body: "პოსტებს შეთანხმებულ დროს ვაქვეყნებთ და შედეგებს ვამოწმებთ." },
    ],
    faq: [
      { question: "რა ღირს სოციალური მედიის მართვა?",
        answer: `საორიენტაციო ფასები თვეში: Core ${socialMediaMonthlyPrices.Core} ₾, Growth ${socialMediaMonthlyPrices.Growth} ₾, Scale ${socialMediaMonthlyPrices.Scale} ₾. ზუსტ ფასს სამუშაოს მოცულობის მიხედვით უფასო კონსულტაციაზე შევათანხმებთ.` },
      { question: "რამდენ პოსტს აქვეყნებთ თვეში?",
        answer: "Core პაკეტში თვეში 5 პოსტს ვამზადებთ და ვაქვეყნებთ: რილსს, ვიდეოს ან პოსტერს. Growth-სა და Scale-ში მასალის რაოდენობას ინდივიდუალურად ვათანხმებთ." },
      { question: "პაკეტებში ფოტო და ვიდეო გადაღებაც შედის?",
        answer: "Core-ში შედის 5 პოსტი: რილსი, ვიდეო ან პოსტერი. Growth-ში ემატება ფოტოგადაღება და ვიდეოს სცენარები, Scale-ში კი ვიდეოგადაღება, სააგენტოს სპიკერები და TikTok-ის კონტენტი." },
    ],
  },
  en: {
    seoTitle: "Social Media Management (SMM) and Content Creation",
    seoDescription: "Social media management, posts, photos and reels. Compare Core, Growth and Scale, starting at 1000 GEL per month.",
    description: "We plan, create and publish posts and reels.",
    price: "From 1000 ₾ per month",
    sectionTitle: "What social media management includes",
    cards: [
      { icon: CalendarDays, title: "Content planning", body: "We pick the topics and decide what goes out when." },
      { icon: PenLine, title: "Content creation", body: "We write the copy, design the posts and shoot photos and reels." },
      { icon: PanelsTopLeft, title: "Page management", body: "We publish on schedule and check the results." },
    ],
    faq: [
      { question: "How much does social media management cost?",
        answer: `Approximate monthly prices: Core ${socialMediaMonthlyPrices.Core} ₾, Growth ${socialMediaMonthlyPrices.Growth} ₾, Scale ${socialMediaMonthlyPrices.Scale} ₾. We agree on the exact price for your scope in a free consultation.` },
      { question: "How many posts do you publish each month?",
        answer: "Core includes 5 posts a month: reels, videos or posters. In Growth and Scale we agree on the amount of content individually." },
      { question: "Do packages include photos and videos?",
        answer: "Core includes 5 posts: reels, videos or posters. Growth adds photo shoots and video scripts, and Scale adds video shoots, agency speakers and TikTok content." },
    ],
  },
};

export default function SocialMedia() {
  const shorts = useShorts();
  return (
    <MarketingServicePage service="socialMedia" serviceType="Social Media Management" copy={copy}
      cardArtifacts={["calendar", "post", "comment"]}
      offers={packages.map(({ name, price }) => ({ name, price, unitText: "month" }))}>
      {(language, whatsappHref) => <>
        <SocialMediaPackages language={language} whatsappHref={whatsappHref} />
        <MarketingWork language={language} shorts={shorts} />
      </>}
    </MarketingServicePage>
  );
}
