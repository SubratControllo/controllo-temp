# Roadmap and Current Progress

Last reviewed: 2026-09-09

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
- Platform pages for overview, risk, audit management, cloud monitoring, and Secura AI
- [x] Replace the generic Continuous Compliance route with a dedicated six-section page covering between-audit change, control and evidence maintenance, manually selected operating steps, user-initiated Secura review, qualitative readiness oversight, framework reuse, and a claim-safe trial/demo handoff.
- Solution pages for cybersecurity, privacy operations, AI governance, enterprise, and growing teams
- [x] Replace the generic Cybersecurity route with a claim-verified six-section page covering framework implementation, Secura review, risk and auditor context, supported cloud/workforce monitoring, framework reuse, and an externally configurable trial handoff. The route has distinct responsive graphics, keyboard-operable tabs, one-shot motion, and complete reduced-motion states.
- [x] Replace the generic AI Governance route with a dedicated six-section page for AI-system inventory, risk assessment, accountable ownership, Secura review, conservative framework context, and connected conversion. The explicit lazy route has two manually operated keyboard-accessible selectors, responsive product-led compositions, and complete reduced-motion output. The implementation baseline is pending final user approval.
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

Validation on 2026-09-01:

- The complete homepage baseline was reconciled across `AGENTS.md`, `README.md`, `docs/ARCHITECTURE.md`, this roadmap, and the design-system master, then frozen under the master document's **Frozen Homepage Baseline**.
- The approved Seven-Day Readiness Path is Select, Assess, Implement, Review, and Collaborate. This supersedes the earlier 2026-08-31 Connect, Validate, Map, Resolve, and Report prototype record without rewriting that historical validation entry.
- `npm test -- src/App.test.jsx src/sections/HeroSection.test.jsx src/sections/TrustStrip.test.jsx src/sections/PlatformSection.test.jsx src/sections/SecuraSection.test.jsx src/sections/RiskSection.test.jsx src/sections/ComplianceStory.test.jsx src/sections/BlogSection.test.jsx src/sections/CtaSection.test.jsx --run --reporter=dot`: 77 homepage-focused tests passed in 9 files. The production build and full test suite were not run.

Validation on 2026-09-02:

- The dedicated Cybersecurity route renders its six claim-verified sections, safe trial fallback, distinct responsive visuals, keyboard-operable Cloud tabs, one-shot Secura review, and complete reduced-motion states. Generic Product and Pricing FAQs are removed.
- `npm test -- --run src/components/TrialLink.test.jsx src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx src/sections/cybersecurity/CyberSecuraSection.test.jsx src/sections/cybersecurity/CyberCloudSection.test.jsx src/sections/cybersecurity/CyberFrameworksSection.test.jsx src/sections/cybersecurity/CyberCtaSection.test.jsx src/pages/CybersecurityPage.test.jsx src/pages/FaqRemoval.test.jsx src/App.test.jsx --reporter=dot`:
  `Test Files  10 passed (10)`
  `Tests  58 passed (58)`
