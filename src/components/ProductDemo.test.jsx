import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductDemo from "./ProductDemo";

describe("ProductDemo", () => {
  it("keeps the shared preview unchanged when no scroll stage is supplied", () => {
    render(<ProductDemo active={2} />);

    expect(screen.getByText("Moving in the right direction")).toBeInTheDocument();
    expect(screen.queryByText("Current stage")).not.toBeInTheDocument();
    expect(screen.getByText("82%")).toBeInTheDocument();
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
