---
name: add-or-update-component
description: Workflow command scaffold for add-or-update-component in jiwdah_website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-component

Use this workflow when working on **add-or-update-component** in `jiwdah_website`.

## Goal

Adds a new UI component or updates an existing component, often for navigation, layout, or reusable UI.

## Common Files

- `artifacts/jiwdah/src/components/*.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or modify a file in artifacts/jiwdah/src/components/{ComponentName}.tsx
- Implement or update the component's logic and styles

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.