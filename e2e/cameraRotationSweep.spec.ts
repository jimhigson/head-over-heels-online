import { expect, type Page, test } from "@playwright/test";

import { type ResolutionName } from "../src/originalGame";
import { allItemsTestRoomCampaign } from "./fixtures/allItemsTestRoom";
import { bootPlaytestCampaign } from "./testUtils/bootPlaytestCampaign";
import { dispatchKeyPress } from "./testUtils/gameInteractions";
import {
  dispatchToStore,
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
 * a fine-grained sweep of the camera-rotation transition: the camera is
 * frozen and screenshotted at many angles. This pins the exact rendering of
 * the warp at many intermediate angles, as a dense regression guard for
 * refactors of the transition/angle model.
 *
 * the whole test runs at zero game speed (transitions advance and hold on
 * the real frame clock), so every frame is deterministic.
 */

/**
 * the transition's stored progress is linear; smoothstep (hermiteEase with
 * zero start slope) is applied at render time. Invert it so the holds land on
 * exact swept angles
 */
const progressForSweptFraction = (eased: number): number =>
  0.5 - Math.sin(Math.asin(1 - 2 * eased) / 3);

// the angles (degrees) swept from `startAngle` to `endAngle` every
// `intervalDegrees`; the end angle is included unless the arc is a whole turn
// back to the start (360° == 0°), which would repeat the first screenshot
const sweptAngles = (
  startAngle: number,
  endAngle: number,
  intervalDegrees: number,
): readonly number[] => {
  const steps = Math.round((endAngle - startAngle) / intervalDegrees);
  const isWholeTurn = (endAngle - startAngle) % 360 === 0;
  return Array.from(
    { length: isWholeTurn ? steps : steps + 1 },
    (_, i) => startAngle + i * intervalDegrees,
  );
};

type SweepScenario = {
  roomId: string;
  /**
   * original: boot the burnt-in campaign through the menus and navigate by
   * hash. allItemsTestRoom: boot the inline test campaign via a playtest-style
   * `data:` url. rotate-camera-test: the community campaign loaded by url,
   * entered by hash like the original
   */
  campaign: "allItemsTestRoom" | "original" | "rotate-camera-test";
  /** switch to this character before entering (eg heels, so head doesn't clear the hush puppies) */
  character?: "heels";
  /** set before sweeping, so the whole room fits on screen */
  emulatedResolution: ResolutionName;
  /**
   * the angles (degrees) to screenshot at: either an explicit list, or a
   * `startAngle`→`endAngle` arc sampled every `sweepIntervalDegrees`
   */
  angles:
    | { startAngle: number; endAngle: number; sweepIntervalDegrees: number }
    | number[];
};

const scenarios: readonly SweepScenario[] = [
  {
    roomId: "blacktooth13",
    campaign: "original",
    angles: [0, 20, 44.999, 45.001, 70],
    emulatedResolution: "zxSpectrum",
  },
  {
    roomId: "blacktooth56",
    campaign: "original",
    angles: [180, 226],
    emulatedResolution: "zxSpectrum",
  },
  {
    roomId: "finalroom",
    campaign: "original",
    angles: { startAngle: 0, endAngle: 90, sweepIntervalDegrees: 10 },
    emulatedResolution: "zxSpectrum",
  },
  {
    roomId: "allItemsTestRoom",
    campaign: "allItemsTestRoom",
    // quarter angles plus a whisker before/after each eighth
    angles: [
      0, 44.999, 45.001, 90, 134.999, 135.001, 180, 224.999, 225.001, 270,
      314.999, 315.001,
    ],
    // the largest resolution: a 16×16 room fits on screen whole
    emulatedResolution: "amigaHiResPal",
  },
  {
    // a stacked hush-puppy pair (cyclic masked pair) that must stay carved and
    // correctly projected through the whole turn - entered as heels since head
    // would clear the hush puppies:
    roomId: "hushpuppies",
    campaign: "rotate-camera-test",
    character: "heels",
    angles: { startAngle: 0, endAngle: 360, sweepIntervalDegrees: 18 },
    emulatedResolution: "zxSpectrum",
  },
  {
    // a working draw-order cycle (present at the base angle, of multiplied
    // blocks) - a control that must stay correct through the whole turn:
    roomId: "cycles",
    campaign: "rotate-camera-test",
    angles: { startAngle: 0, endAngle: 360, sweepIntervalDegrees: 18 },
    emulatedResolution: "zxSpectrum",
  },
];

const sweepDegreesForScenario = ({
  angles,
}: SweepScenario): readonly number[] =>
  Array.isArray(angles) ? angles : (
    sweptAngles(angles.startAngle, angles.endAngle, angles.sweepIntervalDegrees)
  );

const rotateCameraTestCampaignUrl =
  "/?campaignName=rotate-camera-test&campaignAuthorUserId=2924c962-99f1-4dd2-9b9c-fef832dc991b&cheats=1&track=0";

/**
 * hold the camera at an arbitrary angle (degrees anticlockwise from the base
 * view, any value - normalised into [0, 360) so negatives and past-a-full-turn
 * angles work, eg −40° == 320°): the settled quarter below the angle is set as
 * the transition's from-angle and a held transition towards the next quarter
 * carries the remainder
 */
const holdCameraAtDegrees = async (page: Page, degrees: number) => {
  const wrappedDegrees = ((degrees % 360) + 360) % 360;
  const quarterIndex = Math.floor(wrappedDegrees / 90);
  const remainderDegrees = wrappedDegrees - quarterIndex * 90;
  const progress =
    remainderDegrees === 0 ? undefined : (
      progressForSweptFraction(remainderDegrees / 90)
    );
  await page.evaluate(
    ({ quarterIndex, progress }) => {
      const quarters = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
      ];
      const { gameState } = window._e2e_gamePageGameAi!;
      if (progress === undefined) {
        // exactly on a quarter - settle there with no transition:
        gameState.targetCameraAngle = quarters[quarterIndex];
        gameState.cameraTransition = undefined;
        gameState._e2e_cameraTransitionHold = undefined;
      } else {
        gameState.targetCameraAngle = quarters[(quarterIndex + 1) % 4];
        gameState.cameraTransition = {
          fromAngle: quarters[quarterIndex],
          // one anticlockwise quarter turn:
          arc: Math.PI / 2,
          progress,
          durationMs: 500,
          startSlope: 0,
        };
        gameState._e2e_cameraTransitionHold = progress;
      }
    },
    { quarterIndex, progress },
  );
};

