import type { EmptyObject } from "type-fest";
import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { CreateSpriteOptions } from "../game/render/createSprite";
import type { SceneryName } from "../sprites/planets";
import type { Aabb, Xyz } from "../utils/vectors/vectors";
import type { ItemStateMap } from "./ItemStateMap";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";
import type { CharacterName } from "./modelTypes";
import type { StoodOnBy } from "./StoodOnBy";

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
  | "floatingText";

export type SwitchSetting = "left" | "right";

type ItemInPlayConfigMap<RoomId extends string, RoomItemId extends string> = {
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
  floatingText: {
    textLines: string[];
    appearanceRoomTime: number;
  };
  stopAutowalk: EmptyObject;
  // disappearing can be turned off (blacktooth 6 for doughnuts) so it is state, not config
  block: Omit<JsonItemConfig<"block", RoomId, RoomItemId>, "disappearing">;
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

export type Disappear = "onStand" | "onTouch" | "onTouchByPlayer" | null;

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

  disappear: Disappear;

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

  /* the shadow this item casts on other items */
  shadowCastTexture?: CreateSpriteOptions;

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
