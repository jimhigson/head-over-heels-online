import { EmptyObject, Simplify } from "type-fest";
import { Direction, Xyz } from "./modelTypes";

export type ItemType =
  | "teleporter"
  | "barrier"
  | "block"
  | "deadly-block"
  | "conveyor"
  | "pickup"
  | "fish"
  | "spring"
  | "player";

/** properties of items that do not change - ie, if it is a barrier in x or y axis */
export type ItemConfig = {
  teleporter: {
    toRoom: string;
  };
  barrier: {
    // the axis the barrier runs along
    axis: "x" | "y";
  };
  block: {
    style: "organic" | "artificial" | "tower";
  };
  "deadly-block": {
    style: "volcano" | "toaster";
  };
  conveyor: {
    direction: Direction;
  };
  pickup: {
    gives:
      | "extra-life"
      | "fast"
      | "jumps"
      | "shield"
      | "donuts"
      | "bag"
      | "hooter";
  };
  fish: {
    alive: boolean;
  };
  spring: EmptyObject;
  player: {
    which: "head" | "heels";
  };
};

export type Item<T extends ItemType> = Simplify<
  { type: ItemType } & { config: ItemConfig[T] } & { position: Xyz }
>;

export type UnknownItem = Item<ItemType>;

export type ItemInPlay = {
  // needs everything from item, plus some item state
  position: Xyz;
};
