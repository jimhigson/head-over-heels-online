import { PlanetName } from "@/sprites/planets";
import { Direction } from "@/utils/vectors";
import { Emitter } from "mitt";
import { EmptyObject } from "type-fest";
import { ItemType, JsonItem } from "./Item";

export type ItemStateMap = {
  player: {
    facing: Direction;
    movement: "moving" | "idle";
  };
};

export type ItemState<T extends ItemType> = T extends keyof ItemStateMap
  ? ItemStateMap[T]
  : EmptyObject;

export type ItemInPlay<
  T extends ItemType,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
> = JsonItem<T, P, RoomId> & {
  events: Emitter<{ move: void; stateChange: void }>;
  state: ItemState<T>;
};

export type UnknownItemInPlay<RoomId extends string = string> = {
  [IT in ItemType]: ItemInPlay<IT, PlanetName, RoomId>;
}[ItemType];
