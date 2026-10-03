import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { type DistributedOmit } from "type-fest";

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
  type TestRoomId,
} from "../../../_testUtils/basicRoom";
import {
  headState,
  heelsState,
  item,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { type GameStateWithMockInput } from "../../../_testUtils/MockInputStateTracker";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { type JsonItemUnion } from "../../../model/json/JsonItem";
import { lengthXy, subXy } from "../../../utils/vectors/vectors";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { type PortableItem } from "../../physics/itemPredicates";
import { carryingInputLatchDuration } from "../../physics/mechanics/puttingDown";
import {
  blockSizePx,
  defaultRoomHeightBlocks,
} from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

const carriedCubeId = "carriedCube";

/** gives heels the bag, already carrying a cube */
const giveHeelsCarriedCube = (gameState: GameStateWithMockInput) => {
  const room = selectCurrentRoomState(gameState)!;
  const [carriedCube] = loadItemFromJson(
    carriedCubeId,
    {
      type: "portableBlock",
      config: { style: "cube" },
      position: { x: 0, y: 0, z: 0 },
    },
    room.roomJson,
  );
  const heels = heelsState(gameState);
  heels.hasBag = true;
  heels.carrying = carriedCube as PortableItem<TestRoomId, string>;
};

test.for<{
  itemJson: DistributedOmit<JsonItemUnion<TestRoomId>, "position">;
  expectedPortable: boolean;
}>([
  {
    itemJson: {
      type: "portableBlock",
      config: {
        style: "cube",
      },
    },
    expectedPortable: true,
  },
  {
    itemJson: {
      type: "spring",
      config: {},
    },
    expectedPortable: true,
  },
  {
    itemJson: {
      type: "slidingBlock",
      config: {
        style: "puck",
      },
    },
    expectedPortable: true,
  },
  {
    itemJson: {
      type: "slidingBlock",
      config: {
        style: "book",
      },
    },
    expectedPortable: false,
  },
  {
    itemJson: {
      type: "block",
      config: {
        style: "organic",
      },
    },
    expectedPortable: false,
  },
  {
    itemJson: {
      type: "pickup",
      config: {
        gives: "doughnuts",
      },
    },
    // heels cannot use doughnuts so can carry them:
    expectedPortable: true,
  },
  {
    itemJson: {
      type: "pickup",
      config: {
        gives: "shield",
      },
    },
    // touching a shield collects it - cannot carry
    expectedPortable: false,
  },
  {
    itemJson: {
      type: "monster",
      config: {
        which: "turtle",
        activated: "off",
        movement: "back-forth",
        startDirection: "away",
      },
    },
    // a deactivated turtle can be picked up:
    expectedPortable: true,
  },
  {
    itemJson: {
      type: "monster",
      config: {
        which: "cyberman",
        activated: "on",
        // this monster should stay where it is:
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
      },
    },
    // an activated monster can not be picked up (player will lose a life instead)
    expectedPortable: false,
  },
])(
  "heels can pick up and put down: $itemJson.type $itemJson.config = $expectedPortable",
  ({ itemJson, expectedPortable }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 3 },
          config: {
            which: "heels",
          },
        },
        bag: {
          type: "pickup",
          position: { x: 5, y: 5, z: 2 },
          config: {
            gives: "bag",
          },
        },
        testItem: { ...itemJson, position: { x: 5, y: 5, z: 0 } },
      },
    });

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        const hs = heelsState(gameState);

        if (hs.standingOnItemId === "testItem" && hs.carrying === null) {
          gameState.inputStateTracker.mockPressing("carry");
        }
      },
      until() {
        return expectedPortable ?
            heelsState(gameState).carrying?.id === "testItem"
            // if we're not expecting it to be portable, wait a short time before giving up trying to carry it:
          : gameState.gameTime >= 5_000;
      },
    });

    if (!expectedPortable) {
      expect(heelsState(gameState).carrying).toBeNull();
      // ok, the test is done!
      return;
    }

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockNotPressing("carry");
      },
      until() {
        // wait for heels to land on the floor:
        return heelsState(gameState).standingOnItemId === "floor";
      },
    });

    expect(heelsState(gameState).carrying?.id).toBe("testItem");
    expect(itemState(gameState, "floor").stoodOnBy).toEqual({ heels: true });

    // fell back to the floor - drop the item again:
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // heels in on the floor - start pressing carry to put down the cube:
        mockInputStateTracker.mockPressing("carry");
      },
      until() {
        return heelsState(gameState).carrying === null;
      },
    });

    expect(itemState(gameState, "floor").stoodOnBy).toEqual({ testItem: true });
    expect(itemState(gameState, "testItem").stoodOnBy).toEqual({
      heels: true,
    });
    expect(heelsState(gameState).standingOnItemId).toEqual("testItem");
    // every use of the bag succeeded, so no failure was recorded:
    expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeUndefined();
  },
);

