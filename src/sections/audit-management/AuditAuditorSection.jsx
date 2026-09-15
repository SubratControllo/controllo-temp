import { motion } from 'motion/react';
import { ArrowRight, Buildings, UsersThree } from '@phosphor-icons/react';
import Reveal from '../../components/Reveal';

const assignments = [
  { type: 'Internal audit', framework: 'SOC 2', context: 'Framework assigned' },
  { type: 'External audit', framework: 'ISO/IEC 27001', context: 'Framework assigned' },
];

export default function AuditAuditorSection({ content, motionEnabled }) {
  return (
    <section className="bg-white py-24 max-[760px]:py-16">
      <div className="shell grid grid-cols-[.72fr_1.28fr] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow mb-5">{content.eyebrow}</p>
          <h2 className="text-balance">{content.title}</h2>
          <p className="lede mt-6 text-pretty">{content.description}</p>
          <p className="mt-7 max-w-120 text-sm leading-6 text-muted">{content.note}</p>
        </Reveal>

        <Reveal motionEnabled={motionEnabled} className="min-w-0">
          <figure aria-label="Representative auditor dossier showing primary and additional contacts beside internal and external framework assignments">
            <div aria-hidden="true" className="overflow-hidden rounded-[28px] bg-navy p-6 text-white shadow-elevated max-[760px]:p-4">
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-5">
                <div>
                  <p className="font-mono text-[.62rem] uppercase tracking-[.11em] text-mint">Audit management</p>
                  <strong className="mt-2 block text-lg font-medium">Auditor dossier</strong>
                </div>
                <img src="/assets/emblemLogo.svg" alt="" className="size-9 opacity-50" />
              </div>
              <div className="grid grid-cols-[.7fr_1.3fr] gap-4 pt-5 max-[760px]:grid-cols-1">
                <div className="rounded-[18px] bg-navy-soft p-5">
                  <p className="mb-5 font-mono text-[.6rem] uppercase tracking-[.1em] text-mint">Auditor contacts</p>
                  <div className="flex items-start gap-3 border-b border-white/15 pb-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white/10"><UsersThree className="size-4 text-mint" /></span>
                    <div>
                      <strong className="block text-sm font-medium">Primary contact</strong>
                      <span className="mt-1 block text-xs text-white/65">Main auditor record</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white/10"><Buildings className="size-4 text-mint" /></span>
                    <div>
                      <strong className="block text-sm font-medium">Additional contacts</strong>
                      <span className="mt-1 block text-xs text-white/65">Other people on the record</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-[18px] bg-white p-5 text-navy">
                  <p className="mb-4 font-mono text-[.6rem] uppercase tracking-[.1em] text-teal">Assigned framework paths</p>
                  <div className="grid gap-3">
                    {assignments.map(({ type, framework, context }, index) => (
                      <motion.div
                        key={type}
                        className="rounded-[14px] border border-line bg-field p-4"
                        initial={motionEnabled ? { opacity: 0, x: 10 } : false}
                        whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.36, delay: index * 0.08 }}
                      >
                        <p className="mb-2 font-mono text-[.6rem] uppercase tracking-[.08em] text-teal">{type}</p>
                        <div className="flex items-center justify-between gap-3">
                          <strong className="text-sm font-medium">{framework}</strong>
                          <ArrowRight className="size-4 text-teal" />
                        </div>
                        <span className="mt-2 block text-xs text-muted">{context}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-right font-mono text-[.6rem] uppercase tracking-[.08em] text-muted">Illustrative assignments · No personal data</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
