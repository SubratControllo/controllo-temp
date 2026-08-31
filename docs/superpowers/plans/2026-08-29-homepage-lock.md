# Homepage Lock Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finalize and freeze a conversion-focused homepage that accurately presents Controllo's governance domains and shared platform capabilities.

**Architecture:** Keep the frozen hero, header, and Secura animation intact. Put verified homepage content in `src/data/siteContent.js`, render the interactive product story in focused section components, and extend the existing product registry so every internal CTA has a valid route.

**Tech Stack:** React 19, React Router 7, Tailwind CSS 4, Motion, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-08-29-homepage-lock-design.md`

## Global Constraints

- Do not change the frozen hero layer model, header interaction model, or Secura right-side animation.
- Do not wire Stripe or the product onboarding repository in this pass.
- Do not add dependencies or run a production build.
- Preserve reduced motion, keyboard access, visible focus, and 320px horizontal fit.
- Publish only claims and integrations supported by the repository and metadata audit.

---

### Task 1: Lock product and conversion content

**Files:**
- Modify: `src/data/siteContent.js`
- Modify: `src/data/enterpriseContent.js`
- Modify: `src/data/staticPages.js`
- Modify: `src/App.jsx`
- Modify: `public/sitemap.xml`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: `platformDomains`, `connectedCapabilities`, `blogArticles`, and `homepageLinks` consumed by homepage sections.
- Produces: registry-backed routes for cloud monitoring and the three governance-domain solution pages.

- [x] Add a failing route test for `/solutions/privacy`, `/platform/cloud-monitoring`, `/privacy-policy`, and the legacy `/privacy` redirect.
- [x] Run `npm test -- --run src/App.test.jsx` and confirm the new assertions fail.
- [x] Add the verified content collections and product routes, move legal privacy to `/privacy-policy`, and add the redirect.
- [x] Update navigation, footer destinations, verified integration listings, and sitemap entries.
- [x] Run `npm test -- --run src/App.test.jsx` and confirm the route assertions pass.

### Task 2: Build the connected-platform section

**Files:**
- Create: `src/sections/PlatformSection.jsx`
- Create: `src/sections/PlatformSection.test.jsx`
- Modify: `src/pages/HomePage.jsx`

**Interfaces:**
- Consumes: `platformDomains` and `connectedCapabilities` from `src/data/siteContent.js`.
- Produces: `PlatformSection({ motionEnabled })`, a manually selected, fixed-height product panel.

- [x] Write failing tests for the Cybersecurity default state, Privacy selection, keyboard selection, contextual CTA, and lack of simultaneous domain descriptions.
- [x] Run `npm test -- --run src/sections/PlatformSection.test.jsx` and confirm the test fails because the component does not exist.
- [x] Implement the equal-column section with accessible domain controls, reduced-motion-aware transitions, and product-state previews.
- [x] Add Risk Management and Cloud Monitoring as compact connected capabilities below the domain panel.
- [x] Replace the Shift, standalone Risk, and unapproved Proof sections in `HomePage.jsx`.
- [x] Run the focused test and confirm it passes.

### Task 3: Finish Secura alignment and homepage conversion

**Files:**
- Modify: `src/sections/SecuraSection.jsx`
- Modify: `src/sections/SecuraSection.test.jsx`
- Create: `src/sections/BlogSection.jsx`
- Modify: `src/sections/CtaSection.jsx`
- Modify: `src/sections/FrameworkSection.jsx`
- Modify: `src/pages/HomePage.jsx`

**Interfaces:**
- Consumes: `blogArticles` and `homepageLinks` from `src/data/siteContent.js`.
- Preserves: `SecuraAssessment` animation and fixed right-side graphic frame.

- [x] Add a failing Secura assertion that Review is the single emphasized step and both columns expose centered width constraints.
- [x] Run `npm test -- --run src/sections/SecuraSection.test.jsx` and confirm the assertion fails.
- [x] Center the existing Secura text and graphic inside equal halves and refine only the three-step strip.
- [x] Add the static WordPress blog preview and dual conversion actions.
- [x] Add framework and integration destination links without changing the framework-flow interaction.
- [x] Run focused Secura, platform, hero, and application tests.

### Task 4: Verify and freeze the baseline

**Files:**
- Modify: `README.md`
- Modify: `docs/ROADMAP.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`

**Interfaces:**
- Produces: a documented homepage freeze boundary for later agents.

- [x] Inspect the homepage at 375px, 768px, 1024px, and 1440px in the existing development server.
- [x] Verify domain controls with mouse and keyboard, reduced-motion content, CTA destinations, text fit, and horizontal overflow.
- [x] Run the narrowest affected automated tests; do not run the production build.
- [x] Record the verified homepage composition, validation evidence, and remaining trial-link limitation in the project documentation.

### Task 5: Connect the homepage Secura story to its product page

**Status:** Completed and verified on 2026-08-29.

**Files:**
- Modify: `src/sections/SecuraSection.jsx`
- Modify: `src/sections/SecuraSection.test.jsx`
- Modify after verification: `docs/ROADMAP.md`

**Interfaces:**
- Consumes: the existing registry-backed `/platform/secura-ai` route.
- Produces: one contextual **Explore Secura AI** link beneath the Review–Identify–Recommend strip.
- Preserves: the frozen hero, Secura copy hierarchy, equal-column alignment, and the complete `SecuraAssessment` animation.

- [x] **Step 1: Add router-aware test setup and a failing destination assertion**

Import `MemoryRouter` in `src/sections/SecuraSection.test.jsx` and render `SecuraSection` through a small shared helper so every existing test continues to supply router context:

```jsx
import { MemoryRouter } from "react-router-dom";

