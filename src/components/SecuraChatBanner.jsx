import { ArrowRight } from "lucide-react";
import SecuraMark from "./SecuraMark";

const FULL_LABEL = "Ask Secura to review audit-period coverage";
const CONDENSED_LABEL = "Replay the Secura control review";

export default function SecuraChatBanner({
  variant = "full",
  isClicking = false,
  onActivate,
}) {
  const condensed = variant === "condensed";

  return (
    <button
      type="button"
      className={`secura-chat-banner secura-chat-banner--${variant} relative isolate block min-h-11 w-full overflow-hidden rounded-[15px] border border-mint/20 text-left text-white`}
      aria-label={condensed ? CONDENSED_LABEL : FULL_LABEL}
      data-clicking={isClicking ? "true" : "false"}
      onClick={onActivate}
    >
      <span className="secura-chat-banner__aura" aria-hidden="true" />
      <span className="secura-chat-banner__grid" aria-hidden="true" />

      <span className="secura-chat-banner__content relative z-10 flex min-w-0 items-center gap-3">
        {condensed ? (
          <SecuraMark className="secura-mark secura-chat-banner__mark" />
        ) : null}

        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[.49rem] tracking-[.12em] uppercase text-mint">
            SECURA AI · ACTIVE ENGINE
          </span>
          <strong className="secura-chat-banner__title mt-1.5 block font-medium text-white">
            I'm Secura, Your AI Consultant.
          </strong>
          {!condensed ? (
            <span className="secura-chat-banner__support mt-1.5 block leading-[1.45] text-[#afd1cf]">
              Click to uncover gaps and strengthen your audit readiness.
            </span>
          ) : null}
        </span>

        <span className="secura-chat-banner__credits shrink-0 text-right">
          <strong className="block font-mono text-[.68rem] font-medium text-mint">
            7.61
          </strong>
          <small className="block font-mono text-[.4rem] tracking-[.08em] text-white/58">
            CREDITS
          </small>
        </span>

        <span className="secura-chat-banner__orb" aria-hidden="true">
          <ArrowRight
            className="secura-chat-banner__orb-icon"
            strokeWidth={2.2}
          />
          <span className="secura-chat-banner__ripple" />
        </span>
      </span>

      {!condensed ? (
        <span className="secura-chat-banner__cursor" aria-hidden="true" />
      ) : null}
    </button>
  );
}
