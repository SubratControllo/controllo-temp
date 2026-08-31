# Hero Dashboard Focus Stack Design

## Goal

Make the hero communicate that compliance readiness is actively becoming visible. Preserve the current copy, layout, foreground readiness panel, event cards, shader, and wave divider while adding the real Controllo dashboard as a contextual rear layer.

## Approved Direction

Use a three-layer Focus Stack on the right side of the hero:

1. A blurred, low-contrast dashboard image establishes real product context.
2. The existing orbit treatment provides separation and brand atmosphere.
3. The existing readiness panel and event cards remain the sharp, primary foreground.

The composition must remain calm and credible. Motion should describe depth and activation, not continuous floating decoration.

## Approved Perspective Revision

- Enlarge the dashboard on the right to a `1240 × 650` desktop plane and crop it so roughly half of the interface remains visible.
- Raise the dashboard opacity enough for its controls and charts to register while keeping the readiness graphic dominant.
- Treat the dashboard as the source plane for the foreground graphics. After the dashboard begins settling, the readiness panel lifts forward from the same angle and moves into its existing final position.
- Keep the three existing event cards around the readiness panel. After the panel settles, each card pops forward in its final position using only depth, scale, and opacity; cards do not travel laterally through the panel.
- Complete the full extraction sequence in approximately 1.1 seconds and leave every layer still. Do not add a persistent float loop.

## Asset

- Use `/assets/dashboard.webp` in the rendered hero.
- Keep `/assets/dashboard.svg` as the source asset, but do not load it on the page because it contains a 7.8 MB embedded PNG.
- The WebP is decorative, uses an empty alt value, is hidden from assistive technology, and does not receive pointer events.
- Load it eagerly with high fetch priority because it is visible in the first viewport, while keeping the existing shader lazy-loaded.

## Visual Composition

- Place the dashboard inside the existing right-side hero scene, behind the orbit and foreground panel.
- Crop toward the upper overview metrics and readiness trend rather than trying to display the complete dashboard.
- Keep the blur and opacity constant. Animate only transforms and opacity so the browser does not recompute blur on every frame.
- Use a soft edge mask so the white dashboard does not form a visible rectangular plate.
- Keep the foreground panel fully legible. The dashboard must read as product context, not as a second competing interface.
- On mobile, use a tighter crop and lower opacity; retain the layer only while it remains readable and does not increase the hero height.

## Motion

### Entrance

- The dashboard enters first with a perspective rotation, forward slide, scale settle, and opacity fade.
- A narrow brand-colored focus sweep crosses the dashboard once after it appears.
- The readiness panel starts aligned with the dashboard plane, then scales and rotates forward into its existing foreground position.
- After the readiness panel settles, the event cards pop forward in place with a 100 millisecond stagger while preserving their established final positions.
- The sweep does not loop.
- The readiness panel and event cards do not loop after settling.

### Scroll Depth

- Use the hero section's existing `useScroll` progress.
- Move the dashboard 18 pixels over the hero's scroll range.
- Move the foreground scene 48 pixels over the same range.
- Apply a very small dashboard scale change to reinforce depth without simulating a 3D tilt.
- Do not add React state or window scroll listeners; use Motion values and transforms.

### Reduced Motion

- When site motion is disabled, render all layers directly in their final state.
- Disable the focus sweep, entrance transforms, and parallax.
- Preserve the existing static shader fallback behavior.

## Component Boundaries

- Keep `HeroSection` responsible for the hero narrative and shared scroll progress.
- Extract the decorative dashboard layer into a small local `DashboardBackdrop` component within `HeroSection.jsx`.
- Add no dependency. Use the existing `motion/react` package and Tailwind utilities, with only narrowly scoped CSS for masking or pseudo-element behavior that Tailwind cannot express clearly.

## Accessibility And Performance

- The dashboard layer must never obscure text, CTAs, or the foreground readiness panel.
- The decorative sweep must not flash or create rapid luminance changes.
- Transforms should remain GPU-friendly and avoid animated filter values.
- Preserve keyboard navigation, focus styles, semantic labels, and existing responsive behavior.
- Avoid rendering duplicate full-resolution dashboard images.

## Validation

- Inspect the changed component and styles for imports, syntax, stacking, and reduced-motion branches.
- Inspect the hero in a real browser at desktop and mobile widths using the existing development server when available.
- Confirm the dashboard is visible but subordinate, the sweep plays once, parallax has distinct layer speeds, and no content overlaps.
- Do not run a production build or full-project test suite for this visual change.

## Documentation

Update the current design-system hero guidance and `docs/ROADMAP.md` only if the implemented user-visible capability changes their recorded state.
