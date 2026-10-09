import { candidatePartnerDoors } from "../json/candidatePartnerDoors";
import { type JsonItem } from "../json/JsonItem";
import { type Campaign } from "../modelTypes";
import { findSubRoomForItem } from "./itemIsInSubRoom";

/**
 * the sub-room of `toRoom` holding a door's partner door: the one named by its
 * `toDoor`, otherwise the only candidate. Undefined when there is no single
 * partner. Ignores the door's own `toSubRoom`
 */
export const partnerDoorSubRoomId = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  /** the room the door is in */
  fromRoomId: RoomId,
  door: JsonItem<"door", RoomId, string>,
  /** the door's `toRoom`, known not to be the exit-game room */
  toRoom: RoomId,
): string | undefined => {
  const { toDoor, direction } = door.config;
  const candidates = candidatePartnerDoors(
    rooms,
    fromRoomId,
    toRoom,
    direction,
  );
  const partner =
    toDoor !== undefined ?
      candidates.find((candidate) => candidate.doorId === toDoor)
    : candidates.length === 1 ? candidates[0]
    : undefined;
  return partner === undefined ? undefined : (
      findSubRoomForItem(partner.door.position, "block", rooms[toRoom])
    );
};
