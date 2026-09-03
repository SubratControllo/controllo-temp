# Curated Design Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Install the approved 33-skill design capability set globally and in Controllo, then document deterministic natural-language routing that preserves the repository's existing anti-slop and production safeguards.

**Architecture:** Use `skills@latest` with explicit source and skill selections so large upstream repositories cannot add unrelated capabilities. Keep copied global and repository-local skill trees identical, let the project installer update `skills-lock.json`, and make `docs/agents/design-skills.md` the detailed inventory while `AGENTS.md`, `README.md`, and `docs/AGENT_SKILL_ROUTING.md` remain concise entry points.

**Tech Stack:** Codex skills (`SKILL.md`), `npx skills@latest`, Markdown, JSON, Git

**Spec:** `docs/superpowers/specs/2026-09-03-curated-design-skills-design.md`

## Global Constraints

- Install exactly the 33 skills in the approved spec, not every skill from any source repository.
- Install copied skills for the Codex agent in both `~/.agents/skills` and `.agents/skills`.
- Keep `design-taste-frontend` primary for Controllo frontend implementation.
- Repository rules, user instructions, the Controllo design system, accessibility requirements, frozen surfaces, and public-claim safeguards override third-party skill instructions.
- Do not modify application dependencies, `package.json`, the application lockfile, application source, or visual surfaces.
- Do not run application tests, full lint, a development server, or a production build.
- Preserve all unrelated dirty worktree changes.
- Documentation must name only skills that installed successfully.

## File Map

- Create (ignored local state): `.agents/skills/<selected-skill>/` - repository-local copied skill packages for the 33 selected skills.
- Modify: `skills-lock.json` - installer-owned source paths and computed hashes for repository-local skills.
- Create: `/Users/ashutoshsingh/.agents/skills/<selected-skill>/` - global copied skill packages for the same manifest; these files are outside the repository.
- Create: `docs/agents/design-skills.md` - exact inventory, routing ownership, precedence, scope, and maintenance commands.
- Modify: `AGENTS.md` - concise agent-facing pointer to the design skill inventory.
- Modify: `README.md` - human-facing documentation link.
- Modify: `docs/AGENT_SKILL_ROUTING.md` - natural-language routes and overlap rules for the new capabilities.
- Modify: `docs/FUTURE_SCOPE.md` - FS-014 trigger-calibration follow-up.

---

### Task 1: Install The Repository-Local Manifest

**Files:**
- Create: `.agents/skills/animate/` and the other 32 selected skill directories listed in the spec
- Modify: `skills-lock.json`

**Interfaces:**
- Consumes: the exact 33-skill manifest in the approved spec
- Produces: readable `.agents/skills/<name>/SKILL.md` files and matching `skills-lock.json` records used by Tasks 3 and 4

- [x] **Step 1: Capture the pre-install application-file state**

Run:

```bash
git status --short -- package.json package-lock.json src public
```

Expected: record the current output verbatim. Installation must not add lines to this baseline.

- [x] **Step 2: Confirm every selected repository-local destination is absent**

Run:

```bash
for skill in animate emil-design-eng find-animation-opportunities improve-animations review-animations web-design-engineer gpt-image-2 landing-page-design audit-reference-originality daily-ui-inspiration-capture design-first-ui-prompting html-to-interaction-prompts optimize-web-animations operational-enterprise-ai product-proof-saas stitched-full-page-capture better-interface better-accessibility better-colors better-layout better-typography better-ui better-writing interface-review variant tastemaker design-principles interfaces-that-feel state-machine motion-system design-qa-checklist critique-brand-consistency critique-information-density; do test ! -e ".agents/skills/$skill" || printf '%s\n' "$skill"; done
```

Expected: no output. Stop and inspect any printed destination before installing over it.

- [x] **Step 3: Install the five Emil Kowalski skills locally**

Run:

```bash
npx --yes skills@latest add emilkowalski/skills --agent codex --copy --yes --skill animate --skill emil-design-eng --skill find-animation-opportunities --skill improve-animations --skill review-animations
```

Expected: successful installation of exactly five selected skills under `.agents/skills/`.

- [x] **Step 4: Install the two Garden skills locally**

