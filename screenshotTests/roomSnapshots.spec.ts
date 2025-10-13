import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import type {
  setGameSpeed,
  toggleUserSetting,
} from "../src/store/slices/gameMenus/gameMenusSlice";
import type { SelectableGameSpeeds } from "../src/store/slices/gameMenus/selectableGameSpeeds";

import { campaign } from "../src/_generated/originalCampaign/campaign";
import { keys } from "../src/utils/entries";
import { formatProjectName, progressLogHeader } from "./projectName";
import { sleep } from "./sleep";

// set to limit the number of rooms we test in one run - useful when
// developing the test to avoid having to do the whole run each time
// but should be undefined in e2e to say "no limit"
const roomLimit = undefined;

// CI is slower, needs more time
const timeoutPerRoom = process.env.CI ? 20_000 : 2_000;
const maximumWaitForStep = 15_000;
const maxTriesToLoadRoom = 3;

// Override to run for just one room by setting the ROOMS envar, eg:
// ROOMS=bookworld13,bookworld14 pnpm screenshot --update-snapshots
const roomIds =
  process.env.ROOMS ?
    (process.env.ROOMS.split(",") as OriginalCampaignRoomId[])
  : keys(campaign.rooms).slice(0, roomLimit);

// locally: 3 is fastest in webkit, 2 is fastest in Chromium, but since Chromium is slower overall
// going to boost the slower one preferentially:
// remote: > 1 is unreliable for Chromium on github runners
const batchCount =
  process.env.BATCH_COUNT ? Number.parseInt(process.env.BATCH_COUNT) : 2;

const batchSize = Math.ceil(roomIds.length / batchCount);
const batches = Array.from({ length: batchCount }, (_, index) => {
  const start = index * batchSize;
  const end = start + batchSize;
  return roomIds.slice(start, end);
});

// Selectors for menu navigation
const playGameMenuItemSelector = "[data-menuitem_id=playGame]";
const originalGameSelector = "[data-menuitem_id=originalGame]";
const crownsDialogSelector = "[data-dialog-id=crowns]";

const logSelectorExistence = async (
  page: Page,
  selector: string,
  logHeader: string,
  context?: string,
): Promise<number> => {
  const count = await page.locator(selector).count();
  const contextStr = context ? ` (${context})` : "";
  console.log(
    `${logHeader}: Selector "${selector}"${contextStr} - found ${count} element(s)`,
  );
  return count;
};

