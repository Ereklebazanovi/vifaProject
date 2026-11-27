import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SectionHeading } from "../components/ui/SectionHeading";
import "./chatbotTry.css";

// Live demo on the chatbot page: visitors talk to a real AI that only knows about our chatbot
// (instructions in api/_lib/demoBot.ts, served by api/demo-chat.ts).

type Language = "ka" | "en";
type Turn = { role: "user" | "assistant"; content: string; whatsapp?: boolean };

const copy = {
  ka: {
    title: "სცადეთ თავად",
    name: "VIFA ჩატბოტი",
    status: "ცოცხალი AI, პასუხობს წამებში",
    greeting: "გამარჯობა! მე VIFA-ს ჩატბოტი ვარ, ისეთივე, როგორსაც თქვენი ბიზნესისთვის ავაწყობთ. მკითხეთ, რაც გაინტერესებთ.",
    chips: ["რა ღირს?", "Instagram-ზეც პასუხობს?", "რამდენ ხანში ააწყობთ?", "ჩემს ბიზნესს მოერგება?"],
    placeholder: "დაწერეთ კითხვა...",
    send: "გაგზავნა",
    note: "საუბარი ინახება ბოტის გასაუმჯობესებლად. პირადი მონაცემები არ ჩაწეროთ.",
    whatsapp: "მოგვწერეთ WhatsApp-ზე",
    limit: "დღეისთვის დემოს ლიმიტი ამოიწურა. დანარჩენზე სიამოვნებით გიპასუხებთ WhatsApp-ზე, კონსულტაცია უფასოა.",
    unavailable: "ახლა ვერ გიპასუხებთ, ტექნიკური შეფერხებაა. მოგვწერეთ WhatsApp-ზე და გუნდი მალე გიპასუხებთ.",
  },
  en: {
    title: "Try it yourself",
    name: "VIFA chatbot",
    status: "Live AI, replies in seconds",
    greeting: "Hi! I'm VIFA's chatbot, the same kind we build for businesses. Ask me anything about it.",
    chips: ["How much is it?", "Does it work on Instagram?", "How long does setup take?", "Will it fit my business?"],
    placeholder: "Type a question...",
    send: "Send",
    note: "Chats are saved to improve the bot. Please don't share personal details.",
    whatsapp: "Message us on WhatsApp",
    limit: "The demo limit for today is reached. We'll gladly answer the rest on WhatsApp, the consultation is free.",
    unavailable: "I can't answer right now because of a technical issue. Message us on WhatsApp and the team will reply soon.",
  },
};

export function ChatbotTry({ language, whatsappHref }: { language: Language; whatsappHref: string }) {
  const text = copy[language];
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [closed, setClosed] = useState(false);
  // The greeting is "typed" when the chat first scrolls into view, so the window reads as a live bot.
  const [greeted, setGreeted] = useState(false);
  // One id per conversation, so the studio can show each talk as a whole (api/demo-chat.ts).
  const conversation = useRef("");
  const windowRef = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  // A new language starts a new conversation, greeting included.
  useEffect(() => {
    setTurns([]);
    setClosed(false);
    conversation.current = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(16).padStart(2, "0")).join("");
  }, [language]);

  useEffect(() => {
    const target = windowRef.current;
    if (!target || greeted) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGreeted(true);
      return;
    }
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = window.setTimeout(() => setGreeted(true), 1100);
    }, { threshold: 0.45 });
    observer.observe(target);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, [greeted]);

  useEffect(() => {
    const panel = log.current;
    if (panel && turns.length) panel.scrollTo({ top: panel.scrollHeight, behavior: "smooth" });
  }, [turns, pending]);

  async function send(question: string) {
    const content = question.trim().slice(0, 500);
    if (!content || pending || closed) return;
    const history: Turn[] = [...turns, { role: "user", content }];
    setTurns(history);
    setDraft("");
    setPending(true);
    try {
      const response = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: conversation.current,
          language,
          messages: [{ role: "assistant", content: text.greeting }, ...history].map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await response.json().catch(() => ({})) as { reply?: string; error?: string };
      if (response.ok && data.reply) {
        setTurns((previous) => [...previous, { role: "assistant", content: data.reply! }]);
      } else {
        const limited = response.status === 429;
        setTurns((previous) => [...previous, { role: "assistant", content: limited ? text.limit : text.unavailable, whatsapp: true }]);
        if (limited) setClosed(true);
      }
    } catch {
      setTurns((previous) => [...previous, { role: "assistant", content: text.unavailable, whatsapp: true }]);
    } finally {
      setPending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    send(draft);
    input.current?.focus();
  }

  const asked = turns.some((turn) => turn.role === "user");

  return (
    <section id="try" className="it-section it-col chatbot-section chatbot-try" aria-labelledby="chatbot-try-title">
      <SectionHeading id="chatbot-try-title">{text.title}</SectionHeading>
      <div ref={windowRef} className="chatbot-try-window">
        <header className="chatbot-try-header">
          <span className="chatbot-try-avatar" aria-hidden="true">V</span>
          <div><strong>{text.name}</strong><span>{text.status}</span></div>
        </header>
        <div ref={log} className="chatbot-try-log" role="log" aria-live="polite" lang={language}>
          {greeted ? <p className="chatbot-try-bubble" data-bot="true">{text.greeting}</p>
            : <span className="chatbot-try-typing" aria-hidden="true"><i /><i /><i /></span>}
          {turns.map((turn, index) => (
            <div key={index} className="chatbot-try-turn" data-bot={turn.role === "assistant"}>
              <p className="chatbot-try-bubble" data-bot={turn.role === "assistant"}>{turn.content}</p>
              {turn.whatsapp && <a className="chatbot-try-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden="true" />{text.whatsapp}
              </a>}
            </div>
          ))}
          {pending && <span className="chatbot-try-typing" aria-hidden="true"><i /><i /><i /></span>}
        </div>
        {!asked && <div className="chatbot-try-chips" data-ready={greeted}>
          {text.chips.map((chip) => <button key={chip} type="button" onClick={() => send(chip)}>{chip}</button>)}
        </div>}
        <form className="chatbot-try-form" onSubmit={submit}>
          <input ref={input} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={500}
            placeholder={text.placeholder} aria-label={text.placeholder} disabled={closed} enterKeyHint="send" />
          <button type="submit" aria-label={text.send} disabled={!draft.trim() || pending || closed}>
            <ArrowUp size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </form>
      </div>
      <p className="chatbot-try-note">{text.note}</p>
    </section>
  );
}