Run:

```bash
npx --yes skills@latest add ConardLi/garden-skills --agent codex --copy --yes --skill web-design-engineer --skill gpt-image-2
```

Expected: successful installation of exactly two selected skills.

- [x] **Step 5: Install the landing-page skill locally**

Run:

```bash
npx --yes skills@latest add elayadesign/ai-design-skills --agent codex --copy --yes --skill landing-page-design
```

Expected: successful installation of exactly one selected skill.

- [x] **Step 6: Install the eight MengTo skills locally**

Run:

```bash
npx --yes skills@latest add MengTo/Skills --agent codex --copy --yes --skill audit-reference-originality --skill daily-ui-inspiration-capture --skill design-first-ui-prompting --skill html-to-interaction-prompts --skill optimize-web-animations --skill operational-enterprise-ai --skill product-proof-saas --skill stitched-full-page-capture
```

Expected: successful installation of exactly eight selected skills.

- [x] **Step 7: Install the nine Jakub Krehel skills locally**

Run:

```bash
npx --yes skills@latest add jakubkrehel/skills --agent codex --copy --yes --skill better-interface --skill better-accessibility --skill better-colors --skill better-layout --skill better-typography --skill better-ui --skill better-writing --skill interface-review --skill variant
```

Expected: successful installation of exactly nine selected skills.

- [x] **Step 8: Install Tastemaker locally**

Run:

```bash
npx --yes skills@latest add codeswithroh/tastemaker --agent codex --copy --yes --skill tastemaker
```

Expected: successful installation of exactly one selected skill.

- [x] **Step 9: Install the seven Owl Listener skills locally**

Run:

```bash
npx --yes skills@latest add Owl-Listener/designer-skills --agent codex --copy --yes --skill design-principles --skill interfaces-that-feel --skill state-machine --skill motion-system --skill design-qa-checklist --skill critique-brand-consistency --skill critique-information-density
```

Expected: successful installation of exactly seven selected skills.

- [x] **Step 10: Verify the local manifest and lock records**

Run:

```bash
for skill in animate emil-design-eng find-animation-opportunities improve-animations review-animations web-design-engineer gpt-image-2 landing-page-design audit-reference-originality daily-ui-inspiration-capture design-first-ui-prompting html-to-interaction-prompts optimize-web-animations operational-enterprise-ai product-proof-saas stitched-full-page-capture better-interface better-accessibility better-colors better-layout better-typography better-ui better-writing interface-review variant tastemaker design-principles interfaces-that-feel state-machine motion-system design-qa-checklist critique-brand-consistency critique-information-density; do test -r ".agents/skills/$skill/SKILL.md" || printf 'missing %s\n' "$skill"; rg -q "\"$skill\"" skills-lock.json || printf 'unlocked %s\n' "$skill"; done
```

Expected: no output.

- [x] **Step 11: Stage only repository lock state**

Run:

```bash
git add skills-lock.json
```

Run:

```bash
git diff --cached --name-only
```

Expected: only `skills-lock.json`. The copied `.agents/skills/` directories remain ignored local state, matching the repository's existing skill-installation pattern.

- [x] **Step 12: Commit the repository-local installation**

Run:

```bash
git commit -m "chore: install curated design skills"
```

Expected: one commit containing only repository skill lock state.

---

### Task 2: Install The Global Manifest

**Files:**
- Create: `/Users/ashutoshsingh/.agents/skills/<selected-skill>/` for all 33 selected skills

**Interfaces:**
- Consumes: the same source and skill selections proven by Task 1
- Produces: globally discoverable Codex skills whose names match the project-local manifest

- [x] **Step 1: Confirm every selected global destination is absent**

Run:

```bash
for skill in animate emil-design-eng find-animation-opportunities improve-animations review-animations web-design-engineer gpt-image-2 landing-page-design audit-reference-originality daily-ui-inspiration-capture design-first-ui-prompting html-to-interaction-prompts optimize-web-animations operational-enterprise-ai product-proof-saas stitched-full-page-capture better-interface better-accessibility better-colors better-layout better-typography better-ui better-writing interface-review variant tastemaker design-principles interfaces-that-feel state-machine motion-system design-qa-checklist critique-brand-consistency critique-information-density; do test ! -e "/Users/ashutoshsingh/.agents/skills/$skill" || printf '%s\n' "$skill"; done
```

