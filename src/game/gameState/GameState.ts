import { Simplify } from "type-fest";
import { KeyAssignment } from "../input/listenForInput";
import { ItemState, ItemType } from "../../Item";
import { RoomState, PlayableCharacter } from "../../modelTypes";
import { PlanetName } from "../../sprites/planets";
import { InputState } from "../input/InputState";

export const currentCharacter = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => gameState.playableCharacters[gameState.currentCharacter];

export type EitherCharacterState<RoomId extends string> = {
  lives: number;
  shield: number;
  // if both chars are in same room, will be ===
  roomState: RoomState<PlanetName, RoomId>;
  // the item object in the current room representing this character
  item: ItemState<"player">; // TODO: question if JSONITem is the right name!
};

export type GameState<RoomId extends string> = {
  keyAssignment: KeyAssignment;
  currentCharacter: PlayableCharacter;
  inputState: InputState;

  playableCharacters: {
    head: Simplify<
      EitherCharacterState<RoomId> & {
        hasHooter: boolean;
        /** how many big jumps we can do */
        jumps: number;
        donuts: number;
      }
    >;
    heels: Simplify<
      EitherCharacterState<RoomId> & {
        hasBag: boolean;
        /** how many steps we can go fast for */
        fast: number;
        carrying: ItemType | null;
      }
    >;
  };
};
