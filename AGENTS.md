# Controllo Website Agent Guide

Controllo Website is the public marketing site for Controllo. Preserve the calm, product-led compliance narrative and keep claims, legal copy, integrations, framework coverage, and customer proof accurate.

## Start Here

1. Read `docs/AGENT_BRIEF.md` first for compact current context, source-of-truth pointers, frozen-surface state, and validation rules.
2. Read `README.md` only for setup, scripts, commands, or environment variables.
3. Read `CONTEXT.md` before changing product language, public claims, terminology, or domain copy.
4. Read `docs/PAGE_CREATION_BRIEF.md` before creating a new public page, reopening a page, or borrowing patterns from locked routes.
5. Read `docs/ARCHITECTURE.md` before changing routes, shared layout, content structures, motion, forms, or SEO.
6. Read `docs/ROADMAP.md` before treating a surface as production-ready, reopening a frozen surface, changing launch blockers, or updating delivery status.
7. Read `docs/FUTURE_SCOPE.md` before brainstorming, planning, or deferring work; update it for ideas intentionally left for later.

For visual changes, also read `DESIGN.md` and `design-system/controllo-compliance-current/MASTER.md`. Frozen surfaces are summarized in `docs/PAGE_CREATION_BRIEF.md` and detailed in `docs/ROADMAP.md`; reopen them only when the user explicitly asks. Use `docs/superpowers/specs/` only when historical design intent is relevant.

## Skill And MCP Routing

Read `docs/AGENT_SKILL_ROUTING.md` before prompts involving brainstorming, planning, UI/UX, frontend implementation, animation, graphics, image generation, branding, reference-to-code work, documentation, debugging, testing, browser QA, architecture, refactoring, review, accessibility, security, or agent-capability lifecycle changes.

Natural-language intent can trigger a skill. Use every available skill the user explicitly names. For inferred routing, choose the smallest effective set: normally one primary skill and at most two support skills. Read selected `SKILL.md` files completely and apply them within this repository's scope, accessibility, dependency, validation, and production-build rules.

Use MCP servers only when available and relevant:

- Context7: version-relevant docs for React, Vite, Tailwind CSS, and other third-party libraries.
- Notion: internal Controllo product context, requirements, decisions, or approved source material. Search `Controllo` plus the task subject.
- 21st: enterprise SaaS UI pattern/component discovery for Controllo. Adapt results to the local design system, accessibility rules, React/Vite stack, and dependency policy.

## Hard Execution Rules

- Prefer minimal, targeted work.
- Do not perform repository-wide cleanup unless the user explicitly requests it.
- Do not opportunistically refactor unrelated code.
- Do not rewrite working components only to match a preferred style.
- Do not install, remove, upgrade, downgrade, or regenerate dependencies unless the current task requires it and the user approves the need.
- Before adding a package, check existing dependencies and whether the feature can reasonably be built without a new dependency.
- Treat all `VITE_*` values as public browser configuration. Never place secrets in them.
- Preserve keyboard access, visible focus, operating-system reduced-motion behavior, static header fallback, and WebGL fallback.
- For new or explicitly reopened UI, follow the Phosphor icon rule in `DESIGN.md`; preserve iconography on locked surfaces unless they are reopened.
- Keep legal placeholders visibly marked until approved counsel copy replaces them.
- Verify external-facing claims, integration availability, framework coverage, and customer proof before publishing.
- For third-party logos or brand marks, read `public/assets/brands/README.md`, use the shared brand registry, and record exact product identity, source, and usage status there.

## Commands And Validation

Do not run these unless the user explicitly requests them:

- `npm run build`
- `npm run production`
- `vite build`
- full production builds
- full-project test suites
- full-project linting
- dependency installs, upgrades, or package-lock regeneration
- broad repository-wide scans after relevant files are identified

Use the cheapest relevant validation:

1. Inspect changed files.
2. Check imports, syntax, types, and local consistency.
3. Run targeted lint/type/test commands only for affected files when useful.
4. Use the existing development server for visual or interaction checks when appropriate.
5. Run broader validation only when the change genuinely requires it.
6. Run a production build only when the user explicitly requests a production build.

Assume the developer may already have the app running. Do not start another dev server unless required.

## Working Map

- `src/App.jsx`: route registry and lazy-loading boundaries
- `src/pages/`: route-level page composition
- `src/sections/`: homepage narrative sections
- `src/components/`: reusable UI, layout, metadata, forms, and motion visuals
- `src/data/`: product, framework, resource, navigation, and homepage content
- `src/services/`: browser-side lead submission and analytics adapters
- `src/context/`: shared site motion preference
- `src/styles.css`: Tailwind import plus global tokens/shared effects
- `public/`: crawler files and static-host SPA fallback

## Change Rules

- Keep product/framework copy in `src/data/` when it belongs to an existing content collection.
- Keep route components focused on composition; put shared behavior in `src/components/`, `src/services/`, `src/context/`, or `src/data/`.
- For a new public route, update `src/App.jsx`, navigation when applicable, `public/sitemap.xml`, metadata, and route tests together.
- Work with existing React/Vite and CSS patterns.
- For visual or interaction changes, inspect desktop and mobile behavior in a real browser.
- Update `docs/ROADMAP.md` when a user-visible capability, launch blocker, frozen baseline, or delivery status changes.

## Completion

When done, summarize what changed, list changed files, mention validation actually performed, and call out manual verification that still matters. Do not run extra expensive commands just to create stronger-looking evidence.
