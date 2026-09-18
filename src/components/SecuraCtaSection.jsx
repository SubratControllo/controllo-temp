import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import CinematicCtaField from './CinematicCtaField';
import SecuraMark from './SecuraMark';

const contentVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, transform: 'translateY(18px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SecuraCtaSection({ content, motionEnabled }) {
  const canAnimate = Boolean(motionEnabled);

  return (
    <section className="cyber-cta-scene secura-cta-scene text-white" aria-labelledby="secura-closing-title">
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
        <motion.div className="cyber-cta-signature" variants={itemVariants}>
          <span>{content.eyebrow}</span>
        </motion.div>

        <motion.h2 id="secura-closing-title" className="cyber-cta-scene__title text-balance text-white" variants={itemVariants}>
          {content.title}
        </motion.h2>

        <motion.p className="cyber-cta-scene__description" variants={itemVariants}>
          {content.description}
        </motion.p>

        <motion.div className="cyber-cta-scene__actions" variants={itemVariants}>
          <Link className="button button--mint button--directional focus-visible:outline-white" to={content.primaryAction.href}>
            {content.primaryAction.label}
            <ArrowRight aria-hidden="true" />
          </Link>
          <a className="button cyber-cta-scene__secondary focus-visible:outline-white" href={content.secondaryAction.href}>
            {content.secondaryAction.label}
          </a>
        </motion.div>

        <motion.p className="cyber-cta-scene__proof" variants={itemVariants}>
          {content.supportingLine}
        </motion.p>
      </motion.div>
    </section>
  );
}
