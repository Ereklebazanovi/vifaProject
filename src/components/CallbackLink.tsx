import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import LeadForm from "./LeadForm";

type Product = "web" | "chatbot" | "wms" | "lineup" | "marketing" | "production" | "other";

/**
 * A quiet text link under a page's WhatsApp button: "or leave your number".
 * Opens the call-back form for that page's service in a dialog. WhatsApp stays
 * the main action; this catches people who'd rather not start a chat.
 */
const CallbackLink = ({ product, className = "" }: { product: Product; className?: string }) => {
  const { currentLanguage } = useLanguage();
  const en = currentLanguage === "en";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`font-georgian-body text-sm text-gray-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 ${className}`}
      >
        {en ? "Or leave your number, we'll call you" : "ან დაგვიტოვეთ ნომერი, დაგირეკავთ"}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className="my-10 w-[min(100%,34rem)] rounded-3xl border border-white/10 bg-[#0A0A0C] p-7 text-left shadow-2xl md:p-9"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{en ? "Leave your details" : "დაგვიტოვეთ საკონტაქტო"}</p>
                  <p className="font-georgian-body mt-1 text-gray-400">{en ? "We'll get back to you today." : "დაგიკავშირდებით დღესვე."}</p>
                </div>
                <button onClick={() => setOpen(false)} aria-label={en ? "Close" : "დახურვა"} className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <LeadForm defaultProduct={product} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default CallbackLink;
