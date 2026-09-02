# Roadmap and Current Progress

Last reviewed: 2026-09-02

This file is the current delivery source of truth. Update it when a capability or launch blocker changes; keep speculative ideas out until they have an owner and a clear outcome.

## Current Baseline

Status: functional development build, not approved for production launch.

Implemented:

- React/Vite SPA with shared layout, release-hardened responsive navigation, route transitions, and branded not-found handling
- Calm first-load Signal Lock navbar entrance plus a stable-color CTA shine, with reduced-motion fallbacks and no persistent header runtime
- Tailwind CSS v4 visual system with component-owned utility classes, shared tokens/primitives, and a focused effects stylesheet
- Shared button behavior with consistent hover, press, disabled, focus, and reduced-motion states; icon motion is reserved for explicitly directional actions rather than tied to primary or secondary variants
- Frozen homepage narrative covering three governance domains, connected risk and cloud capabilities, continuous compliance, Secura AI, a focused risk-prioritization proof, framework reuse, current WordPress guidance, and conversion
- Locally hosted integration brand marks shared by the homepage connectivity proof and integrations directory, with a neutral fallback where an exact reviewed product mark is unavailable
- Homepage hero Focus Stack with an enlarged perspective dashboard, a readiness graphic that extracts from its plane, four responsive event cards that pop forward in place after it settles without covering the mobile loader/copy, faded bare Controllo emblems orbiting the hero rings, the real emblem beside the readiness header, internal loader/row hover life, a header-matched primary CTA shine/icon hover, a one-shot light activation sweep, distinct scroll depth, responsive crop, extra tablet/mobile bottom clearance, and a static reduced-motion state
- Homepage hero content aligned to the two-tone “Fast Compliance, Smarter Audit Readiness” narrative, with governed framework/control/mapping proof and a demo-request primary action plus low-friction platform exploration
- Viewport-driven Secura grid current with matching 42px square tiles, offscreen pausing, no user interaction, and a static reduced-motion fallback
- Product-authentic Secura viewport loop with the existing CursorGrid, a compact control-detail opening state, connected policy/evidence/owner context, review-scope inputs, the real gradient Secura activation banner, a deterministic control-review request, a “2 gaps found” result, one continuous three-metric rail, four reviewable checks, an action-ready recommendation tray, constrained centered composition, and a static reduced-motion result state
- Platform pages for overview, continuous compliance, risk, audit management, cloud monitoring, and Secura AI
- Solution pages for cybersecurity, privacy operations, AI governance, enterprise, and growing teams
- [x] Replace the generic Cybersecurity route with a claim-verified six-section page covering framework implementation, Secura review, risk and auditor context, supported cloud/workforce monitoring, framework reuse, and an externally configurable trial handoff. The route has distinct responsive graphics, keyboard-operable tabs, one-shot motion, and complete reduced-motion states.
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

Validation on 2026-08-24:

- `npm test -- --run`: 18 tests passed in 5 files
- `npm test -- --run src/sections/SecuraSection.test.jsx`: 1 focused motion-state test passed
- `npm run build`: completed successfully
- Header browser QA passed at 375, 768, 1024, and 1440 pixel widths with desktop hover, route closing, active states, mobile accordion, scroll lock, and Escape focus restoration verified.

Validation on 2026-08-25:

