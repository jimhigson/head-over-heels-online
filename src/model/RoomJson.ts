import { type ZxSpectrumRoomColour } from "../originalGame";
import { type SceneryName } from "../sprites/planets";
import { objectEntriesIter, valuesIter } from "../utils/entries";
import { type DirectionXy4, type Xy, type Xyz } from "../utils/vectors/vectors";
import { type JsonItemType, type JsonItemUnion } from "./json/JsonItem";

/**
 * when a sub-room is key'd by '*' it actually represents
 * the whole room - @see SubRoom for a 'real' sub-room
 */
/**
 * a non-contiguous relationship from one sub-room to another - the rooms are
 * shown on the same map even though they have no physical connection.
 * `gridOffset` is the other cell's map position relative to this one; the other
 * end should carry the opposite (* -1) offset
 */
export type NonContiguousRelationship<RoomId extends string> = {
  with: { room: RoomId; subRoom?: string };
  gridOffset: Xyz;
};

export type AllRoomSubRoom<RoomId extends string> = {
  above?: { room: RoomId; subRoom?: string };
  below?: { room: RoomId; subRoom?: string };
  nonContiguousRelationship?: NonContiguousRelationship<RoomId>;
};
export type SubRoom<RoomId extends string> = {
  above?: { room: RoomId; subRoom?: string };
  below?: { room: RoomId; subRoom?: string };
  nonContiguousRelationship?: NonContiguousRelationship<RoomId>;
  /**
   * the grid position (on the map) of this sub-room
   */
  gridPosition: Xy;
  /**
   * where the sub-room actually starts and ends once loaded (so we
   * can work out which sub-room items are in while the game is in-play)
   */
  physicalPosition: {
    from: Xy;
    to: Xy;
  };
};

export type SubRooms<RoomId extends string> =
  | { "*": AllRoomSubRoom<RoomId> }
  | Record<string, SubRoom<RoomId>>;

/**
 * a room's `subRooms` is either the whole-room form (a single `'*'` entry, used
 * for an undivided room that has a vertical link) or the divided form (real
 * sub-room cells, each with positions). The `string` index signature on the
 * divided form means a bare `"*" in subRooms` does not narrow the union, so use
 * this predicate to discriminate.
 */
export const isWholeRoomSubRooms = <RoomId extends string>(
  subRooms: SubRooms<RoomId>,
): subRooms is { "*": AllRoomSubRoom<RoomId> } => "*" in subRooms;

/**
 * look up a real (positioned) sub-room cell by its id - returns undefined for
 * the whole-room (`'*'`) form, the `'*'` key, or a plain/missing room
 */
export const subRoomById = <RoomId extends string>(
  room: { meta?: { subRooms?: SubRooms<RoomId> } },
  subRoomId: string,
): SubRoom<RoomId> | undefined => {
  const subRooms = room.meta?.subRooms;
  if (
    subRooms === undefined ||
    isWholeRoomSubRooms(subRooms) ||
    subRoomId === "*"
  ) {
    return undefined;
  }
  return subRooms[subRoomId];
};

/**
 * the sub-room entries of a room that can hold vertical (above/below) links -
 * the single whole-room (`'*'`) entry for an undivided room, or every real cell
 * of a divided room. Returned objects are live references, so callers can mutate
 * the links on them.
 */
export const roomVerticalLinkHolders = <RoomId extends string>(room: {
  meta?: { subRooms?: SubRooms<RoomId> };
}): Array<AllRoomSubRoom<RoomId> | SubRoom<RoomId>> => {
  const subRooms = room.meta?.subRooms;
  if (subRooms === undefined) {
    return [];
  }
  return isWholeRoomSubRooms(subRooms) ?
      [subRooms["*"]]
    : Object.values(subRooms);
};

/**
 * the vertical (above/below) link of one sub-room of a room, if any. When
 * `subRoomId` is omitted the link of the room's primary cell is read - the
 * whole-room (`'*'`) entry for an undivided room, or its first cell.
 */
export const roomVerticalLink = <RoomId extends string>(
  room: { meta?: { subRooms?: SubRooms<RoomId> } },
  direction: "above" | "below",
  subRoomId?: string,
): { room: RoomId; subRoom?: string } | undefined => {
  const subRooms = room.meta?.subRooms;
  if (subRooms === undefined) {
    return undefined;
  }
  const holder =
    isWholeRoomSubRooms(subRooms) ? subRooms["*"]
    : subRoomId === undefined ? Object.values(subRooms)[0]
    : subRooms[subRoomId];
  return holder?.[direction];
};

/**
 * the non-contiguous relationship held by one sub-room of a room, if any. When
 * `subRoomId` is omitted the relationship of the room's primary cell is read -
 * the whole-room (`'*'`) entry for an undivided room, or its first cell.
 */
export const roomNonContiguousRelationship = <RoomId extends string>(
  room: { meta?: { subRooms?: SubRooms<RoomId> } },
  subRoomId?: string,
): NonContiguousRelationship<RoomId> | undefined => {
  const subRooms = room.meta?.subRooms;
  if (subRooms === undefined) {
    return undefined;
  }
  const holder =
    isWholeRoomSubRooms(subRooms) ? subRooms["*"]
    : subRoomId === undefined ? Object.values(subRooms)[0]
    : subRooms[subRoomId];
  return holder?.nonContiguousRelationship;
};

