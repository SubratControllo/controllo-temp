import { CheckCircle2, CircleAlert, FileSearch, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import SecuraMark from '../../components/SecuraMark';

function SecuraReview({ view }) {
  return (
    <div className="continuous-oversight__view continuous-oversight__view--secura">
      <div className="continuous-oversight__view-copy">
        <span className="continuous-oversight__view-icon" aria-hidden="true"><SecuraMark /></span>
        <p className="technical-label">{view.eyebrow}</p>
        <h3>{view.title}</h3>
        <p>{view.description}</p>
        <div className="continuous-oversight__boundary">
          <ShieldCheck aria-hidden="true" />
          <span>{view.boundary}</span>
        </div>
      </div>

      <div className="continuous-review">
        <div className="continuous-review__header">
          <span>
            <small>Secura control review</small>
            <strong>{view.control}</strong>
          </span>
          <span>Review requested</span>
        </div>
        <div className="continuous-review__inputs" role="list" aria-label="Review inputs">
          {view.inputs.map(([label, value]) => (
            <div key={label} role="listitem">
              <FileSearch aria-hidden="true" />
              <span><small>{label}</small><strong>{value}</strong></span>
            </div>
          ))}
        </div>
        <div className="continuous-review__finding">
          <span><CircleAlert aria-hidden="true" /> Finding</span>
          <p>{view.finding}</p>
        </div>
        <div className="continuous-review__recommendation">
          <span><Sparkles aria-hidden="true" /> Recommended next step</span>
          <strong>{view.recommendation}</strong>
          <small>Prepared for accountable review</small>
        </div>
      </div>
    </div>
  );
}

function ReadinessView({ view }) {
  return (
    <div className="continuous-oversight__view continuous-oversight__view--readiness">
      <div className="continuous-oversight__view-copy">
        <span className="continuous-oversight__view-icon" aria-hidden="true"><ShieldCheck /></span>
        <p className="technical-label">{view.eyebrow}</p>
        <h3>{view.title}</h3>
        <p>{view.description}</p>
        <div className="continuous-oversight__boundary">
          <CheckCircle2 aria-hidden="true" />
          <span>{view.boundary}</span>
        </div>
      </div>

      <div className="continuous-readiness">
        <div className="continuous-readiness__header">
          <span>
            <small>Framework readiness</small>
            <strong>{view.control}</strong>
          </span>
          <span>Current review</span>
        </div>
        <div className="continuous-readiness__signals" role="list" aria-label="Readiness support states">
          {view.signals.map((signal) => (
            <div className={`continuous-readiness__signal is-${signal.state}`} key={signal.label} role="listitem" aria-label={`${signal.label}: ${signal.value}`}>
              <div className="continuous-readiness__signal-head">
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
              <span className="continuous-readiness__segments" aria-hidden="true">
                {[0, 1, 2, 3].map((segment) => (
                  <i className={segment < signal.segments ? 'is-filled' : ''} key={segment} />
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className="continuous-readiness__footer">
          <CircleAlert aria-hidden="true" />
          <span>Evidence remains the next review priority.</span>
        </div>
      </div>
    </div>
  );
}

export default function ComplianceOversightSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeView = content.views[activeIndex];

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

        <div className="continuous-oversight__workspace">
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
              initial={motionEnabled ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              key={activeView.id}
              transition={{ duration: motionEnabled ? 0.2 : 0 }}
            >
              {activeView.id === 'secura'
                ? <SecuraReview view={activeView} />
                : <ReadinessView view={activeView} />}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
