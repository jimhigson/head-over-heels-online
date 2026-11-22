import { beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { hasCollidedWithItemOfType } from "../../../_testUtils/playThroughUntilHelpers";

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

describedForAllFrameRates((frameRate) => {
  test("a moving platform walking into a wall collides with it", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // well out of the platform's way:
          position: { x: 0, y: 7, z: 0 },
          config: { which: "heels" },
        },
        platform: {
          type: "movingPlatform",
          position: { x: 2, y: 3, z: 0 },
          config: {
            activated: "on",
            movement: "back-forth",
            startDirection: "left",
          },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate,
      until: hasCollidedWithItemOfType("platform", "wall"),
      failAfter: 10_000,
    });
  });

  test("a moving platform carries two riders into a wall and back, both staying on it", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // well out of the platform's way:
          position: { x: 0, y: 7, z: 0 },
          config: { which: "heels" },
        },
        platform: {
          type: "movingPlatform",
          position: { x: 2, y: 3, z: 0 },
          config: {
            activated: "on",
            movement: "back-forth",
            startDirection: "left",
          },
        },
        // 12px items side by side, both on the platform:
        rider1: {
          type: "portableBlock",
          position: { x: 2, y: 2.75, z: 1 },
          config: { style: "cube" },
        },
        rider2: {
          type: "portableBlock",
          position: { x: 2, y: 3.5, z: 1 },
          config: { style: "cube" },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate,
      until: hasCollidedWithItemOfType("platform", "wall"),
      failAfter: 10_000,
      frameCallbacks(gameState) {
        // checked every frame, so a failure reports when one came off:
        expect({
          rider1On: itemState<"portableBlock">(gameState, "rider1")
            .standingOnItemId,
          rider2On: itemState<"portableBlock">(gameState, "rider2")
            .standingOnItemId,
        }).toEqual({ rider1On: "platform", rider2On: "platform" });
      },
    });

    // on its way back:
    playGameThrough(gameState, {
      frameRate,
      forTime: 1_000,
      frameCallbacks(gameState) {
        expect({
          rider1On: itemState<"portableBlock">(gameState, "rider1")
            .standingOnItemId,
          rider2On: itemState<"portableBlock">(gameState, "rider2")
            .standingOnItemId,
        }).toEqual({ rider1On: "platform", rider2On: "platform" });
      },
    });
  });
});
