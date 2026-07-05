import { beforeEach, expect, test } from "vitest";

import {
  type ItemsInTestRoomJson,
  setUpBasicGame,
  type TestRoomId,
} from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { roomItemsIterable } from "../../../model/RoomState";
import { type Xyz } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { isLightBeam } from "../../physics/itemPredicates";

beforeEach(() => {
  resetStore();
});

/**
 * most tests shine a lamp from block (1,1) in the "left" (+x) direction.
 * The lamp is a full block, so the beam starts at x=32. The beam's square
 * cross-section is 8px, centred in the lamp's footprint (y 20..28) and
 * lifted 2px off the lamp's base (z 2..10)
 */
const lampAtOneOne = (activated: boolean): ItemsInTestRoomJson => ({
  lamp1: {
    type: "lamp",
    position: { x: 1, y: 1, z: 0 },
    config: { direction: "left", activated },
  },
});

const playerOutOfBeamPath = (
  position: Xyz = { x: 0, y: 5, z: 0 },
): ItemsInTestRoomJson => ({
  heels: {
    type: "player",
    position,
    config: { which: "heels" },
  },
});

/**
 * the lightBeam items the current room is casting, sorted by direction. Beam
 * ids are arbitrary (assigned by the shared id generator) and the cast order is
 * an implementation detail, so tests assert the beams a room produces by their
 * properties as an order-independent set rather than by looking them up by id
 */
const beamsInRoom = (gameState: GameState<TestRoomId>) =>
  roomItemsIterable(selectCurrentRoomState(gameState)!.items)
    .filter(isLightBeam)
    .toArray()
    .sort((a, b) => a.config.direction.localeCompare(b.config.direction));

test("a lamp shines a beam to the room wall", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(true),
    },
  });

  playGameThrough(gameState, { until: 200 });

  expect(beamsInRoom(gameState)).toMatchObject([
    {
      config: { direction: "left", sourceItemId: "lamp1" },
      // the (8x8-section) beam runs from the lamp's face at x=32 to the
      // room's left wall at x=128, where its energy dissipates:
      state: { position: { x: 32, y: 20, z: 2 }, end: "terminus" },
      aabb: { x: 96, y: 8, z: 8 },
    },
  ]);
});

test("the beam is cast on room load, before any game time has passed", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(true),
    },
  });

  // no playGameThrough - the beam must already exist straight from
  // loadRoom, so the editor (which never ticks) and gameSpeed=0
  // screenshots still show it:
  expect(beamsInRoom(gameState)).toMatchObject([
    {
      config: { direction: "left", sourceItemId: "lamp1" },
      state: { position: { x: 32, y: 20, z: 2 }, end: "terminus" },
      aabb: { x: 96, y: 8, z: 8 },
    },
  ]);
});

test("a deactivated lamp shines no beam", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(false),
    },
  });

  playGameThrough(gameState, { until: 200 });

  expect(beamsInRoom(gameState)).toEqual([]);
});

test("a solid block stops the beam", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(true),
      blocker: {
        type: "block",
        position: { x: 5, y: 1, z: 0 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, { until: 200 });

  expect(beamsInRoom(gameState)).toMatchObject([
    // the beam stops at the block's face at x=80:
    { aabb: { x: 48, y: 8, z: 8 } },
  ]);
});

test("the player's body blocks the beam, harmlessly", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      // small items are centred in their block, so heels' aabb starts at x=50:
      ...playerOutOfBeamPath({ x: 3, y: 1, z: 0 }),
      ...lampAtOneOne(true),
    },
  });

  playGameThrough(gameState, { until: 500 });

  expect(beamsInRoom(gameState)).toMatchObject([
    // the beam runs from the lamp's face at x=32 exactly up to heels' body:
    { aabb: { x: heelsState(gameState).position.x - 32, y: 8, z: 8 } },
  ]);
  // standing in the light is harmless to the player:
  expect(heelsState(gameState).action).not.toBe("death");
});

