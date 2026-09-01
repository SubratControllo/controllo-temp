# Cybersecurity Page Design

**Date:** 2026-09-01  
**Status:** Approved in chat; awaiting review of this written specification  
**Route:** `/solutions/cybersecurity`

## Purpose

Replace the generic Cybersecurity solution route with a bespoke, product-led page that explains how Controllo connects framework implementation, evidence, risk, auditor collaboration, and current cloud/workforce visibility.

The page must feel visually related to the frozen homepage without repeating its compositions. Each section gets a distinct, inspectable product graphic and only the motion needed to explain its state change.

## Goals

- Present a credible Cybersecurity and Cloud Security story grounded in the Controllo product source.
- Use the approved six-section narrative: outcome, friction, Secura review, environment visibility, framework expansion, and conversion.
- Create six visually distinct sections using the homepage's typography, color, spacing, grid, product-surface, and motion language.
- Make the eventual external trial handoff a URL configuration change rather than a page rewrite.
- Remove the current repeated FAQ treatment from platform, solution, and pricing pages.
- Preserve keyboard access, visible focus, responsive behavior, motion preferences, and static fallbacks.

## Non-goals

- Do not implement the external trial, registration, payment, or workspace-creation flow. Another developer owns that system.
- Do not fetch product data or imitate a live customer tenant on the marketing page.
- Do not imply automatic mapping from cloud/workforce monitoring signals to compliance controls.
- Do not promise a Secura response time, literal real-time monitoring, complete risk-treatment workflows, or immutable full audit history.
- Do not add a CMS, dependencies, a new visual system, customer proof, generated cybersecurity artwork, or framework landing pages.
- Do not modify the frozen homepage.

## Product-truth boundary

The page copy and product examples must follow `docs/research/2026-09-01-cybersecurity-product-claim-verification.md`.

Safe current claims include:

- framework implementation, progress, mapped controls, and linked artifacts
- control-level implementation, ownership, policies, procedures, evidence, comments, chat, and audit details
- Secura review of control requirements, implementation descriptions, linked policies/procedures, evidence, uploaded files, and Confluence content
- Secura gap identification and recommended next actions, subject to human review and approval
- AWS and Azure monitoring views, GCP asset synchronization, Microsoft 365/Intune/Defender views, and Google Workspace users/devices, alerts, and activity logs
- organization, asset, and vendor risk scoring, ownership, questionnaires, dashboards, and heatmaps
- source support for SOC 2, ISO 27001, NIST CSF, CSA CCM v4, CMMC, DORA, C5, PCI DSS, and NIS2

Claims requiring restrained wording or later verification include:

- use **current** or **regularly refreshed** instead of a literal real-time guarantee
- present GCP as supported asset synchronization rather than parity with AWS and Azure monitoring dashboards
- present dark-web data as available **user-level exposure indicators**, not comprehensive universal monitoring
- do not attribute Google Workspace-specific dark-web results until its product UI path is corrected and verified
- describe NIST 800-30 as informing organization and vendor likelihood/impact ratings; do not apply the statement universally
- describe comments, chat, assigned auditor access, and latest audit details rather than a complete audit-history system
- retain `100+ frameworks` only as the governed aggregate proof already used by the site; do not infer public landing pages from product metadata loaders

## Information architecture

The dedicated page order is:

1. Outcome-led Hero
2. Challenges and Controllo's Response
3. Secura AI Review
4. Cloud and Workforce Monitoring
5. Cyber and Cloud Frameworks
6. Closing Conversion

There is no FAQ section on this page. The shared footer follows through `SiteLayout`.

## Page architecture

Create a dedicated `CybersecurityPage` instead of adding route-specific conditions to the generic `ProductPage`.

Planned ownership:

- `src/pages/CybersecurityPage.jsx`: metadata and section order
- `src/data/cybersecurityContent.js`: approved copy, challenge/response data, cloud views, and featured framework entries
- `src/sections/cybersecurity/CyberHeroSection.jsx`: hero narrative and Assurance Horizon graphic
- `src/sections/cybersecurity/CyberResponseSection.jsx`: challenge/response scrollytelling
- `src/sections/cybersecurity/CyberSecuraSection.jsx`: Review Dossier story
- `src/sections/cybersecurity/CyberCloudSection.jsx`: accessible operational-view tabs
- `src/sections/cybersecurity/CyberFrameworksSection.jsx`: Shared-Control Field and framework destination
- `src/sections/cybersecurity/CyberCtaSection.jsx`: closing conversion panel
- `src/components/TrialLink.jsx`: external trial URL handling with internal pricing fallback

Remove `/solutions/cybersecurity` from the generic `productPages` collection and register the dedicated page explicitly in `src/App.jsx`. Lazy-load the new route so its richer section graphics do not enlarge the homepage's initial route bundle.

