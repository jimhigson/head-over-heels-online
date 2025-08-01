import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import { type FreeItemTypes } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import { scaleXyz } from "../../../utils/vectors/vectors";

/**
 * Apply scheduled movement frames to items. Movement frames have start and end times,
 * and items move with a specified velocity during that time window.
 *
 * This handles partial frames correctly:
 * - If we're mid-frame, only apply the portion of movement for the current tick
 * - Only remove frames once they're fully consumed (past their end time)
 * - Convert velocity (pixels/ms) to position delta by multiplying by elapsed time
 */
export function* latentMovement<
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemInPlay<FreeItemTypes, RoomId, RoomItemId>,
  { roomTime }: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  /** how much time, in ms has passed since the last tick */
  deltaMS: number,
): Generator<MechanicResult<FreeItemTypes, RoomId, RoomItemId>> {
  const currentTime = roomTime;
  const previousTime = roomTime - deltaMS;

  // Process frames that should be active during this tick
  const framesToRemove: number[] = [];

  for (let i = 0; i < item.state.latentMovement.length; i++) {
    const frame = item.state.latentMovement[i];

    // Skip frames that haven't started yet
    if (frame.startAtRoomTime > currentTime) {
      continue;
    }

    // Remove frames that ended before this tick started
    if (frame.endAtRoomTime <= previousTime) {
      framesToRemove.push(i);
      continue;
    }

    // Calculate the time window this frame is active during this tick
    const frameStartDuringTick = Math.max(frame.startAtRoomTime, previousTime);
    const frameEndDuringTick = Math.min(frame.endAtRoomTime, currentTime);
    const activeTime = frameEndDuringTick - frameStartDuringTick;

    // Only apply movement if the frame was active for some time during this tick
    if (activeTime > 0) {
      // Convert velocity to position delta: velocity (pixels/ms) × time (ms) = pixels
      const posDelta = scaleXyz(frame.velocity, activeTime);
      yield { movementType: "position", posDelta };
    }

    // Mark frame for removal if it's fully consumed (past its end time)
    if (frame.endAtRoomTime <= currentTime) {
      framesToRemove.push(i);
    }
  }

  // Remove fully consumed frames (in reverse order to maintain indices)
  for (let i = framesToRemove.length - 1; i >= 0; i--) {
    item.state.latentMovement.splice(framesToRemove[i], 1);
  }
}
