import type { GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import type { ProgressGameState } from "./progressGameState";
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

    const room = selectCurrentRoomState(gameState);
    if (room !== undefined) {
      // a new frame is starting in the current room:
      room.roomFrameStartTime = room.roomTime;
    }

    const numberOfSubTicks = Math.max(1, Math.ceil(deltaMS / maxStepDeltaMs));

    const stepDeltaMs = deltaMS / numberOfSubTicks;

    for (let i = 0; i < numberOfSubTicks; i++) {
      progress(gameState, stepDeltaMs);
    }
  };
