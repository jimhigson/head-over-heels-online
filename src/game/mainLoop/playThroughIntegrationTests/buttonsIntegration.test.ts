import { test, beforeEach, expect } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

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

test("a button can make an item appear when jumped on repeatedly", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        // note - heels starts a little ahead of the block, to make it more likely
        // to fall off if the code is not working right
        position: { x: 0, y: 0, z: 1 },
        config: {
          which: "heels",
        },
      },
      button1: {
        type: "button",
        config: {
          modifies: [
            {
              expectType: "emitter",
              leftState: {
                quantityEmitted: 0,
                maximum: 1,
              },
              rightState: {},
              targets: ["pickupEmtr"],
            },
          ],
        },
        position: { x: 0, y: 0, z: 0 },
      },
      pickupEmtr: {
        type: "emitter",
        config: {
          emits: {
            type: "ball",
            config: {},
          },
          // without button presses, this creates nothing
          maximum: 0,
          period: 0,
        },
        position: {
          x: 7,
          y: 7,
          z: 10,
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockDirectionPressed = "towards";
      inputState.mockPressing("jump");
    },
    until: 5_000,
    frameRate: { fps: [20] },
  });

  const { items } = selectCurrentRoomState(gameState)!;
  const balls = Object.values(items).filter((item) => item.type === "ball");
  // 7 happens to be how many heels can create in 5s by jumping on the button - a bit more than
  // one per second
  expect(balls.length).toBe(7);
});
