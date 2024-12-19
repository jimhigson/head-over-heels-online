import type { IndividualCharacterName } from "../../model/modelTypes";
import {
  type RoomState,
  type CharacterName,
  type Campaign,
} from "../../model/modelTypes";
import type { PlanetName } from "../../sprites/planets";
import type { InputState, KeyAssignment } from "../input/InputState";
import type { RenderOptions } from "../RenderOptions";
import type { Emitter } from "mitt";
import type { GameEvents } from "../GameApi";
import type { PlayableEntryState } from "./PlayableEntryState";

export const selectCurrentRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
): RoomState<PlanetName, RoomId> =>
  // use a ! here because so long as a game is in progress, there should be a current room
  gameState.characterRooms[gameState.currentCharacterName]!;

export type RoomPickupsCollected = Record<string, true>;

export type PickupsCollected<RoomId extends string> = Record<
  RoomId,
  RoomPickupsCollected
>;

type CharacterRooms<RoomId extends string> =
  /**
   * partial here because character can have lost all lives, or headOverHeels doesn't initially exist
   * - all 3 can never exist at the same time
   */
  Partial<{
    [C in CharacterName]: RoomState<PlanetName, RoomId>;
  }>;

export type GameState<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  keyAssignment: KeyAssignment;
  currentCharacterName: CharacterName;
  /** 
    if playing combined, which character was paid immediately before combining?
    this allows to give the right character control after uncombining
    */
  previousPlayable?: IndividualCharacterName;
  inputState: InputState;

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

  renderOptions: RenderOptions<RoomId>;
  /** TODO: is this really state? */
  events: Emitter<GameEvents<RoomId>>;
  // pickups don't respawn, so we keep track of which ones have been picked up
  // outside of the room's state
  pickupsCollected: PickupsCollected<RoomId>;
  /** how many ms has this game been played for? */
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
