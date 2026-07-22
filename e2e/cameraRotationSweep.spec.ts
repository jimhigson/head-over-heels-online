import { expect, type Page, test } from "@playwright/test";

import { type OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import { type ResolutionName } from "../src/originalGame";
import { type SpriteOption } from "../src/store/slices/userSettings/userSettingsSlice";
import { allItemsTestRoomCampaign } from "./fixtures/allItemsTestRoom";
import { bootPlaytestCampaign } from "./testUtils/bootPlaytestCampaign";
import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameState,
  waitForRoomRenderEvent,
} from "./testUtils/gameStateQueries";
import { restrictToCameraRotationProjects } from "./testUtils/infrastructure";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { roomScreenshotOptions } from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";

restrictToCameraRotationProjects();

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

type SweepCampaign = "allItemsTestRoom" | "original" | "rotate-camera-test";

/**
 * the valid room ids for a campaign - lets each scenario's roomId/enterFrom be
 * typo-checked against the campaign it belongs to (the db-loaded
 * rotate-camera-test has no generated id union, so it stays `string`)
 */
type RoomsForCampaign<C extends SweepCampaign> =
  C extends "allItemsTestRoom" ? "allItemsTestRoom"
  : C extends "original" ? OriginalCampaignRoomId
  : string;

type SweepScenario<C extends SweepCampaign = SweepCampaign> = {
  roomId: RoomsForCampaign<C>;
  /**
   * original: boot the burnt-in campaign through the menus and navigate by
   * hash. allItemsTestRoom: boot the inline test campaign via a playtest-style
   * `data:` url. rotate-camera-test: the community campaign loaded by url,
   * entered by hash like the original
   */
  campaign: C;
  /**
   * where the character stands when the swept room is captured, made explicit
   * so the screenshot is deterministic rather than an artifact of navigation
   * history:
   * - "$$startingRoom": roomId IS this character's starting room, so they are
   *   shown at their spawn (throws if roomId is not their start room)
   * - a room id: enter roomId through the door from that (adjacent) room, so
   *   the character stands at that door - deterministic given the layout
   * - "$$final": roomId's only door is the game-finishing (usually exit-only)
   *   door; enter through it - for the final room, which has no neighbour to
   *   name
   */
  enterFrom: "$$final" | "$$startingRoom" | RoomsForCampaign<C>;
  /** which character to view the room as (eg heels, so head doesn't clear the hush puppies) */
  character: "head" | "heels";
  /**
   * set before sweeping, so the whole room fits on screen. "$$default" instead
   * leaves the setting unset, so each platform sweeps at its own default
   * (handheld on mobile, zxSpectrum on desktop) - which is what a real player
   * on that platform sees
   */
  emulatedResolution: "$$default" | ResolutionName;
  /**
   * cumulative simulated times (ms) to capture at: the game is fast-forwarded
   * (via window.__e2e_fastForwardMs, while the game speed stays zero) to each
   * time in turn, capturing every angle at each - so a scenario's setup plays
   * out deterministically (items falling, pickups collected, floating text
   * expiring) across the captures. Suffixes the screenshot names (eg `-90ms`)
   */
  captureTimesMs?: number[];
  /**
   * appended to the room id in the test title and screenshot names, to
   * distinguish this scenario from another sweeping the same room (eg
   * `-anim`)
   */
  nameSuffix?: string;
  /**
   * the angles (degrees) to screenshot at: either an explicit list, or a
   * `startAngle`→`endAngle` arc sampled every `sweepIntervalDegrees`
   */
  angles:
    | { startAngle: number; endAngle: number; sweepIntervalDegrees: number }
    | number[];
  /**
   * capture in each of these sprite options in turn, instead of just the
   * platform default (BlockStack colourised) - guards the palette-swapped
   * rendering of the alternate sheets/modes. Each non-default option
   * suffixes its screenshot names (eg `-toppy`, `-uncolourised`)
   */
  spriteOptions?: SpriteOption[];
};

/**
 * identity builder that infers the campaign generic per scenario, so each
 * scenario's roomId and enterFrom are typo-checked against its own campaign
 * while the array stays heterogeneous
 */
const sweepScenario = <C extends SweepCampaign>(
  scenario: SweepScenario<C>,
): SweepScenario<C> => scenario;

