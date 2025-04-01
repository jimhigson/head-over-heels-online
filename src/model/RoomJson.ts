import { objectValues } from "iter-tools";
import type { ZxSpectrumRoomColour } from "../originalGame";
import type { SceneryName } from "../sprites/planets";
import type { Xy } from "../utils/vectors/vectors";
import type { JsonItemUnion } from "./json/JsonItem";
import type { Floor } from "./modelTypes";
import { iterate } from "../utils/iterate";

export type SubRooms = Record<
  string,
  {
    /**
     * the grid position (on the map) of this sub-room
     */
    gridPosition: Xy;
    /**
     * where the sub-room actually starts and ends on the map (so we
     * can work out which sub-room items are in)
     */
    physicalPosition: {
      from: Xy;
      to: Xy;
    };
  }
>;

/**
 * serialisation format of a room to be stored in while not in play
 */

export type RoomJson<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = {
  id: RoomId;
  size: {
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    x: number;
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    y: number;

    // custom room height in blocks. If not set, the default room height is used. only a few rooms need this.
    z?: number;
  };
  /** TODO: rename to scenery */
  planet: ScN;
  floor: Floor;
  roomAbove?: RoomId;
  /**
   * usually, the ceiling portal's relative point is the centre of the room. However, in cases
   * where multi-rooms are stitched together into a single room, this relationship is broken.
   * Ie, bookworld28/ bookworld29. In this case, this point is used instead
   */
  ceilingRelativePoint?: Xy;
  roomBelow?: RoomId;
  // the color the room was shown in in the zx spectrum original game. This is used to provide highlight
  // colours in each room
  color: ZxSpectrumRoomColour;

  /**
   * by keying each item with an id, it makes the diffing easier since the array is no longer
   * position-dependent
   */
  items: Record<RoomItemId, JsonItemUnion<RoomId, NoInfer<RoomItemId>>>;

  meta?: {
    /**
     * subRooms are used for the map for rooms which were modelled as multiple rooms
     * in the original game
     */
    subRooms?: SubRooms;
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

export const roomJsonItemsIterable = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomJson: RoomJson<RoomId, RoomItemId, ScN>,
) => {
  return objectValues(roomJson.items) as IterableIterator<
    JsonItemUnion<RoomId, RoomItemId>
  >;
};

export const iterateRoomJsonItems = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
>(
  roomJson: RoomJson<RoomId, RoomItemId, ScN>,
) => {
  return iterate(roomJsonItemsIterable(roomJson));
};