Expected: no output. Stop and compare any printed destination to the local copy before replacement.

- [x] **Step 2: Install the Emil Kowalski selection globally**

Run:

```bash
npx --yes skills@latest add emilkowalski/skills --global --agent codex --copy --yes --skill animate --skill emil-design-eng --skill find-animation-opportunities --skill improve-animations --skill review-animations
```

Expected: exactly five selected global skills.

- [x] **Step 3: Install the Garden selection globally**

Run:

```bash
npx --yes skills@latest add ConardLi/garden-skills --global --agent codex --copy --yes --skill web-design-engineer --skill gpt-image-2
```

Expected: exactly two selected global skills.

- [x] **Step 4: Install the Elaya Design selection globally**

Run:

```bash
npx --yes skills@latest add elayadesign/ai-design-skills --global --agent codex --copy --yes --skill landing-page-design
```

Expected: exactly one selected global skill.

- [x] **Step 5: Install the MengTo selection globally**

Run:

```bash
npx --yes skills@latest add MengTo/Skills --global --agent codex --copy --yes --skill audit-reference-originality --skill daily-ui-inspiration-capture --skill design-first-ui-prompting --skill html-to-interaction-prompts --skill optimize-web-animations --skill operational-enterprise-ai --skill product-proof-saas --skill stitched-full-page-capture
```

Expected: exactly eight selected global skills.

- [x] **Step 6: Install the Jakub Krehel selection globally**

Run:

```bash
npx --yes skills@latest add jakubkrehel/skills --global --agent codex --copy --yes --skill better-interface --skill better-accessibility --skill better-colors --skill better-layout --skill better-typography --skill better-ui --skill better-writing --skill interface-review --skill variant
```

Expected: exactly nine selected global skills.

- [x] **Step 7: Install Tastemaker globally**

Run:

```bash
npx --yes skills@latest add codeswithroh/tastemaker --global --agent codex --copy --yes --skill tastemaker
```

Expected: exactly one selected global skill.

- [x] **Step 8: Install the Owl Listener selection globally**

Run:

```bash
npx --yes skills@latest add Owl-Listener/designer-skills --global --agent codex --copy --yes --skill design-principles --skill interfaces-that-feel --skill state-machine --skill motion-system --skill design-qa-checklist --skill critique-brand-consistency --skill critique-information-density
```

Expected: exactly seven selected global skills.

- [x] **Step 9: Verify all global skill entry points**

Run:

```bash
for skill in animate emil-design-eng find-animation-opportunities improve-animations review-animations web-design-engineer gpt-image-2 landing-page-design audit-reference-originality daily-ui-inspiration-capture design-first-ui-prompting html-to-interaction-prompts optimize-web-animations operational-enterprise-ai product-proof-saas stitched-full-page-capture better-interface better-accessibility better-colors better-layout better-typography better-ui better-writing interface-review variant tastemaker design-principles interfaces-that-feel state-machine motion-system design-qa-checklist critique-brand-consistency critique-information-density; do test -r "/Users/ashutoshsingh/.agents/skills/$skill/SKILL.md" || printf 'missing %s\n' "$skill"; done
```

Expected: no output. Global files are not committed to this repository.

---

### Task 3: Document Inventory And Natural-Language Routing

**Files:**
- Create: `docs/agents/design-skills.md`
- Modify: `AGENTS.md:33-45`
- Modify: `README.md:81-89`
- Modify: `docs/AGENT_SKILL_ROUTING.md:3-99`
- Modify: `docs/FUTURE_SCOPE.md` after FS-013

**Interfaces:**
- Consumes: the successfully installed names and sources from Tasks 1 and 2
- Produces: one detailed inventory and concise routing entry points used by future Codex tasks

- [x] **Step 1: Create the detailed inventory**

Create `docs/agents/design-skills.md` with these sections and exact responsibilities:

