# Controllo Agent Skill Routing

Use this reference to turn ordinary task language into deliberate skill selection. Skill availability can vary by session; select only skills listed as available in the current session.

## Routing Order

1. Honor every available skill the user explicitly names, including `$skill-name` syntax and plain-text names.
2. Otherwise infer the task family from the requested outcome, not from exact keywords.
3. Choose one primary skill. Add at most two supporting skills only when they cover distinct responsibilities.
4. Announce selected skills and their order before they affect the work.
5. Read every selected `SKILL.md` completely before acting. Follow its gates, required references, and sequencing.
6. If a routed skill is unavailable or unreadable, state that briefly and use the closest available method.

Do not invoke every skill that loosely matches. Prefer the most specific primary skill, and do not combine competing visual-style skills unless the user explicitly asks for a comparison.

## Discovery And Planning

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Brainstorm, explore ideas, compare concepts, or decide direction before implementation | `superpowers:brainstorming` | None during its discovery workflow | Use first and follow its approval gate. |
| Turn an approved specification into an implementation plan | `superpowers:writing-plans` | None | Use after brainstorming or when requirements are already approved. |
| Execute an approved written plan with subagent support | `superpowers:subagent-driven-development` | `superpowers:verification-before-completion` | Prefer this when the platform exposes suitable subagents. |
| Execute an approved written plan inline | `superpowers:executing-plans` | `superpowers:verification-before-completion` | Use when subagents are unavailable or inline execution is requested. |
| Stress-test a proposal or decision | `grilling` | `research` when external facts matter | Use only when the user asks for rigorous challenge. |
| Build a throwaway experiment to answer a design question | `prototype` | The relevant UI or domain skill | Keep prototype work isolated and disposable. |

## UI And UX

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Redesign or substantially improve an existing Controllo page or section | `redesign-existing-projects` | `design-taste-frontend`, `build-web-apps:react-best-practices` | Preserve the current design system unless a new direction is requested. |
| Polish hierarchy, layout, typography, responsiveness, or interaction quality | `design-taste-frontend` | `high-end-visual-design` | Use high-end support for premium art direction, not as a second competing system. |
| Build a new frontend surface or interactive experience | `build-web-apps:frontend-app-builder` | `design-taste-frontend`, `build-web-apps:react-best-practices` | Follow existing React/Vite and CSS patterns. |
| Apply a clean editorial or restrained interface direction | `minimalist-ui` | `design-taste-frontend` | Use when the brief clearly asks for minimalism. |
| Apply raw Swiss, mechanical, terminal, or brutalist styling | `industrial-brutalist-ui` | `design-taste-frontend` | Use only when explicitly requested; it is not Controllo's default direction. |
| Reproduce legacy taste-skill behavior | `design-taste-frontend-v1` | None | Use only when the user requests v1 compatibility. |
| Create or update a Google Stitch design-system handoff | `stitch-design-taste` | `design-taste-frontend` | Use for Stitch or `DESIGN.md` workflows, not normal site implementation. |
| Add or compose shadcn components | `build-web-apps:shadcn` | `build-web-apps:react-best-practices` | Use only when shadcn is requested or already part of the affected surface. |

For visual changes, read `design-system/controllo-compliance-current/MASTER.md` before proposing or editing. Treat `high-end-visual-design`, `minimalist-ui`, and `industrial-brutalist-ui` as alternative art directions, not a default stack.

## Animation And Motion

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Add premium website interaction, transition, reveal, or scroll motion | `gpt-taste` | `hyperframes:gsap` when GSAP is requested or already used | Preserve the site motion toggle, reduced-motion behavior, keyboard access, mobile behavior, and static fallbacks. |
| Diagnose or verify rendered animation behavior | `build-web-apps:frontend-testing-debugging` | `playwright` | Inspect desktop and mobile in a real browser. |
| Create a video composition rather than website UI motion | `hyperframes:hyperframes` | `hyperframes:hyperframes-cli`, `remotion:remotion-best-practices` | Keep video workflows separate from runtime website animation. |
| Turn an existing website into a video | `hyperframes:website-to-hyperframes` | `hyperframes:hyperframes-cli` | Use only when the requested output is a video. |

