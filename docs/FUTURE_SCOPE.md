# Future Scope

Last reviewed: 2026-09-02

This is Controllo's durable register for work intentionally left for later. Record every deferred idea or future plan here when it appears during discovery, implementation, review, or validation. An entry preserves context; it is not approval to expand the current task.

## Required Flow

1. Before brainstorming or planning, read this file completely and bring relevant entries into the current questions, options, constraints, and trade-offs.
2. During any task, update or add an entry whenever an improvement, dependency, validation step, or capability would be better handled later.
3. Before completing a task, reconcile its future-scope decisions: link adopted work to its specification, plan, roadmap item, or commit; keep deferred work actionable; mark rejected or superseded ideas instead of silently deleting them.
4. Implement an entry only after the user approves it as current scope or it becomes part of an approved plan.

## Entry Standard

Every entry must state:

- **Status:** Idea, Deferred, Planned, Active, Complete, Rejected, or Superseded
- **Area:** The page, component, workflow, or release concern affected
- **Outcome:** What should become true
- **Trigger:** The condition that makes reconsideration timely
- **Dependencies:** Decisions, content, systems, or evidence required first
- **Source:** The task, specification, roadmap section, review, or date that produced it
- **Next decision:** The concrete question the next brainstorming or planning flow must answer

`docs/FUTURE_SCOPE.md` is the index of deferred intent. `docs/ROADMAP.md` remains the delivery and production-readiness source of truth; when an item has committed acceptance criteria there, link to that section rather than duplicating the criteria here.

## Current Register

### FS-001 — Production trial handoff

