import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Layers3, Route } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import ConversionBand from '../components/ConversionBand';
import { getFrameworkBySlug } from '../data/enterpriseContent';
import { useSiteMotion } from '../context/MotionContext';
import NotFoundPage from './NotFoundPage';

const stages = [
  [
    Layers3,
    'Bring your control model forward',
    'Use the controls and owners that already reflect how your organization works.'
  ],
  [
    Route,
    'Map the assurance path',
    'Connect requirements to shared controls while keeping framework scope visible.'
  ],
  [
    CheckCircle2,
    'Stay ready',
    'Keep evidence, reviews, and corrective work current throughout the cycle.'
  ]
];

export default function FrameworkDetailPage() {
  const { slug } = useParams();
  const item = getFrameworkBySlug(slug);
  const { motionEnabled } = useSiteMotion();

  if (!item) return <NotFoundPage />;

  return (
    <>
      <PageMeta title={item.title} description={item.summary} />
      <PageHero
        eyebrow={item.code}
        title={item.title}
        description={item.summary}
        accent="mint"
        motionEnabled={motionEnabled}
      />
      <section className="section bg-white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">A clearer operating path</p>
            <h2>From requirements to current evidence.</h2>
          </div>
          <div className="journey-line relative mb-[60px] grid grid-cols-3 gap-12 max-[760px]:grid-cols-1">
            {stages.map(([Icon, title, detail]) => (
              <article className="relative pt-[90px]" key={title}>
                <Icon
                  className="absolute top-0 size-[60px] rounded-full bg-white p-[17px] text-teal shadow-[0_8px_30px_rgba(6,27,50,.13)]"
                  aria-hidden="true"
                />
                <h3>{title}</h3>
                <p className="text-[.8rem] leading-[1.7] text-muted">{detail}</p>
              </article>
            ))}
          </div>
          <Link className="text-[.8rem] text-teal" to="/frameworks">
            ← View all frameworks
          </Link>
        </div>
      </section>
      <ConversionBand title={`Make ${item.code} part of a connected program.`} />
    </>
  );
}
