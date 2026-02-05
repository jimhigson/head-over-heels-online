import { beforeEach, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

test("platforms that move when stood on", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 3 },
        config: {
          which: "heels",
        },
      },
      // heels falls onto this, activating it:
      moving: {
        type: "movingPlatform",
        config: {
          activated: "on-stand",
          movement: "back-forth",
          startDirection: "left",
        },
        position: { x: 0, y: 0, z: 0 },
      },
      // it takes her into this, losing a life:
      deadly: {
        type: "deadlyBlock",
        position: { x: 4, y: 0, z: 1 },
        config: {
          style: "volcano",
        },
      },
    },
  });
  playGameThrough(gameState, {
    until(gameState) {
      return heelsState(gameState).lives === 7;
    },
  });
});
