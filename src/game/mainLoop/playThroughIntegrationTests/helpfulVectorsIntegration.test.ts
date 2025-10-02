import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

test("player slides at a normal to the input direction when partially overlapping the block they are working into", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      soothingToRunInto: {
        type: "block",
        position: { x: 2, y: 3.5, z: 0 },
        config: {
          style: "organic",
        },
      },
    },
  });

  const startY = heelsState(gameState).position.y;

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // reached the right wall, even though there was a block in the way:
      return heelsState(gameState).position.x === 0;
    },
  });

  // slid on that block to change the y (at a normal to the direction of travel)
  expect(heelsState(gameState).position.y).toBeGreaterThan(startY);
});

test("player slides at a normal to the input direction after initially pushing a portable block without sliding", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      soothingToPush: {
        type: "portableBlock",
        position: { x: 2, y: 3.5, z: 0 },
        config: {
          style: "drum",
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // both heels and the thing they pushed made it to the wall:
      return (
        heelsState(gameState).position.x === 0 &&
        itemState(gameState, "soothingToPush").position.x === 0
      );
    },
  });
});

test("block pushed by player gets a helpful vector around an obstruction", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      soothingToPushInto: {
        type: "portableBlock",
        position: { x: 3, y: 3.5, z: 0 },
        config: {
          style: "drum",
        },
      },
      soothingToRunInto: {
        type: "block",
        position: { x: 2, y: 3, z: 0 },
        config: {
          style: "organic",
        },
      },
    },
  });

  const startY = itemState(gameState, "soothingToPushInto").position.y;

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // pushed item reached the right wall, even though there was a block in the way:
      return itemState(gameState, "soothingToPushInto").position.x === 0;
    },
  });

  // slid on that block to change the y (at a normal to the direction of travel)
  expect(itemState(gameState, "soothingToPushInto").position.y).toBeGreaterThan(
    startY,
  );
});
