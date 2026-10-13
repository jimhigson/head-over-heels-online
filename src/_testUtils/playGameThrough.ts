import { progressGameState } from "../game/mainLoop/progressGameState";
import { progressWithSubTicks } from "../game/mainLoop/progressWithSubTicks";
import { maxSubTickDeltaMs } from "../game/physics/mechanicsConstants";
import { cycle } from "../utils/iterators/cycle";
import {
  type GameStateWithMockInput,
  type MockInputStateTracker,
} from "./MockInputStateTracker";
import { type FrameRateSpec } from "./testFrameRates";

type FrameCallback = (
  gameState: GameStateWithMockInput,
  mockInputStateTracker: MockInputStateTracker,
) => GameStateWithMockInput | void;

type UntilFunction = (gameState: GameStateWithMockInput) => boolean;

type PlayGameThroughOptions = {
  frameRate?: FrameRateSpec;
  /**
   * allows us to change the gamestate after certain frames, for example to change the
   * joystick input while the simulation is running
   */
  frameCallbacks?: Array<FrameCallback> | FrameCallback;

  setupInitialInput?: (mockInputStateTracker: MockInputStateTracker) => void;
} & (
  | {
      forTime: number;
    }
  | {
      until?: number | UntilFunction;
    }
);

const defaultFps = { fps: [60] };
export const playGameThrough = (
  gameState: GameStateWithMockInput,
  options: PlayGameThroughOptions = {},
) => {
  const {
    frameRate = defaultFps,
    frameCallbacks = [],
    setupInitialInput = () => {},
  } = options;

  const frameRateIter = cycle(frameRate.fps);
  const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);

  const frameCallbacksArray =
    Array.isArray(frameCallbacks) ? frameCallbacks : [frameCallbacks];

  setupInitialInput(gameState.inputStateTracker);

  const startGameTime = gameState.gameTime;
  const until =
    "forTime" in options ?
      startGameTime + options.forTime
      // by default, play for 1s
    : (options.until ?? startGameTime + 1_000);
  const isFinished: UntilFunction =
    typeof until === "number" ?
      (gameStateNow) => gameStateNow.gameTime >= until
    : until;

  let frameNumber = 0;
  while (!isFinished(gameState)) {
    const fpsThisFrame = frameRateIter.next().value;
    const deltaMS = 1_000 / fpsThisFrame;

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

    // protect against infinite loops crashing node or upsetting ci/cd and taking ages to be killed:
    if (frameNumber > 5_000_000) {
      throw new Error(`test didn't exit after 5M frames ${fpsThisFrame}`);
    }
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
