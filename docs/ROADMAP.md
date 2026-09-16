# Roadmap and Current Progress

Last reviewed: 2026-09-15

This file is the current delivery source of truth. Update it when a capability or launch blocker changes; keep speculative ideas out until they have an owner and a clear outcome.

## Current Baseline

Status: functional development build, not approved for production launch.

Implemented:

- React/Vite SPA with shared layout, release-hardened responsive navigation, route transitions, and branded not-found handling
- Calm first-load Signal Lock navbar entrance plus a stable-color CTA shine, with reduced-motion fallbacks and no persistent header runtime
- Tailwind CSS v4 visual system with component-owned utility classes, shared tokens/primitives, and a focused effects stylesheet
- Shared button behavior with consistent hover, press, disabled, focus, and reduced-motion states; icon motion is reserved for explicitly directional actions rather than tied to primary or secondary variants
- Homepage frozen as a complete 2026-09-01 release baseline covering the popular-framework marquee, three governance domains, connected risk and cloud capabilities, Secura AI, focused risk prioritization, framework reuse, the seven-day readiness path, current WordPress guidance, final conversion, and footer handoff
- Locally hosted integration brand marks shared by the homepage connectivity proof and integrations directory, with a neutral fallback where an exact reviewed product mark is unavailable
- Homepage hero Focus Stack with an enlarged perspective dashboard, a readiness graphic that extracts from its plane, four responsive event cards that pop forward in place after it settles without covering the mobile loader/copy, faded bare Controllo emblems orbiting the hero rings, the real emblem beside the readiness header, internal loader/row hover life, a header-matched primary CTA shine/icon hover, a one-shot light activation sweep, distinct scroll depth, responsive crop, extra tablet/mobile bottom clearance, and a static reduced-motion state
- Homepage hero content aligned to the two-tone “Fast Compliance, Smarter Audit Readiness” narrative, with governed framework/control/mapping proof, a pricing-intent **View plans** primary action, and low-friction platform exploration
- Viewport-driven Secura grid current with matching 42px square tiles, offscreen pausing, no user interaction, and a static reduced-motion fallback
- Product-authentic Secura viewport loop with the existing CursorGrid, a compact control-detail opening state, connected policy/evidence/owner context, review-scope inputs, the real gradient Secura activation banner, a deterministic control-review request, a “2 gaps found” result, one continuous three-metric rail, four reviewable checks, an action-ready recommendation tray, constrained centered composition, and a static reduced-motion result state
- Platform pages for overview and Secura AI
- [x] Replace the generic Continuous Compliance route with a dedicated six-section page covering between-audit change, control and evidence maintenance, manually selected operating steps, user-initiated Secura review, qualitative readiness oversight, framework reuse, and a claim-safe trial/demo handoff.
- [x] Replace the generic Risk Management route with a dedicated five-section page covering structured assessments, risk ownership, organization/asset/vendor/privacy/AI context, risk register and heatmap visibility, linked-control context, and claim-safe trial/demo handoff. Its hero uses one stable-perspective representative risk workspace with the current assessment scale, a restrained decision loop, connected owner/control context, target-exposure framing, dashboard-origin proof-card entrances, a readable mobile reflow, and a static reduced-motion state. The challenge-to-response journey now gives the second section a sticky decision context, four larger scrolling challenge cards, and one-time viewport entrances; the assessment section now presents a scroll-driven Risk Signal Workbench with selected assessment criteria, product-scale `0/2/5/8/10` heatmap buckets, manual register/heatmap views, a persistent linked-context drawer, and a compact outcome rail.
- [x] Replace the generic Audit Management route with a dedicated five-part page covering framework scope and XLSX export, a four-view audit ledger, linked policy/evidence records, auditor contacts and internal/external framework assignments, and a single-action demo handoff. Its representative product views use illustrative records rather than customer data or unapproved captures; repository tabs are manual and keyboard operable. Public claim and screenshot approval remain launch gates.
- [x] Replace the generic Cloud Monitoring route with a dedicated seven-part page covering supported cloud asset and configuration visibility, security and compliance context, workforce identity and endpoint signals, available user-level exposure indicators, and accountable Jira-backed workflows. Its animated Cloud Visibility Radar uses verified sources, qualitative source-to-core signals, one configuration attention state, and a complete reduced-motion view instead of customer data, readiness scores, or literal real-time claims. Slack and Asana remain excluded until integration availability is verified.
- Solution pages for cybersecurity, privacy operations, AI governance, enterprise, and growing teams
- [x] Replace the generic Cybersecurity route with a claim-verified six-section page covering framework implementation, Secura review, risk and auditor context, supported cloud/workforce monitoring, framework reuse, and an externally configurable trial handoff. The route has distinct responsive graphics, keyboard-operable tabs, one-shot motion, and complete reduced-motion states.
- [x] Replace the generic AI Governance route with a dedicated six-section page for AI-system inventory, risk assessment, accountable ownership, Secura review, conservative framework context, and connected conversion. The explicit lazy route has two manually operated keyboard-accessible selectors, responsive product-led compositions, focused validation, and complete reduced-motion output; production launch approval is still governed by the launch blockers below.
- Framework directory with search/filter and live detail pages for SOC 2, ISO 27001, and HIPAA
- Integration directory with search/filter
- Resource directory and detail routes
- Capability-based package comparison
- Company, security, privacy-policy, terms, and accessibility routes, with legacy `/privacy` redirected to privacy operations
- Demo form validation, duplicate prevention, honeypot, simulated/local mode, optional endpoint mode, and optional booking handoff
- Page metadata, canonical URLs, JSON-LD, robots rules, sitemap, and SPA fallback file
- Keyboard affordances, skip link, visible focus, operating-system reduced-motion support, and WebGL fallback
- Automated interaction/component tests and a successful production build
- Maintainer and AI context documentation

