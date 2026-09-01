import { expect, type Page } from "@playwright/test";

import {
  dispatchKeyPress,
  holdKeysUntil,
  waitForAssigningInput,
} from "./testUtils/gameInteractions";
import { waitForCurrentPlayable } from "./testUtils/gameStateQueries";
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
import { test } from "./testUtils/test";

const getTowardsKeys = (page: Page) =>
  page.evaluate(() => {
    const store = window._e2e_store;
    if (!store) {
      throw new Error("E2E store not available");
    }
    const { inputAssignment } = store.getState().userSettings.userSettings;
    if (!inputAssignment) {
      throw new Error("inputAssignment not yet populated");
    }
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
 * scroll pickup at (3, 0, 0), by holding the supplied "towards" key until the
 * scroll opens - which is also what proves the key is bound to walking south.
 */
const walkOntoStartingScroll = async (
  page: Page,
  towardsKey: string,
  towardsCode: string,
) => {
  // wait until a character is controllable before dispatching movement keys
  await waitForCurrentPlayable(page);

  // walk until the scroll is reached, rather than for a guessed duration - and
  // in game time, so it walks the same distance on every machine:
  const scroll = page.locator(
    '[data-dialog-id="markdown/cuddlyStuffedWhiteRabbits"]',
  );
  await holdKeysUntil(page, [{ key: towardsKey, code: towardsCode }], () =>
    scroll.isVisible(),
  );

  // scrolls have no focusable menu items — exit with Escape
  await dispatchKeyPress(page, "Escape", "Escape");
  await waitForDialog(page, "markdown/cuddlyStuffedWhiteRabbits", {
    state: "detached",
    timeout: 5_000 * osSlowness,
  });
};

test.describe("key rebinding and scroll pickup", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes("mobile"),
      "key rebinding less relevant on mobile",
    );
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
      await waitForAssigningInput(page);
      await dispatchKeyPress(page, "6", "Digit6");
      await dispatchKeyPress(page, "Escape", "Escape");
      // wait for the rebind to land in the store rather than guessing a delay:
      await page.waitForFunction(() => {
        const { inputAssignment } =
          window._e2e_store?.getState().userSettings.userSettings ?? {};
        return (
          inputAssignment?.presses.towards.keys.length === 1 &&
          inputAssignment.presses.towards.keys[0] === "6"
        );
      });

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
