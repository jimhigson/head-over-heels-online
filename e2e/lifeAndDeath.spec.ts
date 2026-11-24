import { expect, type Page } from "@playwright/test";

import type { ItemInPlay } from "../src/model/ItemInPlay";
import type { Campaign } from "../src/model/modelTypes";
import type { RoomJson } from "../src/model/RoomJson";
import { advanceUntil, advanceUntilInPage } from "./testUtils/advanceGameTime";
import { bootPlaytestCampaign } from "./testUtils/bootPlaytestCampaign";
import {
  clickCheat,
  dispatchKeyPress,
  holdKeysForDuration,
  loseAllLives,
  loseOneLife,
} from "./testUtils/gameInteractions";
import {
  getCurrentRoomId,
  snapshotE2eCursor,
  waitForCharacterToBecome,
  waitForPlayableAlive,
  waitForPlayableGrounded,
} from "./testUtils/gameStateQueries";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { osSlowness } from "./testUtils/osSlowness";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

/**
 * head and heels side by side, each with a monster heading towards,
 * both loose a life with a short time gap between
 */
const twoDeathsRoom = {
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    floor: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    },
    wT: {
      type: "wall",
      config: {
        direction: "towards",
        tiles: [
          "plain",
          "plain",
          "armour",
          "shield",
          "shield",
          "armour",
          "plain",
          "plain",
        ],
      },
      position: { x: 0, y: 0, z: 0 },
    },
    wR: {
      type: "wall",
      config: {
        direction: "right",
        tiles: [
          "plain",
          "plain",
          "armour",
          "shield",
          "shield",
          "armour",
          "plain",
          "plain",
        ],
      },
      position: { x: 0, y: 0, z: 0 },
    },
    wA: {
      type: "wall",
      config: {
        direction: "away",
        tiles: [
          "plain",
          "plain",
          "armour",
          "shield",
          "shield",
          "armour",
          "plain",
          "plain",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
    },
    wL: {
      type: "wall",
      config: {
        direction: "left",
        tiles: [
          "plain",
          "plain",
          "armour",
          "shield",
          "shield",
          "armour",
          "plain",
          "plain",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
    },
    heels: {
      type: "player",
      config: { which: "heels" },
      position: { x: 5, y: 3, z: 0 },
    },
    head: {
      type: "player",
      config: { which: "head" },
      position: { x: 5, y: 4, z: 0 },
    },
    m: {
      type: "monster",
      config: {
        which: "skiHead",
        style: "greenAndPink",
        activated: "on",
        movement: "back-forth",
        startDirection: "left",
      },
      position: { x: 2, y: 4, z: 0 },
    },
    m1: {
      type: "monster",
      config: {
        which: "skiHead",
        style: "greenAndPink",
        activated: "on",
        movement: "back-forth",
        startDirection: "left",
      },
      position: { x: 1.875, y: 3, z: 0 },
    },
  },
} satisfies RoomJson<"twoDeaths", string, "blacktooth">;

const twoDeathsCampaign: Campaign<"twoDeaths"> = {
  locator: { campaignName: "two-deaths", userId: "e2e", version: -1 },
  rooms: { twoDeaths: twoDeathsRoom },
};

/**
 * the characters named by the death dialogs open, top first
 */
const openDeathDialogs = (page: Page) =>
  page.evaluate(() =>
    window
      ._e2e_store!.getState()
      .gameMenus.openMenus.flatMap((openMenu) =>
        openMenu.menuId === "death" ?
          [openMenu.menuParam.dyingCharacterName]
        : [],
      ),
  );

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
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 7 left after respawn, Heels 8
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 6
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 5
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 4
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 3
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 2
      `UH-OH!
Head lost a life
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 1
      `UH-OH!
Head lost a life
Heels will donate 2 lives
so Head can continue with 1
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 1, Heels 8
      `UH-OH!
Head lost a life
Heels will donate 2 lives
so Head can continue with 1
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 1, Heels 6
      `UH-OH!
Head lost a life
Heels will donate 2 lives
so Head can continue with 1
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 1, Heels 4
      `UH-OH!
Head lost a life
Heels will donate 1 life
so Head can continue with 1
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 1, Heels 2
      `UH-OH!
Head lost a life
Head is out of the game
Heels will carry on alone
${mobile ? "Tap screen to continue as Heels" : "Press JUMP to continue as Heels:\nSpace\n🕹A"}`, // Head 1, Heels 1
      `UH-OH!
Heels lost a life
Game over
${mobile ? "Tap screen to continue" : "Press JUMP to continue:\nSpace\n🕹A"}`, // Heels 1, Head 0 - game over
    ]);
    await waitForDialog(page, "score");
  });

  test("both characters dying together shows a death dialog for each", async ({
    page,
  }) => {
    await bootPlaytestCampaign(page, twoDeathsCampaign, null);

    expect(
      await advanceUntil(
        page,
        async () => (await openDeathDialogs(page)).length > 0,
        // the monsters reach the characters about 70ms apart, so one step
        // takes in both deaths before the first dialog pauses the game:
        { stepMs: 2_000 },
      ),
    ).toBe(true);
    const deathMessage = page.locator(
      '[data-dialog-id="death"] [data-test-id="death-lost-life-message"]',
    );
    // both died before the first dialog froze the game:
    expect(await openDeathDialogs(page)).toEqual(["head", "heels"]);
    await expect(deathMessage).toHaveText("Head lost a life");

    await dispatchKeyPress(page, " ", "Space");

    // dismissing the first leaves the second for its own dismissal:
    expect(await openDeathDialogs(page)).toEqual(["heels"]);
    await expect(deathMessage).toHaveText("Heels lost a life");
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
    const afterSwopToHeelsId = await snapshotE2eCursor(page);
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
    const afterSymbiosisId = await snapshotE2eCursor(page);
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
      `UH-OH!
Head and Heels lost a life each
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // lives as they die: Head 6, Heels 10
      `UH-OH!
Head and Heels lost a life each
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 5, Heels 9
      `UH-OH!
Head and Heels lost a life each
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 4, Heels 8
      `UH-OH!
Head and Heels lost a life each
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 3, Heels 7
      `UH-OH!
Head and Heels lost a life each
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 2, Heels 6
      `UH-OH!
Head and Heels lost a life each
Heels will donate 2 lives
so Head can continue with 1
${mobile ? "Tap screen to respawn" : "Press JUMP to respawn:\nSpace\n🕹A"}`, // Head 1, Heels 5
      `UH-OH!
Head and Heels lost a life each
Heels is out of the game
Head will carry on alone
${mobile ? "Tap screen to continue as Head" : "Press JUMP to continue as Head:\nSpace\n🕹A"}`, // Head 1, Heels 2: Heels donates one, then loses its last
      `UH-OH!
Head lost a life
Game over
${mobile ? "Tap screen to continue" : "Press JUMP to continue:\nSpace\n🕹A"}`, // Head 1, Heels 0
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
