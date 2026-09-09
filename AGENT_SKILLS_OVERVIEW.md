# Agent Skills Overview

Last reviewed: 2026-09-08

This is the short human map for deciding which skill fits which part of Controllo work. `docs/AGENT_SKILL_ROUTING.md` remains the full agent routing source of truth, and `docs/agents/design-skills.md` remains the design-skill inventory.

## How To Choose

1. Start from the task outcome, not the exact words in the prompt.
2. Pick one primary skill. Add support only for a distinct second concern.
3. Read the selected `SKILL.md` before work starts.
4. Apply Controllo rules after the skill: frozen homepage, claim accuracy, reduced motion, accessibility, dependency approval, and no production build unless explicitly requested.

## Product Structure Map

| Product area | Typical files | Primary skills | Use when |
| --- | --- | --- | --- |
| Route and page structure | `src/App.jsx`, `src/pages/`, `public/sitemap.xml`, metadata tests | `improve-codebase-architecture`, `codebase-design`, `safe-refactor` | A route, sitemap, metadata, or page ownership change needs a better module/interface decision. |
| Product and domain language | `CONTEXT.md`, `src/data/`, route copy, framework/integration content | `domain-modeling`, `research`, `operational-enterprise-ai`, `product-proof-saas`, `landing-page-design` | Copy, claims, frameworks, readiness, Secura AI, assurance program language, or conversion narrative changes. |
| UI and UX implementation | `src/pages/`, `src/sections/`, `src/components/`, `src/styles.css` | `design-taste-frontend`, `hallmark`, `redesign-existing-projects`, `better-interface` | Visual hierarchy, page redesign, anti-slop polish, interaction quality, or a new frontend surface. |
| Focused interface critique | Rendered pages, changed sections, copy, layout, color, typography | `better-ui`, `better-layout`, `better-typography`, `better-colors`, `better-accessibility`, `better-writing` | One design domain needs review or improvement. Use `better-interface` only for a combined review. |
| Motion and animation | Motion-heavy sections, `MotionContext`, GSAP sections, CSS keyframes | `animate`, `gpt-taste`, `emil-design-eng`, `motion-system`, `review-animations`, `optimize-web-animations`, `gsap-*` | Add, review, optimize, or systematize animation while preserving reduced-motion behavior. |
| Graphics, imagery, and brand assets | `public/assets/`, brand registry, generated visuals, reference screenshots | `imagegen`, `imagegen-frontend-web`, `gpt-image-2`, `brandkit`, `image-to-code`, `audit-reference-originality` | Generate images, direct web visuals, study references, convert screenshots to code, or protect originality/provenance. |
| Documentation and agent rules | `AGENTS.md`, `docs/agents/`, skills, plans, specs | `writing-for-agents`, `skill-creator`, `skill-installer`, `openai-docs` | Create or revise instructions, install skills, document Codex/OpenAI behavior, or make routing easier for agents. |
| Debugging and validation | Tests, browser QA, bug reports, visual regressions | `investigate-first`, `diagnosing-bugs`, `playwright`, `verify-and-stop` | Localize bugs, check behavior, automate browser evidence, or prove acceptance conditions without expanding scope. |
| Reviews and security | Diffs, branches, working tree, sensitive flows | `code-review`, `shannon`, security skills when exposed | Review risks, regressions, missing tests, accessibility gaps, or security-sensitive changes. |

## Global, Product, And Google

| Scope | Where it lives | How to use it |
| --- | --- | --- |
| Controllo-local skills | `.agents/skills/` | Preferred for this repository because they travel with the project and are documented by `docs/AGENT_SKILL_ROUTING.md`. |
| User-global agent skills | `~/.agents/skills/` | Useful across projects and available to other compatible agents. Use them when a matching repo-local skill is absent. |
| Codex-global skills | `~/.codex/skills/` and plugin caches | Useful inside Codex for system, plugin, Canva, Sites, spreadsheet, presentation, document, and PDF workflows. |
| Google-style artifacts | Workspace document, presentation, and spreadsheet skills | Use when the output is a Google Docs, Slides, or Sheets-style file, even if the final artifact is local first. |
| Google connectors | Google Drive, Calendar, or other installed/recommended plugins | Use only when installed and explicitly relevant, such as reading files from Drive or scheduling work in Calendar. |

## Google Work

| Google-facing task | Skill | Notes |
| --- | --- | --- |
| Google Stitch handoff or portable design-system file | `stitch-design-taste` | Use for Stitch or `DESIGN.md` workflows, not ordinary site implementation. |
| Google Docs-targeted document | `documents:documents` | Use for `.docx` or Google Docs-style deliverables. Load workspace document dependencies first. |
| Google Slides-style deck | `presentations:Presentations` | Use for slide decks and verify rendered slides. Pair with `brandkit` only when visual identity work matters. |
| Google Sheets-style workbook | `spreadsheets:Spreadsheets` | Use for spreadsheet creation, formulas, formatting, and workbook checks. |
| Google Cloud or Google Workspace public site mentions | `research`, Context7 when API docs matter, `brandkit` only for brand visuals | Verify current product identity and use the local brand registry. Do not redraw or recolor third-party marks. |

## Validation Owner

`verify-and-stop` is the only validation-only skill in the current routing. Use it when the task is to prove existing work meets acceptance conditions and stop.

Other skills can require or support validation, but they do not override the repository validation policy:

- `playwright` owns browser automation evidence.
- `design-qa-checklist` owns design QA checklists.
- `better-accessibility` owns accessibility review.
- `review-animations` and `optimize-web-animations` own motion review and performance evidence.
- `code-review` owns review findings.
- `superpowers:verification-before-completion`, when exposed, is a completion gate for implementation workflows.

No skill may run `npm run build`, full lint, full tests, `npm install`, or dependency updates unless the user explicitly authorizes that level of validation or dependency work.

## Coding Optimization

Use skills as workflow selectors, not as a pile-on.

| Coding situation | Best skill pattern | Why it optimizes work |
| --- | --- | --- |
| Small bug or UI behavior change | `surgical-patch` plus a targeted domain skill | Keeps edits at the narrowest responsible module. |
| New product slice with overbuilding risk | `lean-build` plus `ponytail:ponytail` when minimalism is requested | Delivers the smallest complete slice and resists speculative abstractions. |
| Unclear bug or regression | `investigate-first` or `diagnosing-bugs` | Prevents editing before the failing behavior is localized. |
| Refactor with behavior preserved | `safe-refactor` plus `codebase-design` | Keeps the interface and test surface explicit. |
| Deep architecture concern | `improve-codebase-architecture` | Produces candidates first, then waits for a selected module before interface design. |
| UI polish | `design-taste-frontend` plus one focused `better-*` skill | Avoids loading every design skill for one visual concern. |
| Animation work | `animate` for bounded work, `gsap-*` only when GSAP owns the runtime | Keeps motion purposeful and avoids mixing animation systems casually. |
| Current library/API usage | Context7 MCP plus the implementation skill | Gets current docs before code changes and reconciles them with installed dependencies. |

The best default stack for coding is: read routing, choose one skill, inspect the affected files, patch narrowly, then run the cheapest relevant validation.
