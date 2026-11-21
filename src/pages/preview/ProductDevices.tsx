import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { Building2, Menu } from "lucide-react";
import { AcademyHeader, BottomNav, PARENT_ICONS, PhoneFrame, PushBanner, Screen } from "../../components/lineup/AppKit";
import { app, monthIndex } from "../../components/lineup/content";
import type { ItLanguage } from "../../data/itServices";
export function BrowserWindowObject({ step, exiting = false, mode = "responsive", children, phone, notification, address = "vifadigital.ge" }: {
  step: number;
  exiting?: boolean;
  mode?: "responsive" | "notification" | "checkout";
  children?: ReactNode;
  phone?: ReactNode; // the phone screen in "responsive" mode; defaults to this site's mobile screenshot
  notification?: { title: string; body: string };
  address?: string;
}) {
  return (
    <>
    <div className="it-obj-browser" aria-hidden="true">
      <div className="it-browser-bar">
        <div className="it-browser-dots">
          <span className="it-browser-dot" />
          <span className="it-browser-dot" />
          <span className="it-browser-dot" />
        </div>
        <div className="it-browser-pill">{address}</div>
      </div>
      <div className="it-browser-body">
        {children ?? <>
          <img src="/preview/vifa-desktop.png?v=2" alt="VIFA" className="it-browser-img it-browser-desktop-img" />
        </>}
        {mode === "notification" && (
          <div className="it-scene-notification it-website-notification it-scene-element" data-show={step > 0 && !exiting}>
            <div className="it-notification-heading">
              <strong>{notification?.title ?? "ახალი მოთხოვნა საიტიდან"}</strong>
              <span>ახლა</span>
            </div>
            <p>{notification?.body ?? "მაინტერესებს საიტის ფასი."}</p>
          </div>
        )}
      </div>
    </div>
    {mode === "responsive" && <div className="it-website-phone it-scene-element" data-show={step > 0 && !exiting} data-exiting={exiting} aria-hidden="true">
      <PreviewPhone>
        <div className="it-site-phone-screen">{phone ?? <img src="/preview/vifa-mobile.png?v=2" alt="" />}</div>
      </PreviewPhone>
    </div>}
    </>
  );
}

// Photo-led demo of a residential development, with a wide browser crop and a tall phone crop.
// The courtyard photograph is Pexels 27307397.
const realtyLinks = {
  ka: ["პროექტები", "ბინები", "კონტაქტი"],
  en: ["Projects", "Apartments", "Contact"],
};

function SiteDemo({ compact = false, language }: { compact?: boolean; language: ItLanguage }) {
  return (
    <div className="it-site-demo" data-compact={compact}>
      <div className="it-site-demo-nav">
        <span className="it-site-demo-mark"><Building2 size={compact ? 18 : 11} strokeWidth={2} /></span>
        {compact ? <Menu className="it-site-demo-menu" size={24} /> : <span className="it-site-demo-links">{realtyLinks[language].map((link) => <span key={link}>{link}</span>)}</span>}
      </div>
      <div className="it-site-demo-photo">
        <img src={`/preview/site-demo-realty-${compact ? "tall" : "wide"}.webp?v=1`} alt="" />
        <span className="it-site-demo-cta">{language === "ka" ? "ბინის არჩევა" : "Find an apartment"}</span>
      </div>
    </div>
  );
}

export function WebsiteDemoObject({ step, exiting = false, language = "ka" }: { step: number; exiting?: boolean; language?: ItLanguage }) {
  return (
    <BrowserWindowObject step={step} exiting={exiting} address={language === "ka" ? "თქვენისაიტი.ge" : "yourwebsite.ge"}
      phone={<SiteDemo compact language={language} />}>
      <SiteDemo language={language} />
    </BrowserWindowObject>
  );
}

function PreviewPhone({ children }: { children: ReactNode }) {
  return (
    <div className="it-obj-phone" aria-hidden="true">
      <div className="it-phone-scale">
        <div className="it-phone-scale-inner">
          <PhoneFrame>{children}</PhoneFrame>
        </div>
      </div>
    </div>
  );
}

const reservationChat = {
  ka: [
    "ხვალ 20:00-ზე 4 სტუმრისთვის მაგიდა გაქვთ?",
    "დიახ, თავისუფალია. ვისი სახელით დავჯავშნო?",
    "ნინოს სახელით.",
    "მაგიდა დაჯავშნილია. ხვალ 20:00-ზე გელოდებით.",
  ],
  en: [
    "Do you have a table for four tomorrow at 8 pm?",
    "Yes. What name should I put on the reservation?",
    "Nino.",
    "You're booked. See you tomorrow at 8 pm.",
  ],
};

