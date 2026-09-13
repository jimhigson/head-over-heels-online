---
name: debug-e2e
description: "Diagnose nondeterministic ('random', 'flaky') e2e or visual-regression failures on CI. Load whenever a test fails on CI but not locally, fails on one attempt but not another of the same commit, a snapshot diff shows shifted/blurred text or a sprite in a different place, or an errorCaught dialog appears mid-test. Carries the case history of every nondeterminism found and fixed on this suite, the diagnostic channels that record evidence, and the playbook for attributing a new one."
---

# Debugging nondeterministic e2e failures

The suite runs with `retries: 0` at every level, deliberately: a flaky test is
a broken test, and CLAUDE.md's testing section requires new CI failures to be
investigated as bugs, never dismissed as "pixel differences" or re-run into
silence. Everything here was learned by root-causing real CI failures after
the retries came off. **Do not add retries, waits, or looser tolerances** -
find the mechanism. Every failure so far has had one.

## The determinism architecture

The app has no clock of its own in these builds: a `TestDrivenAppTicker` moves
only when the test calls `window.__e2e_advanceTime(ms)`, so nothing ticks,
animates or draws unless a spec asks it to. Waits are on store state or on the
event bus, never on the wall clock.

**Load the `write-e2e` skill for the model in full** - the helpers, the bus and
the cursor pattern, what each channel is for. It is what a fix has to be written
against.

If a change reintroduces `waitForTimeout`, frame-count waits, retry loops, or
hammer-until-visible loops, it is regression - the suite has none.

## Diagnostic channels (where the evidence lands, per run)

All browser console output is forwarded into the playwright report/CI log by
the fixture in `e2e/testUtils/test.ts` (specs must import `test` from there).

| Channel | Fires | Tells you |
| --- | --- | --- |
| `[game-speed]` | every nonzero physics advance | whether/when game time moved, and by how much |
| `[monster-turn]` | every monster turn decision | the turn schedule: item, roomTime, hash, roll, direction. Diff pass-vs-fail runs of the same commit to see the sim diverge |
| `[text-layout]` | once per page | font/glyph metrics from the rasteriser, `--scale`, viewport, plus runner fingerprint: cores, browser build, GPU (read from the game's own GL context - never create a probe context, webkit rations them and pixi's init dies) |
| `[capture-geometry]` | every dialog screenshot | dialog box, flex children boxes, `fonts.status`, first line-box tops, any line off the pixel grid - answers "was the text where the baseline expects, at the moment of capture" |
| `[text-layout-detail]` | after a failed test | per-line positions (usually too late - the spec has moved on; prefer capture-geometry) |
| `[db]` | every db load, started and settled | a `started` with no `loaded in` is a request that never came back - the campaign it names is what the boot was waiting on |
| `[request failed]` / `[http 4xx]` | as they happen | a request the browser gave up on, or a response that errored (a 4xx is not a failure to the browser, so nothing else reports it) |
| `N request(s) still in flight` | after a failed test | what was outstanding at the moment of failure, oldest first - names a stall, which leaves no other trace |
| `the game never became ready to drive - …` | `waitForGameReady` timing out | boot state: both e2e hooks, assets loading count, every campaign query's status, open menus, url |

Getting CI evidence:

```bash
gh run view <runId> --json jobs --jq '.jobs[] | select(.conclusion=="failure") | .name'
gh api "repos/<o>/<r>/actions/runs/<runId>/attempts/<n>/jobs" --jq '...'   # per-attempt job ids
gh api --allow-escape-sequences "repos/<o>/<r>/actions/jobs/<jobId>/logs" > job.log
gh api "repos/<o>/<r>/actions/runs/<runId>/artifacts"                      # diff-image zips
```

Per-attempt logs are the key trick: a run that failed then passed on re-run
gives a pass/fail pair **on identical code and container** - diff their
channels.

## Case file: every nondeterminism found on this suite

