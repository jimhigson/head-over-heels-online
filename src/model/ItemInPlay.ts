import type { EmptyObject } from "type-fest";

import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { CreateSpriteOptions } from "../game/render/createSprite";
import type { SceneryName } from "../sprites/planets";
import type { Aabb, DirectionXy4, Xyz } from "../utils/vectors/vectors";
import type { ItemState } from "./ItemState";
import type { ExitGameRoomId } from "./json/ItemConfigMap";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";
import type { CharacterName, IndividualCharacterName } from "./modelTypes";

/** types of items in-game (as opposed to in the json) - there are a few extra types */
export type ItemInPlayType =
  | CharacterName
  | Exclude<JsonItemType, "door" | "player">

  // in-play, doors resolve to these four types instead of the single json "door" type:
  | "doorFrame"
  | "doorLegs"
  | "portal"
  | "stopAutowalk"

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
  toRoom: ExitGameRoomId | RoomId;

  /** is this the near post of the doorframe, or the far one? */
  part: "far" | "near" | "top";
};
export type DoorLegsConfig = {
  direction: DirectionXy4;
  inHiddenWall: boolean;
  // equal to the z of the door
  height: number;
};

type ItemInPlayConfigMap<RoomId extends string, RoomItemId extends string> = {
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
  floatingText: {
    textLines: string[];
    appearanceRoomTime: number;
  };
  particle: {
    forCharacter: "crown" | IndividualCharacterName;
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
   * if true casts shadow while stood on. Most items can cast casting a shadow in this case, since
   * they will completely cover up and hide their own shadow
   */
  castsShadowWhileStoodOn: boolean;

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
