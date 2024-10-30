import { PlanetName } from "@/sprites/planets";
import { Aabb, Direction } from "@/utils/vectors";
import { Emitter } from "mitt";
import { ItemType, JsonItem } from "./Item";

export type ItemStateMap = {
  player: {
    facing: Direction;
    movement: "moving" | "idle";
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
  readonly events: Emitter<{ move: void; stateChange: void }>;
  readonly state: ItemState<T>;
  /** the bounding box of this item for the sake of collision detection */
  readonly aabb?: Aabb;
};

export type UnknownItemInPlay<RoomId extends string = string> = {
  [IT in ItemType]: ItemInPlay<IT, PlanetName, RoomId>;
}[ItemType];
