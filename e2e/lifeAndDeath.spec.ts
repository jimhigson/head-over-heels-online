import { expect, test } from "@playwright/test";

import { clickCheat, loseAllLives } from "./testUtils/gameInteractions";
import { getCurrentRoomId } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

test.describe("life and death flows", () => {
  test.setTimeout(120_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("original game - die with no reincarnation -> score dialog", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await loseAllLives(page);
    await waitForDialog(page, "score");
  });

  test("original - eat fish, die, choose 'stay dead' -> main menu", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await clickCheat(page, "cheats-summon-reincarnation");
    await page.waitForTimeout(2_000 * osSlowness);

    await loseAllLives(page);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "offerReincarnation");

    await page.click('[data-menuitem_id="donotreincarnate"]');
    // BUG: score dialog shown a second time here — player already saw it before offerReincarnation
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "mainMenu");
  });

  test("original - eat fish, die, choose 'reincarnate' -> back to room", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await clickCheat(page, "cheats-goto-room-egyptus1");
    await page.waitForTimeout(1_000 * osSlowness);
    await clickCheat(page, "cheats-summon-reincarnation");
    await page.waitForTimeout(2_000 * osSlowness);

    await loseAllLives(page);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "offerReincarnation");

    await page.click('[data-menuitem_id="reincarnate"]');
    await waitForDialog(page, "reincarnatedRestart");
    await page.click('[data-dialog-id="reincarnatedRestart"]');
    await page
      .locator('[data-dialog-id="reincarnatedRestart"]')
      .waitFor({ state: "detached" });

    expect(await getCurrentRoomId(page)).toBe("egyptus1");
  });

  test("sequel - eat fish, die -> offerReincarnation dialog", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "remake");
    await clickCheat(page, "cheats-summon-reincarnation");
    await page.waitForTimeout(2_000 * osSlowness);

    await loseAllLives(page);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "offerReincarnation");
  });
});
