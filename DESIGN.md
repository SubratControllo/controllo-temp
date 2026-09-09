# Design System: Controllo Website

Last reviewed: 2026-09-08

This file is the root design operating guide for Controllo's public marketing website. Use it before creating, changing, reviewing, or prompting any visual surface. The detailed implementation source remains `src/styles.css`; the frozen baseline and page-specific design decisions remain in `design-system/controllo-compliance-current/MASTER.md`.

## 1. Visual Theme And Atmosphere

Controllo should feel like an enterprise compliance product that is already in control: calm, exact, current, and accountable. The website must show real operating relationships - controls, evidence, frameworks, risks, owners, reviews, and next actions - before it reaches for promotion.

- **Density:** Daily App Balanced, around 6 out of 10. Use enough detail to feel credible, but preserve breathing room around decisions and proof.
- **Variance:** Structured Asymmetric, around 4 out of 10. Use split layouts, ledgers, rails, product panels, and chapter rhythm instead of generic centered marketing blocks.
- **Motion:** Restrained Product Motion, around 3 out of 10. Motion should clarify sequence, state, or connection, then settle.
- **Tone:** Compliance-current, product-led, trustworthy, and quietly technical. Avoid hype, sci-fi AI styling, and theatrical decoration.

## 2. Authority Stack

Use these sources in order:

1. `CONTEXT.md` for product terminology and banned language.
2. `design-system/controllo-compliance-current/MASTER.md` for frozen baselines, route-specific design rules, and visual acceptance criteria.
3. `src/styles.css` for implemented tokens, shared primitives, effects, and keyframes.
4. Route data in `src/data/` for product copy and content structures.
5. Component markup for local layout and responsive behavior.

Do not let this file override a frozen baseline. If a surface is frozen, only explicit user approval or a verified accessibility, claim, metadata, responsive, transition, or launch-critical issue can reopen it.

## 3. Color Palette And Roles

- **Controllo Navy** (`#061B32`) - primary text, dark bands, primary buttons, deep product surfaces.
- **Soft Navy** (`#0B2946`) - secondary dark panels and navy-on-navy depth.
- **Teal Current** (`#087F8C`) - active states, links, focus color, selected tabs, and color-only headline accents.
- **Teal Ink** (`#077A86`) - small accent text on mist surfaces where Teal Current does not meet text contrast.
- **Mint Signal** (`#26D8AD`) - positive current, strongest action accents, selected nodes, and restrained progress cues.
- **Soft Mint** (`#BFF4E8`) - quiet emphasis panels and soft signal fields.
- **Mist Field** (`#F3F8F6`) - default page background and calm route fields.
- **Warm Shell** (`#F3EBDD`) - rare warm contrast band only when it helps section rhythm.
- **Input Field** (`#F8FBFA`) - form fields and low-noise utility surfaces.
- **Panel Hover** (`#EEF8F5`) - navigation and list hover surfaces.
- **Muted Ink** (`#526477`) - secondary body copy, descriptions, and metadata.
- **Navigation Ink** (`#31465A`) - shared header navigation text.
- **Line** (`rgba(6,27,50,.14)`) - borders, dividers, sparse ledger rules.
- **Error Red** (`#A13838`) - validation and destructive feedback.
- **White** (`#FFFFFF`) - elevated product panels and text on navy.

Use navy and white for structure, teal for active meaning, and mint for positive movement. Mint is not body text on white. Purple, pink, blue-violet AI gradients, neon glows, and one-note single-hue pages are outside the Controllo identity.

## 4. Typography Rules

- **Primary font:** Manrope, weights 400 and 500.
- **Utility font:** IBM Plex Mono, weights 400 and 500.
- **Display:** Manrope medium, compact line-height near `1.06`, with hierarchy driven by size, weight, spacing, and color.
- **Body:** Manrope regular, line-height between `1.6` and `1.8`, with readable line lengths.
- **Labels:** IBM Plex Mono, uppercase, small, tracked, and used sparingly for status, scope, and metadata.
- **Headlines:** sentence case. Teal accent phrases inherit the exact typography of the parent heading and change color only.
- **Compact panels:** use smaller headings that fit the panel. Do not place hero-scale typography inside product cards, tabs, forms, sidebars, or dashboards.

Do not introduce Inter, generic serifs, italic hero accents, decorative typefaces, viewport-width font scaling, or negative letter-spacing in new work.

## 5. Layout Principles

