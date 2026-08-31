# Secura Assessment Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the abstract Secura packets with an authentic, animated access-review assessment while preserving the existing CursorGrid and glowing Secura core.

**Architecture:** Keep `SecuraSection` responsible for narrative composition and extract the visual into a focused `SecuraAssessment` component. Static assessment configuration stays at module scope; Motion React handles the one-shot transform/opacity sequence, and the existing `CursorGrid` retains viewport activation and reduced-motion omission.

**Tech Stack:** React 19, Motion React, Tailwind CSS v4, Canvas 2D, Lucide React, Vitest, Testing Library

---

## File Structure

- Create `src/components/SecuraAssessment.jsx`: assessment data, CursorGrid composition, Secura engine, statuses, recommendation, and motion states.
- Modify `src/sections/SecuraSection.jsx`: approved copy, capability line, and composition of `SecuraAssessment`.
- Modify `src/sections/SecuraSection.test.jsx`: protect content, assessment semantics, motion branches, and removal of abstract packets.
- Modify `src/styles.css`: product-authentic Secura geometry, glass panel, connector, core sizing, responsive placement, and removal of packet animation.
- Modify `README.md`: record the concrete Secura assessment visual.
- Modify `docs/ARCHITECTURE.md`: record the extracted component and motion boundary.
- Modify `docs/ROADMAP.md`: record the user-visible Secura capability and focused validation.
- Modify `design-system/controllo-compliance-current/MASTER.md`: add Secura canvas guidance.

### Task 1: Protect The Approved Secura Content And States

**Files:**
- Modify: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Replace the current single test with failing content and state tests**

Use this test suite:

```jsx
import { render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import SecuraSection from "./SecuraSection";

describe("SecuraSection", () => {
  it("presents one focused Secura access-review assessment", () => {
    render(<SecuraSection motionEnabled />);

    expect(screen.getByText("Introducing Secura AI")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Find the gap before it becomes a finding.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Secura reviews the control requirement alongside/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Review context")).toBeInTheDocument();
    expect(screen.getByText("Identify gaps")).toBeInTheDocument();
    expect(screen.getByText("Recommend next actions")).toBeInTheDocument();

    const assessment = screen.getByRole("article", {
      name: "Secura access-review assessment example",
    });
    expect(within(assessment).getByText("Quarterly access review")).toBeInTheDocument();
    expect(
      within(assessment).getByText(/Access rights must be reviewed quarterly/i),
    ).toBeInTheDocument();
    expect(within(assessment).getByText("Relevance to control")).toBeInTheDocument();
    expect(within(assessment).getByText("Audit-period coverage")).toBeInTheDocument();
    expect(within(assessment).getByText("Required approval")).toBeInTheDocument();
    expect(within(assessment).getByText("Policy consistency")).toBeInTheDocument();
    expect(within(assessment).getAllByText("Supported")).toHaveLength(2);
    expect(within(assessment).getByText("Gap found")).toBeInTheDocument();
    expect(within(assessment).getByText("Missing")).toBeInTheDocument();
    expect(
      within(assessment).getByText(/Upload the approved quarterly access review/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("EVIDENCE / VALIDATED")).not.toBeInTheDocument();
  });

  it("uses the viewport CursorGrid only for the animated branch", () => {
    const { rerender } = render(<SecuraSection motionEnabled />);

    expect(screen.getByTestId("cursor-grid")).toHaveAttribute(
      "data-activation",
      "viewport",
    );
    expect(screen.getByTestId("cursor-grid")).toHaveAttribute(
      "data-interactive",
      "false",
    );
    expect(screen.getByTestId("secura-assessment-panel")).toHaveAttribute(
      "data-motion",
      "sequence",
    );

    rerender(<SecuraSection motionEnabled={false} />);

    expect(screen.queryByTestId("cursor-grid")).not.toBeInTheDocument();
    expect(screen.getByTestId("secura-assessment-panel")).toHaveAttribute(
      "data-motion",
      "static",
    );
    expect(screen.getByText("Quarterly access review")).toBeInTheDocument();
  });

  it("removes the old floating packet system from the Secura canvas", () => {
    render(<SecuraSection motionEnabled />);
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(screen.queryByText("CONTROL / MAPPED")).not.toBeInTheDocument();
    expect(screen.queryByText("RISK / PRIORITIZED")).not.toBeInTheDocument();
    expect(screen.queryByText("AUDIT / EXPLAINED")).not.toBeInTheDocument();
    expect(styles).not.toMatch(/\.ai-packet/);
    expect(styles).not.toMatch(/@keyframes pulse-packet/);
  });
});
```