const scenarios: readonly SweepScenario[] = [
  sweepScenario({
    roomId: "blacktooth13",
    campaign: "original",
    // entered through the door from adjacent blacktooth12:
    enterFrom: "blacktooth12",
    angles: [0, 20, 44.999, 45.001, 70],
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    roomId: "blacktooth56",
    campaign: "original",
    // entered through the door from adjacent blacktooth55:
    enterFrom: "blacktooth55",
    angles: [180, 226],
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    roomId: "finalroom",
    campaign: "original",
    // the final room's only door is the game-finishing exit door:
    enterFrom: "$$final",
    angles: { startAngle: 0, endAngle: 90, sweepIntervalDegrees: 10 },
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    roomId: "allItemsTestRoom",
    campaign: "allItemsTestRoom",
    // the inline campaign's single room - the character spawns here:
    enterFrom: "$$startingRoom",
    // quarter angles plus a whisker before/after each eighth
    angles: [
      0, 44.999, 45.001, 90, 134.999, 135.001, 180, 224.999, 225.001, 270,
      314.999, 315.001,
    ],
    // the largest resolution: a 16×16 room fits on screen whole
    emulatedResolution: "amigaHiResPal",
    character: "head",
  }),
  // the all-items room progressing through time in every sprite option:
  // captures just past 1/12-second boundaries (rounded up to 2dp of a
  // second) so successive shots show the simulation advanced - items
  // falling, animations progressing - guarding time-progression rendering
  // and the palette-swapped rendering of every item type in each sheet/mode
  sweepScenario({
    roomId: "allItemsTestRoom",
    campaign: "allItemsTestRoom",
    enterFrom: "$$startingRoom",
    angles: [0],
    emulatedResolution: "amigaHiResPal",
    character: "head",
    nameSuffix: "-anim",
    spriteOptions: [
      { name: "BlockStack", uncolourised: false },
      { name: "Toppy", uncolourised: false },
      { name: "BlockStack", uncolourised: true },
    ],
    captureTimesMs: [90, 170, 260],
  }),
  sweepScenario({
    // a stacked hush-puppy pair (cyclic masked pair) that must stay carved and
    // correctly projected through the whole turn - entered as heels since head
    // would clear the hush puppies:
    roomId: "hushpuppies",
    campaign: "rotate-camera-test",
    character: "heels",
    // entered through the door from adjacent mirrors:
    enterFrom: "mirrors",
    angles: { startAngle: 0, endAngle: 360, sweepIntervalDegrees: 18 },
    emulatedResolution: "$$default",
  }),
  sweepScenario({
    // the demanding cycles room (a working draw-order cycle at the base angle,
    // of multiplied blocks, plus the eight-barrier weave) swept at a dense 5°
    // grid as the cyclic-masking guard through the whole turn. The nine fine
    // angles inserted between 180 and 185 pin the found bugs where the
    // toposort's severed-edge choice flips within that band (180.11/180.12 and
    // 182.84/182.841 bracket the flips):
    roomId: "cycles",
    campaign: "rotate-camera-test",
    // head's starting room, shown at spawn:
    enterFrom: "$$startingRoom",
    angles: [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
      95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165,
      170, 175, 180, 180.11, 180.12, 181, 182.8, 182.84, 182.841, 182.85, 182.9,
      183, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250,
      255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325,
      330, 335, 340, 345, 350, 355,
    ],
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    // heels boots here with the bag pickup right above her and a portable
    // block right below: the fast-forward drops the bag onto her (collected)
    // and settles her stood on the block, so the pick-up-next highlight
    // outline is showing; it also expires the pickup's floating text. 0 is
    // the settled reference (outline correct); the epsilon angle pins the
    // found bug where the outline mid-turn shades the block's whole square
    // instead of outlining its pixels - at so slight an angle the two frames
    // should differ only by a little mesh softening, making the broken
    // outline the whole story of the diff:
    roomId: "start",
    campaign: "rotate-camera-test",
    // heels' starting room, shown at spawn:
    enterFrom: "$$startingRoom",
    character: "heels",
    captureTimesMs: [5_000],
    angles: [0, 0.000_1],
    emulatedResolution: "$$default",
  }),
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
 * swop to the wanted character via the e2e handle, which calls the swop mutator
 * directly - so it works at zero game speed, where the normal swop input (read
 * only inside the speed-scaled physics tick) never fires. A no-op when already
 * that character (so head, the usual boot default, is left alone)
 */
const switchToCharacter = async (page: Page, character: "head" | "heels") => {
  await page.evaluate((c) => {
    if (window._e2e_gamePageGameAi?.gameState.currentCharacterName !== c) {
      window.__e2e_swopCharacter!(c);
    }
  }, character);
  await page.waitForFunction(
    (c) => window._e2e_gamePageGameAi?.gameState.currentCharacterName === c,
    character,
    { timeout: 2_000 },
  );
};

/**
 * put the current character into the swept room per {@link
 * SweepScenario.enterFrom}, so their position when captured is deterministic
 * rather than an artifact of navigation history. `campaignHashUrl` is the base
 * url whose `#<roomId>` hash drives a cheat level-select (unused for
 * "$$startingRoom", which navigates nowhere)
 */
const enterRoom = async (
  page: Page,
  scenario: SweepScenario,
  campaignHashUrl: string,
) => {
  const { roomId, enterFrom } = scenario;

  const levelSelectTo = async (room: string) => {
    const renderEvent = waitForRoomRenderEvent(
      page,
      room,
      "cameraRotationSweep",
    );
    await page.goto(`${campaignHashUrl}#${room}`);
    await renderEvent;
  };

  if (enterFrom === "$$startingRoom") {
    // roomId is this character's starting room, so they are already stood at
    // their spawn - just confirm the boot landed them there:
    const currentRoomId = await page.evaluate(() => {
      const { gameState } = window._e2e_gamePageGameAi!;
      return gameState.characterRooms[gameState.currentCharacterName]?.id;
    });
    if (currentRoomId !== roomId) {
      throw new Error(
        `scenario ${roomId} declares enterFrom "$$startingRoom" but the character is in ${currentRoomId} - roomId is not this character's starting room`,
      );
    }
    return;
  }

  // enter through a door: for a named adjacent room, first route the character
  // into it so the level-select into roomId picks the door back to it. A
  // "$$final" room has only its finishing door, so a direct level-select
  // falls through to it:
  if (enterFrom !== "$$final") {
    await levelSelectTo(enterFrom);
  }
  await levelSelectTo(roomId);
};

const originalCampaignUrl = "/?cheats=1&track=0";

/**
 * the store payload for a scenario's emulated resolution: an explicit
 * ResolutionName, or null to unset it - leaving the platform's own default in
 * place (see {@link SweepScenario.emulatedResolution})
 */
const emulatedResolutionPayload = ({
  emulatedResolution,
}: SweepScenario): null | ResolutionName =>
  emulatedResolution === "$$default" ? null : emulatedResolution;

const bootScenario = async (page: Page, scenario: SweepScenario) => {
  await setupE2ePage(page);
  // boot the campaign into its own start room (not swept), then zero the game
  // speed before the game is allowed to play on - so every sprite is created
  // frozen at its deterministic start frame rather than caught mid-animation
  // (matching roomSnapshots.spec). Character selection and navigation then
  // happen at zero speed, and enterRoom does the deterministic per-scenario
  // entry. campaignHashUrl is the base url whose #room hash drives level-select
  // (empty for the single-room inline campaign):
  let campaignHashUrl = "";
  if (scenario.campaign === "allItemsTestRoom") {
    await bootPlaytestCampaign(
      page,
      allItemsTestRoomCampaign,
      emulatedResolutionPayload(scenario),
    );
  } else if (scenario.campaign === "rotate-camera-test") {
    await page.goto(rotateCameraTestCampaignUrl);
    await waitForGameState(page);
    // zero the speed before playing on, so sprites are born frozen:
    await setZeroGameSpeed(page);
    await page.waitForSelector("[data-dialog-id=crowns]", { timeout: 15_000 });
    await exitCrownsDialog(page, "cameraRotationSweep");
    await switchToCharacter(page, scenario.character);
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: emulatedResolutionPayload(scenario),
    });
    campaignHashUrl = rotateCameraTestCampaignUrl;
  } else {
    await page.goto(originalCampaignUrl);
    await clickPlayTheGame(page, "cameraRotationSweep");
    await clickOriginalCampaign(page, "cameraRotationSweep");
    await waitForGameState(page);
    // zero the speed before playing on, so sprites are born frozen:
    await setZeroGameSpeed(page);
    await switchToCharacter(page, scenario.character);
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: emulatedResolutionPayload(scenario),
    });
    await exitCrownsDialog(page, "cameraRotationSweep");
    campaignHashUrl = originalCampaignUrl;
  }

  await enterRoom(page, scenario, campaignHashUrl);

  await page.waitForTimeout(500);
};

