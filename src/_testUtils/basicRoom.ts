// immer is used to set up the game, but the game itself relies on being

import type { GameState } from "@/game/gameState/GameState";
import { initGameState } from "@/game/gameState/initGameState";
import type { InputState } from "@/game/input/InputState";
import { progressGameStateForTick } from "@/game/mainLoop/mainLoop";
import type { RenderOptions } from "@/game/RenderOptions";
import type { RoomJson } from "@/model/modelTypes";
import { setAutoFreeze, produce } from "immer";

/**
 * Utilities for setting up a basic example room - for testing
 */

// able to directly mutate state:
setAutoFreeze(false);

const firstRoomId = "firstRoom" as const;
// we have a second room to test doors, teleporters etc
const secondRoomId = "secondRoom" as const;
type TestRoomId = typeof firstRoomId | typeof secondRoomId;

type TestRoomJson = RoomJson<"blacktooth", TestRoomId>;
type ItemsInTestRoomJson = TestRoomJson["items"];

const basicEmptyRoom = (id: TestRoomId): TestRoomJson => ({
  id,
  planet: "blacktooth",
  color: "cyan",
  floor: "blacktooth",
  floorSkip: [],
  items: {},
  size: { x: 8, y: 8 },
  walls: {
    // TODO: need to not have walls where there are doors
    left: new Array(8).fill("armour"),
    away: new Array(8).fill("armour"),
  },
});
const basicEmptyRoomWithItems = (
  id: TestRoomId,
  items: ItemsInTestRoomJson,
): TestRoomJson => {
  const emptyRoom = basicEmptyRoom(id);

  return {
    ...emptyRoom,
    items,
  };
};
const basicRenderOptions: RenderOptions<TestRoomId> = {
  showBoundingBoxes: "none",
};

const gameStateWithInput = produce(
  (draft: GameState<TestRoomId>, inputState?: Partial<InputState>) => {
    draft.inputState = { ...draft.inputState, ...inputState };
  },
);

export const basicGameState = ({
  firstRoomItems,
  secondRoomItems = {},
  inputState,
}: {
  firstRoomItems: ItemsInTestRoomJson;
  secondRoomItems?: ItemsInTestRoomJson;
  inputState?: Partial<InputState>;
}) => {
  const gameState = initGameState<TestRoomId>(
    {
      rooms: {
        [firstRoomId]: basicEmptyRoomWithItems(firstRoomId, firstRoomItems),
        [secondRoomId]: basicEmptyRoomWithItems(secondRoomId, secondRoomItems),
      },
    },
    basicRenderOptions,
  );

  return gameStateWithInput(gameState, inputState);
};

export const playGameThrough = (
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