Static arrays, visual state definitions, and featured framework configuration stay at module scope. Component state is limited to manual tabs, viewport-driven story phase, and explicit replay behavior.

## Trial destination contract

The website owns only the handoff URL.

- Add public browser configuration named `VITE_TRIAL_URL`.
- When `VITE_TRIAL_URL` is a valid absolute `http:` or `https:` URL, **Start Free Trial** uses a normal anchor and navigates in the current tab.
- When it is missing, blank, or malformed, **Start Free Trial** uses a React Router link to `/pricing`.
- Do not publish a trial duration on this page.
- Do not encode knowledge of registration, payment, provisioning, or onboarding into the marketing-page component.
- Document `VITE_TRIAL_URL` in `.env.example`, `README.md`, and `docs/ARCHITECTURE.md` during implementation.

The CTA remains visible before the external URL is available because `/pricing` is an intentional and useful fallback.

## Content design

### 1. Outcome-led Hero

**Eyebrow:** Cybersecurity & Cloud Security

**Heading:** One platform for cyber readiness and connected environment visibility.

**Supporting copy:** Bring framework implementation, evidence management, risk assessments, and auditor collaboration into one workflow—alongside regularly refreshed visibility across supported cloud and workforce environments.

**Framework line:** SOC 2 · ISO/IEC 27001 · NIST CSF 2.0 · CSA CCM v4 · CMMC · and more

**Actions:**

- Primary: **Start Free Trial** through `TrialLink`
- Secondary: **Request a Demo** to `/demo`
- Tertiary text destination: **Explore the Platform** to `/platform`

### 2. Challenges and Controllo's Response

**Eyebrow:** A connected cyber program

**Heading:** Turn compliance friction into clearer action.

**Introduction:** Modern cyber and cloud programs must keep evidence reviewable, extend work across overlapping frameworks, respond to changing environments, assess risk consistently, and coordinate with auditors—without adding another disconnected system.

Use five challenge/response pairs:

1. **Is the control sufficiently supported?** Secura reviews control requirements, implementation descriptions, policies, procedures, and evidence to identify missing context and recommend the next accountable action.
2. **New frameworks create repeated work.** Mapped controls and linked artifacts help teams reuse approved work while keeping each framework's scope and accountability visible.
3. **Control information is scattered.** One control workspace keeps implementation, ownership, policies, procedures, evidence, risk context, comments, and audit details together.
4. **Point-in-time reviews miss environmental change.** Cloud and workforce monitoring provides regularly refreshed views of supported cloud assets, identities, devices, access activity, alerts, and available exposure indicators.
5. **Risk and audit ownership become unclear.** Consistent likelihood-and-impact scoring, owners, status, questionnaires, dashboards, heatmaps, assigned auditor access, and control-level collaboration make the next action visible.

### 3. Secura AI Review

**Eyebrow:** Secura AI

**Heading:** Review each control with Secura before sharing it with an auditor.

**Supporting copy:** Secura assesses the control requirement, implementation description, linked policies, procedures, and evidence, then highlights gaps and recommends review actions. Your compliance team remains responsible for validating the findings and deciding what to do next.

**Workflow:** Implement → Review → Resolve → Share

Use one illustrative ISO 27001 control review. The finding can show:

- two gaps identified
- evidence outside the current audit period
- required approval missing
- recommended action to upload the latest approved access-review record

The example is a presentational product state, not a guaranteed customer result.

### 4. Cloud and Workforce Monitoring

**Eyebrow:** Cloud and workforce monitoring

**Heading:** See what is connected and where attention is needed.

**Supporting copy:** Bring supported cloud resources, workforce identities and devices, access activity, and security alerts into regularly refreshed operational views.

The three views are:

1. **Cloud Assets:** AWS and Azure overview/inventory states plus clearly labelled GCP asset synchronization.
2. **Identities & Devices:** Microsoft 365 and Google Workspace users, endpoint/device posture, MFA, ownership, and supported status signals.
3. **Alerts & Exposure:** security alerts, access/activity logs, and carefully labelled user-level exposure indicators. Do not attribute the exposure view specifically to Google Workspace.

The visual contains no connectors or copy suggesting that these signals automatically update compliance-control status.

### 5. Cyber and Cloud Frameworks

**Eyebrow:** Framework coverage

**Heading:** Start with one framework. Expand when you need to.

**Supporting copy:** Activate the cyber and cloud requirements relevant today, then extend mapped controls and linked evidence as customer, regulatory, and market expectations evolve.

Featured set:

- SOC 2
- ISO/IEC 27001
- NIST CSF 2.0
- CSA CCM v4
- CMMC
- DORA
- NIS2
- PCI DSS 4.0

Within this featured set, only SOC 2 and ISO 27001 receive direct detail links because they have published public detail routes. Other featured entries remain non-interactive labels until their own routes are published. The section ends with **Explore All Frameworks** to `/frameworks` and may include the governed `100+ global and regional frameworks` proof.

