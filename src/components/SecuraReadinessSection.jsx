import {
  CheckCircle,
  FileText,
  ListChecks,
  MagnifyingGlass,
  NotePencil,
  ShieldCheck,
  Sparkle,
  WarningCircle,
  Wrench,
} from '@phosphor-icons/react';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import SecuraMark from './SecuraMark';

const EASE = [0.16, 1, 0.3, 1];
const PHASE_DURATIONS = [700, 450, 700, 450, 750, 500, 600, 900, 650, 2200, 350];
const COMPLETE_PHASE = 9;
const RESET_PHASE = 10;
const stepIcons = [Wrench, NotePencil, Sparkle, ListChecks, ShieldCheck];
const stepRows = [
  'min-[761px]:row-start-1',
  'min-[761px]:row-start-2',
  'min-[761px]:row-start-3',
  'min-[761px]:row-start-4',
  'min-[761px]:row-start-5',
];
const findingIcons = [WarningCircle, FileText, MagnifyingGlass];

function stepVisible(index, phase) {
  if (phase === RESET_PHASE) return false;
  if (phase >= COMPLETE_PHASE) return true;
  return phase >= [0, 2, 4, 9, 9][index];
}

function activeStep(phase) {
  if (phase < 2) return 0;
  if (phase < 4) return 1;
  return 2;
}

