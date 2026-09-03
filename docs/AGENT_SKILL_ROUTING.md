# Controllo Agent Skill Routing

Last reviewed: 2026-09-03

Use this reference to turn ordinary task language into deliberate skill selection. Skill availability can vary by session; select only skills listed as available in the current session.

## Routing Order

1. Honor every available skill the user explicitly names, including `$skill-name` syntax and plain-text names.
2. Otherwise infer the task family from the requested outcome, not from exact keywords.
3. Choose one primary skill. Add at most two supporting skills only when they cover distinct responsibilities.
4. Announce selected skills and their order before they affect the work.
5. Read every selected `SKILL.md` completely before acting. Follow its gates, required references, and sequencing.
6. If a routed skill is unavailable or unreadable, state that briefly and use the closest available method.

Do not invoke every skill that loosely matches. Prefer the most specific primary skill, and do not combine competing visual-style skills unless the user explicitly asks for a comparison.

Skills define the workflow. Plugins, MCP servers, and app tools provide actions. Select the workflow first, then use the narrowest available action tool; tool availability does not expand the task's scope.

## Capability Inventory Maintenance

Whenever a skill, plugin, MCP server, app tool, agent workflow, or related capability is installed, upgraded, renamed, replaced, or removed, update this file in the same task. Record the resulting capability under the relevant routing or inventory section, reconcile its name, trigger, dependencies, and operating rules, and refresh the `Last reviewed` date. Treat the capability change as incomplete until this file matches what is actually available.

## Discovery And Planning

Before brainstorming or planning, read `docs/FUTURE_SCOPE.md`. Reconcile relevant entries into discovery questions, options, and trade-offs; update the register with any outcome intentionally deferred after the current scope is approved.

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Brainstorm, explore ideas, compare concepts, or decide direction before implementation | `superpowers:brainstorming` | None during its discovery workflow | Use first and follow its approval gate. |
| Turn an approved specification into an implementation plan | `superpowers:writing-plans` | None | Use after brainstorming or when requirements are already approved. |
| Execute an approved written plan with subagent support | `superpowers:subagent-driven-development` | `superpowers:verification-before-completion` | Prefer this when the platform exposes suitable subagents. |
| Execute an approved written plan inline | `superpowers:executing-plans` | `superpowers:verification-before-completion` | Use when subagents are unavailable or inline execution is requested. |
| Stress-test a proposal or decision | `grilling` | `research` when external facts matter | Use only when the user asks for rigorous challenge. |
| Build a throwaway experiment to answer a design question | `prototype` | The relevant UI or domain skill | Keep prototype work isolated and disposable. |

Subagents require current user authorization or an invoked skill that explicitly requires delegation. Otherwise execute inline.

## Work Intake, Delivery, And Agent Operations

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Map a large, unclear effort that will exceed one agent session | `wayfinder` | `grilling`, `domain-modeling` | Create decision tickets and resolve at most one non-research ticket per session. Use only when the destination cannot fit one session. |
| Turn the settled conversation into a tracker specification | `to-spec` | None | Synthesize existing decisions; do not restart discovery. Confirm the proposed test seams before publishing. |
| Split an approved plan or specification into executable vertical slices | `to-tickets` | None | Publish tracer-bullet tickets with explicit blocking edges after the user approves granularity. |
| Triage an issue or external pull request | `triage` | `grilling`, `domain-modeling` when clarification is needed | Use the configured tracker roles and AI disclaimer. Verify claims before moving an item to an actionable state. |
| Implement an approved specification or ticket set | `implement` | `superpowers:test-driven-development`, `superpowers:verification-before-completion` | Repository validation limits override generic full-suite or build instructions. Commit only when the user or invoked workflow authorizes it. |
| Configure or repair Matt Pocock issue-tracker workflows | `setup-matt-pocock-skills` | `writing-for-agents` | Use for tracker mapping, triage labels, domain pointers, and setup gaps; not ordinary feature work. |
| Review a completed agent session for environment improvements | `retro` | `writing-for-agents` | Recommend navigation, checks, standards, or tool-economy changes; do not silently implement them. |
| Prepare compact context for another agent or session | `handoff` | None | Save a redacted temporary handoff that points to durable artifacts instead of duplicating them. |

