import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const actionClassName = {
  primary: 'button button--directional',
  secondary: 'button button--light border border-white/70 shadow-none',
};

export default function AiCtaSection({ content }) {
  return (
    <section aria-label={content.eyebrow} className="section bg-mist">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-navy/10 bg-mint-soft px-6 py-14 text-center sm:px-12 sm:py-18">
          <img
            alt=""
            aria-hidden="true"
            className="mx-auto h-12 w-auto opacity-45"
            src="/assets/emblemLogo.svg"
          />
          <p className="eyebrow mt-6">{content.eyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance">{content.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink/72">{content.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-[480px]:grid">
            {content.actions.map((action) => (
              <Link className={`${actionClassName[action.variant]} max-[480px]:w-full`} key={action.to} to={action.to}>
                {action.label}
                {action.variant === 'primary' && <ArrowRight aria-hidden="true" />}
              </Link>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs leading-6 text-navy/70">{content.proof}</p>
        </div>
      </div>
    </section>
  );
}
