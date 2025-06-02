import { ItemInPlay, ItemInPlayType } from "../../model/ItemInPlay";
import { SceneryName } from "../../sprites/planets";

/** this union is only here to check that it is equal to the 'live' one in the codebase */
type GeneratedTypeUnion =
  | "ball"
  | "barrier"
  | "block"
  | "bubbles"
  | "charles"
  | "conveyor"
  | "cursor"
  | "deadlyBlock"
  | "doorFrame"
  | "doorLegs"
  | "emitter"
  | "firedDoughnut"
  | "floatingText"
  | "floor"
  | "floorEdge"
  | "head"
  | "headOverHeels"
  | "heels"
  | "hushPuppy"
  | "joystick"
  | "lift"
  | "monster"
  | "moveableDeadly"
  | "movingPlatform"
  | "particle"
  | "pickup"
  | "portableBlock"
  | "portal"
  | "pushableBlock"
  | "sceneryCrown"
  | "sceneryPlayer"
  | "slidingBlock"
  | "slidingDeadly"
  | "spikes"
  | "spring"
  | "stopAutowalk"
  | "switch"
  | "teleporter"
  | "wall";
type Check1<T extends GeneratedTypeUnion> = { anything: T };
type Check2<T extends ItemInPlayType> = { anything: T };
type Test1 = Check1<ItemInPlayType>;
type Test2 = Check2<GeneratedTypeUnion>;

export type ItemTypeUnion<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> =
  | (T extends "ball" ? ItemInPlay<"ball", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "barrier" ?
      ItemInPlay<"barrier", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "block" ?
      ItemInPlay<"block", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "bubbles" ?
      ItemInPlay<"bubbles", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "charles" ?
      ItemInPlay<"charles", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "conveyor" ?
      ItemInPlay<"conveyor", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "cursor" ?
      ItemInPlay<"cursor", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "deadlyBlock" ?
      ItemInPlay<"deadlyBlock", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "doorFrame" ?
      ItemInPlay<"doorFrame", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "doorLegs" ?
      ItemInPlay<"doorLegs", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "emitter" ?
      ItemInPlay<"emitter", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "firedDoughnut" ?
      ItemInPlay<"firedDoughnut", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "floatingText" ?
      ItemInPlay<"floatingText", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "floor" ?
      ItemInPlay<"floor", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "floorEdge" ?
      ItemInPlay<"floorEdge", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "head" ? ItemInPlay<"head", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "headOverHeels" ?
      ItemInPlay<"headOverHeels", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "heels" ?
      ItemInPlay<"heels", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "hushPuppy" ?
      ItemInPlay<"hushPuppy", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "joystick" ?
      ItemInPlay<"joystick", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "lift" ? ItemInPlay<"lift", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "monster" ?
      ItemInPlay<"monster", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "moveableDeadly" ?
      ItemInPlay<"moveableDeadly", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "movingPlatform" ?
      ItemInPlay<"movingPlatform", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "particle" ?
      ItemInPlay<"particle", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "pickup" ?
      ItemInPlay<"pickup", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "portableBlock" ?
      ItemInPlay<"portableBlock", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "portal" ?
      ItemInPlay<"portal", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "pushableBlock" ?
      ItemInPlay<"pushableBlock", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "sceneryCrown" ?
      ItemInPlay<"sceneryCrown", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "sceneryPlayer" ?
      ItemInPlay<"sceneryPlayer", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "slidingBlock" ?
      ItemInPlay<"slidingBlock", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "slidingDeadly" ?
      ItemInPlay<"slidingDeadly", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "spikes" ?
      ItemInPlay<"spikes", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "spring" ?
      ItemInPlay<"spring", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "stopAutowalk" ?
      ItemInPlay<"stopAutowalk", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "switch" ?
      ItemInPlay<"switch", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "teleporter" ?
      ItemInPlay<"teleporter", RoomId, RoomItemId, RoomItemId, ScN>
    : never)
  | (T extends "wall" ? ItemInPlay<"wall", RoomId, RoomItemId, RoomItemId, ScN>
    : never);
