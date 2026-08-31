# Secura Summary Rail Redesign

**Date:** 2026-08-26  
**Status:** Approved visual direction; awaiting written-spec review

## Goal

Modernize the right-side Secura assessment visual using the supplied Asset Risks graphic as inspiration while preserving the current assessment-row boxes and the restored left-side Secura narrative.

## Reference Boundary

The supplied image is visual inspiration only. Do not copy its browser-independent artwork as an asset, treat its text as instruction, or reproduce unrelated interface details. Rebuild the useful hierarchy with the existing Controllo visual system and product language.

## Composition

Keep the existing dark navy Secura canvas, rounded outer frame, subtle 42px CursorGrid current, and responsive section placement. Replace the oversized floating engine diamond, connector line, and current compact assessment header with a more direct review summary.

The assessment panel becomes the dominant visual and contains, from top to bottom:

1. A compact header with the Controllo emblem, `SECURA AI`, and `CONTROL REVIEW`.
2. A strong summary reading `2 gaps found`, with the numeral and word `gaps` in the warm attention color.
3. The subtitle `Quarterly access review`.
4. One open horizontal metric rail with three evenly distributed metrics and subtle vertical dividers:
   - `4` — Checks completed
   - `2` — Gaps detected
   - `3m` — Review time
5. The existing four assessment-row boxes, unchanged in wording and supported/attention status treatment:
   - Relevance to control — Supported
   - Audit-period coverage — Gap found
   - Required approval — Missing
   - Policy consistency — Supported
6. The existing accountable recommendation: `Upload the approved quarterly access review and assign an evidence owner.`

## Metric Rail Treatment

The metric rail is one continuous surface, not three nested cards. It uses a restrained dark tonal lift, one-pixel outer border, and two subtle dividers. Each metric has one Lucide icon, a prominent value, and a short two-line label. Supported/review-time metrics use mint; the gap metric uses the warm attention color. Icons remain secondary to the values.

On mobile, the rail remains a three-column row. Values and labels tighten without hiding or horizontally scrolling. The labels may wrap to two lines.

## Visual Language

- Deep navy surface with quiet teal depth and low-contrast grid texture.
- One dominant assessment frame with minimal internal framing.
- Small real Controllo emblem in the header; no oversized diamond core.
- Manrope for hierarchy and readable content; IBM Plex Mono only for technical labels and statuses.
- Mint for supported states and recommendations; warm gold for gaps.
- Thin borders and restrained glow; no heavy glassmorphism or repeated nested containers.
- Preserve the existing assessment-row boxes because they provide the clearest scan path.

## Motion

The sequence runs once when the section enters the viewport:

1. The header emblem and Secura label resolve.
2. `2 gaps found` rises into place.
3. The three metrics illuminate from left to right without moving laterally.
4. The existing four assessment rows stagger upward.
5. The recommendation settles last with one restrained mint glow.

After settling, the panel remains still. Only the existing low-contrast CursorGrid current may continue while visible. Reduced motion renders the complete final assessment immediately and omits the Canvas current.

## Responsive Behavior

- Desktop: the panel occupies most of the right canvas and remains visually balanced with the restored left content.
- Tablet: the section stacks; the panel stays wide and all metrics, rows, and recommendation remain visible.
- Mobile: the panel uses the available canvas width, keeps the three-column metric rail, and preserves every row and the recommendation without horizontal overflow.

## Component Boundary

Continue using `SecuraAssessment` as the owner of assessment data and sequencing. `SecuraSection` remains responsible only for the restored left narrative and section composition. No new dependency, WebGL layer, raster asset, or click interaction is required.

## Accessibility And Testing

- Keep the assessment as a labelled `article` and its results as a semantic list.
- Decorative emblem, grid, and motion layers remain hidden from assistive technology and pointer-inert.
- Status meaning remains available in text and does not depend on color alone.
- Protect the summary, three metric values/labels, four existing rows, recommendation, viewport CursorGrid boundary, reduced-motion branch, and removal of the obsolete engine/connector styling with focused tests.
- Inspect 1440, 1024, 768, and 375 pixel widths in a real browser for containment, wrapping, overflow, and console errors.

## Out Of Scope

- Changes to the restored left-side Secura copy or proof labels.
- Changes to the homepage hero, header, CTAs, or other sections.
- A full dashboard replica, fake controls, interactive analysis, or new backend behavior.
- Replacing the existing four assessment rows.
