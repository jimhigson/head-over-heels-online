import { beforeEach, describe, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { isStandingOn } from "../../../_testUtils/playThroughUntilHelpers";
import { characterNames } from "../../../model/modelTypes";

beforeEach(() => {
  resetStore();
});

describe.for(characterNames)("%s", (characterName) => {
  test.for(["pushableBlock", "portableBlock"] as const)(
    "gets out from under a %s by jumping",
    (blockType) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          ...(characterName === "headOverHeels" ?
            {
              // stacked to combine by swopping:
              heels: {
                type: "player",
                position: { x: 6, y: 3, z: 0 },
                config: { which: "heels" },
              },
              head: {
                type: "player",
                position: { x: 6, y: 3, z: 1 },
                config: { which: "head" },
              },
            }
          : {
              [characterName]: {
                type: "player",
                position: { x: 6, y: 3, z: 0 },
                config: { which: characterName },
              },
            }),
          block: {
            ...(blockType === "pushableBlock" ?
              { type: "pushableBlock", config: {} }
            : { type: "portableBlock", config: { style: "cube" } }),
            // falls onto the character's head:
            position: { x: 6, y: 3, z: 3 },
          },
        },
      });

      if (characterName === "headOverHeels") {
        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockPressing("swop");
          },
          until() {
            return gameState.currentCharacterName === "headOverHeels";
          },
        });
      }

      playGameThrough(gameState, {
        until: isStandingOn("block", "floor"),
        // time for 2 or 3 jumps:
        failAfter: 3_000,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "right";
          mockInputStateTracker.mockPressing("jump");
        },
      });
    },
  );
});
