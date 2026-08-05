import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { setUpBasicGame, type TestRoomId } from "../../_testUtils/basicRoom";
import { resetStore } from "../../_testUtils/initStoreForTests";
import { type GameState } from "../gameState/GameState";
import { type ProgressGameState } from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";

const createGameState = (): GameState<TestRoomId> => ({
  ...setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        config: { which: "head" },
        position: { x: 0, y: 0, z: 0 },
      },
    },
  }),
});

beforeEach(() => {
  resetStore();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("calls progress only once if below maxStepDeltaMs", () => {
  const mockProgress = vi.fn<ProgressGameState<TestRoomId>>();
  const gameState = createGameState();

  const progressAt50fps = progressWithSubTicks(mockProgress, 1_000 / 50);
  progressAt50fps(gameState, 1_000 / 100);

  expect(mockProgress).toHaveBeenCalledTimes(1);
  expect(mockProgress).toHaveBeenCalledWith(gameState, 1_000 / 100);
});

test("splits into multiple steps of equal delta", () => {
  const mockProgress = vi.fn<ProgressGameState<TestRoomId>>();
  const gameState = createGameState();

  const progressAt60fps = progressWithSubTicks(mockProgress, 1_000 / 60);
  progressAt60fps(gameState, 1_000 / 30);

  expect(mockProgress).toHaveBeenCalledTimes(2);
  expect(mockProgress).toHaveBeenCalledWith(gameState, 1_000 / 60);
});

test("handles fractional steps correctly", () => {
  const mockProgress = vi.fn<ProgressGameState<TestRoomId>>();
  const gameState = createGameState();

  const progressAt160fps = progressWithSubTicks(mockProgress, 1_000 / 160);
  progressAt160fps(gameState, 1_000 / 50);

  expect(mockProgress).toHaveBeenCalledTimes(4);
  expect(mockProgress).toHaveBeenCalledWith(gameState, 1_000 / 50 / 4);
});

test("runs a single sub-tick when no game time has passed", () => {
  const mockProgress = vi.fn<ProgressGameState<TestRoomId>>();
  const gameState = createGameState();

  const progressAt160fps = progressWithSubTicks(mockProgress, 1_000 / 160);
  progressAt160fps(gameState, 0);

  expect(mockProgress).toHaveBeenCalledTimes(1);
});
