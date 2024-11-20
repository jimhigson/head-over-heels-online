import type { GameState } from "@/game/gameState/GameState";
import { progressGameState } from "@/game/mainLoop/progressGameState";
import type { TestRoomId } from "./basicRoom";
import { noInput } from "@/game/input/InputState";

type FrameCallback = (
  gameState: GameState<TestRoomId>,
) => GameState<TestRoomId> | void;

export const playGameThrough = (
  gameState: GameState<TestRoomId>,
  {
    frameRate = 60,
    forTime = 1000,
    frameCallbacks = [],
  }: {
    frameRate?: number;
    forTime?: number;
    /**
     * allows us to change the gamestate after certain frames, for example to change the
     * joystick input while the simulation is running
     */
    frameCallbacks?: FrameCallback | Array<FrameCallback>;
  } = { frameRate: 60, forTime: 1000 },
) => {
  const deltaMS = 1000 / frameRate;
  const callbacksArray =
    Array.isArray(frameCallbacks) ? frameCallbacks : [frameCallbacks];

  while (gameState.gameTime < forTime) {
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
          ...gameState.inputState,
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
          inputState: noInput(),
        };
  };
