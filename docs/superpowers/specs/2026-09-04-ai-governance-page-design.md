# AI Governance Page Design

**Status:** Approved in conversation on 2026-09-04  
**Route:** `/solutions/ai-governance`  
**Implementation status:** Not started

## Objective

Replace the generic AI Governance product route with a dedicated, evidence-led page that turns AI governance from an abstract standards topic into an operating journey: identify AI systems, establish accountability, assess risk, review control support, and prepare for relevant frameworks.

The page must feel native to Controllo's calm, product-led design system and equal in quality to the dedicated Cybersecurity route without copying that page's orbit, access-review plane, signal-spine story, shared-control field, or closing mosaic.

## Approved Direction

Use an **Operational Governance Journey**:

1. Orient the visitor around one connected AI governance operating view.
2. Translate common governance breakdowns into structured Controllo actions.
3. Demonstrate the AI inventory-to-risk workflow.
4. Show Secura reviewing AI-control support and preparing a human-approved next action.
5. Place the operating work in the context of ISO/IEC 42001, NIST AI RMF, and the EU AI Act.
6. Close with a concise conversion invitation.

This direction was selected over a standards-first page, which would risk duplicating the framework directory, and a risk-first page, which would depend too heavily on unverified named risk templates and fear-led messaging.

## Evidence And Claim Guardrails

Repository-supported product language currently confirms:

- a centralized AI system inventory;
- system purpose or implementation context, ownership, and status;
- AI-specific likelihood-and-impact risk assessment connected to a system;
- shared control, implementation, policy, evidence, risk, and readiness context;
- Secura AI as reviewable guidance that surfaces missing context and prepares next actions while accountable people retain approval authority;
- AI governance readiness work associated with ISO/IEC 42001, NIST AI RMF, and the EU AI Act.

Use the exact name **ISO/IEC 42001**. Describe NIST AI RMF through its official Govern, Map, Measure, and Manage functions and do not imply that it is a mandatory certification or a fixed checklist. Treat the EU AI Act as current, phased regulation rather than purely future or emerging regulation. Use **evolving standards and regulation** in general copy.

Do not publish the following without new product or company evidence:

- named Controllo risk templates for shadow AI, third-party AI, or algorithmic discrimination;
- risk comments, internal team chat, or dedicated auditor-collaboration functionality in the AI workflow;
- clause-level or control-level mappings for AI frameworks;
- Controllo support for CSA STAR for AI;
- an AI-control assessment completing in under one minute;
- the company claim **Built by Auditors**;
- fabricated customer metrics, readiness scores, or outcome guarantees.

Product examples must be labelled as illustrative when they are not screenshots of a verified live state. Do not quote licensed standards text in the interface.

Authoritative framework references:

