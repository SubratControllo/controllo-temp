# Secura Summary Rail Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dated Secura engine/connector treatment with a modern `2 gaps found` summary, one continuous three-metric rail, the preserved assessment rows, and the existing recommendation.

**Architecture:** Keep `SecuraSection` unchanged so it continues to own the restored left narrative. Refine only `SecuraAssessment`: module-scope summary/metric/row configuration, a single dominant panel, one-shot Motion React sequencing, the existing viewport-driven CursorGrid, and CSS-owned responsive geometry.

**Tech Stack:** React 19, Motion React, Tailwind CSS v4, Canvas 2D, Lucide React, Vitest, Testing Library

---

## File Structure

- Modify `src/components/SecuraAssessment.jsx`: summary header, metric rail, preserved rows, recommendation, and entrance sequence.
- Modify `src/sections/SecuraSection.test.jsx`: protect the modern summary, metrics, preserved rows, motion branches, and removal of obsolete engine/connector markup and CSS.
- Modify `src/styles.css`: full-canvas panel geometry, metric rail, responsive sizing, and removal of the old engine/connector rules.
- Modify `README.md`: describe the summary-led Secura assessment.
- Modify `docs/ARCHITECTURE.md`: record the summary and metric configuration owned by `SecuraAssessment`.
- Modify `docs/ROADMAP.md`: record the user-visible redesign and actual validation.
- Modify `design-system/controllo-compliance-current/MASTER.md`: replace the active-engine guidance with the approved summary-rail baseline.

### Task 1: Generate And Analyze The Section Reference

**Files:**
- Reference: `docs/superpowers/specs/2026-08-26-secura-summary-rail-redesign.md`
- Reference: `/Users/ashutoshsingh/Downloads/Asset Risks.jpg`

- [ ] **Step 1: Generate one fresh, section-specific visual reference**

Use the `imagegen` skill to generate one large 1440×900 marketing-section reference with this prompt:

```text
Create a single implementation-ready visual reference for the right-side Secura AI assessment canvas on a premium compliance SaaS marketing site. Deep navy background, restrained 42px teal technical grid, one dominant dark assessment surface, small Controllo mint emblem with “SECURA AI · CONTROL REVIEW”, large “2 gaps found” summary with warm gold only on “2 gaps”, subtitle “Quarterly access review”, one continuous three-column metric rail separated by thin vertical lines (4 Checks completed, 2 Gaps detected, 3m Review time), four clean existing assessment rows, and one mint recommendation panel. Avoid an oversized floating logo, connector line, three separate metric cards, heavy glassmorphism, fake controls, browser chrome, nested cards, and dense micro-UI. Preserve generous spacing and make every label readable.
```

Expected: one readable standalone Secura canvas reference, not a page collage.

- [ ] **Step 2: Analyze the generated reference before coding**

Record the implementation decisions in working notes:

```text
Hierarchy: header → gap summary → subtitle → continuous metric rail → four rows → recommendation
Container logic: one dominant panel; row boxes remain the only repeated cards
Metric logic: one shared rail, two dividers, value-first typography, icons secondary
Color logic: mint=supported/review, warm gold=gaps, navy=surface, white=primary copy
Motion implication: resolve, illuminate left-to-right, stagger rows, settle recommendation
Responsive rule: rail stays three columns; labels may wrap to two lines
```

Expected: no unclear spacing, hierarchy, or component decision remains before implementation.

### Task 2: Protect The Approved Summary And Preserved Rows

**Files:**
- Modify: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Update the first test with summary and metric assertions**

Keep the restored left-side assertions and add these assertions before the existing assessment-row checks:

```jsx
const assessment = screen.getByRole("article", {
  name: "Secura access-review assessment example",
});

expect(within(assessment).getByText("SECURA AI")).toBeInTheDocument();
expect(within(assessment).getByText("CONTROL REVIEW")).toBeInTheDocument();
expect(
  within(assessment).getByRole("heading", { name: "2 gaps found" }),
).toBeInTheDocument();
expect(within(assessment).getByText("Quarterly access review")).toBeInTheDocument();

const metrics = within(assessment).getByLabelText("Secura review summary");
expect(within(metrics).getByText("4")).toBeInTheDocument();
expect(within(metrics).getByText("Checks completed")).toBeInTheDocument();
expect(within(metrics).getByText("2")).toBeInTheDocument();
expect(within(metrics).getByText("Gaps detected")).toBeInTheDocument();
expect(within(metrics).getByText("3m")).toBeInTheDocument();
expect(within(metrics).getByText("Review time")).toBeInTheDocument();
```

Keep the assertions for all four existing rows and the recommendation unchanged.

- [ ] **Step 2: Protect removal of the dated engine treatment**

Add to the legacy-removal test:

