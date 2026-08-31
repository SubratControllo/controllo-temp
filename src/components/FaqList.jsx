import { useState } from "react";
import { Plus } from "lucide-react";

export default function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-line">
      {items.map(([question, answer], index) => (
        <div className="border-b border-line" key={question}>
          <button
            className="flex min-h-19.5 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent p-0 text-left text-[.91rem] text-navy [&>svg]:w-4.5 [&>svg]:transition-transform aria-expanded:[&>svg]:rotate-45"
            type="button"
            aria-expanded={open === index}
            onClick={() => setOpen((current) => current === index ? -1 : index)}
          >
            <span>{question}</span>
            <Plus aria-hidden="true" />
          </button>
          <div hidden={open !== index}>
            <p className="m-0 pt-0 pr-10.5 pb-6.5 text-[.82rem] leading-[1.7] text-muted">
              {answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
