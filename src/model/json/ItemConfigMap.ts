import type { MarkdownPageName } from "../../manual/pages";
import type { SceneryName, PlanetName } from "../../sprites/planets";
import type {
  DirectionXy4,
  Xyz,
  AxisXy,
  DirectionXy8,
} from "../../utils/vectors/vectors";
import type { CharacterName } from "../modelTypes";
import type {
  DoorFrameConfig,
  DoorLegsConfig,
  JsonItemUnion,
} from "./JsonItem";
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
import type { FreeItemTypes } from "../../game/physics/itemPredicates";
import type { WallJsonConfig } from "./WallJsonConfig";
import type { Disappear } from "../Disappear";
import type { Subset } from "../../utils/subset";

type PickupConfig =
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

export type EmittableItemJson = Extract<
  JsonItemUnion,
  {
    type: FreeItemTypes | "firedDoughnut";
  }
>;

export type EmittableItemRecipe = Omit<EmittableItemJson, "position">;

export type PortableBlockStyle = "drum" | "sticks" | "cube";
export type DeadlyBlockStyle = "toaster" | "volcano";

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

    meta?: {
      toSubRoom?: string;
    };
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
    times?: Partial<Xyz>;
  };
  deadlyBlock: ConsolidatableConfig & {
    style: DeadlyBlockStyle;
    times?: Partial<Xyz>;
  };
  spikes: ConsolidatableConfig & {
    times?: Partial<Xyz>;
  };
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
    maximum: number | null;
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
      | { type: "pickup"; gives: PickupConfig["gives"] }
      | { type: "hushPuppy" }
      | { type: "disappearing" };
  };
  monster: MonsterJsonConfig;
  portableBlock: {
    style: PortableBlockStyle;
  };
  movingPlatform: {
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
