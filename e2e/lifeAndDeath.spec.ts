import { expect } from "@playwright/test";

import { type ItemInPlay } from "../src/model/ItemInPlay";
import { advanceUntilInPage } from "./testUtils/advanceGameTime";
import {
  clickCheat,
  dispatchKeyPress,
  holdKeysForDuration,
  loseAllLives,
  loseOneLife,
} from "./testUtils/gameInteractions";
import {
  captureE2eCursor,
  getCurrentRoomId,
  waitForCharacterToBecome,
  waitForPlayableAlive,
  waitForPlayableGrounded,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

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

    // switch to heels. A dying character is not swopped away from, so the
    // respawn from the last death has to have played out first
    await waitForPlayableAlive(page);
    const afterSwopToHeelsId = await captureE2eCursor(page);
    await dispatchKeyPress(page, "Enter", "Enter");
    await waitForCharacterToBecome(page, "heels", afterSwopToHeelsId);

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
    // wait for the room change to land rather than guessing a delay:
    await page.waitForFunction(() => {
      const state = window._e2e_gamePageGameAi?.gameState;
      return (
        state?.characterRooms[state.currentCharacterName]?.id ===
        "penitentiary22"
      );
    });
    await openButton.click();
    await cheatsMenu.waitFor({ state: "hidden" });

    await clickCheat(page, "cheats-summon-character-head");

    // head has to fall onto heels, which takes game time:
    await advanceUntilInPage(
      page,
      () => {
        const state = window._e2e_gamePageGameAi?.gameState;
        if (!state) {
          return false;
        }
        const room = state.characterRooms[state.currentCharacterName];
        const head = room?.items.head as ItemInPlay<"head">;
        return head?.state.standingOnItemId === "heels";
      },
      "head to stand on heels",
      { stepMs: 250 },
    );

    // switch to symbiosis (head is already resting on heels, per the wait above):
    const afterSymbiosisId = await captureE2eCursor(page);
    await dispatchKeyPress(page, "Enter", "Enter");
    await waitForCharacterToBecome(page, "headOverHeels", afterSymbiosisId);

    // no osSlowness: this is game time now, so it does not depend on how fast
    // the machine runs
    await holdKeysForDuration(
      page,
      [
        { key: "ArrowDown", code: "ArrowDown" },
        { key: "ArrowLeft", code: "ArrowLeft" },
      ],
      1_000,
    );
    // wait for the merged character to come to rest after moving, rather than
    // guessing a settle time:
    await waitForPlayableGrounded(page);

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
    // wait for the fish to be eaten (reincarnation point recorded) rather than
    // guessing a delay:
    await advanceUntilInPage(
      page,
      () =>
        window._e2e_store?.getState().gameInPlay.gameInPlay
          .reincarnationPoint !== undefined,
      "the fish to be eaten",
    );

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
    await page.waitForFunction(() => {
      const state = window._e2e_gamePageGameAi?.gameState;
      return (
        state?.characterRooms[state.currentCharacterName]?.id === "egyptus1"
      );
    });
    await clickCheat(page, "cheats-summon-reincarnation");
    // wait for the fish to be eaten (reincarnation point recorded) rather than
    // guessing a delay:
    await advanceUntilInPage(
      page,
      () =>
        window._e2e_store?.getState().gameInPlay.gameInPlay
          .reincarnationPoint !== undefined,
      "the fish to be eaten",
    );

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
    // wait for the fish to be eaten (reincarnation point recorded) rather than
    // guessing a delay:
    await advanceUntilInPage(
      page,
      () =>
        window._e2e_store?.getState().gameInPlay.gameInPlay
          .reincarnationPoint !== undefined,
      "the fish to be eaten",
    );

    await loseAllLives(page);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await waitForDialog(page, "offerReincarnation");
  });
});
