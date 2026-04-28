import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import type { CharacterName } from "../src/model/modelTypes";

import { clickCheat, dispatchKeyPress } from "./testUtils/gameInteractions";
import {
  getCurrentCharacter,
  getCurrentRoomId,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  navigateToSubmenu,
  openInGameMainMenu,
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

type PlayerSnapshot = {
  character: CharacterName;
  room: string;
  lives: number;
};

/**
 * Snapshot the live (mutable) gameState — current character, that
 * character's room, and the player item's lives count. Lives live on
 * the in-room player item's `state` (not in the redux store), so this
 * reads via the engine's `_e2e_gamePageGameAi.gameState` hook.
 */
const getPlayerSnapshot = (page: Page): Promise<PlayerSnapshot> =>
  page.evaluate(() => {
    const gameState = window._e2e_gamePageGameAi?.gameState;
    if (!gameState) throw new Error("gameState not available");
    const character = gameState.currentCharacterName;
    const room = gameState.characterRooms[character]?.id;
    if (room === undefined) {
      throw new Error(`no room for current character ${character}`);
    }
    const playerItem = gameState.characterRooms[character]?.items[character];
    const lives = (playerItem as { state: { lives?: number } } | undefined)
      ?.state?.lives;
    if (lives === undefined) {
      throw new Error(`no lives on player item for ${character}`);
    }
    return { character, room, lives };
  });

/**
 * Open the score dialog via main menu → "View progress", read the
 * `data-rooms-explored` attribute, and back out to the game by Escaping
 * through the [score, crowns, mainMenu] stack.
 */
const readRoomsExploredCount = async (
  page: Page,
  formattedName: string,
): Promise<number> => {
  await openInGameMainMenu(page, formattedName);
  await navigateToSubmenu(page, "viewCrowns", formattedName);
  await waitForDialog(page, "score");

  const attr = await page
    .locator('[data-test-id="rooms-explored-summary"]')
    .getAttribute("data-rooms-explored");
  if (attr === null) {
    throw new Error("[data-rooms-explored] attribute missing on score dialog");
  }
  const count = parseInt(attr, 10);

  // Escape until no dialog is showing. Only the top dialog is in the DOM
  // at any time, so we keep popping until `[data-dialog-id]` matches
  // nothing.
  for (let i = 0; i < 5; i++) {
    if ((await page.locator("[data-dialog-id]").count()) === 0) {
      break;
    }
    await dispatchKeyPress(page, "Escape", "Escape");
    await page.waitForTimeout(300 * osSlowness);
  }
  return count;
};

const swopCharacters = async (page: Page) => {
  await dispatchKeyPress(page, "Enter", "Enter");
  await page.waitForTimeout(500 * osSlowness);
};

test.describe("reincarnation points stack across multiple fish", () => {
  test.setTimeout(120_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("eating fish in A → B → C as different characters with extra lives, then reincarnating pops back through C → B → A restoring character/room/lives", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    let snapshotAtFishA: PlayerSnapshot;
    let snapshotAtFishB: PlayerSnapshot;
    let snapshotAtFishC: PlayerSnapshot;

    await test.step("Swop to heels, go to room A (egyptus1), summon extra life, eat fish", async () => {
      await swopCharacters(page);
      expect(await getCurrentCharacter(page)).toBe("heels");
      await clickCheat(page, "cheats-goto-room-egyptus1");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("egyptus1");
      await clickCheat(page, "cheats-summon-extra-life");
      await page.waitForTimeout(1_500 * osSlowness);
      await clickCheat(page, "cheats-summon-reincarnation");
      await page.waitForTimeout(2_000 * osSlowness);
      snapshotAtFishA = await getPlayerSnapshot(page);
      expect(snapshotAtFishA.character).toBe("heels");
      expect(snapshotAtFishA.room).toBe("egyptus1");
    });

    let roomsExploredAtFishA: number;
    await test.step("Capture rooms-explored count at fish-A snapshot", async () => {
      roomsExploredAtFishA = await readRoomsExploredCount(page, formattedName);
    });

    await test.step("Swop to head, go to room B (moonbase1), summon extra life, eat fish", async () => {
      await swopCharacters(page);
      expect(await getCurrentCharacter(page)).toBe("head");
      await clickCheat(page, "cheats-goto-room-moonbase1");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("moonbase1");
      await clickCheat(page, "cheats-summon-extra-life");
      await page.waitForTimeout(1_500 * osSlowness);
      await clickCheat(page, "cheats-summon-reincarnation");
      await page.waitForTimeout(2_000 * osSlowness);
      snapshotAtFishB = await getPlayerSnapshot(page);
      expect(snapshotAtFishB.character).toBe("head");
      expect(snapshotAtFishB.room).toBe("moonbase1");
    });

    await test.step("Swop to heels, go to room C (penitentiary1), summon extra life, eat fish", async () => {
      await swopCharacters(page);
      expect(await getCurrentCharacter(page)).toBe("heels");
      await clickCheat(page, "cheats-goto-room-penitentiary1");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("penitentiary1");
      await clickCheat(page, "cheats-summon-extra-life");
      await page.waitForTimeout(1_500 * osSlowness);
      await clickCheat(page, "cheats-summon-reincarnation");
      await page.waitForTimeout(2_000 * osSlowness);
      snapshotAtFishC = await getPlayerSnapshot(page);
      expect(snapshotAtFishC.character).toBe("heels");
      expect(snapshotAtFishC.room).toBe("penitentiary1");
    });

    await test.step("Swop to head and walk to room D (safari1) — no fish here", async () => {
      await swopCharacters(page);
      await clickCheat(page, "cheats-goto-room-safari1");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("safari1");
    });

    const reincarnateViaQuitMenu = async () => {
      await openInGameMainMenu(page, formattedName);
      await navigateToSubmenu(page, "quitGame", formattedName);
      await waitForDialog(page, "quitGameConfirm");
      await navigateToSubmenu(page, "reincarnate", formattedName);
      await waitForDialog(page, "reincarnatedRestart");
      await page.click('[data-dialog-id="reincarnatedRestart"]');
      await waitForDialog(page, "reincarnatedRestart", { state: "detached" });
    };

    await test.step("Pop 1: restored to fish-C state (heels in penitentiary1, lives match)", async () => {
      await reincarnateViaQuitMenu();
      expect(await getPlayerSnapshot(page)).toEqual(snapshotAtFishC);
    });

    await test.step("Pop 2: restored to fish-B state (head in moonbase1, lives match)", async () => {
      await reincarnateViaQuitMenu();
      expect(await getPlayerSnapshot(page)).toEqual(snapshotAtFishB);
    });

    await test.step("Pop 3: restored to fish-A state (heels in egyptus1, lives match)", async () => {
      await reincarnateViaQuitMenu();
      expect(await getPlayerSnapshot(page)).toEqual(snapshotAtFishA);
    });

    await test.step("rooms-explored count rolled back to fish-A snapshot value", async () => {
      // pure stack pop: the rooms walked through after eating fish A
      // (B, C, D) should no longer be in roomsExplored.
      const roomsExploredAfterAllPops = await readRoomsExploredCount(
        page,
        formattedName,
      );
      expect(roomsExploredAfterAllPops).toBe(roomsExploredAtFishA);
    });
  });
});
