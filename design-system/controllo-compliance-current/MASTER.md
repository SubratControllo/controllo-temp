# Controllo Compliance Current Design System

Last reviewed: 2026-08-31

Use this file for every visual or interaction change. `src/styles.css` is the implementation source for tokens and shared primitives; component markup is the source for local layout and responsive behavior.

## Product Direction

Controllo is a public enterprise-compliance website for security, GRC, and operational leaders. The interface should feel calm, current, accountable, and technically credible. It should show connected work moving forward without looking playful, futuristic, or like a generic AI product.

Core visual idea: **a compliance current**. Information, evidence, controls, and ownership remain connected as they move through the program.

## Design Principles

1. **Product before promotion**: show operating states, relationships, and outcomes rather than decorative marketing claims.
2. **Calm hierarchy**: one dominant message or interaction per viewport; supporting details stay quiet.
3. **Structured movement**: motion explains continuity, status, or sequence, then becomes still.
4. **Visible accountability**: labels, owners, states, and next actions should be easy to scan.
5. **Specific branding**: use Controllo navy, teal, mint, emblem geometry, and compliance artifacts rather than generic SaaS gradients.

## Color System

| Token | Value | Primary use |
| --- | --- | --- |
| `navy` | `#061B32` | Primary text, dark surfaces, primary buttons |
| `navy-soft` | `#0B2946` | Secondary dark surfaces |
| `teal` | `#087F8C` | Active states, links, focus, emphasized copy |
| `mint` | `#26D8AD` | Primary accent, positive current, highlighted actions |
| `mint-soft` | `#BFF4E8` | Soft panels and supporting emphasis |
| `mist` | `#F3F8F6` | Default page background |
| `shell` | `#F3EBDD` | Rare warm contrast band |
| `field` | `#F8FBFA` | Inputs and quiet surfaces |
| `panel-hover` | `#EEF8F5` | Navigation and list hover surfaces |
| `muted` | `#526477` | Secondary body copy |
| `nav-text` | `#31465A` | Header navigation text |
| `line` | `rgba(6,27,50,.14)` | Borders and dividers |
| `error` | `#A13838` | Validation and destructive feedback |
| `white` | `#FFFFFF` | Elevated surfaces and text on navy |

Use navy and white for structure, teal for active meaning, and mint for positive movement. Mint is not body text on white. Purple, pink, and blue-violet AI gradients are outside the Controllo identity.

## Typography

- **Primary**: Manrope, weights 400 and 500.
- **Utility**: IBM Plex Mono, weights 400 and 500.
- **Display**: Manrope medium with compact line-height around `1.06`.
- **Body**: Manrope regular with line-height between `1.6` and `1.8`.
- **Labels**: IBM Plex Mono, uppercase, small, and deliberately tracked.

Use sentence case for headings, actions, and navigation. Keep technical labels short. Current global headings use legacy negative tracking; new section work should avoid increasing it and should normalize it only during a dedicated visual pass.

## Layout

- Main shell: maximum `1240px`, with `24px` side gutters through `calc(100% - 48px)`.
- Standard section spacing: `120px` vertically on desktop, reduced locally for compact routes and mobile.
- Desktop navigation breakpoint: `1081px`.
- Primary responsive breakpoints: `760px` and `1080px`.
- Prefer grid for page composition and flex for one-dimensional control groups.
- Keep sections as full-width bands with one constrained inner shell.
- Do not place cards inside cards or use floating cards as page-section wrappers.

Stable interface elements such as headers, buttons, product panels, tiles, and filters require explicit dimensions or responsive constraints so content and interaction states do not shift layout.

## Shape And Depth

| Element | Radius |
| --- | --- |
| Buttons and compact controls | `14px` |
| Mobile navigation and small panels | `18px` |
| Floating header | `22px` desktop, `18px` mobile |
| Major product surfaces | `20px` to `28px` |
| Immersive visual canvases | Up to `36px` when already established |

Use borders before shadows. Approved shadows:

- Header: `0 14px 50px rgba(6,27,50,.10)`
- Elevated panel: `0 24px 70px rgba(6,27,50,.12)`
- Primary button: `0 9px 24px rgba(6,27,50,.17)`
- Mint button: `0 13px 28px rgba(38,216,173,.23)`
- Form/modal: `0 30px 90px rgba(0,0,0,.20)`

