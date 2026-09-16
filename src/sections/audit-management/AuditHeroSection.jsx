import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowDown, ClipboardText, FileText, FileXls, Stack, UsersThree } from '@phosphor-icons/react';
import WaveDivider from '../../components/WaveDivider';

export default function AuditHeroSection({ content, motionEnabled }) {
  const sceneRef = useRef(null);
  const sceneVisible = useInView(sceneRef, { amount: 0.1 });
  const titleLead = content.title.replace(content.titleAccent, '').trim();

  return (
    <section data-motion={motionEnabled && sceneVisible ? 'animated' : 'static'} className="audit-hero relative -mt-25 overflow-hidden bg-mist pb-32 pt-40 max-[760px]:pb-20 max-[760px]:pt-39">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(38,216,173,.12),transparent_34%)]" />
      <div className="shell relative z-3 grid min-h-145 grid-cols-[.88fr_1.12fr] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-12 max-[760px]:min-h-0">
        <motion.div
          className="min-[1081px]:pb-12"
          initial={motionEnabled ? { opacity: 0, transform: 'translateY(16px)' } : false}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="eyebrow mb-5">{content.eyebrow}</p>
          <h1 className="max-w-165 text-balance text-[clamp(3.15rem,4vw,3.35rem)] leading-[1.06] max-[760px]:text-4xl max-[360px]:text-[2rem]! max-[360px]:text-pretty" aria-label={content.title}>
            <span className="block">{titleLead} </span>
            <span className="hero-title-accent block">{content.titleAccent}</span>
          </h1>
          <p className="lede mt-6 max-w-145 text-pretty">{content.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className="button button--mint" to="/demo">Request a demo</Link>
            <a className="button button--ghost flex items-center gap-2" href="#audit-workspace">
              Explore the workspace <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </motion.div>

        <motion.figure
          ref={sceneRef}
          initial={motionEnabled ? { opacity: 0, transform: 'translateY(16px)' } : false}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5, delay: motionEnabled ? 0.07 : 0, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto w-full max-w-[590px] min-w-0"
          aria-label="Representative audit review showing framework scope, a control with linked policy and evidence records, auditor assignments, and framework export context"
        >
          <div aria-hidden="true" className="audit-hero-orbit pointer-events-none absolute -inset-12 rounded-[50%] border border-teal/15 max-[760px]:hidden" />
          <div aria-hidden="true" className="audit-hero-orbit audit-hero-orbit--inner pointer-events-none absolute inset-8 rounded-[50%] border border-mint/20 max-[760px]:hidden" />
          <div aria-hidden="true" className="audit-hero-workspace audit-hero-sculpture relative z-1 overflow-visible">
            <div className="audit-hero-map relative z-1 min-h-[450px] p-5 max-[600px]:min-h-0 max-[600px]:p-4">
              <div className="audit-hero-map__orbit pointer-events-none absolute inset-5 rounded-[50%]" aria-hidden="true">
                <span className="audit-hero-satellite audit-hero-satellite--scope" />
                <span className="audit-hero-satellite audit-hero-satellite--records" />
                <span className="audit-hero-satellite audit-hero-satellite--auditors" />
                <span className="audit-hero-satellite audit-hero-satellite--export" />
              </div>
              <svg className="audit-hero-connectors pointer-events-none absolute inset-0 size-full" viewBox="0 0 620 410" preserveAspectRatio="none" aria-hidden="true">
                <path d="M310 196 C226 112 166 96 106 118" />
                <path d="M310 196 C400 108 472 98 524 126" />
                <path d="M310 196 C214 258 148 294 116 338" />
                <path d="M310 196 C410 260 468 294 514 338" />
              </svg>

              <div className="audit-hero-core absolute left-1/2 top-[43%] z-3 -translate-x-1/2 -translate-y-1/2 max-[600px]:relative max-[600px]:left-auto max-[600px]:top-auto max-[600px]:mb-4 max-[600px]:translate-x-0 max-[600px]:translate-y-0">
                <div className="audit-hero-core__ring" />
                <div className="audit-hero-core__mark">
                  <img src="/assets/emblemLogo.svg" alt="" className="size-7" />
                </div>
                <span className="audit-hero-core__label">
                  <small>Selected control</small>
                  <strong>Access review control</strong>
                </span>
              </div>

              <div className="audit-hero-node audit-hero-node--scope">
                <div className="flex items-center gap-2 font-mono text-[.58rem] uppercase tracking-[.1em] text-teal-ink">
                  <Stack className="size-3.5" />
                  Framework scope
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[.64rem] font-medium text-teal-ink">SOC 2 · In scope</span>
                  <span className="rounded-full bg-field px-2.5 py-1 text-[.64rem] text-muted">ISO/IEC 27001</span>
                </div>
              </div>

              <div className="audit-hero-node audit-hero-node--records">
                <div className="flex items-center gap-2 font-mono text-[.58rem] uppercase tracking-[.1em] text-teal-ink">
                  <FileText className="size-3.5" />
                  Linked control records
                </div>
                <div className="mt-3 grid gap-2">
                  <div className="flex items-center gap-2 rounded-[13px] bg-field px-3 py-2">
                    <FileText className="size-3.5 shrink-0 text-teal" />
                    <span className="min-w-0"><strong className="block text-[.7rem] font-medium">Access review policy</strong><small className="text-[.6rem] text-teal-ink">Effective date recorded</small></span>
                  </div>
                  <div className="flex items-center gap-2 rounded-[13px] bg-[#fff5e9] px-3 py-2">
                    <ClipboardText className="size-3.5 shrink-0 text-[#9b5b12]" />
                    <span className="min-w-0"><strong className="block text-[.7rem] font-medium">Access review evidence</strong><small className="text-[.6rem] text-[#8a4e08]">Linked to control</small></span>
                  </div>
                </div>
              </div>

              <div className="audit-hero-node audit-hero-node--auditors">
                <div className="flex items-center gap-2">
                  <UsersThree className="size-4 text-mint" />
                  <strong className="text-xs font-semibold">Auditor assignments</strong>
                </div>
                <div className="mt-3 grid gap-2 text-[.66rem]">
                  <div className="flex items-center justify-between gap-3"><small className="text-white/60">Internal audit framework</small><strong className="font-medium">Assigned</strong></div>
                  <div className="flex items-center justify-between gap-3"><small className="text-white/60">External audit framework</small><strong className="font-medium">Assigned</strong></div>
                </div>
              </div>

              <div className="audit-hero-node audit-hero-node--export">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-navy text-mint"><FileXls className="size-4" /></span>
                  <span>
                    <strong className="block text-xs font-semibold">Generate framework report</strong>
                    <small className="mt-1 block text-[.66rem] text-muted">XLSX framework export</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.figure>
      </div>
      <WaveDivider />
    </section>
  );
}
