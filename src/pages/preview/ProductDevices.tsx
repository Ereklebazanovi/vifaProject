import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { AcademyHeader, BottomNav, PARENT_ICONS, PhoneFrame, PushBanner, Screen } from "../../components/lineup/AppKit";
import { app, monthIndex } from "../../components/lineup/content";
export function BrowserWindowObject({ step, mode = "responsive", children }: {
  step: number;
  mode?: "responsive" | "notification" | "checkout";
  children?: ReactNode;
}) {
  return (
    <div className={`it-obj-browser ${mode === "responsive" ? "it-responsive-browser" : ""}`}
      data-mobile={mode === "responsive" && step > 0} aria-hidden="true">
      <div className="it-browser-bar">
        <div className="it-browser-dots">
          <span className="it-browser-dot" />
          <span className="it-browser-dot" />
          <span className="it-browser-dot" />
        </div>
        <div className="it-browser-pill">vifadigital.ge</div>
      </div>
      <div className="it-browser-body">
        {children ?? <>
          <img src="/preview/vifa-desktop.png" alt="VIFA" className="it-browser-img it-browser-desktop-img" />
          {mode === "responsive" && <img src="/preview/vifa-mobile.png" alt="" className="it-browser-img it-browser-mobile-img" />}
        </>}
        {mode === "notification" && step > 0 && (
          <div className="it-scene-notification it-website-notification">
            <div className="it-notification-heading">
              <strong>ახალი მოთხოვნა საიტიდან</strong>
              <span>ახლა</span>
            </div>
            <p>მაინტერესებს საიტის ფასი.</p>
          </div>
        )}
      </div>
    </div>
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

export function ChatbotPhoneObject({ step, reducedMotion }: {
  step: number;
  reducedMotion: boolean;
}) {
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const messages = messagesRef.current;
    if (messages) messages.scrollTo({ top: messages.scrollHeight, behavior: "instant" });
  }, [step]);

  return (
    <PreviewPhone>
      <div className="it-light-phone-screen">
        <div className="it-light-status-bar">
          <span>02:14</span>
          <span className="it-light-status-battery" />
        </div>
        <div className="it-light-chat-header">
          <span className="it-light-chat-avatar" />
          <span className="it-light-chat-title">რესტორანი</span>
        </div>
        <div ref={messagesRef} className="it-light-chat-messages" data-reduced-motion={reducedMotion}>
          {step >= 1 && <div className="it-light-bubble it-light-bubble-customer">
            ხვალ 20:00-ზე ოთხ კაცზე მაგიდა გაქვთ?
          </div>}
          {step >= 3 && <div className="it-light-bubble it-light-bubble-bot">
            დიახ, თავისუფალია. ვისი სახელით დავჯავშნო?
          </div>}
          {step >= 4 && <div className="it-light-bubble it-light-bubble-customer">
            ნინოს სახელით.
          </div>}
          {step >= 6 && <div className="it-light-bubble it-light-bubble-bot">
            დაჯავშნილია: ხვალ, 20:00, ოთხი სტუმარი.
          </div>}
          {(step === 2 || step === 5) && <div key={step} className="it-light-bubble it-light-bubble-bot it-chat-typing">
            <span /><span /><span />
          </div>}
        </div>
      </div>
    </PreviewPhone>
  );
}

export function LaptopObject({ step, shipping = false }: { step: number; shipping?: boolean }) {
  return (
    <div className="it-obj-laptop" aria-hidden="true">
      <div className="it-laptop-screen">
        <img
          src="/invento-demo-inventory.webp"
          alt="Invento WMS საწყობის მართვის სისტემა"
          className="it-laptop-img"
        />
        {step > 0 && (
          <div className="it-scene-notification it-invento-notification">
            <strong>ახალი შეკვეთა #1043</strong>
            <p>აბრეშუმის ბალიშისპირი × 1</p>
            <p>მარაგი: 21 → <span className="it-stock-digit" data-updated={step >= 2}>
              <span>21</span><span>20</span>
            </span> ცალი</p>
          </div>
        )}
        {shipping && <div className="it-scene-notification it-shipping-notification">
          <strong>საკურიერო სტიკერი მზადაა</strong>
          <p>შეკვეთა #1043 · ბეჭდვა</p>
        </div>}
      </div>
      <div className="it-laptop-base">
        <span className="it-laptop-notch" />
      </div>
    </div>
  );
}

function LineupPhoneContent() {
  const t = app.ka;
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

export function LineupPhoneObject({ step, reducedMotion }: {
  step: number;
  reducedMotion: boolean;
}) {
  return (
    <PreviewPhone>
      <LineupPhoneContent />
      <div className="it-lineup-push" data-reduced-motion={reducedMotion}>
        <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
          <PushBanner show={step > 0} title={app.ka.pushPaidTitle}
            body={app.ka.pushPaidBody(monthIndex())} t={app.ka} />
        </MotionConfig>
      </div>
    </PreviewPhone>
  );
}

