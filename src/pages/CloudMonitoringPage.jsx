import {
  ArrowRight,
  CheckCircle,
  Cloud,
  CloudCheck,
  Database,
  DesktopTower,
  Fingerprint,
  IdentificationCard,
  ListChecks,
  MagnifyingGlass,
  ShieldWarning,
  SquaresFour,
  Ticket,
  WarningCircle,
} from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { motion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundPixelStars from '../components/BackgroundPixelStars';
import IntegrationLogo from '../components/IntegrationLogo';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import WaveDivider from '../components/WaveDivider';
import { useSiteMotion } from '../context/MotionContext';
import { brandAssets } from '../data/brandAssets';
import {
  cloudMonitoringClosing,
  cloudMonitoringHero,
  cloudMonitoringMeta,
  cloudSignals,
  cloudVisibility,
  connectedWorkflows,
  exposureMonitoring,
  identityVisibility,
} from '../data/cloudMonitoringContent';

const signalIcons = [Database, ShieldWarning, ListChecks, MagnifyingGlass];
const signalIllustrations = [
  '/assets/cloud-monitoring/1.svg',
  '/assets/cloud-monitoring/2.svg',
  '/assets/cloud-monitoring/3.svg',
  '/assets/cloud-monitoring/4.svg',
];
const exposureIcons = [IdentificationCard, Fingerprint, CloudCheck, WarningCircle];
const providerVisuals = [
  { left: '50%', top: '12%', float: 5, duration: 5.2, tooltip: 'Cloud assets', color: '#087F8C', points: [[350, 98], [378, 148], [368, 198], [350, 258]] },
  { left: '89%', top: '35%', float: 7, duration: 6.4, tooltip: 'Configuration signals', color: '#35A9E8', points: [[614, 210], [560, 246], [528, 298], [442, 324]] },
  { left: '11%', top: '35%', float: 6, duration: 5.8, tooltip: 'Cloud resources', color: '#26D8AD', points: [[86, 210], [140, 246], [172, 298], [258, 324]] },
  { left: '21%', top: '83%', float: 7, duration: 6.8, tooltip: 'Identity & endpoint', color: '#62AEF7', points: [[178, 448], [214, 432], [212, 410], [238, 398]] },
  { left: '79%', top: '83%', float: 5, duration: 5.5, tooltip: 'Workspace identities', color: '#20CFA4', points: [[522, 448], [486, 432], [488, 410], [462, 398]] },
];
const signalOrder = [0, 1, 3, 4, 2];

function BrandTile({ brandKey, fallback = Cloud, size = 'card' }) {
  return <IntegrationLogo brand={brandAssets[brandKey]} fallback={fallback} size={size} />;
}

function PlanetNodeLogo({ provider }) {
  const brand = brandAssets[provider.brandKey];
  return (
    <img
      alt=""
      className={brand?.format === 'wordmark' ? 'max-h-8 w-10 object-contain sm:w-[4.6rem] lg:w-20' : 'size-8 object-contain sm:size-10'}
      data-brand-logo=""
      decoding="async"
      src={brand?.src}
    />
  );
}

function SectionHeading({ content, id, className = '' }) {
  return (
    <header className={className}>
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 id={id}>{content.title}</h2>
      <p className="lede mt-6">{content.description}</p>
    </header>
  );
}

function SignalGraphic({ Icon, index }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[12px] border border-white/10 bg-navy" data-signal-graphic="" aria-hidden="true">
      <img alt="" className="size-full object-cover opacity-92" decoding="async" src={signalIllustrations[index]} />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,27,50,.48),transparent_52%)]" />
      <span className="absolute bottom-3 left-3 flex size-9 items-center justify-center rounded-full border border-mint/35 bg-navy/88 shadow-[0_10px_24px_rgba(0,0,0,.3)] backdrop-blur-md">
        <Icon className="size-4.5 text-mint" weight="duotone" />
      </span>
    </div>
  );
}

function connectorPath(points) {
  return `M ${points[0].join(' ')} C ${points.slice(1).map((point) => point.join(' ')).join(', ')}`;
}

function connectorSamples(points) {
  return Array.from({ length: 13 }, (_, index) => {
    const progress = index / 12;
    const inverse = 1 - progress;
    return {
      x: (inverse ** 3 * points[0][0]) + (3 * inverse ** 2 * progress * points[1][0]) + (3 * inverse * progress ** 2 * points[2][0]) + (progress ** 3 * points[3][0]),
      y: (inverse ** 3 * points[0][1]) + (3 * inverse ** 2 * progress * points[1][1]) + (3 * inverse * progress ** 2 * points[2][1]) + (progress ** 3 * points[3][1]),
    };
  });
}

