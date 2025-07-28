import { loadGameState } from "../game/gameState/loadGameState";
import type { JsonItem } from "../model/json/JsonItem";
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

export type TestRoomJson = RoomJson<TestRoomId, string, "blacktooth">;
export type ItemsInTestRoomJson = TestRoomJson["items"];

const basicRoomSize = { x: 8, y: 8 };
export const basicEmptyRoom = (id: TestRoomId): TestRoomJson => ({
  id,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    floor: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: basicRoomSize,
      },
      position: { x: 0, y: 0, z: 0 },
    },
  },
  //size: basicRoomSize,
});
const basicEmptyRoomWithItems = (
  id: TestRoomId,
  items: ItemsInTestRoomJson,
): TestRoomJson => {
  const emptyRoom = basicEmptyRoom(id);

  return {
    ...emptyRoom,
    items: {
      ...emptyRoom.items,
      ...items,
    },
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
  firstRoomDeadlyFloor?: boolean;
  secondRoomDeadlyFloor?: boolean;
};

export const basicGameState = ({
  firstRoomItems,
  firstRoomProps = {},
  secondRoomItems = {},
  secondRoomProps = {},
  firstRoomDeadlyFloor = false,
  secondRoomDeadlyFloor = false,
}: BasicGameStateOptions): GameStateWithMockInput => {
  const campaign = {
    name: "basicGameStateTestCampaign",
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

  if (firstRoomDeadlyFloor) {
    const floorItem = campaign.rooms[firstRoomId].items.floor as JsonItem<
      "floor",
      TestRoomId
    >;
    floorItem.config = {
      floorType: "deadly",
      times: floorItem.config.times,
    };
  }
  if (secondRoomDeadlyFloor) {
    const floorItem = campaign.rooms[secondRoomId].items.floor as JsonItem<
      "floor",
      TestRoomId
    >;
    floorItem.config = {
      floorType: "deadly",
      times: floorItem.config.times,
    };
  }

  const gameState = loadGameState<TestRoomId>({
    campaign,
    inputStateTracker: new MockInputStateTracker(),
  }) as GameStateWithMockInput;

  return gameState;
};
