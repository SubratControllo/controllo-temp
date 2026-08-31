# Controllo Compliance Current React Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved “Compliance Current” prototype into a maintainable React/Vite landing-page application with Motion-powered scrolling, accessible interactions, and production-grade responsive behavior.

**Architecture:** A standalone Vite app owns the marketing page and remains isolated from the existing Controllo applications. Page sections are focused React components; reusable brand, button, wave, and reveal primitives keep visual behavior consistent. Motion for React handles viewport reveals and scroll transforms, while CSS owns looping ambient motion and reduced-motion fallbacks.

**Tech Stack:** React, Vite, Motion for React, Lucide React, Vitest, Testing Library, CSS custom properties.

---

## File map

- Create: `package.json`, `vite.config.js`, `index.html`
- Create: `src/main.jsx`, `src/App.jsx`, `src/styles.css`
- Create: `src/components/BrandMark.jsx`, `src/components/SiteHeader.jsx`, `src/components/WaveDivider.jsx`, `src/components/Reveal.jsx`
- Create: `src/sections/HeroSection.jsx`, `TrustStrip.jsx`, `ShiftSection.jsx`, `SecuraSection.jsx`, `OperatingLoopSection.jsx`, `RiskSection.jsx`, `FrameworkSection.jsx`, `ProofSection.jsx`, `CtaSection.jsx`
- Create: `src/data/siteContent.js`
- Create: `src/test/setup.js`, `src/App.test.jsx`
- Preserve: `controllo-compliance-current.html`, `controllo-compliance-current-desktop.html`, `docs/superpowers/specs/**`

### Task 1: Scaffold the isolated React app

- [ ] Create the package manifest with `dev`, `build`, `preview`, and `test` scripts.
- [ ] Add React, Motion, Lucide, Vite, Vitest, jsdom, and Testing Library dependencies.
- [ ] Configure Vite and the DOM test environment.
- [ ] Create the root HTML document with a viewport meta tag, description, and `#root` mount.
- [ ] Run `npm run build`; expect an initial valid Vite bundle.

### Task 2: Establish the component and design system

- [ ] Define the approved palette, typography, spacing, radius, and elevation tokens in `src/styles.css`.
- [ ] Implement `BrandMark`, `SiteHeader`, `WaveDivider`, and `Reveal` primitives.
- [ ] Add a labeled motion control that toggles `data-motion` and respects `prefers-reduced-motion`.
- [ ] Add responsive navigation with native buttons, `aria-expanded`, Escape handling, and focus-visible states.
- [ ] Write tests proving menu and motion-control state changes.

### Task 3: Implement the approved narrative sections

- [ ] Build the hero with its readiness interface, workflow events, CTA hierarchy, and logo-derived arrow motif.
- [ ] Build the trust, before/after, Secura, operating-loop, unified-risk, framework-flow, proof, CTA, and footer sections in the approved order.
- [ ] Keep headings sentence case and use uppercase monospace only for technical labels.
- [ ] Extract repeated content arrays into `src/data/siteContent.js` and render them with stable keys.
- [ ] Keep all UI text and product scenes inspectable HTML/SVG rather than screenshots.

### Task 4: Add motion and interaction behavior

- [ ] Use Motion `useScroll` and `useTransform` for hero depth, waves, and the before/after convergence.
- [ ] Use viewport-triggered `Reveal` transitions for section choreography.
- [ ] Animate SVG wrappers rather than individual paths where possible.
- [ ] Implement framework filters with `aria-pressed` and a live status message.
- [ ] Ensure paused and reduced-motion states produce complete static compositions.
- [ ] Write tests proving framework filtering updates active paths and status text.

### Task 5: Verify production quality

- [ ] Run `npm test -- --run`; expect all interaction tests to pass.
- [ ] Run `npm run build`; expect no build errors or warnings caused by application code.
- [ ] Start Vite and inspect the page at 1440 × 1000 and 375 × 812.
- [ ] Verify no horizontal overflow, clipped copy, inaccessible controls, or console errors.
- [ ] Compare hero, shift, Secura, framework, and CTA sections with the accepted prototype and record fixes in `react-fidelity-ledger.md`.

## Remotion boundary

Remotion is not part of the interactive page bundle in this phase. It will be introduced as a separate composition only when Controllo needs a rendered hero film, product walkthrough, GIF replacement, or social asset. Browser interaction and scroll choreography remain in Motion for React so playback is tied to the visitor rather than a video timeline.
