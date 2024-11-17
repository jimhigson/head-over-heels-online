import type { PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { originalGameFrameDuration } from "@/originalGame";
import { blockSizePx } from "@/sprites/spritePivots";

const createVerticalVelocityFunction = (g: number, apexY: number) => {
  const originalGameJumpPxPerFrame = 2;
  const tTotal =
    (apexY / originalGameJumpPxPerFrame) * originalGameFrameDuration;

  // Precompute values that do not change
  const initialVelocityPxPerMs = (2 * apexY + g * tTotal ** 2) / (2 * tTotal);

  /**
   * gives the pixel ascent over a period of @param deltaMS at @param t since the
   * start of the jump
   */
  return (t: number, deltaMS: number) =>
    (t > tTotal ? 0 : initialVelocityPxPerMs - g * t) * deltaMS;
};

const jumpFunction = {
  // setting g to zero gives the old, linear jump behaviour. Higher figures mean
  // more contrast between initial jump speed and average jump speed
  head: createVerticalVelocityFunction(0.0002, blockSizePx.h * 2.5),
  heels: createVerticalVelocityFunction(0.0002, blockSizePx.h),
};

export const jumping = <RoomId extends string>(
  characterItem: PlayableItem,
  { inputState: { jump: jumpInput }, gameTime }: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type: characterType,
    state: { jumpStartTime },
  } = characterItem;

  if (jumpInput && characterItem.state.standingOn?.type === "teleporter") {
    // you can't jump from a teleporter!
    return {};
  }

  const isCharacterStandingOnSomethingCanJumpOff =
    characterItem.state.standingOn !== null &&
    // can jump off anything except a teleporter (because the jump button is also used
    // to teleport)
    characterItem.state.standingOn.type !== "teleporter";

  const isJumpStart = jumpInput && isCharacterStandingOnSomethingCanJumpOff;

  if (!isJumpStart && jumpStartTime === null) {
    // not jumping - we do nothing
    return {};
  }

  const zV = jumpFunction[characterType](
    jumpStartTime === null ? 0 : gameTime - jumpStartTime,
    deltaMS,
  );

  return {
    stateDelta:
      isJumpStart ?
        {
          action: "moving",
          // whatever we were standing on, we aren't any more:
          standingOn: null,
          jumpStartTime: gameTime,
          jumped: true,
        }
        // jumping, but not starting a jump
      : {
          action: "moving",
          ...(zV <= 0 ?
            {
              // the vertical velocity has reached zero - the jump is spent
              jumpStartTime: null,
            }
          : {}),
        },
    positionDelta: { z: zV },
  };
};
