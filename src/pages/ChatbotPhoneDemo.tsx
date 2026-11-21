import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Camera, ChevronLeft, Image, Mic, Plus, ThumbsUp } from "lucide-react";

const scenarios = [
  { id: "shop", questions: { ka: ["M ზომა?", "მიტანა?"], en: ["Size M?", "Delivery?"] } },
  { id: "clinic", questions: { ka: ["წმენდის ფასი?", "თავისუფალი დრო?"], en: ["Cleaning price?", "Available times?"] } },
  { id: "rent", questions: { ka: ["SUV available?", "Airport delivery?"], en: ["SUV available?", "Airport delivery?"] } },
  { id: "salon", questions: { ka: ["მანიკიურის ფასი?", "კვირას მუშაობთ?"], en: ["Manicure price?", "Open on Sunday?"] } },
] as const;

type Language = "ka" | "en";
type Scenario = (typeof scenarios)[number];
type Translate = (key: string) => string;
type Message = { text: string; bot: boolean };

const scriptLength = 6;
const answerLines = [2, 4] as const;

function ChatSession({ scenario, language, t, onDone }: {
  scenario: Scenario;
  language: Language;
  t: Translate;
  onDone: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(1);
  const [replies, setReplies] = useState<Message[]>([]);
  const [pending, setPending] = useState<number | null>(null);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const dialogue = useRef<HTMLDivElement>(null);
  const en = language === "en";
  const scriptedCount = reducedMotion ? scriptLength : shown;
  const finished = scriptedCount === scriptLength;
  const typing = pending !== null || (!finished && shown % 2 === 1);
  const chat = (key: string) => t(`chat.${scenario.id}.${key}`);

  useEffect(() => {
    if (reducedMotion || finished) return;
    const timer = window.setTimeout(() => setShown((count) => count + 1), shown % 2 === 1 ? 1500 : 1100);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, finished, shown]);

  useEffect(() => {
    if (reducedMotion || !finished || pending !== null || keyboardFocused) return;
    const timer = window.setTimeout(onDone, 10000);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, finished, pending, keyboardFocused, onDone]);

  const pendingAnswer = pending === null ? null : chat(`m${answerLines[pending]}`);
  useEffect(() => {
    if (pendingAnswer === null) return;
    const timer = window.setTimeout(() => {
      setReplies((previous) => [...previous, { text: pendingAnswer, bot: true }]);
      setPending(null);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [pendingAnswer]);

  useLayoutEffect(() => {
    const panel = dialogue.current;
    if (!panel) return;
    panel.scrollTo({
      top: reducedMotion && replies.length === 0 ? 0 : panel.scrollHeight - panel.clientHeight,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, [reducedMotion, scriptedCount, replies, typing]);

  const scripted = Array.from({ length: scriptedCount }, (_, index) => ({
    text: chat(`m${index + 1}`), bot: index % 2 === 1,
  }));
  const messages = [...scripted, ...replies];
  const name = chat("label");
  const subtitle = !en && scenario.id === "rent" ? "ტურისტს ინგლისურადაც პასუხობს" : t("chat.status");
  const ask = (index: number) => {
    if (!finished || pending !== null) return;
    setReplies((previous) => [...previous, { text: scenario.questions[language][index], bot: false }]);
    setPending(index);
  };

  return (
    <div className="chatbot-screen"
      onFocus={(event) => setKeyboardFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false); }}
      onPointerDown={() => setKeyboardFocused(false)}>
      <div className="chatbot-phone-status" aria-hidden="true"><span>{chat("time")}</span><span /></div>
      <div className="chatbot-phone-header">
        <ChevronLeft size={17} aria-hidden="true" />
        <span className="chatbot-avatar" aria-hidden="true">{name.slice(0, 1)}</span>
        <div><strong>{name}</strong><p>{subtitle}</p></div>
      </div>
      <div ref={dialogue} className="chatbot-dialogue" tabIndex={0} role="region" aria-label={t("demo.title")}
        lang={scenario.id === "rent" ? "en" : language}>
        <div className="chatbot-messages">
          <p className="chatbot-stamp">{chat("stamp")}</p>
          {messages.map(({ text, bot }, index) => (
            <div key={index} className="chatbot-message" data-bot={bot}>
              <p>{text.replace(/(\d)₾/g, "$1 ₾")}</p>
            </div>
          ))}
          {typing && <div className="chatbot-message" data-bot="true" aria-hidden="true">
            <span className="chatbot-typing"><i /><i /><i /></span>
          </div>}
        </div>
      </div>
      <div className="chatbot-quick-replies" role="group" aria-label={en ? "Try a quick reply" : "სცადეთ სწრაფი კითხვა"}
        data-ready={finished} aria-hidden={!finished} lang={scenario.id === "rent" ? "en" : language}>
        {scenario.questions[language].map((question, index) => (
          <button key={question} type="button" disabled={!finished} aria-disabled={pending !== null} onClick={() => ask(index)}>{question}</button>
        ))}
      </div>
      <div className="chatbot-input" aria-hidden="true">
        <Plus /><Camera /><Image /><Mic /><span>Aa</span><ThumbsUp />
      </div>
      <span className="sr-only" role="status">{replies.at(-1)?.bot ? replies.at(-1)?.text : ""}</span>
    </div>
  );
}

export function ChatbotPhoneDemo({ t, language }: { t: Translate; language: Language }) {
  const [index, setIndex] = useState(0);
  const scenario = scenarios[index];
  const advance = useCallback(() => setIndex((previous) => (previous + 1) % scenarios.length), []);

  return (
    <div className="chatbot-demo">
      <div className="chatbot-phone">
        <ChatSession key={`${scenario.id}-${language}`} t={t} language={language} scenario={scenario} onDone={advance} />
      </div>
      <div role="group" aria-label={t("demo.title")} className="chatbot-scenarios">
        {scenarios.map(({ id }, position) => (
          <button key={id} type="button" aria-pressed={index === position} onClick={() => setIndex(position)}>
            {t(`chat.${id}.label`)}
          </button>
        ))}
      </div>
    </div>
  );
}
