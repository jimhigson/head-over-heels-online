import { expect, type Page } from "@playwright/test";

import { type OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import { quarterMaskFaultRoomCampaign } from "../src/game/render/sortZ/__test__/quarterMaskFaultRoom";
import { wallFloorSeamRoomCampaign } from "../src/game/render/sortZ/__test__/wallFloorSeamRoom";
import { type ResolutionName } from "../src/originalGame";
import { defaultEmulatedResolution } from "../src/store/slices/userSettings/defaultUserSettings";
import { type SpriteOption } from "../src/store/slices/userSettings/userSettingsSlice";
import { allItemsTestRoomCampaign } from "./fixtures/allItemsTestRoom";
import { bootPlaytestCampaign } from "./testUtils/bootPlaytestCampaign";
import {
  changeRoomViaApi,
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameReady,
  waitForRoomToRender,
} from "./testUtils/gameStateQueries";
import { restrictToCameraRotationProjects } from "./testUtils/infrastructure";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import { projectDeviceType } from "./testUtils/projectDeviceType";
import { relaySupabase } from "./testUtils/relaySupabase";
import {
  roomScreenshotOptions,
  spriteOptionSuffix,
} from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";
import { test } from "./testUtils/test";

restrictToCameraRotationProjects();

/**
 * the visual regression of the camera angle: the camera is frozen and
 * screenshotted at many angles - the settled quarters a player turns between,
 * and part-way angles held mid-turn. This pins the exact rendering of the warp
 * at many intermediate angles, as a dense regression guard for refactors of
 * the transition/angle model.
 *
 * every captured frame is identified by the angle it is captured at (see
 * {@link SweepAngles}), optionally at several simulated times and in several
 * spritesheets.
 *
 * the whole test runs at zero game speed (transitions advance and hold on
 * the real frame clock), so every frame is deterministic.
 */

// the angles (degrees) swept from `startAngle` to `endAngle` every
// `intervalDegrees`; the end angle is included unless the arc is a whole turn
// back to the start (360° == 0°), which would repeat the first screenshot
function* angleRange(
  startAngle: number,
  endAngle: number,
  intervalDegrees: number,
): Generator<number> {
  const steps = Math.round((endAngle - startAngle) / intervalDegrees);
  const isWholeTurn = (endAngle - startAngle) % 360 === 0;
  const count = isWholeTurn ? steps : steps + 1;
  for (let step = 0; step < count; step++) {
    yield startAngle + step * intervalDegrees;
  }
}

type SweepCampaign =
  | "allItemsTestRoom"
  | "original"
  | "quarterMaskFaultRoom"
  | "rotate-camera-test"
  | "wallFloorSeamRoom";

/**
 * an infinitesimal step into a turn: far too small to move anything by a whole
 * pixel, so a frame held here must render as the settled angle it left
 */
const epsilonDegrees = 0.000_000_1;

/**
 * which angles a scenario captures - everything is expressed as an angle in
 * degrees anticlockwise from the base view, since all this suite cares about is
 * what the room renders as at a given angle:
 * - a `number[]`: those angles, each held directly - an exact quarter settles,
 *   anything else holds a part-way transition. {@link angleRange} generates an
 *   evenly-spaced arc, either as the whole list (`.toArray()`) or spread in
 *   among individually chosen angles
 * - `"identicallyRenderingAngles"`: groups of angles asserted to render the
 *   same as each other. Rendering is a function of angle, and it must be
 *   continuous at a turn's start: a settled quarter and an infinitesimal step
 *   into the turn away from it differ by no visible pixels. Every angle in a
 *   group shares ONE baseline - the one named for the group's first angle - so
 *   the second frame is measured against the first, which is what makes the
 *   invariant impossible to regenerate away. A baseline per angle would be a
 *   strictly weaker test that looked identical
 */
type SweepAngles =
  { type: "identicallyRenderingAngles"; groups: number[][] } | number[];

/** one screenshotted frame of a scenario */
type SweepCapture = {
  /** the angle (degrees anticlockwise) the camera is held at */
  degrees: number;
  /**
   * the angle the baseline is named for - the held angle itself, except within
   * an identically-rendering group, where every angle is compared against the
   * baseline of the group's first (settled) angle
   */
  baselineDegrees: number;
};

/**
 * the valid room ids for a campaign - lets each scenario's roomId/enterFrom be
 * typo-checked against the campaign it belongs to (the db-loaded
 * rotate-camera-test has no generated id union, so it stays `string`)
 */
type RoomsForCampaign<C extends SweepCampaign> =
  C extends "allItemsTestRoom" ? "allItemsTestRoom"
  : C extends "wallFloorSeamRoom" ? "wallFloorSeamRoom"
  : C extends "quarterMaskFaultRoom" ? "quarterMaskFaultRoom"
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
   * - a room id: level-select into that room first, so roomId is entered with
   *   it as the previous room. For an adjacent room the character stands at
   *   the door back to it; for a non-adjacent one the level-select falls
   *   through to roomId's own first door - either way deterministic
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
   * expiring) across the captures. Omitted, the room is captured as entered
   */
  captureTimesMs?: number[];
  /**
   * capture in each of these sprite options in turn, instead of just the
   * platform default (BlockStack colourised) - guards the palette-swapped
   * rendering of the alternate sheets/modes
   */
  spriteOptions?: SpriteOption[];
  /**
   * how many pixels may differ from the baseline, loosening the shared
   * room-screenshot budget (zero) for scenarios whose frames legitimately
   * jitter by a handful of pixels
   */
  maxDiffPixels?: number;
  /**
   * what fraction of pixels may differ from the baseline. Replaces the
   * pixel-count budget, for frames compared against each other rather than
   * against a pinned image - the warp meshes soften edges, so a proportional
   * budget absorbs that while a real discontinuity (many percent) still fails
   */
  maxDiffPixelRatio?: number;
  /** which frames to screenshot, and how the camera reaches them */
  angles: SweepAngles;
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
    // wall/floor seam detects regressions in z-order of adjacent items
    roomId: "wallFloorSeamRoom",
    campaign: "wallFloorSeamRoom",
    enterFrom: "$$startingRoom",
    angles: [0, -20],
    emulatedResolution: "zxSpectrum",
    character: "head",
  }),
  sweepScenario({
    // test case with masking that previously failed- regression protection
    roomId: "quarterMaskFaultRoom",
    campaign: "quarterMaskFaultRoom",
    enterFrom: "$$startingRoom",
    angles: [0, 20, 30, 35, 40, 44.999, 45.001, 50, 90],
    emulatedResolution: "zxSpectrum",
    character: "head",
    // also debug ss - easier to grok errors
    spriteOptions: [
      { name: "BlockStack", uncolourised: false },
      { name: "Debug", uncolourised: false },
    ],
  }),
  sweepScenario({
    roomId: "blacktooth13",
    campaign: "original",
    enterFrom: "blacktooth12",
    angles: [0, 20, 44.999, 45.001, 70, 90],
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    roomId: "blacktooth56",
    campaign: "original",
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
    angles: angleRange(0, 90, 10).toArray(),
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
    spriteOptions: [
      { name: "BlockStack", uncolourised: false },
      { name: "Toppy", uncolourised: false },
      { name: "BlockStack", uncolourised: true },
    ],
    captureTimesMs: [90, 170, 260],
  }),
  sweepScenario({
    // stacked hush-puppy stairs (cyclic masked pair) that are tricky to stay
    // mask-carved at all angles
    roomId: "hushpuppies",
    campaign: "rotate-camera-test",
    character: "heels",
    enterFrom: "mirrors",
    angles: angleRange(0, 360, 18).toArray(),
    emulatedResolution: "$$default",
  }),
  sweepScenario({
    // cycles room - painter's algo's nightmare of multiple cyclic dependencies
    // all over the place
    roomId: "cycles",
    campaign: "rotate-camera-test",
    // head's starting room, shown at spawn:
    enterFrom: "$$startingRoom",
    angles: [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
      95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165,
      170, 175, 180, 180.11, 180.12, 181,
      // sometimes rendering breaks in this 1/100the of an angle:
      182.84, 182.841,
      // back to regular 5º:
      185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255,
      260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330,
      335, 340, 345, 350, 355,
    ],
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    // some highlighted angles with debug sprites
    roomId: "cycles",
    campaign: "rotate-camera-test",
    // head's starting room, shown at spawn:
    enterFrom: "$$startingRoom",
    angles: [
      150, 155,
      // currently shows a slight error (floor showing through mask between items)
      180,
    ],
    emulatedResolution: "$$default",
    character: "head",
    spriteOptions: [{ name: "Debug", uncolourised: false }],
  }),
  sweepScenario({
    // cycles again, but uncolourised; detects regression for fixed bug: loss of
    // tint of some sprites
    roomId: "cycles",
    campaign: "rotate-camera-test",
    enterFrom: "$$startingRoom",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: true }],
  }),
  sweepScenario({
    // heels boots here with the bag pickup right above, collects right away
    // shows floating text
    roomId: "start",
    campaign: "rotate-camera-test",
    // heels' starting room, shown at spawn:
    enterFrom: "$$startingRoom",
    character: "heels",
    captureTimesMs: [5_000],
    angles: [0, 0.000_1],
    emulatedResolution: "$$default",
  }),
  sweepScenario({
    // a tower room - towers are cylindrical and deliberately NOT mesh-warped,
    // so its part-way angles confirm the towers slide as whole pillars rather
    // than warping:
    roomId: "egyptus7",
    campaign: "original",
    enterFrom: "finalroom",
    character: "head",
    // 44.999/45.001 sit a hair either side of the renderer hand-over, which
    // falls at exactly 45°: below it the old-angle renderer still owns the
    // scene, above it the new-angle one does, and their scroll is
    // all-but-identical there - so a well-behaved hand-over differs only by the
    // art/angle flip:
    angles: [0, 20, 44.999, 45.001, 70, 90],
    emulatedResolution: "$$default",
    // part-way frames wobble by a pixel or two (blended scroll settling to
    // within the scroll-ease dead-zone, pixelate-filter texture rounding).
    // Allow that small jitter while still catching real regressions - a
    // misaligned item or an un-warped floor differs by thousands of pixels:
    maxDiffPixels: 600,
  }),
  sweepScenario({
    // lamps and their light beams (tile layout, terminus, mirrors' beam
    // reflection physics):
    roomId: "lamp",
    campaign: "rotate-camera-test",
    // the room the campaign boots head into, which no scenario captures:
    enterFrom: "cycles",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: false }],
    // the playable can drift a few pixels from its spawn before the game speed
    // is zeroed (eg when it spawns on a conveyor), which reads as a
    // sprite-sized diff. Real regressions in what these rooms guard (item
    // placement, door/mirror structure) are thousands of pixels:
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    // doors on all four sides at z=0 (post widths, top frame placement,
    // thresholds):
    roomId: "4doors",
    campaign: "rotate-camera-test",
    enterFrom: "cycles",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: false }],
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    // doors on all four sides raised up high (legs, floating thresholds and
    // their hint shadows):
    roomId: "4doorhi",
    campaign: "rotate-camera-test",
    enterFrom: "cycles",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: false }],
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    // both mirror orientations with adjacent items (face-on pane flipping with
    // the camera, reflection placement):
    roomId: "mirrors",
    campaign: "rotate-camera-test",
    enterFrom: "cycles",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: false }],
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    // the start room at its four settled angles, entered via lamp so it is
    // captured as a room entered with physics already frozen, rather than as
    // the boot room the character was placed in while physics could still
    // tick. Also captured uncolourised: the raised doors' legs and floating
    // thresholds must render only legal zx-palette colours at every settled
    // angle (an illegal shade means two tints multiplied together, eg a door
    // leg tinted by the room colour twice):
    roomId: "start",
    campaign: "rotate-camera-test",
    enterFrom: "lamp",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [
      { name: "BlockStack", uncolourised: false },
      { name: "BlockStack", uncolourised: true },
    ],
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    roomId: "blacktooth5",
    campaign: "original",
    enterFrom: "blacktooth4",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    character: "head",
  }),
  sweepScenario({
    // the floor's colour-clash rendering must survive to every rotated angle,
    // which the colourised rotate-camera-test rooms cannot show:
    roomId: "safari6triple",
    campaign: "original",
    enterFrom: "finalroom",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: true }],
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    // test for colour clash floor edge regression
    roomId: "blacktooth39",
    campaign: "original",
    enterFrom: "finalroom",
    character: "head",
    angles: [0, 90, 270],
    emulatedResolution: "$$default",
    spriteOptions: [{ name: "BlockStack", uncolourised: true }],
  }),
  sweepScenario({
    // settled angles
    roomId: "blacktooth11",
    campaign: "original",
    enterFrom: "finalroom",
    character: "head",
    angles: [0, 90, 180, 270, 0],
    emulatedResolution: "$$default",
  }),
  sweepScenario({
    // hush puppy steps in cyclic draw orders
    roomId: "blacktooth61",
    campaign: "original",
    enterFrom: "finalroom",
    character: "heels",
    angles: [
      0, 90,
      // previously failing angle:
      19.44, 0,
    ],
    emulatedResolution: "$$default",
  }),
  ...(["blacktooth15", "blacktooth1head", "blacktooth13"] as const).map(
    (roomId) =>
      // checks for very small angles from a settled angle - must be almost identical
      // to the settled:
      sweepScenario({
        roomId,
        campaign: "original",
        enterFrom: "finalroom",
        character: "head",
        angles: {
          type: "identicallyRenderingAngles",
          groups: [
            [0, epsilonDegrees],
            [90, 90 + epsilonDegrees],
          ],
        },
        emulatedResolution: "$$default",
        // expect a very small diff from the epsilon
        maxDiffPixelRatio: 0.02,
      }),
  ),
];

