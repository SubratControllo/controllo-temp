import {
  ArrowRight,
  CheckCircle,
  FileText,
  WarningCircle,
} from '@phosphor-icons/react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import SecuraAnimatedGradient from './SecuraAnimatedGradient';

const EASE = [0.16, 1, 0.3, 1];
const DASHBOARD_IMAGE = '/assets/secura-ai/Secura-ControlDetail.svg';

const phases = [
  ['idle', 2000],
  ['activate', 1200],
  ['expand', 1000],
  ['analyze', 3000],
  ['reveal', 3300],
  ['hold', 900],
];

const analysisStages = [
  ['Fetching control details', '18%'],
  ['Reviewing implementation', '38%'],
  ['Checking policies & procedures', '66%'],
  ['Evaluating evidence', '84%'],
  ['Finalizing results', '100%'],
];

const missingSections = [
  'Implementation Description',
  'Policies & Procedures',
  'Evidence',
];

function useHeroVisibility(ref) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      { rootMargin: '80px', threshold: 0.08 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

function usePhaseTimeline({ canPlay, motionEnabled }) {
  const staticPhaseIndex = phases.findIndex(([name]) => name === 'hold');
  const [phaseIndex, setPhaseIndex] = useState(motionEnabled ? 0 : staticPhaseIndex);
  const remainingRef = useRef(phases[motionEnabled ? 0 : staticPhaseIndex][1]);
  const timerRef = useRef(0);
  const startedAtRef = useRef(0);

  const goTo = useCallback((nextIndex) => {
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;
    remainingRef.current = phases[nextIndex][1];
    setPhaseIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      goTo(staticPhaseIndex);
      return undefined;
    }
    if (!canPlay) return undefined;
    if (phaseIndex === phases.length - 1) return undefined;

    startedAtRef.current = performance.now();
    timerRef.current = window.setTimeout(() => {
      timerRef.current = 0;
      const nextIndex = phaseIndex + 1;
      remainingRef.current = phases[nextIndex][1];
      setPhaseIndex(nextIndex);
    }, remainingRef.current);

    return () => {
      if (!timerRef.current) return;
      const elapsed = performance.now() - startedAtRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      window.clearTimeout(timerRef.current);
      timerRef.current = 0;
    };
  }, [canPlay, goTo, motionEnabled, phaseIndex, staticPhaseIndex]);

  return {
    phase: phases[phaseIndex][0],
  };
}