export function ChatbotPhoneObject({
  step, reducedMotion, exiting = false, language = "ka", messages = reservationChat[language],
  title = language === "ka" ? "რესტორანი" : "Restaurant",
}: {
  step: number;
  reducedMotion: boolean;
  exiting?: boolean;
  messages?: readonly string[];
  title?: string;
  language?: ItLanguage;
}) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useLayoutEffect(() => {
    const viewport = messagesRef.current;
    const thread = threadRef.current;
    if (!viewport || !thread) return;
    const measure = () => {
      const index = Math.min(messages.length - 1, step >= 5 ? 3 : step >= 4 ? 2 : step >= 2 ? 1 : 0);
      const turn = thread.children[index] as HTMLElement;
      const bottom = step === 0 ? 0 : turn.offsetTop + ((step === 2 || step === 5) ? 32 : turn.offsetHeight);
      setOffset(-Math.max(0, bottom - (viewport.clientHeight - 24)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(thread);
    return () => observer.disconnect();
  }, [step, messages]);

  return (
    <PreviewPhone>
      <div className="it-light-phone-screen">
        <div className="it-light-status-bar">
          <span>02:14</span>
          <span className="it-light-status-battery" />
        </div>
        <div className="it-light-chat-header">
          <span className="it-light-chat-avatar" />
          <span className="it-light-chat-title">{title}</span>
        </div>
        <div ref={messagesRef} className="it-light-chat-messages" data-reduced-motion={reducedMotion}>
          <div ref={threadRef} className="it-chat-thread" data-reset={step === 0}
            style={{ "--it-thread-offset": `${offset}px` } as CSSProperties}>
          {messages.map((message, index) => {
            const customer = index % 2 === 0;
            const reveal = [1, 3, 4, 6][index];
            return <div key={message} className={`it-chat-turn${customer ? " it-chat-turn-customer" : ""}`}>
              <div className={`it-light-bubble it-light-bubble-${customer ? "customer" : "bot"} it-scene-element`} data-show={step >= reveal && !exiting}>{message}</div>
              {!customer && <TypingIndicator show={step === reveal - 1 && !exiting} />}
            </div>;
          })}
          </div>
        </div>
      </div>
    </PreviewPhone>
  );
}

function TypingIndicator({ show }: { show: boolean }) {
  return <div className="it-light-bubble it-light-bubble-bot it-chat-typing it-scene-element" data-show={show}>
    <span /><span /><span />
  </div>;
}

export function LaptopObject({ step, shipping = false, exiting = false, language = "ka" }: {
  step: number; shipping?: boolean; exiting?: boolean; language?: ItLanguage;
}) {
  const ka = language === "ka";
  return (
    <div className="it-obj-laptop" aria-hidden="true">
      <div className="it-laptop-screen">
        <img
          src="/invento-demo-inventory.webp"
          alt={ka ? "Invento WMS საწყობის მართვის სისტემა" : "Invento WMS stock management"}
          className="it-laptop-img"
          width={1440}
          height={900}
        />
          <div className="it-scene-notification it-invento-notification it-scene-element" data-show={step > 0 && !exiting}>
            <strong>{ka ? "ახალი შეკვეთა #1043" : "New order #1043"}</strong>
            <p>{ka ? "აბრეშუმის ბალიშისპირი" : "Silk pillowcase"} × 1</p>
            <p>{ka ? "მარაგი" : "Stock"}: 21 → <span className="it-stock-digit" data-updated={step >= 2}>
              <span>21</span><span>20</span>
            </span> {ka ? "ცალი" : "units"}</p>
          </div>
        <div className="it-scene-notification it-shipping-notification it-scene-element" data-show={shipping && !exiting}>
          <strong>{ka ? "საკურიერო სტიკერი მზადაა" : "Shipping label ready"}</strong>
          <p>{ka ? "შეკვეთა #1043 · ბეჭდვა" : "Order #1043 · Print"}</p>
        </div>
      </div>
      <div className="it-laptop-base">
        <span className="it-laptop-notch" />
      </div>
    </div>
  );
}

function LineupPhoneContent({ language }: { language: ItLanguage }) {
  const t = app[language];
  const luka = t.kids[0];
  return (
    <Screen
      header={<AcademyHeader t={t} badge={0} />}
      nav={<BottomNav labels={t.navParent} icons={PARENT_ICONS} active={0} />}
    >
      <div className="rounded-2xl border border-[#27272a] bg-[#18181b] overflow-hidden">
        <div
          className="relative flex items-center gap-3 overflow-hidden p-3"
          style={{ background: "#FA7923" }}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[14px] font-semibold text-[#FA7923]">
            {luka.first[0]}
            {luka.last[0]}
          </span>
          <span className="relative">
            <span className="block text-[14px] font-semibold leading-tight text-white">
              {luka.first} {luka.last}
            </span>
            <span className="block text-[10px] text-white/80">
              {t.group} · #{luka.no}
            </span>
          </span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-[#27272a] py-2 text-center">
          <span>
            <span className="block text-[15px] font-semibold text-[#34d399]">
              94%
            </span>
            <span className="block text-[9px] text-zinc-400">
              {t.attendance}
            </span>
          </span>
          <span>
            <span className="block text-[15px] font-semibold text-[#FA7923]">
              7.7
            </span>
            <span className="block text-[9px] text-zinc-400">{t.rating}</span>
          </span>
          <span>
            <span className="block text-[15px] font-semibold text-[#34d399]">
              ↑0.7
            </span>
            <span className="block text-[9px] text-zinc-400">{t.growth}</span>
          </span>
        </div>
      </div>

      <div className="mt-2 rounded-2xl border border-[#27272a] bg-[#18181b] p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-400">{t.nextActivity}</span>
          <span className="font-semibold text-white">{t.tomorrow}</span>
        </div>
        <div className="mt-1 text-[10px] text-zinc-400">{t.practice}</div>
      </div>

      <div className="mt-2 flex items-center justify-between rounded-2xl border border-[#27272a] bg-[#18181b] px-3 py-2.5">
        <span className="text-[11px] text-zinc-200">{t.feeOf(monthIndex())}</span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-400">
          {t.paid}
        </span>
      </div>
    </Screen>
  );
}

export function LineupPhoneObject({ step, reducedMotion, exiting = false, language = "ka" }: {
  step: number;
  reducedMotion: boolean;
  exiting?: boolean;
  language?: ItLanguage;
}) {
  const t = app[language];
  return (
    <PreviewPhone>
      <LineupPhoneContent language={language} />
      <div className="it-lineup-push" data-reduced-motion={reducedMotion} data-show={step > 0 && !exiting}>
        <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
          <PushBanner show title={t.pushPaidTitle}
            body={t.pushPaidBody(monthIndex())} t={t} />
        </MotionConfig>
      </div>
    </PreviewPhone>
  );
}

