import { test } from "@playwright/test";

import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { deploymentTypes } from "../src/utils/detectEnv/detectDeploymentType";
import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { logSelectorExistence } from "./logSelectorExistence";
import { logUpscale } from "./logUpscale";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  enabledSpriteModes,
  exitCrownsDialog,
  openInGameMainMenu,
  spriteOptionName,
  takeDialogScreenshot,
  testTimeout,
} from "./menuSnapshotUtils";
import { osSlowness } from "./osSlowness";
import { elapsed, formatProjectName } from "./projectName";
import { retryWithRecovery } from "./retryWithRecovery";
import { setSpriteOption } from "./setSpriteOption";

for (const spriteOption of enabledSpriteModes) {
  test.describe(`Menu Visual Snapshots ${JSON.stringify(spriteOption)}`, () => {
    for (const deploymentType of deploymentTypes) {
      test(`Main menu (deploymentType = ${deploymentType}) ${JSON.stringify(spriteOption)}`, async ({
        page,
      }, testInfo) => {
        const { noUncolourised } = testInfo.project
          .use as ScreenshotTestOptions;
        const isMobile = testInfo.project.name.startsWith("mobile-");
        if (
          (spriteOption.uncolourised && noUncolourised) ||
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
                `${formattedName} ${elapsed()}: Navigating to / with deployment=${deploymentType}`,
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
                `${formattedName} ${elapsed()}: Retrying navigation with page reload`,
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

        const nameSegment = spriteOptionName(spriteOption) || null;

        await test.step(`set sprite option to ${JSON.stringify(spriteOption)}`, async () => {
          await setSpriteOption(page, formattedName, spriteOption);
        });

        await takeDialogScreenshot(
          page,
          "mainMenu",
          formattedName,
          [deploymentType, nameSegment],
          spriteOption,
          testInfo.project.name,
        );

        await clickPlayTheGame(page, formattedName);
        await clickOriginalCampaign(page, formattedName);
        await exitCrownsDialog(page, formattedName);
        await openInGameMainMenu(page, formattedName);

        await takeDialogScreenshot(
          page,
          "mainMenu",
          formattedName,
          [deploymentType, "inGame", nameSegment],
          spriteOption,
          testInfo.project.name,
        );
      });
    }
  });
}