```markdown
# Design Skill Inventory

Last reviewed: 2026-09-03

## Authority And Selection

Controllo repository instructions and its design system override third-party skill guidance. For inferred routing, use one primary skill and no more than two supporting skills. Keep `design-taste-frontend` primary for Controllo frontend implementation.

## Installed Scope

- Global Codex copies: `~/.agents/skills`
- Repository Codex copies: `.agents/skills`
- Repository lock state: `skills-lock.json`

## Curated Sources

| Source | Installed skills | Role |
| --- | --- | --- |
| `emilkowalski/skills` | `animate`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `review-animations` | Bounded motion implementation, opportunity discovery, improvement planning, and review |
| `ConardLi/garden-skills` | `web-design-engineer`, `gpt-image-2` | Visual artifact support and image direction |
| `elayadesign/ai-design-skills` | `landing-page-design` | Landing-page narrative, conversion structure, and copy |
| `MengTo/Skills` | `audit-reference-originality`, `daily-ui-inspiration-capture`, `design-first-ui-prompting`, `html-to-interaction-prompts`, `optimize-web-animations`, `operational-enterprise-ai`, `product-proof-saas`, `stitched-full-page-capture` | Reference workflows, prompt preparation, animation optimization, and enterprise SaaS proof |
| `jakubkrehel/skills` | `better-interface`, `better-accessibility`, `better-colors`, `better-layout`, `better-typography`, `better-ui`, `better-writing`, `interface-review`, `variant` | Domain-specific interface review and explicit iteration |
| `codeswithroh/tastemaker` | `tastemaker` | Bounded ideation and critique |
| `Owl-Listener/designer-skills` | `design-principles`, `interfaces-that-feel`, `state-machine`, `motion-system`, `design-qa-checklist`, `critique-brand-consistency`, `critique-information-density` | Principles, interaction states, motion systems, QA, and focused critique |

## Precedence

- `design-taste-frontend` owns Controllo visual implementation and anti-slop quality.
- Existing `gsap-*` skills own GSAP APIs and lifecycle mechanics.
- The host `imagegen` skill owns actual image generation; `gpt-image-2` supplies direction.
- `tastemaker` cannot reopen frozen surfaces, override the design system, or create broad `.tastemaker` state without explicit approval.
- Broad skills support the narrowest applicable primary skill; they do not authorize dependencies, builds, publishing, or scope expansion.

## Maintenance

Use explicit `--skill` selections from the approved manifest when refreshing either scope. After an update, verify both `SKILL.md` trees, review upstream instruction changes, update `skills-lock.json`, and refresh this inventory plus `docs/AGENT_SKILL_ROUTING.md`. Do not use `--all` for these sources.
```

Expected: the file lists exactly the successfully installed manifest. Remove or mark any failed installation rather than claiming it is available.

- [x] **Step 2: Add the agent-facing inventory pointer**

In `AGENTS.md`, add this subsection after `## Agent skills` and before `### Issue tracker`:

```markdown
### Design capability inventory

The curated global and repository-local design, motion, critique, and image-direction skills are documented in `docs/agents/design-skills.md`. Use `docs/AGENT_SKILL_ROUTING.md` to select them from natural-language task intent.
```

Expected: `AGENTS.md` remains a concise pointer rather than duplicating the inventory.

- [x] **Step 3: Add the human-facing documentation link**

In the `README.md` Documentation list, add:

```markdown
- [Design skill inventory](docs/agents/design-skills.md)
```

Expected: the new link appears near the design-system and agent documentation links.

- [x] **Step 4: Add focused UI routing rows**

In `docs/AGENT_SKILL_ROUTING.md` under `## UI And UX`, preserve existing rows and add routes for:

```markdown
| Audit one interface domain such as accessibility, color, layout, typography, UI detail, or writing | The matching `better-*` skill | `design-taste-frontend` | Use the narrowest domain skill; use `better-interface` only for a consolidated multi-domain review. |
| Review a changed interface or generate explicit design variants | `interface-review` or `variant` | `design-taste-frontend` | Use only when review or iteration is requested; do not expand implementation scope automatically. |
| Shape a landing-page narrative, conversion structure, or product-proof story | `landing-page-design` | `product-proof-saas`, `design-taste-frontend` | Verify public claims and preserve Controllo's product-led narrative. |
| Model interaction states or evaluate interface feel | `state-machine` or `interfaces-that-feel` | `design-principles` | Use the most specific primary skill and keep behavior accessible and deterministic. |
| Run focused visual QA for brand consistency or information density | `critique-brand-consistency` or `critique-information-density` | `design-qa-checklist` | Critique only the requested surface and report evidence before proposing changes. |
```

