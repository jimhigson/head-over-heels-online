import { PlanetName } from "../sprites/planets";
import { Aabb, Direction, Xyz } from "../utils/vectors";
import { ItemConfig, ItemType } from "./Item";
import { Container } from "pixi.js";
import { SetRequired } from "type-fest";
import { CharacterName } from "./modelTypes";

export type ItemInPlayType =
  | Exclude<ItemType, "player" | "door">
  | "head"
  | "heels"
  | "doorNear"
  | "doorFar"
  | "portal"
  | "floor";

type FallingItemState = {
  /* null meaning we know item is not standing on anything (ie, should fall) */
  standingOn: UnknownItemInPlay | null;
};

export type CharacterState = FallingItemState & {
  facing: Direction;
  movement: "moving" | "idle" | "falling";
  jumpRemaining: number;
  lives: number;
  shield: number;
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
    /** how many big jumps we can do */
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

export type ItemState<T extends ItemInPlayType> = T extends keyof ItemStateMap
  ? ItemStateMap[T]
  : EmptyObject;

export type ItemInPlay<
  T extends ItemInPlayType,
  //S extends ItemState<T> = ItemState<T>,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
> = {
  type: T;

  // borrow the config from the json typings:
  config: T extends ItemType ? ItemConfig<T, P, RoomId> : EmptyObject;

  position: Xyz;
  //subPosition: Xyz;

  readonly onTouch:
    | "nonIntersect"
    | "deadly"
    | "pickup"
    | "portal"
    | "push"
    | "glide";

  readonly id: string;
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

export type PlayableItem = ItemInPlay<CharacterName>;

export const isPlayableItem = (item: AnyItemInPlay): item is PlayableItem => {
  return item.type === "head" || item.type === "heels";
};

export const isItemType = <T extends ItemInPlayType>(
  type: T,
  item: AnyItemInPlay,
): item is ItemInPlay<T> => {
  return item.type === type;
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