// seems obscure, but caused issues putting down while pushing for heels in
// #blacktooth27fish that would store inconsistent state and have a knock-on
// effect when exiting the room
test("heels can put down an item while pushing another item with a pickup on top of it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 0, z: 2 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 5, y: 0, z: 1 },
        config: {
          gives: "bag",
        },
      },
      portable: {
        type: "portableBlock",
        position: { x: 5, y: 0, z: 0 },
        config: {
          style: "cube",
        },
      },
      pushable: {
        type: "pushableBlock",
        position: { x: 5, y: 2, z: 0 },
        config: {},
      },
      pickup: {
        type: "pickup",
        position: { x: 5, y: 2, z: 1 },
        config: {
          gives: "reincarnation",
        },
      },
    },
  });

  playGameThrough(gameState, {
    frameCallbacks(gameState) {
      const hs = heelsState(gameState);

      if (hs.standingOnItemId === "portable" && hs.carrying === null) {
        gameState.inputStateTracker.mockPressing("carry");
      }
    },
    until() {
      return heelsState(gameState).carrying?.type === "portableBlock";
    },
  });

  //___ now: picked up ___

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
    },
    until() {
      // wait for heels to land on the floor:
      return heelsState(gameState).standingOnItemId === "floor";
    },
  });

  //___ now: on floor ___

  const { y: pushableStartY } = itemState(gameState, "pushable").box;

  // fell back to the floor - start running into the pushable block
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    until() {
      return itemState(gameState, "pushable").box.y !== pushableStartY;
    },
  });

  //___ now: push started ___

  // let heels push it for a little while:
  playGameThrough(gameState, {
    until: 700,
  });

  //___ now: pushing for a while ___

  // the pickup should be there:
  expect(item(gameState, "pickup")).toBeDefined();

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until() {
      // putting that down should have raised heels up to collect the pickup
      return item(gameState, "pickup") === undefined;
    },
  });

  expect(heelsState(gameState).standingOnItemId).toBe("portable");
});

test("heels can jump-pick up a cube by holding jump and carry while falling onto it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 2 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 5, y: 5, z: 1 },
        config: {
          gives: "bag",
        },
      },
      portable: {
        type: "portableBlock",
        position: { x: 5, y: 5, z: 0 },
        config: {
          style: "cube",
        },
      },
      // can only get on this block with the cube by carry-jumping:
      higherBlock: {
        type: "block",
        position: { x: 4, y: 5, z: 1 },
        config: {
          style: "organic",
        },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] },
    until: () => heelsState(gameState).standingOnItemId !== "higherBlock",
    frameCallbacks(gameState) {
      gameState.inputStateTracker.mockPressing("right");
      gameState.inputStateTracker.mockPressing("carry");
      gameState.inputStateTracker.mockPressing("jump");
    },
  });
});

