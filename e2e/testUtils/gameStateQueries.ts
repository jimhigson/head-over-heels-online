import type { Page } from "@playwright/test";

import type { CharacterName } from "../../src/model/modelTypes";
import type { AppDispatch } from "../../src/store/store";

import { osSlowness } from "./infrastructure";
import { formatDuration } from "./logging";

const longTimeout = 30_000 * osSlowness;

export const maximumWaitForStep = 15_000 * osSlowness;

export const waitForGameState = (page: Page) =>
  page.waitForFunction(
    () => window._e2e_gamePageGameAi?.gameState !== undefined,
    undefined,
    { timeout: longTimeout },
  );

export const waitForRoomRenderEvent = async (
  page: Page,
  expectedRoomId: string,
): Promise<void> => {
  const foundRoomId = await Promise.race([
    page.evaluate(
      () =>
        new Promise<string>((resolve) => {
          window.addEventListener(
            "firstRenderOfRoom",
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
              `Timeout waiting for firstRenderOfRoom event ${expectedRoomId} after ${formatDuration(maximumWaitForStep)}`,
            ),
          ),
        maximumWaitForStep,
      ),
    ),
  ]);

  if (foundRoomId !== expectedRoomId) {
    throw new Error(`Expected roomId ${expectedRoomId} but got ${foundRoomId}`);
  }
};

/** wait for any room to render, returning the room id */
export const waitForAnyRoomRenderEvent = async (page: Page): Promise<string> =>
  Promise.race([
    page.evaluate(
      () =>
        new Promise<string>((resolve) => {
          window.addEventListener(
            "firstRenderOfRoom",
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
              `Timeout waiting for firstRenderOfRoom event after ${formatDuration(maximumWaitForStep)}`,
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
    if (!state) return undefined;
    return state.characterRooms[state.currentCharacterName]?.id;
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