const waitForRoomRenderEvent = async (
  page: Page,
  expectedRoomId: OriginalCampaignRoomId,
): Promise<void> => {
  const foundRoomId = await Promise.race([
    // Wait for the event in the browser
    page.evaluate(
      () =>
        new Promise<OriginalCampaignRoomId>((resolve) => {
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
    // Timeout handled in Node process
    new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `Timeout waiting for firstRenderOfRoom event ${expectedRoomId} after 5000ms`,
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

const startOriginalGame = async (page: Page, projectName: string) => {
  await Promise.race([
    (async () => {
      const formattedName = formatProjectName(projectName);

      // Navigate to the page with cheats on; starting in the final room ensures that
      // when the room loop tries to go to the first room, there is an actual navigation
      // into there
      await page.goto(`/?cheats=1#finalroom`);

      // start a game:
      console.log(`${formattedName}: clicking Play The Game...`);
      await logSelectorExistence(page, playGameMenuItemSelector, formattedName);
      await page.click(playGameMenuItemSelector);

      // select original campaign:
      console.log(`${formattedName}: choosing original campaign...`);
      await logSelectorExistence(page, originalGameSelector, formattedName);
      await page.click(originalGameSelector);
    })(),
    new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `Timeout starting original game after ${maximumWaitForStep}ms`,
            ),
          ),
        maximumWaitForStep,
      ),
    ),
  ]);
};

/** running the game at zero speed means we don't need to worry about taking the
 * screenshot on the absolute first frame since nothing in the room will change */
const gameRunsAtZeroSpeed = async (page: Page, projectName: string) => {
  const formattedName = formatProjectName(projectName);

  await retryWithRecovery({
    async action() {
      // Set game speed directly via gameApi
      const gameApiFound = await page.evaluate(() => {
        if (
          window._e2e_gamePageGameAi &&
          window._e2e_store &&
          window._e2e_pixiApplication
        ) {
          window._e2e_gamePageGameAi.gameState.gameSpeed = 0;
          type SetGameSpeedAction = ReturnType<typeof setGameSpeed>;
          type ToggleUserSettingAction = ReturnType<typeof toggleUserSetting>;

          // we need to fake a zero speed, since this isn't in the menu as a selectable option
          // this freezes the game to make the screenshots deterministic
          window._e2e_store.dispatch({
            type: "gameMenus/setGameSpeed",
            payload: 0 as SelectableGameSpeeds,
          } satisfies SetGameSpeedAction);

          // turn off the crt filter (on by default)
          window._e2e_store.dispatch({
            type: "gameMenus/toggleUserSetting",
            payload: { path: "displaySettings.crtFilter" },
          } satisfies ToggleUserSettingAction);

          // set the frame rate very low - this reduces how much cpu the tests need to run
          window._e2e_pixiApplication.ticker.maxFPS = 5;

          return true;
        }
        return false;
      });

      if (gameApiFound) {
        console.log(`${formattedName}: Set game speed to 0 via gameApi`);
      } else {
        throw new Error(`gameApi not found on window`);
      }
    },
    async recovery() {
      // Wait a bit for the game to initialize
      await sleep(500);
    },
    logHeader: formattedName,
    actionDescription: "set game speed to zero",
    page,
    screenshotPrefix: `speed-${projectName}`,
  });
};

const exitCrownsDialog = async (page: Page, projectName: string) => {
  const formattedName = formatProjectName(projectName);

  await retryWithRecovery({
    async action(attempt) {
      await Promise.race([
        (async () => {
          // Screenshot before checking dialog
          await page
            .screenshot({
              path: `test-results/crowns-${projectName}-attempt-${attempt}-before-check.png`,
              fullPage: false,
            })
            .catch(() => {});

          // Check if the crowns dialog is visible
          const crownsDialogVisible = await page
            .locator(crownsDialogSelector)
            .isVisible()
            .catch(() => false);

          if (crownsDialogVisible) {
            console.log(`${formattedName}: exiting crowns dialog...`);

            // Screenshot before clicking dialog
            await page
              .screenshot({
                path: `test-results/crowns-${projectName}-attempt-${attempt}-before-click.png`,
                fullPage: false,
              })
              .catch(() => {});

            // Log selector existence before clicking
            await logSelectorExistence(
              page,
              crownsDialogSelector,
              formattedName,
            );

            await page.click(crownsDialogSelector);
            console.log(`${formattedName}: crowns dialog closed`);
          } else {
            console.log(
              `${formattedName}: crowns dialog not shown, continuing...`,
            );
          }
        })(),
        new Promise<never>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  `Timeout exiting crowns dialog after ${maximumWaitForStep}ms`,
                ),
              ),
            maximumWaitForStep,
          ),
        ),
      ]);
    },
    logHeader: formattedName,
    actionDescription: "exit crowns dialog",
    page,
    screenshotPrefix: `crowns-${projectName}`,
  });
};

const retryWithRecovery = async <T>({
  action,
  recovery,
  maxAttempts = 5,
  logHeader,
  actionDescription,
  page,
  screenshotPrefix,
}: {
  action: (attempt: number) => Promise<T>;
  recovery?: (attempt: number) => Promise<void>;
  maxAttempts?: number;
  logHeader: string;
  actionDescription: string;
  page?: Page;
  screenshotPrefix?: string;
}): Promise<T> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    console.log(
      `${logHeader} Attempting ${actionDescription} (attempt ${attempt}/${maxAttempts - 1})...`,
    );

    const startTime = performance.now();
    try {
      const result = await action(attempt);
      console.log(
        `${logHeader} ... succeeded after`,
        chalk.yellow((performance.now() - startTime).toFixed(0)),
        "ms",
      );
      return result;
    } catch (error) {
      console.log(
        `${logHeader} ${chalk.red(`Failed on attempt ${attempt}`)}: ${error}`,
      );

      // Take a screenshot on failure if page and prefix are provided
      if (page && screenshotPrefix) {
        const screenshotPath = `test-results/${screenshotPrefix}-attempt-${attempt}-failed.png`;
        console.log(`${logHeader} Saving screenshot to ${screenshotPath}`);
        await page
          .screenshot({
            path: screenshotPath,
            fullPage: false,
          })
          .catch((screenshotError) => {
            console.log(
              `${logHeader} Failed to save screenshot: ${screenshotError}`,
            );
          });
      }

      if (attempt < maxAttempts - 1 && recovery) {
        await sleep(1_000); // brief pause before attempting recovery
        await recovery(attempt);
      } else if (attempt === maxAttempts - 1) {
        throw new Error(
          `Failed ${actionDescription} after ${maxAttempts} attempts: ${error}`,
        );
      }
    }
  }

  // This should never be reached due to the throw above, but TypeScript needs it
  throw new Error(`Failed ${actionDescription} after ${maxAttempts} attempts`);
};

