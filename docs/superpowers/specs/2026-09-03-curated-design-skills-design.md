# Curated Design Skills Installation Design

## Goal

Install a focused set of design, motion, critique, image-direction, and UI quality skills for Codex globally and for the Controllo repository. Improve design judgment and reduce generic AI-generated output without allowing third-party skill instructions to override Controllo's product, design-system, accessibility, dependency, or validation rules.

## Scope

The installation covers the Codex agent only and uses copied skill directories so global and repository-local behavior is explicit and inspectable.

- Global scope: `~/.agents/skills`
- Controllo scope: `.agents/skills`
- Installer: `npx --yes skills@latest add`
- Agent selection: `--agent codex`
- Install mode: `--copy --yes`

The truncated source links supplied in the request resolve to:

- `ConardLi/garden-skills`
- `elayadesign/ai-design-skills`
- `codeswithroh/tastemaker`
- `Owl-Listener/designer-skills`

The installation is intentionally curated. It does not install every skill from the larger MengTo or Owl repositories.

## Selected Manifest

### emilkowalski/skills

- `animate`
- `emil-design-eng`
- `find-animation-opportunities`
- `improve-animations`
- `review-animations`

### ConardLi/garden-skills

- `web-design-engineer`
- `gpt-image-2`

### elayadesign/ai-design-skills

- `landing-page-design`

### MengTo/Skills

- `audit-reference-originality`
- `daily-ui-inspiration-capture`
- `design-first-ui-prompting`
- `html-to-interaction-prompts`
- `optimize-web-animations`
- `operational-enterprise-ai`
- `product-proof-saas`
- `stitched-full-page-capture`

### jakubkrehel/skills

- `better-interface`
- `better-accessibility`
- `better-colors`
- `better-layout`
- `better-typography`
- `better-ui`
- `better-writing`
- `interface-review`
- `variant`

`better-interface` routes work across the six domain-specific `better-*` skills, so those skills are installed as a complete set rather than leaving partial review coverage.

### codeswithroh/tastemaker

- `tastemaker`

### Owl-Listener/designer-skills

- `design-principles`
- `interfaces-that-feel`
- `state-machine`
- `motion-system`
- `design-qa-checklist`
- `critique-brand-consistency`
- `critique-information-density`

The complete manifest contains 33 skills.

## Installation Topology

Each source is installed twice with the same explicit skill selection: once globally and once in Controllo. Repeated `--skill` arguments select only the manifest above. Repository installation updates `skills-lock.json`; the global copy is not represented in the repository lock file.

Installation must not modify application dependencies, `package.json`, or the application lockfile. It must not start a development server or run an application build.

If a selected destination already exists, inspect its source and local modifications before replacement. Preserve locally modified skill content unless the user approves replacing it; identical or installer-managed copies may be updated normally.

## Routing And Precedence

Controllo's repository instructions remain authoritative. Third-party skills provide specialist methods, not permission to expand task scope or replace repository decisions.

### Visual implementation

- Keep `design-taste-frontend` as the primary skill for Controllo frontend design and anti-slop implementation.
- Use `web-design-engineer`, `landing-page-design`, or the `better-*` family as supporting specialists when their narrower concern is relevant.
- Use `landing-page-design` for conversion structure, page narrative, and landing-page copy, not as the default for every component task.
- Use `web-design-engineer` for visual artifacts and design-system support, not as a replacement for established React, Vite, CSS, or frontend implementation guidance.
- Use `tastemaker` for bounded ideation or critique. It cannot reopen frozen homepage surfaces, override the Controllo design system, or create broad persistent `.tastemaker` state without explicit task scope.

### Motion

- Use `animate` to implement a bounded animation request.
- Use `find-animation-opportunities` for a read-only opportunity scan.
- Use `improve-animations` for a broader read-only motion audit and improvement plan.
- Use `review-animations` for strict motion review.
- Use `optimize-web-animations` for performance-oriented animation analysis.
- Use `motion-system` for system-level motion language and `interfaces-that-feel` for interaction feel.
- Keep the existing GSAP skills responsible for GSAP-specific APIs and implementation mechanics.

### Interface review and iteration

