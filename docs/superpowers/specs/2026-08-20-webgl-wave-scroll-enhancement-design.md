# WebGL Wave and Scroll Enhancement

## Objective

Enhance the existing Controllo “Compliance Current” React homepage with a lightweight WebGL wave in the hero, restrained scroll-linked motion throughout the page, a maintainable website-flow document, and evidence-based cleanup of superseded generated artifacts.

The enhancement must preserve the current page structure, content hierarchy, mint-and-navy identity, accessibility controls, and natural document scrolling.

## Approved direction

Use one reusable, lazy-loaded WebGL shader canvas in the hero. Retain the existing SVG wave dividers as dependable section transitions and as the fallback when WebGL is unavailable. Add scroll motion only where it reinforces the page narrative; do not replace native scrolling or animate layout properties.

The 21st MCP server is not exposed in the current tool session. The component will therefore be implemented natively in React with the same reusable-component boundary that an MCP-generated component would use.

## Architecture

### Wave shader

Create a focused `WaveShader` component that owns a decorative canvas and its rendering lifecycle. The component:

- initializes WebGL only in the browser;
- renders layered mint, teal, and transparent waves that match the current hero palette;
- accepts whether site motion is enabled;
- uses scroll position and optional pointer input as bounded visual parameters;
- suspends its animation loop while off-screen or when the page is hidden;
- lowers render density on small screens;
- cleans up animation frames, observers, listeners, buffers, and shaders on unmount;
- reports no interactive semantics and remains hidden from assistive technology;
- renders nothing when reduced motion is requested or WebGL initialization fails, allowing the existing hero background and SVG divider to remain complete.

Load the shader component lazily so the main content and navigation do not depend on the WebGL bundle.

### Scroll motion

Continue using Motion for viewport reveals and transform-based movement. Add a small number of section-specific treatments:

- hero canvas depth tied to bounded page progress;
- slight counter-movement between hero copy and product scene;
- staggered reveals for operating-loop steps and proof outcomes;
- subtle lateral movement for framework source and output nodes;
- a restrained CTA entrance.

All motion must use opacity and transforms, preserve natural scrolling, stop when the existing pause control is active, and resolve immediately to a complete static state for reduced motion.

### State and control flow

`App` remains the owner of the existing `motionEnabled` state. It passes this state to the hero and all animated sections. `HeroSection` passes the value to `WaveShader`. The shader maintains transient frame, pointer, and scroll values in refs so animation does not trigger React renders.

No application data, network calls, or persistent state are introduced.

## Visual design

The hero shader sits behind the product scene and below readable copy. It uses broad, low-frequency wave bands instead of bright particles or high-frequency distortion. The shader must preserve sufficient contrast behind all text and controls.

Desktop uses gentle pointer drift and scroll depth. Touch devices omit pointer drift. Mobile uses a lower device-pixel ratio cap and fewer rendering steps. The current SVG wave divider remains visible at the hero boundary so the transition to the trust strip stays crisp and predictable.

Scroll animation is deliberately uneven in emphasis: the hero is the signature moment, framework flow is the secondary moment, and other reveals remain quiet. This prevents every section from competing for attention.

## Accessibility and resilience

- Preserve the existing pause-motion control and `prefers-reduced-motion` behavior.
- Mark the canvas `aria-hidden="true"` and keep it non-interactive.
- Do not encode content or status solely in animation.
- Preserve keyboard navigation, focus indicators, and 44-pixel touch targets.
- Pause rendering with `IntersectionObserver` and `visibilitychange`.
- Handle context creation and shader compilation failures without showing an error to visitors.
- Keep the page visually complete without JavaScript, Motion, or WebGL effects.

## Website flow documentation

Create `WEBSITE_FLOW.md` at the project root. It will document:

1. application entry and global motion state;
2. the rendered section order;
3. each section’s narrative purpose;
4. component ownership and data dependencies;
5. navigation anchors and primary actions;
6. animation and fallback behavior;
7. responsive transitions;
8. maintenance guidance for adding, moving, or removing sections.

The document describes the implemented React site, not the superseded standalone prototypes.

## Cleanup scope

Remove only files proven to be generated, duplicated, or superseded and not referenced by source, scripts, configuration, or retained documentation. Expected candidates are:

- `.DS_Store`;
- generated `dist/` output;
- stale screenshot artifacts;
- superseded standalone HTML prototypes;
- duplicate fidelity or prototype audit reports.

Retain the React source, package manifests, capture tooling that remains usable, the design system reference, the current approved specifications and plans, and the new website-flow document. Before deletion, search all project text and configuration for references to each candidate.

## Verification

### Automated checks

- Add focused tests for the shader’s static/fallback path and reduced-motion behavior where practical in jsdom.
- Preserve and run existing component and application tests.
- Run the production build.
- Treat shader compilation or browser console errors as failures.

### Browser checks

Inspect the real page at desktop and mobile widths. Verify:

- hero text and controls retain contrast;
- waves resize without stretching or clipping;
- scrolling stays smooth and native;
- animation stops with the site control and reduced-motion preference;
- the canvas pauses off-screen and resumes safely;
- fallback rendering remains visually complete;
- navigation, framework filters, and other existing interactions still work;
- there is no horizontal overflow;
- no removed artifact is requested or linked.

## Acceptance criteria

- A clearly visible but restrained WebGL wave enriches the hero.
- The shader is isolated, lazy-loaded, and resilient to unavailable WebGL.
- Scroll animation supports the existing narrative without hijacking scrolling.
- Existing pause and reduced-motion paths control all new motion.
- Desktop and mobile remain legible, responsive, and free of overflow.
- `WEBSITE_FLOW.md` accurately documents the implemented site.
- Only proven-unused generated or superseded files are removed.
- Tests and production build pass, and browser inspection reveals no material visual, interaction, or console regressions.
