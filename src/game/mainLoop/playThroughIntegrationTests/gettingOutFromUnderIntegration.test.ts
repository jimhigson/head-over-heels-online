import { beforeEach, describe, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { isStandingOn, not } from "../../../_testUtils/playThroughUntilHelpers";
import { characterNames } from "../../../model/modelTypes";

beforeEach(() => {
  resetStore();
});

describe.for(characterNames)("%s", (characterName) => {
  test.for([
    { blockType: "pushableBlock", stackHeight: 1 },
    { blockType: "portableBlock", stackHeight: 1 },
    { blockType: "pushableBlock", stackHeight: 2 },
    { blockType: "portableBlock", stackHeight: 2 },
  ] as const)(
    "gets out from under a $stackHeight-high stack of $blockType by jumping",
    ({ blockType, stackHeight }) => {
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
          ...(stackHeight === 2 ?
            {
              upperBlock: {
                ...(blockType === "pushableBlock" ?
                  { type: "pushableBlock", config: {} }
                : { type: "portableBlock", config: { style: "cube" } }),
                // falls onto the other block:
                position: { x: 6, y: 3, z: 4 },
              },
            }
          : {}),
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
        // the bottom of the stack is on the floor, and none of it on the character:
        until: (gameState) =>
          isStandingOn("block", "floor")(gameState) &&
          (stackHeight === 1 ||
            not(isStandingOn("upperBlock", characterName))(gameState)),
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
