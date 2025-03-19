import type { MarkdownPageName } from "../../manual/pages";
import type { SceneryName, Wall, PlanetName } from "../../sprites/planets";
import type {
  DirectionXy4,
  Xyz,
  AxisXy,
  DirectionXy8,
} from "../../utils/vectors/vectors";
import type { CharacterName } from "../modelTypes";
import type { DoorFrameConfig, DoorLegsConfig } from "./JsonItem";
import type { MonsterJsonConfig } from "./MonsterJsonConfig";
import type {
  ConsolidatableConfig,
  BlockStyle,
  MovementsSubset,
  ActivatedWhenSubset,
} from "./utilityJsonConfigTypes";
import type { SwitchConfig } from "./SwitchConfig";
import type { ToggleablePaths } from "../../utils/Toggleable";
import type { GameMenusState } from "../../store/slices/gameMenusSlice";

export type ItemConfigMap<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
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
  wall: ConsolidatableConfig & {
    tiles: Array<Wall<ScN>>;
    /** side of the room the wall is on (not the side it is facing) */
    direction: DirectionXy4;
  };
  teleporter: ConsolidatableConfig & {
    toRoom: RoomId;
    // where in the destination room this teleporter should go - usually
    // to atop another teleporter, but could be anywhere
    toPosition: Xyz;
    activatedOnStoreValue?: ToggleablePaths<GameMenusState>;
  };
  barrier: ConsolidatableConfig & {
    // the axis the barrier runs along
    axis: AxisXy;
    disappearing?: "onTouch";
  };
  block: ConsolidatableConfig & {
    style: BlockStyle;
    disappearing?: "onStand";
    times?: Partial<Xyz>;
  };
  deadlyBlock: ConsolidatableConfig & {
    // these don't move, and the differences are purely in their rendering:
    style: "volcano" | "toaster" | "spikes";
    times?: Partial<Xyz>;
  };
  moveableDeadly: {
    // these can move (fall, be pushed etc) and are deadly
    style: "deadFish";
  };
  slidingDeadly: {
    // these can move (fall, be pushed etc) and are deadly
    style: "puck";
  };
  conveyor: ConsolidatableConfig & {
    direction: DirectionXy4;
    disappearing?: "onStand";
  };
  hushPuppy: ConsolidatableConfig;
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
        page: MarkdownPageName;
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
    startDirection: DirectionXy8;
  };
  lift: {
    top: number;
    bottom: number;
  };
  // actually not using the special bubbles frames:
  bubbles: { style: /*"fish" | "taupe" | */ "white" };
  monster: MonsterJsonConfig;
  portableBlock: {
    style: "drum" | "sticks" | "cube";
  };
  pushableBlock: {
    style: "stepStool" | "sandwich";
  };
  movingPlatform: {
    style: "stepStool" | "sandwich";

    movement: MovementsSubset<"clockwise" | "back-forth">;
    /* if this item starts initially activated */
    activated: ActivatedWhenSubset<
      // off : needs to be turned on by a switch
      | "off"
      // on : already moving when enter room
      | "on"
      // turns on when stood on
      | "on-stand"
    >;
    startDirection: DirectionXy4;
  };
  slidingBlock: {
    // non-deadly sliding puck - eg the arrows in the centre of the moonbase
    // in the middle of the teleporter rooms
    style: "puck" | "book";
  };
  book: {
    // books are like pushableBlocks, but have orientation and are only sometimes movable.
    // almost all are x-aligned
    slider?: boolean;
  };
  switch: SwitchConfig<
    RoomId,
    /** ids of items in this room */
    RoomItemId
  >;
  joystick: {
    // item ids of all the items (probably Charles) that this joystick controls
    controls: RoomItemId[];
  };
};

export type UnknownItemConfigMap = ItemConfigMap<string, string>;

export type AllowedMonsterMovements<
  Which extends UnknownItemConfigMap["monster"]["which"],
> = (UnknownItemConfigMap["monster"] & {
  which: Which;
})["movement"];
