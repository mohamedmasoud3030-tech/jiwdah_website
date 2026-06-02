---
name: add-or-update-lena-platform-feature
description: Workflow command scaffold for add-or-update-lena-platform-feature in Mohamed-platform-.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-lena-platform-feature

Use this workflow when working on **add-or-update-lena-platform-feature** in `Mohamed-platform-`.

## Goal

Implements or updates features related to the LENA Digital House platform, including branding, immersive experience, and routing.

## Common Files

- `artifacts/jiwdah/src/pages/LenaPlatform.tsx`
- `artifacts/jiwdah/src/config/site.ts`
- `artifacts/jiwdah/src/LenaRoot.tsx`
- `artifacts/jiwdah/src/App.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update LenaPlatform.tsx page component
- Update site configuration (site.ts) for branding
- Add or modify routing entry (LenaRoot.tsx or App.tsx) to include LENA experience

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.