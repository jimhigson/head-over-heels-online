import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { headState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import {
  playGameThrough,
  stopAllInputAfter,
} from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

test("snaps to pixel grid after moving and stopping", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: Math.PI, y: Math.PI, z: 0 },
        config: {
          which: "head",
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "away";
    },
    frameCallbacks: stopAllInputAfter(400),
    until: 500,
  });

  // this should always be an integer position since head has been stopped for more than a frame
  expect(headState(gameState).position).toMatchInlineSnapshot(`
      {
        "x": 51,
        "y": 61,
        "z": 0,
      }
    `);
});

test("snaps to xy only when falling", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: Math.PI, y: Math.PI, z: 10 },
        config: {
          which: "head",
        },
      },
    },
  });

  playGameThrough(gameState, {
    until: 500,
  });

  const headPosition = headState(gameState).position;

  // rounded in x and y:
  expect(headPosition.x).toBe(51);
  expect(headPosition.y).toBe(51);

  // didn't have enough time to fall to the ground:
  expect(headPosition.z).toBeGreaterThan(0);
  // didn't round in z:
  expect(headPosition.z - Math.round(headPosition.z)).not.toEqual(0);
});
