import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import { useSiteMotion } from '../context/MotionContext';

const packages = [
  [
    'Essentials',
    'Build a focused compliance foundation.',
    ['Shared control workspace', 'Core framework support', 'Evidence and owner workflows', 'Readiness reporting']
  ],
  [
    'Scale',
    'Connect risk, frameworks, and growing teams.',
    ['Everything in Essentials', 'Multi-framework reuse', 'Risk management', 'Secura AI guidance', 'Advanced reporting']
  ],
  [
    'Enterprise',
    'Coordinate complex assurance programs.',
    ['Everything in Scale', 'Multiple programs and entities', 'Enterprise workflow design', 'Advanced access controls', 'Dedicated success planning']
  ]
];

const comparisonFeatures = [
  'Shared controls',
  'Evidence workflows',
  'Multi-framework reuse',
  'Risk management',
  'Multiple programs'
];

function PackageCard({ item, index }) {
  const [name, copy, features] = item;
  const featured = index === 1;

  return (
    <article
      className={`rounded-[26px] border border-line p-[30px] ${featured ? 'bg-navy text-white shadow-elevated -translate-y-3 max-[760px]:translate-y-0' : 'bg-white'}`}
    >
      <span className={`font-mono text-[.55rem] font-medium leading-[1.5] uppercase ${featured ? 'text-mint' : 'text-teal'}`}>
        {featured ? 'Recommended for scaling teams' : 'Built for your stage'}
      </span>
      <h2 className="mt-[45px] mb-3">{name}</h2>
      <p className={`min-h-[70px] text-[.76rem] leading-[1.6] ${featured ? 'text-[#b8c8d5]' : 'text-muted'}`}>
        {copy}
      </p>
      <ul className="min-h-[220px] list-none border-t border-line pt-[18px] pl-0">
        {features.map((feature) => (
          <li className="my-3 flex gap-[9px] text-[.7rem]" key={feature}>
            <Check className={`w-[15px] ${featured ? 'text-mint' : 'text-teal'}`} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Link className={`button ${featured ? 'button--mint' : 'button--ghost'}`} to="/demo">
        Talk through your program
      </Link>
    </article>
  );
}

function PackageComparison() {
  return (
    <div className="mt-[34px] overflow-hidden rounded-[20px] border border-line bg-white max-[760px]:overflow-x-auto">
      <div className="grid min-h-[54px] grid-cols-[1.6fr_repeat(3,1fr)] items-center border-b border-line px-[18px] text-[.72rem] max-[760px]:min-w-[620px]">
        <strong>Capability</strong>
        {packages.map(([name]) => <strong key={name}>{name}</strong>)}
      </div>
      {comparisonFeatures.map((feature, index) => (
        <div
          className="grid min-h-[54px] grid-cols-[1.6fr_repeat(3,1fr)] items-center border-b border-line px-[18px] text-[.72rem] last:border-0 max-[760px]:min-w-[620px]"
          key={feature}
        >
          <span>{feature}</span>
          {packages.map(([name], packageIndex) => (
            <span key={name}>
              {packageIndex >= Math.floor(index / 2) ? 'Included' : '—'}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  const { motionEnabled } = useSiteMotion();
  const [compare, setCompare] = useState(false);

  return (
    <>
      <PageMeta
        title="Packages"
        description="Explore capability-based Controllo packages for growing and enterprise compliance teams."
      />
      <PageHero
        eyebrow="Packages"
        title="A platform shaped around your program."
        description="Start with the assurance work you need now and preserve a clear path to broader governance."
        accent="shell"
        motionEnabled={motionEnabled}
        demo={false}
      />
      <section className="section">
        <div className="shell">
          <div className="mb-[30px] flex items-center justify-between">
            <span className="text-[.78rem]">Capability packages</span>
            <button
              className="min-h-[42px] cursor-pointer rounded-xl border border-line bg-white px-[15px]"
              type="button"
              aria-pressed={compare}
              onClick={() => setCompare((current) => !current)}
            >
              {compare ? 'Hide comparison' : 'Compare packages'}
            </button>
          </div>
          <div className="grid grid-cols-3 items-stretch gap-[14px] max-[760px]:grid-cols-1">
            {packages.map((item, index) => (
              <PackageCard item={item} index={index} key={item[0]} />
            ))}
          </div>
          {compare ? <PackageComparison /> : null}
        </div>
      </section>
    </>
  );
}
