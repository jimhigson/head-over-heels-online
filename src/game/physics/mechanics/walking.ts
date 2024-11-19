import { directions, scaleXyz, unitVectors } from "@/utils/vectors";
import { playerWalkSpeedPixPerMs } from "../mechanicsConstants";
import type { PlayableItem } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const walking = <RoomId extends string>(
  playableItem: PlayableItem<RoomId>,
  { inputState }: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type,
    state: { autoWalkDistance, standingOn, facing, teleporting },
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
        const ascending = playableItem.state.velZ > 0;
        const action = ascending ? "moving" : "falling";

        if (directionPressed === undefined) {
          // I vary from the original game in that head ca jump straight up (original
          // allowed change of direction while jumping but not no direction) - the original
          // allowed falling straight down (like I do)
          return {
            stateDelta: {
              action,
            },
          };
        } else {
          // head can always change direction mid-air, and can fall vertically from a jump
          return {
            positionDelta: scaleXyz(
              unitVectors[directionPressed],
              walkDistance,
            ),
            stateDelta: {
              facing: directionPressed,
              action,
            },
          };
        }
      }
      case "heels":
        // we have the option to fall forward, or vertically, but no option
        // to change direction.
        // This is different from the original game, where heels fell vertically
        // or jumped with mandatory forward motion
        if (directionPressed === facing) {
          return {
            positionDelta: scaleXyz(
              unitVectors[facing],
              walkDistance *
                // heel's forward movement is reduced when not on the ground - in the original game this is
                // really only while descending, but this value keeps the overall jump distance the same
                0.6,
            ),
          };
        } else {
          return unitMechanicalResult;
        }
    }
  }

  // normal walking
  if (directionPressed !== undefined) {
    return {
      positionDelta: scaleXyz(unitVectors[directionPressed], walkDistance),
      stateDelta: {
        facing: directionPressed,
        action: "moving",
      },
    };
  }

  // whenever we're idle, the walking rounding error resets so the character sits on their 'true'
  // pixel again for the sake of the next walk movement
  return { stateDelta: { action: "idle" } };
};
