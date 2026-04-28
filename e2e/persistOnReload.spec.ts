import { expect, test } from "@playwright/test";

import { jimAtBlockstackingUserId } from "../src/gameInfo";
import {
  clickCheat,
  dismissHoldAfterReload,
  dispatchKeyPress,
} from "./testUtils/gameInteractions";
import {
  getCurrentCharacter,
  getCurrentRoomId,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  backToMainMenu,
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  navigateToSubmenu,
  openInGameMainMenu,
  setSkinViaMenus,
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

test.describe("persistence across reload", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("original - switch to heels, change room, reload -> same room, paused", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await page.waitForTimeout(1_000 * osSlowness);
    await dispatchKeyPress(page, "Enter", "Enter");
    await page.waitForTimeout(500 * osSlowness);
    expect(await getCurrentCharacter(page)).toBe("heels");

    await clickCheat(page, "cheats-goto-room-egyptus1");
    await page.waitForTimeout(1_000 * osSlowness);
    expect(await getCurrentRoomId(page)).toBe("egyptus1");

    await page.reload();
    await waitForGameState(page);
    expect(await getCurrentCharacter(page)).toBe("heels");
    expect(await getCurrentRoomId(page)).toBe("egyptus1");
  });

  test("sequel - switch character, change room, reload -> same room, paused", async ({
    page,
  }, testInfo) => {
    await startCampaignViaMenu(page, testInfo.project.name, "remake");

    await page.waitForTimeout(1_000 * osSlowness);
    const startCharacter = await getCurrentCharacter(page);
    await dispatchKeyPress(page, "Enter", "Enter");
    await page.waitForTimeout(500 * osSlowness);
    const otherCharacter = await getCurrentCharacter(page);
    expect(otherCharacter).not.toBe(startCharacter);

    await clickCheat(page, "cheats-goto-room-finalroom");
    await page.waitForTimeout(1_000 * osSlowness);
    const roomBeforeReload = await getCurrentRoomId(page);

    await page.reload();
    await waitForGameState(page);

    expect(await getCurrentCharacter(page)).toBe(otherCharacter);
    expect(await getCurrentRoomId(page)).toBe(roomBeforeReload);
  });

  test("toppy spritesheet survives reload mid-game", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await page.goto("/?cheats=1&track=0");
    await page.locator('[data-dialog-id="mainMenu"]').waitFor();
    await setSkinViaMenus(page, testInfo.project.name, "Toppy");

    await backToMainMenu(page, testInfo.project.name);

    await clickPlayTheGame(page, formattedName);
    await clickOriginalCampaign(page, formattedName);
    await exitCrownsDialog(page, formattedName);
    await page
      .locator('[data-dialog-id="crowns"]')
      .waitFor({ state: "detached" });

    await page.waitForTimeout(1_000 * osSlowness);
    await page.reload();
    await waitForGameState(page);

    const skinName = await page.evaluate(() => {
      const store = window._e2e_store;
      if (!store) return undefined;
      return store.getState().gameMenus.userSettings.displaySettings.sprites
        ?.name;
    });
    expect(skinName).toBe("Toppy");
  });

  test("original - get egyptus crown, reload, view progress -> highlighted", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    await page.waitForTimeout(1_000 * osSlowness);
    await clickCheat(page, "cheats-summon-crown-egyptus");
    await waitForDialog(page, "crowns");
    await expect(
      page.locator('[data-test-id="crown-egyptus"]'),
    ).toHaveAttribute("data-collected", "true");
    await expect(
      page.locator('[data-test-id="crown-blacktooth"]'),
    ).toHaveAttribute("data-collected", "false");
    await exitCrownsDialog(page, formattedName);
    await page
      .locator('[data-dialog-id="crowns"]')
      .waitFor({ state: "detached" });

    await page.reload();
    await waitForGameState(page);
    await dismissHoldAfterReload(page);

    await openInGameMainMenu(page, formattedName);
    await navigateToSubmenu(page, "viewCrowns", formattedName);
    await waitForDialog(page, "score");
    await page.click('[data-dialog-id="score"]');
    await page
      .locator('[data-dialog-id="score"]')
      .waitFor({ state: "detached" });
    await waitForDialog(page, "crowns");

    await expect(
      page.locator('[data-test-id="crown-egyptus"]'),
    ).toHaveAttribute("data-collected", "true");
    await expect(
      page.locator('[data-test-id="crown-blacktooth"]'),
    ).toHaveAttribute("data-collected", "false");
  });

  test("campaign in URL - switch character, reload -> same campaign+character", async ({
    page,
  }) => {
    const url = `/?cheats=1&track=0&campaignName=sequel&campaignAuthorUserId=${jimAtBlockstackingUserId}`;
    await page.goto(url);
    await waitForGameState(page);
    await dismissHoldAfterReload(page);

    const startCharacter = await getCurrentCharacter(page);
    await dispatchKeyPress(page, "Enter", "Enter");
    await page.waitForTimeout(500 * osSlowness);
    const expectedCharacter = await getCurrentCharacter(page);
    expect(expectedCharacter).not.toBe(startCharacter);

    await page.reload();
    await waitForGameState(page);
    await dismissHoldAfterReload(page);

    expect(await getCurrentCharacter(page)).toBe(expectedCharacter);
    const campaignName = await page.evaluate(
      () =>
        window._e2e_store?.getState().gameMenus.gameInPlay.campaignLocator
          ?.campaignName,
    );
    expect(campaignName).toBe("sequel");
  });

  test("campaign URL dropped on reload - state still restored", async ({
    page,
  }) => {
    const url = `/?cheats=1&track=0&campaignName=sequel&campaignAuthorUserId=${jimAtBlockstackingUserId}`;
    await page.goto(url);
    await waitForGameState(page);
    await dismissHoldAfterReload(page);

    await dispatchKeyPress(page, "Enter", "Enter");
    await page.waitForTimeout(500 * osSlowness);
    const expectedCharacter = await getCurrentCharacter(page);

    // strip the campaign params - persisted state should still restore
    await page.goto("/?cheats=1&track=0");
    await waitForGameState(page);
    await dismissHoldAfterReload(page);

    expect(await getCurrentCharacter(page)).toBe(expectedCharacter);
    const campaignName = await page.evaluate(
      () =>
        window._e2e_store?.getState().gameMenus.gameInPlay.campaignLocator
          ?.campaignName,
    );
    expect(campaignName).toBe("sequel");
  });

  test("reincarnation point set in one room survives reload from another, then takes player back", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await test.step("Start original campaign", async () => {
      await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
    });

    await test.step("Move to a second room before eating the fish", async () => {
      await clickCheat(page, "cheats-goto-room-egyptus1");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("egyptus1");
    });

    let fishRoom: string | undefined;
    await test.step("Eat a reincarnation fish; saveGameThunk fires on pickup", async () => {
      await clickCheat(page, "cheats-summon-reincarnation");
      await page.waitForTimeout(2_000 * osSlowness);
      fishRoom = await getCurrentRoomId(page);
      expect(fishRoom).toBe("egyptus1");
    });

    await test.step("Jump to a different planet (Penitentiary)", async () => {
      await clickCheat(page, "cheats-goto-room-penitentiary1");
      await page.waitForTimeout(1_000 * osSlowness);
      expect(await getCurrentRoomId(page)).toBe("penitentiary1");
    });

    await test.step("Reload and dismiss the hold dialog", async () => {
      await page.reload();
      await waitForGameState(page);
      await dismissHoldAfterReload(page);
    });

    // The reincarnationPoint surviving rehydrate is verified end-to-end by
    // the next step finding the Reincarnate menu item (only rendered when
    // hasReincarnationPoint is true), and the step after that landing in
    // the right room.
    await test.step("Open in-game main menu → quitGameConfirm → Reincarnate", async () => {
      await openInGameMainMenu(page, formattedName);
      await navigateToSubmenu(page, "quitGame", formattedName);
      await waitForDialog(page, "quitGameConfirm");
      await navigateToSubmenu(page, "reincarnate", formattedName);
      await waitForDialog(page, "reincarnatedRestart");
      await page.click('[data-dialog-id="reincarnatedRestart"]');
      await waitForDialog(page, "reincarnatedRestart", { state: "detached" });
    });

    await test.step("Player is back at the fish room, not the room before reload", async () => {
      expect(await getCurrentRoomId(page)).toBe(fishRoom);
    });
  });
});
