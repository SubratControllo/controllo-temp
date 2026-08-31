# Secura Viewport-Loop Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the manual Secura assessment/chat swap with a sub-ten-second product demo that loops only while its panel is in view, opens on compact control context, and uses the real gradient Secura banner as the activation point.

**Architecture:** `SecuraAssessment` will use one reducer for visibility and phase, one observer, and one timeout at a time. `SecuraChatBanner` will remain a timer-free presentational control with full and condensed variants. CSS classes keyed by `data-phase` will animate only transforms and opacity.

**Tech Stack:** React 19 hooks, existing CursorGrid, Tailwind CSS v4 utilities, shared CSS, Vitest, Testing Library.

---

### Task 1: Specify the viewport-driven phase contract

**Files:**
- Modify: `src/sections/SecuraSection.test.jsx`
- Modify: `src/components/SecuraChatBanner.test.jsx`

- [x] **Step 1: Replace click-and-back assertions with an observer-controlled loop test**

Create a controllable `IntersectionObserver` stub, render with motion enabled, enter the viewport, and advance fake timers through `idle`, `clicking`, `chat`, `results`, `resetting`, and back to `idle`. Assert the article's `data-phase` at each boundary.

- [x] **Step 2: Add viewport exit and re-entry coverage**

Exit during `chat`, advance timers, and assert the phase remains `idle`. Re-enter and assert the normal phase sequence starts from the beginning.

- [x] **Step 3: Add reduced-motion coverage**

Render with `motionEnabled={false}` and assert `data-phase="results"`, the complete metrics and rows, no CursorGrid, and no scheduled looping behavior.

- [x] **Step 4: Run focused tests and verify RED**

Run `npm test -- --run src/components/SecuraChatBanner.test.jsx src/sections/SecuraSection.test.jsx`. Expected: failures because the current component has no viewport phase machine or phase data attribute.

### Task 2: Implement the minimal deterministic loop

**Files:**
- Modify: `src/components/SecuraAssessment.jsx`
- Modify: `src/components/SecuraChatBanner.jsx`

- [x] **Step 1: Add module-level phase data**

Define `PHASE_ORDER = ["idle", "clicking", "chat", "results", "resetting"]` and a duration map whose sum is below 10,000ms.

- [x] **Step 2: Add the single reducer and observer**

Use one reducer state `{ phase, inView }`. `ENTER` sets `inView: true` and `phase: "idle"`; `LEAVE` sets `inView: false` and resets idle; `ADVANCE` moves to the next phase; `RESTART` returns to clicking while visible. When motion is disabled, initialize and hold `results`.

- [x] **Step 3: Add one timeout chain**

When motion is enabled and the panel is visible, schedule one timeout for the current phase. Clear it whenever the phase, visibility, or component lifecycle changes.

- [x] **Step 4: Render the three semantic surfaces**

Render the full idle banner for `idle` and `clicking`, the control-review header plus a top-start user message and Secura AI response for `chat`, and the complete assessment for `results` and `resetting`. Keep the article mounted and stable.

- [x] **Step 5: Keep the banner presentational**

Support `variant="full" | "condensed"`, `onActivate`, and `isClicking`. Remove the old independently timed conversation and back button.

- [x] **Step 6: Run focused tests and verify GREEN**

Run `npm test -- --run src/components/SecuraChatBanner.test.jsx src/sections/SecuraSection.test.jsx`. Expected: all focused tests pass with no timer leaks.

### Task 3: Add restrained CSS motion and responsive containment

**Files:**
- Modify: `src/styles.css`

- [x] **Step 1: Add phase surface transitions**

Use opacity and translate/scale transforms for idle exit, chat entry, result heading, metric rail, row stagger, condensed banner, and reverse reset.

- [x] **Step 2: Add cursor, ripple, orb, and typewriter motion**

Implement these as decorative CSS elements. The prompt remains present in the DOM while a clipping overlay reveals it, avoiding JavaScript character timers.

- [x] **Step 3: Add mobile rules**

At narrow widths, reduce padding and type sizes, keep the metrics as a compact three-column rail, allow row labels to wrap, and preserve status pills.

- [x] **Step 4: Add reduced-motion guards**

Disable local animation and transitions under the site's paused motion state and `prefers-reduced-motion: reduce`.

- [x] **Step 5: Re-run focused tests**

Run the same two-file Vitest command and confirm all tests pass.

### Task 4: Verify and document the user-visible capability

**Files:**
- Modify: `README.md`
- Modify: `docs/ROADMAP.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`

- [x] **Step 1: Inspect the changed files for imports, timer cleanup, and copy consistency**

Confirm no `motion/react` or Lucide import remains in the two Secura component modules and the total phase duration is below ten seconds.

- [x] **Step 2: Run real-browser QA**

Inspect 375×812, 768×1024, 1024×900, and 1440×900. Observe a complete loop, leave/re-enter the section, activate the banner by keyboard, and verify no clipping, overflow, console warning, or background loop.

- [x] **Step 3: Update durable documentation**

Record the viewport-only loop, reduced-motion result state, component boundary, tested viewports, and current limitation that the interaction is a deterministic frontend demonstration rather than a live Secura request.

- [x] **Step 4: Run final focused verification**

Run `npm test -- --run src/components/SecuraChatBanner.test.jsx src/sections/SecuraSection.test.jsx`. Do not run a production build.

Git commit steps are omitted because this workspace does not expose Git metadata.