const heldAt = (degrees: number): SweepCapture => ({
  degrees,
  baselineDegrees: degrees,
});

const capturesForScenario = ({
  angles,
}: SweepScenario): readonly SweepCapture[] => {
  if (Array.isArray(angles)) {
    return angles.map(heldAt);
  }
  // every angle in a group is compared against the baseline named for the
  // group's first angle:
  return angles.groups.flatMap((group) => {
    const [baselineDegrees] = group;
    return group.map((degrees): SweepCapture => ({
      degrees,
      baselineDegrees,
    }));
  });
};

const rotateCameraTestCampaignUrl =
  "/?campaignName=rotate-camera-test&campaignAuthorUserId=2924c962-99f1-4dd2-9b9c-fef832dc991b&cheats=1&track=0";

/**
 * put the camera at an arbitrary angle (degrees anticlockwise from the base
 * view). The game speed is zero throughout these specs, so the transition the
 * handle sets up never advances and the angle stays put for the screenshot
 */
const holdCameraAtDegrees = async (page: Page, degrees: number) => {
  await page.evaluate((degrees) => {
    window.__e2e_holdCameraAtDegrees!(degrees);
  }, degrees);
};

/**
 * swop to the wanted character via the e2e handle
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
 * put the current character into the a room, optionally specifying a room
 * to enter from
 */
