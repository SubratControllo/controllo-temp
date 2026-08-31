# Automatic Skill Routing Design

## Goal

Make ordinary task prompts reliably activate the most relevant available skills without requiring the user to remember skill names.

## Structure

Add a concise `Skill Routing` section to `AGENTS.md`. It will require intent-based skill selection, point to `docs/AGENT_SKILL_ROUTING.md`, and keep the always-loaded repository guide small.

Add `docs/AGENT_SKILL_ROUTING.md` as the detailed routing reference. It will map common task intent to primary and supporting skills for:

- brainstorming and planning
- UI/UX design and implementation
- animation and motion
- graphics, image generation, and brand assets
- screenshot or reference-driven implementation
- documentation and domain language
- debugging, testing, and browser verification
- architecture, refactoring, and small fixes
- reviews, accessibility, and security

## Selection Rules

- Infer task intent from natural language; explicit `$skill-name` syntax remains optional.
- Use every skill explicitly named by the user when available.
- Otherwise choose the smallest useful set: normally one primary skill and no more than two supporting skills.
- Read each selected skill's `SKILL.md` before acting and follow required sequencing or approval gates.
- Prefer repository-local taste skills for Controllo visual work.
- Resolve overlap by choosing the most specific skill rather than invoking several skills with the same purpose.
- If a routed skill is unavailable, state that briefly and continue with the closest available method.

## Repository Safeguards

Skill instructions do not override the repository's scope, dependency, validation, accessibility, reduced-motion, content-accuracy, or production-build rules. Visual work must preserve Controllo's current design system unless the user explicitly asks for a new direction.

## Completion Criteria

- `AGENTS.md` contains a clear pointer that triggers the routing reference for relevant prompts.
- The routing reference covers every task family listed above with unambiguous primary and supporting skills.
- Explicit and inferred skill behavior is defined.
- Conflicts, missing skills, sequencing, and skill-count limits are handled.
- Existing repository rules remain unchanged.