Avoid decorative blur fields, detached color blobs, and multiple competing shadow depths in one section.

## Buttons

All actions use a minimum height of `46px`, a `14px` radius, medium-weight `0.84rem` text, and a visible focus outline.

- **Primary**: navy surface and white text. An icon is optional.
- **Mint**: mint surface, navy text, reserved for the strongest conversion action.
- **Ghost**: transparent surface, navy text, inset line.
- **Light**: white surface, navy text, used on dark bands.

Variant does not determine iconography. Use an icon only when it clarifies the action: a calendar for choosing a time, an external-link mark for leaving the site, or an arrow for a deliberately directional destination. Form submission controls and quiet secondary actions are text-only by default. Only directional icons translate on hover; calendars, status marks, and other semantic icons remain still.

Shared navy and mint primary buttons preserve their base color, lift by at most `2px`, scale by at most `1.5%`, and run one clipped white shine while hovered or keyboard-focused. The shine rests fully outside the clipped button and is not visible in the idle state. Light and ghost buttons use a quiet white-surface response with teal text and no lift. All variants press down by `1px` on activation. Disabled controls keep their dimensions, lose elevation, and remain visibly unavailable. Labels stay on one line, keyboard focus remains visible, and reduced motion removes button, shine, and icon transforms. Use Lucide icons and keep any directional motion short.

## Header

The shared header is a sticky white glass surface with official dark branding, desktop dropdowns, a responsive menu, and a readiness-tour action.

**Freeze status:** This header baseline was approved and frozen on 2026-08-25. Preserve its visual hierarchy, dimensions, navigation model, responsive behavior, branding, and motion treatment. Reopen the design only for an explicit new header request; accessibility, correctness, and release-critical responsive fixes remain allowed.

- Keep its dimensions, labels, routes, and interaction model stable.
- Desktop dropdowns open through fine-pointer hover, keyboard focus, or click.
- Escape closes the active menu and restores focus.
- Route changes and outside pointer actions close open navigation.
- Mobile navigation locks body scrolling while open.
- The Signal Lock entrance plays once at application mount and does not replay on client-side route changes.
- Logo, navigation, and actions remain interactive throughout the entrance.
- Reduced motion renders the final static header immediately.

Dropdown hover artwork uses the official emblem at low opacity. It stays behind readable content and never captures pointer events.

## Motion

Motion uses `motion/react` and focused CSS keyframes. `MotionContext` follows the operating-system reduced-motion preference.

Preferred properties:

- `opacity`
- `transform`
- `filter` only for short, small-area entrances

Avoid animating layout properties such as `top`, `left`, width, height, padding, or margin. Continuous canvas and WebGL effects must pause when hidden or offscreen and release their resources during cleanup.

Timing guidance:

- Hover and control feedback: `150ms` to `300ms`
- Component entrance: `300ms` to `500ms`
- Orchestrated first-load sequence: under `1s`
- Ambient loops: slow, low-contrast, and only where they explain product state

Spend motion in one place at a time. Header, hero, and route entrances should feel sequenced rather than simultaneous. Reduced motion removes translation, scale, parallax, and decorative loops while preserving complete content and visible state changes.

## Frozen Homepage Baseline

**Status:** approved and frozen on 2026-09-01. This section is the homepage release-baseline source of truth.

The approved order is Hero, popular-framework marquee, Connected Platform, Secura AI, focused Risk Management proof, Frameworks and Connectivity, Seven-Day Readiness Path, Blog, and final conversion. The shared footer follows the homepage narrative.

Preserve the current copy, section order, layout hierarchy, product-state compositions, responsive behavior, motion choreography, reduced-motion branches, links, and CTA hierarchy. Reopen a homepage surface only when the user explicitly requests a change to that surface. Accuracy, accessibility, legal, verified destination, release-critical responsive, and performance corrections may proceed without reopening the wider homepage design.

The frozen baseline includes:

