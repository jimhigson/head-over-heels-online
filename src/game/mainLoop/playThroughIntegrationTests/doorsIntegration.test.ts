import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { headState, heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

test.each([
  {
    x: 1,
    // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
    y: 2.5,
    z: 0,
  },
  {
    x: 1,
    // at this y, heels is not perfectly aligned with the door - needs sliding to get through
    y: 2,
    z: 0,
  },
])("moving from first room to second through door", (startPosition) => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: startPosition,
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

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until: 2_000,
  });
  expect(selectCurrentRoomState(gameState)?.id).toBe("secondRoom");
});

test("character can push each other through a door", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: {
          x: 3,
          // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
          y: 2.5,
          z: 0,
        },
        config: {
          which: "head",
        },
      },
      // heels is here for head to push:
      heels: {
        type: "player",
        position: {
          x: 2,
          // lined up with door, a bit to the right of heels
          y: 2.5,
          z: 0,
        },
        config: {
          which: "heels",
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

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until(gameState) {
      return (
        gameState.characterRooms.head?.id === "secondRoom" &&
        headState(gameState).standingOnItemId !== null
      );
    },
  });

  // both characters are on the floor - ie, haven't jumped on top of each other
  // due to items appearing overlapping and recovering
  expect(headState(gameState).standingOnItemId).toBe("floor");
  expect(heelsState(gameState).standingOnItemId).toBe("floor");
});

test("character can slide down a wall and through a door", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: {
          x: 3,
          y: 2.5,
          // high in the air
          z: 12,
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

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until(gameState) {
      return (
        gameState.characterRooms.head?.id === "secondRoom" &&
        headState(gameState).standingOnItemId !== null
      );
    },
  });
});
