import type { GameState } from "../game/gameState/GameState";
import { progressGameState } from "../game/mainLoop/progressGameState";
import type { TestRoomId } from "./basicRoom";

type FrameCallback = (
  gameState: GameState<TestRoomId>,
) => GameState<TestRoomId> | void;

type PlayGameThroughOptions = {
  frameRate?: number;
  until?: number | ((gameState: GameState<TestRoomId>) => boolean);
  /**
   * allows us to change the gamestate after certain frames, for example to change the
   * joystick input while the simulation is running
   */
  frameCallbacks?: FrameCallback | Array<FrameCallback>;
};

export const playGameThrough = (
  gameState: GameState<TestRoomId>,
  {
    frameRate = 60,
    until = 1000,
    frameCallbacks = [],
  }: PlayGameThroughOptions = { frameRate: 60, until: 1000 },
) => {
  const deltaMS = 1000 / frameRate;
  const callbacksArray =
    Array.isArray(frameCallbacks) ? frameCallbacks : [frameCallbacks];

  while (
    typeof until === "number" ? gameState.gameTime < until : !until(gameState)
  ) {
    progressGameState(gameState, deltaMS);

    gameState = callbacksArray.reduce((gameStateAc, frameCallback) => {
      try {
        return frameCallback(gameStateAc) || gameStateAc;
      } catch (e) {
        (e as Error).message =
          `while playing through @${gameStateAc.gameTime}ms ${(e as Error).message}`;
        throw e;
      }
    }, gameState);
    if (gameState.gameTime > 60_000) {
      throw new Error("test didn't exit after a minute");
    }
  }
};

export const stopJumpingAMomentAfterStartingPlay = (
  gameState: GameState<TestRoomId>,
) => {
  // stop pressing jump after a short time
  return gameState.gameTime < 50 ?
      gameState
    : {
        ...gameState,
        inputState: {
          ...gameState.inputStateTracker,
          jump: false,
        },
      };
};

export const stopAllInputAfter =
  (timeMs: number) => (gameState: GameState<TestRoomId>) => {
    // stop pressing jump after a short time
    return gameState.gameTime < timeMs ?
        gameState
      : {
          ...gameState,
          inputState: createEmptyInputState(),
        };
  };
