import { useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function AiFrameworksSection({ content }) {
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
    <section className="section bg-white" aria-label={content.eyebrow}>
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-5 text-balance" id="ai-frameworks-title">{content.title}</h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/72">{content.description}</p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[28px] border border-line bg-field shadow-elevated lg:grid-cols-[minmax(0,1fr)_minmax(17rem,.72fr)]">
          <div className="p-5 sm:p-8">
            <div role="tablist" aria-label="AI governance framework lens" className="flex flex-wrap gap-2">
              {content.views.map((view, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    className="min-h-11 rounded-xl border border-navy/10 bg-white px-4 text-sm text-muted transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy aria-selected:border-navy aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button"
                    id={`ai-framework-tab-${view.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`ai-framework-panel-${view.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => activate(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    ref={(node) => { tabsRef.current[index] = node; }}
                    type="button"
                    key={view.id}
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-8 min-h-42 border-y border-line py-6"
              id={`ai-framework-panel-${activeView.id}`}
              role="tabpanel"
              aria-labelledby={`ai-framework-tab-${activeView.id}`}
              tabIndex={0}
            >
              <p className="font-mono text-[.66rem] uppercase tracking-[.12em] text-teal">Framework lens</p>
              <h3 className="mt-3 text-[1.55rem]">{activeView.label}</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink/72">{activeView.description}</p>
            </div>

            <Link className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy transition-colors duration-200 hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" to={content.action.to}>
              {content.action.label}
              <ArrowRight className="size-4" aria-hidden="true" weight="bold" />
            </Link>
          </div>

          <aside className="bg-navy p-5 text-white sm:p-8" aria-label="Controllo operating layer">
            <p className="font-mono text-[.66rem] uppercase tracking-[.12em] text-mint">Controllo operating layer</p>
            <h3 className="mt-4 max-w-sm text-[1.55rem] text-white">Keep the working context visible.</h3>
            <ol className="mt-7 grid list-none gap-0 border-y border-white/15 pl-0">
              {content.operatingLayer.map((item, index) => (
                <li className="flex items-center gap-3 border-b border-white/15 py-3 last:border-b-0" key={item}>
                  <span className="font-mono text-xs text-mint">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-white/85">{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
