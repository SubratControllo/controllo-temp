import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle,
  ClipboardText,
  FileMagnifyingGlass,
  MagnifyingGlass,
  UserCircleCheck,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';
import SecuraMark from '../../components/SecuraMark';

const reviewRows = [
  { key: 'status', label: 'Status' },
  { key: 'finding', label: 'Secura finding' },
  { key: 'recommendation', label: 'Recommended action' },
  { key: 'decision', label: 'Decision' },
];

const capabilityIcons = [ClipboardText, MagnifyingGlass, FileMagnifyingGlass, UserCircleCheck];

const orbitNodes = Array.from({ length: 8 }, (_, index) => index + 1);
const orbitCurrents = Array.from({ length: 3 }, (_, index) => index + 1);

const entrance = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1] },
  },
};

function SecuraField({ active, motionEnabled }) {
  return (
    <div
      className="ai-secura-future-field"
      data-ambient-state={motionEnabled && active ? 'active' : 'still'}
      data-motion={motionEnabled ? 'animated' : 'static'}
      aria-hidden="true"
    >
      <span className="ai-secura-future-field__aura" />
      <span className="ai-secura-future-field__grid" />
      <svg className="ai-secura-future-field__paths" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ai-secura-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#26d8ad" stopOpacity="0" />
            <stop offset="0.5" stopColor="#bff4e8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#26d8ad" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-80 470C180 384 318 172 554 232s318 284 568 226 300-278 420-314" />
        <path d="M-60 188C222 228 380 526 646 492s436-282 896 56" />
        <path d="M184 800C332 586 468 548 684 382s424-210 706-92" />
      </svg>
      <span className="ai-secura-future-field__node ai-secura-future-field__node--one" />
      <span className="ai-secura-future-field__node ai-secura-future-field__node--two" />
      <span className="ai-secura-future-field__node ai-secura-future-field__node--three" />
    </div>
  );
}

function CapabilityFlow({ capabilities }) {
  return (
    <ol className="ai-secura-flow mt-8 list-none pl-0" aria-label="Secura AI capabilities">
      {capabilities.map((capability, index) => {
        const Icon = capabilityIcons[index] ?? CheckCircle;

        return (
          <li className="ai-secura-flow__item" key={capability}>
            <span className="ai-secura-flow__icon" aria-hidden="true">
              <Icon className="size-4" weight="regular" />
            </span>
            <span className="ai-secura-flow__copy">
              <span className="ai-secura-flow__step">{String(index + 1).padStart(2, '0')}</span>
              {capability}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function SecuraReviewDetails({ review }) {
  return (
    <div className="sr-only">
      <p>Review inputs</p>
      <ul>
        {review.inputs.map((input) => (
          <li key={input}>{input}</li>
        ))}
      </ul>
      <dl>
        {reviewRows.map(({ key, label }) => (
          <div data-testid="ai-secura-review-row" key={key}>
            <dt>{label}</dt>
            <dd>{review[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SecuraReviewVisual({ active, motionEnabled, review }) {
  return (
    <motion.figure
      initial={motionEnabled ? { opacity: 0, y: 24, scale: 0.985 } : false}
      whileInView={motionEnabled ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={motionEnabled ? { once: true, amount: 0.28 } : undefined}
      transition={motionEnabled ? { duration: 0.78, ease: [0.22, 1, 0.36, 1] } : undefined}
      aria-label={review.accessibleLabel}
      className="ai-secura-orb-visual"
      data-testid="ai-secura-visual"
      data-motion={motionEnabled ? 'animated' : 'static'}
      data-ambient-state={motionEnabled && active ? 'active' : 'still'}
    >
      <figcaption className="sr-only">{review.label}</figcaption>

      <div className="ai-secura-orb-visual__stage" aria-hidden="true">
        <span className="ai-secura-orb-visual__aura" />
        <span className="ai-secura-orb-visual__mesh" />
        <span className="ai-secura-orb-visual__loop ai-secura-orb-visual__loop--one" />
        <span className="ai-secura-orb-visual__loop ai-secura-orb-visual__loop--two" />
        <span className="ai-secura-orb-visual__loop ai-secura-orb-visual__loop--three" />
        {orbitCurrents.map((current) => (
          <span
            className={`ai-secura-orb-visual__current ai-secura-orb-visual__current--${current}`}
            key={current}
          />
        ))}
        <span className="ai-secura-orb-visual__core">
          <span className="ai-secura-orb-visual__core-glow" />
          <SecuraMark className="ai-secura-orb-visual__mark" />
        </span>
        {orbitNodes.map((node) => (
          <span className={`ai-secura-orb-visual__node ai-secura-orb-visual__node--${node}`} key={node}>
            <span className="ai-secura-orb-visual__node-core" data-testid="ai-secura-orbit-node" />
          </span>
        ))}
      </div>

      <SecuraReviewDetails review={review} />
    </motion.figure>
  );
}

export default function AiSecuraSection({ content, motionEnabled }) {
  const sectionRef = useRef(null);
  const [ambientActive, setAmbientActive] = useState(false);
  const canAnimate = Boolean(motionEnabled);

  useEffect(() => {
    const section = sectionRef.current;
    if (!canAnimate || !section || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setAmbientActive(entry.isIntersecting);
    }, { threshold: 0.16 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [canAnimate]);

  return (
    <section
      ref={sectionRef}
      aria-label={content.eyebrow}
      className="ai-secura-section relative isolate overflow-hidden bg-navy text-white"
    >
      <SecuraField active={ambientActive} motionEnabled={canAnimate} />

      <div className="shell relative z-10 grid gap-10 py-24 md:py-28 lg:min-h-[calc(100svh-5.25rem)] lg:grid-cols-[minmax(0,.82fr)_minmax(31rem,1.18fr)] lg:items-center lg:gap-12 lg:py-20">
        <motion.div
          className="max-w-[32rem]"
          variants={entrance}
          initial={canAnimate ? 'hidden' : false}
          whileInView={canAnimate ? 'visible' : undefined}
          viewport={canAnimate ? { once: true, amount: 0.35 } : undefined}
        >
          <p className="eyebrow text-mint">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance text-white">{content.title}</h2>
          <p className="mt-5 max-w-[34rem] text-[1.02rem] leading-8 text-white/72">{content.description}</p>
          <CapabilityFlow capabilities={content.capabilities} />
        </motion.div>

        <SecuraReviewVisual active={ambientActive} review={content.review} motionEnabled={canAnimate} />
      </div>
    </section>
  );
}
