import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Layers3, ShieldAlert } from 'lucide-react';

const tabIcons = {
  'ai-systems': Layers3,
  'ai-risk-assessment': ShieldAlert,
};

export default function AiOperationsSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);
  const activeView = content.views[activeIndex];

  const activate = (index) => {
    const normalized = (index + content.views.length) % content.views.length;
    setActiveIndex(normalized);
    tabsRef.current[normalized]?.focus();
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
    <section className="section bg-mist" aria-labelledby="ai-operations-title">
      <div className="section-shell">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.68fr)]">
          <div className="max-w-3xl">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-5 text-balance" id="ai-operations-title">{content.title}</h2>
            <p className="mt-5 max-w-2xl text-lg text-ink/72">{content.description}</p>
          </div>
          <ol className="grid list-none gap-2 pl-0 text-sm text-navy/75 sm:grid-cols-3 lg:grid-cols-1" aria-label="AI governance workflow">
            {content.workflow.map((step, index) => (
              <li className="flex items-center gap-3 border-l border-teal/35 pl-3" key={step}>
                <span className="font-mono text-xs text-teal">{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-line bg-white shadow-elevated">
          <div className="flex gap-2 overflow-x-auto border-b border-line bg-field p-3 max-[460px]:grid max-[460px]:grid-cols-2 max-[460px]:overflow-visible max-[460px]:p-2" role="tablist" aria-label="AI governance workspace views">
            {content.views.map((view, index) => {
              const Icon = tabIcons[view.id] ?? ClipboardCheck;
              const isActive = index === activeIndex;

              return (
                <button
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border-0 bg-transparent px-4 text-sm text-muted transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button max-[460px]:min-h-13 max-[460px]:shrink max-[460px]:px-2 max-[460px]:text-xs"
                  ref={(node) => { tabsRef.current[index] = node; }}
                  id={`ai-operations-tab-${view.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`ai-operations-panel-${view.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => activate(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  key={view.id}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {view.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-105 bg-[#f8fbfa] p-4 sm:p-6">
            <motion.div
              className="grid min-h-93 gap-5 rounded-[22px] border border-navy/10 bg-white p-5 shadow-[0_16px_36px_rgba(6,27,50,.08)] sm:grid-cols-[minmax(0,1fr)_minmax(12rem,.72fr)] sm:p-7"
              id={`ai-operations-panel-${activeView.id}`}
              role="tabpanel"
              aria-labelledby={`ai-operations-tab-${activeView.id}`}
              key={activeView.id}
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="min-w-0">
                <p className="font-mono text-[.62rem] uppercase tracking-[.12em] text-teal">{activeView.badge}</p>
                <h3 className="mt-4 max-w-md text-[1.55rem]">{activeView.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">A connected record keeps governance context available for the next responsible review.</p>
              </div>
              <dl className="grid content-start gap-0 divide-y divide-line border-y border-line">
                {activeView.fields.map(([label, value]) => (
                  <div className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] gap-3 py-3" key={label}>
                    <dt className="text-xs text-muted">{label}</dt>{' '}
                    <dd className="m-0 text-right text-sm font-medium text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
