# Hero Content And CTA Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved Phase 1 hero message, proof strip, and demo-first CTA hierarchy while documenting the gated trial phases.

**Architecture:** Keep the existing `HeroSection` Focus Stack and interaction classes intact; change only its narrative content, CTA label, and proof-strip markup. Align the shared header and `/demo` request surface with the same Phase 1 promise, then record later CTA promotions as planned—not implemented—in the roadmap.

**Tech Stack:** React 19, React Router, Tailwind CSS v4, Vitest, Testing Library, Motion React

---

## File Structure

- Modify `src/sections/HeroSection.jsx`: own Phase 1 hero copy, CTA hierarchy, and quantitative proof strip.
- Modify `src/sections/HeroSection.test.jsx`: protect the approved copy, links, CTA treatments, and proof figures.
- Modify `src/components/SiteHeader.jsx`: align both responsive header CTA labels with the demo-request capability.
- Modify `src/pages/DemoPage.jsx`: align route metadata with the demo request promise.
- Modify `src/components/LeadForm.jsx`: align the form submission label with the demo request promise.
- Modify `src/App.test.jsx`: verify the shared header and demo route use consistent Phase 1 language.
- Modify `README.md`: record the new implemented homepage messaging baseline.
- Modify `docs/ROADMAP.md`: record Phase 1 status and the release gates for Phases 2 and 3.
- Modify `design-system/controllo-compliance-current/MASTER.md`: preserve the frozen visual system while recording the approved CTA hierarchy.

### Task 1: Protect The Approved Hero Content

**Files:**
- Modify: `src/sections/HeroSection.test.jsx`

- [ ] **Step 1: Add the failing Phase 1 content test**

Add this test at the beginning of the `HeroSection focus stack` suite and update the existing primary CTA lookup from `/See your readiness path/i` to `/Request a Demo/i`:

```jsx
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
  expect(screen.getByText("100+")).toBeInTheDocument();
  expect(screen.getByText("7,000+")).toBeInTheDocument();
  expect(screen.getByText("200,000+")).toBeInTheDocument();
  expect(screen.queryByText("30+ frameworks")).not.toBeInTheDocument();
  expect(screen.queryByText("Build readiness you can prove.")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted test and confirm the new assertions fail**

Run:

```bash
npm test -- --run src/sections/HeroSection.test.jsx
```

Expected: FAIL because the old eyebrow, headline, CTA, and proof strip are still rendered.

### Task 2: Implement The Phase 1 Hero

**Files:**
- Modify: `src/sections/HeroSection.jsx`
- Test: `src/sections/HeroSection.test.jsx`

- [ ] **Step 1: Replace only the hero narrative and proof content**

Keep the existing `Reveal`, Motion spans, CTA classes, Focus Stack, and reduced-motion branches. Replace their children with:

```jsx
<p className="eyebrow">Continuous compliance. Clear audit readiness.</p>
<h1>
  <motion.span
    initial={motionEnabled ? { opacity: 0, y: 30 } : false}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    Fast Compliance,
  </motion.span>{" "}
  <motion.span
    initial={motionEnabled ? { opacity: 0, y: 30 } : false}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.12 }}
  >
    Smarter Audit Readiness
  </motion.span>
</h1>
<p className="lede mt-6.5">
  Connect controls to policies, evidence, risks, owners, and live cloud
  signals across cybersecurity, privacy, and AI governance. Secura AI turns
  that context into clear, reviewable insights and next actions.
</p>
```

Change the existing primary CTA child to:

```jsx
<HeaderCtaContent
  iconTestId="hero-primary-cta-icon"
  shineTestId="hero-primary-cta-shine"
>
  Request a Demo
</HeaderCtaContent>
```

Keep the secondary CTA exactly as the current minimal `Explore the platform` ghost button.

Replace the existing highlights with:

```jsx
<div
  className="mt-10 grid max-w-185 grid-cols-3 gap-5 text-navy max-[760px]:grid-cols-1 max-[760px]:gap-3"
  aria-label="Platform proof"
>
  <span className="grid gap-1 border-l border-navy/12 pl-4">
    <strong className="text-[1.05rem] leading-none">100+</strong>
    <small className="text-[.68rem] leading-[1.45] text-[#4a6072]">Global and regional frameworks</small>
  </span>
  <span className="grid gap-1 border-l border-navy/12 pl-4">
    <strong className="text-[1.05rem] leading-none">7,000+</strong>
    <small className="text-[.68rem] leading-[1.45] text-[#4a6072]">Structured compliance controls</small>
  </span>
  <span className="grid gap-1 border-l border-navy/12 pl-4">
    <strong className="text-[1.05rem] leading-none">200,000+</strong>
    <small className="text-[.68rem] leading-[1.45] text-[#4a6072]">Control mappings powering smarter compliance</small>
  </span>
</div>
```

- [ ] **Step 2: Run the focused hero test**

Run:

```bash
npm test -- --run src/sections/HeroSection.test.jsx
```

Expected: PASS for the full hero test file, including the unchanged Focus Stack and interaction assertions.

### Task 3: Align The Shared Demo Request Language

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/components/SiteHeader.jsx`
- Modify: `src/pages/DemoPage.jsx`
- Modify: `src/components/LeadForm.jsx`

