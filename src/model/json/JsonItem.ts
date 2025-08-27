import type { EmptyObject } from "type-fest";

import type { SceneryName } from "../../sprites/planets";
import type { Xyz } from "../../utils/vectors/vectors";
import type { ItemConfigMap } from "./ItemConfigMap";

export type JsonItemType =
  | "ball"
  | "barrier"
  | "block"
  | "bubbles" // only in-play, never in json, but is created dynamically via loadItemFromJson
  | "charles"
  | "conveyor"
  | "deadlyBlock"
  | "door"
  | "hushPuppy"
  | "joystick"
  | "lift"
  | "monster"
  | "moveableDeadly"
  | "pickup"
  | "player"
  | "sceneryPlayer"
  | "slidingBlock"
  | "slidingDeadly"
  | "spring"
  | "switch"
  | "teleporter"
  /** something that moves by itself, possibly activated by a switch */
  | "movingPlatform"
  /** vary from the original game by distinbuishing toasters/volcanos from
   * spikes - spikes are safe to touch from the side/bottom but not stand on
   */
  | "spikes"
  /** something heels can pick up in her bag */
  | "portableBlock"
  /** something that can be pushed but not picked up */
  | "pushableBlock"
  // a special item for creating other items - eg, the gun salute in the final room
  | "emitter"
  // only needed as a json type so the emitter in the final room can fire them:
  | "firedDoughnut"
  // new one for the remake - like a switch except you have to stay standing on it
  | "button"
  // the crowns in the final room - these are for decoration and can't be picked up:
  | "sceneryCrown"
  /**
   * in the remake, all walls are first-class items - there's no special way to
   * give the walls around the room, they are just normal items
   */
  | "wall"
  /**
   * in the remake, floors first-class items - there's no special property for the floor
   * on the room, they are just normal items
   */
  | "floor";

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
};

export type JsonItemUnion<
  RoomId extends string = string,
  RoomItemId extends string = string,
  OfTypes extends JsonItemType = JsonItemType,
> = {
  [IT in OfTypes]: JsonItem<IT, RoomId, RoomItemId, SceneryName>;
}[OfTypes];
