import type { Simplify } from "type-fest";
import type { SceneryName } from "../sprites/planets";
import type { UnionOfAllItemInPlayTypes, ItemInPlay } from "./ItemInPlay";
import type { RoomJson } from "./RoomJson";

/**
 * a map of items-in-play in a room
 **/

export type RoomStateItems<
  P extends SceneryName,
  RoomId extends string,
  ItemId extends string = string,
> = Record<ItemId, UnionOfAllItemInPlayTypes<RoomId>> & {
  head?: ItemInPlay<"head", P, RoomId, "head">;
  heels?: ItemInPlay<"heels", P, RoomId, "heels">;
  headOverHeels?: ItemInPlay<"headOverHeels", P, RoomId, "headOverHeels">;
  // every room has a floor edge:
  floorEdge: ItemInPlay<"floorEdge", P, RoomId, "floorEdge">;
};
/**
 * Representation of a room in-play. This is in memory only for the current
 * one or two rooms (that head and heels are in, but they could be in the same
 * room)
 */

export type RoomState<
  ScN extends SceneryName,
  RoomId extends string,
  ItemId extends string = string,
> = Simplify<
  Omit<RoomJson<ScN, RoomId>, "items"> & {
    items: RoomStateItems<ScN, RoomId, ItemId>;
    /** the json this room was loaded from */
    roomJson: RoomJson<ScN, RoomId, ItemId>;
    /**
     * how long (in ms) this room has been in play for - only advanced while the room
     * is the current room
     */
    roomTime: number;
  }
>;
export type UnknownRoomState = RoomState<SceneryName, string>;
