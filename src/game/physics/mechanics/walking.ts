import {
  directionsXy4,
  originXyz,
  scaleXyz,
  subXyz,
  xyzMagnitude,
} from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import {
  heelsJumpForwardSpeedFraction,
  heelsJumpForwardDecel,
  walkSpeedPixPerMs,
  playerWalkAcceldPixPerMsSq,
  playerWalkStopAccelPixPerMsSq,
  walkMinSpeedPixPerMs,
} from "../mechanicsConstants";
import { isItemType, type PlayableItem } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { accelerateToSpeed } from "@/utils/vectors/accelerateUpToSpeed";

const stopWalking = {
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<CharacterName, string>;

/**
 * walking, but also gliding and changing direction mid-air
 */
export const walking = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  { inputState }: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId> => {
  const {
    type,
    state: {
      autoWalk,
      standingOn,
      facing,
      teleporting,
      vels: { walking: previousWalkingVel, gravity: gravityVel },
    },
  } = playableItem;

  const directionOfWalk =
    autoWalk ? facing : (
      directionsXy4.find((d) => {
        return inputState[d] === true;
      })
    );

  const maxWalkSpeed = walkSpeedPixPerMs[type];

  if (teleporting !== null) {
    // do no walking while teleporting
    return stopWalking;
  }

  // handle 'walking' while ascending/falling:
  if (type === "heels") {
    if (standingOn === null) {
      // heels has mandatory forward motion while jumping, but decelerates:
      if (playableItem.state.jumped) {
        return {
          movementType: "vel",
          vels: {
            walking: subXyz(
              previousWalkingVel,
              scaleXyz(previousWalkingVel, heelsJumpForwardDecel * deltaMS),
            ),
          },
        };
      } else {
        // when heels walks off something, should always fall vertically (zero motion here)
        return stopWalking;
      }
    } else {
      if (inputState.jump) {
        const jumpDirection = directionOfWalk ?? facing;
        const isStandingOnSpring = isItemType("spring")(standingOn);
        const walkJumpFraction =
          isStandingOnSpring ? 1 : heelsJumpForwardSpeedFraction;
        return {
          movementType: "vel",
          vels: {
            walking: scaleXyz(
              unitVectors[jumpDirection],
              maxWalkSpeed * walkJumpFraction,
            ),
          },
          stateDelta: { facing: jumpDirection },
        };
      }
    }
  }

  const isFalling = standingOn === null && gravityVel.z < 0;

  if (directionOfWalk !== undefined) {
    if (isFalling) {
      // head's 'walking' to glide while falling - this has no accel
      // and is always max walking speed (to help get into small gaps):
      return {
        movementType: "vel",
        vels: {
          walking: scaleXyz(unitVectors[directionOfWalk], maxWalkSpeed),
        },
        stateDelta: {
          facing: directionOfWalk,
          action: "falling",
        },
      };
    } else {
      // normal walking on the ground:
      return {
        movementType: "vel",
        vels: {
          walking: accelerateToSpeed({
            vel: previousWalkingVel,
            acc: playerWalkAcceldPixPerMsSq[type],
            deltaMS,
            maxSpeed: maxWalkSpeed,
            unitD: unitVectors[directionOfWalk],
            crossComponentFade: playerWalkStopAccelPixPerMsSq[type],
            minVelocity: walkMinSpeedPixPerMs[type],
          }),
        },
        stateDelta: {
          facing: directionOfWalk,
          action: "moving",
        },
      };
    }
  }

  // no direction pressed - we are not walking. Fade the velocity.
  const previousSpeed = xyzMagnitude(previousWalkingVel);
  const previousDirection =
    previousSpeed === 0 ? originXyz : (
      scaleXyz(previousWalkingVel, 1 / previousSpeed)
    );
  const newSpeed = Math.max(
    previousSpeed - playerWalkStopAccelPixPerMsSq[type] * deltaMS,
    0,
  );
  return {
    movementType: "vel",
    vels: {
      walking: scaleXyz(
        previousDirection,
        newSpeed < walkMinSpeedPixPerMs[type] ? 0 : newSpeed,
      ),
    },
    stateDelta: { action: isFalling ? "falling" : "idle" },
  };
};