const ProductScreenshot = memo(function ProductScreenshot({ motionEnabled, phase }) {
  const receded = ['expand', 'analyze', 'reveal', 'hold'].includes(phase);
  const maskingBanner = phase !== 'idle';

  return (
    <motion.div
      animate={motionEnabled ? {
        filter: receded ? 'blur(2px)' : 'blur(0px)',
        opacity: receded ? 0.38 : 1,
        rotateX: 1.5,
        rotateY: receded ? -5 : -3,
        rotateZ: 0.5,
        scale: receded ? 0.94 : 0.97,
        transformPerspective: 1400,
        z: receded ? -70 : 0,
      } : {
        filter: 'blur(2px)',
        opacity: 0.22,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        z: 0,
      }}
      className="absolute inset-x-0 top-0 origin-center [backface-visibility:hidden] [transform-style:preserve-3d] max-[560px]:[transform:none!important]"
      initial={motionEnabled ? { opacity: 0, scale: 0.96, y: 12 } : false}
      transition={{ duration: phase === 'idle' ? 0.7 : 0.8, ease: EASE }}
    >
      <img
        alt=""
        className="block aspect-[4/3] w-full select-none rounded-[18px] shadow-[0_32px_90px_rgba(0,0,0,.46)]"
        draggable="false"
        src={DASHBOARD_IMAGE}
      />
      <motion.div
        animate={motionEnabled ? {
          opacity: phase === 'activate' ? [0, 1, 1] : maskingBanner ? 1 : 0,
        } : { opacity: 1 }}
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden rounded-[7px] border border-[#dce5ea]/80 bg-[#f7f9fb]"
        data-baked-banner-mask={maskingBanner}
        initial={false}
        style={{ height: '11.5%', left: '12.8%', top: '29.8%', width: '82.2%' }}
        transition={phase === 'activate'
          ? { duration: 1.2, ease: EASE, times: [0, 0.2, 1] }
          : { duration: 0.2 }}
      >
        <span className="absolute inset-x-[3%] top-[28%] h-px bg-[#dce5ea]" />
        <span className="absolute left-[3%] top-[48%] h-[5%] w-[30%] rounded-full bg-[#d7e1e7]" />
        <span className="absolute left-[3%] top-[63%] h-[4%] w-[46%] rounded-full bg-[#e4eaee]" />
      </motion.div>
    </motion.div>
  );
});

const DotMatrixLoader = memo(function DotMatrixLoader({ active }) {
  return (
    <div className="grid w-fit grid-cols-7 gap-1" aria-hidden="true">
      {Array.from({ length: 49 }, (_, index) => (
        <motion.span
          animate={active ? { opacity: [0.16, 1, 0.28], scale: [0.82, 1, 0.86] } : { opacity: 0.3, scale: 1 }}
          className="size-1.5 rounded-[2px] bg-[#18e9b5]"
          key={index}
          transition={active ? {
            delay: ((index % 7) + Math.floor(index / 7)) * 0.055,
            duration: 1.15,
            ease: 'easeInOut',
            repeat: Infinity,
          } : { duration: 0.2 }}
        />
      ))}
    </div>
  );
});

const LiveSecuraBanner = memo(function LiveSecuraBanner({ active, motionEnabled, phase }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const lifted = ['activate', 'expand', 'analyze', 'reveal', 'hold'].includes(phase);
  const activating = phase === 'activate';
  const visible = lifted || focused || !motionEnabled;
  const interactive = active || hovered;
  const origin = {
    opacity: focused ? 1 : 0,
    rotateX: 1.5,
    rotateY: -3,
    rotateZ: 0.5,
    scaleX: 0.893,
    scaleY: 0.805,
    x: '4.24%',
    y: 27,
    z: 2,
  };
  const foreground = {
    opacity: 1,
    rotateX: -1,
    rotateY: 0,
    rotateZ: 0,
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: -108,
    z: 72,
  };
  const bannerMotion = activating ? {
    opacity: [0, 1, 1],
    rotateX: [1.5, 1.5, -1],
    rotateY: [-3, -3, 0],
    rotateZ: [0.5, 0.5, 0],
    scaleX: [0.893, 0.893, 1],
    scaleY: [0.805, 0.805, 1],
    x: ['4.24%', '4.24%', 0],
    y: [27, 27, -108],
    z: [2, 2, 72],
  } : lifted ? foreground : origin;

  return (
    <motion.a
      animate={motionEnabled ? bannerMotion : foreground}
      aria-label="Request a Secura AI demo"
      className="group absolute z-30 min-h-[72px] overflow-hidden rounded-[12px] border border-[#02bfa6]/25 bg-black shadow-[0_22px_42px_-14px_rgba(0,0,0,.95)] outline-none transition-[border-color,box-shadow] duration-200 hover:border-transparent hover:shadow-[0_28px_52px_-12px_rgba(2,191,166,.45),0_0_15px_rgba(101,255,219,.15)] focus-visible:ring-2 focus-visible:ring-[#65ffdb] focus-visible:ring-offset-3 focus-visible:ring-offset-[#080b0f] [backface-visibility:hidden] [transform-origin:center_bottom] [transform-style:preserve-3d]"
      data-banner-visible={visible}
      data-secura-banner=""
      href="/demo"
      initial={false}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ inset: '21.6% 4% auto' }}
      transition={activating
        ? { duration: 1.2, ease: EASE, times: [0, 0.2, 1] }
        : { duration: 0.62, ease: EASE }}
    >
      {interactive && motionEnabled ? (
        <motion.span
          animate={{ rotate: 360 }}
          className="pointer-events-none absolute -inset-[110%] z-1 bg-[conic-gradient(from_0deg,transparent_40%,#65ffdb_50%,#0d9488_60%,transparent_100%)]"
          initial={{ rotate: 0 }}
          transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
        />
      ) : null}
      <span className="pointer-events-none absolute inset-px z-2 rounded-[11px] bg-black" />
      <span className="pointer-events-none absolute inset-px z-3 overflow-hidden rounded-[11px] opacity-95">
        <SecuraAnimatedGradient motionEnabled={motionEnabled && interactive} />
      </span>
      <span className="pointer-events-none absolute inset-px z-4 rounded-[11px] opacity-60 [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_80%_50%,black_40%,transparent_95%)]" />

      {interactive && motionEnabled ? (
        <span className="pointer-events-none absolute right-10 top-1/2 z-4 size-45 translate-x-1/2 -translate-y-1/2">
          {[0, 1.4, 2.8].map((delay) => (
            <motion.span
              animate={{ opacity: [0.8, 0], transform: ['translate(-50%, -50%) scale(.08)', 'translate(-50%, -50%) scale(1)'] }}
              className="absolute left-1/2 top-1/2 size-45 rounded-full border border-[#65ffdb]"
              key={delay}
              transition={{ delay, duration: 2.2, ease: [0.23, 1, 0.32, 1], repeat: Infinity }}
            />
          ))}
        </span>
      ) : null}

      <div className="relative z-5 flex min-h-[72px] items-center justify-between gap-5 px-4 py-2.5 max-[440px]:gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex min-h-3 items-center gap-2 font-mono text-[.45rem] font-bold uppercase leading-none tracking-[.12em]">
            <span className="text-[#65ffdb]">SECURA AI</span>
            <span className="size-1 shrink-0 self-center rounded-full bg-[#02bfa6] shadow-[0_0_8px_#02bfa6]" />
            <span className="truncate text-[#a7f3d0]">ACTIVE ENGINE</span>
          </div>
          <p className="min-h-4 truncate text-[.88rem] font-bold leading-4 tracking-[-.01em] text-white">I’m Secura, Your AI Consultant.</p>
          <p className="min-h-4 truncate text-[.66rem] font-medium leading-4 tracking-[-.005em] text-[#a7f3d0] max-[560px]:hidden">Click to uncover gaps and strengthen your audit readiness.</p>
        </div>

        <div className="flex shrink-0 items-center gap-3 max-[440px]:gap-2">
          <div className="flex flex-col items-end gap-px max-[440px]:hidden">
            <span className="font-mono text-[.72rem] font-extrabold text-[#65ffdb] [text-shadow:0_0_8px_rgba(2,191,166,.25)]">982.36</span>
            <span className="text-[.5rem] font-semibold uppercase tracking-[.06em] text-[#a7f3d0]">credits</span>
          </div>
          <div className="h-5 w-px bg-white/8 max-[440px]:hidden" />
          <div className="relative grid size-10 place-items-center">
            {activating && motionEnabled ? (
              <motion.span
                animate={{ opacity: [0.72, 0], scale: [0.58, 1.55] }}
                className="absolute -inset-1.5 rounded-full border border-[#65ffdb]"
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1, ease: EASE }}
              />
            ) : null}
            <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 44 44">
              <motion.circle animate={interactive && motionEnabled ? { rotate: 360 } : undefined} cx="22" cy="22" fill="none" opacity={interactive ? 0.8 : 0.3} r="20" stroke="#02bfa6" strokeDasharray="3 6" strokeWidth="1" style={{ transformOrigin: '22px 22px' }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }} />
              <motion.circle animate={interactive && motionEnabled ? { rotate: -360 } : undefined} cx="22" cy="22" fill="none" opacity={interactive ? 0.9 : 0.4} r="16" stroke="#65ffdb" strokeDasharray="30 50" strokeWidth="1.2" style={{ transformOrigin: '22px 22px' }} transition={{ duration: 9, ease: 'linear', repeat: Infinity }} />
            </svg>
            <span className={`relative z-1 grid size-[26px] place-items-center rounded-full border border-[#02bfa6]/50 transition-[background-color,box-shadow,transform] duration-200 group-hover:rotate-45 group-hover:scale-[1.06] group-hover:bg-[#65ffdb] group-hover:text-black group-hover:shadow-[0_0_12px_rgba(2,191,166,.38)] group-focus-visible:rotate-45 group-focus-visible:bg-[#65ffdb] group-focus-visible:text-black ${interactive ? 'bg-[#65ffdb] text-black shadow-[0_0_12px_rgba(2,191,166,.38)]' : 'bg-white/4 text-white'}`}>
              <motion.span animate={activating && motionEnabled ? { scale: [1, 0.92, 1.04, 1] } : { scale: 1 }} transition={{ duration: 0.72, ease: EASE }}>
                <ArrowRight className="size-3" weight="bold" />
              </motion.span>
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
});

