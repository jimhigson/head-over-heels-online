import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

test("player respawns at entry position without losing a life after falling out of bounds", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: { which: "heels" },
      },
    },
  });

  const livesBefore = heelsState(gameState).lives;

  const room = selectCurrentRoomState(gameState)!;
  deleteItemFromRoom({ room, item: "floor" });

  // heels should fall through the non-floor room:
  playGameThrough(gameState, {
    until: (gameState) => heelsState(gameState).position.z < -2 * blockSizePx.z,
  });

  // and then eventually be brough back without loss of life:
  playGameThrough(gameState, {
    until: (gameState) => heelsState(gameState).position.z > -1,
  });

  expect(heelsState(gameState).lives).toEqual(livesBefore);
});

test("portable item is deleted from the room after falling out of bounds", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 1 },
        config: { which: "heels" },
      },
      safeBlock: {
        type: "block",
        position: { x: 0, y: 0, z: 0 },
        config: { style: "organic" },
      },
      drum: {
        type: "portableBlock",
        position: { x: 3, y: 3, z: 0 },
        config: { style: "drum" },
      },
    },
  });

  const room = selectCurrentRoomState(gameState)!;
  deleteItemFromRoom({ room, item: "floor" });

  playGameThrough(gameState, {
    until: 4_000,
  });

  const roomAfter = selectCurrentRoomState(gameState)!;
  expect(roomAfter.items.drum).toBeUndefined();
});
