import { expect, test } from "@playwright/test";

import {
  setZeroGameSpeed,
  waitForGameState,
} from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { formatProjectName } from "./testUtils/logging";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
  navigateToSubmenu,
  openInGameMainMenu,
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

test.setTimeout(120_000 * osSlowness);

/**
 * Protects against a regression in a bug where the game would not be rendered
 * correctly after quitting a game and starting another one without reloading the page.
 *
 * Not browser-specific, so it runs on a single browser to avoid per-browser
 * baselines.
 */
test("game renders correctly after quitting and starting another game", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "single-browser regression test",
  );

  const formattedName = formatProjectName(testInfo.project.name);
  await setupE2ePage(page);

  // first game:
  await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

  // quit it, back to the main menu:
  await openInGameMainMenu(page, formattedName);
  await navigateToSubmenu(page, "quitGame", formattedName);
  await waitForDialog(page, "quitGameConfirm");
  await navigateToSubmenu(page, "yes", formattedName);
  await waitForDialog(page, "score");
  await page.click('[data-dialog-id="score"]');
  await waitForDialog(page, "mainMenu");

  // start another game without reloading the page, so the (now stale)
  // SpritesheetVariants from the first game is reused on the second game's fresh
  // renderer - the situation that used to blank the HUD text. The bug is about
  // the app being torn down and recreated, not which campaign, so we restart the
  // original campaign (the sequel needs the DB, which isn't always reachable):
  await clickPlayTheGame(page, formattedName);
  await clickOriginalCampaign(page, formattedName);
  await waitForGameState(page);
  await exitCrownsDialog(page, formattedName);

  // freeze the game for a deterministic frame:
  await setZeroGameSpeed(page);
  await page.waitForTimeout(1000 * osSlowness);

  // compare the bottom HUD strip - it holds the baked text/number glyphs and
  // excludes the animated player in the centre of the screen:
  await expect(page).toHaveScreenshot("game-renders-after-restart.png", {
    scale: "css",
    threshold: 0.1,
    maxDiffPixelRatio: 0.01,
  });
});
