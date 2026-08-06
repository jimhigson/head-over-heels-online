import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../model/modelTypes";
import { type RoomState } from "../../model/RoomState";
import { type Xy } from "../../utils/vectors/vectors";
import { type InputStateTrackerInterface } from "../input/InputStateTracker";
import { type PlayableEntryState } from "./PlayableEntryState";

export type RoomPickupsCollected = Record<string, true>;

export type PickupsCollected<RoomId extends string> = {
  /**
   * optional for each room - if no entry for the room, is considered that nothing is
   * picked up (keeps the save state size a bit more manageable)
   */
  [R in RoomId]?: RoomPickupsCollected;
};

/**
 * which room each character is in
 */
export type CharacterRooms<RoomId extends string> =
  /**
   * partial here because character can have lost all lives, or headOverHeels doesn't initially exist
   * - all 3 can never exist at the same time
   */
  Partial<{
    [C in CharacterName]: RoomState<RoomId, string>;
  }>;

export type GameState<RoomId extends string = string> = {
  currentCharacterName: CharacterName;
  /** 
    if playing combined, which character was paid immediately before combining?
    this allows to give the right character control after uncombining
    */
  previousPlayable?: IndividualCharacterName;
  inputStateTracker: InputStateTrackerInterface;

  characterRooms: CharacterRooms<RoomId>;

  /**
   * Some of the state describing how their current room was entered for each character.
   * this could include characters that are not currently in play; for example, if headOverHeels
   * enters and splits, the entry state for headOverHeels will be retained since if a player
   * loses a life they need to re-enter the room in the same way
   */
  entryState: Partial<{
    [C in CharacterName]: PlayableEntryState;
  }>;

  // pickups don't respawn, so we keep track of which ones have been picked up
  // outside of the room's state
  pickupsCollected: PickupsCollected<RoomId>;

  /**
   * How many ms has this game been played for? For most purposes the room time
   * or player time is more useful
   */
  gameTime: number;

  /**
   * the camera's target angle, as a (cos,sin) unit vector. Always a quarter
   * angle; always set - a fresh game starts at the base view (1,0). Saved with
   * the game, so reloading a save resumes the same angle. This is the DISCRETE
   * target angle: model-level consumers (input mapping, structure, sort)
   * always see the quarter-turn endpoint, even mid {@link cameraTransition} -
   * only rendering interpolates θ(t).
   */
  targetCameraAngle: Xy;

  /**
   * the animated rotation towards {@link targetCameraAngle}, present only
   * while one is playing. `fromAngle` is the continuous angle the current
   * turn started from - NOT necessarily a quarter angle: a rotate input
   * mid-turn retargets by re-anchoring fromAngle at the current interpolated
   * angle, rotating {@link targetCameraAngle} a further quarter, and
   * resetting progress - so a quick second tap sweeps 180° in one motion, and
   * an opposite tap cancels back. `progress` is the linear time fraction 0→1
   * over `durationMs` (easing is applied at render time, not here).
   */
  cameraTransition?: {
    fromAngle: Xy;
    /**
     * the signed arc this turn sweeps from `fromAngle`, in radians (positive
     * is anticlockwise). Carried explicitly so the camera always turns the
     * way the player pressed: each rotate input adds a quarter turn in its
     * direction to the remaining arc, so three anticlockwise taps sweep 270°
     * anticlockwise rather than taking the shorter 90° clockwise path to the
     * same endpoint
     */
    arc: number;
    /** linear time fraction, 0..1
     *
     * TODO: switch to physics-based inertial simulation with easing and (slight)
     * snapback
     */
    progress: number;
    /**
     * how long this transition takes: proportional to its arc, capped at the
     * full-quarter-turn duration - so a retargeted 180° sweep moves faster
     * rather than taking longer, and a cancel finishes quickly
     */
    durationMs: number;
    /**
     * initial slope of the easing curve (see hermiteEase): 0 for a fresh turn
     * (smoothstep); a retarget sets the slope that carries the previous
     * turn's angular velocity into this one, keeping the camera's speed
     * continuous - negative for a cancel still moving towards the old target
     */
    startSlope: number;
  };
};

// if you don't care about the RoomId generic, you can't emit events (since they are callbacks)
// but that's fine since most code never emits events
