# Controllo Website Agent Guide

This repository is the public Controllo marketing website. Preserve its calm, product-led compliance narrative while keeping claims, legal copy, integrations, and customer proof accurate.

## Start Here

1. Read `README.md` for project status and local setup.
2. Read `CONTEXT.md` when changing product language or domain copy.
3. Read `docs/ARCHITECTURE.md` before changing routes, shared layout, content structures, motion, forms, or SEO.
4. Read `docs/ROADMAP.md` before treating any existing surface as production-ready.
5. Read `docs/FUTURE_SCOPE.md` before brainstorming, planning, or deferring work. Bring relevant entries into the current decision flow and record every idea or plan intentionally left for later before completing the task.

For visual changes, read `design-system/controllo-compliance-current/MASTER.md`. The homepage is frozen under its **Frozen Homepage Baseline**; reopen a homepage surface only when the user explicitly requests a change to that surface. Use `docs/superpowers/specs/` only when historical design intent is relevant.

## Skill Routing

Read `docs/AGENT_SKILL_ROUTING.md` before acting on prompts involving brainstorming, planning, UI/UX, frontend implementation, animation, graphics, image generation, branding, reference-to-code work, documentation, debugging, testing, browser QA, architecture, refactoring, review, accessibility, security, or any agent-capability installation or lifecycle change.

Natural-language intent is enough to trigger routing; the user does not need to type a skill name. Use every available skill the user explicitly names. For inferred routing, choose the smallest effective set: normally one primary skill and no more than two supporting skills. Read each selected `SKILL.md` completely, follow its required sequence and approval gates, and apply it within this repository's scope, accessibility, dependency, validation, and production-build rules.

`docs/FUTURE_SCOPE.md` is the durable register for every idea, dependency, refinement, and plan intentionally left for later. An entry preserves context but does not authorize expanding the active task; implementation still requires current user approval or an approved plan.

## MCP Routing

Use the designated MCP server when it is available and relevant to the current Controllo task:

- Use Context7 for version-relevant documentation and recommended APIs for the site's third-party libraries, including React, Vite, and Tailwind CSS.
- Use Notion for internal Controllo product context, requirements, decisions, and approved source material; search for `Controllo` together with the task's specific subject.
- Use 21st when discovering reusable enterprise SaaS interface patterns or components for Controllo.

Follow the detailed operating rules and fallbacks in `docs/AGENT_SKILL_ROUTING.md`. Reconcile every result with this repository's source of truth, design system, accessibility requirements, dependency policy, and public-claim safeguards before using it.

## Agent skills

### Issue tracker

Issues and specifications are tracked in GitHub Issues for `SubratControllo/controllo-temp`. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the default Matt Pocock skill label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository using root `CONTEXT.md` and system-wide ADRs under `docs/adr/`. See `docs/agents/domain.md`.

# Codex Execution Rules

## Token and Execution Efficiency

For every task in this repository, prioritize minimal, targeted work.

### Do NOT run expensive commands automatically

Unless I explicitly request them, DO NOT run:

* `npm run build`
* `npm run production`
* `vite build`
* full production builds of any kind
* full-project test suites
* full-project linting
* dependency upgrades
* `npm install`
* `npm update`
* package-lock regeneration
* broad repository-wide scans after the necessary files have already been identified

Do not run a production build merely to verify a UI, styling, refactoring, or component-level change.

### Validation Strategy

Use the cheapest relevant validation for the task.

Prefer, in order:

1. Inspect the changed files.
2. Check imports, syntax, types, and local consistency.
3. Run targeted lint/type/test commands only for affected files when available.
4. Use the existing development server when appropriate.
5. Run broader validation only when the change genuinely requires it.
6. Run a production build only when I explicitly request a production build.

Do not repeatedly validate unchanged parts of the repository.

### Existing Development Server

Assume the developer may already have the application running.

Do not start another development server automatically unless required.

Do not repeatedly run:

```bash
npm start
npm run dev
```

just to validate each change.

### Dependency Changes

Do not install, remove, upgrade, or downgrade dependencies unless the current task requires it.

Before adding a package:

* Check whether an existing dependency already provides the required functionality.
* Check whether the functionality can reasonably be implemented without another dependency.
* Explain why a new dependency is necessary if one must be added.

Never run `npm install` simply as a validation step.

### Scope Control

Only modify files necessary for the requested task.

Do not opportunistically refactor unrelated code.

Do not perform repository-wide cleanup unless explicitly requested.

Do not rewrite working components simply to match a preferred implementation style.

### Repository Exploration

Search narrowly first.

Prefer targeted commands such as:

```bash
rg "ComponentName" src/
rg "specificFunction" src/
```

over repeatedly scanning the entire repository.

Once the relevant implementation has been located, stop broad exploration unless additional context is required.

### Completion

When the task is complete:

* Summarize what changed.
* List the files changed.
* Mention any validation actually performed.
* Mention anything that still needs manual verification.

Do not run additional expensive commands simply to produce stronger-looking completion evidence.

### Production Build Rule — Important

`npm run build` is considered an explicit/manual validation step in this repository.

NEVER run it automatically.

Only run a production build when the user explicitly says something equivalent to:

* "run the production build"
* "run npm run build"
* "verify with a production build"
* "do a final production build"

A request such as "implement this", "fix this", "check this", "finish this task", or "verify your changes" does NOT authorize a production build.

## Working Map

- `src/App.jsx`: route registry and lazy-loading boundaries
- `src/pages/`: route-level page composition
- `src/sections/`: homepage narrative sections
- `src/components/`: reusable UI, layout, metadata, forms, and motion visuals
- `src/data/`: product, framework, resource, navigation, and homepage content
- `src/services/`: browser-side lead submission and analytics adapters
- `src/context/`: shared site motion preference
- `src/styles.css`: Tailwind import plus the current global/component CSS system
- `public/`: crawler files and static-host SPA fallback

## Change Rules

- Keep product and framework copy in `src/data/` when it belongs to an existing content collection.
- Keep route components focused on composition; extract reusable behavior into `src/components/` or `src/services/`.
- For a new public route, update `src/App.jsx`, navigation when applicable, `public/sitemap.xml`, metadata, and route tests together.
- Treat all `VITE_*` values as public browser configuration. Never place secrets in them.
- Preserve keyboard access, visible focus, operating-system reduced-motion behavior, the static header fallback, and the WebGL fallback.
- Keep legal placeholders visibly marked until approved counsel copy replaces them.
- Verify external-facing claims, integration availability, framework coverage, and customer proof before publishing.
- For third-party logos or brand marks, read `public/assets/brands/README.md`, use the shared brand registry, and keep the exact product identity, source, and usage status recorded there.
- Work with the existing React/Vite and CSS patterns. Avoid broad redesigns or dependency additions unless the task requires them.

## Completion Gate

Use the narrowest relevant validation described above. Run affected tests first, then broader checks only when the change requires them. Treat `npm test -- --run` and `npm run build` as explicit final validation commands; run the production build only when the user requests it.

For visual or interaction changes, inspect desktop and mobile behavior in a real browser. Update `docs/ROADMAP.md` when a launch blocker or user-visible capability changes.
