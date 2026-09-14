import { useCallback, useRef, useState } from 'react';
import { BarChart3, ListChecks, SlidersHorizontal, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Reveal from '../../components/Reveal';
import {
  riskHeatmapCells,
  riskSeverityLevels,
} from '../../data/riskManagementContent';

const modes = [
  { id: 'register', label: 'Risk register', icon: ListChecks },
  { id: 'heatmap', label: 'Risk heatmap', icon: BarChart3 },
];

const registerRows = [
  ['Privileged access review', 'Organization', 'Likely', 'Major', 'High'],
  ['Unsupported endpoint asset', 'Asset', 'Possible', 'Major', 'Elevated'],
  ['Vendor evidence gap', 'Vendor', 'Possible', 'Moderate', 'Moderate'],
];

const heatmapLabels = new Map([
  ['B1', { display: 'Vendor', name: 'Vendor' }],
  ['A2', { display: 'Asset', name: 'Asset' }],
  ['B4', { display: 'Privacy', name: 'Privacy' }],
  ['C3', { display: 'Org', name: 'Organization' }],
  ['C5', { display: 'AI', name: 'AI' }],
]);

const getHeatmapCellDelay = (index, critical) => {
  const row = Math.floor(index / 5);
  const column = index % 5;

  if (critical) return 0.28 + row * 0.04;
  return 0.06 + (row + column) * 0.045;
};

function RegisterPanel() {
  return (
    <div className="rounded-[22px] border border-line bg-white p-5 shadow-[0_22px_80px_rgba(1,31,45,.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[.62rem] font-medium uppercase tracking-[.14em] text-teal">Representative register</p>
          <p className="mt-2 text-[1rem] font-semibold text-navy">Framework filter: ISO 27001</p>
        </div>
        <span className="rounded-full bg-mint-soft px-3 py-1 font-mono text-[.62rem] font-medium uppercase tracking-[.12em] text-teal">
          Linked controls
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[620px] w-full border-collapse text-left text-[.78rem]">
          <thead className="font-mono text-[.6rem] uppercase tracking-[.1em] text-muted">
            <tr>
              {['Risk', 'Context', 'Likelihood', 'Impact', 'Level'].map((heading) => (
                <th key={heading} className="border-b border-line py-3 pr-4 font-medium">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registerRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className={`border-b border-line py-4 pr-4 ${index === 0 ? 'font-semibold text-navy' : 'text-muted'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeatmapPanel({ motionEnabled }) {
  const handleMatrixMouseMove = useCallback(
    (event) => {
      if (!motionEnabled || window.innerWidth <= 760) return;

      const field = event.currentTarget;
      const rect = field.getBoundingClientRect();

      field.style.setProperty('--risk-glow-x', `${event.clientX - rect.left}px`);
      field.style.setProperty('--risk-glow-y', `${event.clientY - rect.top}px`);
      field.style.setProperty('--risk-glow-opacity', '1');
    },
    [motionEnabled],
  );

  const handleMatrixMouseLeave = useCallback((event) => {
    event.currentTarget.style.setProperty('--risk-glow-opacity', '0');
  }, []);

  return (
    <div className="mx-auto w-full max-w-[510px] rounded-[22px] border border-line bg-white p-5 shadow-[0_22px_80px_rgba(1,31,45,.08)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[.62rem] font-medium uppercase tracking-[.14em] text-teal">Representative heatmap</p>
          <p className="mt-2 text-[1rem] font-semibold text-navy">Likelihood and impact concentration</p>
        </div>
        <span className="font-mono text-[.59rem] font-medium leading-none tracking-[.08em] uppercase text-teal">
          Illustrative data
        </span>
      </div>
      <ul aria-label="Risk severity" className="risk-severity-legend">
        {riskSeverityLevels.map(([level, label]) => (
          <li key={level}>
            <span
              aria-hidden="true"
              className={`risk-severity-swatch risk-severity-swatch--${level}`}
            />
            {label}
          </li>
        ))}
      </ul>
      <div className="mx-auto w-full max-w-[410px] max-[520px]:max-w-[280px]">
        <p className="mb-2 font-mono text-[.58rem] font-medium uppercase tracking-[.1em] text-muted">
          Impact
        </p>
        <div>
          <div
            className="risk-matrix-hover-field relative overflow-hidden rounded-[16px] bg-white/40 p-1"
            data-risk-hover={motionEnabled ? 'enabled' : 'disabled'}
            data-testid="risk-page-heatmap-field"
            onMouseLeave={handleMatrixMouseLeave}
            onMouseMove={handleMatrixMouseMove}
          >
          <div
            className="relative z-1 grid grid-cols-5 gap-2"
            role="group"
            aria-label="Twenty-five risk groups. Two critical, seven monitored, and sixteen controlled."
          >
            {riskHeatmapCells.map((cell, index) => (
              <motion.span
                aria-label={`Risk group ${cell.id}, ${cell.level} risk${heatmapLabels.has(cell.id) ? `, ${heatmapLabels.get(cell.id).name}` : ''}`}
                className={`risk-matrix-cell risk-matrix-cell--${cell.level} relative grid aspect-square place-items-center rounded-[10px] p-1 font-mono text-[.54rem] leading-none max-[520px]:text-[.48rem]`}
                data-risk-cell
                data-risk-level={cell.level}
                initial={motionEnabled ? { opacity: 0.18, scale: 0.9 } : false}
                key={cell.id}
                role="img"
                transition={{
                  delay: motionEnabled ? getHeatmapCellDelay(index, cell.critical) : 0,
                  duration: cell.critical ? 0.5 : 0.34,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, amount: 0.45 }}
                whileInView={motionEnabled ? {
                  opacity: 1,
                  scale: cell.critical ? [0.9, 1.08, 1] : 1,
                } : undefined}
              >
                <span className="risk-matrix-cell__label">
                  {heatmapLabels.get(cell.id)?.display ?? cell.id}
                </span>
              </motion.span>
            ))}
          </div>
          {motionEnabled ? (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 top-0 z-2 h-[20%] border-b border-teal/24 bg-gradient-to-b from-transparent via-mint/12 to-teal/8"
              data-testid="risk-page-heatmap-scan"
              initial={{ opacity: 0, y: '-100%' }}
              transition={{
                delay: 0.16,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, amount: 0.45 }}
              whileInView={{ opacity: [0, 0.82, 0], y: '500%' }}
            />
          ) : null}
          </div>
        </div>
        <p className="mt-3 text-right font-mono text-[.58rem] font-medium uppercase tracking-[.1em] text-muted">
          Likelihood
        </p>
      </div>
    </div>
  );
}

export default function RiskAssessmentSection({ content, motionEnabled }) {
  const [mode, setMode] = useState(modes[0].id);
  const tabRefs = useRef([]);
  const activeIndex = modes.findIndex((item) => item.id === mode);

  const chooseMode = (index) => {
    const nextMode = modes[index];
    if (!nextMode) return;
    setMode(nextMode.id);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      chooseMode(activeIndex === 0 ? 1 : 0);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      chooseMode(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      chooseMode(modes.length - 1);
    }
  };

  return (
    <section className="section bg-mint-soft" aria-labelledby="risk-assessment-title">
      <div className="shell grid grid-cols-[.82fr_1.18fr] items-start gap-[76px] max-[1080px]:grid-cols-1">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="risk-assessment-title">{content.title}</h2>
          <p className="lede mt-5">{content.description}</p>
          <div className="mt-9 grid gap-4">
            {content.features.map(([title, detail], index) => {
              const Icon = [SlidersHorizontal, BarChart3, UserCheck][index] ?? ListChecks;
              return (
                <div key={title} className="grid grid-cols-[46px_1fr] gap-4 border-t border-teal/16 pt-5">
                  <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-white text-teal">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span>
                    <span className="block text-[1rem] font-semibold text-navy">{title}</span>
                    <span className="mt-1 block text-[.86rem] leading-[1.65] text-muted">{detail}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal motionEnabled={motionEnabled} delay={0.08}>
          <div
            className="mx-auto mb-4 flex w-fit rounded-full border border-line bg-white p-1"
            role="tablist"
            aria-label="Risk visibility views"
            onKeyDown={handleKeyDown}
          >
            {modes.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.id === mode;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`risk-visibility-${item.id}`}
                  id={`risk-visibility-tab-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[.78rem] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                    isActive ? 'bg-navy text-white' : 'text-muted hover:text-navy'
                  }`}
                  onClick={() => setMode(item.id)}
                >
                  <Icon aria-hidden="true" size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <div
            id={`risk-visibility-${mode}`}
            role="tabpanel"
            aria-labelledby={`risk-visibility-tab-${mode}`}
          >
            {mode === 'register' ? <RegisterPanel /> : <HeatmapPanel motionEnabled={motionEnabled} />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