- `npm test -- --run src/components/NavbarIntro.test.jsx`: 3 focused intro-state and reduced-motion tests passed
- Signal Lock browser QA passed at desktop and 390 pixel mobile widths; dropdown interaction, mobile menu scroll lock, route non-replay, cleanup, and horizontal overflow were verified.
- `npm test -- --run src/components/HeaderCtaContent.test.jsx src/components/NavbarIntro.test.jsx src/App.test.jsx`: 11 targeted header, motion, responsive-menu, and application tests passed.
- Final CTA browser QA confirmed stable navy color, `1.015` hover scale, transform-based shine, no horizontal overflow, and no browser warnings or errors.
- `npm test -- --run src/components/HeaderCtaContent.test.jsx`: 2 focused CTA tests passed after moving the idle shine fully outside the clipped button; browser QA confirmed a clean resting state and hover-only animation.
- Behavior-preserving React refactor consolidated directory controls, indexed dynamic detail content, derived product routes and filter options once, moved static-page content out of route composition, hoisted reusable static data, and cached Canvas color parsing.
- `npm test -- --run src/App.test.jsx src/components/HeaderCtaContent.test.jsx src/components/NavbarIntro.test.jsx src/sections/SecuraSection.test.jsx`: 12 targeted application, header, motion, and Canvas-boundary tests passed after the refactor.
- Browser QA passed for the homepage, framework and integration filtering, resource filtering and detail loading, package comparison, and lazy static pages at 1280×720 with no horizontal overflow, warnings, or errors.

Validation on 2026-08-26:

- `npm test -- --run src/sections/HeroSection.test.jsx src/App.test.jsx`: 24 targeted hero and application tests passed, including the enlarged dashboard, light sweep, pop-in-place card motion, dedicated extraction layers, orbit emblems, all four mobile-visible event cards, internal-only hover life, the readiness header emblem, responsive bottom clearance, mobile graphic sizing, and static reduced-motion branch.
- `npm test -- --run src/components/HeaderCtaContent.test.jsx src/sections/HeroSection.test.jsx`: 23 targeted CTA and hero tests passed after the hero primary action adopted the same clipped shine, Lucide arrow, tiny hover/focus scale, and reduced-motion static branch as the navbar CTA.
- React best-practices review against the Vercel-guided checklist found no freeze-blocking changes for the header or hero surfaces. The current implementation uses lazy route/visual boundaries, module-scope static configuration, indexed content lookups, effect cleanup for listeners and animation frames, and reduced-motion-safe rendering.
- Hero Layer Extraction browser QA passed at 1440×900 and 375×812 with one dashboard image, responsive opacity/crop, no horizontal overflow, no framework overlay, and no browser warnings or errors. Frame sampling confirmed the dashboard enters first, the readiness panel lifts from its plane, each event card waits and then pops with zero X/Y travel, and every foreground transform remains still after settling.
- Final hero responsive QA passed at 375×812 and 768×1024 with all four event cards visible, the Secura card positioned above the foreground graphic on mobile/tablet, no loader/copy overlap, no horizontal overflow, no framework overlay, and no app console warnings or errors.
- Scroll QA observed the intended depth ratio at mid-hero progress: approximately `9.2px` of dashboard movement and `24.6px` of foreground movement, corresponding to the configured `18px` and `48px` ranges. The focus sweep rose once to low contrast and returned to zero without repeating.
- `npm test -- --run src/sections/HeroSection.test.jsx src/App.test.jsx`: 29 targeted hero and application tests passed after the Phase 1 content, proof strip, demo-request CTA, and shared conversion-language update.
- Phase 1 content browser QA passed at 1440×900 and 375×812: the two-tone headline, supporting copy, three proof items, demo-request hierarchy, and full Focus Stack remained readable with no horizontal overflow, warnings, or errors.
- `npm test -- --run src/sections/SecuraSection.test.jsx`: 3 focused content, assessment-state, motion-boundary, and legacy-packet-removal tests passed.
- Secura assessment browser QA passed at 1440×900, 1024×900, 768×1024, and 375×812 with all four checks and the recommendation contained by the panel, no horizontal overflow, and no browser warnings or errors.
- `npm test -- --run src/sections/SecuraSection.test.jsx`: 4 focused summary, metric-rail, packet-mark, motion-boundary, and responsive-geometry tests passed after constraining the centered panel.
- Final Secura summary-rail browser QA passed at 1440×900, 1024×900, 768×1024, and 375×812: the content-driven panel remained centered and later settled at a slimmer 450px desktop/tablet maximum with 12px mobile gutters, the smaller packet mark aligned with the enlarged identity label, every metric/row/recommendation fit, the corner decorations were removed, and no horizontal overflow or application warning/error appeared.

