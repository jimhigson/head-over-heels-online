import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import { dispatchKeyPress } from "./testUtils/gameInteractions";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  backToMainMenu,
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  navigateToSubmenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

/**
 * Hold a key down for a duration before releasing — needed for movement
 * since {@link dispatchKeyPress} only holds for ~100ms.
 */
const holdKey = async (
  page: Page,
  key: string,
  code: string,
  durationMs: number,
) => {
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, code }));
    },
    { key, code },
  );
  await page.waitForTimeout(durationMs);
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key, code }));
    },
    { key, code },
  );
};

const getTowardsKeys = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) throw new Error("E2E store not available");
    const { inputAssignment } = store.getState().gameMenus.userSettings;
    if (!inputAssignment) throw new Error("inputAssignment not yet populated");
    return inputAssignment.presses.towards.keys;
  });

const navigateToControlOptions = async (page: Page, formattedName: string) => {
  await navigateToSubmenu(page, "options", formattedName);
  await waitForDialog(page, "modernisationOptions");
  await navigateToSubmenu(page, "controlOptions", formattedName);
  await waitForDialog(page, "controlOptions");
};

const startOriginalAndExitCrowns = async (
  page: Page,
  formattedName: string,
) => {
  await clickPlayTheGame(page, formattedName);
  await clickOriginalCampaign(page, formattedName);
  await exitCrownsDialog(page, formattedName);
  await waitForDialog(page, "crowns", { state: "detached" });
};

/**
 * Walk the player south from the spawn point in blacktooth1head onto the
 * scroll pickup at (3, 0, 0). Holds the supplied "towards" key long enough
 * for the player to cross the ~2.5 squares of distance.
 */
const walkOntoStartingScroll = async (
  page: Page,
  towardsKey: string,
  towardsCode: string,
) => {
  // give the game a beat to start running before dispatching keys
  await page.waitForTimeout(500 * osSlowness);

  await holdKey(page, towardsKey, towardsCode, 4_000 * osSlowness);

  await waitForDialog(page, "markdown/cuddlyStuffedWhiteRabbits", {
    timeout: 10_000 * osSlowness,
  });

  // scrolls have no focusable menu items — exit with Escape
  await dispatchKeyPress(page, "Escape", "Escape");
  await waitForDialog(page, "markdown/cuddlyStuffedWhiteRabbits", {
    state: "detached",
    timeout: 5_000 * osSlowness,
  });
};

test.describe("key rebinding and scroll pickup", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("rebind down to a custom key, then walk south onto a scroll using it", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await test.step("Boot game and reach Control Options", async () => {
      await page.goto("/?cheats=1&track=0");
      await waitForDialog(page, "mainMenu");
      await navigateToControlOptions(page, formattedName);
    });

    await test.step("Rebind down to '6' via the assignment UI", async () => {
      await navigateToSubmenu(page, "down", formattedName);
      await dispatchKeyPress(page, "6", "Digit6");
      await page.waitForTimeout(200 * osSlowness);
      await dispatchKeyPress(page, "Escape", "Escape");
      await page.waitForTimeout(200 * osSlowness);

      // a custom rebind replaces the action's key list outright
      expect(await getTowardsKeys(page)).toEqual(["6"]);
    });

    await test.step("Return to main menu and start original campaign", async () => {
      await backToMainMenu(page, testInfo.project.name);
      await waitForDialog(page, "mainMenu");
      await startOriginalAndExitCrowns(page, formattedName);
    });

    await test.step("Hold '6' to walk onto the scroll, dismiss it", async () => {
      await walkOntoStartingScroll(page, "6", "Digit6");
    });
  });

  test("switch to ZX Spec preset, then walk south onto a scroll using its keys", async ({
    page,
  }, testInfo) => {
    const formattedName = formatProjectName(testInfo.project.name);

    await test.step("Boot game and reach Control Options", async () => {
      await page.goto("/?cheats=1&track=0");
      await waitForDialog(page, "mainMenu");
      await navigateToControlOptions(page, formattedName);
    });

    await test.step("Choose the ZX Spec preset", async () => {
      await navigateToSubmenu(page, "preset", formattedName);
      await waitForDialog(page, "inputPreset");
      await navigateToSubmenu(page, "ZX Spec", formattedName);

      // ZX Spec layers its A/8 keys on top of standardKeyAssignment which
      // contributes ArrowDown — combineInputAssignments unions them in
      // reduce-right order, so towards ends up with [A, 8, ArrowDown].
      expect(await getTowardsKeys(page)).toEqual(["A", "8", "ArrowDown"]);
    });

    await test.step("Return to main menu and start original campaign", async () => {
      await backToMainMenu(page, testInfo.project.name);
      await waitForDialog(page, "mainMenu");
      await startOriginalAndExitCrowns(page, formattedName);
    });

    await test.step("Hold '8' (preset-only key) to walk onto the scroll, dismiss it", async () => {
      // "8" is unique to the ZX Spec preset for towards, so using it proves
      // the new binding actually applies in-game.
      await walkOntoStartingScroll(page, "8", "Digit8");
    });
  });
});
