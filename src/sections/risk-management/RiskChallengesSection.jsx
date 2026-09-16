import {
  Folders,
  Gauge,
  TreeStructure,
  UserCircleCheck,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';

const ROW_EASE = [0.23, 1, 0.32, 1];

const challengeIcons = {
  'scattered-context': Folders,
  'unclear-comparison': Gauge,
  'unclear-owner': UserCircleCheck,
  'disconnected-compliance': TreeStructure,
};

const riskOutcomes = [
  'Criteria visible',
  'Owners accountable',
  'Controls linked',
  'Priorities reviewable',
];

const decisionSignals = [
  'Record',
  'Criteria',
  'Owner',
  'Priority',
];

export default function RiskChallengesSection({ items, motionEnabled }) {
  return (
    <section className="section bg-white" aria-labelledby="risk-challenges-title">
      <div className="shell">
        <div className="section-heading section-heading--split !mb-16">
          <div>
            <p className="eyebrow">From risk records to better decisions</p>
            <h2 id="risk-challenges-title">A risk register should help you decide.</h2>
          </div>
          <p className="lede">
            The page is designed around the practical shift from static records to accountable risk decisions.
          </p>
        </div>

        <div className="grid gap-9 min-[1081px]:grid-cols-[minmax(18rem,.38fr)_minmax(0,.62fr)] min-[1081px]:items-start">
          <motion.aside
            animate={motionEnabled ? { opacity: 1, transform: 'translate3d(0, 0, 0)' } : undefined}
            className="relative isolate overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(142deg,#061b32_0%,#0b2946_58%,#087f8c_135%)] p-6 text-white shadow-[0_28px_70px_rgba(6,27,50,.16)] min-[1081px]:sticky min-[1081px]:top-32 min-[1081px]:p-7"
            initial={motionEnabled ? { opacity: 0.82, transform: 'translate3d(0, 18px, 0)' } : false}
            transition={{ duration: .5, ease: ROW_EASE }}
            aria-label="Risk decision outcomes"
          >
            <span
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.13)_1px,transparent_0)] bg-[size:22px_22px] opacity-22"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-mint/18 to-transparent"
              aria-hidden="true"
            />

            <p className="font-mono text-[.58rem] font-medium uppercase tracking-[.14em] text-mint">Decision journey</p>
            <p className="mt-5 text-[clamp(1.65rem,2.6vw,2.35rem)] leading-[1.06] tracking-[-.045em] text-white">
              Move from recorded risk to reviewable priority.
            </p>
            <p className="mt-5 text-[.95rem] leading-7 text-white/70">
              Each step turns a common register failure into the context a team needs for the next risk review.
            </p>

            <ul className="mt-5 grid gap-3" aria-label="Risk decision outcomes list">
              {riskOutcomes.map((outcome) => (
                <li className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/9 px-3.5 py-3 text-[.82rem] font-medium text-white/76 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]" key={outcome}>
                  <span className="size-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_16px_rgba(38,216,173,.5)]" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </motion.aside>

          <ol className="relative grid list-none gap-6 pl-0" aria-label="Risk management challenges and responses">
            <span
              className="pointer-events-none absolute bottom-8 left-[2.05rem] top-8 hidden w-px bg-gradient-to-b from-teal/0 via-teal/24 to-teal/0 min-[760px]:block"
              aria-hidden="true"
            />
            {items.map((item, index) => {
              const Icon = challengeIcons[item.id] ?? Folders;

              return (
                <motion.li
                  key={item.id}
                  className="relative rounded-[26px] border border-line bg-white p-5 shadow-[0_18px_50px_rgba(6,27,50,.045)] min-[760px]:min-h-[clamp(24rem,54vh,34rem)] min-[760px]:p-7"
                  initial={motionEnabled ? { opacity: 0.72, transform: 'translate3d(0, 18px, 0)' } : false}
                  transition={{ duration: .42, delay: index * .06, ease: ROW_EASE }}
                  viewport={{ once: true, amount: .22 }}
                  whileInView={motionEnabled ? { opacity: 1, transform: 'translate3d(0, 0, 0)' } : undefined}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-[14px] border border-teal/12 bg-mist text-teal">
                        <Icon aria-hidden="true" className="size-[1.05rem]" weight="regular" />
                      </span>
                      <span className="font-mono text-[.58rem] font-medium tracking-[.12em] text-teal/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="rounded-full border border-teal/12 bg-mist px-3 py-1.5 font-mono text-[.56rem] font-medium uppercase tracking-[.11em] text-teal">
                      {item.capability}
                    </span>
                  </div>

                  <div className="mt-10 grid gap-7 min-[760px]:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] min-[760px]:items-end">
                    <div>
                      <p className="font-mono text-[.58rem] font-medium uppercase tracking-[.12em] text-muted">Challenge</p>
                      <h3 className="mt-4 max-w-[15ch] text-[clamp(1.9rem,3.1vw,3.05rem)] leading-[1.04] tracking-[-.045em] text-navy">
                        {item.problem}
                      </h3>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[20px] border border-line bg-mist/55 p-5">
                        <p className="font-mono text-[.56rem] font-medium uppercase tracking-[.12em] text-teal">Controllo response</p>
                        <p className="mt-3 text-[.92rem] leading-6 text-muted">{item.response}</p>
                      </div>
                      <div className="rounded-[20px] border border-teal/14 bg-white p-5 shadow-[0_14px_34px_rgba(6,27,50,.04)]">
                        <p className="font-mono text-[.56rem] font-medium uppercase tracking-[.12em] text-muted">Decision unlocked</p>
                        <p className="mt-3 text-[1rem] font-medium leading-7 text-navy">{item.decision}</p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