test("carrying an item through a door drops it in the room", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: {
          x: 1,
          // at this y heels is perfectly aligned to get through the door without colliding with the doorframe
          y: 2.5,
          z: 5,
        },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 1, y: 2.5, z: 1 },
        config: {
          gives: "bag",
        },
      },
      portable: {
        type: "portableBlock",
        position: { x: 1, y: 2.5, z: 0 },
        config: {
          style: "cube",
        },
      },
      // head will keep the first room loaded when heels leaves it
      head: {
        type: "player",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        config: {
          which: "head",
        },
      },
      doorToSecondRoom: {
        type: "door",
        position: { x: 0, y: 2, z: 0 },
        config: { direction: "right", toRoom: secondRoomId },
      },
    },
    secondRoomItems: {
      doorToFirstRoom: {
        type: "door",
        position: { x: 8, y: 2, z: 0 },
        config: { direction: "left", toRoom: firstRoomId },
      },
    },
  });

  // head starts so switch to heels:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until() {
      return gameState.currentCharacterName === "heels";
    },
  });

  // land on the portable block to pick it up:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("swop");
    },
    until() {
      return heelsState(gameState).standingOnItemId === "portable";
    },
  });

  // pick up the portable block:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until() {
      return heelsState(gameState).carrying?.type === "portableBlock";
    },
  });

  // leave the room:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // wait until heels is in the next room:
      return selectCurrentRoomState(gameState)?.id === "secondRoom";
    },
  });

  // switch back to head:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until() {
      return gameState.currentCharacterName === "head";
    },
  });

  // the portable block should now be in head's room
  expect(selectCurrentRoomState(gameState)?.items?.portable).toBeDefined();
  // heels should no longer be carrying it:
  expect(heelsState(gameState).carrying).toBeNull();
});

test("if Heels loses life while carrying, the carried item is dropped", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: {
          x: 1,
          // at this y heels is perfectly aligned to get through the door without colliding with the doorframe
          y: 2.5,
          z: 5,
        },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 1, y: 2.5, z: 1 },
        config: {
          gives: "bag",
        },
      },
      door: {
        type: "door",
        position: { x: 0, y: 2, z: 0 },
        config: { direction: "right", toRoom: secondRoomId },
      },
    },
    secondRoomItems: {
      // head will keep the first room loaded when heels leaves it
      head: {
        type: "player",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        config: {
          which: "head",
        },
      },
      door: {
        type: "door",
        position: { x: 8, y: 2, z: 2 },
        config: { direction: "left", toRoom: firstRoomId },
      },
      // on coming through the door, heels should walk onto this portable block:
      portable: {
        type: "portableBlock",
        position: { x: 7, y: 2.5, z: 0 },
        config: {
          style: "cube",
        },
      },
      deadlyBlock: {
        type: "deadlyBlock",
        position: { x: 4, y: 2.5, z: 0 },
        config: {
          style: "volcano",
        },
      },
    },
  });

  const portableBlockOriginalPosition =
    gameState.characterRooms.head?.items.portable.state.box;

  // head starts so switch to heels:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until() {
      return gameState.currentCharacterName === "heels";
    },
  });

  // walk though the door:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      return gameState.characterRooms.heels?.id === "secondRoom";
    },
  });

  // stand on the portable block:
  playGameThrough(gameState, {
    until() {
      return heelsState(gameState).standingOnItemId === "portable";
    },
  });

  // pick up the portable block:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until() {
      return heelsState(gameState).carrying?.type === "portableBlock";
    },
  });

  // continue right onto the volcano:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until(gameState) {
      // wait until heels is in the next room:
      return heelsState(gameState).lives === 7;
    },
  });

  // the portable block should still be in head's room
  expect(selectCurrentRoomState(gameState)?.items?.portable).toBeDefined();

  // should not be in its original loading position (should be where heels died)
  expect(gameState.characterRooms.head?.items.portable.state.box).not.toEqual(
    portableBlockOriginalPosition,
  );
});

test("heels taps carry with no bag and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });

  gameState.inputStateTracker.mockPressing("carry");
  playGameThrough(gameState);

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    1_000 / 60,
  );
});

test("heels taps carry with nothing to pick up and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 1 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 5, y: 5, z: 0 },
        config: {
          gives: "bag",
        },
      },
    },
  });

  playGameThrough(gameState, {
    // heels collects the bag while falling - wait until she has landed, since
    // a tap in mid-air with nothing to pick up is not a failure:
    until: (gameState) =>
      heelsState(gameState).hasBag &&
      heelsState(gameState).standingOnItemId === "floor",
  });

  const carryStartTime = gameState.gameTime;
  gameState.inputStateTracker.mockPressing("carry");
  playGameThrough(gameState);

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    carryStartTime + 1_000 / 60,
  );
});

test("heels holding carry in mid-air with nothing to pick up is not a failure", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 5 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 5, y: 5, z: 4 },
        config: {
          gives: "bag",
        },
      },
    },
  });

  playGameThrough(gameState, {
    until: (gameState) => heelsState(gameState).hasBag,
  });

  // start pressing while still falling, and keep holding it until landing:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).standingOnItemId === "floor",
  });

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeUndefined();
});

