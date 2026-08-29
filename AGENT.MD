# AGENT.md

## Goal
Help maintain and improve this project with small, safe, production-quality changes.

## Working Rules
- Read the relevant code before making changes.
- Follow the existing architecture and coding style.
- Prefer the smallest change that correctly solves the problem.
- Do only the exact change the user asks for.
- Do not add adjacent features, navigation items, anchors, sections, cleanup, or redesigns unless the user explicitly asks for them.
- Do not refactor unrelated code.
- Do not rename files, functions, or APIs unless necessary.
- Reuse existing utilities and dependencies before adding new ones.
- Do not introduce new libraries without a clear reason.
- Do not run builds, tests, lint, dev servers, or extra verification after a change if the user asks for an edit only or explicitly says not to test.

## Before Coding
- Identify the files related to the task.
- Understand the current flow before changing it.
- Check for existing patterns that solve a similar problem.
- If the task is ambiguous, state the assumption before implementing.

## Implementation
- Keep functions and components focused.
- Avoid unnecessary abstraction.
- Handle errors explicitly.
- Preserve backward compatibility unless the task requires a breaking change.
- Never hardcode secrets, tokens, passwords, or environment-specific values.

## Testing
- Run relevant tests after changes only when the user has not asked to skip testing or verification.
- Run the build/type-check/lint when applicable only when the user has not asked to skip testing or verification.
- Add or update tests for behavior that changes.
- Do not say a task is complete if tests or builds are failing because of your change.

## Git / Scope
- Do not modify unrelated files.
- Do not overwrite user changes.
- Do not commit or push unless explicitly asked.
- Keep changes easy to review.

## Communication
When finished, briefly report:
1. What changed
2. Why it changed
3. What was tested, or that testing was skipped because the user requested no tests
4. Any remaining risks or follow-up work
