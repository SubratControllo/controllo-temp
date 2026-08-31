# Secura Assessment Canvas Design

## Goal

Replace the homepage Secura section's abstract packet visualization with a concrete, reviewable control assessment while preserving the existing CursorGrid canvas and glowing Secura core that give the section its distinctive identity.

## Product Decision

The homepage will show one focused assessment, not every audit-team visualization at once. The visual demonstrates the result a visitor receives from Secura: supported context, identified gaps, and one accountable next action.

The product screenshots supplied on 2026-08-26 establish the visual language:

- Dark terminal-style workspace
- Teal grid, outlines, and active-engine accents
- Restrained monospace system labels
- A compact Secura entry surface that opens into an analysis interface

The screenshots are reference material only. Do not embed them or reproduce browser chrome, organization details, credit balances, download controls, full application navigation, or the incidental retry-error state.

## Section Copy

### Eyebrow

> Introducing Secura AI

### Headline

> Find the gap before it becomes a finding.

### Supporting Copy

> Secura reviews the control requirement alongside its implementation, policies, procedures, and evidence. It shows what is supported, where context is missing, and the next action for an accountable owner to review.

### Capability Line

> Review context · Identify gaps · Recommend next actions

Use functional language instead of the comparative claims “smarter,” “faster,” and “clearer.” Do not describe Secura as trained on ChatGPT or present the underlying model provider as proof of capability.

## Assessment Content

Show one control example.

### Control

**Quarterly access review**

> Access rights must be reviewed quarterly and approved by the control owner.

### Assessment

1. **Relevance to control** — Supported
2. **Audit-period coverage** — Gap found
3. **Required approval** — Missing
4. **Policy consistency** — Supported

### Secura Recommendation

> Upload the approved quarterly access review and assign an evidence owner.

The recommendation is guidance for an accountable person to review. Do not present it as an autonomous decision or completed action.

## Visual Composition

Keep the current navy section and rounded `ai-canvas` shell.

### Canvas Layer

- Preserve `CursorGrid` with viewport activation, offscreen pausing, reduced-motion omission, and the existing 42-pixel geometry.
- Preserve the glowing Secura core, but reduce it from the current dominant 200-pixel treatment so it can act as the intelligence source rather than cover the assessment.
- Position the core left of center on desktop.
- Add a restrained signal connector from the core toward the assessment panel.
- Keep the grid and core decorative, pointer-inert, and hidden from assistive technology.

### Analysis Header

Place a compact product-authentic label within the canvas:

> SECURA AI · ACTIVE ENGINE
>
> ACCESS REVIEW / AI ASSESSMENT

Use uppercase monospace typography, thin teal rules, and restrained corner brackets inspired by the real Secura interface.

### Assessment Panel

- Place one dark glass assessment panel on the right side of the desktop canvas.
- Use thin teal borders, low-contrast grid visibility behind it, compact status badges, and clear text hierarchy.
- Use mint/teal for supported states.
- Use a restrained warm warning tone for “Gap found” and “Missing”; do not use a large aggressive red error surface.
- Place the recommendation directly beneath the four assessment rows as the visual conclusion.
- Remove the four existing abstract packets and their continuous pulse animation.

## Motion

The marketing section will demonstrate the product's banner-to-interface flow automatically once. Visitors must not need to click before seeing the useful product result.

When the section enters the viewport:

1. The active-engine label and Secura core resolve into view.
2. The core shifts slightly left while a signal connector reveals toward the assessment.
3. The assessment panel opens using opacity, scale, and a short horizontal transform.
4. The four rows resolve with a short stagger.
5. “Gap found” and “Missing” receive one restrained emphasis pulse.
6. The recommendation rises into place.
7. The assessment, connector, core, and rows remain still.

Keep the full sequence under approximately 1.1 seconds. The CursorGrid may retain its existing low-contrast viewport current while visible; it pauses offscreen.

Reduced motion renders the complete final composition immediately, omits the opening sequence and emphasis pulse, and retains the static CSS grid fallback.

## Responsive Behavior

### Desktop

- Preserve the current copy-left, canvas-right section layout.
- Keep the core visible left of the assessment.
- Give the assessment enough width for complete labels without truncation.

### Tablet

- Stack the copy above the full-width canvas using the existing section breakpoint.
- Keep the core and assessment side by side while space permits.
- Reduce decorative connector length before reducing text size.

### Mobile

- Keep the assessment panel full-width inside the canvas.
- Reduce the Secura core to a small glowing brand element behind or beside the analysis header.
- Hide the decorative connector.
- Render all four assessment rows and the full recommendation; do not hide information.
- Keep CursorGrid visible around the panel edges.
- Avoid horizontal scrolling at 320 pixels.

## Component Boundaries

- `SecuraSection.jsx` continues to own section composition, approved copy, and the existing responsive two-column layout.
- Create `SecuraAssessment.jsx` to own the static assessment data, product-authentic canvas contents, row sequencing, statuses, and recommendation.
- `SecuraAssessment` receives only `motionEnabled` and uses module-scope static configuration.
- Reuse the existing `CursorGrid`, `Reveal`, Motion React, and Lucide icons.
- Add no dependency, WebGL surface, generated raster graphic, or 21st.dev component.
- Keep component-specific layout utilities in JSX. Retain only geometry, pseudo-elements, and keyframes that are clearer in `src/styles.css`.

## Accessibility

- Treat the canvas grid, core glow, connector, brackets, and pulses as decorative.
- Expose the control title, requirement, four assessment results, and recommendation as real text in logical DOM order.
- Give the assessment region an accessible label such as “Secura access-review assessment example.”
- Do not create nonfunctional buttons, fake tabs, or hover-only information.
- Maintain WCAG AA contrast for body text and status labels.
- Ensure reduced motion provides the complete assessment without delayed content.

## Performance

- Keep the existing IntersectionObserver-driven CursorGrid lifecycle and cleanup.
- Animate only opacity and transforms for the opening sequence.
- Do not animate blur, width, height, top, left, padding, or margin.
- Do not introduce a second canvas, WebGL context, image-generation asset, or large background image.

## Validation

- Add targeted tests for the new eyebrow, headline, supporting copy, capability line, control requirement, four assessment statuses, and recommendation.
- Verify the abstract packet labels are removed.
- Verify CursorGrid remains viewport-activated only when motion is enabled.
- Verify reduced motion renders the complete assessment without the canvas current or entrance sequence.
- Inspect 375, 768, 1024, and 1440-pixel layouts in the existing development server.
- Check text fit, canvas balance, contrast, horizontal overflow, and browser warnings or errors.
- Update `README.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, and the design-system Secura guidance after implementation.
- Do not run a production build unless explicitly requested.

## Out Of Scope

- Rebuilding the real product's clickable Secura banner or modal behavior
- Reproducing the full control-details dashboard
- Displaying real customer, organization, framework, credit, or user data
- Adding model-provider claims or autonomous-decision language
- Adding PDF export, chat, credits, tabs, or application navigation
- Building a carousel containing the rejected visual alternatives
