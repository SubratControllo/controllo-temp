import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import BackgroundPixelStars from '../components/BackgroundPixelStars';
import PageMeta from '../components/PageMeta';
import SecuraContextSection from '../components/SecuraContextSection';
import SecuraCtaSection from '../components/SecuraCtaSection';
import SecuraMark from '../components/SecuraMark';
import SecuraHeroVisual from '../components/SecuraHeroVisual';
import SecuraOutputDossier from '../components/SecuraOutputDossier';
import SecuraReadinessSection from '../components/SecuraReadinessSection';
import SecuraReviewFlow from '../components/SecuraReviewFlow';
import SecuraWorkloadTransform from '../components/SecuraWorkloadTransform';
import { useSiteMotion } from '../context/MotionContext';
import {
  securaAiClosing,
  securaAiContext,
  securaAiHero,
  securaAiMeta,
  securaAiOutput,
  securaAiProcess,
  securaAiReadiness,
  securaAiValue,
} from '../data/securaAiContent';

export default function SecuraAiPage() {
  const { motionEnabled } = useSiteMotion();
  const heroTitleLead = securaAiHero.title.replace(securaAiHero.titleAccent, '').trim();

  return (
    <>
      <PageMeta title={securaAiMeta.title} description={securaAiMeta.description} />

      <section className="relative isolate -mt-25 min-h-svh overflow-hidden bg-navy pb-24 pt-48 text-white max-[1080px]:min-h-0 max-[1080px]:pt-44 max-[760px]:pb-18 max-[760px]:pt-40" aria-labelledby="secura-hero-title">
        <div className="pointer-events-none absolute inset-0 bg-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=')] bg-[size:10px] opacity-55" aria-hidden="true" />
        <BackgroundPixelStars motionEnabled={motionEnabled} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[70%] bg-[radial-gradient(circle_at_66%_44%,rgba(8,127,140,.27),transparent_62%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(6,27,50,.82))]" aria-hidden="true" />

        <div className="shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,.88fr)_minmax(33rem,1.12fr)] lg:gap-10">
          <div className="max-w-[620px]">
            <div className="mb-5 flex items-center gap-2">
              <SecuraMark className="size-8 shrink-0" />
              <p className="eyebrow mb-0 text-mint">{securaAiHero.eyebrow}</p>
            </div>
            <h1 id="secura-hero-title" className="max-w-[690px] text-balance text-[3rem] leading-[1.04] text-white min-[760px]:text-[3.45rem] min-[1180px]:text-[3.65rem] max-[420px]:text-[2.6rem]" aria-label={securaAiHero.title}>
              <span className="block">{heroTitleLead}</span>
              <span className="block">{securaAiHero.titleAccent}</span>
            </h1>
            <p className="lede mt-6 max-w-[560px] text-pretty text-[#c7d4de]">{securaAiHero.description}</p>
            <div className="action-row mt-8 max-[460px]:grid">
              <Link className="button button--mint" to={securaAiHero.primaryAction.href}>{securaAiHero.primaryAction.label}</Link>
              <a className="button button--ghost group text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.28)] hover:!bg-transparent hover:!text-white focus-visible:!bg-transparent focus-visible:!text-white" href={securaAiHero.secondaryAction.href}>
                {securaAiHero.secondaryAction.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
              </a>
            </div>
            <p className="mt-7 mb-0 flex items-center gap-2 font-mono text-[.66rem] leading-5 text-mint">
              <span className="size-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
              {securaAiHero.supportingLine}
            </p>
          </div>

          <div className="relative w-full max-w-175 justify-self-end [perspective:1600px] [perspective-origin:62%_46%] lg:translate-y-3">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-teal/12 blur-3xl" aria-hidden="true" />
            <SecuraHeroVisual motionEnabled={motionEnabled} />
          </div>
        </div>
      </section>

      <SecuraContextSection content={securaAiContext} motionEnabled={motionEnabled} />

      <SecuraReviewFlow content={securaAiProcess} motionEnabled={motionEnabled} />

      <section className="section bg-navy text-white" id="secura-output" aria-labelledby="secura-output-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiOutput.eyebrow}</p>
            <h2 id="secura-output-title" className="text-wrap-balance">{securaAiOutput.title}</h2>
            <p className="mt-6 mb-0 max-w-165 text-lg leading-7 text-[#bbcad6] text-wrap-pretty">{securaAiOutput.description}</p>
          </header>
          <SecuraOutputDossier content={securaAiOutput} motionEnabled={motionEnabled} />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="secura-value-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiValue.eyebrow}</p>
            <h2 id="secura-value-title" className="text-wrap-balance">{securaAiValue.title}</h2>
            <p className="lede mt-6 text-wrap-pretty">{securaAiValue.description}</p>
          </header>
          <SecuraWorkloadTransform content={securaAiValue} motionEnabled={motionEnabled} />
        </div>
      </section>

      <SecuraReadinessSection content={securaAiReadiness} motionEnabled={motionEnabled} />

      <SecuraCtaSection content={securaAiClosing} motionEnabled={motionEnabled} />
    </>
  );
}
