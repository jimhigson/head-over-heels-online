// immer is used to set up the game, but the game itself relies on being

import type { GameState } from "@/game/gameState/GameState";
import { initGameState } from "@/game/gameState/initGameState";
import type { InputState } from "@/game/input/InputState";
import type { RenderOptions } from "@/game/RenderOptions";
import type { RoomJson } from "@/model/modelTypes";
import { setAutoFreeze, produce } from "immer";

/**
 * Utilities for setting up a basic example room - for testing
 */

// able to directly mutate state:
setAutoFreeze(false);

export const firstRoomId = "firstRoom" as const;
// we have a second room to test doors, teleporters etc
export const secondRoomId = "secondRoom" as const;
export type TestRoomId = typeof firstRoomId | typeof secondRoomId;

export type TestRoomJson = RoomJson<"blacktooth", TestRoomId>;
export type ItemsInTestRoomJson = TestRoomJson["items"];

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
