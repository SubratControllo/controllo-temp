# Design Skill Inventory

Last reviewed: 2026-09-08

This inventory records the curated third-party skills available for design, motion, critique, reference work, and image direction. It is descriptive, not a new source of product or design authority.

## Authority And Selection

Controllo repository instructions, the user's current request, and `design-system/controllo-compliance-current/MASTER.md` override third-party skill guidance. Keep `design-taste-frontend` primary for Controllo frontend implementation.

For inferred routing, use the smallest effective set: normally one primary skill and no more than two supporting skills. Use every available skill the user explicitly names, but do not let a skill expand the approved surface, install dependencies, run production validation, publish claims, or create persistent state without independent authorization.

## Installed Scope

- Global Codex copies: `~/.agents/skills`
- Repository Codex copies: `.agents/skills`
- Repository lock state: `skills-lock.json`
- Installation mode: copied skills selected explicitly with `npx --yes skills@latest add`

The repository-local skill directories are ignored local state. Their sources and hashes are tracked in `skills-lock.json`, matching the repository's existing skill-installation pattern.

## Curated Sources

| Source | Installed skills | Role |
| --- | --- | --- |
| [`emilkowalski/skills`](https://github.com/emilkowalski/skills) | `animate`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `review-animations` | Bounded motion implementation, opportunity discovery, improvement planning, and review |
| [`ConardLi/garden-skills`](https://github.com/ConardLi/garden-skills) | `web-design-engineer`, `gpt-image-2` | Visual artifact support and image direction |
| [`elayadesign/ai-design-skills`](https://github.com/elayadesign/ai-design-skills) | `landing-page-design` | Landing-page narrative, conversion structure, and copy |
| [`MengTo/Skills`](https://github.com/MengTo/Skills) | `audit-reference-originality`, `daily-ui-inspiration-capture`, `design-first-ui-prompting`, `html-to-interaction-prompts`, `optimize-web-animations`, `operational-enterprise-ai`, `product-proof-saas`, `stitched-full-page-capture` | Reference workflows, prompt preparation, animation optimization, and enterprise SaaS proof |
| [`jakubkrehel/skills`](https://github.com/jakubkrehel/skills) | `better-interface`, `better-accessibility`, `better-colors`, `better-layout`, `better-typography`, `better-ui`, `better-writing`, `interface-review`, `variant` | Domain-specific interface review and explicit iteration |
| [`codeswithroh/tastemaker`](https://github.com/codeswithroh/tastemaker) | `tastemaker` | Bounded ideation, reference study, and anti-slop critique |
| [`Owl-Listener/designer-skills`](https://github.com/Owl-Listener/designer-skills) | `design-principles`, `interfaces-that-feel`, `state-machine`, `motion-system`, `design-qa-checklist`, `critique-brand-consistency`, `critique-information-density` | Principles, interaction states, motion systems, QA, and focused critique |
| [`nutlope/hallmark`](https://github.com/nutlope/hallmark) | `hallmark` | Anti-slop page design, read-only audits, bounded redesigns, and screenshot or URL design-DNA study |

Total curated and add-on installation: 34 skills.

## Routing Ownership

### Controllo implementation

- `design-taste-frontend` owns frontend visual implementation and anti-slop quality.
- `web-design-engineer`, `landing-page-design`, `tastemaker`, and the `better-*` family are supporting specialists, selected only for a distinct concern.
- `hallmark` owns explicit Hallmark prompts, greenfield page/app design, anti-slop design audits, bounded redesigns, and screenshot or URL design-DNA study. For existing Controllo surfaces, keep it inside the requested files and preserve routes, component ownership, copy intent, brand, and information architecture unless the user approves a full rebuild.
- `landing-page-design` applies to page narrative, conversion structure, and copy, not every component task.
- `operational-enterprise-ai` supports enterprise workflow framing. `product-proof-saas` supports evidence-led SaaS presentation. Neither may invent Controllo capabilities, metrics, integrations, or customer proof.

### Motion

- `animate` implements one bounded animation request.
- `find-animation-opportunities` performs a read-only opportunity scan.
- `improve-animations` performs a broader read-only audit and improvement plan.
- `review-animations` performs strict motion review.
- `optimize-web-animations` focuses on measured performance and lifecycle behavior.
- `motion-system` and `interfaces-that-feel` support reusable motion language and interaction feel.
- Existing `gsap-*` skills own GSAP APIs, framework lifecycle, cleanup, and performance mechanics when GSAP is approved for the surface.

### Interface critique and iteration

- Select the matching `better-accessibility`, `better-colors`, `better-layout`, `better-typography`, `better-ui`, or `better-writing` skill for one review domain.
- Use `better-interface` only for a consolidated multi-domain review.
- Use `interface-review` for a user-requested, change-scoped review.
- Use `variant` only for explicit visual or interaction iteration.
- Use `design-qa-checklist`, `critique-brand-consistency`, and `critique-information-density` for their named QA concerns.
- Use `design-principles` and `state-machine` for foundational reasoning or explicit interaction-state modeling.

### References and images

- Use `daily-ui-inspiration-capture`, `design-first-ui-prompting`, `stitched-full-page-capture`, `html-to-interaction-prompts`, and `audit-reference-originality` only for reference, capture, prompt-preparation, or originality tasks.
- The host-provided `imagegen` skill owns actual bitmap generation. `gpt-image-2` supplies image direction, and `imagegen-frontend-web` supplies web-placement direction.
- References provide design evidence; they are not templates to copy.

## Security And Persistence

The installer reports risk metadata, not a permission boundary. Every installed skill can influence an agent with normal task permissions, so repository routing remains the effective guardrail.

- `tastemaker` received a **Critical Risk** Gen assessment. Inspection found documented HTTPS allowlisted asset fetchers and no bundled Python `subprocess`, `os.system`, `shell=True`, `eval`, or `exec` behavior. Its instructions are still unusually broad: they default to most UI tasks, prescribe dependencies and motion, and write `.tastemaker/` plus `~/.tastemaker/` memory. In Controllo, use it only as a bounded supporting skill. Do not create or update its persistent memory, add dependencies, or override frozen surfaces without explicit approval.
- `hallmark` received a **Safe** Gen assessment, **0 Socket alerts**, and **Low Risk** Snyk assessment from the installer. Its default build flow can create `.hallmark/` state, add Hallmark stamps, and emit `tokens.css`; allow that only when Hallmark owns the active task. Its audit verb is read-only, its study verb extracts design DNA rather than copying pixels, and existing-project deletions or full rebuilds require explicit approval.
- `stitched-full-page-capture` received one Socket alert and intentionally uses Node child-process APIs for browser and image utilities. Invoke it only for an explicit capture task and inspect its command scope first.
- `daily-ui-inspiration-capture`, `html-to-interaction-prompts`, `optimize-web-animations`, and `interface-review` received medium-risk ratings. Their generic build, commit, fetch, or validation instructions remain subordinate to the repository's scope, Git, network, and production-build rules.

No installed skill authorizes `npm install`, dependency upgrades, a production build, broad filesystem writes, external publishing, or public claims by itself.

## Maintenance

Refresh one source at a time with the exact installed names from the table. Repeat `--skill` for each selected name; never use `--all` for these sources.

Repository copy:

```bash
npx --yes skills@latest add OWNER/REPOSITORY --agent codex --copy --yes --skill NAME
```

Global copy:

```bash
npx --yes skills@latest add OWNER/REPOSITORY --global --agent codex --copy --yes --skill NAME
```

Before replacement, compare any existing destination with upstream. After refresh, verify both `SKILL.md` trees, review upstream instruction and risk changes, validate `skills-lock.json`, and update this file plus `docs/AGENT_SKILL_ROUTING.md` in the same task.
