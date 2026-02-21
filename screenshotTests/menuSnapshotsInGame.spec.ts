import { test } from "@playwright/test";
import chalk from "chalk";

import type { goToSubmenu } from "../src/store/slices/gameMenus/gameMenusSlice";
import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { dispatchKeyPress } from "./dispatchKeyPress";
import { dispatchToStore } from "./e2eStoreUtils";
import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { logSelectorExistence } from "./logSelectorExistence";
import { logUpscale } from "./logUpscale";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  colourisedModes,
  exitCrownsDialog,
  openInGameMainMenu,
  takeScreenshot,
  testTimeout,
} from "./menuSnapshotUtils";
import { osSlowness } from "./osSlowness";
import { formatProjectName } from "./projectName";
import { retryWithRecovery } from "./retryWithRecovery";
import { setIsUncolourised } from "./setIsUncolourised";

for (const { uncolourised } of colourisedModes) {
  test.describe("Menu Visual Snapshots", () => {
    test(`Snapshot in game dialogs (uncolourised = ${uncolourised})`, async ({
      page,
    }, testInfo) => {
      const { mainMenuOnly, noUncolourised } = testInfo.project
        .use as ScreenshotTestOptions;
      if (mainMenuOnly || (uncolourised && noUncolourised)) {
        test.skip();
        return;
      }
      test.setTimeout(testTimeout);

      const formattedName = formatProjectName(testInfo.project.name);
      const filenameSuffix = uncolourised ? "-uncolourised" : "";

      forwardBrowserConsoleToNodeConsole(page, formattedName);

      console.log(`${formattedName} starting in game dialogs snapshot test`);

      await test.step("Navigate to home page and wait for main menu", async () => {
        await retryWithRecovery({
          async action() {
            console.log(`${formattedName}: Navigating to /`);
            await page.goto("/?track=0");

            // Wait for main menu to appear
            const mainMenuSelector = "[data-dialog-id=mainMenu]";
            await page.waitForSelector(mainMenuSelector, {
              timeout: 5_000 * osSlowness,
            });

            await page.waitForTimeout(500);
          },
          async recovery() {
            console.log(
              `${formattedName}: Retrying navigation with page reload`,
            );
            await page.reload();
          },
          logHeader: formattedName,
          actionDescription: "navigate to home page",
          page,
          screenshotPrefix: "crowns-initial-navigation",
        });
      });

      await logUpscale(page, formattedName);

      await test.step(`set colourised user setting`, async () => {
        await setIsUncolourised(page, formattedName, uncolourised);
      });

      await clickPlayTheGame(page, formattedName);
      await clickOriginalCampaign(page, formattedName);

      await test.step("Screenshot: crowns", async () => {
        await retryWithRecovery({
          async action() {
            const crownsDialogSelector = "[data-dialog-id=crowns]";
            console.log(`${formattedName}: Waiting for crowns dialog`);
            await page.waitForSelector(crownsDialogSelector, {
              timeout: 5_000 * osSlowness,
            });
            await logSelectorExistence(
              page,
              crownsDialogSelector,
              formattedName,
            );

            await page.waitForTimeout(500);

            console.log(
              `${formattedName} Taking screenshot for dialog: ${chalk.cyan("crowns")}`,
            );
            await takeScreenshot(
              page,
              `crowns${filenameSuffix}`,
              formattedName,
              uncolourised,
            );
          },
          logHeader: formattedName,
          actionDescription: "take crowns dialog screenshot",
          page,
          screenshotPrefix: "crowns-screenshot",
        });
      });

      await exitCrownsDialog(page, formattedName);

      await test.step("Open map dialog", async () => {
        await retryWithRecovery({
          async action() {
            console.log(
              `${formattedName}: Clicking canvas and pressing M to open map`,
            );
            await page.waitForTimeout(500);

            // Click the canvas to activate it and give it focus
            const canvas = page.locator("canvas").first();
            await canvas.click();
            await page.waitForTimeout(200);

            await dispatchKeyPress(page, "m", "KeyM");
            await page.waitForTimeout(500);

            const mapDialogSelector = "[data-dialog-id=map]";
            await page.waitForSelector(mapDialogSelector, {
              timeout: 5_000 * osSlowness,
            });
            await logSelectorExistence(page, mapDialogSelector, formattedName);
          },
          logHeader: formattedName,
          actionDescription: "open map dialog",
          page,
          screenshotPrefix: "open-map",
        });
      });

      await test.step("Screenshot: map", async () => {
        await retryWithRecovery({
          async action() {
            console.log(
              `${formattedName} Taking screenshot for dialog: ${chalk.cyan("map")}`,
            );
            await takeScreenshot(
              page,
              `map${filenameSuffix}`,
              formattedName,
              uncolourised,
            );
          },
          logHeader: formattedName,
          actionDescription: "take map dialog screenshot",
          page,
          screenshotPrefix: "map-screenshot",
        });
      });

      await test.step("Exit map dialog", async () => {
        await retryWithRecovery({
          async action() {
            const mapDialogSelector = "[data-dialog-id=map]";
            console.log(`${formattedName}: Pressing Escape to exit map`);
            await dispatchKeyPress(page, "Escape", "Escape");

            // Wait for the map dialog to disappear
            await page.waitForSelector(mapDialogSelector, {
              state: "detached",
              timeout: 5_000 * osSlowness,
            });
            await page.waitForTimeout(500);
          },
          logHeader: formattedName,
          actionDescription: "exit map dialog",
          page,
          screenshotPrefix: "exit-map",
        });
      });

      await test.step("Open hold dialog", async () => {
        await retryWithRecovery({
          async action() {
            console.log(
              `${formattedName}: Clicking canvas and pressing P to open hold`,
            );
            await page.waitForTimeout(500);

            const canvas = page.locator("canvas").first();
            await canvas.click();
            await page.waitForTimeout(200);

            await dispatchKeyPress(page, "p", "KeyP");
            await page.waitForTimeout(500);

            const holdDialogSelector = "[data-dialog-id=hold]";
            await page.waitForSelector(holdDialogSelector, {
              timeout: 5_000 * osSlowness,
            });
            await logSelectorExistence(page, holdDialogSelector, formattedName);
          },
          logHeader: formattedName,
          actionDescription: "open hold dialog",
          page,
          screenshotPrefix: "open-hold",
        });
      });

      await test.step("Screenshot: hold", async () => {
        await retryWithRecovery({
          async action() {
            console.log(
              `${formattedName} Taking screenshot for dialog: ${chalk.cyan("hold")}`,
            );
            await takeScreenshot(
              page,
              `hold${filenameSuffix}`,
              formattedName,
              uncolourised,
            );
          },
          logHeader: formattedName,
          actionDescription: "take hold dialog screenshot",
          page,
          screenshotPrefix: "hold-screenshot",
        });
      });

      await test.step("Exit hold dialog", async () => {
        await retryWithRecovery({
          async action() {
            const holdDialogSelector = "[data-dialog-id=hold]";
            console.log(`${formattedName}: Pressing P to exit hold`);
            await dispatchKeyPress(page, "p", "KeyP");

            await page.waitForSelector(holdDialogSelector, {
              state: "detached",
              timeout: 5_000 * osSlowness,
            });
            await page.waitForTimeout(500);
          },
          logHeader: formattedName,
          actionDescription: "exit hold dialog",
          page,
          screenshotPrefix: "exit-hold",
        });
      });

      await openInGameMainMenu(page, formattedName);

      await test.step("Screenshot: main-inGame", async () => {
        await retryWithRecovery({
          async action() {
            console.log(
              `${formattedName} Taking screenshot for dialog: ${chalk.cyan("main-inGame")}`,
            );
            await takeScreenshot(
              page,
              `main-inGame${filenameSuffix}`,
              formattedName,
              uncolourised,
            );
          },
          logHeader: formattedName,
          actionDescription: "take in-game main menu screenshot",
          page,
          screenshotPrefix: "main-inGame-screenshot",
        });
      });

      await test.step("Click progress so far", async () => {
        await retryWithRecovery({
          async action() {
            const progressSelector = "[data-menuitem_id=viewCrowns]";
            console.log(`${formattedName}: Clicking progress so far`);
            await logSelectorExistence(page, progressSelector, formattedName);
            await page.click(progressSelector);
            await page.waitForTimeout(500);

            const scoreDialogSelector = "[data-dialog-id=score]";
            await page.waitForSelector(scoreDialogSelector, {
              timeout: 5_000 * osSlowness,
            });
            await logSelectorExistence(
              page,
              scoreDialogSelector,
              formattedName,
            );
          },
          logHeader: formattedName,
          actionDescription: "click progress so far",
          page,
          screenshotPrefix: "click-progress",
        });
      });

      await test.step("Screenshot: score", async () => {
        await retryWithRecovery({
          async action() {
            console.log(
              `${formattedName} Taking screenshot for dialog: ${chalk.cyan("score")}`,
            );
            await takeScreenshot(
              page,
              `score${filenameSuffix}`,
              formattedName,
              uncolourised,
            );
          },
          logHeader: formattedName,
          actionDescription: "take score dialog screenshot",
          page,
          screenshotPrefix: "score-screenshot",
        });
      });

      await test.step("Screenshot: proclaim emperor", async () => {
        type GoToSubMenuAction = ReturnType<typeof goToSubmenu>;

        await retryWithRecovery({
          async action() {
            // we need to do this one directly since there's no easy way to
            // get to it other than collecting all the crowns:
            const successShowProclaimEmperor = await dispatchToStore(page, {
              type: "gameMenus/goToSubmenu",
              payload: "proclaimEmperor",
            } satisfies GoToSubMenuAction);

            if (!successShowProclaimEmperor) {
              throw new Error(
                "Failed to open proclaim emperor dialog for screenshot",
              );
            }

            console.log(
              `${formattedName} Taking screenshot for dialog: ${chalk.cyan("proclaimEmperor")}`,
            );
            await takeScreenshot(
              page,
              `proclaimEmperor${filenameSuffix}`,
              formattedName,
              uncolourised,
            );
          },
          logHeader: formattedName,
          actionDescription: "take proclaimEmperor dialog screenshot",
          page,
          screenshotPrefix: "proclaimEmperor-screenshot",
        });
      });

      console.log(`${formattedName}: ✓ Captured in game dialogs`);
    });
  });
}
