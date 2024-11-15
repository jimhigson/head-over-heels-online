import { directions, originXyz, scaleXyz, unitVectors } from "@/utils/vectors";
import type { InputState } from "../../input/InputState";
import { playerWalkSpeedPixPerMs } from "../mechanicsConstants";
import type { PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const walking = (
  playableItem: PlayableItem,
  inputState: InputState,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type,
    state: {
      jumpRemaining,
      autoWalkDistance,
      standingOn,
      facing,
      jumped,
      teleporting,
    },
  } = playableItem;

  const directionPressed = directions.find((d) => {
    return inputState[d] === true;
  });

  const walkDistance = playerWalkSpeedPixPerMs[type] * deltaMS;

  // just entered a room and autowalking through the door
  if (autoWalkDistance > 0) {
    return {
      positionDelta: scaleXyz(unitVectors[facing], walkDistance),
      stateDelta: {
        autoWalkDistance: Math.max(autoWalkDistance - walkDistance, 0),
      },
    };
  }

  if (teleporting !== null) {
    // do no walking while teleporting
    return {};
  }

  // handle 'walking' while ascending/falling:
  if (standingOn === null) {
    switch (type) {
      case "head": {
        const direction =
          jumpRemaining > 0 ? directionPressed || facing : directionPressed;

        if (direction !== undefined) {
          // head can always change direction mid-air, and can fall vertically from a jump
          return {
            positionDelta: scaleXyz(unitVectors[direction], walkDistance),
            stateDelta: {
              facing: direction,
            },
          };
        } else {
          // fall vertically with no input:
          return {};
        }
      }
      case "heels":
        return {
          positionDelta:
            jumped ?
              // when heels jumps. the whole ascent and descent has to be moving in the jump direction
              scaleXyz(unitVectors[facing], walkDistance)
              // when heels jumps off, always drops vertically - no horizontal movement
            : originXyz,
          stateDelta: {},
        };
    }
  }

  // normal walking
  if (directionPressed !== undefined) {
    return {
      positionDelta: scaleXyz(unitVectors[directionPressed], walkDistance),
      stateDelta: {
        facing: directionPressed,
        movement: "moving",
      },
    };
  }

  // whenever we're idle, the walking rounding error resets so the character sits on their 'true'
  // pixel again for the sake of the next walk movement
  return { stateDelta: { movement: "idle" } };
};