```jsx
expect(screen.queryByTestId("secura-engine-core")).not.toBeInTheDocument();
expect(screen.queryByTestId("secura-engine-signal")).not.toBeInTheDocument();
expect(styles).not.toMatch(/\.secura-engine-shell/);
expect(styles).not.toMatch(/\.secura-engine-core/);
expect(styles).not.toMatch(/\.secura-signal/);
```

- [ ] **Step 3: Run the focused test and confirm the expected failure**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: FAIL because the summary header and metric rail do not exist and the obsolete engine CSS remains.

### Task 3: Build The Summary-Led Assessment

**Files:**
- Modify: `src/components/SecuraAssessment.jsx`
- Test: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Add module-scope metric configuration**

Update Lucide imports and add the summary configuration beside `assessmentRows`:

```jsx
import {
  CircleAlert,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  Sparkles,
} from "lucide-react";

const reviewMetrics = [
  {
    value: "4",
    label: "Checks completed",
    tone: "supported",
    Icon: ClipboardCheck,
  },
  {
    value: "2",
    label: "Gaps detected",
    tone: "attention",
    Icon: CircleAlert,
  },
  {
    value: "3m",
    label: "Review time",
    tone: "supported",
    Icon: Clock3,
  },
];

const rowTransition = (index) => ({
  duration: 0.34,
  delay: 0.66 + index * 0.08,
  ease: [0.16, 1, 0.3, 1],
});
```

- [ ] **Step 2: Replace the engine, connector, and old panel header**

Inside the existing `ai-canvas`, keep `CursorGrid` unchanged. Remove `secura-analysis-label`, `secura-engine-shell`, `secura-engine-core`, and `secura-signal`. Make the article the only foreground structure and use:

```jsx
<motion.article
  className="secura-assessment-panel absolute z-20 overflow-hidden rounded-[28px] border border-mint/20 bg-[#07131f]/95 p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,.34)] backdrop-blur-[14px] max-[760px]:rounded-[22px] max-[760px]:p-4"
  aria-label="Secura access-review assessment example"
  data-motion={motionEnabled ? "sequence" : "static"}
  data-testid="secura-assessment-panel"
  initial={motionEnabled ? { opacity: 0, scale: 0.96, y: 18 } : false}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={panelTransition}
>
  <motion.header
    className="secura-review-header relative z-10"
    initial={motionEnabled ? { opacity: 0, y: 8 } : false}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.34, delay: 0.36 }}
  >
    <div className="flex items-center gap-3">
      <img
        className="size-9 object-contain"
        src="/assets/emblemLogo.svg"
        alt=""
        aria-hidden="true"
      />
      <p className="m-0 font-mono text-[.55rem] tracking-[.12em] uppercase">
        <span className="text-mint">SECURA AI</span>
        <span className="mx-2 text-white/28">·</span>
        <span className="text-white/58">CONTROL REVIEW</span>
      </p>
    </div>
    <h3 className="mt-4 mb-0 text-[2rem] leading-none tracking-[-.045em] text-white max-[760px]:text-[1.65rem]">
      <span className="text-[#f3c76d]">2 gaps</span> found
    </h3>
    <p className="mt-2 mb-0 text-[.72rem] text-[#b9cbd4]">
      Quarterly access review
    </p>
  </motion.header>

  <div
    className="secura-metric-rail relative z-10 mt-4 grid grid-cols-3 rounded-[16px] border border-white/8 bg-white/[.035]"
    aria-label="Secura review summary"
  >
    {reviewMetrics.map(({ value, label, tone, Icon }, index) => (
      <motion.div
        className={`secura-metric secura-metric--${tone} relative flex min-w-0 items-center gap-2.5 px-3 py-3.5 max-[420px]:gap-1.5 max-[420px]:px-2`}
        key={label}
        initial={motionEnabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.48 + index * 0.09 }}
      >
        <Icon aria-hidden="true" />
        <span className="min-w-0">
          <strong className="block text-[1rem] leading-none text-white">{value}</strong>
          <small className="mt-1 block text-[.5rem] leading-[1.35] text-[#9fb3bf]">{label}</small>
        </span>
      </motion.div>
    ))}
  </div>

  <div
    className="relative z-10 mt-3 grid gap-2"
    role="list"
    aria-label="Secura assessment results"
  >
    {assessmentRows.map((item, index) => {
      const StatusIcon =
        item.tone === "supported" ? CircleCheck : CircleAlert;

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
            className={`secura-status secura-status--${item.tone} inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[.48rem] font-medium tracking-[.06em] uppercase`}
            animate={
              motionEnabled && item.tone === "attention"
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(238,179,72,0)",
                      "0 0 0 5px rgba(238,179,72,.1)",
                      "0 0 0 0 rgba(238,179,72,0)",
                    ],
                  }
                : undefined
            }
            transition={{ duration: 0.56, delay: 0.96 + index * 0.08 }}
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
    transition={{
      duration: 0.38,
      delay: 1.04,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <span className="flex items-center gap-1.5 font-mono text-[.49rem] font-medium tracking-[.1em] uppercase text-mint">
      <Sparkles aria-hidden="true" /> Secura recommendation
    </span>
    <p className="mt-2 mb-0 text-[.64rem] leading-[1.55] text-[#d6e2e7]">
      Upload the approved quarterly access review and assign an evidence owner.
    </p>
  </motion.div>
</motion.article>
```

