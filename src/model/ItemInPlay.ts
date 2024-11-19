import type { PlanetName } from "../sprites/planets";
import type { Aabb, Direction, Xyz } from "../utils/vectors";
import type { JsonItemConfig, JsonItemType } from "./json/JsonItem";
import type { Container } from "pixi.js";
import type { SetRequired } from "type-fest";

export type ItemInPlayType =
  | Exclude<JsonItemType, "player" | "door">
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
    carrying: JsonItemType | null;
  };
  teleporter: { stoodOn: boolean };
  spring: FallingItemState & { stoodOn: boolean };
  "portable-block": FallingItemState;
  baddie: FallingItemState;
  pickup: FallingItemState;
  lift: {
    direction: "up" | "down";
  };
};

type ItemInPlayConfigMap = {
  floor: { deadly: boolean };
};

// type-fest's EmptyObject was creating issues
type EmptyObject = {
  [n in never]: unknown;
};

export type ItemInPlayConfig<
  T extends ItemInPlayType,
  P extends PlanetName,
  RoomId extends string,
> =
  // config type explicitly given for this item type:
  T extends keyof ItemInPlayConfigMap ? ItemInPlayConfigMap[T]
  : // fall back to the config from the json types:
  T extends JsonItemType ? JsonItemConfig<T, P, RoomId>
  : EmptyObject;

type BaseItemState = {
  position: Readonly<Xyz>;
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
  state: ItemState<T>;
  // shallow copy of the last rendered state of this item, or undefined if never rendered before
  lastRenderedState?: ItemState<T>;

  /**
   * the bounding box of this item for the sake of collision detection. This is not optional - ie, there
   * are no non-collideable items
   */
  readonly aabb: Aabb;
  /** an optional second bb which is used only for determining render order - not for collisions */
  readonly renderAabb?: Aabb;

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
