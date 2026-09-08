import { ArrowRight, CalendarDays, CheckCircle2, CircleAlert, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const stateIcons = {
  current: CheckCircle2,
  attention: CircleAlert,
};

export default function ContinuousComplianceHeroSection({ content, motionEnabled }) {
  const { workspace } = content;
  const titleLead = content.title.replace(content.titleAccent, '').trim();

  return (
    <section
      aria-labelledby="continuous-compliance-title"
      className="continuous-hero relative -mt-25 overflow-hidden bg-mist pb-25 pt-42 max-[760px]:pb-20 max-[760px]:pt-34"
      data-motion={motionEnabled ? 'animated' : 'static'}
    >
      <div className="continuous-hero__field" aria-hidden="true" />
      <div className="shell relative z-1 grid min-h-150 grid-cols-[minmax(0,1fr)_minmax(30rem,.94fr)] items-center gap-14 max-[1080px]:min-h-0 max-[1080px]:grid-cols-1 max-[1080px]:gap-16">
        <motion.div
          className="continuous-hero__copy"
          initial={motionEnabled ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="continuous-compliance-title" className="continuous-hero__title" aria-label={content.title}>
            <span>{titleLead}</span>
            <span className="hero-title-accent">{content.titleAccent}</span>
          </h1>
          <p className="continuous-hero__lede">{content.description}</p>
          <div className="action-row mt-9">
            <TrialLink className="button button--mint button--directional">
              <ArrowRight aria-hidden="true" />
              Start free trial
            </TrialLink>
            <Link className="button button--ghost" to="/demo">
              <CalendarDays aria-hidden="true" />
              Request a demo
            </Link>
          </div>
          <ul className="continuous-hero__proof" aria-label="Continuous compliance platform proof">
            {content.proof.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </motion.div>

        <motion.figure
          aria-label={workspace.accessibleLabel}
          className="continuous-workspace"
          initial={motionEnabled ? { opacity: 0, x: 28 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: motionEnabled ? 0.12 : 0, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="continuous-workspace__sweep" aria-hidden="true" />
          <div className="continuous-workspace__header">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="continuous-workspace__mark" aria-hidden="true">
                <img src="/assets/emblemLogo.svg" alt="" />
              </span>
              <span className="min-w-0">
                <strong>{workspace.label}</strong>
                <small>{workspace.supporting}</small>
              </span>
            </div>
            <span className="continuous-workspace__context">Current review</span>
          </div>

          <div className="continuous-workspace__frameworks" aria-label="Framework scope">
            <ShieldCheck aria-hidden="true" />
            <span>Framework scope</span>
            <ul>
              {workspace.frameworks.map((framework) => <li key={framework}>{framework}</li>)}
            </ul>
          </div>

          <div className="continuous-workspace__body">
            <article className="continuous-workspace__control">
              <div className="continuous-workspace__control-head">
                <span className="continuous-workspace__control-icon" aria-hidden="true">
                  <ClipboardCheck />
                </span>
                <span>
                  <small>{workspace.reference}</small>
                  <h3>{workspace.control}</h3>
                </span>
              </div>
              <p>{workspace.summary}</p>
              <div className="continuous-workspace__next">
                <span>Next review</span>
                <strong>{workspace.nextReview}</strong>
              </div>
            </article>

            <div className="continuous-workspace__states" role="list" aria-label="Control support states">
              {workspace.states.map((item) => {
                const Icon = stateIcons[item.state];
                return (
                  <div className={`continuous-workspace__state is-${item.state}`} key={item.label} role="listitem" aria-label={`${item.label}: ${item.value}`}>
                    <Icon aria-hidden="true" />
                    <span>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <figcaption className="sr-only">Representative product data showing framework scope, control context, ownership, evidence state, and the next review.</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
