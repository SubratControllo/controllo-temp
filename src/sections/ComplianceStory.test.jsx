import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ComplianceStory, { getComplianceStage } from "./ComplianceStory";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ComplianceStory", () => {
  it("presents the approved seven-day compliance path", () => {
    render(<ComplianceStory motionEnabled={false} />);

    expect(screen.getByText("Get started in 7 Days")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "A Faster Path to Compliance" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByText("Assess")).toBeInTheDocument();
    expect(screen.getByText("Implement")).toBeInTheDocument();
    expect(screen.getAllByText("Review").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Collaborate").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Choose the compliance framework\(s\) relevant/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Identify & manage risks. Integrate cloud assets/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Use Secura AI for fast gap assessments/i),
    ).toBeInTheDocument();
  });

  it("maps the section scroll range across all five operating stages", () => {
    expect(getComplianceStage(0)).toBe(0);
    expect(getComplianceStage(0.19)).toBe(0);
    expect(getComplianceStage(0.2)).toBe(1);
    expect(getComplianceStage(0.4)).toBe(2);
    expect(getComplianceStage(0.6)).toBe(3);
    expect(getComplianceStage(0.8)).toBe(4);
    expect(getComplianceStage(1)).toBe(4);
  });

  it("renders a quiet static orbit and completed card when motion is reduced", () => {
    const { container } = render(<ComplianceStory motionEnabled={false} />);

    const orbit = screen.getByTestId("compliance-current-orbit");
    expect(orbit).toHaveAttribute("data-motion", "static");
    expect(
      within(orbit).getAllByTestId("compliance-current-orbit-mark"),
    ).toHaveLength(3);
    expect(container.querySelector(".signal-paths")).not.toBeInTheDocument();

    const demo = screen.getByLabelText("Controllo product experience preview");
    expect(demo).toHaveAttribute("data-stage", "4");
    expect(within(demo).getByText("Collaborate")).toBeInTheDocument();
    expect(within(demo).getByText("Teams aligned and audit-ready")).toBeInTheDocument();
    expect(within(demo).getByText("Auditor access ready")).toBeInTheDocument();
    expect(within(demo).getByText("05 / 05")).toBeInTheDocument();
    expect(within(demo).getByText("88%")).toBeInTheDocument();
  });

  it("starts the motion sequence at Select without shifting the card frame", () => {
    render(<ComplianceStory motionEnabled />);

    const demo = screen.getByLabelText("Controllo product experience preview");
    expect(demo).toHaveAttribute("data-stage", "0");
    expect(demo).toHaveAttribute("data-frame", "stable");
    expect(within(demo).getByText("Select")).toBeInTheDocument();
    expect(within(demo).getByText("Framework path selected")).toBeInTheDocument();
    expect(within(demo).getByText("Framework selected")).toBeInTheDocument();
    expect(within(demo).getByText("01 / 05")).toBeInTheDocument();
    expect(within(demo).getByText("76%")).toBeInTheDocument();
  });

  it("uses a focusable snap rail to update the product stage on mobile", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );

    render(<ComplianceStory motionEnabled />);

    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 1080px)");

    const rail = screen.getByRole("list", {
      name: "Seven-day compliance steps",
    });
    Object.defineProperties(rail, {
      clientWidth: { configurable: true, value: 200 },
      scrollLeft: { configurable: true, value: 600 },
      scrollWidth: { configurable: true, value: 1000 },
    });

    expect(rail).toHaveAttribute("tabindex", "0");
    expect(within(rail).getAllByRole("listitem")).toHaveLength(5);

    fireEvent.scroll(rail);

    const demo = screen.getByLabelText("Controllo product experience preview");
    expect(demo).toHaveAttribute("data-stage", "3");
    expect(demo).toHaveClass("enterprise-demo--compact");
    await waitFor(() => {
      expect(within(demo).getByText("Review")).toBeInTheDocument();
    });
  });
});