| Signature | Root cause | Fix |
| --- | --- | --- |
| `timed out waiting for e2e event "firstRenderOfRoom"` (webkit) | event bus is per-document; `page.goto('#room')` sometimes reloads, resetting the bus and skipping `hashchange` routing | room waits became level-triggered on `currentRoom.id`; nav via `changeRoomViaApi`; the event was deleted |
| One character/monster sprite differs in a fast-forwarded snapshot (Sweep) | boot-freeze race: `setInterval` freeze is a starvable macrotask, ticker ran physics first at wall-clock-variable delta | freeze via `_e2e_store` setter hook, synchronous before first tick |
| Same, after the boot fix; turn logs show roomTimes like `9.000000000000046` vs `9` between attempts | fast-forward computed elapsed as `(lastTime + jump) − lastTime`: rounding depends on wall-clock lastTime; roomTime drift changes every `hash(itemHash + roomTime)` turn decision | `TestDrivenAppTicker.advance(ms)` sets the step's elapsed/delta directly, so a jump is exactly the ms asked for |
| A dialog's first keypress is dropped, on CI only | the tap listener was armed in a `useEffect`, so the dialog's DOM existed for a tick before anything listened | `useLayoutEffect` in `useActionTap.ts` - armed in the same commit as the DOM |
| `waitForGameReady` times out at 45s with no error dialog (one boot of many, mobile-safari) | a supabase request stalled rather than failed; nothing timed it out, so the load never rejected and no error was ever shown | 10s `AbortSignal.timeout` on the supabase client, so a stall becomes a rejection the app reports |
| `zero-length vector given where a non-zero direction vector is required`, errorCaught mid-test | real game bug: perpendicular turn strategies degenerate to (0,0,0) when the mtv is perpendicular to travel (side-scrape); zero stored as monster `facing`; xy4 renderer asserts | side-scrape is a no-op turn (`movement.ts`); pinning test `handleMonsterTouchingItemByTurning.test.ts` |
| Menu never opens after Escape; 45s `waitFor` timeout (webkit/mac) | `dispatchKeyPress` captured the bus cursor in a separate round-trip before keydown; a frame in the gap satisfied the wait; keyup before any tick read the key - press swallowed | keydown + cursor capture atomic in one evaluate |
| `null is not an object (gl.getShaderPrecisionFormat...)`, game crashes at boot (webkit/iOS) | diagnostic probe created an extra WebGL context; webkit starves pixi's | fingerprint reads `__PIXI_APP__.renderer.gl`, never creates a context |
| Whole dialog's text +2px lower and antialiased (expected 3 colours, actual 11), Linux, rare | chromium lands in one of two discrete text modes at launch (hinting/subpixel); fontconfig was byte-identical pass-vs-fail, so the existing fontconfig pin + `--disable-font-subpixel-positioning` don't decide it | `--font-render-hinting=full` + `--disable-lcd-text` added (belt-and-braces, NOT proven causal - too rare to reproduce); `[capture-geometry]` will name any recurrence |
| `never reached an end-of-life dialog` when many workers run locally | `loseOneLife` plays out in real time; heavy CPU contention starves the homing guardian | known residual wall-clock dependence; passes at CI worker counts and locally with `--workers=2` |

## Playbook for a new one

1. Get the failing job's log and any diff artifacts (commands above). If the
   run was re-run, get the passing attempt's log too.
2. Read the channels before theorising: did game time move (`[game-speed]`)?
   did the turn schedule differ (`[monster-turn]`)? was text off-grid or
   shifted (`[capture-geometry]`, `[text-layout]`)? same runner fingerprint?
3. For snapshot diffs, do pixel forensics on the artifact: distinct-colour
   counts (pixel art is ~3-6 colours; more = antialiasing), per-row ink bands
   (uniform Δ = block shift; growing Δ = metrics change), best-shift search.
4. Trust exact numbers over vibes: a float that differs in the last bits, an
   id sequence, a roomTime - these name the mechanism.
5. Fix at the root, in the game or the harness - never by retrying, waiting,
   or widening tolerances. If the fix is in game code, write a pinning test
   and prove it red on the old code (`git stash` round-trip).
6. Re-run the full suite on CI three times (`gh run rerun`) and verify
   **per-attempt** conclusions via
   `gh api .../runs/<id>/attempts/<n>` - `gh run list` alone can show a stale
   attempt and report a false green streak.

## Residual risks / open items

- The subpixel text mode's trigger was never reproduced on demand; the flags
  are preventative. If `[capture-geometry]` ever shows shifted `firstTops` or
  `offGrid` entries, that is the recurrence - attribute before touching
  baselines.
- `loseOneLife`/`loseAllLives` depend on real-time gameplay pace (see case
  file); if CI runners slow down materially they will time out first.
- Baselines: `allItemsTestRoom` capture-times snapshots depend on the monster
  turn schedule; any change to monster movement, `hashNumberToNumber0to1`, or
  sub-tick size invalidates them deterministically (regenerate, don't chase).
