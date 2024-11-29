import { directionsXy4, scaleXyz, subXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import {
  heelsJumpForwardSpeedFraction,
  heelsJumpForwardDecel,
  walkSpeedPixPerMs,
} from "../mechanicsConstants";
import type { PlayableItem } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const walking = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  { inputState }: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName> => {
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
    return {};
  }

  // handle 'walking' while ascending/falling:
  if (type === "heels") {
    if (standingOn.length === 0) {
      // heels has mandatory forward motion while jumping, but decelerates:
      if (playableItem.state.jumped) {
        return {
          vels: {
            walking: subXyz(
              previousWalkingVel,
              scaleXyz(previousWalkingVel, heelsJumpForwardDecel * deltaMS),
            ),
          },
        };
      } else {
        // when heels walks off something, should always fall vertically (zero motion here)
        return unitMechanicalResult;
      }
    } else {
      if (inputState.jump) {
        const jumpDirection = directionOfWalk ?? facing;
        return {
          vels: {
            walking: scaleXyz(
              unitVectors[jumpDirection],
              maxWalkSpeed * heelsJumpForwardSpeedFraction,
            ),
          },
          stateDelta: { facing: jumpDirection },
        };
      }
    }
  }

  const action =
    standingOn.length === 0 && gravityVel.z < 0 ? "falling"
    : directionOfWalk === undefined ? "idle"
    : "moving";

  // normal walking
  if (directionOfWalk !== undefined) {
    return {
      vels: {
        walking: scaleXyz(unitVectors[directionOfWalk], maxWalkSpeed),
      },
      stateDelta: {
        facing: directionOfWalk,
        action,
      },
    };
  }

  // no direction pressed - we are idle and decelerate in whatever direction we're already headed:
  return {
    stateDelta: { action },
  };
};
