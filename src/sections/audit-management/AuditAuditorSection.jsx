import { Buildings, GitBranch, UserCircle, UsersThree } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Reveal from '../../components/Reveal';

const icons = [UserCircle, UsersThree, GitBranch];

export default function AuditAuditorSection({ content, motionEnabled = true }) {
  const guarantees = content.guarantees || [];
  const assignments = content.assignments || [];

  return (
    <section className="bg-white py-24 max-[760px]:py-16">
      <div className="shell grid grid-cols-[.43fr_.57fr] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow mb-5">{content.eyebrow}</p>
          <h2 className="text-balance">{content.title}</h2>
          <p className="lede mt-6 text-pretty">{content.description}</p>

          <div className="mt-8 grid gap-3">
            {guarantees.map((item, index) => {
              const Icon = icons[index] || GitBranch;
              return (
                <div key={item.title} className="flex items-start gap-3 rounded-[16px] border border-line bg-field p-4">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white text-teal shadow-xs">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <strong className="block text-sm font-medium text-navy">{item.title}</strong>
                    <span className="mt-1 block text-xs leading-5 text-muted">{item.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal motionEnabled={motionEnabled} className="min-w-0">
          <figure aria-label="Representative auditor assignment board showing contacts and framework assignments">
            <div className="relative overflow-hidden rounded-[30px] border border-line bg-mist p-6 shadow-elevated max-[760px]:p-4">
              <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 size-72 rounded-full bg-teal/10 blur-3xl" />
              <div className="relative grid gap-4">
                <div className="flex items-center justify-between gap-4 rounded-[20px] border border-line bg-white p-5">
                  <div>
                    <p className="font-mono text-[.6rem] uppercase tracking-[.1em] text-teal">Reviewer contacts</p>
                    <strong className="mt-1 block text-xl font-medium text-navy">Contacts tied to assigned frameworks</strong>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-navy text-mint">
                    <UsersThree className="size-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="grid grid-cols-[.72fr_1.28fr] gap-4 max-[760px]:grid-cols-1">
                  <div className="space-y-3">
                    {['Primary contact', 'Additional contacts'].map((label, index) => (
                      <div key={label} className="rounded-[18px] border border-line bg-white p-4">
                        <p className="font-mono text-[.58rem] uppercase tracking-[.08em] text-muted">{index === 0 ? 'Main contact' : 'Supporting contacts'}</p>
                        <strong className="mt-2 block text-sm font-medium text-navy">{label}</strong>
                        <span className="mt-1 block text-xs leading-5 text-muted">Contact record for audit coordination.</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[20px] border border-line bg-white p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="font-mono text-[.6rem] uppercase tracking-[.1em] text-teal">Framework assignments</p>
                      <Buildings className="size-5 text-teal" aria-hidden="true" />
                    </div>
                    <div className="space-y-3">
                      {assignments.map((assignment, index) => (
                        <motion.div
                          key={`${assignment.type}-${assignment.framework}`}
                          className="rounded-[16px] border border-line bg-field p-4"
                          initial={motionEnabled ? { opacity: 0, transform: 'translate3d(10px, 0, 0)' } : false}
                          whileInView={motionEnabled ? { opacity: 1, transform: 'translate3d(0, 0, 0)' } : undefined}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.28, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-mono text-[.58rem] uppercase tracking-[.08em] text-teal">{assignment.type}</p>
                              <strong className="mt-1 block text-base font-medium text-navy">{assignment.framework}</strong>
                            </div>
                            <span className="rounded-md bg-mint/20 px-2 py-1 font-mono text-[.55rem] uppercase text-teal">
                              Assigned
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                            <span className="rounded-[10px] border border-line bg-white px-2.5 py-1.5">{assignment.owner}</span>
                            <span className="rounded-[10px] border border-line bg-white px-2.5 py-1.5">{assignment.context}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
