import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type {
  SpriteOption,
  toggleUserSetting,
} from "../src/store/slices/userSettings/userSettingsSlice";
import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { spriteOptionEquals } from "../src/store/slices/userSettings/spriteOptionEquals";
import { dispatchKeyPress } from "./testUtils/gameInteractions";
import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness, retryWithRecovery } from "./testUtils/infrastructure";
import {
  elapsed,
  formatDuration,
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
  logUpscale,
} from "./testUtils/logging";
import {
  backToMainMenu,
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  navigateToSubmenu,
  openInGameMainMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  enabledSpriteModes,
  roomScreenshotOptions,
  spriteOptionSuffix,
  testTimeout,
} from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";

const takeGameScreenshots = async (
  page: Page,
  effectiveModes: SpriteOption[],
  screenshotPrefix: string,
  formattedName: string,
  projectName: string,
) => {
  const screenshotOpts = roomScreenshotOptions(projectName);
  let currentSpriteOption: SpriteOption | undefined;

  for (const spriteOption of effectiveModes) {
    if (
      currentSpriteOption === undefined ||
      !spriteOptionEquals(currentSpriteOption, spriteOption)
    ) {
      await setSpriteOption(page, formattedName, spriteOption);
    }
    currentSpriteOption = spriteOption;

    const suffix = spriteOptionSuffix(spriteOption);
    const filename = `${screenshotPrefix}${suffix}.png`;
    console.log(
      `${formattedName} ${elapsed()} Taking screenshot: ${chalk.cyan(filename)} ${JSON.stringify(spriteOption)}`,
    );
    const screenshotStart = performance.now();
    await expect
      .configure({ timeout: 15_000 * osSlowness })
      .soft(page)
      .toHaveScreenshot(filename, screenshotOpts);
    console.log(
      `${formattedName} ${elapsed()} ...screenshot took`,
      chalk.yellow(formatDuration(performance.now() - screenshotStart)),
    );
  }
};

test.describe("Settings reflect in game", () => {
  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("Pokes and on-screen controls visible in game", async ({
    page,
  }, testInfo) => {
    const { mainMenuOnly, noUncolourised } = testInfo.project
      .use as ScreenshotTestOptions;
    if (mainMenuOnly) {
      test.skip();
      return;
    }
    test.setTimeout(testTimeout);

    const projectName = testInfo.project.name;
    const formattedName = formatProjectName(projectName);

    const effectiveModes =
      noUncolourised ?
        enabledSpriteModes.filter((m) => !m.uncolourised)
      : enabledSpriteModes;

    forwardBrowserConsoleToNodeConsole(page, formattedName);

    console.log(
      `${formattedName} ${elapsed()} starting settings-reflect-in-game test`,
    );

    // navigate to main menu
    await test.step("Navigate to main menu", async () => {
      await retryWithRecovery({
        async action() {
          await page.goto("/?cheats=1&track=0");
          await waitForDialog(page, "mainMenu", {
            timeout: 5_000 * osSlowness,
          });
        },
        async recovery() {
          await page.reload();
        },
        logHeader: formattedName,
        actionDescription: "navigate to main menu",
        page,
        screenshotPrefix: "settings-initial-nav",
      });
    });

    // enable infinite lives and doughnuts pokes before starting the game
    await test.step("Enable pokes in options", async () => {
      await navigateToSubmenu(page, "options", formattedName);
      await waitForDialog(page, "modernisationOptions");

      console.log(`${formattedName} ${elapsed()}: toggling infinite lives ON`);
      await page.click('[data-menuitem_id="livesModel"]');
      await page.waitForTimeout(300 * osSlowness);

      console.log(
        `${formattedName} ${elapsed()}: toggling infinite doughnuts ON`,
      );
      await page.click('[data-menuitem_id="infiniteDoughnutsPoke"]');
      await page.waitForTimeout(300 * osSlowness);

      await backToMainMenu(page, projectName);
    });

    // start the original campaign
    await test.step("Start original campaign", async () => {
      await clickPlayTheGame(page, formattedName);
      await clickOriginalCampaign(page, formattedName);
      await waitForGameState(page);
      await exitCrownsDialog(page, formattedName);
    });

    await logUpscale(page, formattedName);

    // freeze game for deterministic screenshots
    await test.step("Freeze game for screenshots", async () => {
      await retryWithRecovery({
        async action(attempt) {
          const gameApiFound = await page.evaluate(() => {
            if (window._e2e_gamePageGameAi && window._e2e_pixiApplication) {
              window._e2e_pixiApplication.ticker.maxFPS = 5;
              return true;
            }
            return false;
          });

          type ToggleUserSettingAction = ReturnType<typeof toggleUserSetting>;

          const successSetSpeed = await setZeroGameSpeed(page);

          const successToggleCrtFilter = await dispatchToStore(page, {
            type: "userSettings/toggleUserSetting",
            payload: { path: "displaySettings.crtFilter", value: false },
          } satisfies ToggleUserSettingAction);

          if (!gameApiFound || !successSetSpeed || !successToggleCrtFilter) {
            await page
              .screenshot({
                path: `test-results/settings-freeze-${projectName}-attempt-${attempt}.png`,
                fullPage: true,
              })
              .catch(() => {});
            throw new Error("gameApi not found on window");
          }

          console.log(
            `${formattedName} ${elapsed()}: game frozen at zero speed`,
          );
        },
        async recovery() {
          await page.waitForTimeout(2_000);
        },
        logHeader: formattedName,
        actionDescription: "freeze game for screenshots",
        page,
        screenshotPrefix: `settings-freeze-${projectName}`,
      });
    });

    // first set of screenshots: pokes enabled
    await test.step("Screenshots: pokes enabled", async () => {
      await takeGameScreenshots(
        page,
        effectiveModes,
        "settings-pokes",
        formattedName,
        projectName,
      );
    });

    // open menus and navigate to controls to enable on-screen controls
    await test.step("Enable on-screen controls", async () => {
      await openInGameMainMenu(page, formattedName);
      await navigateToSubmenu(page, "options", formattedName);
      await waitForDialog(page, "modernisationOptions");
      await navigateToSubmenu(page, "controlOptions", formattedName);
      await waitForDialog(page, "controlOptions");

      console.log(
        `${formattedName} ${elapsed()}: toggling on-screen controls ON`,
      );
      await page.click('[data-menuitem_id="onScreenControls"]');
      await page.waitForTimeout(300 * osSlowness);

      await backToMainMenu(page, projectName);
      await dispatchKeyPress(page, "Escape", "Escape");
      await waitForDialog(page, "mainMenu", { state: "detached" });
      await page.waitForTimeout(500 * osSlowness);
    });

    // second set of screenshots: on-screen controls visible
    await test.step("Screenshots: on-screen controls", async () => {
      await takeGameScreenshots(
        page,
        effectiveModes,
        "settings-onScreenControls",
        formattedName,
        projectName,
      );
    });

    console.log(
      `${formattedName} ${elapsed()}: settings-reflect-in-game test complete`,
    );
  });
});
