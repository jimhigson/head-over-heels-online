import type { ZxSpectrumRoomColour } from "@/originalGame";
import type { PlanetName } from "@/sprites/planets";
import type { Xy } from "@/utils/vectors/vectors";
import type { UnknownJsonItem } from "./json/JsonItem";
import type { Floor, RoomWalls } from "./modelTypes";

/**
 * serialisation format of a room to be stored in while not in play
 */

export type RoomJson<
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string = string,
> = {
  id: RoomId;
  size: {
    /* width in game blocks. this is the integer unit of room size and different from the width in pixels */
    x: number;
    /* depth in game blocks. this is the integer unit of room size and different from the width in pixels */
    y: number;
  };
  planet: P;
  floor: Floor;
  floorSkip: Xy[];
  roomAbove?: RoomId;
  roomBelow?: RoomId;
  walls: RoomWalls<P>;
  // the color the room was shown in in the zx spectrum original game. This is used to provide highlight
  // colours in each room
  color: ZxSpectrumRoomColour;

  /**
   * by keying each item with an id, it makes the diffing easier since the array is no longer
   * position-dependent
   */
  items: Record<ItemId, UnknownJsonItem<RoomId, NoInfer<ItemId>>>;
};
export type AnyRoomJson = RoomJson<PlanetName, string, string>;

/*
 * utility function - pass raw json through this to get type checking and type inference.
 * for example, it should fail if a joystick or switch links to an item that isn't in the room
 */
export const inferRoomJson = <
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string,
>(
  json: RoomJson<P, RoomId, ItemId>,
): RoomJson<P, RoomId, ItemId> => {
  return json;
};
