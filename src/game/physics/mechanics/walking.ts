import {
  addXyz,
  directionsXy,
  multiplyMatrixVector,
  perpendicularXyz,
  unitVectors,
  xyOnlyMatrix,
} from "@/utils/vectors/vectors";
import {
  headsGlideAcel,
  heelsJumpForwardDecel,
  playerWalkAcceldPixPerMsSq,
  playerWalkStopAccelPixPerMsSq,
  playerWalkTerminalSpeedPixPerMs,
} from "../mechanicsConstants";
import type { PlayableItem } from "@/model/ItemInPlay";
import { type MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import {
  accelerateToSpeed,
  instantAccelToSpeed,
} from "../../../utils/vectors/accelerateUpToSpeed";
import { fadeSpeedInDirection } from "../../../utils/vectors/fadeSpeedInDirection";

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
    state: { autoWalkDistance, standingOn, facing, teleporting, vel },
  } = playableItem;

  const directionOfWalk =
    autoWalkDistance > 0 ? facing : (
      directionsXy.find((d) => {
        return inputState[d] === true;
      })
    );

  const maxWalkSpeed = playerWalkTerminalSpeedPixPerMs[type];

  if (teleporting !== null) {
    // do no walking while teleporting
    return {};
  }

  // handle 'walking' while ascending/falling:
  if (type === "heels") {
    if (standingOn === null) {
      // heels has mandatory forward motion while jumping, but decelerates:
      return {
        accel: fadeSpeedInDirection({
          vel,
          travelDirection: unitVectors[facing],
          deceleration: heelsJumpForwardDecel,
          deltaMS,
        }),
      };
    } else {
      if (inputState.jump) {
        return {
          accel: instantAccelToSpeed({
            vel,
            speed: maxWalkSpeed,
            unitD: unitVectors[facing],
            deltaMS,
          }),
        };
      }
    }
  }

  const action =
    standingOn === null && vel.z < 0 ? "falling"
    : directionOfWalk === undefined ? "idle"
    : "moving";

  const isGliding = vel.z < 0 && type === "head";
  const acc = isGliding ? headsGlideAcel : playerWalkAcceldPixPerMsSq[type];
  const deacc =
    isGliding ? -headsGlideAcel : playerWalkStopAccelPixPerMsSq[type];

  // normal walking
  if (directionOfWalk !== undefined) {
    const directionPressedUnitVector = unitVectors[directionOfWalk];

    return {
      accel: addXyz(
        accelerateToSpeed({
          vel,
          acc,
          unitD: directionPressedUnitVector,
          maxSpeed: maxWalkSpeed,
          deltaMS,
        }),
        fadeSpeedInDirection({
          vel: playableItem.state.vel,
          travelDirection: perpendicularXyz(directionPressedUnitVector),
          deceleration: deacc,
          deltaMS,
        }),
      ),
      stateDelta: {
        facing: directionOfWalk,
        action,
        // TODO: update autowalkdistance
      },
    };
  }

  // no direction pressed - we are idle and decelerate in whatever direction we're already headed:
  return {
    stateDelta: { action },
    accel: fadeSpeedInDirection({
      vel: playableItem.state.vel,
      travelDirection: multiplyMatrixVector(
        xyOnlyMatrix,
        playableItem.state.vel,
      ),
      deceleration: deacc,
      deltaMS,
    }),
  };
};
