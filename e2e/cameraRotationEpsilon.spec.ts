import {
  expect,
  type Page,
  type PageAssertionsToHaveScreenshotOptions,
  test,
} from "@playwright/test";

import {
  setZeroGameSpeed,
  waitForGameState,
  waitForRoomRenderEvent,
} from "./testUtils/gameStateQueries";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { roomScreenshotOptions } from "./testUtils/screenshots";

/**
 * Visual invariants for the camera-rotation transition, applied to a set of
 * rooms as a rendering stress test. For each room and each direction:
 *
 *  1. epsilon into a turn from the base angle ≈ the pre-transition frame
 *  2. epsilon into a second turn (from a rotated angle) ≈ the settled frame
 *  3. after a completed turn, a page reload (which resumes the saved game at the
 *     rotated angle) renders identically to the post-transition frame
 *
 * (1) and (2) check the warp is a no-op at the turn's very start regardless of
 * start angle; (3) checks a completed turn leaves the room exactly as a clean
 * load at that angle would. Each check shares one committed baseline (the
 * reference frame) so the second frame is asserted directly against the first.
 * A small pixel-ratio tolerance absorbs the edge-softening blur the warp meshes
 * introduce; a real discontinuity is many percent, far above it.
 */

const rooms = ["blacktooth15", "blacktooth1head", "blacktooth13"] as const;

const epsilon = 0.000_000_1;

const blurTolerant = (
  projectName: string,
): PageAssertionsToHaveScreenshotOptions => ({
  ...roomScreenshotOptions(projectName),
  maxDiffPixels: undefined,
  maxDiffPixelRatio: 0.02,
});

const loadRoom = async (page: Page, room: string, tag: string) => {
  await setupE2ePage(page);
  await page.goto("/?cheats=1&track=0#finalroom");
  await clickPlayTheGame(page, tag);
  await clickOriginalCampaign(page, tag);
  await exitCrownsDialog(page, tag);
  await setZeroGameSpeed(page);
  const renderEvent = waitForRoomRenderEvent(page, room, tag);
  await page.goto(`/?cheats=1&track=0#${room}`);
  await renderEvent;
  await page.waitForTimeout(500);
};

// the whole suite stays at zero game/ticker speed: camera transitions
// advance and re-project on the real (unscaled) frame clock, so held and
// completed turns render while physics stays frozen and sprite animations
// never advance - every frame is fully deterministic

const holdTransitionAt = async (
  page: Page,
  direction: "anticlockwise" | "clockwise",
  progress: number,
) => {
  await page.evaluate(
    ({ d, p }) => {
      window._e2e_gamePageGameAi!._e2e_holdCameraTransition!(d, p);
    },
    { d: direction, p: progress },
  );
  await page.waitForTimeout(700);
};

/** run a whole turn to completion so the room settles at the next angle */
const completeTurn = async (
  page: Page,
  direction: "anticlockwise" | "clockwise",
) => {
  await page.evaluate((d) => {
    const api = window._e2e_gamePageGameAi!;
    api._e2e_holdCameraTransition!(d, 1);
    // release the hold so the real frame clock carries progress past 1 and
    // the turn finishes:
    api.gameState._e2e_cameraTransitionHold = undefined;
  }, direction);
  await page.waitForTimeout(1_000);
};

for (const room of rooms) {
  for (const direction of ["clockwise", "anticlockwise"] as const) {
    test(`${room}: epsilon into a first ${direction} turn matches the pre-transition frame`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(120_000);
      await loadRoom(page, room, `${room}-eps-${direction}`);
      const canvas = page.locator("canvas").first();
      const baseline = `${room}-pre-${direction}.png`;

      await expect(canvas).toHaveScreenshot(
        baseline,
        blurTolerant(testInfo.project.name),
      );
      await holdTransitionAt(page, direction, epsilon);
      await expect(canvas).toHaveScreenshot(
        baseline,
        blurTolerant(testInfo.project.name),
      );
    });

    test(`${room}: epsilon into a second ${direction} turn matches the settled frame`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(120_000);
      await loadRoom(page, room, `${room}-eps2-${direction}`);
      const canvas = page.locator("canvas").first();
      const baseline = `${room}-settled2-${direction}.png`;

      // one whole turn first, so the second turn starts from a rotated angle:
      await completeTurn(page, direction);
      await expect(canvas).toHaveScreenshot(
        baseline,
        blurTolerant(testInfo.project.name),
      );
      await holdTransitionAt(page, direction, epsilon);
      await expect(canvas).toHaveScreenshot(
        baseline,
        blurTolerant(testInfo.project.name),
      );
    });

    test(`${room}: reload after a completed ${direction} turn matches the post-transition frame`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(120_000);
      await loadRoom(page, room, `${room}-reload-${direction}`);
      const canvas = page.locator("canvas").first();
      const baseline = `${room}-rotated-${direction}.png`;

      await completeTurn(page, direction);
      await expect(canvas).toHaveScreenshot(
        baseline,
        blurTolerant(testInfo.project.name),
      );

      // the on-unload save persists the rotated cameraAngle; reloading resumes
      // the saved game and renders the room fresh at that angle. Confirm the
      // resumed angle, then that the fresh render matches the post-transition
      // frame (a resumed game boots on the hold/pause menu - dismiss it):
      const expectedAngle =
        direction === "clockwise" ? { x: 0, y: -1 } : { x: 0, y: 1 };
      await page.reload();
      await waitForGameState(page);
      // freeze immediately so the fresh render's sprite animations stay at
      // their initial frames, matching the pre-reload (frozen) baseline:
      await setZeroGameSpeed(page);
      const resumedAngle = await page.evaluate(
        () => window._e2e_gamePageGameAi!.gameState.targetCameraAngle,
      );
      expect(
        resumedAngle,
        "reloading should resume the saved game at the rotated camera angle",
      ).toEqual(expectedAngle);

      await page.evaluate(() =>
        window._e2e_store!.dispatch({ type: "gameMenus/closeAllMenus" }),
      );
      await page.waitForTimeout(1_500);
      await expect(canvas).toHaveScreenshot(
        baseline,
        blurTolerant(testInfo.project.name),
      );
    });
  }
}
