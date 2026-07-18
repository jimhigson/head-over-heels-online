---
name: shepherd-prs
description: Take a set of local feature branches/worktrees all the way to merged PRs — discover unmerged work, fix commit-time hygiene, push, raise PRs, watch CI, auto-fix mechanical failures, merge on green, and cascade-rebase the rest. Use when the user says "shepherd PRs" or wants several branches driven to merge autonomously.
---

Drive a batch of local branches to merged PRs with minimal supervision. Work through the phases in order. This is a long-running, partly-autonomous job: once the user confirms scope and settings you push, open PRs, watch CI, fix, merge, and rebase without pausing for approval on each step — but you MUST get the up-front confirmations in Phases 0–2 first, and you MUST halt-and-report on anything unexpected.

## Merge policy for THIS repo — read before planning

The single biggest planning fact: **merges are serial, one PR per CI cycle.** The `main` branch is gated by a **ruleset** (not classic branch protection — `gh api repos/OWNER/REPO/branches/main/protection` returns 404; use `gh api repos/OWNER/REPO/rulesets` instead). The ruleset requires these status checks, **strict / up-to-date-with-base**:

- `check`
- `checkGenUpToDate`
- `Visual Regression Gate`
- `E2E Gate`

Consequences you must plan around:
- **Every merge invalidates every other open PR's up-to-date status.** So N independent green PRs cannot all merge at once — each must be `gh pr update-branch`'d onto the new `main` and have its 4 gates **re-run** (~10–15 min each) before it can merge. A batch of N PRs therefore costs ≈ N sequential gate cycles. Set that expectation with the user in Phase 0/2 (a 5-PR batch is an hour-plus of wall-clock, mostly waiting).
- **`gh pr merge --admin` does NOT bypass this** — the checks are ruleset-required and you are (normally) not a bypass actor, so admin merge is refused with "N of N required status checks are expected" even when the rollup shows them all green (they're green on a now-stale head). Don't fight it; update-branch and wait.
- **A PR can show all 4 gates SUCCESS in `statusCheckRollup` yet still be unmergeable** — because those successes are against an out-of-date head. `mergeStateStatus` = `BEHIND` is the tell; `CLEAN` means actually mergeable now.
- **`netlify/blockstack/deploy-preview` is NOT one of the required checks** — it's informational and often sits pending/`null` forever. Never gate merges or pollers on it (see Phase 6).

Efficient cascade: keep only the *next* PR to merge updated+running; updating the others early just wastes a cycle since the merge re-stales them. Merge the one that's `CLEAN`, then update-branch the next, repeat.

## Background 

* This repository has many checks that run in parallel, therefore it is usually better not to have checks for multiple PRs happening at once. Multiple PRs is fine, but multiple checks running together will just cause them to queue up and take longer overall.
* The aim of this skill is to autonomously and *slowly* and with a high degree of certainty of correctness, deliver work to the main branch. It is not to deliver at all costs - halting when unsure is ALWAYS preferable to pressing ahead without checks. The user is happy to accept that it could take several hours of automated wall time to merge several PRs, but since they will be away doing other things while this skill is running, this is fine.

## Phase 0 — Ask up-front, before touching anything

Surface every foreseeable ambiguity in one go and wait for answers. Typical questions:
- **Scope**: which branches (default: worktrees with commits in the last 3 days not yet on `origin/main`).
- **Commit-time rewrite rule** (see Phase 3) — target edge, author+committer handling, multi-commit ordering.
- **Diverged branches**: any branch whose local and remote have both moved (`--force-with-lease` will refuse) — does local win, or must remote commits be integrated first?
- **Dirty worktrees**: commit the uncommitted files (amend? new commit?) or leave them out?
- **Merge method + autonomy**: squash-merge? Merge the moment checks go green without pausing each time?
- **Legitimate snapshot changes**: branches whose own feature changes rendering will fail visual-regression as *real* diffs — OK to regenerate + commit baselines as the "fix"?
- **Visual-only correctness**: for render-changing branches, CI only checks snapshot *equality*, not correctness — describe what to eyeball and hold that branch until the user confirms (see "Visual verification").

## Phase 0.5 — Start to monitor PRs

- Run `watch -c -n 20 gh pr status --json "id,state,mergeable"` in a sub-agent, and refer to this agent going forwards for a quick, always-available summary of the current state.
- modify the json fields if necessary to give points of interest

## Phase 1 — Discover and info-gather on candidate branches

The scan of `git status` across many worktrees is slow (can be dozens of worktrees × thousands of files); run it in the background and warn the user it takes a while.

For each worktree (`git worktree list`), collect: branch, worktree path, dirty-file count, one-line purpose (`git log -1 --format=%s`), commits ahead, remote/PR state.

**Gotchas that must be handled:**
- **Squash-merged branches look "ahead".** `git rev-list --count origin/main..<branch>` miscounts a squash-merged branch as 1+ ahead. Confirm real merge status with `git cherry origin/main <branch>` — a `-` prefix means the patch is already on main (merged); `+` means genuinely unmerged. Drop the `-` ones (they're merged; their worktrees can be cleaned up).
- **Diverged branches**: `git rev-list --left-right --count origin/<branch>...<branch>` → `remoteOnly  localOnly`. Non-zero on both sides = diverged; flag it in Phase 0.
- **Stale PRs**: `gh pr list --state open --json number,headRefName,headRefOid`; a PR is stale if its `headRefOid` ≠ the local branch head.

## Phase 2 — Confirmation table, then get the go-ahead

Present a **numbered** table and wait for confirmation before acting. Columns:

| # | Worktree (branch) | Purpose (one line) | Ahead of main | Pushed to remote? | PR |

- **Purpose**: one line from the head commit / branch intent.
- **Pushed to remote?**: `in sync ✓`, `diverged`, or `never pushed` — derived from the left-right count.
- **PR**: `#NNN up-to-date`, `#NNN stale`, or `none`.
- **Exclude**: already-merged branches (the `git cherry -` ones), the **release-please** PR, and **dependency-upgrade** PRs (e.g. a Tailwind/major-version bump) — unless the user says otherwise.

Let the user renumber/trim scope and set merge order here.

## Phase 3 — Commit-time hygiene (privacy)

Goal: all commits should be altered to be authored/committed at 9pm (London local; in summer commits are already stored at `+01:00`, so the stored wall-clock hour *is* UK time — read it directly from `%aI`/`%cI`). This is to preserve the user's privacy with regards to their daily schedule.

### Merge-time vs work-time — know which the rewrite protects

This repo merges with `gh pr merge -s` (squash). A squash merge writes a **brand-new commit on `main` whose author+committer date is the merge moment**, not any branch commit's date (verified: PR #1008 merged 21:32 → its `main` commit reads `A/C 21:32`; PR #1010's branch commit was dated 16 Jul 21:00 yet landed on `main` as 18 Jul 12:13). The two timestamps serve different purposes:
- **Merge time** is what persists on `main`. The user is fine with the merge time being visible — **do not delay merges to disguise it**.
- **Work time** (when commits were actually authored) only ever shows on the **PR branch commits**, on the open PR page before the squash. That is the only thing the 9pm rewrite hides; `-sd` then deletes the branch so those dates vanish entirely.

So rewrite branch commit dates to 21:00 (amend / filter-branch + `--force-with-lease`, below) **to hide work-time on the live PR**; let the merge time fall where it lands on `main`. Don't conflate the two.

Rules (confirm specifics in Phase 0):
- **Set author date == committer date**, both at the chosen adjusted time.
- **Unpushed branches** — shift the *clock time* to 9pm, keeping the day the same
- **Already-pushed branches** — also shift 
- **Preserve chronological order** within a branch (commit N later or same time as N-1)

Applying it:
- Single commit: `GIT_COMMITTER_DATE="<iso>" git commit --amend --no-edit --date="<iso>"`.
- Multiple commits: rewrite per-commit dates with a `git filter-branch --env-filter` keyed on `$GIT_COMMIT`, or reset to the base and cherry-pick each with `GIT_AUTHOR_DATE`/`GIT_COMMITTER_DATE` set. This rewrites history → force-push in Phase 4.

## Phase 4 — Clean tree, then push

- Verify each worktree is clean and all intended work is committed **before** pushing (`git status --porcelain` empty).
- Push with **`--force-with-lease`** when history was rewritten or the branch diverged — **never bare `--force`**. If the lease refuses, the remote moved: stop and reconcile (per the Phase 0 answer), don't override.
- Brand-new branches: a plain `git push -u origin <branch>`.

## Phase 5 — Raise PRs

For any in-scope branch without an open PR: `gh pr create -f` with **no extra params** — let `gh` derive title/body from the commit. (Commit messages are single-line with release-please prefixes; never add a Claude/AI watermark or co-author trailer.)

Consider that the number of agents is limited, so for a larger number of PRs, consider staggering them - several raised one or two at a time may merge all faster than raising all together. This is especially true given they will need to be rebased anyway as other PRs merge, running the checks on the agents again.

## Phase 5.5 — Local tests

It is not mandatory to run `pnpm check` or other tests locally, but this is bonus work whenever we are waiting, and can be scheduled in either before raising a PR for a particular branch, or to pre-verify the remote checks. This will generally forerun checks on CI agents, so can discover failures either before the PR is raised, or while the PR's checks are running.

**Run the *whole* e2e suite locally, never a subset.** A CI round-trip on the gates is ~15 min *just to be told which spec failed*; running locally is always faster than waiting for CI to fail, so there is no time saved by narrowing scope — only a chance to miss the one spec you didn't run. Do **not** run only the spec you *expect* a change to affect (e.g. running just `roomSnapshots.spec.ts` for a render change): a refactor that looks pixel-identical in the room can still shift another spec (e.g. `settingsReflectInGame`'s scroll position), and that only surfaces if you ran it. Run every gated spec across every gated project (`chromium-desktop` + `mobile-chrome` at minimum, matching the E2E/Visual-Regression gates), then widen to the other projects if diffs appear. Build in visual-regression mode first (`pnpm build:game --mode visual-regression`) — a plain `build:game` does **not** expose `window.__PIXI_APP__`/`_e2e_*`, so every snapshot test fails with `Cannot read properties of undefined (reading 'ticker')`. See the `/run-e2e` skill.

