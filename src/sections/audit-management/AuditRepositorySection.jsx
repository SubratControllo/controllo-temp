import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarBlank, FileMagnifyingGlass, FileText, LinkSimple } from '@phosphor-icons/react';
import Reveal from '../../components/Reveal';

export default function AuditRepositorySection({ views, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef([]);
  const active = views[activeIndex];

  function handleTabKeyDown(event, index) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % views.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + views.length) % views.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = views.length - 1;
    else return;

    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="relative overflow-hidden bg-mist py-24 max-[760px]:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[52%] bg-[linear-gradient(90deg,transparent,rgba(38,216,173,.07))]" />
      <div className="shell relative grid grid-cols-[.77fr_1.23fr] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow mb-5">Audit documentation</p>
          <h2 className="text-balance">Keep policy and evidence records linked to their controls.</h2>
          <p className="lede mt-6 text-pretty">Documents are easier to review when their file dates and control relationships stay visible—not just their names in a folder.</p>
          <div className="mt-8 border-l-2 border-teal pl-5 text-sm leading-6 text-muted">Framework context is available through the controls linked to each record.</div>
        </Reveal>

        <Reveal motionEnabled={motionEnabled} className="min-w-0">
          <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-elevated">
            <div className="border-b border-line px-6 pt-6 max-[760px]:px-4">
              <p className="font-mono text-[.62rem] uppercase tracking-[.1em] text-teal">Document repository · Representative view</p>
              <div className="mt-5 flex gap-6" role="tablist" aria-label="Audit documentation views">
                {views.map((view, index) => (
                  <button
                    key={view.label}
                    ref={(element) => { tabs.current[index] = element; }}
                    type="button"
                    role="tab"
                    id={`audit-repository-tab-${index}`}
                    aria-controls="audit-repository-panel"
                    aria-selected={activeIndex === index}
                    tabIndex={activeIndex === index ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`min-h-11 border-b-2 pb-3 text-sm transition-colors duration-200 ${activeIndex === index ? 'border-teal text-navy' : 'border-transparent text-muted hover:text-teal'}`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
            <div id="audit-repository-panel" role="tabpanel" aria-labelledby={`audit-repository-tab-${activeIndex}`} tabIndex={0} className="min-h-93 p-6 max-[760px]:min-h-0 max-[760px]:p-4">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={active.label}
                  initial={motionEnabled ? { opacity: 0, x: 8 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  exit={motionEnabled ? { opacity: 0, x: -8 } : undefined}
                  transition={{ duration: motionEnabled ? 0.22 : 0 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-2 font-mono text-[.6rem] uppercase tracking-[.1em] text-muted">{active.title}</p>
                      <strong className="text-xl font-medium">{active.record}</strong>
                    </div>
                    {active.label === 'Policies' ? <FileText aria-hidden="true" className="size-5 text-teal" /> : <FileMagnifyingGlass aria-hidden="true" className="size-5 text-teal" />}
                  </div>
                  <p className="mt-3 max-w-115 text-sm leading-6 text-muted">{active.copy}</p>
                  <div className="mt-7 grid grid-cols-[1.1fr_.9fr] gap-3 max-[760px]:grid-cols-1">
                    <div className="rounded-[16px] bg-field p-4">
                      <p className="mb-3 font-mono text-[.61rem] uppercase text-teal">Files</p>
                      <div className="flex items-start gap-3">
                        <FileText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
                        <div>
                          <strong className="block text-sm font-medium">{active.file}</strong>
                          <span className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-muted"><CalendarBlank aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />{active.detail}</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[16px] bg-mist p-4">
                      <p className="mb-3 font-mono text-[.61rem] uppercase text-teal">Linked controls</p>
                      <div className="flex items-start gap-2">
                        <LinkSimple aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
                        <span className="text-sm">{active.control}</span>
                      </div>
                      <span className="mt-3 block text-xs leading-5 text-muted">Framework context follows this control link.</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-3 text-right font-mono text-[.6rem] uppercase tracking-[.08em] text-muted">Illustrative records · Not customer data</p>
        </Reveal>
      </div>
    </section>
  );
}
