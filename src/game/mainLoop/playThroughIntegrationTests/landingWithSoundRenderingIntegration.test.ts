// @vitest-environment happy-dom
import type { DistributedOmit } from "type-fest";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import type { ExportedSoundId } from "../../../_generated/sfxdex/soundIds";
import { setUpBasicGame, type TestRoomId } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeTestRenderState } from "../../../_testUtils/makeTestRenderState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { isStandingOn } from "../../../_testUtils/playThroughUntilHelpers";
import {
  enoughTimeForSoundsToFade,
  loadSoundsForTest,
  makeSoundStartCounter,
  type PlayingSound,
  resetSoundsForTest,
  soundsPlaying,
} from "../../../_testUtils/sounds/soundTestUtils";
import type { JsonItemUnion } from "../../../model/json/JsonItem";
import type { IndividualCharacterName } from "../../../model/modelTypes";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(async () => {
  resetStore();
  await loadSoundsForTest();
});

afterEach(() => {
  resetSoundsForTest();
});

type PlayingSounds = Array<PlayingSound>;

describedForAllFrameRates((frameRate) => {
  test("heels falling onto the floor plays the fall sound, then one landing bump", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 3, y: 3, z: 3 },
          config: { which: "heels" },
        },
      },
    });
    const renderState = makeTestRenderState();
    const landingBumps = makeSoundStartCounter(renderState, "softBump");
    const startZ = heelsState(gameState).box.z;

    playGameThrough(gameState, renderState, {
      frameRate,
      until: (gameState) =>
        heelsState(gameState).box.z < startZ - blockSizePx.z,
      failAfter: 2_000,
      frameCallbacks: landingBumps.frameCallback,
    });

    expect({
      playing: soundsPlaying(renderState),
      landingBumps: landingBumps.count,
    }).toEqual({
      playing: expect.arrayContaining<PlayingSound>([
        { soundId: "fall", playback: "loop" },
      ]),
      landingBumps: 0,
    });

    playGameThrough(gameState, renderState, {
      frameRate,
      until: isStandingOn("heels", "floor"),
      failAfter: 2_000,
      frameCallbacks: landingBumps.frameCallback,
    });

    expect<PlayingSounds>(soundsPlaying(renderState)).toEqual(
      expect.arrayContaining<PlayingSound>([
        { soundId: "softBump", playback: "spotEffect" },
      ]),
    );

    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: enoughTimeForSoundsToFade + 1_000,
      frameCallbacks: landingBumps.frameCallback,
    });

    expect({
      playing: soundsPlaying(renderState),
      landingBumps: landingBumps.count,
    }).toEqual({ playing: [], landingBumps: 1 });
  });

  test("heels jumping plays the jump sound, then one landing bump on landing", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 3, y: 3, z: 0 },
          config: { which: "heels" },
        },
      },
    });
    const renderState = makeTestRenderState();
    const landingBumps = makeSoundStartCounter(renderState, "softBump");
    const startZ = heelsState(gameState).box.z;

    // stand a moment first - sounds already going on entering the room don't
    // play their start:
    playGameThrough(gameState, renderState, { frameRate, forTime: 200 });

    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("jump");
      },
      until: (gameState) => heelsState(gameState).box.z > startZ,
      failAfter: 1_000,
      frameCallbacks: [
        landingBumps.frameCallback,
        (gameState) => {
          // one jump only:
          if (heelsState(gameState).standingOnItemId === null) {
            gameState.inputStateTracker.mockNotPressing("jump");
          }
        },
      ],
    });

    expect({
      playing: soundsPlaying(renderState),
      landingBumps: landingBumps.count,
    }).toEqual({
      playing: expect.arrayContaining<PlayingSound>([
        { soundId: "heelsJumpStart", playback: "spotEffect" },
      ]),
      landingBumps: 0,
    });

    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockNotPressing("jump");
      },
      until: isStandingOn("heels", "floor"),
      failAfter: 2_000,
      frameCallbacks: landingBumps.frameCallback,
    });

    expect<PlayingSounds>(soundsPlaying(renderState)).toEqual(
      expect.arrayContaining<PlayingSound>([
        { soundId: "softBump", playback: "spotEffect" },
      ]),
    );

    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: enoughTimeForSoundsToFade + 500,
      frameCallbacks: landingBumps.frameCallback,
    });

    expect(landingBumps.count).toBe(1);
  });

  test("heels walking from one block onto a level neighbouring block stands on it without a landing bump", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 3, z: 1 },
          config: { which: "heels" },
        },
        a: {
          type: "block",
          position: { x: 2, y: 3, z: 0 },
          config: { style: "organic" },
        },
        b: {
          type: "block",
          position: { x: 3, y: 3, z: 0 },
          config: { style: "organic" },
        },
      },
    });
    const renderState = makeTestRenderState();

    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until: isStandingOn("heels", "b"),
      failAfter: 2_000,
      frameCallbacks() {
        // checked every frame, so a failure reports when it was first heard:
        expect<PlayingSounds>(soundsPlaying(renderState)).toEqual(
          expect.not.arrayContaining<PlayingSound>([
            { soundId: "softBump", playback: "spotEffect" },
          ]),
        );
      },
    });

    expect<PlayingSounds>(soundsPlaying(renderState)).toEqual(
      expect.arrayContaining<PlayingSound>([
        { soundId: "heelsWalk", playback: "loop" },
      ]),
    );
  });

  test("heels walking off a block's edge falls to the floor, with one landing bump", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 3, z: 1 },
          config: { which: "heels" },
        },
        a: {
          type: "block",
          position: { x: 2, y: 3, z: 0 },
          config: { style: "organic" },
        },
      },
    });
    const renderState = makeTestRenderState();
    const landingBumps = makeSoundStartCounter(renderState, "softBump");
    let heardFalling = false;

    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until: isStandingOn("heels", "floor"),
      failAfter: 2_000,
      frameCallbacks: [
        landingBumps.frameCallback,
        () => {
          heardFalling ||= soundsPlaying(renderState).some(
            ({ soundId, playback }) =>
              soundId === "fall" && playback === "loop",
          );
        },
      ],
    });

    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        // stop before reaching the wall:
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      forTime: enoughTimeForSoundsToFade + 500,
      frameCallbacks: landingBumps.frameCallback,
    });

    expect({ heardFalling, landingBumps: landingBumps.count }).toEqual({
      heardFalling: true,
      landingBumps: 1,
    });
  });

  test.for([
    { height: 0.25 },
    { height: 0.5 },
    { height: 1 },
    { height: 1.25 },
    { height: 2 },
    { height: 3.375 },
  ])(
    "heels falling $height blocks onto the floor makes exactly one landing bump",
    ({ height }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 3, y: 3, z: height },
            config: { which: "heels" },
          },
        },
      });
      const renderState = makeTestRenderState();
      const landingBumps = makeSoundStartCounter(renderState, "softBump");

      playGameThrough(gameState, renderState, {
        frameRate,
        until: isStandingOn("heels", "floor"),
        failAfter: 3_000,
        frameCallbacks: landingBumps.frameCallback,
      });
      playGameThrough(gameState, renderState, {
        frameRate,
        forTime: enoughTimeForSoundsToFade + 500,
        frameCallbacks: landingBumps.frameCallback,
      });

      expect(landingBumps.count).toBe(1);
    },
  );

  test.for<{
    name: string;
    json: DistributedOmit<JsonItemUnion<TestRoomId>, "position">;
    landingSound: ExportedSoundId;
  }>([
    {
      name: "pushable block",
      json: { type: "pushableBlock", config: {} },
      landingSound: "metalClang",
    },
    {
      name: "cube",
      json: { type: "portableBlock", config: { style: "cube" } },
      landingSound: "softBump",
    },
    {
      name: "drum",
      json: { type: "portableBlock", config: { style: "drum" } },
      landingSound: "drum",
    },
    {
      name: "ball",
      json: { type: "ball", config: {} },
      landingSound: "ballHit",
    },
  ])(
    "a $name falling onto the floor lands with one $landingSound",
    ({ json, landingSound }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 0, y: 0, z: 0 },
            config: { which: "heels" },
          },
          faller: { ...json, position: { x: 4, y: 4, z: 2 } },
        },
      });
      const renderState = makeTestRenderState();
      const landings = makeSoundStartCounter(renderState, landingSound);

      playGameThrough(gameState, renderState, {
        frameRate,
        until: isStandingOn("faller", "floor"),
        failAfter: 3_000,
        frameCallbacks: landings.frameCallback,
      });

      expect<PlayingSounds>(soundsPlaying(renderState)).toEqual(
        expect.arrayContaining<PlayingSound>([
          { soundId: landingSound, playback: "spotEffect" },
        ]),
      );

      playGameThrough(gameState, renderState, {
        frameRate,
        forTime: enoughTimeForSoundsToFade + 500,
        frameCallbacks: landings.frameCallback,
      });

      expect(landings.count).toBe(1);
    },
  );

  test("heels putting down a carried cube plays the carry sound, without a landing bump", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 3 },
          config: { which: "heels" },
        },
        bag: {
          type: "pickup",
          position: { x: 5, y: 5, z: 2 },
          config: { gives: "bag" },
        },
        cube: {
          type: "portableBlock",
          position: { x: 5, y: 5, z: 0 },
          config: { style: "cube" },
        },
      },
    });
    const renderState = makeTestRenderState();

    // collects the bag on the way down, lands on the cube, and picks it up:
    playGameThrough(gameState, renderState, {
      frameRate,
      until: (gameState) => heelsState(gameState).carrying?.id === "cube",
      failAfter: 3_000,
      frameCallbacks(gameState) {
        if (
          heelsState(gameState).standingOnItemId === "cube" &&
          heelsState(gameState).carrying === null
        ) {
          gameState.inputStateTracker.mockPressing("carry");
        }
      },
    });
    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockNotPressing("carry");
      },
      until: isStandingOn("heels", "floor"),
      failAfter: 2_000,
    });
    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: enoughTimeForSoundsToFade,
    });

    const putDownBumps = makeSoundStartCounter(renderState, "softBump");
    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("carry");
      },
      until: (gameState) => heelsState(gameState).carrying === null,
      failAfter: 1_000,
      frameCallbacks: putDownBumps.frameCallback,
    });

    expect<PlayingSounds>(soundsPlaying(renderState)).toEqual(
      expect.arrayContaining<PlayingSound>([
        { soundId: "carry", playback: "spotEffect" },
      ]),
    );

    playGameThrough(gameState, renderState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockNotPressing("carry");
      },
      forTime: enoughTimeForSoundsToFade + 500,
      frameCallbacks: putDownBumps.frameCallback,
    });

    expect({
      standingOnItemId: heelsState(gameState).standingOnItemId,
      putDownBumps: putDownBumps.count,
    }).toEqual({ standingOnItemId: "cube", putDownBumps: 0 });
  });

  describe.for<{ which: IndividualCharacterName }>([
    { which: "heels" },
    { which: "head" },
  ])("$which as the playable", ({ which }) => {
    test.for([
      { startZ: 2 },
      { startZ: 3.5 },
      { startZ: 4.25 },
      { startZ: 5 },
      { startZ: 6.375 },
      { startZ: 8 },
      { startZ: 9.75 },
    ])(
      "falling from z $startZ onto a rising lift makes one landing bump, then rides it without another",
      ({ startZ }) => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            [which]: {
              type: "player",
              position: { x: 4, y: 2, z: startZ },
              config: { which },
            },
            l: {
              type: "lift",
              position: { x: 4, y: 2, z: 0 },
              config: { top: 11, bottom: 0 },
            },
          },
        });
        const renderState = makeTestRenderState();
        const landingBumps = makeSoundStartCounter(renderState, "softBump");

        playGameThrough(gameState, renderState, {
          frameRate,
          until: isStandingOn(which, "l"),
          failAfter: 3_000,
          frameCallbacks: landingBumps.frameCallback,
        });

        expect({
          playing: soundsPlaying(renderState),
          liftRising: itemState<"lift">(gameState, "l").vels.lift.z > 0,
        }).toEqual({
          playing: expect.arrayContaining<PlayingSound>([
            { soundId: "softBump", playback: "spotEffect" },
            { soundId: "helicopter", playback: "loop" },
          ]),
          liftRising: true,
        });

        playGameThrough(gameState, renderState, {
          frameRate,
          forTime: 3_000,
          frameCallbacks: landingBumps.frameCallback,
        });

        expect(landingBumps.count).toBe(1);
      },
    );
  });
});
