import {
  BadgeCheck,
  BookOpen,
  CircleAlert,
  FileCheck2,
  FileText,
  Flag,
  ListChecks,
  Paperclip,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import SecuraMark from '../../components/SecuraMark';

const reviewEase = [0.22, 1, 0.36, 1];
const reviewInputIcons = [FileText, BookOpen, Paperclip];
const readinessIcons = {
  Implementation: Wrench,
  'Policy & procedure': BookOpen,
  Evidence: FileCheck2,
  Ownership: UserRoundCheck,
};

function revealProps(motionEnabled, delay, duration = 0.2) {
  return {
    initial: motionEnabled ? { opacity: 0, y: 6 } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: motionEnabled ? duration : 0, delay: motionEnabled ? delay : 0, ease: reviewEase },
  };
}

function ReviewTrace({ delay, direction = 'vertical', motionEnabled }) {
  const isHorizontal = direction === 'horizontal';
  const graphics = isHorizontal
    ? [
        {
          className: 'continuous-review__trace-graphic--desktop',
          line: 'M1 58 H13 Q18 58 18 53 V33 Q18 28 23 28 H29',
          arrowhead: 'M27.5 26.5 L33 28 L27.5 29.5 Z',
          viewBox: '0 0 34 100',
          axis: 'horizontal',
        },
        {
          className: 'continuous-review__trace-graphic--mobile',
          line: 'M6 0 V32',
          arrowhead: 'M2.1 25.5 L6 32 L9.9 25.5',
          viewBox: '0 0 12 32',
          axis: 'vertical',
        },
      ]
    : [{
        className: '',
        line: 'M6 0 V32',
        arrowhead: 'M2.1 25.5 L6 32 L9.9 25.5',
        viewBox: '0 0 12 32',
        axis: 'vertical',
      }];

  return (
    <span className={`continuous-review__trace continuous-review__trace--${direction}`} data-review-flow={direction} aria-hidden="true">
      {graphics.map((graphic) => (
        <svg className={graphic.className} key={graphic.className || direction} preserveAspectRatio="none" viewBox={graphic.viewBox}>
          <path className="continuous-review__trace-underlay" d={graphic.line} />
          <motion.path
            className="continuous-review__trace-current"
            d={graphic.line}
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: motionEnabled ? 0.22 : 0, delay: motionEnabled ? delay : 0, ease: reviewEase }}
          />
          <motion.path
            className={`continuous-review__trace-head continuous-review__trace-head--${graphic.axis}`}
            d={graphic.arrowhead}
            initial={motionEnabled ? { opacity: 0, x: graphic.axis === 'horizontal' ? -4 : 0, y: graphic.axis === 'vertical' ? -4 : 0 } : false}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: motionEnabled ? 0.16 : 0, delay: motionEnabled ? delay + 0.14 : 0, ease: reviewEase }}
          />
        </svg>
      ))}
    </span>
  );
}