## Phase 6 — Monitor CI and fix failures

Poll each PR's checks (`gh pr checks <n>`, `gh run list`, `gh run view`). CI here (visual-regression especially) is slow and fans out across many jobs.

### Pollers must not get stuck (learned the hard way)

Some status checks **never reach a terminal state**. The `netlify/blockstack/deploy-preview` status in particular can sit at `null`/pending indefinitely (Netlify sometimes reports the deploy result out-of-band and never flips the commit status). A monitor that waits for *all* checks to be `COMPLETED` therefore hangs forever, even though the PR is actually mergeable — silence that looks identical to "still running".

Rules for any CI poller:
- **Fail fast — react to the *first* failing check the instant it flips, never wait for the rest of the run.** This is the most important rule. Do **not** write a loop that counts "how many of the N required checks have reached a terminal state" and only reports once that count hits N — that design hides a failure for the entire ~15-min run (the other gates are still churning), so you lose all the time you could have spent fixing it, and a fix-push then races a run that's already doomed. The moment **any single** required check has `conclusion` ∈ {FAILURE, CANCELLED, TIMED_OUT}, the loop must emit and exit immediately so you can diagnose — regardless of what the other checks are doing.
- **Two exit conditions, checked every cycle, independently:** (a) *any* required check failed → exit now, report the failure; (b) *all* required checks are SUCCESS → exit, proceed to merge. Never make (b) the only way out.
- **Gate on the *real* checks only.** Exclude non-blocking/never-completing statuses by name — filter out `netlify/blockstack/deploy-preview` before counting anything. Only the four required gates (`check`, `checkGenUpToDate`, `Visual Regression Gate`, `E2E Gate`) decide green/red.
- **Always bound the loop** with a self-timeout (e.g. `deadline=$((SECONDS+2400))`) and print a timestamped line each cycle, so a genuinely stuck run surfaces as `TIMEOUT` rather than eternal quiet.
- **Don't front-run CI.** Wait for one PR's first *green* cycle before propagating the same assumption (e.g. a snapshot fix) into a stacked/dependent PR. If the assumption was wrong, you find out on one PR, not two.

