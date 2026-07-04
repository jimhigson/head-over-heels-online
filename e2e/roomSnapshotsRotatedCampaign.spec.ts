import { expect, test } from "@playwright/test";

import { type Xy } from "../src/utils/vectors/vectors";
import {
  setZeroGameSpeed,
  waitForGameState,
  waitForRoomRenderEvent,
} from "./testUtils/gameStateQueries";
import { exitCrownsDialog } from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { roomScreenshotOptions } from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";

/**
 * visual regression for the rotate-camera-test community campaign: rooms
 * purpose-built to exercise camera rotation, each captured at all four camera
 * angles in a single sprite mode (BlockStack, colourised).
 *
 * Unlike the original-campaign suites, the campaign is loaded from the db
 * (supabase), so this spec depends on the db being reachable.
 */

const campaignUrl =
  "/?campaignName=rotate-camera-test&campaignAuthorUserId=2924c962-99f1-4dd2-9b9c-fef832dc991b&cheats=1&track=0";

const angles: ReadonlyArray<readonly [string, Xy]> = [
  ["base", { x: 1, y: 0 }],
  ["cw90", { x: 0, y: -1 }],
  ["cw180", { x: -1, y: 0 }],
  ["cw270", { x: 0, y: 1 }],
];

/**
 * what each room exercises:
 * - start: the campaign's starting room, whatever it currently is - a general
 *   canary captured before any warping
 * - lamp: lamps and their light beams (tile layout, terminus, mirrors' beam
 *   reflection physics)
 * - 4doors: doors on all four sides at z=0 (post widths, top frame placement,
 *   thresholds)
 * - 4doorhi: doors on all four sides raised up high (legs, floating
 *   thresholds and their hint shadows)
 * - mirrors: both mirror orientations with adjacent items (face-on pane
 *   flipping with the camera, reflection placement)
 */
const campaignRooms: ReadonlyArray<string> = [
  "lamp",
  "4doors",
  "4doorhi",
  "mirrors",
];

const totalShots = (campaignRooms.length + 1) * angles.length;

test(`rotate-camera-test campaign rooms (${totalShots} shots)`, async ({
  page,
}, testInfo) => {
  test.setTimeout(totalShots * 20_000 + 60_000);
  await setupE2ePage(page);

  const screenshotOpts = roomScreenshotOptions(testInfo.project.name);

  await page.goto(campaignUrl);
  // the crowns dialog only appears once the campaign has loaded, so wait for the
  // load first - dismissing it earlier is a no-op, and it then pops up and blocks
  // everything after:
  await waitForGameState(page);
  await page.waitForSelector("[data-dialog-id=crowns]", { timeout: 15_000 });
  await exitCrownsDialog(page, "rotatedCampaign");
  await setSpriteOption(page, "rotatedCampaign", {
    name: "BlockStack",
    uncolourised: false,
  });

  const screenshotAllAngles = async (name: string) => {
    for (const [angleName, angle] of angles) {
      await page.evaluate((a) => {
        window._e2e_gamePageGameAi!.gameState.cameraAngle = a;
      }, angle);
      // let the main loop notice the angle changed and rebuild the room renderer:
      await page.waitForTimeout(600);

      await expect
        .configure({ timeout: 15_000 })
        .soft(page)
        .toHaveScreenshot(`${name}-${angleName}.png`, screenshotOpts);
    }

    // reset to base for the next room's load (rooms reload at the base angle
    // anyway, but this keeps the render-event navigation deterministic):
    await page.evaluate(() => {
      window._e2e_gamePageGameAi!.gameState.cameraAngle = { x: 1, y: 0 };
    });
    await page.waitForTimeout(300);
  };

  // the campaign's starting room, before any warping:
  const startRoomId = await page.evaluate(() => {
    const gameAi = window._e2e_gamePageGameAi!;
    return gameAi.gameState.characterRooms[
      gameAi.gameState.currentCharacterName
    ].roomJson.id;
  });
  await setZeroGameSpeed(page);
  await page.waitForTimeout(300);
  await screenshotAllAngles("start");

  for (const roomId of campaignRooms) {
    // the start room may be one of these rooms, in which case it is
    // already loaded (warping to the current room is not supported):
    if (roomId !== startRoomId) {
      const renderPromise = waitForRoomRenderEvent(page, roomId);
      await page.goto(`${campaignUrl}#${roomId}`);
      await renderPromise;
      await setZeroGameSpeed(page);
      await page.waitForTimeout(300);
    }
    await screenshotAllAngles(roomId);
  }
});
