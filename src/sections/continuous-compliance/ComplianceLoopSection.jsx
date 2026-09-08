import { ArrowDownLeft, CheckCircle2, CircleAlert, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';

const stateIcons = {
  current: CheckCircle2,
  attention: CircleAlert,
};

export default function ComplianceLoopSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeStep = content.steps[activeIndex];

  const activate = (index, focusTab = true) => {
    const nextIndex = (index + content.steps.length) % content.steps.length;
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
    activate(keys[event.key]);
  };

  return (
    <section aria-labelledby="compliance-loop-title" className="continuous-loop text-white">
      <div className="shell">
        <div className="continuous-loop__heading">
          <div>
            <p className="eyebrow text-mint">{content.eyebrow}</p>
            <h2 id="compliance-loop-title" className="text-white">{content.title}</h2>
          </div>
          <p>{content.description}</p>
        </div>

        <div className="continuous-loop__layout">
          <div className="continuous-loop__steps" role="tablist" aria-label={content.accessibleLabel} aria-orientation="vertical">
            {content.steps.map((step, index) => (
              <button
                aria-controls="continuous-loop-panel"
                aria-selected={index === activeIndex}
                className="continuous-loop__step"
                id={`continuous-loop-tab-${step.id}`}
                key={step.id}
                onClick={() => activate(index, false)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                ref={(element) => { tabRefs.current[index] = element; }}
                role="tab"
                tabIndex={index === activeIndex ? 0 : -1}
                type="button"
              >
                <span>0{index + 1}</span>
                <strong>{step.label}</strong>
                <ArrowDownLeft aria-hidden="true" />
              </button>
            ))}
            <div className="continuous-loop__return" aria-hidden="true">
              <RotateCcw />
              <span>Review, refresh, repeat</span>
            </div>
          </div>

          <div
            aria-labelledby={`continuous-loop-tab-${activeStep.id}`}
            className="continuous-loop__panel"
            id="continuous-loop-panel"
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
              initial={motionEnabled ? { opacity: 0, x: 12 } : false}
              animate={{ opacity: 1, x: 0 }}
              key={activeStep.id}
              transition={{ duration: motionEnabled ? 0.2 : 0 }}
            >
              <div className="continuous-loop__object-label">
                <span>{activeStep.object}</span>
                <strong>{activeStep.context}</strong>
              </div>
              <h3>{activeStep.title}</h3>
              <p>{activeStep.description}</p>

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
    </section>
  );
}
