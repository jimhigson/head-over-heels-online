import { expect, test } from "@playwright/test";

import {
  getPlayableZ,
  waitForPlayableGrounded,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { startCampaignViaMenu } from "./testUtils/menuNavigation";
import {
  enableOnScreenControls,
  withOnScreenButtonHeld,
} from "./testUtils/onScreenControls";
import { setupE2ePage } from "./testUtils/pageSetup";

test.describe("on-screen control buttons drive the game in touch mode", () => {
  test.setTimeout(120_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("pressing the jump button makes the playable leave the ground", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await enableOnScreenControls(page);

    await waitForPlayableGrounded(page);
    // grounded on the start room floor, which is at z=0
    expect(await getPlayableZ(page)).toBe(0);

    await withOnScreenButtonHeld(page, "jump", async () => {
      await expect
        .poll(() => getPlayableZ(page), { timeout: 5000 * osSlowness })
        .toBeGreaterThan(0);
    });
  });

  test("pressing the menu button opens the in-game main menu", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await enableOnScreenControls(page);

    await withOnScreenButtonHeld(page, "menu", async () => {
      await expect(page.locator('[data-dialog-id="mainMenu"]')).toBeVisible();
    });
  });

  test("pressing the map button opens the map", async ({ page }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await enableOnScreenControls(page);

    await withOnScreenButtonHeld(page, "map", async () => {
      await expect(page.locator('[data-dialog-id="map"]')).toBeVisible();
    });
  });
});
