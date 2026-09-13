---
name: write-e2e
description: "Read BEFORE writing or editing any playwright spec or e2e helper in this repo. The suite runs against an app whose clock the test owns: nothing ticks, animates or paints unless the spec asks it to, so the usual playwright instincts (waitForTimeout, poll-until-visible, 'give it a moment') hang or watch a frozen page. Covers the model and why, which helper to reach for, the event bus, what is banned, and what a spec may assume about determinism. Also load when a new spec hangs, a key press seems ignored, or a screenshot catches an animation mid-cycle."
---

# Writing e2e tests

The app under test has **no clock of its own**. In a visual-regression build the
ticker is a `TestDrivenAppTicker` that only moves when the test says so, via
`window.__e2e_advanceTime(ms)`. Nothing else advances physics, animation,
input handling or rendering — not `setTimeout`, not rAF, not waiting.

Everything below follows from that. The suite also runs with `retries: 0` at
every level, so a spec that is right only sometimes is a broken spec.

## What this changes about writing a test

| The usual instinct | Here | Because |
| --- | --- | --- |
| `waitForTimeout(500)` | `fastForwardGameTime(page, 500)` | wall-clock waiting advances nothing; the world is exactly where it was |
| poll a locator until it appears | `advanceUntilDialog` / `waitForDialog`, or `whilePainting(page, someWait)` | a dialog that needs a frame to render never gets one while you poll |
| `expect(locator).toBeVisible()` after a state change | `paintFrame(page)` first | the DOM is preact, but anything drawn by the game needs a tick |
| press a key with `page.keyboard` | `dispatchKeyPress` | a press is only seen if a tick runs between keydown and keyup |
| "hold right for 2 seconds" | `holdKeysUntil(page, keys, arrived)` | distance is a function of game time; real seconds vary by machine |
| retry until it works | find the state or event that says it happened | every retry hides a race that will fail on CI instead |

If you find yourself wanting a sleep, the question to answer is *what changes*,
and then wait for that: a store value, a bus event, a dialog, a playable's
position.

## Moving time and drawing — `e2e/testUtils/advanceGameTime.ts`

| Helper | Use for |
| --- | --- |
| `fastForwardGameTime(page, ms)` | move the world on by `ms` of game time in one deterministic step |
| `paintFrame(page)` | a tick of **no** game time: every listener runs, the renderer among them, nothing moves. This is how you draw state that has just changed |
| `settleInput(page)` | one millisecond, after keys go down: the frame a key lands on counts it as newly pressed, and the direction it implies is only worked out from there |
| `whilePainting(page, promise)` | keep painting while waiting for something *outside* the world — a chunk to load, a button to become clickable |
| `advanceUntilInPage(page, ready, description)` | step game time until a predicate holds in the browser |
| `advanceUntil(page, happened, opts)` | the same, where the check has to run node-side |
| `isGameMenuOpen(page)` | the world is paused behind a menu — advancing time there does nothing, but it still needs painting |

`advanceUntilConditionMetInsidePage` runs the whole loop in the browser, so it
costs one round trip instead of one per step. Its predicate **crosses as text**:
it closes over nothing from the spec, reads page globals directly, and anything
from the spec's scope has to travel as the `arg` option, as data.

## Input — `e2e/testUtils/gameInteractions.ts`

- `dispatchKeyPress(page, key, code)` — keydown, a 250ms advance, keyup, all in
  one evaluate. Atomic because a tick counts a press as a tap only when it was
  down and wasn't on the tick before.
- `holdKeysForDuration(page, keys, ms)` / `holdKeysUntil(page, keys, arrived)` —
  both run `whileFrozen`, which zeroes the game speed around the steps so the
  character cannot keep walking in the gaps between round trips.
- `loseOneLife` / `loseAllLives` / `switchCharacter` / `clickCheat` for the
  scenarios that need them.

## Waiting on moments that leave no trace — the event bus

`window.__e2e_events` (visual-regression builds only) keeps a per-name ring
buffer plus a cursor, so an event that fires *between* your deciding to wait and
the wait attaching is still matched.

