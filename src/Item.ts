import { EmptyObject } from "type-fest";
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
  | "charles"
  | "switch"
  | "hush-puppy"
  | "ball"
  | "book";

/** properties of items that do not change - ie, if it is a barrier in x or y axis */
export type ItemConfig<RoomId extends string> = {
  teleporter: {
    toRoom: RoomId;
  };
  barrier: {
    // the axis the barrier runs along
    axis: "x" | "y";
  };
  block: {
    style: "organic" | "artificial" | "tower";
  };
  "deadly-block": {
    style: "volcano" | "toaster" | "spikes" | "puck";
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
  baddie:
    | {
        which:
          | "dalek"
          | "helicopter-bug"
          | "headless-base"
          | "monkey"
          | "elephant"
          | "flying-ball"
          | "bubble-robot"
          | "computer-bot";
      }
    | {
        // with a starting direction
        which: "american-football-head" | "turtle";
        startDirection: Direction;
      }
    | {
        which: "cyberman";
        startDirection: Direction;
        charging: true;
      }
    | {
        which: "cyberman";
        charging: false;
      };
  joystick: EmptyObject;
  "portable-block": {
    style: "drum" | "sticks" | "cube";
  };
  "movable-block": {
    style: "anvil" | "sandwich" | "puck";
  };
  book: {
    // books are like movable-blocks, but have orientation and are only sometimes movable.
    // almost all are x-aligned
    slider?: boolean;
  };
  charles: EmptyObject;
  switch: EmptyObject;
  "hush-puppy": EmptyObject;
  ball: EmptyObject;
};

export type Item<T extends ItemType, RoomId extends string = string> = {
  type: T;
  config: ItemConfig<RoomId>[T];
  position: Xyz;
};

export type UnknownItem<RoomId extends string = string> = {
  [I in ItemType]: Item<I, RoomId>;
}[ItemType];

export type ItemInPlay = {
  // needs everything from item, plus some item state
  position: Xyz;
};
