import {
  originXy,
  originXyz,
  scaleXyz,
  subXyz,
  xyEqual,
  xyzMagnitude,
} from "@/utils/vectors/vectors";
import {
  heelsJumpForwardSpeedFraction,
  heelsJumpForwardDecel,
  moveSpeedPixPerMs,
  playerWalkAcceldPixPerMsSq,
  playerWalkStopAccelPixPerMsSq,
  walkMinSpeedPixPerMs,
} from "../mechanicsConstants";
import { isItemType, type PlayableItem } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { accelerateToSpeed } from "@/utils/vectors/accelerateUpToSpeed";
import { emptyInput } from "@/game/input/InputState";

const stopWalking = {
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<CharacterName, string>;

/**
 * walking, but also gliding and changing direction mid-air
 */
export const walking = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  { inputState: gameStateInputState, currentCharacterName }: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId> => {
  const {
    type,
    state: {
      action,
      autoWalk,
      standingOn,
      facing,
      teleporting,
      vels: { walking: previousWalkingVel, gravity: gravityVel },
    },
  } = playableItem;

  const isCurrentCharacter = currentCharacterName === playableItem.id;
  // we allow autowalking when character isn't current, so the walking should still be run,
  // but the input is always empty so all other walking should be cut off"
  const effectiveInputState =
    isCurrentCharacter ? gameStateInputState : emptyInput;

  // heels does the walking for headOverHeels, so we need to use the heels walking speed:
  const effectiveWalkingCharacter = type === "headOverHeels" ? "heels" : type;

  const walkVector = autoWalk ? facing : effectiveInputState.direction;

  const maxWalkSpeed = moveSpeedPixPerMs[effectiveWalkingCharacter];

  if (teleporting !== null || action === "death") {
    // do no walking while teleporting or showing dying animation:
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
      if (effectiveInputState.jump) {
        const jumpDirectionXy =
          xyEqual(walkVector, originXy) ? facing : walkVector;
        const isStandingOnSpring = isItemType("spring")(standingOn);
        const walkJumpFraction =
          isStandingOnSpring ? 1 : heelsJumpForwardSpeedFraction;
        return {
          movementType: "vel",
          vels: {
            walking: scaleXyz(
              { ...jumpDirectionXy, z: 0 },
              maxWalkSpeed * walkJumpFraction,
            ),
          },
          //stateDelta: { facing: jumpDirection },
        };
      }
    }
  }

  const isFalling = standingOn === null && gravityVel.z < 0;

  if (!xyEqual(walkVector, originXyz)) {
    if (isFalling) {
      // head's 'walking' to glide while falling - this has no accel
      // and is always max walking speed (to help get into small gaps):
      return {
        movementType: "vel",
        vels: {
          walking: scaleXyz({ ...walkVector, z: 0 }, maxWalkSpeed),
        },
        stateDelta: {
          facing: walkVector,
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
            acc: playerWalkAcceldPixPerMsSq[effectiveWalkingCharacter],
            deltaMS,
            maxSpeed: maxWalkSpeed,
            unitD: walkVector,
            crossComponentFade:
              playerWalkStopAccelPixPerMsSq[effectiveWalkingCharacter],
            minVelocity: walkMinSpeedPixPerMs[effectiveWalkingCharacter],
          }),
        },
        stateDelta: {
          facing: walkVector,
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
    previousSpeed -
      playerWalkStopAccelPixPerMsSq[effectiveWalkingCharacter] * deltaMS,
    0,
  );
  return {
    movementType: "vel",
    vels: {
      walking: scaleXyz(
        previousDirection,
        newSpeed < walkMinSpeedPixPerMs[effectiveWalkingCharacter] ?
          0
        : newSpeed,
      ),
    },
    stateDelta: { action: isFalling ? "falling" : "idle" },
  };
};
