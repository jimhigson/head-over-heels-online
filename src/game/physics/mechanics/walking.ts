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
import type { CharacterName } from "../../../model/modelTypes";
import { accelerateToSpeed2 } from "../../../utils/vectors/accelerateUpToSpeed";
import {
  originXyz,
  lengthXyz,
  subXyz,
  scaleXyz,
  xyEqual,
  originXy,
  unitVector,
} from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import { fastStepsRemaining } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { emptyInput } from "../../input/InputState";

const stopWalking = {
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<CharacterName, string>;

export const walking = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId> => {
  // we wrap walking implementation and add analysis of how far walked etc
  const result = walkingImpl(playableItem, gameState, deltaMS);

  if (result.movementType === "vel" && result.vels.walking !== undefined) {
    const speed = lengthXyz(result.vels.walking);

    result.stateDelta = Object.assign(result.stateDelta || {}, {
      walkDistance:
        speed === 0 ? 0 : playableItem.state.walkDistance + speed * deltaMS,
    });

    if (
      playableItem.type === "head" &&
      // head's walk distance is only counted when standing on something,
      // since this is only really collected for the sake of counting down
      // fast steps, and they don't tick down while in the air:
      playableItem.state.standingOn !== null
    ) {
      result.stateDelta = Object.assign(result.stateDelta || {}, {
        totalWalkDistance:
          playableItem.state.totalWalkDistance + speed * deltaMS,
      });
    }
  }

  return result;
};

/**
 * implementation of the mechanic for walking, but also gliding and
 * (head) changing direction mid-air
 */
const walkingImpl = <RoomId extends string>(
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
      walkDistance,
      vels: { walking: previousWalkingVel, gravity: gravityVel },
    },
  } = playableItem;

  const isCurrentCharacter = currentCharacterName === playableItem.id;
  // we allow autowalking when character isn't current, so the walking should still be run,
  // but the input is always empty so all other walking should be cut off"
  const effectiveInputState =
    isCurrentCharacter ? gameStateInputState : emptyInput;

  const isFalling = standingOn === null && gravityVel.z < 0;
  const hasFastSteps =
    type === "head" &&
    fastStepsRemaining(playableItem.state) > 0 &&
    standingOn !== null;

  const useSpeedOfCharacter =
    type === "headOverHeels" ?
      // falling (gliding) horizontal movement is at head's speed, not sped up by heels:
      isFalling ? "head"
        // heels does the walking for headOverHeels, so we need to use the heels walking speed:
      : "heels"
    : hasFastSteps ?
      // head fast-walking is effectively heels:
      "heels"
      // no special-case, use player's natural speed:
    : type;

  const walkVector = autoWalk ? facing : effectiveInputState.direction;

  const maxWalkSpeed = moveSpeedPixPerMs[useSpeedOfCharacter];

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
        // standing on something and jumping
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
          stateDelta: { facing: unitVector(jumpDirectionXy) },
        };
      }
    }
  }

  const hasWalkVector = lengthXyz(walkVector) !== 0;

  if (hasWalkVector) {
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
          walking: accelerateToSpeed2({
            vel: previousWalkingVel,
            acc: playerWalkAcceldPixPerMsSq[useSpeedOfCharacter],
            deltaMS,
            maxSpeed: maxWalkSpeed,
            unitD: walkVector,
            minSpeed: 0,
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
  const previousSpeed = lengthXyz(previousWalkingVel);

  if (walkDistance > 0 && walkDistance < 1) {
    // stopped walking, having moved some distance but less than a pixel - one pixel
    // is the minimum move distance so add on the remaining to round up to a pixel:
    return {
      movementType: "position",
      posDelta: scaleXyz(facing, 1 - walkDistance),
      stateDelta: { action: isFalling ? "falling" : "idle", walkDistance: 0 },
    };
  }

  const previousDirection =
    previousSpeed === 0 ? originXyz : (
      scaleXyz(previousWalkingVel, 1 / previousSpeed)
    );

  // decelerate down towards stationary:
  const newSpeed = Math.max(
    previousSpeed -
      playerWalkStopAccelPixPerMsSq[useSpeedOfCharacter] * deltaMS,
    0,
  );
  return {
    movementType: "vel",
    vels: {
      walking: scaleXyz(
        previousDirection,
        newSpeed < walkMinSpeedPixPerMs[useSpeedOfCharacter] ? 0 : newSpeed,
      ),
    },
    stateDelta: { action: isFalling ? "falling" : "idle" },
  };
};
