import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  Grid3X3,
  Link2,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import Reveal from '../../components/Reveal';
import TrialLink from '../../components/TrialLink';
import WaveDivider from '../../components/WaveDivider';

const PRIMARY_EASE = [0.16, 1, 0.3, 1];
const DASHBOARD_WIDTH = 650;
const DASHBOARD_HEIGHT = 560;
const RISK_LOOP_MS = 7600;
const riskLoopPhases = [[850, 1], [1750, 2], [3000, 3], [4250, 4], [5350, 5]];
const proofIcons = [ClipboardCheck, UserCheck, Grid3X3, Link2];

function RiskSignals() {
  const signals = [
    ['Asset', 'High', '86%', 'bg-[#f05d45]'],
    ['Organization', 'Low', '11%', 'bg-teal'],
    ['Vendor', 'Moderate', '40%', 'bg-[#f2b84b]'],
  ];

  return (
    <div className="mt-2.5 grid gap-2" aria-hidden="true">
      {signals.map(([label, level, value, color]) => (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2" key={label}>
          <span className="min-w-0">
            <span className="block truncate text-[.48rem] font-semibold leading-tight text-navy">{label}</span>
            <span className="block text-[.38rem] leading-tight text-muted">{level}</span>
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[.46rem] font-semibold text-navy">
            <span className={`block h-1.5 w-7 rounded-full ${color}`} />
            {value}
          </span>
        </div>
      ))}
    </div>
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

function PriorityEngine({ dashboardScale, motionEnabled, phase, sceneRef }) {
  const targetActive = phase >= 4;

  return (
    <div className="relative w-full max-w-[690px]" ref={sceneRef} style={{ height: DASHBOARD_HEIGHT * dashboardScale }}>
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
              <img
                alt="Controllo dashboard showing overall, asset, organization, and vendor risk visibility"
                className="h-full w-full bg-white object-contain"
                draggable={false}
                fetchPriority="high"
                loading="eager"
                src="/assets/risk-dashboard.svg"
              />
            </div>
          </div>

          <motion.div
            animate={{ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }}
            className="cyber-hero-proof !block"
            initial={motionEnabled ? { opacity: 0, transform: 'translate3d(88px, 66px, 0) scale(.84)' } : false}
            style={{ left: 0, top: -4, width: 186 }}
            transition={{ duration: .42, delay: motionEnabled ? .34 : 0, ease: PRIMARY_EASE }}
          >
            <p className="font-mono text-[.52rem] font-semibold uppercase tracking-[.1em] text-teal">Risk signals</p>
            <RiskSignals />
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
    >
      <PriorityEngine dashboardScale={dashboardScale} motionEnabled={motionEnabled} phase={phase} sceneRef={sceneRef} />
      <p className="sr-only">Improper privilege management is assessed, connected to an owner, control and asset, then shown with a lower target exposure after treatment.</p>
    </div>
  );
}

export default function RiskHeroSection({ content, motionEnabled }) {
  const titleLead = content.title.replace(content.titleAccent, '').trim();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-mist pt-8 pb-44 max-[1080px]:min-h-0 max-[1080px]:pt-[118px] max-[1080px]:pb-52 max-[760px]:pt-[104px] max-[760px]:pb-48" aria-labelledby="risk-hero-title">
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
      <WaveDivider />
    </section>
  );
}
