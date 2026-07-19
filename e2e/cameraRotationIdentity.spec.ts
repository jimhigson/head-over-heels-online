import { expect, type Page, test } from "@playwright/test";

import { dispatchKeyPress } from "./testUtils/gameInteractions";
import {
  setZeroGameSpeed,
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

restrictToCameraRotationProjects();

/**
 * rotating the camera and returning to the base angle must render identically
 * to never having rotated: the room renderer detects the quarter flip and
 * switches angle in place, and item renderers re-render/reuse their baked
 * surfaces, so any item that fails to survive the round trip (eg a vanished
 * bake) shows up as a screenshot diff against the pre-rotation baseline.
 *
 * the whole test runs at zero game speed: camera turns advance on the real
 * frame clock (decoupled from game speed), while physics and sprite
 * animations never run - roomTime is asserted unchanged across the test, so
 * the two screenshots compare exactly the same room state.
 *
 * NOTE: the committed baseline is the PRE-rotation rendering - do not
 * regenerate with --update-snapshots while the post-rotation assertion fails,
 * or the baseline gets overwritten with the broken post-rotation frame. On a
 * missing baseline the first (pre-rotation) assertion writes it and aborts the
 * test, which records the correct image.
 */
const identityCases: Array<{
  room: string;
  /**
   * playing character to enter the room as - hush puppies vanish the moment
   * head enters a room, so rooms exercising them must be entered as heels
   */
  character: "head" | "heels";
  /** rotation keys pressed in order; the sequence returns to the base angle */
  turns: Array<{ key: string; code: string }>;
}> = [
  {
    // a full anticlockwise revolution; the upper block must still render
    room: "blacktooth11",
    character: "head",
    turns: [
      { key: ",", code: "Comma" },
      { key: ",", code: "Comma" },
      { key: ",", code: "Comma" },
      { key: ",", code: "Comma" },
    ],
  },
  {
    // one anticlockwise turn and back again; the bottom row of hush puppies
    // must still render
    room: "blacktooth61",
    character: "heels",
    turns: [
      { key: ",", code: "Comma" },
      { key: ".", code: "Period" },
    ],
  },
];

const currentRoomTime = (page: Page) =>
  page.evaluate(() => {
    const { gameState } = window._e2e_gamePageGameAi!;
    const { roomTime } =
      gameState.characterRooms[gameState.currentCharacterName]!;
    return roomTime;
  });

const rotationFinished = async (page: Page) => {
  await page.waitForFunction(
    () => window._e2e_gamePageGameAi?.gameState.cameraTransition === undefined,
    undefined,
    { timeout: 10_000 },
  );
};

/**
 * blacktooth61's hush puppy stack has a cyclic draw-order pair (the bottom
 * row is masked by the middle row's rendering). Mid-way through a RETURN
 * turn the pair is drawn by warp meshes whose snapshots must include that
 * mask - the mask is re-created on the same tick as the midpoint hand-over
 * rebuilds the z-graph, and a snapshot taken before it wraps shows the
 * bottom row uncarved, overdrawing (partially occluding) the middle row
 */
test("mid-return-turn draws the masked cyclic pair whole: blacktooth61", async ({
  page,
}, testInfo) => {
  test.setTimeout(120_000);
  await setupE2ePage(page);
  await page.goto("/?cheats=1&track=0#finalroom");
  await clickPlayTheGame(page, "cameraRotationIdentity");
  await clickOriginalCampaign(page, "cameraRotationIdentity");
  await exitCrownsDialog(page, "cameraRotationIdentity");

  // as heels - head would remove the hush puppies:
  await expect(async () => {
    await dispatchKeyPress(page, "]", "BracketRight");
    await page.waitForFunction(
      () =>
        window._e2e_gamePageGameAi?.gameState.currentCharacterName === "heels",
      undefined,
      { timeout: 2_000 },
    );
  }).toPass({ timeout: 20_000 });

  await setZeroGameSpeed(page);

  const renderEvent = waitForRoomRenderEvent(
    page,
    "blacktooth61",
    "cameraRotationIdentity",
  );
  await page.goto(`/?cheats=1&track=0#blacktooth61`);
  await renderEvent;
  await page.waitForTimeout(500);

  // one full anticlockwise turn, then hold the return turn well past its
  // midpoint hand-over, where the re-created mask must already be baked into
  // the warp snapshots:
  await dispatchKeyPress(page, ",", "Comma");
  await rotationFinished(page);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    window._e2e_gamePageGameAi!._e2e_holdCameraTransition!("clockwise", 0.7);
  });
  await page.waitForTimeout(700);

  await expect(page).toHaveScreenshot(
    "blacktooth61-return-turn-mid.png",
    roomScreenshotOptions(testInfo.project.name),
  );
});