## Recent Validation

Use this section for the latest useful proof only. Avoid adding full diary-style validation streams; record narrow evidence that changes release confidence, then keep detailed command output in the task where it was run.

- Last full validation: 2026-08-24, `npm test -- --run` passed 18 tests in 5 files and `npm run build` completed successfully. The full suite and production build have not been rerun after later focused work.
- Latest focused release audit: 2026-09-09 Continuous Compliance page validation passed 38 focused tests across 7 files, with browser QA across desktop, tablet, and mobile confirming zero horizontal overflow, visible focus, valid CTA destinations, complete responsive layout, and no console warnings or errors.
- Risk page validation: 2026-09-15 focused page tests passed 6/6; browser QA at 375px, 768px, 1024px, and 1440px confirmed the hero and decision-ledger layouts, zero horizontal overflow, and no console warnings or errors. The final CTA and compact heatmap tab were also reviewed at 1280px, with correct trial/demo destinations and no horizontal overflow. Recheck the final CTA at mobile width before production sign-off.
- Audit page development validation: 2026-09-15 eight focused tests passed across the dedicated page, routing, generic FAQ, and sitemap checks. Each section was inspected in desktop/mobile browsers; final containment checks passed at 320px, 375px, 768px, 1024px, and 1440px. Metadata, canonical URL, two `/demo` actions, visible keyboard focus, and complete reduced-motion output were checked. A fresh normal-motion load had no console errors or warnings; reduced-motion emulation emitted only Motion's expected developer notice. This is not public-claim or production approval.
- Current validation policy: run only affected tests and browser checks unless the user explicitly requests a production build, full suite, dependency install, or broader validation.

## Frozen Audit Management Hero Baseline

Status: approved and frozen on 2026-09-15.

Keep the vertically balanced split hero with left-aligned copy, two-tone Manrope heading with the teal **reviewers aligned.** accent, demo/workspace actions, no bottom pointer rail, and the representative audit orbit stage on the right. The visual remains a product-grounded illustration around one selected control, with framework scope, linked policy/evidence records, internal/external auditor assignments, and XLSX framework export context. The shared three-layer wave closes the mist-to-white boundary; orbit, connector, and wave motion stop when site motion is paused or reduced.

Treat further hero copy, layout, visual composition, card placement, headline scale, color treatment, and motion changes as out of scope unless a new request explicitly reopens the hero. Accessibility, verified responsive defects, product-claim corrections, metadata issues, and release-critical performance fixes may still proceed.

## Frozen Audit Management Page Baseline

Status: approved and frozen as a development baseline on 2026-09-16; production launch approval remains governed by the blockers below.

