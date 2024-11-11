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

export type GameState<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  keyAssignment: KeyAssignment;
  currentCharacterName: CharacterName;
  inputState: InputState;

  characterRooms: Record<CharacterName, RoomState<PlanetName, RoomId>>;
  renderOptions: RenderOptions<RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
};
