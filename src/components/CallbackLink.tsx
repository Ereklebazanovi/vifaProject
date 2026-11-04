import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PhoneCall, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import LeadForm from "./LeadForm";

type Product = "web" | "chatbot" | "wms" | "lineup" | "marketing" | "production" | "other";

/**
 * Secondary button next to a page's WhatsApp button: "leave your number".
 * Outline only, so WhatsApp stays the main action; its shape follows the page's
 * primary button (`shape`). Opens the call-back form for that page's service.
 */
const SHAPES = {
  pill: "rounded-full px-7 py-3.5 text-sm font-semibold",
  rounded: "rounded-xl px-6 py-3.5 text-sm font-bold",
  lg: "rounded-lg px-6 py-3 font-semibold",
};

const CallbackLink = ({ product, shape = "pill", className = "" }: { product: Product; shape?: keyof typeof SHAPES; className?: string }) => {
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
        className={`inline-flex items-center justify-center gap-2 border border-white/20 bg-white/[0.04] text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 ${SHAPES[shape]} ${className}`}
      >
        <PhoneCall size={16} strokeWidth={2} />
        {en ? "Leave your number" : "დაგვიტოვეთ ნომერი"}
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
