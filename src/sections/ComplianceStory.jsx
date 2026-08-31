import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import ProductDemo from "../components/ProductDemo";

const steps = [
  [
    "Select",
    "Choose the compliance framework(s) relevant to your business.",
  ],
  [
    "Assess",
    "Identify & manage risks. Integrate cloud assets for live visibility.",
  ],
  [
    "Implement",
    "Add implementation details, policies, procedures, and evidence.",
  ],
  [
    "Review",
    "Use Secura AI for fast gap assessments and clearer next actions.",
  ],
  [
    "Collaborate",
    "Track progress, work with internal teams and auditors in one place.",
  ],
];

const orbitEmblems = ["outer", "middle", "inner"];
const mobileJourneyQuery = "(max-width: 1080px)";

export function getComplianceStage(progress) {
  return Math.min(steps.length - 1, Math.floor(Math.max(0, progress) * steps.length));
}

export default function ComplianceStory({ motionEnabled }) {
  const ref = useRef(null);
  const [scrollStage, setScrollStage] = useState(0);
  const [mobileStage, setMobileStage] = useState(0);
  const [isMobileJourney, setIsMobileJourney] = useState(
    () => window.matchMedia?.(mobileJourneyQuery).matches ?? false,
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const demoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const outerOrbitRotation = useTransform(scrollYProgress, [0, 1], [-18, 252]);
  const middleOrbitRotation = useTransform(scrollYProgress, [0, 1], [132, -98]);
  const innerOrbitRotation = useTransform(scrollYProgress, [0, 1], [236, 416]);
  const orbitRotations = [
    outerOrbitRotation,
    middleOrbitRotation,
    innerOrbitRotation,
  ];
  const activeStage = motionEnabled
    ? isMobileJourney
      ? mobileStage
      : scrollStage
    : steps.length - 1;

  useEffect(() => {
    const query = window.matchMedia?.(mobileJourneyQuery);
    if (!query) return undefined;

    const updateLayout = ({ matches }) => setIsMobileJourney(matches);
    updateLayout(query);
    query.addEventListener("change", updateLayout);

    return () => query.removeEventListener("change", updateLayout);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!motionEnabled) return;
    const nextStage = getComplianceStage(progress);
    setScrollStage((current) => (current === nextStage ? current : nextStage));
  });

  const handleMobileStepScroll = (event) => {
    if (!motionEnabled || !isMobileJourney) return;

    const { clientWidth, scrollLeft, scrollWidth } = event.currentTarget;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const nextStage = Math.round(
      (Math.max(0, Math.min(scrollLeft, maxScroll)) / maxScroll) *
        (steps.length - 1),
    );
    setMobileStage((current) => (current === nextStage ? current : nextStage));
  };

  return (
    <section
      className="current-story relative overflow-x-clip py-35 text-white max-[1080px]:py-25 max-[760px]:py-22.5"
      ref={ref}
    >
      <div className="shell pb-27.5 max-[1080px]:pb-12 max-[760px]:pb-10">
        <p className="eyebrow text-mint">Get started in 7 Days</p>
        <h2>A Faster Path to Compliance</h2>
      </div>
      <div className="shell grid grid-cols-[.85fr_1.15fr] gap-22.5 max-[1080px]:grid-cols-1 max-[1080px]:gap-7">
        <div
          aria-label="Seven-day compliance steps"
          className="compliance-mobile-rail grid gap-45 pb-30 max-[1080px]:pb-3"
          onScroll={handleMobileStepScroll}
          role="list"
          tabIndex={isMobileJourney ? 0 : undefined}
        >
          {steps.map(([title, detail], index) => (
            <article
              aria-current={index === activeStage ? "step" : undefined}
              className={`compliance-step min-h-60 border-l pl-7 transition-[border-color,opacity,transform] duration-400 max-[1080px]:min-h-0 motion-reduce:transition-none ${
                index === activeStage
                  ? "compliance-step--current border-mint opacity-100"
                  : "border-white/10 opacity-[.58]"
              }`}
              key={title}
              role="listitem"
            >
              <span className="font-mono text-[.64rem] font-medium leading-none text-mint">
                0{index + 1}
              </span>
              <h3 className="mt-5 mb-3.5 text-[2.4rem] max-[1080px]:text-[2rem] max-[760px]:text-[1.8rem]">
                {title}
              </h3>
              <p className="max-w-112.5 leading-[1.8] text-[#c2d1db]">
                {detail}
              </p>
            </article>
          ))}
        </div>
        <div className="relative row-start-1 min-[1081px]:col-start-2">
          <motion.div
            className="relative isolate top-auto min-[1081px]:sticky min-[1081px]:top-40"
            style={{ y: motionEnabled && !isMobileJourney ? demoY : 0 }}
          >
            <div
              aria-hidden="true"
              className="compliance-orbit-field max-[1080px]:hidden"
              data-motion={motionEnabled ? "scroll" : "static"}
              data-testid="compliance-current-orbit"
            >
              <span className="compliance-orbit-field__ring compliance-orbit-field__ring--outer" />
              <span className="compliance-orbit-field__ring compliance-orbit-field__ring--inner" />
              {orbitEmblems.map((orbit, index) => (
                <motion.span
                  className={`compliance-orbit-field__track compliance-orbit-field__track--${orbit}`}
                  key={orbit}
                  style={{ rotate: motionEnabled ? orbitRotations[index] : 0 }}
                >
                  <span className="compliance-orbit-field__point">
                    <img
                      alt=""
                      aria-hidden="true"
                      className="compliance-orbit-field__mark"
                      data-testid="compliance-current-orbit-mark"
                      draggable="false"
                      src="/assets/emblemLogo.svg"
                    />
                  </span>
                </motion.span>
              ))}
            </div>
            <div className="relative z-1">
              <ProductDemo
                active={activeStage}
                compact
                motionEnabled={motionEnabled}
                stageCount={steps.length}
                stageIndex={activeStage}
                stageLabel={steps[activeStage][0]}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
