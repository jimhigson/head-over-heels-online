import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../_testUtils/basicRoom";
import { resetStore } from "../../_testUtils/initStoreForTests";
import { type GameStateWithMockInput } from "../../_testUtils/MockInputStateTracker";
import { closeAllMenus } from "../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../store/store";
import { selectPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { progressGameState } from "../mainLoop/progressGameState";
import { progressWithSubTicks } from "../mainLoop/progressWithSubTicks";
import { tickGameSpeed } from "../mainLoop/tickGameSpeed";
import { maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { deathCameraSpinRadians } from "./deathCameraSpinRadians";

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
 * run frames the way the main loop does, until `until` says to stop - the world
 * advances on the game-speed-scaled delta, which the death slows towards a
 * standstill
 */
const playFramesUntil = (
  gameState: GameStateWithMockInput,
  until: (gameState: GameStateWithMockInput) => boolean,
) => {
  const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);

  for (let frame = 0; frame < 100_000; frame++) {
    if (until(gameState)) {
      return;
    }
    ticker(
      gameState,
      (1_000 / 60) * tickGameSpeed(store.getState(), gameState),
    );
  }

  throw new Error("the game never reached the state the test waited for");
};

const isDying = (gameState: GameStateWithMockInput) =>
  selectPlayableItem(gameState, "head")?.state.action === "death";

test("nobody dying leaves the drawn angle alone", () => {
  const gameState = gameWithPlayerOverAVolcano();
  expect(deathCameraSpinRadians(gameState)).toBe(0);
});

test("the swing grows as the death plays", () => {
  const gameState = gameWithPlayerOverAVolcano();
  playFramesUntil(gameState, isDying);
  const atDeath = deathCameraSpinRadians(gameState);
  playFramesUntil(
    gameState,
    (gs) => tickGameSpeed(store.getState(), gs) === 0 || !isDying(gs),
  );
  expect(Math.abs(deathCameraSpinRadians(gameState))).toBeGreaterThan(
    Math.abs(atDeath),
  );
});

test("the swing reaches a quarter turn by the time the world freezes", () => {
  const gameState = gameWithPlayerOverAVolcano();
  playFramesUntil(gameState, isDying);
  playFramesUntil(
    gameState,
    (gs) => tickGameSpeed(store.getState(), gs) === 0 || !isDying(gs),
  );
  expect(deathCameraSpinRadians(gameState)).toBeCloseTo(-Math.PI / 2, 1);
});

test("the swing unwinds to nothing once the character is playing again", () => {
  const gameState = gameWithPlayerOverAVolcano();
  playFramesUntil(gameState, isDying);
  playFramesUntil(
    gameState,
    (gs) => tickGameSpeed(store.getState(), gs) === 0 || !isDying(gs),
  );

  // dismissing the death dialog ends the fade and puts the character back:
  store.dispatch(closeAllMenus());
  playFramesUntil(gameState, (gs) => !isDying(gs));

  expect(deathCameraSpinRadians(gameState)).toBe(0);
});
