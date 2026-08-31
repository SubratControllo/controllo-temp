# Secura Cursor Grid Design

## Goal

Animate the Secura grid automatically while its panel is visible in the viewport. The effect must require no pointer or click interaction and must visually match the panel's existing square lattice.

## Chosen Approach

Use a soft horizontal current that travels across the grid while the Secura visual is in view. Random blinking would feel noisy, and a one-time entrance reveal would stop communicating Secura's continuously current behavior. The moving current stays active only while the panel is visible.

## Component Boundary

`src/components/CursorGrid.jsx` owns Canvas 2D rendering, visibility observation, cell fading, resizing, and cleanup. `SecuraSection` supplies the Controllo-specific color and visual settings and renders the component only when the shared `motionEnabled` value allows animation.

## Visual Treatment

- Align the canvas to the panel's existing 42px grid origin.
- Use square cells with no corner radius so animated and static tiles share the same geometry.
- Keep the idle lattice at the existing low mint opacity.
- Move one restrained mint energy field horizontally with a gentle vertical wave and a soft halo around active cells.
- Keep the AI core and evidence packets above the canvas.
- Clip the complete effect to the existing rounded panel.

## Motion And Accessibility

An `IntersectionObserver` starts the animation when at least 15% of the grid panel is visible and stops it when the panel leaves the viewport. The component registers no pointer or click listeners. When reduced motion is preferred, `SecuraSection` omits the canvas and retains the complete static CSS lattice.

## Performance And Cleanup

Run `requestAnimationFrame` only while the panel is visible. Cap canvas device-pixel ratio at 2, limit cell updates to the moving field's radius, observe panel resizing, and release the intersection observer, resize observer, and animation frame during cleanup. No package installation is required.

## Validation

- Extend the focused Secura test to require viewport activation and non-interactive behavior.
- Run only the focused section test unless a failure requires broader investigation.
- Inspect desktop and mobile layouts in the existing development environment.
- Verify that animation is visible in viewport, pauses offscreen, matches the static grid geometry, and disappears under reduced motion.
- Do not run a production build unless explicitly requested, following `AGENTS.md`.

## Documentation

Update `docs/ARCHITECTURE.md` and `docs/ROADMAP.md` to describe viewport activation, matching 42px tiles, and the static reduced-motion fallback.