Validation on 2026-08-28:

- The Secura canvas now runs a deterministic sub-ten-second product story only while at least 35% of its panel is visible: compact control detail, banner activation, top-start user-to-Secura AI chat beat, complete assessment, and clean reset. Leaving the viewport cancels and resets the sequence; returning starts it cleanly.
- The opening state uses a shortened single-row Secura banner with a Lucide right-arrow orb, transparent left banner edge, no credits divider, complete control description, and a compact connected-context plus review-scope module instead of empty dashboard space.
- Responsive browser QA covered the loop, opening-state containment, and chat-phase sender layout at 1440×900 and 375×812 with the panel centered at its 450px desktop maximum and 12px mobile gutters, no horizontal overflow, no clipping inside the Secura canvas, and no application warnings or errors. Reduced motion resolves directly to the complete four-row result with no observer or timer loop.
- Focused component and integration coverage verifies phase order, viewport exit/re-entry, manual replay, compact control content, connected context, review scope, top-start chat sender bubbles, reduced-motion resolution, CursorGrid branching, and responsive panel geometry. The production build was not run.

Validation on 2026-08-29:

- The Secura assessment card now keeps one shared 570px right-graphic frame across the control-detail, chat, result, and reset phases. The first and final frames get enough vertical room so the connected-context module and final recommendation tray are not clipped by the rounded panel edge.
- The result metric rail now uses larger Lucide glyphs inside 30px circular badges instead of small text symbols, preserving the divided three-metric rail without changing the surrounding card rhythm.
- `npm test -- --run src/components/SecuraChatBanner.test.jsx src/sections/SecuraSection.test.jsx`: 10 focused banner, phase-loop, responsive-geometry, stable-frame, and metric-icon tests passed. Browser QA could not be completed in this turn because Browser access to localhost was denied by the app security policy. The production build was not run.
- The homepage now presents Cybersecurity, Privacy, and AI Governance as equal manually selected domains, with Risk Management and Cloud Monitoring as connected capabilities. The older Shift and unapproved Proof blocks are no longer part of homepage composition; a later focused Risk Management proof was restored after Secura to connect identified gaps to prioritization.
- Secura's left narrative and unchanged right product animation are centered inside equal desktop halves; the compact step strip makes Review the only highlighted starting state.
- WordPress articles remain direct links rather than a runtime dependency. New governance, cloud, and privacy-policy destinations are registry-backed, included in the sitemap, and covered by the legacy privacy redirect.
- `npm test -- --run src/sections/PlatformSection.test.jsx src/sections/SecuraSection.test.jsx src/sections/HeroSection.test.jsx src/App.test.jsx`: 44 focused homepage, route, interaction, and frozen-surface tests passed.
- Browser QA passed at 1440×900, 1024×900, 768×1024, and 375×812. Domain selection worked with pointer and arrow keys, desktop content used equal centered halves, tablet/mobile content stacked cleanly, all checked widths had zero horizontal overflow, and no application warnings or errors appeared. The production build was not run.
- The homepage Secura narrative now ends with one contextual **Explore Secura AI** link to `/platform/secura-ai`. Test-first implementation produced the expected missing-link failure, then `npm test -- --run src/sections/SecuraSection.test.jsx src/sections/HeroSection.test.jsx src/App.test.jsx` passed 40 focused tests. Browser QA at 1440×900 and 375×812 confirmed the CTA fits without shifting the approved graphic, preserves zero horizontal overflow, produces no warnings or errors, and opens the correct product route.
- The Secura Review / Identify / Recommend treatment is now one structural rail: a single parent-owned connector runs behind opaque nodes, Review is identified by mint and a restrained background wash rather than a nested card, and the mobile treatment uses one aligned vertical spine. The connector and nodes enter once, remain static afterward, and resolve immediately for reduced motion. The right Secura animation and CTA remain unchanged. The structural contract failed first against the previous nested-card version; browser QA passed at 1440×900, 375×812, and 320×800 with no horizontal overflow or console issues.
- Frameworks and Connectivity now uses one proof-led ledger instead of homepage path filters and an endlessly animated center-bubble diagram. The navy side anchors the approved 100+ framework, 7,000+ control, and 200,000+ relationship evidence; the light side derives representative framework paths and implemented integrations from the existing registries. Direct framework and integration links remain visible. Test-first implementation produced the expected missing-region failure, then the focused application test passed. Browser QA passed at 1440×900, 1024×900, 768×1024, and 375×812 with clean responsive stacking, zero horizontal overflow, and no console warnings or errors.

