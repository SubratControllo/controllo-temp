import { useRef, useState } from 'react';
import {
  CheckCircle,
  ClipboardText,
  Gauge,
  ShieldWarning,
  Stack,
  UserCircleCheck,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';

const tabIcons = {
  'ai-systems': Stack,
  'ai-risk-assessment': ShieldWarning,
};

const workflowIcons = [Stack, UserCircleCheck, Gauge];

function getFieldValue(fields, target) {
  return fields.find(([label]) => label === target)?.[1] ?? '';
}

function WorkspaceTabs({ activeIndex, activate, content, onKeyDown, tabsRef }) {
  return (
    <div
      className="inline-flex min-h-13 rounded-2xl border border-navy/10 bg-white p-1 shadow-[0_12px_30px_rgba(6,27,50,.055)]"
      role="tablist"
      aria-label="AI governance workspace views"
    >
      {content.views.map((view, index) => {
        const Icon = tabIcons[view.id] ?? ClipboardText;
        const isActive = index === activeIndex;

        return (
          <button
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border-0 bg-transparent px-3.5 text-[.78rem] font-medium text-muted transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button max-[460px]:px-2.5 max-[460px]:text-[.72rem]"
            ref={(node) => { tabsRef.current[index] = node; }}
            id={`ai-operations-tab-${view.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`ai-operations-panel-${view.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => activate(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            key={view.id}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" weight="regular" />
            {view.label}
          </button>
        );
      })}
    </div>
  );
}

function WorkflowPath({ workflow }) {
  return (
    <aside
      aria-label="Operating workflow"
      className="relative overflow-hidden rounded-[30px] border border-navy/9 bg-white/[.82] p-5 shadow-[0_22px_60px_rgba(6,27,50,.055)] backdrop-blur-sm"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-mint/20 blur-[72px]" />
      <div className="relative">
        <p className="font-mono text-[.62rem] uppercase tracking-[.13em] text-teal">Operating workflow</p>
        <h3 className="mt-4 max-w-[15ch] text-[clamp(1.45rem,2vw,1.9rem)] leading-[1.06] tracking-[-.035em] text-navy">
          One record carries the work forward.
        </h3>
        <p className="mt-3 max-w-[26ch] text-[.84rem] leading-6 text-navy/62">
          System context stays attached as the team moves into ownership and risk review.
        </p>

        <ol className="mt-6 list-none space-y-0 pl-0" aria-label="AI governance workflow">
          {workflow.map((step, index) => {
            const Icon = workflowIcons[index] ?? ClipboardText;

            return (
              <li className="relative grid grid-cols-[2.35rem_minmax(0,1fr)] gap-3 pb-4 last:pb-0" key={step}>
                {index < workflow.length - 1 && (
                  <span aria-hidden="true" className="absolute bottom-1 left-[1.14rem] top-10 w-px bg-teal/18" />
                )}
                <span className="relative z-10 grid size-9 place-items-center rounded-xl border border-teal/14 bg-[#e5f6f1] text-teal shadow-[inset_0_1px_0_rgba(255,255,255,.9)]">
                  <Icon aria-hidden="true" className="size-4" weight="regular" />
                </span>
                <span className="pt-1">
                  <span className="block font-mono text-[.52rem] uppercase tracking-[.1em] text-teal">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-[.92rem] font-medium leading-5 text-navy">{step}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}

function FieldPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-navy/8 bg-[#f3f8f6] px-3 py-3 sm:px-4">
      <dt className="text-[.66rem] text-muted">{label}</dt>
      <dd className="m-0 mt-1 text-[.82rem] font-medium leading-5 text-navy">{value}</dd>
    </div>
  );
}

function ContextChecklist({ items }) {
  return (
    <ul className="grid list-none gap-2 pl-0" aria-label="Connected context">
      {items.map((item) => (
        <li className="flex items-center gap-2 rounded-2xl border border-navy/8 bg-white/72 px-3 py-2.5 text-[.72rem] leading-5 text-navy/66" key={item}>
          <CheckCircle aria-hidden="true" className="size-4 shrink-0 text-teal" weight="regular" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HandoffStrip({ label }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal/12 bg-[#ecfaf6] px-4 py-3">
      <span className="text-[.74rem] font-medium text-navy">{label}</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-teal/12 bg-white/70 px-3 py-1.5 text-[.68rem] font-medium text-teal">
        <CheckCircle aria-hidden="true" className="size-3.5" weight="fill" />
        Context carried forward
      </span>
    </div>
  );
}

function CardEdgeCurrent({ motionEnabled }) {
  return (
    <span
      aria-hidden="true"
      className="ai-operations-card-current"
      data-motion={motionEnabled ? 'animated' : 'static'}
      data-testid="ai-operations-card-current"
    />
  );
}

function SystemRecord({ fields, motionEnabled, title }) {
  const owner = getFieldValue(fields, 'Owner');
  const status = getFieldValue(fields, 'Status');
  const purpose = getFieldValue(fields, 'Purpose');
  const reviewContext = getFieldValue(fields, 'Review context');

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(14rem,.72fr)]">
        <article className="relative overflow-hidden rounded-[26px] border border-navy/9 bg-white p-4 text-navy shadow-[0_22px_55px_rgba(6,27,50,.075)] sm:p-6">
          <CardEdgeCurrent motionEnabled={motionEnabled} />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[.6rem] uppercase tracking-[.13em] text-teal">AI system record</p>
              <h3 className="mt-4 max-w-sm text-[clamp(1.75rem,3.2vw,2.45rem)] leading-[1.03] tracking-[-.045em] text-navy">
                {title}
              </h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint-soft px-3 py-1.5 text-[.74rem] font-medium text-navy">
              <CheckCircle aria-hidden="true" className="size-4 text-teal" weight="fill" />
              {status}
            </span>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 max-[360px]:grid-cols-1 sm:mt-8">
            <FieldPill label="Purpose" value={purpose} />
            <FieldPill label="Owner" value={owner} />
            <FieldPill label="Review context" value={reviewContext} />
            <FieldPill label="Status" value={status} />
          </dl>
        </article>

        <aside className="relative overflow-hidden rounded-[26px] border border-teal/14 bg-[#dff7f1] p-4 text-navy shadow-[0_18px_48px_rgba(17,132,125,.09)] sm:p-5">
          <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-44 rounded-full bg-white/60 blur-[54px]" />
          <div className="relative">
            <div className="flex items-center gap-3 text-teal">
              <ShieldWarning aria-hidden="true" className="size-5" weight="regular" />
              <p className="font-mono text-[.58rem] uppercase tracking-[.12em]">Risk handoff</p>
            </div>
            <p className="mt-5 text-[1.16rem] font-medium leading-6">Ready for AI-specific assessment.</p>
            <p className="mt-2 text-sm leading-6 text-navy/58">
              The owner, purpose, and review context move with the record.
            </p>
            <div className="mt-5">
              <ContextChecklist items={['System details recorded', 'Owner available', 'Risk workflow ready']} />
            </div>
          </div>
        </aside>
      </div>
      <HandoffStrip label="Next workspace: assess likelihood, impact, and responsible owner." />
    </div>
  );
}

function RiskAssessment({ fields, motionEnabled, title }) {
  const riskContext = getFieldValue(fields, 'Risk context');
  const likelihood = getFieldValue(fields, 'Likelihood');
  const impact = getFieldValue(fields, 'Impact');
  const owner = getFieldValue(fields, 'Responsible owner');
  const status = getFieldValue(fields, 'Assessment status');

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(14rem,.72fr)_minmax(0,1.08fr)]">
        <aside className="rounded-[26px] border border-navy/9 bg-white p-4 text-navy shadow-[0_18px_48px_rgba(6,27,50,.06)] sm:p-5">
          <div className="flex items-center gap-3 text-teal">
            <Stack aria-hidden="true" className="size-5" weight="regular" />
            <p className="font-mono text-[.58rem] uppercase tracking-[.12em]">Source system</p>
          </div>
          <p className="mt-5 text-[1.16rem] font-medium leading-6">{title}</p>
          <p className="mt-2 text-sm leading-6 text-navy/58">{riskContext}</p>
          <div className="mt-5">
            <ContextChecklist items={['System context linked', 'Owner carried forward', 'Assessment status current']} />
          </div>
        </aside>

        <article className="relative overflow-hidden rounded-[26px] border border-teal/14 bg-[#dff7f1] p-4 text-navy shadow-[0_22px_55px_rgba(17,132,125,.1)] sm:p-6">
          <CardEdgeCurrent motionEnabled={motionEnabled} />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[.6rem] uppercase tracking-[.13em] text-teal">AI risk assessment</p>
              <h3 className="mt-4 max-w-sm text-[clamp(1.65rem,3vw,2.35rem)] leading-[1.04] tracking-[-.045em] text-navy">
                Likelihood and impact stay tied to ownership.
              </h3>
            </div>
            <span className="rounded-full bg-white/70 px-3 py-1.5 text-[.74rem] font-medium text-navy">{status}</span>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 max-[360px]:grid-cols-1 sm:mt-8">
            <FieldPill label="Likelihood" value={likelihood} />
            <FieldPill label="Impact" value={impact} />
            <FieldPill label="Responsible owner" value={owner} />
            <FieldPill label="Risk context" value={riskContext} />
          </dl>
        </article>
      </div>
      <HandoffStrip label="The assessment keeps the source system and responsible owner visible." />
    </div>
  );
}

function PanelBody({ view, motionEnabled }) {
  const isRiskView = view.id === 'ai-risk-assessment';

  return (
    <motion.div
      data-testid="ai-operations-panel-body"
      initial={motionEnabled ? { opacity: 0, y: 12, scale: 0.992 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={motionEnabled ? { opacity: 0, y: -8, scale: 0.996 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {isRiskView
        ? <RiskAssessment fields={view.fields} motionEnabled={motionEnabled} title={view.title} />
        : <SystemRecord fields={view.fields} motionEnabled={motionEnabled} title={view.title} />}
    </motion.div>
  );
}

export default function AiOperationsSection({ content, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);
  const activeView = content.views[activeIndex];

  const activate = (index) => {
    const normalized = (index + content.views.length) % content.views.length;
    setActiveIndex(normalized);
    tabsRef.current[normalized]?.focus();
  };

  const onKeyDown = (event, index) => {
    const targets = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: content.views.length - 1,
    };
    if (targets[event.key] === undefined) return;
    event.preventDefault();
    activate(targets[event.key]);
  };

  return (
    <section className="relative w-full max-w-full overflow-x-clip bg-white py-24 md:py-28" aria-labelledby="ai-operations-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-12 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]" />

      <div className="shell relative">
        <header className="max-w-3xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-balance" id="ai-operations-title">{content.title}</h2>
          <p className="mt-5 max-w-2xl text-lg text-ink/72">{content.description}</p>
        </header>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-[minmax(16rem,.34fr)_minmax(0,1fr)]">
          <WorkflowPath workflow={content.workflow} />

          <div className="relative isolate overflow-hidden rounded-[32px] border border-navy/10 bg-[#f8fbfa] p-3 shadow-[0_28px_80px_rgba(6,27,50,.09)] sm:p-4">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(38,216,173,.14),transparent_34%),linear-gradient(145deg,rgba(255,255,255,.7),transparent_62%)]" />
            <img alt="" aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-24 w-80 opacity-[.035]" src="/assets/emblemLogo.svg" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-navy/8 px-2 pb-3 sm:px-4 sm:pb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-teal/12 bg-white text-teal shadow-[0_10px_28px_rgba(6,27,50,.055)]">
                  <ClipboardText aria-hidden="true" className="size-5" weight="regular" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[.62rem] uppercase tracking-[.13em] text-teal">AI operations workspace</p>
                  <p className="mt-1 text-sm leading-5 text-navy/56">Inventory and risk review in one connected flow.</p>
                </div>
              </div>

              <WorkspaceTabs
                activeIndex={activeIndex}
                activate={activate}
                content={content}
                onKeyDown={onKeyDown}
                tabsRef={tabsRef}
              />
            </div>

            <div
              className="relative z-10 p-2 sm:p-4"
              id={`ai-operations-panel-${activeView.id}`}
              role="tabpanel"
              aria-labelledby={`ai-operations-tab-${activeView.id}`}
            >
              {motionEnabled ? (
                <AnimatePresence initial={false} mode="wait">
                  <PanelBody key={activeView.id} view={activeView} motionEnabled />
                </AnimatePresence>
              ) : <PanelBody view={activeView} motionEnabled={false} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
