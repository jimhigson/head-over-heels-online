import type { Simplify } from "type-fest";
import type { SceneryName } from "../sprites/planets";
import type { UnionOfAllItemInPlayTypes, ItemInPlay } from "./ItemInPlay";
import type { RoomJson } from "./RoomJson";

/**
 * a map of items-in-play in a room
 **/

export type RoomStateItems<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = Record<RoomItemId, UnionOfAllItemInPlayTypes<RoomId>> & {
  head?: ItemInPlay<"head", RoomId, RoomItemId, "head", ScN>;
  heels?: ItemInPlay<"heels", RoomId, RoomItemId, "heels", ScN>;
  headOverHeels?: ItemInPlay<
    "headOverHeels",
    RoomId,
    RoomItemId,
    "headOverHeels",
    ScN
  >;
  // every room has a floor edge:
  floorEdge: ItemInPlay<"floorEdge", RoomId, RoomItemId, "floorEdge", ScN>;
};
/**
 * Representation of a room in-play. This is in memory only for the current
 * one or two rooms (that head and heels are in, but they could be in the same
 * room)
 */

export type RoomState<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = Simplify<
  Omit<RoomJson<RoomId, RoomItemId, ScN>, "items"> & {
    items: RoomStateItems<RoomId, RoomItemId, ScN>;
    /** the json this room was loaded from */
    roomJson: RoomJson<RoomId, RoomItemId, ScN>;
    /**
     * how long (in ms) this room has been in play for - only advanced while the room
     * is the current room
     */
    roomTime: number;
  }
>;
export type UnknownRoomState = RoomState<SceneryName, string>;
