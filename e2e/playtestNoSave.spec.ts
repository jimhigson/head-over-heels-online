import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import { loadCampaignFromDb } from "../src/db/campaign";
import { compressObject } from "../src/db/compressObject";
import { jimAtBlockstackingUserId } from "../src/gameInfo";
import { dispatchKeyPress } from "./testUtils/gameInteractions";
import {
  getCurrentCharacter,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";

const getSavedGames = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) throw new Error("E2E store not available");
    const { savedGames } = store.getState().gameMenus;
    return {
      saveKeys: Object.keys(savedGames.saves),
      lastSavedCampaignName: savedGames.lastSavedCampaignLocator?.campaignName,
    };
  });

/**
 * Pull the small "swops test" campaign out of supabase and re-package it as
 * the editor's PlayTest URL: `?campaignName=data:<gzip+url-safe-base64>`.
 *
 * Reuses {@link compressObject} from src so the test exercises the actual
 * encoding the app understands. The full original campaign is too large to
 * fit in a query string the local preview server will accept, so a small
 * test campaign is used instead.
 */
const buildPlaytestUrl = async (): Promise<string> => {
  const campaign = await loadCampaignFromDb({
    campaignName: "swops_test",
    userId: jimAtBlockstackingUserId,
  });
  const encoded = await compressObject(campaign);
  const params = new URLSearchParams({
    campaignName: `data:${encoded}`,
    campaignAuthorUserId: "editorUser",
    cheats: "1",
    track: "0",
  });
  return `/?${params.toString()}`;
};

test.describe("playtest mode does not persist saves", () => {
  test.setTimeout(120_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("playing through a data: URL leaves the saves dict untouched", async ({
    page,
  }) => {
    let playtestUrl: string;

    await test.step("Build a data: playtest URL from the swops test campaign", async () => {
      playtestUrl = await buildPlaytestUrl();
      expect(playtestUrl).toContain("campaignName=data%3A");
    });

    await test.step("Navigate to the playtest URL and wait for game state", async () => {
      await page.goto(playtestUrl);
      await waitForGameState(page);
    });

    await test.step("Playtest skips the crowns intro", async () => {
      expect(await page.locator('[data-dialog-id="crowns"]').count()).toBe(0);
    });

    await test.step("Press Enter to swop characters (would normally write a save)", async () => {
      // swopPlayables always dispatches dispatchSaveGame; in playtest mode
      // that helper checks isInPlaytestMode() and no-ops.
      const startCharacter = await getCurrentCharacter(page);
      await dispatchKeyPress(page, "Enter", "Enter");
      await page.waitForTimeout(500 * osSlowness);
      expect(await getCurrentCharacter(page)).not.toBe(startCharacter);
    });

    await test.step("Saves dict stays empty after playtest interactions", async () => {
      const savesAfterPlaytest = await getSavedGames(page);
      expect(savesAfterPlaytest.saveKeys).toEqual([]);
      expect(savesAfterPlaytest.lastSavedCampaignName).toBeUndefined();
    });
  });
});
