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

  test("game remounts on a fresh canvas and keeps rendering after the context is lost", async ({
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
    const generationBeforeLoss = await page.evaluate(
      () => window._e2e_store!.getState().glContext.generation,
    );

    // force a context loss the way a player would: via the cheats panel button:
    const cheatsOpenButton = page.locator(
      '[data-test-id="cheats-open-button"]',
    );
    await cheatsOpenButton.click();
    await page
      .locator('[data-test-id="cheats-menu"]')
      .waitFor({ state: "visible" });
    await page.click('[data-test-id="cheats-lose-gl-context"]');

    // the loss bumps the generation, which remounts the game area; wait for the
    // new game api to come up on the fresh canvas:
    await page.waitForFunction(
      (previousGeneration) =>
        window._e2e_store!.getState().glContext.generation > previousGeneration,
      generationBeforeLoss,
    );
    await waitForGameState(page);

    expect(
      await page.evaluate(
        () => window._e2e_store!.getState().glContext.generation,
      ),
    ).toBe(generationBeforeLoss + 1);
    // the game saved before remounting, so the player resumes the same room:
    expect(await getCurrentRoomId(page)).toBe(roomBeforeLoss);

    // give the rebuilt scene a moment to render before capturing:
    await page.waitForTimeout(1000 * osSlowness);
    await page.screenshot({
      path: testInfo.outputPath("game-after-context-loss.png"),
    });
  });
});