const ControlContext = memo(function ControlContext() {
  return (
    <aside className="flex h-full flex-col overflow-hidden border-r border-[#18e9b5]/12 bg-[#080b0f]/88 p-3 max-[560px]:hidden">
      <p className="font-mono text-[.4rem] uppercase tracking-[.14em] text-[#a9bdc8]">Control info</p>
      <div className="mt-2 min-h-24 rounded-[7px] border border-[#18e9b5]/14 bg-[#111820] p-2.5">
        <p className="mb-0 text-[.38rem] leading-[.72rem] text-[#c4d3dc]">If a covered provider licenses its GenAI system to a third party, the provider must require by contract that the licensee maintain the system’s disclosure capability.</p>
      </div>

      <p className="mt-2.5 mb-0 font-mono text-[.4rem] uppercase tracking-[.12em] text-[#a9bdc8]">Analysis stats</p>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <div className="rounded-[6px] border border-[#18e9b5]/12 bg-[#111820] p-2">
          <p className="mb-0 font-mono text-[.62rem] font-bold text-[#f3c94c]">66%</p>
          <p className="mt-0.5 mb-0 font-mono text-[.33rem] uppercase tracking-[.08em] text-[#b7c9d3]">Progress</p>
        </div>
        <div className="rounded-[6px] border border-[#18e9b5]/12 bg-[#111820] p-2">
          <p className="mb-0 font-mono text-[.43rem] leading-3 text-[#48d9ff]">California AI Act</p>
          <p className="mt-0.5 mb-0 font-mono text-[.33rem] uppercase tracking-[.08em] text-[#b7c9d3]">Framework</p>
        </div>
      </div>

      <p className="mt-2.5 mb-0 font-mono text-[.4rem] uppercase tracking-[.12em] text-[#a9bdc8]">Verdict</p>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-1.5 rounded-[7px] border border-[#ff4e6a]/28 bg-[#ff4e6a]/10 p-2"
        initial={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <p className="flex items-center gap-1.5 font-mono text-[.39rem] uppercase tracking-[.04em] text-[#ff6f86]"><WarningCircle className="size-3" weight="fill" /> Review required</p>
        <p className="mt-1 mb-0 text-[.34rem] leading-3 text-[#d88493]">Validate AI findings with your compliance team before acting.</p>
      </motion.div>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
        <p className="mb-1.5 font-mono text-[.4rem] uppercase tracking-[.12em] text-[#a9bdc8]">Sections</p>
        <div className="grid min-h-0 flex-1 grid-rows-3 gap-1">
          {missingSections.map((section) => (
            <div className="flex items-center justify-between gap-1 rounded-[5px] border border-[#ff4e6a]/14 bg-[#111820] px-2 py-1.5 text-[.34rem] text-[#c6d5dd]" key={section}>
              <span className="truncate">{section}</span>
              <span className="font-mono uppercase text-[#ff6f86]">Missing</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
});

const AnalysisProgress = memo(function AnalysisProgress({ active }) {
  return (
    <div className="relative mt-2 h-5 overflow-hidden font-mono text-[.66rem] font-semibold text-[#65ffdb]">
      {analysisStages.map(([, progress], index) => (
        <motion.span
          animate={active ? { opacity: index === analysisStages.length - 1 ? [0, 1, 1] : [0, 1, 1, 0], y: [4, 0, 0, -4] } : { opacity: index === 0 ? 1 : 0, y: 0 }}
          className="absolute inset-0"
          initial={false}
          key={progress}
          transition={{ delay: index * 0.5, duration: index === analysisStages.length - 1 ? 0.45 : 0.52, ease: EASE }}
        >
          {progress}
        </motion.span>
      ))}
    </div>
  );
});

const AnalysisStatus = memo(function AnalysisStatus({ active }) {
  return (
    <div className="relative mt-1.5 h-4 min-w-48 overflow-hidden text-center font-mono text-[.42rem] uppercase tracking-[.08em] text-[#78909f]">
      {analysisStages.map(([label], index) => (
        <motion.span
          animate={active ? { opacity: index === analysisStages.length - 1 ? [0, 1, 1] : [0, 1, 1, 0], y: [3, 0, 0, -3] } : { opacity: index === 0 ? 1 : 0, y: 0 }}
          className="absolute inset-0"
          initial={false}
          key={label}
          transition={{ delay: index * 0.5, duration: index === analysisStages.length - 1 ? 0.45 : 0.52, ease: EASE }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
});

const SecuraAnalysisPanel = memo(function SecuraAnalysisPanel({ active }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative flex h-full items-center justify-center text-center"
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div>
        <div className="mx-auto w-fit rounded-[16px] border border-[#18e9b5]/18 bg-[#0d1117]/92 p-5 shadow-[0_22px_55px_rgba(0,0,0,.38)]">
          <DotMatrixLoader active={active} />
        </div>
        <p className="mt-3 mb-0 font-mono text-[.52rem] uppercase tracking-[.12em] text-[#18e9b5]">Analyzing</p>
        <AnalysisProgress active={active} />
        <AnalysisStatus active={active} />

        {active ? (
          <motion.div
            animate={{ opacity: [0, 0.55, 0], x: ['-20%', '115%'] }}
            className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-[linear-gradient(90deg,transparent,rgba(101,255,219,.2),transparent)]"
            initial={{ opacity: 0, x: '-20%' }}
            transition={{ delay: 2.25, duration: 0.65, ease: EASE }}
          />
        ) : null}

      </div>
    </motion.div>
  );
});

const SecuraResultsPanel = memo(function SecuraResultsPanel({ motionEnabled }) {
  const reveal = motionEnabled ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : undefined;
  const initial = motionEnabled ? { opacity: 0, y: 8, clipPath: 'inset(0 0 14% 0)' } : false;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="grid h-full grid-cols-[10rem_1fr] max-[560px]:grid-cols-1"
      data-secura-result=""
      initial={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ControlContext />

      <div className="flex h-full min-w-0 flex-col overflow-hidden p-3.5">
        <motion.section
          animate={reveal}
          className="rounded-[8px] border border-[#18e9b5]/16 bg-[#111820]/86 p-3"
          initial={initial}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex items-center gap-2">
            <span className="rounded-[4px] border border-[#18e9b5]/25 bg-[#18e9b5]/8 px-1.5 py-1 font-mono text-[.42rem] text-[#18e9b5]">01</span>
            <h3 className="text-[.62rem] tracking-[-.01em] text-[#edf8ff]">Executive Summary</h3>
          </div>
          <p className="mt-2 mb-0 text-[.42rem] leading-3.5 text-[#afc3cf]">The control submission is non-compliant. It defines provenance data but does not establish how it is created, protected, retained, verified, or monitored.</p>
        </motion.section>

        <motion.section
          animate={reveal}
          className="mt-2 flex min-h-0 flex-1 flex-col rounded-[8px] border border-[#18e9b5]/16 bg-[#111820]/86 p-3"
          initial={initial}
          transition={{ delay: 0.14, duration: 0.55, ease: EASE }}
        >
          <div className="flex items-center gap-2">
            <span className="rounded-[4px] border border-[#18e9b5]/25 bg-[#18e9b5]/8 px-1.5 py-1 font-mono text-[.42rem] text-[#18e9b5]">02</span>
            <h3 className="text-[.62rem] tracking-[-.01em] text-[#edf8ff]">Document-by-Document Analysis</h3>
          </div>
          <p className="mt-2 mb-0 flex items-center gap-1.5 text-[.45rem] font-medium text-[#c9d8e4]"><FileText className="size-3 text-[#18e9b5]" weight="duotone" /> Implementation Description</p>
          <p className="mt-1 mb-0 text-[.37rem] leading-3 text-[#819aa9]">Status: <span className="text-[#ff6f86]">Missing</span>. The field does not identify:</p>
          <ul className="mt-1 mb-0 grid gap-0.5 pl-3 text-[.34rem] leading-3 text-[#9fb3bf] marker:text-[#18e9b5]">
            <li>Whether the organization is a covered provider</li>
            <li>Which GenAI systems and licensees are in scope</li>
            <li>How disclosure capability is preserved after licensing</li>
          </ul>

          <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2">
            <div className="rounded-[6px] border border-white/6 bg-black/15 p-2">
              <p className="mb-0 text-[.39rem] font-medium text-[#c9d8e4]">Policies &amp; Procedures</p>
              <p className="mt-1 mb-0 text-[.34rem] leading-3 text-[#819aa9]">Status: <span className="text-[#ff6f86]">Missing</span></p>
              <p className="mt-1 mb-0 text-[.33rem] leading-3 text-[#9fb3bf]">No licensing policy, approval workflow, or monitoring procedure was supplied.</p>
              <ul className="mt-1.5 mb-0 grid gap-0.5 pl-3 text-[.31rem] leading-3 text-[#8299a6] marker:text-[#18e9b5]">
                <li>Review and approve contract clauses</li>
                <li>Verify disclosure capability before and after licensing</li>
                <li>Monitor licensee compliance and exceptions</li>
              </ul>
            </div>
            <div className="rounded-[6px] border border-white/6 bg-black/15 p-2">
              <p className="mb-0 text-[.39rem] font-medium text-[#c9d8e4]">Evidence</p>
              <p className="mt-1 mb-0 text-[.34rem] leading-3 text-[#819aa9]">Status: <span className="text-[#ff6f86]">Missing</span></p>
              <p className="mt-1 mb-0 text-[.33rem] leading-3 text-[#9fb3bf]">No contract clause, capability test, or licensee review record was attached.</p>
              <ul className="mt-1.5 mb-0 grid gap-0.5 pl-3 text-[.31rem] leading-3 text-[#8299a6] marker:text-[#18e9b5]">
                <li>Executed license agreement</li>
                <li>Disclosure-capability test result</li>
                <li>Monitoring and remediation record</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.div
          animate={reveal}
          className="mt-2 rounded-[8px] border border-[#18e9b5]/40 bg-[#18e9b5]/8 p-3 [transform:translateZ(22px)]"
          initial={initial}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center gap-1.5 font-mono text-[.42rem] uppercase tracking-[.08em] text-[#18e9b5]"><CheckCircle className="size-3" weight="fill" /> Recommended Review Action</p>
          <p className="mt-1.5 mb-0 text-[.42rem] leading-3.5 text-[#d0e0e7]">Define how provenance data is created, protected, retained, verified, and monitored, then attach the supporting policy and evidence.</p>
          <p className="mt-1 mb-0 text-[.39rem] text-[#78909f]">Human validation required before action.</p>
        </motion.div>
      </div>
    </motion.div>
  );
});

const ResultSignals = memo(function ResultSignals({ motionEnabled, phase }) {
  const progress = useMotionValue(0);
  const roundedProgress = useTransform(progress, (value) => Math.round(value));

  useEffect(() => {
    if (!motionEnabled) {
      progress.set(66);
      return undefined;
    }

    const counter = animate(progress, 66, { delay: 0.12, duration: 2.65, ease: EASE });
    return () => counter.stop();
  }, [motionEnabled, progress]);

  const cardMotion = motionEnabled
    ? { opacity: 1, scale: 1, x: 0, y: 0 }
    : undefined;
  const cardInitial = motionEnabled
    ? { opacity: 0, scale: 0.92, x: 18, y: 8 }
    : false;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 [transform-style:preserve-3d] max-[560px]:hidden" style={{ transform: 'translateZ(100px)' }}>
      <motion.div
        animate={cardMotion}
        className="absolute right-[-5%] top-[38%] w-[9.2rem] rounded-[12px] border border-[#65ffdb]/75 bg-[#071314]/96 p-3 shadow-[0_18px_38px_rgba(0,0,0,.62),0_0_18px_rgba(24,233,181,.15)]"
        initial={cardInitial}
        style={{ rotate: '2deg' }}
        transition={{ duration: 0.72, ease: EASE }}
      >
        <p className="mb-0 font-mono text-[1.05rem] font-bold leading-none text-[#f5c542]"><motion.span>{roundedProgress}</motion.span>%</p>
        <p className="mt-1.5 mb-0 font-mono text-[.47rem] uppercase tracking-[.13em] text-[#d7e3e7]">Analysis progress</p>
        <div className="mt-2 flex items-end gap-[3px]">
          {Array.from({ length: 10 }, (_, index) => (
            <motion.span
              animate={{ opacity: index < 7 ? 1 : 0.22, scaleY: 1 }}
              className={`h-4 w-1.5 origin-bottom rounded-full ${index < 7 ? 'bg-[#18e9b5] shadow-[0_0_6px_rgba(24,233,181,.35)]' : 'bg-[#45605f]'}`}
              initial={motionEnabled && index < 7 ? { opacity: 0.12, scaleY: 0.15 } : false}
              key={index}
              transition={{ delay: 0.15 + index * 0.34, duration: 0.42, ease: EASE }}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === 'hold' ? (
          <motion.div
            animate={cardMotion}
            className="absolute right-[-8%] top-[57%] flex min-h-12 w-[10.6rem] items-center gap-2.5 rounded-[11px] border border-[#65ffdb]/70 bg-[#071314]/96 px-3 py-2.5 shadow-[0_18px_38px_rgba(0,0,0,.58)]"
            initial={cardInitial}
            key="review-required"
            style={{ rotate: '-1deg' }}
            transition={{ delay: 0.14, duration: 0.68, ease: EASE }}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#ff4e6a] text-[#071314]"><WarningCircle className="size-4" weight="fill" /></span>
            <span className="font-mono text-[.56rem] font-semibold uppercase tracking-[.08em] text-[#ff6680]">Review required</span>
          </motion.div>
        ) : null}

        {phase === 'hold' ? (
          <motion.div
            animate={cardMotion}
            className="absolute right-[-3%] top-[71%] flex min-h-12 w-[11.2rem] items-center gap-2.5 rounded-[11px] border border-[#65ffdb]/70 bg-[#071314]/96 px-3 py-2.5 shadow-[0_18px_38px_rgba(0,0,0,.58)]"
            initial={cardInitial}
            key="sections-missing"
            style={{ rotate: '1.5deg' }}
            transition={{ delay: 0.34, duration: 0.68, ease: EASE }}
          >
            <FileText className="size-5 shrink-0 text-[#ff4e6a]" weight="duotone" />
            <span className="font-mono text-[.56rem] font-semibold uppercase tracking-[.08em] text-[#ff6680]">3 sections missing</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

export default function SecuraHeroVisual({ motionEnabled }) {
  const visualRef = useRef(null);
  const visible = useHeroVisibility(visualRef);
  const canPlay = motionEnabled && visible;
  const { phase } = usePhaseTimeline({ canPlay, motionEnabled });
  const panelVisible = ['expand', 'analyze', 'reveal', 'hold'].includes(phase) || !motionEnabled;
  const showResults = ['reveal', 'hold'].includes(phase) || !motionEnabled;
  const analysisActive = phase === 'analyze' && canPlay;
  const bannerActive = motionEnabled && canPlay && phase !== 'idle';

  return (
    <article
      aria-label="Illustrative Secura control review"
      className="relative aspect-[4/3] w-full [perspective:1400px] [perspective-origin:55%_42%] [transform-style:preserve-3d]"
      data-paused={!canPlay}
      data-phase={phase}
      ref={visualRef}
    >
      <ProductScreenshot motionEnabled={motionEnabled} phase={phase} />

      <LiveSecuraBanner active={bannerActive} motionEnabled={motionEnabled} phase={phase} />

      <motion.div
        animate={motionEnabled ? {
          clipPath: panelVisible ? 'inset(0 0 0% 0 round 16px)' : 'inset(0 0 100% 0 round 16px)',
          opacity: panelVisible ? 1 : 0,
          rotateX: 1.5,
          rotateY: -3,
          rotateZ: 0.5,
          scale: 0.97,
          scaleY: panelVisible ? 1 : 0.94,
          transformPerspective: 1400,
          y: panelVisible ? 0 : 22,
          z: 0,
        } : {
          clipPath: 'inset(0 0 0% 0 round 16px)',
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scaleY: 1,
          scale: 1,
          y: 0,
          z: 0,
        }}
        aria-hidden="true"
        className="absolute z-20 overflow-hidden rounded-[18px] border border-[#18e9b5]/25 bg-[#080b0f] shadow-[0_34px_85px_rgba(0,0,0,.58)] [backface-visibility:hidden] [transform-origin:center] [transform-style:preserve-3d] max-[560px]:[transform:none!important]"
        data-secura-workspace=""
        initial={false}
        style={{ aspectRatio: '4 / 3', left: 0, top: 0, width: '100%' }}
        transition={{ duration: 0.72, ease: EASE }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(24,233,181,.1),transparent_34%),linear-gradient(rgba(0,255,140,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,.025)_1px,transparent_1px)] bg-[size:auto,34px_34px,34px_34px]" />
        <header className="relative z-10 flex h-8 items-center gap-2 border-b border-[#18e9b5]/14 bg-[#080b0f]/92 px-3.5 font-mono text-[.42rem] uppercase tracking-[.08em] text-[#718896]">
          <span className="text-[#18e9b5]">22757.3.1(c)(1)</span>
          <span>/</span>
          <span className="text-[#c9d8e4]">AI Analysis</span>
          <span className="ml-auto flex items-center gap-1.5 text-[#18e9b5]"><span className="size-1 rounded-full bg-[#18e9b5] shadow-[0_0_6px_#18e9b5]" /> Secura live</span>
        </header>

        <div className="relative h-[calc(100%-2rem)]">
          <AnimatePresence initial={false} mode="sync">
            {showResults ? (
              <SecuraResultsPanel key="results" motionEnabled={motionEnabled} />
            ) : (
              <SecuraAnalysisPanel active={analysisActive} key="analysis" />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {['analyze', 'reveal', 'hold'].includes(phase) || !motionEnabled ? (
          <ResultSignals key="result-signals" motionEnabled={motionEnabled} phase={phase} />
        ) : null}
      </AnimatePresence>

      <p className="sr-only">Secura activates inside the Control Details screen, reviews the control, implementation, policies, procedures, and evidence, identifies three missing sections, explains the gap, and recommends the next human review action.</p>
    </article>
  );
}
