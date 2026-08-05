import { type Simplify, type Tagged, type ValueOf } from "type-fest";

import { type SpatialIndex } from "../game/physics/gridSpace/SpatialIndex";
import { type SceneryName } from "../sprites/planets";
import { objectEntriesIter, valuesIter } from "../utils/entries";
import { type ItemInPlay, type UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import { type RoomJson } from "./RoomJson";

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
        ItemInPlay<"head", RoomId, "head" | RoomItemId, "head", ScN>
      : Id extends "heels" ?
        ItemInPlay<"heels", RoomId, "heels" | RoomItemId, "heels", ScN>
      : Id extends "headOverHeels" ?
        ItemInPlay<
          "headOverHeels",
          RoomId,
          "headOverHeels" | RoomItemId,
          "headOverHeels",
          ScN
        >
      : UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>)
    | undefined;
};

export const roomItemsArray = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
): Array<ValueOf<typeof roomItems>> => {
  return Object.values(roomItems);
};

/** Re-export of valuesIter under a more convenient type specialised for room items */
export const roomItemsIterable = valuesIter as <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => IterableIterator<ValueOf<RoomStateItems<RoomId, RoomItemId, ScN>>>;

export const iterateRoomItemEntries = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomItems: RoomStateItems<RoomId, RoomItemId, ScN>,
) => {
  return objectEntriesIter(
    roomItems as Partial<Record<RoomItemId, ValueOf<typeof roomItems>>>,
  ) as IterableIterator<[RoomItemId, ValueOf<typeof roomItems>]>;
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
      ItemInPlay<"head", RoomId, RoomItemId, RoomItemId, ScN> | undefined,
    heels: roomItems["heels" as RoomItemId] as
      ItemInPlay<"heels", RoomId, RoomItemId, RoomItemId, ScN> | undefined,
    headOverHeels: roomItems["headOverHeels" as RoomItemId] as
      | ItemInPlay<"headOverHeels", RoomId, RoomItemId, RoomItemId, ScN>
      | undefined,
  };
};

/**
 * symbol for storing the optimised cache of the room's space, for O(1) lookup
 * of neighbouring items
 */
export const roomSpatialIndexKey = Symbol("roomSpatialIndexKey");

/**
 * a count on a room's progression clock - tagged so it can't be swopped with
 * the roomTime, the other number a room counts in
 */
export type Progression = Tagged<number, "Progression">;

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
     * how many times this room's state has progressed: bumped on every
     * progressing mutation (an item moving, resizing, or entering the room)
     */
    progression: Progression;
    /**
     * since this is stored under a symbol, it will not be written to JSON when the room
     * state is saved
     */
    [roomSpatialIndexKey]: SpatialIndex<RoomId, RoomItemId>;
  }
>;
export type UnknownRoomState = RoomState<string, string, SceneryName>;
