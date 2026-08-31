# Automatic Skill Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route natural-language Controllo tasks to the smallest relevant set of available skills without requiring explicit skill names.

**Architecture:** Keep the always-loaded rule in `AGENTS.md` concise and disclose the detailed intent matrix through `docs/AGENT_SKILL_ROUTING.md`. The routing reference owns category mappings, selection order, overlap handling, and repository safeguards.

**Tech Stack:** Markdown agent instructions and the repository's installed Codex skills.

---

### Task 1: Add the routing pointer

**Files:**
- Modify: `AGENTS.md`

- [x] **Step 1: Add `Skill Routing` after `Start Here`**

Add a compact rule requiring agents to read `docs/AGENT_SKILL_ROUTING.md` when a prompt involves creative discovery, UI/UX, animation, graphics, documentation, debugging, testing, architecture, review, accessibility, or security.

- [x] **Step 2: Define the always-on selection contract**

State that natural-language intent is sufficient, explicitly named available skills are mandatory, inferred routing uses the smallest useful skill set, and repository rules retain precedence.

### Task 2: Add the routing reference

**Files:**
- Create: `docs/AGENT_SKILL_ROUTING.md`

- [x] **Step 1: Define routing order and overlap handling**

Document explicit selection, intent inference, minimum skill count, sequencing, unavailable-skill fallback, and repository precedence.

- [x] **Step 2: Add the task-intent matrix**

Map brainstorming, implementation planning, UI/UX, animation, graphics, reference-to-code, documentation, debugging, browser QA, architecture, refactoring, testing, review, accessibility, and security prompts to primary and optional supporting skills.

- [x] **Step 3: Add Controllo-specific safeguards**

Preserve the design system, accessibility, reduced motion, claim accuracy, narrow scope, dependency policy, and explicit production-build rule.

### Task 3: Verify the agent documentation

**Files:**
- Inspect: `AGENTS.md`
- Inspect: `docs/AGENT_SKILL_ROUTING.md`

- [x] **Step 1: Check the pointer and matrix together**

Confirm every category named in `AGENTS.md` has a route in the reference and that each route has one clear primary skill.

- [x] **Step 2: Check for instruction conflicts and placeholders**

Search the two files for unfinished placeholder markers, contradictory skill-count rules, automatic dependency installation, automatic development servers, full-suite validation, or production builds.

- [x] **Step 3: Record validation limits**

Report that validation was documentation inspection only. Git commit steps are unavailable because this workspace has no `.git` directory.
