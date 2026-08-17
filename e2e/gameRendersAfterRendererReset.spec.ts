import { expect } from "@playwright/test";

import { paintFrame, whilePainting } from "./testUtils/advanceGameTime";
import { clickCheat } from "./testUtils/gameInteractions";
import {
  setZeroGameSpeed,
  waitForGameReady,
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
import { test } from "./testUtils/test";

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
  // Spritesheets from the first game is reused on the second game's fresh
  // renderer - the situation that used to blank the HUD text. The bug is about
  // the app being torn down and recreated, not which campaign, so we restart the
  // original campaign (the sequel needs the DB, which isn't always reachable):
  await clickPlayTheGame(page, formattedName);
  await clickOriginalCampaign(page, formattedName);
  await waitForGameReady(page);
  await exitCrownsDialog(page, formattedName);

  // freeze the game for a deterministic frame:
  await setZeroGameSpeed(page);

  // compare the bottom HUD strip - it holds the baked text/number glyphs and
  // excludes the animated player in the centre of the screen. The screenshot
  // assertion retries until the render is stable and matches, so no fixed wait
  // is needed for the fresh renderer to settle:
  await expect(page).toHaveScreenshot("game-renders-after-restart.png", {
    scale: "css",
    threshold: 0.1,
    maxDiffPixelRatio: 0.01,
    timeout: 15_000 * osSlowness,
  });
});

/**
 * The same blank-render bug can be triggered without restarting: losing the
 * WebGL context destroys every baked RenderTexture, and the restored context has
 * no backing for them. The main loop must re-bake the variants and recreate the
 * room/hud renderers when the context comes back. The cheats "lose & restore
 * WebGL context" button loses the context and restores it 100ms later.
 *
 * Not browser-specific, so it runs on a single browser to avoid per-browser
 * baselines.
 */
test("game renders correctly after losing and restoring the WebGL context", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "single-browser regression test",
  );

  await setupE2ePage(page);

  await startCampaignViaMenu(page, testInfo.project.name, "originalGame");

  // freeze the game so the frame is deterministic across the context cycle:
  await waitForGameReady(page);
  await setZeroGameSpeed(page);
  // let a frame render at zero speed so the frozen frame is settled:
  await paintFrame(page);

  // lose the WebGL context (the button restores it 100ms later) - this kills
  // every baked RenderTexture, which the main loop must re-bake and rewire into
  // freshly recreated room/hud renderers:
  await clickCheat(page, "cheats-lose-gl-context");

  // the restore, the re-bake and the renderer recreation all happen on ticks,
  // and nothing ticks on its own here - so paint frames until the retrying
  // screenshot assertion is satisfied by one of them:
  await whilePainting(
    page,
    expect(page).toHaveScreenshot("game-renders-after-context-loss.png", {
      scale: "css",
      threshold: 0.1,
      maxDiffPixelRatio: 0.01,
      timeout: 15_000 * osSlowness,
    }),
  );
});
