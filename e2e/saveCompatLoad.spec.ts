import { expect } from "@playwright/test";

import {
  waitForAnyRoomToRender,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  collectPageErrors,
  listSaveFixtures,
  seedCapturedLocalStorage,
} from "./testUtils/saveFixtures";
import { test } from "./testUtils/test";

/**
 * proves the current version can load save games written by previous
 * versions: for every committed fixture in e2e/fixtures/saves/v<NN>/ (the
 * library grown per-release by saveCompatCapture.spec.ts), seed the old
 * version's localStorage, boot the game, and require:
 *
 *  - no error dialog
 *  - no console errors or uncaught page errors
 *  - the game restored into the room the save was made in
 */

const fixtures = listSaveFixtures();

test.describe("save games from previous versions load in the current version", () => {
  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  for (const { versionDir, fixture } of fixtures) {
    test(`${versionDir} save in ${fixture.roomId} loads without error`, async ({
      page,
    }) => {
      test.setTimeout(60_000 * osSlowness);

      const pageErrors = collectPageErrors(page);

      await seedCapturedLocalStorage(page, fixture.localStorage);
      await page.goto("/?track=0");

      // throws if the error dialog is shown instead of the game starting:
      await waitForGameState(page);

      // errors from the loaded rooms (eg a renderer choking on an old format)
      // often only throw once their item gets a frame, not during the load
      // itself - and every item is drawn every frame, so a single drawn frame
      // of the restored room has already exercised all of them:
      await waitForAnyRoomToRender(page);
      if ((await page.locator('[data-dialog-id="errorCaught"]').count()) > 0) {
        const errorReport = await page
          .locator('[data-test-id="error-report"]')
          .textContent()
          .catch(() => "(could not read the error report)");
        throw new Error(`error dialog shown after loading:\n${errorReport}`);
      }

      const restoredRoomId = await page.evaluate(() => {
        const { gameState } = window._e2e_gamePageGameAi!;
        return gameState.characterRooms[gameState.currentCharacterName]
          ?.roomJson.id;
      });
      expect(restoredRoomId).toBe(fixture.roomId);

      expect(pageErrors).toEqual([]);
    });
  }
});
