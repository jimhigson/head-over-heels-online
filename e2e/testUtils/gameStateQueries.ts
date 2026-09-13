import { type Page } from "@playwright/test";
import chalk from "chalk";

import {
  type E2EEventBusEventName,
  type E2EEventBusPayloadMap,
} from "../../src/game/mainLoop/E2EEventBus";
import { type CharacterName } from "../../src/model/modelTypes";
import { type SpriteOption } from "../../src/store/slices/userSettings/userSettingsSlice";
import { type AppDispatch } from "../../src/store/store";
import {
  advanceUntil,
  advanceUntilConditionMetInsidePage,
  paintFrame,
} from "./advanceGameTime";
import { elapsed } from "./logging";
import { osSlowness } from "./osSlowness";

const longTimeout = 30_000 * osSlowness;

/** a couple of holds in a row is loading; ten is a loop that will not settle */
const maxConsecutiveRenderHolds = 10;

export const maximumWaitForStep = 15_000 * osSlowness;

/**
 * wait for the game state to appear on the page. Also watches for the
 * error-caught dialog: `page.addLocatorHandler` (which setupE2ePage uses to
 * fail on the dialog) only fires during actionability-checked operations, and
 * `waitForFunction` performs none - so without watching for it here, a load
 * error would sit unreported behind this wait until it times out
 */
export const waitForGameState = async (page: Page) => {
  await page.waitForFunction(
    () =>
      window._e2e_gamePageGameAi?.gameState !== undefined ||
      document.querySelector('[data-dialog-id="errorCaught"]') !== null,
    undefined,
    { timeout: longTimeout },
  );

  if ((await page.locator('[data-dialog-id="errorCaught"]').count()) > 0) {
    const errorReport = await page
      .locator('[data-test-id="error-report"]')
      .textContent()
      .catch(() => "(could not read the error report)");
    throw new Error(
      `error dialog shown while waiting for game state:\n${errorReport}`,
    );
  }
};

/**
 * how far the page got before it was asked: which of the e2e hooks exist, and
 * what the campaign and asset loads are doing.
 *
 * A boot that never completes says nothing about why on its own - this is the
 * difference between a campaign request that never came back, a crash before
 * pixi started, and a page that never loaded at all
 */
const describeBootProgress = (page: Page): Promise<string> =>
  page.evaluate(() => {
    const state = window._e2e_store?.getState();
    if (state === undefined) {
      return `no store on the page (document.readyState=${document.readyState}, url=${location.href})`;
    }

    const campaignQueries = Object.values(state.campaignsApi.queries)
      .map(
        (query) =>
          `${query?.endpointName}(${JSON.stringify(query?.originalArgs)})=${query?.status}`,
      )
      .join(", ");

    return [
      `gameApi=${window._e2e_gamePageGameAi === undefined ? "absent" : "present"}`,
      `pixiApplication=${window._e2e_pixiApplication === undefined ? "absent" : "present"}`,
      `assetsLoading=${state.assetsLoading.count}`,
      `campaignQueries=[${campaignQueries}]`,
      `openMenus=[${state.gameMenus.openMenus.map((openMenu) => openMenu.menuId).join(", ")}]`,
      `url=${location.href}`,
    ].join(" ");
  });

/**
 * wait for the game to be fully ready to drive: BOTH e2e hooks present - the
 * pixi application ({@link Window._e2e_pixiApplication}, put on window partway
 * through gameMain) and the game api ({@link Window._e2e_gamePageGameAi}, set
 * once gameMain returns). Anything that reaches into the pixi app, or that
 * needs a running game rather than merely a store to dispatch to, must gate on
 * this.
 * past. Also watches for the error dialog, as {@link waitForGameState} does.
 */
export const waitForGameReady = async (page: Page) => {
  try {
    await page.waitForFunction(
      () =>
        (window._e2e_gamePageGameAi?.gameState !== undefined &&
          window._e2e_pixiApplication !== undefined) ||
        document.querySelector('[data-dialog-id="errorCaught"]') !== null,
      undefined,
      { timeout: longTimeout },
    );
  } catch (e) {
    throw new Error(
      `the game never became ready to drive - ${await describeBootProgress(
        page,
        // a page that has crashed or closed cannot be asked how far it got, and
        // that must not become the error in place of the timeout it explains
      ).catch(() => "(could not read the page)")}`,
      { cause: e },
    );
  }

  if ((await page.locator('[data-dialog-id="errorCaught"]').count()) > 0) {
    const errorReport = await page
      .locator('[data-test-id="error-report"]')
      .textContent()
      .catch(() => "(could not read the error report)");
    throw new Error(
      `error dialog shown while waiting for game to be ready:\n${errorReport}`,
    );
  }
};

