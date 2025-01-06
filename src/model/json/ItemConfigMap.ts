import type { PlanetName, Wall } from "@/sprites/planets";
import type { Direction4Xy, Xyz, AxisXy } from "@/utils/vectors/vectors";
import type { CharacterName } from "../modelTypes";
import type {
  DoorFrameConfig,
  DoorLegsConfig,
  DeadlyItemStyle,
} from "./JsonItem";

export type BlockStyle = "organic" | "artificial" | "tower";

export type JsonMovement =
  | "free"
  | "unmoving"
  | "clockwise"
  | "back-forth"
  | "towards-on-shortest-axis-xy4"
  | "towards-when-in-square-xy8"
  | "towards-tripped-on-axis-xy4"
  | "patrol-randomly-diagonal"
  | "patrol-randomly-xy4"
  | "patrol-randomly-xy8";
// to validate a union as a subset of JsonMovement
type Movements<U extends JsonMovement> = U;

/** properties of items that do not change - ie, if it is a barrier in x or y axis */

export type ItemConfigMap<
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string,
> = {
  door: {
    toRoom: RoomId;
    // the direction this door takes the character when they walk through it
    direction: Direction4Xy;
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
    side: Direction4Xy;
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
    style: BlockStyle;
    disappearing: boolean;
  };
  deadlyBlock: {
    // these don't move, and the differences are purely in their rendering:
    style: DeadlyItemStyle;
  };
  moveableDeadly: {
    // these can move (fall, be pushed etc) and are deadly
    style: "deadFish";
  };
  slidingDeadly: {
    // these can move (fall, be pushed etc) and are deadly
    style: "puck";
  };
  conveyor: {
    direction: Direction4Xy;
  };
  pickup:
    | {
        gives:
          | "extra-life"
          | "fast"
          | "jumps"
          | "shield"
          | "donuts"
          | "bag"
          | "crown"
          | "hooter"
          | "reincarnation"; // alive fish are pickups, dead fish are (styled) moveableDeadly
      }
    | {
        gives: "scroll";
        markdown: string;
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
  bubbles: { style: "fish" | "taupe" | "white" };
  baddie: {
    activated: boolean;
  } & (
    | {
        which: "flying-ball" | "emperor";
        movement: Movements<"towards-when-in-square-xy8">;
      }
    | {
        which: "elephant";
        movement: Movements<"patrol-randomly-xy4">;
      }
    | {
        which: "elephant-head";
        movement: Movements<"unmoving">;
      }
    | {
        which: "computer-bot" | "monkey";
        movement: Movements<
          "towards-on-shortest-axis-xy4" | "patrol-randomly-xy4"
        >;
      }
    | {
        which: "bubble-robot";
        movement: Movements<"patrol-randomly-xy8">;
      }
    | {
        which: "dalek";
        movement: Movements<"patrol-randomly-diagonal">;
      }
    | {
        which: "headless-base";
        movement: Movements<"towards-tripped-on-axis-xy4">;
      }
    | {
        which: "helicopter-bug";
        movement: Movements<
          "patrol-randomly-xy8" | "towards-when-in-square-xy8"
        >;
      }
    | {
        which: "turtle";
        movement: Movements<"clockwise">;
        startDirection: Direction4Xy;
      }
    | {
        which: "cyberman";
        activated: true;
        movement: Movements<"towards-on-shortest-axis-xy4">;
        startDirection: Direction4Xy;
      }
    | {
        which: "cyberman";
        activated: false;
        movement: Movements<"towards-on-shortest-axis-xy4">;
        // if true, the cyberman can wake up from charging
        wakes: boolean;
        startDirection: Direction4Xy;
      }
    | {
        which: "american-football-head";
        movement: Movements<"clockwise" | "back-forth">;
        startDirection: Direction4Xy;
        style: "greenAndPink" | "starsAndStripes";
      }
  );
  portableBlock: {
    style: "drum" | "sticks" | "cube";
  };
  movableBlock: {
    style: "anvil" | "sandwich";
  } & (
    | {
        movement: Movements<"free">;
      }
    | {
        movement: Movements<"clockwise" | "back-forth">;
        startDirection: Direction4Xy;
      }
  );
  slidingBlock: {
    style: "puck";
  };
  book: {
    // books are like movableBlocks, but have orientation and are only sometimes movable.
    // almost all are x-aligned
    slider?: boolean;
  };
  switch: {
    // list of all items (de)activated by this switch
    activates: {
      [I in ItemId]?: {
        // state deltas for the impacted items
        left: Record<string, unknown>;
        right: Record<string, unknown>;
      };
    };
  };
  joystick: {
    // item ids of all the items (probably Charles) that this joystick controls
    controls: ItemId[];
  };
};

export type UnknownItemConfigMap = ItemConfigMap<PlanetName, string, string>;

export type AllowedBaddieMovements<
  Which extends UnknownItemConfigMap["baddie"]["which"],
> = (UnknownItemConfigMap["baddie"] & {
  which: Which;
})["movement"];