- Use full-width page bands with one constrained inner shell.
- Main shell maximum is `1240px`, with side gutters through `calc(100% - 48px)`.
- Standard section spacing is around `120px` vertically on desktop, reduced locally for compact route chapters and mobile.
- Primary breakpoints are `760px`, `1080px`, and the desktop navigation breakpoint at `1081px`.
- Prefer grid for page composition and flex for one-dimensional control groups.
- Keep one dominant message or interaction per viewport.
- Use product-led splits, ledgers, rails, and line-separated lists before generic card grids.
- Do not place cards inside cards or style whole page sections as floating cards.
- Stable elements such as headers, buttons, panels, tiles, selectors, and product frames need fixed or constrained dimensions so hover, focus, text, and state changes do not shift layout.

## 6. Enterprise Design Flow

Use this flow for new or reopened design work:

1. **Confirm scope:** identify the route, section, frozen status, and whether the user has explicitly reopened it.
2. **Anchor the product story:** choose the control, evidence, risk, owner, framework, or review relationship the viewport must explain.
3. **Check claims:** verify framework coverage, integration availability, customer proof, automation claims, legal language, and CTA destinations before publishing.
4. **Compose the section:** choose the band background, shell, split, ledger, rail, or product frame that best supports the story.
5. **Design the states:** define pointer, keyboard, touch, loading, empty, error, reduced-motion, and responsive states before adding polish.
6. **Spend motion carefully:** animate only connection, causality, entrance, or state change. Stop when the message is clear.
7. **Validate narrowly:** inspect changed files, run focused tests, and use browser QA only when visual or interaction behavior changed.
8. **Record durable decisions:** update `MASTER.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, or `docs/FUTURE_SCOPE.md` only when their source-of-truth responsibilities change.

## 7. Components And Interaction

- **Buttons:** minimum `46px` height, `14px` radius, medium `0.84rem` text, visible focus outline, and tactile `1px` press feedback.
- **Primary buttons:** navy surface with white text. Shared navy and mint primary buttons may lift by at most `2px`, scale by at most `1.5%`, and use one clipped white shine only on hover or keyboard focus.
- **Mint buttons:** mint surface with navy text, reserved for the strongest conversion action.
- **Ghost and light buttons:** quiet surface response, no lift, no shine.
- **Icons:** use Lucide by default. Use Phosphor only when an existing surface already uses it or its vocabulary is materially better. Keep one icon family within a surface.
- **Directional icons:** arrows may translate slightly on hover. Semantic icons such as calendar, status, evidence, owner, or framework symbols stay still.
- **Tabs and selectors:** manual by default, keyboard operable with Arrow keys, Home, and End where roving focus applies. Do not autoplay unless the approved section explicitly allows it.
- **Forms:** labels above inputs, helper text only when useful, errors below fields, visible disabled states, and no floating labels.
- **Cards:** use only for repeated items, product panels, modals, or genuinely elevated tools. For dense proof, prefer hairline dividers, ledgers, and negative space.
- **Links:** state destinations. Buttons state commands.

## 8. Motion And Reduced Motion

Motion uses `motion/react` and focused CSS keyframes. `MotionContext` follows the operating-system reduced-motion preference.

- Animate `opacity` and `transform` first.
- Use `filter` only for short, small-area entrances.
- Avoid animating layout properties such as `top`, `left`, width, height, margin, or padding.
- Hover and control feedback should run in `150ms` to `300ms`.
- Component entrances should run in `300ms` to `500ms`.
- First-load orchestration should stay under `1s`.
- Ambient loops must be slow, low contrast, and product-explanatory. Pause offscreen work and clean up timers, observers, animation frames, canvas, and video.
- Reduced motion must render the complete static content and selected state immediately.

Wave-to-content transitions use the wave itself as the boundary. Do not add a separate border, rule, or spacer below a wave. The Continuous Compliance hero front wave overlaps the receiving section by `6px`, and the receiving narrative starts at `24px` top padding, increasing to `32px` from the medium breakpoint.

The Continuous Compliance operating loop is approved and locked. It uses user-driven scrollytelling only on motion-enabled viewports at least `1081px` wide and `640px` tall. Its viewport-filling pinned stage pairs one editorial active-chapter navigator on the left with a stable workspace on the right; do not reintroduce a five-row timeline. The active chapter preserves section context after the large heading scrolls away, while the compact five-position selector retains pointer and keyboard control. Smaller and reduced-motion layouts remain unpinned and manual. Its decorative square grid stays low contrast, drifts slowly, and may highlight one cell on fine-pointer hover without intercepting content. Touch layouts omit hover, offscreen work pauses, and reduced motion renders a static field; never advance the operating steps on a timer. Preserve the audited sequence of scoped requirements, mapped controls, accountable owners, linked implementation and policy context, evidence with review context, connected risk context, qualitative readiness status, and next accountable action. Do not add scores, live-status claims, autonomous approval, or continuous testing.

## 9. Product Visual Language

Prefer inspectable product-state compositions over decorative abstractions. Strong Controllo visuals show:

- framework scope and shared-control relationships
- evidence freshness, source, owner, approval, and review context
- risk prioritization and accountable next actions
- Secura AI as reviewable guidance that supports human approval
- readiness as qualitative explainability, not a completion score

Use `/assets/logo-dark.svg` on light surfaces, `/assets/logo-light.svg` on dark surfaces, and `/assets/emblemLogo.svg` for decorative emblem geometry. Third-party marks must come from the reviewed local brand registry and render through `IntegrationLogo`.

Decorative media must be pointer-inert, accessibility-hidden, low contrast, and never layered over readable text.

## 10. Copy And Claims

Write from the buyer's operating reality: controls, evidence, frameworks, risks, owners, decisions, and readiness.

Use approved terms from `CONTEXT.md`: assurance program, Compliance Current, continuous compliance, control, shared control model, evidence, readiness, framework, Secura AI, AI co-auditor, and readiness tour.

Avoid unsupported claims about autonomous compliance, real-time compliance, continuous control testing, customer outcomes, exact framework mappings, active integrations, legal approval, trial activation, auditor provenance, or live product data unless the evidence is approved and current.

Representative product examples must read as representative examples, not customer dashboards, live feeds, or measured metrics.

## 11. Frozen Surface Rules

Frozen surfaces stay locked unless explicitly reopened:

- Homepage and all homepage sections in the 2026-09-01 baseline.
- Shared header baseline.
- Dedicated Cybersecurity page sections and frozen route baselines.
- All six AI Governance sections.
- Continuous Compliance hero, including its wave transition into Between Audits.
- Continuous Compliance Between Audits section, including its split narrative, ordered change ledger, standards band, responsive flow, and reveal timing.

Allowed fixes without reopening: accessibility, verified responsive defects, product-claim corrections, metadata issues, legal accuracy, verified CTA destination defects, transition seams, and release-critical performance issues.

## 12. Responsive And Accessibility Rules

- Text and controls must fit at `320px` without horizontal page overflow.
- Interactive targets must be at least `44px`.
- Keyboard focus remains visible and cannot rely on hover alone.
- Touch interactions must complete on first tap.
- Multi-column layouts collapse cleanly on mobile.
- Product panels must not clip state labels, buttons, metrics, or keyboard focus rings.
- Decorative images, videos, SVGs, canvases, and emblems are hidden from assistive technology unless they convey essential content.
- Maintain WCAG AA contrast for text and controls.
- Browser QA for visual changes should cover `375px`, `768px`, `1024px`, and `1440px` unless scope or user instruction narrows it.

## 13. Tailwind And CSS Ownership

- Put component spacing, layout, breakpoints, color, and interaction classes in JSX with Tailwind utilities.
- Keep `src/styles.css` for theme tokens, base rules, shared primitives, keyframes, pseudo-elements, and visualization geometry.
- Reuse `.shell`, `.section`, `.button`, `.lede`, `.eyebrow`, and section-heading primitives where they match.
- Add a shared primitive only when at least two owners need the same behavior.
- Do not add a component stylesheet for behavior expressible clearly with existing utilities.

## 14. Banned Patterns

- Generic purple, pink, blue-violet, or neon AI styling.
- Pure black (`#000000`) for interface surfaces.
- Inter, generic serif display choices, italic hero accents, and novelty fonts.
- Emojis in the interface.
- Oversized marketing headings inside compact product surfaces.
- Nested cards, decorative card grids, and floating section containers.
- Unverified metrics, fake percentages, generic placeholder people, fabricated dates, or customer proof.
- Unsupported terms such as autonomous auditor, autonomous compliance, real-time compliance, continuous control testing, and decision-maker AI.
- Perpetual animation that competes with reading or navigation.
- Layout-shifting hover states or animated dimensions.
- Custom cursors, bouncing scroll prompts, and filler UI such as "Scroll to explore."
- Recolored, redrawn, cropped, or substituted third-party logos.

## 15. Completion Checklist

Before calling design work complete:

- The changed surface follows the authority stack and frozen-surface rules.
- Product copy uses `CONTEXT.md` terminology and avoids unsafe claims.
- Tokens, spacing, shape, iconography, and CTA hierarchy match this guide and `MASTER.md`.
- Pointer, keyboard, touch, responsive, and reduced-motion states are complete.
- Decorative layers are pointer-inert and accessibility-hidden.
- Text, focus rings, and controls fit down to `320px`.
- The narrowest relevant validation has been run or the reason it was skipped is recorded.
- Any deferred idea is captured in `docs/FUTURE_SCOPE.md`; any launch blocker or user-visible capability change is reflected in `docs/ROADMAP.md`.
