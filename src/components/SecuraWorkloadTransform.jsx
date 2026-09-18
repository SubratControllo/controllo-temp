import {
  ArrowBendUpRight,
  CheckCircle,
  FileText,
  FolderOpen,
  LinkSimple,
  ListChecks,
  NotePencil,
  ShieldCheck,
  Sparkle,
  Stack,
} from '@phosphor-icons/react';
import { motion, useInView } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SecuraMark from './SecuraMark';

const EASE = [0.16, 1, 0.3, 1];
const PHASE_DURATIONS = [1500, 1500, 1500, 2000, 1000, 1000, 350];
const COMPLETE_PHASE = 5;
const RESET_PHASE = 6;

const manualIcons = [FileText, NotePencil, Stack, FolderOpen, ArrowBendUpRight];
const outputIcons = [ListChecks, LinkSimple, Sparkle];
const proofIcons = [ShieldCheck, LinkSimple, FileText, ArrowBendUpRight];
const manualOffsets = ['ml-0 w-full', 'ml-[5%] w-[95%]', 'ml-[1%] w-[99%]', 'ml-[7%] w-[93%]', 'ml-[3%] w-[97%]'];
const manualRotations = [-0.45, 0.35, -0.25, 0.5, -0.35];

function curveBetween(startX, startY, endX, endY) {
  const controlOffset = Math.max(18, (endX - startX) * 0.46);
  return `M ${startX} ${startY} C ${startX + controlOffset} ${startY} ${endX - controlOffset} ${endY} ${endX} ${endY}`;
}

function useSignalGeometry(containerRef) {
  const [geometry, setGeometry] = useState(null);
  const signatureRef = useRef('');

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let frame;
    const requestFrame = window.requestAnimationFrame
      ? (callback) => window.requestAnimationFrame(callback)
      : (callback) => window.setTimeout(callback, 0);
    const cancelFrame = window.cancelAnimationFrame
      ? (id) => window.cancelAnimationFrame(id)
      : (id) => window.clearTimeout(id);
    const measure = () => {
      cancelFrame(frame);
      frame = requestFrame(() => {
        const bounds = container.getBoundingClientRect();
        const coreLeft = container.querySelector('[data-core-left]')?.getBoundingClientRect();
        const coreRight = container.querySelector('[data-core-right]')?.getBoundingClientRect();
        if (!bounds.width || !bounds.height || !coreLeft || !coreRight) return;

        const point = (rect) => ({ x: rect.left - bounds.left, y: rect.top - bounds.top });
        const inputStart = [...container.querySelectorAll('[data-manual-anchor]')].map((anchor) => point(anchor.getBoundingClientRect()));
        const outputEnd = [...container.querySelectorAll('[data-output-anchor]')].map((anchor) => point(anchor.getBoundingClientRect()));
        const inputEnd = point(coreLeft);
        const outputStart = point(coreRight);
        const signature = JSON.stringify([bounds.width, bounds.height, inputStart, inputEnd, outputStart, outputEnd]);
        if (signature === signatureRef.current) return;

        signatureRef.current = signature;
        setGeometry({
          width: bounds.width,
          height: bounds.height,
          inputs: inputStart.map((start) => ({ ...start, end: inputEnd, path: curveBetween(start.x, start.y, inputEnd.x, inputEnd.y) })),
          outputs: outputEnd.map((end) => ({ ...outputStart, end, path: curveBetween(outputStart.x, outputStart.y, end.x, end.y) })),
        });
      });
    };

    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(container);
    window.addEventListener('resize', measure);

    return () => {
      cancelFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [containerRef]);

  return geometry;
}

function DotMatrix({ active }) {
  return (
    <span className="grid grid-cols-5 gap-1 rounded-xl bg-white/[.055] p-2" aria-hidden="true">
      {Array.from({ length: 20 }, (_, index) => (
        <motion.span
          className="size-1 rounded-full bg-mint"
          animate={active ? { opacity: [0.2, 1, 0.3] } : { opacity: index < 8 ? 0.75 : 0.25 }}
          transition={{ duration: 0.72, delay: (index % 6) * 0.055, repeat: active ? Infinity : 0, ease: 'linear' }}
          key={index}
        />
      ))}
    </span>
  );
}

