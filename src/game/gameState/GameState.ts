import { KeyAssignment } from "../input/listenForInput";
import { RoomState, CharacterName, Campaign } from "../../model/modelTypes";
import { PlanetName } from "../../sprites/planets";
import { InputState } from "../input/InputState";
import { RenderOptions } from "../RenderOptions";
import { Emitter } from "mitt";
import { ApiEvents } from "../GameApi";

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
