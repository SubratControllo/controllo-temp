# Production Header Hardening

## Objective

Keep the current floating glass header design while making navigation behavior reliable for mouse, keyboard, touch, mobile, route changes, and contrasting brand surfaces. Remove the header motion control without introducing a free-trial CTA; the existing readiness-tour CTA remains the only header conversion action.

## Scope

The work is limited to the shared header, its logo treatment, responsive navigation behavior, and focused regression coverage. Page layouts, navigation information architecture, footer content, and site animation design remain unchanged.

The header continues to use a translucent light surface on every page. It therefore uses the official dark Controllo wordmark. The dark footer uses the official light wordmark. Product-preview components retain the compact emblem because the full wordmark does not fit those UI scenes.

## Interaction Model

### Desktop navigation

Groups with child links open through any of three equivalent interactions:

- Hover with a fine pointer
- Keyboard focus
- Trigger-button click

The menu stays open while the pointer or focus is within the trigger or panel. A short close delay bridges normal pointer travel between the trigger and panel. CSS also provides a non-visible interaction bridge across the physical gap so the panel cannot collapse during ordinary movement.

Only one group can be open. Clicking its trigger again closes it. Moving to another group opens that group. Direct navigation links keep their normal behavior.

### Closing rules

Open navigation closes when:

- Escape is pressed
- A click or pointer press occurs outside the header
- Focus leaves the active group
- A destination link is selected
- The route changes
- The mobile menu is closed

Escape returns focus to the control that opened the active surface where possible.

### Active route state

Platform and Solutions triggers show the active treatment when the current pathname belongs to their route family. Direct links continue using React Router active-state behavior. Active styling remains visible independently of hover styling.

## Mobile Navigation

At the existing responsive breakpoint, the menu becomes a vertical navigation surface:

- The menu button controls the primary navigation through `aria-controls` and `aria-expanded`.
- Groups behave as click-controlled accordions; hover behavior is disabled for touch/coarse pointers.
- The open menu has a viewport-aware maximum height and internal scrolling.
- Background page scrolling is locked while the mobile menu is open and restored on close/unmount.
- The readiness-tour CTA is present inside the mobile navigation so it remains available at narrow widths.
- Closing the menu returns focus to the menu button when initiated by Escape.

## Logo Treatment

A small reusable wordmark component renders the existing assets:

- `public/assets/logo-dark.svg` on light surfaces, including the header
- `public/assets/logo-light.svg` on dark surfaces, including the footer

The images have stable dimensions and descriptive accessible text through the surrounding home link. Existing compact `BrandMark` uses remain unchanged.

## Component Ownership

`SiteHeader` owns header-specific state and lifecycle behavior: mobile visibility, active group, hover delay, outside interaction, focus return, route-change cleanup, and scroll locking. `SiteLayout` supplies the shared page shell but no longer owns header menu state or Escape handling.

Navigation content remains in `src/data/enterpriseContent.js`. Styling remains in `src/styles.css` and follows the current design system.

## Accessibility and Resilience

- All interactive targets remain at least 44 pixels high.
- Group triggers expose `aria-expanded` and `aria-controls`.
- Active group triggers expose `aria-current="page"` for route families.
- Menus work without hover through click and keyboard focus.
- Reduced-motion operating-system preferences remain respected after the visible pause control is removed.
- Header behavior cleans up timers, event listeners, and body styles on unmount.

## Verification

Automated checks cover mobile opening/closing, desktop group toggling, Escape behavior, route-family active state, outside closing, removal of the pause control, readiness CTA presence, and dark/light logo selection.

Browser checks cover:

- Desktop hover travel from trigger into mega menu without collapse
- Keyboard traversal and focus-visible states
- Touch/mobile accordion behavior and internal scrolling
- Direct route refresh and route-change cleanup
- Header rendering over light, shell, teal, and navy page heroes
- Official dark header logo and light footer logo
- No overlap or horizontal overflow at 375, 768, 1024, and 1440 pixel widths

## Acceptance Criteria

- Current header visual character is preserved.
- Desktop hover, focus, and click interaction are consistent and reliable.
- Mobile navigation remains usable at short and narrow viewport sizes.
- Every close rule works without leaving stale group state.
- The pause button and its header props are removed.
- No free-trial CTA is introduced; the readiness-tour CTA links to `/demo`.
- Official logo variants render on their intended light and dark surfaces.
- Relevant automated tests and the production build pass.