- [ ] **Step 1: Add the failing shared-language test**

Add this test to `src/App.test.jsx`:

```jsx
it("uses accurate Phase 1 demo request language", async () => {
  renderRoute("/demo");

  expect(
    await screen.findByRole("heading", {
      name: /Bring one real workflow. Leave with a clearer path./i,
    }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /Request a Demo/i })).toHaveLength(2);
  expect(
    screen.getByRole("button", { name: /Request my demo/i }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted application test and confirm failure**

Run:

```bash
npm test -- --run src/App.test.jsx
```

Expected: FAIL because the header and form still use readiness-tour labels.

- [ ] **Step 3: Apply the Phase 1 labels without changing behavior**

In both responsive header CTA instances, use:

```jsx
<HeaderCtaContent>Request a Demo</HeaderCtaContent>
```

In `DemoPage`, use:

```jsx
<PageMeta
  title="Request a demo"
  description="Request a focused Controllo walkthrough shaped around your compliance program and readiness priorities."
/>
```

In `LeadForm`, keep the loading state unchanged and replace only the idle submission label:

```jsx
{state === "loading" ? "Sending…" : "Request my demo"}
```

- [ ] **Step 4: Run the targeted application test**

Run:

```bash
npm test -- --run src/App.test.jsx
```

Expected: PASS for the application test file.

### Task 4: Document The CTA Roadmap

**Files:**
- Modify: `README.md`
- Modify: `docs/ROADMAP.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`

- [ ] **Step 1: Update current-state documentation**

In `README.md`, update the hero status bullet to include the approved two-tone “Fast Compliance, Smarter Audit Readiness” narrative, quantitative proof strip, and Phase 1 demo-request hierarchy without claiming direct booking or trial availability.

In the current baseline of `docs/ROADMAP.md`, add this implemented capability:

```markdown
- Homepage hero content aligned to the two-tone “Fast Compliance, Smarter Audit Readiness” narrative, with governed framework/control/mapping proof and a demo-request primary action plus low-friction platform exploration
```

- [ ] **Step 2: Add the gated conversion phases to the roadmap**

Add this roadmap section without marking future phases as implemented:

```markdown
## Conversion CTA Phases

### Phase 1 — Demo request (current)

- Hero primary: **Request a Demo**
- Hero secondary: **Explore the Platform**
- Navbar primary: **Request a Demo**
- Rename the action to **Book a Demo** only when visitors can select a calendar time directly.

### Phase 2 — Activated free trial (planned)

- Release only after signup, workspace creation, and a useful guided first-session state are functional.
- Navbar keeps **Book a Demo** prominent and adds **Start Free Trial** as a quiet action.
- Hero promotes **Start Free Trial**, keeps **Book a Demo** secondary, and moves **Explore the Platform** to a tertiary text link.

### Phase 3 — Evidence-led optimization (planned)

- Compare trial activation, first setup completion, demo booking completion, qualified opportunities, and influenced pipeline.
- Promote **Start Free Trial** globally only if self-serve activation consistently succeeds without sales assistance.
```

- [ ] **Step 3: Record the hierarchy in the design system**

Under the Hero Focus Stack guidance in `MASTER.md`, add:

```markdown
- Phase 1 uses one dominant demo-request CTA and the existing minimal **Explore the Platform** ghost action. Do not expose **Book a Demo** before direct scheduling or **Start Free Trial** before useful onboarding exists; later CTA promotions follow `docs/ROADMAP.md`.
```

- [ ] **Step 4: Inspect documentation consistency**

Run:

```bash
rg -n "Fast Compliance, Smarter Audit Readiness|Conversion CTA Phases|Request a Demo|Start Free Trial" README.md docs/ROADMAP.md design-system/controllo-compliance-current/MASTER.md
```

Expected: current state is described as demo request; booking and trial are explicitly planned and gated.

### Task 5: Focused Verification

**Files:**
- Inspect: `src/sections/HeroSection.jsx`
- Inspect: `src/components/SiteHeader.jsx`
- Inspect: `src/pages/DemoPage.jsx`
- Inspect: `src/components/LeadForm.jsx`

- [ ] **Step 1: Run only the affected tests together**

Run:

```bash
npm test -- --run src/sections/HeroSection.test.jsx src/App.test.jsx
```

Expected: both files pass. Do not run the full suite or production build.

- [ ] **Step 2: Inspect desktop and mobile in the existing development server**

At 1440px and 375px widths, verify:

- The new headline and supporting copy remain readable beside the Focus Stack.
- Proof items fit without horizontal overflow.
- **Request a Demo** is visually dominant.
- **Explore the Platform** retains its minimal non-transform hover.
- Header and hero links target `/demo`; exploration targets `/platform`.
- The Focus Stack animation and reduced-motion rendering remain unchanged.

- [ ] **Step 3: Record the validation actually performed**

Add a dated validation bullet to `docs/ROADMAP.md` containing only the targeted test count and browser sizes actually checked. Do not claim a production build.

## Repository Constraint

This workspace does not contain Git metadata, so the frequent commit steps normally required by the planning workflow cannot be performed. Preserve changes as focused filesystem edits and report every modified file at handoff.
