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

test("character walks into pickup", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "head",
        },
      },
      pickupTwoSquaresFromHead: {
        type: "pickup",
        position: { x: 2, y: 0, z: 0 },
        config: {
          gives: "extra-life",
        },
      },
      pickupCharactersWillNotGetInThisTest: {
        type: "pickup",
        position: { x: 4, y: 4, z: 0 },
        config: {
          gives: "extra-life",
        },
      },
    },
  });

  expect(headState(gameState).lives).toBe(8);

  // walk left for one second at 60fps:
  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockDirectionPressed = "left";
    },
  });

  // should have recorded collecting the pickup:
  expect(
    gameState.pickupsCollected[firstRoomId]?.["pickupTwoSquaresFromHead"],
  ).toBe(true);
  // the pickup should have disappeared:
  expect(
    selectCurrentRoomState(gameState)?.items["pickupTwoSquaresFromHead"],
  ).toBeUndefined();
  expect(headState(gameState).lives).toBe(10);

  // but not this one (included as a control):
  expect(
    gameState.pickupsCollected[firstRoomId]?.[
      "pickupCharactersWillNotGetInThisTest"
    ],
  ).toBeFalsy();
  expect(
    selectCurrentRoomState(gameState)?.items[
      "pickupCharactersWillNotGetInThisTest"
    ],
  ).not.toBeUndefined();
});

test("when character walks into pickup that they are not eligible to collect, they just push it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "head",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 2, y: 0, z: 0 },
        config: {
          gives: "bag",
        },
      },
    },
  });

  // the pickup should have moved:
  const bagStartingX =
    selectCurrentRoomState(gameState)!.items["bag"].state.position.x;

  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockDirectionPressed = "left";
    },
  });

  // should *not* have recorded collecting the pickup:
  expect(gameState.pickupsCollected[firstRoomId]?.["bag"]).toBeUndefined();
  // the pickup should *not* have disappeared:
  expect(selectCurrentRoomState(gameState)?.items["bag"]).toBeDefined();

  // the pickup should have moved (been pushed):
  expect(
    selectCurrentRoomState(gameState)?.items["bag"].state.position.x,
  ).toBeGreaterThan(bagStartingX);
});

test("character stand on pickup by walking off adjacent block", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 1 },
        config: {
          which: "head",
        },
      },
      block0: {
        type: "block",
        position: { x: 0, y: 0, z: 0 },
        config: {
          style: "organic",
        },
      },
      block1: {
        type: "block",
        position: { x: 1, y: 0, z: 0 },
        config: {
          style: "organic",
        },
      },
      block2: {
        type: "block",
        position: { x: 2, y: 0, z: 0 },
        config: {
          style: "organic",
        },
      },
      pickupOnTheFloor: {
        type: "pickup",
        position: { x: 3, y: 0, z: 0 },
        config: {
          gives: "extra-life",
        },
      },
    },
  });

  expect(headState(gameState).lives).toBe(8);

  // walk left for one second at 60fps:
  playGameThrough(gameState, {
    until: 3_000,
    setupInitialInput(inputState) {
      inputState.mockDirectionPressed = "left";
    },
  });

  // should have recorded collecting the pickup:
  expect(gameState.pickupsCollected[firstRoomId]?.["pickupOnTheFloor"]).toBe(
    true,
  );
  // the pickup should have disappeared:
  expect(
    selectCurrentRoomState(gameState)?.items["pickupOnTheFloor"],
  ).toBeUndefined();
  expect(headState(gameState).lives).toBe(10);
});

test("pickup can land on character", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      pickupAboveHeels: {
        type: "pickup",
        position: { x: 0, y: 4, z: 2 },
        config: {
          gives: "extra-life",
        },
      },
    },
  });

  // walk left for one second at 60fps:
  playGameThrough(gameState);

  // should have collected the pickup:
  expect(gameState.pickupsCollected[firstRoomId]?.["pickupAboveHeels"]).toBe(
    true,
  );
  expect(heelsState(gameState).lives).toBe(10);
  // the pickup should have disappeared:
  expect(
    selectCurrentRoomState(gameState)?.items["pickupAboveHeels"],
  ).toBeUndefined();
});

test("after collecting a fast pickup, head has fast steps", () => {
  // confirms fix for a bug where head couldn't collect the fast steps:
  // https://discord.com/channels/1346483548290285568/1346483548290285571/1386696014236352612

  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 4, z: 0 },
        config: {
          which: "head",
        },
      },
      pickupLeftOfHead: {
        type: "pickup",
        position: { x: 2, y: 4, z: 0 },
        config: {
          gives: "fast",
        },
      },
    },
  });

  //confirm it sets up with this number negative:
  expect(headState(gameState).fastStepsStartedAtDistance).toBeLessThan(0);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "left";
    },
    until(gameState) {
      //picked up means no longer negative:
      return headState(gameState).fastStepsStartedAtDistance > 0;
    },
    // set frame rate low since it doesn't matter for this test:
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation
  });
});

test.todo(
  "pickups do not reload back after collecting, leaving room, and coming back",
  () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 2.5, z: 0 },
          config: {
            which: "heels",
          },
        },
        pickupOnFloor: {
          type: "pickup",
          position: { x: 2.5, y: 2, z: 0 },
          config: {
            gives: "extra-life",
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

    let visitedSecond = false;

    // walk left for one second at 60fps:
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      frameCallbacks(gameState, mockInputStateTracker) {
        if (gameState.characterRooms.heels?.id === "secondRoom") {
          visitedSecond = true;
          // walk back to the first room:
          mockInputStateTracker.mockDirectionPressed = "left";
        }
      },
      until(gameState) {
        return (
          visitedSecond && gameState.characterRooms.heels?.id === "firstRoom"
        );
      },
    });

    expect(gameState.pickupsCollected[firstRoomId]?.["pickupOnFloor"]).toBe(
      true,
    );
    expect(gameState.characterRooms.heels?.id).toBe("firstRoom");
    expect(gameState.characterRooms.heels?.items.pickupOnFloor).toBeUndefined();
  },
);
