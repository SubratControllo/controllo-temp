import { useLayoutEffect, useRef, useState } from 'react';
import { WarningDiamond } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Reveal from '../../components/Reveal';

const levelTone = {
  High: 'border-[#ef9a5c]/45 bg-[#fff2e8] text-[#7c3a10]',
  Moderate: 'border-[#f4c76b]/40 bg-[#fff8df] text-[#7a4a06]',
};

const getLevelTone = (level) => levelTone[level] ?? 'border-line bg-white text-muted';

function CapabilityStrip({ features }) {
  return (
    <ol className="mt-10 grid border-y border-line md:grid-cols-3" aria-label="Risk assessment capabilities">
      {features.map(([title, detail], index) => (
        <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
          <span className="font-mono text-[1rem] font-medium text-teal/55">0{index + 1}</span>
          <span>
            <span className="block text-[.86rem] font-semibold text-navy">{title}</span>
            <span className="mt-1.5 block text-[.72rem] leading-5 text-muted">{detail}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function CompactHeatmap({ context, scale }) {
  const likelihoodIndex = scale.indexOf(context.likelihood);
  const impactIndex = scale.indexOf(context.impact);
  const markerX = (likelihoodIndex + 0.5) * 100;
  const markerY = (scale.length - impactIndex - 0.5) * 100;

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[.52rem] font-medium uppercase tracking-[.11em] text-teal">Risk heatmap</p>
          <p className="mt-1.5 text-[.78rem] font-semibold text-navy">Likelihood × impact</p>
        </div>
        <p className="font-mono text-[.52rem] font-medium uppercase tracking-[.08em] text-teal">
          {context.likelihood} × {context.impact} = {context.score}
        </p>
      </div>

      <div className="relative mx-auto aspect-square w-full">
        <div className="absolute inset-y-0 end-full me-2 flex flex-col justify-between py-0.5 text-right font-mono text-[.42rem] font-medium text-muted" aria-hidden="true">
          {[...scale].reverse().map((value) => <span key={value}>{value}</span>)}
        </div>
        <span className="absolute top-1/2 -left-6 end-[calc(100%+2rem)] font-mono text-[.42rem] font-medium uppercase tracking-[.08em] text-muted [writing-mode:vertical-rl] [transform:translateY(-50%)_rotate(180deg)]">
          Impact
        </span>
        <div className="aspect-square overflow-hidden rounded-[12px] border border-navy/15 bg-[#d8f4eb]">
          <svg
            aria-label={`${context.label} risk heatmap. ${context.risk} is selected at likelihood ${context.likelihood}, impact ${context.impact}, score ${context.score}. Scale values are ${scale.join(', ')}.`}
            className="block h-full w-full"
            data-risk-heatmap="stepped"
            role="img"
            viewBox="0 0 500 500"
          >
            <rect width="500" height="500" fill="#d8f4eb" />
            <path d="M0 0H200V100H300V200H400V300H500V400H0Z" fill="#86d9bf" />
            <path d="M200 0H500V300H300V200H200Z" fill="#f2d468" />
            <path d="M300 0H500V200H300Z" fill="#e99a42" />
            <rect x="400" width="100" height="100" fill="#a13838" />
            <rect x="300" y="400" width="100" height="100" fill="#e8efed" />
            <path d="M100 0V500M200 0V500M300 0V500M400 0V500M0 100H500M0 200H500M0 300H500M0 400H500" fill="none" stroke="rgba(6,27,50,.12)" strokeWidth="2" />
            <g data-risk-selected="true" transform={`translate(${markerX} ${markerY})`}>
              <circle r="21" fill="white" opacity=".92" />
              <circle r="11" fill="#061b32" />
              <circle r="20" fill="none" stroke="#087f8c" strokeWidth="3" />
            </g>
            <rect x="1" y="1" width="498" height="498" rx="18" fill="none" stroke="rgba(6,27,50,.16)" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute inset-x-0 top-full mt-2 grid grid-cols-5 text-center font-mono text-[.42rem] font-medium text-muted" aria-hidden="true">
          {scale.map((value) => <span key={value}>{value}</span>)}
        </div>
        <p className="absolute inset-x-0 top-[calc(100%+1.45rem)] text-center font-mono text-[.42rem] font-medium uppercase tracking-[.08em] text-muted">Likelihood</p>
      </div>

      <div className="mt-10 flex items-center justify-between font-mono text-[.48rem] font-medium uppercase tracking-[.08em] text-muted">
        <span>Lower exposure</span>
        <span>Higher exposure</span>
      </div>
    </div>
  );
}

function RiskStoryCanvas({ context, index, motionEnabled, scale, stepCount = 3 }) {
  return (
    <motion.article
      aria-label={`${context.label} risk overview`}
      animate={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
      className="w-full max-w-[500px] overflow-hidden border border-teal/20 bg-white shadow-[0_26px_76px_rgba(6,27,50,.1)]"
      initial={motionEnabled ? { opacity: 0, transform: 'translate3d(0, 10px, 0)' } : false}
      key={context.id}
      transition={{ duration: motionEnabled ? 0.24 : 0, ease: [0.23, 1, 0.32, 1] }}
    >
      <header className="border-b border-line bg-mint-soft/22 px-5 py-3 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[.52rem] font-medium uppercase tracking-[.11em] text-teal">Risk register · 0{index + 1} / 03</p>
            <h3 className="mt-2 text-[1.3rem] font-semibold text-navy">{context.title}</h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <div className="grid w-16 grid-cols-3 gap-1 rounded-full bg-white/55 p-1 ring-1 ring-navy/8" aria-hidden="true">
              {Array.from({ length: stepCount }, (_, stepIndex) => (
                <span className={`h-1 rounded-full transition-colors duration-150 ${stepIndex === index ? 'bg-teal' : 'bg-navy/14'}`} key={stepIndex} />
              ))}
            </div>
            <span className={`rounded-full border px-2.5 py-1 font-mono text-[.5rem] font-medium uppercase tracking-[.08em] ${getLevelTone(context.level)}`}>
              {context.level}
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-4 p-5">
        <CompactHeatmap context={context} scale={scale} />

        <dl className="grid grid-cols-3 border-y border-line">
          {[
            ['Likelihood', context.likelihood],
            ['Impact', context.impact],
            ['Risk level', context.level],
          ].map(([label, value]) => (
            <div className="border-r border-line px-3 py-3 last:border-r-0" key={label}>
              <dt className="font-mono text-[.45rem] font-medium uppercase tracking-[.08em] text-muted">{label}</dt>
              <dd className="mt-1.5 text-[.72rem] font-semibold text-navy">{value}</dd>
            </div>
          ))}
        </dl>

      </div>
    </motion.article>
  );
}

function ContextChapter({ context, index, isActive, trackScroll, visualProps }) {
  return (
    <li
      aria-current={isActive ? 'step' : undefined}
      className={`border-t border-line py-10 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] min-[1081px]:flex min-[1081px]:min-h-[72svh] min-[1081px]:items-center min-[1081px]:py-20 ${
        isActive ? 'translate-x-1 opacity-100' : 'opacity-[.58]'
      }`}
      data-risk-story-index={index}
    >
      <div className="w-full">
        <div className="flex items-center gap-3">
          <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-teal ring-4 ring-mint-soft' : 'bg-line'}`} />
          <span className="font-mono text-[.55rem] font-medium uppercase tracking-[.11em] text-teal">0{index + 1} · {context.label}</span>
        </div>
        <h3 className="mt-5 text-[clamp(1.65rem,2.4vw,2.35rem)] font-medium text-navy">{context.title}</h3>
        <p className="mt-3 max-w-[430px] text-[.88rem] leading-7 text-muted">{context.description}</p>

        <div className="mt-7 grid max-w-[430px] grid-cols-[1fr_auto] gap-4 border-y border-line py-4">
          <div>
            <p className="font-mono text-[.48rem] font-medium uppercase tracking-[.1em] text-muted">Representative assessment</p>
            <p className="mt-2 text-[.78rem] font-semibold text-navy">{context.risk}</p>
            <p className="mt-1.5 text-[.65rem] text-muted">Owner · {context.owner}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[.48rem] font-medium uppercase tracking-[.1em] text-muted">Priority</p>
            <p className="mt-2 text-[.78rem] font-semibold text-navy">{context.level} · {context.score}</p>
          </div>
        </div>

        <p className="mt-5 max-w-[430px] text-[.74rem] leading-5 text-muted">{context.comment}</p>
        <p className="mt-3 max-w-[430px] font-mono text-[.48rem] font-medium uppercase leading-5 tracking-[.08em] text-teal">
          {context.framework} · {context.linkedControls.slice(0, 2).join(' · ')}
        </p>

        <div className={`mt-8 ${trackScroll ? 'min-[1081px]:hidden' : ''}`}>
          <RiskStoryCanvas context={context} index={index} {...visualProps} />
        </div>
      </div>
    </li>
  );
}

export default function RiskAssessmentSection({ content, motionEnabled }) {
  const { workbench } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const canTrackScroll = motionEnabled && typeof window !== 'undefined';
  const activeContext = workbench.contexts[activeIndex];

  useLayoutEffect(() => {
    if (!canTrackScroll) return undefined;

    const chapters = Array.from(listRef.current?.querySelectorAll('[data-risk-story-index]') ?? []);
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportAnchor = window.innerHeight * 0.5;
      const nextIndex = chapters.reduce((closestIndex, chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const distance = Math.abs(((rect.top + rect.bottom) / 2) - viewportAnchor);
        const closestRect = chapters[closestIndex].getBoundingClientRect();
        const closestDistance = Math.abs(((closestRect.top + closestRect.bottom) / 2) - viewportAnchor);
        return distance < closestDistance ? index : closestIndex;
      }, 0);

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [canTrackScroll, workbench.contexts]);

  const visualProps = {
    motionEnabled,
    scale: workbench.scale,
    stepCount: workbench.contexts.length,
  };

  return (
    <section className="section bg-field" aria-labelledby="risk-assessment-title" data-risk-context={activeContext.id}>
      <div className="shell">
        <Reveal motionEnabled={motionEnabled}>
          <header className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h2 id="risk-assessment-title">{content.title}</h2>
            </div>
            <div>
              <p className="lede text-[.98rem]">{content.description}</p>
              <p className="mt-5 font-mono text-[.55rem] font-medium uppercase leading-5 tracking-[.09em] text-teal">
                {content.supporting}
              </p>
            </div>
          </header>
          <CapabilityStrip features={content.features} />
        </Reveal>

        <div className="mt-10 grid items-start gap-10 min-[1081px]:grid-cols-[minmax(24rem,.86fr)_minmax(23rem,.92fr)] min-[1081px]:gap-12">
          {canTrackScroll ? (
            <div className="hidden min-[1081px]:block min-[1081px]:h-full">
              <div className="sticky top-[9.5rem] max-w-[500px]" data-testid="risk-story-sticky">
                <RiskStoryCanvas
                  context={activeContext}
                  index={activeIndex}
                  {...visualProps}
                />
              </div>
            </div>
          ) : null}

          <ol className="list-none p-0 min-[1081px]:pb-[100svh]" ref={listRef} aria-label="Risk portfolio story">
            {workbench.contexts.map((context, index) => (
              <ContextChapter
                context={context}
                index={index}
                isActive={!canTrackScroll || index === activeIndex}
                key={context.id}
                trackScroll={canTrackScroll}
                visualProps={visualProps}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
