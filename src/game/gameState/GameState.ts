import { Simplify } from "type-fest";
import { KeyAssignment } from "../input/listenForInput";
import { ItemType } from "../../Item";
import { LoadedRoom, PlayableCharacter } from "../../modelTypes";
import { PlanetName } from "../../sprites/planets";
import { InputState } from "../input/InputState";

export type EitherCharacterState<RoomId extends string> = {
  lives: number;
  shield: number;
  // if both chars are in same room, will be ===
  roomState: LoadedRoom<PlanetName, RoomId>;
};

export type GameState<RoomId extends string> = {
  keyAssignment: KeyAssignment;
  currentCharacter: PlayableCharacter;
  inputState: InputState;

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
