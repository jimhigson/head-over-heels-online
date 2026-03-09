import type { Page } from "@playwright/test";

import { formatDuration } from "./formatDuration";
import { logSelectorExistence } from "./logSelectorExistence";
import { osSlowness } from "./osSlowness";
import { formatProjectName } from "./projectName";

export const maximumWaitForStep = 15_000 * osSlowness;

export const playGameMenuItemSelector = "[data-menuitem_id=playGame]";

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

export const startGame = async (
  page: Page,
  projectName: string,
  campaignSelector: string,
) => {
  let cancelled = false;

  await Promise.race([
    (async () => {
      const formattedName = formatProjectName(projectName);

      let stepStart = performance.now();
      await page.goto("/?cheats=1&track=0");
      console.log(
        `${formattedName}: goto took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      console.log(`${formattedName}: clicking Play The Game...`);
      stepStart = performance.now();
      await logSelectorExistence(page, playGameMenuItemSelector, formattedName);
      console.log(
        `${formattedName}: logSelectorExistence (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      stepStart = performance.now();
      await page.click(playGameMenuItemSelector);
      console.log(
        `${formattedName}: click (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      console.log(`${formattedName}: choosing campaign...`);
      stepStart = performance.now();
      await logSelectorExistence(page, campaignSelector, formattedName);
      console.log(
        `${formattedName}: logSelectorExistence (campaign) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      stepStart = performance.now();
      await page.click(campaignSelector);
      console.log(
        `${formattedName}: click (campaign) took ${formatDuration(performance.now() - stepStart)}`,
      );
    })(),
    new Promise<never>((_, reject) =>
      setTimeout(() => {
        cancelled = true;
        return reject(
          new Error(
            `Timeout starting game after ${formatDuration(maximumWaitForStep)}`,
          ),
        );
      }, maximumWaitForStep),
    ),
  ]);
};
