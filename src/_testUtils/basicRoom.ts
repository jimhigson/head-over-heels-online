import { produce } from "immer";
import type { GameState } from "../game/gameState/GameState";
import { initGameState } from "../game/gameState/initGameState";
import {
  createEmptyInputState,
  type InputState,
} from "../game/input/InputState";
import type { RoomJson } from "../model/RoomJson";

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

  // set walls to none where there are doors:
  emptyRoom.walls = produce(emptyRoom.walls, (wallsDraft) => {
    Object.values(items).forEach((item) => {
      if (item.type === "door") {
        if (item.config.direction === "left") {
          wallsDraft.left[item.position.y] = "none";
          wallsDraft.left[item.position.y + 1] = "none";
        } else if (item.config.direction === "right") {
          wallsDraft.away[item.position.x] = "none";
          wallsDraft.away[item.position.x + 1] = "none";
        }
      }
    });
  });

  return {
    ...emptyRoom,
    items,
  };
};

const gameStateWithInput = (
  gameState: GameState<TestRoomId>,
  inputState?: Partial<InputState>,
): GameState<TestRoomId> => ({
  ...gameState,
  inputState: { ...gameState.inputState, ...inputState },
});

export type BasicGameStateOptions = {
  firstRoomItems: ItemsInTestRoomJson;
  firstRoomProps?: Partial<TestRoomJson>;
  secondRoomItems?: ItemsInTestRoomJson;
  secondRoomProps?: Partial<TestRoomJson>;
  inputState?: Partial<InputState>;
};

export const basicGameState = ({
  firstRoomItems,
  firstRoomProps = {},
  secondRoomItems = {},
  secondRoomProps = {},
  inputState,
}: BasicGameStateOptions) => {
  const campaign = {
    rooms: {
      [firstRoomId]: {
        ...basicEmptyRoomWithItems(firstRoomId, firstRoomItems),
        ...firstRoomProps,
      },
      [secondRoomId]: {
        ...basicEmptyRoomWithItems(secondRoomId, secondRoomItems),
        ...secondRoomProps,
      },
    },
  };
  const gameState = initGameState<TestRoomId>({
    campaign,
    inputState: createEmptyInputState(),
  });

  return gameStateWithInput(gameState, inputState);
};
