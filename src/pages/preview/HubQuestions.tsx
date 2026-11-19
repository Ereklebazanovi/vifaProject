import { FaqSection } from "../../components/ui/FaqSection";
import { hubFaqs } from "./hubFaqData";

export function HubQuestions() {
  return <FaqSection title="ხშირი კითხვები" items={hubFaqs} />;
}
