import { useState } from 'react';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import ConversionBand from '../components/ConversionBand';
import { DirectoryFilters, DirectorySearch } from '../components/DirectoryControls';
import { integrationCategories, integrations } from '../data/enterpriseContent';
import { useSiteMotion } from '../context/MotionContext';
import IntegrationLogo from '../components/IntegrationLogo';

export default function IntegrationsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const { motionEnabled } = useSiteMotion();
  const normalizedQuery = query.toLowerCase();
  const visibleIntegrations = integrations.filter(({ name, category }) => (
    (filter === 'All' || category === filter)
    && name.toLowerCase().includes(normalizedQuery)
  ));

  return (
    <>
      <PageMeta
        title="Integrations"
        description="Connect Controllo to the systems where security and compliance work already happens."
      />
      <PageHero
        eyebrow="Integrations"
        title="Bring evidence in without pulling teams out."
        description="Connect the systems where identity, cloud, code, and operational work already live."
        accent="teal"
        motionEnabled={motionEnabled}
      />
      <section className="section">
        <div className="shell">
          <div className="mb-12 flex items-center justify-between gap-[30px] max-[760px]:flex-col max-[760px]:items-stretch">
            <DirectorySearch
              label="Search integrations"
              value={query}
              onChange={setQuery}
            />
            <DirectoryFilters
              items={integrationCategories}
              value={filter}
              onChange={setFilter}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1">
            {visibleIntegrations.map(({ name, category, icon: Icon, brand }) => (
              <article
                className="grid min-h-[105px] grid-cols-[72px_1fr_auto] items-center gap-[14px] rounded-[18px] border border-line bg-white p-[18px] transition-[transform,background] hover:-translate-y-[3px] hover:bg-[#eff9f6] max-[760px]:min-h-[90px]"
                key={name}
              >
                <IntegrationLogo brand={brand} fallback={Icon} />
                <div>
                  <h2 className="text-[.84rem]! leading-[1.25]! [letter-spacing:-.02em]">{name}</h2>
                  <span className="text-[.62rem] text-muted">{category}</span>
                </div>
                <i className="not-italic text-teal" aria-hidden="true">→</i>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ConversionBand title="Connect the evidence stream around your program." />
    </>
  );
}
