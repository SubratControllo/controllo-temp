import {
  ArrowRight,
  ArrowsClockwise,
  ChartLineUp,
  CheckCircle,
  FileMagnifyingGlass,
  Files,
  Gauge,
  ShieldCheck,
  Stack,
  UserCircleCheck,
} from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { motion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const capabilityDetails = {
  'challenge-1': { icon: Stack },
  'challenge-2': { icon: Gauge },
  'challenge-3': { icon: UserCircleCheck },
  'challenge-4': { icon: ArrowsClockwise },
  'challenge-5': { icon: FileMagnifyingGlass },
  'challenge-6': { icon: ChartLineUp },
};

const stageIcons = {
  map: Stack,
  'assign-assess': UserCircleCheck,
  connect: ArrowsClockwise,
  review: ShieldCheck,
};

function JourneyRail({ activeIndex, motionEnabled, stages }) {
  const progress = ((activeIndex + 1) / stages.length) * 100;

  return (
    <aside aria-label="AI governance journey progress" className="hidden min-[1081px]:block">
      <p className="font-mono text-[.58rem] uppercase tracking-[.14em] text-teal">Operating path</p>
      <div className="relative mt-5">
        <span aria-hidden="true" className="absolute bottom-4 left-[5px] top-4 w-px bg-navy/10" />
        <ol className="relative list-none space-y-0 pl-0">
          {stages.map((stage, index) => {
            const isActive = activeIndex === index;
            return (
              <li className="relative grid grid-cols-[12px_minmax(0,1fr)] items-center gap-3 py-3" key={stage.id}>
                <span
                  aria-hidden="true"
                  className={`relative z-10 size-[11px] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300 ${isActive
                    ? 'border-teal bg-mint shadow-[0_0_0_5px_rgba(48,211,183,.12)]'
                    : 'border-[#b8c8c3] bg-[#f3f7f5]'
                  }`}
                />
                <span className={`text-[.76rem] font-medium transition-colors duration-300 ${isActive ? 'text-navy' : 'text-navy/42'}`}>
                  {stage.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-5 border-t border-navy/10 pt-4">
        <div className="flex items-center justify-between font-mono text-[.54rem] tracking-[.08em] text-muted">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span>{String(stages.length).padStart(2, '0')}</span>
        </div>
        <div
          aria-label="AI governance story progress"
          aria-valuemax={stages.length}
          aria-valuemin="1"
          aria-valuenow={activeIndex + 1}
          className="relative mt-2 h-1 overflow-hidden rounded-full bg-navy/8"
          role="progressbar"
        >
          <motion.span
            animate={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 rounded-full bg-teal"
            initial={false}
            transition={motionEnabled ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          />
        </div>
      </div>
    </aside>
  );
}

function CanvasHeader({ stage, stageIndex, total }) {
  const Icon = stageIcons[stage.id] ?? Stack;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-navy/8 px-5 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#e5f6f1] text-teal">
          <Icon aria-hidden="true" className="size-[1.05rem]" weight="regular" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-mono text-[.58rem] uppercase tracking-[.13em] text-teal">AI governance flow</p>
          <p className="mt-0.5 truncate text-[.72rem] text-muted">{stage.label}</p>
        </div>
      </div>
      <span className="shrink-0 rounded-full border border-teal/12 bg-[#eff8f5] px-3 py-1.5 font-mono text-[.54rem] tracking-[.08em] text-navy/58">
        {String(stageIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

function MapView() {
  return (
    <div className="grid h-full content-center gap-5 p-5 sm:p-7">
      <div className="rounded-[22px] border border-navy/9 bg-white p-5 shadow-[0_18px_45px_rgba(6,27,50,.07)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[.58rem] uppercase tracking-[.13em] text-teal">AI system inventory</p>
            <h4 className="mt-3 text-[clamp(1.25rem,2.5vw,1.8rem)] tracking-[-.035em] text-navy">Customer support assistant</h4>
          </div>
          <span className="rounded-full bg-mint/24 px-3 py-1.5 text-[.68rem] font-medium text-navy">Active</span>
        </div>
        <div className="mt-6 grid gap-3 border-t border-navy/8 pt-5 sm:grid-cols-3">
          {[
            ['Purpose', 'Customer support'],
            ['Owner', 'Owner assigned'],
            ['Status', 'Current record'],
          ].map(([label, value]) => (
            <div className="rounded-xl bg-[#f3f7f5] px-3.5 py-3" key={label}>
              <p className="text-[.62rem] text-muted">{label}</p>
              <p className="mt-1 text-[.76rem] font-medium text-navy">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {['System recorded', 'Purpose visible', 'Status tracked'].map((label, index) => (
          <div className="flex min-h-20 flex-col justify-between rounded-2xl border border-navy/8 bg-white/70 p-3.5" key={label}>
            <span className="font-mono text-[.52rem] text-teal">0{index + 1}</span>
            <span className="text-[.66rem] leading-4 text-navy/62">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignAssessView() {
  return (
    <div className="relative grid h-full content-center gap-5 p-5 sm:p-7">
      <div aria-hidden="true" className="absolute left-[24%] right-[24%] top-1/2 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="relative z-10 grid gap-4 sm:grid-cols-[1fr_1.08fr]">
        <div className="rounded-[22px] border border-navy/9 bg-white p-5 shadow-[0_18px_45px_rgba(6,27,50,.06)]">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-navy text-mint">
              <UserCircleCheck aria-hidden="true" className="size-[1.05rem]" />
            </span>
            <p className="font-mono text-[.56rem] uppercase tracking-[.12em] text-teal">Accountable owner</p>
          </div>
          <p className="mt-7 text-[1.18rem] font-medium text-navy">Owner assigned</p>
          <p className="mt-1.5 text-[.72rem] leading-5 text-muted">Responsibility stays connected to the AI system.</p>
        </div>
        <div className="rounded-[22px] border border-teal/14 bg-[#dff7f1] p-5 shadow-[0_18px_45px_rgba(17,132,125,.08)]">
          <div className="flex items-center gap-3 text-teal">
            <Gauge aria-hidden="true" className="size-5" />
            <p className="font-mono text-[.56rem] uppercase tracking-[.12em]">AI risk assessment</p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              ['Likelihood', 'Possible'],
              ['Impact', 'Moderate'],
            ].map(([label, value]) => (
              <div className="rounded-xl bg-white/68 p-3.5" key={label}>
                <p className="text-[.62rem] text-navy/48">{label}</p>
                <p className="mt-1 text-[.95rem] font-medium text-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between rounded-2xl border border-navy/8 bg-white/72 px-4 py-3">
        <span className="text-[.7rem] text-navy/58">Customer support assistant</span>
        <span className="flex items-center gap-2 text-[.66rem] font-medium text-teal">
          <CheckCircle aria-hidden="true" className="size-4" weight="fill" /> Connected context
        </span>
      </div>
    </div>
  );
}

function ConnectView() {
  const sources = [
    ['Implementation', CheckCircle],
    ['Policy', Files],
    ['Evidence', FileMagnifyingGlass],
  ];

  return (
    <div className="grid h-full content-center gap-5 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-[.84fr_1.16fr]">
        <div className="grid gap-3">
          {sources.map(([label, Icon]) => (
            <div className="flex items-center gap-3 rounded-2xl border border-navy/8 bg-white p-4" key={label}>
              <span className="grid size-8 place-items-center rounded-lg bg-[#e5f6f1] text-teal">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <span className="text-[.74rem] font-medium text-navy">{label}</span>
              <ArrowRight aria-hidden="true" className="ml-auto size-3.5 text-teal/60" />
            </div>
          ))}
        </div>
        <div className="rounded-[22px] border border-navy/10 bg-navy p-5 text-white shadow-[0_22px_50px_rgba(6,27,50,.14)]">
          <p className="font-mono text-[.56rem] uppercase tracking-[.12em] text-mint">Shared control context</p>
          <p className="mt-4 max-w-[16ch] text-[1.35rem] leading-[1.08] tracking-[-.035em]">Approved work stays connected.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {['ISO/IEC 42001', 'NIST AI RMF', 'EU AI Act'].map((framework) => (
              <span className="rounded-full border border-white/12 bg-white/7 px-2.5 py-1.5 text-[.58rem] text-white/70" key={framework}>
                {framework}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-teal/12 bg-[#e8f7f2] px-4 py-3.5">
        <ArrowsClockwise aria-hidden="true" className="size-5 shrink-0 text-teal" />
        <p className="text-[.7rem] leading-5 text-navy/64">Reuse relevant context where governance requirements overlap.</p>
      </div>
    </div>
  );
}

function ReviewView() {
  return (
    <div className="grid h-full content-center gap-4 p-5 sm:p-7">
      <div className="rounded-[22px] border border-navy/9 bg-white p-5 shadow-[0_18px_45px_rgba(6,27,50,.07)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/8 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-navy text-mint">
              <ShieldCheck aria-hidden="true" className="size-[1.05rem]" />
            </span>
            <div>
              <p className="font-mono text-[.56rem] uppercase tracking-[.12em] text-teal">Secura review</p>
              <p className="mt-0.5 text-[.68rem] text-muted">AI governance control</p>
            </div>
          </div>
          <span className="rounded-full bg-[#fff2dc] px-3 py-1.5 text-[.62rem] font-medium text-[#8a5a17]">Needs attention</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="font-mono text-[.52rem] uppercase tracking-[.12em] text-muted">Finding</p>
            <p className="mt-2 text-[.77rem] leading-5 text-navy/72">Supporting evidence does not demonstrate the latest approved AI-risk review.</p>
          </div>
          <div className="rounded-xl bg-[#eff8f5] p-3.5">
            <p className="font-mono text-[.52rem] uppercase tracking-[.12em] text-teal">Next action</p>
            <p className="mt-2 text-[.7rem] leading-5 text-navy/68">Add the current assessment and ownership record.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-navy/8 bg-white/72 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <CheckCircle aria-hidden="true" className="size-4 text-teal" />
          <span className="text-[.7rem] font-medium text-navy">Human review required</span>
        </div>
        <span className="font-mono text-[.52rem] uppercase tracking-[.1em] text-muted">Accountable decision</span>
      </div>
    </div>
  );
}

function StageVisual({ stage }) {
  if (stage.id === 'assign-assess') return <AssignAssessView />;
  if (stage.id === 'connect') return <ConnectView />;
  if (stage.id === 'review') return <ReviewView />;
  return <MapView />;
}

function GovernanceCanvas({ activeIndex, motionEnabled, stages }) {
  const stage = stages[activeIndex];

  return (
    <figure
      aria-label={stage.visualLabel}
      className="relative overflow-hidden rounded-[26px] border border-navy/9 bg-[#edf4f1] shadow-[0_28px_80px_rgba(6,27,50,.09)]"
    >
      <CanvasHeader stage={stage} stageIndex={activeIndex} total={stages.length} />
      <div className="relative min-h-[20rem] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(6,27,50,.08)_1px,transparent_0)] bg-[size:22px_22px] opacity-35" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-mint/18 blur-[85px]" />
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative h-full min-h-[20rem]"
          initial={motionEnabled ? { opacity: 0, y: 12, scale: 0.985 } : false}
          key={stage.id}
          transition={motionEnabled ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
        >
          <StageVisual stage={stage} />
        </motion.div>
      </div>
    </figure>
  );
}

function StageNarrative({ index, isActive, items, motionEnabled, stage, stages }) {
  const StageIcon = stageIcons[stage.id] ?? Stack;

  return (
    <li
      aria-current={isActive ? 'step' : undefined}
      className="relative flex min-h-[32rem] items-center border-t border-navy/10 py-14 first:border-t-0 min-[1081px]:min-h-[clamp(34rem,72vh,46rem)] max-[640px]:min-h-0 max-[640px]:py-12"
      data-response-index={index}
      data-testid={`ai-challenge-row-${index}`}
    >
      <div className="w-full">
        <div className="flex items-center gap-3">
          <span className={`grid size-10 place-items-center rounded-xl border transition-colors duration-300 ${isActive ? 'border-teal/14 bg-[#e3f5ef] text-teal' : 'border-navy/8 bg-white text-navy/40'}`}>
            <StageIcon aria-hidden="true" className="size-[1.05rem]" weight="regular" />
          </span>
          <p className="font-mono text-[.6rem] uppercase tracking-[.13em] text-teal">
            {String(index + 1).padStart(2, '0')} · {stage.label}
          </p>
        </div>

        <h3 className="mt-6 max-w-[17ch] text-[clamp(2rem,3.15vw,3rem)] leading-[1.04] tracking-[-.045em] text-navy">
          {stage.title}
        </h3>
        <p className="mt-5 max-w-[42ch] text-[1rem] leading-7 text-navy/64">{stage.description}</p>

        <div className="mt-8 space-y-5 border-t border-navy/10 pt-6">
          {items.map((item) => {
            const detail = capabilityDetails[item.id] ?? capabilityDetails['challenge-1'];
            const Icon = detail.icon;
            return (
              <div className="grid gap-3" key={item.id}>
                <div className="flex items-center gap-2.5">
                  <Icon aria-hidden="true" className="size-4 text-teal" />
                  <p className="font-mono text-[.54rem] uppercase tracking-[.11em] text-muted">{item.capability}</p>
                </div>
                <h4 className="max-w-[38ch] text-[1.04rem] font-medium leading-6 text-navy">{item.challenge}</h4>
                <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3">
                  <span aria-hidden="true" className="mt-0.5 grid size-7 place-items-center rounded-full bg-navy text-mint">
                    <ArrowRight className="size-3" weight="bold" />
                  </span>
                  <p className="max-w-[42ch] text-[.86rem] leading-6 text-navy/64">{item.response}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 min-[1081px]:hidden">
          <GovernanceCanvas activeIndex={index} motionEnabled={motionEnabled} stages={stages} />
        </div>
      </div>
    </li>
  );
}

export default function AiChallengesSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const railRef = useRef(null);
  const listRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!motionEnabled || typeof IntersectionObserver === 'undefined') return undefined;

    const rows = Array.from(listRef.current?.querySelectorAll('[data-response-index]') ?? []);
    const visibleRatios = new Map(rows.map((row) => [Number(row.dataset.responseIndex), 0]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibleRatios.set(
          Number(entry.target.dataset.responseIndex),
          entry.isIntersecting ? entry.intersectionRatio : 0,
        );
      });
      const current = [...visibleRatios.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0];
      if (current) setActiveIndex(current[0]);
    }, { threshold: [0.24, 0.4, 0.58, 0.74], rootMargin: '-18% 0px -26% 0px' });

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [content.stages, motionEnabled]);

  useLayoutEffect(() => {
    if (!motionEnabled || typeof window === 'undefined') return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.76,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 84%', once: true },
        },
      );
      gsap.fromTo(
        [railRef.current, canvasRef.current],
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 84%', once: true },
        },
      );
      gsap.fromTo(
        listRef.current?.children ?? [],
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 84%', once: true },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [motionEnabled]);

  const resolvedIndex = motionEnabled ? activeIndex : 0;
  const itemsById = new Map(content.items.map((item) => [item.id, item]));

  return (
    <section
      aria-label={content.eyebrow}
      className="relative w-full max-w-full overflow-x-clip bg-[#f3f7f5] pt-6 pb-30 md:pt-8"
      ref={sectionRef}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-[-10rem] size-[34rem] rounded-full bg-mint/10 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-14rem] bottom-[12%] size-[36rem] rounded-full bg-teal/7 blur-[150px]" />

      <div className="shell relative">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end" ref={headerRef}>
          <div className="lg:col-span-7">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="ai-challenges-heading" className="mt-5 max-w-4xl text-balance text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.03]">
              {content.title}
            </h2>
          </div>
          <p className="max-w-xl text-[1rem] leading-8 text-ink/66 lg:col-span-5 lg:pb-1 lg:pl-8">{content.supporting}</p>
        </header>

        <div className="mt-16 grid items-start gap-10 min-[1081px]:grid-cols-[9rem_minmax(21rem,.9fr)_minmax(26rem,1.1fr)] min-[1081px]:gap-8 xl:grid-cols-[10rem_minmax(23rem,.92fr)_minmax(28rem,1.08fr)] xl:gap-10">
          <div className="hidden min-[1081px]:block min-[1081px]:h-full">
            <div className="sticky top-[max(8rem,calc(50vh-8rem))]" ref={railRef}>
              <JourneyRail activeIndex={resolvedIndex} motionEnabled={motionEnabled} stages={content.stages} />
            </div>
          </div>

          <ol aria-label="AI governance operating stages" className="list-none pl-0" ref={listRef}>
            {content.stages.map((stage, index) => (
              <StageNarrative
                index={index}
                isActive={index === resolvedIndex}
                items={stage.itemIds.map((itemId) => itemsById.get(itemId)).filter(Boolean)}
                key={stage.id}
                motionEnabled={motionEnabled}
                stage={stage}
                stages={content.stages}
              />
            ))}
          </ol>

          <div className="hidden min-[1081px]:block min-[1081px]:h-full">
            <div className="sticky top-[max(7.5rem,calc(50vh-12rem))]" ref={canvasRef}>
              <GovernanceCanvas activeIndex={resolvedIndex} motionEnabled={motionEnabled} stages={content.stages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