/**
 * lands heels on the floor, then jumps and taps carry as soon as she leaves the
 * ground, so the cube is put down while she is low over the floor
 */
const jumpAndPutDownLowOverFloor = (gameState: GameStateWithMockInput) => {
  playGameThrough(gameState, {
    until: (gameState) => heelsState(gameState).standingOnItemId === "floor",
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until: (gameState) => heelsState(gameState).standingOnItemId === null,
  });

  // no direction input from here - any horizontal movement is jump momentum:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("jump");
      mockInputStateTracker.mockDirectionPressed = undefined;
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying === null,
  });
};

test("heels can put down mid-jump without failing to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  jumpAndPutDownLowOverFloor(gameState);

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeUndefined();
});

test("putting down low over the floor mid-jump puts the item on the floor", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  jumpAndPutDownLowOverFloor(gameState);

  // no space for it below heels, so it is raised up onto the floor:
  expect(itemState(gameState, carriedCubeId).box.z).toBe(0);
});

test("putting down low over the floor mid-jump raises heels onto the item", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  jumpAndPutDownLowOverFloor(gameState);

  expect(heelsState(gameState).box.z).toBeGreaterThanOrEqual(blockSizePx.z);
});

test("heels keeps her jump momentum after putting down mid-jump", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  jumpAndPutDownLowOverFloor(gameState);

  const putDownPosition = { ...heelsState(gameState).box };
  playGameThrough(gameState, { until: gameState.gameTime + 200 });

  expect(
    lengthXy(subXy(heelsState(gameState).box, putDownPosition)),
  ).toBeGreaterThan(1);
});

test("heels putting down high in mid-air puts the item directly below her", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 6 },
        config: {
          which: "heels",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  // heels starts falling, so this is a mid-air put down:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying === null,
  });

  // not dropped to the floor - both fall from here:
  expect(itemState(gameState, carriedCubeId).box.z).toBeGreaterThan(
    blockSizePx.z,
  );
});

test("heels putting down high in mid-air does not rise onto the item", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 6 },
        config: {
          which: "heels",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying === null,
  });

  expect(heelsState(gameState).standingOnItemId).toBeNull();
});

test("heels taps carry under a ceiling and fails to put down", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 5, z: 2 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 4, y: 5, z: 1 },
        config: {
          gives: "bag",
        },
      },
      portable: {
        type: "portableBlock",
        position: { x: 4, y: 5, z: 0 },
        config: {
          style: "cube",
        },
      },
      // heels is exactly one block tall, so she fits below this but the cube
      // cannot be put down here:
      ceiling: {
        type: "block",
        position: { x: 5, y: 5, z: 1 },
        config: {
          style: "organic",
        },
      },
    },
  });

  // pick up the cube from standing on it:
  playGameThrough(gameState, {
    frameCallbacks(gameState) {
      const hs = heelsState(gameState);
      if (hs.standingOnItemId === "portable" && hs.carrying === null) {
        gameState.inputStateTracker.mockPressing("carry");
      }
    },
    until: (gameState) => heelsState(gameState).carrying !== null,
  });

  // walk in the +x direction, under the ceiling block:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
      mockInputStateTracker.mockDirectionPressed = "left";
    },
    until: (gameState) => heelsState(gameState).box.x >= 5 * blockSizePx.x,
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = undefined;
    },
    until: gameState.gameTime + 100,
  });

  const carryStartTime = gameState.gameTime;
  gameState.inputStateTracker.mockPressing("carry");
  playGameThrough(gameState);

  // still holding the cube - there was no space to put it down:
  expect(heelsState(gameState).carrying).not.toBeNull();
  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    carryStartTime + 1_000 / 60,
  );
});

test("head taps carry and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "head",
        },
      },
    },
  });

  gameState.inputStateTracker.mockPressing("carry");
  playGameThrough(gameState);

  expect(headState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    1_000 / 60,
  );
});

test("heels taps carry in mid-air under a ceiling and fails to put down", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        // slightly above the floor, so falling:
        position: { x: 5, y: 5, z: 0.25 },
        config: {
          which: "heels",
        },
      },
      // the cube would go on the floor, but heels can't then fit on top of it:
      ceiling: {
        type: "block",
        position: { x: 5, y: 5, z: 1.5 },
        config: {
          style: "organic",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  const carryStartTime = gameState.gameTime;
  gameState.inputStateTracker.mockPressing("carry");
  playGameThrough(gameState);

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    carryStartTime + 1_000 / 60,
  );
});

