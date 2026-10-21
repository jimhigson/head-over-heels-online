import { keys } from "../../utils/entries";
import { exitGameRoomId } from "../json/ItemConfigMap";
import { type JsonItem } from "../json/JsonItem";
import { type Campaign } from "../modelTypes";
import { isWholeRoomSubRooms } from "../RoomJson";
import { partnerDoorSubRoomId } from "./partnerDoorSubRoomId";

/**
 * why a door's `meta.toSubRoom` has no effect: its `toRoom` is undivided, or
 * its partner door's position already implies the same sub-room
 */
export type ToSubRoomRedundancy = "inferable" | "undivided";

/**
 * why a door's `meta.toSubRoom` is redundant, or undefined when it isn't (or
 * the door has none)
 */
export const toSubRoomRedundancy = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  /** the room the door is in */
  roomId: RoomId,
  door: JsonItem<"door", RoomId, string>,
): ToSubRoomRedundancy | undefined => {
  const { toRoom } = door.config;
  const toSubRoom = door.config.meta?.toSubRoom;
  if (
    toSubRoom === undefined ||
    toRoom === exitGameRoomId ||
    !(toRoom in rooms)
  ) {
    return undefined;
  }
  const subRooms = rooms[toRoom].meta?.subRooms;
  if (subRooms === undefined || isWholeRoomSubRooms(subRooms)) {
    return "undivided";
  }
  return partnerDoorSubRoomId(rooms, roomId, door, toRoom) === toSubRoom ?
      "inferable"
    : undefined;
};

/**
 * remove a door's `meta.toSubRoom` where it is redundant, so edits that link
 * doors don't leave a warning behind
 */
export const dropRedundantToSubRoomInPlace = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  /** the room the door is in */
  roomId: RoomId,
  door: JsonItem<"door", RoomId, string>,
) => {
  if (
    door.config.meta === undefined ||
    toSubRoomRedundancy(rooms, roomId, door) === undefined
  ) {
    return;
  }
  delete door.config.meta.toSubRoom;
  if (keys(door.config.meta).length === 0) {
    delete door.config.meta;
  }
};
