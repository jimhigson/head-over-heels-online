import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import type {
  setGameSpeed,
  toggleUserSetting,
} from "../src/store/slices/gameMenus/gameMenusSlice";
import type { SelectableGameSpeeds } from "../src/store/slices/gameMenus/selectableGameSpeeds";
import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { campaign } from "../src/_generated/originalCampaign/campaign";
import { keys } from "../src/utils/entries";
import { dispatchToStore } from "./dispatchToStore";
import { formatDuration } from "./formatDuration";
import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { logSelectorExistence } from "./logSelectorExistence";
import { osSlowness } from "./osSlowness";
import { formatProjectName, progressLogHeader } from "./projectName";
import { resolveRoomIds } from "./resolveRoomIds";
import { retryWithRecovery } from "./retryWithRecovery";
import { setIsUncolourised } from "./setIsUncolourised";

/**
 * Environment variables for controlling screenshot tests:
 *
 * ROOMS              - Comma-separated list of room IDs or patterns with * wildcard (e.g., "blacktooth*,moonbase*")
 * ROOMS_CONTAINING   - Filter to rooms containing a specific item type (e.g., "conveyor") or type[configProp=value] (e.g., "monster[which=skiHead]")
 * BATCH_COUNT        - Total number of parallel runners splitting the work (default: 1)
 * BATCH_NUMBER       - Which batch this runner processes, 0-indexed (default: 0)
 * PARALLEL_TESTS     - Number of parallel tests within this runner (default: 2, or 1 for small batches)
 * NO_UNCOLOURISED    - Skip uncolourised screenshots when set (faster local testing)
 * CI                 - Increases timeouts when running in CI environment
 *
 * Examples:
 *   ROOMS=bookworld13,bookworld14 pnpm screenshot --update-snapshots
 *   ROOMS_CONTAINING=conveyor,monster[which=dalek] pnpm screenshot --update-snapshots
 *   NO_UNCOLOURISED=1 pnpm screenshot
 */

const timeoutPerRoom = (process.env.CI ? 40_000 : 12_000) * osSlowness;
const maximumWaitForStep = 15_000 * osSlowness;
const maxTriesToLoadRoom = 3;

const campaignRoomIds = keys(campaign.rooms);

const screenshotThreshold = ({
  ci,
  platform,
  projectName,
  logHeader,
}: {
  ci: boolean;
  platform: NodeJS.Platform;
  projectName: string;
  logHeader: string;
}) => {
  const isWebkit =
    projectName.toLowerCase().includes("webkit") ||
    projectName.toLowerCase().includes("safari");

  const threshold =
    ci && platform === "linux" && isWebkit ?
      // on Linux Github runners, Safari doesn't support p3 colour mode in canvases;
      // colors differ more from local screenshots:
      0.2
      // playwright default is 0.2, which is very permissive to palette changes.
      // Whereas 0 makes builds fail with invisible differences between
      // the OS running the test, at least in webkit/safari.
      // keep a much smaller threshold than normal, but not zero:
      // on Linux CI + Safari, P3 canvas mode isn't supported so colors differ slightly
    : 0.02;

  console.log(
    `${logHeader} Threshold for image comparison will be ${threshold} since:
        ci is ${ci}
        platform is ${platform}
        projectName is ${projectName}`,
  );

  return threshold;
};

const roomIds = resolveRoomIds(campaign.rooms, {
  rooms: process.env.ROOMS,
  roomsContaining: process.env.ROOMS_CONTAINING,
}).toArray();

if (roomIds.length === 0) {
  throw new Error(
    `Zero rooms matched: ROOMS=${process.env.ROOMS} ROOMS_CONTAINING=${process.env.ROOMS_CONTAINING}`,
  );
}

const batchCount =
  process.env.BATCH_COUNT ? Number.parseInt(process.env.BATCH_COUNT) : 1;

const batchNumber =
  process.env.BATCH_NUMBER !== undefined ?
    Number.parseInt(process.env.BATCH_NUMBER)
  : 0;

// First, determine which batch of rooms this runner is responsible for
const totalRoomCount = roomIds.length;
const roomsPerBatch = Math.ceil(totalRoomCount / batchCount);
const batchStart = batchNumber * roomsPerBatch;
const batchEnd = Math.min(batchStart + roomsPerBatch, totalRoomCount);
const batchRoomIds = roomIds.slice(batchStart, batchEnd);