Change the root canvas mobile minimum height from `max-[760px]:min-h-175` to `max-[760px]:min-h-190` so the full summary remains visible.

- [ ] **Step 3: Run the focused test to isolate remaining CSS failures**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: content and motion assertions pass; legacy engine-style assertions fail until Task 4.

### Task 4: Implement The Open Metric Rail And Responsive Geometry

**Files:**
- Modify: `src/styles.css`
- Test: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Remove obsolete engine geometry**

Delete these rules and their mobile overrides:

```css
.secura-engine-shell
.secura-engine-core
.secura-engine-core::before
.secura-engine-core::after
.secura-signal
```

If `rg "ai-core" src/` reports no remaining JSX usage, also remove `.ai-core` and its pseudo-element rules.

- [ ] **Step 2: Replace panel dimensions and add metric-rail styling**

Replace the existing `.secura-assessment-panel` position with:

```css
.secura-assessment-panel {
  inset: 22px;
}
.secura-assessment-panel::before,
.secura-assessment-panel::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  pointer-events: none;
  border-color: rgba(38, 216, 173, 0.46);
}
.secura-assessment-panel::before {
  top: 10px;
  left: 10px;
  border-top: 1px solid;
  border-left: 1px solid;
}
.secura-assessment-panel::after {
  right: 10px;
  bottom: 10px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.secura-metric + .secura-metric::before {
  content: "";
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
}
.secura-metric > svg {
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
}
.secura-metric--supported > svg {
  color: var(--mint);
}
.secura-metric--attention > svg,
.secura-metric--attention strong {
  color: #f3c76d;
}
```

Keep the current status-row and recommendation colors unchanged.

- [ ] **Step 3: Update mobile geometry**

Inside `@media (max-width: 760px)`, replace the old panel geometry with:

```css
.secura-assessment-panel {
  inset: 12px;
}
```

The component root uses `max-[760px]:min-h-190`; do not hide metrics, rows, or the recommendation to reduce the canvas height.

- [ ] **Step 4: Run the focused Secura test**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: 3 tests pass.

### Task 5: Align Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/ROADMAP.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`

- [ ] **Step 1: Update current-state wording**

Use these exact concepts:

```markdown
- README: Secura now uses a summary-led access review with one continuous three-metric rail, four reviewable checks, and one accountable recommendation.
- ARCHITECTURE: SecuraAssessment owns module-scope summary, metric, and row configuration plus the one-shot reveal sequence; CursorGrid lifecycle remains unchanged.
- ROADMAP: Modern Secura summary rail with “2 gaps found”, three compact metrics, preserved assessment rows, responsive containment, and static reduced-motion output.
- MASTER: One dominant panel, small real emblem, one continuous divided metric rail, no oversized engine core or connector, preserved row boxes, and no nested metric cards.
```

- [ ] **Step 2: Inspect documentation consistency**

Run:

```bash
rg -n "2 gaps found|metric rail|oversized engine|SecuraAssessment" README.md docs/ARCHITECTURE.md docs/ROADMAP.md design-system/controllo-compliance-current/MASTER.md
```

Expected: documentation matches the implemented summary-led panel and does not describe the removed active-engine core.

### Task 6: Focused Verification

**Files:**
- Inspect: `src/components/SecuraAssessment.jsx`
- Inspect: `src/sections/SecuraSection.jsx`
- Inspect: `src/styles.css`

- [ ] **Step 1: Run the targeted test**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: all tests in the file pass. Do not run the full suite or production build.

- [ ] **Step 2: Inspect the existing development server**

At 1440×900, 1024×900, 768×1024, and 375×812 verify:

- Restored left copy remains unchanged and readable.
- The small emblem, summary, subtitle, metric rail, all four rows, and recommendation remain visible.
- The rail is one surface with two dividers, not three nested cards.
- Metric labels wrap cleanly and do not collide.
- No oversized engine core or connector remains.
- The sequence settles and does not loop.
- No horizontal overflow, clipping, browser warning, or error appears.
- Reduced motion retains the complete static panel and omits CursorGrid.

- [ ] **Step 3: Record only actual validation**

Append one dated `docs/ROADMAP.md` bullet containing the final targeted test count and the browser widths actually inspected. Do not claim a production build.

## Repository Constraint

This workspace has no Git metadata. Commit, branch, worktree, merge, and pull-request steps are unavailable; preserve the work as focused filesystem edits and report the changed files.
