import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { testFrameRates } from "../../../_testUtils/testFrameRates";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

test.each(testFrameRates)("%j Hz", (frameRate) => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        // note - heels starts a little ahead of the block, to make it more likely
        // to fall off if the code is not working right
        position: { x: 0, y: 0.6, z: 0 },
        config: {
          which: "heels",
        },
      },
      // heels has a block on their head:
      pushableBlock: {
        type: "pushableBlock",
        config: {},
        position: { x: 0, y: 0, z: 1 },
      },
    },
  });

  const yDeltaNow = () => {
    const heelsNewPosition = heelsState(gameState).position;
    const pushableBlockPosition = itemState(
      gameState,
      "pushableBlock",
    )!.position;

    // the block should be slightly behind heels:
    return heelsNewPosition.y - pushableBlockPosition.y;
  };
  const pushableBlockZ = () => {
    const pushableBlockPosition = itemState(
      gameState,
      "pushableBlock",
    )!.position;

    // the block should be slightly behind heels:
    return pushableBlockPosition.z;
  };

  let initialPositionDelta: number | undefined = undefined;

  playGameThrough(gameState, {
    frameRate,
    until: 2_000,
    setupInitialInput(mockInputStateTracker) {
      initialPositionDelta = yDeltaNow();
      mockInputStateTracker.mockDirectionPressed = "away";
    },
  });

  if (initialPositionDelta === undefined) {
    throw new Error("behindByOnFirstFrame was not set");
  }

  const behindByWhileWalking = yDeltaNow() - initialPositionDelta;

  // should still be on heels (not fallen on the floor - if zero, it has slipped off!):
  expect(pushableBlockZ()).toBe(blockSizePx.z);
  expect(behindByWhileWalking).toBeGreaterThanOrEqual(4.1);
  expect(behindByWhileWalking).toBeLessThanOrEqual(4.5);

  playGameThrough(gameState, {
    frameRate,
    until: 2_500, // another half-second to stop
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = undefined;
    },
  });

  const behindByAfterStopping = yDeltaNow() - initialPositionDelta;

  // should still be on heels (not fallen on the floor):
  expect(pushableBlockZ()).toBe(blockSizePx.z);

  // the block should no longer be behind
  expect(behindByAfterStopping).toBeGreaterThanOrEqual(-1);
  expect(behindByAfterStopping).toBeLessThanOrEqual(1);
});
