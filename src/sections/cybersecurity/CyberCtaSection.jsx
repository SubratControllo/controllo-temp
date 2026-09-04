import { ArrowRight, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

export default function CyberCtaSection({ content, motionEnabled }) {
  const canAnimate = Boolean(motionEnabled);
  const payoff = 'Keep the proof close.';
  const hasPayoff = content.title.includes(payoff);
  const headlineLead = hasPayoff
    ? content.title.slice(0, content.title.indexOf(payoff))
    : content.title;

  return (
    <section
      className="cyber-cta-scene relative overflow-hidden py-24 text-white max-[520px]:py-20"
      aria-labelledby="cyber-cta-title"
    >
      <div
        className="cyber-cta-scene__field"
        data-assurance-field-background
        data-motion={canAnimate ? 'animated' : 'static'}
        aria-hidden="true"
      >
        <span
          className="cyber-cta-scene__aurora cyber-cta-scene__aurora--primary"
          data-aurora-layer
        />
        <span
          className="cyber-cta-scene__aurora cyber-cta-scene__aurora--secondary"
          data-aurora-layer
        />
        <span className="cyber-cta-scene__grain" />
        <span className="cyber-cta-scene__vignette" />
      </div>

      <div className="shell relative z-10 grid grid-cols-[1.02fr_.98fr] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div>
          <p className="eyebrow text-white">{content.eyebrow}</p>
          <h2 id="cyber-cta-title" className="max-w-175 text-balance text-white">
            {headlineLead}
            {hasPayoff && <span className="text-mint-soft">{payoff}</span>}
          </h2>
          <p className="mt-5 mb-0 max-w-165 text-[1rem] leading-[1.7] text-white">
            {content.description}
          </p>
          <div className="action-row max-[460px]:grid">
            <TrialLink className="button button--mint button--directional focus-visible:outline-white">
              <ArrowRight aria-hidden="true" />
              Start Free Trial
            </TrialLink>
            <Link className="button button--light focus-visible:outline-white" to="/demo">
              <CalendarDays aria-hidden="true" />
              Request a Demo
            </Link>
          </div>
          <ul
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2 list-none pl-0 font-mono text-[.75rem] text-white"
            aria-label="Cybersecurity platform proof"
          >
            {content.proof.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <motion.figure
          className="cyber-cta-brand relative isolate m-0"
          data-testid="cyber-brand-mark"
          data-motion={canAnimate ? 'animated' : 'static'}
          data-ambient-motion={canAnimate ? 'active' : 'still'}
          aria-label="Controllo connected assurance"
          initial={canAnimate ? { opacity: 0, scale: 0.92, y: 14 } : false}
          whileInView={canAnimate ? { opacity: 1, scale: 1, y: 0 } : undefined}
          viewport={canAnimate ? { once: true, amount: 0.4 } : undefined}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="cyber-cta-brand__halo" data-brand-halo aria-hidden="true" />
          <img src="/assets/emblemLogo.svg" alt="" />
          <figcaption className="sr-only">
            The Controllo emblem represents connected cyber assurance.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
