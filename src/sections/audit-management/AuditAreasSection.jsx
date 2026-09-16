import { ClipboardText, DownloadSimple, FileText, FolderOpen, LinkSimple, ShieldCheck, UsersThree } from '@phosphor-icons/react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import Reveal from '../../components/Reveal';
import { getAuditDossierStep } from './auditDossierStep';

const icons = [FolderOpen, FileText, ClipboardText, UsersThree];

function DossierCorner({ label, value, detail, className = '' }) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[.055] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] ${className}`}>
      <span className="block font-mono text-[.55rem] uppercase tracking-[.08em] text-white/45">{label}</span>
      <strong className="mt-1 block truncate text-sm font-medium text-white">{value}</strong>
      <span className="mt-1 block truncate text-xs text-white/56">{detail}</span>
    </div>
  );
}

export default function AuditAreasSection({ areas, motionEnabled = true }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(() => (motionEnabled ? 0 : Math.max(areas.length - 1, 0)));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const activeStep = activeIndex;
  const activeArea = areas[activeStep] || areas[0];
  const activeDossier = activeArea.dossier || {};
  const dossierType = activeDossier.type;
  const headerBadge = activeDossier.type === 'auditor' ? activeArea.badge : activeDossier.badge || activeArea.badge || activeArea.cue;
  const linkedControls = activeDossier.linkedControls || activeDossier.controls?.map((control) => control.code) || [];
  const dossierViewLabel = {
    scope: 'Scope',
    policy: 'Policy',
    evidence: 'Evidence',
    auditor: 'Reviewers',
  }[dossierType] || activeArea.label;
  const fileContextLabel = {
    scope: 'Export',
    policy: 'File',
    evidence: 'File',
    auditor: 'Assignment',
  }[dossierType] || 'Review context';
  const cornerCards = [
    {
      label: 'View',
      value: dossierViewLabel,
      detail: activeArea.badge || activeArea.cue,
    },
    {
      label: 'Control link',
      value: linkedControls[0]?.split(' ')[0] || 'Mapped controls',
      detail: linkedControls.length > 1 ? `${linkedControls.length} linked controls` : 'Linked record visible',
    },
    {
      label: 'File context',
      value: fileContextLabel,
      detail: activeDossier.effectiveDate || activeDossier.freshness || 'Review context retained',
    },
    {
      label: 'Reviewer path',
      value: activeDossier.assignments ? 'Assigned' : 'Handoff',
      detail: activeDossier.assignments ? `${activeDossier.assignments.length} framework assignments` : activeArea.cue,
    },
  ];

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!motionEnabled) return;
    const nextStep = getAuditDossierStep(progress, areas.length);
    setActiveIndex((current) => (current === nextStep ? current : nextStep));
  });

  return (
    <section
      ref={sectionRef}
      id="audit-workspace"
      className="relative scroll-mt-28 bg-white pt-20 pb-12 md:pt-24 md:pb-16 max-[760px]:pt-16 max-[760px]:pb-12 min-[1081px]:min-h-[200vh]"
    >
      <div className="shell grid gap-16 max-[1080px]:gap-12 min-[1081px]:min-h-[170vh] min-[1081px]:grid-cols-[.44fr_.56fr] min-[1081px]:items-start">
        <Reveal motionEnabled={motionEnabled} className="min-w-0">
          <p className="eyebrow mb-5">One audit context</p>
          <h2 className="text-balance">Four views. One reviewable audit context.</h2>
          <p className="lede mt-6 max-w-120 text-pretty">
            Framework scope, supporting documents, and auditor assignments stay visible as one connected handoff instead of four disconnected folders.
          </p>

          <ol aria-label="Audit management views" className="mt-12 grid gap-7 max-[760px]:mt-10 max-[760px]:gap-4">
            {areas.map((area, index) => {
              const Icon = icons[index] || FolderOpen;
              const isActive = index === activeStep;
              return (
                <li key={area.label}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`group w-full text-left grid grid-cols-[2.5rem_1fr] gap-4 rounded-[20px] border p-5 transition-all duration-300 motion-reduce:transition-none max-[760px]:p-4 ${
                      isActive
                        ? 'border-teal/45 bg-field shadow-[inset_0_1px_0_rgba(255,255,255,.8)]'
                        : 'border-line bg-white hover:border-teal/30 hover:bg-field'
                    }`}
                  >
                    <span
                      className={`grid size-10 place-items-center rounded-full border transition-colors ${
                        isActive ? 'border-teal bg-white text-teal' : 'border-line bg-field text-muted group-hover:border-teal/40 group-hover:text-navy'
                      }`}
                    >
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[.6rem] uppercase tracking-[.1em] text-teal">
                          {area.step || String(index + 1).padStart(2, '0')} · {area.label}
                        </span>
                        {area.badge && (
                          <span className={`rounded-full px-2 py-0.5 font-mono text-[.52rem] uppercase tracking-[.08em] ${
                            isActive ? 'bg-teal text-white' : 'bg-line/40 text-muted'
                          }`}>
                            {area.badge}
                          </span>
                        )}
                      </div>
                      <strong className="mt-1 block text-base font-medium text-navy">{area.title}</strong>
                      <span className="mt-1.5 block text-sm leading-6 text-muted">{area.copy}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="min-w-0 min-[1081px]:sticky min-[1081px]:top-[116px] min-[1081px]:flex min-[1081px]:h-[calc(100svh-116px)] min-[1081px]:items-center min-[1081px]:self-start">
          <Reveal motionEnabled={motionEnabled} className="min-w-0 min-[1081px]:w-full">
            <figure
              aria-label="Representative audit dossier"
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#061f27] p-6 text-white shadow-[0_28px_90px_rgba(6,31,39,.32)] max-[760px]:rounded-[24px] max-[760px]:p-4"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:34px_34px]"
              />

              <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4 max-[760px]:flex-col max-[760px]:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-[3px] border border-mint/70 bg-mint/20" />
                    <p className="font-mono text-[.6rem] uppercase tracking-[.1em] text-mint">
                      Audit dossier
                    </p>
                  </div>
                  <h3 className="mt-1 text-xl font-medium text-white max-[760px]:text-lg">
                    {activeDossier.heading || activeArea.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1 font-mono text-[.58rem] uppercase tracking-[.09em] text-mint">
                    {headerBadge}
                  </span>
                </div>
              </div>

              <div className="relative mt-5 rounded-[22px] border border-white/10 bg-white/[.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
	                <div className="grid gap-4 min-[761px]:grid-cols-[minmax(0,.62fr)_minmax(310px,1.76fr)_minmax(0,.62fr)] min-[761px]:grid-rows-[auto_auto]">
                  <DossierCorner {...cornerCards[0]} />
                  <DossierCorner {...cornerCards[1]} className="min-[761px]:col-start-3" />
                  <div className="min-w-0 overflow-hidden rounded-[20px] border border-white/14 bg-[#092a34]/95 p-5 shadow-[0_18px_50px_rgba(0,0,0,.18)] min-[761px]:col-start-2 min-[761px]:row-span-2 min-[761px]:row-start-1 max-[760px]:p-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={motionEnabled ? { opacity: 0, y: 12 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={motionEnabled ? { opacity: 0, y: -12 } : undefined}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="space-y-4"
                      >
                    {/* View 1: Scope & Controls Grid */}
                    {activeStep === 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[.08em] text-white/60">
                          <span>Framework controls</span>
                          <span>Scope state</span>
                        </div>
                        {activeDossier.controls ? (
                          activeDossier.controls.map((ctrl) => (
                            <div
                              key={ctrl.code}
                              className="flex items-center justify-between rounded-[14px] border border-white/10 bg-white/[.06] p-3.5"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <span className="shrink-0 rounded-md bg-mint/20 px-2 py-0.5 font-mono text-[.65rem] text-mint font-medium">
                                  {ctrl.code}
                                </span>
                                <span className="truncate text-sm font-medium text-white">{ctrl.name}</span>
                              </div>
                              <span className="shrink-0 font-mono text-xs text-mint">{ctrl.status || 'In scope'}</span>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-[14px] border border-white/10 bg-white/[.06] p-4 text-sm text-white/80">
                            SOC 2 scope · XLSX framework export
                          </div>
                        )}
                        <div className="pt-2 flex justify-end">
                          <span className="inline-flex items-center gap-2 rounded-xl bg-mint px-3.5 py-2 text-xs font-medium text-navy shadow-sm">
                            <DownloadSimple aria-hidden="true" className="size-4" />
                            <span>Export XLSX report</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* View 2: Policy Record */}
                    {activeStep === 1 && (
                      <div className="space-y-4">
                        <div className="rounded-[18px] border border-white/15 bg-white/[.07] p-5">
                          <div className="flex items-center gap-3 text-mint">
	                            <FileText className="size-6" aria-hidden="true" />
	                            <div className="min-w-0">
	                              <strong className="block truncate text-base text-white font-medium">
	                                {activeDossier.record || 'Access review policy'}
	                              </strong>
	                              <span className="block truncate text-xs font-mono text-white/60">
	                                {activeDossier.file || 'Policy_AccessReview_v3.2.pdf'}
	                              </span>
	                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="block text-white/50 font-mono text-[.55rem] uppercase">Effective Date</span>
                              <strong className="text-white font-medium">{activeDossier.effectiveDate || '2026-08-15'}</strong>
                            </div>
                            <div>
                              <span className="block text-white/50 font-mono text-[.55rem] uppercase">Status</span>
                              <strong className="text-mint font-medium">Active record</strong>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-[14px] border border-white/10 bg-white/[.04] p-3.5">
                          <span className="block font-mono text-[.58rem] uppercase text-mint mb-2">Linked Controls</span>
                          <div className="flex flex-wrap gap-2">
                            {(activeDossier.linkedControls || ['Access review control', 'ISO 27001 A.9.2']).map((c) => (
	                              <span key={c} className="flex min-w-0 max-w-full items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white">
	                                <LinkSimple aria-hidden="true" className="size-3 shrink-0 text-mint" />
	                                <span className="truncate">{c}</span>
	                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View 3: Evidence Record */}
                    {activeStep === 2 && (
                      <div className="space-y-4">
                        <div className="rounded-[18px] border border-white/15 bg-white/[.07] p-5">
	                          <div className="flex min-w-0 items-center gap-3">
	                            <ClipboardText className="size-6 shrink-0 text-mint" aria-hidden="true" />
	                            <div className="min-w-0">
	                              <strong className="block truncate text-base text-white font-medium">
	                                {activeDossier.record || 'Access review evidence'}
	                              </strong>
	                              <span className="block truncate text-xs font-mono text-white/60">
	                                {activeDossier.file || 'IdP_User_List_Export_Q3.json'}
	                              </span>
	                            </div>
	                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-xs text-white/70 max-[760px]:grid-cols-1">
                            <div>
	                              <span className="block font-mono text-[.55rem] uppercase text-white/40">File context</span>
	                              <strong className="block truncate text-white font-medium">{activeDossier.freshness || 'Effective date recorded'}</strong>
	                            </div>
	                            <div>
	                              <span className="block font-mono text-[.55rem] uppercase text-white/40">Linked control</span>
	                              <strong className="block truncate text-mint font-medium">{linkedControls[0] || 'Access review control'}</strong>
	                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-[12px] bg-mint/10 p-3 text-xs text-mint">
                          <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                          <span>Supporting evidence file attached and mapped to active controls</span>
                        </div>
                      </div>
                    )}

                    {/* View 4: Auditor Assignment */}
                    {activeStep === 3 && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
                          {(activeDossier.assignments || [
                            { type: 'Internal audit', framework: 'SOC 2 Type II', status: 'Assigned' },
                            { type: 'External audit', framework: 'ISO/IEC 27001:2022', status: 'Assigned' },
                          ]).map((assignment) => (
                            <div key={assignment.type} className="rounded-[16px] border border-white/10 bg-white/[.06] p-4">
                              <span className="mb-2 block font-mono text-[.58rem] uppercase text-mint">{assignment.type}</span>
                              <strong className="block text-sm font-medium text-white">{assignment.framework}</strong>
                              <span className="text-xs text-white/60">{assignment.status}</span>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-[14px] border border-white/10 bg-white/[.04] p-3.5 flex items-center justify-between">
                          <span className="text-xs text-white">Assigned review paths</span>
                          <span className="font-mono text-[.58rem] uppercase tracking-[.08em] text-mint">
                            {activeDossier.assignments?.length || 2} frameworks
                          </span>
                        </div>
                      </div>
                    )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <DossierCorner {...cornerCards[2]} />
                  <DossierCorner {...cornerCards[3]} className="min-[761px]:col-start-3" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="font-mono text-[.58rem] uppercase tracking-[.08em] text-white/52">
                  Review sequence
                </span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-mint"
                    animate={{ scaleX: areas.length ? (activeStep + 1) / areas.length : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
