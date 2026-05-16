import type { EmptyObject } from "type-fest";

import type { SceneryName } from "../../sprites/planets";
import type { Xyz } from "../../utils/vectors/vectors";
import type { ItemConfigMap } from "./ItemConfigMap";

export const jsonItemTypes = [
  "ball",
  "barrier",
  "block",
  "bubbles",
  "button",
  "charles",
  "conveyor",
  "deadlyBlock",
  "door",
  "emitter",
  "firedDoughnut",
  "floatingText",
  "floor",
  "hushPuppy",
  "joystick",
  "lift",
  "monster",
  "moveableDeadly",
  "movingPlatform",
  "pickup",
  "player",
  "portableBlock",
  "portableTeleporter",
  "pushableBlock",
  /** the crowns in the final room - these are for decoration and can't be picked up */
  "sceneryCrown",
  "sceneryPlayer",
  "slidingBlock",
  "slidingDeadly",
  "spikes",
  "spring",
  "switch",
  "teleporter",
  "wall",
  // periodically toggles switch-style modifications on other items
  "timer",
] as const;

export type JsonItemType = (typeof jsonItemTypes)[number];

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