function renderSecura(motionEnabled = false) {
  return render(
    <MemoryRouter>
      <SecuraSection motionEnabled={motionEnabled} />
    </MemoryRouter>,
  );
}
```

Replace direct `render(<SecuraSection ... />)` calls with `renderSecura(...)`, then add this assertion to the focused narrative test:

```jsx
expect(
  screen.getByRole("link", { name: "Explore Secura AI" }),
).toHaveAttribute("href", "/platform/secura-ai");
```

- [x] **Step 2: Run the focused test and verify the new assertion fails**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx
```

Expected: FAIL because the **Explore Secura AI** link is not rendered yet; the existing Secura behavior assertions should remain otherwise unchanged.

- [x] **Step 3: Add the single contextual CTA without changing the animation**

Import `Link` from `react-router-dom` and `ArrowRight` from `lucide-react` in `src/sections/SecuraSection.jsx`. Immediately after the closing `</ul>` for the review-flow strip, add:

```jsx
<Link
  className="mt-6 inline-flex min-h-11 items-center gap-2 text-[.76rem] font-medium text-mint transition-colors hover:text-white [&>svg]:size-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
  to="/platform/secura-ai"
>
  Explore Secura AI <ArrowRight aria-hidden="true" />
</Link>
```

Do not add a hero link, make the assessment canvas clickable, change `SecuraAssessment`, or add a second Secura CTA.

- [x] **Step 4: Run the focused regression tests**

Run:

```bash
npm test -- --run src/sections/SecuraSection.test.jsx src/sections/HeroSection.test.jsx src/App.test.jsx
```

Expected: all focused Secura, frozen-hero, and route tests pass.

- [x] **Step 5: Verify the CTA in the existing development server**

At 1440×900 and 375×812, confirm that the link sits beneath the strip without shifting or clipping the right graphic, remains keyboard-focusable, and introduces no horizontal overflow. Activate it and confirm the destination is `/platform/secura-ai`. Check the browser console for warnings or errors.

- [x] **Step 6: Record the verified connection**