Events: `frameRendered` `{roomId, spriteOption, cameraAngle}`,
`characterChanged`, `renderingSuspended`, `renderingResumed`.

The pattern is always: capture `snapshotE2eCursor(page)` **before** triggering
the thing, then pass it as `afterId`.

```ts
const cursor = await snapshotE2eCursor(page);
await dispatchToStore(page, { type: "userSettings/setSpritesOption", payload: option });
await waitForSpriteOptionRenderEvent(page, option, cursor);
```

Ready-made waits in `e2e/testUtils/gameStateQueries.ts`: `waitForEventOnBus`,
`waitForFrameRendered`, `waitForRoomToRender`, `waitForAnyRoomToRender`,
`waitForCameraAngleRendered`, `waitForCharacterToBecome`,
`waitForCharacterToChangeFrom`, `waitForCurrentPlayable`, `waitForPlayableAlive`,
`waitForPlayableGrounded`.

Use `paintRenderedFrame(page)` rather than `paintFrame` when the frame must
actually **draw**: a tick arriving while a spritesheet bakes or a room's sounds
load returns without drawing, and this waits out the hold and asks again.

## Booting a scenario

- Freeze first: `setZeroGameSpeed(page)` as soon as the game api exists — while
  the crowns dialog still covers the game, **before** any navigation — so every
  sprite is created at its start frame rather than caught mid-animation.
- Navigate with `changeRoomViaApi`, never `page.goto('#room')`: the hash router
  only reacts to `hashchange`, so a reload strands the game in its default room.
- The crowns dialog opens whenever a new game starts, including a boot straight
  into a room by url. Dismiss it with `exitCrownsDialog` — which waits for it to
  finish loading and then clicks it once. Never reach for `closeAllMenus`.
- `bootPlaytestCampaign` for a campaign passed as data; `clickPlayTheGame` +
  `clickOriginalCampaign` for the menu route.

## Animated sprites

An animation's starting frame comes from the item's hash (`startFramePhase` in
`createSprite.ts`), so identical items don't animate in lock-step. That start is
deterministic; where the animation has got to after some time is only
deterministic because *game* time is. So:

- freeze at zero speed before anything is created, and captures are reproducible
- any spec that fast-forwards will capture whatever frame that time lands on —
  which is fine and stable, as long as the time comes from
  `fastForwardGameTime` and not from the wall clock
- do not reach for an "freeze animations" switch; the frozen clock is the
  mechanism

## Required import

```ts
import { test } from "./testUtils/test";      // NEVER from "@playwright/test"
import { expect } from "@playwright/test";    // expect and types still come from there
```

`testUtils/test` forwards the browser console into the node-side output for
every test, and on failure dumps the requests still in flight. A spec importing
`test` from `@playwright/test` runs, but silently loses both.

## What a failing spec will tell you

Beyond the console forwarding, these land in the log without any opt-in:

| Line | Means |
| --- | --- |
| `[game-speed] physics advanced …` | game time moved — a deliberate fast-forward, or the reason a capture differs |
| `[db] <campaign> started` with no matching `loaded in` | a db request never came back |
| `[N request(s) still in flight]` | printed on failure, oldest first — names a stalled request |
| `[http 4xx]` / `[request failed]` | a response that errored, or a request that did |
| `the game never became ready to drive - …` | boot state at the timeout: both e2e hooks, assets loading, every campaign query's status, open menus |

## Banned

`waitForTimeout`, retries, `test.retry`, frame-count waits, hammer-until-visible
loops, widening a snapshot tolerance to make a diff pass, and calling anything
"flaky". The suite contains none of these and a change that adds one is a
regression, not a fix.

## See also

- **`debug-e2e`** — when a test fails on CI but not locally: the case file of
  every nondeterminism found on this suite, and the playbook for a new one.
- **`run-e2e`** — how to actually invoke playwright (build first, project
  scoping, sandbox quirks).
- **`hohjs-browser-mcp`** — driving a real browser by hand instead.
