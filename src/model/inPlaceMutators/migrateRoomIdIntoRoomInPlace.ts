import { type AnyRoomJson } from "../RoomJson";

/**
 * give a room its `id` from its key in the campaign, if saved without one -
 * campaigns can be saved with rooms identified only by their keys
 */
export const migrateRoomIdIntoRoomInPlace = (
  /**
   * the room's key in the campaign
   */
  roomId: string,
  room: AnyRoomJson,
): void => {
  // saved data can lack the field its type requires:
  room.id ??= roomId;
};
