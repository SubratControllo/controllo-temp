import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Gauge, Stack, UserCircleCheck } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import HeroEditorialText from '../../components/HeroEditorialText';
import WaveDivider from '../../components/WaveDivider';

const stages = ['AI system', 'Accountable owner', 'Risk assessment', 'Framework context'];

function GovernanceCurrentCanvas({ content, motionEnabled }) {
  const figureRef = useRef(null);
  const canAnimate = motionEnabled && typeof IntersectionObserver !== 'undefined';

  useLayoutEffect(() => {
    if (!canAnimate || !figureRef.current) return undefined;

    let observer;
    let isVisible = false;
    let entranceComplete = false;

    const context = gsap.context(() => {
      const surface = figureRef.current.querySelector('[data-current-surface]');
      const basePath = figureRef.current.querySelector('[data-current-path]');
      const signalPath = figureRef.current.querySelector('[data-current-signal]');
      const mobileSignal = figureRef.current.querySelector('[data-current-mobile-signal]');
      const stageElements = gsap.utils.toArray('[data-current-stage]');
      const responseElements = gsap.utils.toArray('[data-current-response]');

      gsap.set(surface, { autoAlpha: 0, y: 18, scale: 0.97, transformOrigin: '50% 50%' });
      gsap.set(stageElements, { autoAlpha: 0, y: 14, scale: 0.985, transformOrigin: '50% 50%' });
      gsap.set(basePath, { attr: { 'stroke-dasharray': 1, 'stroke-dashoffset': 1 } });
      gsap.set(signalPath, { autoAlpha: 0, attr: { 'stroke-dashoffset': 1 } });
      gsap.set(mobileSignal, { autoAlpha: 0, top: '0%' });

      const liveCurrent = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.8 });
      liveCurrent
        .set(signalPath, { autoAlpha: 1, attr: { 'stroke-dashoffset': 1 } })
        .to(signalPath, { attr: { 'stroke-dashoffset': -1 }, duration: 4.4, ease: 'none' })
        .to(signalPath, { autoAlpha: 0, duration: 0.28 }, '-=0.28');
      liveCurrent
        .set(mobileSignal, { autoAlpha: 1, top: '0%' }, 0)
        .to(mobileSignal, { top: '100%', duration: 4.4, ease: 'none' }, 0)
        .to(mobileSignal, { autoAlpha: 0, duration: 0.28 }, 4.12);

      responseElements.forEach((element, index) => {
        const position = 0.35 + index * 1.05;
        liveCurrent
          .to(element, { scale: 1.025, duration: 0.2, ease: 'power2.out' }, position)
          .to(element, { scale: 1, duration: 0.34, ease: 'power2.out' }, position + 0.2);
      });

      const entrance = gsap.timeline({
        paused: true,
        onComplete: () => {
          entranceComplete = true;
          if (isVisible) liveCurrent.restart(true);
        },
      });

      entrance
        .to(surface, { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: 'power3.out' })
        .to(basePath, { attr: { 'stroke-dashoffset': 0 }, duration: 1.05, ease: 'power2.inOut' }, '-=0.24')
        .to(stageElements, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.13,
          ease: 'power3.out',
        }, '-=0.8');

      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
          if (isVisible) {
            if (entranceComplete) liveCurrent.play();
            else entrance.play();
          } else {
            entrance.pause();
            liveCurrent.pause();
          }
        },
        { threshold: [0, 0.25] },
      );
      observer.observe(figureRef.current);
    }, figureRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, [canAnimate]);

  return (
    <figure
      ref={figureRef}
      aria-label="AI governance current canvas"
      data-motion-state={motionEnabled ? 'live' : 'settled'}
      className="relative isolate min-w-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[44px] bg-[radial-gradient(circle_at_62%_50%,rgba(38,216,173,.18),transparent_62%)] blur-xl"
      />

      <div
        data-current-surface
        className="relative overflow-hidden rounded-[30px] border border-white/10 bg-navy p-4 text-white shadow-[0_30px_90px_rgba(6,27,50,.24)] sm:p-5"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(38,216,173,.16),transparent_35%),linear-gradient(145deg,rgba(255,255,255,.035),transparent_54%)]" />
        <img alt="" aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-24 w-80 opacity-[.035]" src="/assets/emblemLogo.svg" />

        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-1 pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mint/25 bg-white/5">
              <img alt="" aria-hidden="true" className="h-5 w-auto" src="/assets/emblemLogo.svg" />
            </span>
            <div className="min-w-0">
              <figcaption className="font-mono text-[.66rem] tracking-[.14em] uppercase text-mint">
                <span className="sm:hidden">Product view</span>
                <span className="hidden sm:inline">{content.dossier.label}</span>
              </figcaption>
              <p className="mt-1 text-xs text-white/55">Governance current</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-3 py-1.5 text-[.68rem] font-medium text-mint-soft">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(38,216,173,.9)]" />
            Context connected
          </span>
        </div>

        <div className="relative mt-4 min-h-0 md:min-h-[28rem]">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden size-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 600 448"
          >
            <path
              d="M 165 116 C 265 104, 330 58, 424 82 S 540 170, 474 230 S 364 299, 404 354 S 326 410, 238 378"
              fill="none"
              pathLength="1"
              stroke="rgba(191,244,232,.16)"
              strokeLinecap="round"
              strokeWidth="14"
            />
            <path
              data-current-path
              d="M 165 116 C 265 104, 330 58, 424 82 S 540 170, 474 230 S 364 299, 404 354 S 326 410, 238 378"
              fill="none"
              pathLength="1"
              stroke="rgba(38,216,173,.44)"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <path
              data-current-signal
              d="M 165 116 C 265 104, 330 58, 424 82 S 540 170, 474 230 S 364 299, 404 354 S 326 410, 238 378"
              fill="none"
              pathLength="1"
              stroke="rgb(191,244,232)"
              strokeDasharray=".065 .935"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>

          <div aria-hidden="true" className="absolute top-5 bottom-5 left-1 md:hidden">
            <span className="absolute inset-y-0 left-0 w-px bg-mint/25" />
            <span data-current-mobile-signal className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_14px_rgba(38,216,173,.95)]" />
          </div>

          <ol aria-label="Governance current stages" className="relative grid list-none gap-3 pl-4 md:absolute md:inset-0 md:block md:pl-0">
            <li data-current-stage className="md:absolute md:top-4 md:left-2 md:w-[55%]">
              <div data-current-response className="relative overflow-hidden rounded-[22px] border border-white/15 bg-white p-5 text-navy shadow-[0_20px_48px_rgba(0,0,0,.2)] sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[.64rem] tracking-[.14em] uppercase text-teal">{stages[0]}</p>
                    <h2 className="mt-3 max-w-xs text-[1.4rem] leading-[1.12] text-navy sm:text-[1.55rem]">{content.dossier.system}</h2>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-[.65rem] font-medium text-navy">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
                    {content.dossier.status}
                  </span>
                </div>
                <div className="mt-5 border-t border-navy/10 pt-4">
                  <p className="text-[.65rem] text-muted">Purpose</p>
                  <p className="mt-1 text-sm leading-5 text-navy">{content.dossier.purpose}</p>
                </div>
              </div>
            </li>

            <li data-current-stage className="md:absolute md:top-2 md:right-2 md:w-[31%]">
              <div data-current-response className="rounded-[18px] border border-white/15 bg-white/9 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-mint">
                  <UserCircleCheck aria-hidden="true" className="size-4" weight="regular" />
                  <p className="font-mono text-[.6rem] tracking-[.1em] uppercase">{stages[1]}</p>
                </div>
                <p className="mt-3 text-sm font-medium text-white">{content.dossier.owner}</p>
                <p className="mt-1 text-[.68rem] text-white/48">Responsibility visible</p>
              </div>
            </li>

            <li data-current-stage className="md:absolute md:top-[11.1rem] md:right-1 md:w-[40%] xl:w-[38%]">
              <div data-current-response className="ai-current-risk-card rounded-[20px] border border-mint/25 bg-mint-soft p-4 text-navy shadow-[0_18px_48px_rgba(0,0,0,.16)] lg:p-3 xl:p-5">
                <div className="flex items-center gap-2 text-teal">
                  <Gauge aria-hidden="true" className="size-4" weight="regular" />
                  <p className="font-mono text-[.62rem] tracking-[.11em] uppercase">{stages[2]}</p>
                </div>
                <dl className="ai-current-risk-values mt-4 grid grid-cols-2">
                  <div>
                    <dt className="text-[.65rem] text-navy/55">Likelihood</dt>
                    <dd className="ai-current-risk-value mt-1 font-medium">{content.dossier.likelihood}</dd>
                  </div>
                  <div>
                    <dt className="text-[.65rem] text-navy/55">Impact</dt>
                    <dd className="ai-current-risk-value mt-1 font-medium">{content.dossier.impact}</dd>
                  </div>
                </dl>
              </div>
            </li>

            <li data-current-stage className="md:absolute md:right-2 md:bottom-4 md:w-[64%] xl:right-8 xl:w-[58%]">
              <div data-current-response className="ai-current-framework-card rounded-[20px] border border-white/15 bg-[#102d48]/95 p-4 shadow-[0_18px_46px_rgba(0,0,0,.2)] backdrop-blur-sm lg:p-3 xl:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-mint">
                    <Stack aria-hidden="true" className="size-4" weight="regular" />
                    <p className="font-mono text-[.62rem] tracking-[.11em] uppercase">{stages[3]}</p>
                  </div>
                  <span className="hidden text-[.65rem] text-white/45 xl:inline">Readiness lens</span>
                </div>
                <ul aria-label="Framework context" className="mt-4 flex flex-wrap gap-1.5 lg:mt-3 xl:gap-2">
                  {content.dossier.frameworkContext.map((framework) => (
                    <li className="rounded-full border border-white/15 bg-white/7 px-2 py-1 text-[.6rem] text-white/82 xl:px-2.5 xl:py-1.5 xl:text-[.66rem]" key={framework}>
                      {framework}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </figure>
  );
}

export default function AiHeroSection({ content, motionEnabled }) {
  return (
    <section aria-label={content.eyebrow} className="ai-governance-hero relative isolate flex min-h-[calc(100svh-5.25rem)] items-center overflow-hidden bg-mist pt-14 pb-44 max-[760px]:pb-56">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(38,216,173,.11),transparent_33%)]" />
      <img alt="" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-[2%] w-[38rem] -translate-y-1/2 opacity-[.025] max-lg:w-[28rem]" src="/assets/emblemLogo.svg" />

      <div className="ai-governance-hero-layout shell relative">
        <div className="max-w-2xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 aria-label={content.title} className="mt-5 text-balance">
            <HeroEditorialText accent={content.titleAccent} title={content.title} />
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-ink/72">{content.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {content.actions.map((action) => (
              <Link className={`button ${action.variant === 'primary' ? 'button--directional' : 'button--ghost'}`} to={action.to} key={action.to}>
                {action.label}
                {action.variant === 'primary' && <ArrowRight aria-hidden="true" weight="bold" />}
              </Link>
            ))}
          </div>
        </div>

        <GovernanceCurrentCanvas content={content} motionEnabled={motionEnabled} />
      </div>
      <WaveDivider />
    </section>
  );
}
