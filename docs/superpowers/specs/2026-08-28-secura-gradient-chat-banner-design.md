# Secura Viewport-Loop Demo Design

**Date:** 2026-08-28  
**Status:** Approved for implementation

## Goal

Turn the existing Secura right-side assessment into a deterministic product demonstration that continuously explains the audit-review workflow while the section is visible. The visual must show the causal sequence—Secura is opened, a review request is sent, connected evidence is assessed, and a concise result is returned—without implying a live model call.

## Product Decision

The right panel becomes one self-contained looping surface. It starts automatically when at least 35% of the panel enters the viewport, repeats while visible, and stops when it leaves. Leaving the viewport resets the demo to its idle phase so a later visit begins cleanly. The left-side Secura narrative, outer canvas, CursorGrid, 450px panel baseline, and section spacing remain unchanged.

The three supplied images are visual references for hierarchy, density, color, and content. The pasted animation brief defines the interaction contract. The implementation adapts both to the existing Controllo design system rather than reproducing a dashboard screenshot.

## Sequence

One cycle remains below ten seconds:

1. **Idle — 1.6s:** A compact control-detail preview shows the framework, control metadata, description, connected policy/evidence/owner context, review-scope inputs, and a shortened gradient Secura banner with active-engine identity, credits, and a forward-action orb.
2. **Clicking — 0.65s:** A small cursor travels toward the orb, creates a restrained ripple, and the banner prepares to dissolve.
3. **Chat — 2.0s:** The panel shows the control-review identity, a right-aligned user message near the top of the panel, and a left-aligned Secura AI response bubble that follows it. The prompt reveal is quick enough that the chat phase reads as sent-and-replied, not as a centered loading state.
4. **Results — 3.6s:** “2 gaps found,” three compact metrics, four assessment rows, and a condensed Secura banner reveal in a deliberately uneven stagger. The completed assessment holds long enough to read.
5. **Resetting — 0.65s:** Results fade in reverse visual order and the idle banner returns without changing the outer panel geometry.

The cycle restarts only when both the site motion preference and viewport visibility allow it. A user may activate the idle or condensed banner with keyboard, pointer, or touch to restart the sequence immediately.

## Visual Treatment

- Preserve the dark navy grid canvas and the compact Secura packet mark.
- Use the existing mint accent for supported states and amber for gaps.
- Keep the panel width at `min(calc(100% - 72px), 450px)` on larger screens and `calc(100% - 24px)` on mobile.
- Keep a stable minimum panel height so state changes do not move the section.
- Animate only opacity and transforms. The panel does not animate width, height, top, or left.
- Use a short control-detail banner rather than an oversized standalone splash. Keep it to `78px` minimum on larger screens and `92px` on mobile, use a Lucide right-arrow orb, keep the left edge visually transparent, and omit the internal credits divider.
- Fill the opening state with decision-relevant control context instead of decorative filler: a concise description, three linked-source states, and three compact review-scope inputs are enough.
- Keep the results state dense but readable: one complete three-column metric rail and four full-width assessment rows.
- The condensed banner enters after the final result row and visually closes the cycle.

## Accessibility And Motion

- The idle and condensed banner are native buttons with descriptive labels, visible focus, and at least a 44px target.
- The article exposes a concise phase description through a polite live region; decorative cursor, ripple, grid, and orb are hidden from assistive technology.
- `motionEnabled={false}`, including the operating-system reduced-motion preference supplied by `MotionContext`, skips directly to the complete results state and never schedules a timer or observer loop.
- Text wraps safely at 320–400px widths. Metric labels and result rows must not clip or create horizontal overflow.
- Leaving the viewport clears the active timeout and resets the phase, preventing background animation and stale callbacks.

## Component Boundary

`SecuraAssessment` owns a single reducer containing `phase` and `inView`, one `IntersectionObserver`, and one timeout chain. Static metrics, rows, phase order, and durations remain module-level. It renders the CursorGrid and one stable article with phase-specific surfaces.

`SecuraChatBanner` becomes a presentational banner used in full and condensed variants. It contains no timers and invokes an optional restart callback. The previous separately timed chat conversation and manual back path are removed because they conflict with the automatic loop.

No new package, model call, WebGL layer, video, GIF, or external animation library is added. CSS keyframes and transitions provide the local motion.

## Validation

- Focused tests verify idle start, phase order, continuous restart, cleanup on viewport exit, manual restart, and reduced-motion results.
- Existing content tests continue to verify metrics, rows, packet mark, canvas constraints, and CursorGrid branching.
- Browser QA covers 375×812, 768×1024, 1024×900, and 1440×900 while observing at least one complete loop and one viewport exit/re-entry.
- No production build is run unless explicitly requested.

## Out Of Scope

- Live AI requests, user-entered prompts, credit accounting, authentication, conversation history, or dashboard navigation.
- Changes to the Secura section’s left-side copy.
- Changes to the homepage hero, navigation, or global motion system.
