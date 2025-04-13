import type { GameState } from "../game/gameState/GameState";
import { progressGameState } from "../game/mainLoop/progressGameState";
import { progressWithSubTicks } from "../game/mainLoop/progressWithSubTicks";
import { maxSubTickDeltaMs } from "../game/physics/mechanicsConstants";
import type { TestRoomId } from "./basicRoom";
import type {
  GameStateWithMockInput,
  MockInputStateTracker,
} from "./MockInputStateTracker";

type FrameCallback = (
  gameState: GameStateWithMockInput,
  mockInputStateTracker: MockInputStateTracker,
) => GameStateWithMockInput | void;

type PlayGameThroughOptions = {
  frameRate?: number;
  until?: number | ((gameState: GameState<TestRoomId>) => boolean);
  /**
   * allows us to change the gamestate after certain frames, for example to change the
   * joystick input while the simulation is running
   */
  frameCallbacks?: FrameCallback | Array<FrameCallback>;

  setupInitialInput?: (mockInputStateTracker: MockInputStateTracker) => void;
};

export const playGameThrough = (
  gameState: GameStateWithMockInput,
  {
    frameRate = 60,
    until = 1000,
    frameCallbacks = [],
    setupInitialInput = () => {},
  }: PlayGameThroughOptions = { frameRate: 60, until: 1000 },
) => {
  const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);

  const deltaMS = 1000 / frameRate;
  const frameCallbacksArray =
    Array.isArray(frameCallbacks) ? frameCallbacks : [frameCallbacks];

  setupInitialInput(gameState.inputStateTracker);

  let frameNumber = 0;
  while (
    typeof until === "number" ? gameState.gameTime < until : !until(gameState)
  ) {
    ticker(gameState, deltaMS);
    gameState.inputStateTracker.mockTick();
    gameState = frameCallbacksArray.reduce((gameStateAc, frameCallback) => {
      try {
        return (
          frameCallback(gameStateAc, gameState.inputStateTracker) || gameStateAc
        );
      } catch (e) {
        (e as Error).message =
          `while playing through @${gameStateAc.gameTime}ms (frame ${frameNumber}) ${(e as Error).message}`;
        throw e;
      }
    }, gameState);
    if (gameState.gameTime > 60_000) {
      throw new Error("test didn't exit after a minute");
    }

    frameNumber++;
  }
};

export const stopJumpingAMomentAfterStartingPlay = (
  gameState: GameStateWithMockInput,
) => {
  if (gameState.gameTime > 50) {
    gameState.inputStateTracker.mockNotPressing("jump");
  }
};

export const stopAllInputAfter =
  (timeMs: number) => (gameState: GameStateWithMockInput) => {
    if (gameState.gameTime >= timeMs) {
      gameState.inputStateTracker.mockActionsPressed = {};
      gameState.inputStateTracker.mockDirectionPressed = undefined;
    }
  };
