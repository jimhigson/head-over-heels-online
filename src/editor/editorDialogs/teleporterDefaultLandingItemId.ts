import { iterateRoomJsonItemIds } from "../../model/RoomJsonItemIterators";
import { type EditorRoomItemId, type EditorRoomJson } from "../editorTypes";

/**
 * the item a teleporter lands on in a room when it names none: the room's only
 * teleporter (fixed or portable), not counting the ones being set. Undefined
 * when there isn't exactly one, so an item has to be named
 */
export const teleporterDefaultLandingItemId = (
  destinationRoomJson: EditorRoomJson,
  /**
   * the teleporters whose destination is being set, which can't be landed
   * on when they are in the destination room
   */
  settingTeleporterIds: readonly EditorRoomItemId[],
): EditorRoomItemId | undefined => {
  const [loneTeleporterId, ...otherTeleporterIds] = iterateRoomJsonItemIds(
    destinationRoomJson.items,
    "teleporter",
    "portableTeleporter",
  )
    .filter((teleporterId) => !settingTeleporterIds.includes(teleporterId))
    .toArray();
  return otherTeleporterIds.length === 0 ? loneTeleporterId : undefined;
};