### 6. Closing Conversion

**Eyebrow:** Connected assurance

**Heading:** Build cyber and cloud compliance you can prove.

**Supporting copy:** Bring implementation, evidence, risk, monitoring, and auditor collaboration into one connected program.

**Actions:**

- Primary: **Start Free Trial** through `TrialLink`
- Secondary: **Request a Demo** to `/demo`

Proof remains restrained and uses only governed site claims.

## Visual design

The visual system remains `Compliance Current`: navy, teal, mint, mist, warm shell, white space, Manrope headings and body copy, IBM Plex Mono labels, thin rules, restrained radii, product-state surfaces, and clear accountable status.

The Cybersecurity page must echo the homepage without copying its frozen Hero Focus Stack, Connected Platform tabs, Secura canvas, risk matrix, framework ledger, seven-day sticky card, article index, or final emblem assembly.

### Hero graphic: Assurance Horizon

Use one right-side operational frame containing two clearly separated planes:

- the upper plane shows framework/control readiness, evidence status, ownership, and review state
- the lower plane shows cloud/workforce sources and their current monitoring status

A labelled divider distinguishes assurance work from operational context. Do not draw lines from environment signals into controls. The graphic should communicate one platform through shared enclosure and hierarchy, not automatic data mapping.

Motion: the enclosure resolves first, the two planes enter with shallow depth, and a single focus sweep confirms the current state. A small scroll-linked depth offset is allowed, capped to avoid reading interference. It plays once and becomes still.

### Challenge graphic: Response Matrix

On desktop, use a sticky response console beside five fully readable challenge rows. As a row becomes current during normal scrolling, the console changes to the corresponding Controllo workflow state. The content itself remains in the document and must not depend on the console.

On tablet and mobile, remove sticky behavior and render each response directly below its challenge. Use sparse rules rather than nested cards.

Motion: one short state transition per active row. No continuous scan or forced scroll snapping.

### Secura graphic: Review Dossier

Create a different story from the homepage Secura canvas. Show a compact control dossier whose implementation, policy/procedure, and evidence sources become a review scope. Secura then reveals two gaps and one recommended action.

The story advances once when sufficiently visible and ends on the reviewable recommendation. Provide a visible replay control. Do not loop automatically, imitate chat, expose credit purchasing, or copy the homepage assessment layout.

### Cloud graphic: Operational Visibility Console

Use one large, authentic product composition with an accessible tablist. Each tab owns a visibly different data arrangement:

- cloud-provider inventory and synchronization state
- identity/device posture and account context
- alert, activity, and exposure-indicator queue

Use restrained illustrative values and label the composition **Illustrative product view**. Changes occur only through user activation. Focus and selected states must be visible.

### Framework graphic: Shared-Control Field

Place a small shared-control workspace in the center with representative controls such as access governance, asset inventory, and incident response. Arrange the featured framework names around it using sparse, static relationships that explain reuse across overlapping requirements.

The relationship graphic explains mapping and reuse, not automatic completion. Framework entries reveal in a short stagger and then remain still. On mobile, use a readable vertical framework list with the shared-control explanation first; do not force a miniature radial layout or full-screen drawer.

### Closing graphic: Quiet Resolution

Use a low-noise signal band with three settled states—implementation current, evidence reviewable, and environment visible—behind or beside the closing copy. Do not reuse the homepage assembled emblem, add another dashboard, or introduce a customer-logo grid.

## Motion system

Motion clarifies entry, selection, progression, or resolution. Only one dominant effect runs in a viewport at a time.

- Use the existing Motion React dependency and `MotionContext`.
- Prefer opacity and transform; avoid layout-driven animation.
- Hero depth is shallow and bounded.
- Challenge transitions follow normal scrolling without hijacking it.
- Secura plays once and offers replay.
- Cloud changes only on manual selection.
- Framework relationships reveal once and settle.
- Closing status resolves once.
- Stop timers, observers, and animation frames when their owner unmounts or leaves the relevant viewport.
- Reduced motion renders every graphic immediately in a complete state, disables parallax and automated phase changes, and preserves manual tab changes without spatial animation.

GSAP is not required. Do not add it unless implementation discovers a concrete interaction that Motion React cannot express cleanly.

## Responsive behavior

- At 1440px and 1024px, preserve generous two-column hero and product-story layouts where content fit allows.
- At 768px, stack dense product graphics below their narratives and avoid sticky behavior that crowds the viewport.
- At 375px and down to 320px, use full-width actions, compact product geometry, readable status labels, and no horizontal overflow.
- Cloud tabs may horizontally scroll only if their full labels cannot fit; the content panel itself must not become a sideways-scrolling dashboard.
- Framework relationships become a vertical list on mobile.
- Decorative layers disappear before meaningful content is removed.

