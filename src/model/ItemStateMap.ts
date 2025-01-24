import type { PortableItemType } from "../game/physics/itemPredicates";
import type { SceneryName } from "../sprites/planets";
import type { Xyz, Xy } from "../utils/vectors/vectors";
import type {
  EmptyObject,
  SwitchSetting,
  UnknownItemInPlay,
} from "./ItemInPlay";
import type { JsonItemConfig } from "./json/JsonItem";

export type PlayableActionState =
  | "moving"
  | "idle"
  | "falling"
  /** death animation is playing - character will have had expired set  */
  | "death";

export type PlayableTeleportingState =
  | {
      phase: "out";
      timeRemaining: number;
      toRoom: string; // TODO: RoomId, although maybe not since this propagates generics all over for something quite safe anyway
    }
  | {
      phase: "in";
      timeRemaining: number;
    };

export type FreeItemState<RoomId extends string = string> = {
  /* array of items ids for what we are standing on, in order of most overlap. Empty array if not standing on anything */
  standingOn: UnknownItemInPlay<RoomId> | null;

  /** movement that is queued up to happen soon - this is because it was stood on an item that moved */
  latentMovement: Array<{ moveAtRoomTime: number; positionDelta: Xyz }>;

  vels: {
    /** vertical velocity - needed for parabolic jumping and falling */
    gravity: Xyz;
    /** eg, for conveyors - maybe for other kinds of moving floors in future */
    movingFloor: Xyz;
  };

  /** the roomTime when this item last had a force applied to it - used for snapping to the pixel grid */
  actedOnAt: number;
};

type SlidingItemState<RoomId extends string> = FreeItemState<RoomId> & {
  vels: {
    sliding: Xyz;
  };
};

type PortableItemState<RoomId extends string> = FreeItemState<RoomId> & {
  /** if true, this item is the item heels would pick up next - and should be drawn highlighted in the room */
  wouldPickUpNext: boolean;
};

type SingleTouch = {
  /**
   * the frame this switch was last touched on. Some touches (switched, scrolls) only count if they are touched and weren't
   * already touched on the previous frame
   */
  touchedOnProgression: number;
};

export type CarriedItem<
  RoomId extends string,
  Types extends PortableItemType = PortableItemType,
> = {
  [T in Types]: {
    type: T;
    config: JsonItemConfig<T, SceneryName, RoomId>;
  };
}[Types];

export type PlayableState<RoomId extends string> = FreeItemState<RoomId> & {
  /**
   * z will always be zero, but is included to make easier to translate into 3-space velocities later
   */
  facing: Xyz;
  action: PlayableActionState;

  // Number of pixels the player will walk forward regardless of input. This
  // puts players properly inside a room when they enter via a door
  autoWalk: boolean;

  vels: {
    gravity: Xyz;
    /** allows the walking mechanic to keep track of its own velocities */
    walking: Xyz;
    movingFloor: Xyz;
  };

  /**
   * how many pixels have we walked since we were last not walking? Ie, in this run of
   * walking?
   *
   * Used to impose a minimum walk distance of a pixel
   */
  walkDistance: number;

  /**
   * used to distinguish (for heels) when in the air: did we jump (mandatory forward motion) or did
   * we fall (vertical falling, no forward motion)
   */
  jumped: boolean;

  teleporting: PlayableTeleportingState | null;
};

export type HeadAbilities = {
  hasHooter: boolean;
  doughnuts: number;
  /** time in ms doughnut was last fired, used to limit rate of fire */
  doughnutLastFireTime: number;
  /** how far have we walked ever, total? Head tracks this to maintain the fast steps */
  totalWalkDistance: number;
  /** how far (what totalWalkDistance) we'd walked when we got the fast steps? */
  fastStepsStartedAtDistance: number;

  lives: number;
  gameTime: number;
  // the time a shield was collected at, or null if no shield. The hud should show
  // seconds remaining based off of this value
  shieldCollectedAt: number;
  switchedToAt: number;
};

export type HeelsAbilities<RoomId extends string> = {
  hasBag: boolean;
  /** how many big jumps we can do (from picking up a bunny) */
  bigJumps: number;
  carrying: CarriedItem<RoomId> | null;
  lives: number;
  gameTime: number;
  // the time a shield was collected at, or null if no shield. The hud should show
  // seconds remaining based off of this value
  shieldCollectedAt: number;
  switchedToAt: number;
};

export type ItemStateMap<RoomId extends string> = {
  head: PlayableState<RoomId> & HeadAbilities;
  heels: PlayableState<RoomId> & HeelsAbilities<RoomId>;
  headOverHeels: PlayableState<RoomId> & {
    head: HeadAbilities;
    heels: HeelsAbilities<RoomId>;
  };
  spring: PortableItemState<RoomId>;
  portableBlock: PortableItemState<RoomId>;
  sceneryPlayer: PortableItemState<RoomId>;
  movableBlock: FreeItemState<RoomId> & {
    activated: boolean; // ie, can be turned on/off by a switch
    facing: Xyz; // used for moving platforms
    vels: {
      // for movable blocks that function as movable platforms, these are treated as 'walking':
      walking: Xyz;
    };
    durationOfTouch: number;
  };
  moveableDeadly: FreeItemState<RoomId>;
  slidingDeadly: SlidingItemState<RoomId>;
  slidingBlock: SlidingItemState<RoomId>;

  monster: FreeItemState<RoomId> & {
    activated: boolean;
    busyLickingDoughnutsOffFace: boolean;
    facing: Xyz;
    vels: {
      walking: Xyz;
    };
    /**
     * enemies turn around when they hit things but they have to be touching
     * for a certain amount of time before they do, so they can push items more
     * than a miniscule amount in a single frame
     */
    durationOfTouch: number;
  };
  pickup: FreeItemState<RoomId>;
  aliveFish: FreeItemState<RoomId>;
  lift: {
    direction: "up" | "down";
    vels: {
      lift: Xyz;
    };
  };
  firedDoughnut: {
    vels: {
      fired: Xyz;
    };
  };

  stopAutowalk: EmptyObject;
  conveyor: {
    moving: boolean;
  };
  switch: SingleTouch & {
    setting: SwitchSetting;
  };
  charles: FreeItemState<RoomId> & {
    // others will follow this soon - facing is changing to a vector
    facing: Xy;
  };
  ball: SlidingItemState<RoomId>;
  scroll: FreeItemState<RoomId>;
};
