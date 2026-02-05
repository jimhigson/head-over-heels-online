import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

// this is tricky because the state this needs is kept in the store - state would leak between
// test potentially!
// THIS MAY CAUSE RANDOM FAILURES UNTIL THE STORE IS NO LONGER A SINGLETON!
test("collecting a scroll in one room means it does not get loaded in another room with the same scroll", () => {
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
      scrollThatGetsPickedUp: {
        type: "pickup",
        config: { gives: "scroll", source: "manual", page: "bag" },
        position: { x: 1, y: 2.5, z: 0 },
      },
      scrollThatDoesNotGetPickedUp: {
        type: "pickup",
        config: { gives: "scroll", source: "manual", page: "crowns" },
        position: { x: 5, y: 2.5, z: 0 },
      },
      doorToSecondRoom: {
        type: "door",
        position: { x: 0, y: 2, z: 0 },
        config: { direction: "right", toRoom: "secondRoom" },
      },
    },
    secondRoomItems: {
      doorToFirstRoom: {
        type: "door",
        position: { x: 8, y: 2, z: 0 },
        config: { direction: "left", toRoom: "firstRoom" },
      },
      scrollThatShouldNotLoad: {
        type: "pickup",
        config: { gives: "scroll", source: "manual", page: "bag" },
        position: { x: 0, y: 0, z: 0 },
      },
      scrollThatShouldLoad: {
        type: "pickup",
        config: { gives: "scroll", source: "manual", page: "crowns" },
        position: { x: 0, y: 0, z: 1 },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until: (gameState) =>
      selectCurrentRoomState(gameState)?.id === "secondRoom",
  });

  expect(
    selectCurrentRoomState(gameState)?.items["scrollThatShouldNotLoad"],
  ).toBeUndefined();
  expect(
    selectCurrentRoomState(gameState)?.items["scrollThatShouldLoad"],
  ).toBeDefined();
});
