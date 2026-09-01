import { ArrowRight, CalendarDays, CheckCircle2, Cloud, Eye, FileCheck2, UsersRound } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const assuranceRows = [
  ['Access governance', 'Reviewable', CheckCircle2],
  ['Evidence packet', 'Owner assigned', FileCheck2]
];
const environmentRows = [
  ['Cloud sources', 'Current', Cloud],
  ['Workforce context', 'Available', UsersRound]
];

function HorizonPlane({ label, rows, motionEnabled, delay }) {
  return (
    <motion.div className="grid gap-3 p-5 max-[460px]:p-4" initial={motionEnabled ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .38, delay }}>
      <span className="font-mono text-[.64rem] font-medium tracking-[.12em] uppercase text-teal">{label}</span>
      {rows.map(([name, state, Icon]) => (
        <div className="grid min-h-14 grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-line pt-3" key={name}>
          <Icon className="size-4 text-teal" aria-hidden="true" />
          <strong className="text-[.76rem] font-medium">{name}</strong>
          <span className="text-[.65rem] text-muted">{state}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function CyberHeroSection({ content, motionEnabled }) {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_82%_22%,rgba(38,216,173,.22),transparent_31%),linear-gradient(180deg,#f8fbfa_0%,#f3f8f6_78%,#e4f7f1_100%)] pt-42 pb-28 max-[1080px]:pt-36 max-[760px]:pt-32 max-[760px]:pb-20" aria-labelledby="cyber-hero-title">
      <div className="shell grid min-h-170 grid-cols-[.86fr_1.14fr] items-center gap-16 max-[1080px]:min-h-0 max-[1080px]:grid-cols-1">
        <div className="relative z-10 max-w-167">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="cyber-hero-title">{content.title}</h1>
          <p className="lede mt-6">{content.description}</p>
          <p className="mt-7 font-mono text-[.68rem] leading-7 text-muted">{content.frameworks.join(' · ')}</p>
          <div className="action-row max-[460px]:grid">
            <TrialLink className="button button--mint button--directional"><ArrowRight aria-hidden="true" />Start Free Trial</TrialLink>
            <Link className="button button--ghost" to="/demo"><CalendarDays aria-hidden="true" />Request a Demo</Link>
            <Link className="inline-flex min-h-11.5 items-center gap-2 px-2 text-[.82rem] text-teal" to="/platform"><Eye className="size-4" aria-hidden="true" />Explore the Platform</Link>
          </div>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-165 overflow-hidden rounded-[28px] border border-navy/12 bg-white/88 shadow-elevated backdrop-blur"
          initial={motionEnabled ? { opacity: 0, y: 18, scale: .985 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: .7, ease: [.2, .7, .2, 1] }}
          role="img"
          aria-label="Illustrative assurance and environment overview"
          data-testid="assurance-horizon"
          data-motion={motionEnabled ? 'animated' : 'static'}
          data-state="resolved"
        >
          {motionEnabled ? <motion.span className="pointer-events-none absolute inset-y-0 z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-mint/14 to-transparent" initial={{ x: '-130%' }} animate={{ x: '430%' }} transition={{ duration: .8, delay: .62, ease: [.2, .7, .2, 1] }} aria-hidden="true" /> : null}
          <div className="flex min-h-12 items-center justify-between border-b border-line px-5 font-mono text-[.62rem] uppercase tracking-[.1em] text-muted"><span>Assurance horizon</span><span>Illustrative view</span></div>
          <HorizonPlane label="Assurance work" rows={assuranceRows} motionEnabled={motionEnabled} delay={motionEnabled ? .16 : 0} />
          <div className="flex items-center gap-3 border-y border-line bg-mist/70 px-5 py-3 font-mono text-[.6rem] uppercase tracking-[.1em] text-muted"><span className="h-px flex-1 bg-line" /><span>Context remains distinct</span><span className="h-px flex-1 bg-line" /></div>
          <HorizonPlane label="Operational context" rows={environmentRows} motionEnabled={motionEnabled} delay={motionEnabled ? .28 : 0} />
        </motion.div>
      </div>
    </section>
  );
}
