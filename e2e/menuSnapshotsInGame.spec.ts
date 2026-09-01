import chalk from "chalk";

import { type goToSubmenu } from "../src/store/slices/gameMenus/gameMenusSlice";
import { type ScreenshotTestOptions } from "./ScreenshotTestOptions";
import { dispatchKeyPress } from "./testUtils/gameInteractions";
import { dispatchToStore } from "./testUtils/gameStateQueries";
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
  enabledSpriteModes,
  spriteOptionSuffix,
  takeScreenshot,
  testTimeout,
} from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";
import { test } from "./testUtils/test";

for (const spriteOption of enabledSpriteModes) {
  test.describe(`Menu Visual Snapshots ${JSON.stringify(spriteOption)}`, () => {
    test.beforeEach(async ({ page }) => {
      await setupE2ePage(page);
    });

    test(`Snapshot in game dialogs ${JSON.stringify(spriteOption)}`, async ({
      page,
    }, testInfo) => {
      const { mainMenuOnly, noUncolourised } = testInfo.project
        .use as ScreenshotTestOptions;
      if (mainMenuOnly || (spriteOption.uncolourised && noUncolourised)) {
        test.skip();
        return;
      }
      test.setTimeout(testTimeout);

      const formattedName = formatProjectName(testInfo.project.name);

      console.log(
        `${formattedName} ${elapsed()} starting in game dialogs snapshot test`,
      );

      await test.step("Navigate to home page and wait for main menu", async () => {
        console.log(`${formattedName} ${elapsed()}: Navigating to /`);
        await page.goto("/?track=0");
        // the main menu opens automatically once loaded
        await waitForDialog(page, "mainMenu");
      });

      await logUpscale(page, formattedName);

      await test.step(`set sprite option to ${JSON.stringify(spriteOption)}`, async () => {
        await setSpriteOption(page, formattedName, spriteOption);
      });

      await clickPlayTheGame(page, formattedName);
      await clickOriginalCampaign(page, formattedName);

      await test.step("Screenshot: crowns", async () => {
        console.log(`${formattedName} ${elapsed()}: Waiting for crowns dialog`);
        // waitForDialog also waits for the LOADING banner (role=status) to leave
        await waitForDialog(page, "crowns");
        console.log(
          `${formattedName} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan("crowns")}`,
        );
        await takeScreenshot(
          page,
          `crowns${spriteOptionSuffix(spriteOption)}`,
          formattedName,
          spriteOption,
          testInfo.project.name,
        );
      });

      await exitCrownsDialog(page, formattedName);

      await test.step("Open map dialog", async () => {
        console.log(
          `${formattedName} ${elapsed()}: Clicking canvas and pressing M to open map`,
        );
        // focus the game canvas so the key reaches the game, then open the map
        await page.locator("canvas").first().click();
        await dispatchKeyPress(page, "m", "KeyM");
        await waitForDialog(page, "map");
      });

      await test.step("Screenshot: map", async () => {
        console.log(
          `${formattedName} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan("map")}`,
        );
        await takeScreenshot(
          page,
          `map${spriteOptionSuffix(spriteOption)}`,
          formattedName,
          spriteOption,
          testInfo.project.name,
        );
      });

      await test.step("Exit map dialog", async () => {
        console.log(
          `${formattedName} ${elapsed()}: Pressing Escape to exit map`,
        );
        await dispatchKeyPress(page, "Escape", "Escape");
        await waitForDialog(page, "map", { state: "detached" });
      });

      await test.step("Open hold dialog", async () => {
        console.log(
          `${formattedName} ${elapsed()}: Clicking canvas and pressing P to open hold`,
        );
        await page.locator("canvas").first().click();
        await dispatchKeyPress(page, "p", "KeyP");
        await waitForDialog(page, "hold");
      });

      await test.step("Screenshot: hold", async () => {
        console.log(
          `${formattedName} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan("hold")}`,
        );
        await takeScreenshot(
          page,
          `hold${spriteOptionSuffix(spriteOption)}`,
          formattedName,
          spriteOption,
          testInfo.project.name,
        );
      });

      await test.step("Exit hold dialog", async () => {
        console.log(`${formattedName} ${elapsed()}: Pressing P to exit hold`);
        await dispatchKeyPress(page, "p", "KeyP");
        await waitForDialog(page, "hold", { state: "detached" });
      });

      await openInGameMainMenu(page, formattedName);

      await test.step("Screenshot: main-inGame", async () => {
        console.log(
          `${formattedName} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan("main-inGame")}`,
        );
        await takeScreenshot(
          page,
          `main-inGame${spriteOptionSuffix(spriteOption)}`,
          formattedName,
          spriteOption,
          testInfo.project.name,
        );
      });

      await test.step("Click progress so far", async () => {
        console.log(`${formattedName} ${elapsed()}: Clicking progress so far`);
        await page.click("[data-menuitem_id=viewCrowns]");
        await waitForDialog(page, "score");
      });

      await test.step("Screenshot: score", async () => {
        console.log(
          `${formattedName} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan("score")}`,
        );
        await takeScreenshot(
          page,
          `score${spriteOptionSuffix(spriteOption)}`,
          formattedName,
          spriteOption,
          testInfo.project.name,
        );
      });

      await test.step("Screenshot: proclaim emperor", async () => {
        type GoToSubMenuAction = ReturnType<typeof goToSubmenu>;

        // no easy way to reach this other than collecting all the crowns, so
        // dispatch the navigation directly:
        const shownProclaimEmperor = await dispatchToStore(page, {
          type: "gameMenus/goToSubmenu",
          payload: "proclaimEmperor",
        } satisfies GoToSubMenuAction);

        if (!shownProclaimEmperor) {
          throw new Error(
            "Failed to open proclaim emperor dialog for screenshot",
          );
        }

        await waitForDialog(page, "proclaimEmperor");

        console.log(
          `${formattedName} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan("proclaimEmperor")}`,
        );
        await takeScreenshot(
          page,
          `proclaimEmperor${spriteOptionSuffix(spriteOption)}`,
          formattedName,
          spriteOption,
          testInfo.project.name,
        );
      });

      console.log(`${formattedName} ${elapsed()}: ✓ Captured in game dialogs`);
    });
  });
}
