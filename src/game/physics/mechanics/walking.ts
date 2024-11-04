import { directions, scaleXyz, unitVectors, originXyz } from "@/utils/vectors";
import { InputState } from "../../input/InputState";
import { playerSpeedPixPerMs } from "../mechanicsConstants";
import { PlayableItem } from "@/model/ItemInPlay";
import { MechanicResult } from "../MechanicResult";
import { PlayableCharacter } from "@/model/modelTypes";

/**
 * walking, but also gliding and changing direction mid-air
 */
export function walking(
  playableItem: PlayableItem,
  inputState: InputState,
  deltaMS: number,
): MechanicResult<PlayableCharacter> {
  const {
    type,
    state: { jumpRemaining },
  } = playableItem;

  const directionPressed = directions.find((d) => {
    return inputState[d] === true;
  });

  // unit vector in direction of movement
  const directionVector =
    directionPressed !== undefined || jumpRemaining > 0
      ? unitVectors[playableItem.state.facing]
      : originXyz;

  return {
    positionDelta: scaleXyz(
      directionVector,
      playerSpeedPixPerMs[type] * deltaMS,
    ),
    stateDelta:
      directionPressed !== undefined
        ? {
            // TODO: heels can't change direction while jumping
            facing: directionPressed,
            movement: "moving",
          }
        : jumpRemaining === 0
          ? { movement: "idle" }
          : {},
  };
}
