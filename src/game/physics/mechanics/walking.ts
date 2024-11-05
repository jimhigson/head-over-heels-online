import {
  directions,
  scaleXyz,
  unitVectors,
  originXyz,
} from "@/utils/vectors";
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

  const walkVector = scaleXyz(
    directionVector,
    playerSpeedPixPerMs[type] * deltaMS,
  );

  return {
    positionDelta: walkVector,
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