function ProviderNode({ activeProvider, index, motionEnabled, onActivate, onDeactivate, onSelect, provider, signalActive }) {
  const visual = providerVisuals[index];
  const inactive = activeProvider !== null && activeProvider !== index;
  const highlighted = activeProvider === index || signalActive;

  return (
    <li className={`absolute z-20 transition-opacity duration-300 ${inactive ? 'opacity-55' : 'opacity-100'}`} data-planet-node="" data-signal-active={signalActive ? 'true' : 'false'} style={{ left: visual.left, top: visual.top, transform: 'translate(-50%, -50%)' }}>
      <motion.div animate={{ opacity: 1, scale: 1 }} initial={motionEnabled ? { opacity: 0, scale: 0.84 } : false} transition={{ delay: 0.42 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <motion.button
          animate={{
            borderColor: highlighted ? 'rgba(38,216,173,.72)' : 'rgba(6,27,50,.08)',
            boxShadow: highlighted ? '0 18px 42px rgba(8,127,140,.18), 0 0 0 5px rgba(38,216,173,.08)' : '0 13px 34px rgba(6,27,50,.1)',
            scale: activeProvider === index ? 1.06 : 1,
            y: motionEnabled ? [0, -visual.float, 0] : 0,
          }}
          aria-describedby={`cloud-node-detail-${index}`}
          aria-label={`${provider.name}: ${visual.tooltip}`}
          className="relative flex size-14 items-center justify-center rounded-full border bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal sm:size-20 lg:size-24"
          onBlur={onDeactivate}
          onClick={() => onSelect(index)}
          onFocus={() => onActivate(index)}
          onMouseEnter={() => onActivate(index)}
          onMouseLeave={onDeactivate}
          transition={{
            borderColor: { duration: 0.2 },
            boxShadow: { duration: 0.2 },
            scale: { duration: 0.2 },
            y: motionEnabled ? { delay: 0.8 + index * 0.12, duration: visual.duration, ease: 'easeInOut', repeat: Infinity } : { duration: 0 },
          }}
          type="button"
        >
          <PlanetNodeLogo provider={provider} />
          <span className="sr-only">{provider.name}</span>
          <span className={`pointer-events-none absolute left-1/2 top-[calc(100%+.55rem)] hidden w-max -translate-x-1/2 rounded-[10px] border border-navy/8 bg-white px-3 py-2 text-[.58rem] font-medium leading-4 text-navy shadow-[0_12px_28px_rgba(6,27,50,.12)] transition duration-200 sm:block ${activeProvider === index ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`} id={`cloud-node-detail-${index}`} role="tooltip">
            {visual.tooltip}
          </span>
        </motion.button>
      </motion.div>
    </li>
  );
}

function CloudOrbitPlanet({ motionEnabled, providers }) {
  const signalTimerRef = useRef(null);
  const [activeProvider, setActiveProvider] = useState(null);
  const [signalIndex, setSignalIndex] = useState(-1);
  const [signalNonce, setSignalNonce] = useState(0);
  const highlightedProvider = activeProvider ?? (signalIndex >= 0 ? signalIndex : null);
  const activeVisual = signalIndex >= 0 ? providerVisuals[signalIndex] : null;
  const activeSamples = activeVisual ? connectorSamples(activeVisual.points) : [];

  useEffect(() => {
    if (!motionEnabled) {
      setSignalIndex(-1);
      return undefined;
    }

    const timers = [];
    const schedule = () => {
      signalOrder.forEach((providerIndex, index) => {
        const start = 1500 + index * 1650;
        timers.push(window.setTimeout(() => {
          setSignalIndex(providerIndex);
          setSignalNonce((nonce) => nonce + 1);
        }, start));
        timers.push(window.setTimeout(() => setSignalIndex((current) => (current === providerIndex ? -1 : current)), start + 1100));
      });
    };

    schedule();
    const interval = window.setInterval(schedule, 10500);
    return () => {
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
    };
  }, [motionEnabled]);

  useEffect(() => () => window.clearTimeout(signalTimerRef.current), []);

  const handleNodeSelect = (index) => {
    setSignalIndex(index);
    setSignalNonce((nonce) => nonce + 1);
    window.clearTimeout(signalTimerRef.current);
    signalTimerRef.current = window.setTimeout(() => setSignalIndex(-1), 1100);
  };

  return (
    <motion.figure
      animate={{ opacity: 1, scale: 1, x: 0 }}
      aria-label="Interactive Controllo cloud orbit system"
      className="relative m-0 mx-auto aspect-[1.186] w-full max-w-155 lg:-ml-8 lg:w-[48vw] lg:max-w-[43.75rem]"
      data-cloud-orbit=""
      initial={motionEnabled ? { opacity: 0, scale: 0.985, x: 22 } : false}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(38,216,173,.2),rgba(191,244,232,.1)_42%,transparent_72%)] blur-2xl" aria-hidden="true" />
      <div className="cyber-hero-orbit cyber-hero-orbit--outer cloud-hero-orbit cloud-hero-orbit--outer" aria-hidden="true" />
      <div className="cyber-hero-orbit cloud-hero-orbit cloud-hero-orbit--inner" aria-hidden="true" />
      <div className="cyber-hero-orbit-field opacity-55" data-motion={motionEnabled ? 'animated' : 'static'} aria-hidden="true">
        <span className="cyber-hero-orbit-track cyber-hero-orbit-track--outer cloud-hero-orbit-track cloud-hero-orbit-track--outer">
          {['primary', 'secondary'].map((emblem) => (
            <span className={`cyber-hero-orbit-planet cyber-hero-orbit-planet--${emblem}`} key={emblem}>
              <img alt="" draggable={false} src="/assets/emblemLogo.svg" />
            </span>
          ))}
        </span>
        <span className="cyber-hero-orbit-track cloud-hero-orbit-track cloud-hero-orbit-track--inner">
          {['primary', 'secondary'].map((emblem) => (
            <span className={`cyber-hero-orbit-planet cyber-hero-orbit-planet--${emblem}`} key={`inner-${emblem}`}>
              <img alt="" draggable={false} src="/assets/emblemLogo.svg" />
            </span>
          ))}
        </span>
      </div>
      <motion.svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 700 590">
        {providerVisuals.map((visual, index) => {
          const highlighted = highlightedProvider === index;
          const quiet = activeProvider !== null && !highlighted;
          return (
            <motion.path
              animate={{ opacity: quiet ? 0 : highlighted ? 1 : 0.42, pathLength: 1, stroke: highlighted ? '#26D8AD' : visual.color }}
              d={connectorPath(visual.points)}
              fill="none"
              initial={motionEnabled ? { opacity: 0, pathLength: 0 } : false}
              key={providers[index].name}
              strokeLinecap="round"
              strokeWidth={highlighted ? 2.4 : 1.7}
              transition={{ delay: motionEnabled ? 0.2 + index * 0.08 : 0, duration: 0.65, ease: 'easeOut' }}
            />
          );
        })}
        {[{ x: 130, y: 112 }, { x: 565, y: 142 }, { x: 92, y: 390 }, { x: 612, y: 372 }, { x: 350, y: 548 }].map((dot, index) => (
          <motion.circle animate={motionEnabled ? { opacity: [0.25, 0.9, 0.25], r: [4, 6, 4] } : { opacity: 0.55, r: 4 }} cx={dot.x} cy={dot.y} fill="#26D8AD" key={`${dot.x}-${dot.y}`} transition={{ delay: index * 0.45, duration: 3.8 + index * 0.35, ease: 'easeInOut', repeat: motionEnabled ? Infinity : 0 }} />
        ))}
        {activeVisual && motionEnabled && (
          <motion.circle
            animate={{ cx: activeSamples.map((point) => point.x), cy: activeSamples.map((point) => point.y), opacity: [0, 1, 1, 0], r: [4, 6, 6, 4] }}
            fill="#26D8AD"
            initial={{ cx: activeSamples[0].x, cy: activeSamples[0].y, opacity: 0, r: 4 }}
            key={signalNonce}
            transition={{ duration: 1.05, ease: [0.45, 0, 0.2, 1] }}
          />
        )}
      </motion.svg>

      <div className="pointer-events-none absolute left-1/2 top-[52%] z-10 size-[36%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-[16%] rounded-[34%] bg-mint/12 blur-xl" aria-hidden="true" />
        <div className="absolute -inset-[6%] rounded-[30%] border border-mint/18" aria-hidden="true" />
        <motion.div
          animate={{
            boxShadow: signalIndex >= 0 ? '0 28px 70px rgba(8,127,140,.22), 0 0 0 10px rgba(38,216,173,.1)' : '0 24px 60px rgba(6,27,50,.12), 0 0 0 7px rgba(38,216,173,.05)',
            opacity: 1,
            scale: motionEnabled ? (signalIndex >= 0 ? [1, 1.025, 1] : [1, 1.01, 1]) : 1,
          }}
          className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-[26%] border border-white/90 bg-white/86 backdrop-blur-md"
          initial={motionEnabled ? { opacity: 0, scale: 0.94 } : false}
          transition={{ boxShadow: { duration: 0.25 }, opacity: { duration: 0.6 }, scale: { duration: signalIndex >= 0 ? 1 : 5.6, ease: 'easeInOut', repeat: motionEnabled && signalIndex < 0 ? Infinity : 0 } }}
        >
          <div className="absolute inset-[7%] rounded-[22%] border border-teal/8" aria-hidden="true" />
          <img alt="" className="relative w-[31%] drop-shadow-[0_8px_20px_rgba(6,27,50,.13)]" src="/assets/emblemLogo.svg" />
          <span className="relative mt-[8%] text-[clamp(.56rem,1.35vw,.95rem)] font-bold uppercase text-navy">Controllo</span>
          <span className="relative mt-[2%] font-mono text-[clamp(.36rem,.72vw,.57rem)] font-semibold uppercase text-teal">Cloud monitoring</span>
        </motion.div>
      </div>

      <ul className="absolute inset-0 m-0 list-none p-0" aria-label="Connected cloud and workforce environments">
        {providers.map((provider, index) => (
          <ProviderNode activeProvider={activeProvider} index={index} key={provider.name} motionEnabled={motionEnabled} onActivate={setActiveProvider} onDeactivate={() => setActiveProvider(null)} onSelect={handleNodeSelect} provider={provider} signalActive={signalIndex === index} />
        ))}
      </ul>

      <motion.div animate={{ opacity: 1, y: 0 }} className="pointer-events-none absolute right-[3%] top-[5%] z-30 hidden items-center gap-2 rounded-full border border-white/90 bg-white/90 px-4 py-2.5 text-[.68rem] font-medium text-navy shadow-[0_12px_30px_rgba(6,27,50,.09)] backdrop-blur-sm sm:flex" initial={motionEnabled ? { opacity: 0, y: 8 } : false} transition={{ delay: motionEnabled ? 0.92 : 0, duration: 0.45 }}>
        <span className="size-2 rounded-full bg-mint shadow-[0_0_10px_rgba(38,216,173,.55)]" />
        Cloud and workforce coverage
      </motion.div>

      <motion.div animate={{ opacity: 1, y: 0 }} className="pointer-events-none absolute left-1/2 top-[80%] z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/90 bg-white/92 px-3.5 py-2.5 text-[.62rem] font-medium whitespace-nowrap text-navy shadow-[0_12px_30px_rgba(6,27,50,.1)] backdrop-blur-sm sm:px-4 sm:text-[.68rem]" initial={motionEnabled ? { opacity: 0, y: 8 } : false} transition={{ delay: motionEnabled ? 1 : 0, duration: 0.45 }}>
        <span className="size-2 rounded-full bg-mint" />
        Assets, alerts, and access activity
        <ArrowRight aria-hidden="true" className="size-3.5" />
      </motion.div>

      <figcaption className="sr-only">Supported AWS, Microsoft Azure, Google Cloud, Microsoft 365, and Google Workspace environments flow into a shared Controllo monitoring view.</figcaption>
    </motion.figure>
  );
}