Validation on 2026-08-30:

- The homepage Blog section now uses one lead story and two supporting reads in a semantic editorial index instead of a generic bordered-card grid. Shared rules establish hierarchy, every story is a named article landmark, and archive/article links remain direct WordPress destinations.
- Live route verification confirmed the dedicated ISO 27001/SOC 2 story destination alongside the continuous-compliance, ISO 42001, and archive destinations on the current public WordPress site.
- Test-first implementation produced the expected missing-article-landmark and stale-destination failures, then `npm test -- --run src/sections/BlogSection.test.jsx` passed 2 focused tests.
- Browser QA passed at 1440, 1024, 768, 375, and 320 pixel widths with zero horizontal overflow, 44px minimum link targets, visible keyboard focus, and a complete static reduced-motion state. The production build was not run.
- The final homepage conversion panel now replaces its competing double-ring decoration with one official three-segment Controllo emblem. The segments assemble once as the panel enters view, a low-contrast signal line passes once behind them, and the visual remains still afterward; reduced motion resolves directly to the completed emblem.
- The final actions now have distinct cues: **Start free trial** remains the dominant arrow-led action to pricing and reuses the navbar's clipped shine plus restrained hover/focus scale. **Request a demo** uses a calendar icon, no duplicate arrow, no shine, and the Hero secondary action's quiet no-lift color response. The panel exposes a named conversion region and keeps both actions at a 46px minimum height.
- CTA browser QA passed at 1440, 1024, 768, 375, and 320 pixel widths with a stable desktop split, clean sub-900px emblem band, full-width small-mobile actions, and zero horizontal overflow.
- The shared button primitive now keeps semantic icons still, moves only explicitly directional arrows, centralizes tactile press and disabled feedback, preserves visible focus, prevents desktop label wrapping, and removes motion under the operating-system reduced-motion preference. Route hero booking actions use a calendar cue, demo form submission is text-only, and the frozen header, hero, and final conversion hierarchy remain intact.
- Test-first implementation produced the expected failures against the previous generic icon behavior, 44px navbar CTA, and non-shiny final primary action. Then `npm test -- --run src/components/HeaderCtaContent.test.jsx src/sections/CtaSection.test.jsx src/sections/HeroSection.test.jsx src/components/ButtonSystem.test.js src/App.test.jsx` passed 40 focused button, CTA, hero, route, and form tests. The production build was not run.
- Browser QA passed at 1440, 1024, 768, and 375 pixel widths with 46px visible button targets, single-line labels, zero horizontal overflow, a visible 3px keyboard focus outline, directional-only icon translation, a still calendar icon, navbar-matched final-primary shine/scale, and no browser warnings or errors.

Validation on 2026-08-31:

