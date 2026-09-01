import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Building2,
  Cloud,
  Database,
  FileSearch,
  Radar,
  ShieldCheck,
  UserRound,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { connectedCapabilities, platformDomains } from '../data/siteContent';

const domainIcons = {
  cybersecurity: ShieldCheck,
  privacy: FileSearch,
  'ai-governance': Bot
};

const capabilityIcons = {
  'risk-management': Radar,
  'cloud-monitoring': Cloud
};

const privacyFlowNodes = [
  {
    className: 'left-[3%] top-[35%] w-[23%]',
    detail: 'Data subject',
    icon: UserRound,
    label: 'Customer',
    tone: 'entity'
  },
  {
    className: 'left-[38%] top-[9%] w-[24%]',
    detail: 'Account setup',
    icon: Workflow,
    label: 'Signup service',
    tone: 'process'
  },
  {
    className: 'right-[3%] top-[35%] w-[24%]',
    detail: 'PII data store',
    icon: Database,
    label: 'Customer records',
    tone: 'store'
  },
  {
    className: 'bottom-[8%] left-[37%] w-[26%]',
    detail: 'Processing activity',
    icon: Workflow,
    label: 'Identity verification',
    tone: 'process'
  },
  {
    className: 'right-[4%] bottom-[8%] w-[22%]',
    detail: 'External recipient',
    icon: Building2,
    label: 'CRM',
    tone: 'entity'
  }
];

const privacyFlowEdges = [
  'M25 46 H28 Q31 46 31 43 V24 Q31 20 35 20 H37',
  'M63 20 H81 Q85 20 85 24 V34',
  'M50 36 C50 48 50 59 50 70',
  'M79 55 H82 Q85 55 85 58 V69',
  'M63 78 C69 73 74 64 78 56'
];

const privacyNodeTones = {
  entity: 'border-navy/12 bg-white text-navy',
  process: 'border-navy bg-navy text-white shadow-[0_10px_24px_rgba(6,27,50,.14)]',
  store: 'border-teal/20 bg-[#e7f8f3] text-navy'
};

const readinessIcons = [Workflow, FileSearch, ShieldCheck];