- [ ] **Step 2: Run the targeted test and confirm failure**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: FAIL because the old copy, packets, and abstract core are still rendered.

### Task 2: Build The Secura Assessment Component

**Files:**
- Create: `src/components/SecuraAssessment.jsx`
- Modify: `src/sections/SecuraSection.jsx`
- Test: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Create the focused assessment component**

Create `src/components/SecuraAssessment.jsx` with module-scope configuration and no local state or effects:

```jsx
import { CircleAlert, CircleCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import CursorGrid from "./CursorGrid";

const assessmentRows = [
  { label: "Relevance to control", status: "Supported", tone: "supported" },
  { label: "Audit-period coverage", status: "Gap found", tone: "attention" },
  { label: "Required approval", status: "Missing", tone: "attention" },
  { label: "Policy consistency", status: "Supported", tone: "supported" },
];

const panelTransition = { duration: 0.48, delay: 0.24, ease: [0.16, 1, 0.3, 1] };
const rowTransition = (index) => ({
  duration: 0.34,
  delay: 0.48 + index * 0.08,
  ease: [0.16, 1, 0.3, 1],
});

export default function SecuraAssessment({ motionEnabled }) {
  return (
    <div
      className={`ai-canvas relative min-h-140 overflow-hidden rounded-[36px] max-[760px]:min-h-175 max-[760px]:rounded-[28px] ${
        motionEnabled ? "ai-canvas--animated secura-assessment--animated" : ""
      }`}
      data-testid="secura-assessment-canvas"
    >
      {motionEnabled ? (
        <CursorGrid
          className="ai-cursor-grid"
          activation="viewport"
          autoSpeed={72}
          cellSize={42}
          color="#26d8ad"
          radius={126}
          holdTime={180}
          fadeDuration={780}
          lineWidth={1}
          maxOpacity={0.62}
          fillOpacity={0.04}
          gridOpacity={0.05}
          cellRadius={0}
        />
      ) : null}

      <div className="secura-analysis-label pointer-events-none absolute top-5.5 left-6 z-20 font-mono text-[.58rem] font-medium tracking-[.14em] uppercase text-mint max-[760px]:top-5 max-[760px]:left-5">
        <span className="block">Secura AI · Active engine</span>
        <span className="mt-1.5 block text-white/48">Access review / AI assessment</span>
      </div>

      <motion.div
        className="secura-engine-shell pointer-events-none absolute z-10"
        aria-hidden="true"
        initial={motionEnabled ? { opacity: 0, scale: 0.82, x: 28 } : false}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.46, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="ai-core secura-engine-core" />
      </motion.div>

      <motion.span
        className="secura-signal pointer-events-none absolute z-10"
        aria-hidden="true"
        initial={motionEnabled ? { opacity: 0, scaleX: 0 } : false}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.34, delay: 0.3, ease: "easeOut" }}
      />

      <motion.article
        className="secura-assessment-panel absolute z-20 overflow-hidden rounded-[24px] border border-mint/22 bg-[#07131f]/94 p-5.5 text-white shadow-[0_28px_80px_rgba(0,0,0,.34)] backdrop-blur-[14px] max-[760px]:rounded-[20px] max-[760px]:p-4"
        aria-label="Secura access-review assessment example"
        data-motion={motionEnabled ? "sequence" : "static"}
        data-testid="secura-assessment-panel"
        initial={motionEnabled ? { opacity: 0, scale: 0.94, x: 34 } : false}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={panelTransition}
      >
        <header className="relative z-10 border-b border-white/10 pb-3.5">
          <p className="m-0 font-mono text-[.52rem] tracking-[.12em] uppercase text-mint">Control assessment</p>
          <h3 className="mt-1.5 mb-0 text-[1rem] text-white">Quarterly access review</h3>
          <p className="mt-1.5 mb-0 text-[.63rem] leading-[1.55] text-[#a9bdc9]">
            Access rights must be reviewed quarterly and approved by the control owner.
          </p>
        </header>

        <div className="relative z-10 mt-3 grid gap-2" role="list" aria-label="Secura assessment results">
          {assessmentRows.map((item, index) => {
            const StatusIcon = item.tone === "supported" ? CircleCheck : CircleAlert;

            return (
              <motion.div
                className="flex min-h-11 items-center justify-between gap-3 rounded-[13px] border border-white/7 bg-white/[.035] px-3 py-2"
                key={item.label}
                role="listitem"
                initial={motionEnabled ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={rowTransition(index)}
              >
                <span className="text-[.64rem] text-[#c8d6de]">{item.label}</span>
                <motion.span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[.48rem] font-medium tracking-[.06em] uppercase secura-status secura-status--${item.tone}`}
                  animate={
                    motionEnabled && item.tone === "attention"
                      ? { boxShadow: ["0 0 0 0 rgba(238,179,72,0)", "0 0 0 5px rgba(238,179,72,.1)", "0 0 0 0 rgba(238,179,72,0)"] }
                      : undefined
                  }
                  transition={{ duration: 0.56, delay: 0.78 + index * 0.08 }}
                >
                  <StatusIcon aria-hidden="true" />
                  {item.status}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="relative z-10 mt-3.5 rounded-[15px] border border-mint/20 bg-mint/[.07] p-3.5"
          initial={motionEnabled ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="flex items-center gap-1.5 font-mono text-[.49rem] font-medium tracking-[.1em] uppercase text-mint">
            <Sparkles aria-hidden="true" /> Secura recommendation
          </span>
          <p className="mt-2 mb-0 text-[.64rem] leading-[1.55] text-[#d6e2e7]">
            Upload the approved quarterly access review and assign an evidence owner.
          </p>
        </motion.div>
      </motion.article>
    </div>
  );
}
```

- [ ] **Step 2: Update the section composition and copy**

Replace the packet array, `CursorGrid` import, old narrative, metrics, and canvas internals in `src/sections/SecuraSection.jsx` with:

```jsx
import Reveal from "../components/Reveal";
import SecuraAssessment from "../components/SecuraAssessment";

