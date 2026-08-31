import Reveal from "../components/Reveal";
import { riskCells } from "../data/siteContent";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const riskMetrics = [
  ["2", "high asset risks"],
  ["3", "moderate vendor risks"],
  ["5", "low organisational risks"],
];

const riskLevels = [
  ['controlled', 'Controlled'],
  ['low', 'Low'],
  ['moderate', 'Moderate'],
  ['high', 'High'],
  ['critical', 'Critical'],
];

const getCellDelay = (index, critical) => {
  const row = Math.floor(index / 5);
  const column = index % 5;

  if (critical) return 0.76 + row * 0.04;
  return 0.12 + (row + column) * 0.055;
};

export default function RiskSection({ motionEnabled }) {
  const handleMatrixMouseMove = useCallback(
    (event) => {
      if (!motionEnabled || window.innerWidth <= 760) return;

      const field = event.currentTarget;
      const rect = field.getBoundingClientRect();

      field.style.setProperty("--risk-glow-x", `${event.clientX - rect.left}px`);
      field.style.setProperty("--risk-glow-y", `${event.clientY - rect.top}px`);
      field.style.setProperty("--risk-glow-opacity", "1");
    },
    [motionEnabled],
  );

  const handleMatrixMouseLeave = useCallback((event) => {
    const field = event.currentTarget;

    field.style.setProperty("--risk-glow-opacity", "0");
  }, []);

  return (
    <section
      aria-label="Connected risk prioritization"
      className="section bg-mint-soft"
      data-motion={motionEnabled ? "sequenced" : "static"}
      id="risk-assessment"
    >
      <div className="shell grid grid-cols-[.86fr_1.14fr] items-center gap-22 max-[1080px]:grid-cols-1 max-[1080px]:gap-13">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow">Risk Management based on NIST</p>
          <h2>Manage Risk Across Your Entire Program</h2>
          <p className="lede mt-6.25 mb-7.5">
            Manage risks across asset, organization, vendor, privacy, and AI.
            Score risk, assign ownership, and see priorities through connected
            dashboards and heatmaps.
          </p>
          <Link className="button button--directional" to="/platform/risk-management">
            Explore unified risk <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal
          className="relative overflow-hidden rounded-[30px] border border-navy/10 bg-white/78 p-6.5 shadow-elevated max-[760px]:p-4"
          motionEnabled={motionEnabled}
          delay={0.08}
        >
          <div className="mb-5.5 flex items-center justify-between gap-4">
            <strong>Dashboards for Clear Risk Posture</strong>
            <span className="font-mono text-[.59rem] font-medium leading-none tracking-[.08em] uppercase text-teal">
              Illustrative data
            </span>
          </div>
          <ul aria-label="Risk severity" className="risk-severity-legend">
            {riskLevels.map(([level, label]) => (
              <li key={level}>
                <span
                  aria-hidden="true"
                  className={`risk-severity-swatch risk-severity-swatch--${level}`}
                />
                {label}
              </li>
            ))}
          </ul>
          <div
            className="risk-matrix-hover-field relative overflow-hidden rounded-[18px] border border-navy/8 bg-white/55 p-2"
            data-risk-hover={motionEnabled ? "enabled" : "disabled"}
            data-testid="risk-matrix-hover-field"
            onMouseLeave={handleMatrixMouseLeave}
            onMouseMove={handleMatrixMouseMove}
          >
            <div
              className="relative z-1 grid grid-cols-5 gap-2"
              role="group"
              aria-label="Twenty-five risk groups. Two critical, seven monitored, and sixteen controlled."
            >
              {riskCells.map((cell, index) => (
                <motion.span
                  aria-label={`Risk group ${cell.id}, ${cell.level} risk`}
                  className={`risk-matrix-cell risk-matrix-cell--${cell.level} relative grid aspect-square place-items-center rounded-[10px] font-mono text-[.6rem] leading-none`}
                  data-risk-cell
                  data-risk-level={cell.level}
                  initial={motionEnabled ? { opacity: 0.18, scale: 0.9 } : false}
                  key={cell.id}
                  role="img"
                  transition={{
                    delay: motionEnabled ? getCellDelay(index, cell.critical) : 0,
                    duration: cell.critical ? 0.52 : 0.38,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.45 }}
                  whileInView={motionEnabled ? {
                    opacity: 1,
                    scale: cell.critical ? [0.9, 1.08, 1] : 1,
                  } : undefined}
                >
                  <span className="risk-matrix-cell__label">{cell.id}</span>
                </motion.span>
              ))}
            </div>
            {motionEnabled ? (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-2 top-0 z-2 h-[20%] border-b border-teal/24 bg-gradient-to-b from-transparent via-mint/12 to-teal/8"
                data-testid="risk-scan"
                initial={{ opacity: 0, y: "-100%" }}
                transition={{
                  delay: 0.22,
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, amount: 0.45 }}
                whileInView={{ opacity: [0, 0.82, 0], y: "500%" }}
              />
            ) : null}
          </div>
          <div className="mt-4.5 grid grid-cols-3 gap-2.5 max-[760px]:grid-cols-1 [&>div]:rounded-[13px] [&>div]:bg-navy/5 [&>div]:p-3.5 [&_strong]:block [&_strong]:text-[1.15rem] [&_span]:block [&_span]:text-[.62rem] [&_span]:text-muted">
            {riskMetrics.map(([value, label], index) => (
              <motion.div
                initial={motionEnabled ? { opacity: 0, y: 10 } : false}
                key={label}
                transition={{
                  delay: motionEnabled ? 0.92 + index * 0.09 : 0,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, amount: 0.7 }}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