/**
 * grab the event-bus cursor - a bookmark for "now". Pass the value to a
 * subsequent `waitFor*` call's `afterId` so an event that fires between this
 * capture and the wait being set up is still matched (from the bus's buffer)
 * rather than missed. Capture it *before* triggering the action that causes the
 * event (eg before `page.goto`). Returns 0 when the bus does not yet exist,
 * which correctly means "match from the very first event".
 */
export const snapshotE2eCursor = (page: Page): Promise<number> =>
  page.evaluate(() => window.__e2e_events?.cursor() ?? 0);

/**
 * drive the game to show a room by calling the game api's `changeRoom` directly,
 * rather than navigating `window.location.hash`. The in-game hash router only
 * reacts to `hashchange`, never to the hash a document already loaded with - so
 * if a `page.goto('#room')` commits a fresh document (a reload) the room arrives
 * as an initial hash, no `hashchange` fires, and the game stays on its default
 * room. Calling `changeRoom` is exactly what the hash router does on a change,
 * but immune to that reload race and to any lost `hashchange`. Gate on the game
 * being ready first (the caller has already started the game).
 */
export const changeRoomViaApi = async (
  page: Page,
  roomId: string,
): Promise<void> => {
  await page.waitForFunction(
    () => window._e2e_gamePageGameAi !== undefined,
    undefined,
    { timeout: longTimeout },
  );
  await page.evaluate((id) => {
    const gameApi = window._e2e_gamePageGameAi;
    if (gameApi === undefined) {
      throw new Error("game api not on window - cannot change room");
    }
    gameApi.changeRoom(id);
  }, roomId);
};

/**
 * wait until the game is showing the given room. This gates on the game's own
 * `currentRoom.id` - a level-triggered condition (it stays true once reached),
 * so it cannot be missed by timing and survives a full-document reload, unlike
 * an edge-triggered render event. Pair it with {@link changeRoomViaApi}, which
 * sets that room current. Also watches the error dialog (as
 * {@link waitForGameState} does) so a load failure surfaces at once rather than
 * sitting behind this wait until it times out.
 */
export const waitForRoomToRender = async (
  page: Page,
  expectedRoomId: string,
  logHeader?: string,
): Promise<void> => {
  // captured before the state wait, so the first frame to draw this room is
  // matched from the log even if it lands while that wait is still resolving:
  const afterId = await snapshotE2eCursor(page);

  await page.waitForFunction(
    (wantRoomId) =>
      window._e2e_gamePageGameAi?.currentRoom?.id === wantRoomId ||
      document.querySelector('[data-dialog-id="errorCaught"]') !== null,
    expectedRoomId,
    { timeout: longTimeout },
  );

  if ((await page.locator('[data-dialog-id="errorCaught"]').count()) > 0) {
    const errorReport = await page
      .locator('[data-test-id="error-report"]')
      .textContent()
      .catch(() => "(could not read the error report)");
    throw new Error(
      `error dialog shown while waiting for room "${expectedRoomId}":\n${errorReport}`,
    );
  }

  // the room being current only means the state changed; wait for a frame that
  // actually drew it, so the renderer has built it before anything is captured:
  await waitForEventOnBus(page, {
    name: "frameRendered",
    afterId,
    arg: expectedRoomId,
    match: (payload, wantRoomId) => payload.roomId === wantRoomId,
  });

  if (logHeader !== undefined) {
    console.log(
      `${logHeader} ${elapsed()} room now showing: ${chalk.cyan(expectedRoomId)}`,
    );
  }
};

export type WaitForEventOnBusOptions<N extends E2EEventBusEventName, A> = {
  name: N;
  /**
   * capture with {@link snapshotE2eCursor} *before* the action that causes the
   * event, so one that fires before this wait is set up is still matched
   */
  afterId: number;
  /**
   * handed to `match` inside the page. Must be serialisable - it crosses into
   * the browser, so it is how a matcher gets anything from the spec's scope
   */
  arg: A;
  /** decides which event of this name resolves the wait */
  match: (payload: E2EEventBusPayloadMap[N], arg: A) => boolean;
  timeoutMs?: number;
  /**
   * step game time on between checks. Needed for anything the *world* has to do
   * to emit the event - a character swopping, a room changing - since an e2e
   * build only moves when asked. Frames are drawn regardless, so waits on
   * `frameRendered` leave this off and never move the world
   */
  advanceGameTime?: boolean;
};

