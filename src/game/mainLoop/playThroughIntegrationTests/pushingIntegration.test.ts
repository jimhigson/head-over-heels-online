import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { BasicGameStateOptions } from "../../../_testUtils/basicRoom";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { smallItemAabb } from "../../collision/boundingBoxes";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

const withBlockToPush: BasicGameStateOptions = {
  firstRoomItems: {
    heels: {
      type: "player",
      position: { x: 0, y: 0, z: 0 },
      config: {
        which: "heels",
      },
    },
    somethingToPush: {
      type: "portableBlock",
      position: { x: 0, y: 1, z: 0 },
      config: {
        style: "cube",
      },
    },
    soothingToPushInto: {
      type: "block",
      position: { x: 0, y: 4, z: 0 },
      config: {
        style: "organic",
      },
    },
  },
};

test("player pushes a block until reaching an obstruction", () => {
  const gameState = setUpBasicGame(withBlockToPush);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    until: 2_000,
  });

  expect(itemState(gameState, "somethingToPush")?.position.y).toBe(
    // the edge of the block we are pushing into:
    blockSizePx.x * 3 +
      // a bit extra because the portable block does not fill up a full tile:
      (blockSizePx.x - smallItemAabb.x),
  );
});

test("player can push a block diagonally", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "heels",
        },
      },
      somethingToPush: {
        type: "portableBlock",
        position: { x: 1, y: 1, z: 0 },
        config: {
          style: "cube",
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      // heels is moving diagonally
      mockInputStateTracker.directionVector = { x: 1, y: 1, z: 0 };
    },
    until() {
      const portableBlockState = itemState(gameState, "somethingToPush")!;
      // continue until we have pushed it a couple of blocks distance (it started at 1)
      return portableBlockState.position.x > blockSizePx.x * 3;
    },
  });

  const portableBlockState = itemState(gameState, "somethingToPush")!;
  // diagonal movement means its x should still equal its y (withing 1px)
  expect(portableBlockState.position.y).toEqual(
    expect.closeTo(portableBlockState.position.x, 0),
  );
});

test("can push multiple blocks in a row", () => {
  const gameState = setUpBasicGame({
    ...withBlockToPush,
    firstRoomItems: {
      ...withBlockToPush.firstRoomItems,
      somethingToPush2: {
        type: "portableBlock",
        position: { x: 0, y: 2, z: 0 },
        config: {
          style: "cube",
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    until: 2_000,
  });

  expect(itemState(gameState, "somethingToPush2")?.position.y).toBe(
    // the edge of the block we are pushing into:
    blockSizePx.x * 3 +
      // a bit extra because the portable block does not fill up a full tile:
      (blockSizePx.x - smallItemAabb.x),
  );
});

test("can not push a charging cyberman", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      toaster: {
        type: "deadlyBlock",
        position: { x: 2, y: 0, z: 0 },
        config: {
          style: "toaster",
        },
      },
      cyberman: {
        type: "monster",
        position: { x: 2, y: 0, z: 0 },
        config: {
          which: "cyberman",
          activated: "off",
          movement: "towards-on-shortest-axis-xy4",
          startDirection: "right",
        },
      },
      block: {
        type: "block",
        position: { x: 0, y: 0, z: 0 },
        config: {
          style: "artificial",
          times: { x: 2 },
        },
      },
      // a shield so it can be pushed against without losing a life:
      shield: {
        type: "pickup",
        position: { x: 1, y: 0, z: 1 },
        config: {
          gives: "shield",
        },
      },
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 1 },
        config: {
          which: "heels",
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "left";
    },
    until: 2_000,
  });

  expect(itemState(gameState, "cyberman")?.position.x).toBe(
    // the edge of the block we are pushing into:
    blockSizePx.x * 2 +
      // a bit extra because the portable block does not fill up a full tile:
      (blockSizePx.x - smallItemAabb.x) / 2,
  );
});
