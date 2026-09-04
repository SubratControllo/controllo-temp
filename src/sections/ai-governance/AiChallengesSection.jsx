import { motion } from 'motion/react';

export default function AiChallengesSection({ content, motionEnabled }) {
  const rowMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 }
      }
    : {};

  return (
    <section aria-label={content.eyebrow} className="section bg-white">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="ai-challenges-heading" className="mt-5 text-balance">{content.title}</h2>
          <p className="mt-5 text-lg text-ink/72">{content.supporting}</p>
        </div>
        <ol className="mt-12 border-y border-navy/12">
          {content.items.map((item, index) => (
            <motion.li
              {...rowMotion}
              className="relative grid gap-4 border-b border-navy/10 py-7 last:border-b-0 md:grid-cols-2 md:gap-14"
              key={item.id}
            >
              <div>
                <span className="font-mono text-xs text-teal">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3">{item.challenge}</h3>
              </div>
              <p className="self-center text-ink/72">{item.response}</p>
              <span aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-px bg-navy/8 md:block" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
