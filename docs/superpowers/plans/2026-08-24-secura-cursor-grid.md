# Secura Viewport Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Secura's pointer-driven cursor grid with an automatic current that runs only while the panel is visible and uses the existing 42px square tile geometry.

**Architecture:** `CursorGrid` gains an explicit viewport activation mode driven by `IntersectionObserver`; that mode continuously energizes a moving point while visible and registers no pointer handlers. `SecuraSection` selects viewport mode and matching grid geometry, while reduced motion continues to omit the canvas and expose the static CSS lattice.

**Tech Stack:** React 19, Canvas 2D, IntersectionObserver, CSS, Vitest, Testing Library

---

### Task 1: Lock the Revised Secura Contract

**Files:**
- Modify: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Extend the test before production changes**

```jsx
const grid = screen.getByTestId("cursor-grid");
expect(grid).toHaveAttribute("data-activation", "viewport");
expect(grid).toHaveAttribute("data-interactive", "false");
```

Keep the existing assertions that the grid is omitted when `motionEnabled` is false and that evidence packets remain in both states.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --run src/sections/SecuraSection.test.jsx`

Expected: FAIL because the existing grid does not expose viewport activation or a non-interactive contract.

### Task 2: Implement Viewport-Driven Animation

**Files:**
- Modify: `src/components/CursorGrid.jsx`
- Modify: `src/sections/SecuraSection.jsx`
- Test: `src/sections/SecuraSection.test.jsx`

- [ ] **Step 1: Replace the interaction props**

Add `activation = "pointer"` and `autoSpeed = 72` component props, include both in `propsRef.current`, and expose the selected contract on the wrapper:

```jsx
data-activation={activation}
data-interactive={activation === "pointer" ? "true" : "false"}
```

- [ ] **Step 2: Align cells to the existing CSS lattice**

In `rebuild`, align the grid to the panel origin:

```jsx
columns = Math.ceil(width / props.cellSize);
rows = Math.ceil(height / props.cellSize);
offsetX = 0;
offsetY = 0;
```

- [ ] **Step 3: Drive the current from visibility**

Track `isVisible` and `animationStartedAt` inside the canvas effect. At the start of `draw`, energize a moving point only in viewport mode:

```jsx
if (props.activation === "viewport" && isVisible) {
  const elapsedSeconds = (now - animationStartedAt) / 1000;
  const travelWidth = width + props.radius * 2;
  const x = (elapsedSeconds * props.autoSpeed) % travelWidth - props.radius;
  const y = height * (0.5 + Math.sin(elapsedSeconds * 0.9) * 0.16);
  energize(x, y, 0.72, now);
}
```

Allow `energize` to receive the frame timestamp. Continue scheduling frames only while viewport mode is visible or cells are fading.

- [ ] **Step 4: Observe visibility and remove pointer behavior in viewport mode**

Create an observer with `threshold: 0.15`. On entry, set `isVisible`, reset `animationStartedAt`, and call `wake()`. On exit, cancel the active frame and set `running` to false. Register and remove `pointermove` and `pointerdown` listeners only when `activation === "pointer"`.

- [ ] **Step 5: Configure Secura to match its existing tiles**

```jsx
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
```

- [ ] **Step 6: Run the focused test and verify it passes**

Run: `npm test -- --run src/sections/SecuraSection.test.jsx`

Expected: PASS with the viewport and reduced-motion contracts covered.

### Task 3: Correct Documentation and Perform Visual QA

**Files:**
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/ROADMAP.md`

- [ ] **Step 1: Replace pointer/click descriptions**

Document that the grid uses `IntersectionObserver`, runs only while visible, uses the existing 42px square geometry, registers no user interaction in Secura, and falls back to static CSS under reduced motion.

- [ ] **Step 2: Verify desktop and mobile rendering**

At approximately 1440px and 375px widths, confirm that the current animates without input, remains clipped, does not obscure the AI core or packets, and uses the same tile geometry as the static fallback. Confirm no relevant console errors.

- [ ] **Step 3: Respect repository validation limits**

Do not run `npm run build` or the full test suite without explicit user authorization. Do not commit because this workspace has no Git metadata.
