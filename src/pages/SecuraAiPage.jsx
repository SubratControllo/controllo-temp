import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import BackgroundPixelStars from '../components/BackgroundPixelStars';
import PageMeta from '../components/PageMeta';
import SecuraMark from '../components/SecuraMark';
import SecuraHeroVisual from '../components/SecuraHeroVisual';
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

  return (
    <>
      <PageMeta title={securaAiMeta.title} description={securaAiMeta.description} />

      <section className="relative isolate -mt-25 min-h-svh overflow-hidden bg-navy pb-24 pt-48 text-white max-[1080px]:min-h-0 max-[1080px]:pt-44 max-[760px]:pb-18 max-[760px]:pt-40" aria-labelledby="secura-hero-title">
        <div className="pointer-events-none absolute inset-0 bg-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=')] bg-[size:10px] opacity-55" aria-hidden="true" />
        <BackgroundPixelStars motionEnabled={motionEnabled} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[70%] bg-[radial-gradient(circle_at_66%_44%,rgba(8,127,140,.27),transparent_62%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(6,27,50,.82))]" aria-hidden="true" />

        <div className="shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,.88fr)_minmax(33rem,1.12fr)] lg:gap-10">
          <div className="max-w-155">
            <div className="mb-6 flex items-center gap-3">
              <SecuraMark className="size-10" />
              <p className="eyebrow text-mint">{securaAiHero.eyebrow}</p>
            </div>
            <h1 id="secura-hero-title" className="max-w-150 text-wrap-balance text-[3.2rem] leading-[1.04] text-white max-[760px]:text-[2.65rem] max-[420px]:text-[2.35rem]">{securaAiHero.title}</h1>
            <p className="mt-6 mb-0 max-w-[59ch] text-[1rem] leading-7 text-[#c7d4de] text-wrap-pretty">{securaAiHero.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link className="button button--mint" to={securaAiHero.primaryAction.href}>{securaAiHero.primaryAction.label}</Link>
              <a className="group inline-flex min-h-11 items-center gap-2 text-[.82rem] font-medium text-white transition-colors hover:text-mint focus-visible:text-mint" href={securaAiHero.secondaryAction.href}>
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

      <section className="section bg-white" aria-labelledby="secura-context-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiContext.eyebrow}</p>
            <h2 id="secura-context-title" className="text-wrap-balance">{securaAiContext.title}</h2>
            <p className="lede mt-6 text-wrap-pretty">{securaAiContext.description}</p>
          </header>
          <ol className="grid list-none grid-cols-2 gap-6 p-0 max-[760px]:grid-cols-1" aria-label="Context Secura reviews">
            {securaAiContext.items.map(([title, description], index) => (
              <li className="rounded-2xl border border-line p-6" key={title}>
                <span className="font-mono text-sm text-teal">0{index + 1}</span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="mt-4 mb-0 text-base leading-6 text-muted">{description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 mb-0 rounded-2xl bg-mist p-6 text-center font-mono text-sm text-navy">{securaAiContext.highlight}</p>
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="secura-process-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiProcess.eyebrow}</p>
            <h2 id="secura-process-title" className="text-wrap-balance">{securaAiProcess.title}</h2>
            <p className="lede mt-6 text-wrap-pretty">{securaAiProcess.description}</p>
          </header>
          <ol className="grid list-none grid-cols-5 gap-4 p-0 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1" aria-label="How Secura works">
            {securaAiProcess.steps.map(([title, description], index) => (
              <li className="rounded-2xl border border-line bg-white p-6" key={title}>
                <span className="font-mono text-sm text-teal">0{index + 1}</span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-4 mb-0 text-sm leading-5 text-muted">{description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 mb-0 font-mono text-sm text-teal">{securaAiProcess.highlight}</p>
        </div>
      </section>

      <section className="section bg-navy text-white" id="secura-output" aria-labelledby="secura-output-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiOutput.eyebrow}</p>
            <h2 id="secura-output-title" className="text-wrap-balance">{securaAiOutput.title}</h2>
            <p className="mt-6 mb-0 max-w-165 text-lg leading-7 text-[#bbcad6] text-wrap-pretty">{securaAiOutput.description}</p>
          </header>
          <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
            <ol className="grid list-none gap-4 p-0" aria-label="Secura analysis output">
              {securaAiOutput.items.map(([title, description], index) => (
                <li className="rounded-2xl border border-white/10 bg-white/5 p-6" key={title}>
                  <span className="font-mono text-sm text-mint">0{index + 1}</span>
                  <h3 className="mt-4 text-xl text-white">{title}</h3>
                  <p className="mt-3 mb-0 text-sm leading-5 text-[#bbcad6]">{description}</p>
                </li>
              ))}
            </ol>
            <article className="rounded-2xl border border-mint/25 bg-white p-6 text-navy" aria-label={securaAiOutput.example.label}>
              <p className="font-mono text-xs uppercase tracking-widest text-teal">{securaAiOutput.example.label}</p>
              <h3 className="mt-4 text-2xl">{securaAiOutput.example.document}</h3>
              <dl className="mt-8 grid gap-6">
                <div><dt className="font-mono text-xs uppercase tracking-widest text-teal">Finding</dt><dd className="mt-2 ml-0 text-base leading-6">{securaAiOutput.example.finding}</dd></div>
                <div><dt className="font-mono text-xs uppercase tracking-widest text-teal">Why it matters</dt><dd className="mt-2 ml-0 text-base leading-6">{securaAiOutput.example.reason}</dd></div>
                <div><dt className="font-mono text-xs uppercase tracking-widest text-teal">Recommendation</dt><dd className="mt-2 ml-0 text-base leading-6">{securaAiOutput.example.recommendation}</dd></div>
              </dl>
            </article>
          </div>
          <p className="mt-10 mb-0 font-mono text-sm text-mint">{securaAiOutput.highlight}</p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="secura-value-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiValue.eyebrow}</p>
            <h2 id="secura-value-title" className="text-wrap-balance">{securaAiValue.title}</h2>
            <p className="lede mt-6 text-wrap-pretty">{securaAiValue.description}</p>
          </header>
          <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
            {[['Without Secura', securaAiValue.without], ['With Secura', securaAiValue.with]].map(([title, items]) => (
              <article className="rounded-2xl border border-line p-6" key={title}>
                <h3 className="text-2xl">{title}</h3>
                <ol className="mt-6 mb-0 grid gap-3 pl-6 text-base leading-6 text-muted">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </article>
            ))}
          </div>
          <dl className="mt-6 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {securaAiValue.differentiators.map(([title, description]) => (
              <div className="rounded-2xl bg-mist p-6" key={title}>
                <dt className="font-medium text-navy">{title}</dt>
                <dd className="mt-3 ml-0 text-sm leading-5 text-muted">{description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 mb-0 font-mono text-sm text-teal">{securaAiValue.highlight}</p>
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="secura-readiness-title">
        <div className="shell">
          <header className="section-heading">
            <p className="eyebrow">{securaAiReadiness.eyebrow}</p>
            <h2 id="secura-readiness-title" className="text-wrap-balance">{securaAiReadiness.title}</h2>
            <p className="lede mt-6 text-wrap-pretty">{securaAiReadiness.description}</p>
          </header>
          <div className="grid grid-cols-2 gap-8 max-[760px]:grid-cols-1">
            <ul className="m-0 grid gap-3 pl-6 text-base leading-6 text-muted">
              {securaAiReadiness.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
            <ol className="m-0 grid list-none gap-3 p-0" aria-label="Review readiness workflow">
              {securaAiReadiness.workflow.map((step, index) => (
                <li className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4" key={step}>
                  <span className="font-mono text-sm text-teal">0{index + 1}</span>
                  <span className="font-medium text-navy">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-10 mb-0 rounded-2xl bg-navy p-6 text-base leading-6 text-white">{securaAiReadiness.boundary}</p>
        </div>
      </section>

      <section className="section bg-teal text-white" aria-labelledby="secura-closing-title">
        <div className="shell">
          <p className="eyebrow text-mint">{securaAiClosing.eyebrow}</p>
          <h2 id="secura-closing-title" className="text-wrap-balance">{securaAiClosing.title}</h2>
          <p className="mt-6 mb-0 max-w-165 text-lg leading-7 text-white text-wrap-pretty">{securaAiClosing.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button button--light" to={securaAiClosing.primaryAction.href}>{securaAiClosing.primaryAction.label}</Link>
            <a className="button button--ghost text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.28)]" href={securaAiClosing.secondaryAction.href}>{securaAiClosing.secondaryAction.label}</a>
          </div>
          <p className="mt-6 mb-0 font-mono text-sm text-white">{securaAiClosing.supportingLine}</p>
        </div>
      </section>
    </>
  );
}
