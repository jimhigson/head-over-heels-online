import type { EmptyObject, Simplify } from "type-fest";

import type { PortableItem } from "../game/physics/itemPredicates";
import type { SceneryName } from "../sprites/planets";
import type {
  DirectionXy4,
  DirectionXyz4,
  Xy,
  Xyz,
} from "../utils/vectors/vectors";
import type { SwitchSetting } from "./ItemInPlay";
import type { ItemConfigMap } from "./json/ItemConfigMap";
import type { TimedRelationWithOtherItem } from "./TimedRelationWithOtherItem";

export type PlayableActionState =
  | "falling"
  | "idle"
  | "jumping"
  | "moving"
  /** death animation is playing - character will have had expired set  */
  | "death";

export type PlayableTeleportingState =
  | {
      phase: "in";
      timeRemaining: number;
    }
  | {
      phase: "out";
      timeRemaining: number;
      toRoom: string; // TODO: RoomId, although maybe not since this propagates generics all over for something quite safe anyway
    };

export type LatentMovementFrame = {
  /** the time that the movement is scheduled to start happening */
  startAtRoomTime: number;
  /** the time that the movement is scheduled to stop happening */
  endAtRoomTime: number;
  /** the velocity to move at between the start and end times, in pixels per ms */
  velocity: Xyz;
};

export type FreeItemState<RoomItemId extends string> = {
  /**
   * id of the single item we are considered to be standing on, or null if not standing on anything
   */
  standingOnItemId: null | RoomItemId;

  /** movement that is queued up to happen soon - this is because it was stood on an item that moved */
  latentMovement: Array<LatentMovementFrame>;

  vels: {
    /** vertical velocity - needed for parabolic jumping and falling */
    gravity: Xyz;
    /** eg, for conveyors - maybe for other kinds of moving floors in future */
    movingFloor: Xyz;
  };

  /** when this item last collided into something, and who did we collide into */
  collidedWith: TimedRelationWithOtherItem<RoomItemId>;

  /**
   * the item we were standing on before the current one. Can be used to test if the item we
   * just stepped off offers jumping grace (a few more frames to make the jump)
   */
  previousStandingOnItemId: null | RoomItemId;

  /**
   * if not standing on anything, the gameTime when the standing on ended
   * (not room time, since this is on the playable and they can transfer between rooms)
   */
  standingOnUntilRoomTime: number;

  /**
   * really for charles bots in the original game, but technically any free item can
   * be controlled.
   *
   * Used to dedupe so that each item can only be controlled by one joystick per-frame -
   * first one to the processed wins
   */
  controlledWithJoystickAtRoomTime: number;
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

    teleporting: null | PlayableTeleportingState;
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
  carrying: null | PortableItem<RoomId, string>;
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
  emitter: Simplify<
    {
      lastEmittedAtRoomTime: number;
      quantityEmitted: number;
    } & ItemConfigMap<RoomId, RoomItemId, SceneryName>["emitter"]
  >; // copying the config into the state means that these settings are mutable at run-time. eg, by switches

  joystick: {
    // the direction this joystick was pushed most recently:
    lastPushDirection: DirectionXy4 | undefined;
  } & ItemConfigMap<RoomId, RoomItemId, SceneryName>["joystick"]; // copying the config into the state means that these settings are mutable at run-time. eg, changing what the joystick controls using switches
  teleporter: ItemConfigMap<RoomId, RoomItemId, SceneryName>["teleporter"]; // copying the config into the state means that these settings are mutable at run-time. eg, by switches

  pushableBlock: FreeItemState<RoomItemId> & ItemWithMovementState;
  movingPlatform: FreeItemState<RoomItemId> & ItemWithMovementState;
  moveableDeadly: FreeItemState<RoomItemId>;
  sceneryCrown: FreeItemState<RoomItemId> & PortableItemState;
  slidingDeadly: SlidingItemState<RoomItemId>;
  slidingBlock: PortableItemState & SlidingItemState<RoomItemId>;
  ball: SlidingItemState<RoomItemId>;

  monster: MonsterState<RoomItemId>;
  pickup: FreeItemState<RoomItemId>;
  lift: Simplify<
    {
      direction: "down" | "up";
      vels: {
        lift: Xyz;
      };
    } & ItemConfigMap<RoomId, RoomItemId, SceneryName>["lift"]
  >; // copying the config into the state means that these settings are mutable at run-time. eg, by switches;
  firedDoughnut: {
    vels: {
      fired: Xyz;
    };
  };

  stopAutowalk: EmptyObject;
  conveyor: Simplify<
    {
      moving: boolean;
    } & Omit<
      ItemConfigMap<RoomId, RoomItemId, SceneryName>["conveyor"],
      /** omit disappearing since it gets this now from @see BaseItemState.disappearing with a slightly different type */
      "disappearing"
    > // copying the config into the state means that these settings are mutable at run-time. eg, by switches
  >;
  switch: {
    /**
     * the frame this switch was last touched on. Some touches (switched, scrolls) only count if they are touched and weren't
     * already touched on the previous frame
     */
    lastToggledAtRoomTime: number;
    setting: SwitchSetting;
  };
  button: {
    pressed: boolean;
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
