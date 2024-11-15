import { describe, test, expect, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { produce, setAutoFreeze } from "immer";
import { progressGameStateForTick } from "./mainLoop";
import type { GameState } from "../gameState/GameState";
import { currentRoom, pickupCollected } from "../gameState/GameState";
import { initGameState } from "../gameState/initGameState";
import type { RoomJson } from "@/model/modelTypes";
import type { RenderOptions } from "../RenderOptions";
import type { InputState } from "../input/InputState";



describe("pickups", () => {
  test("character walks into pickup", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
        pickupTwoSquaresFromHead: {
          type: "pickup",
          position: { x: 2, y: 0, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        pickupCharactersWillNotGetInThisTest: {
          type: "pickup",
          position: { x: 4, y: 4, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
      },
      inputState: { left: true },
    });

    expect(currentRoom(gameState).items.head?.state.lives).toBe(8);

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have recorded collecting the pickup:
    expect(
      pickupCollected(gameState, firstRoomId, "pickupTwoSquaresFromHead"),
    ).toBe(true);
    expect(currentRoom(gameState).items.head?.state.lives).toBe(10);

    // but not this one (included as a control):
    expect(
      pickupCollected(
        gameState,
        firstRoomId,
        "pickupCharactersWillNotGetInThisTest",
      ),
    ).toBe(false);
  });

  test("pickup can land on character", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 4, z: 0 },
          config: {
            which: "heels",
          },
        },
        pickupAboveHeels: {
          type: "pickup",
          position: { x: 0, y: 4, z: 2 },
          config: {
            gives: "extra-life",
          },
        },
      },
    });

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have collected the pickup:
    expect(pickupCollected(gameState, firstRoomId, "pickupAboveHeels")).toBe(
      true,
    );
    expect(currentRoom(gameState).items.heels?.state.lives).toBe(10);
  });
});

const testFrameRates = [
  15, // crazy slow - slower than original
  25, // original game, PAL
  29.97, // NTSC real
  30, // NTSC almost
  50, // double original (interlaced)
  50.04, // double original (interlaced, measured)
  60, // typical default
  75, // typical/high
  144, // high update rate
  500, // highest monitor refresh rate commercially available (2024) - and a bit silly!
];

describe("jumping", () => {
  test.each(testFrameRates)(
    "head can jump between two blocks forming a ladder (%iHz)",
    (frameRate) => {
      const gameState: GameState<TestRoomId> = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 0 },
            config: {
              which: "head",
            },
          },
          lowerBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          upperBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic" },
          },
        },
        inputState: { towards: true, jump: true },
      });

      playGameThrough(gameState, {
        frameRate,
        // in 800ms, head only has time to get into the gap on the way up - it won't
        // pass if he needs to get in while travelling more slowly on the way down
        // - at lower frame rates, this tests that the multiple physics frame
        // per graphics frame is working correctly
        forTime: 800,
        frameCallback(gameState) {
          // stop pressing jump after a short time
          return gameState.gameTime < 50 ?
              gameState
            : {
                ...gameState,
                inputState: {
                  ...gameState.inputState,
                  jump: false,
                },
              };
        },
      });
      expect(currentRoom(gameState).items.head?.state.standingOn?.id).toBe(
        "lowerBlock",
      );
    },
  );
});

describe("doors", () => {
  test.only("moving from first room to second through door", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 1, y: 2.5, z: 0 },
          config: {
            which: "head",
          },
        },
        doorToSecondRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { axis: "y", toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        doorToFirstRoom: {
          type: "door",
          position: { x: 8, y: 2, z: 0 },
          config: { axis: "y", toRoom: firstRoomId },
        },
      },
      inputState: { right: true },
    });

    playGameThrough(gameState, {
      forTime: 2_000,
      frameCallback(gameState) {
        const headState = currentRoom(gameState).items.head?.state;
        console.log(headState?.position, headState?.autoWalkDistance);
        return gameState;
      },
    });
    expect(currentRoom(gameState).id).toBe("secondRoom");
  });
});