- Compliance Current now replaces the free-running irregular signal path with two circular low-contrast paths and three bare Controllo emblems. Their opposing rotation is derived from section scroll rather than an ambient timer, and reduced motion resolves to a static field.
- The sticky product preview advances through Connect, Validate, Map, Resolve, and Report with a stable card frame, `76%` to `88%` readiness, stage-specific program signals, sequential row states, a five-part progress rail, and one short internal confirmation sweep per stage. The matching narrative step receives restrained mint emphasis.
- Shared ProductDemo instances on product routes retain their original static signal copy, readiness ring, and row presentation; the scroll choreography is scoped to the homepage Compliance Current chapter.
- The readiness percentage and label are isolated from the rotating progress artwork, and the card identity now uses the official Controllo emblem SVG instead of the older CSS-built approximation.
- `npm test -- --run src/components/ProductDemo.test.jsx src/sections/ComplianceStory.test.jsx src/App.test.jsx`: 17 focused component, section, shared-preview-regression, and application tests passed. Browser QA covered all five desktop scroll stages at 1440×900, stable 516px card height, working sticky positioning, scroll-linked orbit transforms, and responsive containment at 1024×900, 768×1024, and 375×812 with zero horizontal overflow. The production build was not run.
- The focused Risk Management proof is restored immediately after Secura and before Frameworks, making the homepage handoff explicit: Secura identifies gaps, connected risk prioritizes action, and framework proof shows reusable coverage. The right product proof now resolves once on entry through a diagonal 25-cell reveal, a short matrix scan, two delayed critical states, and settling summary metrics; reduced motion renders the complete static state.
- `npm test -- --run src/sections/RiskSection.test.jsx src/App.test.jsx --reporter=dot`: 18 focused risk-section and application tests passed. Browser QA passed at 1440×900, 1024×900, 768×1024, and 375×812 with all 25 cells, both critical states, responsive stacking, correct product-route navigation, zero horizontal overflow, and no console warnings or errors. The production build was not run.

Validation on 2026-09-02:

- The dedicated Cybersecurity route renders its six claim-verified sections, safe trial fallback, distinct responsive visuals, keyboard-operable Cloud tabs, one-shot Secura review, and complete reduced-motion states. Generic Product and Pricing FAQs are removed.
- `npm test -- --run src/components/TrialLink.test.jsx src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx src/sections/cybersecurity/CyberSecuraSection.test.jsx src/sections/cybersecurity/CyberCloudSection.test.jsx src/sections/cybersecurity/CyberFrameworksSection.test.jsx src/sections/cybersecurity/CyberCtaSection.test.jsx src/pages/CybersecurityPage.test.jsx src/pages/FaqRemoval.test.jsx src/App.test.jsx --reporter=dot`:
  `Test Files  10 passed (10)`
  `Tests  48 passed (48)`
- Browser QA passed at 1440×900, 1024×900, 768×1024, 375×812, and 320×700 with zero horizontal overflow and no browser-console warnings. The production build and full test suite were not run.

## Frozen Header Baseline

Status: frozen on 2026-08-25 for release preparation.

The approved baseline includes the responsive layout, official wordmarks, desktop dropdowns, mobile menu, active and focus states, Signal Lock entrance, and demo-request CTA. The CTA keeps its base color, has no visible idle shine, and runs its clipped shine only on hover or keyboard focus.

Treat further visual restyling, motion concepts, navigation restructuring, and CTA redesign as out of scope unless a new request explicitly reopens the header. Accessibility fixes, verified navigation defects, content corrections, and release-critical responsive issues may still be patched without reopening the design.

## Frozen Hero Focus Stack

Status: frozen on 2026-08-26 for the next delivery phase.

The approved baseline includes the enlarged half-cropped dashboard backdrop, extracted readiness panel, four responsive event cards, Secura AI insight card, orbiting bare emblems, one-shot focus sweep, internal-only hover life on the loader and row cards, header-matched primary CTA hover, scroll depth, mobile/tablet bottom clearance, and reduced-motion final state.

Treat further hero motion concepts, dashboard composition changes, new cards, card choreography, orbit styling, and visual restyling as out of scope unless a new request explicitly reopens the hero. Accessibility fixes, verified responsive defects, content corrections, and release-critical performance issues may still be patched without reopening the design.

## Frozen Homepage Narrative

Status: frozen on 2026-08-29 for the next delivery phase.

