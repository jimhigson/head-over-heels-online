import type { AnyRoomJson } from "../RoomJson";

/**
 * a room's json as it was saved while rooms also held their own id - the same
 * as the key they are stored under
 */
type LegacyRoomJsonWithId = AnyRoomJson & { id?: string };

/**
 * remove the id that older rooms carried - a room's id is its key in the
 * campaign. Needed for json saved before rooms stopped holding their id: db
 * campaigns, and campaigns the editor kept locally
 */
export const migrateRoomIdInPlace = (room: LegacyRoomJsonWithId): void => {
  delete room.id;
};
