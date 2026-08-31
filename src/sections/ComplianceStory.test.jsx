import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ComplianceStory, { getComplianceStage } from "./ComplianceStory";

describe("ComplianceStory", () => {
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
    expect(within(demo).getByText("Report")).toBeInTheDocument();
    expect(within(demo).getByText("05 / 05")).toBeInTheDocument();
    expect(within(demo).getByText("88%")).toBeInTheDocument();
  });

  it("starts the motion sequence at Connect without shifting the card frame", () => {
    render(<ComplianceStory motionEnabled />);

    const demo = screen.getByLabelText("Controllo product experience preview");
    expect(demo).toHaveAttribute("data-stage", "0");
    expect(demo).toHaveAttribute("data-frame", "stable");
    expect(within(demo).getByText("Connect")).toBeInTheDocument();
    expect(within(demo).getByText("01 / 05")).toBeInTheDocument();
    expect(within(demo).getByText("76%")).toBeInTheDocument();
  });
});
