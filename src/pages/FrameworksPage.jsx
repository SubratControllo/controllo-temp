import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import ConversionBand from '../components/ConversionBand';
import { DirectoryFilters, DirectorySearch } from '../components/DirectoryControls';
import FrameworkSection from '../sections/FrameworkSection';
import { frameworks, frameworkTypes } from '../data/enterpriseContent';
import { useSiteMotion } from '../context/MotionContext';

export default function FrameworksPage() {
  const { motionEnabled } = useSiteMotion();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const normalizedQuery = query.toLowerCase();
  const visibleFrameworks = frameworks.filter((item) => (
    (filter === 'All' || item.type === filter)
    && `${item.code} ${item.title}`.toLowerCase().includes(normalizedQuery)
  ));

  return (
    <>
      <PageMeta
        title="Compliance frameworks"
        description="Build reusable compliance programs across security, privacy, and AI governance frameworks."
      />
      <PageHero
        eyebrow="Frameworks"
        title="One control model. Every assurance path."
        description="Organize shared work once, then keep each framework's scope, ownership, and evidence clear."
        accent="mint"
        motionEnabled={motionEnabled}
      />
      <section className="section">
        <div className="shell">
          <div className="mb-12 flex items-center justify-between gap-[30px] max-[760px]:flex-col max-[760px]:items-stretch">
            <DirectorySearch
              label="Search frameworks"
              value={query}
              onChange={setQuery}
            />
            <DirectoryFilters
              items={frameworkTypes}
              value={filter}
              onChange={setFilter}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 max-[760px]:gap-3">
            {visibleFrameworks.map((framework) => (
              <article
                className="flex min-h-[330px] flex-col items-start rounded-3xl border border-line bg-white p-7 transition-[transform,box-shadow] hover:-translate-y-1.5 hover:shadow-elevated max-[760px]:min-h-[270px]"
                key={framework.slug}
              >
                <span className="font-mono text-[.58rem] font-medium leading-none uppercase text-teal">
                  {framework.type}
                </span>
                <h2 className="mt-[60px]">{framework.code}</h2>
                <p className="text-[.78rem] leading-[1.65] text-muted">{framework.summary}</p>
                {framework.comingSoon ? (
                  <small className="mt-auto text-muted">Detailed guide coming soon</small>
                ) : (
                  <Link
                    className="mt-auto flex gap-2 text-[.73rem] text-teal [&>svg]:w-[15px]"
                    to={`/frameworks/${framework.slug}`}
                  >
                    Explore the framework <ArrowUpRight aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <FrameworkSection motionEnabled={motionEnabled} />
      <ConversionBand title="Bring your framework roadmap into one view." />
    </>
  );
}
