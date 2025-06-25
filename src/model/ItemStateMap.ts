import type { EmptyObject } from "type-fest";
import type { PortableItem } from "../game/physics/itemPredicates";
import type { Xyz, Xy, DirectionXyz4 } from "../utils/vectors/vectors";
import type { SwitchSetting } from "./ItemInPlay";

export type PlayableActionState =
  | "moving"
  | "idle"
  | "jumping"
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

type TimedRelationWithOtherItem<RoomItemId extends string> = {
  /** by recording the time of the event,
   * we allow rendering to take into account events that happened in sub-ticks since the room's
   * last render
   */
  roomTime: number;
  /** the ids of the item is related to */
  by: Record<RoomItemId, true>;
};

export type FreeItemState<RoomItemId extends string> = {
  /* id of the single item we are considered to be standing on, or null if not standing on anything */
  standingOnItemId: RoomItemId | null;

  /** movement that is queued up to happen soon - this is because it was stood on an item that moved */
  latentMovement: Array<{ moveAtRoomTime: number; positionDelta: Xyz }>;

  vels: {
    /** vertical velocity - needed for parabolic jumping and falling */
    gravity: Xyz;
    /** eg, for conveyors - maybe for other kinds of moving floors in future */
    movingFloor: Xyz;
  };

  /** the roomTime when this item last had a force applied to it, and who did the pushing/acting */
  actedOnAt: TimedRelationWithOtherItem<RoomItemId>;
  /** when this item last collided into something, and who did we collide into */
  collidedWith: TimedRelationWithOtherItem<RoomItemId>;
};

type SlidingItemState<RoomItemId extends string> = FreeItemState<RoomItemId> & {
  vels: {
    sliding: Xyz;
  };
};

type PortableItemState = {
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

export type PlayableState<RoomItemId extends string> =
  FreeItemState<RoomItemId> & {
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
     * what direction were we facing just before we started walking?
     */
    walkStartFacing: Xyz;

    /**
     * used to distinguish (for heels) when in the air: did we jump (mandatory forward motion) or did
     * we fall (vertical falling, no forward motion)
     */
    jumped: boolean;

    /** used for the jump grace period */
    jumpStartTime: number;
    jumpStartZ: number;

    teleporting: PlayableTeleportingState | null;
  };

// we can't rely on Number.POSITIVE_INFINITY in the state because it's not JSON serializable
export type PokeableNumber = "infinite" | number;

export const addPokeableNumbers = (
  a: PokeableNumber,
  b: PokeableNumber,
): PokeableNumber =>
  a === "infinite" || b === "infinite" ? "infinite" : a + b;

export const pokeableToNumber = (a: PokeableNumber): number =>
  // it is ok to use POSITIVE_INFINITY anywhere where it doesn't get serialised
  a === "infinite" ? Number.POSITIVE_INFINITY : a;

export type CommonAbilities = {
  lives: PokeableNumber;
  /** time specific to this character - how must time has the character experienced? Ie,
   * long have they been in the currently playing room
   * during this game? - this is used to know the time remaining on a shield, and other timing-based
   * code that applies to a player and is sticky when they're not selected
   */
  gameTime: number;
  /**
   * the time a shield was collected at, or null if no shield. The hud should show
   * seconds remaining based off of this value
   */
  shieldCollectedAt: number;

  /** when we switched to this character. Used to show their highlight outline */
  switchedToAt: number;

  /**
   * the character's gameTime of their last death. This is used to make the character invulnerable
   * for a short time after they die
   */
  lastDiedAt: number;
};

export type HeadAbilities = CommonAbilities & {
  hasHooter: boolean;
  doughnuts: PokeableNumber;

  /**
   * how far have we walked ever, total in this game?
   * Head tracks this so we know when the fast steps power-up runs out
   */
  gameWalkDistance: number;
  /** how far (what gameWalkDistance) we'd walked when we got the fast steps? */
  fastStepsStartedAtDistance: number;
};

export type HeelsAbilities<RoomId extends string> = CommonAbilities & {
  hasBag: boolean;
  /** how many big jumps we can do (from picking up a bunny) */
  bigJumps: number;
  carrying: PortableItem<RoomId, string> | null;
};

type ItemWithMovementState = {
  /**
   * enemies turn around when they hit things but they have to be touching
   * for a certain amount of time before they do, so they can push items more
   * than a miniscule amount in a single frame
   */
  durationOfTouch: number;

  /**
   * some enemies need to be protected from changing direction too often
   * so track when they last changed. This looks bad at 60fps if they start to
   * change every frame.
   */
  timeOfLastDirectionChange: number;
  facing: Xyz; // used for moving platforms
  /**
   * activated for us is a boolean, not the many-states from the json config, ie it is stateful
   * on if the item is currently activated (so they can render differently)
   */
  activated: boolean;
  /** if this item has ever been activated, in the lifetime of the room. Charging cybermen will
   * have this flag as false so long as they are charging
   */
  everActivated: boolean;
  vels: {
    // for movable blocks that function as movable platforms, these are treated as 'walking':
    walking: Xyz;
  };
};

export type MonsterState<RoomItemId extends string> =
  FreeItemState<RoomItemId> &
    PortableItemState &
    ItemWithMovementState & {
      busyLickingDoughnutsOffFace: boolean;
    };

export type ItemStateMap<RoomId extends string, RoomItemId extends string> = {
  head: PlayableState<RoomItemId> & HeadAbilities;
  heels: PlayableState<RoomItemId> &
    HeelsAbilities<RoomId> & {
      /**
       * true if heels is jumping, and the jump was a big jump using a power-up. THis can be used to
       * decide to show the particle effect or not
       */
      isBigJump: boolean;
    };
  headOverHeels: PlayableState<RoomItemId> & {
    head: HeadAbilities;
    heels: HeelsAbilities<RoomId>;
  };
  spring: FreeItemState<RoomItemId> & PortableItemState;
  portableBlock: FreeItemState<RoomItemId> & PortableItemState;
  sceneryPlayer: FreeItemState<RoomItemId> & PortableItemState;
  emitter: {
    lastEmittedAtRoomTime: number;
    quantityEmitted: number;
  };
  pushableBlock: FreeItemState<RoomItemId> & ItemWithMovementState;
  movingPlatform: FreeItemState<RoomItemId> & ItemWithMovementState;
  moveableDeadly: FreeItemState<RoomItemId>;
  sceneryCrown: FreeItemState<RoomItemId> & PortableItemState;
  slidingDeadly: SlidingItemState<RoomItemId>;
  slidingBlock: PortableItemState & SlidingItemState<RoomItemId>;
  ball: SlidingItemState<RoomItemId>;

  monster: MonsterState<RoomItemId>;
  pickup: FreeItemState<RoomItemId>;
  aliveFish: FreeItemState<RoomItemId>;
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
  charles: FreeItemState<RoomItemId> & {
    // others will follow this soon - facing is changing to a vector
    facing: Xy;
  };

  scroll: FreeItemState<RoomItemId>;

  cursor: {
    face: DirectionXyz4;
    /**
     * is this cursor valid in this location and for the tool
     */
    valid: boolean;
  };
};
