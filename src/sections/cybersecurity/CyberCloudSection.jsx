import { useRef, useState } from 'react';
import { Activity, ArrowRight, Cloud, Radar, ShieldAlert, UsersRound } from 'lucide-react';
import { motion } from 'motion/react';
import IntegrationLogo from '../../components/IntegrationLogo';
import { brandAssets } from '../../data/brandAssets';

const panelIcons = [Cloud, UsersRound, ShieldAlert];
const stageMotion = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

function StageHeading({ children }) {
  return <h4 className="font-mono text-[.65rem] font-medium uppercase tracking-[.12em] text-teal">{children}</h4>;
}

function SourceList({ sources }) {
  return (
    <ul className="mt-5 list-none space-y-1 pl-0" aria-label="Connected operational sources">
      {sources.map(({ label, state, brandKey }) => (
        <li className="flex min-h-14 items-center gap-3 border-b border-line py-2 last:border-b-0" key={label}>
          <IntegrationLogo brand={brandAssets[brandKey]} fallback={Cloud} size="inline" />
          <span className="min-w-0 flex-1 text-[.78rem] font-medium">{label}</span>
          <span className="shrink-0 font-mono text-[.58rem] uppercase tracking-[.08em] text-teal">{state}</span>
        </li>
      ))}
    </ul>
  );
}

function SignalList({ signals }) {
  return (
    <ul className="mt-5 list-none space-y-3 pl-0" aria-label="Visible operational signals">
      {signals.map(([label, state]) => (
        <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 rounded-[14px] bg-white/80 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(6,27,50,.08)]" key={label}>
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#dff7f1] text-teal" aria-hidden="true">
            <Activity className="size-4" />
          </span>
          <span className="min-w-0 text-[.76rem] font-medium">{label}</span>
          <span className="col-start-2 mt-0.5 font-mono text-[.58rem] uppercase tracking-[.08em] text-muted">{state}</span>
        </li>
      ))}
    </ul>
  );
}

function AttentionList({ attention }) {
  return (
    <ul className="mt-5 list-none space-y-3 pl-0" aria-label="Operational attention items">
      {attention.map(([label, state]) => (
        <li className="border-l-2 border-teal pl-4" key={label}>
          <span className="block text-[.76rem] font-medium">{label}</span>
          <strong className="mt-1 block font-mono text-[.61rem] font-medium uppercase tracking-[.08em] text-teal">{state}</strong>
        </li>
      ))}
    </ul>
  );
}

function SignalBridge({ motionEnabled, delay }) {
  return (
    <div className="flex items-center justify-center self-center text-teal max-[820px]:min-h-10 max-[820px]:rotate-90" aria-hidden="true">
      <motion.span
        className="h-px w-full max-w-10 origin-left bg-teal/35"
        initial={motionEnabled ? { opacity: 0, scaleX: 0 } : false}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.32, delay }}
      />
      <motion.span
        initial={motionEnabled ? { opacity: 0, x: -5 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.24, delay: delay + 0.2 }}
      >
        <ArrowRight className="size-4" />
      </motion.span>
    </div>
  );
}

