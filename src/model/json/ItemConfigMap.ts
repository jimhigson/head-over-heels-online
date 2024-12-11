import type { PlanetName, Wall } from "@/sprites/planets";
import type { DirectionXy4, Xyz, AxisXy } from "@/utils/vectors/vectors";
import type { CharacterName } from "../modelTypes";
import type {
  DoorFrameConfig,
  DoorLegsConfig,
  DeadlyItemStyle,
} from "./JsonItem";

export type BlockStyle = "organic" | "artificial" | "tower";

/** properties of items that do not change - ie, if it is a barrier in x or y axis */

export type ItemConfigMap<
  P extends PlanetName,
  RoomId extends string,
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
    direction: DirectionXy4;
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
  baddie: { activated: boolean } & (
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
        which: "turtle" | "cyberman";
        startDirection: DirectionXy4;
      }
    | {
        // with a starting direction
        which: "american-football-head";
        startDirection: DirectionXy4;
        style: "greenAndPink" | "starsAndStripes";
      }
  );
  portableBlock: {
    style: "drum" | "sticks" | "cube";
  };
  movableBlock: {
    style: "anvil" | "sandwich";
  };
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