Keep the dedicated route order and scope: frozen hero, four-view audit workspace, animated policy/evidence documentation stack, auditor assignment section, and retro final CTA. The representative visuals must stay illustrative and claim-safe: framework scope/readiness with XLSX export, linked policy/evidence records with effective dates and controls, and internal/external auditor framework assignments. Preserve the current spacing rhythm, sticky workspace centering, reduced-motion output, shared button treatments, and CTA destinations.

Treat further route copy, layout, visual composition, motion polish, and CTA hierarchy changes as out of scope unless a new request explicitly reopens this page. Accessibility, verified responsive defects, product-claim corrections, metadata issues, route fixes, and release-critical performance fixes may still proceed.

## Frozen Risk Management Hero Baseline

Status: approved and frozen on 2026-09-15.

Keep the vertically centered split, quiet capability rail, enlarged stable-perspective risk workspace, subtle orbit, heatmap and treatment-timeline proof cards, and compact outcome card. The representative product sequence uses the verified `0/2/5/8/10` assessment scale to show `8 × 10 = 80 · High`, connected owner/control context, treatment progress, and a clearly labeled `5 × 10 = 50 · Moderate` target exposure; it does not claim automatic remediation or a completed residual-risk calculation. Motion remains viewport-bound and restrained, while reduced motion renders the completed state.

Treat further hero copy, layout, workspace composition, proof-card placement, scale, or motion changes as out of scope unless a new request explicitly reopens the hero. Accessibility, verified responsive defects, product-claim corrections, metadata issues, and release-critical performance fixes may still proceed.

## Frozen Risk Management Page Baseline

Status: approved and frozen as a development baseline on 2026-09-15; production launch approval remains governed by the blockers below.

Keep the five-section order: verified representative risk hero, scrolling challenge-to-decision journey, manually selected risk contexts, scroll-driven Risk Signal Workbench, and the distinct final conversion stage. The second section now carries more route weight without duplicating later product proof: a sticky decision context stays beside four large challenge cards that each resolve into a Controllo response and reviewable decision outcome. The product-split variant remains rejected for this pass because section 3 and section 4 already carry the heavier product canvases. The fourth section uses desktop `gsap`/`ScrollTrigger` progression for Assess, Map, Prioritize, and Review chapters; its heatmap uses product-scale `0/2/5/8/10` impact and likelihood buckets with visible score, count, and context labels instead of website-only A1/B1 coordinates. Preserve manual register/heatmap tabs, mobile and reduced-motion fallback output, persistent linked-context drawer, compact outcomes, and claim-safe trial/demo handoff without claiming automatic scoring, autonomous remediation, live compliance status, treatment tracking, or completed residual-risk calculation.

Treat further page copy, layout, visual composition, and motion polish as out of scope unless a new request explicitly reopens this route. Accessibility, verified responsive defects, factual corrections, metadata issues, and release-critical performance fixes may still proceed.

## Frozen Continuous Compliance Hero Baseline

Status: approved and frozen on 2026-09-08.

The approved baseline keeps the centered editorial split, Manrope heading with a teal color-only **Beyond the audit** accent, trial/demo actions, a three-part capability rail, and the claim-audited representative **Compliance Current workspace**. The product visual uses mapped access-review language, qualitative state cards with distinct icons, anchored evidence/owner/history annotations, and a next accountable action without percentages, live-status claims, or an invented control identifier. A shared three-layer wave divider now carries the mist hero into the following white section and resolves statically when motion is paused or reduced.

Treat further hero copy, layout, workspace composition, annotation inventory or position, wave choreography, capability-rail styling, and visual restyling as out of scope unless a new request explicitly reopens the hero. Accessibility corrections, verified responsive defects, product-claim corrections, metadata issues, and release-critical performance fixes may still be patched without reopening the design.

## Frozen Continuous Compliance Between Audits Baseline

Status: approved and frozen on 2026-09-08.

The approved second section keeps the compact wave handoff, split narrative heading, four-item ordered change ledger, and factual SOC 2 Type 2 and ISO/IEC 27001 standards band. Its final audit corrected ordered-list semantics, raised supporting copy to 14px, introduced the contrast-safe Teal Ink token for small text on mist, aligned current SOC terminology, and reduced the section reveal to 450ms while preserving the 50ms scenario stagger and complete reduced-motion state. Browser QA at 1280×720, 375×812, and 320×800 confirmed the desktop ledger, mobile stack, standards transition, and zero horizontal overflow with no console warnings or errors. The focused Continuous Compliance page test passed all 3 tests; `git diff --check` passed. No production build was run.

