import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../_testUtils/basicRoom";
import { resetStore } from "../../_testUtils/initStoreForTests";
import { type GameStateWithMockInput } from "../../_testUtils/MockInputStateTracker";
import { closeAllMenus } from "../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../store/store";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { progressGameState } from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";
import { tickCameraTransition } from "./tickCameraTransition";
import { deathAnimationVisibleDuration, tickGameSpeed } from "./tickGameSpeed";

beforeEach(() => {
  resetStore();
});

const gameWithPlayerOverAVolcano = (): GameStateWithMockInput => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 0, y: 0, z: 2 },
        config: { which: "head" },
      },
      deadlyBlock: {
        type: "deadlyBlock",
        position: { x: 0, y: 0, z: 0 },
        config: { style: "volcano" },
      },
    },
  });

  // a new game opens the crowns dialog over the room, which holds the world at
  // a standstill - dismiss it so play (and so the death) can begin:
  store.dispatch(closeAllMenus());

  return gameState;
};

/**
 * drop the player onto the volcano and run the slowing-down clock out, the way
 * the main loop does - the camera advances on the same scaled delta the world
 * does, so the whole death plays on one clock. Returns how far through the
 * death's visible span the spin finished, as a fraction
 */
const deathFractionWhenSpinFinished = (
  gameState: GameStateWithMockInput,
): number => {
  const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);
  let deathStartedAtRoomTime: number | undefined;

  for (let frame = 0; frame < 100_000; frame++) {
    const gameSpeed = tickGameSpeed(store.getState(), gameState);
    const deltaMS = (1_000 / 60) * gameSpeed;

    tickCameraTransition(gameState, deltaMS);

    const room = selectCurrentRoomState(gameState)!;

    if (
      deathStartedAtRoomTime !== undefined &&
      gameState.cameraTransition === undefined
    ) {
      return (
        (room.roomTime - deathStartedAtRoomTime) / deathAnimationVisibleDuration
      );
    }

    ticker(gameState, deltaMS);

    if (
      deathStartedAtRoomTime === undefined &&
      room.items.head?.state.action === "death"
    ) {
      deathStartedAtRoomTime = room.roomTime;
    }
  }

  throw new Error("the spin never finished");
};

test("dying starts the camera spinning", () => {
  const gameState = gameWithPlayerOverAVolcano();
  const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);
  while (
    selectCurrentRoomState(gameState)?.items.head?.state.action !== "death"
  ) {
    ticker(gameState, 1_000 / 60);
  }
  expect(gameState.cameraTransition).toBeDefined();
});

test("the spin settles back on the angle the room is played at", () => {
  const gameState = gameWithPlayerOverAVolcano();
  const before = gameState.targetCameraAngle;
  deathFractionWhenSpinFinished(gameState);
  expect(gameState.targetCameraAngle).toBe(before);
});

test("the spin lasts the whole death, finishing as the world freezes", () => {
  // short of 1 and the camera snaps the rest of the way when the room reloads;
  // past it and the spin is still sweeping against a frozen world:
  expect(
    deathFractionWhenSpinFinished(gameWithPlayerOverAVolcano()),
  ).toBeCloseTo(1, 1);
});
