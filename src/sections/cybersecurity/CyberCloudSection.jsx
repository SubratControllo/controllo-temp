import { useRef, useState } from 'react';
import {
  BellRing,
  CircleAlert,
  Cloud,
  Database,
  Fingerprint,
  KeyRound,
  MonitorSmartphone,
  Radar,
  ServerCog,
  Siren,
  UserRoundSearch,
} from 'lucide-react';
import { motion } from 'motion/react';
import IntegrationLogo from '../../components/IntegrationLogo';
import { brandAssets } from '../../data/brandAssets';

const viewIcons = {
  'cloud-assets': { panel: Cloud, signals: [ServerCog, Database] },
  'identities-devices': { panel: Fingerprint, signals: [MonitorSmartphone, UserRoundSearch] },
  'alerts-exposure': { panel: Siren, signals: [BellRing, KeyRound, Radar] },
};

function formatCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function SourceRoster({ view, motionEnabled }) {
  return (
    <section className="mt-9" aria-labelledby={`${view.id}-sources`}>
      <h4 className="font-mono text-[.62rem] font-medium uppercase tracking-[.13em] text-mint" id={`${view.id}-sources`}>Connected sources</h4>
      <ul className="mt-3 list-none divide-y divide-white/10 border-y border-white/10 pl-0" aria-label="Connected operational sources">
        {view.sources.map(({ label, state, brandKey }, index) => {
          const brand = brandAssets[brandKey];
          const isWordmark = brand?.format === 'wordmark';

          return (
            <motion.li
              className="flex min-h-15 items-center justify-between gap-3 py-2.5"
              initial={motionEnabled ? { opacity: 0, x: -8 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: 0.06 + index * 0.05 }}
              key={label}
            >
              <span className="flex h-10 w-40 shrink-0 items-center gap-2.5 rounded-[12px] bg-white px-3 shadow-[0_8px_20px_rgba(0,0,0,.14)]">
                <IntegrationLogo brand={brand} fallback={Cloud} size="roster" />
                <span className={isWordmark ? 'sr-only' : 'truncate text-[.68rem] font-medium text-navy'}>{label}</span>
              </span>
              <span className="shrink-0 font-mono text-[.54rem] uppercase tracking-[.08em] text-mint">{state}</span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

function SummaryRail({ view, motionEnabled }) {
  const summaries = [
    formatCount(view.sources.length, 'source in view', 'sources in view'),
    formatCount(view.signals.length, 'signal visible', 'signals visible'),
    formatCount(view.attention.length, 'item needs review', 'items need review'),
  ];

  return (
    <ul className="grid list-none grid-cols-3 divide-x divide-line border-b border-line pl-0 max-[560px]:grid-cols-1 max-[560px]:divide-x-0 max-[560px]:divide-y" aria-label="Operational view summary">
      {summaries.map((summary, index) => (
        <motion.li
          className="flex min-h-18 items-center gap-3 px-5 py-3"
          initial={motionEnabled ? { opacity: 0, y: 7 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.1 + index * 0.06 }}
          key={summary}
        >
          <span className={`size-2 shrink-0 rounded-full ${index === 2 ? 'bg-navy' : 'bg-mint shadow-[0_0_0_4px_rgba(39,209,176,.1)]'}`} aria-hidden="true" />
          <span className="text-[.68rem] font-medium text-navy">{summary}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function VisibilityList({ view, motionEnabled }) {
  const signalIcons = viewIcons[view.id]?.signals ?? [];

  return (
    <section className="rounded-[20px] bg-[#edf8f5] p-5 shadow-[inset_0_0_0_1px_rgba(8,127,140,.12)]" aria-labelledby={`${view.id}-visibility`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[.57rem] uppercase tracking-[.12em] text-muted">Environment state</p>
          <h4 className="mt-1 text-[.92rem] font-medium" id={`${view.id}-visibility`}>Current visibility</h4>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-white text-teal shadow-[inset_0_0_0_1px_rgba(8,127,140,.1)]" aria-hidden="true">
          <Radar className="size-4" />
        </span>
      </div>

      <ul className="mt-5 list-none divide-y divide-[#cadeda] border-y border-[#cadeda] pl-0" aria-label="Visible operational signals">
        {view.signals.map(([label, state], index) => {
          const SignalIcon = signalIcons[index] ?? Radar;

          return (
            <motion.li
              className="grid min-h-15 grid-cols-[32px_1fr_auto] items-center gap-3 py-2.5"
              initial={motionEnabled ? { opacity: 0, x: -7 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.26, delay: 0.24 + index * 0.06 }}
              key={label}
            >
              <span className="flex size-8 items-center justify-center rounded-[10px] bg-white text-teal" aria-hidden="true">
                <SignalIcon className="size-4" />
              </span>
              <span className="min-w-0 text-[.74rem] font-medium">{label}</span>
              <span className="font-mono text-[.56rem] uppercase tracking-[.08em] text-muted">{state}</span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

function AttentionLedger({ view, motionEnabled }) {
  return (
    <motion.aside
      className="flex flex-col rounded-[20px] bg-navy p-5 text-white shadow-[0_20px_48px_rgba(6,27,50,.14)]"
      initial={motionEnabled ? { opacity: 0, x: 10 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, delay: 0.34 }}
      aria-labelledby={`${view.id}-attention`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[.57rem] uppercase tracking-[.12em] text-mint">Review queue</p>
          <h4 className="mt-1 text-[.92rem] font-medium text-white" id={`${view.id}-attention`}>Attention</h4>
        </div>
        <CircleAlert className="size-4 text-mint" aria-hidden="true" />
      </div>

      <ul className="mt-5 list-none space-y-3 pl-0" aria-label="Operational attention items">
        {view.attention.map(([label, state]) => (
          <li className="rounded-[14px] bg-white/[.07] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]" key={label}>
            <span className="block text-[.72rem] font-medium text-white">{label}</span>
            <strong className="mt-1.5 block font-mono text-[.56rem] font-medium uppercase tracking-[.08em] text-mint">{state}</strong>
          </li>
        ))}
      </ul>

      <p className="mt-auto border-t border-white/10 pt-4 text-[.63rem] leading-5 text-[#b8c8d5]">Operational context remains distinct from control status.</p>
    </motion.aside>
  );
}

function MonitoringOverview({ view, motionEnabled }) {
  return (
    <section className="relative min-w-0 overflow-hidden bg-white" aria-label={`${view.label} monitoring overview`}>
      <motion.span
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-mint"
        initial={motionEnabled ? { opacity: 0, scaleX: 0 } : false}
        animate={motionEnabled ? { opacity: [0, 1, 0], scaleX: [0, 1, 1] } : { opacity: 0, scaleX: 1 }}
        transition={{ duration: 0.72, ease: 'easeOut' }}
        aria-hidden="true"
      />

      <div className="flex min-h-21 items-center justify-between gap-6 border-b border-line px-7 py-4 max-[520px]:items-start max-[520px]:px-5">
        <div>
          <p className="font-mono text-[.58rem] uppercase tracking-[.12em] text-teal">Operational monitoring</p>
          <h3 className="mt-1 text-[1rem] font-medium">Monitoring overview</h3>
        </div>
        <span className="text-right text-[.62rem] text-muted max-[520px]:sr-only">Illustrative product view</span>
      </div>

      <SummaryRail view={view} motionEnabled={motionEnabled} />

      <div className="grid min-h-76 grid-cols-[minmax(0,1.2fr)_minmax(17rem,.8fr)] gap-4 p-6 max-[820px]:grid-cols-1 max-[520px]:p-4">
        <VisibilityList view={view} motionEnabled={motionEnabled} />
        <AttentionLedger view={view} motionEnabled={motionEnabled} />
      </div>
    </section>
  );
}

export default function CyberCloudSection({ views, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = views[activeIndex];
  const ActiveIcon = viewIcons[active.id]?.panel ?? Cloud;

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
          <p className="eyebrow text-muted">Cloud and workforce monitoring</p>
          <h2 id="cyber-cloud-title">See what is connected and where attention is needed.</h2>
          <p className="lede mx-auto mt-6">Bring supported cloud resources, workforce identities and devices, access activity, and security alerts into regularly refreshed operational views.</p>
        </header>

        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-elevated">
          <div className="flex gap-2 overflow-x-auto border-b border-line bg-[#f8fbfa] p-3 max-[520px]:grid max-[520px]:grid-cols-3 max-[520px]:gap-1 max-[520px]:overflow-visible max-[520px]:p-2" role="tablist" aria-label="Operational visibility views">
            {views.map((view, index) => {
              const Icon = viewIcons[view.id]?.panel ?? Cloud;
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
            className="grid min-h-125 select-none grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] max-[820px]:min-h-0 max-[820px]:grid-cols-1"
            id={`cyber-cloud-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`cyber-cloud-tab-${active.id}`}
            key={active.id}
            initial={motionEnabled ? { opacity: 0, y: 7 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="flex min-w-0 flex-col bg-navy p-7 text-white max-[520px]:p-5">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white/[.08] text-mint shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
                  <ActiveIcon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[.58rem] uppercase tracking-[.12em] text-mint">{active.label}</p>
                  <h3 className="mt-1 text-[clamp(1.05rem,2vw,1.32rem)] text-white">{active.summary}</h3>
                </div>
              </div>

              <SourceRoster view={active} motionEnabled={motionEnabled} />

              <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[.55rem] uppercase tracking-[.1em] text-[#9fb4c3]">
                <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
                Refreshed operational view
              </div>
            </div>

            <MonitoringOverview view={active} motionEnabled={motionEnabled} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