After the table, add a pointer to `docs/agents/design-skills.md` and state that `design-taste-frontend` remains primary for Controllo implementation.

- [x] **Step 5: Add focused motion routing rows**

Under `## Animation And Motion`, preserve existing GSAP routes and add:

```markdown
| Implement one bounded animation request | `animate` | `gpt-taste`, the relevant `gsap-*` skill | Use GSAP support only when that runtime is selected or already owns the interaction. |
| Find animation opportunities without editing | `find-animation-opportunities` | None | Return prioritized opportunities and preserve frozen surfaces. |
| Audit or review existing animation quality | `improve-animations` or `review-animations` | `optimize-web-animations` for performance | Keep audits read-only unless implementation is separately authorized. |
| Define a reusable motion language or interaction-feel system | `motion-system` | `interfaces-that-feel`, `design-principles` | Preserve reduced-motion parity and the existing Controllo motion controls. |
```

Expected: the existing official `gsap-*` skills still own framework and API mechanics.

- [x] **Step 6: Add inspiration, reference, and image-direction routes**

Under `## Graphics, Images, And Brand Assets`, add:

```markdown
| Capture or translate UI inspiration into prompts | `daily-ui-inspiration-capture` or `design-first-ui-prompting` | `audit-reference-originality` | Use references as inputs, not templates to copy. |
| Turn HTML or a stitched page capture into interaction direction | `html-to-interaction-prompts` or `stitched-full-page-capture` | `audit-reference-originality` | Keep capture and prompt work separate from implementation approval. |
| Prepare GPT Image direction for a website visual | `gpt-image-2` | `imagegen-frontend-web`, `imagegen` | `imagegen` remains the runtime for generating the bitmap asset. |
| Explore a bounded alternative visual direction | `tastemaker` | `design-taste-frontend` | Do not create persistent `.tastemaker` state or reopen frozen surfaces without explicit approval. |
```

Expected: existing asset provenance, brand-mark, and image verification rules remain unchanged.

- [x] **Step 7: Record enterprise framing and inventory ownership**

Add a short note under UI routing:

```markdown
Use `operational-enterprise-ai` only for enterprise workflow framing and `product-proof-saas` only for evidence-led SaaS presentation. Neither skill may invent Controllo capabilities, metrics, integrations, or customer proof.
```

In `## Capability Inventory Maintenance`, add a link to `docs/agents/design-skills.md` as the design-package source inventory.

- [x] **Step 8: Add the deferred trigger-calibration entry**

Append this entry to `docs/FUTURE_SCOPE.md`:

```markdown
### FS-014 - Design skill trigger calibration

- **Status:** Deferred
- **Area:** Codex design capability routing
- **Outcome:** Validate the curated design, motion, critique, image-direction, and reference skills against representative Controllo prompts, then tighten descriptions or routing where natural-language activation is too broad, too narrow, or duplicative.
- **Trigger:** At least one real task has exercised each major family: UI implementation, motion, critique, reference workflow, and image direction.
- **Dependencies:** Fresh Codex task discovery, the installed global and repository-local manifests, observed routing behavior, and preserved Controllo precedence rules.
- **Source:** 2026-09-03 curated design skill installation
- **Next decision:** Which skill descriptions or routing rows need adjustment based on observed activation quality without increasing the default skill count?
```

Use an ASCII hyphen in the heading if the repository file remains ASCII-only.

- [x] **Step 9: Check documentation consistency**

Run:

```bash
rg -n "design-skills|design-taste-frontend|animate|better-interface|gpt-image-2|tastemaker|FS-014" AGENTS.md README.md docs/AGENT_SKILL_ROUTING.md docs/agents/design-skills.md docs/FUTURE_SCOPE.md
```

Expected: every entry point links to the inventory, precedence is explicit, and FS-014 appears once.