After tests and browser QA pass, add the Secura product-page link and validation evidence to the 2026-08-29 entry in `docs/ROADMAP.md`. Do not run a production build, and do not attempt a commit while this project directory has no Git metadata.

### Task 6: Refine and lock the Secura narrative signal rail

**Status:** Completed and verified on 2026-08-29.

**Files:**
- Modify: `src/sections/SecuraSection.jsx`
- Modify: `src/sections/SecuraSection.test.jsx`
- Modify: `docs/superpowers/specs/2026-08-29-homepage-lock-design.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`
- Modify: `docs/ROADMAP.md`

**Interfaces:**
- Produces: a compact numbered Review / Identify / Recommend signal rail with `aria-current="step"` on Review.
- Preserves: the Secura CTA, equal-column layout, product animation, reduced-motion behavior, and `/platform/secura-ai` destination.

- [x] Replace the old visual assertions with a failing connected-rail contract test.
- [x] Verify the test fails against the previous segmented strip.
- [x] Implement the restrained desktop node rail and mobile vertical connector using existing Tailwind utilities.
- [x] Run `npm test -- --run src/sections/SecuraSection.test.jsx src/sections/HeroSection.test.jsx src/App.test.jsx` and confirm all 40 focused tests pass.
- [x] Inspect the rendered section at 1440×900, 375×812, and 320×800; confirm zero horizontal overflow and no browser warnings or errors.
- [x] Record and freeze the approved rail treatment in the specification, design system, and roadmap.

### Task 7: Remove the nested Secura step card and unify the connector

**Status:** Completed and verified on 2026-08-29.

**Files:**
- Modify: `src/sections/SecuraSection.jsx`
- Modify: `src/sections/SecuraSection.test.jsx`
- Modify: `docs/superpowers/specs/2026-08-29-homepage-lock-design.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`
- Modify: `docs/ROADMAP.md`

**Interfaces:**
- Produces: one ordered process rail with a parent-owned connector, opaque masking nodes, and a restrained Review wash.
- Preserves: all Secura copy, the CTA and route, equal-column alignment, and the complete right-side product animation.

- [x] Replace the nested-card assertion with a failing structural rail contract.
- [x] Verify the contract fails against the previous unordered list and per-step connector treatment.
- [x] Implement one horizontal connector on desktop and one vertical spine on mobile with no per-step cards.
- [x] Add a one-time connector draw and node-settle sequence using the existing Motion dependency and immediate reduced-motion state.
- [x] Inspect at 1440×900, 375×812, and 320×800; confirm aligned nodes, zero overflow, and no browser warnings or errors.
- [x] Record the final structural treatment in the homepage specification, design system, and roadmap.

### Task 8: Replace the framework flow with a proof-led ledger

**Status:** Completed and verified on 2026-08-29.

**Files:**
- Modify: `src/sections/FrameworkSection.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/data/siteContent.js`
- Modify: `src/styles.css`
- Modify: `docs/superpowers/specs/2026-08-29-homepage-lock-design.md`
- Modify: `design-system/controllo-compliance-current/MASTER.md`
- Modify: `docs/ROADMAP.md`

**Interfaces:**
- Consumes: framework and integration registries from `src/data/enterpriseContent.js`.
- Produces: one static proof ledger with verified scale, representative framework coverage, implemented integration coverage, and directory links.
- Removes: homepage framework path filters, vague source/output nodes, the oversized center bubble, and perpetual dashed-path motion.

- [x] Replace the old filter interaction test with a failing proof-led section contract.
- [x] Verify the contract fails because the existing section has no named proof region or grouped coverage lists.
- [x] Implement the registry-backed asymmetric proof ledger with no new dependency or autoplay interaction.
- [x] Remove obsolete framework-flow content exports and CSS visualization rules.
- [x] Inspect 1440×900, 1024×900, 768×1024, and 375×812 layouts with zero horizontal overflow and no browser warnings or errors.
- [x] Record and freeze the approved treatment in the specification, design system, roadmap, and implementation plan.