Skeleton — **exits on the first failure OR full success, real checks only, self-bounded:**
```sh
req='["check","checkGenUpToDate","Visual Regression Gate","E2E Gate"]'
deadline=$((SECONDS+2400))
while [ $SECONDS -lt $deadline ]; do
  json=$(gh pr checks <n> --json name,state,link 2>/dev/null) || { sleep 45; continue; }
  # a required check that has already FAILED — report the instant it appears:
  failed=$(jq -r --argjson r "$req" '[.[]|select(.name as $n|$r|index($n))|select(.state|IN("FAILURE","ERROR","CANCELLED"))]|.[].name' <<<"$json" | sort -u)
  if [ -n "$failed" ]; then echo "$(date +%T) FAILED: $failed"; break; fi
  # all required checks green?
  green=$(jq -r --argjson r "$req" '[.[]|select(.name as $n|$r|index($n))|select(.state=="SUCCESS")]|length' <<<"$json")
  [ "$green" -ge 4 ] && { echo "$(date +%T) ALL GREEN"; break; }
  echo "$(date +%T) still running…"; sleep 45
done
```
The `break` on `$failed` is the whole point: it fires the moment the *first* gate goes red, without waiting for the others to settle.

### Restarting a stuck / never-reported check

If a non-blocking check (netlify preview, or a job that silently never started) needs re-triggering, push a **tiny no-op commit** to the PR branch to kick a fresh CI round: `git commit --amend --no-edit --date=now` + `git push --force-with-lease` (rewrites the tip → new head SHA → checks re-fire), or an empty `git commit --allow-empty -m "chore: re-run ci"`. Prefer amend-with-new-date on an already-clean branch so no junk commit lands; use `--allow-empty` only when you must preserve the existing commit exactly. `gh pr update-branch <n>` also re-fires CI (and is needed anyway to satisfy the up-to-date-with-base merge requirement).

