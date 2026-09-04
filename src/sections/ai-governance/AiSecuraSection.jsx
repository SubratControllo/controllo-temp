import { motion } from 'motion/react';

export default function AiSecuraSection({ content, motionEnabled }) {
  return (
    <section aria-label={content.eyebrow} className="section overflow-hidden bg-navy text-white">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-mint">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance text-white">{content.title}</h2>
          <p className="mt-5 text-lg text-white/72">{content.description}</p>
        </div>

        <ul aria-label="Secura AI capabilities" className="mt-8 grid gap-3 border-y border-white/14 py-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.capabilities.map((capability) => (
            <li className="font-mono text-xs uppercase tracking-[.1em] text-mint" key={capability}>{capability}</li>
          ))}
        </ul>

        <motion.figure
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.25 }}
          aria-label={content.review.label}
          className="mt-10 rounded-[2rem] bg-white p-6 text-navy shadow-2xl md:p-9"
        >
          <figcaption className="font-mono text-xs uppercase tracking-[.12em] text-teal">{content.review.label}</figcaption>
          <div className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <ul aria-label="Review inputs" className="grid grid-cols-2 gap-3">
              {content.review.inputs.map((input) => (
                <li className="rounded-2xl border border-navy/10 p-4" key={input}>{input}</li>
              ))}
            </ul>
            <dl className="grid gap-4 rounded-3xl bg-mist p-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[.1em] text-teal">Status</dt>
                <dd className="mt-1 font-medium">{content.review.status}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[.1em] text-teal">Secura finding</dt>
                <dd className="mt-1 font-medium">{content.review.finding}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[.1em] text-teal">Recommended action</dt>
                <dd className="mt-1 font-medium">{content.review.recommendation}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[.1em] text-teal">Decision</dt>
                <dd className="mt-1 font-medium">{content.review.decision}</dd>
              </div>
            </dl>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