const enterRoom = async (page: Page, scenario: SweepScenario) => {
  const { roomId, enterFrom } = scenario;

  const currentRoom = () =>
    page.evaluate(() => {
      const { gameState } = window._e2e_gamePageGameAi!;
      return gameState.characterRooms[gameState.currentCharacterName]?.id;
    });

  const levelSelectTo = async (room: string) => {
    await changeRoomViaApi(page, room);
    await waitForRoomToRender(page, room, "cameraRotationSweep");
  };

  if (enterFrom === "$$startingRoom") {
    // roomId is this character's starting room, so they are already stood at
    // their spawn - just confirm the boot landed them there:
    const currentRoomId = await currentRoom();
    if (currentRoomId !== roomId) {
      throw new Error(
        `scenario ${roomId} declares enterFrom "$$startingRoom" but the character is in ${currentRoomId} - roomId is not this character's starting room`,
      );
    }
    return;
  }

  // enter through a door: for a named adjacent room, first route the character
  // into it so the level-select into roomId picks the door back to it - unless
  // the boot already left them there, since re-entering it would re-render a
  // room we only pass through (the campaign's boot room can be a heavy one). A
  // "$$final" room has only its finishing door, so a direct level-select falls
  // through to it:
  if (enterFrom !== "$$final" && (await currentRoom()) !== enterFrom) {
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
  // entry (level-selecting via the game api, not the url):
  if (scenario.campaign === "allItemsTestRoom") {
    await bootPlaytestCampaign(
      page,
      allItemsTestRoomCampaign,
      emulatedResolutionPayload(scenario),
    );
  } else if (scenario.campaign === "wallFloorSeamRoom") {
    await bootPlaytestCampaign(
      page,
      wallFloorSeamRoomCampaign,
      emulatedResolutionPayload(scenario),
    );
  } else if (scenario.campaign === "quarterMaskFaultRoom") {
    await bootPlaytestCampaign(
      page,
      quarterMaskFaultRoomCampaign,
      emulatedResolutionPayload(scenario),
    );
  } else if (scenario.campaign === "rotate-camera-test") {
    if (process.env.E2E_RELAY_SUPABASE) {
      await relaySupabase(page);
    }
    await page.goto(rotateCameraTestCampaignUrl);
    await waitForGameReady(page);
    // zero the speed before playing on, so sprites are born frozen:
    await setZeroGameSpeed(page);
    await page.waitForSelector("[data-dialog-id=crowns]", { timeout: 15_000 });
    await exitCrownsDialog(page, "cameraRotationSweep");
    await switchToCharacter(page, scenario.character);
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: emulatedResolutionPayload(scenario),
    });
  } else {
    await page.goto(originalCampaignUrl);
    await clickPlayTheGame(page, "cameraRotationSweep");
    await clickOriginalCampaign(page, "cameraRotationSweep");
    await waitForGameReady(page);
    // zero the speed before playing on, so sprites are born frozen:
    await setZeroGameSpeed(page);
    await switchToCharacter(page, scenario.character);
    await dispatchToStore(page, {
      type: "userSettings/setEmulatedResolution",
      payload: emulatedResolutionPayload(scenario),
    });
    await exitCrownsDialog(page, "cameraRotationSweep");
  }

  await enterRoom(page, scenario);

  await page.waitForTimeout(500);
};