/**
 * wait, in the page, for the game to say it is drawing again. Awaited on the
 * bus rather than polled: the game says so from wherever it drops the hold, not
 * from a tick, so there is nothing here to drive - only something to hear
 */
const waitForRenderingToResume = (page: Page, afterId: number): Promise<void> =>
  page.evaluate(
    async ({ afterId, timeoutMs }) => {
      await window.__e2e_events?.waitFor("renderingResumed", {
        afterClock: afterId,
        timeoutMs,
      });
    },
    { afterId, timeoutMs: longTimeout },
  );

/**
 * ask for a frame, and get one that draws.
 *
 * A tick is not a render: one arriving while a spritesheet is baking or the
 * room's sounds are loading returns without drawing anything. The game says
 * when that starts and when it stops, so a frame that lands on a hold is
 * followed by a wait for the hold to lift and another frame.
 *
 * None of the frames carry game time, so nothing moves however many it takes.
 */
export const paintRenderedFrame = async (page: Page): Promise<void> => {
  // a hold that never lifts throws from waitForRenderingToResume's own timeout,
  // but holds that keep re-arming would loop for ever without one: each pass
  // succeeds, so nothing else here would ever give up
  for (let attempt = 0; attempt < maxConsecutiveRenderHolds; attempt++) {
    const beforePaint = await snapshotE2eCursor(page);
    await paintFrame(page);

    const heldOff = await busHasEvent(page, {
      name: "renderingSuspended",
      afterId: beforePaint,
      arg: undefined,
      matchText: "() => true",
    });
    if (!heldOff) {
      return;
    }
    await waitForRenderingToResume(page, beforePaint);
  }

  throw new Error(
    `asked for ${maxConsecutiveRenderHolds} frames and every one was held off drawing - something is re-arming a load each tick, rather than being slow`,
  );
};

/**
 * the condition the bus waits are built on: has this event already been logged?
 * Asked of the bus with no patience at all, so a hit comes from its buffer and
 * a miss is immediate.
 *
 * Everything it needs - the name, the cursor, the spec's own `arg` - crosses as
 * data. Only the matcher travels as text, because a function has to
 */
const busHasEventCondition = ({
  name,
  afterId,
  arg,
  matchText,
}: {
  name: string;
  afterId: number;
  arg: unknown;
  matchText: string;
}): boolean | Promise<boolean> => {
  const bus = window.__e2e_events;
  if (bus === undefined) {
    return false;
  }
  const match = new Function(`return (${matchText})`)() as (
    payload: unknown,
    arg: unknown,
  ) => boolean;

  return bus
    .waitFor(name as E2EEventBusEventName, {
      afterClock: afterId,
      timeoutMs: 0,
      match: (payload) => match(payload, arg),
    })
    .then(
      () => true,
      () => false,
    );
};

/** as {@link busHasEventCondition}, asked once from here */
const busHasEvent = <N extends E2EEventBusEventName, A>(
  page: Page,
  options: { name: N; afterId: number; arg: A; matchText: string },
): Promise<boolean> => page.evaluate(busHasEventCondition, options);

/**
 * wait for an event on the game's {@link E2EEventBus}, matched by a predicate.
 *
 * The bus is only installed once the game code runs, which may be after this is
 * called, so this polls for it to appear before attaching - and matches against
 * the bus's own log, so an event that already fired (at or after `afterId`) is
 * caught rather than missed.
 */
export const waitForEventOnBus = async <N extends E2EEventBusEventName, A>(
  page: Page,
  {
    name,
    afterId,
    arg,
    match,
    advanceGameTime = false,
  }: WaitForEventOnBusOptions<N, A>,
): Promise<void> => {
  // the whole loop runs in the page: an e2e build has no frames of its own, so
  // simply awaiting in there would wait on a tick nothing is going to run - but
  // driving each step from here costs a round trip per look, and these waits
  // run to hundreds of steps. Each step runs one frame, carrying time when the
  // world has to do something for the event and none when it only has to draw
  const happened = await advanceUntilConditionMetInsidePage(
    page,
    busHasEventCondition,
    {
      arg: { name, afterId, arg, matchText: match.toString() },
      stepMs: advanceGameTime ? 250 : 0,
    },
  );

  if (!happened) {
    throw new Error(`timed out waiting for the "${name}" event`);
  }
};

