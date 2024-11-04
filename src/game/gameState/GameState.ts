import { KeyAssignment } from "../input/listenForInput";
import { RoomState, PlayableCharacter } from "../../model/modelTypes";
import { PlanetName } from "../../sprites/planets";
import { InputState } from "../input/InputState";

export const currentRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
): RoomState<PlanetName, RoomId> =>
  gameState.characterRooms[gameState.currentCharacter];

export type GameState<RoomId extends string> = {
  keyAssignment: KeyAssignment;
  currentCharacter: PlayableCharacter;
  inputState: InputState;

  characterRooms: {
    head: RoomState<PlanetName, RoomId>;
    heels: RoomState<PlanetName, RoomId>;
  };
};