Use restrained, purposeful motion for Controllo. Animation must clarify hierarchy, causality, state, or product behavior; decorative motion alone is not a sufficient reason to add it.

## Graphics, Images, And Brand Assets

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Explore website visual directions or generate design-reference images | `imagegen-frontend-web` | `design-taste-frontend` | Use references to settle composition and art direction before implementation. |
| Generate or edit a raster image, illustration, texture, or product visual | `imagegen` | `imagegen-frontend-web` for web placement direction | Produce actual bitmap assets and verify their intended crop and responsive use. |
| Create a logo system, identity board, or brand-guideline visual | `brandkit` | `imagegen` | Preserve existing Controllo identity unless rebranding is explicit. |
| Convert an attached screenshot or generated design reference into frontend code | `image-to-code` | `redesign-existing-projects`, `build-web-apps:react-best-practices` | Adapt the reference to Controllo rather than copying it blindly. |
| Generate mobile-app screen concepts | `imagegen-frontend-mobile` | `design-taste-frontend` | Use for app-native mobile work, not ordinary responsive website layouts. |

Generated assets must show the actual product, workflow, object, or state when the user needs to inspect it. Record asset purpose and placement, preserve legibility, and verify desktop and mobile crops.

## Documentation And Content

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Edit `AGENTS.md`, agent-facing instructions, or an agent reference | `writing-for-agents` | None | Keep pointers sharp and move branch-specific detail behind them. |
| Create or update a Codex skill | `skill-creator` | `superpowers:writing-skills`, `writing-for-agents` | Follow the skill packaging and verification workflow. |
| Clarify Controllo terminology, concepts, or `CONTEXT.md` | `domain-modeling` | `research` when claims need evidence | Keep product language consistent with the domain model. |
| Research and write evidence-backed technical or product documentation | `research` | A domain-specific skill | Prefer primary sources and save durable findings in the repository. |
| Document OpenAI or Codex products, setup, models, skills, or automations | `openai-docs` | None | Use official OpenAI sources. |
| Create or edit a Word document | `documents:documents` | `research` when sourcing is required | Use for `.docx` deliverables, not ordinary repository Markdown. |
| Create or inspect a PDF | `pdf:pdf` | `research` when sourcing is required | Visually verify layout-sensitive PDF output. |
| Create a slide deck | `presentations:Presentations` | `research`, `brandkit` | Apply Controllo branding and verify rendered slides. |
| Create or analyze a spreadsheet | `spreadsheets:Spreadsheets` | `research` when sourcing is required | Verify formulas, formatting, and workbook structure. |

When changing public product language, read `CONTEXT.md`. Verify integrations, framework coverage, customer proof, legal statements, and other external claims before publishing.

## Debugging, Testing, And Browser QA

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Diagnose a reported bug, regression, or failing test | `superpowers:systematic-debugging` | None | Establish evidence and root cause before editing. |
| Diagnose a difficult bug or performance regression when the user explicitly asks to diagnose | `diagnosing-bugs` | None | Follow its evidence loop before proposing a fix. |
| Investigate an ambiguous, intermittent, or poorly localized failure before editing | `investigate-first` | None | Localize the cause before selecting a fix workflow. |
| Debug rendered frontend behavior | `build-web-apps:frontend-testing-debugging` | `playwright` | Inspect the existing development server when available. |
| Automate browser navigation, interaction, screenshots, or responsive checks | `playwright` | `build-web-apps:frontend-testing-debugging` | Keep automation scoped to the affected flow and viewport. |
| Implement a feature or bugfix test-first | `superpowers:test-driven-development` | The relevant implementation skill | Run the narrowest affected test first. |
| Perform a validation-only task against acceptance conditions | `verify-and-stop` | `playwright` for visual work | Stop when the requested evidence is complete. |
| Verify fresh evidence immediately before claiming implementation is complete | `superpowers:verification-before-completion` | `playwright` for visual work | Match verification to the affected surface and completion claims. |

