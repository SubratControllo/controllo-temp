import { motion } from 'motion/react';

const ROW_EASE = [0.23, 1, 0.32, 1];

export default function RiskChallengesSection({ items, motionEnabled }) {
  return (
    <section className="section bg-white" aria-labelledby="risk-challenges-title">
      <div className="shell">
        <div className="section-heading section-heading--split !mb-14">
          <div>
            <p className="eyebrow">From risk records to better decisions</p>
            <h2 id="risk-challenges-title">A risk register should help you decide.</h2>
          </div>
          <p className="lede">
            The page is designed around the practical shift from static records to accountable risk decisions.
          </p>
        </div>
        <div
          className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_18px_50px_rgba(6,27,50,.04)]"
          role="list"
          aria-label="Risk management challenges and responses"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.problem}
              className="grid min-h-[118px] grid-cols-[.42fr_.58fr] items-center gap-10 border-b border-line px-6 py-6 even:bg-mist/35 last:border-b-0 max-[760px]:grid-cols-1 max-[760px]:gap-3.5 max-[760px]:px-5"
              initial={motionEnabled ? { opacity: 0, transform: 'translate3d(0, 20px, 0)' } : false}
              role="listitem"
              transition={{ duration: .52, delay: index * .08, ease: ROW_EASE }}
              viewport={{ once: true, amount: .4 }}
              whileInView={motionEnabled ? { opacity: 1, transform: 'translate3d(0, 0, 0)' } : undefined}
            >
              <div className="flex min-w-0 items-start gap-3.5">
                <span className="mt-1 font-mono text-[.58rem] font-medium tracking-[.12em] text-teal/60" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[1.05rem] font-semibold leading-[1.4] text-navy">{item.problem}</p>
              </div>
              <div className="flex min-w-0 items-start gap-3 max-[760px]:ml-[2.35rem]">
                <span className="mt-[.58rem] h-2 w-2 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                <p className="text-[.9rem] leading-[1.7] text-muted">{item.response}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
