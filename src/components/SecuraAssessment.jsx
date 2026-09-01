import { useEffect, useReducer, useRef } from "react";
import { ArrowRight, CircleAlert, CircleCheck, Clock3, UserRound } from "lucide-react";
import SecuraChatBanner from "./SecuraChatBanner";
import SecuraMark from "./SecuraMark";

export const SECURA_PHASE_DURATIONS = Object.freeze({
  idle: 1600,
  clicking: 650,
  chat: 3200,
  results: 3000,
  resetting: 650,
});

const PHASE_ORDER = ["idle", "clicking", "chat", "results", "resetting"];

const PHASE_ANNOUNCEMENTS = {
  idle: "Secura AI is ready to review the control.",
  clicking: "Opening the Secura control review.",
  chat: "Secura AI is reviewing audit-period coverage.",
  results: "Secura found two gaps in the control review.",
  resetting: "The Secura demonstration is restarting.",
};

const reviewMetrics = [
  { value: "4", label: "Checks completed", tone: "supported", Icon: CircleCheck },
  { value: "2", label: "Gaps detected", tone: "attention", Icon: CircleAlert },
  { value: "3m", label: "Review time", tone: "supported", Icon: Clock3 },
];

const assessmentRows = [
  { label: "Relevance to control", status: "Supported", tone: "supported" },
  { label: "Audit-period coverage", status: "Gap found", tone: "attention" },
  { label: "Required approval", status: "Missing", tone: "attention" },
  { label: "Policy consistency", status: "Supported", tone: "supported" },
];

const recommendationChips = [
  "Audit-period gap",
  "Approval missing",
  "Action ready",
];

function createInitialState(motionEnabled) {
  return motionEnabled
    ? { phase: "idle", inView: false }
    : { phase: "results", inView: false };
}

function phaseReducer(state, action) {
  switch (action.type) {
    case "ENABLE":
      return { phase: "idle", inView: false };
    case "DISABLE":
      return { phase: "results", inView: false };
    case "ENTER":
      return state.inView ? state : { phase: "idle", inView: true };
    case "LEAVE":
      return { phase: "idle", inView: false };
    case "RESTART":
      return state.inView ? { ...state, phase: "clicking" } : state;
    case "ADVANCE": {
      if (!state.inView) return state;
      const currentIndex = PHASE_ORDER.indexOf(state.phase);
      const nextPhase = PHASE_ORDER[(currentIndex + 1) % PHASE_ORDER.length];
      return { ...state, phase: nextPhase };
    }
    default:
      return state;
  }
}

function SecuraIdentity() {
  return (
    <div className="secura-review-identity flex items-center gap-3">
      <SecuraMark className="secura-mark secura-review-identity__mark" />
      <span className="min-w-0">
        <span className="block font-mono text-[.52rem] tracking-[.12em] uppercase">
          <span className="text-mint">SECURA AI</span>
          <span className="mx-2 text-white/28">·</span>
          <span className="text-white/58">CONTROL REVIEW</span>
        </span>
        <span className="secura-review-identity__support mt-1 block text-[.55rem] text-[#9fb8c1]">
          Reviewable guidance from connected evidence
        </span>
      </span>
    </div>
  );
}

