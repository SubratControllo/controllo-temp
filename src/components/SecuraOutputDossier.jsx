import {
  CheckCircle,
  FilePdf,
  ListChecks,
  UsersThree,
  WarningCircle,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import SecuraMark from './SecuraMark';

const EASE = [0.16, 1, 0.3, 1];

const stageMeta = [
  'Overall control position',
  'Specific missing context',
  'Findings in one view',
  'What to review next',
];

const gapRows = [
  ['Implementation Description', 'Approval workflow not described', 'Incomplete'],
  ['Policies & Procedures', 'Reviewer approval requirement missing', 'Missing'],
  ['Evidence', 'Approval record not visible', 'Missing'],
];

function StageCard({ index, item, active, motionEnabled, onActive }) {
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { amount: 0.15, margin: '-24% 0px -48% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={stageRef} className="flex min-h-[42vh] items-start last:min-h-[52vh]">
      <motion.article
        className={`relative w-full rounded-[20px] border p-5 transition-[border-color,background-color,box-shadow,color] duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] ${
          active
            ? 'border-mint/55 bg-[#0b2946] shadow-[0_18px_50px_rgba(0,0,0,.22),0_0_28px_rgba(38,216,173,.06)]'
            : 'border-white/10 bg-white/[.035]'
        }`}
        initial={false}
        animate={{ transform: active && motionEnabled ? 'scale(1.02)' : 'scale(1)' }}
        transition={{ duration: motionEnabled ? 0.3 : 0, ease: EASE }}
        aria-current={active ? 'step' : undefined}
        data-stage={index + 1}
        data-active={active ? 'true' : 'false'}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={`font-mono text-[.62rem] tracking-[.08em] ${active ? 'text-mint' : 'text-white/45'}`}>0{index + 1}</span>
          <span className={`font-mono text-[.5rem] tracking-[.06em] uppercase ${active ? 'text-mint' : 'text-white/34'}`}>{stageMeta[index]}</span>
        </div>
        <h3 className={`mt-4 mb-0 text-[1.05rem] font-medium ${active ? 'text-white' : 'text-white/72'}`}>{item[0]}</h3>
        <p className={`mt-2 mb-0 text-[.7rem] leading-5 ${active ? 'text-[#c8d6de]' : 'text-[#8297a8]'}`}>{item[1]}</p>
        <motion.span
          className="absolute top-1/2 -right-8 hidden h-px w-8 origin-left bg-mint min-[901px]:block"
          initial={false}
          animate={{ opacity: active ? 1 : 0, transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
          transition={{ duration: motionEnabled ? 0.32 : 0, ease: EASE }}
          aria-hidden="true"
        />
      </motion.article>
    </li>
  );
}

function SummaryState({ content }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[.58rem] tracking-[.1em] text-teal uppercase">Executive Summary</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-error/25 bg-error/8 px-3 py-1.5 font-mono text-[.5rem] tracking-[.05em] text-error uppercase">
          <WarningCircle aria-hidden="true" className="size-3.5" weight="fill" />
          Review required
        </span>
      </div>
      <h3 className="mt-6 mb-0 text-[1.7rem] leading-[1.15] text-navy max-[560px]:text-[1.35rem]">The control needs additional review context.</h3>
      <p className="mt-4 mb-0 text-[.88rem] leading-6 text-muted">{content.example.finding}</p>
      <p className="mt-3 mb-0 text-[.88rem] leading-6 text-muted">{content.example.reason} Human validation is required before action.</p>
      <div className="mt-6 flex items-center gap-2 border-t border-line pt-4 font-mono text-[.56rem] tracking-[.06em] text-teal uppercase">
        <CheckCircle aria-hidden="true" className="size-4" weight="duotone" />
        Concise verdict · additional approval context required
      </div>
    </div>
  );
}

function DocumentState({ content }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-field px-3 py-2 font-mono text-[.56rem] text-navy">
          <FilePdf aria-hidden="true" className="size-4 text-teal" weight="duotone" />
          Evidence · PDF
        </span>
        <span className="font-mono text-[.52rem] tracking-[.08em] text-teal uppercase">Document-level gap</span>
      </div>
      <h3 className="mt-6 mb-0 text-[1.45rem] text-navy">{content.example.document}</h3>
      <div className="mt-6 grid gap-5">
        <div>
          <p className="m-0 font-mono text-[.55rem] tracking-[.1em] text-teal uppercase">Finding</p>
          <p className="mt-2 mb-0 text-[1rem] leading-6 text-navy">Reviewer approval is not visible.</p>
        </div>
        <div className="border-t border-line pt-5">
          <p className="m-0 font-mono text-[.55rem] tracking-[.1em] text-teal uppercase">Why it matters</p>
          <p className="mt-2 mb-0 text-[.86rem] leading-6 text-muted">{content.example.reason}</p>
        </div>
      </div>
    </div>
  );
}

function GapTableState({ motionEnabled }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <ListChecks aria-hidden="true" className="size-5 text-teal" weight="duotone" />
        <h3 className="m-0 text-[1.35rem] text-navy">Gap summary table</h3>
      </div>
      <p className="mt-2 mb-0 text-[.78rem] leading-5 text-muted">Consolidated findings across the control context.</p>
      <div className="mt-6 overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-[1.05fr_1.45fr_auto] gap-3 bg-field px-4 py-3 font-mono text-[.5rem] tracking-[.08em] text-teal uppercase max-[560px]:grid-cols-[1fr_auto] max-[560px]:[&>span:nth-child(2)]:hidden">
          <span>Source</span><span>Gap</span><span>Status</span>
        </div>
        <div className="divide-y divide-line">
          {gapRows.map(([source, gap, status], index) => (
            <motion.div
              className="grid grid-cols-[1.05fr_1.45fr_auto] items-center gap-3 px-4 py-4 text-[.68rem] max-[560px]:grid-cols-[1fr_auto]"
              initial={motionEnabled ? { opacity: 0, transform: 'translateY(6px)' } : false}
              animate={{ opacity: 1, transform: 'translateY(0)' }}
              transition={{ duration: motionEnabled ? 0.28 : 0, delay: motionEnabled ? index * 0.07 : 0, ease: EASE }}
              key={source}
            >
              <span className="font-medium text-navy">{source}</span>
              <span className="text-muted max-[560px]:hidden">{gap}</span>
              <span className={`rounded-full px-2 py-1 font-mono text-[.46rem] uppercase ${status === 'Missing' ? 'bg-error/8 text-error' : 'bg-[#f3c76d]/15 text-[#8a651d]'}`}>{status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecommendationState({ content }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <SecuraMark className="size-8" />
        <span>
          <span className="block font-mono text-[.58rem] tracking-[.1em] text-teal uppercase">Recommended review action</span>
          <span className="mt-1 block text-[.72rem] text-muted">Secura AI guidance</span>
        </span>
      </div>
      <div className="mt-6 rounded-2xl border border-mint/35 bg-mint-soft/35 p-5">
        <p className="m-0 text-[1.1rem] leading-7 text-navy">{content.example.recommendation}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-line bg-field p-4 max-[560px]:items-start">
        <span className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-teal shadow-[inset_0_0_0_1px_rgba(6,27,50,.08)]">
            <UsersThree aria-hidden="true" className="size-5" weight="duotone" />
          </span>
          <span>
            <strong className="block text-[.82rem] font-medium text-navy">Ready for team validation</strong>
            <span className="mt-1 block text-[.64rem] text-muted">Owner and compliance review required</span>
          </span>
        </span>
        <CheckCircle aria-hidden="true" className="size-5 shrink-0 text-teal" weight="duotone" />
      </div>
      <p className="mt-4 mb-0 font-mono text-[.52rem] tracking-[.04em] text-teal uppercase">Next: validate the updated record before action</p>
    </div>
  );
}

function StateContent({ index, content, motionEnabled }) {
  if (index === 0) return <SummaryState content={content} />;
  if (index === 1) return <DocumentState content={content} />;
  if (index === 2) return <GapTableState motionEnabled={motionEnabled} />;
  return <RecommendationState content={content} />;
}

function ReviewPanel({ index, content, motionEnabled, switchContent = false }) {
  const body = (
    <motion.div
      initial={switchContent && motionEnabled ? { opacity: 0, transform: 'translateY(8px)', clipPath: 'inset(0 0 8% 0)' } : false}
      animate={{ opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0% 0)' }}
      exit={switchContent && motionEnabled ? { opacity: 0, transform: 'translateY(-6px)', clipPath: 'inset(0 0 8% 0)' } : undefined}
      transition={{ duration: motionEnabled ? 0.32 : 0, ease: EASE }}
      key={index}
    >
      <StateContent index={index} content={content} motionEnabled={motionEnabled} />
    </motion.div>
  );

  return (
    <article className="min-h-[30rem] rounded-[24px] border border-white/30 bg-white p-6 text-navy shadow-[0_30px_90px_rgba(0,0,0,.28)] max-[560px]:min-h-0 max-[560px]:p-5" aria-label={`${content.example.label}: ${content.items[index][0]}`}>
      <header className="mb-6 flex items-start justify-between gap-4 border-b border-line pb-4">
        <span>
          <span className="block font-mono text-[.58rem] tracking-[.12em] text-teal uppercase">Sample Control Review</span>
          <span className="mt-1.5 block text-[.78rem] font-medium text-navy">{content.example.document}</span>
        </span>
        <span className="font-mono text-[.52rem] text-muted">0{index + 1} / 04</span>
      </header>
      {switchContent ? <AnimatePresence mode="wait">{body}</AnimatePresence> : body}
    </article>
  );
}

export default function SecuraOutputDossier({ content, motionEnabled }) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <figure className="m-0" aria-label="Scroll through Secura analysis output">
      <div className="grid grid-cols-[minmax(15rem,.72fr)_minmax(0,1.35fr)] items-start gap-8 max-[900px]:hidden">
        <ol className="m-0 grid list-none p-0" aria-label="Secura analysis stages">
          {content.items.map((item, index) => (
            <StageCard
              index={index}
              item={item}
              active={activeStage === index}
              motionEnabled={motionEnabled}
              onActive={setActiveStage}
              key={item[0]}
            />
          ))}
        </ol>
        <div className="sticky top-32">
          <ReviewPanel index={activeStage} content={content} motionEnabled={motionEnabled} switchContent />
        </div>
      </div>

      <ol className="m-0 hidden list-none gap-10 p-0 max-[900px]:grid" aria-label="Secura analysis stages and outputs">
        {content.items.map((item, index) => (
          <li className="grid gap-4" key={item[0]}>
            <div className="rounded-[18px] border border-mint/35 bg-[#0b2946] p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[.58rem] text-mint">0{index + 1}</span>
                <span className="font-mono text-[.48rem] tracking-[.05em] text-mint uppercase">{stageMeta[index]}</span>
              </div>
              <h3 className="mt-3 mb-0 text-[1rem] text-white">{item[0]}</h3>
              <p className="mt-2 mb-0 text-[.68rem] leading-5 text-[#aebfca]">{item[1]}</p>
            </div>
            <motion.div
              initial={motionEnabled ? { opacity: 0, transform: 'translateY(8px)' } : false}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: motionEnabled ? 0.34 : 0, ease: EASE }}
            >
              <ReviewPanel index={index} content={content} motionEnabled={motionEnabled} />
            </motion.div>
          </li>
        ))}
      </ol>

      <figcaption className="mt-10 flex items-center gap-3 font-mono text-[.62rem] leading-5 text-mint">
        <span className="h-px w-8 shrink-0 bg-mint/65" aria-hidden="true" />
        {content.highlight}
      </figcaption>
    </figure>
  );
}