test.describe.configure({ mode: "parallel" });

test.describe("Room Visual Snapshots", () => {
  for (const [batchIndex, batch] of batches.entries()) {
    const firstRoom = batch.at(0);
    const lastRoom = batch.at(-1);
    const batchDescription = `${batchIndex + 1}/${batchCount}: ${`${firstRoom}...${lastRoom}`}`;
    test(`Snapshot rooms batch ${batchDescription}`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(batch.length * timeoutPerRoom + 10_000);
      const formattedName = `${formatProjectName(testInfo.project.name)} (${batchIndex})`;
      console.log(`${formattedName} starting batch ${batchDescription} `);

      try {
        await test.step(`starting the game`, async () => {
          await startOriginalGame(page, testInfo.project.name);
        });
      } catch (error) {
        console.error(`${formattedName}: Failed to start game - ${error}`);
        await page.screenshot({
          path: `test-results/startup-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      try {
        await test.step(`slowing game to zero speed`, async () => {
          await gameRunsAtZeroSpeed(page, testInfo.project.name);
        });
      } catch (error) {
        console.error(`${formattedName}: Failed to set game speed - ${error}`);
        await page.screenshot({
          path: `test-results/speed-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      try {
        await test.step(`leaving crowns dialog`, async () => {
          await exitCrownsDialog(page, testInfo.project.name);
        });
      } catch (error) {
        console.error(
          `${formattedName}: Failed to exit crowns dialog - ${error}`,
        );
        await page.screenshot({
          path: `test-results/crowns-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      for (const [index, roomId] of batch.entries()) {
        await test.step(`room: ${roomId}`, async () => {
          const progress = Math.round(((index + 1) / batch.length) * 100);
          const header = progressLogHeader(
            testInfo.project.name,
            progress,
            batchIndex,
          );

          await retryWithRecovery({
            async action(attempt) {
              console.log(
                `${header} Navigating to room: ${chalk.cyan(roomId)}`,
              );

              // Screenshot before navigation
              await page
                .screenshot({
                  path: `test-results/room-${testInfo.project.name}-${roomId}-attempt-${attempt}-before-nav.png`,
                  fullPage: false,
                })
                .catch(() => {});

              const renderEventPromise = waitForRoomRenderEvent(page, roomId);
              await page.goto(`/?cheats=1#${roomId}`);
              await renderEventPromise;
            },
            async recovery() {
              // Navigate somewhere else so we can come back again and have another chance
              // to catch the event:
              await page.goto(`/?cheats=1#finalroom`);
              await sleep(500);
            },
            maxAttempts: maxTriesToLoadRoom,
            logHeader: header,
            actionDescription: `load room ${chalk.cyan(roomId)}`,
            page,
            screenshotPrefix: `room-${testInfo.project.name}-${roomId}`,
          });

          console.log(
            `${header} Taking screenshot for room: ${chalk.cyan(roomId)}`,
          );
          const screenshotStart = performance.now();
          await expect
            // github free runners are slow:
            .configure({ timeout: 15_000 })
            .soft(page)
            .toHaveScreenshot(`${roomId}.png`, {
              fullPage: false,
              // default is 0.2, which is very permissive to palette changes.
              // Whereas 0 makes builds fail with invisible differences between
              // the OS running the test, at least in webkit/safari.
              // keep a much smaller threshold than normal, but not zero:
              threshold: 0.02,
              scale: "device",
              maxDiffPixels: 0,
            });
          console.log(
            `${header} ...screenshot took`,
            chalk.yellow((performance.now() - screenshotStart).toFixed(0)),
            "ms",
          );
        });
      }
    });
  }
});
