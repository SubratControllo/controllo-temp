import Reveal from "../components/Reveal";
import CursorGrid from "../components/CursorGrid";
import SecuraAssessment from "../components/SecuraAssessment";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const securaSteps = [
  { title: "Review", detail: "control context", active: true },
  { title: "Identify", detail: "evidence gaps" },
  { title: "Recommend", detail: "next actions" },
];

export default function SecuraSection({ motionEnabled }) {
  return (
    <section
      className="secura-section section relative isolate overflow-hidden bg-navy pt-35 pb-37.5 text-white"
      id="secura"
    >
      {motionEnabled ? (
        <CursorGrid
          className="secura-section-grid"
          activation="viewport"
          autoSpeed={112}
          cellSize={44}
          color="#26d8ad"
          radius={230}
          holdTime={280}
          fadeDuration={820}
          lineWidth={1.25}
          maxOpacity={0.82}
          fillOpacity={0.035}
          gridOpacity={0.024}
          cellRadius={0}
        />
      ) : null}
      <div className="shell relative z-10 grid grid-cols-2 items-center justify-items-center gap-20.5 max-[1080px]:grid-cols-1 max-[760px]:gap-11">
        <Reveal
          className="mx-auto w-full max-w-125 justify-self-center"
          motionEnabled={motionEnabled}
        >
          <p className="eyebrow text-mint">Introducing Secura AI</p>
          <h2>Find the gap before it becomes an Audit finding.</h2>
          <p className="lede mt-6.5 text-[#b8c8d5]">
            Secura reviews the control requirement alongside its
            implementation, policies, procedures, and evidence. It shows what
            is supported, where context is missing, and the next action for an
            accountable owner to review.
          </p>
          <div
            className="relative m-0 mt-9 border-t border-white/14 pt-5"
            data-secura-rail
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -top-px left-0 h-0.5 w-1/3 origin-left bg-mint"
              data-active-rule
              initial={motionEnabled ? { scaleX: 0 } : false}
              transition={{
                delay: motionEnabled ? 0.08 : 0,
                duration: motionEnabled ? 0.55 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, amount: 0.8 }}
              whileInView={{ scaleX: 1 }}
            >
              <span className="sr-only">Current step</span>
            </motion.span>
            <ol
              aria-label="Secura review flow"
              className="relative m-0 grid list-none grid-cols-3 gap-5 max-[420px]:gap-3"
            >
              {securaSteps.map((step) => (
                <li
                  aria-current={step.active ? "step" : undefined}
                  className="min-w-0 text-left"
                  data-active={step.active ? "true" : undefined}
                  key={step.title}
                >
                  <strong className={`block text-[1.1rem] leading-none font-medium tracking-[-.015em] max-[420px]:text-[.9rem] ${step.active ? "text-mint" : "text-white"}`}>
                    {step.title}
                  </strong>
                  <span className="mt-1.5 block text-[.7rem] font-medium leading-[1.35] tracking-[.025em] text-[#91a6b7] max-[420px]:text-[.58rem]">
                    {step.detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <Link
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-[.76rem] font-medium text-mint transition-colors hover:text-white [&>svg]:size-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
            to="/platform/secura-ai"
          >
            Explore Secura AI <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal
          className="mx-auto w-full max-w-125 justify-self-center"
          motionEnabled={motionEnabled}
          delay={0.1}
        >
          <SecuraAssessment motionEnabled={motionEnabled} />
        </Reveal>
      </div>
    </section>
  );
}
