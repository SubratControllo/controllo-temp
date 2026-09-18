import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import { DirectoryFilters } from '../components/DirectoryControls';
import { blogArticles } from '../data/siteContent';
import { useSiteMotion } from '../context/MotionContext';

const cardStyles = [
  'row-span-2 bg-[linear-gradient(145deg,var(--color-navy),var(--color-teal))] text-white max-[760px]:row-auto',
  'bg-navy text-white',
  'bg-shell text-navy',
  'bg-mint-soft text-navy'
];
const getCardStyle = (index) => index < 2 ? cardStyles[index] : cardStyles[2 + ((index - 2) % 2)];
const articleTypes = ['All', ...new Set(blogArticles.map((item) => item.category))];

export default function ResourcesPage() {
  const [filter, setFilter] = useState('All');
  const { motionEnabled } = useSiteMotion();
  const visibleResources = blogArticles.filter((item) => filter === 'All' || item.category === filter);

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
            items={articleTypes}
            value={filter}
            onChange={setFilter}
          />
          <div className="mt-[46px] grid auto-rows-[280px] grid-cols-[1.2fr_.8fr] gap-4 max-[760px]:grid-cols-1 max-[760px]:auto-rows-auto">
            {visibleResources.map((item, index) => (
              <a
                className={`resource-card relative overflow-hidden rounded-[28px] p-[34px] max-[760px]:min-h-[340px] ${getCardStyle(index)}`}
                href={item.href}
                key={item.href}
              >
                <span className="font-mono text-[.58rem] font-medium leading-none uppercase">
                  {item.category} · Article
                </span>
                <h2 className={`max-w-[560px] ${index === 0 ? 'mt-20 text-[clamp(1.75rem,3vw,2.7rem)]' : 'mt-14 text-[clamp(1.45rem,2.2vw,2rem)]'} max-[760px]:mt-[70px]`}>
                  {item.title}
                </h2>
                <p className="max-w-[520px] text-[.78rem] leading-[1.7] text-inherit opacity-75">
                  {item.summary}
                </p>
                <ArrowUpRight className="absolute top-[26px] right-[26px]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