## UI And UX

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Redesign or substantially improve an existing Controllo page or section | `redesign-existing-projects` | `design-taste-frontend`, `build-web-apps:react-best-practices` | Preserve the current design system unless a new direction is requested. |
| Polish hierarchy, layout, typography, responsiveness, or interaction quality | `design-taste-frontend` | `high-end-visual-design` | Use high-end support for premium art direction, not as a second competing system. |
| Build a new frontend surface or interactive experience | `build-web-apps:frontend-app-builder` | `design-taste-frontend`, `build-web-apps:react-best-practices` | Follow existing React/Vite and CSS patterns. |
| Apply a clean editorial or restrained interface direction | `minimalist-ui` | `design-taste-frontend` | Use when the brief clearly asks for minimalism. |
| Apply raw Swiss, mechanical, terminal, or brutalist styling | `industrial-brutalist-ui` | `design-taste-frontend` | Use only when explicitly requested; it is not Controllo's default direction. |
| Create or update a Google Stitch design-system handoff | `stitch-design-taste` | `design-taste-frontend` | Use for Stitch or `DESIGN.md` workflows, not normal site implementation. |
| Add or compose shadcn components | `build-web-apps:shadcn` | `build-web-apps:react-best-practices` | Use only when shadcn is requested or already part of the affected surface. |

For visual changes, read `design-system/controllo-compliance-current/MASTER.md` before proposing or editing. Treat `high-end-visual-design`, `minimalist-ui`, and `industrial-brutalist-ui` as alternative art directions, not a default stack.

## Animation And Motion

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Add premium website interaction, transition, reveal, or scroll motion | `gpt-taste` | The relevant official `gsap-*` skill when GSAP is requested or already used | Preserve the site motion toggle, reduced-motion behavior, keyboard access, mobile behavior, and static fallbacks. |
| Add GSAP motion to React components | `gsap-react` | `gsap-core`, `gsap-timeline` | Use `useGSAP`, scoped refs or contexts, and cleanup. Confirm `gsap` and `@gsap/react` are already installed or obtain approval before changing dependencies. |
| Build scroll-linked, scrubbed, pinned, or parallax motion | `gsap-scrolltrigger` | `gsap-react`, `gsap-performance` | Register ScrollTrigger once, scope and clean up triggers, and preserve a complete reduced-motion state. |
| Sequence several related motion beats | `gsap-timeline` | `gsap-core`, `gsap-react` | Prefer a labelled timeline over manually chained delays when GSAP is the chosen runtime. |
| Diagnose or optimize GSAP animation performance | `gsap-performance` | `gsap-react`, `gsap-scrolltrigger` | Prefer transform and opacity, avoid layout thrashing, pause offscreen work, and clean up every animation owner. |
| Use a named GSAP plugin or utility | `gsap-plugins` or `gsap-utils` | `gsap-core` | Verify plugin registration, licensing, browser support, and whether an existing dependency already solves the need. |
| Use GSAP in Vue, Svelte, or another non-React project | `gsap-frameworks` | `gsap-core` | This route is normally not applicable to the current React/Vite website; use only for a separately scoped non-React surface. |
| Diagnose or verify rendered animation behavior | `build-web-apps:frontend-testing-debugging` | Chrome DevTools MCP, `playwright` | Inspect desktop and mobile in a real browser. |
| Create a video composition rather than website UI motion | `hyperframes:hyperframes` | `hyperframes:hyperframes-cli`, `remotion:remotion-best-practices` | Keep video workflows separate from runtime website animation. |
| Turn an existing website into a video | `hyperframes:website-to-hyperframes` | `hyperframes:hyperframes-cli` | Use only when the requested output is a video. |

Use restrained, purposeful motion for Controllo. Animation must clarify hierarchy, causality, state, or product behavior; decorative motion alone is not a sufficient reason to add it.