const capabilities = ["Review context", "Identify gaps", "Recommend next actions"];

export default function SecuraSection({ motionEnabled }) {
  return (
    <section className="section bg-navy pt-35 pb-37.5 text-white" id="secura">
      <div className="shell grid grid-cols-[.78fr_1.22fr] items-center gap-20.5 max-[1080px]:grid-cols-1 max-[760px]:gap-11">
        <Reveal motionEnabled={motionEnabled}>
          <p className="eyebrow text-mint">Introducing Secura AI</p>
          <h2>Find the gap before it becomes a finding.</h2>
          <p className="lede mt-6.5 text-[#b8c8d5]">
            Secura reviews the control requirement alongside its implementation,
            policies, procedures, and evidence. It shows what is supported, where
            context is missing, and the next action for an accountable owner to review.
          </p>
          <div
            className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-4.5 font-mono text-[.59rem] tracking-[.05em] text-[#b8c8d5] [&>span]:inline-flex [&>span]:items-center [&>span]:gap-2 [&>span]:before:size-1.5 [&>span]:before:rounded-full [&>span]:before:bg-mint"
            aria-label="Secura capabilities"
          >
            {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
          </div>
        </Reveal>
        <Reveal motionEnabled={motionEnabled} delay={0.1}>
          <SecuraAssessment motionEnabled={motionEnabled} />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run the focused test to identify the remaining CSS failure**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: content and motion tests pass; the packet-removal test still fails until the old CSS is removed.

### Task 3: Implement Product-Authentic Canvas Geometry

**Files:**
- Modify: `src/styles.css`
- Test: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Replace obsolete packet CSS with Secura assessment geometry**

Delete `.ai-packet`, `.ai-packet::after`, `.ai-packet--1` through `.ai-packet--4`, `@keyframes pulse-packet`, and their mobile overrides. Add these rules after `.ai-core::after`:

```css
.secura-engine-shell {
  left: 18px;
  top: calc(50% - 84px);
  width: 168px;
  height: 168px;
}
.secura-engine-core {
  width: 142px;
  height: 142px;
  border-radius: 32px;
  box-shadow: 0 0 0 18px rgba(38, 216, 173, 0.06),
    0 0 82px rgba(38, 216, 173, 0.24);
}
.secura-engine-core::before {
  inset: 43px 53px 43px 25px;
}
.secura-engine-core::after {
  inset: 43px 28px 43px 50px;
}
.secura-signal {
  left: 148px;
  right: calc(min(72%, 480px) + 22px);
  top: 50%;
  height: 1px;
  transform-origin: left center;
  background: linear-gradient(90deg, rgba(38, 216, 173, 0.76), rgba(38, 216, 173, 0));
  box-shadow: 0 0 16px rgba(38, 216, 173, 0.24);
}
.secura-assessment-panel {
  top: 58px;
  right: 22px;
  bottom: 22px;
  width: min(72%, 480px);
}
.secura-assessment-panel::before,
.secura-assessment-panel::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  pointer-events: none;
  border-color: rgba(38, 216, 173, 0.52);
}
.secura-assessment-panel::before {
  top: 8px;
  left: 8px;
  border-top: 1px solid;
  border-left: 1px solid;
}
.secura-assessment-panel::after {
  right: 8px;
  bottom: 8px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.secura-status > svg {
  width: 12px;
  height: 12px;
}
.secura-status--supported {
  border: 1px solid rgba(38, 216, 173, 0.24);
  background: rgba(38, 216, 173, 0.1);
  color: var(--mint);
}
.secura-status--attention {
  border: 1px solid rgba(238, 179, 72, 0.28);
  background: rgba(238, 179, 72, 0.1);
  color: #f3c76d;
}
```

Inside the existing `@media (max-width: 760px)` block, add:

```css
  .secura-engine-shell {
    left: auto;
    right: 14px;
    top: 20px;
    width: 82px;
    height: 82px;
  }
  .secura-engine-core {
    width: 72px;
    height: 72px;
    border-radius: 18px;
    opacity: 0.72;
  }
  .secura-engine-core::before {
    inset: 22px 27px 22px 13px;
  }
  .secura-engine-core::after {
    inset: 22px 14px 22px 25px;
  }
  .secura-signal {
    display: none;
  }
  .secura-assessment-panel {
    top: 102px;
    right: 12px;
    bottom: 14px;
    left: 12px;
    width: auto;
  }
```

- [ ] **Step 2: Run the focused Secura test**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: all Secura section tests pass.

### Task 4: Document The Concrete Secura Visual

**Files:**
- Modify: `README.md`
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/ROADMAP.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`

- [ ] **Step 1: Update current-state documentation**

Add a current-status bullet to `README.md` describing the product-authentic Secura access-review assessment with the preserved CursorGrid and reduced-motion output.

In `docs/ARCHITECTURE.md`, replace the existing `CursorGrid` ownership sentence with one that states `SecuraAssessment` owns the static assessment configuration and one-shot row/recommendation sequence while reusing the existing viewport-activated grid.

In the implemented list of `docs/ROADMAP.md`, add:

```markdown
- Product-authentic Secura assessment canvas with the existing viewport-driven CursorGrid, active-engine core, four reviewable control checks, one accountable recommendation, responsive composition, and a static reduced-motion state
```

In `MASTER.md`, add a Secura canvas subsection requiring one concrete assessment, authentic dark terminal styling, no fake application controls, preserved CursorGrid lifecycle, and complete mobile/reduced-motion output.

- [ ] **Step 2: Inspect documentation consistency**

Run:

```bash
rg -n "Secura assessment|CursorGrid|active-engine|reduced-motion" README.md docs/ARCHITECTURE.md docs/ROADMAP.md design-system/controllo-compliance-current/MASTER.md
```

Expected: all documentation describes the assessment as implemented and does not claim WebGL, generated graphics, or interactive dashboard behavior.

### Task 5: Focused Verification

**Files:**
- Inspect: `src/components/SecuraAssessment.jsx`
- Inspect: `src/sections/SecuraSection.jsx`
- Inspect: `src/styles.css`

- [ ] **Step 1: Run the targeted Secura test**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: all tests in the file pass. Do not run the full suite or production build.

- [ ] **Step 2: Inspect the existing development server at required widths**

At 1440, 1024, 768, and 375 pixels, verify:

- Copy and capability line remain readable.
- CursorGrid remains visible around the assessment.
- The core, connector, panel, rows, and recommendation form one clear sequence.
- All four statuses and the recommendation remain visible on mobile.
- No fake controls, packet labels, clipping, horizontal overflow, warnings, or errors appear.
- The assessment settles after its entrance and the reduced-motion branch remains complete.

- [ ] **Step 3: Record actual validation**

Add a dated `docs/ROADMAP.md` validation bullet containing only the test count and browser widths actually verified. Do not claim a production build.

## Repository Constraint

This workspace has no Git metadata. Commit, branch, worktree, merge, and pull-request steps cannot be performed; preserve the work as focused filesystem edits and report all changed files.
