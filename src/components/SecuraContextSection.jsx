import { useRef, useState } from 'react';
import {
  BookOpenText,
  CheckCircle,
  FileText,
  Paperclip,
  SlidersHorizontal,
} from '@phosphor-icons/react';
import { motion, useInView } from 'motion/react';
import SecuraMark from './SecuraMark';

const EASE_OUT = [0.23, 1, 0.32, 1];

const sourcePresentation = {
  requirement: {
    Icon: FileText,
    position: 'top-9 left-[5%]',
    contextLabel: 'Requirement context',
  },
  implementation: {
    Icon: SlidersHorizontal,
    position: 'top-9 right-[5%]',
    contextLabel: 'Operational context',
  },
  policies: {
    Icon: BookOpenText,
    position: 'bottom-9 left-[5%]',
    contextLabel: 'Governance context',
  },
  evidence: {
    Icon: Paperclip,
    position: 'right-[5%] bottom-9',
    contextLabel: 'Proof context',
  },
};

const connectorPaths = {
  requirement: 'M 245 120 C 360 120 365 250 455 280',
  implementation: 'M 755 120 C 640 120 635 250 545 280',
  policies: 'M 245 480 C 360 480 365 350 455 320',
  evidence: 'M 755 480 C 640 480 635 350 545 320',
};

function SectionCopy({ content }) {
  return (
    <header className="section-heading section-heading--split max-[760px]:block">
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="secura-context-title" className="text-wrap-balance">{content.title}</h2>
      </div>
      <p className="lede mb-0 text-pretty max-[760px]:mt-6">{content.description}</p>
    </header>
  );
}

function SecuraCore({ activeSource, motionEnabled, revealed, onActivate, onDeactivate }) {
  const contextLabel = activeSource === 'all'
    ? 'Reviewed together'
    : sourcePresentation[activeSource]?.contextLabel ?? '4 sources connected';

  return (
    <div className="absolute top-1/2 left-1/2 z-20 min-h-52 w-52 -translate-x-1/2 -translate-y-1/2 max-[760px]:relative max-[760px]:top-auto max-[760px]:left-auto max-[760px]:order-first max-[760px]:min-h-48 max-[760px]:w-48 max-[760px]:transform-none max-[760px]:self-center">
      <motion.button
        type="button"
        className="grid min-h-52 w-full place-items-center rounded-[28px] border border-mint/26 bg-navy p-7 text-center text-white shadow-elevated max-[760px]:min-h-48"
        aria-label="Highlight all four Secura AI review connections"
        aria-pressed={activeSource === 'all'}
        initial={motionEnabled ? { opacity: 0, transform: 'scale(.95)' } : false}
        animate={revealed
          ? { opacity: 1, transform: 'scale(1)' }
          : { opacity: 0, transform: 'scale(.95)' }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={onActivate}
      >
        <motion.span
          className="pointer-events-none absolute inset-3 rounded-[22px] border border-white/8"
          aria-hidden="true"
          animate={motionEnabled && revealed
            ? { opacity: [0.45, 0.8, 0.45], transform: ['scale(1)', 'scale(1.025)', 'scale(1)'] }
            : { opacity: 0.55, transform: 'scale(1)' }}
          transition={{ duration: 5.8, ease: 'easeInOut', repeat: motionEnabled ? Infinity : 0, delay: 3.3 }}
        />
        <span className="relative grid justify-items-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-mint/12 shadow-[inset_0_0_0_1px_rgba(38,216,173,.16)]">
            <SecuraMark className="size-10" />
          </span>
          <span className="mt-5 font-mono text-[.7rem] font-medium tracking-[.14em] text-mint">SECURA AI</span>
          <strong className="mt-2 text-lg font-medium tracking-[-.03em]">Unified control context</strong>
          <motion.span
            key={contextLabel}
            className="mt-3 font-mono text-[.58rem] tracking-[.08em] uppercase text-white/70"
            initial={motionEnabled ? { opacity: 0, transform: 'translateY(4px)' } : false}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.2, ease: EASE_OUT, delay: revealed && !activeSource ? 3.25 : 0 }}
          >
            {contextLabel}
          </motion.span>
        </span>
      </motion.button>
    </div>
  );
}