- **e2e / visual-regression failure that's flaky or infra** → re-run the failed job: `gh run rerun <run-id> --failed`.
- **Legitimate snapshot diff from the branch's own feature** (e.g. a "add buttons" branch whose screenshots now show buttons) → regenerate + commit the baselines (`--update-snapshots`), then `git commit --amend` (or a new baseline commit) and force-with-lease. This is *not* new logic, it's expected baseline refresh.
- **Unexpected snapshot diff** (a change the branch shouldn't cause) → **halt that branch, keep the others moving, and report** what looks wrong. Don't paper over it with a baseline update.
- **Other failures** → diagnose the cause; fix **only if it's easily identifiable and mechanical** (missing import, formatting, a config/type mismatch, an omitted e2e label) — **no new logic**. Apply with `git commit --amend`, force-with-lease, and **message the user what was fixed**. If it needs real logic changes, stop and report instead.

## Phase 6.2 True-site-size comment

* On git the true-size-site workflow+action should comment on the PR with the site size.
* If the size increases by more than 0.5kb, DO NOT PROGRESS without first checking with the user that this size increase is ok
* If the size increases by more than 0.5kb OR is more than would be expected for the feature at hand, investigate why while waiting for other PRs, or immediately if there are no others in progress. For example, a small css change should be neutral for overall build size.


## Phase 6.5 — Read PR comments

- GitHub Copilot or human authors may be commenting,
judge if the comments are fair, categorise and summarise then, discounting any that are invalid.
If no valid comments exist, continue to phase 7, otherwise propose a fix to the user and continue
with the other PRs until the user replies

## Phase 7 — Merge on green

As each PR reaches all-checks-passed **and `mergeStateStatus` is `CLEAN`** (not `BEHIND`), merge it autonomously (unless the user asked to be asked): `gh pr merge -sd` (squash + delete branch). Because of the strict up-to-date ruleset (see "Merge policy for THIS repo"), only one PR is `CLEAN` at a time; `--admin` will not force a `BEHIND` one through. After a merge, the next PR is `BEHIND` → `gh pr update-branch <n>`, wait for its 4 gates to re-run, then merge. This is the serial cascade of Phase 8.

**Merge order: least-conflicting first, most-impactful last** — e.g. docs/a11y/isolated-feature branches early; broad refactors and library swaps last. Watch for branches that touch the same file (e.g. two both editing `CLAUDE.md`) — whichever lands second will need a trivial rebase-resolve.

**tmux cleanup (Jim's Mac only)** — after each merge, look for a leftover tmux session for the just-merged branch and **offer** to kill it (never kill without asking): `tmux ls | grep -i <branch>`, then `tmux kill-session -t <name>`. Sessions are usually named after the branch's **worktree directory**, which can differ from the branch name (e.g. `editor-pan-and-zoom-improve` lives in a `camera-rotation` worktree, so its session is `camera-rotation`) — so check the branch's worktree dir name too, not just the branch name.

## Phase 8 — Cascade-rebase the remainder

After each merge to `main`:
1. `git fetch origin`.
2. Rebase every remaining in-scope branch onto the new `origin/main`.
3. **Resolve conflicts with judgement** — read *why* each side changed and what each intends; resolve to honour both intents, don't blindly take one side. Re-run the branch's checks if the resolution was non-trivial.
4. Force-with-lease the rebased branch.
5. Keep monitoring its PR (the rebase re-triggers CI).

Repeat until every in-scope branch is merged.

## Visual verification (render-changing branches)

CI only asserts snapshot *equality*, never visual *correctness* — so a wrong render can bake a wrong baseline. For any branch that changes rendering in a way a human should judge, **describe exactly what to look at** (which rooms/screens, which camera angles or states, what "right" looks like) and **hold that branch** until the user confirms. Only then treat its snapshot diffs as expected and roll it into the merge order.

## Quick command reference

```sh
git worktree list
git cherry origin/main <branch>                      # '-' = already merged (squash)
git rev-list --left-right --count origin/<b>...<b>    # remoteOnly  localOnly  (divergence)
git log --format='%h A:%aI C:%cI %s' origin/main..<b> # author/committer ISO times
GIT_COMMITTER_DATE="<iso>" git commit --amend --no-edit --date="<iso>"
git push --force-with-lease origin <branch>          # never bare --force
gh pr create -f                                       # no extra params
gh pr checks <n>;  gh run rerun <run-id> --failed
gh pr merge -sd <n>                                   # squash + delete branch
```

## Node version (sandbox)

Use the supported node version ONLY (Node 26, `.node-version`) - never run
anything on the sandbox's default Node 22. If `node --version` is not 26.x:
```bash
cd /tmp && curl -sSLO https://nodejs.org/dist/v26.5.0/node-v26.5.0-linux-x64.tar.xz
tar xf node-v26.5.0-linux-x64.tar.xz
export PATH=/tmp/node-v26.5.0-linux-x64/bin:$PATH
```
(The SessionStart hook does this automatically once merged; in-container act
runs are unaffected - setup-node reads `.node-version`.)