const scenarioBaseName = (
  { roomId, character, enterFrom, emulatedResolution }: SweepScenario,
  projectName?: string,
): string =>
  [
    roomId,
    character === "head" ? "" : `-${character}`,
    enterFrom === "$$startingRoom" ? ""
    : enterFrom === "$$final" ? "-from-final"
    : `-from-${enterFrom}`,
    (
      emulatedResolution === "$$default" ||
      (projectName !== undefined &&
        emulatedResolution ===
          defaultEmulatedResolution(projectDeviceType(projectName)))
    ) ?
      ""
    : `-${emulatedResolution}`,
  ].join("");

/**
 * screenshot name maker, omits the segment for default values
 *
 * collisions between tests are fine - playwright will verify the image is the same
 * (which it should be)
 */
const captureFileName = (
  scenario: SweepScenario,
  projectName: string,
  spriteOption: SpriteOption | undefined,
  captureTimeMs: number,
  { baselineDegrees }: SweepCapture,
): string =>
  [
    scenarioBaseName(scenario, projectName),
    spriteOption === undefined ? "" : spriteOptionSuffix(spriteOption),
    baselineDegrees === 0 ? "" : `-${baselineDegrees}deg`,
    captureTimeMs === 0 ? "" : `-${captureTimeMs}ms`,
    ".png",
  ].join("");

