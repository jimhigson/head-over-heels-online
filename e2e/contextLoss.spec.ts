import { expect, test } from "@playwright/test";

import {
  getCurrentRoomId,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import {
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
} from "./testUtils/logging";
import { startCampaignViaMenu } from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

test.describe("recovery from WebGL context loss", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }, testInfo) => {
    forwardBrowserConsoleToNodeConsole(
      page,
      formatProjectName(testInfo.project.name),
    );
    await setupE2ePage(page);
  });

  test("game reloads the page and resumes the same room after the context is lost", async ({
    page,
  }, testInfo) => {
    // WEBGL_lose_context behaviour is browser-specific; we verify on chromium:
    test.skip(
      !testInfo.project.name.includes("chromium"),
      "context-loss reproduction is only exercised on chromium",
    );

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await waitForGameState(page);

    const roomBeforeLoss = await getCurrentRoomId(page);

    // marker that only survives until the page reloads:
    await page.evaluate(() => {
      (window as unknown as { __preReloadMarker?: true }).__preReloadMarker =
        true;
    });

    // force a context loss the way a player would: via the cheats panel button:
    await page.locator('[data-test-id="cheats-open-button"]').click();
    await page
      .locator('[data-test-id="cheats-menu"]')
      .waitFor({ state: "visible" });
    await page.click('[data-test-id="cheats-lose-gl-context"]');

    // recovery reloads the whole page; the marker is gone once it has:
    await page.waitForFunction(
      () =>
        (window as unknown as { __preReloadMarker?: true })
          .__preReloadMarker === undefined,
      undefined,
      { timeout: 15_000 * osSlowness },
    );

    // the game saved before reloading, so it resumes in the same room:
    await waitForGameState(page);
    expect(await getCurrentRoomId(page)).toBe(roomBeforeLoss);

    // give the rebooted scene a moment to render before capturing:
    await page.waitForTimeout(1000 * osSlowness);
    await page.screenshot({
      path: testInfo.outputPath("game-after-context-loss.png"),
    });
  });
});
