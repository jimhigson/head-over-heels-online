import { isItemType } from "../game/physics/itemPredicates";
import { roomItemsIterable, type RoomState } from "../model/RoomState";
import { loadSound } from "./soundsLoader";

/**
 * ensures all sounds in a room's soundEffect items are loaded
 */
export const ensureRoomSoundsLoaded = (
  room: RoomState<string, string>,
): Promise<void> | undefined => {
  const pending: Promise<void>[] = [];

  for (const soundEffectItem of roomItemsIterable(room.items).filter(
    isItemType("soundEffect"),
  )) {
    const loading = loadSound(soundEffectItem.config.soundOptions.soundId);
    if (loading !== undefined) {
      // if not undefined, will be a promise we need to wait on:
      pending.push(loading);
    }
  }

  if (pending.length === 0) {
    // nothing needs loading
    return undefined;
  }
  return Promise.all(pending).then(() => undefined);
};
