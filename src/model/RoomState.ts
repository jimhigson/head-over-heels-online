import type { Simplify, ValueOf } from "type-fest";
import type { SceneryName } from "../sprites/planets";
import type { ItemInPlay, UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { RoomJson } from "./RoomJson";
import { objectEntries, objectValues } from "iter-tools";
import { iterate } from "../utils/iterate";

/**
 * a map of items-in-play in a room
 **/

export type RoomStateItems<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = Record<
  RoomItemId,
  UnionOfAllItemInPlayTypes<RoomId, RoomItemId, ScN>
>; /* & {
  // TODO: remove comment if this sticks
  //  nope, results in unions that are too complex to represent - need to find a simpler
  //  expression of how this can be iterated
  // commented out code pre-completes the types for some known ids - this is useful
  // and should be tried to be re-introduced when there is a lul in refactors
  // the solution here is probably RoomItemId extends KnownRoomItemIds (everywhere!)

  head?: ItemInPlay<"head", RoomId, RoomItemId, RoomItemId, ScN>;
  heels?: ItemInPlay<"heels", RoomId, RoomItemId, RoomItemId, ScN>;
  headOverHeels?: ItemInPlay<
    "headOverHeels",
    RoomId,
    RoomItemId,
    RoomItemId,
    ScN
  >;
  // every room has a floor edge:
  floorEdge: ItemInPlay<"floorEdge", RoomId, RoomItemId, RoomItemId, ScN>;
};*/

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
export type UnknownRoomState = RoomState<string, string, SceneryName>;
