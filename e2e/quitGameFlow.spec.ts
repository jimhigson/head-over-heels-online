import { expect } from "@playwright/test";

import { clickCheat, dispatchKeyPress } from "./testUtils/gameInteractions";
import { getCurrentRoomId } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  navigateToSubmenu,
  openInGameMainMenu,
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

test.describe("quit-game flow from in-game main menu", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("with reincarnation fish - reincarnate from quit dialog returns to fish room", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await test.step("Eat a reincarnation fish to set the reincarnation point", async () => {
      await clickCheat(page, "cheats-summon-reincarnation");
      // wait for the fish to actually be eaten - ie the reincarnation point is
      // recorded in the store - rather than guessing how long that takes:
      await page.waitForFunction(
        () =>
          window._e2e_store?.getState().gameInPlay.gameInPlay
            .reincarnationPoint !== undefined,
      );
    });

    const fishRoom = await getCurrentRoomId(page);
    expect(fishRoom).toBeDefined();

    await test.step("Move to a different room", async () => {
      await clickCheat(page, "cheats-goto-room-egyptus1");
      // wait for the room change to land rather than guessing a delay:
      await page.waitForFunction(() => {
        const state = window._e2e_gamePageGameAi?.gameState;
        return (
          state?.characterRooms[state.currentCharacterName]?.id === "egyptus1"
        );
      });
      expect(await getCurrentRoomId(page)).toBe("egyptus1");
    });

    await test.step("Open quit dialog from in-game main menu", async () => {
      await openInGameMainMenu(page, formattedName);
      await navigateToSubmenu(page, "quitGame", formattedName);
      await waitForDialog(page, "quitGameConfirm");
    });

    await test.step("Choose Reincarnate from the quit dialog", async () => {
      await navigateToSubmenu(page, "reincarnate", formattedName);
      await waitForDialog(page, "reincarnatedRestart");
      await page.click('[data-dialog-id="reincarnatedRestart"]');
      await waitForDialog(page, "reincarnatedRestart", { state: "detached" });
    });

    await test.step("Player is back in the room where the fish was eaten", async () => {
      expect(await getCurrentRoomId(page)).toBe(fishRoom);
    });
  });

  test("without reincarnation fish - End game shows score then mainMenu", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await test.step("Open quit dialog from in-game main menu", async () => {
      await openInGameMainMenu(page, formattedName);
      await navigateToSubmenu(page, "quitGame", formattedName);
      await waitForDialog(page, "quitGameConfirm");
    });

    await test.step("Confirm End game", async () => {
      await navigateToSubmenu(page, "yes", formattedName);
    });

    await test.step("Score dialog appears, dismissable to mainMenu", async () => {
      await waitForDialog(page, "score");
      await page.click('[data-dialog-id="score"]');
      await waitForDialog(page, "mainMenu");
    });
  });

  test("decline to quit returns to mainMenu, then Escape returns to the game", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

    await test.step("Open quit dialog from in-game main menu", async () => {
      await openInGameMainMenu(page, formattedName);
      await navigateToSubmenu(page, "quitGame", formattedName);
      await waitForDialog(page, "quitGameConfirm");
    });

    await test.step("Click Back to dismiss the quit dialog", async () => {
      await navigateToSubmenu(page, "no", formattedName);
      await waitForDialog(page, "quitGameConfirm", { state: "detached" });
      await waitForDialog(page, "mainMenu");
    });

    await test.step("Press Escape to close mainMenu and return to the game", async () => {
      await dispatchKeyPress(page, "Escape", "Escape");
      await waitForDialog(page, "mainMenu", { state: "detached" });
    });
  });
});