Treat further copy, ledger composition, standards presentation, iconography, spacing, and motion changes as out of scope unless a new request explicitly reopens the section. Accessibility corrections, verified responsive defects, claim corrections, and release-critical performance fixes may still proceed without reopening the wider design.

## Frozen Continuous Compliance Operating Loop Baseline

Status: approved and frozen on 2026-09-08 after final product-language, interaction, motion, and responsive review.

The approved third section keeps the five-step **Set scope**, **Maintain controls**, **Add evidence**, **Review context**, and **Track readiness** story in a viewport-filling desktop stage with an editorial active chapter at the left shell edge and one stable representative workspace on the right. Deliberate scroll advances the qualitative product states while the compact selector remains pointer and keyboard operable; smaller and reduced-motion layouts remain unpinned and manual. The Controllo navy field uses a low-contrast moving square grid with a restrained fine-pointer hover cell, no touch interception, offscreen pausing, and a static reduced-motion state.

The final content audit aligned the narrative with verified product language: frameworks retain visible scope, requirements connect to mapped controls, owners remain accountable, implementation and policy context stay linked, evidence retains source, review-period, freshness, and approval context, risk context remains connected, and readiness exposes qualitative status plus a next accountable action. The section does not claim aggregate readiness scoring, autonomous approval, continuous control testing, real-time compliance, or time-based workflow automation. Treat further copy, product-state inventory, chapter structure, workspace composition, background treatment, scroll choreography, and responsive restyling as out of scope unless a new request explicitly reopens the section. Accessibility corrections, verified responsive defects, product-claim corrections, and release-critical performance fixes may still proceed without reopening the wider design.

## Frozen Continuous Compliance Oversight Baseline

Status: approved and frozen on 2026-09-09 after final connector, icon, product-copy, interaction, and responsive review.

The approved fourth section keeps the existing **Readiness oversight** introduction and the two manual tabs, **Review with Secura** and **Track readiness**, inside one integrated workspace plane. The Secura view is explicitly user initiated, presents selected control context, shows three distinct review inputs, routes them through a clean input-to-finding-to-recommendation path, and resolves with **Link the latest approved access-review record** plus the human-review boundary. Directional connectors must begin and end at the relevant workflow planes without overlapping content.

The readiness view keeps a qualitative support ledger for implementation, policy and procedure, evidence, and ownership. It uses state labels and distinct icons instead of percentages, progress bars, aggregate readiness scores, autonomous-change claims, real-time compliance claims, or continuous-control-testing claims. Reduced motion renders the complete selected state immediately, and tabs remain user controlled with pointer, touch, Arrow keys, Home, and End.

Treat further copy, iconography, connector geometry, workspace layout, tab behavior, qualitative state inventory, and visual restyling as out of scope unless a new request explicitly reopens this section. Accessibility corrections, verified responsive defects, product-claim corrections, and release-critical performance fixes may still proceed without reopening the wider design.

## Frozen Continuous Compliance Framework Reuse Baseline

Status: approved and frozen on 2026-09-09 after product-copy, route, responsive-layout, and visual review.

The approved fifth section keeps the shared-control narrative, four support signals for implementation, policy and procedure, evidence, and risk context, and eight representative framework paths. SOC 2 and ISO/IEC 27001 retain their published detail links, the remaining framework names stay plain text until their routes are approved, and **Explore frameworks** remains the only directory action.

Treat further copy, support-signal inventory, framework-path inventory, layout, iconography, links, and visual restyling as out of scope unless a new request explicitly reopens this section. Framework logos and additional verified detail links remain intentionally deferred under `FS-019`; accessibility corrections, verified responsive defects, product-claim corrections, and release-critical performance fixes may still proceed without reopening the wider design.

## Frozen Continuous Compliance Closing Conversion Baseline

Status: approved and frozen on 2026-09-09 after final copy, visual, motion, accessibility, and responsive review.

