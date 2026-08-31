import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SECURA_PHASE_DURATIONS } from "../components/SecuraAssessment";
import SecuraSection from "./SecuraSection";

let observerCallback;

class IntersectionObserverStub {
  constructor(callback) {
    observerCallback = callback;
  }

  observe() {}

  unobserve() {}

  disconnect() {}
}

function setPanelVisibility(isIntersecting, intersectionRatio = 1) {
  act(() => {
    observerCallback?.([{ isIntersecting, intersectionRatio }]);
  });
}

function SecuraTestHarness({ motionEnabled }) {
  return (
    <MemoryRouter>
      <SecuraSection motionEnabled={motionEnabled} />
    </MemoryRouter>
  );
}

function renderSecura(motionEnabled = false) {
  return render(<SecuraTestHarness motionEnabled={motionEnabled} />);
}

describe("SecuraSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    observerCallback = undefined;
    vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("presents one focused Secura access-review assessment", () => {
    renderSecura(false);

    expect(screen.getByText("Introducing Secura AI")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Find the gap before it becomes an Audit finding.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Secura reviews the control requirement alongside/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
    expect(screen.getByText("control context")).toBeInTheDocument();
    expect(screen.getByText("Identify")).toBeInTheDocument();
    expect(screen.getByText("evidence gaps")).toBeInTheDocument();
    expect(screen.getByText("Recommend")).toBeInTheDocument();
    expect(screen.getByText("next actions")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore Secura AI" }),
    ).toHaveAttribute("href", "/platform/secura-ai");

    const assessment = screen.getByRole("article", {
      name: "Secura access-review assessment example",
    });
    expect(assessment).toHaveAttribute("data-phase", "results");
    expect(within(assessment).getByText("SECURA AI")).toBeInTheDocument();
    expect(within(assessment).getByText("CONTROL REVIEW")).toBeInTheDocument();
    expect(
      within(assessment).getByRole("heading", { name: "2 gaps found" }),
    ).toBeInTheDocument();

    const metrics = within(assessment).getByRole("list", {
      name: "Secura review summary",
    });
    expect(within(metrics).getAllByRole("listitem")).toHaveLength(3);
    expect(within(assessment).getByText("Relevance to control")).toBeInTheDocument();
    expect(within(assessment).getByText("Audit-period coverage")).toBeInTheDocument();
    expect(within(assessment).getByText("Required approval")).toBeInTheDocument();
    expect(within(assessment).getByText("Policy consistency")).toBeInTheDocument();
    expect(within(assessment).getAllByText("Supported")).toHaveLength(2);
    expect(within(assessment).getByText("Gap found")).toBeInTheDocument();
    expect(within(assessment).getByText("Missing")).toBeInTheDocument();
    expect(within(assessment).getByText("Secura recommendation")).toBeInTheDocument();
    expect(assessment.querySelector(".secura-loop-results")).toHaveClass(
      "justify-start",
    );
    expect(
      within(assessment).getByText(/Upload the approved quarterly access review/i),
    ).toBeInTheDocument();
    expect(within(assessment).getByText("Action ready")).toBeInTheDocument();
    expect(
      within(assessment).queryByText("I’m Secura, Your AI Consultant."),
    ).not.toBeInTheDocument();
  });

  it("centers the left narrative and right graphic in equal desktop columns", () => {
    const { container } = renderSecura(false);
    const shell = container.querySelector("#secura .shell");
    const columns = shell.children;

    expect(shell).toHaveClass(
      "grid-cols-2",
      "items-center",
      "justify-items-center",
    );
    expect(columns).toHaveLength(2);
    expect(columns[0]).toHaveClass(
      "mx-auto",
      "w-full",
      "max-w-125",
      "justify-self-center",
    );
    expect(columns[1]).toHaveClass(
      "mx-auto",
      "w-full",
      "max-w-125",
      "justify-self-center",
    );
  });

  it("presents one simple process strip with only Review highlighted", () => {
    renderSecura(false);

    const flow = screen.getByRole("list", { name: "Secura review flow" });
    const rail = flow.parentElement;
    const steps = within(flow).getAllByRole("listitem");

    expect(flow.tagName).toBe("OL");
    expect(rail).toHaveAttribute("data-secura-rail");
    expect(rail).toHaveClass(
      "border-t",
      "border-white/14",
      "pt-5",
    );
    expect(rail.querySelector("[data-active-rule]")).toBeInTheDocument();
    expect(rail.querySelector("[data-flow-line]")).not.toBeInTheDocument();
    expect(rail.querySelector("[data-active-wash]")).not.toBeInTheDocument();
    expect(steps).toHaveLength(3);
    expect(within(flow).queryByText("01")).not.toBeInTheDocument();
    expect(within(flow).queryByText("02")).not.toBeInTheDocument();
    expect(within(flow).queryByText("03")).not.toBeInTheDocument();
    expect(steps[0]).toHaveAttribute("data-active", "true");
    expect(steps[0]).toHaveAttribute("aria-current", "step");
    expect(steps[0]).not.toHaveClass("rounded-[14px]", "border");
    expect(steps[1]).not.toHaveClass("border", "border-l");
    expect(steps[2]).not.toHaveClass("border", "border-l");
    expect(within(flow).getByText("Review")).toHaveClass(
      "text-mint",
      "text-[1.1rem]",
    );
    expect(within(flow).getByText("control context")).toHaveClass(
      "text-[.7rem]",
    );
    expect(within(flow).getByText("Identify")).not.toHaveClass("text-mint");
    expect(within(flow).getByText("Recommend")).not.toHaveClass("text-mint");
  });

  it("loops through every phase while the panel remains visible", () => {
    renderSecura(true);
    const assessment = screen.getByTestId("secura-assessment-panel");

    expect(assessment).toHaveAttribute("data-phase", "idle");
    expect(assessment.querySelector(".secura-loop-idle")).toHaveClass(
      "justify-start",
    );
    setPanelVisibility(true);

    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.idle));
    expect(assessment).toHaveAttribute("data-phase", "clicking");

    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.clicking));
    expect(assessment).toHaveAttribute("data-phase", "chat");
    expect(
      within(assessment).getByText("Review this control’s audit-period coverage."),
    ).toBeInTheDocument();
    expect(
      within(assessment).getByLabelText("User message"),
    ).toBeInTheDocument();
    expect(
      within(assessment).getByLabelText("Secura AI response"),
    ).toBeInTheDocument();
    expect(
      assessment.querySelector(".secura-loop-chat__body"),
    ).toHaveClass("justify-start");
    expect(
      within(assessment).getByRole("heading", { name: "2 gaps found" }),
    ).toBeInTheDocument();
    expect(
      within(assessment).getByText("What this means:"),
    ).toBeInTheDocument();
    expect(
      within(assessment).getByText("Recommended next steps:"),
    ).toBeInTheDocument();
    expect(
      within(assessment).getByText(/Upload the approved quarterly access review/i),
    ).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.chat));
    expect(assessment).toHaveAttribute("data-phase", "results");
    expect(within(assessment).getByText("Secura recommendation")).toBeInTheDocument();
    expect(within(assessment).getByText("Audit-period gap")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.results));
    expect(assessment).toHaveAttribute("data-phase", "resetting");

    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.resetting));
    expect(assessment).toHaveAttribute("data-phase", "idle");

    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.idle));
    expect(assessment).toHaveAttribute("data-phase", "clicking");
  });

  it("opens the loop on a compact control-detail preview with the Secura banner", () => {
    renderSecura(true);
    const assessment = screen.getByTestId("secura-assessment-panel");

    expect(assessment).toHaveAttribute("data-phase", "idle");
    expect(
      within(assessment).getByRole("heading", { name: "Control Details" }),
    ).toBeInTheDocument();
    expect(within(assessment).getByText("Audit Frameworks")).toBeInTheDocument();
    expect(within(assessment).getAllByText("ISO 27001:2022")).toHaveLength(2);
    expect(within(assessment).getByText("Leadership and commitment")).toBeInTheDocument();
    expect(within(assessment).getByText("Pending")).toBeInTheDocument();
    expect(within(assessment).getByText("Description")).toBeInTheDocument();
    expect(
      within(assessment).getByText(/Top management demonstrates leadership/i),
    ).toBeInTheDocument();
    expect(within(assessment).getByText("Connected context")).toBeInTheDocument();
    expect(within(assessment).getByText("Policy current")).toBeInTheDocument();
    expect(within(assessment).getByText("Evidence pending")).toBeInTheDocument();
    expect(within(assessment).getByText("Owner assigned")).toBeInTheDocument();
    expect(within(assessment).getByText("Review scope")).toBeInTheDocument();
    expect(within(assessment).getByText("Secura checks next")).toBeInTheDocument();
    expect(within(assessment).getByText("Ready")).toBeInTheDocument();
    expect(within(assessment).getByText("Linked")).toBeInTheDocument();
    expect(within(assessment).getByText("Review")).toBeInTheDocument();
    expect(
      within(assessment).getByRole("button", {
        name: "Ask Secura to review audit-period coverage",
      }),
    ).toBeInTheDocument();
  });

  it("stops and resets outside the viewport, then begins a clean loop on re-entry", () => {
    renderSecura(true);
    const assessment = screen.getByTestId("secura-assessment-panel");

    setPanelVisibility(true);
    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.idle));
    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.clicking));
    expect(assessment).toHaveAttribute("data-phase", "chat");

    setPanelVisibility(false, 0);
    expect(assessment).toHaveAttribute("data-phase", "idle");

    act(() => vi.advanceTimersByTime(20_000));
    expect(assessment).toHaveAttribute("data-phase", "idle");

    setPanelVisibility(true);
    act(() => vi.advanceTimersByTime(SECURA_PHASE_DURATIONS.idle));
    expect(assessment).toHaveAttribute("data-phase", "clicking");
  });

  it("lets a real banner activation restart the automatic review", () => {
    renderSecura(true);
    const assessment = screen.getByTestId("secura-assessment-panel");

    setPanelVisibility(true);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Ask Secura to review audit-period coverage",
      }),
    );

    expect(assessment).toHaveAttribute("data-phase", "clicking");
  });

  it("uses the viewport CursorGrid only for the animated branch", () => {
    const { rerender } = renderSecura(true);
    const section = document.querySelector("#secura");
    const grid = screen.getByTestId("cursor-grid");
    const securaSectionSource = readFileSync(resolve("src/sections/SecuraSection.jsx"), "utf8");
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(section).toHaveClass("secura-section");
    expect(grid).toHaveClass("secura-section-grid");
    expect(section.firstElementChild).toBe(grid);
    expect(grid).toHaveAttribute(
      "data-activation",
      "viewport",
    );
    expect(styles).toMatch(
      /\.secura-section::before\s*{[\s\S]*linear-gradient\(\s*90deg,[\s\S]*var\(--color-navy\)/s,
    );
    expect(securaSectionSource).toContain("maxOpacity={0.82}");
    expect(securaSectionSource).toContain("fillOpacity={0.035}");
    expect(securaSectionSource).toContain("gridOpacity={0.024}");
    expect(screen.getByTestId("secura-assessment-panel")).toHaveAttribute(
      "data-motion",
      "sequence",
    );

    rerender(<SecuraTestHarness motionEnabled={false} />);

    expect(screen.queryByTestId("cursor-grid")).not.toBeInTheDocument();
    expect(screen.getByTestId("secura-assessment-panel")).toHaveAttribute(
      "data-motion",
      "static",
    );
    expect(screen.getByTestId("secura-assessment-panel")).toHaveAttribute(
      "data-phase",
      "results",
    );
  });

  it("uses the shared Secura mark and compact responsive panel geometry", () => {
    renderSecura(false);
    const styles = readFileSync(resolve("src/styles.css"), "utf8");
    const component = readFileSync(resolve("src/components/SecuraAssessment.jsx"), "utf8");
    const markAsset = readFileSync(resolve("public/assets/secura-mark.svg"), "utf8");
    const assessment = screen.getByRole("article", {
      name: "Secura access-review assessment example",
    });

    const marks = assessment.querySelectorAll(
      'img[src="/assets/secura-mark.svg"]',
    );

    expect(marks).toHaveLength(2);
    marks.forEach((mark) => {
      expect(mark).toHaveAttribute("alt", "");
      expect(mark).toHaveAttribute("aria-hidden", "true");
      expect(mark).toHaveAttribute("draggable", "false");
    });
    expect(assessment.querySelector(".secura-packet-mark")).not.toBeInTheDocument();
    expect(markAsset).toContain('viewBox="0 0 40 40"');
    expect(markAsset).toContain('transform="translate(6 6) rotate(45 14 14)"');
    expect(markAsset).toContain('M5 8h6.96L17 14l-5.04 6H5l5.04-6L5 8Z');
    expect(markAsset).toContain('M10 8h6.96L22 14l-5.04 6H10l5.04-6L10 8Z');
    expect(styles).toContain("width: min(calc(100% - 72px), 450px);");
    expect(styles).toContain("height: 520px;");
    expect(styles).toContain("top: 50%;");
    expect(styles).toContain("translate: -50% -50%;");
    expect(styles).toMatch(
      /@media \(max-width: 760px\) {[\s\S]*\.secura-assessment-panel\s*{[^}]*width:\s*calc\(100% - 20px\);[^}]*height:\s*auto;[^}]*aspect-ratio:\s*4 \/ 5;/s,
    );
    expect(styles).toMatch(
      /\.secura-loop-surface\s*{[^}]*height: 100%;/s,
    );
    expect(styles).toMatch(
      /\.secura-loop-chat__body\s*{[^}]*min-height: 0;/s,
    );
    expect(styles).not.toContain("secura-loop-chat min-h-[490px]");
    expect(component).not.toContain("min-h-[360px]");
    expect(styles).toMatch(
      /\.secura-metric__icon\s*{[^}]*width: 30px;[^}]*height: 30px;/s,
    );
    expect(styles).toMatch(
      /\.secura-metric__glyph\s*{[^}]*width: 16px;[^}]*height: 16px;/s,
    );
    expect(screen.getByTestId("secura-assessment-canvas")).toHaveClass(
      "min-h-[550px]",
      "max-[760px]:min-h-0",
      "max-[760px]:aspect-[4/5]",
    );
  });
});
