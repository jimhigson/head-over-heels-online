import { Ticker } from "pixi.js";

import { type GameState } from "../gameState/GameState";
import { type ProgressGameState } from "./progressGameState";
import { swopPlayablesIfInput } from "./swopPlayablesIfInput";

export const progressWithSubTicks =
  <RoomId extends string>(
    progress: ProgressGameState<RoomId>,
    maxStepDeltaMs: number,
  ): ProgressGameState<RoomId> =>
  (gameState: GameState<RoomId>, deltaMS: number): void => {
    /*
      swopping needs to be done outside of the sub-ticks - since it isn't
      possible to change the input between sub-steps, the most it can be
      done is once per tick. Items the swop introduces are stamped as moved
      by addItemToRoom like any other spawn.
    */
    swopPlayablesIfInput(gameState);

    const tickerSpeed = Ticker.shared.speed;
    const numberOfSubTicks =
      // snapshot tests run at a gamespeed of 0 - in any case, at this speed nothing is happening
      // so one tick is enough. Otherwise, it would run progressing at steps of the maxStepDeltaMs
      // which at the reduced frame rate for snapshot tests is a lot of frames
      tickerSpeed === 0 ? 1 : Math.max(1, Math.ceil(deltaMS / maxStepDeltaMs));

    const stepDeltaMs = deltaMS / numberOfSubTicks;

    for (let i = 0; i < numberOfSubTicks; i++) {
      progress(gameState, stepDeltaMs);
    }
  };
