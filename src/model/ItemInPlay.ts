import type { FreeItem } from "../game/physics/itemPredicates";
import type { CreateSpriteOptions } from "../game/render/createSprite";
import type { SceneryName } from "../sprites/planets";
import type { Aabb, Xyz } from "../utils/vectors/vectors";
import type { ItemStateMap } from "./ItemStateMap";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";
import type { CharacterName } from "./modelTypes";

/** types of items in-game (as opposed to in the json) - there are a few extra types */
export type ItemInPlayType =
  | Exclude<JsonItemType, "player" | "door">
  | CharacterName
  | "doorFrame"
  | "stopAutowalk"
  | "portal"
  | "floor"
  | "floorEdge"
  // when another item is fading out, the bubbles are a separate item
  | "bubbles"
  | "firedDoughnut";

export type SwitchSetting = "left" | "right";

type ItemInPlayConfigMap<RoomId extends string> = {
  floor: {
    type: "deadly" | /** can fall through to room below */ "none" | "standable";
  };
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
  stopAutowalk: EmptyObject;
  // disappearing can be turned off (blacktooth 6 for doughnuts) so it is state, not config
  block: Omit<JsonItemConfig<"block", SceneryName, RoomId>, "disappearing">;
};

// type-fest's EmptyObject was creating issues
export type EmptyObject = {
  [n in never]: unknown;
};

export type ItemInPlayConfig<
  T extends ItemInPlayType,
  P extends SceneryName = SceneryName,
  RoomId extends string = string,
> =
  // config type explicitly given for this item type:
  T extends keyof ItemInPlayConfigMap<RoomId> ? ItemInPlayConfigMap<RoomId>[T]
  : // fall back to the config from the json types:
  T extends JsonItemType ? JsonItemConfig<T, P, RoomId>
  : EmptyObject;

export type Disappear = "onStand" | "onTouch" | "onTouchByPlayer" | null;

export type BaseItemState<RoomId extends string = string> = {
  position: Readonly<Xyz>;

  /**
   * The item will be removed from the room after this gameTime. To guarantee removal on the next frame (effectively immediately)
   * set to -1. Otherwise, can set to the duration of an animation that needs to play
   *
   * If null, the item is not scheduled for removal (the normal case)
   */
  expires: number | null;

  /** what is standing on this item? */
  stoodOnBy: Set<FreeItem<SceneryName, RoomId>>;

  disappear: Disappear;
};

export type ItemState<T extends ItemInPlayType, RoomId extends string> =
  T extends keyof ItemStateMap<RoomId> ?
    BaseItemState<RoomId> & ItemStateMap<RoomId>[T]
  : BaseItemState<RoomId>;

export type ShadowMaskOptions = {
  /** of not defined, the whole item being rendered on can show shadows */
  spriteOptions?: CreateSpriteOptions;
  /**
   * usually the shadow mask will be relative to the origin of the item,
   * but for variable-height items it is useful for it to be relative to the
   * top
   */
  relativeTo: "top" | "origin";
};

export type ItemInPlay<
  T extends ItemInPlayType,
  //S extends ItemState<T> = ItemState<T>,
  P extends SceneryName = SceneryName,
  RoomId extends string = string,
  Itemid extends string = string,
> = {
  type: T;

  // borrow the config from the json typings:
  config: ItemInPlayConfig<T, P, RoomId>;

  readonly id: Itemid;
  state: ItemState<T, RoomId>;

  /**
   * the bounding box of this item for the sake of collision detection. This is not optional - ie, there
   * are no non-collideable items
   */
  aabb: Aabb;
  /** an optional second bb which is used only for determining render order - not for collisions */
  readonly renderAabb?: Aabb;

  renders: boolean;

  /**
   * the area of this item that shadows can be cast on, or 'all' for no mask (ie, a floor)
   * or undefined for no shadows
   */
  readonly shadowMask?: ShadowMaskOptions;
  /* the shadow this item casts on other items */
  shadowCastTexture?: CreateSpriteOptions;

  /**
   * if defined, the z-index for this item will not be based on
   * topological sort of the items in the room
   */
  fixedZIndex?: number;
};

/** Non-union version of any item type */
export type AnyItemInPlay<
  RoomId extends string = string,
  ItemId extends string = string,
> = ItemInPlay<ItemInPlayType, SceneryName, RoomId, ItemId>;

/**
 * make a union of ItemInPlay<A> | ItemInPlay<B> | ItemInPlay<C> etc.
 * By turning item types into a union, we can use type guards to discriminate
 */
export type ItemTypeUnion<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string = string,
> = {
  [TI in T]: ItemInPlay<TI, SceneryName, RoomId, ItemId>;
}[T];

/**
 * All Item types as a union
 */
export type UnionOfAllItemInPlayTypes<
  RoomId extends string = string,
  ItemId extends string = string,
> = ItemTypeUnion<ItemInPlayType, RoomId, ItemId>;
