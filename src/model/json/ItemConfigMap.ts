import type { PlanetName, SceneryName, Wall } from "@/sprites/planets";
import type { DirectionXy4, Xyz, AxisXy } from "@/utils/vectors/vectors";
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
type MovementsSubset<U extends JsonMovement> = U;

/** properties of items that do not change - ie, if it is a barrier in x or y axis */

export type ItemConfigMap<
  P extends SceneryName,
  RoomId extends string,
  /** ids of items in this room */
  ItemId extends string,
> = {
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
    // where in the destination room this teleporter should go - usually
    // to atop another teleporter, but could be anywhere
    toPosition: Xyz;
  };
  barrier: {
    // the axis the barrier runs along
    axis: AxisXy;
    disappearing?: "onTouch";
  };
  block: {
    style: BlockStyle;
    disappearing?: "onStand";
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
    direction: DirectionXy4;
    disappearing?: "onStand";
  };
  pickup:
    | {
        gives:
          | "extra-life"
          | "fast"
          | "jumps"
          | "shield"
          | "doughnuts"
          | "bag"
          | "hooter"
          | "reincarnation"; // alive fish are pickups, dead fish are (styled) moveableDeadly
      }
    | {
        gives: "scroll";
        markdown: string;
      }
    | {
        gives: "crown";
        planet: PlanetName;
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
  monster: {
    activated: boolean;
  } & (
    | {
        which: "emperorsGuardian" | "emperor";
        movement: MovementsSubset<"towards-when-in-square-xy8">;
      }
    | {
        which: "elephant";
        movement: MovementsSubset<"patrol-randomly-xy4">;
      }
    | {
        which: "elephantHead";
        movement: MovementsSubset<"unmoving">;
        startDirection: DirectionXy4;
      }
    | {
        which: "computerBot" | "monkey";
        movement: MovementsSubset<
          "towards-on-shortest-axis-xy4" | "patrol-randomly-xy4"
        >;
      }
    | {
        which: "bubbleRobot";
        movement: MovementsSubset<"patrol-randomly-xy8">;
      }
    | {
        which: "dalek";
        movement: MovementsSubset<"patrol-randomly-diagonal">;
      }
    | {
        which: "homingBot";
        movement: MovementsSubset<"towards-tripped-on-axis-xy4">;
      }
    | {
        which: "helicopterBug";
        movement: MovementsSubset<
          "patrol-randomly-xy8" | "towards-when-in-square-xy8"
        >;
      }
    | {
        which: "turtle";
        movement: MovementsSubset<"clockwise">;
        startDirection: DirectionXy4;
      }
    | {
        which: "cyberman";
        activated: true;
        movement: MovementsSubset<"towards-on-shortest-axis-xy4">;
        startDirection: DirectionXy4;
      }
    | {
        which: "cyberman";
        activated: false;
        movement: MovementsSubset<"towards-on-shortest-axis-xy4">;
        // if true, the cyberman can wake up from charging
        wakes: boolean;
        startDirection: DirectionXy4;
      }
    | {
        which: "skiHead";
        movement: MovementsSubset<"clockwise" | "back-forth">;
        startDirection: DirectionXy4;
        style: "greenAndPink" | "starsAndStripes";
      }
  );
  portableBlock: {
    style: "drum" | "sticks" | "cube";
  };
  movableBlock: {
    style: "stepStool" | "sandwich";
  } & (
    | {
        movement: MovementsSubset<"free">;
      }
    | {
        movement: MovementsSubset<"clockwise" | "back-forth">;
        /* if this item starts initially activated */
        activated: boolean | "onStand";
        startDirection: DirectionXy4;
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

export type UnknownItemConfigMap = ItemConfigMap<SceneryName, string, string>;

export type AllowedMonsterMovements<
  Which extends UnknownItemConfigMap["monster"]["which"],
> = (UnknownItemConfigMap["monster"] & {
  which: Which;
})["movement"];