- Use the domain-specific `better-*` skill when the task clearly concerns accessibility, color, layout, typography, UI detail, or writing.
- Use `better-interface` for a consolidated interface review across those domains.
- Use `interface-review` for a user-requested, change-scoped review.
- Use `variant` for explicit visual or interaction iteration, not automatic scope expansion.
- Use `design-qa-checklist`, `critique-brand-consistency`, and `critique-information-density` for their named QA or critique concerns.
- Use `design-principles` and `state-machine` when the work needs foundational design reasoning or explicit interaction-state modeling.

### Inspiration, images, and proof

- Use `daily-ui-inspiration-capture`, `design-first-ui-prompting`, `stitched-full-page-capture`, `html-to-interaction-prompts`, and `audit-reference-originality` only when the task involves references, prompt preparation, capture, or originality review.
- Use `gpt-image-2` for image direction when image generation is relevant; the host-provided `imagegen` skill remains responsible for the actual image-generation runtime.
- Use `product-proof-saas` for evidence-led SaaS presentation and `operational-enterprise-ai` for enterprise workflow framing.
- Reconcile all generated concepts and public-facing claims with `CONTEXT.md`, the design system, approved source material, and the repository's claim safeguards.

For inferred routing, continue to select the smallest effective set: normally one primary skill and no more than two supporting skills. Every explicitly named skill is still used when available.

## Documentation Changes

Implementation updates the following repository documentation:

- `AGENTS.md`: add a concise pointer to the installed design skill inventory without duplicating the routing guide.
- `README.md`: add a human-facing link to the design capability inventory.
- `docs/AGENT_SKILL_ROUTING.md`: record the new routing roles, precedence rules, and current review date.
- `docs/agents/design-skills.md`: add the exact source and skill inventory, scope locations, collision rules, and maintenance commands.
- `docs/FUTURE_SCOPE.md`: record future trigger calibration and maintenance after the skills have been exercised in real tasks.

The documentation must describe only skills that were successfully installed. Failed or unavailable selections remain clearly identified instead of being presented as active capability.

## Safety And Collision Handling

- Repository rules, user instructions, legal safeguards, accessibility requirements, and frozen-surface constraints take precedence over installed skill instructions.
- Existing user-authored files and unrelated dirty worktree changes are preserved.
- Existing skills with overlapping names are compared before replacement.
- Skill source code and instructions are treated as third-party content and reviewed for unexpected commands, broad filesystem changes, or conflicting persistence behavior before use.
- No skill may authorize dependency installation, production builds, repository-wide rewrites, or publishing claims unless the current task independently authorizes them.
- New persistent files, generated assets, and design-system changes remain subject to normal repository scope and approval rules.

## Verification

Use narrow filesystem and metadata checks rather than application validation:

1. Confirm every selected skill has a readable `SKILL.md` in both global and Controllo skill roots.
2. Confirm the installed frontmatter name and description match the intended skill.
3. Confirm `skills-lock.json` records the repository installations and correct sources.
4. Confirm no unselected skills were added from the seven sources.
5. Confirm `package.json`, the application lockfile, and application source files were not changed by installation.
6. Confirm the routing and inventory documentation names only successfully installed skills and preserves Controllo precedence.
7. Inspect the final diff without running the app build, full lint suite, full test suite, or development server.

A fresh Codex task is required to verify discovery and natural-language triggering after installation. Trigger calibration across real UI, motion, critique, and image-generation tasks is deferred to the future-scope entry because it cannot be proven by filesystem inspection alone.

## Non-Goals

- Installing every skill from any source repository
- Changing Controllo application code, visual surfaces, or product copy
- Reopening the frozen homepage baseline
- Adding or upgrading application dependencies
- Running application tests, lint, a development server, or a production build
- Treating a third-party skill as a new repository source of truth

## Completion Criteria

- All 33 selected skills are installed globally and in Controllo, or any exceptions are reported precisely.
- Repository-local installation state is reflected in `skills-lock.json`.
- Routing precedence prevents broad or overlapping skills from bypassing Controllo rules.
- The inventory and maintenance documentation are accurate and linked from the main agent and human entry points.
- Deferred trigger calibration is captured in `docs/FUTURE_SCOPE.md`.
- Verification confirms installation scope without application dependency or source changes.
