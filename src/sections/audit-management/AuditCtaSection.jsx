import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const easeOut = [0.22, 1, 0.36, 1];

const pixelBlocks = [
  [45, 8, 8], [48, 12, 6], [51, 7, 10], [54, 14, 8], [57, 10, 6], [60, 18, 8],
  [63, 13, 10], [66, 21, 6], [69, 16, 8], [72, 24, 10], [75, 18, 8], [78, 12, 6],
  [81, 20, 8], [84, 14, 10], [87, 9, 6], [90, 16, 8], [93, 7, 6], [50, 22, 6],
  [53, 26, 8], [56, 21, 10], [59, 29, 6], [62, 25, 8], [65, 33, 10], [68, 27, 6],
  [71, 35, 8], [74, 30, 10], [77, 37, 6], [80, 29, 8], [83, 34, 10], [86, 25, 6],
  [89, 30, 8], [92, 22, 6], [61, 40, 6], [64, 45, 8], [67, 39, 10], [70, 48, 6],
  [73, 42, 8], [76, 50, 10], [79, 44, 6], [82, 47, 8],
];

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

export default function AuditCtaSection({ content, motionEnabled = true }) {
  const canAnimate = Boolean(motionEnabled);
  const headline = splitHeadline(content.title, content.titleAccent || content.accent);

  return (
    <section
      aria-labelledby="audit-cta-title"
      className="audit-cta"
      data-motion={canAnimate ? 'animated' : 'static'}
    >
      <motion.div
        className="shell audit-cta__frame"
        initial={canAnimate ? { opacity: 0, scale: 0.965 } : false}
        whileInView={canAnimate ? { opacity: 1, scale: 1 } : undefined}
        viewport={canAnimate ? { once: true, amount: 0.35 } : undefined}
        transition={{ duration: 0.48, ease: easeOut }}
      >
        <div className="audit-cta__field" data-audit-cta-field aria-hidden="true">
          <div className="audit-cta__grid" />
          <div className="audit-cta__pixel-field">
            {pixelBlocks.map(([left, bottom, size], index) => (
              <motion.span
                className="audit-cta__pixel"
                key={`${left}-${bottom}-${index}`}
                style={{
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                animate={
                  canAnimate
                    ? {
                        opacity: [0.28, 0.92, 0.46],
                        transform: [
                          'translate3d(0, 12px, 0)',
                          'translate3d(0, -10px, 0)',
                          'translate3d(0, 12px, 0)',
                        ],
                      }
                    : { opacity: 0.52, transform: 'translate3d(0, 0, 0)' }
                }
                transition={
                  canAnimate
                    ? { duration: 3.4, delay: (index % 10) * 0.11, repeat: Infinity, ease: 'linear' }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <motion.div
          className="audit-cta__content"
          variants={contentVariants}
          initial={canAnimate ? 'hidden' : false}
          whileInView={canAnimate ? 'visible' : undefined}
          viewport={canAnimate ? { once: true, amount: 0.4 } : undefined}
        >
          {content.eyebrow && (
            <motion.span className="audit-cta__eyebrow eyebrow" variants={itemVariants}>
              {content.eyebrow}
            </motion.span>
          )}

          <motion.h2 id="audit-cta-title" aria-label={content.title} variants={headlineVariants}>
            <motion.span className="audit-cta__title-line" variants={headlineLineVariants}>
              {headline.lead}
            </motion.span>
            {headline.accent && (
              <>
                {' '}
                <motion.span className="audit-cta__title-line audit-cta__title-accent" variants={accentLineVariants}>
                  {headline.accent}
                </motion.span>
              </>
            )}
          </motion.h2>

          <motion.p className="audit-cta__description" variants={itemVariants}>
            {content.copy || content.description}
          </motion.p>

          <motion.div className="audit-cta__conversion" variants={itemVariants}>
            <div className="audit-cta__actions">
              <Link className="button button--mint button--directional audit-cta__primary focus-visible:outline-white" to={content.primaryCta?.href || '/demo'}>
                <span>{content.primaryCta?.label || 'Request a demo'}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="button button--light audit-cta__secondary focus-visible:outline-white" to={content.secondaryCta?.href || '/pricing'}>
                <span>{content.secondaryCta?.label || 'View pricing'}</span>
              </Link>
            </div>
            {content.proof && <p className="audit-cta__proof">{content.proof}</p>}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
