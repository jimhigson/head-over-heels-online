import type { EmptyObject } from "type-fest";
import type { CharacterName } from "../modelTypes";
import type { PlanetName, Wall } from "../../sprites/planets";
import type { AxisXy, DirectionXy4, Xyz } from "../../utils/vectors/vectors";

export type JsonItemType =
  | "door"
  | "floor" // only in-play, never in json - TODO: remove from json typings
  | "doorFrame" // only in-play, never in json - TODO: remove from json typings
  | "doorLegs" // only in-play, never in json - TODO: remove from json typings
  | "portal" // only in-play, never in json - TODO: remove from json typings
  | "teleporter"
  | "barrier"
  | "block"
  | "deadlyBlock"
  // something heels can pick up in her bag
  | "portableBlock"
  // something that can be pushed or moves on a switch
  | "movableBlock"
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
  | "hushPuppy"
  | "ball"
  | "book"
  | "wall";

export type RenderItemType = JsonItemType | "door-front" | "door-back";

/**
 * test for if a door is embedded in an undrawn wall - ie, is on the right or towards
 * edge of the room and needs extra space for it
 */
export const doorIsInHiddenWall = ({
  config: { direction },
  position,
}: JsonItem<"door", PlanetName, string>) =>
  (direction === "right" && position.x === 0) ||
  (direction === "towards" && position.y === 0);

export type DoorFrameConfig<RoomId extends string> = {
  direction: DirectionXy4;
  inHiddenWall: boolean;
  toRoom: RoomId;

  /** is this the near post of the doorframe, or the far one? */
  nearness: "near" | "far";
};
export type DoorLegsConfig = {
  direction: DirectionXy4;
  inHiddenWall: boolean;
  // equal to the z of the door
  height: number;
};

/** properties of items that do not change - ie, if it is a barrier in x or y axis */
export type ItemConfigMap<P extends PlanetName, RoomId extends string> = {
  door: {
    toRoom: RoomId;
    // the direction this door takes the character when they walk through it
    direction: DirectionXy4;
  };
  doorFrame: DoorFrameConfig<RoomId>;
  doorLegs: DoorLegsConfig;
  portal: {
    toRoom: RoomId;
    /* 
      when moving through portals, the position of the character relative to this point is
      taken, and preserved to be relative to the relativePoint of the portal in the new room
    */
    relativePoint: Xyz;
  };
  wall: {
    style: Wall<P>;
    side: DirectionXy4;
  };
  teleporter: {
    toRoom: RoomId;
  };
  barrier: {
    // the axis the barrier runs along
    axis: AxisXy;
    disappearing: boolean;
  };
  block: {
    style: "organic" | "artificial" | "tower";
    disappearing: boolean;
  };
  deadlyBlock: {
    style: "volcano" | "toaster" | "spikes" | "puck";
  };
  conveyor: {
    direction: DirectionXy4;
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
    which: CharacterName;
  };
  /** non-playable but looks like the playable char - for the final room */
  sceneryPlayer: {
    which: CharacterName;
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
        startDirection: DirectionXy4;
      }
    | {
        which: "cyberman";
        startDirection: DirectionXy4;
        charging: true;
      }
    | {
        which: "cyberman";
        charging: false;
      };
  portableBlock: {
    style: "drum" | "sticks" | "cube";
  };
  movableBlock: {
    style: "anvil" | "sandwich" | "puck";
  };
  book: {
    // books are like movableBlocks, but have orientation and are only sometimes movable.
    // almost all are x-aligned
    slider?: boolean;
  };
  switch: {
    // list of all items (de)activated by this switch
    activates: {
      [itemId: string]: {
        // state deltas for the impacted items
        left: Record<string, unknown>;
        right: Record<string, unknown>;
      };
    };
  };
  joystick: {
    // item ids of all the items (probably Charles) that this joystick controls
    controls: string[];
  };
};

/** config used in both json and in-play items */
export type JsonItemConfig<
  T extends JsonItemType,
  P extends PlanetName,
  RoomId extends string,
> =
  T extends keyof ItemConfigMap<P, RoomId> ? ItemConfigMap<P, RoomId>[T]
  : EmptyObject;

export type JsonItem<
  T extends JsonItemType,
  P extends PlanetName = PlanetName,
  RoomId extends string = string,
> = {
  type: T;
  config: JsonItemConfig<T, P, RoomId>;
  position: Xyz;
};

export type UnknownJsonItem<RoomId extends string = string> = {
  [IT in JsonItemType]: JsonItem<IT, PlanetName, RoomId>;
}[JsonItemType];
