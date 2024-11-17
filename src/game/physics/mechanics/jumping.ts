import type { PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { originalGameFrameDuration } from "@/originalGame";
import {
  jumpG,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";

const timeToApexByJumpHeight = (apexZ: number) =>
  (apexZ / originalGameJumpPxPerFrame) * originalGameFrameDuration;

const createVerticalVelocityFunction = (g: number, apexZ: number) => {
  const timeToApex = timeToApexByJumpHeight(apexZ);

  // Precompute values that do not change
  const initialVelocityPxPerMs =
    (2 * apexZ + g * timeToApex ** 2) / (2 * timeToApex);

  /**
   * gives the pixel ascent over a period of @param deltaMS at @param t since the
   * start of the jump
   */
  const zDelta = (t: number, deltaMS: number) =>
    (initialVelocityPxPerMs - g * t) * deltaMS;

  return { timeToApex, zDelta };
};

const jumpFunction = {
  head: createVerticalVelocityFunction(jumpG, playerJumpHeightPx.head),
  heels: createVerticalVelocityFunction(jumpG, playerJumpHeightPx.heels),
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

  const zD = jumpFunction[characterType].zDelta(
    jumpStartTime === null ? 0 : gameTime - jumpStartTime,
    deltaMS,
  );

  const jumpFinished =
    jumpStartTime !== null &&
    gameTime - jumpStartTime >=
      jumpFunction[characterType].timeToApex *
        // heels is considered to be jumping for twice as long, because
        // head glides from the top of the jump, whereas heels continues
        // on the parabolic arc
        (characterType === "heels" ? 2 : 1);

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
          ...(jumpFinished ?
            {
              // the vertical velocity has reached zero - the jump is spent
              jumpStartTime: null,
            }
          : {}),
        },
    positionDelta: { z: zD },
  };
};