Use the cheapest relevant validation from `AGENTS.md`. Browser QA does not authorize starting another server, installing dependencies, running the full suite, or running a production build.

## Architecture, Features, And Refactoring

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Design or improve module boundaries and interfaces | `codebase-design` | `domain-modeling` | Use for structural decisions, not routine component edits. |
| Build a focused feature with high overbuilding risk | `lean-build` | The relevant UI or domain skill | Deliver the smallest complete product slice. |
| Make a narrow bugfix or small behavior change | `surgical-patch` | `superpowers:test-driven-development` | Change the narrowest responsible layer. |
| Restructure code while preserving behavior | `safe-refactor` | `codebase-design` | Protect the existing contract with focused verification. |
| Change schemas, data formats, APIs, protocols, or configuration compatibly | `migration` | `codebase-design` | Plan rollback and compatibility behavior. |
| Resolve an active merge or rebase conflict | `resolving-merge-conflicts` | None | Preserve both intended changes and verify the resolved behavior. |

Read `docs/ARCHITECTURE.md` before changing routes, shared layout, content structures, motion, forms, or SEO. Keep unrelated cleanup outside the task.

## Review, Accessibility, And Security

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Review code, a branch, commit, or working-tree change | `code-review` | The relevant domain skill | Lead with actionable findings ordered by severity. |
| Review a security-sensitive diff | `codex-security:security-diff-scan` | `codex-security:validation` | Use for PRs, commits, branches, or patches. |
| Perform a standard scoped security audit | `codex-security:security-scan` | `codex-security:threat-model` when architecture context is needed | Keep scope explicit. |
| Perform an explicitly exhaustive security audit | `codex-security:deep-security-scan` | Security phase skills selected by that workflow | Use only when the user requests a deep or exhaustive scan. |
| Determine whether a supplied security finding is real and exploitable | `codex-security:validation` | None | Validate before recommending remediation. |
| Classify and prioritize an imported security finding | `codex-security:triage-finding` | `codex-security:validation` | Use for supplied reports or vulnerability lists. |
| Fix and verify a validated or plausible security finding | `codex-security:fix-finding` | `codex-security:validation` | Keep the fix scoped to the finding. |
| Turn a finding or proof of concept into a disclosure-quality report | `codex-security:vulnerability-writeup` | `codex-security:track-findings` when tracking is requested | Preserve evidence and remediation detail. |
| Review accessibility or interaction quality | `build-web-apps:frontend-testing-debugging` | `playwright`, `design-taste-frontend` | Verify keyboard access, visible focus, responsive text, reduced motion, and semantic controls. |

## Special Cases

- Use `full-output-enforcement` only when the user requires complete multi-file output or explicitly asks to prevent truncation.
- Use `caveman` family skills only when the user explicitly asks for that workflow, compression mode, review style, or Caveman Cloud operation.
- Use `hyperframes` and `remotion` skills for video deliverables, not as substitutes for website animation skills.
- Use security skills only for security intent. A normal code review does not automatically become a security scan.
- Use artifact skills only when the requested output format matches the artifact.

## Controllo Safeguards

Every routed workflow remains subject to `AGENTS.md`:

- preserve the calm, product-led compliance narrative and the current design system
- keep claims, integrations, customer proof, and legal copy accurate
- preserve keyboard access, visible focus, reduced motion, motion controls, static header fallback, and WebGL fallback
- use existing React/Vite and CSS patterns and existing dependencies
- limit edits and validation to the requested surface
- inspect desktop and mobile for visual or interaction changes
- run a production build only when the user explicitly requests it
