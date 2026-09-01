import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HeroSection from "./HeroSection";

const { motionPreference } = vi.hoisted(() => ({
  motionPreference: { enabled: true },
}));

vi.mock("../context/MotionContext", () => ({
  useSiteMotion: () => ({ motionEnabled: motionPreference.enabled }),
}));

const renderHero = (motionEnabled) => {
  motionPreference.enabled = motionEnabled;

  return render(
    <MemoryRouter>
      <HeroSection motionEnabled={motionEnabled} />
    </MemoryRouter>,
  );
};

describe("HeroSection focus stack", () => {
  it("presents the approved Phase 1 readiness message and proof", () => {
    renderHero(true);

    expect(
      screen.getByText("Continuous compliance. Clear audit readiness."),
    ).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: "Fast Compliance, Smarter Audit Readiness",
    });
    const headlineLines = heading.querySelectorAll(":scope > span");

    expect(headlineLines).toHaveLength(2);
    expect(headlineLines[0]).toHaveTextContent("Fast Compliance,");
    expect(headlineLines[1]).toHaveTextContent("Smarter Audit Readiness");
    expect(
      screen.getByText(/Connect controls to policies, evidence, risks, owners/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-proof-count-1")).toHaveAttribute(
      "aria-label",
      "100+",
    );
    expect(screen.getByTestId("hero-proof-count-2")).toHaveAttribute(
      "aria-label",
      "7,000+",
    );
    expect(screen.getByTestId("hero-proof-count-3")).toHaveAttribute(
      "aria-label",
      "200,000+",
    );
    expect(screen.queryByText("30+ frameworks")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Build readiness you can prove."),
    ).not.toBeInTheDocument();
  });

  it("keeps the navbar hover system while giving the hero a distinct pricing action", () => {
    renderHero(true);

    const primaryCta = screen.getByRole("link", {
      name: /View plans/i,
    });

    expect(primaryCta).toHaveAttribute("href", "/pricing");
    expect(primaryCta).toHaveClass(
      "button",
      "button--mint",
      "button--directional",
      "group/brand-cta",
    );
    expect(primaryCta.className).toContain("relative");
    expect(primaryCta.className).toContain("isolate");
    expect(primaryCta.className).toContain("overflow-hidden");
    expect(primaryCta.className).toContain("hover:scale-[1.015]");
    expect(primaryCta.className).toContain("hover:bg-mint");
    expect(primaryCta.className).toContain("focus-visible:scale-[1.015]");
    expect(primaryCta.className).toContain(
      "motion-reduce:hover:scale-100",
    );
    expect(screen.getByTestId("hero-primary-cta-shine")).toHaveClass(
      "-translate-x-full",
    );
    expect(screen.getByTestId("hero-primary-cta-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(primaryCta.querySelector('[aria-hidden="true"]')?.textContent).not.toBe(
      "→",
    );
  });

  it("replaces the generic focus-stack labels with specific product states", () => {
    renderHero(false);

    const readinessHeader = screen.getByTestId("hero-readiness-header");
    const riskCard = screen.getByTestId("hero-event-card-1");
    const ownerCard = screen.getByTestId("hero-event-card-2");

    expect(readinessHeader).toHaveTextContent("SOC 2 readiness");
    expect(readinessHeader).toHaveTextContent("Live across your program");
    expect(readinessHeader).not.toHaveTextContent("Readiness current");
    expect(riskCard).toHaveTextContent("3 High Asset Risks");
    expect(riskCard).toHaveTextContent("Impact scored · now");
    expect(riskCard).not.toHaveTextContent("Identity provider · now");
    expect(riskCard).not.toHaveTextContent("Evidence validated");
    expect(ownerCard).toHaveTextContent("New chats");
    expect(ownerCard).toHaveTextContent("Control 5.1 · 2m");
    expect(ownerCard).not.toHaveTextContent("Encryption policy · 2m");
    expect(ownerCard).not.toHaveTextContent("Owner approved");
  });

  it("keeps the hero primary CTA static when motion is disabled", () => {
    renderHero(false);

    expect(
      screen.queryByTestId("hero-primary-cta-shine"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("hero-primary-cta-icon")).toBeInTheDocument();
  });

  it("keeps the secondary hero action minimal and non-shiny", () => {
    renderHero(true);

    const secondaryCta = screen.getByRole("link", {
      name: /Explore the platform/i,
    });

    expect(secondaryCta).toHaveAttribute("href", "/platform");
    expect(secondaryCta).toHaveClass("button", "button--ghost");
    expect(secondaryCta).not.toHaveClass("button--directional");
    expect(secondaryCta.className).toContain("hover:bg-white");
    expect(secondaryCta.className).toContain("hover:text-teal");
    expect(secondaryCta.className).toContain("hover:translate-y-0");
    expect(secondaryCta.className).toContain(
      "motion-reduce:hover:translate-y-0",
    );
    expect(secondaryCta.className).not.toContain("group/platform-cta");
    expect(secondaryCta.className).not.toContain("overflow-hidden");
    expect(secondaryCta.className).not.toContain("hover:shadow-");
    expect(secondaryCta.className).not.toContain("hover:scale");
    expect(secondaryCta.className).not.toContain("transition-[transform");
    expect(
      screen.queryByTestId("hero-secondary-cta-current"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("hero-secondary-cta-icon"),
    ).not.toBeInTheDocument();
    expect(secondaryCta.querySelector("svg")).not.toBeInTheDocument();
    expect(
      secondaryCta.querySelector('[data-testid="hero-secondary-cta-shine"]'),
    ).not.toBeInTheDocument();
  });

  it("loads one decorative dashboard behind the existing foreground scene", () => {
    const { container } = renderHero(true);
    const dashboard = container.querySelector(
      'img[src="/assets/dashboard.webp"]',
    );
    const orbit = container.querySelector(".hero-scene__orbit");

    expect(dashboard).toHaveAttribute("alt", "");
    expect(dashboard).toHaveAttribute("aria-hidden", "true");
    expect(dashboard).toHaveAttribute("loading", "eager");
    expect(dashboard).toHaveAttribute("fetchpriority", "high");
    expect(screen.getByTestId("hero-dashboard")).toContainElement(dashboard);
    expect(
      screen.getByTestId("hero-dashboard").compareDocumentPosition(orbit),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByTestId("hero-dashboard-focus-sweep")).toBeInTheDocument();
  });

  it("keeps the dashboard visible but removes the sweep when motion is disabled", () => {
    const { container } = renderHero(false);

    expect(
      container.querySelector('img[src="/assets/dashboard.webp"]'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("hero-dashboard-focus-sweep"),
    ).not.toBeInTheDocument();
  });

  it("keeps dashboard parallax outside the foreground transform wrapper", () => {
    const { container } = renderHero(true);
    const dashboardLayer = screen.getByTestId("hero-dashboard");
    const foregroundPanel = container.querySelector(".product-panel");

    expect(dashboardLayer.parentElement).toBe(
      foregroundPanel.parentElement.parentElement,
    );
    expect(dashboardLayer.parentElement).not.toBe(foregroundPanel.parentElement);
  });

  it("stages an enlarged half-cropped dashboard in perspective", () => {
    const { container } = renderHero(true);
    const dashboardLayer = screen.getByTestId("hero-dashboard");
    const dashboardStage = screen.getByTestId("hero-dashboard-stage");
    const dashboardImage = container.querySelector(
      'img[src="/assets/dashboard.webp"]',
    );

    expect(dashboardLayer).toHaveClass("hero-dashboard--perspective");
    expect(dashboardLayer.className).toContain("left-[32%]");
    expect(dashboardLayer.className).toContain("w-[1240px]");
    expect(dashboardStage.className).toContain(
      "[transform-style:preserve-3d]",
    );
    expect(dashboardImage.className).toContain("opacity-[.68]");
  });

  it("extracts the readiness graphic and its cards from the dashboard plane", () => {
    renderHero(true);

    expect(screen.getByTestId("hero-readiness-extraction")).toHaveAttribute(
      "data-motion",
      "extract",
    );

    const eventCards = screen.getAllByTestId(/hero-event-card-/);
    expect(eventCards).toHaveLength(4);
    eventCards.forEach((card) => {
      expect(card).toHaveAttribute("data-motion", "extract");
    });
    expect(screen.getByTestId("hero-event-card-2")).toHaveClass(
      "event-card--lifted-mobile",
    );
  });

  it("renders the extracted layers directly in place without motion", () => {
    renderHero(false);

    expect(screen.getByTestId("hero-readiness-extraction")).toHaveAttribute(
      "data-motion",
      "static",
    );
    screen.getAllByTestId(/hero-event-card-/).forEach((card) => {
      expect(card).toHaveAttribute("data-motion", "static");
    });
  });

  it("animates the readiness count when motion is enabled and renders the final count when paused", () => {
    const { rerender } = renderHero(true);
    const motionRing = screen.getByRole("img", {
      name: "82 percent audit readiness",
    });

    expect(motionRing.querySelector(".count-up-text")).toBeInTheDocument();
    expect(motionRing.querySelector(".count-up-text")).toHaveTextContent("0");
    expect(motionRing).toHaveTextContent("0%");

    motionPreference.enabled = false;
    rerender(
      <MemoryRouter>
        <HeroSection motionEnabled={false} />
      </MemoryRouter>,
    );

    const staticRing = screen.getByRole("img", {
      name: "82 percent audit readiness",
    });

    expect(staticRing.querySelector(".count-up-text")).toHaveTextContent("82");
    expect(staticRing).toHaveTextContent("82%");
  });

  it("animates the left proof counts and keeps final values available without motion", () => {
    const { rerender } = renderHero(true);

    expect(screen.getByTestId("hero-proof-count-1")).toHaveTextContent("0+");
    expect(screen.getByTestId("hero-proof-count-2")).toHaveTextContent("0+");
    expect(screen.getByTestId("hero-proof-count-3")).toHaveTextContent("0+");

    motionPreference.enabled = false;
    rerender(
      <MemoryRouter>
        <HeroSection motionEnabled={false} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("hero-proof-count-1")).toHaveTextContent("100+");
    expect(screen.getByTestId("hero-proof-count-2")).toHaveTextContent(
      "7,000+",
    );
    expect(screen.getByTestId("hero-proof-count-3")).toHaveTextContent(
      "200,000+",
    );
  });

  it("uses a soft dashboard edge and a light focus sweep", () => {
    renderHero(true);

    expect(screen.getByTestId("hero-dashboard-frame").className).toContain(
      "shadow-[0_26px_72px_rgba(8,127,140,.10)]",
    );
    expect(screen.getByTestId("hero-dashboard-focus-sweep")).toHaveClass(
      "hero-dashboard__focus-sweep--light",
    );
  });

  it("pops the cards in place around the smaller graphic", () => {
    renderHero(true);

    expect(screen.getByTestId("hero-readiness-extraction")).toHaveAttribute(
      "data-final-scale",
      "0.94",
    );
    const eventCards = screen.getAllByTestId(/hero-event-card-/);
    expect(eventCards.map((card) => card.getAttribute("data-entry-mode"))).toEqual(
      ["pop-in-place", "pop-in-place", "pop-in-place", "pop-in-place"],
    );
    expect(eventCards.map((card) => card.getAttribute("data-entry-x"))).toEqual(
      ["0", "0", "0", "0"],
    );
  });

  it("adds a Secura AI insight card and meaningful card icons", () => {
    renderHero(true);

    const securaCard = screen.getByTestId("hero-event-card-4");

    expect(securaCard).toHaveClass(
      "event-card--secura",
    );
    expect(screen.getByText("Secura AI insight")).toBeInTheDocument();
    expect(screen.getByText("Secura found 2 gaps")).toBeInTheDocument();
    expect(screen.queryByText("Review now")).not.toBeInTheDocument();
    expect(screen.getAllByTestId(/hero-card-icon-/)).toHaveLength(4);
    expect(
      securaCard.querySelector('img[src="/assets/secura-mark.svg"]'),
    ).toBeInTheDocument();
    expect(securaCard.querySelector("svg")).not.toBeInTheDocument();
  });

  it("keeps all four event cards available around the graphic on mobile", () => {
    renderHero(true);
    const styles = readFileSync(resolve("src/styles.css"), "utf8");
    const thirdCard = screen.getByTestId("hero-event-card-3");
    const securaCard = screen.getByTestId("hero-event-card-4");

    expect(thirdCard.className).not.toContain("max-[760px]:hidden");
    expect(securaCard.className).not.toContain("max-[760px]:hidden");
    expect(styles).toMatch(
      /@media \(max-width: 1080px\) {[\s\S]*\.event-card--three\s*{[^}]*right:\s*0;[^}]*bottom:\s*132px;/s,
    );
    expect(styles).toMatch(
      /@media \(max-width: 1080px\) {[\s\S]*\.event-card--secura\s*{[^}]*top:\s*-40px;[^}]*left:\s*8px;/s,
    );
    expect(styles).toMatch(
      /@media \(max-width: 760px\) {[\s\S]*\.event-card--three\s*{[^}]*right:\s*0;[^}]*bottom:\s*4px;[^}]*min-width:\s*142px;/s,
    );
    expect(styles).toMatch(
      /@media \(max-width: 760px\) {[\s\S]*\.event-card--secura\s*{[^}]*top:\s*-18px;[^}]*left:\s*-2px;[^}]*width:\s*158px;/s,
    );
    expect(styles).toMatch(
      /@media \(max-width: 760px\) {[\s\S]*\.event-card--secura \.secura-card__mark\s*{[^}]*width:\s*28px;[^}]*height:\s*28px;/s,
    );
  });

  it("orbits the brand emblem around the extracted readiness graphic", () => {
    renderHero(true);

    const emblemOrbit = screen.getByTestId("hero-emblem-orbit");
    const emblems = screen.getAllByTestId("hero-emblem-orbit-mark");
    const tracks = screen.getAllByTestId("hero-emblem-orbit-track");

    expect(emblemOrbit).toHaveAttribute("aria-hidden", "true");
    expect(emblemOrbit).toHaveAttribute("data-motion", "orbit");
    expect(emblemOrbit).toHaveClass("hero-scene__emblem-orbit--motion");
    expect(tracks).toHaveLength(3);
    expect(tracks.map((track) => track.dataset.orbit)).toEqual([
      "outer",
      "middle",
      "inner",
    ]);
    expect(emblems).toHaveLength(3);
    emblems.forEach((emblem) => {
      expect(emblem).toHaveClass("hero-scene__emblem-mark");
      expect(emblem).toHaveAttribute("src", "/assets/emblemLogo.svg");
      expect(emblem).toHaveAttribute("alt", "");
    });
  });

  it("keeps the orbiting emblems bare instead of boxed in badge circles", () => {
    const styles = readFileSync(resolve("src/styles.css"), "utf8");
    const markRule = styles.match(/\.hero-scene__emblem-mark\s*{(?<body>[^}]*)}/)
      ?.groups?.body;

    expect(markRule).toBeTruthy();
    expect(markRule).toMatch(/width:\s*58px;/);
    expect(markRule).toMatch(/height:\s*58px;/);
    expect(markRule).toMatch(/opacity:\s*0\.24;/);
    expect(markRule).not.toMatch(/border:/);
    expect(markRule).not.toMatch(/border-radius:/);
    expect(markRule).not.toMatch(/background:/);
  });

  it("positions each bare emblem on a distinct hero orbit path", () => {
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(styles).toMatch(
      /\.hero-scene__emblem-track--outer\s*{[^}]*inset:\s*20px 0 0 30px;[^}]*border-radius:\s*48% 52% 47% 53%;/s,
    );
    expect(styles).toMatch(
      /\.hero-scene__emblem-track--middle\s*{[^}]*inset:\s*78px -30px -34px 72px;[^}]*border-radius:\s*55% 45% 60% 40%;/s,
    );
    expect(styles).toMatch(
      /\.hero-scene__emblem-track--inner\s*{[^}]*inset:\s*72px 24px 42px 66px;[^}]*border-radius:\s*50%;/s,
    );
  });

  it("keeps the emblem static when motion is disabled", () => {
    renderHero(false);

    const emblemOrbit = screen.getByTestId("hero-emblem-orbit");

    expect(emblemOrbit).toHaveAttribute("data-motion", "static");
    expect(emblemOrbit).not.toHaveClass("hero-scene__emblem-orbit--motion");
  });

  it("places the Secura card further up and left of the graphic", () => {
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(styles).toMatch(
      /\.event-card--secura\s*{[^}]*top:\s*118px;[^}]*left:\s*-124px;/s,
    );
  });

  it("adds hover life only to the readiness loader and internal row cards", () => {
    const { container } = renderHero(true);
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(screen.getByTestId("hero-readiness-extraction")).toHaveClass(
      "hero-focus-panel",
    );
    expect(container.querySelectorAll(".hero-control-row")).toHaveLength(3);
    expect(styles).not.toMatch(/\.hero-focus-panel:hover::before/);
    expect(styles).toMatch(/\.readiness__ring::before/);
    expect(styles).toMatch(/\.hero-focus-panel:hover \.readiness__ring::before/);
    expect(styles).toMatch(/\.hero-control-row::after/);
    expect(styles).toMatch(/\.hero-focus-panel:hover \.hero-control-row::after/);
    expect(styles).toMatch(/@keyframes readiness-loader-pulse/);
    expect(styles).toMatch(/@keyframes hero-row-current-sweep/);
    expect(styles).toMatch(
      /\.site\[data-motion="paused"\] \.readiness__ring::before,[\s\S]*\.site\[data-motion="paused"\] \.hero-control-row::after\s*{[^}]*display:\s*none;/s,
    );
  });

  it("uses the bare emblem logo beside the readiness current title", () => {
    const { container } = renderHero(true);
    const header = screen.getByTestId("hero-readiness-header");
    const emblem = screen.getByTestId("hero-readiness-emblem");

    expect(header).toContainElement(emblem);
    expect(emblem).toHaveAttribute("src", "/assets/emblemLogo.svg");
    expect(emblem).toHaveAttribute("alt", "");
    expect(emblem).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".brand-mark")).not.toBeInTheDocument();
  });

  it("adds responsive bottom breathing room below the graphic stack", () => {
    const { container } = renderHero(true);
    const hero = container.querySelector("section.hero");
    const foregroundPanel = screen.getByTestId("hero-readiness-extraction");
    const readinessRing = container.querySelector(".readiness__ring");
    const waveDivider = container.querySelector(".wave-divider");

    expect(hero.className).toContain("pb-0");
    expect(hero.className).toContain("max-[1080px]:pb-[9rem]");
    expect(hero.className).toContain("max-[760px]:pb-[7rem]");
    expect(foregroundPanel.className).toContain(
      "max-[760px]:inset-[72px_12%_auto]",
    );
    expect(foregroundPanel.className).toContain("max-[760px]:min-h-76");
    expect(readinessRing.className).toContain("max-[760px]:size-18");
    expect(waveDivider.className).toContain("max-[760px]:translate-y-8");
  });
});
