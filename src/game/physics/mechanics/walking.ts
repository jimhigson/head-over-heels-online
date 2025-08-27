import type { CharacterName } from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import type { PressStatus } from "../../input/InputStateTracker";
import type { Mechanic } from "../MechanicResult";

import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import { accelerateToSpeed2 } from "../../../utils/vectors/accelerateUpToSpeed";
import {
  lengthXyz,
  originXy,
  originXyz,
  scaleXyz,
  subXyz,
  unitVector,
  xyEqual,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { fastStepsRemaining } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { isItemType, type PlayableItem } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import {
  heelsJumpForwardDecel,
  heelsJumpForwardSpeedFraction,
  moveSpeedPixPerMs,
  playerWalkAcceldPixPerMsSq,
} from "../mechanicsConstants";

const stopWalking = {
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<CharacterName, string, string>;

export const walking: Mechanic<CharacterName> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId, RoomItemId> => {
  // we wrap walking implementation and add analysis of how far walked etc
  const result = walkingImpl(playableItem, room, gameState, deltaMS);

  if (result.movementType === "vel" && result.vels.walking !== undefined) {
    const speed = lengthXyz(result.vels.walking);

    result.stateDelta = {
      ...result.stateDelta,
      walkDistance:
        speed === 0 ? 0 : playableItem.state.walkDistance + speed * deltaMS,
    };

    if (
      playableItem.type === "head" &&
      // head's walk distance is only counted when standing on something,
      // since this is only really collected for the sake of counting down
      // fast steps, and they don't tick down while in the air:
      playableItem.state.standingOnItemId !== null
    ) {
      result.stateDelta = {
        ...result.stateDelta,
        gameWalkDistance: playableItem.state.gameWalkDistance + speed * deltaMS,
      };
    }
  }

  if (
    playableItem.state.action === "idle" &&
    result.movementType === "vel" &&
    result.vels.walking !== undefined &&
    !xyzEqual(result.vels.walking, originXyz)
  ) {
    result.stateDelta = {
      ...result.stateDelta,
      walkStartFacing: playableItem.state.facing,
    };
  }

  return result;
};

/**
 * implementation of the mechanic for walking, but also gliding and
 * (head) changing direction mid-air
 */
const walkingImpl = <RoomId extends string, RoomItemId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  { inputStateTracker, currentCharacterName }: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId, RoomItemId> => {
  const {
    type,
    state: {
      action,
      autoWalk,
      standingOnItemId,
      facing,
      teleporting,
      walkDistance,
      walkStartFacing,
      vels: { walking: previousWalkingVel, gravity: gravityVel },
    },
  } = playableItem;

  const isCurrentCharacter = currentCharacterName === playableItem.id;
  // we allow autowalking when character isn't current, so the walking should still be run,
  // but the input is always empty so all other walking should be cut off"
  const jumpInput: PressStatus =
    isCurrentCharacter ?
      inputStateTracker.currentActionPress("jump")
    : "released";
  const directionInput: Xyz =
    isCurrentCharacter ? inputStateTracker.directionVector : originXyz;

  const isFalling = standingOnItemId === null && gravityVel.z < 0;
  const hasFastSteps =
    type === "head" &&
    fastStepsRemaining(playableItem.state) > 0 &&
    standingOnItemId !== null;

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

  const walkVector = autoWalk ? facing : directionInput;

  const maxWalkSpeed = moveSpeedPixPerMs[useSpeedOfCharacter];

  if (teleporting !== null || action === "death") {
    // do not walk while teleporting or showing dying animation:
    return stopWalking;
  }

  // handle 'walking' while ascending/falling:
  if (type === "heels") {
    if (standingOnItemId === null) {
      // heels is not standing on anything
      if (playableItem.state.jumped) {
        // heels jumped - mandatory forward motion while jumping, but decelerates:
        return {
          movementType: "vel",
          vels: {
            walking: subXyz(
              previousWalkingVel,
              scaleXyz(previousWalkingVel, heelsJumpForwardDecel * deltaMS),
            ),
          },
          stateDelta: {
            action:
              isFalling ? "falling"
                // heels 'moves' while ascending in a jump (walk animation):
              : "jumping",
          },
        };
      } else {
        // heels walked off something, should always fall vertically (zero motion here)
        return {
          movementType: "vel",
          vels: {
            walking: originXyz,
          },
          stateDelta: {
            action: "falling",
          },
        };
      }
    } else {
      if (jumpInput !== "released") {
        // standing on something and jumping - mandatory forwards motion
        const jumpDirectionXy = unitVector(
          xyEqual(walkVector, originXy) ? facing : walkVector,
        );
        const isStandingOnSpring = isItemType("spring")(
          stoodOnItem(standingOnItemId, room),
        );
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
          stateDelta: { facing: jumpDirectionXy },
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

  if (walkDistance > 0 && walkDistance < 1) {
    // stopped walking, having moved some distance but less than a pixel
    const targetDistance =
      xyzEqual(walkStartFacing, facing) ?
        // one pixel is the minimum move distance so add on the remaining to round up to a pixel:
        1
        // turning around without walking forward - we will put the player back to their
        // starting position.
      : 0;

    return {
      movementType: "position",
      posDelta: scaleXyz(facing, targetDistance - walkDistance),
      stateDelta: { action: isFalling ? "falling" : "idle", walkDistance: 0 },
    };
  }

  return {
    movementType: "vel",
    vels: {
      walking: originXyz,
    },
    stateDelta: { action: isFalling ? "falling" : "idle" },
  };
};
