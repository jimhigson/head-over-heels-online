import { expect, test } from "@playwright/test";

import {
  clickCheat,
  dispatchKeyPress,
  holdKeysForDuration,
  loseAllLives,
  loseOneLife,
} from "./testUtils/gameInteractions";
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

  test("death dialog messages for individuals", async ({ page }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    const mobile = testInfo.project.name.includes("mobile");
    const messages = await loseAllLives(page);
    expect(messages).toEqual([
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 7 lives left after respawn, heels 8
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 6 lives left after respawn
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 5 lives left after respawn
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 4 lives left after respawn
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 3 lives left after respawn
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 2 lives left after respawn
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 1 life left after respawn
      `Uh-oh!Heels will donate 2 livesso Head can continue with 1${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 1, heels 8
      `Uh-oh!Heels will donate 2 livesso Head can continue with 1${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 1, heels 6
      `Uh-oh!Heels will donate 2 livesso Head can continue with 1${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 1, heels 4
      `Uh-oh!Heels will donate 1 lifeso Head can continue with 1${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //head 1, heels 2
      `Uh-oh!Head out of the gameHeels will carry on alone${mobile ? "Tap screento continue as Heels" : "Press JUMP to continue as Heels:Space🕹A"}`, //head 1, heels 1
      `Uh-oh!Game over${mobile ? "Tap screento continue" : "Press JUMP to continue:Space🕹A"}`, //heels 1, head 0 - game over
    ]);
    await waitForDialog(page, "score");
  });

  test("death dialog messages for headOverHeels", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await loseOneLife(page);
    await loseOneLife(page);

    // switch to heels
    await dispatchKeyPress(page, "Enter", "Enter");
    const openButton = page.locator('[data-test-id="cheats-open-button"]');
    const cheatsMenu = page.locator('[data-test-id="cheats-menu"]');
    if (!(await cheatsMenu.isVisible())) {
      await openButton.click();
      await cheatsMenu.waitFor({ state: "visible" });
    }
    await cheatsMenu.locator("button:has-text('⬇')").first().click();
    const roomItem = page.locator(
      '[data-test-id="room-select-penitentiary22"]',
    );
    await roomItem.scrollIntoViewIfNeeded();
    await roomItem.click();
    await page.waitForTimeout(1000 * osSlowness);
    await openButton.click();
    await cheatsMenu.waitFor({ state: "hidden" });
    await page.waitForTimeout(1000 * osSlowness);

    await clickCheat(page, "cheats-summon-character-head");
    await page.waitForTimeout(1000 * osSlowness);

    await page.waitForFunction(
      () => {
        const state = window._e2e_gamePageGameAi?.gameState;
        if (!state) {
          return false;
        }
        const room = state.characterRooms[state.currentCharacterName];
        const head = room?.items.head;
        return head?.state.standingOnItemId === "heels";
      },
      undefined,
      { timeout: 15_000 * osSlowness },
    );

    await page.waitForTimeout(3000);

    // switch to symbiosis:
    await dispatchKeyPress(page, "Enter", "Enter");
    await page.waitForFunction(
      () =>
        window._e2e_gamePageGameAi?.gameState.currentCharacterName ===
        "headOverHeels",
      undefined,
      { timeout: 5000 * osSlowness },
    );

    await holdKeysForDuration(
      page,
      ["ArrowDown", "ArrowLeft"],
      1000 * osSlowness,
    );
    await page.waitForTimeout(10_000 * osSlowness);

    const mobile = testInfo.project.name.includes("mobile");
    const messages = await loseAllLives(page);
    expect(messages).toEqual([
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 6, Heels 8
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 5, Heels 7
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 4, Heels 6
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 3, Heels 5
      `Uh-oh!${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 2, Heels 4
      `Uh-oh!Heels will donate 2 livesso Head can continue with 1${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 1, Heels 3
      `Uh-oh!Heels will donate 1 lifeso Head can continue with 1${mobile ? "Tap screento respawn" : "Press JUMP to respawn:Space🕹A"}`, //Head 1, Heels 2
      `Uh-oh!Game over${mobile ? "Tap screento continue" : "Press JUMP to continue:Space🕹A"}`, //Head 1, Heels 1 - game over
    ]);
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
    await page.waitForTimeout(2000 * osSlowness);

    await loseAllLives(page);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "offerReincarnation");

    await page.click('[data-menuitem_id="donotreincarnate"]');
    await waitForDialog(page, "mainMenu");
  });

  test("original - eat fish, die, choose 'reincarnate' -> back to room", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await clickCheat(page, "cheats-goto-room-egyptus1");
    await page.waitForTimeout(1000 * osSlowness);
    await clickCheat(page, "cheats-summon-reincarnation");
    await page.waitForTimeout(2000 * osSlowness);

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
    await page.waitForTimeout(2000 * osSlowness);

    await loseAllLives(page);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "offerReincarnation");
  });
});
