import { expect, vi, test, beforeEach } from "vitest";
import { progressWithSubTicks } from "./progressWithSubTicks";
import type { TestRoomId } from "../../_testUtils/basicRoom";
import { setUpBasicGame } from "../../_testUtils/basicRoom";
import type { MovedItems, ProgressGameState } from "./progressGameState";
import type { GameState } from "../gameState/GameState";
import type { ItemInPlay } from "../../model/ItemInPlay";
import type { RoomStateItems } from "../../model/RoomState";
import { resetStore } from "../../_testUtils/initStoreForTests";

const createGameState = ({
  gameSpeed,
  itemIds,
}: {
  gameSpeed: number;
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
  gameSpeed,
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

test("calls progress only once if below maxStepDeltaMs", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedItemsSet(["a"]));
  const gameState = createGameState({ gameSpeed: 1, itemIds: ["a"] });

  const progressAt50fps = progressWithSubTicks(mockProgress, 1_000 / 50);
  const moved = progressAt50fps(gameState, 1_000 / 100);

  expect(mockProgress).toHaveBeenCalledTimes(1);
  expect(mockProgress).toHaveBeenCalledWith(gameState, 1_000 / 100);
  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("splits into multiple steps and combines moved items", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValueOnce(mockMovedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedItemsSet(["b"]));

  const gameState = createGameState({ gameSpeed: 1, itemIds: ["a", "b"] });

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
    .mockReturnValueOnce(mockMovedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedItemsSet(["b"]));

  const gameState = createGameState({ gameSpeed: 1, itemIds: ["a"] });
  gameState.characterRooms.head!.items = mockItemsInRoom(["a"]);

  const progressAt60fps = progressWithSubTicks(mockProgress, 1_000 / 60);
  const moved = progressAt60fps(gameState, 1_000 / 30);

  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("handles fractional steps correctly", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedItemsSet(["a"]));
  const gameState = createGameState({ gameSpeed: 1, itemIds: ["a"] });

  const progressAt160fps = progressWithSubTicks(mockProgress, 1_000 / 160);
  const moved = progressAt160fps(gameState, 1_000 / 50);

  expect(mockProgress).toHaveBeenCalledTimes(4);
  expect([...moved].map(({ id }) => id)).toEqual(["a"]);
});

test("applies gameSpeed scaling to determine total step time", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValueOnce(mockMovedItemsSet(["a"]))
    .mockReturnValueOnce(mockMovedItemsSet(["b"]))
    .mockReturnValueOnce(mockMovedItemsSet(["b"]));

  const gameState = createGameState({ gameSpeed: 2, itemIds: ["a", "b"] });

  const progressAt80fps = progressWithSubTicks(mockProgress, 1_000 / 80);
  const moved = progressAt80fps(gameState, 1_000 / 60); // 50fps * 2x speed = 40ms

  // 16ms per frame, x 2 = 32 ms. Against a max of 12.5ms, give
  // 3 sub-ticks
  expect(mockProgress).toHaveBeenCalledTimes(3);
  expect([...moved].map(({ id }) => id)).toEqual(
    expect.arrayContaining(["a", "b"]),
  );
});

test("works efficiently for very high game speeds", () => {
  const mockProgress = vi
    .fn<ProgressGameState<TestRoomId, string>>()
    .mockReturnValue(mockMovedItemsSet(["a"]));

  const gameState = createGameState({ gameSpeed: 100, itemIds: ["a", "b"] });

  const progressAt80fps = progressWithSubTicks(mockProgress, 1_000 / 80);
  const moved = progressAt80fps(gameState, 1_000 / 60);

  // note - didn't do 200 (2 sub-ticks per sped-up frame)
  expect(mockProgress).toHaveBeenCalledTimes(134);
  expect([...moved].map(({ id }) => id)).toEqual(expect.arrayContaining(["a"]));
});
