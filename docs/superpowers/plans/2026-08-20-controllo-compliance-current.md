# Controllo Compliance Current Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build a desktop-first, standalone Controllo homepage prototype with calm cinematic scrolling, logo-derived arrows, wave separators, and deliberate background transitions.

**Architecture:** One editable HTML visualization fragment owns the semantic page, scoped design tokens, SVG product graphics, and local JavaScript interactions. A renderer wraps the fragment as a standalone desktop HTML file. Motion uses requestAnimationFrame, IntersectionObserver, transforms, and opacity while reduced-motion users receive complete static states.

**Tech Stack:** Semantic HTML, scoped CSS, inline SVG, vanilla JavaScript, Codex visualization renderer, Chrome browser inspection.

---

## File map

- Create: variation-2-compliance-current/controllo-compliance-current.html — editable prototype source.
- Create: variation-2-compliance-current/controllo-compliance-current-desktop.html — rendered standalone desktop preview.
- Create: variation-2-compliance-current/prototype-audit.md — verification results.
- Preserve: /Users/ashutoshsingh/Documents/GitHub/Controllo/** — no edits.

### Task 1: Build the semantic page and visual system

**Files:**
- Create: variation-2-compliance-current/controllo-compliance-current.html

- [ ] **Step 1: Define the scoped palette and typography**

Use Mist, Signal Mint, Deep Navy, Aqua, Electric Teal, and Warm Shell as semantic tokens. Use Manrope for sentence-case display and body copy, plus IBM Plex Mono only for evidence metadata.

- [ ] **Step 2: Create the page landmarks**

The fragment root must contain a skip link, announcement, header navigation, main, ten approved sections, and footer:

~~~html
<div id="controllo-compliance-current">
  <a href="#current-main">Skip to content</a>
  <header>...</header>
  <main id="current-main">
    <section id="current-hero">...</section>
    <section id="current-trust">...</section>
    <section id="current-shift">...</section>
    <section id="current-secura">...</section>
    <section id="current-loop">...</section>
    <section id="current-risk">...</section>
    <section id="current-frameworks">...</section>
    <section id="current-proof">...</section>
    <section id="current-demo">...</section>
  </main>
  <footer>...</footer>
</div>
~~~

- [ ] **Step 3: Create product-led visual scenes**

Use inspectable HTML and SVG for the hero readiness view, manual-to-connected transformation, Secura validation, workflow stages, linked risk view, and framework lanes. Product labels use realistic values such as SOC 2 CC6.1, ISO 27001 A.5.15, 42 controls mapped, and 3 owner reviews due.

### Task 2: Add signature waves and arrows

**Files:**
- Modify: variation-2-compliance-current/controllo-compliance-current.html

- [ ] **Step 1: Build reusable inline wave separators**

Each separator contains two SVG paths with different depths. The front path inherits the next section background; the rear path uses a soft Aqua or Teal tint.

- [ ] **Step 2: Build logo-derived arrow currents**

Create paired chevrons from CSS clip paths. Use them in the hero current, workflow connectors, framework lanes, and final CTA gateway. Every arrow indicates direction or evidence reuse.

- [ ] **Step 3: Add a visible motion toggle**

The button interface is:

~~~html
<button type="button" class="current-motion-toggle" aria-pressed="false">Pause motion</button>
~~~

Pressing it sets data-motion="paused" on the root, pauses loops, and stops scroll-linked parallax updates.

### Task 3: Add scroll choreography

**Files:**
- Modify: variation-2-compliance-current/controllo-compliance-current.html

- [ ] **Step 1: Implement reveal state**

IntersectionObserver adds data-visible="true" to elements carrying data-reveal. CSS animates only opacity and transform.

- [ ] **Step 2: Implement parallax state**

One requestAnimationFrame loop reads scroll position, computes section-relative progress, and writes transform custom properties to wave and hero-current layers. Work is skipped when motion is paused or reduced.

- [ ] **Step 3: Implement discrete background states**

IntersectionObserver tracks sections with data-page-tone and updates the root data-tone attribute. CSS transitions the surrounding page surface between Mist, Mint, Navy, Aqua, and Warm Shell states.

- [ ] **Step 4: Implement the before/after convergence**

The sticky scene uses scroll progress to translate scattered evidence items toward the central approved-control record. Natural document scrolling remains available; no wheel or touch event is intercepted.

### Task 4: Add interactions and responsive states

**Files:**
- Modify: variation-2-compliance-current/controllo-compliance-current.html

- [ ] **Step 1: Add framework category selection**

Use native buttons with aria-pressed and an aria-live detail region. Categories are Security, Privacy, AI governance, and Resilience.

- [ ] **Step 2: Add responsive navigation**

Below 820 px, replace desktop navigation with a labeled menu button using aria-expanded. Escape closes the menu and restores focus.

- [ ] **Step 3: Add reduced-motion behavior**

Disable parallax and looping animations in prefers-reduced-motion while keeping complete static arrows, waves, statuses, and mapped controls visible.

### Task 5: Render and verify

**Files:**
- Create: variation-2-compliance-current/controllo-compliance-current-desktop.html
- Create: variation-2-compliance-current/prototype-audit.md

- [ ] **Step 1: Render the standalone desktop preview**

Run:

~~~bash
python3 /Users/ashutoshsingh/.codex/plugins/cache/openai-bundled/visualize/1.0.21/skills/visualize/scripts/render.py variation-2-compliance-current/controllo-compliance-current.html variation-2-compliance-current/controllo-compliance-current-desktop.html
~~~

Expected: the standalone file renders without escaped markup.

- [ ] **Step 2: Verify desktop and mobile**

Inspect at 1440 × 1000 and 375 × 812. Expected: no horizontal overflow, overlap, clipped headings, or unreadable product labels.

- [ ] **Step 3: Verify interactions and accessibility**

Confirm menu, motion toggle, framework filters, skip link, focus states, semantic heading order, aria-live updates, and reduced-motion behavior.

- [ ] **Step 4: Record final audit**

Write concise file:line findings and fixes in prototype-audit.md. Expected: no unresolved critical accessibility or runtime issues and no Controllo repository edits.
