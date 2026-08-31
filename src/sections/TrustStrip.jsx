import { motion } from "motion/react";
import Reveal from "../components/Reveal";

const trustMarks = [
  { label: "SOC 2", category: "Assurance" },
  { label: "ISO/IEC 27001", category: "Security" },
  { label: "HIPAA", category: "Privacy & security" },
  { label: "GDPR", category: "Privacy" },
  { label: "NIST CSF 2.0", category: "Cybersecurity" },
  { label: "ISO/IEC 42001", category: "AI governance" },
  { label: "PCI DSS", category: "Payments" },
  { label: "CIS Controls v8.1", category: "Cybersecurity" },
];

function FrameworkMark({ framework }) {
  return (
    <li
      className="flex shrink-0 items-center gap-4 border-r border-line pr-8"
      data-framework-item
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-mint shadow-[0_0_0_4px_rgba(63,228,196,.12)]"
      />
      <span className="whitespace-nowrap" data-framework-wordmark>
        <strong className="block text-[.8rem] font-medium text-nav-text">
          {framework.label}
        </strong>
        <small className="mt-1 block font-mono text-[.46rem] font-medium uppercase tracking-[.06em] text-muted">
          {framework.category}
        </small>
      </span>
    </li>
  );
}

export default function TrustStrip({ motionEnabled }) {
  return (
    <section
      className="bg-white pt-11.5 pb-18"
      aria-label="Popular compliance framework landscape"
      data-motion={motionEnabled ? "marquee" : "static"}
    >
      <Reveal
        className="shell grid grid-cols-[240px_minmax(0,1fr)] items-center gap-8 max-[760px]:grid-cols-1 max-[760px]:gap-6"
        motionEnabled={motionEnabled}
      >
        <p className="m-0 text-[.78rem] text-muted">
          <span className="block">Compliance is always evolving.</span>
          <span className="block">So are we.</span>
        </p>

        <div
          className={`min-w-0 border-l border-line py-1 pl-8 max-[760px]:border-t max-[760px]:border-l-0 max-[760px]:pt-5 max-[760px]:pl-0 ${motionEnabled
            ? "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
            : "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }`}
        >
          <motion.div
            animate={motionEnabled ? { x: ["0%", "-50%"] } : { x: 0 }}
            className="flex w-max will-change-transform"
            initial={false}
            transition={motionEnabled ? {
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            } : { duration: 0 }}
          >
            {[false, true].map((isClone) => (
              <ul
                aria-hidden={isClone || undefined}
                aria-label={isClone ? undefined : "Popular compliance frameworks"}
                className="m-0 flex list-none items-center gap-9 pr-9 pl-0"
                key={isClone ? "frameworks-clone" : "frameworks-primary"}
              >
                {trustMarks.map((framework) => (
                  <FrameworkMark framework={framework} key={framework.label} />
                ))}
              </ul>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