- The **Fast Compliance, Smarter Audit Readiness** hero, **View plans** and **Explore the platform** actions, three animated proof values, dashboard Focus Stack, readiness panel, and four event cards.
- The fixed two-line **Compliance is always evolving. So are we.** proof copy beside the continuous popular-framework marquee; reduced motion uses the complete horizontally scrollable static list.
- Three manually selected Connected Platform domains: Cybersecurity readiness, the Privacy data-flow diagram, and the AI system inventory/risk view. Risk Management and Cloud Monitoring remain subordinate connected capabilities.
- The Review, Identify, Recommend Secura narrative and deterministic control-assessment canvas, including its stable responsive frame and complete reduced-motion result.
- The illustrative 25-cell Risk Management matrix, two critical states, summary metrics, and direct product destination.
- The asymmetric Frameworks and Connectivity ledger, approved scale metrics, registry-backed framework and integration proof, per-category **+ More in library** cues, and one destination link for each directory.
- The five-step Seven-Day Readiness Path positioned immediately before Blog, with its stable sticky preview, scroll-linked stages, and static reduced-motion completion state.
- The one-lead/two-supporting-story Blog index with direct WordPress destinations.
- The final mint conversion panel, one assembled Controllo emblem, accurate framework-first supporting copy, **Start free trial** pricing-intent action, and **Request a demo** action.
- The shared footer CTA **See Controllo with your workflow**, which continues to `/demo`.

### Hero Focus Stack

The homepage hero uses a three-layer Focus Stack: an enlarged, half-cropped Controllo dashboard as product context, orbit rings with faded bare Controllo emblems as separation, and the readiness panel plus event cards as the sharp foreground.

**Freeze status:** This hero Focus Stack baseline was approved and frozen on 2026-08-26 after targeted React best-practices review, focused component tests, responsive browser QA, and primary CTA hover parity with the frozen header CTA. Preserve its layer model, dashboard crop, card count and choreography, orbit treatment, primary CTA hover pattern, internal-only hover life, mobile/tablet clearance, and reduced-motion branch. Reopen the design only for an explicit new hero request; accessibility, correctness, and release-critical responsive or performance fixes remain allowed.

- Load `/assets/dashboard.webp` once as eager, high-priority decorative media. Keep the source SVG out of the rendered page.
- Crop toward overview metrics and the readiness trend. Keep the backdrop softly blurred, moderately visible, pointer-inert, and softened by an edge mask.
- Enter the dashboard as a tilted perspective plane, then settle it at a shallow final angle. Run one short mint/teal focus sweep; it does not loop.
- Extract the readiness panel from the dashboard plane with scale, translation, and perspective. After it settles, pop the event cards forward in their established positions using only scale, depth, and opacity; do not move them laterally through the panel. Keep all four event cards present on mobile/tablet with compact responsive positions rather than hiding half of the stack; the Secura card should sit above the foreground graphic at smaller widths so it does not cover the loader or readiness copy.
- Keep the orbit emblems bare, faded, decorative, and aligned to the existing circular paths. They may rotate quietly with the orbit lines, but must not use badge circles, card shells, or controls.
- Use `/assets/emblemLogo.svg` as the bare mark beside the “Readiness current” header inside the foreground graphic instead of the older CSS-built static mark.
- Add hover life only inside the readiness loader and internal row cards. Do not use a panel-wide sweep or an overall graphic hover effect.
- Reuse the header CTA shine and Lucide arrow pattern on the hero primary CTA; keep the secondary CTA quieter so the conversion action remains dominant.
- Keep **View plans** as the dominant pricing-intent action and **Explore the platform** as the quiet secondary action. The pricing destination does not claim that registration or payment is connected; activation remains a launch blocker in `docs/ROADMAP.md`.
- Leave the readiness panel and event cards still after the entrance. Do not add an ambient float loop.
- Over the hero scroll range, move the dashboard `18px` and the foreground scene `48px`, with only a very small dashboard scale change.
- Lower the backdrop opacity, tighten the crop, slightly reduce the foreground readiness graphic, and keep extra bottom clearance on tablet/mobile so the stack does not crowd the following section.
- Reduced motion renders the complete stack in its final state with no entrance transforms, sweep, or parallax.

### Homepage Seven-Day Readiness Path

