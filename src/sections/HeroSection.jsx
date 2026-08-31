import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FileCheck2, Layers3, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "../components/CountUp";
import HeaderCtaContent from "../components/HeaderCtaContent";
import Reveal from "../components/Reveal";
import SecuraMark from "../components/SecuraMark";
import WaveDivider from "../components/WaveDivider";

const WaveShader = lazy(() => import("../components/WaveShader"));

const controls = [
  ["AC", "Access reviews", "Evidence renewed 4m ago", "VALID"],
  ["DR", "Recovery testing", "Owner review requested", "REVIEW"],
  ["VR", "Vendor risk", "Mapped to 4 frameworks", "SYNCED"],
];

const proofStats = [
  {
    label: "Global and regional frameworks",
    separator: "",
    suffix: "+",
    to: 100,
    valueText: "100+",
  },
  {
    label: "Structured compliance controls",
    separator: ",",
    suffix: "+",
    to: 7000,
    valueText: "7,000+",
  },
  {
    label: "Control mappings powering smarter compliance",
    separator: ",",
    suffix: "+",
    to: 200000,
    valueText: "200,000+",
  },
];

const orbitingEmblems = ["outer", "middle", "inner"];

const eventCards = [
  {
    className: "event-card--one",
    detail: "Identity provider · now",
    icon: FileCheck2,
    initial: { rotateZ: 0, scale: 0.72, x: 0, y: 0, z: -100 },
    title: "Evidence validated",
  },
  {
    className: "event-card--two event-card--lifted-mobile",
    detail: "Encryption policy · 2m",
    icon: UserCheck,
    initial: { rotateZ: 0, scale: 0.72, x: 0, y: 0, z: -100 },
    title: "Owner approved",
  },
  {
    className: "event-card--three",
    detail: "One control · 4m",
    icon: Layers3,
    initial: { rotateZ: 0, scale: 0.72, x: 0, y: 0, z: -100 },
    title: "3 frameworks mapped",
  },
  {
    className: "event-card--secura",
    detail: "Implementation description and evidence incomplete",
    eyebrow: "Secura AI insight",
    initial: { rotateZ: 0, scale: 0.72, x: 0, y: 0, z: -100 },
    title: "Secura found 2 gaps",
    tone: "secura",
  },
];

