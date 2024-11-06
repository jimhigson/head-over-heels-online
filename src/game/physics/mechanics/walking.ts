import { directions, originXyz, scaleXyz, unitVectors } from "@/utils/vectors";
import { InputState } from "../../input/InputState";
import { playerSpeedPixPerMs } from "../mechanicsConstants";
import { PlayableItem } from "@/model/ItemInPlay";
import { MechanicResult } from "../MechanicResult";
import { CharacterName } from "@/model/modelTypes";

/* 

why?

* original game ran at 25fps
* minimum move speed of 1px/frame was feasible
* now that is too fast, so many movements move less than 1 frame
* however, collision detection and all other mechanics should still use the whole pixel positions

need subpositions to do:

* walking
* falling
* jumping

for: 

* playable item
* fallable item (for animated falling downwards)
* enemies that move
* anything else that moves

reset subpositions when:

* stop moving
* start jumping
* change direction of walk

how about:
* MechanicResult has a subpositionReset flag

*/
/*
const roundVector = ({ x, y, z }: Xyz) => {
  const xRound = Math.round(x);
  const yRound = Math.round(y);
  const zRound = Math.round(z);
  return {
    rounded: {
      x: xRound,
      y: yRound,
      z: zRound,
    },
    remainder: {
      x: x - xRound,
      y: y - yRound,
      z: z - zRound,
    },
  };
};
*/
/**
 * walking, but also gliding and changing direction mid-air
 */
export function walking(
  playableItem: PlayableItem,
  inputState: InputState,
  deltaMS: number,
): MechanicResult<CharacterName> {
  const {
    type,
    state: { jumpRemaining, autoWalkDistance, standingOn, facing, jumped },
  } = playableItem;

  const directionPressed = directions.find((d) => {
    return inputState[d] === true;
  });

  const walkDistance = playerSpeedPixPerMs[type] * deltaMS;

  // just entered a room and autowalkig through the door
  if (autoWalkDistance > 0) {
    return {
      positionDelta: scaleXyz(unitVectors[facing], walkDistance),
      stateDelta: {
        autoWalkDistance: Math.max(autoWalkDistance - walkDistance, 0),
      },
    };
  }

  // handle: ascending in a jump,
  // falling from a jump,
  // or falling from walking off something
  // TODO: for heels, track if jumped off or fell off - mandatory
  // forward movement while falling if jumped off, but no horizontal
  // movement if fell off
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

  return { stateDelta: { movement: "idle" } };
}