The **Get started in 7 Days** chapter keeps its five-part Select, Assess, Implement, Review, and Collaborate narrative under **A Faster Path to Compliance**. On desktop, the product preview remains sticky while the current step advances from the section's scroll progress. At and below 1080px, the five steps use a focusable horizontal snap rail that updates the product preview without overlapping neighboring cards. The active narrative step uses one mint rule and restrained emphasis; inactive steps remain readable but quiet.

Use two circular low-contrast paths and three bare Controllo emblems behind the product preview as a visual echo of the Hero orbit. The paths do not run on a timer. Their opposing rotations are scrubbed only by section scroll, and the emblems remain between `8%` and `14%` opacity, pointer-inert, accessibility-hidden, and undistorted. Horizontal clipping may contain the field, but must not create a scroll container that breaks sticky positioning. Hide the decorative orbit on small mobile screens.

The card keeps one fixed frame while its stage label, readiness value, program signal, row states, and five-part progress rail change together. Use the official `/assets/emblemLogo.svg` beside the seven-day readiness identity. The graphical readiness ring may turn between stages, but its percentage and `readiness` label remain stationary. Each stage change may use one short internal crossfade/rise and a restrained mint signal sweep; it must not resize the card or add perpetual motion. Shared `ProductDemo` instances outside this section retain their established static presentation. Reduced motion renders the completed Collaborate state with a static orbit and no sweep or transforms.

### Secura Assessment Canvas

The homepage Secura canvas explains one concrete control assessment through a deterministic product story rather than imitating a live application. Open on a compact control-detail state with the framework breadcrumb, essential control metadata, a concise description, and one low-noise bottom module for connected policy/evidence/owner context plus the review scope Secura will check next. Place the accurate gradient Secura banner directly beneath the title; keep it short, single-row where space allows, free of an internal credits divider, use a transparent left edge, and use a Lucide right-arrow orb to communicate forward action.

Activating the native banner, or allowing the viewport sequence to advance, replaces the control detail with a top-start chat beat: one right-aligned user request followed by one left-aligned Secura AI response about the connected-evidence review. It then resolves into the complete result containing the compact packet identity, “2 gaps found” summary, one divided three-metric rail, four reviewable checks, and an action-ready Secura recommendation tray. The final tray replaces the activation banner so the story ends with the next action rather than repeating the entry point; it may serve as a replay affordance, but it must read visually as Secura’s recommended action. The full cycle loops only while at least 35% of the panel is visible, resets when it leaves, and restarts cleanly on return. It is a frontend demonstration, not a live chat or credit-accounting product.

Keep the centered panel at a `450px` maximum on larger screens with safe equal mobile gutters and one shared fixed-height frame across the control-detail, chat, and result phases. Phase content may animate inside the frame, but the right graphic card itself must not change height or clip the first or final state. Preserve the low-contrast CursorGrid only in the motion-enabled branch. Do not add decorative corner brackets, an oversized engine core, connectors, nested metric-card clutter, functional navigation, download controls, browser chrome, customer data, or incidental dashboard errors. Mobile must retain the control context, prompt, metrics, and all statuses without horizontal overflow. Reduced motion omits the CursorGrid and loop and renders the complete result immediately.

The Secura section uses two equal desktop columns. Center the narrative and product canvas independently inside their respective halves with the same maximum width. Present Review, Identify, and Recommend as a compact connected signal rail rather than large segmented tabs. The outer rail owns one uninterrupted connector behind opaque numbered nodes; individual steps must not introduce their own boxes, borders, or connector fragments. Keep Review current through the mint node, title, and a restrained parent-level background wash. Draw the connector once and settle the nodes in sequence, then remain static. Collapse to one vertical spine on mobile and render the final state immediately for reduced motion. Do not restyle or reposition the approved product animation when refining the text side.

### Homepage Connected Platform

**Freeze status:** included in the 2026-09-01 frozen homepage baseline. Keep Cybersecurity, Privacy, and AI Governance as the three equal, manually selected governance domains. Keep Risk Management and Cloud Monitoring as two compact connected-capability links beneath the main panel. Do not autoplay domain tabs.

At desktop widths the active panel is a stable 50/50 split with both inner compositions centered in their halves. At tablet and mobile widths, stack narrative before product proof with no horizontal overflow. Preserve the SOC 2 readiness console, Customer onboarding privacy data-flow diagram, and Customer support assistant AI inventory/risk composition. Use concise verified feature labels, a short crossfade/slide on manual selection, and a static state under reduced motion.

