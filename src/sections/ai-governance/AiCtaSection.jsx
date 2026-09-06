import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarBlank } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

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

const actionClassName = {
  primary: 'button button--mint button--directional focus-visible:outline-white',
  secondary: 'button cyber-cta-scene__secondary focus-visible:outline-white',
};

export default function AiCtaSection({ content, motionEnabled }) {
  const sectionRef = useRef(null);
  const [ambientActive, setAmbientActive] = useState(false);
  const canAnimate = Boolean(motionEnabled);
  const payoff = 'Prove readiness.';
  const hasPayoff = content.title.includes(payoff);
  const headlineLead = hasPayoff
    ? content.title.slice(0, content.title.indexOf(payoff))
    : content.title;
  const headlineLines = headlineLead.match(/[^.]+(?:\.|$)/g) ?? [headlineLead];
  const proofItems = content.proof.split(' · ');

  useEffect(() => {
    const section = sectionRef.current;
    if (!canAnimate || !section || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setAmbientActive(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [canAnimate]);

  return (
    <section
      ref={sectionRef}
      aria-label={content.eyebrow}
      className="cyber-cta-scene ai-cinematic-cta text-white"
    >
      <div
        className="cyber-cta-scene__field ai-cinematic-cta__field"
        data-ai-governance-field
        data-motion={canAnimate ? 'animated' : 'static'}
        data-ambient-state={canAnimate && ambientActive ? 'active' : 'still'}
        aria-hidden="true"
      >
        <span className="cyber-cta-scene__fallback ai-cinematic-cta__fallback" />
        <span className="ai-cinematic-cta__currents">
          <span className="ai-cinematic-cta__current" data-governance-current />
          <span className="ai-cinematic-cta__current" data-governance-current />
          <span className="ai-cinematic-cta__current" data-governance-current />
        </span>
        <svg
          className="ai-cinematic-cta__network"
          data-governance-network
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="ai-cta-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#bff4e8" stopOpacity="0" />
              <stop offset="0.5" stopColor="#58d9c0" stopOpacity="0.52" />
              <stop offset="1" stopColor="#bff4e8" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="ai-cta-core">
              <stop offset="0" stopColor="#bff4e8" stopOpacity="0.48" />
              <stop offset="0.48" stopColor="#2fcdb0" stopOpacity="0.13" />
              <stop offset="1" stopColor="#071827" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="ai-cinematic-cta__network-layer ai-cinematic-cta__network-layer--paths">
            <path d="M-80 682C230 660 338 404 604 416S1014 650 1520 260" />
            <path d="M-60 194C252 220 392 532 646 478S1092 130 1510 492" />
            <path d="M184 920C344 624 474 608 720 448S1118 284 1280-40" />
          </g>
          <circle className="ai-cinematic-cta__core" cx="720" cy="448" r="268" />
        </svg>
        <span className="ai-cinematic-cta__node ai-cinematic-cta__node--system" data-governance-node />
        <span className="ai-cinematic-cta__node ai-cinematic-cta__node--owner" data-governance-node />
        <span className="ai-cinematic-cta__node ai-cinematic-cta__node--risk" data-governance-node />
        <span className="ai-cinematic-cta__node ai-cinematic-cta__node--control" data-governance-node />
        <span className="ai-cinematic-cta__node ai-cinematic-cta__node--evidence" data-governance-node />
        <span className="cyber-cta-scene__scrim ai-cinematic-cta__scrim" />
        <span className="cyber-cta-scene__grain" />
        <span className="cyber-cta-scene__vignette" />
      </div>

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
          data-testid="ai-cta-signature"
          aria-label="Controllo AI governance, connected"
          variants={itemVariants}
        >
          <span className="cyber-cta-signature__mark" aria-hidden="true">
            <img src="/assets/emblemLogo.svg" alt="" />
          </span>
          <span>{content.eyebrow}</span>
        </motion.div>

        <motion.h2
          id="ai-cta-title"
          aria-label={content.title}
          className="cyber-cta-scene__title text-balance text-white"
          variants={itemVariants}
        >
          {headlineLines.map((line) => (
            <span className="ai-cinematic-cta__title-line" key={line}>{line.trim()} </span>
          ))}
          {hasPayoff && <span className="ai-cinematic-cta__title-payoff">{payoff}</span>}
        </motion.h2>

        <motion.p className="cyber-cta-scene__description" variants={itemVariants}>
          {content.description}
        </motion.p>

        <motion.div className="cyber-cta-scene__actions" variants={itemVariants}>
          {content.actions.map((action) => {
            const Icon = action.variant === 'primary' ? ArrowRight : CalendarBlank;
            return (
              <Link className={actionClassName[action.variant]} key={action.to} to={action.to}>
                <Icon aria-hidden="true" weight="bold" />
                {action.label}
              </Link>
            );
          })}
        </motion.div>

        <motion.ul
          className="cyber-cta-scene__proof"
          aria-label="AI governance platform proof"
          variants={itemVariants}
        >
          {proofItems.map((item) => <li key={item}>{item}</li>)}
        </motion.ul>
      </motion.div>
    </section>
  );
}