function CybersecurityReadinessPreview({ domain, motionEnabled }) {
  const Icon = domainIcons[domain.id];
  const { preview } = domain;

  return (
    <div
      aria-label={`${preview.title} cybersecurity readiness console`}
      className="mx-auto w-full max-w-[32rem] overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_24px_60px_rgba(6,27,50,.10)]"
      data-motion={motionEnabled ? 'progress' : 'static'}
      role="img"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5.5 py-4.5 max-[420px]:px-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-mint-soft text-teal">
            <Icon aria-hidden="true" className="size-4.5" />
          </span>
          <span className="min-w-0">
            <small className="block truncate font-mono text-[.56rem] font-medium tracking-[.08em] uppercase text-teal">
              {preview.label}
            </small>
            <strong className="mt-1 block truncate text-[.82rem]">{preview.title}</strong>
          </span>
        </span>
        <span className="shrink-0 rounded-[10px] bg-[#edf8f5] px-2.5 py-1.5 font-mono text-[.55rem] font-medium leading-none text-teal">
          {preview.meta}
        </span>
      </div>

      <div className="px-5.5 pt-5 pb-5 max-[420px]:px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <span>
            <small className="block text-[.64rem] text-muted">Current status</small>
            <strong className="mt-1.5 block text-[1.18rem] tracking-[-.025em]">
              {preview.metric}
            </strong>
          </span>
          <span className="mb-0.5 inline-flex shrink-0 items-center gap-1.5 text-[.58rem] text-teal">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-mint" />
            Live readiness
          </span>
        </div>

        <div className="grid grid-cols-[.76fr_1.24fr] overflow-hidden rounded-[16px] border border-navy/10 max-[420px]:grid-cols-[.72fr_1.28fr]">
          <div className="flex min-h-50 flex-col justify-between bg-navy p-4 text-white max-[420px]:p-3">
            <span className="grid size-9 place-items-center rounded-[11px] bg-white/10 text-mint">
              <ShieldCheck aria-hidden="true" className="size-4.5" />
            </span>
            <span>
              <small className="font-mono text-[.49rem] font-medium tracking-[.08em] uppercase text-white/55">
                Overall readiness
              </small>
              <strong className="mt-1 block text-[2.35rem] leading-none text-white max-[420px]:text-[1.75rem]">82%</strong>
              <span className="mt-3 block text-[.53rem] leading-[1.35] text-white/65">
                {preview.metric}
              </span>
            </span>
          </div>

          <div className="divide-y divide-navy/8 bg-field">
            {preview.rows.map(([label, value, status], index) => {
              const RowIcon = readinessIcons[index];

              return (
                <div className="min-h-[4.15rem] px-3 py-2.5 max-[420px]:px-2.5" key={label}>
                  <div className="mb-1.5 grid grid-cols-[22px_1fr_auto] items-center gap-2">
                    <span className="grid size-5.5 place-items-center rounded-[7px] bg-white text-teal">
                      <RowIcon aria-hidden="true" className="size-3" />
                    </span>
                    <strong className="min-w-0 truncate text-[.56rem] max-[420px]:text-[.5rem]">{label}</strong>
                    <span className="font-mono text-[.47rem] text-teal">{value}%</span>
                  </div>
                  <div className="ml-7.5 h-1.5 overflow-hidden rounded-full bg-navy/8">
                    <motion.span
                      animate={{ scaleX: 1 }}
                      className="block h-full origin-left rounded-full bg-teal"
                      data-readiness-track
                      initial={motionEnabled ? { scaleX: 0 } : false}
                      style={{ width: `${value}%` }}
                      transition={{ delay: motionEnabled ? 0.12 + index * 0.12 : 0, duration: motionEnabled ? 0.65 : 0, ease: 'easeOut' }}
                    />
                  </div>
                  <small className="mt-1 ml-7.5 block font-mono text-[.43rem] font-medium uppercase text-muted">{status}</small>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 border-t border-line pt-3.5">
          <div className="flex items-center justify-between gap-4">
            <span className="min-w-0">
              <small className="block font-mono text-[.48rem] font-medium tracking-[.08em] uppercase text-muted">Active control</small>
              <strong className="mt-1 block truncate text-[.68rem]">Access reviews</strong>
            </span>
            <span className="shrink-0 font-mono text-[.48rem] font-medium uppercase text-teal">Audit ready</span>
          </div>
          <div className="mt-3 grid grid-cols-3 divide-x divide-navy/8 border-t border-navy/8 pt-2.5 text-center text-[.47rem] text-muted">
            <span>Owner assigned</span>
            <span>Evidence current</span>
            <span>SOC 2 / ISO 27001 / NIST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyFlowNode({ className, detail, icon: Icon, label, tone }) {
  const isProcess = tone === 'process';

  return (
    <div
      className={`absolute z-1 grid min-h-15 place-items-center rounded-[8px] border px-2 py-2 text-center ${privacyNodeTones[tone]} ${className}`}
      data-flow-node
    >
      <Icon
        aria-hidden="true"
        className={`size-3.5 ${isProcess ? 'text-mint' : 'text-teal'}`}
        strokeWidth={1.8}
      />
      <strong className="mt-1 text-[.6rem] leading-[1.25]">{label}</strong>
      <small className={`mt-0.5 text-[.48rem] leading-[1.25] max-[420px]:hidden ${isProcess ? 'text-white/60' : 'text-muted'}`}>
        {detail}
      </small>
    </div>
  );
}

function PrivacyFlowPreview({ domain, motionEnabled }) {
  const Icon = domainIcons[domain.id];
  const { preview } = domain;

  return (
    <div
      aria-label="Customer onboarding data flow diagram"
      className="mx-auto w-full max-w-[32rem] overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_24px_60px_rgba(6,27,50,.10)]"
      data-motion={motionEnabled ? 'flow' : 'static'}
      role="img"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5.5 py-4.5 max-[420px]:px-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-mint-soft text-teal">
            <Icon aria-hidden="true" className="size-4.5" />
          </span>
          <span className="min-w-0">
            <small className="block truncate font-mono text-[.56rem] font-medium tracking-[.08em] uppercase text-teal">
              {preview.label}
            </small>
            <strong className="mt-1 block truncate text-[.82rem] max-[420px]:text-[.72rem]">
              {preview.title}
            </strong>
          </span>
        </span>
        <span className="shrink-0 rounded-[10px] bg-[#edf8f5] px-2.5 py-1.5 font-mono text-[.55rem] font-medium leading-none text-teal">
          {preview.meta}
        </span>
      </div>

      <div className="px-5.5 pt-5 pb-4.5 max-[420px]:px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <span>
            <small className="block text-[.64rem] text-muted">Current status</small>
            <strong className="mt-1.5 block text-[1.18rem] tracking-[-.025em]">
              {preview.metric}
            </strong>
          </span>
          <span className="mb-0.5 inline-flex items-center gap-1.5 text-[.58rem] text-teal">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-mint" />
            Live map
          </span>
        </div>

        <div className="relative min-h-68 overflow-hidden rounded-[16px] border border-teal/12 bg-[#f7fffd] bg-[radial-gradient(circle_at_1px_1px,rgba(8,127,140,.12)_1px,transparent_0)] [background-size:18px_18px] max-[420px]:min-h-64">
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <marker
                id="privacy-flow-arrow"
                markerHeight="4.25"
                markerWidth="4.25"
                orient="auto"
                refX="4"
                refY="2.125"
              >
                <path d="M0,0 L4.25,2.125 L0,4.25 Z" fill="#087f8c" />
              </marker>
            </defs>
            {privacyFlowEdges.map((path, index) => (
              <path
                d={path}
                data-flow-underlay
                fill="none"
                key={`underlay-${path}`}
                stroke="#087f8c"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={index === 2 || index === 4 ? 0.24 : 0.18}
                strokeWidth="0.48"
              />
            ))}
            {privacyFlowEdges.map((path, index) => (
              <motion.path
                animate={motionEnabled ? { strokeDashoffset: [0, -12] } : { strokeDashoffset: 0 }}
                data-flow-edge
                d={path}
                fill="none"
                initial={false}
                key={path}
                markerEnd="url(#privacy-flow-arrow)"
                stroke="#087f8c"
                strokeDasharray="2.5 2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={index === 2 || index === 4 ? 0.8 : 0.58}
                strokeWidth="0.75"
                transition={{
                  delay: index * 0.08,
                  duration: 1.2,
                  ease: 'linear',
                  repeat: motionEnabled ? Infinity : 0
                }}
              />
            ))}
          </svg>

          {privacyFlowNodes.map((node) => (
            <PrivacyFlowNode {...node} key={node.label} />
          ))}

          <span className="absolute top-[20%] left-[10%] lg:left-[20%] z-2 bg-[#f7fffd]/90 px-1 text-[.45rem] text-muted">
            Identity data
          </span>
          <span className="absolute top-[25%] right-[18%] z-2 bg-[#f7fffd]/90 px-1 text-[.45rem] text-muted">
            PII
          </span>
          <span className="absolute top-[52%] left-[51%] z-2 bg-[#f7fffd]/90 px-1 text-[.45rem] text-muted">
            Verification request
          </span>
        </div>

      </div>
    </div>
  );
}

const aiInventoryIcons = [UserRound, Radar, ShieldCheck];
const aiRiskSteps = ['Registered', 'Owner assigned', 'Risks evaluated', 'Score current'];

function AIInventoryPreview({ domain, motionEnabled }) {
  const Icon = domainIcons[domain.id];
  const { preview } = domain;

  return (
    <div
      aria-label={`${preview.title} AI system inventory`}
      className="mx-auto w-full max-w-[32rem] overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_24px_60px_rgba(6,27,50,.10)]"
      data-motion={motionEnabled ? 'progress' : 'static'}
      role="img"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5.5 py-4.5 max-[420px]:px-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-mint-soft text-teal">
            <Icon aria-hidden="true" className="size-4.5" />
          </span>
          <span className="min-w-0">
            <small className="block truncate font-mono text-[.56rem] font-medium tracking-[.08em] uppercase text-teal">
              {preview.label}
            </small>
            <strong className="mt-1 line-clamp-2 whitespace-normal text-[.82rem] max-[420px]:text-[.72rem] max-[420px]:leading-[1.25]">
              {preview.title}
            </strong>
          </span>
        </span>
        <span className="shrink-0 rounded-[10px] bg-[#edf8f5] px-2.5 py-1.5 font-mono text-[.55rem] font-medium leading-none text-teal max-[420px]:px-2 max-[420px]:text-[.48rem]">
          {preview.meta}
        </span>
      </div>

      <div className="px-5.5 pt-5 pb-5 max-[420px]:px-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <span>
            <small className="block text-[.64rem] text-muted">Current status</small>
            <strong className="mt-1.5 block text-[1.18rem] tracking-[-.025em] max-[420px]:text-[1rem]">
              {preview.metric}
            </strong>
          </span>
          <span className="mb-0.5 inline-flex shrink-0 items-center gap-1.5 text-[.58rem] text-teal">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-mint" />
            Active
          </span>
        </div>

        <div className="grid grid-cols-[.88fr_1.12fr] overflow-hidden rounded-[16px] border border-navy/10 max-[420px]:grid-cols-[.82fr_1.18fr]">
          <div className="flex min-h-50 flex-col justify-between bg-navy p-4 text-white max-[420px]:p-3">
            <span className="grid size-9 place-items-center rounded-[11px] bg-white/10 text-mint">
              <Bot aria-hidden="true" className="size-4.5" />
            </span>
            <span>
              <small className="font-mono text-[.49rem] font-medium tracking-[.08em] uppercase text-white/55">
                AI system record
              </small>
              <strong className="mt-2 block text-[.86rem] leading-[1.3] max-[420px]:text-[.7rem]">
                {preview.title}
              </strong>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[.55rem] text-mint">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-mint" />
                Active
              </span>
            </span>
          </div>

          <div className="divide-y divide-navy/8 bg-field">
            {preview.rows.map(([label, value, status], index) => {
              const RowIcon = aiInventoryIcons[index];

              return (
                <div className="grid min-h-[4.15rem] grid-cols-[26px_1fr] items-center gap-2.5 px-3 max-[420px]:gap-2 max-[420px]:px-2.5" key={label}>
                  <span className="grid size-6.5 place-items-center rounded-[8px] bg-white text-teal shadow-[0_1px_0_rgba(6,27,50,.08)]">
                    <RowIcon aria-hidden="true" className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <small className="block truncate text-[.49rem] text-muted">{label}</small>
                    <strong className="mt-0.5 block truncate text-[.62rem] max-[420px]:text-[.55rem]">{value}</strong>
                    <span className="mt-0.5 block font-mono text-[.45rem] font-medium uppercase text-teal">{status}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 border-t border-line pt-3.5">
          <div className="mb-3 flex items-center justify-between">
            <small className="font-mono text-[.5rem] font-medium tracking-[.08em] uppercase text-muted">Risk workflow</small>
            <small className="text-[.5rem] text-teal">4 current steps</small>
          </div>
          <div className="relative">
            <span aria-hidden="true" className="absolute top-1.5 right-[12.5%] left-[12.5%] h-px bg-navy/12" />
            <motion.span
              animate={motionEnabled ? { scaleX: [0, 1, 1] } : { scaleX: 1 }}
              aria-hidden="true"
              className="absolute top-1.5 right-[12.5%] left-[12.5%] h-px origin-left bg-teal"
              initial={false}
              transition={{
                duration: motionEnabled ? 3.2 : 0,
                ease: 'easeInOut',
                repeat: motionEnabled ? Infinity : 0,
                times: [0, 0.72, 1]
              }}
            />
            <div className="relative grid grid-cols-4">
              {aiRiskSteps.map((step) => (
                <span className="text-center" data-assessment-step key={step}>
                  <span aria-hidden="true" className="mx-auto block size-3 rounded-full border-[3px] border-white bg-teal shadow-[0_0_0_1px_rgba(8,127,140,.28)]" />
                  <small className="mt-2 block text-[.46rem] text-muted max-[420px]:text-[.4rem]">{step}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DomainPreview({ domain, motionEnabled }) {
  if (domain.id === 'cybersecurity') {
    return <CybersecurityReadinessPreview domain={domain} motionEnabled={motionEnabled} />;
  }

  if (domain.id === 'privacy') {
    return <PrivacyFlowPreview domain={domain} motionEnabled={motionEnabled} />;
  }

  if (domain.id === 'ai-governance') {
    return <AIInventoryPreview domain={domain} motionEnabled={motionEnabled} />;
  }

  const Icon = domainIcons[domain.id];
  const { preview } = domain;

  return (
    <div
      className="mx-auto w-full max-w-[32rem] overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-[0_24px_60px_rgba(6,27,50,.10)]"
      role="img"
      aria-label={`${preview.label} product interface preview`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5.5 py-4.5 max-[420px]:px-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-mint-soft text-teal">
            <Icon className="size-4.5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <small className="block truncate font-mono text-[.56rem] font-medium tracking-[.08em] uppercase text-teal">
              {preview.label}
            </small>
            <strong className="mt-1 block truncate text-[.82rem]">{preview.title}</strong>
          </span>
        </span>
        <span className="shrink-0 rounded-[10px] bg-[#edf8f5] px-2.5 py-1.5 font-mono text-[.55rem] font-medium leading-none text-teal">
          {preview.meta}
        </span>
      </div>

      <div className="px-5.5 pt-6 pb-5 max-[420px]:px-4">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-5">
          <span>
            <small className="block text-[.64rem] text-muted">Current status</small>
            <strong className="mt-1.5 block text-[1.5rem] tracking-[-.035em]">{preview.metric}</strong>
          </span>
          <span className="mb-1 inline-flex items-center gap-1.5 text-[.61rem] text-teal">
            <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
            Current
          </span>
        </div>

        <div className="grid gap-2.5">
          {preview.rows.map(([name, detail, status], index) => (
            <div
              className="grid min-h-15 grid-cols-[28px_1fr_auto] items-center gap-3 rounded-[14px] bg-field px-3.5 py-2.5"
              key={name}
            >
              <span className="grid size-7 place-items-center rounded-[9px] bg-navy/[.055] font-mono text-[.55rem] text-teal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-[.69rem]">{name}</strong>
                <small className="mt-0.5 block truncate text-[.6rem] text-muted">{detail}</small>
              </span>
              <span className="font-mono text-[.52rem] font-medium uppercase text-teal">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlatformSection({ motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeDomain = platformDomains[activeIndex];

  const selectTab = (index) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % platformDomains.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + platformDomains.length) % platformDomains.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = platformDomains.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    selectTab(nextIndex);
  };

  return (
    <section className="section bg-white" id="platform">
      <div className="shell">
        <Reveal className="mx-auto mb-12 max-w-205 text-center" motionEnabled={motionEnabled}>
          <p className="eyebrow">One connected platform</p>
          <h2 className="mx-auto">Everything connected by design.</h2>
          <p className="lede mx-auto mt-5.5">
            Run cybersecurity, privacy, and AI governance with the same control,
            evidence, risk, ownership, and audit context underneath.
          </p>
        </Reveal>

        <Reveal motionEnabled={motionEnabled} delay={0.05}>
          <div
            className="mx-auto mb-5 grid max-w-190 grid-cols-3 gap-1.5 rounded-[18px] border border-line bg-field p-1.5 max-[760px]:grid-cols-1"
            role="tablist"
            aria-label="Governance domains"
          >
            {platformDomains.map((domain, index) => (
              <button
                ref={(node) => { tabRefs.current[index] = node; }}
                className="min-h-12 cursor-pointer rounded-[13px] border-0 px-4 text-[1rem] font-medium transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button"
                id={`domain-tab-${domain.id}`}
                type="button"
                role="tab"
                aria-controls={`domain-panel-${domain.id}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                key={domain.id}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {domain.label}
              </button>
            ))}
          </div>

          <div className="min-[1081px]:h-142.5 overflow-hidden rounded-[30px] border border-teal/12 bg-[#edfffb] max-[760px]:rounded-[24px]">
            <motion.div
              className="grid size-full grid-cols-2 max-[1080px]:grid-cols-1"
              id={`domain-panel-${activeDomain.id}`}
              role="tabpanel"
              aria-labelledby={`domain-tab-${activeDomain.id}`}
              key={activeDomain.id}
              initial={motionEnabled ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionEnabled ? 0.24 : 0, ease: 'easeOut' }}
            >
              <div className="flex items-center px-11 py-12 max-[1080px]:px-8 max-[760px]:px-5.5 max-[760px]:py-9">
                <div className="mx-auto w-full max-w-120">
                  <p className="eyebrow mb-4">{activeDomain.eyebrow}</p>
                  <h3 className="max-w-115 text-[clamp(1.8rem,2.75vw,2.55rem)]">{activeDomain.title}</h3>
                  <p className="mt-5 mb-0 max-w-118 text-[.92rem] leading-[1.75] text-muted">{activeDomain.description}</p>
                  <ul className="mt-7 mb-8 grid list-none grid-cols-2 gap-x-5 gap-y-3 border-t border-navy/10 pt-6 pl-0 max-[420px]:grid-cols-1">
                    {activeDomain.features.map((feature) => (
                      <li className="flex items-center gap-2.5 text-[.69rem] text-nav-text" key={feature}>
                        <span className="size-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link className="inline-flex min-h-11 items-center gap-2 text-[.78rem] font-medium text-teal transition-colors hover:text-navy [&>svg]:size-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1" to={activeDomain.cta[1]}>
                    {activeDomain.cta[0]} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center border-l border-teal/10 bg-white/35 px-9 py-10 max-[1080px]:border-t max-[1080px]:border-l-0 max-[760px]:px-5 max-[760px]:py-8">
                <DomainPreview domain={activeDomain} motionEnabled={motionEnabled} />
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal
          className="mt-7 grid grid-cols-2 border-y border-line max-[760px]:grid-cols-1"
          motionEnabled={motionEnabled}
          delay={0.08}
        >
          <div className="contents" role="group" aria-label="Connected platform capabilities">
            {connectedCapabilities.map((capability, index) => {
              const Icon = capabilityIcons[capability.id];
              return (
                <article
                  className={`grid grid-cols-[42px_1fr] gap-4 py-7 ${index === 0 ? 'border-r border-line pr-8 max-[760px]:border-r-0 max-[760px]:border-b max-[760px]:pr-0' : 'pl-8 max-[760px]:pl-0'}`}
                  key={capability.id}
                >
                  <span className="grid size-10 place-items-center rounded-[13px] bg-mint-soft text-teal">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-2 font-mono text-[.56rem] font-medium tracking-[.1em] uppercase text-teal">{capability.eyebrow}</p>
                    <h3 className="text-[1.2rem]">{capability.title}</h3>
                    <p className="mt-2.5 mb-4 max-w-120 text-[.7rem] leading-[1.7] text-muted">{capability.description}</p>
                    <Link className="inline-flex min-h-11 items-center gap-2 text-[.7rem] font-medium text-teal hover:text-navy [&>svg]:size-3.5" to={capability.cta[1]}>
                      {capability.cta[0]} <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