for (const { room, character, turns } of identityCases) {
  test(`rotating the camera and returning to base renders identically: ${room}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await setupE2ePage(page);
    await page.goto("/?cheats=1&track=0#finalroom");
    await clickPlayTheGame(page, "cameraRotationIdentity");
    await clickOriginalCampaign(page, "cameraRotationIdentity");
    await exitCrownsDialog(page, "cameraRotationIdentity");

    if (character === "heels") {
      // swop.heels key - must happen while the game is running (the swop is
      // processed by the physics tick), before speed is zeroed. Retried
      // because a press during the room's fade-in is swallowed:
      await expect(async () => {
        await dispatchKeyPress(page, "]", "BracketRight");
        await page.waitForFunction(
          () =>
            window._e2e_gamePageGameAi?.gameState.currentCharacterName ===
            "heels",
          undefined,
          { timeout: 2_000 },
        );
      }).toPass({ timeout: 20_000 });
    }

    await setZeroGameSpeed(page);

    const renderEvent = waitForRoomRenderEvent(
      page,
      room,
      "cameraRotationIdentity",
    );
    await page.goto(`/?cheats=1&track=0#${room}`);
    await renderEvent;
    await page.waitForTimeout(500);

    const screenshotOpts = roomScreenshotOptions(testInfo.project.name);

    const roomTimeAtBaseline = await currentRoomTime(page);

    // pre-rotation baseline:
    await expect(page).toHaveScreenshot(
      `${room}-rotation-identity.png`,
      screenshotOpts,
    );

    // the scroll ease rests anywhere inside its dead-zone, so after the
    // rotations the whole room can sit a pixel or two from where it started -
    // which would swamp the comparison. Record the scroll now and compensate
    // on the world container (which the scroll renderer never writes) before
    // the second screenshot:
    const scrollBefore = await page.evaluate(() => {
      let scroll: { x: number; y: number } | undefined;
      const walk = (c: {
        label?: string;
        children?: unknown[];
        x: number;
        y: number;
      }) => {
        if (scroll) {
          return;
        }
        if ((c.label ?? "").startsWith("RoomScrollRenderer(")) {
          scroll = { x: c.x, y: c.y };
          return;
        }
        for (const k of c.children ?? []) {
          walk(k as typeof c);
        }
      };
      walk(window.__PIXI_APP__!.stage);
      return scroll!;
    });

    // camera turns run on the real frame clock even at zero game speed, so
    // physics/animations stay frozen throughout:
    for (const { key, code } of turns) {
      await dispatchKeyPress(page, key, code);
      await rotationFinished(page);
      await page.waitForTimeout(300);
    }

    // physics must never have run - the room state at the second screenshot
    // is exactly the baseline's:
    expect(await currentRoomTime(page)).toBe(roomTimeAtBaseline);

    // compensate any scroll-ease rest offset (see scrollBefore above):
    await page.evaluate((before) => {
      let scroll: { x: number; y: number } | undefined;
      let world: { x: number; y: number } | undefined;
      const walk = (c: {
        label?: string;
        children?: unknown[];
        x: number;
        y: number;
      }) => {
        if ((c.label ?? "").startsWith("RoomScrollRenderer(")) {
          scroll = c;
          return;
        }
        if (c.label === "MainLoop/worldContainer") {
          world = c;
        }
        for (const k of c.children ?? []) {
          walk(k as typeof c);
        }
      };
      walk(window.__PIXI_APP__!.stage);
      // shift by the scroll's rest-position drift, preserving the world
      // container's own (unrelated) position:
      world!.x += before.x - scroll!.x;
      world!.y += before.y - scroll!.y;
    }, scrollBefore);
    await page.waitForTimeout(300);

    // back at the base angle: must match the pre-rotation baseline exactly
    await expect(page).toHaveScreenshot(
      `${room}-rotation-identity.png`,
      screenshotOpts,
    );
  });
}