test("a mirror reflects the beam 90° towards away", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(true),
      mirror1: {
        type: "mirror",
        position: { x: 5, y: 1, z: 0 },
        // a beam travelling "left" reflects to "away" off this orientation:
        config: { orientation: "awayLeft" },
      },
    },
  });

  playGameThrough(gameState, { until: 200 });

  expect(beamsInRoom(gameState)).toMatchObject([
    // the reflected beam leaves the mirror's away face at y=32, centred in the
    // mirror's footprint (x 84..92), and runs to the away wall at y=128:
    {
      config: { direction: "away" },
      state: { position: { x: 84, y: 32, z: 2 }, end: "terminus" },
      aabb: { x: 8, y: 96, z: 8 },
    },
    // the first segment ends at the mirror's near face at x=80, bending to its
    // travelling-left (the +y) side - the renderer draws the bend through the
    // mirror's block from there:
    {
      config: { direction: "left" },
      state: { position: { x: 32, y: 20, z: 2 }, end: "reflect-left" },
      aabb: { x: 48, y: 8, z: 8 },
    },
  ]);
});

test("a mirror in the other orientation reflects the beam towards the camera", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(true),
      mirror1: {
        type: "mirror",
        position: { x: 5, y: 1, z: 0 },
        // a beam travelling "left" reflects to "towards" off this orientation:
        config: { orientation: "awayRight" },
      },
    },
  });

  playGameThrough(gameState, { until: 200 });

  expect(beamsInRoom(gameState)).toMatchObject([
    // the first segment from the lamp, bending to its travelling-right side:
    {
      config: { direction: "left" },
      state: { position: { x: 32, y: 20, z: 2 }, end: "reflect-right" },
      aabb: { x: 48, y: 8, z: 8 },
    },
    // the reflected beam runs towards the camera to the near wall:
    {
      config: { direction: "towards" },
      state: { position: { x: 84, y: 0, z: 2 }, end: "terminus" },
      aabb: { x: 8, y: 16, z: 8 },
    },
  ]);
});

test("two mirrors chain the beam through multiple reflections", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath({ x: 0, y: 7, z: 0 }),
      ...lampAtOneOne(true),
      mirror1: {
        type: "mirror",
        position: { x: 5, y: 1, z: 0 },
        config: { orientation: "awayLeft" },
      },
      mirror2: {
        type: "mirror",
        position: { x: 5, y: 4, z: 0 },
        // the beam arrives travelling "away", and reflects to "right":
        config: { orientation: "awayRight" },
      },
    },
  });

  playGameThrough(gameState, { until: 200 });

  expect(beamsInRoom(gameState)).toMatchObject([
    // mirror1 -> mirror2: the away segment running between the two mirrors:
    {
      config: { direction: "away" },
      state: { position: { x: 84, y: 32, z: 2 }, end: "reflect-left" },
      aabb: { x: 8, y: 32, z: 8 },
    },
    // lamp -> mirror1: the first segment:
    {
      config: { direction: "left" },
      state: { position: { x: 32, y: 20, z: 2 }, end: "reflect-left" },
      aabb: { x: 48, y: 8, z: 8 },
    },
    // mirror2 -> wall: the third segment leaves mirror2's right face at x=80,
    // running -x to the room's right wall at x=0:
    {
      config: { direction: "right" },
      state: { position: { x: 0, y: 68, z: 2 }, end: "terminus" },
      aabb: { x: 80, y: 8, z: 8 },
    },
  ]);
});

test("colliding with a mirror rotates it, re-routing the light", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath({ x: 5, y: 4, z: 0 }),
      ...lampAtOneOne(true),
      mirror1: {
        type: "mirror",
        position: { x: 5, y: 1, z: 0 },
        config: { orientation: "awayLeft" },
      },
    },
  });

  expect(itemState<"mirror">(gameState, "mirror1").orientation).toBe(
    "awayLeft",
  );

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      // heels walks towards (-y) into the mirror:
      mockInputStateTracker.mockDirectionPressed = "towards";
    },
    until(gameState) {
      return (
        itemState<"mirror">(gameState, "mirror1").orientation === "awayRight" ||
        gameState.gameTime > 5_000
      );
    },
  });

  expect(itemState<"mirror">(gameState, "mirror1").orientation).toBe(
    "awayRight",
  );
  // with the mirror flipped, the reflection re-routes from "away" (where
  // heels is now standing, blocking it) to "towards":
  expect(beamsInRoom(gameState)).toMatchObject([
    {
      config: { direction: "left" },
      state: { position: { x: 32, y: 20, z: 2 }, end: "reflect-right" },
      aabb: { x: 48, y: 8, z: 8 },
    },
    {
      config: { direction: "towards" },
      state: { position: { x: 84, y: 0, z: 2 }, end: "terminus" },
      aabb: { x: 8, y: 16, z: 8 },
    },
  ]);
});

