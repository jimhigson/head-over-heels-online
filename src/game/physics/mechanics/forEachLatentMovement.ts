import type { FreeItem } from "../../../model/ItemInPlayNarrowedUnions";
import type { RoomState } from "../../../model/RoomState";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

export type ApplicableLatentMovement<RoomItemId extends string> = {
  posDelta: Xyz;
  movedBy: RoomItemId;
};

export type OnLatentMovement<
  RoomId extends string,
  RoomItemId extends string,
> = (
  item: FreeItem<RoomId, RoomItemId>,
  /**
   * the item that gave the latent movement
   */
  movedBy: RoomItemId,
  /**
   * reused between calls - copy it to keep it
   */
  posDelta: Xyz,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => void;

// the movement given to each call back; reused so ticks don't allocate it
const posDeltaBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * Apply scheduled movement frames to items. Movement frames have start and end times,
 * and items move with a specified velocity during that time window.
 *
 * This handles partial frames correctly:
 * - If we're mid-frame, only apply the portion of movement for the current tick
 * - Only remove frames once they're fully consumed (past their end time)
 * - Convert velocity (pixels/ms) to position delta by multiplying by elapsed time
 *
 * Calls back once for each frame that moves the item during this tick
 */
export const forEachLatentMovement = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  /** how much time, in ms has passed since the last tick */
  deltaMS: number,
  onLatentMovement: OnLatentMovement<RoomId, RoomItemId>,
): void => {
  const currentTime = room.roomTime;
  const previousTime = currentTime - deltaMS;

  const frames = item.state.latentMovement;
  // frames kept are moved down over the removed ones, so removing allocates
  // nothing:
  let keptCount = 0;

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];

    // Skip frames that haven't started yet
    if (frame.startAtRoomTime > currentTime) {
      frames[keptCount++] = frame;
      continue;
    }

    // Remove frames that ended before this tick started
    if (frame.endAtRoomTime <= previousTime) {
      continue;
    }

    // remove frames where the item standing is no longer standing
    // on the item that gave it the latent movement:
    if (frame.fromStandingOn !== item.state.standingOnItemId) {
      continue;
    }

    // Calculate the time window this frame is active during this tick
    const frameStartDuringTick = Math.max(frame.startAtRoomTime, previousTime);
    const frameEndDuringTick = Math.min(frame.endAtRoomTime, currentTime);
    const activeTime = frameEndDuringTick - frameStartDuringTick;

    // Only apply movement if the frame was active for some time during this tick
    if (activeTime > 0) {
      // Convert velocity to position delta: velocity (pixels/ms) × time (ms) = pixels
      posDeltaBuffer.x = frame.velocity.x * activeTime;
      posDeltaBuffer.y = frame.velocity.y * activeTime;
      posDeltaBuffer.z = frame.velocity.z * activeTime;
      onLatentMovement(
        item,
        frame.fromStandingOn,
        posDeltaBuffer,
        room,
        gameState,
        deltaMS,
      );
      if (item.state.latentMovement !== frames) {
        // the item's latent movement was replaced while moving (eg, it left
        // the room), so the rest of these frames no longer apply:
        return;
      }
    }

    // Keep the frame unless it's fully consumed (past its end time)
    if (frame.endAtRoomTime > currentTime) {
      frames[keptCount++] = frame;
    }
  }

  frames.length = keptCount;
};
