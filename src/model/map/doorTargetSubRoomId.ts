import { exitGameRoomId } from "../json/ItemConfigMap";
import { type JsonItem } from "../json/JsonItem";
import { type Campaign } from "../modelTypes";
import { partnerDoorSubRoomId } from "./partnerDoorSubRoomId";

/**
 * the sub-room of its `toRoom` a door leads into: its `toSubRoom` if it has
 * one, otherwise as implied by its partner door - or the whole room (`"*"`)
 * where neither says
 */
export const doorTargetSubRoomId = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  /** the room the door is in */
  roomId: RoomId,
  door: JsonItem<"door", RoomId, string>,
): string => {
  const { toRoom } = door.config;
  return (
    door.config.meta?.toSubRoom ??
    (toRoom === exitGameRoomId || !(toRoom in rooms) ?
      undefined
    : partnerDoorSubRoomId(rooms, roomId, door, toRoom)) ??
    "*"
  );
};
