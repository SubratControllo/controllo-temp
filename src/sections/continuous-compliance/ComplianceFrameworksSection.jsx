import { ArrowRight, BookOpen, FileCheck2, GitBranch, Link2, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';

const supportIcons = {
  Implementation: Wrench,
  'Policy & procedure': BookOpen,
  Evidence: FileCheck2,
  'Risk context': ShieldCheck,
};

export default function ComplianceFrameworksSection({ content, motionEnabled }) {
  return (
    <section aria-labelledby="continuous-frameworks-title" className="section continuous-frameworks bg-white">
      <div className="shell">
        <Reveal className="continuous-frameworks__heading" motionEnabled={motionEnabled}>
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="continuous-frameworks-title">{content.title}</h2>
          </div>
          <div>
            <p className="lede">{content.description}</p>
            <span className="continuous-frameworks__note">{content.note}</span>
          </div>
        </Reveal>

        <Reveal className="continuous-frameworks__band" delay={0.06} motionEnabled={motionEnabled}>
          <div className="continuous-frameworks__reuse">
            <div className="continuous-frameworks__band-label">
              <GitBranch aria-hidden="true" />
              <span>{content.reuse.eyebrow}</span>
            </div>
            <h3>{content.reuse.title}</h3>
            <p>{content.reuse.description}</p>
            <ul aria-label="Reusable control support">
              {content.reuse.support.map((item) => {
                const SupportIcon = supportIcons[item.label] ?? ShieldCheck;
                return (
                  <li key={item.label}>
                    <span className="continuous-frameworks__support-icon" aria-hidden="true">
                      <SupportIcon />
                    </span>
                    <span>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="continuous-frameworks__paths">
            <div className="continuous-frameworks__band-label">
              <Link2 aria-hidden="true" />
              <span>Representative framework paths</span>
            </div>
            <ul aria-label="Featured frameworks">
              {content.frameworks.map((framework) => (
                <li key={framework.name}>
                  {framework.href ? (
                    <Link to={framework.href}>
                      <span>{framework.name}</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  ) : (
                    <span>{framework.name}</span>
                  )}
                </li>
              ))}
            </ul>
            <Link className="continuous-frameworks__cta" to="/frameworks">
              Explore frameworks <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
