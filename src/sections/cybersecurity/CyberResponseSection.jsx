import { useEffect, useRef, useState } from 'react';
import {
  BellRing,
  BookOpenCheck,
  Check,
  Cloud,
  Database,
  FileText,
  GitBranch,
  Layers3,
  MonitorSmartphone,
  Radar,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const STORY_ICONS = [ShieldCheck, GitBranch, Layers3, Radar, UserCheck];
const SIGNAL_ICONS = [FileText, BookOpenCheck, Database, UserCheck];

function StoryProgress({ activeIndex, total, compact = false, light = false, motionEnabled }) {
  const progress = ((activeIndex + 1) / total) * 100;
  const trackClass = light ? 'bg-navy/10' : 'bg-white/12';
  const fillClass = light ? 'bg-teal' : 'bg-mint';

  return (
    <div
      aria-label="Story progress"
      aria-valuemax={total}
      aria-valuemin="1"
      aria-valuenow={activeIndex + 1}
      className={`relative overflow-hidden rounded-full ${trackClass} ${compact ? 'h-1' : 'h-1.5'}`}
      role="progressbar"
    >
      <motion.span
        animate={{ width: `${progress}%` }}
        className={`absolute inset-y-0 left-0 rounded-full ${fillClass}`}
        initial={false}
        transition={motionEnabled ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      />
    </div>
  );
}

function SceneRow({ icon: Icon, index, label, motionEnabled, state }) {
  const attention = /missing|review/i.test(state);

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="flex min-w-0 items-center gap-3 border-b border-line/70 py-2.5 last:border-b-0"
      initial={motionEnabled ? { opacity: 0, x: -10 } : false}
      transition={motionEnabled ? { delay: 0.08 + index * 0.07, duration: 0.32 } : { duration: 0 }}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-mint-soft/55 text-teal">
        <Icon className="size-3.5" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1 truncate text-[.66rem] font-medium text-navy">{label}</span>
      <span className={`shrink-0 text-[.55rem] ${attention ? 'text-error' : 'text-muted'}`}>{state}</span>
    </motion.div>
  );
}

function ReviewScene({ item, motionEnabled }) {
  return (
    <div className="grid h-fit grid-cols-[1fr_.82fr] gap-4 p-4 max-[1240px]:gap-3">
      <div className="flex min-w-0 flex-col justify-center">
        <p className="mb-1 font-mono text-[.52rem] uppercase tracking-[.1em] text-muted">Connected review scope</p>
        {item.visual.signals.map(([label, state], index) => (
          <SceneRow
            icon={SIGNAL_ICONS[index]}
            index={index}
            key={label}
            label={label}
            motionEnabled={motionEnabled}
            state={state}
          />
        ))}
      </div>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl bg-navy p-4 text-white"
        initial={motionEnabled ? { opacity: 0, scale: 0.94 } : false}
        transition={motionEnabled ? { delay: 0.25, duration: 0.38 } : { duration: 0 }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-mint/12 blur-2xl" />
        <div className="relative">
          <span className="font-mono text-[.5rem] uppercase tracking-[.1em] text-mint">Secura result</span>
          <strong className="mt-3 block text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-none">2 gaps</strong>
          <span className="mt-2 block text-[.58rem] leading-[1.5] text-white/55">Resolve before auditor review</span>
        </div>
        <div className="relative flex flex-col gap-2 pt-4">
          {['Audit-period evidence', 'Required approval'].map((gap, index) => (
            <motion.span
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 border-t border-white/10 pt-2 text-[.55rem] text-white/72"
              initial={motionEnabled ? { opacity: 0, y: 6 } : false}
              key={gap}
              transition={motionEnabled ? { delay: 0.4 + index * 0.08, duration: 0.28 } : { duration: 0 }}
            >
              <span className="size-1.5 rounded-full bg-mint" />
              {gap}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FrameworkScene({ item, motionEnabled }) {
  const connectorPaths = [
    'M25 0 V14 Q25 20 31 20 H44 Q50 20 50 26 V42',
    'M75 0 V14 Q75 20 69 20 H56 Q50 20 50 26 V42',
    'M50 58 V76 Q50 82 44 82 H25 V100',
    'M50 58 V76 Q50 82 56 82 H75 V100'
  ];
  const downstreamIcons = [FileText, ShieldCheck];

  return (
    <div className="relative h-full p-4">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-[4.5rem] h-[8.125rem] w-[calc(100%-2rem)] overflow-visible text-teal/45"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {connectorPaths.map((path, index) => (
          <motion.path
            animate={{ opacity: 1 }}
            d={path}
            fill="none"
            initial={motionEnabled ? { opacity: 0.2 } : false}
            key={path}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            transition={motionEnabled ? { delay: 0.08 + index * 0.06, duration: 0.44 } : { duration: 0 }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="relative z-10 grid grid-cols-2 gap-3">
        {item.visual.signals.slice(0, 2).map(([label, state], index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[14px] border border-line bg-field px-3.5 py-2.5"
            initial={motionEnabled ? { opacity: 0, y: -8 } : false}
            key={label}
            transition={motionEnabled ? { delay: index * 0.08, duration: 0.34 } : { duration: 0 }}
          >
            <span className="block text-[.66rem] font-medium text-navy">{label}</span>
            <span className="mt-1.5 flex items-center gap-1.5 text-[.55rem] text-muted"><Check className="size-3 text-teal" />{state}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute left-1/2 top-[54%] z-10 flex min-w-45 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-[14px] border border-teal/25 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(6,27,50,.08)]"
        initial={motionEnabled ? { opacity: 0, scale: 0.88 } : false}
        transition={motionEnabled ? { delay: 0.2, duration: 0.4 } : { duration: 0 }}
      >
        <GitBranch className="size-4 text-teal" strokeWidth={1.8} />
        <div>
          <span className="block font-mono text-[.48rem] uppercase tracking-[.08em] text-muted">Shared control</span>
          <strong className="mt-0.5 block text-[.68rem] font-medium text-navy">Access governance</strong>
        </div>
      </motion.div>

      <div className="absolute inset-x-4 bottom-4 z-10 grid grid-cols-2 gap-3">
        {item.visual.signals.slice(2).map(([label, state], index) => {
          const Icon = downstreamIcons[index];
          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-3 rounded-[12px] border border-line bg-field px-3 py-2.5"
              initial={motionEnabled ? { opacity: 0, y: 8 } : false}
              key={label}
              transition={motionEnabled ? { delay: 0.34 + index * 0.08, duration: 0.32 } : { duration: 0 }}
            >
              <span className="flex min-w-0 items-center gap-2 text-[.62rem] text-navy">
                <Icon className="size-3.5 shrink-0 text-teal" strokeWidth={1.8} />
                <span className="truncate">{label}</span>
              </span>
              <span className="shrink-0 text-[.54rem] text-teal">{state}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function WorkspaceScene({ item, motionEnabled }) {
  return (
    <div className="grid h-full grid-cols-[.78fr_1.22fr] gap-4 p-4">
      <div className="flex flex-col justify-center gap-2">
        {item.visual.signals.map(([label], index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 rounded-[11px] border border-line bg-field px-3 py-2"
            initial={motionEnabled ? { opacity: 0, x: -12 } : false}
            key={label}
            transition={motionEnabled ? { delay: index * 0.07, duration: 0.32 } : { duration: 0 }}
          >
            <span className="size-1.5 shrink-0 rounded-full bg-teal" />
            <span className="truncate text-[.57rem] text-muted">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="flex min-w-0 flex-col rounded-[16px] border border-line bg-white p-4 shadow-[0_16px_38px_rgba(6,27,50,.07)]"
        initial={motionEnabled ? { opacity: 0, x: 16 } : false}
        transition={motionEnabled ? { delay: 0.18, duration: 0.42 } : { duration: 0 }}
      >
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <span className="grid size-8 place-items-center rounded-[10px] bg-navy text-mint"><Layers3 className="size-4" /></span>
          <div className="min-w-0">
            <span className="block font-mono text-[.48rem] uppercase tracking-[.08em] text-muted">Control dossier</span>
            <strong className="mt-0.5 block truncate text-[.7rem] font-medium text-navy">Access governance</strong>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 content-center gap-x-4 gap-y-3">
          {item.visual.signals.map(([label, state], index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={motionEnabled ? { opacity: 0, y: 5 } : false}
              key={label}
              transition={motionEnabled ? { delay: 0.3 + index * 0.06, duration: 0.28 } : { duration: 0 }}
            >
              <span className="block truncate text-[.52rem] text-muted">{label}</span>
              <span className="mt-1 block truncate text-[.58rem] font-medium text-teal">{state}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EnvironmentScene({ item, motionEnabled }) {
  const sources = [Cloud, UserCheck, MonitorSmartphone, BellRing];
  const streamLabels = ['Cloud inventory', 'Identity activity', 'Device posture', 'Alert queue'];

  return (
    <div className="grid h-full grid-cols-[.92fr_1.08fr] gap-4 p-4">
      <div className="relative flex flex-col justify-center gap-2.5">
        <span aria-hidden="true" className="absolute bottom-[18%] left-3.5 top-[18%] w-px bg-line" />
        {item.visual.signals.map(([label, state], index) => {
          const Icon = sources[index];
          return (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="relative flex items-center gap-3"
              initial={motionEnabled ? { opacity: 0, x: -10 } : false}
              key={label}
              transition={motionEnabled ? { delay: index * 0.07, duration: 0.3 } : { duration: 0 }}
            >
              <span className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full border border-teal/20 bg-white text-teal">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0">
                <span className="block text-[.61rem] font-medium text-navy">{label}</span>
                <span className="mt-0.5 block text-[.52rem] text-muted">{state}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-[16px] bg-navy px-4 py-3 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:100%_28px]" />
        <div className="relative mb-2 flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
          <span className="font-mono text-[.49rem] uppercase tracking-[.09em] text-mint">Operational context snapshot</span>
          <Radar className="size-4 text-mint" />
        </div>
        <div className="relative flex flex-col">
          {item.visual.signals.map(([label, state], index) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between gap-3 border-b border-white/10 py-2 last:border-b-0"
              initial={motionEnabled ? { opacity: 0, x: 8 } : false}
              key={label}
              transition={motionEnabled ? { delay: 0.12 + index * 0.07, duration: 0.3 } : { duration: 0 }}
            >
              <span className="truncate text-[.55rem] text-white/72">{streamLabels[index]}</span>
              <span className={`shrink-0 text-[.5rem] font-medium ${/review/i.test(state) ? 'text-mint' : 'text-white/48'}`}>{state}</span>
            </motion.div>
          ))}
        </div>
        {motionEnabled ? (
          <motion.span
            animate={{ opacity: [0, 0.7, 0], x: ['-20%', '120%'] }}
            className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-mint/12 to-transparent"
            initial={{ opacity: 0, x: '-20%' }}
            transition={{ delay: 0.18, duration: 0.9, ease: 'easeInOut' }}
          />
        ) : null}
      </div>
    </div>
  );
}

function ActionScene({ item, motionEnabled }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 rounded-[15px] bg-navy px-4 py-3 text-white"
        initial={motionEnabled ? { opacity: 0, y: -8 } : false}
        transition={motionEnabled ? { duration: 0.35 } : { duration: 0 }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-mint/12 text-mint"><UserCheck className="size-4" /></span>
          <div className="min-w-0">
            <span className="block font-mono text-[.48rem] uppercase tracking-[.08em] text-white/45">Accountable owner</span>
            <strong className="mt-0.5 block truncate text-[.68rem] font-medium">Assigned control owner</strong>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-mint px-2.5 py-1 text-[.5rem] font-medium text-navy">Ready</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {item.visual.signals.map(([label, state], index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-2 border-b border-line px-1 py-2.5"
            initial={motionEnabled ? { opacity: 0, y: 6 } : false}
            key={label}
            transition={motionEnabled ? { delay: 0.12 + index * 0.07, duration: 0.3 } : { duration: 0 }}
          >
            <span className="truncate text-[.58rem] text-muted">{label}</span>
            <span className="flex shrink-0 items-center gap-1 text-[.54rem] font-medium text-teal"><Check className="size-3" />{state}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: 1, scaleX: 1 }}
        className="mt-auto flex origin-left items-center gap-3 border-t border-line px-1 pt-3"
        initial={motionEnabled ? { opacity: 0, scaleX: 0.94 } : false}
        transition={motionEnabled ? { delay: 0.35, duration: 0.38 } : { duration: 0 }}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-teal/20 bg-mint-soft/35 text-teal">
          <Check aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        </span>
        <div>
          <span className="block font-mono text-[.47rem] uppercase tracking-[.08em] text-muted">Readiness state</span>
          <strong className="mt-0.5 block text-[.63rem] font-medium text-navy">Review context ready</strong>
        </div>
      </motion.div>
    </div>
  );
}

function ProductScene({ activeIndex, item, motionEnabled }) {
  const scenes = [ReviewScene, FrameworkScene, WorkspaceScene, EnvironmentScene, ActionScene];
  const Scene = scenes[activeIndex] ?? ReviewScene;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      aria-label={`${item.visual.label} visual`}
      className="relative h-64 overflow-hidden rounded-[20px] border border-line bg-white"
      initial={motionEnabled ? { opacity: 0, y: 10 } : false}
      key={item.id}
      role="img"
      transition={motionEnabled ? { duration: 0.34, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
    >
      <Scene item={item} motionEnabled={motionEnabled} />
    </motion.div>
  );
}

function ProgramCanvas({ activeIndex, item, motionEnabled, total }) {
  return (
    <div
      aria-label="Current Controllo response example"
      className="pointer-events-none relative flex select-none flex-col overflow-hidden rounded-[26px] border border-line bg-field text-navy shadow-elevated"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-[11px] bg-mint-soft/55">
            <img alt="" aria-hidden="true" className="size-4.5" draggable="false" src="/assets/emblemLogo.svg" />
          </span>
          <div>
            <span className="block text-[.72rem] font-medium">Assurance dossier</span>
            <span className="mt-0.5 block font-mono text-[.49rem] uppercase tracking-[.09em] text-muted">Illustrative program view</span>
          </div>
        </div>
        <span className="font-mono text-[.58rem] tracking-[.08em] text-muted">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="px-5 pt-4">
        <StoryProgress activeIndex={activeIndex} light motionEnabled={motionEnabled} total={total} />
      </div>

      <div className="px-5 pb-3 pt-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={motionEnabled ? { opacity: 0, y: 7 } : false}
          key={`${item.id}-heading`}
          transition={motionEnabled ? { duration: 0.3 } : { duration: 0 }}
        >
          <p className="mb-1.5 font-mono text-[.55rem] uppercase tracking-[.1em] text-teal">{item.visual.label}</p>
          <h3 className="text-[clamp(1.3rem,1.9vw,1.75rem)] leading-[1.15] text-navy">{item.visual.value}</h3>
          <p className="mt-2 mb-0 text-[.64rem] leading-[1.5] text-muted">{item.visual.detail}</p>
        </motion.div>
      </div>

      <div className="px-5 pb-4">
        <ProductScene activeIndex={activeIndex} item={item} motionEnabled={motionEnabled} />
      </div>
    </div>
  );
}

function MobileStoryCard({ index, item, motionEnabled, total }) {
  const Icon = STORY_ICONS[index] ?? ShieldCheck;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none mt-7 hidden select-none overflow-hidden rounded-[20px] border border-line bg-field p-5 text-navy max-[1080px]:block"
      initial={motionEnabled ? { opacity: 0, y: 12 } : false}
      transition={motionEnabled ? { duration: 0.4 } : { duration: 0 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-mint-soft/60 text-teal">
            <Icon className="size-4.5" strokeWidth={1.7} />
          </span>
          <div className="min-w-0">
            <span className="block font-mono text-[.52rem] uppercase tracking-[.1em] text-teal">{item.visual.label}</span>
            <strong className="mt-1 block text-[.82rem] font-medium leading-[1.4]">{item.visual.value}</strong>
          </div>
        </div>
        <span className="shrink-0 font-mono text-[.52rem] text-muted">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-line py-4 max-[440px]:grid-cols-1">
        {item.visual.signals.map(([label, state]) => (
          <div className="flex items-center justify-between gap-3" key={`${item.id}-mobile-${label}`}>
            <span className="truncate text-[.65rem] text-muted">{label}</span>
            <span className="flex shrink-0 items-center gap-1 text-[.56rem] font-medium text-teal"><Check className="size-3" />{state}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <StoryProgress activeIndex={index} compact light motionEnabled={motionEnabled} total={total} />
      </div>
    </motion.div>
  );
}

export default function CyberResponseSection({ items, motionEnabled }) {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!motionEnabled || typeof IntersectionObserver === 'undefined') return undefined;
    const rows = Array.from(listRef.current?.querySelectorAll('[data-response-index]') ?? []);
    const visibleRatios = new Map(rows.map((row) => [Number(row.dataset.responseIndex), 0]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibleRatios.set(
          Number(entry.target.dataset.responseIndex),
          entry.isIntersecting ? entry.intersectionRatio : 0
        );
      });
      const current = [...visibleRatios.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0];
      if (current) setActiveIndex(current[0]);
    }, { threshold: [0.28, 0.45, 0.62, 0.78], rootMargin: '-20% 0px -30% 0px' });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [motionEnabled, items]);

  const resolvedIndex = motionEnabled ? activeIndex : Math.max(0, items.length - 1);
  const active = items[resolvedIndex];
  const timelineProgress = items.length > 1 ? resolvedIndex / (items.length - 1) : 1;

  return (
    <section className="section overflow-clip bg-white min-[1081px]:pb-[20.25rem]" aria-labelledby="cyber-response-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
      <div className="shell">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(400px,.82fr)] items-start gap-18 max-[1160px]:gap-12 max-[1080px]:grid-cols-1">
          <div data-testid="cyber-story-narrative">
            <header className="mb-14 max-w-165 max-[760px]:mb-11">
              <h2 id="cyber-response-title" className="text-[clamp(2.15rem,3.3vw,2.85rem)] leading-[1.08]">Turn compliance friction into clearer action.</h2>
              <p className="mt-5 mb-0 max-w-155 text-[.96rem] leading-[1.7] text-muted">Modern cyber and cloud programs must keep evidence reviewable, extend work across overlapping frameworks, respond to changing environments, assess risk consistently, and coordinate with auditors without adding another disconnected system.</p>
            </header>

            <ol ref={listRef} className="relative list-none pl-0" aria-label="Cybersecurity challenges and responses">
              <span
                aria-hidden="true"
                className="absolute bottom-[10%] left-[21px] top-[10%] w-px bg-line max-[1080px]:hidden"
                data-testid="cyber-story-track"
              />
              <motion.span
                animate={{ scaleY: timelineProgress }}
                aria-label="Connected program timeline progress"
                aria-valuemax={items.length}
                aria-valuemin="1"
                aria-valuenow={resolvedIndex + 1}
                className="absolute bottom-[10%] left-[20.5px] top-[10%] w-0.5 origin-top bg-teal max-[1080px]:hidden"
                initial={false}
                role="progressbar"
                transition={motionEnabled ? { duration: 0.52, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
              />
              <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 hidden w-px bg-line max-[1080px]:block max-[760px]:left-[15px]" />
              {items.map((item, index) => {
                const isActive = index === resolvedIndex;
                return (
                  <li
                    aria-current={isActive ? 'step' : undefined}
                    className="relative grid content-center py-12 pl-16 transition-colors duration-300 min-[1081px]:min-h-[clamp(30rem,56vh,34rem)] max-[760px]:pl-12"
                    data-response-index={index}
                    data-testid={`cyber-response-row-${index}`}
                    key={item.id}
                  >
                    <motion.span
                      animate={{ backgroundColor: isActive ? '#26D8AD' : '#FFFFFF', borderColor: isActive ? '#26D8AD' : 'rgba(6,27,50,.18)', color: isActive ? '#061B32' : '#087F8C', scale: isActive ? 1 : 0.88 }}
                      className="absolute left-0 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border bg-white font-mono text-[.68rem] max-[760px]:size-8"
                      initial={false}
                      transition={motionEnabled ? { duration: 0.32 } : { duration: 0 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.985, x: isActive ? 0 : -4 }}
                      className="origin-left"
                      initial={false}
                      transition={motionEnabled ? { duration: 0.38, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
                    >
                      <p className="mb-2.5 font-mono text-[.62rem] uppercase tracking-[.1em] text-teal">{item.visual.label}</p>
                      <h3 className="max-w-[22ch] text-[clamp(1.65rem,2.4vw,2.25rem)] leading-[1.14]">{item.challenge}</h3>
                      <p className="mt-3.5 mb-0 max-w-[56ch] text-[.94rem] leading-[1.65] text-muted">{item.response}</p>
                    </motion.div>
                    <MobileStoryCard index={index} item={item} motionEnabled={motionEnabled} total={items.length} />
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="h-[calc(100%+16.25rem)] max-[1080px]:hidden">
            <div className="sticky top-[max(7rem,calc(50vh-12.3125rem))]">
              <ProgramCanvas activeIndex={resolvedIndex} item={active} motionEnabled={motionEnabled} total={items.length} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
