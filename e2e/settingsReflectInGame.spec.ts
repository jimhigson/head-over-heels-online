import { expect, type Page } from "@playwright/test";
import chalk from "chalk";

import { spriteOptionEquals } from "../src/store/slices/userSettings/spriteOptionEquals";
import {
  type SpriteOption,
  type toggleUserSetting,
} from "../src/store/slices/userSettings/userSettingsSlice";
import { type ScreenshotTestOptions } from "./ScreenshotTestOptions";
import { dispatchKeyPress } from "./testUtils/gameInteractions";
import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForAnimationFrames,
  waitForGameReady,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import {
  elapsed,
  formatDuration,
  formatProjectName,
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
import { test } from "./testUtils/test";

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

    console.log(
      `${formattedName} ${elapsed()} starting settings-reflect-in-game test`,
    );

    // navigate to main menu
    await test.step("Navigate to main menu", async () => {
      await page.goto("/?cheats=1&track=0");
      await waitForDialog(page, "mainMenu");
    });

    // enable infinite lives and doughnuts pokes before starting the game
    await test.step("Enable pokes in options", async () => {
      await navigateToSubmenu(page, "options", formattedName);
      await waitForDialog(page, "modernisationOptions");

      console.log(`${formattedName} ${elapsed()}: toggling infinite lives ON`);
      await page.click('[data-menuitem_id="livesModel"]');

      console.log(
        `${formattedName} ${elapsed()}: toggling infinite doughnuts ON`,
      );
      await page.click('[data-menuitem_id="infiniteDoughnutsPoke"]');

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
      // wait until the game is actually ready before freezing it, rather than
      // retrying until the api appears:
      await waitForGameReady(page);

      type ToggleUserSettingAction = ReturnType<typeof toggleUserSetting>;

      const successSetSpeed = await setZeroGameSpeed(page);
      const successToggleCrtFilter = await dispatchToStore(page, {
        type: "userSettings/toggleUserSetting",
        payload: { path: "displaySettings.crtFilter", value: false },
      } satisfies ToggleUserSettingAction);

      if (!successSetSpeed || !successToggleCrtFilter) {
        throw new Error("could not set zero game speed / toggle crt filter");
      }

      console.log(`${formattedName} ${elapsed()}: game frozen at zero speed`);
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

      await backToMainMenu(page, projectName);
      await dispatchKeyPress(page, "Escape", "Escape");
      await waitForDialog(page, "mainMenu", { state: "detached" });

      // let the HUD rebuild over a few render frames after the on-screen-controls
      // toggle (the game renders every frame even while frozen at zero speed, so
      // this settles deterministically rather than on a fixed wall-clock delay).
      // The toggle flips whatever the platform default is - controls default on
      // for mobile, off for desktop - so this captures the post-toggle state
      // either way; the screenshots below are soft:
      await waitForAnimationFrames(page, 5);
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
