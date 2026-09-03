import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, CircleAlert, ScanLine } from 'lucide-react';
import { gsap } from 'gsap';
import SecuraMark from '../../components/SecuraMark';

export const SECURA_REVIEW_DELAYS = { scope: 1200, reviewing: 1400, result: 4500 };

const PHASES = ['scope', 'reviewing', 'result'];

function ScopeLedger({ sources }) {
  return (
    <div className="flex h-full flex-col bg-field p-5 max-[520px]:p-4">
      <div>
        <p className="font-mono text-[.55rem] uppercase tracking-[.11em] text-teal">Review scope</p>
        <h3 className="mt-2 text-[1.05rem] leading-tight text-navy">Access review</h3>
        <p className="mt-1 text-[.62rem] text-muted">ISO/IEC 27001</p>
      </div>

      <ul className="mt-5 flex flex-1 list-none flex-col justify-center border-t border-line pl-0 max-[520px]:mt-3 max-[520px]:grid max-[520px]:grid-cols-3 max-[520px]:border-b">
        {sources.map((source) => (
          <li
            className="scope-signal flex min-w-0 items-center gap-2 border-b border-line py-3 last:border-b-0 max-[520px]:flex-col max-[520px]:items-start max-[520px]:justify-center max-[520px]:border-b-0 max-[520px]:border-r max-[520px]:px-2 max-[520px]:py-2 max-[520px]:last:border-r-0"
            key={source.label}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-[8px] bg-mint-soft text-teal">
              <Check className="size-3.5" aria-hidden="true" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              {source.mobileLabel ? (
                <>
                  <span className="block text-[.63rem] font-medium leading-[1.35] text-navy max-[520px]:hidden">{source.label}</span>
                  <span className="hidden text-[.68rem] font-medium leading-[1.25] text-navy max-[520px]:block">{source.mobileLabel}</span>
                </>
              ) : (
                <span className="block text-[.63rem] font-medium leading-[1.35] text-navy max-[520px]:text-[.68rem] max-[520px]:leading-[1.25]">{source.label}</span>
              )}
              <span className={`mt-0.5 block text-[.52rem] max-[520px]:text-[.6rem] ${/review/i.test(source.state) ? 'text-amber-700' : 'text-muted'}`}>{source.state}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhasePlane({ active, children, name, testId }) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 p-5 max-[520px]:p-4 ${active ? 'visible opacity-100' : 'invisible opacity-0'}`}
      data-secura-plane={name}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

function ScopePlane({ active }) {
  return (
    <PhasePlane active={active} name="scope" testId="secura-scope-plane">
      <div className="flex h-full flex-col justify-between">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[.55rem] uppercase tracking-[.1em] text-teal">
            <span className="size-1.5 rounded-full bg-mint" />
            Context ready
          </span>
          <h3 className="mt-4 max-w-[12ch] text-[1.55rem] leading-[1.08]">Ready for Secura review</h3>
          <p className="mt-3 max-w-[30ch] text-[.68rem] leading-[1.6] text-muted">Requirement, implementation, policy, and evidence are in view.</p>
        </div>
        <div className="rounded-[16px] border border-line bg-white p-4 shadow-[0_12px_30px_rgba(6,27,50,.06)]">
          <span className="font-mono text-[.5rem] uppercase tracking-[.1em] text-muted">Connected inputs</span>
          <strong className="mt-2 block text-[1.15rem] font-medium text-navy">3 review inputs linked</strong>
        </div>
      </div>
    </PhasePlane>
  );
}

function ReviewingPlane({ active }) {
  return (
    <PhasePlane active={active} name="reviewing" testId="secura-review-plane">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] bg-navy p-5 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:100%_34px]" />
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-[.54rem] uppercase tracking-[.11em] text-mint">Secura analysis</span>
          <ScanLine className="review-pulse size-4 text-mint" aria-hidden="true" />
        </div>
        <div className="relative flex flex-1 flex-col justify-center">
          <SecuraMark className="size-11" />
          <h3 className="mt-5 text-[1.35rem] leading-tight text-white">Reviewing connected context</h3>
          <p className="mt-3 text-[.64rem] leading-[1.6] text-white/58">Comparing the requirement with implementation, policies, procedures, and evidence.</p>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="review-progress block h-full origin-left rounded-full bg-mint" />
          </div>
        </div>
        <span aria-hidden="true" className="review-scan pointer-events-none absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-mint/14 to-transparent" />
      </div>
    </PhasePlane>
  );
}

function ResultPlane({ active, content }) {
  return (
    <PhasePlane active={active} name="result" testId="secura-result-plane">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[.54rem] uppercase tracking-[.11em] text-error">Review required</span>
            <h3 className="mt-2 text-[1.6rem] leading-none">2 gaps identified</h3>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-error-soft text-error">
            <CircleAlert className="size-4.5" aria-hidden="true" />
          </span>
        </div>

        <ul className="mt-5 list-none border-t border-line pl-0">
          {content.gaps.map((gap) => (
            <li className="result-item flex items-start gap-2.5 border-b border-line py-3 text-[.66rem] leading-[1.45]" aria-label={`Gap: ${gap}`} key={gap}>
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-error" />
              {gap}
            </li>
          ))}
        </ul>

        <div className="recommendation mt-4 rounded-[16px] bg-mint-soft p-4">
          <span className="font-mono text-[.5rem] uppercase tracking-[.09em] text-teal">Recommended review action</span>
          <p className="mt-2 mb-0 text-[.66rem] leading-[1.5] text-navy">{content.recommendation}</p>
        </div>
        <p className="mt-auto mb-0 pt-3 text-[.56rem] text-muted">Validate findings before taking action.</p>
      </div>
    </PhasePlane>
  );
}

export default function CyberSecuraSection({ content, motionEnabled }) {
  const panelRef = useRef(null);
  const timersRef = useRef([]);
  const inViewRef = useRef(false);
  const startCycleRef = useRef(null);
  const canPlay = motionEnabled && typeof IntersectionObserver !== 'undefined';
  const [phase, setPhase] = useState(canPlay ? 'scope' : 'result');

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const startCycle = useCallback(() => {
    clearTimers();
    if (!inViewRef.current) return;

    setPhase('scope');
    const resultStart = SECURA_REVIEW_DELAYS.scope + SECURA_REVIEW_DELAYS.reviewing;
    const cycleEnd = resultStart + SECURA_REVIEW_DELAYS.result;
    timersRef.current = [
      window.setTimeout(() => setPhase('reviewing'), SECURA_REVIEW_DELAYS.scope),
      window.setTimeout(() => setPhase('result'), resultStart),
      window.setTimeout(() => startCycleRef.current?.(), cycleEnd)
    ];
  }, [clearTimers]);

  useEffect(() => {
    startCycleRef.current = startCycle;
  }, [startCycle]);

  useEffect(() => {
    if (!canPlay) {
      clearTimers();
      setPhase('result');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        inViewRef.current = isVisible;

        if (isVisible) startCycleRef.current?.();
        if (!isVisible) {
          clearTimers();
          setPhase('result');
        }
      },
      { threshold: [0.45] }
    );

    observer.observe(panelRef.current);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [canPlay, clearTimers]);

  useEffect(() => {
    if (!canPlay || !panelRef.current) return undefined;

    const context = gsap.context(() => {
      const planes = gsap.utils.toArray('[data-secura-plane]');
      const target = panelRef.current.querySelector(`[data-secura-plane="${phase}"]`);
      gsap.set(planes, { autoAlpha: 0, y: 10 });

      const timeline = gsap.timeline({ defaults: { duration: 0.38, ease: 'power3.out' } });
      timeline.addLabel('enter').to(target, { autoAlpha: 1, y: 0 }, 'enter');

      if (phase === 'scope') {
        timeline.from('.scope-signal', { opacity: 0, x: -8, stagger: 0.06, duration: 0.26 }, 'enter+=0.05');
      }

      if (phase === 'reviewing') {
        timeline
          .fromTo('.review-progress', { scaleX: 0 }, { scaleX: 1, duration: 1.05, ease: 'power2.inOut' }, 'enter')
          .fromTo('.review-scan', { xPercent: -130 }, { xPercent: 620, duration: 1.1, ease: 'power1.inOut' }, 'enter')
          .fromTo('.review-pulse', { opacity: 0.35, scale: 0.85 }, { opacity: 1, scale: 1, repeat: 1, yoyo: true, duration: 0.4 }, 'enter');
      }

      if (phase === 'result') {
        timeline
          .from('.result-item', { opacity: 0, y: 6, stagger: 0.08, duration: 0.28 }, 'enter+=0.08')
          .from('.recommendation', { opacity: 0, scale: 0.98, duration: 0.32 }, '>-0.06');
      }
    }, panelRef);

    return () => context.revert();
  }, [canPlay, phase]);

  return (
    <section className="section overflow-hidden bg-navy text-white" aria-labelledby="cyber-secura-title">
      <div className="shell grid grid-cols-[.95fr_1.05fr] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-14">
        <div className="max-w-135">
          <p className="eyebrow text-mint">{content.eyebrow}</p>
          <h2 id="cyber-secura-title" className="text-white">{content.title}</h2>
          <p className="mt-6 mb-0 max-w-[56ch] text-[.96rem] leading-[1.72] text-[#b8c8d5]">{content.description}</p>
        </div>

        <div className="w-full max-w-[35rem] justify-self-center">
          <article
            ref={panelRef}
            aria-describedby="cyber-secura-summary"
            aria-label="Illustrative Secura control review"
            className="h-[32.5rem] w-full max-w-[35rem] overflow-hidden rounded-[26px] border border-white/14 bg-white text-navy shadow-form max-[520px]:h-[36rem]"
            data-phase={phase}
          >
            <header className="flex h-15 items-center justify-between gap-3 border-b border-line px-5 max-[520px]:px-4">
              <div className="flex min-w-0 items-center gap-3">
                <SecuraMark className="size-8 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[.7rem] font-medium text-navy">Secura control review</span>
                  <span className="mt-0.5 block font-mono text-[.46rem] uppercase tracking-[.09em] text-muted">Illustrative product view</span>
                </div>
              </div>

              <div aria-hidden="true" className="flex items-center gap-1.5">
                {PHASES.map((item) => (
                  <span className="relative h-1.5 w-5 overflow-hidden rounded-full bg-line" key={item}>
                    <span className={`absolute inset-0 origin-left rounded-full bg-teal transition-transform duration-300 ${item === phase ? 'scale-x-100' : 'scale-x-[.3]'}`} />
                  </span>
                ))}
              </div>
            </header>

            <p className="sr-only" id="cyber-secura-summary">
              Illustrative Secura review of an access control. The result identifies two gaps and requires validation before action.
            </p>

            <div className="grid h-[calc(100%-3.75rem)] grid-cols-[.82fr_1.18fr] max-[520px]:grid-cols-1 max-[520px]:grid-rows-[10.5rem_1fr]">
              <ScopeLedger sources={content.sources} />
              <div className="relative min-h-0 overflow-hidden bg-white">
                <ScopePlane active={phase === 'scope'} />
                <ReviewingPlane active={phase === 'reviewing'} />
                <ResultPlane active={phase === 'result'} content={content} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