/**
 * press ] (swap character) until the wanted one is active - retried since a
 * single press may land on the wrong character (head/heels/headOverHeels)
 */
const switchToCharacter = async (page: Page, character: "heels") => {
  await expect(async () => {
    await dispatchKeyPress(page, "]", "BracketRight");
    await page.waitForFunction(
      (c) => window._e2e_gamePageGameAi?.gameState.currentCharacterName === c,
      character,
      { timeout: 2_000 },
    );
  }).toPass({ timeout: 20_000 });
};

const bootScenario = async (page: Page, scenario: SweepScenario) => {
  await setupE2ePage(page);
  if (scenario.campaign === "allItemsTestRoom") {
    await bootPlaytestCampaign(
      page,
      allItemsTestRoomCampaign,
      scenario.emulatedResolution,
    );
  } else if (scenario.campaign === "rotate-camera-test") {
    // the rotate-camera-test community campaign, loaded from the db by url:
    // boot into its start room (not swept), freeze, optionally switch
    // character, then hash-navigate into the swept room:
    await page.goto(rotateCameraTestCampaignUrl);
    await waitForGameState(page);
    await page.waitForSelector("[data-dialog-id=crowns]", { timeout: 15_000 });
    await exitCrownsDialog(page, "cameraRotationSweep");
    // switch character while the game still ticks (the swap needs a running
    // tick); any drift is in the start room, which is not swept:
    if (scenario.character !== undefined) {
      await switchToCharacter(page, scenario.character);
    }
    await setZeroGameSpeed(page);
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: scenario.emulatedResolution,
    });
    const renderEvent = waitForRoomRenderEvent(
      page,
      scenario.roomId,
      "cameraRotationSweep",
    );
    await page.goto(`${rotateCameraTestCampaignUrl}#${scenario.roomId}`);
    await renderEvent;
  } else {
    // boot into the campaign's start room (no hash), which is not swept, and
    // freeze physics while the crowns dialog still covers the game; the swept
    // room is then entered by hash navigation with nothing having moved:
    await page.goto("/?cheats=1&track=0");
    await clickPlayTheGame(page, "cameraRotationSweep");
    await clickOriginalCampaign(page, "cameraRotationSweep");
    await waitForGameState(page);
    await setZeroGameSpeed(page);
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: scenario.emulatedResolution,
    });
    await exitCrownsDialog(page, "cameraRotationSweep");

    const renderEvent = waitForRoomRenderEvent(
      page,
      scenario.roomId,
      "cameraRotationSweep",
    );
    await page.goto(`/?cheats=1&track=0#${scenario.roomId}`);
    await renderEvent;
  }
  await page.waitForTimeout(500);
};

for (const scenario of scenarios) {
  test(`camera rotation sweep renders deterministically: ${scenario.roomId}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(360_000);
    await bootScenario(page, scenario);

    for (const degrees of sweepDegreesForScenario(scenario)) {
      await holdCameraAtDegrees(page, degrees);
      // let the held frame re-project and the blended scroll settle:
      await page.waitForTimeout(600);

      await expect(page).toHaveScreenshot(
        `${scenario.roomId}-sweep-${degrees}deg.png`,
        roomScreenshotOptions(testInfo.project.name),
      );
    }
  });
}