function SignalPaths({ geometry, phase, motionEnabled }) {
  const connecting = phase >= 1 && phase < RESET_PHASE;
  const outputReady = phase >= 3 && phase < RESET_PHASE;
  const inputOpacity = phase === 1 ? 0.78 : phase === 2 ? 0.5 : phase >= 3 && phase < RESET_PHASE ? 0.3 : 0;
  const outputOpacity = phase === 3 ? 0.68 : phase >= 4 && phase < RESET_PHASE ? 0.42 : 0;

  if (!geometry) return null;

  return (
    <svg className="pointer-events-none absolute inset-0 hidden size-full min-[901px]:block" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
      {geometry.inputs.map(({ path }, index) => (
        <motion.path
          data-input-path={index}
          d={path}
          fill="none"
          className="stroke-mint"
          strokeWidth="1.7"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: connecting ? 1 : 0, opacity: inputOpacity }}
          transition={{ duration: motionEnabled ? 0.48 : 0, delay: motionEnabled ? index * 0.08 : 0, ease: EASE }}
          key={`input-${path}`}
        />
      ))}
      {geometry.outputs.map(({ path }, index) => (
        <motion.path
          data-output-path={index}
          d={path}
          fill="none"
          className="stroke-mint"
          strokeWidth="1.7"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: outputReady ? 1 : 0, opacity: outputOpacity }}
          transition={{ duration: motionEnabled ? 0.46 : 0, delay: motionEnabled ? index * 0.11 : 0, ease: EASE }}
          key={`output-${path}`}
        />
      ))}
      {geometry.inputs.map(({ x, y, end }, index) => {
        return (
          <motion.circle
            r="3"
            className="fill-mint"
            initial={false}
            animate={phase === 1 && motionEnabled
              ? { cx: [x, end.x], cy: [y, end.y], opacity: [0, 1, 0] }
              : { cx: end.x, cy: end.y, opacity: 0 }}
            transition={{ duration: 0.62, delay: index * 0.1, ease: EASE }}
            key={`pulse-${index}`}
          />
        );
      })}
    </svg>
  );
}

