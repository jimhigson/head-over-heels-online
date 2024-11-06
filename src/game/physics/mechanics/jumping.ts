import { PlayableItem } from "@/model/ItemInPlay";
import { jumpSpeedPixPerMs, playerJumpHeight } from "../mechanicsConstants";
import { MechanicResult, unitMechanicalResult } from "../MechanicResult";
import { InputState } from "../../input/InputState";
import { CharacterName } from "@/model/modelTypes";

export const jumping = (
  characterItem: PlayableItem,
  { jump: jumpInput }: InputState,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type,
    state: { jumpRemaining },
  } = characterItem;

  const isCharacterStandingOnSomethingCanJumpOff =
    characterItem.state.standingOn !== null &&
    // can jump off anything except a teleporter (because the jump button is also used
    // to teleport)
    characterItem.state.standingOn.type !== "teleporter";

  const isJumpStart = jumpInput && isCharacterStandingOnSomethingCanJumpOff;

  if (!isJumpStart && jumpRemaining === 0) {
    // not jumping
    return unitMechanicalResult;
  }

  // cap the vertical movement according to how much jump is left.
  // if no jump is remaining, this will be zero
  const zMovement = Math.min(
    jumpSpeedPixPerMs * deltaMS,
    isJumpStart ? playerJumpHeight[type] : jumpRemaining,
  );

  return {
    stateDelta:
      isJumpStart ?
        {
          movement: "moving",
          standingOn: null,
          jumpRemaining: playerJumpHeight[type],
          jumped: true,
        }
      : {
          movement: "moving",
          jumpRemaining: Math.max(jumpRemaining - zMovement, 0),
        },
    positionDelta: { z: zMovement },
  };
};