/** the screenshot/test-title base name for a scenario */
const scenarioName = ({ roomId, nameSuffix }: SweepScenario): string =>
  `${roomId}${nameSuffix ?? ""}`;

/**
 * the screenshot-name suffix for the sprite option a capture is taken in
 * ("" for the default BlockStack colourised)
 */
const spriteOptionSuffix = (spriteOption: SpriteOption | undefined): string =>
  spriteOption === undefined ? ""
  : spriteOption.uncolourised ? "-uncolourised"
  : spriteOption.name === "BlockStack" ? ""
  : `-${spriteOption.name.toLowerCase()}`;

/**
 * stop every sprite animation at frame 0. Animations advance on the real
 * ticker even at zero game speed, and a cuboid-warp snapshot latches whichever
 * frame is showing when the warp starts - so without this, mask-heavy rooms'
 * mid-turn captures vary run-to-run with boot timing. Sprites recreated by a
 * renderer rebuild start at frame 0 anyway, so re-freezing after each hold
 * keeps everything deterministic
 */
const freezeAnimations = (page: Page) =>
  page.evaluate(() => {
    type AnyNode = {
      children?: AnyNode[];
      gotoAndStop?: (frame: number) => void;
    };
    const walk = (node: AnyNode) => {
      node.gotoAndStop?.(0);
      for (const child of node.children ?? []) {
        walk(child);
      }
    };
    walk(window.__PIXI_APP__!.stage as unknown as AnyNode);
  });

