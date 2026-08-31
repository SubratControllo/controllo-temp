import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import { DirectoryFilters } from '../components/DirectoryControls';
import { resources, resourceTypes } from '../data/enterpriseContent';
import { useSiteMotion } from '../context/MotionContext';

const cardStyles = [
  'row-span-2 bg-[linear-gradient(145deg,var(--color-navy),var(--color-teal))] max-[760px]:row-auto',
  'bg-mint text-navy',
  'bg-shell text-navy'
];

export default function ResourcesPage() {
  const [filter, setFilter] = useState('All');
  const { motionEnabled } = useSiteMotion();
  const visibleResources = resources.filter((item) => filter === 'All' || item.type === filter);

  return (
    <>
      <PageMeta
        title="Resources"
        description="Practical guidance for operating continuous compliance, risk, and audit readiness."
      />
      <PageHero
        eyebrow="Resources"
        title="Practical guidance for keeping trust current."
        description="Focused resources for security and GRC leaders building a more connected assurance program."
        accent="shell"
        motionEnabled={motionEnabled}
        demo={false}
      />
      <section className="section">
        <div className="shell">
          <DirectoryFilters
            items={resourceTypes}
            value={filter}
            onChange={setFilter}
          />
          <div className="mt-[46px] grid grid-cols-[1.2fr_.8fr] grid-rows-[repeat(2,280px)] gap-4 max-[760px]:grid-cols-1 max-[760px]:grid-rows-none">
            {visibleResources.map((item, index) => (
              <Link
                className={`resource-card relative overflow-hidden rounded-[28px] bg-navy p-[34px] text-white max-[760px]:min-h-[340px] ${cardStyles[index] ?? cardStyles[2]}`}
                to={`/resources/${item.slug}`}
                key={item.slug}
              >
                <span className="font-mono text-[.58rem] font-medium leading-none uppercase">
                  {item.type} · {item.read}
                </span>
                <h2 className="mt-20 max-w-[560px] text-[clamp(1.5rem,3vw,2.7rem)] max-[760px]:mt-[70px]">
                  {item.title}
                </h2>
                <p className="max-w-[520px] text-[.78rem] leading-[1.7] text-inherit opacity-75">
                  {item.summary}
                </p>
                <ArrowUpRight className="absolute top-[26px] right-[26px]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
