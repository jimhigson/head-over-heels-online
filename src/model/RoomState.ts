import type { Simplify, ValueOf } from "type-fest";
import type { SceneryName } from "../sprites/planets";
import type { ItemInPlay, UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { RoomJson } from "./RoomJson";
import { objectEntries, objectValues } from "iter-tools";
import { iterate } from "../utils/iterate";

/*type RoomItemIdWithKnownIds = (
  | "head"
  | "heels"
  | "headOverHeels"
  | "floorEdge"
) &
  (string & {});*/

/**
 * a map of items-in-play in a room
 **/

export type RoomStateItems<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = {
  [RID in RoomItemId]: UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>;
};

/**
 * getter for room items, with some well-known ids built-in and auto-providing
 * completed types for. This is a substitute since it is no longer possible to
 * bake well-known ids into the RoomStateItems type
 */
export const getRoomItem = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName,
  Id extends RoomItemId,
>(
  id: Id,
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN> | undefined,
) => {
  return roomItems?.[id] as
    | (Id extends "head" ?
        ItemInPlay<"head", RoomId, RoomItemId | "head", "head", ScN>
      : Id extends "heels" ?
        ItemInPlay<"heels", RoomId, RoomItemId | "heels", "heels", ScN>
      : Id extends "headOverHeels" ?
        ItemInPlay<
          "headOverHeels",
          RoomId,
          RoomItemId | "headOverHeels",
          "headOverHeels",
          ScN
        >
      : UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>)
    | undefined;
};

export const roomItemsIterable = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
): IterableIterator<ValueOf<typeof roomItems>> => {
  return objectValues(roomItems);
};

export const iterateRoomItems = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => {
  return iterate(roomItemsIterable(roomItems));
};

export const iterateRoomItemEntries = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => {
  return iterate(objectEntries(roomItems)) as IteratorObject<
    [RoomItemId, ValueOf<typeof roomItems>]
  >;
};

/**
 * @deprecated - marked as deprecated only to remind that...
 * TODO: this would be unecessary if *RoomItemId extends KnownRoomItemIds (everywhere!)* was
 * implemented
 */
export const playablesInRoom = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => {
  return {
    head: roomItems["head" as RoomItemId] as
      | ItemInPlay<"head", RoomId, RoomItemId, RoomItemId, ScN>
      | undefined,
    heels: roomItems["heels" as RoomItemId] as
      | ItemInPlay<"heels", RoomId, RoomItemId, RoomItemId, ScN>
      | undefined,
    headOverHeels: roomItems["headOverHeels" as RoomItemId] as
      | ItemInPlay<"headOverHeels", RoomId, RoomItemId, RoomItemId, ScN>
      | undefined,
  };
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
  Omit<RoomJson<RoomId, RoomItemId, ScN>, "items" | "meta"> & {
    items: RoomStateItems<RoomId, RoomItemId, ScN>;
    /** the json this room was loaded from */
    roomJson: RoomJson<RoomId, RoomItemId, ScN>;
    /**
     * how long (in ms) this room has been in play for - only advanced while the room
     * is the current room
     */
    roomTime: number;

    /**
     * properties set on the room state by the level editor - will not exist
     * in-play
     */
    editor?: {
      hoveredJsonItemId?: RoomItemId;
      selectedJsonItemId?: Array<RoomItemId>;
    };
  }
>;
export type UnknownRoomState = RoomState<string, string, SceneryName>;
