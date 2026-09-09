import { ArrowRight, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const easeOut = [0.22, 1, 0.36, 1];

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, transform: 'translate3d(0, 12px, 0)' },
  visible: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: { delay: 0.2, duration: 0.3, ease: easeOut },
  },
};

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.065 },
  },
};

const headlineLineVariants = {
  hidden: { opacity: 0, transform: 'translate3d(0, 14px, 0)' },
  visible: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.3, ease: easeOut },
  },
};

const accentLineVariants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
    transform: 'translate3d(0, 14px, 0)',
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.52, ease: easeOut },
  },
};

function splitHeadline(title, accent) {
  if (!accent || !title.endsWith(accent)) {
    return { lead: title, accent: null };
  }

  return {
    lead: title.slice(0, -accent.length).trim(),
    accent,
  };
}

export default function ContinuousComplianceCtaSection({ content, motionEnabled }) {
  const canAnimate = Boolean(motionEnabled);
  const headline = splitHeadline(content.title, content.accent);

  return (
    <section
      aria-labelledby="continuous-cta-title"
      className="continuous-cta text-white"
      data-motion={canAnimate ? 'animated' : 'static'}
    >
      <motion.div
        className="continuous-cta__field"
        data-continuous-cta-field
        data-motion={canAnimate ? 'animated' : 'static'}
        aria-hidden="true"
        initial={canAnimate ? { opacity: 0, scale: 0.965 } : false}
        whileInView={canAnimate ? { opacity: 1, scale: 1 } : undefined}
        viewport={canAnimate ? { once: true, amount: 0.35 } : undefined}
        transition={{ duration: 0.48, ease: easeOut }}
      >
        <img
          className="continuous-cta__watermark"
          data-continuous-cta-watermark
          src="/assets/emblemLogo.svg"
          alt=""
        />
      </motion.div>

      <motion.div
        className="shell continuous-cta__content"
        variants={contentVariants}
        initial={canAnimate ? 'hidden' : false}
        whileInView={canAnimate ? 'visible' : undefined}
        viewport={canAnimate ? { once: true, amount: 0.4 } : undefined}
      >
        <motion.h2
          id="continuous-cta-title"
          className="text-white"
          aria-label={content.title}
          variants={headlineVariants}
        >
          <motion.span className="continuous-cta__title-line" variants={headlineLineVariants}>
            {headline.lead}
          </motion.span>
          {headline.accent && (
            <>
              {' '}
              <motion.span
                className="continuous-cta__title-line continuous-cta__title-accent"
                data-gradient-flow
                variants={accentLineVariants}
              >
                {headline.accent}
              </motion.span>
            </>
          )}
        </motion.h2>
        <motion.p className="continuous-cta__description" variants={itemVariants}>
          {content.description}
        </motion.p>
        <motion.div className="continuous-cta__conversion" variants={itemVariants}>
          <div className="continuous-cta__actions">
            <TrialLink className="button button--mint button--directional continuous-cta__primary focus-visible:outline-white">
              <span>Start free trial</span>
              <ArrowRight aria-hidden="true" />
            </TrialLink>
            <Link className="button continuous-cta__secondary focus-visible:outline-white" to="/demo">
              <CalendarDays aria-hidden="true" />
              <span>Request a demo</span>
            </Link>
          </div>
          <p className="continuous-cta__proof">{content.proof}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
