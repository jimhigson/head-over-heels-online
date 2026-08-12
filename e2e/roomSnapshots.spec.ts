import { expect, type Page } from "@playwright/test";
import chalk from "chalk";

import { campaign } from "../src/_generated/originalCampaign/campaign";
import { type OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import { spriteOptionEquals } from "../src/store/slices/userSettings/spriteOptionEquals";
import {
  type SpriteOption,
  type toggleUserSetting,
} from "../src/store/slices/userSettings/userSettingsSlice";
import { keys } from "../src/utils/entries";
import { type ScreenshotTestOptions } from "./ScreenshotTestOptions";
import {
  changeRoomViaApi,
  dispatchToStore,
  maximumWaitForStep,
  setZeroGameSpeed,
  waitForGameReady,
  waitForRoomToRender,
} from "./testUtils/gameStateQueries";
import { osSlowness, resolveRoomIds } from "./testUtils/infrastructure";
import {
  elapsed,
  formatDuration,
  formatProjectName,
  logSelectorExistence,
  logUpscale,
  progressLogHeader,
} from "./testUtils/logging";
import {
  exitCrownsDialog,
  playGameMenuItemSelector,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  enabledSpriteModes,
  roomScreenshotOptions,
  spriteOptionSuffix,
} from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";
import { test } from "./testUtils/test";

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
      if (cancelled) {
        return;
      }

      // start a game:
      console.log(`${formattedName} ${elapsed()}: clicking Play The Game...`);
      stepStart = performance.now();
      await logSelectorExistence(page, playGameMenuItemSelector, formattedName);

      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

      stepStart = performance.now();
      await page.click(playGameMenuItemSelector);
      console.log(
        `${formattedName} ${elapsed()}: click (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

      // select original campaign:
      console.log(
        `${formattedName} ${elapsed()}: choosing original campaign...`,
      );
      stepStart = performance.now();
      await logSelectorExistence(page, originalGameSelector, formattedName);
      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (originalGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

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

  // the store is put on the window at module load, so wait for it before
  // dispatching, then freeze the game as early as possible so as little of the
  // world as possible moves before it is stopped:
  await page.waitForFunction(() => window._e2e_store !== undefined);
  const successSetSpeed = await setZeroGameSpeed(page);

  await waitForGameReady(page);

  type ToggleUserSettingAction = ReturnType<typeof toggleUserSetting>;

  // turn off the crt filter (on by default)
  const successToggleCrtFilter = await dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "displaySettings.crtFilter", value: false },
  } satisfies ToggleUserSettingAction);

  if (!successSetSpeed || !successToggleCrtFilter) {
    throw new Error(`could not set zero game speed / toggle crt filter`);
  }

  console.log(`${formattedName} ${elapsed()}: Set game speed to 0 via gameApi`);
};

test.describe.configure({ mode: "parallel" });

test.describe("Room Visual Snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

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

        console.log(
          `${logHeader} ${elapsed()} Navigating to room: ${chalk.cyan(targetRoomId)}`,
        );

        await changeRoomViaApi(page, targetRoomId);
        await waitForRoomToRender(page, targetRoomId, logHeader);
        charactersCurrentRoomId = targetRoomId;
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
            const screenshotName = `${roomId}${suffix}.png`;

            console.log(
              `${logHeader} ${elapsed()} Taking screenshot for room: ${chalk.cyan(roomId)} ${JSON.stringify(spriteOption)} at ${chalk.cyan(screenshotName)}`,
            );
            const screenshotStart = performance.now();

            // soft so a genuine baseline change is reported without aborting the
            // remaining rooms. github free runners are slow, hence the timeout:
            await expect
              .configure({ timeout: 15_000 * osSlowness })
              .soft(page)
              .toHaveScreenshot(screenshotName, screenshotOpts);

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