The approved sixth section is a compact navy closing poster that hands directly into the shared navy footer. Preserve the centered uppercase heading, white lead line, warm-white-to-lavender-to-coral gradient accent with its restrained soft glow, oversized low-opacity Controllo watermark, concise supporting copy, and compact conversion rail. **Start free trial** remains the mint primary action to `/pricing`; **Request a demo** remains the quiet outlined action to `/demo`; the proof sentence remains subordinate to both actions. The one-shot entrance reveals the lead line, then the accent flow, description, actions, and proof in under 750ms, with no ambient loop. Reduced motion renders the complete composition immediately.

Do not add email capture, awards, trust-logo strips, copied reference assets or wording, autoplay, cursor tracking, video, aggregate metrics, unsupported product claims, or a separate visual break before the footer. Treat further copy, typography, gradient palette, glow, watermark, conversion-rail composition, motion, and responsive restyling as out of scope unless a new request explicitly reopens this section. Accessibility corrections, verified responsive defects, product-claim corrections, route fixes, and release-critical performance fixes may still proceed without reopening the wider design.

## Frozen Continuous Compliance Page Baseline

Status: all six sections are approved and frozen on 2026-09-09.

Preserve the current six-section narrative order, shared header and footer behavior, product-safe qualitative states, published route boundaries, manual selector behavior, responsive transitions, and reduced-motion completion states. Reopen page composition, section design, public copy, motion choreography, or conversion treatment only through an explicit request. Accessibility corrections, verified responsive defects, factual or legal corrections, metadata and route fixes, and release-critical performance work remain permitted. Evidence-dependent product proof remains governed by `FS-018`; framework logos and additional framework links remain governed by `FS-019`.

## Frozen Cybersecurity Response Story

Status: approved and frozen on 2026-09-02.

The approved baseline is the five-chapter Signal Spine, its scroll-synchronized Assurance Dossier, equal-height claim-safe scenes, responsive inline evidence cards, navbar-to-viewport centering, reserved exit space, pointer-inert illustrative treatment with one header disclosure and no redundant footer row, a spine that terminates precisely at the final node, and static reduced-motion completion state.

Treat further chapter pacing, scene composition, motion choreography, visual restyling, and product-copy changes as out of scope unless a new request explicitly reopens this section. Accessibility corrections, verified responsive defects, claim corrections, and release-critical performance issues may still be patched without reopening the design.

## Frozen Cybersecurity Hero Baseline

Status: re-approved and frozen on 2026-09-07.

The approved baseline keeps **Cyber readiness** teal and the remaining headline navy while every word retains identical Manrope typography, with no italic or secondary-font accent. It preserves the two actions beside one stable-perspective **Access review** workspace. One low-contrast orbit and two same-direction Controllo emblems sit behind the dashboard; four desktop proof cards pop once from the dashboard origin, while small mobile screens retain the two primary cards. The visual remains pointer-inert, claim-safe, responsive, and complete under reduced motion.

Treat further hero composition, orbit count or direction, dashboard perspective, proof-card inventory, choreography, and visual restyling as out of scope unless a new request explicitly reopens this hero. Accessibility corrections, verified responsive defects, product-claim corrections, and release-critical performance issues may still be patched without reopening the design.

## Frozen Cybersecurity Secura Baseline

Status: approved and frozen on 2026-09-03.

The approved baseline is one compact, stable **Secura control review** workspace with a viewport-bound loop through scope, analysis, and result. The loop begins only when the workspace is visible, stops when it leaves the viewport, and restarts cleanly when it returns. No playback or replay control is shown. Reduced motion resolves directly to the complete result, and the product-verified review inputs, named gaps, recommendation, and human-validation language remain unchanged.

Treat further layout, phase timing, animation choreography, controls, copy, and visual restyling as out of scope unless a new request explicitly reopens this section. Accessibility corrections, verified responsive defects, product-claim corrections, and release-critical performance issues may still be patched without reopening the design.

## Frozen Cybersecurity Operational Monitoring Baseline

Status: approved and frozen on 2026-09-03.

The approved baseline is the split **Operational Monitoring Console** with three manually selected views, a navy source roster with uniform reviewed brand lockups, and a light workspace that keeps current visibility separate from items needing review. Counts are derived from view content, icons are semantically distinct, the desktop frame remains stable, all three mobile tabs remain visible, keyboard navigation wraps, reduced motion is complete, and operational monitoring does not claim to update compliance status.

Treat further layout, view inventory, icon-family or logo treatment, motion, copy, and visual restyling as out of scope unless a new request explicitly reopens this section. Accessibility corrections, verified responsive defects, product-claim corrections, and release-critical performance issues may still be patched without reopening the design.

