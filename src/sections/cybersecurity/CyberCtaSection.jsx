import { ArrowRight, CalendarDays, CheckCircle2, Eye, FileCheck2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const resolutionStates = [
  ['Implementation current', CheckCircle2],
  ['Evidence reviewable', FileCheck2],
  ['Environment visible', Eye],
];

export default function CyberCtaSection({ content, motionEnabled }) {
  const canReveal = motionEnabled && typeof IntersectionObserver !== 'undefined';

  return (
    <section
      className="relative overflow-hidden bg-teal py-28 text-white"
      aria-labelledby="cyber-cta-title"
    >
      <div className="shell relative z-10 grid grid-cols-[1fr_.78fr] items-center gap-16 max-[900px]:grid-cols-1">
        <div>
          <p className="eyebrow text-white">{content.eyebrow}</p>
          <h2 id="cyber-cta-title" className="text-white">
            {content.title}
          </h2>
          <p className="mt-5 mb-0 max-w-165 text-[1rem] leading-[1.7] text-white">
            {content.description}
          </p>
          <div className="action-row max-[460px]:grid">
            <TrialLink className="button button--mint button--directional hover:bg-mint-soft focus-visible:bg-mint focus-visible:outline-white">
              <ArrowRight aria-hidden="true" />
              Start Free Trial
            </TrialLink>
            <Link
              className="button button--light hover:bg-mist hover:text-navy focus-visible:bg-white focus-visible:outline-white"
              to="/demo"
            >
              <CalendarDays aria-hidden="true" />
              Request a Demo
            </Link>
          </div>
          <ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 list-none pl-0 font-mono text-[.61rem] text-white"
            aria-label="Cybersecurity platform proof"
          >
            {content.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <motion.ul
          className="list-none rounded-[24px] border border-white/18 bg-navy/34 p-5 pl-5 backdrop-blur"
          data-testid="cyber-resolution-band"
          data-motion={canReveal ? 'animated' : 'static'}
          aria-label="Resolved program states"
          initial={canReveal ? { opacity: 0, x: 16 } : false}
          animate={canReveal ? undefined : { opacity: 1, x: 0 }}
          whileInView={canReveal ? { opacity: 1, x: 0 } : undefined}
          viewport={canReveal ? { once: true, amount: 0.45 } : undefined}
          transition={{ duration: 0.42 }}
        >
          {resolutionStates.map(([label, Icon], index) => (
            <li
              className="flex min-h-17 items-center gap-4 border-b border-white/14 last:border-0"
              key={label}
            >
              <span className="grid size-9 place-items-center rounded-full border border-mint/35 bg-mint/10">
                <Icon className="size-4 text-mint" aria-hidden="true" />
              </span>
              <span className="text-[.78rem]">{label}</span>
              <span className="ml-auto font-mono text-[.58rem] text-white">
                0{index + 1}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