- Browser QA passed at 1440×900, 1024×900, 768×1024, 375×812, and 320×700 with zero horizontal overflow and no browser-console warnings. The production build and full test suite were not run.
- The Cybersecurity friction section now presents its five responses as one scroll-linked program story: compact narrative chapters drive an Assurance Dossier centered between the navbar-safe boundary and viewport bottom, with five distinct, equal-height product scenes and a reserved 64px exit gap before the next section; responsive layouts carry concise evidence cards inside each chapter, reduced motion resolves to the complete accountable-action state, and the dossier header carries the sole illustrative disclosure without a redundant footer row.
- `npm test -- --run src/sections/cybersecurity/CyberResponseSection.test.jsx --reporter=dot`: 16 focused tests passed. Browser QA covered all equal-height desktop story states and navbar-to-bottom centering at 1440×900 and 1364×687, responsive containment at 1024×768, 768×1024, and 375×812, and the final sticky boundary; the final content and inertness pass rechecked every scroll-linked state at 1440×900 plus the responsive cards at 375×812. Scenes remained fully contained with no horizontal overflow or browser-console warnings. The narrative now uses one scroll-linked Signal Spine with larger chapter typography, shorter pacing, clean number markers without horizontal branches, and no repeated full-width row rules. The mapped-control scene uses a continuous, closed four-branch topology from SOC 2 and ISO/IEC 27001 through Access governance to explicit Evidence and Scope outcomes. The right-hand dossier is pointer-inert and non-selectable, identifies itself as an illustrative program view, and uses product-aligned wording for policy and procedure, audit-period evidence, scoped auditor access, operational context, and sequence completion. These terms were reconciled against the Controllo product repository's control, evidence, framework, auditor, and Secura surfaces. Native reduced-motion browser emulation remains tracked in `FS-009`. The production build and full test suite were not run.
- The Cybersecurity hero now uses one enlarged, pointer-inert **Access review** plane with a stable shallow perspective in front of one exact elliptical orbit. Two official Controllo emblems move in the same forward direction on that single rear path with a half-cycle separation. Four product-aligned proof cards—**Secura AI**, **Cloud security**, **Identity & endpoint risk**, and **Framework coverage**—emerge from the dashboard origin in a short stagger, with one transient center signal making the relationship legible. The dashboard remains opaque and at its final perspective throughout; backing sheets, dashboard entrance motion, and the full-panel sweep remain removed. Mobile intentionally retains the two primary cards while hiding the lower supporting pair. The approved headline, actions, hero footprint, product-aligned labels, and frozen response story remain unchanged.
- The Cybersecurity Secura section now uses one compact, stable **Secura control review** workspace rather than a large phase-swapping dossier. The official Secura mark, product-verified implementation, policy-and-procedure, evidence, review-required, recommendation, and human-validation language remain visible in one causal layout. A GSAP-enhanced loop moves through scope, analysis, and result only while the workspace is visible, stops offscreen, and renders the complete result without autoplay for reduced motion. Playback controls and Replay are absent. The 560×520px desktop and 347×576px mobile frames remain fixed across phases. This section is approved and frozen on 2026-09-03; the previously recorded focused test and responsive browser evidence remains the latest validation because no further checks were requested for the control-removal freeze.
- `npm test -- --run src/sections/cybersecurity/CyberHeroSection.test.jsx src/App.test.jsx --reporter=dot`: 28 focused tests passed. Browser QA covered 1440×900, 1024×768, 768×1024, 375×812, and 320×700 with one visible orbit, one matching motion track, two same-direction emblems, four desktop proof cards, the two-card mobile reduction, zero horizontal overflow, and no relevant console warnings or errors. Frame sampling confirmed both emblems advanced together while remaining 50% apart, the orbit layer stayed behind the dashboard, every card settled from its dashboard-origin transform, and the dashboard transform remained constant. The production build and full test suite were not run.
- The hero's flat **Cloud security** proof now uses the reviewed, locally vendored theSVG marks for AWS, Microsoft Azure, and Google Cloud through the shared brand registry and `IntegrationLogo`. Its **3 configuration risks · Updated now** copy is presented only as part of the pointer-inert illustrative hero composition, not as live customer data.
- The Cybersecurity cloud and workforce section now uses a split **Operational Monitoring Console**. A navy source roster establishes the active environment with exact locally vendored theSVG marks; the light workspace summarizes sources, visible signals, and review items before separating current visibility from the attention queue. Cloud Assets, Identities & Devices, and Alerts & Exposure retain product-verified labels, a stable equal-height desktop frame, one-shot state transitions, complete reduced-motion output, and no claim that monitoring changes control status. Keyboard navigation wraps correctly, and the 375px selector exposes all three views without horizontal page overflow.
- `npm test -- --run src/sections/cybersecurity/CyberCloudSection.test.jsx src/pages/CybersecurityPage.test.jsx --reporter=dot`: 7 focused tests passed. Browser QA covered all three views, keyboard wrapping, distinct signal symbols, exact registered logo paths, uniform 160×40px source lockups, stable desktop framing, and responsive layouts at 1440px, 1024px, 768px, and 375px with zero page overflow. The production build and full test suite were not run.
- The Cybersecurity framework section now uses a pointer-inert **Shared-Control Field** instead of another dashboard or card composition. Three reusable control anchors converge on the official Controllo emblem and branch into eight visible framework endpoints. The desktop layout moves the emblem into a wider, right-aligned middle track, producing near-balanced control-to-hub and hub-to-spine spans while retaining the full framework label area; mobile keeps the emblem centered. The spine is measured midway between the two inner-facing endpoint columns; every row has one shared junction with two perfectly horizontal mirrored stubs. Left-column labels precede their dots and right-column labels follow theirs at every breakpoint. A single SVG measures those rendered anchors, matches its viewBox to the live container, and recalculates after committed layout changes as well as requestAnimationFrame-debounced resize observation; there are no breakpoint-specific coordinate sets, stale hot-reload paths, or stretched connectors. All connector paths share a `1.35` stroke width and all 11 anchor/endpoint dots use one `8px` size. Its one-time GSAP explanation draws the paths on viewport entry, resolves each endpoint through a restrained `0.92 → 1.12 → 1` scale, and then remains still; the reduced-motion/unsupported-observer fallback stays fully visible. The illustration contains no links, buttons, hover states, or cursor-led behavior, while **Explore All Frameworks** remains the sole section action outside the visual. `npm test -- --run src/sections/cybersecurity/CyberFrameworksSection.test.jsx --reporter=dot`: 10 focused tests passed. Browser QA covered 1440×900 and a dense 320×812 mobile layout, including forced multi-line framework text; all four row junctions were centered and mirrored, endpoint deltas remained 0–0.01px, left label/dot order was correct, and there was zero horizontal overflow or console warnings/errors. At 1440px the source-to-hub and hub-to-spine spans measured 197px and 181px respectively; mobile retained a 0px hub-center offset. A cold-load check also confirmed that the draw sequence waits for viewport entry and settles fully. The production build and full test suite were not run.
- The Cybersecurity closing conversion band now uses one full-bleed, single-viewport cinematic composition rather than the previous split brand field. The supplied 1920×1080 abstract film plays muted behind a navy readability scrim, subtle grain, and vignette; the approved headline, description, two actions, proof points, and one official emblem signature remain the only foreground content. Playback pauses offscreen and resumes on return, while reduced motion renders the complete static fallback without video. Focused component tests pass 5/5. Browser QA at 1440×900 and 390×844 confirms exact viewport fit, zero horizontal overflow, successful `206` video delivery, offscreen pause/resume behavior, and no console errors or warnings. This section is approved and frozen on 2026-09-06; future asset-ownership refinement is tracked in `FS-015`. No component package or dependency was added, and the production build and full test suite were not run.