The approved homepage order is Hero, framework proof strip, Connected Platform, Compliance Current, Secura AI, focused Risk Management proof, Frameworks and Connectivity, Blog, and final conversion CTA. Cybersecurity, Privacy, and AI Governance remain the three equal governance domains. Risk Management and Cloud Monitoring remain connected capabilities, not two additional top-level domain tabs; the additional Risk proof is a narrative handoff from identified gaps to prioritized action, not a fourth governance domain. Domain panels change only after manual selection and keep a stable equal-column desktop frame. The Secura narrative carries one contextual product-page link; its assessment canvas remains an interactive demonstration rather than a navigation surface.

Keep the final **Start free trial** action as an intent CTA that points to pricing until the separate registration/payment experience has an approved public handoff URL. The hero and navbar remain demo-led. Do not add payment, consent management, customer logos, testimonials, or unverified integrations to this homepage baseline without reopening the relevant product/content decision.

## Frozen Homepage Blog Index

Status: frozen on 2026-08-30 for release preparation.

The approved baseline is one lead article and two supporting reads, direct WordPress destinations, sparse editorial rules, responsive stacking below 960px, semantic article landmarks, and no unapproved imagery or runtime WordPress dependency.

Treat article-card restyling, carousels, stock imagery, fabricated dates, runtime feeds, and additional homepage stories as out of scope unless a new request explicitly reopens the section. Link corrections, approved article replacements, accessibility fixes, and release-critical responsive issues may still be patched without reopening the design.

## Frozen Homepage Final Conversion CTA

Status: frozen on 2026-08-30 for release preparation.

The approved baseline is one mint split panel, one non-looping three-segment emblem assembly, a dominant arrow-led trial-intent action to pricing with the navbar's clipped shine and restrained scale, and a quieter calendar-led demo action with the Hero secondary action's no-lift color response. The emblem becomes a compact lower band below 900px, and actions become full width on small mobile screens.

Treat new decorative concepts, double rings, duplicate emblems, looping animation, CTA hierarchy changes, and additional conversion claims as out of scope unless a new request explicitly reopens the section. Destination corrections, accessibility fixes, and release-critical responsive issues may still be patched without reopening the design.

## Conversion CTA Phases

### Phase 1 — Demo request (current)

- Hero primary: **Request a Demo**
- Hero secondary: **Explore the Platform**
- Navbar primary: **Request a Demo**
- Final homepage panel: **Start free trial** leads to pricing as an interim intent CTA; it does not claim that registration is connected.
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
- [ ] Supply the approved production `VITE_TRIAL_URL` owned by the external trial application, verify registration and useful first-session activation end to end, and reconcile the external system’s trial duration before publishing any duration claim.
- [ ] Decide whether analytics will launch. If yes, load it only under the approved consent policy and honor `essential`; if no, remove unsupported analytics language and event behavior.
- [ ] Approve all product claims, framework claims, package descriptions, integration availability, and customer-facing proof.
- [ ] Complete editorial and product-claim review of every WordPress article linked from the homepage; remove unsupported outcome promises, reconcile framework/control counts, and correct copy before launch.
- [ ] Connect this workspace to the intended Git repository. No Git metadata or commit history is available in the current folder.
- [ ] Confirm the deployment host, HTTPS/domain configuration, and deep-route fallback on the production origin.

## Release Quality

Complete after the blockers and before launch:

- [x] Harden and freeze the shared header navigation, official light/dark wordmarks, Signal Lock entrance, stable-color hover-only CTA shine, keyboard closing, route state, and responsive menu behavior.
- [x] Harden and freeze the homepage hero Focus Stack, dashboard backdrop, extracted readiness panel, responsive event-card layout, header-matched primary CTA hover, internal hover life, reduced-motion state, and targeted React best-practices review.
- [x] Finalize and freeze the homepage narrative, governance-domain interaction, connected-capability hierarchy, Secura text treatment, WordPress article links, and interim trial-intent CTA.
- [x] Standardize shared primary and secondary button interaction while keeping icon usage semantic and context-specific.
- [x] Consolidate repeated React directory behavior and establish indexed, content-owned route/detail boundaries without changing the current UX.
- [ ] Finish sitemap coverage for privacy, terms, accessibility, eligible resource detail pages, and every approved public route.
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