const count = (n: number, noun: string): string =>
  `${n} ${noun}${n === 1 ? "" : "s"}`;

/**
 * the axes a scenario captures over, so two scenarios of the same room in the
 * same state - differing only in which angles/sheets/times they capture - are
 * still told apart by their test titles
 */
const scenarioAxes = (scenario: SweepScenario): string => {
  const { angles, spriteOptions, captureTimesMs } = scenario;
  const anglesPart =
    !Array.isArray(angles) && angles.type === "identicallyRenderingAngles" ?
      count(angles.groups.length, "identically rendering angle group")
    : count(capturesForScenario(scenario).length, "angle");

  return [
    anglesPart,
    spriteOptions === undefined ? "" : (
      `, ${count(spriteOptions.length, "sprite option")}`
    ),
    captureTimesMs === undefined ? "" : (
      `, ${count(captureTimesMs.length, "capture time")}`
    ),
  ].join("");
};

const screenshotOptionsForScenario = (
  scenario: SweepScenario,
  projectName: string,
) => {
  const options = roomScreenshotOptions(projectName);
  if (scenario.maxDiffPixelRatio !== undefined) {
    // a proportional budget replaces the pixel-count one rather than adding to
    // it - leaving both set would keep the stricter of the two:
    return {
      ...options,
      maxDiffPixels: undefined,
      maxDiffPixelRatio: scenario.maxDiffPixelRatio,
    };
  }
  return scenario.maxDiffPixels === undefined ?
      options
    : { ...options, maxDiffPixels: scenario.maxDiffPixels };
};

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
  test(`camera angles render deterministically: ${scenarioBaseName(scenario)} (${scenarioAxes(scenario)})`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(360_000);
    await bootScenario(page, scenario);

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
      for (const captureTimeMs of scenario.captureTimesMs ?? [0]) {
        if (captureTimeMs > 0) {
          await page.evaluate(
            (ms) => window.__e2e_fastForwardMs!(ms),
            captureTimeMs - advancedMs,
          );
          advancedMs = captureTimeMs;
          // a real tick delivers the fast-forward's moved items to the
          // renderers. This is a screenshot-baseline-critical settle: the
          // committed baselines were captured with this exact wait, and the
          // rendered moment (scroll blend, animation phase) varies with it, so
          // it is deliberately wall-clock rather than frame- or event-based:
          await page.waitForTimeout(300);
        }
        await freezeAnimations(page);

        for (const capture of capturesForScenario(scenario)) {
          await holdCameraAtDegrees(page, capture.degrees);
          // let the held frame re-project and the blended scroll settle. Like
          // the fast-forward wait above, this is baseline-critical: the exact
          // settle duration is baked into the committed screenshots, so it stays
          // wall-clock rather than frame-based:
          await page.waitForTimeout(600);
          // sprites recreated since the last freeze (eg by the quarter-flip
          // renderer rebuild) started at frame 0, but stop them anyway so
          // nothing is mid-animation when captured:
          await freezeAnimations(page);
          await page.waitForTimeout(100);

          // soft, so a scenario reports every capture that differs rather than
          // stopping at the first: the captures run in ascending simulated
          // time, so knowing whether the ones after a mismatch also differ is
          // what separates a diverged simulation from a single bad frame
          await expect
            .soft(page)
            .toHaveScreenshot(
              captureFileName(
                scenario,
                testInfo.project.name,
                spriteOption,
                captureTimeMs,
                capture,
              ),
              screenshotOptionsForScenario(scenario, testInfo.project.name),
            );
        }
      }
    }
  });
}
