import type { PlayableItem } from "@/model/ItemInPlay";
import { jumpSpeedPixPerMs, playerJumpHeight } from "../mechanicsConstants";
import type { MechanicResult } from "../MechanicResult";
import type { InputState } from "../../input/InputState";
import type { CharacterName } from "@/model/modelTypes";

export const jumping = (
  characterItem: PlayableItem,
  { jump: jumpInput }: InputState,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type,
    state: { jumpRemaining },
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
    return {};
  }

  const zMovementCeiling = isJumpStart ? playerJumpHeight[type] : jumpRemaining;
  const targettedZDelta = jumpSpeedPixPerMs * deltaMS;

  // cap the vertical movement according to how much jump is left.
  // if no jump is remaining, this will be zero
  const zMovementFloat = Math.min(targettedZDelta, zMovementCeiling);

  return {
    stateDelta:
      isJumpStart ?
        {
          action: "moving",
          // whatever we were standing on, we aren't any more:
          standingOn: null,
          jumpRemaining: playerJumpHeight[type],
          jumped: true,
        }
        // jumping, but not starting a jump
      : {
          action: "moving",
          jumpRemaining: Math.max(jumpRemaining - zMovementFloat, 0),
        },
    positionDelta: { z: zMovementFloat },
  };
};