function OperationalSignalBoard({ view, motionEnabled }) {
  return (
    <div className="grid min-h-78 grid-cols-[minmax(0,.95fr)_3.5rem_minmax(0,1.12fr)_3.5rem_minmax(0,.85fr)] items-stretch gap-2 p-7 max-[960px]:grid-cols-[minmax(0,.9fr)_2rem_minmax(0,1.1fr)_2rem_minmax(0,.85fr)] max-[820px]:grid-cols-1 max-[820px]:gap-0 max-[520px]:p-5">
      <motion.section variants={stageMotion} initial={motionEnabled ? 'hidden' : false} animate="visible" transition={{ duration: 0.3 }} aria-labelledby={`${view.id}-sources`}>
        <StageHeading><span id={`${view.id}-sources`}>Connected sources</span></StageHeading>
        <SourceList sources={view.sources} />
      </motion.section>

      <SignalBridge motionEnabled={motionEnabled} delay={0.12} />

      <motion.section className="rounded-[20px] bg-[#edf8f5] p-5 shadow-[inset_0_0_0_1px_rgba(8,127,140,.12)]" variants={stageMotion} initial={motionEnabled ? 'hidden' : false} animate="visible" transition={{ duration: 0.3, delay: 0.16 }} aria-labelledby={`${view.id}-signals`}>
        <div className="flex items-center justify-between gap-4">
          <StageHeading><span id={`${view.id}-signals`}>Visible signals</span></StageHeading>
          <Radar className="size-5 text-teal" aria-hidden="true" />
        </div>
        <SignalList signals={view.signals} />
      </motion.section>

      <SignalBridge motionEnabled={motionEnabled} delay={0.28} />

      <motion.section variants={stageMotion} initial={motionEnabled ? 'hidden' : false} animate="visible" transition={{ duration: 0.3, delay: 0.34 }} aria-labelledby={`${view.id}-attention`}>
        <StageHeading><span id={`${view.id}-attention`}>Attention needed</span></StageHeading>
        <AttentionList attention={view.attention} />
      </motion.section>
    </div>
  );
}

export default function CyberCloudSection({ views, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = views[activeIndex];
  const ActiveIcon = panelIcons[activeIndex] ?? Cloud;

  const activate = (index) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event, index) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % views.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + views.length) % views.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = views.length - 1;
    else return;

    event.preventDefault();
    activate(nextIndex);
  };

  return (
    <section className="section bg-mist" aria-labelledby="cyber-cloud-title">
      <div className="shell">
        <header className="mx-auto mb-14 max-w-200 text-center">
          <p className="eyebrow">Cloud and workforce monitoring</p>
          <h2 id="cyber-cloud-title">See what is connected and where attention is needed.</h2>
          <p className="lede mx-auto mt-6">Bring supported cloud resources, workforce identities and devices, access activity, and security alerts into regularly refreshed operational views.</p>
        </header>

        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-elevated">
          <div className="flex gap-2 overflow-x-auto border-b border-line bg-[#f8fbfa] p-3 max-[520px]:grid max-[520px]:grid-cols-3 max-[520px]:gap-1 max-[520px]:overflow-visible max-[520px]:p-2" role="tablist" aria-label="Operational visibility views">
            {views.map((view, index) => {
              const Icon = panelIcons[index] ?? Cloud;
              const isActive = activeIndex === index;

              return (
                <button
                  ref={(node) => { tabRefs.current[index] = node; }}
                  className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-[13px] border-0 bg-transparent px-4 text-[.78rem] text-muted transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button max-[520px]:min-h-14 max-[520px]:shrink max-[520px]:flex-col max-[520px]:justify-center max-[520px]:gap-1 max-[520px]:px-1 max-[520px]:text-center max-[520px]:text-[.62rem] max-[520px]:leading-tight"
                  id={`cyber-cloud-tab-${view.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`cyber-cloud-panel-${view.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => activate(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  key={view.id}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {view.label}
                </button>
              );
            })}
          </div>

          <motion.div
            className="min-h-105"
            id={`cyber-cloud-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`cyber-cloud-tab-${active.id}`}
            key={active.id}
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex min-h-24 items-center justify-between gap-6 border-b border-line bg-navy px-7 py-5 text-white max-[620px]:items-start max-[620px]:px-5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white/[.08] text-mint shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
                  <ActiveIcon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[.61rem] uppercase tracking-[.12em] text-mint">{active.label}</p>
                  <h3 className="mt-1 text-[clamp(1.05rem,2vw,1.38rem)] text-white">{active.summary}</h3>
                </div>
              </div>
              <span className="shrink-0 text-right text-[.62rem] text-[#b8c8d5] max-[620px]:sr-only">Illustrative product view</span>
            </div>
            <OperationalSignalBoard view={active} motionEnabled={motionEnabled} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
