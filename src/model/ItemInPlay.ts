import { PlanetName } from "@/sprites/planets";
import { Aabb, Direction } from "@/utils/vectors";
import { ItemType, JsonItem } from "./Item";
import { Container } from "pixi.js";
import { SetRequired } from "type-fest";

export type ItemStateMap = {
  player: {
    facing: Direction;
    movement: "moving" | "idle" | "falling";
    standingOn?: UnknownItemInPlay;
    jumpRemaining: number;
  };
};

// type-fest's EmptyObject was creating issues
type EmptyObject = {
  [n in never]: unknown;
};

export type ItemState<T extends ItemType> = T extends keyof ItemStateMap
  ? ItemStateMap[T]
  : EmptyObject;

export type ItemInPlay<
  T extends ItemType,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
> = JsonItem<T, P, RoomId> & {
  readonly id: string;
  //readonly events: Emitter<{ move: void; stateChange: void }>;
  readonly state: ItemState<T>;
  /**
   * the bounding box of this item for the sake of collision detection. This is not optinoal - ie, there
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

/**
 * to spread over items on instantiation and cut down on typing
 **/
export const defaultItemProperties = {
  renders: true,
  renderPositionDirty: false,
  renderingDirty: false,
  falls: false,
} as const satisfies Partial<UnknownItemInPlay>;

export function assertItemHasContainers<T extends ItemType>(
  item: ItemInPlay<T>,
): asserts item is SetRequired<
  ItemInPlay<T>,
  "positionContainer" | "renderContainer"
> {
  if (item.positionContainer === undefined) {
    throw new Error("Item does not have a container");
  }
}

/** Union of all item types */
export type UnknownItemInPlay<RoomId extends string = string> = {
  [IT in ItemType]: ItemInPlay<IT, PlanetName, RoomId>;
}[ItemType];

/** Non-union version of any item type */
export type AnyItemInPlay<RoomId extends string = string> = ItemInPlay<
  ItemType,
  PlanetName,
  RoomId
>;
