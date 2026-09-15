import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowDown, ClipboardText, FileText, FileXls, ListChecks, LockKey, SquaresFour, Stack, UsersThree } from '@phosphor-icons/react';
import WaveDivider from '../../components/WaveDivider';

export default function AuditHeroSection({ content, motionEnabled }) {
  const sceneRef = useRef(null);
  const sceneVisible = useInView(sceneRef, { amount: 0.1 });

  return (
    <section data-motion={motionEnabled && sceneVisible ? 'animated' : 'static'} className="audit-hero relative -mt-25 overflow-hidden bg-mist pb-32 pt-40 max-[760px]:pb-20 max-[760px]:pt-39">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(38,216,173,.12),transparent_34%)]" />
      <div className="shell relative z-3 grid min-h-145 grid-cols-[.88fr_1.12fr] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-12 max-[760px]:min-h-0">
        <motion.div
          initial={motionEnabled ? { opacity: 0, transform: 'translateY(16px)' } : false}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="eyebrow mb-5">{content.eyebrow}</p>
          <h1 className="max-w-165 text-balance text-5xl leading-[1.08] max-[760px]:text-4xl max-[360px]:text-[2rem]! max-[360px]:text-pretty">{content.title}</h1>
          <p className="lede mt-6 max-w-145 text-pretty">{content.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className="button button--mint" to="/demo">Request a demo</Link>
            <a className="button button--ghost flex items-center gap-2" href="#audit-workspace">
              Explore the workspace <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
          <p className="mt-7 max-w-140 font-mono text-[.68rem] leading-6 text-muted">{content.supporting}</p>
        </motion.div>

        <motion.figure
          ref={sceneRef}
          initial={motionEnabled ? { opacity: 0, transform: 'translateY(16px)' } : false}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5, delay: motionEnabled ? 0.07 : 0, ease: [0.23, 1, 0.32, 1] }}
          className="relative -ml-[4%] w-[104%] min-w-0 max-[1080px]:mx-auto max-[1080px]:w-full max-[1080px]:max-w-[720px]"
          aria-label="Representative audit review showing framework scope, a control with linked policy and evidence records, auditor assignments, and framework export context"
        >
          <div aria-hidden="true" className="audit-hero-orbit pointer-events-none absolute -inset-12 rounded-[50%] border border-teal/15 max-[760px]:hidden" />
          <div aria-hidden="true" className="absolute inset-x-6 top-15 bottom-20 rotate-[3deg] rounded-[28px] border border-teal/12 bg-mint-soft/30 shadow-[0_24px_64px_rgba(6,27,50,.05)] max-[760px]:inset-x-2 max-[760px]:bottom-4" />

          <div aria-hidden="true" className="relative z-2 -mx-5 grid grid-cols-2 gap-4 max-[760px]:mx-0 max-[600px]:grid-cols-1">
            <div className="audit-hero-float-card relative flex translate-y-5 items-center gap-3 rounded-[18px] border border-navy/10 bg-white px-4 py-4 max-[600px]:translate-y-0">
              <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-mint-soft/60 text-teal"><FileText weight="duotone" className="size-6" /></span>
              <span className="min-w-0"><strong className="block text-[.74rem] font-semibold">Linked control records</strong><small className="block text-[.66rem] text-muted">Policy file · Evidence file</small></span>
            </div>
            <div className="audit-hero-float-card relative flex translate-y-5 items-center gap-3 rounded-[18px] border border-navy/10 bg-white px-4 py-4 max-[600px]:translate-y-0">
              <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-mint-soft/60 text-teal"><Stack weight="duotone" className="size-6" /></span>
              <span className="min-w-0"><strong className="block text-[.74rem] font-semibold">Framework scope</strong><small className="block text-[.66rem] text-muted">SOC 2 · ISO/IEC 27001</small></span>
            </div>
          </div>

          <div aria-hidden="true" className="audit-hero-workspace relative z-1 mr-5 mt-2 overflow-hidden rounded-[26px] border border-navy/10 bg-white shadow-[0_28px_72px_rgba(6,27,50,.18)] max-[760px]:mr-2 max-[600px]:mt-3">
            <div className="flex min-w-0">
              <div data-testid="audit-hero-sidebar" className="flex w-14 shrink-0 flex-col items-center gap-3 border-r border-white/10 bg-navy-soft px-2 pt-5 max-[440px]:w-10 max-[440px]:px-1 max-[440px]:pt-4">
                <img src="/assets/emblemLogo.svg" alt="" className="mb-5 size-6 max-[440px]:size-5" />
                <span className="grid size-9 place-items-center rounded-[10px] text-white/55 max-[440px]:size-8"><SquaresFour className="size-4" /></span>
                <span className="grid size-9 place-items-center rounded-[10px] text-white/55 max-[440px]:size-8"><Stack className="size-4" /></span>
                <span className="grid size-9 place-items-center rounded-[10px] text-white/55 max-[440px]:size-8"><ListChecks className="size-4" /></span>
                <span className="grid size-9 place-items-center rounded-[10px] bg-mint text-navy max-[440px]:size-8"><ClipboardText weight="fill" className="size-4" /></span>
                <span className="grid size-9 place-items-center rounded-[10px] text-white/55 max-[440px]:size-8"><FileText className="size-4" /></span>
                <span className="grid size-9 place-items-center rounded-[10px] text-white/55 max-[440px]:size-8"><FileXls className="size-4" /></span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4 bg-navy px-6 py-4 text-white max-[760px]:px-4 max-[440px]:flex-wrap">
                  <span className="min-w-0">
                    <strong className="block text-sm font-semibold">Audit review workspace</strong>
                    <small className="mt-0.5 block text-[.68rem] text-white/70">Framework scope and supporting records</small>
                  </span>
                  <span className="shrink-0 font-mono text-[.6rem] uppercase tracking-[.1em] text-mint max-[440px]:w-full max-[440px]:text-right">Review in progress</span>
                </div>

                <div className="grid grid-cols-3 border-b border-line bg-field max-[440px]:grid-cols-1">
                  <div className="flex items-center gap-3 border-r border-line px-5 py-3 max-[760px]:px-3 max-[440px]:border-b max-[440px]:border-r-0">
                    <Stack className="size-4 shrink-0 text-teal" />
                    <span><small className="block font-mono text-[.55rem] uppercase tracking-[.08em] text-muted">Scope</small><strong className="block text-[.68rem] font-medium">Frameworks in review</strong></span>
                  </div>
                  <div className="flex items-center gap-3 border-r border-line px-5 py-3 max-[760px]:px-3 max-[440px]:border-b max-[440px]:border-r-0">
                    <FileText className="size-4 shrink-0 text-teal" />
                    <span><small className="block font-mono text-[.55rem] uppercase tracking-[.08em] text-muted">Records</small><strong className="block text-[.68rem] font-medium">Policy and evidence</strong></span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 max-[760px]:px-3">
                    <UsersThree className="size-4 shrink-0 text-teal" />
                    <span><small className="block font-mono text-[.55rem] uppercase tracking-[.08em] text-muted">Reviewers</small><strong className="block text-[.68rem] font-medium">Internal and external</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 max-[600px]:grid-cols-1">
                  <div className="border-r border-line px-6 py-5 max-[760px]:px-4 max-[600px]:border-b max-[600px]:border-r-0">
                    <span className="font-mono text-[.6rem] uppercase tracking-[.1em] text-teal-ink">Audit scope</span>
                    <div className="mt-4 divide-y divide-line">
                      <div className="flex items-center justify-between gap-2 pb-4 max-[440px]:flex-wrap">
                        <strong className="text-xs font-medium">SOC 2</strong>
                        <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[.64rem] font-medium text-teal-ink">In scope</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-4 max-[440px]:flex-wrap">
                        <strong className="text-xs font-medium">ISO/IEC 27001</strong>
                        <span className="rounded-full bg-field px-2.5 py-1 text-[.64rem] text-muted">Also in review</span>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 px-6 py-5 max-[760px]:px-4">
                    <span className="font-mono text-[.6rem] uppercase tracking-[.1em] text-teal-ink">Linked review context</span>
                    <div className="mt-4 divide-y divide-line">
                      <div className="flex items-center gap-3 pb-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-mint-soft text-teal"><FileText className="size-4" /></span>
                        <span className="min-w-0"><small className="block text-[.64rem] text-muted">Policy and procedure</small><strong className="block text-xs font-medium">Access review policy</strong><small className="block text-[.62rem] text-teal-ink">Linked to control</small></span>
                      </div>
                      <div className="flex items-center gap-3 pt-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-[#fff5e9] text-[#9b5b12]"><ClipboardText className="size-4" /></span>
                        <span className="min-w-0"><small className="block text-[.64rem] text-muted">Evidence record</small><strong className="block text-xs font-medium">Access review evidence</strong><small className="block text-[.62rem] text-[#8a4e08]">File in review</small></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-field px-6 py-3 max-[760px]:px-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-mint-soft text-teal"><LockKey className="size-4" /></span>
                    <span className="min-w-0"><small className="block font-mono text-[.58rem] uppercase tracking-[.08em] text-teal-ink">Selected control</small><strong className="block text-xs font-medium">Access review control</strong><small className="block text-[.64rem] text-muted">Supporting records stay visible with the control</small></span>
                  </div>
                  <span className="text-[.64rem] text-teal-ink">Next review · Confirm current-period evidence</span>
                </div>

                <div className="flex items-center gap-2 border-t border-line bg-field px-6 py-2.5 text-[.68rem] text-muted max-[760px]:px-4">
                  <FileXls className="size-3.5 text-teal" />
                  <span>XLSX framework export</span>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="relative z-2 -mx-5 -mt-10 flex items-end justify-between gap-3 max-[760px]:mx-0 max-[760px]:mt-3 max-[760px]:flex-col">
            <div className="audit-hero-float-card flex w-[245px] items-center gap-3 rounded-[18px] border border-navy/10 bg-white px-4 py-4 max-[760px]:w-full">
              <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-mint-soft/60 text-teal"><FileXls weight="duotone" className="size-6" /></span>
              <span><strong className="block text-[.74rem] font-semibold">Generate framework report</strong><small className="block text-[.66rem] text-muted">XLSX export</small></span>
            </div>
            <div className="audit-hero-float-card--dark w-[340px] rounded-[18px] border border-white/15 bg-navy px-5 py-3 text-white max-[760px]:mr-2 max-[760px]:w-full">
              <div className="flex items-center gap-2">
                <UsersThree className="size-4 text-mint" />
                <strong className="text-xs font-semibold">Auditor assignments</strong>
              </div>
              <div className="mt-2 divide-y divide-white/15">
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 pb-2 max-[440px]:grid-cols-1 max-[440px]:gap-0.5">
                  <small className="text-[.64rem] text-white/60">Internal audit framework</small>
                  <strong className="text-[.68rem] font-medium">Assigned</strong>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 pt-2 max-[440px]:grid-cols-1 max-[440px]:gap-0.5">
                  <small className="text-[.64rem] text-white/60">External audit framework</small>
                  <strong className="text-[.68rem] font-medium">Assigned</strong>
                </div>
              </div>
            </div>
          </div>

          <figcaption className="mt-3 text-right font-mono text-[.6rem] uppercase tracking-[.08em] text-muted max-[760px]:mr-2">Representative product view · Not customer data</figcaption>
        </motion.figure>
      </div>
      <WaveDivider />
    </section>
  );
}
