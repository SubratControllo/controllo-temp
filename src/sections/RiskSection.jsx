import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const riskMetrics = [
  ["2", "high asset risks"],
  ["3", "moderate vendor risks"],
  ["5", "low organisational risks"],
];

const heatmapRows = [
  ['low', 'low', 'moderate', 'high', 'critical'],
  ['low', 'low', 'moderate', 'high', 'high'],
  ['low', 'low', 'low', 'moderate', 'moderate'],
  ['low', 'low', 'low', 'low', 'low'],
  ['very-low', 'very-low', 'very-low', 'none', 'very-low'],
];

const heatmapColors = {
  none: '#e8efed',
  'very-low': '#d8f4eb',
  low: '#86d9bf',
  moderate: '#f2d468',
  high: '#e99a42',
  critical: '#a13838',
};

function ProductRiskHeatmap({ motionEnabled }) {
  return (
    <svg
      aria-label="Risk heatmap with a high asset risk selected at likelihood 8 and impact 8."
      className="relative z-1 block aspect-square w-full"
      data-risk-heatmap="product"
      role="img"
      viewBox="0 0 500 500"
    >
      <defs>
        <clipPath id="homepage-risk-heatmap-clip">
          <rect width="500" height="500" rx="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#homepage-risk-heatmap-clip)">
        {heatmapRows.flatMap((row, rowIndex) => row.map((level, columnIndex) => (
          <rect
            data-risk-cell
            data-risk-level={level}
            fill={heatmapColors[level]}
            height="100"
            key={`${rowIndex}-${columnIndex}`}
            width="100"
            x={columnIndex * 100}
            y={rowIndex * 100}
          />
        )))}
        <path d="M100 0V500M200 0V500M300 0V500M400 0V500M0 100H500M0 200H500M0 300H500M0 400H500" fill="none" stroke="rgba(6,27,50,.12)" strokeWidth="2" />
      </g>
      <g data-risk-selected="true" transform="translate(350 150)">
        {motionEnabled ? (
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            dur="6s"
            keySplines=".77 0 .175 1;.77 0 .175 1;.77 0 .175 1;.77 0 .175 1"
            keyTimes="0;.25;.5;.75;1"
            repeatCount="indefinite"
            type="translate"
            values="350 150;450 50;350 250;250 150;350 150"
          />
        ) : null}
        <circle r="21" fill="white" opacity=".94" />
        <circle r="11" fill="#061b32" />
        <circle r="20" fill="none" stroke="#087f8c" strokeWidth="3" />
      </g>
      <rect x="1" y="1" width="498" height="498" rx="18" fill="none" stroke="rgba(6,27,50,.16)" strokeWidth="2" />
    </svg>
  );
}

export default function RiskSection({ motionEnabled }) {
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
          <Link className="button button--directional" to="/risk-management">
            Explore unified risk <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal
          className="relative w-full max-w-[640px] justify-self-end overflow-hidden rounded-[30px] border border-navy/10 bg-white/78 p-6.5 shadow-elevated max-[1080px]:justify-self-start max-[760px]:p-4"
          motionEnabled={motionEnabled}
          delay={0.08}
        >
          <div className="mb-5.5 flex items-center justify-between gap-4">
            <strong>Dashboards for Clear Risk Posture</strong>
            <span className="font-mono text-[.59rem] font-medium leading-none tracking-[.08em] uppercase text-teal">
              Illustrative data
            </span>
          </div>
          <div
            className="relative mx-auto max-w-[560px] overflow-hidden rounded-[18px] border border-navy/8 bg-white/55 p-2"
            data-testid="risk-matrix-hover-field"
          >
            <ProductRiskHeatmap motionEnabled={motionEnabled} />
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