function SourceNode({ source, index, activeSource, motionEnabled, revealed, onActivate, onDeactivate }) {
  const { Icon, position } = sourcePresentation[source.id];
  const dimmed = activeSource && activeSource !== source.id && activeSource !== 'all';

  return (
    <motion.div
      className={`absolute z-10 w-[min(18rem,31%)] ${position} max-[760px]:relative max-[760px]:inset-auto max-[760px]:w-full`}
      initial={motionEnabled ? { opacity: 0, transform: 'translateY(14px) scale(.97)' } : false}
      animate={revealed
        ? { opacity: 1, transform: 'translateY(0) scale(1)' }
        : { opacity: 0, transform: 'translateY(14px) scale(.97)' }}
      transition={{ duration: 0.42, delay: motionEnabled ? 0.16 + index * 0.1 : 0, ease: EASE_OUT }}
    >
      <motion.button
        type="button"
        className={`group w-full rounded-[20px] border bg-white p-5 text-left shadow-[0_18px_45px_rgba(6,27,50,.06)] transition-[border-color,box-shadow,opacity] duration-200 ${
          activeSource === source.id || activeSource === 'all'
            ? 'border-teal/38 shadow-[0_22px_56px_rgba(6,27,50,.1)]'
            : 'border-line'
        } ${dimmed ? 'opacity-45' : 'opacity-100'}`}
        aria-label={`Highlight ${source.title} context`}
        aria-pressed={activeSource === source.id}
        animate={motionEnabled && revealed
          ? { transform: ['translateY(0)', 'translateY(-3px)', 'translateY(0)'] }
          : { transform: 'translateY(0)' }}
        whileHover={motionEnabled ? { transform: 'translateY(-4px)' } : undefined}
        whileTap={motionEnabled ? { transform: 'translateY(-1px) scale(.98)' } : undefined}
        transition={{
          transform: {
            duration: 6.4 + index * 0.35,
            delay: 3.7 + index * 0.32,
            ease: 'easeInOut',
            repeat: motionEnabled ? Infinity : 0,
          },
        }}
        onMouseEnter={() => onActivate(source.id)}
        onMouseLeave={onDeactivate}
        onFocus={() => onActivate(source.id)}
        onBlur={onDeactivate}
        onClick={() => onActivate(source.id)}
      >
        <span className="flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-mint-soft text-teal transition-colors duration-200 group-hover:bg-mint group-hover:text-navy group-focus-visible:bg-mint group-focus-visible:text-navy">
            <Icon aria-hidden="true" className="size-5" weight="duotone" />
          </span>
          <span className="min-w-0">
            <span className="block text-[1rem] font-medium leading-5 tracking-[-.025em] text-navy">{source.title}</span>
            <span className="mt-2 block text-[.76rem] leading-5 text-muted">{source.description}</span>
            <span className="mt-3 flex items-center gap-1.5 font-mono text-[.55rem] font-medium tracking-[.08em] uppercase text-teal">
              <CheckCircle aria-hidden="true" className="size-3.5" weight="fill" />
              {source.status}
            </span>
          </span>
        </span>
      </motion.button>
    </motion.div>
  );
}

