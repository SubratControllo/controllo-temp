import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Hexagon,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const cardEntrance = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

const AUTO_PREVIEW_INTERVAL_MS = 2800;

export default function AiFrameworksSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isPreviewInView, setIsPreviewInView] = useState(false);
  const sectionRef = useRef(null);
  const tabsRef = useRef([]);
  const activeView = content.views[activeIndex];
  const canAnimate = Boolean(motionEnabled);

  useEffect(() => {
    if (!canAnimate || hasUserInteracted) {
      setIsPreviewInView(false);
      return undefined;
    }

    const section = sectionRef.current;
    if (!section) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsPreviewInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPreviewInView(entry.isIntersecting);
      },
      { threshold: 0.36 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [canAnimate, hasUserInteracted]);

  useEffect(() => {
    if (!canAnimate || hasUserInteracted || !isPreviewInView || content.views.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % content.views.length);
    }, AUTO_PREVIEW_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [canAnimate, content.views.length, hasUserInteracted, isPreviewInView]);

  const stopPreview = () => {
    setHasUserInteracted(true);
  };

  const activate = (index, { focusTab = true } = {}) => {
    const normalized = (index + content.views.length) % content.views.length;
    stopPreview();
    setActiveIndex(normalized);
    if (focusTab) tabsRef.current[normalized]?.focus();
  };

  const onKeyDown = (event, index) => {
    const targets = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: content.views.length - 1,
    };
    if (targets[event.key] === undefined) return;
    event.preventDefault();
    activate(targets[event.key]);
  };

  return (
    <section
      className="ai-frameworks-section section relative isolate overflow-hidden bg-mist"
      aria-label={content.eyebrow}
      ref={sectionRef}
    >
      <span className="ai-frameworks-section__current" aria-hidden="true" />

      <div className="shell relative z-10">
        <div className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance" id="ai-frameworks-title">{content.title}</h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/72">{content.description}</p>
        </div>

        <motion.div
          className="ai-frameworks-lens mt-12"
          variants={cardEntrance}
          initial={canAnimate ? 'hidden' : false}
          whileInView={canAnimate ? 'visible' : undefined}
          viewport={canAnimate ? { once: true, amount: 0.25 } : undefined}
          onFocusCapture={stopPreview}
          onPointerDownCapture={stopPreview}
        >
          <div className="ai-frameworks-lens__selector">
            <div role="tablist" aria-label="AI governance framework lens" className="grid gap-3">
              {content.views.map((view, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    className="ai-frameworks-tab group"
                    id={`ai-framework-tab-${view.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`ai-framework-panel-${view.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => activate(index, { focusTab: false })}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    ref={(node) => { tabsRef.current[index] = node; }}
                    type="button"
                    key={view.id}
                  >
                    <span className="ai-frameworks-tab__label">{view.label}</span>
                    <span className="ai-frameworks-tab__caption">Framework lens</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="ai-frameworks-panel"
            id={`ai-framework-panel-${activeView.id}`}
            role="tabpanel"
            aria-labelledby={`ai-framework-tab-${activeView.id}`}
            tabIndex={0}
          >
            <motion.div
              key={activeView.id}
              initial={canAnimate ? { opacity: 0, y: 10 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={canAnimate ? { duration: 0.34, ease: [0.22, 1, 0.36, 1] } : undefined}
            >
              <div className="ai-frameworks-panel__mark" aria-hidden="true">
                <Hexagon className="size-5" weight="regular" />
              </div>
              <p className="font-mono text-[.66rem] uppercase tracking-[.12em] text-teal">Framework lens</p>
              <h3 className="ai-frameworks-panel__title mt-4">{activeView.label}</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink/72">{activeView.description}</p>

              <div className="ai-frameworks-panel__context mt-8" aria-label="Context carried into framework work">
                {content.operatingLayer.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <Link className="ai-frameworks-link mt-8" to={content.action.to}>
                {content.action.label}
                <ArrowRight className="size-4" aria-hidden="true" weight="bold" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