test("monsters will not walk into the light", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(true),
      turtle: {
        type: "monster",
        position: { x: 6, y: 1, z: 0 },
        config: {
          which: "turtle",
          movement: "back-forth",
          startDirection: "right",
          activated: "on",
        },
      },
    },
  });

  let monsterMinX = Number.POSITIVE_INFINITY;
  playGameThrough(gameState, {
    until: 4_000,
    frameCallbacks(gameState) {
      monsterMinX = Math.min(
        monsterMinX,
        itemState<"monster">(gameState, "turtle").position.x,
      );
    },
  });

  // the turtle walks right (-x) towards the lamp, but the beam holds it
  // close to where it started (x=98) - it never crosses the light:
  expect(monsterMinX).toBeGreaterThan(90);
});

test("a beam that has grown in place still blocks monsters at its new tip", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      // heels starts inside the beam's path, close to the lamp, so the beam
      // is created short - then walks away (+y), out of the light, making
      // the beam grow in place: its min corner stays at the lamp's face and
      // only its aabb lengthens
      ...playerOutOfBeamPath({ x: 3, y: 1, z: 0 }),
      ...lampAtOneOne(true),
      turtle: {
        type: "monster",
        position: { x: 6, y: 1, z: 0 },
        config: {
          which: "turtle",
          movement: "back-forth",
          startDirection: "right",
          // waits until the beam has grown before walking:
          activated: "off",
        },
      },
    },
  });

  let monsterMinX = Number.POSITIVE_INFINITY;
  playGameThrough(gameState, {
    until: 5_000,
    setupInitialInput(mockInputStateTracker) {
      // heels steps out of the light:
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    frameCallbacks(gameState) {
      const turtleState = itemState<"monster">(gameState, "turtle");
      if (gameState.gameTime > 1_000 && !turtleState.activated) {
        // heels is well clear and the beam has grown - release the turtle:
        turtleState.activated = true;
        turtleState.everActivated = true;
      }
      monsterMinX = Math.min(monsterMinX, turtleState.position.x);
    },
  });

  // the grown beam must hold the turtle near where it started (x=98), the
  // same as if it had been cast long in the first place:
  expect(monsterMinX).toBeGreaterThan(90);
});

test("monsters walk freely where the light would be when the lamp is off", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath(),
      ...lampAtOneOne(false),
      turtle: {
        type: "monster",
        position: { x: 6, y: 1, z: 0 },
        config: {
          which: "turtle",
          movement: "back-forth",
          startDirection: "right",
          activated: "on",
        },
      },
    },
  });

  let monsterMinX = Number.POSITIVE_INFINITY;
  playGameThrough(gameState, {
    until: 4_000,
    frameCallbacks(gameState) {
      monsterMinX = Math.min(
        monsterMinX,
        itemState<"monster">(gameState, "turtle").position.x,
      );
    },
  });

  // with no beam in its way, the turtle walks right up to the lamp itself:
  expect(monsterMinX).toBeLessThan(60);
});

test("a switch turns the lamp on", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath({ x: 0, y: 3, z: 0 }),
      ...lampAtOneOne(false),
      switch1: {
        type: "switch",
        position: { x: 3, y: 3, z: 0 },
        config: {
          type: "in-room",
          initialSetting: "right",
          modifies: [{ expectType: "lamp", activates: true }],
        },
      },
    },
  });

  expect(beamsInRoom(gameState)).toEqual([]);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      // heels walks left (+x) into the switch:
      mockInputStateTracker.mockDirectionPressed = "left";
    },
    until(gameState) {
      return (
        itemState<"lamp">(gameState, "lamp1").activated ||
        gameState.gameTime > 5_000
      );
    },
  });

  expect(itemState<"lamp">(gameState, "lamp1").activated).toBe(true);
  expect(beamsInRoom(gameState)).toHaveLength(1);
});

