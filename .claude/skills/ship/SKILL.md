---
name: ship
description: Pre-flight checks, commit hygiene, PR creation, and CI monitoring for shipping a branch. Use when the user says "ship", "ship it", "merge this", "raise a PR", or wants to go through the commit-and-PR workflow.
---

Walk through each phase in order. Ask the user before taking any destructive action.

## Phase 1: Pre-flight checks

Offer to run checks. If the user declines, skip to Phase 2.

1. **Type check + lint + unit tests:** `eval "$(fnm env)" && fnm use && pnpm check`
2. **E2e tests (chromium-desktop only):** `eval "$(fnm env)" && fnm use && pnpm build:game && pnpm playwright test --project=chromium-desktop`

Report results. If failures, offer to investigate before continuing.

## Phase 1b: Editor QA (if the branch touches editor code)

Check whether the branch includes changes under `src/editor/`. If so, offer to QA the editor interactively via the chrome-devtools MCP.

1. **Start the editor dev server** (if not already running):
   ```sh
   eval "$(fnm env)" && fnm use && pnpm dev:editor
   ```
   Run in the background. Find the port with `lsof -p <pid> -i -a | grep LISTEN`.

2. **Open in Chrome:**
   ```
   mcp__chrome-devtools__new_page({ url: "http://localhost:<port>/editor/" })
   ```

3. **Access the Redux store** at `window._e2e_store`:
   ```js
   const le = window._e2e_store.getState().levelEditor;
   le.currentlyEditingRoomId;
   le.campaignInProgress.rooms;
   ```

4. **Reset to a clean campaign** before testing:
   ```js
   window._e2e_store.dispatch({ type: "levelEditor/newCampaign" });
   ```

5. **Exercise the changed features** by dispatching actions directly (more reliable than clicking UI buttons, which suffer from stale uids after re-renders):
   ```js
   window._e2e_store.dispatch({ type: "levelEditor/<action>", payload: { ... } });
   ```

6. **Verify state** after each action by reading the store. Check room counts, door connections, item positions, toDoor cross-links, etc. Take screenshots for visual confirmation but treat the Redux state as the source of truth.

7. **Persistence caveat:** editor state persists to localStorage. If the state gets corrupted, clear it:
   ```js
   localStorage.removeItem("persist:hohol/levelEditor");
   ```
   Then reload the page.

Report QA results to the user before proceeding.

## Phase 2: Commit hygiene

Count commits ahead of main:

```sh
git rev-list --count origin/main..HEAD
```

Show them:

```sh
git log --oneline origin/main..HEAD
```

### If exactly 1 commit ahead

Confirm the commit message follows release-please conventions (check `package.json` or `.release-please-manifest.json` for the schema). If it looks good, proceed to Phase 3.

### If multiple commits ahead, all related

Offer to squash into a single commit. If the user confirms:

```sh
git reset --soft origin/main
git commit -m "<message>"
```

Draft the squashed commit message from the combined changes and ask the user to confirm it.

### If multiple commits ahead, some unrelated

Explain the situation clearly: "There are N commits ahead of main, but some appear unrelated to this branch's purpose." List them and ask the user which commit(s) belong on this branch.

If the user confirms which to keep, offer to reset and cherry-pick:

```sh
git reset --hard origin/main
git cherry-pick <commit-sha>
```

**This is destructive** — get explicit confirmation before running `git reset --hard`.

If the unrelated commits need to be preserved elsewhere, suggest the user stash or branch them first.

## Phase 3: Push and PR

Push the branch and create a PR:

```sh
git push -u origin HEAD
gh pr create -f
```

The `-f` flag uses the commit message as the PR title and body — this is the project convention.

Report the PR URL.

## Phase 4: CI monitoring

Offer to monitor the PR's CI checks in the background. If the user accepts, spawn a background agent that:

1. Polls `gh pr checks <pr-number> --watch` or periodically runs `gh pr checks <pr-number>` with sleeps between polls.
2. Reports back when all checks pass, or when any check fails.
3. On failure: fetches the failed check's log via `gh run view <run-id> --log-failed`, summarises the failure, and offers possible fixes.
4. On success: notifies the user that CI is green and the PR is ready to merge.

Use `ScheduleWakeup` or a background `Agent` for the monitoring — don't block the main conversation.

### Monitoring implementation

```
Poll cadence: ~270s (stays within the prompt-cache TTL window).
Fallback timeout: 1200s if no signal.
```

Each poll:
```sh
gh pr checks <pr-number>
```

Parse the output for "fail", "pending", "pass" states. If all pass → notify success. If any fail → fetch logs and report.
