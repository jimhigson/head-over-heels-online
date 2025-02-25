import { initGameState } from "../game/gameState/initGameState";
import type { RoomJson } from "../model/RoomJson";
import { addPerimeterWallsToRoom } from "./addPerimeterWallsToRoom";
import type { GameStateWithMockInput } from "./MockInputStateTracker";
import { MockInputStateTracker } from "./MockInputStateTracker";

/**
 * Utilities for setting up a basic example room - for testing
 */

export const firstRoomId = "firstRoom" as const;
// we have a second room to test doors, teleporters etc
export const secondRoomId = "secondRoom" as const;
export type TestRoomId = typeof firstRoomId | typeof secondRoomId;

export type TestRoomJson = RoomJson<"blacktooth", TestRoomId>;
export type ItemsInTestRoomJson = TestRoomJson["items"];

const basicEmptyRoom = (id: TestRoomId): TestRoomJson => ({
  id,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  items: {},
  size: { x: 8, y: 8 },
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

/*const gameStateWithInput = (
  gameState: GameState<TestRoomId>,
  inputState?: Partial<InputState>,
): GameState<TestRoomId> => ({
  ...gameState,
  inputStateTracker: { ...gameState.inputStateTracker, ...inputState },
});*/

export type BasicGameStateOptions = {
  firstRoomItems: ItemsInTestRoomJson;
  firstRoomProps?: Partial<TestRoomJson>;
  secondRoomItems?: ItemsInTestRoomJson;
  secondRoomProps?: Partial<TestRoomJson>;
  //inputState?: Partial<InputState>;
};

export const basicGameState = ({
  firstRoomItems,
  firstRoomProps = {},
  secondRoomItems = {},
  secondRoomProps = {},
  //inputState,
}: BasicGameStateOptions): GameStateWithMockInput => {
  const campaign = {
    rooms: {
      [firstRoomId]: addPerimeterWallsToRoom({
        ...basicEmptyRoomWithItems(firstRoomId, firstRoomItems),
        ...firstRoomProps,
      }),
      [secondRoomId]: addPerimeterWallsToRoom({
        ...basicEmptyRoomWithItems(secondRoomId, secondRoomItems),
        ...secondRoomProps,
      }),
    },
  };
  const gameState = initGameState<TestRoomId>({
    campaign,
    inputStateTracker: new MockInputStateTracker(),
  }) as GameStateWithMockInput;

  return gameState;

  //return gameStateWithInput(gameState, inputState);
};
