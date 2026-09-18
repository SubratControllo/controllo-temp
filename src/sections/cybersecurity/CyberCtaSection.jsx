import { CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import CinematicCtaField from '../../components/CinematicCtaField';

const contentVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, transform: 'translateY(18px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CyberCtaSection({ content, motionEnabled }) {
  const canAnimate = Boolean(motionEnabled);
  const payoff = 'Keep the proof close.';
  const hasPayoff = content.title.includes(payoff);
  const headlineLead = hasPayoff
    ? content.title.slice(0, content.title.indexOf(payoff))
    : content.title;

  return (
    <section
      className="cyber-cta-scene text-white"
      aria-labelledby="cyber-cta-title"
    >
      <CinematicCtaField motionEnabled={motionEnabled} />

      <motion.div
        className="cyber-cta-scene__content shell text-center"
        data-cta-content
        data-motion={canAnimate ? 'animated' : 'static'}
        variants={contentVariants}
        initial={canAnimate ? 'hidden' : false}
        whileInView={canAnimate ? 'visible' : undefined}
        viewport={canAnimate ? { once: true, amount: 0.45 } : undefined}
      >
        <motion.div
          className="cyber-cta-signature"
          data-testid="cyber-cta-signature"
          aria-label="Controllo connected assurance"
          variants={itemVariants}
        >
          <span className="cyber-cta-signature__mark" aria-hidden="true">
            <img src="/assets/emblemLogo.svg" alt="" />
          </span>
          <span>{content.eyebrow}</span>
        </motion.div>

        <motion.h2
          id="cyber-cta-title"
          className="cyber-cta-scene__title text-balance text-white"
          variants={itemVariants}
        >
          {headlineLead}
          {hasPayoff && <span>{payoff}</span>}
        </motion.h2>

        <motion.p className="cyber-cta-scene__description" variants={itemVariants}>
          {content.description}
        </motion.p>

        <motion.div className="cyber-cta-scene__actions" variants={itemVariants}>
          <Link className="button button--mint focus-visible:outline-white" to="/demo">
            <CalendarDays aria-hidden="true" />
            Request a Demo
          </Link>
        </motion.div>

        <motion.ul
          className="cyber-cta-scene__proof"
          aria-label="Cybersecurity platform proof"
          variants={itemVariants}
        >
          {content.proof.map((item) => <li key={item}>{item}</li>)}
        </motion.ul>
      </motion.div>
    </section>
  );
}
