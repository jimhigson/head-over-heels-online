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

## The determinism architecture (what already keeps runs identical)

| Concern | Mechanism | Where |
| --- | --- | --- |
| Boot must not run physics before freezing | `setGameSpeed(0)` dispatched synchronously inside a `window._e2e_store` property-setter hook, before the first tick | `e2e/testUtils/bootPlaytestCampaign.ts` |
| Room navigation | `gameApi.changeRoom` directly (never `page.goto('#room')` - the hash router ignores a document's *initial* hash, so a reload strands the game in its default room) + level-triggered wait on `currentRoom.id`, then a `frameRendered` for that room | `changeRoomViaApi` / `waitForRoomToRender` in `e2e/testUtils/gameStateQueries.ts` |
| Waiting on trace-less moments | `E2eEventBus` on `window.__e2e_events` (visual-regression builds): per-name 512-entry log + `cursor()`/`waitFor(afterId)` so an event that fired before the wait attached is still matched. Events: `frameRendered` {roomId, spriteOption, cameraAngleDegrees}, `characterChanged` | `src/game/mainLoop/E2eEventBus.ts`; emits in `MainLoop.ts` and `setCurrentCharacterName.ts` |
| Advancing game time | `__e2e_advanceTime` - bit-exact: `ticker.lastTime = 0; ticker.update(jumpMs)`. Never wall-clock waits | `src/game/mainLoop/installE2eFastForwardHandle.ts` |
| Key input | `dispatchKeyPress`: keydown + bus-cursor capture in ONE `page.evaluate`, then wait for a `frameRendered` past that cursor before keyup (proof a tick read the key). Holds: `holdKeysForDuration`/`holdKeysUntil` advance *game* time inside `whileFrozen` (speed 0 around the steps, so real time cannot interleave) | `e2e/testUtils/gameInteractions.ts` |
| Everything else | level-triggered `waitForFunction` on store/game state, or DOM waits - never frame counts, never sleeps | throughout `e2e/` |

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
| One character/monster sprite differs in a fast-forwarded snapshot (CamRot) | boot-freeze race: `setInterval` freeze is a starvable macrotask, ticker ran physics first at wall-clock-variable delta | freeze via `_e2e_store` setter hook, synchronous before first tick |
| Same, after the boot fix; turn logs show roomTimes like `9.000000000000046` vs `9` between attempts | fast-forward computed elapsed as `(lastTime + jump) − lastTime`: rounding depends on wall-clock lastTime; roomTime drift changes every `hash(itemHash + roomTime)` turn decision | `ticker.lastTime = 0; ticker.update(jumpMs)` - elapsed bit-exact |
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
