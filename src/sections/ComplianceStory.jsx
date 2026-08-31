import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import ProductDemo from "../components/ProductDemo";

const steps = [
  [
    "Connect",
    "Bring cloud, identity, engineering, and business systems into one evidence stream.",
  ],
  [
    "Validate",
    "Check scope, ownership, freshness, and audit usefulness before gaps become fire drills.",
  ],
  [
    "Map",
    "Reuse approved controls across frameworks without duplicating the operating work.",
  ],
  [
    "Resolve",
    "Route clear next actions to accountable people with the context already attached.",
  ],
  [
    "Report",
    "Give leaders and auditors a current view of posture, decisions, and progress.",
  ],
];

const orbitEmblems = ["outer", "middle", "inner"];

export function getComplianceStage(progress) {
  return Math.min(steps.length - 1, Math.floor(Math.max(0, progress) * steps.length));
}

export default function ComplianceStory({ motionEnabled }) {
  const ref = useRef(null);
  const [scrollStage, setScrollStage] = useState(0);
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
  const activeStage = motionEnabled ? scrollStage : steps.length - 1;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!motionEnabled) return;
    const nextStage = getComplianceStage(progress);
    setScrollStage((current) => (current === nextStage ? current : nextStage));
  });

  return (
    <section
      className="current-story relative overflow-x-clip py-35 text-white max-[760px]:py-22.5"
      ref={ref}
    >
      <div className="shell pb-27.5 max-[760px]:pb-17.5">
        <p className="eyebrow text-mint">The compliance current</p>
        <h2>Experience the program moving forward.</h2>
        <p className="lede mt-5.5 text-[#b7c9d4]">
          Each stage changes the state of the work—not just the way the page
          looks.
        </p>
      </div>
      <div className="shell grid grid-cols-[.85fr_1.15fr] gap-22.5 max-[1080px]:grid-cols-1 max-[760px]:gap-12.5">
        <div className="grid gap-45 pb-30 max-[1080px]:gap-15 max-[760px]:gap-7.5 max-[760px]:pb-0">
          {steps.map(([title, detail], index) => (
            <article
              aria-current={index === activeStage ? "step" : undefined}
              className={`compliance-step min-h-60 border-l pl-7 transition-[border-color,opacity,transform] duration-400 max-[760px]:min-h-0 max-[760px]:border-b max-[760px]:border-l-0 max-[760px]:border-white/15 max-[760px]:px-0 max-[760px]:py-7 motion-reduce:transition-none ${
                index === activeStage
                  ? "compliance-step--current border-mint opacity-100"
                  : "border-white/10 opacity-[.58]"
              }`}
              key={title}
            >
              <span className="font-mono text-[.64rem] font-medium leading-none text-mint">
                0{index + 1}
              </span>
              <h3 className="mt-5 mb-3.5 text-[2.4rem] max-[760px]:text-[1.8rem]">
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
            style={{ y: motionEnabled ? demoY : 0 }}
          >
            <div
              aria-hidden="true"
              className="compliance-orbit-field max-[760px]:hidden"
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
