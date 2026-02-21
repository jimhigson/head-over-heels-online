import { test } from "@playwright/test";

import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { deploymentTypes } from "../src/utils/detectEnv/detectDeploymentType";
import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { logSelectorExistence } from "./logSelectorExistence";
import { logUpscale } from "./logUpscale";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  colourisedModes,
  exitCrownsDialog,
  openInGameMainMenu,
  takeDialogScreenshot,
  testTimeout,
} from "./menuSnapshotUtils";
import { osSlowness } from "./osSlowness";
import { formatProjectName } from "./projectName";
import { retryWithRecovery } from "./retryWithRecovery";
import { setIsUncolourised } from "./setIsUncolourised";

for (const { uncolourised } of colourisedModes) {
  test.describe("Menu Visual Snapshots", () => {
    for (const deploymentType of deploymentTypes) {
      test(`Main menu (deploymentType = ${deploymentType}, uncolourised = ${uncolourised})`, async ({
        page,
      }, testInfo) => {
        const { noUncolourised } = testInfo.project
          .use as ScreenshotTestOptions;
        const isMobile = testInfo.project.name.startsWith("mobile-");
        if (
          (uncolourised && noUncolourised) ||
          // currently not providing a tauri build on mobile (but could in future):
          (isMobile && deploymentType === "tauri")
        ) {
          test.skip();
          return;
        }
        test.setTimeout(testTimeout);

        const formattedName = formatProjectName(testInfo.project.name);

        forwardBrowserConsoleToNodeConsole(page, formattedName);

        await test.step("Navigate to home page with deployment override and wait for main menu", async () => {
          await retryWithRecovery({
            async action() {
              console.log(
                `${formattedName}: Navigating to / with deployment=${deploymentType}`,
              );
              await page.goto(`/?track=0&deployment=${deploymentType}`);

              const mainMenuSelector = "[data-dialog-id=mainMenu]";
              await page.waitForSelector(mainMenuSelector, {
                timeout: 5_000 * osSlowness,
              });
              await logSelectorExistence(page, mainMenuSelector, formattedName);

              await page.waitForTimeout(500);
            },
            async recovery() {
              console.log(
                `${formattedName}: Retrying navigation with page reload`,
              );
              await page.reload();
            },
            logHeader: formattedName,
            actionDescription: `navigate with deployment=${deploymentType}`,
            page,
            screenshotPrefix: `${deploymentType}-navigation`,
          });
        });

        await logUpscale(page, formattedName);

        await test.step(`set uncolourised user setting to ${uncolourised}`, async () => {
          await setIsUncolourised(page, formattedName, uncolourised);
        });

        await takeDialogScreenshot(
          page,
          "mainMenu",
          formattedName,
          [deploymentType, uncolourised ? "uncolourised" : null],
          uncolourised,
        );

        await clickPlayTheGame(page, formattedName);
        await clickOriginalCampaign(page, formattedName);
        await exitCrownsDialog(page, formattedName);
        await openInGameMainMenu(page, formattedName);

        await takeDialogScreenshot(
          page,
          "mainMenu",
          formattedName,
          [deploymentType, "inGame", uncolourised ? "uncolourised" : null],
          uncolourised,
        );
      });
    }
  });
}
