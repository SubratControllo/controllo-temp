import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  CalendarDays,
  Check,
  ClipboardCheck,
  Grid3X3,
  KeyRound,
  LayoutGrid,
  Link2,
  Monitor,
  Search,
  Settings,
  Target,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import Reveal from '../../components/Reveal';
import TrialLink from '../../components/TrialLink';

const PRIMARY_EASE = [0.16, 1, 0.3, 1];
const DASHBOARD_WIDTH = 650;
const DASHBOARD_HEIGHT = 560;
const RISK_LOOP_MS = 7600;
const riskLoopPhases = [[850, 1], [1750, 2], [3000, 3], [4250, 4], [5350, 5]];

const proofIcons = [ClipboardCheck, UserCheck, Grid3X3, Link2];
const dashboardNavigation = [LayoutGrid, ClipboardCheck, Target, UserCheck, Settings];
const workflowSteps = [
  { label: 'Identify', detail: 'Define the risk', Icon: Search, phase: 0 },
  { label: 'Assess', detail: 'Score exposure', Icon: ChartNoAxesColumnIncreasing, phase: 1 },
  { label: 'Treat', detail: 'Assign and mitigate', Icon: Link2, phase: 3 },
  { label: 'Reduce', detail: 'Track the target', Icon: Target, phase: 5 },
];

