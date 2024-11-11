import type { KeyAssignment } from "../input/listenForInput";
import type {
  RoomState,
  CharacterName,
  Campaign,
} from "../../model/modelTypes";
import type { PlanetName } from "../../sprites/planets";
import type { InputState } from "../input/InputState";
import type { RenderOptions } from "../RenderOptions";
import type { Emitter } from "mitt";
import type { ApiEvents } from "../GameApi";

export const currentRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
): RoomState<PlanetName, RoomId> =>
  gameState.characterRooms[gameState.currentCharacterName];

export const pickupCollected = <RoomId extends string>(
  gameState: GameState<RoomId>,
  roomId: RoomId,
  pickupItemId: string,
): boolean => gameState.pickupsCollected[roomId][pickupItemId] === true;

export const characterItem = (
  gameState: AnyGameState,
  character: CharacterName,
) => {
  return gameState.characterRooms[character].items[character];
};

export type PickupsCollected<RoomId extends string> = Record<
  RoomId,
  Record<string, true>
>;

export type GameState<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  keyAssignment: KeyAssignment;
  currentCharacterName: CharacterName;
  inputState: InputState;

  characterRooms: Record<CharacterName, RoomState<PlanetName, RoomId>>;
  renderOptions: RenderOptions<RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
  // pickups don't respawn, so we keep track of which ones have been picked up
  // outside of the room's state
  pickupsCollected: PickupsCollected<RoomId>;
};

// if you don't care about the RoomId generic, you can't emit events (since they are callbacks)
// but that's fine since most code never emits events
export type AnyGameState = Omit<GameState<string>, "events" | "renderOptions">;