/**
 * write (or, when `relationship` is undefined, remove) a sub-room's
 * non-contiguous relationship. Mirrors `writeVerticalLink`: the undivided
 * room's whole-room (`'*'`) holder is created on demand. When `subRoomId` is
 * omitted the room's primary cell is used.
 */
export const writeRoomNonContiguousRelationship = <RoomId extends string>(
  room: { meta?: { subRooms?: SubRooms<RoomId> } },
  relationship: NonContiguousRelationship<RoomId> | undefined,
  subRoomId?: string,
): void => {
  room.meta ??= {};
  room.meta.subRooms ??= { "*": {} };
  const { subRooms } = room.meta;
  const holder =
    isWholeRoomSubRooms(subRooms) ? subRooms["*"]
    : subRoomId === undefined ? Object.values(subRooms)[0]
    : subRooms[subRoomId];
  if (holder === undefined) {
    return;
  }
  if (relationship === undefined) {
    delete holder.nonContiguousRelationship;
  } else {
    holder.nonContiguousRelationship = relationship;
  }
};

/**
 * some rooms get special extra rendering on the map
 */
export type RoomDecoration = "arrowLeft" | "crossover" | "divideAlongY";

export type RoomJsonItems<
  RoomItemId extends string,
  RoomId extends string,
> = Record<RoomItemId, JsonItemUnion<RoomId, NoInfer<RoomItemId>>>;

/**
 * serialisation format of a room to be stored in while not in play
 */

export type RoomJson<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = {
  $schema?: string;
  id: RoomId;
  /**
   * custom room height that can be set per-room in blocks.
   * If not set, the default room height is used. Only a few of the original game rooms need this
   * to make the transition to the next room above work better. Can be used to fine-tune the
   * point in a jump where the room above loads.
   */
  height?: number;
  /** TODO: rename to scenery */
  planet: ScN;
  /**
   * the color the room was shown in in the zx spectrum original game. This is used to provide highlight
   * colours in each room
   */
  color: ZxSpectrumRoomColour;
  /**
   * by keying each item with an id, it makes the diffing easier since the array is no longer
   * position-dependent
   */
  items: RoomJsonItems<RoomItemId, RoomId>;

  meta?: {
    /**
     * subRooms are used for the map for rooms which were modelled as multiple rooms
     * in the original game, or for the whole room in some cases to preserve same-shame between
     * big and small rooms
     */
    subRooms?: SubRooms<RoomId>;

    label?: {
      direction: DirectionXy4;
      text: string;
    };

    /**
     * a decorative set piece to draw into this room on the map
     */
    roomDecoration?: RoomDecoration;
  };
};
export type AnyRoomJson = RoomJson<string, string, SceneryName>;

/*
 * utility function - pass raw json through this to get type checking and type inference.
 * for example, it should fail if a joystick or switch links to an item that isn't in the room
 */
export const inferRoomJson = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName,
>(
  json: RoomJson<RoomId, RoomItemId, ScN>,
): RoomJson<RoomId, RoomItemId, ScN> => {
  return json;
};

/** Iterate over items in a room, optionally filtering to specific item types */
export const roomJsonItemsIterable = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
  Types extends JsonItemType = JsonItemType,
>(
  roomJson: Pick<RoomJson<RoomId, RoomItemId, ScN>, "items">,
  ...types: Types[]
) => {
  const allItems = valuesIter(roomJson.items) as IterableIterator<
    JsonItemUnion<RoomId, RoomItemId>
  >;

  if (types.length === 0) {
    return allItems as IterableIterator<
      JsonItemUnion<RoomId, RoomItemId, Types>
    >;
  }

  return allItems.filter((item) =>
    types.includes(item.type as Types),
  ) as IterableIterator<JsonItemUnion<RoomId, RoomItemId, Types>>;
};

/** Re-export of objectEntriesIter under a more convenient type specialised for room JSON items */
export const roomJsonItemsEntriesIterable = objectEntriesIter as <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJsonItems: RoomJsonItems<RoomItemId, RoomId>,
) => IterableIterator<[RoomItemId, JsonItemUnion<RoomId, RoomItemId>]>;

export const iterateRoomJsonItemsWithIds = <
  RoomId extends string,
  RoomItemId extends string,
  Types extends JsonItemType = JsonItemType,
>(
  roomJsonItems: RoomJsonItems<RoomItemId, RoomId>,
  /**
   * if given, will filter to just these types, since needing to consider just some types
   * is a common use case
   */
  ...types: Types[]
): IterableIterator<[RoomItemId, JsonItemUnion<RoomId, RoomItemId, Types>]> => {
  const allItemsItr = roomJsonItemsEntriesIterable(roomJsonItems);

  if (types.length === 0) {
    return allItemsItr as IterableIterator<
      [RoomItemId, JsonItemUnion<RoomId, RoomItemId, Types>]
    >;
  }

  return allItemsItr.filter(([, item]) =>
    types.includes(item.type as Types),
  ) as IterableIterator<[RoomItemId, JsonItemUnion<RoomId, RoomItemId, Types>]>;
};
