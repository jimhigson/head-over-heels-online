---
name: clean-worktrees
description: Find and remove git worktrees whose PRs have been merged to main. Use when the user says "clean worktrees", "prune worktrees", or wants to tidy up stale worktree branches.
---

## Step 1: List worktrees and check PR status

```sh
git worktree list
```

For each branch (excluding the main working directory and any non-worktree directories like `hohjs-e2e-coverage`), check whether its PR has been merged:

```sh
gh pr list --head "<branch>" --state merged --json number,title,mergedAt
```

Separate worktrees into two groups: **merged** and **unmerged**.

## Step 2: Report unmerged worktrees

NEVER remove unmerged worktrees unless the user explicitly names them and asks for removal.

For each unmerged worktree, report:
- The branch name and worktree path
- Whether it has an open PR (and link it) or no PR at all
- Committed changes: `git -C <path> log --oneline origin/main..<branch>` to show what's been committed
- Uncommitted changes: `git -C <path> status --short` to show any dirty state

Present this as an informational summary so the user can decide what to do with them.

## Step 3: Check merged worktrees for dirty state

For each merged worktree, check `git -C <path> status --short`. Separate into:

- **Clean** (no local changes) — safe to remove without confirmation
- **Dirty** (modified or untracked files) — list the dirty files and ask the user which to force-remove

## Step 4: Remove clean merged worktrees

```sh
git worktree remove <path>
```

## Step 5: Handle dirty merged worktrees

Present each dirty worktree's uncommitted changes to the user. Only force-remove (`git worktree remove --force <path>`) after explicit approval for each one.

## Step 6: Prune stale references

After removal, clean up any stale worktree metadata:

```sh
git worktree prune
```
