import { Check, ClipboardList, FileText, FolderOpen, ListChecks, MessageSquare, Send } from "lucide-react";
import type { MarketingLanguage, MarketingService } from "../../data/marketingServices";
import { HowWeStart } from "./HowWeStart";
import "./marketingArtifacts.css";

const examples = {
  hub: {
    ka: { request: "კამპანიის დაგეგმვა გვინდა.", plan: "კონტენტის გეგმა", output: "კამპანიის ანგარიში", items: ["არხების მიმოხილვა", "შემდეგი ნაბიჯები"] },
    en: { request: "We need a campaign plan.", plan: "Content plan", output: "Campaign report", items: ["Channel review", "Next steps"] },
  },
  socialMedia: {
    ka: { request: "გვერდის მართვა გვჭირდება.", plan: "პოსტების გეგმა", output: "პოსტების ანგარიში", items: ["პოსტების მიმოხილვა", "შემდეგი თემები"] },
    en: { request: "We need help managing our page.", plan: "Publishing plan", output: "Content report", items: ["Post review", "Upcoming topics"] },
  },
  advertising: {
    ka: { request: "რეკლამის გაშვება გვინდა.", plan: "კამპანიის მოკლე აღწერა", output: "რეკლამის ანგარიში", items: ["კამპანიის მიმოხილვა", "შესაცვლელი დეტალები"] },
    en: { request: "We’d like to run an ad.", plan: "Campaign brief", output: "Advertising report", items: ["Campaign review", "Proposed changes"] },
  },
  branding: {
    ka: { request: "ლოგოს განახლება გვინდა.", plan: "დიზაინის მოკლე აღწერა", output: "ჩაბარებული ფაილები", items: ["ლოგო", "გრაფიკული მასალა"] },
    en: { request: "We’d like to refresh our logo.", plan: "Design brief", output: "Delivered files", items: ["Logo", "Graphic assets"] },
  },
  production: {
    ka: { request: "კერძების გადაღება გვინდა.", plan: "გადაღების გეგმა", output: "ჩაბარებული ფაილები", items: ["ფოტოები", "დამონტაჟებული ვიდეო"] },
    en: { request: "We need a food shoot.", plan: "Shoot plan", output: "Delivered files", items: ["Photos", "Edited video"] },
  },
} as const;

export function MarketingProcess({ language, steps, service }: {
  language: MarketingLanguage;
  steps: ReadonlyArray<{ title: string; body: string }>;
  service: MarketingService | "hub";
}) {
  const ka = language === "ka";
  const example = examples[service][language];
  const files = service === "branding" || service === "production";
  const OutputIcon = files ? FolderOpen : ListChecks;
  const request = <div className="marketing-process-chat" data-process="request">
    <header><MessageSquare size={15} />{ka ? "მოთხოვნა" : "Request"}</header>
    <span>{example.request}</span>
    <span>{ka ? "დეტალები მოგვწერეთ." : "Tell us a little more."}</span>
  </div>;
  const approval = <div className="marketing-process-document" data-process="approval">
    <header><ClipboardList size={17} /><strong>{example.plan}</strong></header>
    <div className="marketing-process-lines"><i /><i /></div>
    <span className="marketing-process-status"><Check size={13} />{ka ? "შეთანხმებულია" : "Approved"}</span>
  </div>;
  const handoff = <div className="marketing-process-handoff" data-process="handoff">
    <div><Send size={18} /></div>
    <strong>{ka ? "გამოქვეყნება დაგეგმილია" : "Publishing scheduled"}</strong>
    <span>{ka ? "პოსტი და რეკლამა" : "Post and ad"}</span>
  </div>;
  const output = <div className="marketing-process-document" data-process={files ? "delivery" : "report"}>
    <header><OutputIcon size={17} /><strong>{example.output}</strong></header>
    <ul>{example.items.map(item => <li key={item}>
      {files ? <FileText size={13} /> : <Check size={13} />}{item}
    </li>)}</ul>
  </div>;
  const artifacts = service === "hub" ? [request, approval, handoff, output] : [request, approval, output];

  return <HowWeStart language={language} showExamples={false} showActions={false}
    processSteps={steps.map((step, index) => ({ ...step, artifact: artifacts[index] }))} />;
}
