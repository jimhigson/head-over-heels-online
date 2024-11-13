import type { Xy } from "@/utils/vectors";
import {
  directions,
  originXy,
  originXyz,
  scaleXyz,
  unitVectors,
} from "@/utils/vectors";
import type { InputState } from "../../input/InputState";
import { playerSpeedPixPerMs } from "../mechanicsConstants";
import type { PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { RoundedWithError } from "@/utils/roundWithError";
import { roundWithError } from "@/utils/roundWithError";

const zeroValueError = Object.freeze({ valueInt: 0, roundingError: 0 });

const withError = (
  input: MechanicResult<CharacterName>,
  previousRoundingError: Xy,
): MechanicResult<CharacterName> => {
  const { positionDelta, stateDelta } = input;

  if (positionDelta === undefined) {
    return {
      // if movement is stopped, throw away the rounding error and go back to whole pixels:
      stateDelta: { ...stateDelta, walkRoundingError: originXy },
    };
  }
  const { x: deltaX = 0, y: deltaY = 0, z: deltaZ } = positionDelta;

  // we only want to keep the rounding error in axes where there is some movement.
  // ie, if there was rounding error in the x axis, but the character is now moving in y,
  // the x rounding error meeds to be reset to 0 since it is no longer necessary to handle small
  // (sub-1px) movement per frame
  const { roundingError: xRoundingError, valueInt: xInt }: RoundedWithError =
    deltaX === 0 ? zeroValueError : (
      roundWithError(deltaX + previousRoundingError.x)
    );

  const { roundingError: yRoundingError, valueInt: yInt }: RoundedWithError =
    deltaY === 0 ? zeroValueError : (
      roundWithError(deltaY + previousRoundingError.y)
    );

  return {
    positionDelta: { x: xInt, y: yInt, z: deltaZ },
    stateDelta: {
      ...stateDelta,
      walkRoundingError: { x: xRoundingError, y: yRoundingError },
    },
  };
};

export const walking = (
  playableItem: PlayableItem,
  inputState: InputState,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  return withError(
    walkingImpl(playableItem, inputState, deltaMS),
    playableItem.state.walkRoundingError,
  );
};

/**
 * walking, but also gliding and changing direction mid-air
 */
const walkingImpl = (
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

  const walkDistance = playerSpeedPixPerMs[type] * deltaMS;

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