function IdleSurface({ isClicking, onActivate }) {
  return (
    <div className="secura-loop-surface secura-loop-idle secura-control-preview justify-start">
      <header>
        <p className="secura-control-preview__breadcrumb m-0 font-mono text-[.43rem] tracking-[.08em] text-white/42">
          <span>Audit Frameworks</span>
          <span aria-hidden="true">/</span>
          <span>ISO 27001:2022</span>
          <span aria-hidden="true">/</span>
          <span className="text-white/78">5.1</span>
        </p>
        <h3 className="mt-1.5 mb-0 text-[1.15rem] tracking-[-.035em] text-white">
          Control Details
        </h3>
      </header>

      <SecuraChatBanner
        isClicking={isClicking}
        onActivate={onActivate}
      />

      <div
        className="secura-control-preview__tabs mt-2 flex items-center gap-4 rounded-[11px] border border-white/7 bg-white/[.025] px-3"
        aria-label="Control detail sections"
        role="list"
      >
        <span className="is-active" role="listitem">
          Details
        </span>
        <span role="listitem">Implementation</span>
        <span role="listitem">Policy &amp; Procedure</span>
        <span role="listitem">Evidence</span>
      </div>

      <section
        className="secura-control-preview__detail mt-2 rounded-[13px] border border-white/7 bg-white/[.025] p-3"
        aria-label="ISO 27001 control detail preview"
      >
        <div className="flex items-center justify-between gap-3">
          <strong className="text-[.67rem] font-medium text-mint">
            ISO 27001:2022
          </strong>
          <span className="secura-control-preview__pending rounded-[6px] px-2 py-1 font-mono text-[.42rem] uppercase">
            Pending
          </span>
        </div>

        <div className="secura-control-preview__facts mt-2 grid grid-cols-3 gap-2 border-b border-white/7 pb-2">
          <span>
            <small>ID</small>
            <strong>5.1</strong>
          </span>
          <span>
            <small>Applicable</small>
            <span className="secura-control-preview__toggle" aria-label="Applicable" />
          </span>
          <span>
            <small>Audit status</small>
            <strong className="text-[#f3c76d]">In review</strong>
          </span>
        </div>

        <div className="mt-2">
          <small className="block text-[.45rem] text-white/42">Control</small>
          <strong className="mt-1 block text-[.59rem] font-medium text-white/88">
            Leadership and commitment
          </strong>
        </div>

        <div className="secura-control-preview__description mt-2 border-t border-white/7 pt-2">
          <small className="block text-[.45rem] text-white/42">
            Description
          </small>
          <p className="mt-1 mb-0 text-[.5rem] leading-[1.45] text-white/62">
            Top management demonstrates leadership by aligning security
            objectives, assigning accountability, and supporting the management
            system.
          </p>
        </div>
      </section>

      <div className="secura-control-preview__context mt-2 rounded-[12px] border border-white/7 bg-white/[.025] p-2.5">
        <div className="flex items-center justify-between gap-3">
          <strong className="font-mono text-[.46rem] font-medium tracking-[.08em] uppercase text-white/58">
            Connected context
          </strong>
          <small className="text-[.42rem] text-mint">3 sources linked</small>
        </div>
        <div className="secura-control-preview__context-body mt-1.5 grid gap-1.5">
          <div className="secura-control-preview__context-statuses grid grid-cols-3 gap-2" role="list">
            <span role="listitem">
              <i aria-hidden="true" />
              Policy current
            </span>
            <span className="is-attention" role="listitem">
              <i aria-hidden="true" />
              Evidence pending
            </span>
            <span role="listitem">
              <i aria-hidden="true" />
              Owner assigned
            </span>
          </div>
          <div className="secura-control-preview__scope">
            <div className="flex items-center justify-between gap-2">
              <strong className="font-mono text-[.4rem] font-medium tracking-[.08em] uppercase text-white/50">
                Review scope
              </strong>
              <small className="text-[.38rem] text-[#9fb8c1]">
                Secura checks next
              </small>
            </div>
            <div className="secura-control-preview__scope-grid mt-1 grid grid-cols-3 gap-1.5" role="list">
              <span role="listitem">
                <small>Implementation</small>
                <strong>Ready</strong>
              </span>
              <span role="listitem">
                <small>Policy</small>
                <strong>Linked</strong>
              </span>
              <span className="is-attention" role="listitem">
                <small>Evidence</small>
                <strong>Review</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatSurface() {
  return (
    <div className="secura-loop-surface secura-loop-chat">
      <SecuraIdentity />

      <div className="secura-loop-chat__divider" aria-hidden="true" />

      <div className="secura-loop-chat__body mt-4 flex flex-1 flex-col justify-start gap-3.5 max-[760px]:mt-3">
        <div
          className="secura-chat-turn secura-chat-turn--user ml-auto flex min-w-0 max-w-[88%] items-start justify-end gap-2.5"
          aria-label="User message"
        >
          <div className="secura-chat-message secura-chat-message--user min-w-0">
            <p className="secura-chat-prompt relative m-0 overflow-hidden text-[.64rem] leading-[1.5] text-[#e3edef]">
              Review this control’s audit-period coverage.
              <span className="secura-chat-prompt__mask" aria-hidden="true" />
            </p>
          </div>
          <span className="secura-chat-user-mark" aria-hidden="true">
            <UserRound size={14} strokeWidth={1.9} />
          </span>
        </div>

        <article
          className="secura-chat-response-card mr-auto min-w-0 max-w-[94%]"
          aria-label="Secura AI response"
        >
          <div className="secura-chat-response-card__headline flex items-center gap-2.5">
            <SecuraMark className="secura-mark secura-chat-response-card__mark" />
            <h3 className="m-0 text-[1rem] leading-none tracking-[-.035em] text-white">
              <span className="text-[#f3c76d]">2 gaps</span> found
            </h3>
          </div>

          <p>
            We identified gaps in this control’s audit-period coverage. The
            evidence appears outside the required audit period, and an approved
            quarterly access review is not currently attached.
          </p>

          <strong>What this means:</strong>
          <p>
            The control may not be fully supported for the current audit window
            because the available documentation does not demonstrate coverage for
            the full required period.
          </p>

          <strong>Recommended next steps:</strong>
          <ul>
            <li>
              Upload the approved quarterly access review that covers the audit
              period.
            </li>
            <li>
              Confirm the review date and approval date align with the current
              audit window.
            </li>
            <li>
              Assign an evidence owner so future reviews are attached on time.
            </li>
          </ul>

          <p className="secura-chat-mobile-hidden">
            Once updated, Secura can re-review the control and confirm whether
            the coverage gap has been resolved.
          </p>
        </article>
      </div>
    </div>
  );
}

function ResultsSurface({ onRestart }) {
  return (
    <div className="secura-loop-surface secura-loop-results flex flex-col justify-start">
      <header className="secura-review-header">
        <SecuraIdentity />
        <div className="secura-results-summary">
          <h3 className="mt-3 mb-0 text-[1.85rem] leading-none tracking-[-.045em] text-white max-[760px]:text-[1.55rem]">
            <span className="text-[#f3c76d]">2 gaps</span> found
          </h3>
          <p className="mt-1.5 mb-0 text-[.7rem] text-[#b9cbd4]">
            Quarterly access review
          </p>
        </div>
      </header>

      <div
        className="secura-metric-rail mt-3 grid grid-cols-3 rounded-[16px] border border-white/8 bg-white/[.035]"
        aria-label="Secura review summary"
        role="list"
      >
        {reviewMetrics.map(({ value, label, tone, Icon }) => (
          <div
            className={`secura-metric secura-metric--${tone} relative flex min-w-0 items-center gap-2.5 px-3 py-2.5 max-[420px]:gap-1.5 max-[420px]:px-2`}
            key={label}
            role="listitem"
          >
            <span className="secura-metric__icon" aria-hidden="true">
              <Icon className="secura-metric__glyph" strokeWidth={2.35} />
            </span>
            <span className="min-w-0">
              <strong className="block text-[1rem] leading-none text-white">
                {value}
              </strong>
              <small className="mt-1 block text-[.5rem] leading-[1.35] text-[#9fb3bf]">
                {label}
              </small>
            </span>
          </div>
        ))}
      </div>

      <div
        className="secura-results-list mt-2.5 grid gap-1.5"
        role="list"
        aria-label="Secura assessment results"
      >
        {assessmentRows.map((item, index) => (
          <div
            className="secura-result-row flex min-h-10 items-center justify-between gap-3 rounded-[13px] border border-white/7 bg-white/[.035] px-3 py-1.5"
            key={item.label}
            role="listitem"
            style={{ "--secura-row-index": index }}
          >
            <span className="min-w-0 text-[.64rem] leading-[1.35] text-[#c8d6de]">
              {item.label}
            </span>
            <span
              className={`secura-status secura-status--${item.tone} inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[.48rem] font-medium tracking-[.06em] uppercase`}
            >
              <span className="secura-status__icon" aria-hidden="true">
                {item.tone === "supported" ? "✓" : "!"}
              </span>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <button
        className="secura-results-recommendation mt-2.5"
        type="button"
        onClick={onRestart}
        aria-label="Replay Secura control review from the recommendation"
      >
        <SecuraMark className="secura-mark secura-results-recommendation__mark" />
        <span className="min-w-0">
          <span className="secura-results-recommendation__label">
            Secura recommendation
          </span>
          <strong>
            Upload the approved quarterly access review and assign an evidence
            owner.
          </strong>
          <span
            className="secura-results-recommendation__chips"
            role="list"
            aria-label="Recommendation context"
          >
            {recommendationChips.map((chip) => (
              <span key={chip} role="listitem">
                {chip}
              </span>
            ))}
          </span>
        </span>
        <span className="secura-results-recommendation__action" aria-hidden="true">
          <ArrowRight size={14} strokeWidth={2.2} />
        </span>
      </button>
    </div>
  );
}

export default function SecuraAssessment({ motionEnabled = true }) {
  const panelRef = useRef(null);
  const [{ phase, inView }, dispatch] = useReducer(
    phaseReducer,
    motionEnabled,
    createInitialState,
  );

  useEffect(() => {
    dispatch({ type: motionEnabled ? "ENABLE" : "DISABLE" });
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled) return undefined;

    const panel = panelRef.current;
    if (!panel) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      dispatch({ type: "ENTER" });
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        dispatch({ type: visible ? "ENTER" : "LEAVE" });
      },
      { threshold: [0, 0.35] },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled || !inView) return undefined;

    const timer = window.setTimeout(
      () => dispatch({ type: "ADVANCE" }),
      SECURA_PHASE_DURATIONS[phase],
    );

    return () => window.clearTimeout(timer);
  }, [inView, motionEnabled, phase]);

  const restart = () => dispatch({ type: "RESTART" });
  const visiblePhase = motionEnabled ? phase : "results";
  const showIdle = visiblePhase === "idle" || visiblePhase === "clicking";
  const showResults =
    visiblePhase === "results" || visiblePhase === "resetting";

  return (
    <div
      className={`ai-canvas relative min-h-137.5 overflow-hidden rounded-[36px] max-[760px]:aspect-4/5 max-[760px]:min-h-0 max-[760px]:rounded-3xl ${
        motionEnabled ? "ai-canvas--animated" : ""
      }`}
      data-testid="secura-assessment-canvas"
    >
      <article
        ref={panelRef}
        className="secura-assessment-panel absolute z-20 overflow-hidden rounded-[28px] border border-mint/20 bg-[#07131f]/95 p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,.34)] backdrop-blur-[14px] max-[760px]:rounded-[18px] max-[760px]:p-2.5"
        aria-label="Secura access-review assessment example"
        data-in-view={inView ? "true" : "false"}
        data-motion={motionEnabled ? "sequence" : "static"}
        data-phase={visiblePhase}
        data-testid="secura-assessment-panel"
      >
        <p className="sr-only" aria-live="polite">
          {PHASE_ANNOUNCEMENTS[visiblePhase]}
        </p>

        {showIdle ? (
          <IdleSurface
            isClicking={visiblePhase === "clicking"}
            onActivate={restart}
          />
        ) : null}
        {visiblePhase === "chat" ? <ChatSurface /> : null}
        {showResults ? <ResultsSurface onRestart={restart} /> : null}
      </article>
    </div>
  );
}
