import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Cloud, FileSearch, Radar, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { connectedCapabilities, platformDomains } from '../data/siteContent';

const domainIcons = {
  cybersecurity: ShieldCheck,
  privacy: FileSearch,
  'ai-governance': Bot
};

const capabilityIcons = {
  'risk-management': Radar,
  'cloud-monitoring': Cloud
};

function DomainPreview({ domain }) {
  const Icon = domainIcons[domain.id];
  const { preview } = domain;

  return (
    <div
      className="mx-auto w-full max-w-[32rem] overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_24px_60px_rgba(6,27,50,.10)]"
      role="img"
      aria-label={`${preview.label} product interface preview`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5.5 py-4.5 max-[420px]:px-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-mint-soft text-teal">
            <Icon className="size-4.5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <small className="block truncate font-mono text-[.56rem] font-medium tracking-[.08em] uppercase text-teal">
              {preview.label}
            </small>
            <strong className="mt-1 block truncate text-[.82rem]">{preview.title}</strong>
          </span>
        </span>
        <span className="shrink-0 rounded-[10px] bg-[#edf8f5] px-2.5 py-1.5 font-mono text-[.55rem] font-medium leading-none text-teal">
          {preview.meta}
        </span>
      </div>

      <div className="px-5.5 pt-6 pb-5 max-[420px]:px-4">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-5">
          <span>
            <small className="block text-[.64rem] text-muted">Current signal</small>
            <strong className="mt-1.5 block text-[1.5rem] tracking-[-.035em]">{preview.metric}</strong>
          </span>
          <span className="mb-1 inline-flex items-center gap-1.5 text-[.61rem] text-teal">
            <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
            Current
          </span>
        </div>

        <div className="grid gap-2.5">
          {preview.rows.map(([name, detail, status], index) => (
            <div
              className="grid min-h-15 grid-cols-[28px_1fr_auto] items-center gap-3 rounded-[14px] bg-field px-3.5 py-2.5"
              key={name}
            >
              <span className="grid size-7 place-items-center rounded-[9px] bg-navy/[.055] font-mono text-[.55rem] text-teal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-[.69rem]">{name}</strong>
                <small className="mt-0.5 block truncate text-[.6rem] text-muted">{detail}</small>
              </span>
              <span className="font-mono text-[.52rem] font-medium uppercase text-teal">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlatformSection({ motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeDomain = platformDomains[activeIndex];

  const selectTab = (index) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % platformDomains.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + platformDomains.length) % platformDomains.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = platformDomains.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    selectTab(nextIndex);
  };

  return (
    <section className="section bg-white" id="platform">
      <div className="shell">
        <Reveal className="mx-auto mb-12 max-w-205 text-center" motionEnabled={motionEnabled}>
          <p className="eyebrow">One connected platform</p>
          <h2 className="mx-auto">Everything connected by design.</h2>
          <p className="lede mx-auto mt-5.5">
            Run cybersecurity, privacy, and AI governance with the same control,
            evidence, risk, ownership, and audit context underneath.
          </p>
        </Reveal>

        <Reveal motionEnabled={motionEnabled} delay={0.05}>
          <div
            className="mx-auto mb-5 grid max-w-190 grid-cols-3 gap-1.5 rounded-[18px] border border-line bg-field p-1.5 max-[760px]:grid-cols-1"
            role="tablist"
            aria-label="Governance domains"
          >
            {platformDomains.map((domain, index) => (
              <button
                ref={(node) => { tabRefs.current[index] = node; }}
                className="min-h-12 cursor-pointer rounded-[13px] border-0 px-4 text-[1rem] font-medium transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button"
                id={`domain-tab-${domain.id}`}
                type="button"
                role="tab"
                aria-controls={`domain-panel-${domain.id}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                key={domain.id}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {domain.label}
              </button>
            ))}
          </div>

          <div className="min-[1081px]:h-142.5 overflow-hidden rounded-[30px] border border-teal/12 bg-[#edfffb] max-[760px]:rounded-[24px]">
            <motion.div
              className="grid size-full grid-cols-2 max-[1080px]:grid-cols-1"
              id={`domain-panel-${activeDomain.id}`}
              role="tabpanel"
              aria-labelledby={`domain-tab-${activeDomain.id}`}
              key={activeDomain.id}
              initial={motionEnabled ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionEnabled ? 0.24 : 0, ease: 'easeOut' }}
            >
              <div className="flex items-center px-11 py-12 max-[1080px]:px-8 max-[760px]:px-5.5 max-[760px]:py-9">
                <div className="mx-auto w-full max-w-120">
                  <p className="eyebrow mb-4">{activeDomain.eyebrow}</p>
                  <h3 className="max-w-115 text-[clamp(1.8rem,2.75vw,2.55rem)]">{activeDomain.title}</h3>
                  <p className="mt-5 mb-0 max-w-118 text-[.92rem] leading-[1.75] text-muted">{activeDomain.description}</p>
                  <ul className="mt-7 mb-8 grid list-none grid-cols-2 gap-x-5 gap-y-3 border-t border-navy/10 pt-6 pl-0 max-[420px]:grid-cols-1">
                    {activeDomain.features.map((feature) => (
                      <li className="flex items-center gap-2.5 text-[.69rem] text-nav-text" key={feature}>
                        <span className="size-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link className="inline-flex min-h-11 items-center gap-2 text-[.78rem] font-medium text-teal transition-colors hover:text-navy [&>svg]:size-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1" to={activeDomain.cta[1]}>
                    {activeDomain.cta[0]} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center border-l border-teal/10 bg-white/35 px-9 py-10 max-[1080px]:border-t max-[1080px]:border-l-0 max-[760px]:px-5 max-[760px]:py-8">
                <DomainPreview domain={activeDomain} />
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal
          className="mt-7 grid grid-cols-2 border-y border-line max-[760px]:grid-cols-1"
          motionEnabled={motionEnabled}
          delay={0.08}
        >
          <div className="contents" role="group" aria-label="Connected platform capabilities">
            {connectedCapabilities.map((capability, index) => {
              const Icon = capabilityIcons[capability.id];
              return (
                <article
                  className={`grid grid-cols-[42px_1fr] gap-4 py-7 ${index === 0 ? 'border-r border-line pr-8 max-[760px]:border-r-0 max-[760px]:border-b max-[760px]:pr-0' : 'pl-8 max-[760px]:pl-0'}`}
                  key={capability.id}
                >
                  <span className="grid size-10 place-items-center rounded-[13px] bg-mint-soft text-teal">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-2 font-mono text-[.56rem] font-medium tracking-[.1em] uppercase text-teal">{capability.eyebrow}</p>
                    <h3 className="text-[1.2rem]">{capability.title}</h3>
                    <p className="mt-2.5 mb-4 max-w-120 text-[.7rem] leading-[1.7] text-muted">{capability.description}</p>
                    <Link className="inline-flex min-h-11 items-center gap-2 text-[.7rem] font-medium text-teal hover:text-navy [&>svg]:size-3.5" to={capability.cta[1]}>
                      {capability.cta[0]} <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
