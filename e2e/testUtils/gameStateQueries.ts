import { type Page } from "@playwright/test";
import chalk from "chalk";

import { type CharacterName } from "../../src/model/modelTypes";
import { type SpriteOption } from "../../src/store/slices/userSettings/userSettingsSlice";
import { type AppDispatch } from "../../src/store/store";
import { osSlowness } from "./infrastructure";
import { elapsed } from "./logging";

const longTimeout = 30_000 * osSlowness;

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
 * wait for the game to be fully ready to drive: BOTH e2e hooks present - the
 * pixi application ({@link Window._e2e_pixiApplication}, put on window partway
 * through gameMain) and the game api ({@link Window._e2e_gamePageGameAi}, set
 * once gameMain returns). Anything that reaches into the pixi app, or that
 * needs a running game rather than merely a store to dispatch to, must gate on
 * this.
 * past. Also watches for the error dialog, as {@link waitForGameState} does.
 */
export const waitForGameReady = async (page: Page) => {
  await page.waitForFunction(
    () =>
      (window._e2e_gamePageGameAi?.gameState !== undefined &&
        window._e2e_pixiApplication !== undefined) ||
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
      `error dialog shown while waiting for game to be ready:\n${errorReport}`,
    );
  }
};

/**
 * capture the event-bus cursor - a bookmark for "now". Pass the value to a
 * subsequent `waitFor*` call's `afterId` so an event that fires between this
 * capture and the wait being set up is still matched (from the bus's buffer)
 * rather than missed. Capture it *before* triggering the action that causes the
 * event (eg before `page.goto`). Returns 0 when the bus does not yet exist,
 * which correctly means "match from the very first event".
 */
export const captureE2eCursor = (page: Page): Promise<number> =>
  page.evaluate(() => window.__e2e_events?.cursor() ?? 0);

/**
 * wait until the given room renders its first frame, matching against the
 * {@link E2eEventBus} rather than a live DOM/window listener - so a render that
 * happened between {@link captureE2eCursor} and this call (eg while `page.goto`
 * was in flight) is still caught from the buffer. Ignores other rooms' renders:
 * during a finalroom→target navigation finalroom renders first.
 */
export const waitForRoomRenderEvent = async (
  page: Page,
  expectedRoomId: string,
  afterId: number,
  logHeader?: string,
): Promise<void> => {
  await page.evaluate(
    ({ wantRoomId, afterId, timeoutMs }) =>
      new Promise<void>((resolve, reject) => {
        const deadline = performance.now() + timeoutMs;
        const attach = () => {
          const bus = window.__e2e_events;
          if (bus === undefined) {
            if (performance.now() > deadline) {
              reject(new Error("e2e event bus never appeared on window"));
              return;
            }
            requestAnimationFrame(attach);
            return;
          }
          bus
            .waitFor("firstRenderOfRoom", {
              afterId,
              timeoutMs,
              match: (detail) => detail.roomId === wantRoomId,
            })
            .then(() => resolve(), reject);
        };
        attach();
      }),
    { wantRoomId: expectedRoomId, afterId, timeoutMs: maximumWaitForStep },
  );

  if (logHeader !== undefined) {
    console.log(
      `${logHeader} ${elapsed()} received firstRenderOfRoom for ${chalk.cyan(expectedRoomId)}`,
    );
  }
};

/**
 * wait until a rendered frame actually reflects the given sprite option, rather
 * than guessing with a fixed delay after dispatching the option change. The
 * engine emits `spriteOptionRendered` every frame (in visual-regression mode)
 * carrying the option that frame was rendered with. Pass an `afterId` captured
 * before the option was dispatched so a matching frame is never missed.
 */
export const waitForSpriteOptionRenderEvent = async (
  page: Page,
  spriteOption: SpriteOption,
  afterId: number,
  logHeader?: string,
): Promise<void> => {
  await page.evaluate(
    ({ expected, afterId, timeoutMs }) =>
      new Promise<void>((resolve, reject) => {
        const deadline = performance.now() + timeoutMs;
        const attach = () => {
          const bus = window.__e2e_events;
          if (bus === undefined) {
            if (performance.now() > deadline) {
              reject(new Error("e2e event bus never appeared on window"));
              return;
            }
            requestAnimationFrame(attach);
            return;
          }
          bus
            .waitFor("spriteOptionRendered", {
              afterId,
              timeoutMs,
              match: (detail) =>
                detail.spriteOption.name === expected.name &&
                detail.spriteOption.uncolourised === expected.uncolourised,
            })
            .then(() => resolve(), reject);
        };
        attach();
      }),
    { expected: spriteOption, afterId, timeoutMs: maximumWaitForStep },
  );

  if (logHeader !== undefined) {
    console.log(
      `${logHeader} ${elapsed()} received spriteOptionRendered for ${chalk.cyan(spriteOption.name)} (uncolourised: ${spriteOption.uncolourised})`,
    );
  }
};

/** wait for any room to render, returning the room id */
export const waitForAnyRoomRenderEvent = (page: Page): Promise<string> =>
  page.evaluate(
    ({ timeoutMs }) =>
      new Promise<string>((resolve, reject) => {
        const deadline = performance.now() + timeoutMs;
        const attach = () => {
          const bus = window.__e2e_events;
          if (bus === undefined) {
            if (performance.now() > deadline) {
              reject(new Error("e2e event bus never appeared on window"));
              return;
            }
            requestAnimationFrame(attach);
            return;
          }
          bus
            .waitFor("firstRenderOfRoom", { afterId: 0, timeoutMs })
            .then((detail) => resolve(detail.roomId), reject);
        };
        attach();
      }),
    { timeoutMs: maximumWaitForStep },
  );

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
export const waitForCurrentPlayable = (page: Page) =>
  page.waitForFunction(
    () => window.__e2e_currentPlayable?.() != null,
    undefined,
    {
      timeout: longTimeout,
    },
  );

/** wait until the current playable is resting on something (ie, not falling or mid-jump) */
export const waitForPlayableGrounded = (page: Page) =>
  page.waitForFunction(
    () => window.__e2e_currentPlayable?.()?.state.standingOnItemId != null,
    undefined,
    { timeout: longTimeout },
  );

/**
 * wait for `count` animation frames to pass. The game's main loop is driven by
 * the pixi ticker (itself rAF-driven), so this is a frame-accurate replacement
 * for a fixed delay where a step needs the loop to have ticked - eg so a key
 * release is read by a tick before the next press, or a dispatched action has
 * been rendered - without guessing a wall-clock duration.
 */
export const waitForAnimationFrames = (
  page: Page,
  count: number = 2,
): Promise<void> =>
  page.evaluate(
    (frames) =>
      new Promise<void>((resolve) => {
        let remaining = frames;
        const step = () => {
          remaining -= 1;
          if (remaining <= 0) {
            resolve();
          } else {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }),
    count,
  );

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