- The Cybersecurity **Shared-Control Field** is approved and frozen on 2026-09-03 after its final focused tests and responsive browser check. Reopening its composition or motion requires an explicit request; verified accessibility, responsive, claim-accuracy, and release-critical performance fixes remain permitted.
- The frozen Cybersecurity page received its enterprise-readiness accessibility pass on 2026-09-03 without reopening any approved composition: inactive response copy remains at full opacity, small Cloud labels use the accessible muted foreground, the illustrative hero workspace no longer adds false headings to the document outline, the official emblem is registered as the site favicon, brand SVGs reserve intrinsic space and load without the lazy-image stability warning, and shared footer links meet the 44px minimum hit area. `npm test -- --run src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx src/sections/cybersecurity/CyberCloudSection.test.jsx src/pages/CybersecurityPage.test.jsx --reporter=dot`: 36 focused tests passed. Browser QA passed at 1440×1000, 390×844, and 320×800 with zero horizontal overflow, keyboard-operable Cloud tabs and visible focus, no application warnings/errors, and mobile Lighthouse scores of 100 for Accessibility, Best Practices, and SEO. The optional `llms.txt` recommendation remains the only failed agentic-browsing audit; the production build and full test suite were not run.

Validation on 2026-09-04:

- `npx vitest run src/sections/ai-governance/AiHeroSection.test.jsx src/sections/ai-governance/AiChallengesSection.test.jsx src/sections/ai-governance/AiOperationsSection.test.jsx src/sections/ai-governance/AiSecuraSection.test.jsx src/sections/ai-governance/AiFrameworksSection.test.jsx src/sections/ai-governance/AiCtaSection.test.jsx src/pages/AiGovernancePage.test.jsx src/App.test.jsx`: 29 focused tests passed in 8 files.
- AI Governance browser QA passed at 1440×900, 1024×768, 768×1024, and 375×812 with zero horizontal overflow, normal-to-sticky shared-header behavior, distinct six-section bands, mobile challenge-before-response order, complete Secura input-to-human-decision flow, conservative framework context, spacious closing conversion and normal footer handoff, and no console errors. Both selectors passed click and keyboard navigation with visible focus and no autoplay at every viewport.
- The AI Governance closing conversion now shares the Cybersecurity CTA's full-viewport hierarchy, centered conversion actions, proof rhythm, and one-time stagger while using a distinct code-built governance current instead of the Cybersecurity film. Five ambient context nodes, three connected SVG paths, and traveling mint current bands move only while visible; the earlier pulse and orbital rings were removed so the headline and actions retain priority. The field settles completely when offscreen or under reduced motion and preserves the approved AI systems, risk, Secura, and framework language. Focused component tests pass 5/5. Browser QA at 1440×900, 1024×768, 768×1024, 375×812, and 320×800 confirms exact `100svh` fit, deliberate sentence-level mobile headline wrapping, zero horizontal overflow, and offscreen animation suspension. This closing section is approved and frozen on 2026-09-06. The production build and full test suite were not run.
- Native reduced-motion emulation at 375×812 rendered every section immediately with complete settled content and zero active document animations. Viewport and full-page screenshots were captured under `output/playwright/ai-governance/`. The single console warning under emulation was Motion's development-only reduced-motion notice. The production build and full test suite were not run.

