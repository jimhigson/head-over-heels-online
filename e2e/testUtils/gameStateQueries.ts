import { type Page } from "@playwright/test";
import chalk from "chalk";

import { type CharacterName } from "../../src/model/modelTypes";
import { type SpriteOption } from "../../src/store/slices/userSettings/userSettingsSlice";
import { type AppDispatch } from "../../src/store/store";
import { osSlowness } from "./infrastructure";
import { elapsed, formatDuration } from "./logging";

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

export const waitForRoomRenderEvent = async (
  page: Page,
  expectedRoomId: string,
  logHeader?: string,
): Promise<void> => {
  // the timeout lives inside the browser so the listener is always removed,
  // whether the event arrives or we time out (false). Wait for the SPECIFIC
  // expected room and ignore any other room's render in the meantime - during a
  // finalroom→target navigation finalroom renders first, and catching that
  // (rather than the target) is a race that fails spuriously under load:
  const found = await page.evaluate(
    ({ timeoutMs, wantRoomId }) =>
      new Promise<boolean>((resolve) => {
        const handler = (event: Event) => {
          const { roomId } = (event as CustomEvent).detail;
          if (roomId !== wantRoomId) {
            return;
          }
          window.removeEventListener("_e2e_firstRenderOfRoom", handler);
          resolve(true);
        };
        window.addEventListener("_e2e_firstRenderOfRoom", handler);
        // on timeout, remove the listener and resolve false; if a matching event
        // already fired this resolve is an ignored no-op:
        setTimeout(() => {
          window.removeEventListener("_e2e_firstRenderOfRoom", handler);
          resolve(false);
        }, timeoutMs);
      }),
    { timeoutMs: maximumWaitForStep, wantRoomId: expectedRoomId },
  );

  if (!found) {
    throw new Error(
      `Timeout waiting for _e2e_firstRenderOfRoom event ${expectedRoomId} after ${formatDuration(maximumWaitForStep)}`,
    );
  }

  if (logHeader !== undefined) {
    console.log(
      `${logHeader} ${elapsed()} received _e2e_firstRenderOfRoom for ${chalk.cyan(expectedRoomId)}`,
    );
  }
};

/**
 * wait until a rendered frame actually reflects the given sprite option, rather
 * than guessing with a fixed delay after dispatching the option change. The
 * engine fires `_e2e_spriteOptionRendered` every frame (in visual-regression mode)
 * carrying the option that frame was rendered with.
 */
export const waitForSpriteOptionRenderEvent = async (
  page: Page,
  spriteOption: SpriteOption,
  logHeader?: string,
): Promise<void> => {
  // the timeout lives inside the browser so the per-frame listener is always
  // removed, whether the matching frame is rendered (true) or we time out (false):
  const matched = await page.evaluate(
    ({ expected, timeoutMs }) =>
      new Promise<boolean>((resolve) => {
        const handler = (event: Event) => {
          const { spriteOption } = (event as CustomEvent).detail as {
            spriteOption: { name: string; uncolourised: boolean };
          };
          if (
            spriteOption.name === expected.name &&
            spriteOption.uncolourised === expected.uncolourised
          ) {
            window.removeEventListener("_e2e_spriteOptionRendered", handler);
            resolve(true);
          }
        };
        window.addEventListener("_e2e_spriteOptionRendered", handler);
        // on timeout, remove the per-frame listener and resolve false; if a
        // matching frame already resolved true this is an ignored no-op:
        setTimeout(() => {
          window.removeEventListener("_e2e_spriteOptionRendered", handler);
          resolve(false);
        }, timeoutMs);
      }),
    { expected: spriteOption, timeoutMs: maximumWaitForStep },
  );

  if (!matched) {
    throw new Error(
      `Timeout waiting for _e2e_spriteOptionRendered event (${spriteOption.name}, uncolourised: ${spriteOption.uncolourised}) after ${formatDuration(maximumWaitForStep)}`,
    );
  }

  if (logHeader !== undefined) {
    console.log(
      `${logHeader} ${elapsed()} received _e2e_spriteOptionRendered for ${chalk.cyan(spriteOption.name)} (uncolourised: ${spriteOption.uncolourised})`,
    );
  }
};

/** wait for any room to render, returning the room id */
export const waitForAnyRoomRenderEvent = async (page: Page): Promise<string> =>
  Promise.race([
    page.evaluate(
      () =>
        new Promise<string>((resolve) => {
          window.addEventListener(
            "_e2e_firstRenderOfRoom",
            (event) => {
              const { roomId } = (event as CustomEvent).detail;
              resolve(roomId);
            },
            { once: true },
          );
        }),
    ),
    new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `Timeout waiting for _e2e_firstRenderOfRoom event after ${formatDuration(maximumWaitForStep)}`,
            ),
          ),
        maximumWaitForStep,
      ),
    ),
  ]);

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
  page.evaluate(() => {
    const gameState = window._e2e_gamePageGameAi?.gameState;
    if (!gameState) {
      return undefined;
    }
    const character = gameState.currentCharacterName;
    const playerItem = gameState.characterRooms[character]?.items[character];
    return (playerItem as { state: { position: { z: number } } } | undefined)
      ?.state.position.z;
  });

/** wait until the current playable is resting on something (ie, not falling or mid-jump) */
export const waitForPlayableGrounded = (page: Page) =>
  page.waitForFunction(
    () => {
      const gameState = window._e2e_gamePageGameAi?.gameState;
      if (!gameState) {
        return false;
      }
      const character = gameState.currentCharacterName;
      const playerItem = gameState.characterRooms[character]?.items[character];
      const state = (
        playerItem as { state: { standingOnItemId: null | string } } | undefined
      )?.state;
      return state !== undefined && state.standingOnItemId !== null;
    },
    undefined,
    { timeout: longTimeout },
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