## Frozen Header Baseline

Status: frozen on 2026-08-25 for release preparation.

The approved baseline includes the responsive layout, official wordmarks, desktop dropdowns, mobile menu, active and focus states, Signal Lock entrance, and demo-request CTA. The CTA keeps its base color, has no visible idle shine, and runs its clipped shine only on hover or keyboard focus.

Treat further visual restyling, motion concepts, navigation restructuring, and CTA redesign as out of scope unless a new request explicitly reopens the header. Accessibility fixes, verified navigation defects, content corrections, and release-critical responsive issues may still be patched without reopening the design.

## Frozen Hero Focus Stack

Status: frozen on 2026-08-26 and included in the complete 2026-09-01 homepage baseline.

The approved baseline includes the enlarged half-cropped dashboard backdrop, extracted readiness panel, four responsive event cards, Secura AI insight card, orbiting bare emblems, one-shot focus sweep, internal-only hover life on the loader and row cards, header-matched primary CTA hover, scroll depth, mobile/tablet bottom clearance, and reduced-motion final state.

Treat further hero motion concepts, dashboard composition changes, new cards, card choreography, orbit styling, and visual restyling as out of scope unless a new request explicitly reopens the hero. Accessibility fixes, verified responsive defects, content corrections, and release-critical performance issues may still be patched without reopening the design.

## Frozen Homepage Narrative

Status: approved and frozen on 2026-09-01. The design system's **Frozen Homepage Baseline** is authoritative.

The approved homepage order is Hero, popular-framework marquee, Connected Platform, Secura AI, focused Risk Management proof, Frameworks and Connectivity, Seven-Day Readiness Path, Blog, and final conversion CTA. The shared footer follows. Cybersecurity, Privacy, and AI Governance remain the three equal governance domains. Risk Management and Cloud Monitoring remain connected capabilities, not two additional top-level domain tabs; the additional Risk proof is a narrative handoff from identified gaps to prioritized action, not a fourth governance domain. Domain panels change only after manual selection and keep a stable equal-column desktop frame. The Secura narrative carries one contextual product-page link; its assessment canvas remains an interactive demonstration rather than a navigation surface.

The hero uses **View plans** and **Explore the platform**. The header uses a quiet **Start free trial** pricing link and primary **Request a Demo** action. The final panel uses **Start free trial** and **Request a demo**, while the footer uses **See Controllo with your workflow**. Pricing-intent actions do not claim that registration or payment is connected. Do not add payment, customer logos, testimonials, unverified integrations, or new homepage sections without explicitly reopening the relevant product/content decision.

## Frozen Homepage Blog Index

Status: frozen on 2026-08-30 and included in the complete 2026-09-01 homepage baseline.

The approved baseline is one lead article and two supporting reads, direct WordPress destinations, sparse editorial rules, responsive stacking below 960px, semantic article landmarks, and no unapproved imagery or runtime WordPress dependency.

Treat article-card restyling, carousels, stock imagery, fabricated dates, runtime feeds, and additional homepage stories as out of scope unless a new request explicitly reopens the section. Link corrections, approved article replacements, accessibility fixes, and release-critical responsive issues may still be patched without reopening the design.

## Frozen Homepage Final Conversion CTA

Status: frozen on 2026-09-01 for release preparation.

The approved baseline is one mint split panel, accurate framework-first supporting copy, one non-looping three-segment emblem assembly, a dominant arrow-led trial-intent action to pricing with the navbar's clipped shine and restrained scale, and a quieter calendar-led demo action with the Hero secondary action's no-lift color response. The emblem becomes a compact lower band below 900px, and actions become full width on small mobile screens.

Treat new decorative concepts, double rings, duplicate emblems, looping animation, CTA hierarchy changes, and additional conversion claims as out of scope unless a new request explicitly reopens the section. Destination corrections, accessibility fixes, and release-critical responsive issues may still be patched without reopening the design.

## Conversion CTA Phases

### Phase 1 — Pricing intent and demo request (current)

