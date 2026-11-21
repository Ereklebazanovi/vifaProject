import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface FaqSectionProps {
  id?: string;
  title: string;
  items: ReadonlyArray<{ question: string; answer: ReactNode }>;
}

export function FaqSection({ id = "questions", title, items }: FaqSectionProps) {
  const prefix = useId();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  return (
    <section id={id} className="it-section it-questions it-col" aria-labelledby={`${prefix}-heading`}>
      <SectionHeading id={`${prefix}-heading`}>{title}</SectionHeading>
      <div className="it-faq-list">
        {items.map(({ question, answer }, index) => {
          const open = !!expanded[question];
          const questionId = `${prefix}-question-${index}`;
          const answerId = `${prefix}-answer-${index}`;
          return <article key={question} className="it-faq-item">
            <h3>
              <button type="button" id={questionId} className="it-faq-question" aria-expanded={open} aria-controls={answerId}
                onClick={() => setExpanded((previous) => ({ ...previous, [question]: !previous[question] }))}>
                <span>{question}</span><Plus size={20} strokeWidth={1.7} className="it-faq-plus" aria-hidden="true" />
              </button>
            </h3>
            <div id={answerId} className="it-faq-answer" data-open={open}
              role="region" aria-labelledby={questionId} aria-hidden={!open}>
              <div className="it-faq-answer-clip">{typeof answer === "string" ? <p>{answer}</p> : answer}</div>
            </div>
          </article>;
        })}
      </div>
    </section>
  );
}
