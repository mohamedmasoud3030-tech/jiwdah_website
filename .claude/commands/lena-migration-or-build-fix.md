---
name: lena-migration-or-build-fix
description: Workflow command scaffold for lena-migration-or-build-fix in Mohamed-platform-.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /lena-migration-or-build-fix

Use this workflow when working on **lena-migration-or-build-fix** in `Mohamed-platform-`.

## Goal

Completes migration to LENA platform or restores build compatibility after major changes.

## Common Files

- `.env.example`
- `README.md`
- `artifacts/jiwdah/index.html`
- `artifacts/jiwdah/src/LenaRoot.tsx`
- `artifacts/jiwdah/src/config/site.ts`
- `artifacts/jiwdah/src/lena.css`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Update environment and documentation files (.env.example, README.md)
- Update or restore LENA-related components and configuration
- Update or add LENA stylesheet (lena.css or platform.css)
- Update index.html or other entry points

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.