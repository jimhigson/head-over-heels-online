import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import type {
  setGameSpeed,
  SpriteOption,
  toggleUserSetting,
} from "../src/store/slices/gameMenus/gameMenusSlice";
import type { SelectableGameSpeeds } from "../src/store/slices/gameMenus/selectableGameSpeeds";
import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { campaign } from "../src/_generated/originalCampaign/campaign";
import { spriteOptionEquals } from "../src/store/slices/gameMenus/spriteOptionEquals";
import { keys } from "../src/utils/entries";
import { dispatchToStore } from "./e2eStoreUtils";
import { formatDuration } from "./formatDuration";
import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import {
  maximumWaitForStep,
  playGameMenuItemSelector,
  waitForRoomRenderEvent,
} from "./gameTestUtils";
import { logSelectorExistence } from "./logSelectorExistence";
import { logUpscale } from "./logUpscale";
import {
  enabledSpriteModes,
  exitCrownsDialog,
  spriteOptionSuffix,
} from "./menuSnapshotUtils";
import { osSlowness } from "./osSlowness";
import { elapsed, formatProjectName, progressLogHeader } from "./projectName";
import { resolveRoomIds } from "./resolveRoomIds";
import { retryWithRecovery } from "./retryWithRecovery";
import { roomScreenshotOptions } from "./screenshotOptions";
import { setSpriteOption } from "./setSpriteOption";

/**
 * Environment variables for controlling screenshot tests:
 *
 * ROOMS              - Comma-separated list of room IDs or patterns with * wildcard (e.g., "blacktooth*,moonbase*")
 * ROOMS_CONTAINING   - Filter to rooms containing a specific item type (e.g., "conveyor") or type[configProp=value] (e.g., "monster[which=skiHead]")
 * BATCH_COUNT        - Total number of parallel runners splitting the work (default: 1)
 * BATCH_NUMBER       - Which batch this runner processes, 0-indexed (default: 0)
 * PARALLEL_TESTS     - Number of parallel tests within this runner (default: 2, or 1 for small batches)
 * NO_UNCOLOURISED    - Skip uncolourised screenshots when set (faster local testing)
 * NO_TOPPY
 * CI                 - Increases timeouts when running in CI environment
 *
 * Examples:
 *   ROOMS=bookworld13,bookworld14 pnpm screenshot --update-snapshots
 *   ROOMS_CONTAINING=conveyor,monster[which=dalek] pnpm screenshot --update-snapshots
 *   NO_UNCOLOURISED=1 pnpm screenshot
 */

const timeoutPerRoom = (process.env.CI ? 40_000 : 15_000) * osSlowness;
const maxTriesToLoadRoom = 3;

const campaignRoomIds = keys(campaign.rooms);

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
const originalGameSelector = "[data-menuitem_id=originalGame]";
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
        `${formattedName} ${elapsed()}: goto took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      // start a game:
      console.log(`${formattedName} ${elapsed()}: clicking Play The Game...`);
      stepStart = performance.now();
      await logSelectorExistence(page, playGameMenuItemSelector, formattedName);

      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      stepStart = performance.now();
      await page.click(playGameMenuItemSelector);
      console.log(
        `${formattedName} ${elapsed()}: click (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      // select original campaign:
      console.log(
        `${formattedName} ${elapsed()}: choosing original campaign...`,
      );
      stepStart = performance.now();
      await logSelectorExistence(page, originalGameSelector, formattedName);
      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (originalGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      stepStart = performance.now();
      await page.click(originalGameSelector);
      console.log(
        `${formattedName} ${elapsed()}: click (originalGame) took ${formatDuration(performance.now() - stepStart)}`,
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

      console.log(
        `${formattedName} ${elapsed()}: Set game speed to 0 via gameApi`,
      );
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

      // enabledSpriteModes is already filtered by the NO_UNCOLOURISED env var,
      // but noUncolourised here is a per-project flag from the Playwright config
      // (eg, mobile-safari can disable uncolourised independently of the env var)
      const effectiveModes =
        noUncolourised ?
          enabledSpriteModes.filter((m) => !m.uncolourised)
        : enabledSpriteModes;

      test.setTimeout(includedTestRooms.length * timeoutPerRoom + 20_000);

      const formattedName = `${formatProjectName(testInfo.project.name)} (${testIndex})`;
      const screenshotOpts = roomScreenshotOptions(testInfo.project.name);

      forwardBrowserConsoleToNodeConsole(page, formattedName);

      console.log(
        `${formattedName} ${elapsed()} starting test ${formattedName} `,
      );

      try {
        await test.step(`starting the game`, async () => {
          await startOriginalGame(page, testInfo.project.name);
        });
      } catch (error) {
        console.error(
          `${formattedName} ${elapsed()}: Failed to start game - ${error}`,
        );
        await page.screenshot({
          path: `test-results/startup-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      // with the game started, safe to say upscale should be available:
      await logUpscale(page, formattedName);

      try {
        await test.step(`slowing game to zero speed`, async () => {
          await gameRunsAtZeroSpeed(page, testInfo.project.name);
        });
      } catch (error) {
        console.error(
          `${formattedName} ${elapsed()}: Failed to set game speed - ${error}`,
        );
        await page.screenshot({
          path: `test-results/speed-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      try {
        await test.step(`leaving crowns dialog`, async () => {
          await exitCrownsDialog(page, formattedName);
        });
      } catch (error) {
        console.error(
          `${formattedName} ${elapsed()}: Failed to exit crowns dialog - ${error}`,
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
              `${logHeader} ${elapsed()} will pre-load previous room: ${chalk.blue(previousRoomId)} to set correct entry point to target room: ${chalk.blue(includedTestRooms[0])} (was in room: ${chalk.blue(charactersCurrentRoomId)})`,
            );

            await navigateToRoom(logHeader, previousRoomId, false);
          }
        }

        await retryWithRecovery({
          async action(attempt) {
            console.log(
              `${logHeader} ${elapsed()} Navigating to room: ${chalk.cyan(targetRoomId)}`,
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

      let currentSpriteOption: SpriteOption | undefined;

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
            `${formattedName} ${elapsed()} ${chalk.cyanBright("🚪 room step:")} ${chalk.blue(roomId)} ${chalk.red("___")}`,
          );

          await navigateToRoom(logHeader, roomId);

          for (const spriteOption of effectiveModes) {
            if (
              currentSpriteOption === undefined ||
              !spriteOptionEquals(currentSpriteOption, spriteOption)
            ) {
              await setSpriteOption(page, formattedName, spriteOption);
            }
            currentSpriteOption = spriteOption;

            const suffix = spriteOptionSuffix(spriteOption);
            console.log(
              `${logHeader} ${elapsed()} Taking screenshot for room: ${chalk.cyan(roomId)} ${JSON.stringify(spriteOption)} at ${chalk.cyan(`${roomId}${suffix}.png`)}`,
            );
            const screenshotStart = performance.now();
            await expect
              // github free runners are slow:
              .configure({ timeout: 15_000 * osSlowness })
              .soft(page)
              .toHaveScreenshot(`${roomId}${suffix}.png`, screenshotOpts);
            console.log(
              `${logHeader} ${elapsed()} ...screenshot took`,
              chalk.yellow(formatDuration(performance.now() - screenshotStart)),
            );
          }
        });
        charactersCurrentRoomId = roomId;
      }
    });
  }
});
