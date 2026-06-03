import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  /** Section heading (e.g. "ხშირად დასმული კითხვები"). */
  title?: string;
  items: FAQItem[];
  /** Optional eyebrow label above the heading. */
  eyebrow?: string;
}

/**
 * Accessible FAQ accordion. The same `items` should be passed to <SEO faq={items} />
 * so the visible content matches the FAQPage structured data (Google requirement).
 */
const FAQSection: React.FC<FAQSectionProps> = ({
  title = "ხშირად დასმული კითხვები",
  items,
  eyebrow,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="relative z-10 w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-500/40 bg-indigo-500/[0.06] shadow-lg shadow-indigo-500/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span
                    className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors duration-300 ${
                      isOpen
                        ? "bg-indigo-500 text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`flex-1 text-base md:text-lg font-semibold transition-colors ${
                      isOpen ? "text-white" : "text-white/90"
                    }`}
                  >
                    {item.question}
                  </span>
                  <svg
                    className={`shrink-0 w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-400" : "text-white/40"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* grid-rows trick = smooth height animation without clipping long answers */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pl-[4.5rem] text-[15px] text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
