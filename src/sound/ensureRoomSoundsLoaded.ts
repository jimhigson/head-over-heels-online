import { isItemType } from "../game/physics/itemPredicates";
import { roomItemsIterable, type RoomState } from "../model/RoomState";
import { ensureSoundsLoaded } from "./soundsLoader";

/**
 * ensures every sound named by the room's soundEffect items (the room entry
 * tunes and new-game fanfare, which are excluded from the initial sound
 * load) is decoded into the sound map.
 *
 * Called by the main loop when the room changes; while the returned promise
 * is pending the room is not rendered - the same treatment as loading a
 * spritesheet variant. Returns undefined when nothing is missing (the usual
 * case), so the main loop can carry on without skipping a frame.
 */
export const ensureRoomSoundsLoaded = (
  room: RoomState<string, string>,
): Promise<void> | undefined =>
  ensureSoundsLoaded(
    roomItemsIterable(room.items)
      .filter(isItemType("soundEffect"))
      .map((item) => item.config.soundOptions.soundId),
  );