test.for([
  // pushing on the (-y) half of the mirror's face torques it clockwise (in
  // screen terms); pushing on the (+y) half, anticlockwise:
  { heelsY: 3.6, expectedFlipDirection: "clockwise" },
  { heelsY: 4.4, expectedFlipDirection: "anticlockwise" },
] as const)(
  "pushing a mirror off-centre at y=$heelsY turns it $expectedFlipDirection",
  ({ heelsY, expectedFlipDirection }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: heelsY, z: 0 },
          config: { which: "heels" },
        },
        mirror1: {
          type: "mirror",
          position: { x: 5, y: 4, z: 0 },
          config: { orientation: "awayLeft" },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // heels walks left (+x) into the mirror, off-centre:
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until(gameState) {
        return (
          itemState<"mirror">(gameState, "mirror1").orientation ===
            "awayRight" || gameState.gameTime > 5_000
        );
      },
    });

    expect(itemState<"mirror">(gameState, "mirror1").flipDirection).toBe(
      expectedFlipDirection,
    );
  },
);

/**
 * a double-height lamp at block (1,1): its top beam row crosses the room at
 * one block up, where it can block monsters walking on top of single-height
 * blocks
 */
const tallLampAtOneOne = (timesZ: number): ItemsInTestRoomJson => ({
  lamp1: {
    type: "lamp",
    position: { x: 1, y: 1, z: 0 },
    config: {
      direction: "left",
      activated: true,
      ...(timesZ > 1 ? { times: { z: timesZ } } : {}),
    },
  },
});

const turtleOnPlatform = (x: number): ItemsInTestRoomJson => ({
  turtle: {
    type: "monster",
    position: { x, y: 1, z: 1 },
    config: {
      which: "turtle",
      movement: "back-forth",
      startDirection: "right",
      activated: "on",
    },
  },
});

test.for([
  // the double-height lamp's upper beam row crosses above the platform's
  // surface, holding the turtle near where it started; a single-height
  // lamp's beam is swallowed by the platform's blocks, leaving the turtle
  // free to walk the platform's full length:
  { timesZ: 2, blocked: true },
  { timesZ: 1, blocked: false },
])(
  "a lamp of height $timesZ blocks monsters walking on a platform: $blocked",
  ({ timesZ, blocked }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        ...playerOutOfBeamPath({ x: 0, y: 5, z: 0 }),
        ...tallLampAtOneOne(timesZ),
        platform: {
          type: "block",
          position: { x: 4, y: 1, z: 0 },
          config: { style: "organic", times: { x: 4 } },
        },
        ...turtleOnPlatform(7),
      },
    });

    let monsterMinX = Number.POSITIVE_INFINITY;
    playGameThrough(gameState, {
      until: 4_000,
      frameCallbacks(gameState) {
        monsterMinX = Math.min(
          monsterMinX,
          itemState<"monster">(gameState, "turtle").position.x,
        );
      },
    });

    if (blocked) {
      expect(monsterMinX).toBeGreaterThan(105);
    } else {
      expect(monsterMinX).toBeLessThan(80);
    }
  },
);

