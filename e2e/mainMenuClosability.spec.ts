import { expect } from "@playwright/test";

import { dispatchKeyPress } from "./testUtils/gameInteractions";
import { waitForAnimationFrames } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

test.describe("main menu closability", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("boot main menu does not close on Escape (no game to return to)", async ({
    page,
  }) => {
    await test.step("Boot game and wait for main menu", async () => {
      await page.goto("/?cheats=1&track=0");
      await waitForDialog(page, "mainMenu");
    });

    await test.step("Press Escape; main menu must remain visible", async () => {
      await dispatchKeyPress(page, "Escape", "Escape");
      // let the game loop tick so any (incorrect) close would have happened,
      // then assert the menu is still there:
      await waitForAnimationFrames(page);
      await expect(page.locator('[data-dialog-id="mainMenu"]')).toBeVisible();
    });
  });

  test("in-game main menu opens on Escape and closes on Escape", async ({
    page,
  }, testInfo) => {
    await test.step("Start original campaign", async () => {
      await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    });

    await test.step("Press Escape — main menu opens", async () => {
      await dispatchKeyPress(page, "Escape", "Escape");
      await waitForDialog(page, "mainMenu");
    });

    await test.step("Press Escape again — main menu closes", async () => {
      // let a tick pass so the input tracker releases the previous Escape tap
      // before the next press counts as a fresh tap
      await waitForAnimationFrames(page);
      await dispatchKeyPress(page, "Escape", "Escape");
      await waitForDialog(page, "mainMenu", { state: "detached" });
    });
  });
});
