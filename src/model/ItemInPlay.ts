import { type EmptyObject } from "type-fest";

import { type ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import { type ShadowCastSpriteOptions } from "../game/render/ShadowCastSpriteOptions";
import { type BracketedSegmentOptions } from "../sound/soundUtils/createBracketedSound";
import { type SceneryName } from "../sprites/planets";
import { type Xy, type Xyz } from "../utils/vectors/vectors";
import { type ItemState } from "./ItemState";
import { type ExitGameRoomId } from "./json/ItemConfigMap";
import {
  type JsonItemConfig,
  type JsonItemType,
  jsonItemTypes,
} from "./json/JsonItem";
import { characterNames, type IndividualCharacterName } from "./modelTypes";

/** types of items in-game (as opposed to in the json) - there are a few extra types */
export const itemInPlayTypes = [
  ...characterNames,
  ...jsonItemTypes.filter(
    (jsonItemType): jsonItemType is Exclude<JsonItemType, "door" | "player"> =>
      jsonItemType !== "door" && jsonItemType !== "player",
  ),
  // in-play, doors resolve to these four types instead of the single json "door" type:
  "doorFrame",
  "doorLegs",
  "portal",
  "stopAutowalk",
  /** a non-rendering, invisible, general-purpose, collideable blocker */
  "blocker",
  /**
   * a beam of light emitted from a lamp - exists only in-play, never in the
   * json. Beams are (re)cast by their lamp every tick: emitted from the lamp,
   * reflected by mirrors, and stopped by solid items
   */
  "lightBeam",
  /** jumping or running fast, with a power-up, crown shine effect */
  "particle",
  /** a sound that plays from a point in a room */
  "soundEffect",
  /**
   * an item that if touched, the toucher is deleted out of the universe - eg, it has been detected
   * now as out of bounds. Maybe because of falling below a room with no floor - if the player touches
   * this it is probably a bug. If anything else does, it is unreachable already so it can be removed
   */
  "outOfBounds",
] as const;

export type ItemInPlayType = (typeof itemInPlayTypes)[number];

export type SwitchSetting = "left" | "right";

type DoorFrameConfig<RoomId extends string> = {
  /** the door's world direction as a cardinal unit vector */
  direction: Xyz;
  /**
   * whether the door sits on a floor edge (a world-space fact). The door is in
   * a hidden wall when this is true AND its wall faces the camera at the
   * current angle - evaluated at render time via
   * {@link isDoorPartInHiddenWall}
   */
  onFloorEdge: boolean;
  toRoom: ExitGameRoomId | RoomId;

  /** is this the near post of the doorframe, or the far one? */
  part: "far" | "near" | "top";
};
type DoorLegsConfig = {
  /** the door's world direction as a cardinal unit vector */
  direction: Xyz;
  /** see {@link DoorFrameConfig.onFloorEdge} */
  onFloorEdge: boolean;
  // equal to the z of the door
  height: number;
};

/**
 * on-disk (json) configs describe directions with friendly names ("away",
 * "towardsRight"); in-play the engine holds them as unit vectors so that all
 * direction handling is arithmetic. This maps a json config (union) member's
 * `startDirection` name to its vector form, distributing over config unions
 * (members without a startDirection pass through unchanged)
 */
type VectorisedStartDirection<C> =
  C extends { startDirection: string } ?
    Omit<C, "startDirection"> & {
      /** the starting facing as a unit vector */
      startDirection: Xyz;
    }
  : C;

type ItemInPlayConfigMap<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName,
> = {
  portal: {
    toRoom: ExitGameRoomId | RoomId;
    /**
     * if the portal is created for a door, and the door has the optional property
     * giving the corresponding door in the destination room, this is that door's id
     */
    toDoor?: string;
    /**
     * when moving through portals, the position of the character relative to this point is
     * taken, and preserved to be relative to the relativePoint of the portal in the new room
     */
    relativePoint: Xyz;
    /**
     * the direction this portal has to be hit (with a dot product in) to be walked through
     */
    direction: Xyz;
  };
  lightBeam: {
    /** the direction this (straight segment of a) beam travels in */
    direction: Xyz;
    /** the id of the lamp item this beam was emitted from */
    sourceItemId: RoomItemId;
  };
  particle: {
    forCharacter: "crown" | IndividualCharacterName;
  };
  stopAutowalk: EmptyObject;
  // change lamp config's direction from a string to a vector while in-play
  lamp: Omit<JsonItemConfig<"lamp", RoomId, RoomItemId>, "direction"> & {
    direction: Xyz;
  };
  wall: Omit<JsonItemConfig<"wall", RoomId, RoomItemId, ScN>, "direction"> & {
    /** the wall's outward-facing world direction as a cardinal unit vector */
    direction: Xyz;
  };
  /**
   * the json conveyor config is a union discriminated on the direction name
   * (constraining `times` to the belt's axis); in-play it flattens to a
   * direction vector, with the times constraint already enforced at the json
   * boundary
   */
  conveyor: Omit<
    JsonItemConfig<"conveyor", RoomId, RoomItemId>,
    "direction" | "times"
  > & {
    /** the direction the belt carries items, as a cardinal unit vector */
    direction: Xyz;
    times?: Partial<Xy>;
  };
  sceneryPlayer: VectorisedStartDirection<
    JsonItemConfig<"sceneryPlayer", RoomId, RoomItemId>
  >;
  monster: VectorisedStartDirection<
    JsonItemConfig<"monster", RoomId, RoomItemId>
  >;
  movingPlatform: VectorisedStartDirection<
    JsonItemConfig<"movingPlatform", RoomId, RoomItemId>
  >;
  firedDoughnut: {
    /** the direction of travel as a unit vector, if fired with one */
    direction?: Xyz;
  };
  // disappearing can be turned off (#blacktooth6 aka room with first doughnuts) so it is state, not config
  block: Omit<JsonItemConfig<"block", RoomId, RoomItemId>, "disappearing">;
  floor: JsonItemConfig<"floor", RoomId, RoomItemId> & {
    /** the floor's footprint (in world coords), before it was extended for the doors */
    naturalFootprint: {
      aabb: Xyz;
      position: Xyz;
    };
    /**
     * the sides where the physical footprint was expanded (by a constant
     * amount) to carry the player through a doorway, as outward cardinal unit
     * vectors. How much of the expansion is *drawn* on each side depends on
     * the camera angle, derived at render time
     */
    doorExpandedSides: Array<Xyz>;
  };
  doorFrame: DoorFrameConfig<RoomId>;
  doorLegs: DoorLegsConfig;
  soundEffect: {
    soundOptions: BracketedSegmentOptions;
  };
};

export type ItemInPlayConfig<
  T extends ItemInPlayType,
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> =
  // config type explicitly given for this item type:
  T extends keyof ItemInPlayConfigMap<RoomId, RoomItemId, ScN> ?
    ItemInPlayConfigMap<RoomId, RoomItemId, ScN>[T]
  : // fall back to the config from the json types:
  T extends JsonItemType ? JsonItemConfig<T, RoomId, RoomItemId, ScN>
  : EmptyObject;

export type ItemInPlay<
  T extends ItemInPlayType,
  RoomId extends string = string,
  /** the items ids for items in the same room as this item */
  RoomItemId extends string = string,
  /** the item id for this item */
  ItemId extends RoomItemId = RoomItemId,
  ScN extends SceneryName = SceneryName,
> = {
  type: T;

  /**
   * if we are coming from room json in a campaign, the id of the room json item
   * that this item was created based off. Multiple items can exist in-play for
   * a single json item, and an in-play item doesn't have to come from a json item
   *
   * This type isn't quite correct since the json and in-play item ids are
   * conflated - they're not really drawn from the same string subset
   */
  jsonItemId?: RoomItemId;

  // borrow the config from the json typings:
  config: ItemInPlayConfig<T, RoomId, RoomItemId, ScN>;

  readonly id: ItemId;
  state: ItemState<T, RoomId, RoomItemId>;

  /**
   * a stable pseudo-random number in `[0, 1)`, designed to be reasonably unique
   * between items but not truly random. Used to de-synchronise animations
   * (start frame, bob phase) so identical items in a room don't move in
   * lock-step. Must be stable between room loads and must not be derived from
   * the item id (which can be rewritten); items set it inline at creation,
   * usually via {@link hashXyzToNumber0to1} of their position.
   */
  hash: number;

  /** the shadow this item casts on other items */
  shadowCastTexture?: ShadowCastSpriteOptions;

  /** items this item will cast no shadows on */
  noShadowCastOn?: Array<ItemInPlayType>;

  /**
   * marks a hint shadow (eg the decorative corner cube): the shadow only
   * casts when every listed direction's (given as outward cardinal unit
   * vectors) wall is hidden (faces the camera) at the current angle
   */
  hintShadowDirections?: Array<Xyz>;

  /**
   * if true casts shadow while stood on. Most items can cast casting a shadow in this case, since
   * they will completely cover up and hide their own shadow
   */
  castsShadowWhileStoodOn: boolean;

  /**
   * if true, an item whose footprint is entirely within this one's is darkened wholesale
   * (a tint over its whole appearance) rather than receiving a shaped cast shadow.
   * Cheaper than the mask + shadow-sprite path. Colourised mode only.
   */
  castsWholeShadows?: boolean;

  /**
   * Where this item's shadow mask is considered to be relative to its origin.
   *
   * For shadow masks (this item being cast on), the full xyz is considered to move the shadow mask
   *
   * For this item as the caster, the xy part is used but not the z, since the item's z doesn't matter
   * for where the shadow is cast on another item
   *
   * Eg, door legs can be any height, and need to move their shadow
   * masks to their top-side, so they should have a z-value
   */
  shadowOffset?: Partial<Xyz>;

  /**
   * if defined, the z-index for this item will not be based on
   * topological sort of the items in the room
   */
  fixedZIndex?: number;

  /** if true, this item (exceptionally) does not play at any panned location */
  noSoundPan?: boolean;
};

/**
 * All Item types as a union
 */
export type UnionOfAllItemInPlayTypes<
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> = ItemTypeUnion<ItemInPlayType, RoomId, RoomItemId, ScN>;