## Accessibility

- Keep one page-level `h1` and a logical heading hierarchy.
- All links and buttons meet the existing 44px minimum target.
- Use semantic buttons for tabs and replay; use links for destinations.
- Cloud controls follow tab keyboard behavior with Arrow Left/Right, Home, and End.
- Sticky challenge content remains fully readable without script or motion.
- Current states cannot rely on color alone.
- Provide named regions or accessible labels for complex product examples.
- Decorative graphics are `aria-hidden` and pointer-inert.
- Focus remains visible against light and dark surfaces.
- Reduced-motion output is complete and usable.

## FAQ policy

Remove the current repeated generic FAQ presentation from:

- `src/pages/ProductPage.jsx`
- `src/pages/PricingPage.jsx`

The repository currently has no other `FaqList` or shared `faqs` consumers, so implementation should remove the unused component, imports, derived `buyingFaqs`, and shared FAQ data. Do not add a Cybersecurity FAQ. Educational questions belong in WordPress articles. A future pricing-specific buying FAQ may be reintroduced after its answers are approved.

## Metadata and discovery

Update the Cybersecurity route metadata to match the approved hero and supporting message. The route already exists in `public/sitemap.xml`, so implementation must preserve it rather than add a duplicate.

Update `docs/ARCHITECTURE.md` with the dedicated page boundary, content ownership, trial-link resolver, and section-specific motion ownership. Update `docs/ROADMAP.md` with the completed user-visible page capability and retain the external trial URL cutover as a launch gate owned outside this repository.

## Performance

- Lazy-load the dedicated route.
- Use CSS and React product compositions instead of raster page collages.
- Keep static configuration at module scope.
- Avoid new network requests, image downloads, WebGL, and dependencies.
- Reuse existing tokens and motion utilities.
- Keep animation work to transforms and opacity where possible.
- Do not run more than one automated section sequence at the same time.

## Image and asset decision

No generated image is required for the first implementation. The page's strongest visual proof is inspectable interface composition built from verified product behavior.

If a later refinement needs external assets, request one of these explicitly before generation:

- an approved current product screenshot for accurate crop reference
- an approved brand texture or illustration with a named section placement
- reviewed integration marks added through the shared brand registry

Do not generate generic locks, shields, hooded figures, neon networks, or abstract cybersecurity stock imagery.

## Error and fallback behavior

- An invalid or absent `VITE_TRIAL_URL` falls back to `/pricing` without hiding the CTA.
- Missing framework detail pages render non-interactive framework labels, never dead links.
- Missing motion APIs produce complete static product states.
- Reduced motion bypasses automated phase changes.
- Marketing graphics use local illustrative configuration, so product API failure states are out of scope.

## Validation strategy

Follow the repository's narrow-validation rule. Do not run a production build.

Automated checks should cover:

- `/solutions/cybersecurity` renders the dedicated page and correct metadata
- section order and approved headline/copy boundaries
- `TrialLink` uses a valid external URL and falls back to `/pricing` for missing or malformed values
- external trial navigation uses an anchor and pricing fallback uses a router link
- published framework links exist and unpublished entries are not dead links
- challenge content remains present regardless of active visual state
- Cloud tab selection and keyboard navigation
- Secura complete, replay, and reduced-motion states
- generic FAQ removal from Product and Pricing pages
- route integration without duplicate Cybersecurity route ownership

Browser QA should use the existing development server when available and inspect 375px, 768px, 1024px, and 1440px widths. Check pointer, keyboard, reduced-motion, text fit, clipping, horizontal overflow, console warnings, and route persistence.

## Future gates

- Replace the `/pricing` fallback by supplying the externally owned production trial URL through `VITE_TRIAL_URL`.
- Reconcile and approve the external trial duration before mentioning a number publicly.
- Confirm production integration availability and tenant entitlements before strengthening “regularly refreshed” wording.
- Add a dedicated GCP monitoring view before presenting GCP as equivalent to AWS and Azure.
- Correct and verify the Google Workspace-specific exposure UI before attributing exposure results to Google Workspace.
- Add risk-treatment workflow language only when product owners identify and verify that production path.
- Add full audit-history language only when the visible and persisted history supports it.
- Add framework detail links only as their public pages are published.
- Consider a pricing-specific buying FAQ only after approved commercial answers exist.
- Consider generated visual assets only if browser QA shows that a CSS/React product composition cannot carry the intended narrative.

## Completion criteria

The page is ready for handoff when all six sections render with distinct responsive product graphics; copy stays inside the verified product boundary; trial and demo actions resolve correctly; generic FAQs are removed; keyboard and reduced-motion behavior work; targeted tests pass; browser QA passes at the required widths; the roadmap and architecture are updated; and no production build has been run without explicit authorization.
