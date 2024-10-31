import { EmptyObject } from "type-fest";
import { PlayableCharacter } from "./modelTypes";
import { PlanetName, Wall } from "../sprites/planets";
import { AxisXy, Direction, Xyz } from "../utils/vectors";

export type ItemType =
  | "door"
  | "floor" // only in-play, never in json
  | "doorNear" // only in-play, never in json
  | "doorFar" // only in-play, never in json
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
  | "sceneryPlayer"
  | "player"
  | "baddie"
  | "lift"
  | "joystick"
  | "charles"
  | "switch"
  | "hush-puppy"
  | "ball"
  | "book"
  | "wall";

export type RenderItemType = ItemType | "door-front" | "door-back";

export type LoadedDoorConfig<RoomId extends string> = {
  toRoom: RoomId;
  axis: AxisXy;
  /** does the door come into the hidden/invisible walls that are closest to us? */
  inHiddenWall: boolean;
};

/** properties of items that do not change - ie, if it is a barrier in x or y axis */
export type ItemConfigMap<P extends PlanetName, RoomId extends string> = {
  door: {
    toRoom: RoomId;
    axis: AxisXy;
  };
  doorNear: LoadedDoorConfig<RoomId>;
  doorFar: LoadedDoorConfig<RoomId>;
  wall: {
    style: Wall<P>;
    side: Direction;
  };
  teleporter: {
    toRoom: RoomId;
  };
  barrier: {
    // the axis the barrier runs along
    axis: AxisXy;
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
      | "crown"
      | "hooter";
  };
  fish: {
    alive: boolean;
  };
  player: {
    which: PlayableCharacter;
  };
  /** non-playable but looks like the playable char - for the final room */
  sceneryPlayer: {
    which: PlayableCharacter;
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
          | "elephant-head"
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
};

export type ItemConfig<
  T extends ItemType,
  P extends PlanetName,
  RoomId extends string,
> = T extends keyof ItemConfigMap<P, RoomId>
  ? ItemConfigMap<P, RoomId>[T]
  : EmptyObject;

export type JsonItem<
  T extends ItemType,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
> = {
  type: T;
  config: ItemConfig<T, P, RoomId>;
  position: Xyz;
};

export type UnknownJsonItem<RoomId extends string = string> = {
  [IT in ItemType]: JsonItem<IT, PlanetName, RoomId>;
}[ItemType];
