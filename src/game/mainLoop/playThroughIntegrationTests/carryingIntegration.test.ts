import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import {
  heelsState,
  item,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

test("heels can pick up and put down a cube", () => {
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

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockNotPressing("carry");
    },
    until() {
      // wait for heels to land on the floor:
      return heelsState(gameState).standingOnItemId === "floor";
    },
  });

  expect(heelsState(gameState).carrying?.type).toBe("portableBlock");
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

  expect(itemState(gameState, "floor").stoodOnBy).toEqual({ portable: true });
  expect(itemState(gameState, "portable").stoodOnBy).toEqual({
    heels: true,
  });
  expect(heelsState(gameState).standingOnItemId).toEqual("portable");
});

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

  const { y: pushableStartY } = itemState(gameState, "pushable").position;

  // fell back to the floor - start running into the pushable block
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    until() {
      return itemState(gameState, "pushable").position.y !== pushableStartY;
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
          // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
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