function ManualTasks({ items, phase, motionEnabled }) {
  const connected = phase >= 1 && phase < RESET_PHASE;
  const hidden = phase === RESET_PHASE;

  return (
    <div className="relative z-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="m-0 font-mono text-[.64rem] tracking-[.1em] text-teal uppercase">Without Secura</h3>
        <span className="font-mono text-[.5rem] text-muted uppercase">5 manual review steps</span>
      </div>
      <ol className="m-0 grid list-none gap-2.5 p-0">
        {items.map((item, index) => {
          const Icon = manualIcons[index];
          const rotation = manualRotations[index];
          return (
            <motion.li
              className={`${manualOffsets[index]} relative flex min-h-12 items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 shadow-[0_8px_20px_rgba(6,27,50,.045)]`}
              initial={false}
              animate={{
                opacity: hidden ? 0 : connected ? 0.58 : 1,
                transform: hidden
                  ? `translateY(5px) rotate(${rotation}deg)`
                  : `translateY(0) rotate(${rotation}deg)`,
              }}
              transition={{ duration: motionEnabled ? 0.3 : 0, delay: phase === 0 && motionEnabled ? index * 0.09 : 0, ease: EASE }}
              key={item}
            >
              <span data-manual-anchor className="pointer-events-none absolute top-1/2 right-0 size-0" aria-hidden="true" />
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-mist text-teal">
                <Icon aria-hidden="true" className="size-4" weight="duotone" />
              </span>
              <span className="text-[.68rem] leading-4 text-navy">{item}</span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function SecuraCore({ phase, motionEnabled }) {
  const analyzing = phase === 2;
  const status = phase < 1
    ? 'Waiting for connected context'
    : phase === 1
      ? 'Assembling control context'
      : phase === 2
        ? 'Analyzing linked records'
        : 'First review structured';

  return (
    <div className="relative z-10 flex min-h-82 items-center justify-center max-[900px]:min-h-0">
      <motion.article
        data-secura-core
        className="relative w-full max-w-60 overflow-hidden rounded-[22px] border border-mint/35 bg-navy p-5 text-white shadow-[0_22px_55px_rgba(6,27,50,.2)]"
        initial={false}
        animate={{
          opacity: phase === RESET_PHASE ? 0.28 : 1,
          transform: phase === RESET_PHASE ? 'scale(.98)' : 'scale(1)',
          boxShadow: analyzing ? '0 24px 60px rgba(6,27,50,.25), 0 0 28px rgba(38,216,173,.11)' : '0 22px 55px rgba(6,27,50,.2)',
        }}
        transition={{ duration: motionEnabled ? 0.35 : 0, ease: EASE }}
      >
        <span data-core-left className="pointer-events-none absolute top-1/2 left-0 size-0" aria-hidden="true" />
        <span data-core-right className="pointer-events-none absolute top-1/2 right-0 size-0" aria-hidden="true" />
        <motion.span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-mint"
          initial={false}
          animate={analyzing && motionEnabled
            ? { opacity: [0, 0.75, 0], transform: ['translateY(0)', 'translateY(150px)', 'translateY(150px)'] }
            : { opacity: 0, transform: 'translateY(0)' }}
          transition={{ duration: 1.25, ease: EASE }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-3">
          <SecuraMark className="size-8 shrink-0" />
          <span>
            <span className="block font-mono text-[.62rem] tracking-[.1em] text-mint">SECURA AI</span>
            <span className="mt-1 block font-mono text-[.48rem] tracking-[.07em] text-white/52 uppercase">Structured first review</span>
          </span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <DotMatrix active={analyzing && motionEnabled} />
          <motion.p
            className="m-0 text-[.68rem] leading-5 text-[#c7d7df]"
            initial={false}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: motionEnabled ? 0.28 : 0, ease: EASE }}
            key={status}
          >
            {status}
          </motion.p>
        </div>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/8">
          <motion.span
            className="block h-full origin-left rounded-full bg-mint"
            initial={false}
            animate={{ transform: `scaleX(${phase < 1 ? 0.08 : phase === 1 ? 0.42 : phase === 2 ? 0.72 : 1})` }}
            transition={{ duration: motionEnabled ? 0.5 : 0, ease: EASE }}
          />
        </div>
      </motion.article>
    </div>
  );
}

function StructuredOutput({ items, phase, motionEnabled }) {
  const revealed = phase >= 3 && phase < RESET_PHASE;
  const validated = phase >= 4 && phase < RESET_PHASE;

  return (
    <div className="relative z-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="m-0 font-mono text-[.64rem] tracking-[.1em] text-teal uppercase">With Secura</h3>
        <span className="font-mono text-[.5rem] text-muted uppercase">Structured output</span>
      </div>
      <ol className="m-0 grid list-none gap-3 p-0">
        {items.map(([title, description], index) => {
          const Icon = outputIcons[index];
          return (
            <li className="relative" key={title}>
              <span data-output-anchor className="pointer-events-none absolute top-1/2 left-0 size-0" aria-hidden="true" />
              <motion.div
                className="rounded-xl border border-line bg-white p-4 shadow-[0_10px_24px_rgba(6,27,50,.055)]"
                initial={false}
                animate={revealed
                  ? { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0% 0)' }
                  : { opacity: 0.18, transform: 'translateY(8px)', clipPath: 'inset(0 0 14% 0)' }}
                transition={{ duration: motionEnabled ? 0.38 : 0, delay: revealed && motionEnabled ? index * 0.12 : 0, ease: EASE }}
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-mint-soft/45 text-teal">
                    <Icon aria-hidden="true" className="size-[1.05rem]" weight="duotone" />
                  </span>
                  <span>
                    <strong className="block text-[.76rem] font-medium text-navy">{title}</strong>
                    <span className="mt-1 block text-[.62rem] leading-4 text-muted">{description}</span>
                  </span>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
      <motion.div
        className="mt-3 flex items-center gap-2.5 rounded-xl border border-mint/35 bg-mint-soft/35 px-4 py-3 font-mono text-[.56rem] tracking-[.04em] text-teal uppercase"
        initial={false}
        animate={validated ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0, transform: 'translateY(7px)' }}
        transition={{ duration: motionEnabled ? 0.34 : 0, ease: EASE }}
      >
        <CheckCircle aria-hidden="true" className="size-4" weight="fill" />
        Ready for team validation
      </motion.div>
    </div>
  );
}

function MobileSignal({ active }) {
  return (
    <div className="relative mx-auto h-10 w-px bg-line min-[901px]:hidden" aria-hidden="true">
      <motion.span
        className="block h-full w-full origin-top bg-mint"
        initial={false}
        animate={{ transform: active ? 'scaleY(1)' : 'scaleY(0)' }}
        transition={{ duration: 0.42, ease: EASE }}
      />
    </div>
  );
}

function ProofStrip({ items, visible, motionEnabled }) {
  return (
    <motion.dl
      className="mt-10 grid grid-cols-4 overflow-hidden rounded-xl border border-line bg-white max-[760px]:grid-cols-2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0.28, transform: visible ? 'translateY(0)' : 'translateY(5px)' }}
      transition={{ duration: motionEnabled ? 0.34 : 0, ease: EASE }}
      aria-label="Secura review qualities"
    >
      {items.map(([title], index) => {
        const Icon = proofIcons[index];
        return (
          <div className="flex items-center justify-center gap-2 border-r border-line px-3 py-3 last:border-r-0 max-[760px]:[&:nth-child(2)]:border-r-0 max-[760px]:[&:nth-child(n+3)]:border-t" key={title}>
            <Icon aria-hidden="true" className="size-3.5 text-teal" weight="duotone" />
            <dt className="font-mono text-[.52rem] tracking-[.07em] text-navy uppercase">{title}</dt>
          </div>
        );
      })}
    </motion.dl>
  );
}

export default function SecuraWorkloadTransform({ content, motionEnabled }) {
  const sectionRef = useRef(null);
  const compositionRef = useRef(null);
  const remainingRef = useRef(PHASE_DURATIONS[0]);
  const [phase, setPhase] = useState(0);
  const signalGeometry = useSignalGeometry(compositionRef);
  const canObserve = typeof IntersectionObserver !== 'undefined';
  const inView = useInView(sectionRef, { amount: 0.45 });
  const playing = motionEnabled && (!canObserve || inView);
  const displayPhase = motionEnabled ? phase : COMPLETE_PHASE;

  useEffect(() => {
    if (!playing) return undefined;

    const startedAt = performance.now();
    let finished = false;
    const timer = window.setTimeout(() => {
      finished = true;
      setPhase((current) => {
        const next = current === RESET_PHASE ? 0 : current + 1;
        remainingRef.current = PHASE_DURATIONS[next];
        return next;
      });
    }, remainingRef.current);

    return () => {
      window.clearTimeout(timer);
      if (!finished) remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt));
    };
  }, [phase, playing]);

  const proofVisible = displayPhase >= 5 && displayPhase < RESET_PHASE;

  return (
    <figure ref={sectionRef} className="m-0" aria-label="Secura workload transformation" data-phase={displayPhase}>
      <motion.div
        ref={compositionRef}
        className="relative grid grid-cols-[minmax(0,1fr)_minmax(12rem,.7fr)_minmax(0,1fr)] items-center gap-10 max-[1080px]:gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-0"
        initial={false}
        animate={{ opacity: displayPhase === RESET_PHASE ? 0.28 : 1 }}
        transition={{ duration: motionEnabled ? 0.3 : 0, ease: EASE }}
      >
        <SignalPaths geometry={signalGeometry} phase={displayPhase} motionEnabled={motionEnabled} />
        <ManualTasks items={content.manualTasks} phase={displayPhase} motionEnabled={motionEnabled} />
        <MobileSignal active={displayPhase >= 1 && displayPhase < RESET_PHASE} />
        <SecuraCore phase={displayPhase} motionEnabled={motionEnabled} />
        <MobileSignal active={displayPhase >= 3 && displayPhase < RESET_PHASE} />
        <StructuredOutput items={content.structuredOutputs} phase={displayPhase} motionEnabled={motionEnabled} />
      </motion.div>

      <ProofStrip items={content.differentiators} visible={displayPhase >= 3 && displayPhase < RESET_PHASE} motionEnabled={motionEnabled} />

      <motion.figcaption
        className="mt-7 flex items-center justify-center gap-3 font-mono text-[.62rem] leading-5 text-teal"
        initial={false}
        animate={{ opacity: proofVisible ? 1 : 0, transform: proofVisible ? 'translateY(0)' : 'translateY(5px)' }}
        transition={{ duration: motionEnabled ? 0.34 : 0, ease: EASE }}
      >
        {content.highlight}
      </motion.figcaption>
    </figure>
  );
}
