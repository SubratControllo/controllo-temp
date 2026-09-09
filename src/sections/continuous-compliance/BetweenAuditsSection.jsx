import { FileClock, GitCompareArrows, ShieldAlert, UserRoundCheck } from 'lucide-react';
import Reveal from '../../components/Reveal';

const scenarioIcons = {
  evidence: FileClock,
  process: GitCompareArrows,
  ownership: UserRoundCheck,
  risk: ShieldAlert,
};

const revealDuration = 0.45;

export default function BetweenAuditsSection({ content, motionEnabled }) {
  return (
    <section
      aria-labelledby="between-audits-title"
      className="continuous-between-audits relative bg-white pt-6 pb-30 md:pt-8"
    >
      <div className="shell">
        <Reveal
          className="grid grid-cols-[minmax(0,1fr)_minmax(20rem,.68fr)] items-end gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-7"
          duration={revealDuration}
          motionEnabled={motionEnabled}
        >
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="between-audits-title">{content.title}</h2>
          </div>
          <p className="lede">{content.description}</p>
        </Reveal>

        <ol className="continuous-change-list" aria-label="Changes between audits">
          {content.scenarios.map((scenario, index) => {
            const Icon = scenarioIcons[scenario.id];
            return (
              <Reveal
                as="li"
                className="continuous-change-list__item"
                delay={index * 0.05}
                duration={revealDuration}
                key={scenario.id}
                motionEnabled={motionEnabled}
              >
                <span className="continuous-change-list__number">0{index + 1}</span>
                <span className="continuous-change-list__icon" aria-hidden="true"><Icon /></span>
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal
          className="continuous-standards"
          delay={0.08}
          duration={revealDuration}
          motionEnabled={motionEnabled}
        >
          <div className="continuous-standards__intro">
            <span>Standards context</span>
            <h3>What ongoing readiness means in practice.</h3>
          </div>
          {content.standards.map((standard) => (
            <article key={standard.label}>
              <span>{standard.label}</span>
              <h3>{standard.title}</h3>
              <p>{standard.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
