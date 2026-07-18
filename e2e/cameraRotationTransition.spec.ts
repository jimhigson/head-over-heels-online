import { expect, type Page, test } from "@playwright/test";

import {
  setZeroGameSpeed,
  waitForRoomRenderEvent,
} from "./testUtils/gameStateQueries";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { roomScreenshotOptions } from "./testUtils/screenshots";

// blacktooth13 exercises the common boxy items; egyptus7 is a tower room -
// towers are cylindrical and deliberately NOT mesh-warped, so its mid-transition
// frames confirm the towers slide as whole pillars rather than warping:
const rooms = ["blacktooth13", "egyptus7"];

/**
 * a quarter-turn rotation, base -> anticlockwise, frozen at several
 * progresses. _e2e_cameraTransitionHold pins the progress. A single renderer owns the
 * scene at every progress (the old-angle one up to the midpoint, the new-angle one
 * after), so each frozen frame is deterministic. The renderer hand-over fires at
 * progress >= 0.5, so 0.49 and 0.51 capture the two sides of that flip a hair
 * apart: at 0.49 the old-angle renderer is still mounted, at 0.51 the new-angle one
 * has taken over - their scroll is all-but-identical there, so a well-behaved
 * hand-over differs only by the art/angle flip. 0.45/0.55 sample slightly wider,
 * both under the peak of the pixelate blockify.
 */
const transitionHolds = [0, 0.45, 0.49, 0.51, 0.55, 1];

/**
 * The whole test stays at zero game/ticker speed: camera transitions advance
 * and re-project on the real (unscaled) frame clock, so the held turn renders
 * while physics stays frozen AND sprite animations never advance - every held
 * frame is fully deterministic.
 */
const freezeTransitionAt = async (page: Page, hold: number) => {
  await page.evaluate((progress) => {
    const api = window._e2e_gamePageGameAi;
    if (api === undefined) {
      throw new Error("no game api on window._e2e_gamePageGameAi");
    }
    const { gameState } = api;
    // discrete target is the anticlockwise quarter-turn from base:
    gameState.targetCameraAngle = { x: 0, y: 1 };
    gameState.cameraTransition = {
      fromAngle: { x: 1, y: 0 },
      // one anticlockwise quarter turn:
      arc: Math.PI / 2,
      progress,
      durationMs: 500,
      startSlope: 0,
    };
    gameState._e2e_cameraTransitionHold = progress;
  }, hold);
  // let the held transition re-project + settle the blended scroll:
  await page.waitForTimeout(700);
};

for (const room of rooms) {
  test(`camera rotation transition renders deterministically at frozen progress: ${room}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await setupE2ePage(page);
    await page.goto("/?cheats=1&track=0#finalroom");
    await clickPlayTheGame(page, "cameraRotationTransition");
    await clickOriginalCampaign(page, "cameraRotationTransition");
    await exitCrownsDialog(page, "cameraRotationTransition");
    await setZeroGameSpeed(page);

    const renderEvent = waitForRoomRenderEvent(
      page,
      room,
      "cameraRotationTransition",
    );
    await page.goto(`/?cheats=1&track=0#${room}`);
    await renderEvent;
    await page.waitForTimeout(500);

    const screenshotOpts = {
      ...roomScreenshotOptions(testInfo.project.name),
      // transition frames wobble by a pixel or two (blended scroll settling to
      // within the scroll-ease dead-zone, pixelate-filter texture rounding). Allow
      // that small jitter while still catching real regressions - a misaligned item
      // or an un-warped floor differs by thousands of pixels (10-30%).
      maxDiffPixels: 600,
    };

    for (const hold of transitionHolds) {
      await freezeTransitionAt(page, hold);
      await expect(page).toHaveScreenshot(
        `${room}-transition-t${hold}.png`,
        screenshotOpts,
      );
    }
  });
}
