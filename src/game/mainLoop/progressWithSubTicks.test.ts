import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { setUpBasicGame, type TestRoomId } from "../../_testUtils/basicRoom";
import { resetStore } from "../../_testUtils/initStoreForTests";
import { type ItemInPlay } from "../../model/ItemInPlay";
import { type RoomStateItems } from "../../model/RoomState";
import { type GameState } from "../gameState/GameState";
import {
  type MovedOrResizedItems,
  type ProgressGameState,
} from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";

const createGameState = ({
  itemIds,
}: {
  itemIds: string[];
}): GameState<TestRoomId> => ({
  ...setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        config: { which: "head" },
        position: { x: 0, y: 0, z: 0 },
      },
      ...Object.fromEntries(
        itemIds.map((id) => [
          id,
          {
            type: "spring",
            position: { x: 0, y: 0, z: 0 },
            config: {},
          },
        ]),
      ),
    },
  }),
});

const mockMovedOrResizedItemsSet = (movedItemIds: string[]) => {
  const movedOrResizedItems = new Set() as MovedOrResizedItems<
    TestRoomId,
    string
  >;
  for (const id of movedItemIds) {
    movedOrResizedItems.add({ id, type: "spring" } as ItemInPlay<
      "spring",
      TestRoomId,
      string
    >);
  }
  return movedOrResizedItems;
};
const mockItemsInRoom = (movedItemIds: string[]) => {
  const movedOrResizedItems = {} as RoomStateItems<TestRoomId, string>;
  for (const id of movedItemIds) {
    movedOrResizedItems[id] = { id, type: "spring" } as ItemInPlay<
      "spring",
      TestRoomId,
      string
    >;
  }
  return movedOrResizedItems;
};

beforeEach(() => {
  resetStore();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("calls progress only once if below maxStepDeltaMs", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedOrResizedItemsSet(["a"]));
  const gameState = createGameState({ itemIds: ["a"] });

  const progressAt50fps = progressWithSubTicks(mockProgress, 1_000 / 50);
  const moved = progressAt50fps(gameState, 1_000 / 100);

  expect(mockProgress).toHaveBeenCalledTimes(1);
  expect(mockProgress).toHaveBeenCalledWith(gameState, 1_000 / 100);
  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("splits into multiple steps and combines moved items", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValueOnce(mockMovedOrResizedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedOrResizedItemsSet(["b"]));

  const gameState = createGameState({ itemIds: ["a", "b"] });

  const progressAt60fps = progressWithSubTicks(mockProgress, 1_000 / 60);
  const moved = progressAt60fps(gameState, 1_000 / 30);

  expect(mockProgress).toHaveBeenCalledTimes(2);
  expect([...moved].map(({ id }) => id)).toEqual(
    expect.arrayContaining(["a", "b"]),
  );
});

test("filters out items that are removed by the end of substeps", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValueOnce(mockMovedOrResizedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedOrResizedItemsSet(["b"]));

  const gameState = createGameState({ itemIds: ["a"] });
  gameState.characterRooms.head!.items = mockItemsInRoom(["a"]);

  const progressAt60fps = progressWithSubTicks(mockProgress, 1_000 / 60);
  const moved = progressAt60fps(gameState, 1_000 / 30);

  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("handles fractional steps correctly", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedOrResizedItemsSet(["a"]));
  const gameState = createGameState({ itemIds: ["a"] });

  const progressAt160fps = progressWithSubTicks(mockProgress, 1_000 / 160);
  const moved = progressAt160fps(gameState, 1_000 / 50);

  expect(mockProgress).toHaveBeenCalledTimes(4);
  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});
