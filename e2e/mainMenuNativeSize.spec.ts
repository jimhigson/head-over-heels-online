import { devices, type Page, test } from "@playwright/test";

import { type toggleUserSetting } from "../src/store/slices/userSettings/userSettingsSlice";
import { dispatchToStore } from "./testUtils/gameStateQueries";
import { osSlowness, retryWithRecovery } from "./testUtils/infrastructure";
import {
  elapsed,
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
  logUpscale,
} from "./testUtils/logging";
import { waitForDialog } from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  enabledSpriteModes,
  takeDialogScreenshot,
  testTimeout,
} from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";

/**
 * The device each project emulates, as playwright.config.ts names it.
 *
 * The config spreads these and then replaces the viewport with a small fixed
 * one, so that the game upscales by exactly two and the snapshots stay both
 * tiny and identical across platforms. That is the right trade for the
 * hundreds of snapshots the other specs take - but it means nothing in the
 * suite shows the menu at a size anyone actually has, which is what this
 * spec is for. The names are repeated rather than exported from the config so
 * that adding this could not disturb how the projects themselves are built.
 */
const projectDevices = {
  "chromium-desktop": "Desktop Chrome",
  "firefox-desktop": "Desktop Firefox",
  "webkit-desktop": "Desktop Safari",
  "mobile-chrome": "Pixel 5 landscape",
  "mobile-safari": "iPhone 12 Pro Max landscape",
} as const satisfies { [projectName: string]: keyof typeof devices };

const isKnownProject = (name: string): name is keyof typeof projectDevices =>
  name in projectDevices;

/**
 * Turn the smoothed sprites on.
 *
 * Not `enableSmoothSprites`, which waits for a pixi sprite to be drawing from
 * an upscaled sheet - there is no running game at the main menu for that ever
 * to become true of. What this test needs is the html side, which it waits
 * for below.
 */
const setSmoothSprites = (page: Page) =>
  dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "displaySettings.smoothSprites", value: true },
  } satisfies ReturnType<typeof toggleUserSetting>);

/**
 * One screenshot per browser of the main menu at that browser's own device
 * size, so the upscale is whatever the game picks for a real window rather
 * than the two the other specs pin it to.
 *
 * Only the browser deployment, and only the first sprite option: this is here
 * to show the rendering at a plausible size, and every combination of
 * deployment and sprites is already covered at the fixed size elsewhere.
 *
 * The device's pixel ratio is deliberately left alone. It can only be set
 * when the context is made, which would mean a project per browser, and a
 * ratio above one brings back the css scaling differences between platforms
 * that the fixed-size projects were set up to avoid.
 */
test.describe("Main menu at each browser's own size", () => {
  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("Main menu at the device's own viewport", async ({ page }, testInfo) => {
    const [spriteOption] = enabledSpriteModes;
    if (!isKnownProject(testInfo.project.name) || spriteOption === undefined) {
      test.skip();
      return;
    }
    test.setTimeout(testTimeout);

    const formattedName = formatProjectName(testInfo.project.name);
    forwardBrowserConsoleToNodeConsole(page, formattedName);

    const { viewport } = devices[projectDevices[testInfo.project.name]];
    await page.setViewportSize(viewport);

    await test.step(`Navigate to home page at ${viewport.width}x${viewport.height}`, async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName} ${elapsed()}: Navigating to / at the device's own ${viewport.width}x${viewport.height}`,
          );
          await page.goto("/?track=0&deployment=browser");
          await waitForDialog(page, "mainMenu", {
            timeout: 5_000 * osSlowness,
          });
          await page.waitForTimeout(500);
        },
        async recovery() {
          await page.reload();
        },
        logHeader: formattedName,
        actionDescription: "navigate at the device's own viewport",
        page,
        screenshotPrefix: "native-size-navigation",
      });
    });

    await logUpscale(page, formattedName);

    await test.step(`set sprite option to ${JSON.stringify(spriteOption)}`, async () => {
      await setSpriteOption(page, formattedName, spriteOption);
    });

    // the whole point of drawing at a real size is to see the upscaled sprites
    // and text, which are off by default - the game is authentically blocky
    // until asked otherwise
    await test.step("turn smooth sprites on", async () => {
      await setSmoothSprites(page);
      // swapping in the smoothed font and spritesheets is asynchronous, so
      // wait for them to be in place rather than for a guessed length of time
      await page
        .waitForFunction(
          () =>
            [...document.fonts].some(
              (f) => f.family === "HeadOverHeelsSmooth",
            ) && document.body.classList.contains("antialiased"),
          undefined,
          { timeout: 15_000 * osSlowness },
        )
        .catch(() => {
          throw new Error("the smoothed ui assets never came in");
        });
      console.log(`${formattedName} ${elapsed()}: smooth ui in place`);
    });

    await takeDialogScreenshot(
      page,
      "mainMenu",
      formattedName,
      "-nativeSize-smooth",
      spriteOption,
      testInfo.project.name,
    );
  });
});