function CloudHero({ motionEnabled }) {
  const titleLead = cloudMonitoringHero.title.replace(cloudMonitoringHero.titleAccent, '').trim();
  const supportItems = cloudMonitoringHero.support.split('. ').slice(0, 3);

  return (
    <section className="cloud-hero relative isolate flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-mist pt-12 pb-48 max-[1080px]:min-h-0 max-[1080px]:pt-28 max-[1080px]:pb-36 max-[760px]:pt-26" aria-labelledby="cloud-monitoring-title" data-cloud-hero="" data-motion={motionEnabled ? 'animated' : 'static'}>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[68%] bg-[radial-gradient(circle_at_64%_40%,rgba(38,216,173,.19),transparent_58%)]" aria-hidden="true" />
      <div className="shell relative grid items-center gap-11 lg:grid-cols-[minmax(0,.92fr)_minmax(31rem,1.08fr)] lg:gap-8">
        <Reveal className="max-w-[620px]" motionEnabled={motionEnabled} data-hero-copy="">
          <p className="eyebrow mb-5">{cloudMonitoringHero.eyebrow}</p>
          <h1
            className="max-w-[690px] text-balance text-[3rem] leading-[1.04] min-[760px]:text-[3.45rem] min-[1180px]:text-[3.65rem] max-[420px]:text-[2.6rem]"
            id="cloud-monitoring-title"
            aria-label={`${cloudMonitoringHero.title} ${cloudMonitoringHero.titleAccent}`}
          >
            <span className="block">{titleLead}</span>
            <span className="hero-title-accent block">{cloudMonitoringHero.titleAccent}</span>
          </h1>
          <p className="lede mt-6 max-w-[560px] text-pretty">{cloudMonitoringHero.description}</p>
          <ul className="mt-6 flex max-w-[560px] flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[.6rem] font-medium uppercase leading-5 tracking-[.08em] text-teal" aria-label="Cloud monitoring proof points">
            {supportItems.map((item, index) => (
              <li className="flex items-center gap-3" key={item}>
                <span>{item}</span>
                {index < supportItems.length - 1 ? <span className="h-4 w-px bg-line" aria-hidden="true" /> : null}
              </li>
            ))}
          </ul>
          <div className="action-row mt-7 max-[460px]:grid">
            <Link className="button button--mint" to="/demo">Request a Demo</Link>
            <a className="button button--ghost" href="#cloud-visibility">
              View monitoring signals
            </a>
          </div>
        </Reveal>
        <CloudOrbitPlanet motionEnabled={motionEnabled} providers={cloudMonitoringHero.providers} />
      </div>
      <WaveDivider front="#fbfdfc" />
    </section>
  );
}

