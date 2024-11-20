import type {
  RoomState,
  CharacterName,
  Campaign,
} from "../../model/modelTypes";
import type { PlanetName } from "../../sprites/planets";
import type { InputState, KeyAssignment } from "../input/InputState";
import type { RenderOptions } from "../RenderOptions";
import type { Emitter } from "mitt";
import type { ApiEvents } from "../GameApi";
import type { ItemInPlay, PlayableItem } from "@/model/ItemInPlay";
import type { EntryState } from "./EntryState";

export const currentRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
): RoomState<PlanetName, RoomId> =>
  // assuming both players haven't lost all their lives, or this is not reliable!
  gameState.characterRooms[gameState.currentCharacterName]!.room;

/*
  export const pickupCollected = <RoomId extends string>(
  pickupsCollected: PickupsCollected<RoomId>,
  roomId: RoomId,
  pickupItemId: string,
): boolean => pickupsCollected[roomId][pickupItemId] === true;
*/

export const currentPlayableItem = <RoomId extends string>(
  gameState: GameState<RoomId>,
): PlayableItem =>
  // assuming both players haven't lost all their lives, or this is not reliable!
  gameState.characterRooms[gameState.currentCharacterName]!.room.items[
    gameState.currentCharacterName
  ]!;

export const playableItem = <C extends CharacterName>(
  gameState: AnyGameState,
  character: CharacterName,
): ItemInPlay<C> | undefined => {
  return gameState.characterRooms[character]?.room.items[character] as
    | ItemInPlay<C>
    | undefined;
};

export type RoomPickupsCollected = Record<string, true>;

export type PickupsCollected<RoomId extends string> = Record<
  RoomId,
  RoomPickupsCollected
>;

type CharacterRooms<RoomId extends string> = {
  [C in CharacterName]:
    | {
        room: RoomState<PlanetName, RoomId>;
        entryState: EntryState;
      }
    | undefined;
};

export type GameState<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  keyAssignment: KeyAssignment;
  currentCharacterName: CharacterName;
  inputState: InputState;

  /** partial because character can have lost all lives */
  characterRooms: CharacterRooms<RoomId>;
  renderOptions: RenderOptions<RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
  // pickups don't respawn, so we keep track of which ones have been picked up
  // outside of the room's state
  pickupsCollected: PickupsCollected<RoomId>;
  /** how many ms has this game been played for? */
  gameTime: number;
};

// if you don't care about the RoomId generic, you can't emit events (since they are callbacks)
// but that's fine since most code never emits events
export type AnyGameState = Omit<GameState<string>, "events" | "renderOptions">;
