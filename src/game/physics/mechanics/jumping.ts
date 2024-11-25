import type { PlayableItem } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
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
  { type, state: { standingOn } }: PlayableItem,
  { inputState: { jump: jumpInput } }: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<CharacterName> => {
  const startingAJump =
    jumpInput &&
    // can't jump if not standing on anything!
    standingOn !== null &&
    // you can't jump from a teleporter!
    standingOn?.type !== "teleporter";

  if (!startingAJump) {
    if (standingOn !== null) {
      return {
        stateDelta: {
          jumped: false,
        },
      };
    }
    return unitMechanicalResult;
  }
  const { velZ } = getJumpAbility(type, standingOn?.type === "spring");

  return {
    vels: { gravity: { z: velZ } },
    stateDelta: {
      action: "moving",
      jumped: true,
    },
  };
};
