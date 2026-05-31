---
name: add-or-rebuild-page
description: Workflow command scaffold for add-or-rebuild-page in jiwdah_website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-rebuild-page

Use this workflow when working on **add-or-rebuild-page** in `jiwdah_website`.

## Goal

Adds a new page or rebuilds an existing one for the platform, typically for a new feature or section.

## Common Files

- `artifacts/jiwdah/src/pages/*.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or modify a file in artifacts/jiwdah/src/pages/{PageName}.tsx
- Implement or update the page's content and logic

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.