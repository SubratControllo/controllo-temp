import { ArrowRight, CheckCircle2, CircleAlert } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import InteractiveSquareGrid from '../../components/InteractiveSquareGrid';

const stateIcons = {
  current: CheckCircle2,
  attention: CircleAlert,
};

export const getLoopStepIndex = (progress, stepCount) => (
  Math.min(stepCount - 1, Math.max(0, Math.floor(progress * stepCount)))
);

export default function ComplianceLoopSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelMotionEnabled, setPanelMotionEnabled] = useState(false);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const storyRef = useRef(null);
  const layoutRef = useRef(null);
  const stepsRef = useRef(null);
  const panelRef = useRef(null);
  const tabRefs = useRef([]);
  const activeStep = content.steps[activeIndex];
  const nextStep = content.steps[(activeIndex + 1) % content.steps.length];

  useLayoutEffect(() => {
    if (!motionEnabled || typeof window === 'undefined') return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(min-width: 1081px) and (min-height: 640px)', () => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 84%', once: true },
          },
        );
        gsap.fromTo(
          [stepsRef.current, panelRef.current],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: storyRef.current, start: 'top 82%', once: true },
          },
        );

        ScrollTrigger.create({
          anticipatePin: 1,
          end: () => `+=${Math.max(window.innerHeight * 2.1, content.steps.length * 280)}`,
          invalidateOnRefresh: true,
          pin: layoutRef.current,
          pinSpacing: true,
          start: 'top 116px',
          trigger: storyRef.current,
          onLeave: () => {
            const lastIndex = content.steps.length - 1;
            activeIndexRef.current = lastIndex;
            setPanelMotionEnabled(true);
            setActiveIndex(lastIndex);
          },
          onLeaveBack: () => {
            activeIndexRef.current = 0;
            setPanelMotionEnabled(true);
            setActiveIndex(0);
          },
          onUpdate: ({ progress }) => {
            const nextIndex = getLoopStepIndex(progress, content.steps.length);
            if (nextIndex === activeIndexRef.current) return;
            activeIndexRef.current = nextIndex;
            setPanelMotionEnabled(true);
            setActiveIndex(nextIndex);
          },
        });
      });
    }, sectionRef);

    return () => {
      media.revert();
      context.revert();
    };
  }, [content.steps.length, motionEnabled]);

  const activate = (index, focusTab = true, animatePanel = true) => {
    const nextIndex = (index + content.steps.length) % content.steps.length;
    activeIndexRef.current = nextIndex;
    setPanelMotionEnabled(motionEnabled && animatePanel);
    setActiveIndex(nextIndex);
    if (focusTab) tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event, index) => {
    const keys = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: content.steps.length - 1,
    };

    if (!(event.key in keys)) return;
    event.preventDefault();
    activate(keys[event.key], true, false);
  };

  return (
    <section
      aria-labelledby="compliance-loop-title"
      className="continuous-loop text-white"
      data-motion={motionEnabled ? 'animated' : 'static'}
      ref={sectionRef}
    >
      <InteractiveSquareGrid
        aria-hidden="true"
        cellSize={56}
        className="continuous-loop__grid"
        color="#26d8ad"
        interactive={motionEnabled}
        mobileCellSize={44}
        motionEnabled={motionEnabled}
        speed={6}
      />
      <div className="shell">
        <div className="continuous-loop__heading" ref={headingRef}>
          <h2 id="compliance-loop-title" className="text-white">{content.title}</h2>
          <p>{content.description}</p>
        </div>

        <div
          className={`continuous-loop__story${panelMotionEnabled ? '' : ' is-instant'}`}
          ref={storyRef}
        >
          <div className="continuous-loop__layout" ref={layoutRef}>
            <div className="continuous-loop__chapter" ref={stepsRef}>
              <p className="continuous-loop__chapter-name">Keep the record current</p>

              <div className="continuous-loop__chapter-position" aria-hidden="true">
                <strong>0{activeIndex + 1}</strong>
                <span>/ 05</span>
              </div>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="continuous-loop__chapter-copy"
                initial={motionEnabled && panelMotionEnabled ? { opacity: 0, y: 8 } : false}
                key={`chapter-${activeStep.id}`}
                transition={{
                  duration: motionEnabled && panelMotionEnabled ? 0.22 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3>{activeStep.label}</h3>
                <p>{activeStep.description}</p>
              </motion.div>

              <div
                aria-label={content.accessibleLabel}
                aria-orientation="horizontal"
                className="continuous-loop__index"
                role="tablist"
              >
                <span
                  aria-hidden="true"
                  className="continuous-loop__progress"
                  style={{ transform: `scaleX(${(activeIndex + 1) / content.steps.length})` }}
                />
                {content.steps.map((step, index) => (
                  <button
                    aria-controls="continuous-loop-panel"
                    aria-label={`Step ${index + 1}: ${step.label}`}
                    aria-selected={index === activeIndex}
                    className="continuous-loop__index-button"
                    id={`continuous-loop-tab-${step.id}`}
                    key={step.id}
                    onClick={() => activate(index, false)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    role="tab"
                    tabIndex={index === activeIndex ? 0 : -1}
                    title={step.label}
                    type="button"
                  >
                    <span>0{index + 1}</span>
                  </button>
                ))}
              </div>

              <div className="continuous-loop__chapter-next" aria-hidden="true">
                <span>{activeIndex === content.steps.length - 1 ? 'Return to' : 'Continue with'}</span>
                <strong>{nextStep.label}</strong>
                <ArrowRight />
              </div>
            </div>

            <div
              aria-labelledby={`continuous-loop-tab-${activeStep.id}`}
              className="continuous-loop__panel"
              id="continuous-loop-panel"
              ref={panelRef}
              role="tabpanel"
              tabIndex={0}
            >
              <div className="continuous-loop__panel-head">
                <span>
                  <strong>{content.workspaceLabel}</strong>
                  <small>{content.workspaceDescription}</small>
                </span>
                <span className="continuous-loop__step-count">0{activeIndex + 1} / 05</span>
              </div>

              <motion.div
                className="continuous-loop__panel-body"
                initial={motionEnabled && panelMotionEnabled ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                key={activeStep.id}
                transition={{
                  duration: motionEnabled && panelMotionEnabled ? 0.22 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="continuous-loop__object-label">
                  <span>{activeStep.object}</span>
                  <strong>{activeStep.context}</strong>
                </div>
                <h3>{activeStep.title}</h3>

                <div className="continuous-loop__records" role="list" aria-label={`${activeStep.label} status`}>
                  {activeStep.records.map(([label, value, state]) => {
                    const Icon = stateIcons[state];
                    return (
                      <div className={`continuous-loop__record is-${state}`} key={label} role="listitem">
                        <span className="continuous-loop__record-icon" aria-hidden="true"><Icon /></span>
                        <span>
                          <small>{label}</small>
                          <strong>{value}</strong>
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="continuous-loop__next">
                  <span>Next accountable action</span>
                  <strong>{activeStep.next}</strong>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