for (const scenario of scenarios) {
  test(`camera rotation sweep renders deterministically: ${scenarioName(scenario)}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(360_000);
    await bootScenario(page, scenario);

    // the sprite options to capture in - just the platform default when the
    // scenario doesn't list any:
    const spriteOptions: ReadonlyArray<SpriteOption | undefined> =
      scenario.spriteOptions ?? [undefined];

    for (const spriteOption of spriteOptions) {
      if (spriteOption !== undefined) {
        await setSpriteOption(page, "cameraRotationSweep", spriteOption);
      }
      // fast-forward to each capture time in turn (or a single un-forwarded
      // pass when the scenario names no times), capturing every angle at
      // each - so all of a time's angles show the same simulated moment:
      let advancedMs = 0;
      for (const captureTimeMs of scenario.captureTimesMs ?? [undefined]) {
        if (captureTimeMs !== undefined) {
          await page.evaluate(
            (ms) => window.__e2e_fastForwardMs!(ms),
            captureTimeMs - advancedMs,
          );
          advancedMs = captureTimeMs;
          // a real tick delivers the fast-forward's moved items to the
          // renderers:
          await page.waitForTimeout(300);
        }
        await freezeAnimations(page);

        for (const degrees of sweepDegreesForScenario(scenario)) {
          await holdCameraAtDegrees(page, degrees);
          // let the held frame re-project and the blended scroll settle:
          await page.waitForTimeout(600);
          // sprites recreated since the last freeze (eg by the quarter-flip
          // renderer rebuild) started at frame 0, but stop them anyway so
          // nothing is mid-animation when captured:
          await freezeAnimations(page);
          await page.waitForTimeout(100);

          const timeSuffix =
            captureTimeMs === undefined ? "" : `-${captureTimeMs}ms`;
          await expect(page).toHaveScreenshot(
            `${scenarioName(scenario)}${spriteOptionSuffix(spriteOption)}-sweep-${degrees}deg${timeSuffix}.png`,
            roomScreenshotOptions(testInfo.project.name),
          );
        }
      }
    }
  });
}