function MiniHeatmap() {
  const colors = [
    '#d8f4ec', '#e8efed', '#f8edcf', '#f7ddc5', '#f3cfcc',
    '#d8f4ec', '#d8f4ec', '#e8efed', '#f8edcf', '#f7ddc5',
    '#e8efed', '#d8f4ec', '#d8f4ec', '#e8efed', '#f8edcf',
  ];

  return (
    <div className="relative mt-2.5 grid h-[92px] w-auto grid-cols-5 grid-rows-3 gap-1.5" data-testid="risk-hero-heatmap" aria-hidden="true">
      {colors.map((color, index) => (
        <span
          className="rounded-[5px] border border-navy/7"
          data-heatmap-cell
          key={index}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function WorkflowSteps({ motionEnabled, phase }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Risk workflow">
      {workflowSteps.map(({ detail, Icon, label, phase: stepPhase }, index) => {
        const active = phase >= stepPhase;
        return (
          <li className="relative min-w-0 text-center" key={label}>
            {index ? (
              <span className={`absolute top-[15px] right-[calc(50%+18px)] flex w-[calc(100%-36px)] items-center ${active ? 'text-teal/55' : 'text-muted/30'}`} aria-hidden="true">
                <span className="h-px flex-1 bg-current" />
                <ArrowRight className="-ml-px h-3 w-3 shrink-0" strokeWidth={1.5} />
              </span>
            ) : null}
            <motion.span
              animate={{ backgroundColor: active ? '#dff7ef' : '#eef3f2', color: active ? '#087f8c' : '#7f8e9c' }}
              className="relative z-[1] mx-auto grid h-9 w-9 place-items-center rounded-full"
              transition={{ duration: motionEnabled ? .45 : 0, ease: PRIMARY_EASE }}
            >
              {phase > stepPhase ? <Check aria-hidden="true" size={14} strokeWidth={2} /> : <Icon aria-hidden="true" size={14} strokeWidth={1.9} />}
            </motion.span>
            <strong className="mt-1.5 block text-[.52rem] font-semibold text-navy">{label}</strong>
            <span className="mt-0.5 block truncate text-[.38rem] text-muted">{detail}</span>
          </li>
        );
      })}
    </ol>
  );
}

function TreatmentTimeline({ motionEnabled, phase }) {
  const activeStep = phase >= 5 ? 3 : phase >= 4 ? 2 : phase >= 3 ? 1 : 0;
  const steps = ['Assess', 'Plan', 'Implement', 'Review'];

  return (
    <div>
      <p className="font-mono text-[.52rem] font-semibold uppercase tracking-[.1em] text-teal">Treatment timeline</p>
      <div className="relative mt-4 grid grid-cols-4">
        {steps.map((step, index) => (
          <span className="relative text-center" key={step}>
            {index < steps.length - 1 ? (
              <motion.i
                animate={{ backgroundColor: index < activeStep ? '#26d8ad' : '#d9e1e3' }}
                aria-hidden="true"
                className="absolute top-1 left-1/2 h-px w-full -translate-y-1/2"
                transition={{ duration: motionEnabled ? .45 : 0, ease: PRIMARY_EASE }}
              />
            ) : null}
            <motion.i
              animate={{ backgroundColor: index <= activeStep ? '#26d8ad' : '#d9e1e3', scale: index === activeStep ? 1.15 : 1 }}
              className="relative z-[1] mx-auto block h-[8px] w-[8px] rounded-full"
              transition={{ duration: motionEnabled ? .45 : 0, ease: PRIMARY_EASE }}
            />
            <small className={`mt-1.5 block text-[.42rem] ${index <= activeStep ? 'text-teal' : 'text-muted'}`}>{step}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function RiskWorkspace({ mobile = false, motionEnabled, phase }) {
  const assessed = phase >= 1;
  const scoreResolved = phase >= 2;
  const connected = phase >= 3;
  const targetActive = phase >= 4;
  const targetResolved = phase >= 5;
  const likelihood = 8;
  const impact = 10;
  const target = 50;

  return (
    <div className={mobile ? 'p-4' : 'flex h-full flex-col p-4'}>
      <header className={`flex items-start justify-between gap-4 ${mobile ? '' : 'pl-[92px] pr-[190px]'}`}>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-mono text-[.48rem] font-semibold uppercase tracking-[.12em] text-teal">
            <KeyRound aria-hidden="true" size={11} strokeWidth={1.9} />Risk flow · Access control · RK2
          </p>
          <p className={`${mobile ? 'text-base' : 'text-[.92rem]'} mt-1 font-semibold leading-tight tracking-[-.02em] text-navy`}>Improper privilege management</p>
          <p className="mt-1 max-w-[390px] text-[.43rem] leading-[1.4] text-muted">Excessive or unmonitored privileged access can increase unauthorized-change or data-exposure risk.</p>
        </div>
        {mobile ? (
          <motion.span
            animate={{ opacity: assessed ? 1 : .45 }}
            className="shrink-0 rounded-lg bg-navy px-2.5 py-2 text-right text-white"
            transition={{ duration: motionEnabled ? .45 : 0, ease: PRIMARY_EASE }}
          >
            <span className="block font-mono text-[.36rem] uppercase tracking-[.08em] text-mint">Inherent</span>
            <strong className="mt-0.5 block text-[.68rem]">{scoreResolved ? '80 · High' : 'Assessing'}</strong>
          </motion.span>
        ) : null}
      </header>

      <div className="mt-3 border-y border-line py-2.5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-mono text-[.38rem] font-semibold uppercase tracking-[.1em] text-muted">Risk workflow</span>
          <motion.span
            animate={{ backgroundColor: targetActive ? '#dff7ef' : '#eef3f2', color: targetActive ? '#087f8c' : '#61748a' }}
            className="rounded-full px-2 py-1 font-mono text-[.34rem] font-semibold uppercase tracking-[.08em]"
            transition={{ duration: motionEnabled ? .45 : 0, ease: PRIMARY_EASE }}
          >
            {targetResolved ? 'Target set' : connected ? 'Treatment planned' : 'Assessing'}
          </motion.span>
        </div>
        <WorkflowSteps motionEnabled={motionEnabled} phase={phase} />
      </div>

      <div className={`${mobile ? 'grid-cols-1' : 'grid-flow-dense grid-cols-6'} mt-3 grid gap-2`}>
        <section className={`rounded-[11px] border border-line bg-white p-2.5 ${mobile ? '' : 'col-span-3'}`}>
          <p className="font-mono text-[.4rem] font-semibold uppercase tracking-[.1em] text-teal">Risk context</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[.48rem] text-navy">
            <span className="flex items-center gap-1 rounded-md bg-mist px-2 py-1.5"><UserCheck aria-hidden="true" size={10} />Organization</span>
            <span className="flex items-center gap-1 rounded-md bg-mist px-2 py-1.5"><Monitor aria-hidden="true" size={10} />Asset</span>
            <span className="flex items-center gap-1 rounded-md bg-mist px-2 py-1.5"><ClipboardCheck aria-hidden="true" size={10} />Vendor</span>
          </div>
        </section>

        <motion.section animate={{ opacity: assessed ? 1 : .38 }} className={`rounded-[11px] border border-line bg-white p-2.5 ${mobile ? '' : 'col-span-3'}`} transition={{ duration: .45, ease: PRIMARY_EASE }}>
          <p className="font-mono text-[.4rem] font-semibold uppercase tracking-[.1em] text-teal">Risk assessment</p>
          <div className="mt-2 grid grid-cols-3 divide-x divide-line">
            {[['Likelihood', `${likelihood}/10`], ['Impact', `${impact}/10`], ['Inherent', assessed ? '80' : '—']].map(([label, value], index) => (
              <span className={index ? 'pl-2' : ''} key={label}>
                <small className="block text-[.38rem] text-muted">{label}</small>
                <strong className={`mt-1 block text-[.72rem] ${index === 2 ? 'text-[#a86108]' : 'text-navy'}`}>
                  {index === 2 ? (scoreResolved ? value : '—') : assessed ? value : '—'}
                </strong>
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section animate={{ opacity: connected ? 1 : .38 }} className={`rounded-[11px] border border-line bg-white p-2.5 ${mobile ? '' : 'col-span-4'}`} transition={{ duration: .45, ease: PRIMARY_EASE }}>
          <p className="font-mono text-[.4rem] font-semibold uppercase tracking-[.1em] text-teal">Treatment</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              ['Owner', 'Maya T.', UserCheck],
              ['Linked control', 'Access Management', Link2],
              ['Control review', targetActive ? 'Target set' : 'Planned', ClipboardCheck],
            ].map(([label, value, Icon]) => (
              <span className="min-w-0" key={label}>
                <span className="flex items-center gap-1 text-[.36rem] text-muted"><Icon aria-hidden="true" size={9} className="text-teal" />{label}</span>
                <strong className="mt-1 block truncate text-[.45rem] font-medium text-navy">{value}</strong>
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          animate={{ opacity: targetActive ? 1 : .38, scale: targetActive ? 1 : .98 }}
          className={`rounded-[11px] border border-mint/50 bg-mint-soft/25 p-2.5 shadow-[0_10px_24px_rgba(8,127,140,.08)] ${mobile ? '' : 'col-span-2'}`}
          transition={{ duration: .45, ease: PRIMARY_EASE }}
        >
          <p className="font-mono text-[.4rem] font-semibold uppercase tracking-[.1em] text-teal">Target exposure</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <span>
              <small className="block text-[.38rem] text-muted">Representative target</small>
              <motion.strong
                animate={{ color: targetResolved ? '#087f8c' : '#a86108' }}
                className="mt-1 block text-[.84rem]"
                transition={{ duration: .45, ease: PRIMARY_EASE }}
              >
                {targetActive ? (targetResolved ? `${target} · Moderate` : '80 · High') : 'Pending'}
              </motion.strong>
            </span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-white/80 text-teal">
              <ChartNoAxesColumnIncreasing aria-hidden="true" size={15} strokeWidth={1.8} />
            </span>
          </div>
        </motion.section>
      </div>

      {!mobile ? (
        <div className="mt-auto flex items-center gap-4 border-t border-line px-1 pt-2.5" data-testid="risk-review-strip">
          <p className="shrink-0 font-mono text-[.38rem] font-semibold uppercase tracking-[.1em] text-teal">Review record</p>
          <div className="flex flex-1 items-center justify-between gap-2">
            {['Criteria visible', 'Comments attached', 'Controls reviewable'].map((item) => (
              <span className="flex min-w-0 items-center gap-1 text-[.38rem] text-muted" key={item}>
                <Check aria-hidden="true" className="shrink-0 text-teal" size={9} strokeWidth={2} />
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DesktopPriorityEngine({ dashboardScale, motionEnabled, phase, sceneRef }) {
  const targetActive = phase >= 4;

  return (
    <div className="relative w-full max-w-[690px] max-[760px]:hidden" ref={sceneRef} style={{ height: DASHBOARD_HEIGHT * dashboardScale }}>
      <div className="pointer-events-none absolute top-0 left-0 h-[560px] w-[650px] origin-top-left" style={{ transform: `scale(${dashboardScale})` }}>
        <div className="cyber-hero-proof-cluster relative !h-[560px]">
          <div className="cyber-hero-orbit cyber-hero-orbit--outer opacity-55" aria-hidden="true" />
          <div className="cyber-hero-orbit-field opacity-65" data-motion={motionEnabled ? 'animated' : 'static'} aria-hidden="true">
            <span className="cyber-hero-orbit-track cyber-hero-orbit-track--outer">
              {['primary', 'secondary'].map((emblem) => (
                <span className={`cyber-hero-orbit-planet cyber-hero-orbit-planet--${emblem}`} key={emblem}>
                  <img alt="" draggable={false} src="/assets/emblemLogo.svg" />
                </span>
              ))}
            </span>
          </div>

          <div className="cyber-hero-dashboard-entry">
            <div
              className="cyber-hero-dashboard-plane"
              style={{ borderColor: 'rgba(6,27,50,.14)', boxShadow: '0 28px 70px rgba(6,27,50,.14)' }}
            >
              <div className="cyber-hero-dashboard-rail" aria-hidden="true">
                <img alt="" className="cyber-hero-dashboard-emblem" draggable={false} src="/assets/emblemLogo.svg" />
                {dashboardNavigation.map((Icon, index) => (
                  <span className={`cyber-hero-dashboard-rail__item${index === 2 ? ' cyber-hero-dashboard-rail__item--active' : ''}`} key={index}><Icon /></span>
                ))}
              </div>
              <div className="cyber-hero-dashboard-screen"><RiskWorkspace motionEnabled={motionEnabled} phase={phase} /></div>
            </div>
          </div>

          <motion.div
            animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }}
            className="cyber-hero-proof !block"
            initial={motionEnabled ? { opacity: 0, transform: 'translate3d(88px, 66px, 0) scale(.84)' } : false}
            style={{ left: 0, top: -4, width: 186 }}
            transition={{ duration: .42, delay: motionEnabled ? .34 : 0, ease: PRIMARY_EASE }}
          >
            <p className="font-mono text-[.52rem] font-semibold uppercase tracking-[.1em] text-teal">Risk heatmap</p>
            <MiniHeatmap />
          </motion.div>

          <motion.div
            animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) rotate(2deg) scale(1)' }}
            className="cyber-hero-proof !block"
            initial={motionEnabled ? { opacity: 0, transform: 'translate3d(-76px, 62px, 0) rotate(-1deg) scale(.84)' } : false}
            style={{ left: 'auto', right: 0, top: 5, width: 232 }}
            transition={{ duration: .42, delay: motionEnabled ? .41 : 0, ease: PRIMARY_EASE }}
          >
            <TreatmentTimeline motionEnabled={motionEnabled} phase={phase} />
          </motion.div>

          <motion.div
            animate={{ opacity: targetActive ? 1 : 0, transform: targetActive ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(-36px, -24px, 0) scale(.9)' }}
            className="cyber-hero-proof !items-center !gap-2 !px-2.5 !py-2"
            initial={motionEnabled ? { opacity: 0, transform: 'translate3d(-54px, -38px, 0) scale(.84)' } : false}
            style={{ bottom: 24, left: 'auto', right: 16, top: 'auto', width: 160 }}
            transition={{ duration: .42, delay: motionEnabled ? .48 : 0, ease: PRIMARY_EASE }}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-mint-soft text-teal">
              <ChartNoAxesColumnIncreasing aria-hidden="true" size={13} strokeWidth={1.8} />
            </span>
            <span>
              <strong className="block text-[.64rem] font-semibold leading-tight text-navy">Lower exposure.</strong>
              <span className="mt-0.5 block text-[.48rem] leading-tight text-muted">Clearer priority.</span>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MobilePriorityEngine({ motionEnabled, phase }) {
  return (
    <div className="hidden overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_20px_50px_rgba(6,27,50,.1)] max-[760px]:block">
      <div className="h-2 bg-navy" aria-hidden="true" />
      <RiskWorkspace mobile motionEnabled={motionEnabled} phase={phase} />
    </div>
  );
}

function RiskHeroVisual({ motionEnabled }) {
  const [dashboardScale, setDashboardScale] = useState(1);
  const [phase, setPhase] = useState(motionEnabled ? 0 : 5);
  const sceneRef = useRef(null);
  const visualRef = useRef(null);
  const isInView = useInView(visualRef, { amount: .25 });

  useEffect(() => {
    if (!motionEnabled) {
      setPhase(5);
      return undefined;
    }
    if (!isInView) return undefined;

    let phaseTimers = [];
    const play = () => {
      phaseTimers.forEach(clearTimeout);
      setPhase(0);
      phaseTimers = riskLoopPhases.map(([delay, nextPhase]) => setTimeout(() => setPhase(nextPhase), delay));
    };

    play();
    const loop = setInterval(play, RISK_LOOP_MS);
    return () => {
      clearInterval(loop);
      phaseTimers.forEach(clearTimeout);
    };
  }, [isInView, motionEnabled]);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const resize = () => {
      const width = scene.getBoundingClientRect().width;
      if (width) setDashboardScale(Math.min(1.08, width / DASHBOARD_WIDTH));
    };

    resize();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Representative risk priority scenario: identify, assess, connect, treat, and reduce risk"
      className="relative isolate w-full max-w-[690px] -translate-x-6 justify-self-end max-[1080px]:translate-x-0 max-[1080px]:justify-self-start"
      data-phase={['identify', 'assess', 'score', 'treat', 'target', 'reduce'][phase]}
      data-testid="risk-hero-dashboard"
      ref={visualRef}
      role="group"
    >``
      <DesktopPriorityEngine dashboardScale={dashboardScale} motionEnabled={motionEnabled} phase={phase} sceneRef={sceneRef} />
      <MobilePriorityEngine motionEnabled={motionEnabled} phase={phase} />
      <p className="sr-only">Improper privilege management is assessed, connected to an owner, control and asset, then shown with a lower target exposure after treatment.</p>
    </div>
  );
}

export default function RiskHeroSection({ content, motionEnabled }) {
  const titleLead = content.title.replace(content.titleAccent, '').trim();

  return (
    <section className="flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-mist py-8 max-[1080px]:min-h-0 max-[1080px]:pt-[118px] max-[1080px]:pb-20 max-[760px]:pt-[104px] max-[760px]:pb-16" aria-labelledby="risk-hero-title">
      <div className="shell grid grid-cols-[minmax(0,.9fr)_minmax(500px,1.1fr)] items-center gap-12 max-[1080px]:grid-cols-1 max-[1080px]:gap-14 max-[760px]:gap-10">
        <Reveal motionEnabled={motionEnabled} className="max-w-[620px]">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1
            id="risk-hero-title"
            className="max-w-[690px] text-[3rem] leading-[1.04] min-[760px]:text-[3.45rem] min-[1180px]:text-[3.65rem] max-[420px]:text-[2.6rem]"
            aria-label={content.title}
          >
            <span className="block">{titleLead}</span>
            <span className="hero-title-accent block">{content.titleAccent}</span>
          </h1>
          <p className="lede mt-6 max-w-[560px]">{content.description}</p>
          <div className="action-row mt-8 max-[460px]:grid">
            <TrialLink className="button button--mint button--directional">
              <ArrowRight aria-hidden="true" size={16} />
              Start free trial
            </TrialLink>
            <Link className="button button--ghost" to="/demo">
              <CalendarDays aria-hidden="true" size={16} />
              Request a demo
            </Link>
          </div>
          <ul
            className="mt-8 grid max-w-[620px] grid-cols-4 gap-4 border-t border-line/80 pt-4 max-[640px]:grid-cols-2"
            aria-label="Risk management capabilities"
          >
            {content.proof.map((item, index) => {
              const Icon = proofIcons[index];

              return (
                <li key={item} className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-mint-soft/55 text-teal" aria-hidden="true">
                    <Icon size={14} strokeWidth={1.75} />
                  </span>
                  <span className="block text-[.66rem] font-medium leading-[1.35] text-navy/85">{item}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
        <RiskHeroVisual motionEnabled={motionEnabled} />
      </div>
    </section>
  );
}