- **Status:** Planned
- **Area:** Cybersecurity trial actions and future global trial entry points
- **Outcome:** Configure the approved public `VITE_TRIAL_URL` and verify that the external application completes registration and a useful first session while the marketing site remains free of registration, payment, provisioning, and onboarding logic.
- **Trigger:** The external trial developer supplies a production URL and confirms the supported activation flow.
- **Dependencies:** Approved destination, HTTPS, registration/payment ownership, trial-duration decision, analytics/consent behavior, and end-to-end QA.
- **Source:** Cybersecurity page implementation; [Roadmap — Launch Blockers](ROADMAP.md#launch-blockers)
- **Next decision:** Should the external handoff remain Cybersecurity-only or become the shared destination for header and homepage trial actions?

### FS-002 — Activated self-service trial promotion

- **Status:** Deferred
- **Area:** Header, homepage hero, final conversion panel, pricing, and measurement
- **Outcome:** Promote **Start Free Trial** globally only after signup, workspace creation, and guided first-session activation work reliably; then optimize placement using activation and pipeline evidence.
- **Trigger:** FS-001 is production-verified and self-serve activation succeeds without sales assistance.
- **Dependencies:** Trial funnel instrumentation, approved success metrics, CTA hierarchy review, and explicit reopening of frozen homepage/header surfaces.
- **Source:** [Roadmap — Conversion CTA Phases](ROADMAP.md#conversion-cta-phases)
- **Next decision:** Which surfaces should change first, and what evidence is sufficient to advance from pricing intent to activated trial promotion?

### FS-003 — Pricing-specific FAQ

- **Status:** Deferred
- **Area:** Pricing page and article library
- **Outcome:** Reintroduce only pricing-specific buying questions that have approved, stable commercial answers; keep general educational questions in the external article library.
- **Trigger:** Pricing, packaging, trial, billing, and procurement answers receive commercial approval.
- **Dependencies:** Product and legal review, content ownership, and confirmation that the answers will not duplicate blog material.
- **Source:** Cybersecurity FAQ removal decision; `docs/ARCHITECTURE.md`
- **Next decision:** Is an on-page pricing FAQ still necessary after the article and sales-enablement content is reviewed?

### FS-004 — Cyber and cloud framework detail coverage

- **Status:** Deferred
- **Area:** Cybersecurity framework field, framework directory, detail routes, metadata, and sitemap
- **Outcome:** Add approved dedicated pages and direct links for relevant frameworks beyond the currently verified SOC 2 and ISO/IEC 27001 destinations, including NIST CSF, CSA CCM, CMMC, DORA, NIS2, and PCI DSS where support is confirmed.
- **Trigger:** Framework-specific content and Controllo coverage claims are approved.
- **Dependencies:** Product verification, reviewed descriptors, route content, metadata, sitemap entries, and responsive/browser QA.
- **Source:** Cybersecurity page design and final framework-link review
- **Next decision:** Which framework has the strongest verified customer need and enough approved content to publish first?

### FS-005 — Release, deployment, and SEO completion

- **Status:** Planned
- **Area:** Production launch readiness
- **Outcome:** Complete legal approval, live lead delivery, claim/editorial review, hosting/HTTPS/deep-route verification, sitemap coverage, and the decision on pre-rendering plus social metadata.
- **Trigger:** A production launch window and owners are assigned.
- **Dependencies:** Counsel, product/content approval, deployment host, lead endpoint, crawler requirements, and approved social assets.
- **Source:** [Roadmap — Launch Blockers](ROADMAP.md#launch-blockers) and [Release Quality](ROADMAP.md#release-quality)
- **Next decision:** Which blockers define the next release milestone, who owns each, and what is the validation evidence?

### FS-006 — Content and integration completeness

- **Status:** Planned
- **Area:** Resources, GDPR, ISO 42001, integrations, and supporting detail routes
- **Outcome:** Replace generic resource bodies, publish or deliberately withhold detailed GDPR and ISO 42001 pages, and give integration cards accurate availability states with supporting destinations.
- **Trigger:** Reviewed product/content material and integration availability evidence become available.
- **Dependencies:** Subject-matter review, integration registry accuracy, editorial approval, routes, metadata, and sitemap decisions.
- **Source:** [Roadmap — Release Quality](ROADMAP.md#release-quality)
- **Next decision:** Which incomplete public surface creates the highest trust or conversion risk?

### FS-007 — Analytics launch decision

- **Status:** Planned
- **Area:** Consent, analytics loading, and conversion measurement
- **Outcome:** Either launch analytics only under the approved consent policy or remove unsupported analytics language and dormant behavior.
- **Trigger:** The business selects an analytics platform and defines lawful measurement requirements, or decides not to launch analytics.
- **Dependencies:** Consent policy, privacy/legal review, data retention, event taxonomy, and production trial/lead destinations.
- **Source:** [Roadmap — Launch Blockers](ROADMAP.md#launch-blockers)
- **Next decision:** Is analytics required for launch, and which minimal events justify its privacy and maintenance cost?

### FS-008 — Cybersecurity visual asset refinement

- **Status:** Idea
- **Area:** Cybersecurity page graphics
- **Outcome:** Consider approved generated or product-derived assets only if a future refinement cannot be expressed clearly with the current lightweight interface graphics.
- **Trigger:** A user-approved redesign identifies a specific visual gap or requests external/generated imagery.
- **Dependencies:** Asset brief, claim-safe product states, responsive crop plan, performance budget, accessibility text, and approval of the affected frozen/approved surface.
- **Source:** Cybersecurity design specification and asset discussion
- **Next decision:** What information must the asset communicate that the current semantic interface graphic cannot?

### FS-009 — Native reduced-motion browser emulation

- **Status:** Deferred
- **Area:** Browser QA tooling
- **Outcome:** Re-run the Cybersecurity route with native `prefers-reduced-motion: reduce` emulation in a browser surface that supports it, supplementing the current focused component tests and settled-state inspection.
- **Trigger:** The approved browser tooling exposes media-preference emulation or a release QA environment provides it.
- **Dependencies:** Browser capability, the existing viewport matrix, and unchanged reduced-motion acceptance criteria.
- **Source:** 2026-09-02 Cybersecurity validation limitation
- **Next decision:** Does the available browser tooling exercise the operating-system media query without modifying application code or system settings?
