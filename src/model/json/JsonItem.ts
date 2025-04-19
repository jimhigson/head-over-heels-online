import type { EmptyObject } from "type-fest";
import type { SceneryName } from "../../sprites/planets";
import type { DirectionXy4, Xyz } from "../../utils/vectors/vectors";
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
  /** vary from the original game by distinbuishing toasters/volcanos from
   * spikes - spikes are safe to touch from the side/bottom but not stand on
   */
  | "spikes"
  /** something heels can pick up in her bag */
  | "portableBlock"
  /** something that can be pushed but not picked up */
  | "pushableBlock"
  /** something that moves by itself, possibly activated by a switch */
  | "movingPlatform"
  | "moveableDeadly"
  | "conveyor"
  | "pickup"
  | "spring"
  | "sceneryPlayer"
  // the crowns in the final room - these are for decoration and can't be picked up:
  | "sceneryCrown"
  // a special item for creating other items - eg, the gun salute in the final room
  | "emitter"
  // only needed as a json type so the emitter in the final room can fire them:
  | "firedDoughnut"
  | "slidingDeadly"
  | "slidingBlock"
  | "player"
  | "monster"
  | "lift"
  | "joystick"
  | "charles"
  | "switch"
  | "hushPuppy"
  | "ball"
  | "wall";

/**
 * test for if a door is embedded in an undrawn wall - ie, is on the right or towards
 * edge of the room and needs extra space for it
 */
export const inHiddenWall = ({
  config: { direction },
  position,
}: JsonItem<"door" | "wall", string, string>) =>
  (direction === "right" && position.x === 0) ||
  (direction === "towards" && position.y === 0);

export type DoorFrameConfig<RoomId extends string> = {
  direction: DirectionXy4;
  inHiddenWall: boolean;
  toRoom: RoomId;

  /** is this the near post of the doorframe, or the far one? */
  part: "near" | "far" | "top";
};
export type DoorLegsConfig = {
  direction: DirectionXy4;
  inHiddenWall: boolean;
  // equal to the z of the door
  height: number;
};

/** config used in both json and in-play items */
export type JsonItemConfig<
  T extends JsonItemType,
  RoomId extends string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> =
  T extends keyof ItemConfigMap<RoomId, RoomItemId, ScN> ?
    ItemConfigMap<RoomId, RoomItemId, ScN>[T]
  : EmptyObject;

export type JsonItem<
  T extends JsonItemType,
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> = {
  type: T;
  config: JsonItemConfig<T, RoomId, RoomItemId, ScN>;
  position: Xyz;
  /** if true, on an original campaign room, the item is an item that has been added for the remake */
  isExtra?: true;
};

export type JsonItemUnion<
  RoomId extends string = string,
  RoomItemId extends string = string,
> = {
  [IT in JsonItemType]: JsonItem<IT, RoomId, RoomItemId, SceneryName>;
}[JsonItemType];
