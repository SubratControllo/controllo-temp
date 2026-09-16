import { CalendarBlank, FileMagnifyingGlass, FileText, LinkSimple } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import Reveal from '../../components/Reveal';

export default function AuditRepositorySection({ views, motionEnabled = true }) {
  const [activeLoopIndex, setActiveLoopIndex] = useState(0);

  const loopItems = useMemo(
    () => views.flatMap((view, viewIndex) => (view.records || [{ id: 'default-1' }]).map((record) => ({ viewIndex, recordId: record.id }))),
    [views],
  );
  const activeItem = loopItems[activeLoopIndex] || loopItems[0] || { viewIndex: 0 };
  const activeTab = activeItem.viewIndex;
  const stackShift = activeTab === 0 ? 1 : -1;
  const stackCards = loopItems.slice(0, 3).map((_, offset) => {
    const item = loopItems[(activeLoopIndex + offset) % loopItems.length];
    const view = views[item.viewIndex] || views[0];
    const records = view.records || [];
    const record = records.find((r) => r.id === item.recordId) || records[0];
    return { offset, record, view };
  });

  useEffect(() => {
    if (!motionEnabled || loopItems.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveLoopIndex((current) => (current + 1) % loopItems.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [loopItems, motionEnabled]);

  return (
    <section className="relative overflow-hidden bg-mist py-24 max-[760px]:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[52%] bg-[linear-gradient(90deg,transparent,rgba(38,216,173,.07))]"
      />

      <div className="shell relative grid grid-cols-[.42fr_.58fr] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow mb-5">Audit documentation</p>
          <h2 className="text-balance">Keep policy and evidence records linked to their controls.</h2>
          <p className="lede mt-6 text-pretty">
            Documents are easier to review when their file dates and control relationships stay visible—not just their names in a folder.
          </p>

          <div className="mt-8 max-w-105 rounded-[18px] border border-line bg-white/70 p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <LinkSimple className="size-3.5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-6 text-muted">
                Framework context stays available through the control links attached to each record.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal motionEnabled={motionEnabled} className="min-w-0">
          <div className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-teal/15 bg-[linear-gradient(135deg,#eefbff_0%,#dff7fb_42%,#eefcf6_100%)] p-8 shadow-elevated max-[760px]:min-h-0 max-[760px]:p-4">
            <div aria-hidden="true" className="absolute -left-10 top-8 size-56 rounded-full bg-cyan-300/35 blur-3xl" />
            <div aria-hidden="true" className="absolute right-10 top-12 size-64 rounded-full bg-sky-400/25 blur-3xl" />
            <div aria-hidden="true" className="absolute bottom-4 left-1/2 size-72 -translate-x-1/2 rounded-full bg-teal/25 blur-3xl" />

            <div className="relative z-10 mb-7 flex items-center justify-between gap-4">
              <p className="font-mono text-[.62rem] uppercase tracking-[.12em] text-teal">
                Document repository
              </p>
              <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 font-mono text-[.56rem] uppercase tracking-[.08em] text-muted shadow-xs">
                Policy and evidence records
              </span>
            </div>

            <div
              id="audit-repository-panel"
              role="tabpanel"
              aria-label="Rotating policy and evidence records"
              tabIndex={0}
              className="relative z-10"
            >
              <AnimatePresence initial={false}>
                <div className="relative mx-auto h-[388px] max-w-[520px] max-[760px]:h-[430px]">
                  {stackCards.map(({ offset, record, view }) => {
                    const isFront = offset === 0;
                    const stackTransforms = [
                      'translate3d(0, 44px, 0) rotate(0deg)',
                      `translate3d(${stackShift * -10}px, 19px, 0) rotate(${stackShift * -1.4}deg)`,
                      `translate3d(${stackShift * 12}px, 0, 0) rotate(${stackShift * 1.2}deg)`,
                    ];
                    const stackOpacity = motionEnabled ? [1, 0.72, 0.42][offset] : [1, 0.7, 0.4][offset];
                    const stackScale = [1, 0.96, 0.92][offset];

                    return (
                      <motion.div
                        key={record.id}
                        aria-hidden={!isFront}
                        data-stack-position={offset}
                        initial={motionEnabled ? { opacity: 0, transform: 'translate3d(0, -18px, 0) scale(0.96)' } : false}
                        animate={{
                          opacity: stackOpacity,
                          transform: motionEnabled
                            ? `${stackTransforms[offset]} scale(${stackScale})`
                            : `translate3d(0, ${offset * 18}px, 0) scale(${stackScale})`,
                        }}
                        exit={motionEnabled ? { opacity: 0, transform: 'translate3d(0, 68px, 0) scale(0.96)' } : undefined}
                        transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                        className={`absolute inset-x-0 top-0 overflow-hidden rounded-[18px] border border-white/80 bg-white/95 backdrop-blur ${
                          isFront ? 'shadow-[0_26px_70px_rgba(10,78,105,.18)]' : 'shadow-xs'
                        }`}
                        style={{ zIndex: 30 - offset }}
                      >
                        <div className="flex items-center justify-between gap-3 px-5 pt-5">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal">
                            {view.label === 'Policies' ? (
                              <FileText aria-hidden="true" className="size-3.5" />
                            ) : (
                              <FileMagnifyingGlass aria-hidden="true" className="size-3.5" />
                            )}
                            Linked record file
                          </span>
                          <span className="rounded-md border border-line bg-field px-2 py-1 font-mono text-[.58rem] uppercase text-muted">
                            {view.file}
                          </span>
                        </div>

                        {isFront ? (
                          <>
                            <div className="px-5 py-6">
                              <p className="mb-2 font-mono text-[.58rem] uppercase tracking-[.1em] text-muted">
                                {view.title}
                              </p>
                              <strong className="block text-xl font-medium leading-tight text-navy">{record.title}</strong>
                              <p className="mt-3 text-sm leading-6 text-muted">
                                {record.copy || view.copy}
                              </p>

                              <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
                                <span className="inline-flex max-w-full items-center gap-1.5 rounded-[10px] border border-line bg-field px-2.5 py-1.5">
                                  <FileText aria-hidden="true" className="size-3.5 shrink-0" />
                                  <span className="truncate">{record.filename}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-field px-2.5 py-1.5">
                                  <CalendarBlank aria-hidden="true" className="size-3.5 shrink-0" />
                                  {record.effectiveDate || view.detail}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-field px-2.5 py-1.5">
                                  <LinkSimple aria-hidden="true" className="size-3.5 shrink-0" />
                                  {record.mappedControl || view.control}
                                </span>
                              </div>
                            </div>

                            <div className="border-t border-line bg-[rgba(246,250,249,.75)] px-5 py-3 text-center text-sm font-medium text-navy">
                              Effective date stays with the linked control record.
                            </div>
                          </>
                        ) : (
                          <div className="px-5 pb-5 pt-4">
                            <p className="mb-2 font-mono text-[.56rem] uppercase tracking-[.1em] text-muted">
                              {view.title}
                            </p>
                            <strong className="block truncate text-sm font-medium text-navy">{record.title}</strong>
                            <span className="mt-2 block truncate text-xs text-muted">{record.filename}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
