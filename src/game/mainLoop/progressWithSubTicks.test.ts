import { Ticker } from "pixi.js";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import type { TestRoomId } from "../../_testUtils/basicRoom";
import type { ItemInPlay } from "../../model/ItemInPlay";
import type { RoomStateItems } from "../../model/RoomState";
import type { GameState } from "../gameState/GameState";
import type { MovedItems, ProgressGameState } from "./progressGameState";

import { setUpBasicGame } from "../../_testUtils/basicRoom";
import { resetStore } from "../../_testUtils/initStoreForTests";
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

const mockMovedItemsSet = (movedItemIds: string[]) => {
  const movedItems = new Set() as MovedItems<TestRoomId, string>;
  for (const id of movedItemIds) {
    movedItems.add({ id, type: "spring" } as ItemInPlay<
      "spring",
      TestRoomId,
      string
    >);
  }
  return movedItems;
};
const mockItemsInRoom = (movedItemIds: string[]) => {
  const movedItems = {} as RoomStateItems<TestRoomId, string>;
  for (const id of movedItemIds) {
    movedItems[id] = { id, type: "spring" } as ItemInPlay<
      "spring",
      TestRoomId,
      string
    >;
  }
  return movedItems;
};

beforeEach(() => {
  resetStore();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("calls progress only once if below maxStepDeltaMs", () => {
  vi.spyOn(Ticker.shared, "speed", "get").mockReturnValue(1);

  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedItemsSet(["a"]));
  const gameState = createGameState({ itemIds: ["a"] });

  const progressAt50fps = progressWithSubTicks(mockProgress, 1_000 / 50);
  const moved = progressAt50fps(gameState, 1_000 / 100);

  expect(mockProgress).toHaveBeenCalledTimes(1);
  expect(mockProgress).toHaveBeenCalledWith(gameState, 1_000 / 100);
  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("splits into multiple steps and combines moved items", () => {
  vi.spyOn(Ticker.shared, "speed", "get").mockReturnValue(1);

  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValueOnce(mockMovedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedItemsSet(["b"]));

  const gameState = createGameState({ itemIds: ["a", "b"] });

  const progressAt60fps = progressWithSubTicks(mockProgress, 1_000 / 60);
  const moved = progressAt60fps(gameState, 1_000 / 30);

  expect(mockProgress).toHaveBeenCalledTimes(2);
  expect([...moved].map(({ id }) => id)).toEqual(
    expect.arrayContaining(["a", "b"]),
  );
});

test("filters out items that are removed by the end of substeps", () => {
  vi.spyOn(Ticker.shared, "speed", "get").mockReturnValue(1);

  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValueOnce(mockMovedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedItemsSet(["b"]));

  const gameState = createGameState({ itemIds: ["a"] });
  gameState.characterRooms.head!.items = mockItemsInRoom(["a"]);

  const progressAt60fps = progressWithSubTicks(mockProgress, 1_000 / 60);
  const moved = progressAt60fps(gameState, 1_000 / 30);

  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("handles fractional steps correctly", () => {
  vi.spyOn(Ticker.shared, "speed", "get").mockReturnValue(1);

  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedItemsSet(["a"]));
  const gameState = createGameState({ itemIds: ["a"] });

  const progressAt160fps = progressWithSubTicks(mockProgress, 1_000 / 160);
  const moved = progressAt160fps(gameState, 1_000 / 50);

  expect(mockProgress).toHaveBeenCalledTimes(4);
  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});