test.for([
  /*
   * a double-height beam hitting a single-height mirror splits: the lower
   * row reflects away while the upper row carries straight on over the
   * mirror, still blocking the turtle on the raised platform beyond it.
   * Against a double-height mirror the whole beam reflects, and the
   * platform turtle roams freely
   */
  { mirrorTimesZ: 1, platformTurtleBlocked: true },
  { mirrorTimesZ: 2, platformTurtleBlocked: false },
])(
  "a tall beam vs a mirror of height $mirrorTimesZ: continues above it $platformTurtleBlocked",
  ({ mirrorTimesZ, platformTurtleBlocked }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        ...playerOutOfBeamPath({ x: 0, y: 6, z: 0 }),
        ...tallLampAtOneOne(2),
        mirror1: {
          type: "mirror",
          position: { x: 4, y: 1, z: 0 },
          config: {
            orientation: "awayLeft",
            ...(mirrorTimesZ > 1 ? { times: { z: mirrorTimesZ } } : {}),
          },
        },
        platform: {
          type: "block",
          position: { x: 5, y: 1, z: 0 },
          config: { style: "organic", times: { x: 3 } },
        },
        ...turtleOnPlatform(7),
      },
    });

    let monsterMinX = Number.POSITIVE_INFINITY;
    playGameThrough(gameState, {
      until: 4_000,
      frameCallbacks(gameState) {
        monsterMinX = Math.min(
          monsterMinX,
          itemState<"monster">(gameState, "turtle").position.x,
        );
      },
    });

    if (platformTurtleBlocked) {
      expect(monsterMinX).toBeGreaterThan(105);
    } else {
      expect(monsterMinX).toBeLessThan(95);
    }
  },
);

test("the reflected lower row of a partially-reflected tall beam blocks monsters on the ground", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath({ x: 0, y: 6, z: 0 }),
      ...tallLampAtOneOne(2),
      mirror1: {
        type: "mirror",
        position: { x: 4, y: 1, z: 0 },
        config: { orientation: "awayLeft" },
      },
      // walks towards (-y), into the path of the reflected (away-going)
      // lower beam row:
      turtle: {
        type: "monster",
        position: { x: 4, y: 6, z: 0 },
        config: {
          which: "turtle",
          movement: "back-forth",
          startDirection: "towards",
          activated: "on",
        },
      },
    },
  });

  let monsterMinY = Number.POSITIVE_INFINITY;
  playGameThrough(gameState, {
    until: 4_000,
    frameCallbacks(gameState) {
      monsterMinY = Math.min(
        monsterMinY,
        itemState<"monster">(gameState, "turtle").position.y,
      );
    },
  });

  // the reflected row runs from the mirror at y=32 up the room - the turtle
  // walking down the same column is held off by it:
  expect(monsterMinY).toBeGreaterThan(80);
});

test("a beam looped back through mirrors stops at its own lamp, not through it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      ...playerOutOfBeamPath({ x: 0, y: 0, z: 0 }),
      // a lamp shining "towards" into a ring of three mirrors, so the beam
      // reflects all the way round and arrives back at the lamp's own block.
      // Being opaque, the lamp must stop its own returning beam:
      lamp1: {
        type: "lamp",
        position: { x: 5, y: 5.5, z: 0 },
        config: { direction: "towards", activated: true },
      },
      // towards -> right
      mirrorA: {
        type: "mirror",
        position: { x: 5, y: 1.5, z: 0 },
        config: { orientation: "awayLeft" },
      },
      // right -> away
      mirrorB: {
        type: "mirror",
        position: { x: 2, y: 1.5, z: 0 },
        config: { orientation: "awayRight" },
      },
      // away -> left, sending the final leg back along the lamp's own row
      mirrorC: {
        type: "mirror",
        position: { x: 2, y: 5.5, z: 0 },
        config: { orientation: "awayLeft" },
      },
      // the turtle walks "towards" (-y) down the far (x=7) column. The beam's
      // final leg only crosses that column if it wrongly passes through the
      // lamp and runs on to the wall; if it correctly stops at the lamp, the
      // column is clear and the turtle walks the whole way down:
      turtle: {
        type: "monster",
        position: { x: 7, y: 7, z: 0 },
        config: {
          which: "turtle",
          movement: "forwards",
          startDirection: "towards",
          activated: "on",
        },
      },
    },
  });

  let monsterMinY = Number.POSITIVE_INFINITY;
  playGameThrough(gameState, {
    until: 5_000,
    frameCallbacks(gameState) {
      monsterMinY = Math.min(
        monsterMinY,
        itemState<"monster">(gameState, "turtle").position.y,
      );
    },
  });

  // the turtle gets far down the column - only possible because the looped
  // beam terminated at the lamp rather than shooting through it across the
  // turtle's path:
  expect(monsterMinY).toBeLessThan(80);
});
