import { useRef, useState } from 'react';
import { Brain, Building2, FileSearch, Handshake, Server } from 'lucide-react';
import Reveal from '../../components/Reveal';

const icons = {
  organization: Building2,
  asset: Server,
  vendor: Handshake,
  privacy: FileSearch,
  ai: Brain,
};

export default function RiskCoverageSection({ views, motionEnabled }) {
  const [activeId, setActiveId] = useState(views[0].id);
  const tabRefs = useRef([]);
  const activeIndex = views.findIndex((view) => view.id === activeId);
  const activeView = views[activeIndex] ?? views[0];
  const ActiveIcon = icons[activeView.id] ?? Building2;

  const focusTab = (nextIndex) => {
    const nextView = views[nextIndex];
    if (!nextView) return;
    setActiveId(nextView.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab((activeIndex + 1) % views.length);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab((activeIndex - 1 + views.length) % views.length);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      focusTab(views.length - 1);
    }
  };

  return (
    <section className="section bg-navy text-white" aria-labelledby="risk-coverage-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow text-mint">Different risks. Connected oversight.</p>
            <h2 id="risk-coverage-title" className="text-white">See risk in the context of your business.</h2>
          </div>
          <p className="lede text-white/70">
            Organization, asset, vendor, privacy, and AI contexts stay connected without pretending they all need the same assessment lens.
          </p>
        </div>
        <Reveal
          motionEnabled={motionEnabled}
          className="grid grid-cols-[310px_1fr] overflow-hidden rounded-[24px] border border-white/12 bg-white/6 max-[900px]:grid-cols-1"
        >
          <div
            className="flex flex-col border-r border-white/12 p-3 max-[900px]:grid max-[900px]:grid-cols-5 max-[900px]:overflow-x-auto max-[900px]:border-r-0 max-[900px]:border-b max-[560px]:grid-cols-[repeat(5,minmax(122px,1fr))]"
            role="tablist"
            aria-label="Risk contexts"
            onKeyDown={handleKeyDown}
          >
            {views.map((view, index) => {
              const Icon = icons[view.id] ?? Building2;
              const isActive = view.id === activeView.id;
              return (
                <button
                  key={view.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`risk-context-${view.id}`}
                  id={`risk-tab-${view.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`flex min-h-16 items-center gap-3 rounded-2xl px-4 text-left text-[.88rem] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                    isActive ? 'bg-mint text-navy' : 'text-white/74 hover:bg-white/8 hover:text-white'
                  }`}
                  onClick={() => setActiveId(view.id)}
                >
                  <Icon aria-hidden="true" size={17} />
                  {view.label}
                </button>
              );
            })}
          </div>
          <div
            id={`risk-context-${activeView.id}`}
            role="tabpanel"
            aria-labelledby={`risk-tab-${activeView.id}`}
            className="grid grid-cols-[.9fr_1.1fr] gap-0 max-[760px]:grid-cols-1"
          >
            <div className="p-8 max-[560px]:p-5">
              <span className="mb-7 flex h-13 w-13 items-center justify-center rounded-full bg-white/10 text-mint">
                <ActiveIcon aria-hidden="true" size={23} />
              </span>
              <p className="font-mono text-[.62rem] font-medium uppercase tracking-[.16em] text-mint">
                {activeView.scoreLabel}
              </p>
              <h3 className="mt-4 max-w-[520px] text-[clamp(2rem,3vw,3.6rem)] leading-[.98] text-white">
                {activeView.title}
              </h3>
              <p className="mt-5 max-w-[560px] text-[.98rem] leading-[1.75] text-white/70">
                {activeView.description}
              </p>
            </div>
            <div className="border-l border-white/12 bg-white/8 p-8 max-[760px]:border-l-0 max-[760px]:border-t max-[560px]:p-5">
              <div className="rounded-[20px] border border-white/14 bg-navy/70 p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4">
                  <p className="text-[.98rem] font-semibold text-white">Assessment context</p>
                  <span className="rounded-full bg-mint/12 px-3 py-1 font-mono text-[.6rem] font-medium uppercase tracking-[.12em] text-mint">
                    Reviewable
                  </span>
                </div>
                <ul className="mt-2 divide-y divide-white/10">
                  {activeView.signals.map((signal, index) => (
                    <li key={signal} className="flex min-h-[66px] items-center justify-between gap-4 py-3">
                      <span className="text-[.88rem] text-white/72">{signal}</span>
                      <span className="font-mono text-[.64rem] font-medium uppercase tracking-[.12em] text-mint">
                        0{index + 1}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
