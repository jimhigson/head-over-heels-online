import type { FreeItem } from "@/game/physics/itemPredicates";
import type { PlanetName } from "../sprites/planets";
import type {
  Aabb,
  DirectionXy4,
  Direction4Xyz,
  Xyz,
} from "../utils/vectors/vectors";
import type { FreeItemState, ItemStateMap } from "./ItemStateMap";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";

export type ItemInPlayType =
  | Exclude<JsonItemType, "player" | "door">
  | "head"
  | "heels"
  | "doorFrame"
  | "stopAutowalk"
  | "portal"
  | "floor"
  // when another item is fading out, the bubbles are a separate item
  | "bubbles";

export type PlayableActionState =
  | "moving"
  | "idle"
  | "falling"
  /** death animation is playing - character will have had expired set  */
  | "death";

export type EitherPlayableState<RoomId extends string> =
  FreeItemState<RoomId> & {
    facing: DirectionXy4;
    action: PlayableActionState;

    lives: number;
    // the time a shield was collected at, or null if no shield. The hud should show
    // seconds remaining based off of this value
    shieldCollectedAt: number;

    // Number of pixels the player will walk forward regardless of input. This
    // puts players properly inside a room when they enter via a door
    autoWalk: boolean;

    vels: {
      gravity: Xyz;
      /** allows the walking mechanic to keep track of its own velocities */
      walking: Xyz;
      movingFloor: Xyz;
    };

    /**
     * used to distinguish (for heels) when in the air: did we jump (mandatory forward motion) or did
     * we fall (vertical falling, no forward motion)
     */
    jumped: boolean;

    teleporting:
      | {
          phase: "out";
          timeRemaining: number;
          toRoom: string; // TODO: RoomId, although maybe not since this propagates generics all over for something quite safe anyway
        }
      | {
          phase: "in";
          timeRemaining: number;
        }
      | null;
  };

export type SwitchSetting = "left" | "right";

type ItemInPlayConfigMap<RoomId extends string> = {
  floor: { deadly: boolean };
  portal: {
    toRoom: RoomId;
    /* 
      when moving through portals, the position of the character relative to this point is
      taken, and preserved to be relative to the relativePoint of the portal in the new room
    */
    relativePoint: Xyz;
    // the direction this portal has to be hit in to be walked through
    direction: Direction4Xyz;
  };
  conveyor: {
    direction: DirectionXy4;
    count: number; // how many conveyors blocks in this run of conveyors?
  };
  stopAutowalk: EmptyObject;
  // disappearing can be turned off (blacktooth 6 for donuts) so it is state, not config
  block: Omit<JsonItemConfig<"block", PlanetName, RoomId>, "disappearing">;
};

// type-fest's EmptyObject was creating issues
export type EmptyObject = {
  [n in never]: unknown;
};

export type ItemInPlayConfig<
  T extends ItemInPlayType,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
> =
  // config type explicitly given for this item type:
  T extends keyof ItemInPlayConfigMap<RoomId> ? ItemInPlayConfigMap<RoomId>[T]
  : // fall back to the config from the json types:
  T extends JsonItemType ? JsonItemConfig<T, P, RoomId>
  : EmptyObject;

export type Disappear = "onStand" | "onTouch" | "onTouchByPlayer" | null;

type BaseItemState<RoomId extends string> = {
  position: Readonly<Xyz>;
  /**
   * The item will be removed from the room after this gameTime. To guarantee removal on the next frame (effectively immediately)
   * set to -1. Otherwise, can set to the duration of an animation that needs to play
   *
   * If null, the item is not scheduled for removal (the normal case)
   */
  expires: number | null;

  /** what is standing on this item? */
  stoodOnBy: Set<FreeItem<PlanetName, RoomId>>;

  disappear: Disappear;
};

export type ItemState<T extends ItemInPlayType, RoomId extends string> =
  T extends keyof ItemStateMap<RoomId> ?
    BaseItemState<RoomId> & ItemStateMap<RoomId>[T]
  : BaseItemState<RoomId>;

export type ItemInPlay<
  T extends ItemInPlayType,
  //S extends ItemState<T> = ItemState<T>,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
  ID extends string = string,
> = {
  type: T;

  // borrow the config from the json typings:
  config: ItemInPlayConfig<T, P, RoomId>;

  readonly id: ID;
  state: ItemState<T, RoomId>;

  /**
   * the bounding box of this item for the sake of collision detection. This is not optional - ie, there
   * are no non-collideable items
   */
  aabb: Aabb;
  /** an optional second bb which is used only for determining render order - not for collisions */
  readonly renderAabb?: Aabb;

  renders: boolean;
};

/**
 * Force ItemInPlay into a union so that discrimination over
 * unions works
 */
export type UnknownItemInPlay<RoomId extends string = string> = {
  [IT in ItemInPlayType]: ItemInPlay<IT, PlanetName, RoomId>;
}[ItemInPlayType];

/** Non-union version of any item type */
export type AnyItemInPlay<RoomId extends string = string> = ItemInPlay<
  ItemInPlayType,
  PlanetName,
  RoomId
>;