function WorkflowStep({ index, label, phase, motionEnabled }) {
  const Icon = stepIcons[index];
  const visible = stepVisible(index, phase);
  const active = index === activeStep(phase) && phase !== RESET_PHASE;
  const completed = visible && index < activeStep(phase);

  return (
    <motion.article
      className={`${stepRows[index]} relative z-10 flex min-h-15 items-center gap-3 rounded-2xl border bg-white px-3.5 py-2.5 shadow-[0_8px_22px_rgba(6,27,50,.055)] min-[761px]:col-start-1 ${active ? 'border-mint/65 shadow-[0_12px_28px_rgba(8,127,140,.14)]' : 'border-line'}`}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        transform: visible ? `translateY(0) scale(${active ? 1.03 : 1})` : 'translateY(8px) scale(.98)',
      }}
      transition={{ duration: motionEnabled ? 0.38 : 0, ease: EASE }}
      aria-current={active ? 'step' : undefined}
    >
      <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[.55rem] ${active ? 'border-navy bg-navy text-mint' : completed ? 'border-teal bg-teal text-white' : 'border-line bg-mist text-teal'}`}>
        {completed ? <CheckCircle aria-hidden="true" className="size-4" weight="fill" /> : `0${index + 1}`}
      </span>
      <span className={`text-[.78rem] font-medium ${active ? 'text-navy' : 'text-muted'}`}>{label}</span>
      <Icon aria-hidden="true" className={`ml-auto size-4.5 ${active ? 'text-teal' : 'text-muted/65'}`} weight="duotone" />
      {index === 2 && (
        <motion.span
          className="pointer-events-none absolute top-1/2 left-full hidden h-px w-5 origin-left bg-mint min-[761px]:block"
          initial={false}
          animate={{ transform: phase >= 5 && phase < RESET_PHASE ? 'scaleX(1)' : 'scaleX(0)', opacity: phase >= 5 && phase < RESET_PHASE ? 1 : 0 }}
          transition={{ duration: motionEnabled ? 0.44 : 0, ease: EASE }}
          aria-hidden="true"
        >
          <motion.span
            className="absolute -top-1 -left-1 size-2 rounded-full bg-mint"
            animate={phase === 5 && motionEnabled ? { transform: ['translateX(0)', 'translateX(20px)'], opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 0.52, ease: EASE }}
          />
        </motion.span>
      )}
    </motion.article>
  );
}

function FindingsPanel({ content, phase, motionEnabled }) {
  const visible = phase >= 6 && phase < RESET_PHASE;
  const rowsVisible = phase >= 7 && phase < RESET_PHASE;
  const priorityVisible = phase >= 8 && phase < RESET_PHASE;

  return (
    <motion.aside
      className="relative z-10 rounded-[22px] border border-line bg-white p-4 shadow-[0_18px_44px_rgba(6,27,50,.1)] min-[761px]:col-start-2 min-[761px]:row-span-5 min-[761px]:row-start-1 min-[761px]:self-center"
      initial={false}
      animate={visible
        ? { opacity: 1, transform: 'translateX(0) scale(1)', clipPath: 'inset(0 0 0% 0)' }
        : { opacity: 0, transform: 'translateX(12px) scale(.98)', clipPath: 'inset(0 0 8% 0)' }}
      transition={{ duration: motionEnabled ? 0.4 : 0, ease: EASE }}
      aria-label="Secura AI analysis findings"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <span className="flex items-center gap-2.5">
          <SecuraMark className="size-8 shrink-0" />
          <span>
            <span className="block font-mono text-[.48rem] tracking-[.08em] text-teal uppercase">Secura AI</span>
            <strong className="block text-[.76rem] font-medium text-navy">Analysis</strong>
          </span>
        </span>
        <span className="rounded-full border border-error/20 bg-error/8 px-2.5 py-1 font-mono text-[.48rem] tracking-[.04em] text-error uppercase">3 findings</span>
      </div>

      <div>
        {content.findings.map(([title, description], index) => {
          const Icon = findingIcons[index];
          return (
            <motion.div
              className="flex gap-3 border-b border-line py-3 last:border-b-0"
              initial={false}
              animate={rowsVisible ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0, transform: 'translateY(6px)' }}
              transition={{ duration: motionEnabled ? 0.32 : 0, delay: rowsVisible && motionEnabled ? index * 0.12 : 0, ease: EASE }}
              key={title}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-error/8 text-error">
                <Icon aria-hidden="true" className="size-3.5" weight="duotone" />
              </span>
              <span>
                <strong className="block text-[.68rem] font-medium text-navy">{title}</strong>
                <span className="mt-0.5 block text-[.57rem] leading-4 text-muted">{description}</span>
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-2.5 flex items-center gap-3 rounded-xl border border-mint/35 bg-mint-soft/40 p-3"
        initial={false}
        animate={priorityVisible ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0, transform: 'translateY(6px)' }}
        transition={{ duration: motionEnabled ? 0.34 : 0, ease: EASE }}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-mint text-navy">
          <ListChecks aria-hidden="true" className="size-4" weight="duotone" />
        </span>
        <span className="text-[.66rem] font-medium leading-4 text-navy">{content.priority}</span>
      </motion.div>
    </motion.aside>
  );
}

export default function SecuraReadinessSection({ content, motionEnabled }) {
  const sectionRef = useRef(null);
  const remainingRef = useRef(PHASE_DURATIONS[0]);
  const [phase, setPhase] = useState(0);
  const canObserve = typeof IntersectionObserver !== 'undefined';
  const inView = useInView(sectionRef, { amount: 0.35 });
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

  const railScale = displayPhase >= COMPLETE_PHASE ? 1 : displayPhase >= 4 ? 0.52 : displayPhase >= 2 ? 0.26 : 0.08;

  return (
    <section ref={sectionRef} className="section bg-mist" aria-labelledby="secura-readiness-title" data-phase={displayPhase}>
      <div className="shell">
        <div className="grid items-center gap-14 min-[1081px]:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] min-[1081px]:gap-16">
          <div>
            <header className="max-w-150">
              <p className="eyebrow">{content.eyebrow}</p>
              <h2 id="secura-readiness-title" className="text-wrap-balance">{content.title}</h2>
              <p className="lede mt-6 text-pretty">{content.description}</p>
            </header>
            <ul className="mt-8 mb-0 grid list-none gap-3 p-0" aria-label="Review readiness benefits">
              {content.benefits.map((benefit) => (
                <li className="flex items-start gap-3 border-b border-line pb-3 text-[.8rem] leading-5 text-navy last:border-b-0" key={benefit}>
                  <CheckCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" weight="fill" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <motion.figure
            className="relative m-0 grid gap-3.5 min-[761px]:grid-cols-[minmax(10rem,.72fr)_minmax(14rem,1.28fr)] min-[761px]:grid-rows-[repeat(5,3.75rem)] min-[761px]:gap-x-5 min-[761px]:gap-y-3.5"
            initial={false}
            animate={{ opacity: displayPhase === RESET_PHASE ? 0.28 : 1 }}
            transition={{ duration: motionEnabled ? 0.3 : 0, ease: EASE }}
            aria-label="Review readiness workflow and Secura findings"
          >
            <span className="pointer-events-none absolute top-7 bottom-7 left-4 z-0 w-px" aria-hidden="true">
              <motion.span
                className="block h-full w-full origin-top bg-mint"
                initial={false}
                animate={{ transform: `scaleY(${railScale})` }}
                transition={{ duration: motionEnabled ? 0.5 : 0, ease: EASE }}
              />
              <motion.span
                className="absolute top-0 -left-[3px] hidden size-[7px] rounded-full bg-mint min-[761px]:block"
                initial={false}
                animate={{ transform: `translateY(${railScale * 296}px)`, opacity: displayPhase === RESET_PHASE ? 0 : 1 }}
                transition={{ duration: motionEnabled ? 0.5 : 0, ease: EASE }}
              />
            </span>

            {content.workflow.slice(0, 3).map((step, index) => (
              <WorkflowStep index={index} label={step} phase={displayPhase} motionEnabled={motionEnabled} key={step} />
            ))}
            <FindingsPanel content={content} phase={displayPhase} motionEnabled={motionEnabled} />
            {content.workflow.slice(3).map((step, offset) => (
              <WorkflowStep index={offset + 3} label={step} phase={displayPhase} motionEnabled={motionEnabled} key={step} />
            ))}
          </motion.figure>
        </div>

        <div className="mt-12 flex items-center gap-4 rounded-[22px] bg-navy px-6 py-5 text-white min-[761px]:px-8">
          <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-mint" weight="duotone" />
          <p className="m-0 text-[.82rem] leading-6 text-[#d7e1e8]">{content.boundary}</p>
        </div>
      </div>
    </section>
  );
}
