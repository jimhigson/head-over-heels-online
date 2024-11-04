import { PlayableItem } from "@/model/ItemInPlay";
import { playerJumpHeight, playerSpeedPixPerMs } from "../mechanicsConstants";
import { MechanicResult, unitMechanicalResult } from "../MechanicResult";
import { InputState } from "../../input/InputState";
import { PlayableCharacter } from "@/model/modelTypes";

export const jumping = (
  characterItem: PlayableItem,
  { jump: jumpInput }: InputState,
  deltaMS: number,
): MechanicResult<PlayableCharacter> => {
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
    playerSpeedPixPerMs[type] * deltaMS,
    isJumpStart ? playerJumpHeight[type] : jumpRemaining,
  );

  return {
    stateDelta: isJumpStart
      ? {
          movement: "moving",
          standingOn: null,
          jumpRemaining: playerJumpHeight[type],
        }
      : {
          movement: "moving",
          jumpRemaining: Math.max(jumpRemaining - zMovement, 0),
        },
    positionDelta: { z: zMovement },
  };
};
