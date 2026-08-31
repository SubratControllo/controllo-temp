# Navbar Signal Lock Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace the first-load WebGL wave with a calm, sub-second navbar entrance built from the existing Controllo logo assets.

**Architecture:** A focused `NavbarIntro` component owns the Motion variants, completion timer, reduced-motion fallback, and temporary emblem overlay. `SiteHeader` retains all navigation state and handlers while using the intro primitives to sequence its existing surface, logo, navigation, and action area. The abandoned wave components and OGL dependency are removed.

**Tech Stack:** React 19, Tailwind CSS v4, Motion for React, Vitest, Testing Library

---

### Task 1: Define the intro behavior

**Files:**
- Create: `src/components/NavbarIntro.test.jsx`
- Create: `src/components/NavbarIntro.jsx`
- Delete: `src/components/NavbarWaveIntro.test.jsx`

- [x] **Step 1: Write the focused tests**

Test that motion-enabled rendering starts in the active phase, removes the temporary emblem after 950 milliseconds, preserves child content, and clears its timer on unmount. Test separately that reduced motion renders the completed static state without an emblem overlay.

- [x] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --run src/components/NavbarIntro.test.jsx`

Expected: FAIL because `NavbarIntro.jsx` does not exist.

- [x] **Step 3: Implement the intro primitives**

Create `NavbarIntro`, `NavbarIntroLogo`, `NavbarIntroItem`, and `NavbarIntroNav`. Use `motion.div` and `motion.nav` with these timings:

```jsx
const surfaceVariants = {
  hidden: { opacity: 0, y: -8, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
  }
};
```

The navigation container uses `delayChildren: 0.28` and `staggerChildren: 0.04`. The logo clips from the left while `/assets/emblemLogo.svg` settles over the existing emblem. The overlay unmounts after 950 milliseconds. Reduced motion returns the same markup without initial animation or overlay.

- [x] **Step 4: Run the focused test**

Run: `npm test -- --run src/components/NavbarIntro.test.jsx`

Expected: PASS.

### Task 2: Integrate Signal Lock into the header

**Files:**
- Modify: `src/components/SiteHeader.jsx`

- [x] **Step 1: Replace the wave layer**

Replace the navbar surface `div` with `NavbarIntro`, remove `NavbarWaveIntro`, wrap the logo with `NavbarIntroLogo`, use `NavbarIntroNav` for the primary navigation, and render each desktop navigation entry through `NavbarIntroItem` or an equivalent motion-enabled link. Wrap the action area in one final `NavbarIntroItem`.

- [x] **Step 2: Add the CTA edge highlight**

Add one pointer-inert, absolute mint border layer inside the desktop readiness-tour link. Animate its opacity and scale once during the intro; keep the link text and icon above it. Do not change the CTA copy or destination.

- [x] **Step 3: Re-run the focused test**

Run: `npm test -- --run src/components/NavbarIntro.test.jsx`

Expected: PASS.

### Task 3: Remove the abandoned renderer

**Files:**
- Delete: `src/components/GradientWaves.jsx`
- Delete: `src/components/NavbarWaveIntro.jsx`
- Modify: `package.json`
- Modify: `package-lock.json`

- [x] **Step 1: Remove OGL**

Run: `npm uninstall ogl`

Expected: `ogl` is absent from both package files and no unrelated dependency changes appear.

- [x] **Step 2: Confirm no wave references remain**

Run: `rg "GradientWaves|NavbarWaveIntro|from 'ogl'|from \"ogl\"" src package.json`

Expected: no matches.

### Task 4: Targeted verification

**Files:**
- Inspect: `src/components/NavbarIntro.jsx`
- Inspect: `src/components/SiteHeader.jsx`

- [x] **Step 1: Run the focused test**

Run: `npm test -- --run src/components/NavbarIntro.test.jsx`

Expected: PASS.

- [x] **Step 2: Verify the existing development server**

Reload the homepage and confirm the navbar settles into place, the emblem locks in, navigation labels stagger, and the action arrives last. Confirm the animation does not replay after client-side navigation.

- [x] **Step 3: Verify interaction and layout**

Confirm dropdown hover/click, keyboard focus, mobile-menu behavior, reduced-motion fallback, and absence of horizontal overflow. Confirm no runtime errors appear.

- [x] **Step 4: Respect repository validation limits**

Do not run the full test suite or production build unless the user explicitly requests it.

### Task 5: Add the CTA Shine

**Files:**
- Create: `src/components/HeaderCtaContent.jsx`
- Create: `src/components/HeaderCtaContent.test.jsx`
- Modify: `src/components/SiteHeader.jsx`
- Modify: `src/styles.css`

- [x] **Step 1: Write the focused component tests**

Verify that motion-enabled rendering exposes a pointer-inert shine layer, the accessible label, and the original arrow. Verify that reduced motion omits the moving shine.

- [x] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --run src/components/HeaderCtaContent.test.jsx`

Expected: FAIL because `HeaderCtaContent.jsx` does not exist.

- [x] **Step 3: Implement the decorative component**

Render the label, original Lucide arrow, and a conditional white-gradient shine layer. Keep the shine behind the CTA content and clip it to the rounded button. Read `useSiteMotion`; when motion is disabled, omit the moving layer. Define only the shared `header-cta-shine` keyframe in `styles.css`.

- [x] **Step 4: Integrate both readiness-tour actions**

Add the `group/brand-cta`, positioning, isolation, overflow, stable-color, and 1.5-percent hover/focus scale classes to both header actions. Render `HeaderCtaContent` inside each link while preserving CTA text, routes, click behavior, and original arrow movement. Reduced motion removes shine, scale, lift, and arrow translation.

- [x] **Step 5: Run focused verification**

Run: `npm test -- --run src/components/HeaderCtaContent.test.jsx src/components/NavbarIntro.test.jsx`

Expected: 2 test files pass with 5 tests.

- [x] **Step 6: Verify in the browser**

Check desktop mouse hover, keyboard focus, hover exit, the mobile-menu CTA, reduced-motion output, horizontal overflow, and browser warnings/errors. Do not run the production build or full test suite.
