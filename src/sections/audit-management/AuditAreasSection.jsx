import { ClipboardText, FileText, FolderOpen, UsersThree } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Reveal from '../../components/Reveal';

const icons = [FolderOpen, FileText, ClipboardText, UsersThree];

export default function AuditAreasSection({ areas, motionEnabled }) {
  return (
    <section id="audit-workspace" className="scroll-mt-28 bg-white pb-24 pt-8 max-[760px]:pb-16 max-[760px]:pt-6">
      <div className="shell grid grid-cols-[.72fr_1.28fr] gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
        <Reveal motionEnabled={motionEnabled} className="max-w-100">
          <p className="eyebrow mb-5">One audit context</p>
          <h2 className="text-balance">Four views. One reviewable audit context.</h2>
          <p className="lede mt-6 text-pretty">Framework scope, supporting documents, and auditor assignments are separate views of the same reviewable work.</p>
          <div className="mt-10 hidden border-t border-line pt-5 font-mono text-xs leading-6 text-teal max-[1080px]:block">
            Framework scope → Linked controls → Documentation → Auditor assignment
          </div>
        </Reveal>

        <div className="relative border-t border-line">
          <motion.div
            aria-hidden="true"
            className="absolute bottom-13 left-5 top-12 w-px origin-top bg-teal/35 max-[760px]:left-4"
            initial={motionEnabled ? { scaleY: 0 } : false}
            whileInView={motionEnabled ? { scaleY: 1 } : undefined}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          />
          <ol aria-label="Audit management views">
            {areas.map((area, index) => {
              const Icon = icons[index];
              return (
                <Reveal
                  as="li"
                  key={area.label}
                  motionEnabled={motionEnabled}
                  delay={index * 0.06}
                  duration={0.42}
                  className="relative grid grid-cols-[42px_1fr_auto] gap-5 border-b border-line py-8 max-[760px]:grid-cols-[34px_1fr] max-[760px]:gap-3 max-[760px]:py-6"
                >
                  <div className="relative z-1 grid size-10 place-items-center rounded-full border border-teal/30 bg-white text-teal max-[760px]:size-8">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[.62rem] uppercase tracking-[.11em] text-teal">{String(index + 1).padStart(2, '0')} · {area.label}</p>
                    <h3 className="text-xl">{area.title}</h3>
                    <p className="mt-3 max-w-105 text-sm leading-6 text-muted">{area.copy}</p>
                  </div>
                  <span className="self-center font-mono text-[.62rem] text-muted max-[760px]:col-start-2 max-[760px]:self-start">{area.cue}</span>
                </Reveal>
              );
            })}
          </ol>
          <p className="mt-5 pl-16 text-xs leading-5 text-muted max-[760px]:pl-11">The views keep review context visible; they do not advance an audit automatically.</p>
        </div>
      </div>
    </section>
  );
}
