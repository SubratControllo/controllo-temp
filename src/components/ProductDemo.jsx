import { AnimatePresence, motion } from "motion/react";
import { Check, CircleAlert, FileCheck2 } from "lucide-react";

const states = [
  ["Evidence connected", "Identity and cloud sources are in scope", Check],
  ["Control validated", "Owner and freshness confirmed", FileCheck2],
  ["Risk surfaced", "One dependency needs review", CircleAlert],
];

const signals = [
  "Sources connected",
  "Evidence validated",
  "Controls mapped",
  "Actions assigned",
  "Audit path clear",
];

export default function ProductDemo({
  active = 0,
  compact = false,
  motionEnabled = true,
  stageCount,
  stageIndex = active,
  stageLabel,
}) {
  const readiness = 76 + active * 3;
  const showsStageProgress = Boolean(stageLabel && stageCount);
  const signal = showsStageProgress
    ? signals[Math.min(active, signals.length - 1)]
    : active > 2
      ? "Audit path clear"
      : "Moving in the right direction";

  return (
    <div
      className={`enterprise-demo relative overflow-hidden rounded-[28px] border border-navy/10 bg-white/94 p-6 text-navy shadow-[0_32px_90px_rgba(6,27,50,.17)]${
        compact ? " enterprise-demo--compact" : ""
      }`}
      aria-label="Controllo product experience preview"
      data-frame="stable"
      data-stage={stageIndex}
    >
      {showsStageProgress && motionEnabled && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-0 w-[38%] bg-[linear-gradient(90deg,transparent,rgba(38,216,173,.13),transparent)]"
          key={`sweep-${stageIndex}`}
          initial={{ left: "-45%", opacity: 0 }}
          animate={{ left: "112%", opacity: [0, 1, 0] }}
          transition={{ duration: 0.68, ease: "easeOut" }}
        />
      )}
      <div className="relative flex items-center justify-between gap-3">
        <div className="relative flex items-center justify-between gap-3">
          <img
            alt=""
            aria-hidden="true"
            className="h-7 w-auto shrink-0"
            decoding="async"
            draggable="false"
            src="/assets/emblemLogo.svg"
          />
          <span>
            <strong className="block text-[.78rem]">Compliance current</strong>
            <small className="mt-0.75 block text-[.6rem] text-muted">
              Live assurance workspace
            </small>
          </span>
        </div>
        <span className="live-state rounded-[99px] bg-[#e7f8f3] px-2.5 py-1.75 font-mono text-[.57rem] font-medium leading-none uppercase text-[#075d57]">
          <i />
          Live
        </span>
      </div>
      {showsStageProgress && (
        <div className="relative mt-5 flex min-h-9 items-center justify-between gap-4 border-y border-navy/8 py-2.25">
          <span className="font-mono text-[.52rem] font-medium uppercase tracking-[.08em] text-muted">
            Current stage
          </span>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              className="flex items-center gap-2.5"
              key={stageLabel}
              initial={motionEnabled ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionEnabled ? { opacity: 0, y: -5 } : undefined}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <strong className="text-[.67rem] font-medium">{stageLabel}</strong>
              <small className="font-mono text-[.5rem] text-teal">
                {String(stageIndex + 1).padStart(2, "0")} / {String(stageCount).padStart(2, "0")}
              </small>
            </motion.span>
          </AnimatePresence>
        </div>
      )}
      <div className="mt-6 mb-4 grid grid-cols-[100px_1fr] items-center gap-4.5 rounded-[18px] bg-navy p-4.5 text-white">
        {showsStageProgress ? (
          <div className="relative grid size-22 place-content-center text-center">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              data-testid="readiness-progress-ring"
              animate={motionEnabled ? { rotate: stageIndex * 4 } : undefined}
              style={{
                background: `conic-gradient(var(--mint) ${readiness * 3.6}deg, rgba(255,255,255,.14) 0)`,
              }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            />
            <div className="relative z-1 grid size-18 place-content-center rounded-full bg-navy">
              <AnimatePresence initial={false} mode="wait">
                <motion.strong
                  className="text-[1.3rem]"
                  key={readiness}
                  initial={motionEnabled ? { opacity: 0, scale: 0.88 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={motionEnabled ? { opacity: 0, scale: 1.08 } : undefined}
                  transition={{ duration: 0.22 }}
                >
                  {readiness}%
                </motion.strong>
              </AnimatePresence>
              <span className="text-[.52rem] text-[#b7c9d4]">readiness</span>
            </div>
          </div>
        ) : (
          <div className="grid size-22 place-content-center rounded-full border-8 border-mint text-center">
            <strong className="text-[1.3rem]">{readiness}%</strong>
            <span className="text-[.52rem] text-[#b7c9d4]">readiness</span>
          </div>
        )}
        <div className="min-w-0">
          <span className="block font-mono text-[.54rem] font-medium leading-none uppercase text-mint">
            Program signal
          </span>
          {showsStageProgress ? (
            <AnimatePresence initial={false} mode="wait">
              <motion.strong
                className="mt-2.25 block text-[.8rem]"
                key={signal}
                initial={motionEnabled ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={motionEnabled ? { opacity: 0, y: -5 } : undefined}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                {signal}
              </motion.strong>
            </AnimatePresence>
          ) : (
            <strong className="mt-2.25 block text-[.8rem]">{signal}</strong>
          )}
          <small className="mt-1 block text-[.6rem] text-[#a9bac7]">
            Updated from connected work
          </small>
        </div>
      </div>
      <div className="grid gap-2">
        {states.map(([title, detail, Icon], index) => (
          <motion.div
            className={`grid grid-cols-[30px_1fr_auto] items-center gap-2.5 rounded-[13px] p-3 ${
              index <= active
                ? "bg-[#ecf9f5] opacity-100"
                : "bg-[#f1f5f4] opacity-[.52]"
            }`}
            animate={
              showsStageProgress && motionEnabled
                ? { opacity: index <= active ? 1 : 0.52, x: 0 }
                : undefined
            }
            initial={
              showsStageProgress && motionEnabled
                ? { opacity: 0.52, x: -8 }
                : false
            }
            key={title}
            transition={{ duration: 0.3, delay: index * 0.035 }}
          >
            <Icon className="w-4.25 text-teal" aria-hidden="true" />
            <span>
              <strong className="block text-[.68rem]">{title}</strong>
              <small className="mt-0.75 block text-[.56rem] text-muted">
                {detail}
              </small>
            </span>
            <em className="font-mono text-[.49rem] font-medium leading-none not-italic text-teal">
              {index <= active ? "CURRENT" : "WAITING"}
            </em>
          </motion.div>
        ))}
      </div>
      {showsStageProgress && (
        <div className="relative mt-5 grid grid-cols-5 gap-1.5" aria-hidden="true">
          {Array.from({ length: stageCount }, (_, index) => (
            <motion.span
              className="h-1 rounded-full"
              animate={{
                backgroundColor:
                  index <= stageIndex ? "#26D8AD" : "rgba(6,27,50,.10)",
                scaleX: index <= stageIndex ? 1 : 0.72,
              }}
              key={index}
              transition={{ duration: motionEnabled ? 0.28 : 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