function CloudVisibilitySection({ motionEnabled }) {
  const flowRows = [104, 230, 356];

  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-[#fbfdfc] py-12 sm:py-14" id="cloud-visibility" aria-labelledby="cloud-visibility-title" data-visibility-section="">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(8,127,140,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(8,127,140,.1)_1px,transparent_1px)] bg-[size:7rem_7rem] opacity-85" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] bg-[radial-gradient(circle_at_72%_48%,rgba(38,216,173,.13),transparent_68%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,#fbfdfc_0%,rgba(255,255,255,.94)_34%,rgba(255,255,255,.5)_68%,transparent_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[56%] bg-[radial-gradient(ellipse_at_18%_48%,rgba(255,255,255,.98)_0%,rgba(255,255,255,.82)_38%,rgba(255,255,255,.32)_64%,transparent_82%)]" aria-hidden="true" />
      <div className="shell">
        <Reveal className="relative overflow-visible" motionEnabled={motionEnabled}>
          <div className="relative grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
            <div className="max-w-135">
              <SectionHeading content={cloudVisibility} id="cloud-visibility-title" className="max-w-130" />
              <p className="mt-8 inline-flex max-w-full items-center gap-3 font-mono text-[.64rem] font-medium uppercase leading-5 tracking-[.08em] text-teal before:h-px before:w-8 before:shrink-0 before:bg-mint">{cloudVisibility.highlight}</p>
            </div>

            <div className="relative lg:min-h-[32rem] lg:w-[calc(100%+max(8rem,((100vw-77.5rem)/2))+14rem)]">
              <motion.svg
                className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[42.5rem] max-w-none overflow-visible lg:block"
                initial={motionEnabled ? { opacity: 0 } : false}
                whileInView={motionEnabled ? { opacity: 1 } : undefined}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewBox="0 0 680 460"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {flowRows.map((targetY, index) => (
                  <motion.path
                    d={`M 126 230 C 190 230, 190 ${targetY}, 264 ${targetY}`}
                    fill="none"
                    initial={motionEnabled ? { pathLength: 0 } : false}
                    whileInView={motionEnabled ? { pathLength: 1 } : undefined}
                    viewport={{ once: true, margin: '-20% 0px' }}
                    stroke="#26D8AD"
                    strokeWidth={index === 1 ? 2.8 : 2.5}
                    strokeLinecap="round"
                    opacity={index === 1 ? 0.9 : 0.72}
                    transition={{ duration: 0.9, delay: index * 0.12, ease: 'easeOut' }}
                    key={targetY}
                  />
                ))}
              </motion.svg>

              <span className="pointer-events-none absolute left-[126px] top-1/2 z-20 hidden size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex" aria-hidden="true">
                <motion.span
                  animate={motionEnabled ? { scale: [1, 1.28, 1], opacity: [0.5, 1, 0.5] } : undefined}
                  className="absolute inset-0 rounded-full border-[1.5px] border-mint"
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="size-3.5 rounded-full bg-mint" />
              </span>

              <motion.div
                className="absolute left-0 top-1/2 hidden w-32 -translate-y-1/2 text-center lg:block"
                initial={motionEnabled ? { opacity: 0, scale: 0.96 } : false}
                whileInView={motionEnabled ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0, delay: 0.18 }}
              >
                <div className="relative mx-auto flex size-20 items-center justify-center rounded-full border border-teal/18 bg-white/72 shadow-[0_18px_42px_rgba(6,27,50,.07)] backdrop-blur-sm">
                  <span className="absolute inset-2 rounded-full border border-mint/35" aria-hidden="true" />
                  <img className="relative size-10" src="/assets/emblemLogo.svg" alt="" decoding="async" />
                </div>
                <p className="mt-4 font-mono text-[.56rem] uppercase tracking-[.12em] text-teal">Controllo</p>
                <p className="mt-1 text-[.7rem] font-medium text-navy">Asset register</p>
              </motion.div>

            <ul className="relative z-10 m-0 grid list-none gap-4 p-0 lg:absolute lg:inset-y-0 lg:left-[16.5rem] lg:min-w-[52rem] lg:w-[calc(100%-16.5rem)]" aria-label="Cloud infrastructure providers">
              {cloudVisibility.providers.map(([name, description, brandKey], index) => {
                return (
                  <motion.li
                    className="lg:absolute lg:left-0 lg:w-full"
                    initial={motionEnabled ? { opacity: 0, x: 220 } : false}
                    whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
                    viewport={{ once: true, margin: '-18% 0px' }}
                    style={{ top: `calc(${flowRows[index] / 460 * 100}% - 3.5rem)` }}
                    transition={{ type: 'spring', duration: 0.3, bounce: 0, delay: 0.18 + index * 0.08 }}
                    key={name}
                  >
                    <span className="absolute left-0 top-14 z-20 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#fbfdfc] bg-mint shadow-[0_0_0_5px_rgba(38,216,173,.12)] lg:block" aria-hidden="true" />
                    <div className="relative grid min-h-27 w-full grid-cols-[4.75rem_1fr] items-center gap-5 rounded-l-[2rem] bg-[linear-gradient(90deg,rgba(255,255,255,.86)_0%,rgba(255,255,255,.76)_72%,rgba(255,255,255,0)_50%)] py-4 pl-5 pr-20 text-left shadow-[0_14px_40px_rgba(6,27,50,.06)] backdrop-blur-sm lg:h-28">
                      <span className="relative z-10 flex size-15 items-center justify-center rounded-full border border-line/70 bg-white shadow-[0_10px_24px_rgba(6,27,50,.055),inset_0_0_0_7px_rgba(8,127,140,.025)]">
                        <BrandTile brandKey={brandKey} size="inline" />
                      </span>
                      <span className="lg:max-w-[clamp(20rem,calc(100vw-63.5rem),36rem)]">
                        <span className="block text-[1.02rem] font-semibold text-navy">{name}</span>
                        <span className="mt-1.5 block text-pretty text-[.76rem] leading-6 text-muted">{description}</span>
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SignalsSection({ motionEnabled }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white" aria-labelledby="cloud-signals-title" data-signal-section="">
      <div className="pointer-events-none absolute inset-0 bg-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=')] bg-[size:10px] opacity-55" aria-hidden="true" data-background-pixel-grid="" />
      <BackgroundPixelStars motionEnabled={motionEnabled} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[64%] bg-[radial-gradient(circle_at_58%_48%,rgba(8,127,140,.2),transparent_66%)]" aria-hidden="true" />
      <div className="shell relative grid min-h-[calc(100svh-84px)] items-center gap-16 py-28 sm:py-32 lg:grid-cols-[minmax(0,.95fr)_minmax(31rem,1.05fr)] lg:gap-8 lg:py-28" data-signal-stage="">
        <Reveal className="max-w-155 lg:pr-4" motionEnabled={motionEnabled}>
          <SectionHeading content={cloudSignals} id="cloud-signals-title" className="[&_.eyebrow]:text-mint [&_.lede]:text-[#c7d4de]" />
          <div className="mt-8 flex max-w-145 items-start gap-3">
            <MagnifyingGlass className="mt-1 size-4.5 shrink-0 text-mint" aria-hidden="true" />
            <p className="m-0 text-[.84rem] font-medium leading-6 text-[#d7e1e8]">{cloudSignals.highlight}</p>
          </div>
        </Reveal>

        <ol className="relative m-0 grid list-none gap-4 p-0 lg:h-[38rem] lg:block" aria-label="From cloud asset to actionable signal" data-signal-stack="">
          {cloudSignals.steps.map(([title, description], index) => {
            const Icon = signalIcons[index];
            return (
              <li
                className={`relative overflow-hidden rounded-[20px] border border-white/14 bg-[linear-gradient(145deg,rgba(20,53,78,.98),rgba(7,27,48,.96))] p-5 shadow-[0_28px_65px_rgba(0,0,0,.34)] backdrop-blur-xl transition-colors duration-300 lg:w-[33rem] lg:max-w-full lg:hover:border-mint/35 ${motionEnabled ? 'lg:absolute lg:left-1/2 lg:top-1/2 lg:will-change-transform' : ''}`}
                data-signal-card=""
                key={title}
              >
                <SignalGraphic Icon={Icon} index={index} />
                <div className="mt-5 px-1 pb-1">
                  <h3 className="text-[1.1rem] text-white">{title}</h3>
                  <p className="mt-2 max-w-125 text-[.78rem] leading-6 text-[#b8c8d5]">{description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function IdentitySection({ motionEnabled }) {
  return (
    <section className="section bg-mist" aria-labelledby="identity-visibility-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-22">
        <Reveal motionEnabled={motionEnabled}>
          <SectionHeading content={identityVisibility} id="identity-visibility-title" />
          <p className="mt-8 font-mono text-[.64rem] font-medium uppercase tracking-[.08em] text-teal">{identityVisibility.highlight}</p>
        </Reveal>

        <Reveal className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_24px_60px_rgba(6,27,50,.1)]" delay={0.08} motionEnabled={motionEnabled}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-7">
            <div>
              <p className="font-mono text-[.57rem] uppercase tracking-[.1em] text-teal">Workforce visibility</p>
              <h3 className="mt-1 text-[1rem]">Identity & endpoint context</h3>
            </div>
            <DesktopTower className="size-5 text-teal" aria-hidden="true" />
          </div>
          <div className="divide-y divide-line px-5 sm:px-7" data-motion-sequence="">
            {identityVisibility.sources.map(([name, description], index) => (
              <div className="grid gap-4 py-6 sm:grid-cols-[8rem_1fr] sm:items-start" key={name}>
                <div className="flex min-h-11 items-center gap-2.5">
                  {index === 1 ? <BrandTile brandKey="googleWorkspace" size="inline" /> : <SquaresFour className="size-5 text-teal" aria-hidden="true" />}
                  {index === 0 && <strong className="text-[.72rem] font-medium">{name}</strong>}
                  {index === 1 && <span className="sr-only">{name}</span>}
                </div>
                <p className="m-0 text-[.74rem] leading-6 text-muted">{description}</p>
              </div>
            ))}
          </div>
          <ul className="m-0 grid list-none grid-cols-2 border-t border-line bg-[#f8fbfa] p-0 sm:grid-cols-4" aria-label="Identity and endpoint signals">
            {identityVisibility.signals.map((signal) => (
              <li className="flex min-h-20 items-center justify-center border-b border-r border-line px-3 text-center text-[.64rem] font-medium text-navy last:border-r-0 sm:border-b-0" key={signal}>{signal}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ExposureSection({ motionEnabled }) {
  return (
    <section className="section bg-white" aria-labelledby="exposure-monitoring-title">
      <div className="shell">
        <Reveal className="section-heading section-heading--split max-[760px]:grid-cols-1 max-[760px]:gap-7" motionEnabled={motionEnabled}>
          <div>
            <p className="eyebrow">{exposureMonitoring.eyebrow}</p>
            <h2 id="exposure-monitoring-title">{exposureMonitoring.title}</h2>
          </div>
          <p className="lede">{exposureMonitoring.description}</p>
        </Reveal>

        <div className="grid border-y border-line lg:grid-cols-[1.15fr_.85fr]">
          <div className="grid gap-4 py-7 lg:pr-8" data-exposure-stack="">
            {exposureMonitoring.signals.map(([title, description], index) => {
              const Icon = exposureIcons[index];
              return (
                <Reveal className="min-h-44 rounded-[8px] border border-line bg-white p-6 shadow-[0_16px_40px_rgba(6,27,50,.07)] lg:sticky lg:top-28" delay={index * 0.05} motionEnabled={false} data-stack-card="" key={title}>
                  <Icon className="size-5 text-teal" aria-hidden="true" />
                  <h3 className="mt-8 text-[1rem]">{title}</h3>
                  <p className="mt-3 text-[.72rem] leading-6 text-muted">{description}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="relative flex min-h-105 flex-col justify-between overflow-hidden bg-[#edf8f5] p-7 lg:border-l lg:border-line" delay={0.12} motionEnabled={motionEnabled}>
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border border-teal/10" aria-hidden="true" />
            <div>
              <p className="font-mono text-[.57rem] uppercase tracking-[.11em] text-teal">Exposure review</p>
              <h3 className="mt-2 text-[1.1rem]">Available indicator</h3>
            </div>
            <div className="rounded-[16px] border border-teal/15 bg-white p-5 shadow-[0_16px_38px_rgba(6,27,50,.08)]">
              <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                <span className="flex items-center gap-2 text-[.72rem] font-medium"><IdentificationCard className="size-4 text-teal" aria-hidden="true" /> Organizational user</span>
                <span className="font-mono text-[.54rem] uppercase tracking-[.08em] text-teal">Review</span>
              </div>
              <dl className="mt-4 grid gap-3 text-[.66rem]">
                <div className="flex justify-between gap-4"><dt className="text-muted">Indicator</dt><dd className="font-medium text-navy">Credential data available</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Context</dt><dd className="font-medium text-navy">Source recorded</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted">Next step</dt><dd className="font-medium text-navy">Security review</dd></div>
              </dl>
            </div>
            <p className="mt-8 border-t border-teal/20 pt-5 text-[.72rem] leading-6 text-muted">{exposureMonitoring.highlight}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection({ motionEnabled }) {
  const icons = [ShieldWarning, MagnifyingGlass, IdentificationCard, CheckCircle];

  return (
    <section className="section bg-mist" aria-labelledby="connected-workflows-title">
      <div className="shell">
        <Reveal className="mx-auto max-w-205 text-center" motionEnabled={motionEnabled}>
          <SectionHeading content={connectedWorkflows} id="connected-workflows-title" className="[&_.lede]:mx-auto" />
        </Reveal>

        <ol className="mx-auto mt-15 grid max-w-250 list-none grid-flow-dense grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-line bg-line p-0 md:grid-cols-4" aria-label="Signal review workflow" data-motion-sequence="">
          {connectedWorkflows.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <Reveal as="li" className="relative flex min-h-34 flex-col justify-between bg-white p-5" delay={index * 0.06} motionEnabled={motionEnabled} key={step}>
                <Icon className="size-5 text-teal" aria-hidden="true" />
                <span className="text-[.82rem] font-medium text-navy">{step}</span>
                {index < connectedWorkflows.steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 rounded-full bg-mint p-1 text-navy md:block" weight="bold" aria-hidden="true" />}
              </Reveal>
            );
          })}
        </ol>

        <div className="mx-auto mt-10 grid max-w-250 border-t border-line md:grid-cols-3" data-motion-sequence="">
          {connectedWorkflows.destinations.map(([name, description, brandKey], index) => (
            <Reveal className="border-b border-line py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0" delay={index * 0.06} motionEnabled={motionEnabled} key={name}>
              <div className="flex min-h-10 items-center gap-3">
                {brandKey ? <BrandTile brandKey={brandKey} size="inline" /> : index === 1 ? <IdentificationCard className="size-5 text-teal" aria-hidden="true" /> : <Ticket className="size-5 text-teal" aria-hidden="true" />}
                <h3 className="text-[.95rem]">{name}</h3>
              </div>
              <p className="mt-3 text-[.72rem] leading-6 text-muted">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection({ motionEnabled }) {
  return (
    <section className="bg-white py-10 sm:py-14" aria-labelledby="cloud-monitoring-closing-title">
      <Reveal className="shell relative overflow-hidden rounded-[8px] bg-navy px-6 py-18 text-center text-white sm:px-12 sm:py-22" motionEnabled={motionEnabled}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(38,216,173,.2),transparent_48%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-205">
          <p className="eyebrow text-mint">{cloudMonitoringClosing.eyebrow}</p>
          <h2 className="mx-auto text-white" id="cloud-monitoring-closing-title">{cloudMonitoringClosing.title}</h2>
          <p className="mx-auto mt-6 max-w-170 text-[.9rem] leading-7 text-[#c7d4de]">{cloudMonitoringClosing.description}</p>
          <p className="mx-auto mt-3 max-w-160 text-[.76rem] leading-6 text-[#9fb2c2]">{cloudMonitoringClosing.detail}</p>
          <Link className="button button--mint button--directional mt-9 focus-visible:outline-white" to="/demo">
            Explore Cloud Monitoring <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function useCloudMonitoringMotion(rootRef, motionEnabled) {
  useLayoutEffect(() => {
    if (!motionEnabled || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const select = gsap.utils.selector(rootRef.current);
      const heroCopy = select('[data-hero-copy]')[0];

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(heroCopy?.children ?? [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 });

      select('section h2').forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0.18, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: heading, start: 'top 88%', end: 'top 58%', scrub: 0.55 },
          },
        );
      });

      select('[data-motion-sequence]').forEach((sequence) => {
        const targets = Array.from(sequence.children).flatMap((item) => Array.from(item.children));
        if (!targets.length) return;
        gsap.fromTo(
          targets,
          { opacity: 0.14, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.035,
            ease: 'none',
            scrollTrigger: { trigger: sequence, start: 'top 88%', end: 'bottom 56%', scrub: 0.65 },
          },
        );
      });

      select('[data-stack-card]').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.24, scale: 0.88, y: 76 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 42%', scrub: 0.7 },
          },
        );
      });

      media.add('(min-width: 1024px)', () => {
        const signalSection = select('[data-signal-section]')[0];
        const signalCards = select('[data-signal-card]');
        if (signalSection && signalCards.length > 1) {
          const cardState = (activeIndex) => ({
            x: (index) => (index < activeIndex ? -56 : (index - activeIndex) * 28),
            y: (index) => (index < activeIndex ? -176 - (activeIndex - index) * 18 : (index - activeIndex) * 70),
            rotation: (index) => (index < activeIndex ? -3 : (index - activeIndex) * 1.25),
            scale: (index) => (index < activeIndex ? 0.9 : 1 - (index - activeIndex) * 0.035),
            opacity: (index) => (index < activeIndex ? 0 : 1 - (index - activeIndex) * 0.12),
            zIndex: (index) => (index < activeIndex ? 0 : signalCards.length - (index - activeIndex)),
          });

          gsap.set(signalCards, { xPercent: -50, yPercent: -50, transformOrigin: 'center center', ...cardState(0) });

          const signalTimeline = gsap.timeline({
            scrollTrigger: {
              anticipatePin: 1,
              trigger: signalSection,
              start: 'top 84px',
              end: () => `+=${window.innerHeight * 2.6}`,
              scrub: 0.65,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          signalTimeline.to({}, { duration: 0.65 });
          signalCards.slice(1).forEach((_, index) => {
            signalTimeline.to(signalCards, { ...cardState(index + 1), duration: 0.72, ease: 'none' });
            signalTimeline.to({}, { duration: 0.65 });
          });
        }
      });
    }, rootRef);

    return () => {
      media.revert();
      context.revert();
    };
  }, [motionEnabled, rootRef]);
}

export default function CloudMonitoringPage() {
  const { motionEnabled } = useSiteMotion();
  const rootRef = useRef(null);
  useCloudMonitoringMotion(rootRef, motionEnabled);

  return (
    <>
      <PageMeta title={cloudMonitoringMeta.title} description={cloudMonitoringMeta.description} appendBrand={false} />
      <div className="w-full max-w-full overflow-x-clip" data-motion={motionEnabled ? 'animated' : 'static'} ref={rootRef}>
        <CloudHero motionEnabled={motionEnabled} />
        <CloudVisibilitySection motionEnabled={motionEnabled} />
        <SignalsSection motionEnabled={motionEnabled} />
        <IdentitySection motionEnabled={motionEnabled} />
        <ExposureSection motionEnabled={motionEnabled} />
        <WorkflowSection motionEnabled={motionEnabled} />
        <ClosingSection motionEnabled={motionEnabled} />
      </div>
    </>
  );
}
