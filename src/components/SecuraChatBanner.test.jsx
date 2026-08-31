import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SecuraChatBanner from "./SecuraChatBanner";

describe("SecuraChatBanner", () => {
  it("renders the full active-engine invitation as a native button", () => {
    const onActivate = vi.fn();
    render(<SecuraChatBanner onActivate={onActivate} />);

    const banner = screen.getByRole("button", {
      name: "Ask Secura to review audit-period coverage",
    });

    expect(screen.getByText("SECURA AI · ACTIVE ENGINE")).toBeInTheDocument();
    expect(
      screen.getByText("I'm Secura, Your AI Consultant."),
    ).toBeInTheDocument();
    expect(screen.getByText("7.61")).toBeInTheDocument();
    expect(
      banner.querySelector(".secura-chat-banner__orb-icon"),
    ).toBeInTheDocument();

    fireEvent.click(banner);
    expect(onActivate).toHaveBeenCalledOnce();
  });

  it("renders a condensed replay banner without duplicating the long support copy", () => {
    render(<SecuraChatBanner variant="condensed" onActivate={() => {}} />);

    const banner = screen.getByRole("button", {
      name: "Replay the Secura control review",
    });

    expect(banner).toBeInTheDocument();
    expect(
      banner.querySelector('img[src="/assets/secura-mark.svg"]'),
    ).toBeInTheDocument();
    expect(banner.querySelector(".secura-packet-mark")).not.toBeInTheDocument();
    expect(screen.getByText("SECURA AI · ACTIVE ENGINE")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Click to uncover gaps and strengthen your audit readiness.",
      ),
    ).not.toBeInTheDocument();
  });

  it("marks the simulated click phase for decorative cursor and ripple motion", () => {
    render(<SecuraChatBanner isClicking onActivate={() => {}} />);

    expect(
      screen.getByRole("button", {
        name: "Ask Secura to review audit-period coverage",
      }),
    ).toHaveAttribute("data-clicking", "true");
  });
});
