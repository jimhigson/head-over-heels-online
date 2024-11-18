import type { PlanetName } from "../sprites/planets";
import type { Aabb, Direction, Xyz } from "../utils/vectors";
import type { ItemConfig, ItemType } from "./json/JsonItem";
import type { Container } from "pixi.js";
import type { SetRequired } from "type-fest";

export type ItemInPlayType =
  | Exclude<ItemType, "player" | "door">
  | "head"
  | "heels"
  | "doorFrame"
  | "portal"
  | "floor";

type FallingItemState = {
  /* null meaning we know item is not standing on anything (ie, should fall) */
  standingOn: UnknownItemInPlay | null;
  /** vertical velocity - needed for parabolic jumping and falling */
  velZ: number;
};

export type CharacterState = FallingItemState & {
  facing: Direction;
  action:
    | "moving"
    | "idle"
    | "falling"
    /** death animation is playing - character will have had expired set  */
    | "death";

  lives: number;
  shield: number;

  // Number of pixels the player will walk forward regardless of input. This
  // puts players properly inside a room when they enter via a door
  autoWalkDistance: number;

  /**
   * the time we will finish being in a jump state, for the most recent jump.
   * This value can be used at any time to say if we are in a jump or not by
   * comparing with the current game time.
   */
  jumpEndTime: number;

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

export type ItemStateMap = {
  head: CharacterState & {
    hasHooter: boolean;
    /** how many big jumps we can do */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    donuts: number;
    fast: number;
  };
  heels: CharacterState & {
    hasBag: boolean;
    /** how many big jumps we can do (from picking up a bunny) */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    jumps: number;
    carrying: ItemType | null;
  };
  teleporter: { flashing: boolean };
  "portable-block": FallingItemState;
  baddie: FallingItemState;
  spring: FallingItemState;
  pickup: FallingItemState;
};

// type-fest's EmptyObject was creating issues
type EmptyObject = {
  [n in never]: unknown;
};

type BaseItemState = {
  position: Xyz;
  /**
   * The item will be removed from the room after this gameTime. To guarantee removal on the next frame (effectively immediately)
   * set to -1. Otherwise, can set to the duration of an animation that needs to play
   *
   * If undefined, the item is not scheduled for removal (the normal case)
   */
  expires: number | null;
};

export type ItemState<T extends ItemInPlayType> = BaseItemState &
  (T extends keyof ItemStateMap ? ItemStateMap[T] : BaseItemState);

export type OnTouch =
  | "nonIntersect"
  | "deadly"
  | "pickup"
  | "portal"
  | "push"
  | "glide";

export type ItemInPlay<
  T extends ItemInPlayType,
  //S extends ItemState<T> = ItemState<T>,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
  ID extends string = string,
> = {
  type: T;

  // borrow the config from the json typings:
  config: T extends ItemType ? ItemConfig<T, P, RoomId> : EmptyObject;

  // position is now in the state:
  //position: Xyz;

  readonly onTouch: OnTouch;

  readonly id: ID;
  state: ItemState<T>;

  /**
   * the bounding box of this item for the sake of collision detection. This is not optional - ie, there
   * are no non-collideable items
   */
  readonly aabb: Aabb;
  /** an optional second bb which is used only for determining render order - not for collisions */
  readonly renderAabb?: Aabb;

  renderPositionDirty: boolean;
  renderingDirty: boolean;

  /*render: () => void;
  positionOnScreen: () => void;*/
  positionContainer?: Container;
  renderContainer?: Container;

  renders: boolean;

  /**
   * true if this object should fall whenever it is not supported. Otherwise,
   * it can float unsupported in free-space
   */
  falls: boolean;
};

export type PlayableItem<RoomId extends string = string> =
  | ItemInPlay<"head", PlanetName, RoomId, "head">
  | ItemInPlay<"heels", PlanetName, RoomId, "heels">;

export const isPlayableItem = (item: AnyItemInPlay): item is PlayableItem => {
  return item.type === "head" || item.type === "heels";
};

export const isItemType =
  <T extends ItemInPlayType>(...types: Array<T>) =>
  <RoomId extends string>(
    item: AnyItemInPlay<RoomId>,
  ): item is ItemInPlay<T, PlanetName, RoomId> => {
    return (types as Array<string>).includes(item.type);
  };

export const fallingItemTypes = [
  "head",
  "heels",
  "pickup",
  "portable-block",
  "baddie",
  "spring",
] as const satisfies ItemInPlayType[];

export type FallingItemTypes = (typeof fallingItemTypes)[number];

export function itemFalls<
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
>(
  item: ItemInPlay<ItemInPlayType, P, RoomId>,
): item is ItemInPlay<FallingItemTypes, P, RoomId> {
  return item.falls;
}

export function assertItemHasRenderContainer<T extends ItemInPlayType>(
  item: ItemInPlay<T>,
): asserts item is SetRequired<ItemInPlay<T>, "renderContainer"> {
  if (item.renderContainer === undefined) {
    throw new Error("Item does not have a render container");
  }
}

export function assertItemHasPositionContainer<T extends ItemInPlayType>(
  item: ItemInPlay<T>,
): asserts item is SetRequired<ItemInPlay<T>, "positionContainer"> {
  if (item.positionContainer === undefined) {
    throw new Error("Item does not have a position container");
  }
}

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
