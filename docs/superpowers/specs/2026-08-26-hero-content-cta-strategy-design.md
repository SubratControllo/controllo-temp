# Hero Content And CTA Strategy Design

## Goal

Update the homepage hero with the audit and marketing direction while preserving a clear path for visitors who are ready to convert, still evaluating the product, or seeking guided help. Keep CTA promises aligned with functionality that is actually available at each roadmap phase.

## Product Decision

Controllo will use a staged CTA hierarchy rather than presenting the future trial and demo experiences as if both already exist.

- One action is visually dominant in each interface region.
- The hero always retains a low-commitment product-discovery path.
- A CTA label appears only when its destination fulfills that promise.
- The navbar and hero may emphasize different actions after the trial launches, but they must not contradict the same phase's conversion strategy.

## Phase 1 Hero Content

### Eyebrow

> Continuous compliance. Clear audit readiness.

This keeps the established continuous-compliance narrative and avoids implying continuous automated auditing.

### Headline

> Fast Compliance,
> Smarter Audit Readiness

Render the phrase as one semantic heading across two animated lines. Keep “Fast Compliance,” in navy and “Smarter Audit Readiness” in teal using the established hero headline treatment.

### Supporting Copy

> Connect controls to policies, evidence, risks, owners, and live cloud signals across cybersecurity, privacy, and AI governance. Secura AI turns that context into clear, reviewable insights and next actions.

The copy includes accountable owners and reviewable AI guidance so it remains consistent with `CONTEXT.md`.

### CTA Hierarchy

Before direct scheduling is available:

1. Primary mint CTA: **Request a Demo** → `/demo`
2. Secondary ghost CTA: **Explore the Platform** → `/platform`

When `/demo` provides immediate calendar scheduling, change the primary label to **Book a Demo** in the hero and navbar. The visual hierarchy and destination remain unchanged.

Do not show **Start Free Trial** during Phase 1. A roadmap item is not a visitor action.

## Proof Strip

Replace the current qualitative hero highlights with three quantitative proof points:

1. **100+** — Global and regional frameworks
2. **7,000+** — Structured compliance controls
3. **200,000+** — Control mappings powering smarter compliance

Keep **One platform for cybersecurity, privacy, and AI governance** out of the proof strip. It is positioning rather than quantitative proof and belongs in the narrative section following the hero.

These figures are treated as governed audit-and-marketing claims supplied for this change. Any conflicting framework or control counts in the homepage must be updated in the same release. Changes to the figures require renewed content-owner approval.

## Navbar Strategy

### Phase 1: Demo Conversion

- Keep one strong CTA in the navbar.
- Use **Request a Demo** until direct scheduling is live.
- Rename it **Book a Demo** once visitors can select a time without a manual follow-up.
- Do not add a disabled, placeholder, waitlist, or nonfunctional trial CTA.
- Keep Platform in the primary navigation; the hero supplies the more explicit exploration action.

### Phase 2: Trial Launch

The trial CTA may launch only when a visitor can create a workspace and reach a useful first-session state through guided setup, sample data, or a connected source.

Navbar:

- Strong button: **Book a Demo**
- Quiet text action: **Start Free Trial**
- Future **Log in** remains a utility link, not a conversion button.

Hero:

1. Primary mint CTA: **Start Free Trial**
2. Secondary ghost CTA: **Book a Demo**
3. Tertiary text link: **Explore the Platform**

The third action must remain visually subordinate and must not become a third button.

### Phase 3: Evidence-Led Optimization

After the trial has meaningful traffic, compare:

- Trial signup-to-activation rate
- Completion of the first useful setup or integration milestone
- Demo booking completion rate
- Qualified opportunity rate by acquisition path
- Pipeline or revenue influenced by each CTA

Promote **Start Free Trial** to the dominant navbar CTA only if trial users consistently activate without sales assistance. If guided setup remains the stronger route to qualified adoption, keep **Book a Demo** dominant.

## Visual And Interaction Constraints

- Preserve the approved Hero Focus Stack composition and motion.
- Preserve the primary CTA's existing brand shine while changing its label.
- Keep **Explore the Platform** text-only with its current minimal color hover: no arrow, shine, lift, scale, or transform animation.
- Do not add a third Phase 1 hero action.
- Keep proof items readable at mobile widths without horizontal scrolling.
- Preserve keyboard focus visibility and reduced-motion behavior.

## Content And Route Consistency

- The `/demo` page heading, metadata, form action, and success state must use language consistent with whether the visitor is requesting or directly booking a demo.
- “Book a Demo” must lead to immediate scheduling; otherwise use “Request a Demo.”
- The future trial CTA must lead to the real trial onboarding flow, not a generic contact form.
- Update targeted tests when labels or CTA hierarchy change.
- Record each phase transition in `docs/ROADMAP.md`; do not document a future phase as implemented.

## Validation

- Inspect desktop and mobile hero layouts in the existing development server.
- Confirm the headline and proof strip fit without colliding with the Focus Stack.
- Confirm CTA destinations, focus states, and hierarchy.
- Confirm reduced-motion output remains complete.
- Run only the targeted hero and shared-header tests affected by the content change.
- Do not run a production build unless explicitly requested.

## Out Of Scope

- Building the direct calendar booking experience
- Building trial signup, authentication, workspace creation, or dashboard onboarding
- Changing the approved Hero Focus Stack animation
- Redesigning the navbar navigation model