function DashboardBackdrop({ motionEnabled, scale, y }) {
  return (
    <motion.div
      aria-hidden="true"
      className="hero-dashboard hero-dashboard--perspective pointer-events-none absolute -top-[18px] left-[32%] z-0 h-[650px] w-[1240px] [perspective:1400px] will-change-transform max-[1080px]:left-[38%] max-[760px]:top-0 max-[760px]:left-[12%] max-[760px]:h-[510px] max-[760px]:w-[700px]"
      data-testid="hero-dashboard"
      style={{ scale: motionEnabled ? scale : 1, y: motionEnabled ? y : 0 }}
    >
      <motion.div
        className="hero-dashboard__stage relative size-full origin-bottom-left [transform-style:preserve-3d] will-change-transform"
        data-testid="hero-dashboard-stage"
        initial={
          motionEnabled
            ? {
                opacity: 0,
                rotateX: 24,
                rotateY: -30,
                rotateZ: 2,
                scale: 0.86,
                x: 220,
                y: 88,
              }
            : false
        }
        animate={{
          opacity: 1,
          rotateX: 7,
          rotateY: -11,
          rotateZ: 0,
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 1.05,
          delay: 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div
          className="relative size-full overflow-hidden rounded-[32px] border border-white/50 bg-white/64 shadow-[0_26px_72px_rgba(8,127,140,.10)] max-[760px]:rounded-[24px]"
          data-testid="hero-dashboard-frame"
        >
          <img
            alt=""
            aria-hidden="true"
            className="relative z-1 size-full select-none object-cover object-[38%_6%] opacity-[.68] blur-[1.05px] saturate-[.88] max-[760px]:object-[34%_8%] max-[760px]:opacity-[.52]"
            decoding="async"
            draggable={false}
            fetchPriority="high"
            loading="eager"
            src="/assets/dashboard.webp"
          />
          {motionEnabled ? (
            <motion.span
              className="hero-dashboard__focus-sweep hero-dashboard__focus-sweep--light absolute inset-y-[5%] left-0 z-2 w-[20%] mix-blend-screen will-change-transform"
              data-testid="hero-dashboard-focus-sweep"
              initial={{ opacity: 0, x: "-140%" }}
              animate={{ opacity: [0, 0.32, 0], x: "600%" }}
              transition={{
                duration: 0.72,
                delay: 0.55,
                ease: "easeInOut",
              }}
            />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection({ motionEnabled }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const dashboardScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const waveY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  return (
    <section
      className="hero relative -mt-37.5 min-h-253 overflow-hidden pt-48 pb-0 max-[1080px]:pb-[9rem] max-[760px]:min-h-0 max-[760px]:pb-[7rem]"
      id="top"
      ref={sectionRef}
      aria-label="Continuous compliance hero"
    >
      <Suspense
        fallback={
          <div
            className="wave-shader wave-shader--fallback"
            aria-hidden="true"
          />
        }
      >
        <WaveShader motionEnabled={motionEnabled} />
      </Suspense>
      <div className="hero-chevrons max-[760px]:hidden" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="shell relative z-2 grid grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)] items-center gap-18 max-[1080px]:grid-cols-1 max-[760px]:gap-10.5">
        <Reveal
          className="relative z-3 max-w-200"
          motionEnabled={motionEnabled}
        >
          <p className="eyebrow">
            Continuous compliance. Clear audit readiness.
          </p>
          <h1>
            <motion.span
              initial={motionEnabled ? { opacity: 0, y: 30 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Fast Compliance,
            </motion.span>{" "}
            <motion.span
              initial={motionEnabled ? { opacity: 0, y: 30 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              Smarter Audit Readiness
            </motion.span>
          </h1>
          <p className="lede mt-6.5">
            Connect controls to policies, evidence, risks, owners, and live
            cloud signals across cybersecurity, privacy, and AI governance.
            Secura AI turns that context into clear, reviewable insights and
            next actions.
          </p>
          <div className="action-row">
            <Link
              className="button button--mint button--directional group/brand-cta relative isolate overflow-hidden border border-white/30 text-navy transition-transform duration-300 hover:scale-[1.015] hover:bg-mint focus-visible:scale-[1.015] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100"
              to="/demo"
            >
              <HeaderCtaContent
                iconTestId="hero-primary-cta-icon"
                shineTestId="hero-primary-cta-shine"
              >
                Request a Demo
              </HeaderCtaContent>
            </Link>
            <Link
              className="button button--ghost transition-[background-color,color,box-shadow] duration-200 hover:translate-y-0 hover:bg-white hover:text-teal focus-visible:bg-white focus-visible:text-teal motion-reduce:hover:translate-y-0"
              to="/platform"
            >
              <span>Explore the platform</span>
            </Link>
          </div>
          <div
            className="mt-10 grid max-w-185 grid-cols-3 gap-5 text-navy max-[760px]:grid-cols-1 max-[760px]:gap-3"
            aria-label="Platform proof"
          >
            {proofStats.map(({ label, separator, suffix, to, valueText }, index) => (
              <span className="grid gap-1 border-l border-navy/12 pl-4" key={label}>
                <strong
                  aria-label={valueText}
                  className="text-[1.05rem] leading-none [font-variant-numeric:tabular-nums]"
                  data-testid={`hero-proof-count-${index + 1}`}
                >
                  <CountUp
                    className="count-up-text inline-block"
                    delay={0.9 + index * 0.12}
                    duration={1.65}
                    from={motionEnabled ? 0 : to}
                    separator={separator}
                    startWhen={motionEnabled}
                    to={to}
                  />
                  <span aria-hidden="true">{suffix}</span>
                </strong>
                <small className="text-[.68rem] leading-[1.45] text-[#4a6072]">
                  {label}
                </small>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="relative isolate min-h-140 w-full max-w-175 max-[1080px]:mx-auto max-[760px]:min-h-130">
          <DashboardBackdrop
            motionEnabled={motionEnabled}
            scale={dashboardScale}
            y={dashboardY}
          />
          <motion.div
            className="absolute inset-0 z-1 [perspective:1400px] [transform-style:preserve-3d]"
            style={{ y: motionEnabled ? sceneY : 0 }}
          >
            <motion.div
              className="hero-scene__orbit z-1"
              aria-hidden="true"
              initial={motionEnabled ? { opacity: 0, scale: 0.92 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.62, delay: 0.16 }}
            />
            <motion.div
              aria-hidden="true"
              className={`hero-scene__emblem-orbit ${
                motionEnabled ? "hero-scene__emblem-orbit--motion" : ""
              }`}
              data-motion={motionEnabled ? "orbit" : "static"}
              data-testid="hero-emblem-orbit"
              initial={motionEnabled ? { opacity: 0, scale: 0.9 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.72 }}
            >
              {orbitingEmblems.map((emblem) => (
                <span
                  className={`hero-scene__emblem-track hero-scene__emblem-track--${emblem}`}
                  data-orbit={emblem}
                  data-testid="hero-emblem-orbit-track"
                  key={emblem}
                >
                  <span
                    className="hero-scene__emblem-point"
                  >
                    <img
                      alt=""
                      className="hero-scene__emblem-mark"
                      data-testid="hero-emblem-orbit-mark"
                      draggable={false}
                      src="/assets/emblemLogo.svg"
                    />
                  </span>
                </span>
              ))}
            </motion.div>
            <motion.div
              className="product-panel hero-focus-panel absolute inset-[82px_56px_auto_86px] z-2 min-h-94 rounded-[26px] border border-navy/10 bg-white/92 p-5.5 shadow-elevated backdrop-blur-md [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform max-[760px]:inset-[60px_7%_auto] max-[760px]:min-h-88 max-[760px]:rounded-[22px] max-[760px]:p-4"
              data-motion={motionEnabled ? "extract" : "static"}
              data-final-scale="0.94"
              data-testid="hero-readiness-extraction"
              aria-label="Controllo compliance readiness workspace preview"
              initial={
                motionEnabled
                  ? {
                      opacity: 0.12,
                      rotateX: 16,
                      rotateY: -18,
                      rotateZ: 1.5,
                      scale: 0.78,
                      x: 132,
                      y: 62,
                      z: -140,
                    }
                  : false
              }
              animate={{
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 0.94,
                x: 0,
                y: 0,
                z: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex items-center justify-between gap-3.5 border-b border-line pb-4.5">
                <div
                  className="flex items-center gap-3"
                  data-testid="hero-readiness-header"
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className="size-7 shrink-0 select-none drop-shadow-[0_8px_14px_rgba(8,127,140,.14)]"
                    data-testid="hero-readiness-emblem"
                    draggable={false}
                    src="/assets/emblemLogo.svg"
                  />
                  <span>
                    <strong className="block text-[.88rem]">
                      Readiness current
                    </strong>
                    <small className="mt-0.75 block text-[.67rem] text-muted">
                      Live across your program
                    </small>
                  </span>
                </div>
                <span className="status-pill">On track</span>
              </div>
              <div className="grid grid-cols-[108px_1fr] items-center gap-4.5 pt-5 pb-3.5 max-[420px]:grid-cols-[86px_1fr]">
                <div
                  className="readiness__ring relative grid size-26 aspect-square place-items-center rounded-full max-[760px]:size-23 max-[420px]:size-21"
                  role="img"
                  aria-label="82 percent audit readiness"
                >
                  <span className="readiness__value">
                    <CountUp
                      className="count-up-text"
                      delay={0.55}
                      duration={1.8}
                      from={motionEnabled ? 0 : 82}
                      startWhen={motionEnabled}
                      to={82}
                    />
                    <span aria-hidden="true">%</span>
                  </span>
                </div>
                <div>
                  <strong className="text-[.86rem]">
                    Audit readiness is rising
                  </strong>
                  <p className="mt-1.5 mb-0 text-[.73rem] leading-[1.6] text-muted">
                    12 controls advanced this week. Three owners need a nudge.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                {controls.map(([initials, title, detail, status]) => (
                  <div
                    className="hero-control-row grid min-h-12.5 grid-cols-[32px_1fr_auto] items-center gap-2.5 rounded-[14px] bg-[#f4f8f7] px-2.5 py-1.75"
                    key={title}
                  >
                    <span className="grid size-7.5 place-items-center rounded-[10px] bg-mint-soft text-[.68rem] text-teal">
                      {initials}
                    </span>
                    <div>
                      <strong className="block text-[.72rem]">{title}</strong>
                      <small className="mt-0.5 block text-[.62rem] text-muted">
                        {detail}
                      </small>
                    </div>
                    <em className="font-mono text-[.57rem] leading-none not-italic text-teal">
                      {status}
                    </em>
                  </div>
                ))}
              </div>
            </motion.div>
            {eventCards.map(
              (
                {
                  className,
                  detail,
                  eyebrow,
                  icon: Icon,
                  initial,
                  title,
                  tone,
                },
                index,
              ) => (
                <motion.div
                  className={`event-card ${className} absolute z-3 [backface-visibility:hidden] will-change-transform ${
                    tone === "secura"
                      ? "grid"
                      : "flex min-w-47.5 items-center gap-2.75 rounded-[15px] bg-white px-3.75 py-3.25 shadow-[0_16px_45px_rgba(6,27,50,.14)] max-[420px]:min-w-41.5"
                  }`}
                  data-entry-mode="pop-in-place"
                  data-entry-x={initial.x}
                  data-motion={motionEnabled ? "extract" : "static"}
                  data-testid={`hero-event-card-${index + 1}`}
                  initial={
                    motionEnabled ? { opacity: 0, ...initial } : false
                  }
                  animate={{
                    opacity: [0, 1, 1],
                    rotateZ: 0,
                    scale: [0.72, 1.045, 1],
                    x: 0,
                    y: 0,
                    z: [-100, 18, 0],
                  }}
                  transition={{
                    duration: 0.42,
                    delay: 1.08 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  key={title}
                >
                  {tone === "secura" ? (
                    <>
                      <SecuraMark
                        className="secura-card__mark"
                        data-testid={`hero-card-icon-${index + 1}`}
                      />
                      <span className="secura-card__copy">
                        <span className="secura-card__eyebrow">{eyebrow}</span>
                        <strong>{title}</strong>
                        <small>{detail}</small>
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="event-card__icon"
                        data-testid={`hero-card-icon-${index + 1}`}
                      >
                        <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                      </span>
                      <span>
                        <strong>{title}</strong>
                        <small>{detail}</small>
                      </span>
                    </>
                  )}
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      </div>
      <WaveDivider y={motionEnabled ? waveY : 0} />
    </section>
  );
}