/**
 * wait until a rendered frame actually reflects the given sprite option, rather
 * than guessing with a fixed delay after dispatching the option change. The
 * engine emits `frameRendered` every frame (in visual-regression mode) carrying
 * the option that frame was rendered with. Pass an `afterId` captured
 * before the option was dispatched so a matching frame is never missed.
 */
export const waitForSpriteOptionRenderEvent = async (
  page: Page,
  spriteOption: SpriteOption,
  afterId: number,
  logHeader?: string,
): Promise<void> => {
  await waitForEventOnBus(page, {
    name: "frameRendered",
    afterId,
    arg: spriteOption,
    match: (payload, expected) =>
      payload.spriteOption.name === expected.name &&
      payload.spriteOption.uncolourised === expected.uncolourised,
  });

  if (logHeader !== undefined) {
    console.log(
      `${logHeader} ${elapsed()} received frameRendered for ${chalk.cyan(spriteOption.name)} (uncolourised: ${spriteOption.uncolourised})`,
    );
  }
};

/**
 * wait until a frame has actually been rendered at the given camera angle.
 *
 * Holding the camera only sets the angle in the game state; the room renderer
 * rebuilds for a new quarter on a later tick, and the sprites it creates then
 * start animating. Anything that wants to freeze those sprites (or capture
 * them) has to let that rebuild happen first - waiting for the render to report
 * the angle back is how that is known, rather than guessing a duration.
 */
export const waitForCameraAngleRendered = (
  page: Page,
  degrees: number,
  afterId: number,
): Promise<void> =>
  waitForEventOnBus(page, {
    name: "frameRendered",
    afterId,
    // the event carries the raw (cos,sin) camera-angle vector, so the degrees
    // this helper takes (matching __e2e_holdCameraAtDegrees) convert here, on
    // the node side, into the vector to expect:
    arg: {
      x: Math.cos((degrees * Math.PI) / 180),
      y: Math.sin((degrees * Math.PI) / 180),
    },
    // the maths is inline because this predicate runs in the browser: it is
    // transported as source, so it cannot call anything imported here. The hold
    // inverts the transition easing to land exactly on the requested angle, so
    // this only has to absorb floating-point drift:
    match: (payload, expected) =>
      Math.abs(payload.cameraAngle.x - expected.x) < 0.000_1 &&
      Math.abs(payload.cameraAngle.y - expected.y) < 0.000_1,
  });

/** is the game's main loop running (as opposed to sitting in the menus)? */
export const isGameLoopRunning = (page: Page): Promise<boolean> =>
  page.evaluate(() => window._e2e_gamePageGameAi !== undefined);

/**
 * wait for the next frame the game draws. Unlike an animation frame, this is
 * proof that a *tick* ran - the input it reads has been read, and anything it
 * was going to do with it has been done.
 */
export const waitForFrameRendered = (
  page: Page,
  afterId: number,
): Promise<void> =>
  waitForEventOnBus(page, {
    name: "frameRendered",
    afterId,
    arg: undefined,
    match: () => true,
  });

/**
 * wait until the player is controlling the given character.
 *
 * On the `characterChanged` event rather than polling `currentCharacterName`,
 * because the character can change more than once in quick succession - a swop
 * that lands in symbiosis, a death handing over to the survivor - and a poll
 * only ever sees whichever change is still current when it next looks. Capture
 * `afterId` before the action that causes the change.
 */
export const waitForCharacterToBecome = (
  page: Page,
  characterName: CharacterName,
  afterId: number,
): Promise<void> =>
  waitForEventOnBus(page, {
    name: "characterChanged",
    afterId,
    arg: characterName,
    match: (payload, wanted) => payload.characterName === wanted,
    // a swop is read inside the physics tick, so the world has to be moved on
    // for it to happen at all:
    advanceGameTime: true,
  });

/**
 * wait until the player is controlling anyone other than `previousCharacter` -
 * for a swop where which character comes next is the game's business, not the
 * test's. See {@link waitForCharacterToBecome} for why this is an event.
 */
export const waitForCharacterToChangeFrom = (
  page: Page,
  previousCharacter: CharacterName | undefined,
  afterId: number,
): Promise<void> =>
  waitForEventOnBus(page, {
    name: "characterChanged",
    afterId,
    arg: previousCharacter,
    match: (payload, previous) => payload.characterName !== previous,
    advanceGameTime: true,
  });