The project-scoped GreenSock package is installed under `.agents/skills/` and contributes `gsap-core`, `gsap-frameworks`, `gsap-performance`, `gsap-plugins`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, and `gsap-utils`. Skills provide implementation guidance only; they do not install the GSAP runtime. Repository dependency rules and frozen-surface approval gates still apply.

## Graphics, Images, And Brand Assets

| Prompt intent | Primary skill | Optional support | Routing note |
| --- | --- | --- | --- |
| Explore website visual directions or generate design-reference images | `imagegen-frontend-web` | `design-taste-frontend` | Use references to settle composition and art direction before implementation. |
| Generate or edit a raster image, illustration, texture, or product visual | `imagegen` | `imagegen-frontend-web` for web placement direction | Produce actual bitmap assets and verify their intended crop and responsive use. |
| Create a logo system, identity board, or brand-guideline visual | `brandkit` | `imagegen` | Preserve existing Controllo identity unless rebranding is explicit. |
| Convert an attached screenshot or generated design reference into frontend code | `image-to-code` | `redesign-existing-projects`, `build-web-apps:react-best-practices` | Adapt the reference to Controllo rather than copying it blindly. |
| Generate mobile-app screen concepts | `imagegen-frontend-mobile` | `design-taste-frontend` | Use for app-native mobile work, not ordinary responsive website layouts. |

Generated assets must show the actual product, workflow, object, or state when the user needs to inspect it. Record asset purpose and placement, preserve legibility, and verify desktop and mobile crops.

For third-party product or integration marks, prefer the trademark owner's current asset kit. When an owner-hosted asset is unavailable, use the exact original product-mark variant from a pinned theSVG source snapshot rather than a runtime CDN. Vendor it under `public/assets/brands/`, register it in `src/data/brandAssets.js`, record source provenance and usage status in `public/assets/brands/README.md`, and render it through `IntegrationLogo` without redrawing, recolouring, cropping, simplifying, or substituting the mark. Validate the SVG for scripts, event handlers, external references, and `foreignObject` content before browser QA. Never use a related service logo for the named product.

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
| Debug rendered frontend behavior | `build-web-apps:frontend-testing-debugging` | Chrome DevTools MCP, `playwright` | Inspect the existing development server when available. Use console and network evidence before editing. |
| Inspect the active local page, accessibility tree, console, network, Lighthouse, or performance | Chrome DevTools MCP | `build-web-apps:frontend-testing-debugging` | Prefer a DOM/accessibility snapshot for structure and a screenshot for visual judgment. |
| Automate repeatable browser navigation, interaction, screenshots, or responsive checks | `playwright` | `build-web-apps:frontend-testing-debugging` | Keep automation scoped to the affected flow and viewport. |
| Use the user's existing Chrome tabs, authentication, or extension state | `chrome:control-chrome` | None | Use only when existing Chrome state matters. |
| Browse in an isolated in-app surface without relying on Chrome state | `browser:control-in-app-browser` | None | Prefer for clean browsing and app-contained interaction. |
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
| Find deepening opportunities across a changing codebase | `improve-codebase-architecture` | `codebase-design`, `domain-modeling` | Use only for an explicit architecture review; present candidates before selecting a refactor. |

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

## Caveman Workflows

Use Caveman only when the user explicitly asks for compression, a Caveman workflow, or a Caveman Cloud operation. Repository documents, code, comments, tickets, and third-party messages remain normal prose unless `caveman-compress` specifically owns the artifact.