- [ISO/IEC 42001:2023](https://www.iso.org/standard/42001)
- [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/)
- [EU AI Act policy overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [CSA STAR for AI](https://cloudsecurityalliance.org/star/ai), retained only as evidence that the external program exists, not that Controllo supports it

## Page Composition

The route owns six sections. The shared `SiteFooter` follows through `SiteLayout`.

### 1. AI Governance Hero — Connected AI Dossier

**Eyebrow:** Operational AI Governance

**Headline:** Turn AI standards into structured, actionable governance.

**Supporting copy:** Bring AI systems, accountable owners, risk assessment, controls, and evidence into one operating view—so your team can respond to evolving AI standards and regulation with clearer readiness.

**Actions:**

- **Start free trial** is the dominant action and continues to `/pricing` until the AI Governance trial handoff is separately approved.
- **Request a demo** is the secondary action and continues to `/demo`.

Use an asymmetric desktop split with narrative on the left and a large **Connected AI Dossier** on the right. The visual contains one selected AI system record with purpose, owner, and status, connected to a likelihood-and-impact risk assessment and quiet framework context for ISO/IEC 42001, NIST AI RMF, and the EU AI Act.

This is a concise hero composition, not the full interaction shown later. Do not use robots, brains, neural networks, chat bubbles, generic purple AI gradients, an orbit, or the Cybersecurity hero's floating proof-card arrangement.

When motion is enabled, establish the system record, resolve its ownership and status, then connect the risk assessment once. The visual becomes still. Reduced motion renders the completed dossier immediately.

### 2. Challenge-to-Action Ledger

**Eyebrow:** Where AI Governance Breaks Down

**Headline:** Turn AI governance challenges into structured action.

**Supporting line:** From AI inventory to audit readiness, keep governance visible, structured, and accountable.

Use one full-width, border-led ledger rather than a grid of floating cards. Each row keeps the challenge and response visibly paired:

| Governance breakdown | Controllo response |
| --- | --- |
| AI systems are difficult to inventory and track | Keep a centralized inventory with purpose, owner, and status. |
| AI risk context is missed by traditional assessments | Assess likelihood and impact in the context of each AI system. |
| Ownership and accountability are unclear | Keep system ownership and risk responsibility connected to the work. |
| New requirements create repeated work | Reuse approved controls, implementation, policies, evidence, and risk context where requirements overlap. |
| Evidence exists but readiness is uncertain | Use Secura-assisted review to surface missing context and prepare next actions for human approval. |
| Progress remains unclear | Use readiness views that connect controls, evidence, risks, owners, and the next accountable action. |

A restrained central current resolves the six pairs once on viewport entry and then becomes still. It must not become a scroll-pinned story or reuse the Cybersecurity signal spine. On mobile, each challenge sits directly above its response with unambiguous reading order.

### 3. AI Systems And Risk Operations

**Eyebrow:** Govern Every AI System

**Headline:** From AI inventory to risk assessment—in one workflow.

**Body:** Add each AI system, define its purpose, owner and status, then assess likelihood and impact while keeping the responsible owner and review context connected.

**Workflow line:** Add AI system → Assign owner and status → Assess AI-specific risk

Use one large, inspectable product workspace with two manually selected tabs:

- **AI Systems:** system name, purpose, owner, and status.
- **AI Risk Assessment:** risk context, likelihood, impact, responsible owner, and assessment status.

Use the existing illustrative **Customer support assistant** system so the dedicated route remains consistent with the frozen homepage AI Governance preview. The hero offers a condensed overview; this section provides the detailed operating view.

Tabs use native buttons, `role="tablist"`, `aria-selected`, `aria-controls`, predictable arrow-key movement, visible focus, and a stable frame. They never autoplay. Motion is limited to a short internal opacity-and-transform transition; reduced motion changes content immediately.

### 4. Secura AI Control Review

**Eyebrow:** Secura AI for AI Governance

**Headline:** Turn AI governance documentation into a readiness check.

**Body:** Secura reviews implementation details, policies, procedures and supporting evidence against AI governance controls—then surfaces missing context and prepares next actions for accountable people to approve.

**Capability line:** Review · Identify gaps · Prepare next actions · Human approval

Use one wide **AI Control Review Dossier** that remains distinct from the homepage Secura loop and the Cybersecurity Secura workspace. Present one causal line from inputs to review state to next action:

- Inputs: implementation, policy, procedure, and evidence.
- Control state: **Needs attention**.
- Finding: the evidence does not demonstrate the latest approved AI-risk review.
- Recommended action: add the current assessment and ownership record.
- Decision state: **Human review required**.

Label the composition as an illustrative control view. Do not assign it to an ISO/IEC clause or NIST subcategory until that exact mapping is approved. Do not add a chat interface, looping playback, replay control, fabricated timing, or autonomous approval language.

When motion is enabled, inputs resolve into the finding and then the recommendation once while visible. Reduced motion renders the complete result.

### 5. AI Framework Explorer

**Eyebrow:** AI Governance Frameworks

**Headline:** One operating layer for evolving AI requirements.

**Body:** Keep AI systems, ownership, risk, controls and evidence connected as you work across the standards and regulations relevant to your program.

Use an accessible **Framework Lens** with three manually selected views:

- **ISO/IEC 42001:** AI management-system structure and continual improvement.
- **NIST AI RMF:** Govern, Map, Measure, and Manage.
- **EU AI Act:** role- and risk-based regulatory obligations.

A persistent Controllo operating layer beneath every view contains inventory, ownership, risk, controls, and evidence. It demonstrates reusable governance context without clause-level mapping claims. The framework descriptions explain the external instrument; the persistent layer explains the Controllo records that remain connected.

The selector uses the same accessibility contract as the Operations tabs but a different visual composition. It never autoplays. The sole destination is **Explore all frameworks** → `/frameworks`. Do not link to the coming-soon ISO/IEC 42001 route until FS-006 is resolved.

### 6. Final Conversion

**Eyebrow:** AI Governance, Connected

**Headline:** Know your AI. Manage the risk. Prove readiness.

**Body:** Bring AI systems, accountable owners, risk assessments, controls and evidence together in one structured operating view.

**Actions:**

- **Start free trial** → `/pricing`
- **Request a demo** → `/demo`

**Proof line:** AI system inventory · AI risk assessment · Secura AI guidance · Framework readiness

Use a spacious pale-mint conversion band with centered copy and actions. A quiet lower proof rail references the system record, risk assessment, and Secura finding without becoming another dashboard. Place the official Controllo emblem separately at low opacity, never behind text. Keep this section static apart from ordinary button feedback.

### Shared Footer

Use the existing `SiteFooter` without AI-specific duplication. Its readiness-tour action remains the final shared handoff.

## Visual System

Preserve the existing `1240px` shell, primary breakpoints, Manrope and IBM Plex Mono roles, button system, and desktop section rhythm. Use full-width bands with constrained inner layouts:

1. Hero: mist and restrained teal atmosphere.
2. Challenge ledger: white, border-led editorial structure.
3. Operations: mint-soft field with a stable navy product workspace.
4. Secura: dark structural band with one light review dossier.
5. Framework Explorer: white or mist with a restrained navy framework index.
6. Conversion: pale mint with centered hierarchy.

The page-specific visual motif is the **connected operational record**: system, owner, risk, control support, and framework context remain visibly related. Use distinct semantic Lucide icons only when they clarify states. Prefer borders and spacing to nested cards or excessive shadows.

## Motion And Interaction

Spend motion in one place per viewport and use it only to explain causality or state:

- one completed hero sequence;
- one ledger resolution;
- manual Operations tab transitions;
- one Secura input-to-recommendation resolution;
- manual Framework Lens transitions;
- a static final conversion section.

Use the existing motion system and dependencies. Do not add a new animation runtime for this page. Every sequence cleans up observers, timers, and animation work on unmount and stops while offscreen when applicable. Reduced motion preserves all content and current state without translation, scale, parallax, autoplay, or decorative loops.

## Responsive And Accessibility Requirements

- Preserve meaningful reading order when split layouts stack.
- Fit all text and controls without horizontal scrolling at `320px`.
- Keep every interactive target at least `44px`.
- Keep tabs keyboard-operable and visible in all states; do not hide options inside swipe-only controls.
- Use visible focus styling and WCAG AA text contrast.
- Mark illustrative product graphics with a concise accessible figure label and hide purely decorative layers.
- Keep decorative layers pointer-inert.
- Avoid layout shifts when switching product or framework views.
- Use complete static fallbacks when observers or motion are unavailable.

## Technical Architecture

Replace the generic product-page entry with a dedicated lazy route:

```text
src/pages/AiGovernancePage.jsx
src/pages/AiGovernancePage.test.jsx
src/data/aiGovernanceContent.js
src/sections/ai-governance/
  AiHeroSection.jsx
  AiChallengesSection.jsx
  AiOperationsSection.jsx
  AiSecuraSection.jsx
  AiFrameworksSection.jsx
  AiCtaSection.jsx
```

`AiGovernancePage` owns metadata and ordered composition. `aiGovernanceContent.js` owns approved public copy and configured examples. Each section owns only its local presentation and interaction behavior. Shared CTA behavior, `MotionContext`, header, footer, metadata, buttons, and relevant primitives remain shared.

Remove `/solutions/ai-governance` from the generic `productPages` route derivation, lazy-load the dedicated page explicitly in `src/App.jsx`, and retain the existing navigation path. Verify rather than assume the sitemap entry, canonical URL, and route metadata. Update architecture, roadmap, and the design-system baseline when implementation is accepted.

Suggested metadata:

- **Title:** Operational AI governance and risk | Controllo
- **Description:** Connect AI system inventory, accountable ownership, risk assessment, control review, and framework readiness in one structured AI governance workflow.

## Testing And Acceptance

Implementation follows test-driven development with the narrowest affected checks first.

Automated coverage must verify:

- dedicated route registration and lazy loading;
- metadata and six-section order;
- approved public copy and absence of rejected claims;
- trial and demo destinations;
- AI Operations and Framework Lens tab semantics, click behavior, arrow-key behavior, stable frame, and no autoplay;
- complete reduced-motion states;
- observer or timer cleanup where used;
- accessible labels for illustrative product compositions;
- shared header and footer presence.

Browser QA must inspect `375px`, `768px`, `1024px`, and `1440px` widths, including keyboard and touch paths, focus visibility, text fit, layout stability, clipping, horizontal overflow, reduced-motion output when the available browser supports native emulation, and console warnings or errors.

Do not run the production build unless the user explicitly requests it.

## Deferred Evidence-Dependent Scope

Keep the following outside implementation until supporting evidence and public wording are approved:

- named AI-risk templates;
- risk comments, internal chat, and AI-specific auditor collaboration;
- CSA STAR for AI coverage;
- clause-level framework mappings;
- sub-minute Secura performance claims;
- **Built by Auditors** company proof;
- the dedicated ISO/IEC 42001 detail route already tracked in FS-006;
- expansion of the external trial handoff beyond its currently approved surfaces.

