import { deploymentTypes } from "../src/utils/detectEnv/detectDeploymentType";
import { type ScreenshotTestOptions } from "./ScreenshotTestOptions";
import { elapsed, formatProjectName, logUpscale } from "./testUtils/logging";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  openInGameMainMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  enabledSpritesheets,
  spritesheetFileLabel,
  takeDialogScreenshot,
  testTimeout,
} from "./testUtils/screenshots";
import { setSpritesheet } from "./testUtils/setSpritesheet";
import { test } from "./testUtils/test";

for (const spritesheetName of enabledSpritesheets) {
  test.describe(`Menu Visual Snapshots ${JSON.stringify(spritesheetName)}`, () => {
    test.beforeEach(async ({ page }) => {
      await setupE2ePage(page);
    });

    for (const deploymentType of deploymentTypes) {
      test(`Main menu (deploymentType = ${deploymentType}) ${JSON.stringify(spritesheetName)}`, async ({
        page,
      }, testInfo) => {
        const { noUncolourised } = testInfo.project
          .use as ScreenshotTestOptions;
        const isMobile = testInfo.project.name.startsWith("mobile-");
        if (
          (spritesheetName === "speccy" && noUncolourised) ||
          // currently not providing a tauri build on mobile (but could in future):
          (isMobile && deploymentType === "tauri")
        ) {
          test.skip();
          return;
        }
        test.setTimeout(testTimeout);

        const formattedName = formatProjectName(testInfo.project.name);

        await test.step("Navigate to home page with deployment override and wait for main menu", async () => {
          console.log(
            `${formattedName} ${elapsed()}: Navigating to / with deployment=${deploymentType}`,
          );
          await page.goto(`/?track=0&deployment=${deploymentType}`);
          await waitForDialog(page, "mainMenu");
        });

        await logUpscale(page, formattedName);

        const nameSegment = spritesheetFileLabel(spritesheetName) || null;

        await test.step(`set sprite option to ${JSON.stringify(spritesheetName)}`, async () => {
          await setSpritesheet(page, formattedName, spritesheetName);
        });

        await takeDialogScreenshot(
          page,
          "mainMenu",
          formattedName,
          [deploymentType, nameSegment],
          spritesheetName,
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
          spritesheetName,
          testInfo.project.name,
        );
      });
    }
  });
}
