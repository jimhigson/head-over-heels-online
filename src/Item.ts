import { EmptyObject, Simplify } from "type-fest";
import { Direction, Xyz } from "./modelTypes";

export type ItemType =
  | "teleporter"
  | "barrier"
  | "block"
  | "deadly-block"
  // something heels can pick up in her bag
  | "portable-block"
  // something that can be pushed or moves on a switch
  | "movable-block"
  | "conveyor"
  | "pickup"
  | "fish"
  | "spring"
  | "player"
  | "baddie"
  | "lift"
  | "joystick"
  | "charles";

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
  lift: {
    top: number;
    bottom: number;
  };
  baddie: {
    which: "dalek";
  };
  joystick: EmptyObject;
  "portable-block": {
    style: "drum" | "sticks" | "cube";
  };
  "movable-block": {
    style: "anvil" | "sandwich";
  };
  charles: EmptyObject;
};

export type Item<T extends ItemType> = {
  type: T;
  config: ItemConfig[T];
  position: Xyz;
};

export type UnknownItem = { [I in ItemType]: Item<I> }[ItemType];

export type ItemInPlay = {
  // needs everything from item, plus some item state
  position: Xyz;
};
