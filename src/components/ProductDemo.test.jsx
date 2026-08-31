import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductDemo from "./ProductDemo";

describe("ProductDemo", () => {
  it("keeps the shared preview unchanged when no scroll stage is supplied", () => {
    render(<ProductDemo active={2} />);

    expect(screen.getByText("Compliance current")).toBeInTheDocument();
    expect(screen.getByText("Live assurance workspace")).toBeInTheDocument();
    expect(screen.getByText("Moving in the right direction")).toBeInTheDocument();
    expect(screen.queryByText("Current stage")).not.toBeInTheDocument();
    expect(screen.getByText("82%")).toBeInTheDocument();
  });

  it("uses connected journey language in the staged compliance preview", () => {
    render(
      <ProductDemo
        active={3}
        motionEnabled={false}
        stageCount={5}
        stageIndex={3}
        stageLabel="Review"
      />,
    );

    expect(screen.getByText("7-Day readiness plan")).toBeInTheDocument();
    expect(screen.getByText("Guided compliance workspace")).toBeInTheDocument();
    expect(screen.getByText("Secura review in progress")).toBeInTheDocument();
    expect(screen.getByText("Secura review running")).toBeInTheDocument();
    expect(screen.getByText("Gaps clarified")).toBeInTheDocument();
    expect(screen.getByText("Actions prepared")).toBeInTheDocument();
    expect(screen.queryByText("Evidence connected")).not.toBeInTheDocument();
  });

  it("uses the official emblem beside the Compliance current identity", () => {
    const { container } = render(<ProductDemo active={2} />);

    expect(
      container.querySelector('img[src="/assets/emblemLogo.svg"]'),
    ).toBeInTheDocument();
  });

  it("keeps readiness text outside the rotating progress artwork", () => {
    render(
      <ProductDemo
        active={3}
        motionEnabled
        stageCount={5}
        stageIndex={3}
        stageLabel="Resolve"
      />,
    );

    const progressArtwork = screen.getByTestId("readiness-progress-ring");
    expect(progressArtwork).toHaveAttribute("aria-hidden", "true");
    expect(progressArtwork).toBeEmptyDOMElement();
    expect(progressArtwork.parentElement).toHaveTextContent("85%");
    expect(screen.getByText("readiness")).not.toBe(progressArtwork);
  });
});
