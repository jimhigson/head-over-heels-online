import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import { clickCheat, loseAllLives } from "./testUtils/gameInteractions";
import { osSlowness } from "./testUtils/infrastructure";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

/**
 * Read the snapshot of saves from the in-page redux store. Returns the keys
 * of {@link savedGames.saves} so tests can assert against the set of stored
 * campaigns without depending on the canonicalised key encoding.
 */
const getSaveKeys = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) throw new Error("E2E store not available");
    return Object.keys(store.getState().gameMenus.savedGames.saves);
  });

const getLastSavedCampaignName = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) throw new Error("E2E store not available");
    return store.getState().gameMenus.savedGames.lastSavedCampaignLocator
      ?.campaignName;
  });

test.describe("save lifecycle around game over", () => {
  test.setTimeout(120_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("dying with no reincarnation removes the campaign's save", async ({
    page,
  }, testInfo) => {
    await test.step("Start original campaign and force a save", async () => {
      await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
      // changing room dispatches a save, ensuring one exists before game-over
      await clickCheat(page, "cheats-goto-room-egyptus1");
      await page.waitForTimeout(1_000 * osSlowness);
    });

    await test.step("Confirm a save was written for the original campaign", async () => {
      expect(await getSaveKeys(page)).toHaveLength(1);
      expect(await getLastSavedCampaignName(page)).toBe("original");
    });

    await test.step("Lose all lives and wait for the score dialog", async () => {
      await loseAllLives(page);
      await waitForDialog(page, "score");
    });

    await test.step("Save and lastSavedCampaignLocator are cleared", async () => {
      expect(await getSaveKeys(page)).toEqual([]);
      expect(await getLastSavedCampaignName(page)).toBeUndefined();
    });
  });
});
