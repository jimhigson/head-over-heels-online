import { beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { range } from "../../../utils/iterators/range";

beforeEach(() => {
  resetStore();
});

// steps of 1/8px (1/96 block): from rest at 60fps, heels has fallen a whole
// number of these at every frame's end, so some land exactly flush with the
// top of the item being landed on
const startingZs = range(1.125, 2.125, 1 / 96).toArray();

test.for(startingZs)(
  "falling from z %f onto a block and a deadly block side by side, heels stands on the block",
  (startingZ) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // over the seam between the two blocks:
          position: { x: 1.5, y: 3, z: startingZ },
          config: { which: "heels" },
        },
        deadlyBlock: {
          type: "deadlyBlock",
          position: { x: 1, y: 3, z: 0 },
          config: { style: "volcano" },
        },
        safeBlock: {
          type: "block",
          position: { x: 2, y: 3, z: 0 },
          config: { style: "organic" },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate: { fps: [60] },
      until(gameState) {
        return heelsState(gameState).standingOnItemId !== null;
      },
      failAfter: 2_000,
    });

    expect(heelsState(gameState).standingOnItemId).toBe("safeBlock");
  },
);