### Homepage Risk Prioritization

Place the focused Risk Management proof directly after Secura and before Frameworks so the narrative moves from identified gaps to prioritized action and then to reusable framework coverage. This section supplements the compact connected-capability link; it does not promote Risk Management into a fourth governance-domain tab.

Keep the 25-cell illustrative exposure matrix, two critical states, three summary metrics, honest illustrative-data label, and direct `/platform/risk-management` destination. When motion is enabled, reveal the cells in one diagonal sequence, pass one restrained scan through the matrix, resolve the critical states last, and settle the metrics afterward. The sequence plays once on entry and then becomes still. Do not pin the section, scrub the grid continuously, loop pulses, or imply that the example values are live customer data. Reduced motion renders the complete final matrix without the scan or entrance transforms. Stack narrative before product proof at and below the existing 1080px breakpoint, retain readable mobile metrics, and prevent horizontal overflow at 320px.

### Homepage Frameworks And Connectivity

**Freeze status:** included in the 2026-09-01 frozen homepage baseline. Use one static proof ledger, not a second tab bar, filter control, animated relationship diagram, or card grid. The left navy field explains the shared-control model and carries the approved scale evidence: 100+ frameworks, 7,000+ structured controls, and 200,000+ control relationships. The light field groups representative framework paths from the framework registry and current integration surfaces from the integration registry.

Keep framework and integration data derived from their existing registries so homepage proof cannot drift from the directory surfaces. Keep the static **+ More in library** cue aligned with every framework-category heading; it communicates breadth without inventing category totals or becoming another control. Use sparse horizontal rules, compact locally hosted brand marks from the shared registry, and one destination link for each directory. When an exact reviewed product mark is unavailable, retain the neutral category icon rather than substituting a related service logo. Preserve the asymmetric split through 1024px, stack the navy and light fields below 960px, and collapse the two proof columns into one at the established mobile breakpoint. Do not reintroduce the old path filters, center bubble, SVG connector paths, decorative status dots, or perpetual dashed-line motion.

### Homepage Blog Editorial Index

**Freeze status:** approved and frozen on 2026-08-30. Use one lead article and two supporting reads in a calm editorial index, not a floating card grid. Keep the section header left-led with one archive destination, then use shared horizontal rules and a single desktop column divider to establish hierarchy.

Each story remains a semantic, named article landmark with one direct WordPress destination and a visible keyboard focus state. Preserve the lead/supporting hierarchy through 1024px, stack all stories below 960px, and remove the divider cleanly when stacked. Do not add stock imagery, fabricated dates, runtime WordPress fetching, autoplay, carousels, shadows, or nested article cards. Add article imagery only after approved WordPress assets and responsive crops are available.

### Homepage Final Conversion

**Freeze status:** included in the 2026-09-01 frozen homepage baseline. Keep one mint conversion panel with the narrative on the left and a dedicated brand field on the right. The brand field uses the official three-segment Controllo emblem as one inline SVG; its segments assemble once from short offsets and then remain still. Reduced motion renders the completed emblem immediately.

Keep the supporting copy framework-first: visitors start with relevant frameworks and connect controls, evidence, risks, and ownership as their assurance program grows. Keep **Start free trial** as the dominant navy action with one right arrow and **Request a demo** as the quieter white action with a calendar icon. Do not repeat the arrow on both actions. The primary reuses the header CTA's clipped shine and `1.5%` maximum hover/focus scale. The secondary remains non-shiny, does not lift, and uses the homepage Hero secondary action's quiet teal text response while its calendar stays still. Preserve the split through 1024px, stack the emblem into a compact lower band below 900px, and make both actions full width on small mobile screens. Do not reintroduce double rings, duplicated emblems, looping motion, stock imagery, package language, or extra conversion claims.

## Frozen Cybersecurity Hero Baseline

**Status:** approved and frozen on 2026-09-03 after focused component tests and responsive browser QA.

Keep the approved headline, supporting copy, two actions, and vertically centered desktop split. The right visual uses one enlarged, pointer-inert **Access review** workspace with its final shallow perspective applied from the first frame. One low-contrast elliptical orbit sits behind the dashboard. Exactly two bare official Controllo emblems follow that same path in the same forward direction with a half-cycle separation; they may disappear naturally while passing behind the product plane.

