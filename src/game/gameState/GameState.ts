import type { IndividualCharacterName } from "../../model/modelTypes";
import { type CharacterName } from "../../model/modelTypes";
import type { PlayableEntryState } from "./PlayableEntryState";
import type { InputStateTrackerInterface } from "../input/InputStateTracker";
import type { RoomState } from "../../model/RoomState";

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

export type GameState<RoomId extends string> = {
  /**
   * TODO: the campaign is non-cyclic, serialisable json that never mutates
   * - this is being moved to the store
   */
  //campaign: Campaign<RoomId>;
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
   * an incrementing number of how many times we have progressed the game engine
   * each progression having its own unique number
   */
  progression: number;

  /**
   * 0 = paused, 1 = normal speed, 0.5 = slow motion, 2 = double speed, etc
   */
  gameSpeed: number;
};

// if you don't care about the RoomId generic, you can't emit events (since they are callbacks)
// but that's fine since most code never emits events
export type AnyGameState = Omit<GameState<string>, "events" | "renderOptions">;
