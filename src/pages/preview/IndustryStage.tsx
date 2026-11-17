// Parked for the industry page template (REDESIGN_PLAN §2.D).
import { BrowserWindowObject, ChatbotPhoneObject, LineupPhoneObject } from "./ProductDevices";
import { CommerceScene } from "./CommerceScene";
import { sceneTimings, useProductScene } from "./useProductScene";
import type { SceneTiming } from "./useProductScene";

const commerceTiming: SceneTiming = { steps: [600, 950, 1850, 2650, 3450, 4050], duration: 4650 };
const shortChatTiming: SceneTiming = { steps: [450, 850, 2050], duration: 2650 };
interface Industry {
  slug: string;
  chip: string;
  photo?: string;
  notification?: { title: string; body: string };
  messages?: readonly string[];
}

export function IndustryStage({ industry, loop }: { industry: Industry; loop: boolean }) {
  const product = industry.slug === "retail" ? "invento" : industry.slug === "academy" ? "lineup" : industry.slug === "legal-finance" ? "web" : "chatbot";
  const timing = industry.slug === "retail" ? commerceTiming : industry.slug === "other" ? shortChatTiming : sceneTimings[product];
  const scene = useProductScene<HTMLDivElement>(product, { timing, loop, threshold: 0.25, replayOnHover: false });
  return <div ref={scene.cardRef} className={`it-industry-scene it-stage-${industry.slug}`} aria-hidden="true"
    data-scene-step={scene.step} data-exiting={scene.exiting} data-loop-cycle={scene.cycle} data-reduced-motion={scene.reducedMotion}>
    {industry.slug === "retail" ? <CommerceScene step={scene.step} exiting={scene.exiting} />
      : industry.slug === "academy" ? <div className="it-hero-device it-hero-lineup"><LineupPhoneObject step={scene.step} exiting={scene.exiting} reducedMotion={scene.reducedMotion} /></div>
      : <>
        <div className="it-hero-device it-hero-browser">
          <BrowserWindowObject step={scene.step} exiting={scene.exiting} mode={industry.notification ? "notification" : "checkout"} notification={industry.notification} address="">
            <div className="it-industry-site"><div className="it-industry-site-header"><span /><span /></div><img src={industry.photo} alt="" /></div>
          </BrowserWindowObject>
        </div>
        {industry.slug !== "legal-finance" && <div className="it-hero-device it-hero-chatbot">
          <ChatbotPhoneObject step={scene.step} reducedMotion={scene.reducedMotion} exiting={scene.exiting} messages={industry.messages} title={industry.slug === "other" ? "VIFA" : industry.chip} />
        </div>}
      </>}
  </div>;
}
