import {
  ArrowDown,
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
import { animate, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IntegrationLogo from '../components/IntegrationLogo';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
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
const exposureIcons = [IdentificationCard, Fingerprint, CloudCheck, WarningCircle];
const planetOrbits = [
  { duration: 17, layer: 'cloud', offset: 190, label: 'Cloud assets' },
  { duration: 20, layer: 'cloud', offset: 270, label: 'Cloud configuration' },
  { duration: 23, layer: 'cloud', offset: 335, label: 'Cloud resources' },
  { duration: 19, layer: 'workforce', offset: 145, label: 'Identity & endpoint signals' },
  { duration: 22, layer: 'workforce', offset: 42, label: 'Workspace identities' },
];
const planetSignals = [
  { className: 'left-[24%] top-[35%]', label: 'Asset inventory current' },
  { className: 'right-[22%] top-[38%]', label: 'Configuration risk', warning: true },
  { className: 'bottom-[27%] left-[34%]', label: 'Identity activity current' },
];
const signalOrder = [0, 1, 3, 2, 4];

function BrandTile({ brandKey, fallback = Cloud, size = 'card' }) {
  return <IntegrationLogo brand={brandAssets[brandKey]} fallback={fallback} size={size} />;
}

function PlanetNodeLogo({ provider }) {
  if (provider.name === 'Microsoft 365') {
    return (
      <span className="flex items-center gap-1.5 text-[.65rem] font-semibold text-navy" aria-hidden="true">
        <SquaresFour className="size-5 text-[#4f6fbf]" weight="fill" /> M365
      </span>
    );
  }

  const brand = brandAssets[provider.brandKey];
  return (
    <img
      alt=""
      className={brand?.format === 'wordmark' ? 'max-h-7 w-14 object-contain sm:w-16' : 'size-8 object-contain sm:size-9'}
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

function orbitPosition(angle, radiusX, radiusY, tilt) {
  const radians = angle * (Math.PI / 180);
  const tiltRadians = tilt * (Math.PI / 180);
  const ellipseX = Math.cos(radians) * radiusX;
  const ellipseY = Math.sin(radians) * radiusY;
  return {
    x: ellipseX * Math.cos(tiltRadians) - ellipseY * Math.sin(tiltRadians),
    y: ellipseX * Math.sin(tiltRadians) + ellipseY * Math.cos(tiltRadians),
  };
}

function OrbitNode({ activeProvider, index, motionEnabled, onActivate, onDeactivate, provider, signalActive, size }) {
  const config = planetOrbits[index];
  const angle = useMotionValue(config.offset);
  const signalProgress = useMotionValue(0);
  const orbitControl = useRef(null);
  const compact = size < 480;
  const radiusX = size * (config.layer === 'cloud' ? (compact ? 0.4 : 0.42) : (compact ? 0.35 : 0.37));
  const radiusY = size * (config.layer === 'cloud' ? (compact ? 0.28 : 0.29) : (compact ? 0.22 : 0.24));
  const tilt = config.layer === 'cloud' ? -10 : 16;
  const x = useTransform(angle, (value) => orbitPosition(value, radiusX, radiusY, tilt).x);
  const y = useTransform(angle, (value) => orbitPosition(value, radiusX, radiusY, tilt).y);
  const scale = useTransform(angle, (value) => 0.9 + ((Math.sin(value * (Math.PI / 180)) + 1) / 2) * 0.13);
  const opacity = useTransform(angle, (value) => 0.68 + ((Math.sin(value * (Math.PI / 180)) + 1) / 2) * 0.32);
  const zIndex = useTransform(angle, (value) => (Math.sin(value * (Math.PI / 180)) > 0 ? 16 : 6));
  const signalX = useTransform([signalProgress, x], ([progress, currentX]) => -currentX * progress);
  const signalY = useTransform([signalProgress, y], ([progress, currentY]) => -currentY * progress);
  const signalOpacity = useTransform(signalProgress, (progress) => Math.min(1, progress * 8, (1 - progress) * 8));

  useEffect(() => {
    angle.set(config.offset);
    if (!motionEnabled) return undefined;
    const control = animate(angle, config.offset + 360, { duration: config.duration, ease: 'linear', repeat: Infinity });
    orbitControl.current = control;
    return () => control.stop();
  }, [angle, config.duration, config.offset, motionEnabled]);

  useEffect(() => {
    if (!orbitControl.current) return;
    if (activeProvider === index) orbitControl.current.pause();
    else orbitControl.current.play();
  }, [activeProvider, index]);

  useEffect(() => {
    signalProgress.set(0);
    if (!signalActive || !motionEnabled) return undefined;
    const control = animate(signalProgress, 1, { duration: 0.88, ease: [0.16, 1, 0.3, 1] });
    return () => control.stop();
  }, [motionEnabled, signalActive, signalProgress]);

  const inactive = activeProvider !== null && activeProvider !== index;

  return (
    <motion.li
      aria-describedby={`cloud-node-detail-${index}`}
      className={`group/node absolute left-1/2 top-1/2 focus-visible:outline-none ${inactive ? 'opacity-55' : 'opacity-100'}`}
      data-planet-node=""
      onBlur={onDeactivate}
      onFocus={() => onActivate(index)}
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={onDeactivate}
      style={{ opacity, scale, x, y, zIndex }}
      tabIndex={0}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_10px_rgba(38,216,173,.5)]"
        style={{ opacity: signalOpacity, x: signalX, y: signalY }}
      />
      <motion.div
        animate={{ opacity: inactive ? 0.55 : 1, scale: activeProvider === index ? 1.06 : 1 }}
        className="relative flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/96 shadow-[0_10px_28px_rgba(6,27,50,.13)] backdrop-blur-sm focus-within:border-teal/45 sm:size-18 lg:size-20"
        initial={motionEnabled ? { opacity: 0, scale: 0.76 } : false}
        transition={{ delay: motionEnabled ? 0.8 + index * 0.08 : 0, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <PlanetNodeLogo provider={provider} />
        <span className="sr-only">{provider.name}</span>
        <span className={`pointer-events-none absolute left-1/2 top-[calc(100%+.45rem)] w-max max-w-42 -translate-x-1/2 rounded-[6px] bg-navy px-2.5 py-2 text-center text-[.5rem] leading-4 text-white shadow-[0_10px_24px_rgba(6,27,50,.18)] transition duration-300 ${activeProvider === index ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`} id={`cloud-node-detail-${index}`} role="tooltip">
          <strong className="block text-[.54rem] text-white">{provider.name}</strong>
          {config.label}
        </span>
      </motion.div>
    </motion.li>
  );
}

function CloudOrbitPlanet({ motionEnabled, providers }) {
  const figureRef = useRef(null);
  const [activeProvider, setActiveProvider] = useState(null);
  const [attentionVisible, setAttentionVisible] = useState(false);
  const [riskActive, setRiskActive] = useState(!motionEnabled);
  const [signalIndex, setSignalIndex] = useState(-1);
  const [size, setSize] = useState(620);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { damping: 24, stiffness: 80 });
  const parallaxY = useSpring(pointerY, { damping: 24, stiffness: 80 });
  const sphereX = useTransform(parallaxX, (value) => value * -0.55);
  const sphereY = useTransform(parallaxY, (value) => value * -0.55);
  const compact = size < 480;
  const orbitEnabled = motionEnabled && !compact;
  const activeLayer = activeProvider === null ? null : planetOrbits[activeProvider].layer;
  const showAttention = !motionEnabled || attentionVisible;

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return undefined;
    const updateSize = () => {
      const nextSize = figure.getBoundingClientRect().width;
      if (nextSize) setSize(nextSize);
    };
    updateSize();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(updateSize);
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!orbitEnabled) {
      setSignalIndex(-1);
      setRiskActive(!motionEnabled);
      setAttentionVisible(false);
      return undefined;
    }

    const timers = [];
    const schedule = () => {
      setSignalIndex(-1);
      setRiskActive(false);
      setAttentionVisible(false);
      [2000, 3800, 5600, 7400, 9200].forEach((delay, index) => {
        timers.push(window.setTimeout(() => setSignalIndex(signalOrder[index]), delay));
      });
      timers.push(window.setTimeout(() => setRiskActive(true), 4500));
      timers.push(window.setTimeout(() => setAttentionVisible(true), 5200));
      timers.push(window.setTimeout(() => setAttentionVisible(false), 7200));
      timers.push(window.setTimeout(() => setRiskActive(false), 8200));
    };

    schedule();
    const interval = window.setInterval(schedule, 11000);
    return () => {
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
    };
  }, [motionEnabled, orbitEnabled]);

  const handlePointerMove = (event) => {
    if (!orbitEnabled || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 16);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.figure
      animate={{ opacity: 1, scale: 1, x: 0 }}
      aria-label="Moving cloud monitoring planet"
      className="relative m-0 mx-auto aspect-square w-full max-w-155"
      data-cloud-planet=""
      initial={motionEnabled ? { opacity: 0, scale: 0.985, x: 22 } : false}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      ref={figureRef}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="absolute inset-0" style={{ x: parallaxX, y: parallaxY }}>
        <motion.svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100">
          <motion.ellipse animate={{ opacity: activeLayer === 'cloud' ? 1 : 0.62, pathLength: 1, stroke: activeLayer === 'cloud' ? 'rgba(38,216,173,.5)' : 'rgba(8,127,140,.2)' }} cx="50" cy="50" fill="none" initial={motionEnabled ? { opacity: 0, pathLength: 0 } : false} rx="42" ry="29" strokeWidth="0.25" transform="rotate(-10 50 50)" transition={{ delay: motionEnabled ? 0.5 : 0, duration: 0.9 }} />
          <motion.ellipse animate={{ opacity: activeLayer === 'workforce' ? 1 : 0.62, pathLength: 1, stroke: activeLayer === 'workforce' ? 'rgba(38,216,173,.5)' : 'rgba(8,127,140,.2)' }} cx="50" cy="50" fill="none" initial={motionEnabled ? { opacity: 0, pathLength: 0 } : false} rx="37" ry="24" strokeWidth="0.25" transform="rotate(16 50 50)" transition={{ delay: motionEnabled ? 0.62 : 0, duration: 0.9 }} />
        </motion.svg>

        <motion.div className="absolute inset-0" style={{ x: sphereX, y: sphereY }}>
          <div className="pointer-events-none absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgba(38,216,173,.2),rgba(149,218,255,.13)_38%,transparent_69%)] blur-2xl" aria-hidden="true" />
          <motion.div animate={orbitEnabled ? { opacity: [0.98, 1, 0.98], scale: [1, 1.008, 1] } : { opacity: 1, scale: 1 }} className="absolute inset-[13%] overflow-hidden rounded-full border border-white/85 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,.96),rgba(218,246,240,.84)_31%,rgba(179,224,242,.68)_62%,rgba(8,127,140,.48)_100%)] shadow-[inset_-38px_-30px_70px_rgba(6,27,50,.16),inset_22px_16px_46px_rgba(255,255,255,.9),0_34px_86px_rgba(24,96,112,.18)] will-change-transform" transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}>
            <div className="absolute inset-[9%] rounded-full border border-white/40" aria-hidden="true" />
            <div className="absolute inset-x-[32%] inset-y-[3%] rounded-[50%] border border-white/35" aria-hidden="true" />
            <div className="absolute inset-x-[10%] inset-y-[31%] rounded-[50%] border border-white/42" aria-hidden="true" />
            <div className="absolute inset-[25%] rounded-full border border-dashed border-teal/16" aria-hidden="true" />
            <div className="absolute left-[17%] top-[25%] h-[19%] w-[25%] -rotate-12 rounded-[45%] bg-[radial-gradient(circle,rgba(8,127,140,.2)_1px,transparent_1.2px)] bg-[size:8px_8px] opacity-45" aria-hidden="true" />
            <div className="absolute right-[17%] top-[36%] h-[25%] w-[29%] rotate-12 rounded-[48%] bg-[radial-gradient(circle,rgba(8,127,140,.18)_1px,transparent_1.2px)] bg-[size:8px_8px] opacity-40" aria-hidden="true" />
            <div className="absolute bottom-[18%] left-[43%] h-[13%] w-[15%] rounded-[45%] bg-[radial-gradient(circle,rgba(8,127,140,.18)_1px,transparent_1.2px)] bg-[size:8px_8px] opacity-35" aria-hidden="true" />

            <motion.div animate={{ opacity: 1, scale: 1 }} className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full border border-white/75 bg-white/58 shadow-[0_0_44px_rgba(38,216,173,.18)] backdrop-blur-sm" initial={motionEnabled ? { opacity: 0, scale: 0.94 } : false} transition={{ delay: motionEnabled ? 0.18 : 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <img alt="" className="w-[27%] drop-shadow-[0_7px_18px_rgba(6,27,50,.14)]" src="/assets/emblemLogo.svg" />
              <span className="mt-2 font-mono text-[.4rem] font-medium uppercase tracking-[.12em] text-teal sm:text-[.48rem]">Visibility core</span>
              {signalIndex >= 0 && orbitEnabled && <motion.span animate={{ opacity: [0, 0, 0.7, 0], scale: [0.7, 0.7, 1.35, 1.6] }} aria-hidden="true" className="pointer-events-none absolute inset-[4%] rounded-full border border-mint/70" initial={{ opacity: 0, scale: 0.7 }} key={signalIndex} transition={{ delay: 0.7, duration: 0.55 }} />}
            </motion.div>

            <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
              {planetSignals.map((signal) => (
                <span className={`absolute flex items-center gap-1.5 whitespace-nowrap font-mono text-[.4rem] uppercase tracking-[.06em] text-navy/65 sm:text-[.46rem] ${signal.className}`} key={signal.label}>
                  <motion.span animate={{ backgroundColor: signal.warning && riskActive ? '#E7A93B' : '#26D8AD', scale: signal.warning && riskActive ? [1, 1.55, 1] : 1 }} className="size-1.5 rounded-full" transition={{ duration: 0.38 }} />
                  {signal.label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <span className="pointer-events-none absolute left-[10%] top-[15%] hidden font-mono text-[.45rem] uppercase tracking-[.12em] text-teal/65 sm:block" aria-hidden="true">Cloud layer</span>
        <span className="pointer-events-none absolute bottom-[13%] right-[14%] hidden font-mono text-[.45rem] uppercase tracking-[.12em] text-teal/65 sm:block" aria-hidden="true">Workforce layer</span>

        <ul className="absolute inset-0 m-0 list-none p-0" aria-label="Connected cloud and workforce environments">
          {providers.map((provider, index) => (
            <OrbitNode activeProvider={activeProvider} index={index} key={provider.name} motionEnabled={orbitEnabled} onActivate={setActiveProvider} onDeactivate={() => setActiveProvider(null)} provider={provider} signalActive={signalIndex === index} size={size} />
          ))}
        </ul>

        <motion.aside animate={{ opacity: showAttention && !compact ? 1 : 0, scale: showAttention && !compact ? 1 : 0.98, y: showAttention && !compact ? 0 : 8 }} aria-hidden={!showAttention || compact} aria-label="Configuration attention state" className="pointer-events-none absolute bottom-[25%] right-[5%] z-20 hidden w-45 rounded-[16px] bg-navy p-4 text-white shadow-[0_16px_38px_rgba(6,27,50,.2)] sm:block" initial={false} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
          <p className="flex items-center gap-2 font-mono text-[.49rem] uppercase tracking-[.12em] text-mint"><span className="size-1.5 rounded-full bg-[#E7A93B]" /> Attention</p>
          <strong className="mt-1.5 block text-[.68rem] font-medium text-white">2 configuration risks</strong>
          <span className="mt-2 flex items-center gap-1 text-[.55rem] text-[#b8c8d5]">Review environment <ArrowRight className="size-3" aria-hidden="true" /></span>
        </motion.aside>
      </motion.div>
      <figcaption className="sr-only">Supported AWS, Microsoft Azure, Google Cloud, Microsoft 365, and Google Workspace environments orbit one connected monitoring view.</figcaption>
    </motion.figure>
  );
}

function CloudHero({ motionEnabled }) {
  return (
    <section className="relative overflow-hidden bg-mist pb-14 pt-24 sm:pt-30 lg:pb-14 lg:pt-16" aria-labelledby="cloud-monitoring-title" data-cloud-hero="">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[68%] bg-[radial-gradient(circle_at_64%_40%,rgba(38,216,173,.19),transparent_58%)]" aria-hidden="true" />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(31rem,.94fr)] lg:gap-4">
        <div data-hero-copy="">
          <p className="eyebrow">{cloudMonitoringHero.eyebrow}</p>
          <h1 className="max-w-3xl text-[clamp(3rem,5vw,5.5rem)] leading-[.98]" id="cloud-monitoring-title">
            {cloudMonitoringHero.title} <span className="hero-title-accent">{cloudMonitoringHero.titleAccent}</span>
          </h1>
          <p className="lede mt-7">{cloudMonitoringHero.description}</p>
          <p className="mt-4 hidden max-w-150 text-[.88rem] leading-7 text-muted sm:block" data-hero-detail="">{cloudMonitoringHero.detail}</p>
          <div className="action-row">
            <a className="button button--directional" href="#cloud-visibility">
              Explore Cloud Monitoring <ArrowDown aria-hidden="true" />
            </a>
            <Link className="button button--ghost" to="/demo">Request a Demo</Link>
          </div>
          <p className="mt-6 border-l-2 border-mint pl-4 font-mono text-[.62rem] uppercase leading-5 tracking-[.08em] text-teal" data-hero-support="">{cloudMonitoringHero.support}</p>
        </div>
        <CloudOrbitPlanet motionEnabled={motionEnabled} providers={cloudMonitoringHero.providers} />
        <p className="-mt-7 text-[.82rem] leading-7 text-muted sm:hidden">{cloudMonitoringHero.detail}</p>
      </div>

      <div className="mt-6 overflow-hidden border-y border-teal/12 bg-white/46 py-4" aria-label="Monitored environments">
        <div className="flex w-max items-center" data-cloud-marquee-track="">
          {[0, 1].map((copy) => (
            <ul className="m-0 flex shrink-0 list-none items-center gap-10 px-5 sm:gap-16 sm:px-8" aria-hidden={copy === 1 ? 'true' : undefined} key={copy}>
              {cloudMonitoringHero.providers.map((provider) => (
                <li className="flex min-w-34 items-center justify-center gap-3 font-mono text-[.58rem] font-medium uppercase tracking-[.08em] text-teal" key={`${copy}-${provider.name}`}>
                  <BrandTile brandKey={provider.brandKey} fallback={provider.name === 'Microsoft 365' ? SquaresFour : Cloud} size="inline" />
                  <span className={brandAssets[provider.brandKey]?.format === 'wordmark' ? 'sr-only' : ''}>{provider.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function CloudVisibilitySection({ motionEnabled }) {
  return (
    <section className="section scroll-mt-20 bg-white" id="cloud-visibility" aria-labelledby="cloud-visibility-title" data-visibility-section="">
      <div className="shell grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-22">
        <div data-visibility-pin="">
          <Reveal motionEnabled={motionEnabled}>
            <SectionHeading content={cloudVisibility} id="cloud-visibility-title" />
            <p className="mt-9 border-y border-line py-5 font-mono text-[.66rem] font-medium uppercase leading-5 tracking-[.08em] text-teal">{cloudVisibility.highlight}</p>
          </Reveal>
        </div>

        <div className="border-t border-line" data-motion-sequence="">
          {cloudVisibility.providers.map(([name, description, brandKey], index) => (
            <Reveal className="grid gap-5 border-b border-line py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-center" delay={index * 0.06} motionEnabled={motionEnabled} key={name}>
              <BrandTile brandKey={brandKey} />
              <div>
                <h3 className="text-[1.08rem]">{name}</h3>
                <p className="mt-2 max-w-140 text-[.8rem] leading-6 text-muted">{description}</p>
              </div>
              <span className="hidden size-10 items-center justify-center rounded-full border border-line text-teal sm:flex" aria-hidden="true"><ArrowRight className="size-4" /></span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignalsSection({ motionEnabled }) {
  return (
    <section className="section overflow-hidden bg-navy text-white" aria-labelledby="cloud-signals-title">
      <div className="shell">
        <Reveal className="grid gap-9 lg:grid-cols-[1fr_.8fr] lg:items-end" motionEnabled={motionEnabled}>
          <SectionHeading content={cloudSignals} id="cloud-signals-title" />
          <p className="mb-1 border-l border-mint/50 pl-5 text-[.8rem] leading-7 text-[#b8c8d5]">{cloudSignals.highlight}</p>
        </Reveal>

        <ol className="mt-16 grid list-none border-y border-white/12 p-0 md:grid-cols-4" aria-label="From cloud asset to actionable signal" data-motion-sequence="">
          {cloudSignals.steps.map(([title, description], index) => {
            const Icon = signalIcons[index];
            return (
              <Reveal as="li" className="relative min-h-58 border-b border-white/12 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" delay={index * 0.07} motionEnabled={motionEnabled} key={title}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[.57rem] uppercase tracking-[.1em] text-mint">0{index + 1}</span>
                  <Icon className="size-5 text-mint" aria-hidden="true" />
                </div>
                <h3 className="mt-13 text-[1.02rem] text-white">{title}</h3>
                <p className="mt-3 text-[.72rem] leading-6 text-[#b8c8d5]">{description}</p>
              </Reveal>
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
      const hero = select('[data-cloud-hero]')[0];
      const heroCopy = select('[data-hero-copy]')[0];

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(heroCopy?.children ?? [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 });

      const loops = [
        gsap.to(select('[data-cloud-marquee-track]'), { xPercent: -50, duration: 28, ease: 'none', repeat: -1 }),
      ];
      const playLoops = () => loops.forEach((animation) => animation.play());
      const pauseLoops = () => loops.forEach((animation) => animation.pause());

      ScrollTrigger.create({
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: playLoops,
        onEnterBack: playLoops,
        onLeave: pauseLoops,
        onLeaveBack: pauseLoops,
      });

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

      media.add('(min-width: 1024px) and (min-height: 680px)', () => {
        const visibilitySection = select('[data-visibility-section]')[0];
        const pinnedCopy = select('[data-visibility-pin]')[0];
        ScrollTrigger.create({
          anticipatePin: 1,
          trigger: visibilitySection,
          start: 'top 104px',
          end: 'bottom 72%',
          pin: pinnedCopy,
          pinSpacing: false,
        });
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
