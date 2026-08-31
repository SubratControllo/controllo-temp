# Hero Dashboard Focus Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved three-layer dashboard Focus Stack to the homepage hero while preserving content, accessibility, responsive layout, and reduced-motion behavior.

**Architecture:** `HeroSection` continues to own the shared `useScroll` progress and passes dashboard Motion values into a local `DashboardBackdrop`. The dashboard entrance is nested inside the scroll-transform wrapper so the entrance and parallax transforms do not compete; CSS owns only the soft mask and fixed sweep appearance.

**Tech Stack:** React 19, `motion/react`, Tailwind CSS v4, Vitest, Testing Library

---

### Task 1: Lock the decorative layer contract with a focused test

**Files:**
- Create: `src/sections/HeroSection.test.jsx`

- [x] **Step 1: Write the failing test**

```jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HeroSection from "./HeroSection";

const renderHero = (motionEnabled) =>
  render(
    <MemoryRouter>
      <HeroSection motionEnabled={motionEnabled} />
    </MemoryRouter>,
  );

describe("HeroSection focus stack", () => {
  it("loads one decorative dashboard behind the existing foreground scene", () => {
    const { container } = renderHero(true);
    const dashboard = container.querySelector('img[src="/assets/dashboard.webp"]');
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
});
```

- [x] **Step 2: Run the focused test and verify the intended failure**

Run: `npm test -- --run src/sections/HeroSection.test.jsx`

Expected: FAIL because the dashboard and focus sweep do not exist yet.

### Task 2: Implement the Focus Stack

**Files:**
- Modify: `src/sections/HeroSection.jsx`
- Modify: `src/styles.css`

- [x] **Step 1: Add independent dashboard and foreground scroll transforms**

In `HeroSection`, replace the existing 85-pixel panel transform with:

```jsx
const dashboardY = useTransform(scrollYProgress, [0, 1], [0, 18]);
const dashboardScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
const sceneY = useTransform(scrollYProgress, [0, 1], [0, 48]);
```

Use `sceneY` for the existing foreground scene and pass the first two values to `DashboardBackdrop`.

- [x] **Step 2: Add the local decorative component before the orbit**

```jsx
function DashboardBackdrop({ motionEnabled, scale, y }) {
  return (
    <motion.div
      aria-hidden="true"
      className="hero-dashboard pointer-events-none absolute inset-[34px_-92px_44px_-10px] z-0 overflow-hidden rounded-[40px] max-[760px]:inset-[34px_-72px_64px_-34px] max-[760px]:rounded-[30px]"
      data-testid="hero-dashboard"
      style={{ scale: motionEnabled ? scale : 1, y: motionEnabled ? y : 0 }}
    >
      <motion.div
        className="relative size-full"
        initial={motionEnabled ? { opacity: 0, scale: 1.025, y: 22 } : false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.62, delay: 0.04, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <img
          alt=""
          aria-hidden="true"
          className="size-full select-none object-cover object-[50%_16%] opacity-28 blur-[3px] saturate-[.72] max-[760px]:object-[44%_12%] max-[760px]:opacity-18"
          decoding="async"
          draggable="false"
          fetchPriority="high"
          loading="eager"
          src="/assets/dashboard.webp"
        />
        {motionEnabled ? (
          <motion.span
            className="hero-dashboard__focus-sweep absolute inset-y-[8%] left-0 w-[14%]"
            data-testid="hero-dashboard-focus-sweep"
            initial={{ opacity: 0, x: "-140%" }}
            animate={{ opacity: [0, 0.42, 0], x: "760%" }}
            transition={{ duration: 0.42, delay: 0.48, ease: "easeInOut" }}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
```

Add explicit `z-1`, `z-2`, and `z-3` utilities to the orbit, foreground panel, and event cards respectively, and add `isolate` to the scene wrapper.

- [x] **Step 3: Add the fixed mask and sweep paint**

```css
.hero-dashboard {
  -webkit-mask-image: radial-gradient(
    ellipse 92% 88% at 50% 46%,
    #000 54%,
    rgba(0, 0, 0, 0.78) 72%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 92% 88% at 50% 46%,
    #000 54%,
    rgba(0, 0, 0, 0.78) 72%,
    transparent 100%
  );
}

.hero-dashboard__focus-sweep {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(38, 216, 173, 0.08) 24%,
    rgba(8, 127, 140, 0.34) 50%,
    rgba(38, 216, 173, 0.08) 76%,
    transparent
  );
  filter: blur(7px);
}
```

- [x] **Step 4: Run the focused test and verify it passes**

Run: `npm test -- --run src/sections/HeroSection.test.jsx`

Expected: 2 tests pass with no failures.

### Task 3: Browser validation and documentation state

**Files:**
- Modify only if the recorded state changes: `design-system/controllo-compliance-current/MASTER.md`
- Modify only if the recorded state changes: `docs/ROADMAP.md`

- [x] **Step 1: Inspect desktop and mobile output in the existing development server**

Check 1440, 1024, 768, and 375 pixel widths. Confirm the dashboard remains subordinate, its upper metrics/trend crop is visible, the foreground stays legible, and there is no horizontal overflow.

- [x] **Step 2: Inspect motion and reduced motion**

Confirm the dashboard enters before the foreground, the sweep runs once, scroll moves the dashboard 18 pixels and foreground 48 pixels, and reduced motion renders the final static dashboard without sweep or parallax.

- [x] **Step 3: Review changed files and targeted evidence**

Run: `npm test -- --run src/sections/HeroSection.test.jsx src/App.test.jsx`

Expected: all focused hero/application tests pass. Do not run the production build or full suite.

- [x] **Step 4: Record documentation only when needed**

Add the Focus Stack to the design-system hero guidance and current roadmap baseline only if the completed visual is now part of the maintained product baseline. This workspace has no `.git` metadata, so do not attempt a commit.

### Task 4: Add the approved Layer Extraction entrance

**Files:**
- Modify: `src/sections/HeroSection.test.jsx`
- Modify: `src/sections/HeroSection.jsx`
- Modify: `src/styles.css`
- Modify: `design-system/controllo-compliance-current/MASTER.md`
- Modify: `docs/ROADMAP.md`

- [x] **Step 1: Write a failing motion-structure test**

Assert that the readiness panel has a dedicated `hero-readiness-extraction` motion layer, that each event card exposes a dedicated extraction layer, and that no event card retains the looping `float-card` CSS animation.

- [x] **Step 2: Run the focused test and verify the intended failure**

Run: `npm test -- --run src/sections/HeroSection.test.jsx`

Expected: FAIL because the panel and cards are still children of one shared entrance wrapper and the cards still loop.

- [x] **Step 3: Implement the extraction sequence**

Keep scroll parallax on the outer scene wrapper. Give the readiness panel its own Motion entrance that begins smaller, farther right, lower, and aligned to the dashboard perspective before settling into the existing layout. After it settles, give the three event cards individual pop-in-place entrances using only scale, depth, and opacity with short staggered delays; do not add X/Y travel. Render final values directly when motion is disabled.

- [x] **Step 4: Remove the ambient event-card loop**

Delete the `float-card` animation and its delay overrides. Preserve the event cards' layout, content, and final positions.

- [x] **Step 5: Run focused tests and browser QA**

Run: `npm test -- --run src/sections/HeroSection.test.jsx src/App.test.jsx`

Verify at 1440×900 and 375×812 that the dashboard enters first, the readiness panel lifts from it, cards unfold around the panel, the final layout remains still, there is no horizontal overflow, and reduced motion renders the final composition immediately.