Validation on 2026-09-07:

- The editorial italic experiment was explicitly removed from the Homepage, Cybersecurity, and AI Governance heroes. All headings use the existing Manrope display system with no italic or secondary font. The Homepage retains its established teal second line; **Cyber readiness** and **AI standards** now use the same teal as color-only accents while inheriting every typography metric from their parent headings. A guarded shared renderer preserves the complete writer-provided title if an accent phrase becomes stale.
- `npm test -- --run src/components/HeroTitleText.test.jsx src/sections/HeroSection.test.jsx src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/ai-governance/AiHeroSection.test.jsx --reporter=dot`: 41 focused renderer and hero tests passed. Browser QA at 1440×900 and 375×812 confirmed zero italic H1 markup, matching computed font family, size, weight, style, and line-height between each accent and heading, zero horizontal overflow, contained mobile headings, and no console warnings or errors. The Cybersecurity hero is re-approved and frozen at this state. The production build and full test suite were not run.
- The AI Governance product compositions now use enterprise-functional visible labels—**AI governance workspace**, **AI system record**, **AI risk assessment**, and **Secura control review**—without the prior presentation-only “Illustrative,” “Product view,” “Governance current,” or “Readiness lens” chrome. The workspace label now carries the supporting sentence **Systems, ownership, risk, and frameworks in one view.** in a two-row header that keeps a 3.1px desktop and 2px mobile title gap while independently aligning the context pill. Representative-state disclosure remains in concise accessible figure names, and the workflow retains system purpose, ownership, qualitative risk, framework context, review inputs, findings, recommended action, and explicit human approval. `npm test -- --run src/sections/ai-governance/AiHeroSection.test.jsx src/sections/ai-governance/AiOperationsSection.test.jsx src/sections/ai-governance/AiSecuraSection.test.jsx src/pages/AiGovernancePage.test.jsx`: 7 focused tests passed. Browser QA at 1440×900 and 375×812 confirmed the label cleanup, both product-tab states, meaningful figure names, compact supporting-copy rhythm, zero horizontal overflow, and zero console warnings or errors. The production build and full test suite were not run.
- The AI Governance challenge chapter now presents a four-stage operating journey—**Map**, **Assign & assess**, **Connect**, and **Review**—inspired by process-led storytelling without copying the supplied reference's language, dark treatment, or visual compositions. At the 1440px baseline, a 160px sticky progress rail sits beside a 460px narrative column and a compact 540×391px changing product canvas; all six verified challenge and response ideas remain visible in normal document order, and scrolling changes the canvas without requiring clicks. At and below 1080px, the rail and shared canvas are removed and four 347px static product views follow their corresponding stage narratives. `npm test -- --run src/sections/ai-governance/AiChallengesSection.test.jsx src/pages/AiGovernancePage.test.jsx`: 6 focused tests passed. Browser QA at 1440×1000 and 375×812 confirmed correct second-stage synchronization, zero horizontal overflow, four mobile product views, hidden mobile rail, and zero console errors or warnings. The production build and full test suite were not run.
- The AI Governance operations section was narrowed into a light, non-scroll product workspace instead of another heavy story block: a compact operating-flow card supports the two manual AI Systems and AI Risk Assessment views, with visible system-to-risk handoff, Phosphor icons, tighter mobile field density, no dark dashboard slab, and a decorative moving mint perimeter current replacing the static top hairline on the active record card. `npm test -- --run src/sections/ai-governance/AiOperationsSection.test.jsx src/pages/AiGovernancePage.test.jsx`: 3 focused tests passed. Browser QA at 1440×672 and 375×812 confirmed both tab states, 44px+ tab targets, zero horizontal overflow, contained mobile panels, a shorter support card without unused visual height, and the edge-current as pointer-inert animation controlled by motion state. The production build and full test suite were not run.
- The AI Governance Secura section is approved and locked as a dark orbit-only brand chapter: the rejected generated sprites, packet icons, white dashboard card, footer chips, and dead-action language were removed. The right visual now uses code-built rings, traveling currents, minimal nodes, and the Secura/Controllo mark while the review inputs, finding, recommendation, and human-review decision remain available semantically. Future refinements are tracked in `FS-017`.
- The AI Governance Frameworks section is approved and locked for now with a lighter two-part framework lens: tabs that auto-preview only until the user interacts, one larger full-card line-field panel, visible framework-context chips, and the single real `/frameworks` CTA moved into the main lens. The repeated right-side operating-layer/timeline card and the extra horizontal panel rule were removed after visual review. Selected tabs now use a flat navy active state with mint caption text instead of a shadowed white card. `npm test -- --run src/sections/ai-governance/AiFrameworksSection.test.jsx src/pages/AiGovernancePage.test.jsx`: 5 focused tests passed, including auto-preview, no focus stealing, and permanent stop after user interaction. The prior browser QA in the existing Chrome tab confirmed the ISO/IEC 42001 title no longer overlaps the decorative mark, the right-side rail is absent, the full-card line field is active, the selected tab has no box shadow, horizontal overflow is zero, and console warnings/errors are zero. The production build and full test suite were not run.
- Final source-level launch-polish audit added sitemap coverage for every published route, guarded the sitemap against accidental omissions, exposed the public Terms route from the shared footer next to Privacy policy and Accessibility, and strengthened shared route metadata with `og:url` plus Twitter summary tags. `npm test -- --run src/sitemap.test.js src/App.test.jsx src/pages/AiGovernancePage.test.jsx src/sections/ai-governance/AiFrameworksSection.test.jsx --reporter=dot`: 27 focused tests passed. A visible-copy sweep found no unsafe AI claims outside absence assertions in tests, and the AI Governance route remains free of Lucide imports. Browser QA, a production build, and the full test suite were not run for this audit pass.
- The dedicated Continuous Compliance route now uses six product-led sections instead of the generic platform template. Its representative workspaces use qualitative control, evidence, ownership, risk, and readiness states; the five-step operating loop and Secura/readiness selector are fully manual and keyboard operable; Secura recommendations require human review; and unpublished framework detail pages remain plain text. The source dashboard image, personal account data, aggregate readiness percentages, always-on testing language, internal-chat claim, **Built by Auditors** claim, and misleading **Explore all 100+ frameworks** action remain excluded. `npm test -- --run src/pages/ContinuousCompliancePage.test.jsx src/sections/continuous-compliance/ComplianceLoopSection.test.jsx src/sections/continuous-compliance/ComplianceOversightSection.test.jsx src/sections/continuous-compliance/ComplianceFrameworksSection.test.jsx src/App.test.jsx src/sitemap.test.js --reporter=dot`: 31 focused tests passed in 6 files. Browser QA at 1440×900, 1024×900, 768×1024, 375×812, and 320×800 confirmed zero horizontal overflow, correct route metadata, complete responsive stacking, working pointer and End-key selector changes, and zero console warnings or errors. The post-scroll screenshot helper timed out while waiting for element stability, so the saved artifacts remain the initial full-page captures; rendered snapshots, layout metrics, and interaction checks completed successfully. The production build and full test suite were not run.

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
