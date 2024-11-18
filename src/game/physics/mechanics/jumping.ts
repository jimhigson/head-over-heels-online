import type { PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { originalGameFrameDuration } from "@/originalGame";
import {
  fallG,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";
import { blockSizePx } from "@/sprites/spritePivots";

const createJumpAbility = (apexZ: number) => {
  // Calculate the time to reach the apex in milliseconds in the original game:
  const framesToApex = apexZ / originalGameJumpPxPerFrame;
  const tApex = framesToApex * originalGameFrameDuration;

  // Calculate the initial velZ needed to reach the apex
  const velZ = (apexZ + 0.5 * fallG * tApex ** 2) / tApex;

  return { velZ, tApex };
};

const jumpAbilities = {
  head: createJumpAbility(playerJumpHeightPx.head),
  // TODO: confirm that springs give one extra block of height for head - this is
  // correct for heels (from 1 to 2) but that could be a doubling
  headOnSpring: createJumpAbility(playerJumpHeightPx.head + blockSizePx.h),
  heels: createJumpAbility(playerJumpHeightPx.heels),
  heelsOnSpring: createJumpAbility(playerJumpHeightPx.heels + blockSizePx.h),
};

const getJumpAbility = (characterName: CharacterName, onSpring: boolean) => {
  return jumpAbilities[`${characterName}${onSpring ? "OnSpring" : ""}`];
};

export const jumping = <RoomId extends string>(
  characterItem: PlayableItem,
  { inputState: { jump: jumpInput }, gameTime }: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    type: characterType,
    state: { jumpStartTime },
  } = characterItem;

  if (jumpInput && characterItem.state.standingOn?.type === "teleporter") {
    // you can't jump from a teleporter!
    return {};
  }

  const standingOnItemType = characterItem.state.standingOn?.type ?? null;
  const isCharacterStandingOnSomethingCanJumpOff =
    // can jump off anything except a teleporter (because the jump button is also used
    // to teleport)
    standingOnItemType !== null && standingOnItemType !== "teleporter";

  const isJumpStart = jumpInput && isCharacterStandingOnSomethingCanJumpOff;

  if (!isJumpStart && jumpStartTime === null) {
    // not jumping - we change nothing
    return {};
  }

  const { velZ, tApex } = getJumpAbility(
    characterType,
    standingOnItemType === "spring",
  );

  if (isJumpStart) {
    console.log(characterType, standingOnItemType === "spring");

    return {
      stateDelta: {
        action: "moving",
        standingOn: null,
        jumped: true,
        velZ,
      },
    };
  }

  const jumpFinished =
    jumpStartTime !== null &&
    gameTime - jumpStartTime >=
      tApex *
        // heels is considered to be jumping for twice as long, because
        // head glides from the top of the jump, whereas heels continues
        // on the parabolic arc
        (characterType === "heels" ? 2 : 1);

  return {
    stateDelta:
      // jumping, but not starting a jump
      {
        action: "moving",
        ...(jumpFinished ?
          {
            // the vertical velocity has reached zero - the jump is spent
            jumpStartTime: null,
          }
        : {}),
      },
    //positionDelta: not set because jumping doesn't cause movement, only sets the zV, which will
    //cause movement in "falling" mechanic
  };
};