function ConnectorPaths({ sources, activeSource, motionEnabled, revealed }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full max-[760px]:hidden"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {sources.map((source, index) => {
        const highlighted = activeSource === source.id || activeSource === 'all';
        const dimmed = activeSource && !highlighted;
        const path = connectorPaths[source.id];

        return (
          <g key={source.id}>
            <motion.path
              d={path}
              fill="none"
              className={`transition-[stroke,opacity] duration-200 ${
                highlighted ? 'stroke-mint opacity-100' : dimmed ? 'stroke-teal opacity-10' : 'stroke-teal opacity-28'
              }`}
              strokeWidth={highlighted ? 2 : 1.25}
              strokeLinecap="round"
              initial={motionEnabled ? { pathLength: 0 } : false}
              animate={revealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.62, delay: motionEnabled ? 0.42 + index * 0.12 : 0, ease: EASE_OUT }}
            />
            {motionEnabled && revealed ? (
              <circle r="4" className="fill-mint opacity-0">
                <animateMotion
                  dur="0.78s"
                  begin={`${0.98 + index * 0.62}s`}
                  path={path}
                  fill="freeze"
                />
                <animate attributeName="opacity" values="0;1;1;0" dur="0.78s" begin={`${0.98 + index * 0.62}s`} fill="freeze" />
              </circle>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function ContextConvergenceVisual({ content, motionEnabled }) {
  const visualRef = useRef(null);
  const [activeSource, setActiveSource] = useState(null);
  const canObserve = typeof IntersectionObserver !== 'undefined';
  const inView = useInView(visualRef, { amount: 0.25, once: true });
  const revealed = !motionEnabled || !canObserve || inView;

  return (
    <figure
      ref={visualRef}
      className="relative m-0 overflow-hidden rounded-[32px] border border-line bg-mist px-7 pt-7 pb-5 max-[760px]:rounded-[24px] max-[760px]:px-4 max-[760px]:pt-8"
      aria-label="Four control sources converge into one unified Secura AI review context"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(38,216,173,.13),transparent_30%)]" aria-hidden="true" />
      <div className="relative min-h-[38rem] max-[760px]:flex max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:gap-4">
        <span className="pointer-events-none absolute top-1/2 left-1/2 size-[29rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/10 max-[760px]:hidden" aria-hidden="true" />
        <span className="pointer-events-none absolute top-1/2 left-1/2 size-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/14 max-[760px]:hidden" aria-hidden="true" />
        <span className="pointer-events-none absolute top-24 bottom-10 left-1/2 hidden w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(8,127,140,0),rgba(8,127,140,.26)_14%,rgba(8,127,140,.26)_86%,rgba(8,127,140,0))] max-[760px]:block" aria-hidden="true" />

        <ConnectorPaths
          sources={content.items}
          activeSource={activeSource}
          motionEnabled={motionEnabled}
          revealed={revealed}
        />

        <SecuraCore
          activeSource={activeSource}
          motionEnabled={motionEnabled}
          revealed={revealed}
          onActivate={() => setActiveSource('all')}
          onDeactivate={() => setActiveSource(null)}
        />

        {content.items.map((source, index) => (
          <SourceNode
            source={source}
            index={index}
            activeSource={activeSource}
            motionEnabled={motionEnabled}
            revealed={revealed}
            onActivate={setActiveSource}
            onDeactivate={() => setActiveSource(null)}
            key={source.id}
          />
        ))}
      </div>

      <motion.figcaption
        className="relative mx-auto mt-1 flex w-fit items-center gap-2.5 rounded-full border border-line bg-white/82 px-4 py-2.5 text-center font-mono text-[.62rem] font-medium tracking-[.04em] text-navy shadow-[0_10px_30px_rgba(6,27,50,.05)] max-[520px]:w-full max-[520px]:justify-center max-[520px]:rounded-2xl max-[520px]:leading-5"
        initial={motionEnabled ? { opacity: 0, transform: 'translateY(8px)' } : false}
        animate={revealed ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0, transform: 'translateY(8px)' }}
        transition={{ duration: 0.38, delay: motionEnabled ? 3.15 : 0, ease: EASE_OUT }}
      >
        <span className="size-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
        {content.highlight}
      </motion.figcaption>
    </figure>
  );
}

export default function SecuraContextSection({ content, motionEnabled }) {
  return (
    <section className="section overflow-hidden bg-white" aria-labelledby="secura-context-title">
      <div className="shell">
        <SectionCopy content={content} />
        <ContextConvergenceVisual content={content} motionEnabled={motionEnabled} />
      </div>
    </section>
  );
}
