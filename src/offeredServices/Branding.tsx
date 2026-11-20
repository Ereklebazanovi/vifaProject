import { Compass, Fingerprint, LayoutTemplate, Palette } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";

const copy = {
  ka: {
    seoTitle: "ბრენდინგი, ლოგოს დიზაინი და ვიზუალური იდენტობა",
    seoDescription: "ბრენდის პოზიციონირება, ლოგოს დიზაინი, ვიზუალური იდენტობა და გრაფიკული დიზაინი. სამუშაოს მოცულობასა და ფასს კონსულტაციაზე ვათანხმებთ.",
    description: "ვქმნით ლოგოსა და ვიზუალურ იდენტობას. ვაყალიბებთ, რას ამბობს თქვენი ბრენდი და რა ტონით ესაუბრება აუდიტორიას.",
    price: "ფასს კონსულტაციაზე ვათანხმებთ",
    sectionTitle: "რას ვქმნით ბრენდისთვის",
    sectionLine: "შეგიძლიათ დაგვიკვეთოთ ცალკე ლოგო და გრაფიკული მასალა ან ბრენდის სრული ვიზუალური იდენტობა.",
    cards: [
      { icon: Fingerprint, title: "ლოგოს დიზაინი", body: "ვქმნით ნიშანს, რომელიც ბრენდს სხვადასხვა ფორმატშიც ადვილად ამოსაცნობს გახდის." },
      { icon: Palette, title: "ვიზუალური იდენტობა", body: "ვარჩევთ ფერებსა და შრიფტს და ლოგოსთან ერთად ვქმნით ბრენდის ერთიან ვიზუალურ სტილს." },
      { icon: LayoutTemplate, title: "გრაფიკული დიზაინი", body: "ვქმნით პოსტებისა და რეკლამის ვიზუალს, რომელიც თქვენი ბრენდის სტილს ერგება." },
      { icon: Compass, title: "ბრენდის პოზიციონირება", body: "ვაყალიბებთ ბრენდის მთავარ სათქმელს და ვარჩევთ აუდიტორიასთან კომუნიკაციის ტონს." },
    ],
    process: [
      { title: "ვარკვევთ, რა გჭირდებათ", body: "ვათანხმებთ, რისთვის გამოიყენებთ დიზაინს და რა უნდა შევქმნათ." },
      { title: "ვირჩევთ ვიზუალურ სტილს", body: "ბრენდისთვის ვარჩევთ ლოგოს, ფერებსა და შრიფტს." },
      { title: "ვქმნით გრაფიკულ მასალას", body: "შეთანხმებულ სტილს ვიყენებთ პოსტებსა და რეკლამაში." },
    ],
    faq: [
      { question: "მხოლოდ ლოგოს დიზაინის შეკვეთა შეიძლება?",
        answer: "დიახ. შეგვიძლია დავამზადოთ მხოლოდ ლოგო ან შევქმნათ სრული ვიზუალური იდენტობა, იმის მიხედვით, რა სჭირდება თქვენს ბრენდს." },
      { question: "არსებული ბრენდის განახლებაზეც მუშაობთ?",
        answer: "დიახ. საჭიროების შემთხვევაში ვმუშაობთ სრულ რებრენდინგზეც, მათ შორის პოზიციონირებასა და ვიზუალურ იდენტობაზე." },
      { question: "რა ღირს ბრენდინგი?",
        answer: "ფასს კონსულტაციაზე ვათანხმებთ, როცა გავიგებთ, გჭირდებათ ცალკე დიზაინი, სრული იდენტობა თუ პოზიციონირებაც." },
    ],
  },
  en: {
    seoTitle: "Branding, Logo Design and Visual Identity",
    seoDescription: "Brand positioning, logo design, visual identity and graphic design. We agree on the scope and price during a consultation.",
    description: "We design logos and visual identities, and define what your brand says and how it speaks to its audience.",
    price: "Pricing on consultation",
    sectionTitle: "What we create for your brand",
    sectionLine: "You can order a logo, graphics or a complete visual identity for your brand.",
    cards: [
      { icon: Fingerprint, title: "Logo design", body: "We design a mark that makes the brand recognizable across formats." },
      { icon: Palette, title: "Visual identity", body: "We choose colors and type that work with the logo and give your brand a consistent look." },
      { icon: LayoutTemplate, title: "Graphic design", body: "We create graphics for posts and ads that fit your brand's style." },
      { icon: Compass, title: "Brand positioning", body: "We define the core message and choose a tone that fits your audience." },
    ],
    process: [
      { title: "Clarify the scope", body: "We agree on what you need and how you’ll use the design." },
      { title: "Choose a visual style", body: "We choose a logo, colors and type for your brand." },
      { title: "Create the graphics", body: "We apply the agreed style to posts and ads." },
    ],
    faq: [
      { question: "Can I order just a logo?",
        answer: "Yes. We can design only a logo or develop a complete visual identity, depending on what your brand needs." },
      { question: "Do you update existing brands?",
        answer: "Yes. We can work on a full rebrand, including positioning and visual identity, where needed." },
      { question: "How much does branding cost?",
        answer: "We agree on the price in a consultation once we know whether you need an individual design, a full identity or positioning as well." },
    ],
  },
};

export default function Branding() {
  return <MarketingServicePage service="branding" serviceType="Branding and Design" copy={copy}
    cardArtifacts={["logo", "identity", "poster", "voice"]} />;
}
