import type { EmptyObject } from "type-fest";
import type { PlanetName } from "../../sprites/planets";
import type { Direction4Xy, Xyz } from "../../utils/vectors/vectors";
import type { ItemConfigMap } from "./ItemConfigMap";

export type JsonItemType =
  | "door"
  | "bubbles" // only in-play, never in json, but is created dynamically
  | "floor" // only in-play, never in json - TODO: remove from json typings
  | "doorFrame" // only in-play, never in json - TODO: remove from json typings
  | "doorLegs" // only in-play, never in json - TODO: remove from json typings
  | "portal" // only in-play, never in json - TODO: remove from json typings
  | "teleporter"
  | "barrier"
  | "block"
  | "deadlyBlock"
  // something heels can pick up in her bag
  | "portableBlock"
  // something that can be pushed or moves on a switch
  | "movableBlock"
  | "moveableDeadly"
  | "conveyor"
  | "pickup"
  | "spring"
  | "sceneryPlayer"
  | "slidingDeadly"
  | "slidingBlock"
  | "player"
  | "baddie"
  | "lift"
  | "joystick"
  | "charles"
  | "switch"
  | "hushPuppy"
  | "ball"
  | "book"
  | "wall";

export type RenderItemType = JsonItemType | "door-front" | "door-back";

/**
 * test for if a door is embedded in an undrawn wall - ie, is on the right or towards
 * edge of the room and needs extra space for it
 */
export const doorIsInHiddenWall = ({
  config: { direction },
  position,
}: JsonItem<"door", PlanetName, string>) =>
  (direction === "right" && position.x === 0) ||
  (direction === "towards" && position.y === 0);

export type DoorFrameConfig<RoomId extends string> = {
  direction: Direction4Xy;
  inHiddenWall: boolean;
  toRoom: RoomId;

  /** is this the near post of the doorframe, or the far one? */
  part: "near" | "far" | "top";
};
export type DoorLegsConfig = {
  direction: Direction4Xy;
  inHiddenWall: boolean;
  // equal to the z of the door
  height: number;
};

export type DeadlyItemStyle = "volcano" | "toaster" | "spikes";

/** config used in both json and in-play items */
export type JsonItemConfig<
  T extends JsonItemType,
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string = string,
> =
  T extends keyof ItemConfigMap<P, RoomId, ItemId> ?
    ItemConfigMap<P, RoomId, ItemId>[T]
  : EmptyObject;

export type JsonItem<
  T extends JsonItemType,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
  ItemId extends string = string,
> = {
  type: T;
  config: JsonItemConfig<T, P, RoomId, ItemId>;
  position: Xyz;
};

export type UnknownJsonItem<
  RoomId extends string = string,
  ItemId extends string = string,
> = {
  [IT in JsonItemType]: JsonItem<IT, PlanetName, RoomId, ItemId>;
}[JsonItemType];
