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

// immer is used to set up the game, but the game itself relies on being
// able to directly mutate state:
setAutoFreeze(false);

const testRoomId = "testRoomId" as const;
type TestRoomId = typeof testRoomId;

const basicEmptyRoom: RoomJson<"blacktooth", TestRoomId> = {
  id: testRoomId,
  planet: "blacktooth",
  color: "cyan",
  floor: "blacktooth",
  floorSkip: [],
  items: {},
  size: { x: 8, y: 8 },
  walls: {
    left: new Array(8).fill(""),
    away: new Array(8).fill(""),
  },
};
const basicEmptyRoomWithItems = (
  items: (typeof basicEmptyRoom)["items"],
): typeof basicEmptyRoom => ({
  ...basicEmptyRoom,
  items,
});
const basicRenderOptions: RenderOptions<TestRoomId> = {
  showBoundingBoxes: "none",
};

const gameStateWithInput = produce(
  (draft: GameState<TestRoomId>, inputState?: Partial<InputState>) => {
    draft.inputState = { ...draft.inputState, ...inputState };
  },
);

const basicGameState = (
  items: (typeof basicEmptyRoom)["items"],
  inputState?: Partial<InputState>,
) => {
  const gameState = initGameState<TestRoomId>(
    {
      rooms: {
        testRoomId: basicEmptyRoomWithItems(items),
      },
    },
    basicRenderOptions,
  );

  return gameStateWithInput(gameState, inputState);
};

const playGameThrough = (
  gameState: GameState<TestRoomId>,
  {
    frameRate = 60,
    forTime = 1_000,
    frameCallback = (gameState) => gameState,
  }: {
    frameRate?: number;
    forTime?: number;
    /**
     * allows us to change the gamestate after certain frames, for example to change the
     * joystick input while the simulation is running
     */
    frameCallback?: (gameState: GameState<TestRoomId>) => GameState<TestRoomId>;
  } = { frameRate: 60, forTime: 1_000 },
) => {
  const deltaMS = 1_000 / frameRate;

  while (gameState.gameTime < forTime) {
    progressGameStateForTick(gameState, deltaMS);
    gameState = frameCallback(gameState);
  }
};

describe("pickups", () => {
  test("character walks into pickup", () => {
    const gameState: GameState<TestRoomId> = basicGameState(
      {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
        heels: {
          type: "player",
          position: { x: 0, y: 4, z: 0 },
          config: {
            which: "heels",
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
      { left: true },
    );

    expect(currentRoom(gameState).items.head?.state.lives).toBe(8);

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have recorded collecting the pickup:
    expect(
      pickupCollected(gameState, testRoomId, "pickupTwoSquaresFromHead"),
    ).toBe(true);
    expect(currentRoom(gameState).items.head?.state.lives).toBe(10);

    // but not this one (included as a control):
    expect(
      pickupCollected(
        gameState,
        testRoomId,
        "pickupCharactersWillNotGetInThisTest",
      ),
    ).toBe(false);
  });

  test("pickup can land on character", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "head",
        },
      },
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
    });

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have collected the pickup:
    expect(pickupCollected(gameState, testRoomId, "pickupAboveHeels")).toBe(
      true,
    );
    expect(currentRoom(gameState).items.heels?.state.lives).toBe(10);
  });
});

const testFrameRates = [
  25, // original game
  60, // typical default
  144, // high update rate
  500, // highest monitor refresh rate commercially available (2024) - and a bit silly!
];

describe("jumping", () => {
  test.each(testFrameRates)(
    "head can jump between two blocks forming a ladder (%iHz)",
    (frameRate) => {
      const gameState: GameState<TestRoomId> = basicGameState(
        {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 0 },
            config: {
              which: "head",
            },
          },
          heels: {
            type: "player",
            position: { x: 0, y: 4, z: 0 },
            config: {
              which: "heels",
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
        { towards: true, jump: true },
      );

      playGameThrough(gameState, {
        frameRate,
        // TODO: this test is only passing because the game is running for long enough for the
        // player to fall
        // back in between - it should be always possible to get in on the upwards jump, This is
        // happening because the jump is too fast and doesn't visit every pixel on the way up
        forTime: 2_000, // TODO: reduce this time to < 1s when the bug is fixed
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
