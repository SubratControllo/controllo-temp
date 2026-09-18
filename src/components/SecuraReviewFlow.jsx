import { useEffect, useRef, useState } from 'react';
import {
  Check,
  CheckCircle,
  LinkSimple,
  ListMagnifyingGlass,
  PencilSimpleLine,
  Sparkle,
  WarningCircle,
  Wrench,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import SecuraMark from './SecuraMark';

const EASE = [0.16, 1, 0.3, 1];
const PHASE_DURATIONS = [1600, 1600, 2000, 1800, 2000, 1500, 300];
const COMPLETE_PHASE = 5;
const RESET_PHASE = 6;

const stepPresentation = [
  { status: 'Implementation captured', Icon: PencilSimpleLine },
  { status: 'Linked context ready', Icon: LinkSimple },
  { status: '1 gap detected', Icon: Sparkle },
  { status: 'Review context explained', Icon: ListMagnifyingGlass },
  { status: 'Ready for team validation', Icon: Wrench },
];

const desktopSegments = [
  'M 100 24 H 300',
  'M 300 24 H 500',
  'M 500 24 H 700',
  'M 700 24 H 900',
];

const tabletSegments = [
  'M 167 24 H 500',
  'M 500 24 H 833',
  'M 833 24 C 930 24 930 388 833 388 H 167',
  'M 167 388 H 500',
];

function DescribeVisual({ animate }) {
  return (
    <div className="rounded-xl border border-line bg-field p-2.5">
      <p className="mb-2 font-mono text-[.52rem] tracking-[.08em] uppercase text-teal">Implementation description</p>
      <div className="grid gap-2">
        {[86, 68, 48].map((width, index) => (
          <motion.span
            className="h-1.5 rounded-full bg-navy/14"
            style={{ width: `${width}%` }}
            initial={false}
            animate={animate
              ? { opacity: 1, transform: 'translateX(0)' }
              : { opacity: 0, transform: 'translateX(-8px)' }}
            transition={{ duration: 0.28, delay: index * 0.08, ease: EASE }}
            key={width}
          />
        ))}
      </div>
    </div>
  );
}

function ConnectVisual({ animate }) {
  const chips = ['Policy', 'Procedure', 'Evidence'];

  return (
    <div className="relative grid grid-cols-3 gap-1.5 pt-7">
      <svg className="pointer-events-none absolute inset-x-3 top-0 h-10 w-[calc(100%-1.5rem)]" viewBox="0 0 180 48" aria-hidden="true">
        <motion.path
          d="M 90 0 V 22 M 25 22 H 155 M 25 22 V 44 M 90 22 V 44 M 155 22 V 44"
          fill="none"
          className="stroke-teal/45"
          strokeWidth="1.25"
          initial={false}
          animate={{ pathLength: animate ? 1 : 0 }}
          transition={{ duration: 0.42, delay: 0.22, ease: EASE }}
        />
      </svg>
      {chips.map((chip, index) => (
        <motion.span
          className="relative rounded-lg border border-line bg-field px-1 py-1.5 text-center font-mono text-[.46rem] text-navy"
          initial={false}
          animate={animate
            ? { opacity: 1, transform: 'translateY(0)' }
            : { opacity: 0, transform: 'translateY(6px)' }}
          transition={{ duration: 0.28, delay: 0.08 + index * 0.08, ease: EASE }}
          key={chip}
        >
          {chip}
        </motion.span>
      ))}
    </div>
  );
}

function AnalyzeVisual({ animate, playing }) {
  const states = ['Reading requirement', 'Reviewing implementation', 'Checking linked documents', 'Evaluating evidence'];

  return (
    <div className="relative overflow-hidden rounded-xl border border-mint/25 bg-navy p-2 text-white">
      <motion.span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-mint"
        initial={false}
        animate={animate && playing
          ? { opacity: [0, 0.8, 0], transform: ['translateY(0)', 'translateY(90px)', 'translateY(90px)'] }
          : { opacity: 0, transform: 'translateY(0)' }}
        transition={{ duration: 1.3, ease: EASE }}
        aria-hidden="true"
      />
      <div className="flex gap-2">
        <span className="grid grid-cols-4 gap-0.5 self-start rounded-lg bg-white/5 p-1.5" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <motion.span
              className="size-1 rounded-full bg-mint"
              animate={animate && playing
                ? { opacity: [0.2, 1, 0.28] }
                : { opacity: index < 8 ? 0.8 : 0.24 }}
              transition={{ duration: 0.7, delay: (index % 7) * 0.045, repeat: animate && playing ? Infinity : 0, ease: 'linear' }}
              key={index}
            />
          ))}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1.5">
            <SecuraMark className="size-3.5" />
            <span className="font-mono text-[.46rem] tracking-[.08em] text-mint">SECURA AI</span>
          </div>
          <div className="grid gap-1">
            {states.map((state, index) => (
              <motion.span
                className="truncate text-[.46rem] leading-3 text-white/70"
                initial={false}
                animate={animate
                  ? { opacity: 1, transform: 'translateX(0)' }
                  : { opacity: 0, transform: 'translateX(-5px)' }}
                transition={{ duration: 0.22, delay: 0.12 + index * 0.24, ease: EASE }}
                key={state}
              >
                {state}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UnderstandVisual({ animate }) {
  const states = [
    ['Supported', true],
    ['Incomplete', false],
    ['Missing', false],
  ];

  return (
    <div className="grid gap-1.5 rounded-xl border border-line bg-field p-2">
      {states.map(([label, supported], index) => (
        <motion.div
          className="flex items-center justify-between rounded-lg bg-white px-2 py-1 text-[.54rem] text-navy"
          initial={false}
          animate={animate
            ? { opacity: 1, transform: 'translateX(0)' }
            : { opacity: 0, transform: 'translateX(-6px)' }}
          transition={{ duration: 0.24, delay: 0.12 + index * 0.14, ease: EASE }}
          key={label}
        >
          <span>{label}</span>
          {supported
            ? <Check aria-hidden="true" className="size-3.5 text-teal" weight="bold" />
            : <WarningCircle aria-hidden="true" className="size-3.5 text-error" weight="fill" />}
        </motion.div>
      ))}
    </div>
  );
}

function ImproveVisual({ animate }) {
  return (
    <motion.div
      className="rounded-xl border border-mint/30 bg-mint-soft/45 p-2.5"
      initial={false}
      animate={animate
        ? { opacity: 1, transform: 'translateY(0)' }
        : { opacity: 0, transform: 'translateY(7px)' }}
      transition={{ duration: 0.34, delay: 0.08, ease: EASE }}
    >
      <p className="mb-1.5 font-mono text-[.48rem] font-medium tracking-[.08em] text-teal">RECOMMENDED REVIEW ACTION</p>
      <p className="mb-0 text-[.54rem] leading-[.875rem] text-navy">Add reviewer approval details and confirm current-period evidence.</p>
    </motion.div>
  );
}

function StepVisual({ index, active, playing }) {
  if (index === 0) return <DescribeVisual animate={active} />;
  if (index === 1) return <ConnectVisual animate={active} />;
  if (index === 2) return <AnalyzeVisual animate={active} playing={playing} />;
  if (index === 3) return <UnderstandVisual animate={active} />;
  return <ImproveVisual animate={active} />;
}

function RailSvg({ className, paths, phase, motionEnabled }) {
  return (
    <svg className={`pointer-events-none absolute ${className}`} viewBox={paths === desktopSegments ? '0 0 1000 48' : '0 0 1000 680'} preserveAspectRatio="none" aria-hidden="true">
      {paths.map((path) => <path d={path} fill="none" className="stroke-line" strokeWidth="2" key={`base-${path}`} />)}
      {paths.map((path, index) => (
        <motion.path
          d={path}
          fill="none"
          className="stroke-mint"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: phase > index ? 1 : 0, opacity: phase > index ? 1 : 0.25 }}
          transition={{ duration: motionEnabled ? 0.42 : 0, ease: EASE }}
          key={`progress-${path}`}
        />
      ))}
    </svg>
  );
}

function StepCard({ step, index, phase, motionEnabled, playing }) {
  const [title, description] = step;
  const active = phase === index;
  const completed = phase > index || phase === COMPLETE_PHASE || phase === RESET_PHASE;
  const future = phase < index;
  const status = stepPresentation[index].status;
  const StepIcon = stepPresentation[index].Icon;

  return (
    <li className="relative min-w-0 pt-16 max-[760px]:pt-0 max-[760px]:pl-14">
      <span
        className={`absolute top-0.5 left-1/2 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-[15px] border bg-mist transition-[border-color,background-color,color,box-shadow] duration-200 max-[760px]:top-4 max-[760px]:left-0 max-[760px]:translate-x-0 ${
          active
            ? 'border-mint bg-navy text-mint shadow-[0_8px_20px_rgba(6,27,50,.12)]'
            : completed
              ? 'border-mint/45 bg-mint-soft text-teal'
              : 'border-line bg-white text-muted'
        }`}
      >
        <StepIcon aria-hidden="true" className="size-[1.15rem]" weight={active ? 'fill' : 'duotone'} />
        {completed && !active ? (
          <span className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-teal text-white shadow-[0_2px_6px_rgba(6,27,50,.16)]">
            <Check aria-hidden="true" className="size-2.5" weight="bold" />
          </span>
        ) : null}
      </span>

      {index < 4 ? (
        <span className="absolute top-10 -bottom-4 left-[21.5px] hidden w-px bg-line max-[760px]:block" aria-hidden="true">
          <motion.span
            className="block h-full w-full origin-top bg-mint"
            initial={false}
            animate={{ transform: phase > index ? 'scaleY(1)' : 'scaleY(0)' }}
            transition={{ duration: motionEnabled ? 0.42 : 0, ease: EASE }}
          />
        </span>
      ) : null}

      <motion.article
        className={`relative flex flex-col overflow-hidden rounded-[20px] border p-3.5 shadow-[0_18px_45px_rgba(6,27,50,.05)] transition-[border-color,background-color,box-shadow,opacity,transform] duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] ${
          active
            ? 'z-20 scale-[1.04] border-teal/45 bg-white shadow-elevated max-[1080px]:scale-[1.025] max-[760px]:scale-100'
            : completed
              ? 'border-mint/25 bg-white opacity-100'
              : 'border-line bg-white/70 opacity-65'
        }`}
        aria-current={active ? 'step' : undefined}
      >
        <div>
          <p className={`mb-0 font-mono text-[.5rem] tracking-[.08em] ${active ? 'text-teal' : 'text-muted'}`}>0{index + 1}</p>
          <h3 className="mt-2 text-[.92rem] font-medium leading-5 text-navy">{title}</h3>
          <p className="mt-1.5 mb-0 min-h-[2.1rem] text-[.64rem] leading-[1.05rem] text-muted">{description}</p>
        </div>

        <div className="mt-2.5 h-[5.75rem]">
          <AnimatePresence initial={false} mode="wait">
            {active ? (
              <motion.div
                initial={motionEnabled ? { opacity: 0, transform: 'translateY(7px)' } : false}
                animate={{ opacity: 1, transform: 'translateY(0)' }}
                exit={{ opacity: 0, transform: 'translateY(-5px)' }}
                transition={{ duration: motionEnabled ? 0.28 : 0, ease: EASE }}
                key={`visual-${index}`}
              >
                <StepVisual index={index} active={active} playing={playing} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex min-h-5 items-center gap-1.5 font-mono text-[.47rem] tracking-[.04em] uppercase">
          {completed && !active ? (
            <>
              <CheckCircle aria-hidden="true" className="size-3.5 text-teal" weight="fill" />
              <span className="text-teal">Complete</span>
            </>
          ) : active ? (
            <motion.span
              className={`flex items-center gap-1.5 ${index === 2 ? 'text-error' : 'text-teal'}`}
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.24, delay: index === 2 ? 1.35 : 0.8, ease: EASE }}
            >
              <span className={`size-1.5 rounded-full ${index === 2 ? 'bg-error' : 'bg-mint'}`} aria-hidden="true" />
              {status}
            </motion.span>
          ) : (
            <span className="text-muted/70">Queued</span>
          )}
        </div>
      </motion.article>
    </li>
  );
}

export default function SecuraReviewFlow({ content, motionEnabled }) {
  const sectionRef = useRef(null);
  const remainingRef = useRef(PHASE_DURATIONS[0]);
  const [phase, setPhase] = useState(0);
  const canObserve = typeof IntersectionObserver !== 'undefined';
  const inView = useInView(sectionRef, { amount: 0.45 });
  const visible = !canObserve || inView;
  const playing = motionEnabled && visible;
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
      if (!finished) {
        remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt));
      }
    };
  }, [phase, playing]);

  const resetting = displayPhase === RESET_PHASE;

  return (
    <section
      ref={sectionRef}
      className="section overflow-x-clip bg-mist"
      aria-labelledby="secura-process-title"
    >
      <div className="shell">
        <header className="section-heading">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="secura-process-title" className="text-wrap-balance">{content.title}</h2>
          <p className="lede mt-6 text-wrap-pretty">{content.description}</p>
        </header>

        <figure className="m-0" aria-label="Secura review flow from control description to team validation" data-phase={displayPhase}>
          <motion.div
            className="relative"
            initial={false}
            animate={{ opacity: resetting ? 0.28 : 1, transform: resetting ? 'scale(.99)' : 'scale(1)' }}
            transition={{ duration: motionEnabled ? 0.28 : 0, ease: EASE }}
          >
            <RailSvg className="inset-x-0 top-0 h-12 w-full max-[1080px]:hidden" paths={desktopSegments} phase={displayPhase} motionEnabled={motionEnabled} />
            <RailSvg className="inset-0 h-full w-full min-[1081px]:hidden max-[760px]:hidden" paths={tabletSegments} phase={displayPhase} motionEnabled={motionEnabled} />

            <ol className="relative grid list-none grid-cols-5 gap-5 p-0 max-[1080px]:grid-cols-3 max-[1080px]:gap-y-12 max-[760px]:grid-cols-1 max-[760px]:gap-4" aria-label="How Secura works">
              {content.steps.map((step, index) => (
                <StepCard
                  step={step}
                  index={index}
                  phase={displayPhase}
                  motionEnabled={motionEnabled}
                  playing={playing}
                  key={step[0]}
                />
              ))}
            </ol>
          </motion.div>

          <motion.figcaption
            className="mx-auto mt-10 flex min-h-10 w-fit items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-center font-mono text-[.62rem] leading-5 text-navy shadow-[0_10px_30px_rgba(6,27,50,.05)] max-[620px]:w-full max-[620px]:justify-center max-[620px]:rounded-2xl"
            initial={false}
            animate={{ opacity: displayPhase === COMPLETE_PHASE ? 1 : 0.35, transform: displayPhase === COMPLETE_PHASE ? 'translateY(0)' : 'translateY(4px)' }}
            transition={{ duration: motionEnabled ? 0.32 : 0, ease: EASE }}
          >
            <span className={`size-1.5 shrink-0 rounded-full ${displayPhase === COMPLETE_PHASE ? 'bg-mint' : 'bg-line'}`} aria-hidden="true" />
            Control context assembled → analyzed → prepared for review
          </motion.figcaption>
        </figure>
      </div>
    </section>
  );
}