test("putting down pushes an overhanging item on heels straight up, not sideways", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
      // half overhanging heels, so sideways would be a shorter way out than up:
      onHeels: {
        type: "portableBlock",
        position: { x: 5.5, y: 5, z: 1 },
        config: {
          style: "cube",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"portableBlock">(gameState, "onHeels").standingOnItemId ===
      "heels",
  });
  const { x, y } = itemState(gameState, "onHeels").box;

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying === null,
  });

  expect(itemState(gameState, "onHeels").box).toMatchObject({
    x,
    y,
    z: 2 * blockSizePx.z,
  });
});

/** a stack of portable blocks, one on top of the other, standing on heels */
const stackOnHeels = {
  stack1: {
    type: "portableBlock",
    position: { x: 5, y: 5, z: 1 },
    config: { style: "cube" },
  },
  stack2: {
    type: "portableBlock",
    position: { x: 5, y: 5, z: 2 },
    config: { style: "cube" },
  },
  stack3: {
    type: "portableBlock",
    position: { x: 5, y: 5, z: 3 },
    config: { style: "cube" },
  },
} as const satisfies Record<string, JsonItemUnion<TestRoomId>>;

test("putting down on the floor raises a stack of items on heels", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
      ...stackOnHeels,
    },
  });
  giveHeelsCarriedCube(gameState);

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"portableBlock">(gameState, "stack3").standingOnItemId ===
      "stack2",
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying === null,
  });

  // every item in the stack went up by exactly one block:
  expect(
    ["stack1", "stack2", "stack3"].map(
      (stackItemId) => itemState(gameState, stackItemId).box.z,
    ),
  ).toEqual([2 * blockSizePx.z, 3 * blockSizePx.z, 4 * blockSizePx.z]);
});

test("putting down on the floor fails if a stack of items on heels is blocked from above", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
      ...stackOnHeels,
      // touching the top of the stack, so the stack can't rise:
      ceiling: {
        type: "block",
        position: { x: 5, y: 5, z: 4 },
        config: {
          style: "organic",
        },
      },
    },
  });
  giveHeelsCarriedCube(gameState);

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"portableBlock">(gameState, "stack3").standingOnItemId ===
      "stack2",
  });

  const carryStartTime = gameState.gameTime;
  gameState.inputStateTracker.mockPressing("carry");
  playGameThrough(gameState);

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    carryStartTime + 1_000 / 60,
  );
});

/**
 * heels stands only on the part of the block that hangs off the ledge, so she
 * falls straight down once she picks it up
 */
const setUpPortableHangingOffHighLedge = () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 6, y: 5, z: 9 },
        config: {
          which: "heels",
        },
      },
      portable: {
        type: "portableBlock",
        position: { x: 5.5, y: 5, z: 8 },
        config: {
          style: "cube",
        },
      },
      ledge: {
        type: "block",
        position: { x: 5, y: 5, z: 7 },
        config: {
          style: "organic",
        },
      },
    },
  });
  heelsState(gameState).hasBag = true;
  return gameState;
};

/**
 * picks up the block hanging off the ledge, then drops it while heels is
 * falling, well above the floor
 */
const pickUpFromLedgeAndDropWhileFalling = (
  gameState: GameStateWithMockInput,
) => {
  playGameThrough(gameState, {
    until: (gameState) => heelsState(gameState).standingOnItemId === "portable",
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying !== null,
  });

  // released for longer than the latch, so the next carry press is a new one:
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
    },
    until: gameState.gameTime + carryingInputLatchDuration,
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until: (gameState) => heelsState(gameState).carrying === null,
  });
};

test("heels dropping an item while falling does not stand on it until it has landed", () => {
  const gameState = setUpPortableHangingOffHighLedge();

  pickUpFromLedgeAndDropWhileFalling(gameState);

  const heelsStandsOnPortableBeforeItLands = (
    gameState: GameStateWithMockInput,
  ) =>
    heelsState(gameState).standingOnItemId === "portable" &&
    itemState<"portableBlock">(gameState, "portable").standingOnItemId !==
      "floor";

  // the frame of the drop itself:
  expect(heelsStandsOnPortableBeforeItLands(gameState)).toBe(false);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
    },
    frameCallbacks(gameState) {
      expect(heelsStandsOnPortableBeforeItLands(gameState)).toBe(false);
    },
    until: (gameState) =>
      itemState<"portableBlock">(gameState, "portable").standingOnItemId ===
      "floor",
  });
});