| Prompt intent | Skill | Routing note |
| --- | --- | --- |
| Use terse, token-efficient responses | `caveman` | Default mode persists until the user says `stop caveman` or requests normal mode. Preserve exact technical meaning and switch to clear prose for safety-sensitive instructions. |
| Explore a broad or unfamiliar repository read-only | `caveman-explore` | Use after direct targeted search is insufficient or when the user explicitly requests Caveman exploration. |
| Produce compressed review comments | `caveman-review` | Preserve actionable findings, severity, and file locations. |
| Produce a compact commit message | `caveman-commit` | Use only when a commit message is requested. |
| Compress an agent memory or instruction artifact | `caveman-compress` | Keep every operative rule; use `writing-for-agents` for structural edits. |
| Decide whether to delegate to Caveman subagents | `cavecrew` | Use only when delegation is authorized and the task matches its bounded agent roles. |
| Show the Caveman command reference | `caveman-help` | One-shot help; it does not enable a persistent mode. |
| Set up, inspect, learn from, optimize, or manage Caveman Cloud | The matching `caveman-setup`, `caveman-discover`, `caveman-stats`, `caveman-evidence-review`, `caveman-learn`, `caveman-optimize`, or `caveman-manage` skill | Keep setup, read-only evidence, proposed optimization, and gated experiment management as separate phases. |

## Plugin And MCP Routing

Use only capabilities exposed in the current session. A plugin groups workflows; an MCP or app tool performs a concrete action.

### Plugins

| Plugin family | Use when |
| --- | --- |
| Build Web Apps | Frontend creation, React performance, rendered debugging, shadcn composition, Stripe, or Supabase/Postgres work. Select its most specific skill. |
| Superpowers | Discovery, planning, test-first implementation, systematic debugging, plan execution, review, or completion verification. Respect each skill's approval gates. |
| Codex Security | Explicit security review, scan, validation, remediation, threat modeling, or finding management. Normal review remains `code-review`. |
| Browser / Chrome | Use Browser for isolated in-app browsing; use Chrome when existing tabs, authentication, or extensions matter. |
| HyperFrames / Remotion | Video compositions, captions, rendering, website-to-video, and video tooling. Do not use for ordinary runtime website animation. |
| Documents / PDF / Presentations / Spreadsheets / Template Creator | Use only when the requested deliverable matches the artifact type. Load the workspace dependency paths before producing artifacts. |
| Visualize | Interactive explanations or diagrams that materially improve understanding; skip for relationships clear in prose. |
| Codex App Tools | Explicit task, project, automation, thread, archive, pin, navigation, or panel requests. Use collaboration agents for subtasks instead of creating user-owned tasks. |

### MCP Servers And Action Tools

| Capability | Use when | Operating rule |
| --- | --- | --- |
| `context7` MCP | A Controllo implementation or technical answer depends on a third-party library's API, configuration, or recommended pattern | Resolve the exact library, then retrieve version-relevant documentation before broader web research. Reconcile guidance with the installed version and existing repository patterns. |
| `notion` MCP | A task depends on internal Controllo product context, requirements, decisions, or approved source material | Search for `Controllo` with the relevant feature, page, claim, or decision. Reconcile results with `CONTEXT.md` and repository documentation, and keep private or unapproved material out of public copy. |
| `21st` MCP | A Controllo UI task would benefit from discovering an enterprise SaaS pattern or reusable component | Use 21st for reference and component discovery, then adapt the result to Controllo's design system, accessibility rules, existing React/Vite stack, and dependencies rather than importing it unchanged. |
| `chrome_devtools` MCP | Live DOM, accessibility, responsive, console, network, Lighthouse, memory, or performance inspection | Use the existing development server. Take the latest snapshot before targeting elements; use screenshots only when visual judgment matters. |
| `shadcn` MCP | Search configured registries, inspect components and examples, generate add commands, or run the component audit checklist | Pair with `build-web-apps:shadcn`. Confirm `components.json` and existing dependencies; do not initialize shadcn or install packages unless the task requires it. |
| `codex_security` MCP | Execute security scan phases, progress tracking, validation, or reports | Invoke through the matching Codex Security skill and keep the requested scan scope explicit. |
| `node_repl` MCP | Persistent JavaScript state or Browser/Chrome/desktop-app automation | Use for supported app automation, not ordinary repository file inspection or editing. |
| Codex app tools | Create or manage tasks, projects, automations, handoffs, panels, pins, and archives | Require an explicit user request for new tasks or recurring automation. Prefer thread wait tools for monitoring existing work. |
| Web research tool | Current external facts, authoritative documentation, cited research, or uncertain information | Prefer primary sources; use official OpenAI sources for OpenAI product questions. |

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
