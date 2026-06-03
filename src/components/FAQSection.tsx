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
        <div className="mb-10 text-center">
          {eyebrow && (
            <span className="text-sm uppercase tracking-widest text-gray-400 mb-3 block">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-base md:text-lg font-medium text-white group-hover:text-white/80 transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 flex items-center justify-center text-white/40 text-xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-5 pr-10 text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
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