test("heels dropping an item while falling lands on it once it has landed", () => {
  const gameState = setUpPortableHangingOffHighLedge();

  pickUpFromLedgeAndDropWhileFalling(gameState);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
    },
    until: gameState.gameTime + 2_000,
  });

  expect(heelsState(gameState).standingOnItemId).toBe("portable");
});

describe("putting down pushes Heels through a ceiling portal", () => {
  /**
   * heels on a tower just under the exit to the room above - rising onto the
   * cube she puts down takes her through it
   */
  const setUpTowerUnderRoomAbove = (
    /** z of the top of the tower, in blocks */
    towerTopZ: number,
  ) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: towerTopZ },
          config: {
            which: "heels",
          },
        },
        tower: {
          type: "block",
          position: { x: 5, y: 5, z: towerTopZ - 1 },
          config: {
            style: "organic",
          },
        },
      },
      firstRoomProps: {
        meta: { subRooms: { "*": { above: { room: secondRoomId } } } },
      },
      secondRoomItems: {
        landing: {
          type: "block",
          position: { x: 5, y: 5, z: 0 },
          config: {
            style: "organic",
          },
        },
      },
      secondRoomProps: {
        meta: { subRooms: { "*": { below: { room: firstRoomId } } } },
      },
    });
    giveHeelsCarriedCube(gameState);
    return gameState;
  };

  /** put down, then play until the rise has taken heels to the room above */
  const putDownUntilInRoomAbove = (gameState: GameStateWithMockInput) =>
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("carry");
      },
      until: (gameState) => gameState.characterRooms.heels?.id === secondRoomId,
    });

  // one block of rise from here overlaps the exit at the ceiling:
  const towerTopUnderExitZ = defaultRoomHeightBlocks - 1.5;

  test("rising through the exit above while putting down does not leave heels standing on the item", () => {
    const gameState = setUpTowerUnderRoomAbove(towerTopUnderExitZ);
    playGameThrough(gameState, {
      until: (gameState) => heelsState(gameState).standingOnItemId === "tower",
    });

    putDownUntilInRoomAbove(gameState);

    // the item stayed behind in the room below:
    expect(heelsState(gameState).standingOnItemId).not.toBe(carriedCubeId);
  });

  test("rising through the exit above while putting down does not crash", () => {
    const gameState = setUpTowerUnderRoomAbove(towerTopUnderExitZ);
    playGameThrough(gameState, {
      until: (gameState) => heelsState(gameState).standingOnItemId === "tower",
    });

    expect(() => putDownUntilInRoomAbove(gameState)).not.toThrow();
  });

  test("rising through the exit above while putting down leaves the item in the room below", () => {
    const gameState = setUpTowerUnderRoomAbove(towerTopUnderExitZ);
    playGameThrough(gameState, {
      until: (gameState) => heelsState(gameState).standingOnItemId === "tower",
    });
    const roomBelow = gameState.characterRooms.heels!;

    putDownUntilInRoomAbove(gameState);

    expect(roomBelow.items[carriedCubeId]).toBeDefined();
  });

  test("rising through the exit above while putting down mid-jump does not leave heels standing on the item", () => {
    // a jump from here reaches the exit, so the put down must come early in it:
    const gameState = setUpTowerUnderRoomAbove(towerTopUnderExitZ + 1 / 6);
    playGameThrough(gameState, {
      until: (gameState) => heelsState(gameState).standingOnItemId === "tower",
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("jump");
      },
      until: (gameState) => heelsState(gameState).standingOnItemId === null,
    });
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockNotPressing("jump");
      },
      frameCallbacks(gameState) {
        gameState.inputStateTracker.mockPressing("carry");
      },
      until: (gameState) => gameState.characterRooms.heels?.id === secondRoomId,
    });

    expect(heelsState(gameState).standingOnItemId).not.toBe(carriedCubeId);
  });
});
