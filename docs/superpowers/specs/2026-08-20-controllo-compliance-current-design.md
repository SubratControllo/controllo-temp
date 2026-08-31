# Controllo “Compliance Current” homepage prototype

## Objective

Create a second standalone Controllo marketing-homepage prototype that feels clean, cinematic, and conversion-focused. It must be visibly different from Variation 1’s industrial grid while preserving Controllo’s mint and navy identity.

The prototype lives entirely in the thread visualization workspace under variation-2-compliance-current/. It must not modify the Controllo repository or live website.

## Audience and page job

The primary audience is a US security or compliance leader evaluating SOC 2, ISO 27001, privacy, cloud-security, or AI-governance automation. The page’s job is to make Controllo immediately understandable, demonstrate how Secura reduces manual audit work, and prompt a demo request.

## Creative direction

“Compliance Current” treats governance work as a continuous flow. Evidence, controls, owners, risks, and audits travel through a connected stream instead of appearing as static feature cards.

The visual direction takes inspiration from Zig’s concise messaging, calm negative space, floating workflow moments, and narrative pacing without reproducing its layouts or branding.

### Palette

- **Signal Mint — #26D8AD:** primary brand energy and successful evidence flow.
- **Deep Navy — #061B32:** high-trust text, product surfaces, and one immersive dark section.
- **Mist — #F3F8F6:** primary light background.
- **Aqua — #BFF4E8:** wave layers and soft product highlights.
- **Electric Teal — #087F8C:** differentiator accent for active AI analysis and scroll transitions.
- **Warm Shell — #F3EBDD:** human collaboration and testimonial moments.

Color changes by section through discrete scroll states rather than a constantly shifting rainbow. Text contrast must remain WCAG AA in every state.

### Typography

Use a confident contemporary sans serif with sentence-case headlines and natural line breaks. Reserve uppercase monospace only for technical labels, framework IDs, timestamps, and evidence metadata. Headings are smaller and lighter than Variation 1, following the user’s preference for selective emphasis.

## Signature visual language

### Directional arrows

The paired chevrons from Controllo’s logo become a recurring navigation and storytelling device. They appear as:

- a slow-moving hero current;
- progress markers between workflow stages;
- hover indicators on actions;
- a framework-mapping trail;
- the final CTA transition.

The arrows never become generic decorative wallpaper. Each instance communicates forward movement or evidence reuse.

### Waves

Layered SVG waves separate major sections and create the feeling of a continuous current. Their depth changes with scroll, using subtle parallax on transforms only. Wave color inherits the next section’s background so transitions feel intentional.

### Floating workflow moments

Small product events—“Evidence validated,” “Owner approved,” “3 frameworks mapped,” and “Auditor comment resolved”—float near product visuals. They enter sequentially and communicate real system activity instead of decorative particles.

## Page structure

### 1. Navigation

A calm, translucent navigation bar contains Product, Secura AI, Solutions, Frameworks, Integrations, and Resources. “Book a demo” is the primary CTA; “Start free” remains secondary. The Controllo chevron mark subtly animates on hover.

### 2. Hero: compliance keeps moving

Headline: “Compliance keeps moving. Controllo keeps you ready.”

Supporting copy explains that Controllo collects evidence, validates it with Secura, and maps it across 30+ frameworks. A primary demo action and secondary product-tour link follow.

The hero visual is an airy current of arrow segments and three floating workflow events around a polished product-status panel. Slow parallax creates depth without overpowering the message.

### 3. Trust current

A compact moving strip presents representative integrations and frameworks using restrained monochrome wordmarks. A wave separator carries the page into the problem narrative.

### 4. Before and after Controllo

A sticky split-screen section contrasts manual compliance fragmentation with the connected Controllo state. As the visitor scrolls, scattered evidence requests, spreadsheets, and owner reminders converge into a single control record.

The copy remains direct:

- Before: “Every audit starts from zero.”
- After: “Every approved artifact keeps working.”

### 5. Secura analysis

The background transitions to Deep Navy. A centered Secura analysis view checks an artifact for freshness, ownership, coverage, and control relevance. Evidence packets flow outward to SOC 2, ISO 27001, and GDPR control nodes.

The section emphasizes explainability and human approval rather than presenting Secura as a chatbot.

### 6. Connected operating loop

A horizontal scroll-like narrative—implemented without hijacking natural scrolling—shows Connect, Validate, Map, Collaborate, and Report. Each stage uses one product crop, one short statement, and a logo-arrow connector.

### 7. Unified risk visibility

The background changes to Aqua. A large risk visualization and linked evidence drawer demonstrate how risks, controls, owners, and audit work remain connected.

### 8. Framework flow

Framework categories sit on curved lanes rather than in an equal card grid. Selecting Security, Privacy, AI Governance, or Resilience changes the visible framework set and evidence-reuse story.

### 9. Customer outcome

A Warm Shell section uses one believable customer perspective, paired with two existing Controllo product claims: 30+ frameworks and up to 70–80% less manual work. Claims are labeled as Controllo claims rather than independently verified facts.

### 10. Final CTA

A final pair of oversized chevrons forms a gateway around “Make the next audit feel lighter.” Demo and free-trial actions remain visible. The footer stays compact with legal, contact, and product links.

## Motion choreography

- Hero arrows drift slowly on independent depth layers.
- Workflow events enter one at a time, then hold.
- Section backgrounds change through short, scroll-triggered state transitions.
- Wave layers move at different transform rates for parallax.
- Before/after elements converge toward the control record as the section progresses.
- Secura packets move from one artifact to multiple controls.
- Product crops reveal with opacity and vertical transforms.
- Hover and press feedback stays within 150–300 ms.
- Motion never animates layout properties.
- Loops longer than five seconds include pause controls.
- prefers-reduced-motion removes parallax and presents complete static states.

## Interaction and responsive behavior

Desktop is the primary presentation target at 1440 px, with intentional behavior down through 1024 px. Tablet stacks paired scenes. Mobile keeps the content order, replaces parallax with static waves, uses a labeled menu button, and presents workflow stages vertically.

All controls use native elements with visible focus. Touch targets are at least 44 px. Framework selection uses aria-pressed, and updated content is announced with aria-live.

## Prototype boundaries

The artifact is a standalone visual prototype with local interactions and scroll motion. It does not connect to production APIs, submit real forms, alter the live WordPress site, or edit any file under /Users/ashutoshsingh/Documents/GitHub/Controllo.

## Acceptance criteria

- Variation 2 is immediately distinguishable from Variation 1.
- The first viewport communicates category, outcome, Secura, and a primary action.
- Waves and logo-derived arrows support the narrative rather than decorate empty space.
- Background changes feel calm and deliberate.
- Desktop scrolling contains at least three memorable but restrained motion moments.
- Sentence-case typography and selective uppercase usage match the approved preference.
- Desktop and mobile states remain readable, accessible, and free of horizontal overflow.
- The Controllo repository remains unchanged.
