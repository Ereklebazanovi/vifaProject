import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { hubFaqs } from "./hubFaqData";

export function HubQuestions() {
  const id = useId();
  const [expanded, setExpanded] = useState<boolean[]>(() => hubFaqs.map(() => false));
  return <section id="questions" className="it-section it-questions it-col" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`} className="it-h2"><span>ხშირი კითხვები.</span>{" "}<span className="it-tone-2">მოკლე პასუხები.</span></h2>
    <div className="it-faq-list">
      {hubFaqs.map(({ question, answer }, index) => <article key={question} className="it-faq-item">
        <h3>
          <button type="button" id={`${id}-question-${index}`} className="it-faq-question" aria-expanded={expanded[index]}
            aria-controls={`${id}-answer-${index}`} onClick={() => setExpanded((values) => values.map((value, i) => i === index ? !value : value))}>
            <span>{question}</span><Plus size={20} strokeWidth={1.7} className="it-faq-plus" aria-hidden="true" />
          </button>
        </h3>
        <div id={`${id}-answer-${index}`} className="it-faq-answer" data-open={expanded[index]}
          role="region" aria-labelledby={`${id}-question-${index}`} aria-hidden={!expanded[index]}>
          <div className="it-faq-answer-clip"><p>{answer}</p></div>
        </div>
      </article>)}
    </div>
  </section>;
}
