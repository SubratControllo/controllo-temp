# Navbar Signal Lock Intro

## Goal

Give the existing Controllo navbar a calm, premium first-load entrance without placing an animated graphic behind or over the navigation. The motion should make the header feel precise and branded, then become completely still.

## Sequence

The complete sequence lasts about 900 milliseconds and plays once when the site application first mounts:

1. The navbar enters from 8 pixels above its resting position while its opacity rises and a light blur resolves.
2. The standalone Controllo emblem settles into place over the matching emblem in the approved logo asset, while the wordmark reveals immediately behind it. The overlay disappears when the intro completes.
3. Desktop navigation items appear from left to right with a 40 millisecond stagger.
4. The readiness-tour action appears last and receives one brief mint edge highlight.
5. All introductory animation state is removed, leaving the existing static navbar.

Mobile uses the same navbar entrance, logo assembly, and menu-action entrance. Hidden desktop navigation items are not animated.

## Visual Direction

- Preserve the current white glass navbar, dimensions, spacing, labels, and rounded shape.
- Use only the existing navy, teal, mint, and white palette.
- Keep movement shallow and controlled; no bounce, elastic easing, wave, glow field, or persistent ambient animation.
- Keep the CTA label readable above every decorative layer.
- Do not animate dropdown panels or navigation hover states as part of the intro.

## CTA Shine

The desktop readiness-tour action uses a branded interaction after the intro has completed:

- Trigger only on hover and keyboard focus; do not run while idle.
- Sweep one narrow white gradient highlight from left to right inside the button while interaction remains active.
- Preserve the original plain arrow and its short forward movement.
- Keep the label and arrow above the shine so contrast never changes.
- Use the supplied 1.5-second ease-out shine rhythm while limiting button enlargement to 1.5 percent.
- Keep the base navy or mint color and border unchanged during interaction.
- On reduced motion, omit the moving shine and scale; retain the native focus outline.
- Apply the same treatment to the mobile-menu readiness-tour action only when the device supports hover. Touch activation remains immediate and does not require a first tap to reveal the effect.

## Interaction And Accessibility

- The intro never captures pointer events or delays navigation interaction.
- Dropdown hover, click, keyboard focus, Escape behavior, and the mobile menu remain available while the intro runs.
- Client-side route changes do not replay the sequence because the shared header remains mounted.
- When site motion is disabled or reduced motion is preferred, render the final static navbar immediately.
- Decorative animation markers remain hidden from assistive technology.

## Architecture

- Remove `GradientWaves`, `NavbarWaveIntro`, and the OGL dependency because they serve only the abandoned wave effect.
- Add a focused `NavbarIntro` wrapper that owns the one-time completion state, renders the existing surface, and exposes a phase attribute for descendant animation classes.
- Keep the existing `SiteHeader` structure and behavior. Add only the classes, data attributes, or small wrappers required to sequence the navbar surface, logo, navigation items, and actions.
- Keep the CTA label, arrow, and conditional shine in a focused shared component so both header actions remain consistent.
- Use Tailwind utilities for animation state and component markup. Add global CSS only for the keyframes and stagger variables that Tailwind utilities cannot express clearly.
- Do not add an animation library or another runtime dependency.

## Performance And Cleanup

- Animate only opacity, transform, and short entrance filters.
- Avoid layout-affecting properties and preserve the navbar's dimensions from the first rendered frame.
- Stop all timers after completion and remove temporary animation classes so no continuing work remains.
- The sequence must not introduce horizontal overflow or a visible flash before hydration.

## Validation

- Add focused tests for the completion state and reduced-motion behavior.
- Verify the intro plays once on initial load and does not replay during route navigation.
- Verify dropdown hover, keyboard focus, mobile-menu interaction, and CTA activation during and after the sequence.
- Verify the CTA shine on mouse hover and keyboard focus, including the original arrow and static reduced-motion response.
- Inspect desktop and mobile-sized layouts in a real browser for clipping, text readability, and layout stability.
- Do not run the full test suite or production build unless explicitly requested.

## Scope

This change does not redesign the navbar, alter navigation content, change routes, modify dropdown visuals, or add animation elsewhere on the page.
