import { ArrowRight, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const nodes = [
  ['control', 'Control'],
  ['evidence', 'Evidence'],
  ['owner', 'Owner'],
  ['review', 'Review'],
];

export default function ContinuousComplianceCtaSection({ content, motionEnabled }) {
  return (
    <section aria-labelledby="continuous-cta-title" className="continuous-cta text-white">
      <div className="continuous-cta__field" aria-hidden="true">
        <svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice">
          <path d="M74 455C274 270 404 420 578 318S866 170 1128 286" />
          <path d="M60 236C264 334 398 194 590 300S926 468 1150 354" />
        </svg>
        {nodes.map(([id, label]) => (
          <span className={`continuous-cta__node continuous-cta__node--${id}`} key={id}>
            {label}
          </span>
        ))}
        <span className="continuous-cta__core">
          <img src="/assets/emblemLogo.svg" alt="" />
        </span>
      </div>

      <motion.div
        className="shell continuous-cta__content"
        initial={motionEnabled ? { opacity: 0, y: 18 } : false}
        whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.68, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="continuous-cta__signature">
          <span aria-hidden="true"><img src="/assets/emblemLogo.svg" alt="" /></span>
          <p>{content.eyebrow}</p>
        </div>
        <h2 id="continuous-cta-title" className="text-white">{content.title}</h2>
        <p className="continuous-cta__description">{content.description}</p>
        <div className="continuous-cta__actions">
          <TrialLink className="button button--mint button--directional focus-visible:outline-white">
            <ArrowRight aria-hidden="true" />
            Start free trial
          </TrialLink>
          <Link className="button continuous-cta__secondary focus-visible:outline-white" to="/demo">
            <CalendarDays aria-hidden="true" />
            Request a demo
          </Link>
        </div>
        <p className="continuous-cta__proof">{content.proof}</p>
      </motion.div>
    </section>
  );
}