- Hero primary: **View plans** leads to pricing.
- Hero secondary: **Explore the platform**.
- Navbar quiet action: **Start free trial** leads to pricing.
- Navbar primary: **Request a Demo**.
- Final homepage panel: **Start free trial** leads to pricing as an interim intent CTA; it does not claim that registration is connected.
- Footer: **See Controllo with your workflow** leads to the demo route.
- Rename the action to **Book a Demo** only when visitors can select a calendar time directly.

### Phase 2 — Activated free trial (planned)

- Release only after signup, workspace creation, and a useful guided first-session state are functional.
- Navbar keeps **Book a Demo** prominent and adds **Start Free Trial** as a quiet action.
- Hero promotes **Start Free Trial**, keeps **Book a Demo** secondary, and moves **Explore the Platform** to a tertiary text link.

### Phase 3 — Evidence-led optimization (planned)

- Compare trial activation, first setup completion, demo booking completion, qualified opportunities, and influenced pipeline.
- Promote **Start Free Trial** globally only if self-serve activation consistently succeeds without sales assistance.

## Launch Blockers

These items must be resolved before calling the website production-ready.

- [ ] Replace privacy and terms placeholders with approved legal language and publish valid privacy/security contact channels.
- [ ] Configure a production lead endpoint and verify validation, CORS, rate limiting, spam handling, retention, deletion, CRM/email delivery, and failure recovery.
- [ ] Supply the approved production `VITE_TRIAL_URL` owned by the external trial application, connect pricing-intent actions to the approved registration/payment handoff, verify registration and useful first-session activation end to end, and reconcile the external system's trial duration before publishing any duration claim.
- [ ] Decide whether analytics will launch. If yes, load it only under the approved consent policy and honor `essential`; if no, remove unsupported analytics language and event behavior.
- [ ] Approve all product claims, framework claims, package descriptions, integration availability, and customer-facing proof.
- [ ] Complete editorial and product-claim review of every WordPress article linked from the homepage; remove unsupported outcome promises, reconcile framework/control counts, and correct copy before launch.
- [ ] Confirm the deployment host, HTTPS/domain configuration, and deep-route fallback on the production origin.

## Release Quality

Complete after the blockers and before launch:

- [x] Harden and freeze the shared header navigation, official light/dark wordmarks, Signal Lock entrance, stable-color hover-only CTA shine, keyboard closing, route state, and responsive menu behavior.
- [x] Harden and freeze the homepage hero Focus Stack, dashboard backdrop, extracted readiness panel, responsive event-card layout, header-matched primary CTA hover, internal hover life, reduced-motion state, and targeted React best-practices review.
- [x] Finalize and freeze the complete 2026-09-01 homepage baseline, including section order, governance-domain interaction, product visuals, framework and integration proof, seven-day readiness placement, WordPress links, conversion copy, and responsive/reduced-motion behavior.
- [x] Standardize shared primary and secondary button interaction while keeping icon usage semantic and context-specific.
- [x] Consolidate repeated React directory behavior and establish indexed, content-owned route/detail boundaries without changing the current UX.
- [x] Finish sitemap coverage for privacy, terms, accessibility, eligible resource detail pages, and every approved public route.
- [ ] Decide whether route-specific pre-rendering or server rendering is required for social crawlers and SEO; add Open Graph images and Twitter metadata if approved.
- [ ] Replace shared generic resource bodies with reviewed content for each resource or remove unpublished resource routes.
- [ ] Publish detailed GDPR and ISO 42001 pages or keep them clearly marked as coming soon.
- [ ] Turn integration cards into accurate availability states and supporting pages/links, or label the directory as planned coverage.
- [ ] Verify desktop, mobile, keyboard, reduced-motion, deep-link, metadata, cookie, and demo-form behavior on the deployed build.
- [ ] Review bundle weight, font loading, and real-device WebGL behavior against performance targets.

## Later Improvements

These are useful but do not have enough release context to schedule yet:

- Content management or structured content generation if non-developers need frequent publishing
- Route-level pre-rendering if crawler or performance evidence justifies it
- Localization after target regions and translation ownership are defined
- Error monitoring after vendor, privacy, and retention decisions are approved
- Split the remaining effects stylesheet only if visualization ownership or maintenance friction justifies the extra files

## Definition of Launch-Ready

Launch-ready means all launch blockers are complete, legal and product owners have approved public content, real lead delivery is verified from production, consent behavior matches policy, automated gates pass, the manual browser matrix passes, and direct deep-route refreshes work on the deployed domain.
