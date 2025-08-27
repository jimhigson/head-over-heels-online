import type { FreeItemTypes } from "../../game/physics/itemPredicates";
import type { MarkdownPageName } from "../../manual/pages";
import type { PlanetName, SceneryName } from "../../sprites/planets";
import type { GameMenusState } from "../../store/slices/gameMenusSlice";
import type { Subset } from "../../utils/subset";
import type { ToggleablePaths } from "../../utils/Toggleable";
import type {
  AxisXy,
  DirectionXy4,
  DirectionXy8,
  Xy,
  Xyz,
} from "../../utils/vectors/vectors";
import type { Disappear } from "../Disappear";
import type { CharacterName } from "../modelTypes";
import type { JsonItemUnion } from "./JsonItem";
import type { MonsterJsonConfig } from "./MonsterJsonConfig";
import type { ButtonConfig, SwitchConfig } from "./SwitchConfig";
import type {
  ActivatedWhenSubset,
  BlockStyle,
  ConsolidatableConfig,
  MovementsSubset,
} from "./utilityJsonConfigTypes";
import type { WallJsonConfig } from "./WallJsonConfig";

export type ScrollConfig =
  | {
      gives: "scroll";
      source: "inline";
      markdown: string;
    }
  | {
      gives: "scroll";
      source: "manual";
      page: MarkdownPageName;
    };

type PickupConfig =
  | {
      gives: "crown";
      planet: PlanetName;
    }
  | {
      gives:
        | "bag"
        | "doughnuts"
        | "extra-life"
        | "fast"
        | "hooter"
        | "jumps"
        | "reincarnation" // alive fish are pickups, dead fish are (styled) moveableDeadly
        | "shield";
    }
  | ScrollConfig;

export type EmittableItemJson = Extract<
  JsonItemUnion,
  {
    type: "firedDoughnut" | FreeItemTypes;
  }
>;

export type EmittableItemRecipe = Omit<EmittableItemJson, "position">;

export type PortableBlockStyle = "cube" | "drum" | "sticks";
export type DeadlyBlockStyle = "toaster" | "volcano";

export type FloorType = "deadly" | "none" | "standable";

export type DoorConfig<RoomId extends string> = {
  toRoom: RoomId;
  /**
   * the id of the door in the destination room. This usually does not need to be given
   * since the game can choose the door facing the right way from the destination room.
   * only give this if there are multiple doors in the same direction between the two
   * rooms */
  toDoor?: string;
  // the direction this door takes the character when they walk through it
  direction: DirectionXy4;
  meta?: {
    toSubRoom?: string;
  };
};

export type ItemConfigMap<
  RoomId extends string,
  /** ids of items in this room */
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = {
  door: DoorConfig<RoomId>;

  floor:
    | {
        /** the room has no floor, but it is included to draw the floor edge */
        floorType: Subset<FloorType, "none">;
        times: Xy;
      }
    | {
        floorType: Subset<FloorType, "deadly">;
        times: Xy;
      }
    | {
        floorType: Subset<FloorType, "standable">;
        scenery: ScN;
        times: Xy;
      };
  wall: WallJsonConfig<ScN>;
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
    // barriers can only disappear on touch:
    disappearing?: Subset<Disappear, { on: "touch" }>;
  };
  block: ConsolidatableConfig & {
    style: BlockStyle;
    // barriers can only disappear on stand (never touch):
    disappearing?: Subset<Disappear, { on: "stand" }>;
  };
  deadlyBlock: ConsolidatableConfig & {
    style: DeadlyBlockStyle;
  };
  spikes: ConsolidatableConfig;
  moveableDeadly: {
    // these can move (fall, be pushed etc) and are deadly
    style: "deadFish";
  };
  slidingDeadly: {
    // these can move (fall, be pushed etc) and are deadly
    style: "spikyBall";
    // should this sprite (initially at rest) be on frame 1 or 2? allows some variation
    startingPhase: 1 | 2;
  };
  conveyor: ConsolidatableConfig & {
    direction: DirectionXy4;
    // conveyors can only disappear on stand (never touch):
    disappearing?: Subset<Disappear, { on: "stand" }>;
  };
  hushPuppy: ConsolidatableConfig;
  pickup: PickupConfig;
  player: {
    which: CharacterName;
  };
  /** non-playable but looks like the playable char - for the final room */
  sceneryPlayer: {
    which: CharacterName;
    startDirection: DirectionXy8;
  };
  sceneryCrown: {
    planet: PlanetName;
  };
  emitter: {
    /**
     * what does this emitter emit? Could be (potentially) any free item
     */
    emits: EmittableItemRecipe;
    /**
     * how long between emissions?
     */
    period: number;
    /**
     * how many should this emitter emit? Null for no limit
     */
    maximum: null | number;
  };
  firedDoughnut: {
    // if the doughnut is given via json, can be used to give its direction
    // of travel.
    direction?: DirectionXy8;
  };
  lift: {
    top: number;
    bottom: number;
  };
  bubbles: {
    // actually not using any other styles, the game looks better with just white,
    // could remove this:
    style: "white";
    /**
     * it is the bubbles that play the sound when something is fading
     * out, not the item itself. This property helps us know which sound
     * to play
     */
    was:
      | { type: "disappearing" }
      | { type: "hushPuppy" }
      | { type: "pickup"; gives: PickupConfig["gives"] };
  };
  monster: MonsterJsonConfig;
  portableBlock: {
    style: PortableBlockStyle;
  };
  movingPlatform: {
    movement: MovementsSubset<"back-forth" | "clockwise" | "towards-analogue">;
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
    style: "book" | "puck";
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
  button: ButtonConfig<
    RoomId,
    /** ids of items in this room */
    RoomItemId
  >;
  joystick: {
    // item ids of all the items (probably Charles) that this joystick controls
    controls: RoomItemId[];
  };
};