- [x] **Step 10: Stage only documentation from this task**

Run:

```bash
git add AGENTS.md README.md docs/AGENT_SKILL_ROUTING.md docs/FUTURE_SCOPE.md
git add -f docs/agents/design-skills.md
git diff --cached --name-only
```

Expected: only these five documentation files. Because several already contain user changes, inspect the staged diff and use a path-limited or patch-based stage if necessary to avoid committing unrelated hunks.

- [x] **Step 11: Commit the routing documentation**

Run:

```bash
git commit -m "docs: route curated design skills"
```

Expected: one documentation commit containing the inventory and routing changes, with unrelated user work excluded.

---

### Task 4: Verify Installation Integrity

**Files:**
- Inspect: `.agents/skills/<selected-skill>/SKILL.md`
- Inspect: `/Users/ashutoshsingh/.agents/skills/<selected-skill>/SKILL.md`
- Inspect: `skills-lock.json`
- Inspect: `AGENTS.md`, `README.md`, `docs/AGENT_SKILL_ROUTING.md`, `docs/agents/design-skills.md`, `docs/FUTURE_SCOPE.md`

**Interfaces:**
- Consumes: all outputs from Tasks 1 through 3
- Produces: fresh evidence that the two installations and their documentation agree without touching the application

- [x] **Step 1: Compare the exact local and global manifest names**

Run:

```bash
for skill in animate emil-design-eng find-animation-opportunities improve-animations review-animations web-design-engineer gpt-image-2 landing-page-design audit-reference-originality daily-ui-inspiration-capture design-first-ui-prompting html-to-interaction-prompts optimize-web-animations operational-enterprise-ai product-proof-saas stitched-full-page-capture better-interface better-accessibility better-colors better-layout better-typography better-ui better-writing interface-review variant tastemaker design-principles interfaces-that-feel state-machine motion-system design-qa-checklist critique-brand-consistency critique-information-density; do test -r ".agents/skills/$skill/SKILL.md" || printf 'local missing %s\n' "$skill"; test -r "/Users/ashutoshsingh/.agents/skills/$skill/SKILL.md" || printf 'global missing %s\n' "$skill"; done
```

Expected: no output.

- [x] **Step 2: Inspect frontmatter names and descriptions**

Run:

```bash
for skill in animate emil-design-eng find-animation-opportunities improve-animations review-animations web-design-engineer gpt-image-2 landing-page-design audit-reference-originality daily-ui-inspiration-capture design-first-ui-prompting html-to-interaction-prompts optimize-web-animations operational-enterprise-ai product-proof-saas stitched-full-page-capture better-interface better-accessibility better-colors better-layout better-typography better-ui better-writing interface-review variant tastemaker design-principles interfaces-that-feel state-machine motion-system design-qa-checklist critique-brand-consistency critique-information-density; do printf '\n[%s]\n' "$skill"; sed -n '1,12p' ".agents/skills/$skill/SKILL.md"; done
```

Expected: each entry has valid frontmatter with the intended name and a description consistent with the documented route. Investigate missing or mismatched metadata.

- [x] **Step 3: Confirm project lock ownership by source**

Run:

```bash
rg -n 'emilkowalski/skills|ConardLi/garden-skills|elayadesign/ai-design-skills|MengTo/Skills|jakubkrehel/skills|codeswithroh/tastemaker|Owl-Listener/designer-skills' skills-lock.json
```

Expected: all seven sources appear and every selected skill has a lock record.

- [x] **Step 4: Confirm the installer did not alter application files**

Run:

```bash
git status --short -- package.json package-lock.json src public
```

Expected: exactly the Task 1 baseline, with no installer-created changes.

- [x] **Step 5: Check final repository whitespace and staged state**

Run:

```bash
git diff --check
git diff --cached --check
git status --short
```

Expected: no whitespace errors, no task files left staged, and only the user's unrelated pre-existing changes remain uncommitted.

- [x] **Step 6: Record the verification limitation**

Do not start the app or run tests, lint, or a build. In the completion report, state that filesystem, metadata, lock, documentation, and application-file isolation were verified, while natural-language trigger quality requires a fresh Codex task and is tracked in FS-014.
