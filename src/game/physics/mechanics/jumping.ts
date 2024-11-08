import { PlayableItem } from "@/model/ItemInPlay";
import { jumpSpeedPixPerMs, playerJumpHeight } from "../mechanicsConstants";
import { MechanicResult } from "../MechanicResult";
import { InputState } from "../../input/InputState";
import { CharacterName } from "@/model/modelTypes";
import { roundWithError } from "../../../utils/roundWithError";

export const jumping = (
  characterItem: PlayableItem,
  { jump: jumpInput }: InputState,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type,
    state: { jumpRemaining, jumpRoundingError: roundingErrorCarriedForward },
  } = characterItem;

  if (jumpInput && characterItem.state.standingOn?.type === "teleporter") {
    // you can't jump from a teleporter!
    return {};
  }

  const isCharacterStandingOnSomethingCanJumpOff =
    characterItem.state.standingOn !== null &&
    // can jump off anything except a teleporter (because the jump button is also used
    // to teleport)
    characterItem.state.standingOn.type !== "teleporter";

  const isJumpStart = jumpInput && isCharacterStandingOnSomethingCanJumpOff;

  if (!isJumpStart && jumpRemaining === 0) {
    // not jumping - we do nothing
    return { stateDelta: { jumpRoundingError: 0 } };
  }

  const zMovementCeiling = isJumpStart ? playerJumpHeight[type] : jumpRemaining;
  // cap the vertical movement according to how much jump is left.
  // if no jump is remaining, this will be zero
  const zMovementFloat = Math.min(
    jumpSpeedPixPerMs * deltaMS + roundingErrorCarriedForward,
    zMovementCeiling,
  );

  const { valueInt: zMovementInt, roundingError } =
    roundWithError(zMovementFloat);

  console.log(
    "jumping",
    "float",
    zMovementFloat,
    "error",
    roundingError,
    "rounded",
    zMovementInt,
  );

  return {
    stateDelta:
      isJumpStart ?
        {
          movement: "moving",
          // whatever we were standing on, we aren't any more:
          standingOn: null,
          jumpRemaining: playerJumpHeight[type],
          jumpRoundingError: roundingError,
          jumped: true,
        }
        // jumping, but not starting a jump
      : {
          movement: "moving",
          jumpRemaining: Math.max(jumpRemaining - zMovementInt, 0),
          jumpRoundingError: roundingError,
        },
    positionDelta: { z: zMovementInt },
  };
};
