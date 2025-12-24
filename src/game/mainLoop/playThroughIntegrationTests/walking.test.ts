import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { currentPlayableState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { individualCharacterNames } from "../../../model/modelTypes";
import { unitVectors } from "../../../utils/vectors/unitVectors";

beforeEach(() => {
  resetStore();
});

describe.each(individualCharacterNames)("%s", (which) => {
  test("moves exactly 1px when directional input is applied for a single frame in direction already facing", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        [which]: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: {
            which,
          },
        },
      },
    });

    const initialPosition = { ...currentPlayableState(gameState).position };
    const initialFacing = { ...currentPlayableState(gameState).facing };

    let frameCount = 0;

    // check we will be facing "towards" initially, so when we walk we are going in
    // the direction already facing:
    expect(initialFacing).toEqual(unitVectors.towards);

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "towards";
      },
      frameCallbacks(gameState, mockInputStateTracker) {
        frameCount++;
        if (frameCount === 2) {
          // after first frame, stop pressing direction
          mockInputStateTracker.mockDirectionPressed = undefined;
        }
      },
      until: 500,
    });

    const finalPosition = currentPlayableState(gameState).position;

    // "towards" direction decreases y
    expect(finalPosition.x).toBe(initialPosition.x);
    expect(finalPosition.y - initialPosition.y).toBe(-1);
    expect(finalPosition.z).toBe(initialPosition.z);
  });

  test("does not move when directional input is perpendicular to facing direction", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        [which]: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: {
            which,
          },
        },
      },
    });

    const initialPosition = { ...currentPlayableState(gameState).position };
    const initialFacing = { ...currentPlayableState(gameState).facing };

    let frameCount = 0;

    // check we will be facing "towards" initially
    expect(initialFacing).toEqual(unitVectors.towards);

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // "right" is perpendicular to "towards"
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      frameCallbacks(gameState, mockInputStateTracker) {
        frameCount++;
        if (frameCount === 2) {
          mockInputStateTracker.mockDirectionPressed = undefined;
        }
      },
      until: 500,
    });

    // should not have moved at all - only rotated
    expect(currentPlayableState(gameState).position).toMatchObject(
      initialPosition,
    );
    expect(currentPlayableState(gameState).facing).toMatchObject(
      unitVectors.right,
    );
  });
});
