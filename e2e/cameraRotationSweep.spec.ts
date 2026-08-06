import { expect, type Page } from "@playwright/test";

import { type OriginalCampaignRoomId } from "../src/_generated/originalCampaign/OriginalCampaignRoomId";
import { type ResolutionName } from "../src/originalGame";
import { type SpriteOption } from "../src/store/slices/userSettings/userSettingsSlice";
import { allItemsTestRoomCampaign } from "./fixtures/allItemsTestRoom";
import { bootPlaytestCampaign } from "./testUtils/bootPlaytestCampaign";
import {
  dispatchToStore,
  setZeroGameSpeed,
  waitForGameReady,
  waitForRoomRenderEvent,
} from "./testUtils/gameStateQueries";
import { restrictToCameraRotationProjects } from "./testUtils/infrastructure";
import {
  clickOriginalCampaign,
  clickPlayTheGame,
  exitCrownsDialog,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
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

type SweepCampaign = "allItemsTestRoom" | "original" | "rotate-camera-test";

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
    roomId: "blacktooth13",
    campaign: "original",
    // entered through the door from adjacent blacktooth12:
    enterFrom: "blacktooth12",
    angles: [0, 20, 44.999, 45.001, 70, 90],
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
    // a stacked hush-puppy pair (cyclic masked pair) that must stay carved and
    // correctly projected through the whole turn - entered as heels since head
    // would clear the hush puppies:
    roomId: "hushpuppies",
    campaign: "rotate-camera-test",
    character: "heels",
    // entered through the door from adjacent mirrors:
    enterFrom: "mirrors",
    angles: angleRange(0, 360, 18).toArray(),
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
    // the boot room the character was placed in while physics could still tick:
    roomId: "start",
    campaign: "rotate-camera-test",
    enterFrom: "lamp",
    character: "head",
    angles: [0, 90, 180, 270],
    emulatedResolution: "$$default",
    maxDiffPixels: 1_000,
  }),
  sweepScenario({
    roomId: "blacktooth5",
    campaign: "original",
    // entered through the door from adjacent blacktooth4:
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
  ...(["blacktooth15", "blacktooth1head", "blacktooth13"] as const).map(
    (roomId) =>
      // the turn's start must be continuous: an infinitesimal step into a turn
      // renders as the angle it left, both from the base angle and from an
      // already-rotated one. These rooms are a rendering stress test for that -
      // blacktooth1head in particular puts a character in shot:
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
        // the warp meshes soften edges even this far into a turn; a real
        // discontinuity is many percent:
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

  const currentRoom = () =>
    page.evaluate(() => {
      const { gameState } = window._e2e_gamePageGameAi!;
      return gameState.characterRooms[gameState.currentCharacterName]?.id;
    });

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
    campaignHashUrl = rotateCameraTestCampaignUrl;
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
    campaignHashUrl = originalCampaignUrl;
  }

  await enterRoom(page, scenario, campaignHashUrl);

  await page.waitForTimeout(500);
};

/**
 * the part of a capture's file name that identifies the room and the state it
 * is entered in - everything that does not vary within a scenario (see
 * {@link captureFileName})
 */
const scenarioBaseName = ({
  roomId,
  character,
  enterFrom,
  emulatedResolution,
}: SweepScenario): string =>
  [
    roomId,
    character === "head" ? "" : `-${character}`,
    enterFrom === "$$startingRoom" ? ""
    : enterFrom === "$$final" ? "-from-final"
    : `-from-${enterFrom}`,
    emulatedResolution === "$$default" ? "" : `-${emulatedResolution}`,
  ].join("");

/**
 * the screenshot file name for one captured frame. It is a pure function of
 * everything that affects what is drawn: the room, then every parameter that
 * is NOT at its default, always in this order:
 *
 * | parameter          | default (no suffix)   | suffix when set                |
 * | ------------------ | --------------------- | ------------------------------ |
 * | roomId             | -                     | the base name                  |
 * | character          | head                  | `-heels`                       |
 * | enterFrom          | "$$startingRoom"      | `-from-<room>` / `-from-final` |
 * | emulatedResolution | "$$default"           | `-<resolutionName>`            |
 * | spriteOption       | BlockStack colourised | `-uncolourised` / `-toppy`     |
 * | angle              | 0°                    | `-<degrees>deg`                |
 * | capture time       | 0ms                   | `-<milliseconds>ms`            |
 *
 * so two frames drawn from identical parameters name one file, and are
 * asserted against one baseline - which is the point: identical parameters
 * must produce an identical image. Playwright sanitises the `.` of a
 * fractional angle to a `-`, so 44.999° lands in `...-44-999deg.png`
 */
const captureFileName = (
  scenario: SweepScenario,
  spriteOption: SpriteOption | undefined,
  captureTimeMs: number,
  { baselineDegrees }: SweepCapture,
): string =>
  [
    scenarioBaseName(scenario),
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
      for (const captureTimeMs of scenario.captureTimesMs ?? [0]) {
        if (captureTimeMs > 0) {
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

        for (const capture of capturesForScenario(scenario)) {
          await holdCameraAtDegrees(page, capture.degrees);
          // let the held frame re-project and the blended scroll settle:
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
              captureFileName(scenario, spriteOption, captureTimeMs, capture),
              screenshotOptionsForScenario(scenario, testInfo.project.name),
            );
        }
      }
    }
  });
}