On desktop and tablet, retain the four product-aligned proof cards for Secura AI, cloud security, identity and endpoint risk, and framework coverage. They enter once from the dashboard origin using only transform and opacity, then remain still. On small mobile screens, retain the two primary Secura and cloud cards and hide the lower supporting pair. Preserve the transient center signal, accurate local brand marks, decorative semantics, pointer inertness, zero horizontal overflow, and the complete reduced-motion state.

Do not add backing dashboard sheets, a dashboard perspective entrance, a second orbit, counter-rotating emblems, lateral ambient card drift, or more proof cards. A future GSAP implementation does not itself reopen this surface; changes require an explicit Cybersecurity-hero request. Accessibility, verified responsive defects, product-claim corrections, and release-critical performance fixes may still proceed.

## Navigation And Interaction

- Every interactive element has a visible hover and focus state.
- Familiar actions use Lucide icons rather than text symbols or hand-drawn interface icons.
- Buttons state commands; links state destinations.
- Dropdown triggers expose `aria-expanded` and `aria-controls`.
- Option groups use toggles, tabs, filters, or segmented controls according to behavior.
- Touch interactions complete on the first tap and never depend on hover discovery.

## Imagery And Product Visuals

Prefer real product-state compositions: readiness panels, evidence status, control mapping, risk state, ownership, and framework flow. Decorative brand imagery may support these surfaces but cannot replace inspectable product content.

Approved assets:

- `/assets/logo-dark.svg` on light surfaces
- `/assets/logo-light.svg` on navy or sufficiently dark surfaces
- `/assets/emblemLogo.svg` as decorative brand geometry
- `/assets/brands/*.svg` for reviewed third-party integration marks, consumed through `src/data/brandAssets.js` and `IntegrationLogo`; `BrandLogo` remains reserved for Controllo's own wordmark

Keep logos undistorted, uncropped, and readable. Decorative uses are empty-alt, `aria-hidden`, pointer-inert, and low-opacity.

## Tailwind And CSS Ownership

- Put component spacing, layout, breakpoints, color, and interaction classes in JSX with Tailwind utilities.
- Keep `src/styles.css` for theme tokens, base rules, shared primitives, keyframes, pseudo-elements, and visualization geometry.
- Reuse `.shell`, `.section`, `.button`, `.lede`, `.eyebrow`, and section-heading primitives where they match the need.
- Add a shared primitive only when at least two owners need the same behavior.
- Do not add a component stylesheet for behavior expressible clearly with utilities.

## Accessibility

- Maintain WCAG AA contrast for text and controls.
- Minimum interactive target: `44px`.
- Focus outlines remain visible and are never replaced by hover alone.
- Decorative media is hidden from assistive technology.
- Navigation remains usable by keyboard and touch.
- Reduced motion produces a complete static experience.
- Text and controls must fit at `320px` without horizontal scrolling.

## Copy And Content

Use the product terms in `CONTEXT.md`. Write from the user's operating reality: controls, evidence, risks, owners, frameworks, decisions, and readiness. Keep claims reviewable and avoid unsupported automation, coverage, or outcome promises.

## Avoid

- Generic purple/pink AI styling
- Oversized marketing headings inside compact product surfaces
- Decorative card grids without information hierarchy
- Nested cards and floating section containers
- Persistent animation that competes with reading or navigation
- Layout-shifting hover states
- Gradient or emblem layers over readable text
- Manual SVG interface icons when Lucide provides the symbol
- Unverified customer proof, integrations, framework coverage, or legal claims

## Visual Completion Check

Before calling a visual change complete:

1. Inspect `375px`, `768px`, `1024px`, and `1440px` layouts.
2. Verify mouse, keyboard, and touch interaction paths.
3. Verify reduced-motion output.
4. Check text fit, focus visibility, contrast, clipping, and horizontal overflow.
5. Check route changes and shared-layout persistence when relevant.
6. Confirm decorative layers are pointer-inert and accessibility-hidden.
7. Run the narrowest affected automated checks.
8. Record user-visible capability or launch-blocker changes in `docs/ROADMAP.md`.
