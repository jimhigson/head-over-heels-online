import { test, beforeEach } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { resetStore } from "../../../_testUtils/initStoreForTests";

beforeEach(() => {
  resetStore();
});

test("an item landing on a button can activate it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        // note - heels starts a little ahead of the block, to make it more likely
        // to fall off if the code is not working right
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "heels",
        },
      },
      button1: {
        type: "button",
        config: {
          modifies: [
            {
              expectType: "block",
              targets: ["block"],
              // when pressed, this button will make the block unstable (ie, disappearing)
              makesStable: false,
            },
          ],
        },
        position: { x: 3, y: 0, z: 0 },
      },
      drum: {
        type: "portableBlock",
        position: { x: 3, y: 0, z: 2 },
        config: {
          style: "drum",
        },
      },
      block: {
        type: "block",
        position: { x: 3, y: 3, z: 0 },
        config: {
          style: "organic",
        },
      },
      // this will fall through and destroy the block once it is not stable
      weight: {
        type: "pushableBlock",
        position: { x: 3, y: 3, z: 1 },
        config: {},
      },
    },
  });

  playGameThrough(gameState, {
    until(gameState) {
      return itemState(gameState, "block") === undefined;
    },
    frameRate: { fps: [20] },
  });
});
