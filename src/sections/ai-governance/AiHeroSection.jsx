import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function AiHeroSection({ content, motionEnabled }) {
  const settled = !motionEnabled;
  const reveal = (delay = 0) => ({
    initial: settled ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <section aria-label={content.eyebrow} className="relative overflow-hidden bg-mist pt-44 pb-24 max-md:pt-34 max-md:pb-18">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(42,199,183,.20),transparent_38%)]" />
      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[minmax(0,.88fr)_minmax(28rem,1.12fr)]">
        <motion.div {...reveal()}>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-balance">{content.title}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-ink/72">{content.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {content.actions.map((action) => (
              <Link className={`button ${action.variant === 'primary' ? 'button--primary' : 'button--ghost'}`} to={action.to} key={action.to}>
                {action.label}
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.figure
          {...reveal(0.1)}
          aria-label="Illustrative connected AI dossier"
          data-motion-state={settled ? 'settled' : 'revealing'}
          className="relative rounded-[2rem] border border-navy/10 bg-white/86 p-6 shadow-[0_28px_80px_rgba(10,31,52,.12)] backdrop-blur"
        >
          <figcaption className="font-mono text-xs tracking-[.12em] uppercase text-teal">{content.dossier.label}</figcaption>
          <div className="mt-5 grid gap-4 md:grid-cols-[1.18fr_.82fr]">
            <div className="rounded-3xl bg-navy p-6 text-white">
              <p className="text-sm text-white/60">AI system</p>
              <h2 className="mt-2 text-2xl text-white">{content.dossier.system}</h2>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                <div><dt className="text-white/55">Purpose</dt><dd>{content.dossier.purpose}</dd></div>
                <div><dt className="text-white/55">Owner</dt><dd>{content.dossier.owner}</dd></div>
                <div><dt className="text-white/55">Status</dt><dd>{content.dossier.status}</dd></div>
              </dl>
            </div>
            <div className="rounded-3xl border border-teal/15 bg-mint-soft p-6">
              <p className="text-sm text-navy/55">Risk assessment</p>
              <dl className="mt-5 space-y-4">
                <div><dt>Likelihood</dt><dd className="text-xl text-navy">{content.dossier.likelihood}</dd></div>
                <div><dt>Impact</dt><dd className="text-xl text-navy">{content.dossier.impact}</dd></div>
              </dl>
            </div>
          </div>
          <ul aria-label="Framework context" className="mt-4 flex flex-wrap gap-2">
            {content.dossier.frameworkContext.map((item) => <li className="rounded-full border border-navy/10 px-3 py-2 text-xs" key={item}>{item}</li>)}
          </ul>
        </motion.figure>
      </div>
    </section>
  );
}