/**
 * wait until the game is showing some room, returning its id. Level-triggered on
 * the game's own `currentRoom.id`, so it resolves as soon as a room is current
 * (surviving a reload) rather than needing to catch a one-shot render event.
 */
export const waitForAnyRoomToRender = async (page: Page): Promise<string> => {
  const roomId = await page.evaluate(
    ({ timeoutMs }) =>
      new Promise<string>((resolve, reject) => {
        const deadline = performance.now() + timeoutMs;
        const poll = () => {
          const currentRoomId = window._e2e_gamePageGameAi?.currentRoom?.id;
          if (currentRoomId !== undefined) {
            resolve(currentRoomId);
            return;
          }
          if (performance.now() > deadline) {
            reject(new Error("no room became current before the timeout"));
            return;
          }
          requestAnimationFrame(poll);
        };
        poll();
      }),
    { timeoutMs: maximumWaitForStep },
  );
  // as in waitForRoomToRender: current is not the same as drawn
  await waitForEventOnBus(page, {
    name: "frameRendered",
    afterId: 0,
    arg: roomId,
    match: (payload, wantRoomId) => payload.roomId === wantRoomId,
  });
  return roomId;
};

export const getCurrentCharacter = async (
  page: Page,
): Promise<CharacterName | undefined> =>
  page.evaluate(
    () => window._e2e_gamePageGameAi?.gameState.currentCharacterName,
  );

export const getCurrentRoomId = async (
  page: Page,
): Promise<string | undefined> =>
  page.evaluate(() => {
    const state = window._e2e_gamePageGameAi?.gameState;
    if (!state) {
      return undefined;
    }
    return state.characterRooms[state.currentCharacterName]?.id;
  });

export const getPlayableZ = (page: Page): Promise<number | undefined> =>
  page.evaluate(() => window.__e2e_currentPlayable?.()?.state.box.z);

/**
 * wait until there is a current playable - ie a controllable character exists in
 * the current room. A deterministic replacement for "wait a beat after starting
 * the game" before driving the character or summoning via cheats.
 */
export const waitForCurrentPlayable = async (page: Page) => {
  // a character becoming controllable can take game time - a respawn plays out
  // over ticks - and game time only passes when asked for:
  const controllable = await advanceUntil(page, () =>
    page.evaluate(() => window.__e2e_currentPlayable?.() != null),
  );
  if (!controllable) {
    throw new Error("timed out advancing until a playable was controllable");
  }
};

/**
 * wait until the current playable is alive again - ie its death animation is
 * over. The game turns away input from a character that is dying, so anything
 * driving one after a death has to let the respawn play out first
 */
export const waitForPlayableAlive = async (page: Page) => {
  const alive = await advanceUntil(page, () =>
    page.evaluate(
      () => window.__e2e_currentPlayable?.()?.state.action !== "death",
    ),
  );
  if (!alive) {
    throw new Error("timed out advancing until the playable was alive");
  }
};

/** wait until the current playable is resting on something (ie, not falling or mid-jump) */
export const waitForPlayableGrounded = async (page: Page) => {
  // landing takes game time, which only passes when asked for:
  const landed = await advanceUntil(page, () =>
    page.evaluate(
      () => window.__e2e_currentPlayable?.()?.state.standingOnItemId != null,
    ),
  );
  if (!landed) {
    throw new Error("timed out advancing until the playable was grounded");
  }
};

/**
 * freeze the game world by setting the player's game speed to zero - the game
 * reads this every frame, so it is the only durable way to stop time; writing
 * to the pixi ticker directly would be overwritten by the next frame.
 *
 * Gate on {@link waitForGameReady} first if there needs to be a game to freeze.
 */
export const setZeroGameSpeed = (page: Page): Promise<boolean> =>
  dispatchToStore(page, {
    type: "userSettings/setGameSpeed",
    payload: 0,
  });

export const dispatchToStore = async (
  page: Page,
  action: Parameters<AppDispatch>[0],
): Promise<boolean> => {
  const dispatchedWithoutError = await page.evaluate((action) => {
    if (!window._e2e_store) {
      console.error("E2E store is not available on window._e2e_store");
      return false;
    }
    try {
      window._e2e_store.dispatch(action);
    } catch (e) {
      console.error("Error dispatching action in E2E test:", e);
      return false;
    }
    console.log(`Successfully dispatched ${action.type} action in E2E test`);
    return true;
  }, action);

  return dispatchedWithoutError;
};
