import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";

const beforeItems = [
  ["Search scattered folders", "04 HRS"],
  ["Chase evidence owners", "12 DMS"],
  ["Remap the same controls", "AGAIN"],
  ["Explain stale context", "MANUAL"],
];
const afterItems = [
  ["Evidence stays attached", "LIVE"],
  ["Owners know what is next", "ROUTED"],
  ["One control maps everywhere", "REUSED"],
  ["Auditors see clean context", "READY"],
];

function ShiftCard({ title, label, items, dark, style }) {
  return (
    <motion.article
      className={`shift-card absolute right-4.5 left-4.5 z-1 h-96.25 rounded-[26px] p-7.5 max-[760px]:p-5.5 min-[761px]:relative min-[761px]:inset-auto min-[761px]:h-auto ${
        dark
          ? "shift-card--dark top-105 h-102.5 bg-navy text-white shadow-[0_24px_60px_rgba(6,27,50,.2)] min-[761px]:top-auto min-[761px]:h-auto"
          : "top-4.5 bg-white/76 min-[761px]:top-auto"
      }`}
      style={style}
    >
      <span className="technical-label">{label}</span>
      <h3 className="mt-18.5 mb-7 text-[1.85rem] max-[760px]:mt-9.5 max-[760px]:mb-5 max-[760px]:text-[1.6rem]">
        {title}
      </h3>
      <div className="grid gap-3.5">
        {items.map(([item, meta]) => (
          <div
            className={`flex min-h-13.5 items-center justify-between gap-3.5 rounded-[14px] px-4 py-3.5 text-[.75rem] ${
              dark ? "bg-white/8 text-white" : "bg-navy/5 text-muted"
            }`}
            key={item}
          >
            <span>{item}</span>
            <em
              className={`font-mono text-[.58rem] leading-none not-italic ${
                dark ? "text-mint" : ""
              }`}
            >
              {meta}
            </em>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function ShiftSection({ motionEnabled }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 12, 22]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [30, -12, -22]);

  return (
    <section className="section bg-white" id="platform" ref={ref}>
      <div className="shell">
        <Reveal
          className="section-heading section-heading--split"
          motionEnabled={motionEnabled}
        >
          <div>
            <p className="eyebrow">From audit scramble to operating rhythm</p>
            <h2>Stop rebuilding compliance from zero.</h2>
          </div>
          <p className="lede">
            The work your team approves today keeps working tomorrow—linked to
            the right controls, risks, frameworks, and owners.
          </p>
        </Reveal>
        <div className="shift-stage relative grid min-h-142.5 grid-cols-2 items-stretch gap-17.5 overflow-hidden rounded-[40px] p-10.5 max-[760px]:block max-[760px]:min-h-212.5 max-[760px]:rounded-[26px] max-[760px]:p-4.5">
          <ShiftCard
            label="Before Controllo"
            title="Every audit starts from zero."
            items={beforeItems}
            style={{ x: motionEnabled ? leftX : 0 }}
          />
          <ShiftCard
            label="With Controllo"
            title="Every approved artifact keeps working."
            items={afterItems}
            dark
            style={{ x: motionEnabled ? rightX : 0 }}
          />
        </div>
      </div>
    </section>
  );
}