function SecuraReview({ view, motionEnabled }) {
  return (
    <div className="continuous-oversight__view continuous-oversight__view--secura">
      <div className="continuous-oversight__view-copy">
        <div className="continuous-oversight__view-kicker">
          <span className="continuous-oversight__view-icon" aria-hidden="true"><SecuraMark /></span>
          <p className="technical-label">{view.eyebrow}</p>
        </div>
        <h3>{view.title}</h3>
        <p>{view.description}</p>
        <div className="continuous-oversight__boundary">
          <ShieldCheck aria-hidden="true" />
          <span>{view.boundary}</span>
        </div>
      </div>

      <div className="continuous-review" data-motion-state={motionEnabled ? 'sequenced' : 'settled'}>
        <div className="continuous-review__header">
          <span>
            <small>Secura control review</small>
            <strong>{view.control}</strong>
          </span>
          <span>Review requested</span>
        </div>
        <div className="continuous-review__body">
          <div className="continuous-review__source">
            <p className="continuous-review__group-label">Review inputs</p>
            <div className="continuous-review__inputs" role="list" aria-label="Review inputs">
              {view.inputs.map(([label, value], index) => {
                const InputIcon = reviewInputIcons[index];
                return (
                  <motion.div {...revealProps(motionEnabled, 0.04 + (index * 0.06), 0.18)} key={label} role="listitem">
                    <InputIcon aria-hidden="true" />
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <ReviewTrace delay={0.24} direction="horizontal" motionEnabled={motionEnabled} />
          <div className="continuous-review__resolution">
            <motion.div className="continuous-review__finding" {...revealProps(motionEnabled, 0.42, 0.22)}>
              <motion.i
                aria-hidden="true"
                className="continuous-review__finding-emphasis"
                initial={motionEnabled ? { opacity: 0 } : false}
                animate={{ opacity: motionEnabled ? [0, 1, 0] : 0 }}
                transition={motionEnabled ? { duration: 0.28, delay: 0.5, ease: reviewEase, times: [0, 0.45, 1] } : { duration: 0 }}
              />
              <span><CircleAlert aria-hidden="true" /> Finding</span>
              <p>{view.finding}</p>
            </motion.div>
            <motion.div className="continuous-review__recommendation" {...revealProps(motionEnabled, 0.64, 0.22)}>
              <ReviewTrace delay={0.56} motionEnabled={motionEnabled} />
              <span><ListChecks aria-hidden="true" /> Recommended next step</span>
              <strong>{view.recommendation}</strong>
              <small>Prepared for accountable review</small>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadinessView({ view, motionEnabled }) {
  return (
    <div className="continuous-oversight__view continuous-oversight__view--readiness">
      <div className="continuous-oversight__view-copy">
        <div className="continuous-oversight__view-kicker">
          <span className="continuous-oversight__view-icon" aria-hidden="true"><ShieldCheck /></span>
          <p className="technical-label">{view.eyebrow}</p>
        </div>
        <h3>{view.title}</h3>
        <p>{view.description}</p>
        <div className="continuous-oversight__boundary">
          <BadgeCheck aria-hidden="true" />
          <span>{view.boundary}</span>
        </div>
      </div>

      <div className="continuous-readiness" data-motion-state={motionEnabled ? 'sequenced' : 'settled'}>
        <div className="continuous-readiness__header">
          <span>
            <small>Framework readiness</small>
            <strong>{view.control}</strong>
          </span>
          <span>Current review</span>
        </div>
        <div className="continuous-readiness__columns" aria-hidden="true">
          <span>Support area</span>
          <span>Review state</span>
        </div>
        <div className="continuous-readiness__signals" role="list" aria-label="Readiness support states">
          {view.signals.map((signal, index) => {
            const SignalIcon = readinessIcons[signal.label] ?? ShieldCheck;
            return (
              <motion.div
                className={`continuous-readiness__signal is-${signal.state}`}
                {...revealProps(motionEnabled, 0.05 + (index * 0.06))}
                key={signal.label}
                role="listitem"
                aria-label={`${signal.label}: ${signal.value}`}
              >
                <span className="continuous-readiness__signal-icon" aria-hidden="true">
                  <SignalIcon />
                </span>
                <strong>{signal.label}</strong>
                <span>{signal.value}</span>
              </motion.div>
            );
          })}
        </div>
        <motion.div className="continuous-readiness__footer" {...revealProps(motionEnabled, 0.34)}>
          <Flag aria-hidden="true" />
          <span>Evidence remains the next review priority.</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function ComplianceOversightSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const workspaceRef = useRef(null);
  const hasEnteredViewport = useInView(workspaceRef, { amount: 0.35, once: true });
  const activeView = content.views[activeIndex];
  const sequenceEnabled = Boolean(motionEnabled && hasEnteredViewport);

  const activate = (index, focusTab = true) => {
    const nextIndex = (index + content.views.length) % content.views.length;
    setActiveIndex(nextIndex);
    if (focusTab) tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = index + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = content.views.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    activate(nextIndex);
  };

  return (
    <section aria-labelledby="continuous-oversight-title" className="section continuous-oversight bg-mint-soft">
      <div className="shell">
        <div className="continuous-oversight__heading">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="continuous-oversight-title">{content.title}</h2>
          </div>
          <p className="lede">{content.description}</p>
        </div>

        <div className="continuous-oversight__workspace" ref={workspaceRef}>
          <div className="continuous-oversight__tabs" role="tablist" aria-label="Review and readiness views">
            {content.views.map((view, index) => (
              <button
                aria-controls="continuous-oversight-panel"
                aria-selected={index === activeIndex}
                id={`continuous-oversight-tab-${view.id}`}
                key={view.id}
                onClick={() => activate(index, false)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                ref={(element) => { tabRefs.current[index] = element; }}
                role="tab"
                tabIndex={index === activeIndex ? 0 : -1}
                type="button"
              >
                {view.label}
              </button>
            ))}
          </div>
          <div
            aria-labelledby={`continuous-oversight-tab-${activeView.id}`}
            id="continuous-oversight-panel"
            role="tabpanel"
            tabIndex={0}
          >
            <motion.div
              initial={sequenceEnabled ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              key={`${activeView.id}-${sequenceEnabled ? 'animated' : 'settled'}`}
              transition={{ duration: sequenceEnabled ? 0.22 : 0, ease: reviewEase }}
            >
              {activeView.id === 'secura'
                ? <SecuraReview motionEnabled={sequenceEnabled} view={activeView} />
                : <ReadinessView motionEnabled={sequenceEnabled} view={activeView} />}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