console.log("🚪🚪🚪 batchRoomIds:", batchRoomIds);

const parallelTestsCount =
  // a single test for small batches:
  roomsPerBatch < 10 ? 1
  : process.env.PARALLEL_TESTS ? Number.parseInt(process.env.PARALLEL_TESTS)
  : 2;

const colourisedModes: boolean[] =
  process.env.NO_UNCOLOURISED ? [false] : [false, true];

console.log(
  `🏃 runner will process batch ${batchNumber} of ${batchCount} total batches`,
);
console.log(
  `🏃 splitting this runner's rooms into ${parallelTestsCount} parallel tests`,
);

// Then split this runner's rooms into parallel tests
const roomsPerTest = Math.ceil(batchRoomIds.length / parallelTestsCount);
const perTestRooms = Array.from({ length: parallelTestsCount }, (_, index) => {
  const start = index * roomsPerTest;
  const end = start + roomsPerTest;
  return batchRoomIds.slice(start, end);
});

// Selectors for menu navigation
const playGameMenuItemSelector = "[data-menuitem_id=playGame]";
const originalGameSelector = "[data-menuitem_id=originalGame]";
const crownsDialogSelector = "[data-dialog-id=crowns]";

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

const startOriginalGame = async (page: Page, projectName: string) => {
  // we can't stop the losing branch completely from finishing its operation, but
  // we can stop it from doing its next step:
  let cancelled = false;

  await Promise.race([
    (async () => {
      const formattedName = formatProjectName(projectName);

      // Navigate to the page with cheats on; starting in the final room ensures that
      // when the room loop tries to go to the first room, there is an actual navigation
      // into there
      let stepStart = performance.now();
      await page.goto(`/?cheats=1&track=0#finalroom`);
      console.log(
        `${formattedName}: goto took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      // start a game:
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

      // select original campaign:
      console.log(`${formattedName}: choosing original campaign...`);
      stepStart = performance.now();
      await logSelectorExistence(page, originalGameSelector, formattedName);
      console.log(
        `${formattedName}: logSelectorExistence (originalGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      stepStart = performance.now();
      await page.click(originalGameSelector);
      console.log(
        `${formattedName}: click (originalGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
    })(),
    new Promise<never>((_, reject) =>
      setTimeout(() => {
        cancelled = true;
        return reject(
          new Error(
            `Timeout starting original game after ${formatDuration(maximumWaitForStep)}`,
          ),
        );
      }, maximumWaitForStep),
    ),
  ]);
};

/** running the game at zero speed means we don't need to worry about taking the
 * screenshot on the absolute first frame since nothing in the room will change */
const gameRunsAtZeroSpeed = async (page: Page, projectName: string) => {
  const formattedName = formatProjectName(projectName);

  await retryWithRecovery({
    async action(attempt) {
      const gameApiFound = await page.evaluate(() => {
        if (window._e2e_gamePageGameAi && window._e2e_pixiApplication) {
          window._e2e_gamePageGameAi.gameState.gameSpeed = 0;
          // set the frame rate very low - this reduces how much cpu the tests need to run
          window._e2e_pixiApplication.ticker.maxFPS = 5;
          return true;
        }
        return false;
      });

      type SetGameSpeedAction = ReturnType<typeof setGameSpeed>;
      type ToggleUserSettingAction = ReturnType<typeof toggleUserSetting>;

      // we need to fake a zero speed, since this isn't in the menu as a selectable option
      // this freezes the game to make the screenshots deterministic
      const successSetSpeed = await dispatchToStore(page, {
        type: "gameMenus/setGameSpeed",
        payload: 0 as SelectableGameSpeeds,
      } satisfies SetGameSpeedAction);

      // turn off the crt filter (on by default)
      const successToggleCrtFilter = await dispatchToStore(page, {
        type: "gameMenus/toggleUserSetting",
        payload: { path: "displaySettings.crtFilter", value: false },
      } satisfies ToggleUserSettingAction);

      if (!gameApiFound || !successSetSpeed || !successToggleCrtFilter) {
        await page
          .screenshot({
            path: `test-results/game-runs-zero-speed-${projectName}-attempt-${attempt}-no-game-api-found.png`,
            fullPage: true,
          })
          .catch(() => {});
        throw new Error(`gameApi not found on window`);
      }

      console.log(`${formattedName}: Set game speed to 0 via gameApi`);
    },
    async recovery() {
      // Wait a bit for the game to initialize
      await page.waitForTimeout(2_000);
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
      // we can't stop the losing branch completely from finishing its operation, but
      // we can stop it from doing its next step:
      let cancelled = false;

      await Promise.race([
        (async () => {
          // Screenshot before checking dialog
          let stepStart = performance.now();
          await page
            .screenshot({
              path: `test-results/crowns-${projectName}-attempt-${attempt}-before-check.png`,
              fullPage: false,
            })
            .catch(() => {});
          console.log(
            `${formattedName}: screenshot (before-check) took ${formatDuration(performance.now() - stepStart)}`,
          );
          if (cancelled) return;

          // Check if the crowns dialog is visible
          stepStart = performance.now();
          const crownsDialogVisible = await page
            .locator(crownsDialogSelector)
            .isVisible()
            .catch(() => false);
          console.log(
            `${formattedName}: isVisible check took ${formatDuration(performance.now() - stepStart)}`,
          );
          if (cancelled) return;

          if (crownsDialogVisible) {
            console.log(`${formattedName}: exiting crowns dialog...`);

            // Screenshot before clicking dialog
            stepStart = performance.now();
            await page
              .screenshot({
                path: `test-results/crowns-${projectName}-attempt-${attempt}-before-click.png`,
                fullPage: false,
              })
              .catch(() => {});
            console.log(
              `${formattedName}: screenshot (before-click) took ${formatDuration(performance.now() - stepStart)}`,
            );
            if (cancelled) return;

            // Log selector existence before clicking
            stepStart = performance.now();
            await logSelectorExistence(
              page,
              crownsDialogSelector,
              formattedName,
            );
            console.log(
              `${formattedName}: logSelectorExistence took ${formatDuration(performance.now() - stepStart)}`,
            );
            if (cancelled) return;

            stepStart = performance.now();
            await page.click(crownsDialogSelector);
            console.log(
              `${formattedName}: click (crowns) took ${formatDuration(performance.now() - stepStart)}`,
            );
            console.log(`${formattedName}: crowns dialog closed`);
          } else {
            // Screenshot before clicking dialog
            stepStart = performance.now();
            await page
              .screenshot({
                path: `test-results/crowns-${projectName}-attempt-${attempt}-already-closed.png`,
                fullPage: false,
              })
              .catch(() => {});
            console.log(
              `${formattedName}: screenshot (already-closed) took ${formatDuration(performance.now() - stepStart)}`,
            );
            if (cancelled) return;

            console.log(
              `${formattedName}: crowns dialog not shown, continuing...`,
            );
          }
        })(),
        new Promise<never>((_, reject) =>
          setTimeout(() => {
            cancelled = true;
            return reject(
              new Error(
                `Timeout exiting crowns dialog after ${formatDuration(maximumWaitForStep)}`,
              ),
            );
          }, maximumWaitForStep),
        ),
      ]);
    },
    logHeader: formattedName,
    actionDescription: "exit crowns dialog",
    page,
    screenshotPrefix: `crowns-${projectName}`,
  });
};

test.describe.configure({ mode: "parallel" });

test.describe("Room Visual Snapshots", () => {
  for (const [testIndex, testRooms] of perTestRooms.entries()) {
    const firstRoom = testRooms.at(0);
    const lastRoom = testRooms.at(-1);
    const testDescription = `${testIndex + 1}/${parallelTestsCount}: ${`${firstRoom}...${lastRoom}`}`;
    test(`Snapshot rooms test ${testDescription}`, async ({
      page,
    }, testInfo) => {
      const { rooms: projectRooms, noUncolourised } = testInfo.project
        .use as ScreenshotTestOptions;

      // not all projects include all rooms = this can be changed using 'use' in the playwright config
      const includedTestRooms =
        projectRooms === undefined ? testRooms : (
          testRooms.filter((r) => projectRooms.includes(r))
        );

      if (includedTestRooms.length === 0) {
        test.skip();
        return;
      }

      const effectiveColourisedModes: boolean[] =
        noUncolourised ? [false] : colourisedModes;

      test.setTimeout(includedTestRooms.length * timeoutPerRoom + 20_000);

      const formattedName = `${formatProjectName(testInfo.project.name)} (${testIndex})`;
      const threshold = screenshotThreshold({
        ci: !!process.env.CI,
        platform: process.platform,
        projectName: testInfo.project.name,
        logHeader: formattedName,
      });

      forwardBrowserConsoleToNodeConsole(page, formattedName);

      console.log(`${formattedName} starting test ${formattedName} `);

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

      let charactersCurrentRoomId: OriginalCampaignRoomId = "finalroom";
      const navigateToRoom = async (
        logHeader: string,
        targetRoomId: OriginalCampaignRoomId,
        ensureComingFromPrevious: boolean = true,
      ) => {
        // first, check we are coming from the sequentially previous room, to keep the door we enter consistent:
        if (ensureComingFromPrevious) {
          const targetRoomIndex = campaignRoomIds.indexOf(targetRoomId);

          const previousRoomId =
            targetRoomIndex === 0 ? "finalroom" : (
              campaignRoomIds[targetRoomIndex - 1]
            );

          if (charactersCurrentRoomId !== previousRoomId) {
            console.log(
              `${logHeader} will pre-load previous room: ${chalk.blue(previousRoomId)} to set correct entry point to target room: ${chalk.blue(includedTestRooms[0])} (was in room: ${chalk.blue(charactersCurrentRoomId)})`,
            );

            await navigateToRoom(logHeader, previousRoomId, false);
          }
        }

        await retryWithRecovery({
          async action(attempt) {
            console.log(
              `${logHeader} Navigating to room: ${chalk.cyan(targetRoomId)}`,
            );

            // Screenshot before navigation
            await page
              .screenshot({
                path: `test-results/room-${testInfo.project.name}-${targetRoomId}-attempt-${attempt}-before-nav.png`,
                fullPage: false,
              })
              .catch(() => {});

            const renderEventPromise = waitForRoomRenderEvent(
              page,
              targetRoomId,
            );
            await page.goto(`/?cheats=1&track=0#${targetRoomId}`);
            await renderEventPromise;
            charactersCurrentRoomId = targetRoomId;
          },
          async recovery() {
            // Navigate somewhere else so we can come back again and have another chance
            // to catch the event:
            await page.goto(`/?cheats=1&track=0#finalroom`);
            await page.waitForTimeout(500);
          },
          maxAttempts: maxTriesToLoadRoom,
          logHeader,
          actionDescription: `load room ${chalk.cyan(targetRoomId)}`,
          page,
          screenshotPrefix: `room-${testInfo.project.name}-${targetRoomId}`,
        });
      };

      let currentUncolourisedState = false;

      for (const [roomIndex, roomId] of includedTestRooms.entries()) {
        await test.step(`room: ${roomId}`, async () => {
          const progress = Math.round(
            ((roomIndex + 1) / includedTestRooms.length) * 100,
          );
          const logHeader = progressLogHeader(
            testInfo.project.name,
            progress,
            testIndex,
          );

          console.log(
            `${formattedName} ${chalk.cyanBright("🚪 room step:")} ${chalk.blue(roomId)} ${chalk.red("___")}`,
          );

          await navigateToRoom(logHeader, roomId);

          for (const uncolourised of effectiveColourisedModes) {
            const filenameSuffix = uncolourised ? "-uncolourised" : "";

            if (currentUncolourisedState !== uncolourised) {
              await setIsUncolourised(page, formattedName, uncolourised);
            }
            currentUncolourisedState = uncolourised;

            console.log(
              `${logHeader} Taking screenshot for room: ${chalk.cyan(roomId)} (uncolourised: ${uncolourised})`,
            );
            const screenshotStart = performance.now();
            await expect
              // github free runners are slow:
              .configure({ timeout: 15_000 * osSlowness })
              .soft(page)
              .toHaveScreenshot(`${roomId}${filenameSuffix}.png`, {
                fullPage: false,
                threshold,
                scale: "device",
                maxDiffPixels: 0,
              });
            console.log(
              `${logHeader} ...screenshot took`,
              chalk.yellow(formatDuration(performance.now() - screenshotStart)),
            );
          }
        });
        charactersCurrentRoomId = roomId;
      }
    });
  }
});
