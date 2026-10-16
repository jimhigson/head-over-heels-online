import { itemBehaviourKey } from "../model/ItemInPlay";
import { type Campaign } from "../model/modelTypes";
import { roomItemsIterable } from "../model/roomItemsInPlayIterators";
import { type RoomState } from "../model/RoomState";
import { loadSound } from "./soundsLoader";

/**
 * starts loading every sound the room's items require or ask to preload. The
 * returned promise waits only for the required sounds; undefined if they are
 * all already loaded
 */
export const ensureRoomSoundsLoaded = <RoomId extends string>(
  room: RoomState<RoomId, string>,
  campaign: Campaign<RoomId>,
): Promise<void> | undefined => {
  const pending: Promise<void>[] = [];

  for (const item of roomItemsIterable(room.items)) {
    const behaviour = item[itemBehaviourKey];
    for (const soundId of behaviour.soundsRequired(item)) {
      const loading = loadSound(soundId);
      if (loading !== undefined) {
        // if not undefined, will be a promise we need to wait on:
        pending.push(loading);
      }
    }
    for (const soundId of behaviour.soundsToPreload(item, campaign)) {
      // not waited on - whatever plays it loads it again if not ready by then
      loadSound(soundId, "low");
    }
  }

  if (pending.length === 0) {
    // nothing needs loading
    return undefined;
  }
  return Promise.all(pending).then(() => undefined);
};
