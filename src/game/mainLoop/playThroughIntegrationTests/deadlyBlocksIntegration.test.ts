import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { headState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

test("player loses life on touching volcano", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 2 },
        config: {
          which: "head",
        },
      },
      deadlyBlock: {
        type: "deadlyBlock",
        position: { x: 0, y: 0, z: 0 },
        config: { style: "volcano" },
      },
    },
    secondRoomItems: {
      heels: {
        type: "player",
        position: { x: 2, y: 2, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });

  playGameThrough(gameState, {
    // this needs a long time now that the player gets invulnerability after dying for a few seconds
    until: (gameState) => gameState.characterRooms.head === undefined,
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation since this runs for a long time
  });

  // heels fell on to the volcano and lost a life repeatedly until none left and switched to heels
  expect(gameState.characterRooms.head).toBe(undefined);
  expect(gameState.currentCharacterName).toBe("heels");
  expect(selectCurrentRoomState(gameState)?.id).toBe("secondRoom");
});

test.for([
  ["deadlyBlock", 1],
  ["deadlyBlock", 2],
  ["spikes", 1],
  ["spikes", 2],
] as const)(
  "player walks off block onto %s and loses a life (walking from block height %i)",
  ([deadlyType, walkFromHeight]) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        head: {
          type: "player",
          config: {
            which: "head",
          },
          position: {
            x: 0,
            y: 0,
            z: walkFromHeight,
          },
        },
        block: {
          type: "block",
          config: {
            style: "organic",
          },
          position: {
            x: 0,
            y: 0,
            z: walkFromHeight - 1,
          },
        },
        deadly:
          deadlyType === "deadlyBlock" ?
            {
              type: "deadlyBlock",
              config: { style: "volcano", times: { x: 4 } },
              position: { x: 1, y: 0, z: 0 },
            }
          : {
              type: "spikes",
              config: { times: { x: 4 } },
              position: { x: 1, y: 0, z: 0 },
            },
      },
    });

    expect(headState(gameState).lives).toBe(8);

    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "left";
      },
      until(gameState) {
        return headState(gameState).lives === 7;
      },
      frameRate: { fps: [15] },
    });
  },
);

test("can't jump off of spikes during death animation", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 1.5 },
        config: {
          which: "head",
        },
      },
      spikes: {
        type: "spikes",
        position: { x: 0, y: 0, z: 0 },
        config: {},
      },
    },
    secondRoomItems: {
      heels: {
        type: "player",
        position: { x: 2, y: 2, z: 0 },
        config: {
          which: "heels",
        },
      },
    },
  });

  let sawDeathAction = false;
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    // this needs a long time now that the player gets invulnerability after dying for a few seconds
    frameCallbacks(gameState) {
      const hs = headState(gameState);
      if (hs.action === "death") {
        sawDeathAction = true;
        // should never go above one block of height during death anim:
        expect(hs.position.z).toBe(12);
        expect(hs.jumped).toBe(false);
      }
    },
    until: (gameState) => headState(gameState).lives === 7,
  });
  expect(sawDeathAction).toBe(true);
});
