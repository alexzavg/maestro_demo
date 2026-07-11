---
name: update-skills
description: Meta-skill that audits and refreshes the other Claude skills in this repository so their instructions stay true to the current codebase. Use when skills reference stale file paths, renamed scripts, or outdated structure/conventions, or after the project has evolved (refactors, renames, new tooling). Updates each skill's SKILL.md factual content while preserving its goal and intent. Can target one skill or sweep all of them.
---

# Update Skills

You are the maintainer of this repository's Claude skills. Skills contain concrete references — file paths, npm script names, directory layouts, config keys, naming conventions — that rot as the project evolves. Your job is to bring each skill's instructions back in sync with reality **without changing what the skill is for**.

## Scope

- Default target: every skill in `.claude/skills/*/SKILL.md` in this project, **except this one** (`update-skills`) — never modify yourself.
- If the user names a specific skill (or passes it as arguments), update only that one.
- User-level skills in `~/.claude/skills/` are out of scope unless the user explicitly asks; they are not tied to this repository.
- Auxiliary files inside a skill folder that are *instructions* (templates, reference docs) are in scope. **Generated artifacts are not** — e.g. `.claude/skills/analyze-codebase/codebase_context.md` is output produced by running that skill; never hand-edit it, instead note that its skill should be re-run.

## Procedure

For each target skill:

1. **Understand the intent.** Read the full SKILL.md. The frontmatter `description` and the skill's stated goal are the contract — everything you change must still serve that goal. If the goal itself seems obsolete (the feature it supports no longer exists), do not rewrite it; flag it to the user and move on.

2. **Extract its factual claims.** List every verifiable reference the skill makes: file and directory paths, glob patterns, npm/CLI script names, config file keys, tag names, env var names, tool names, branch names, URL/port numbers, naming conventions.

3. **Verify each claim against the current repo.** Check that referenced paths exist, scripts are still in `package.json`, config keys are still in the named config files, conventions still hold (spot-check real files). Prefer a fresh `.claude/skills/analyze-codebase/codebase_context.md` as a map, but trust the filesystem over the memory file — if they disagree, the filesystem wins (and the analyze-codebase skill should be re-run).

4. **Update surgically.** Fix what is stale: correct paths, rename scripts, adjust globs, update directory trees, revise counts/lists that changed. Keep the skill's structure, voice, and level of detail. Do not pad, restyle, or "improve" prose that is still accurate. If the project gained something squarely inside the skill's mission (e.g. a new reporting script for a skill about reporting), add it in the skill's existing style.

5. **Keep frontmatter valid.** `name` must stay equal to the folder name. Only reword `description` if it states something now false — it is the trigger surface for skill selection, so edit conservatively.

## Rules

- Preserve intent, refresh facts. A skill that did X before must still do X after — just against the current project.
- Every edit must be justified by something you actually verified in the repo this session; never "update" from memory or assumption.
- Never write secret values into a skill; env var **names** only.
- Ambiguity goes to the user: if a referenced thing disappeared and you can't tell what replaced it (or whether the skill is dead), report it instead of guessing.
- Idempotent: running this skill twice in a row on an unchanged repo must produce zero edits the second time.

## Report

Finish with a per-skill summary:

- **Updated** — skill name, and a bullet per change (was → now, with the evidence path).
- **Unchanged** — skills that verified clean.
- **Needs attention** — obsolete goals, unresolvable references, or generated artifacts (like `codebase_context.md`) that are stale and need their own skill re-run.
