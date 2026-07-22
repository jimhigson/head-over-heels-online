import {
  type DirectionXy4,
  oppositeDirection,
} from "../../utils/vectors/vectors";
import { type Campaign } from "../modelTypes";
import { iterateRoomJsonItemsWithIds } from "../RoomJson";
import { type JsonItem } from "./JsonItem";

/** a door, together with the room and id it lives under */
export type DoorRef<RoomId extends string> = {
  roomId: RoomId;
  doorId: string;
  door: JsonItem<"door", RoomId, string>;
};

/**
 * the doors in `toRoom` that a door leaving `fromRoom` in `sourceDirection` could
 * resolve to: doors whose `toRoom` points back to `fromRoom` and whose direction
 * is the opposite. Mirrors `findDestinationPortal`'s door matching, ignoring
 * `toDoor`. Shared by the editor (to decide when a `toDoor` is needed to
 * disambiguate a link) and the verifiers (to decide when a `toDoor` is
 * redundant), so the two never disagree about it.
 */
export const candidatePartnerDoors = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  fromRoom: RoomId,
  toRoom: RoomId,
  sourceDirection: DirectionXy4,
): DoorRef<RoomId>[] => {
  if (!(toRoom in rooms)) {
    return [];
  }
  const wanted = oppositeDirection(sourceDirection);
  return iterateRoomJsonItemsWithIds(rooms[toRoom].items, "door")
    .filter(
      ([, door]) =>
        door.config.toRoom === fromRoom && door.config.direction === wanted,
    )
    .map(([doorId, door]): DoorRef<RoomId> => ({
      roomId: toRoom,
      doorId,
      door,
    }))
    .toArray();
};

/**
 * whether a door from `fromRoom` to `toRoom` leaving in `sourceDirection` needs
 * an explicit `toDoor` to pick its partner: true only when more than one door
 * comes back, so the link would otherwise be ambiguous. When exactly one (or
 * none) comes back a `toDoor` is redundant.
 */
export const doorLinkNeedsToDoor = <RoomId extends string>(
  rooms: Campaign<RoomId>["rooms"],
  fromRoom: RoomId,
  toRoom: RoomId,
  sourceDirection: DirectionXy4,
): boolean =>
  candidatePartnerDoors(rooms, fromRoom, toRoom, sourceDirection).length > 1;
