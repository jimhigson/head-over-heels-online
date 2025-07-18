import type { EmptyObject } from "type-fest";
import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { CreateSpriteOptions } from "../game/render/createSprite";
import type { SceneryName } from "../sprites/planets";
import type { Aabb, DirectionXy4, Xyz } from "../utils/vectors/vectors";
import type { ItemStateMap } from "./ItemStateMap";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";
import type { CharacterName, IndividualCharacterName } from "./modelTypes";
import type { StoodOnBy } from "./StoodOnBy";
import type { Disappear } from "./Disappear";

/** types of items in-game (as opposed to in the json) - there are a few extra types */
export type ItemInPlayType =
  | Exclude<JsonItemType, "player" | "door">
  | CharacterName

  // in-play, doors resolve to these four types instead of the single json "door" type:
  | "doorFrame"
  | "doorLegs"
  | "stopAutowalk"
  | "portal"

  /** a non-rendering, invisible, general-purpose, collideable blocker */
  | "blocker"
  /**
   * when another item is fading out, the bubbles are a separate item
   */
  | "bubbles"
  /**
   * jumping or running fast, with a power-up, crown shine effect
   */
  | "particle"
  /** when collecting pickups */
  | "floatingText";

export type SwitchSetting = "left" | "right";

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

type ItemInPlayConfigMap<RoomId extends string, RoomItemId extends string> = {
  portal: {
    toRoom: RoomId;
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
  floatingText: {
    textLines: string[];
    appearanceRoomTime: number;
  };
  particle: {
    forCharacter: IndividualCharacterName | "crown";
  };
  stopAutowalk: EmptyObject;
  // disappearing can be turned off (#blacktooth6 aka room with first doughnuts) so it is state, not config
  block: Omit<JsonItemConfig<"block", RoomId, RoomItemId>, "disappearing">;
  floor: JsonItemConfig<"floor", RoomId, RoomItemId> & {
    /** the floor's footprint (in world coords), before it was extended for the doors */
    naturalFootprint: {
      aabb: Xyz;
      position: Xyz;
    };
  };
  doorFrame: DoorFrameConfig<RoomId>;
  doorLegs: DoorLegsConfig;
};

export type ItemInPlayConfig<
  T extends ItemInPlayType,
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> =
  // config type explicitly given for this item type:
  T extends keyof ItemInPlayConfigMap<RoomId, RoomItemId> ?
    ItemInPlayConfigMap<RoomId, RoomItemId>[T]
  : // fall back to the config from the json types:
  T extends JsonItemType ? JsonItemConfig<T, RoomId, RoomItemId, ScN>
  : EmptyObject;

export type BaseItemState<RoomItemId extends string = string> = {
  position: Readonly<Xyz>;

  /**
   * The item will be removed from the room after the room it is in has more than this roomTime.
   * To guarantee removal on the next frame (effectively immediately)
   * set to -1. Otherwise, can set to the current roomTime + duration of an animation
   * that needs to play
   *
   * If null, the item is not scheduled for removal (the normal case)
   */
  expires: number | null;

  /**
   * ids of items stood on by this item
   * - these are ids, not object references to maintain serialisability
   */
  stoodOnBy: StoodOnBy<RoomItemId>;

  /**
   * if given, the item disappears after the specified interaction.
   * This must be null (not undefined) so switches can tell the difference
   * between having no setting, and having a setting to change to null
   * when they make something not disappearing
   */
  disappearing: Disappear | null;

  /**
   * the time when this item was last changed by a switch in the room -
   * this exists so we can flash the item on being switched
   */
  switchedAtRoomTime: number;
  /**
   * if has ever been changed by a switch, the setting the switch last
   * moved into to change this item
   */
  switchedSetting?: SwitchSetting;

  /**
   * when this item last stopped being stood on. This is used to render items
   * (the spring) that renders differently when it has been stepped off
   *
   * TODO: could this only be for springs, since that is all that uses it?
   */
  stoodOnUntilRoomTime: number;
};

export type ItemState<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> =
  T extends keyof ItemStateMap<RoomId, RoomItemId> ?
    BaseItemState<RoomItemId> & ItemStateMap<RoomId, RoomItemId>[T]
  : BaseItemState<RoomItemId>;

export type ItemInPlay<
  T extends ItemInPlayType,
  RoomId extends string = string,
  /** the items ids for items in the same room as this item */
  RoomItemId extends string = string,
  /** the item id> for this item */
  ItemId extends RoomItemId = RoomItemId,
  ScN extends SceneryName = SceneryName,
> = {
  type: T;

  /**
   * if we are coming from room json in a campaign, the id of the room json item
   * that this item was created based off. Multiple items can exist in-play for
   * a single json item, and an in-play item doesn't have to come from a json item
   *
   * TODO: this type isn't quite correct since the json and in-play item ids are
   * confused
   */
  jsonItemId?: RoomItemId;

  // borrow the config from the json typings:
  config: ItemInPlayConfig<T, RoomId, RoomItemId, ScN>;

  readonly id: ItemId;
  state: ItemState<T, RoomId, RoomItemId>;

  /**
   * the bounding box of this item for the sake of collision detection. This is not optional - ie, there
   * are no non-collideable items
   */
  aabb: Aabb;
  /** an optional second bb which is used only for determining render order - not for collisions */
  readonly renderAabb?: Aabb;
  /**
   * the offset of the render aabb from the item position. like renderAabb, has no role in collisions,
   * only determining the render order
   */
  readonly renderAabbOffset?: Aabb;

  /** the shadow this item casts on other items */
  shadowCastTexture?: CreateSpriteOptions;

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
};

/**
 * All Item types as a union
 */
export type UnionOfAllItemInPlayTypes<
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> = ItemTypeUnion<ItemInPlayType, RoomId, RoomItemId, ScN>;
