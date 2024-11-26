import type { PlayableItem } from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import { type GameState } from "@/game/gameState/GameState";
import { originalGameFrameDuration } from "@/originalGame";
import {
  fallG,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";
import { blockSizePx } from "@/sprites/spritePivots";

const jumpInitialVelocity = (apexZ: number) => {
  // Calculate the time to reach the apex in milliseconds in the original game:
  const framesToApex = apexZ / originalGameJumpPxPerFrame;
  const tApex = framesToApex * originalGameFrameDuration;

  // Calculate the initial velZ needed to reach the apex
  const velZ = (apexZ + 0.5 * fallG * tApex ** 2) / tApex;

  return velZ;
};

const jumpInitialVelocities = {
  head: jumpInitialVelocity(playerJumpHeightPx.head),
  // TODO: confirm that springs give one extra block of height for head - this is
  // correct for heels (from 1 to 2) but that could be a doubling
  headOnSpring: jumpInitialVelocity(playerJumpHeightPx.head + blockSizePx.h),
  heels: jumpInitialVelocity(playerJumpHeightPx.heels),
  heelsOnSpring: jumpInitialVelocity(playerJumpHeightPx.heels + blockSizePx.h),
};

const getJumpInitialVelocity = (
  characterName: CharacterName,
  onSpring: boolean,
) => {
  return jumpInitialVelocities[`${characterName}${onSpring ? "OnSpring" : ""}`];
};

export const jumping = <RoomId extends string>(
  { type, state: { standingOn } }: PlayableItem,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<CharacterName> => {
  const {
    inputState: { jump: jumpInput },
  } = gameState;

  const standingOnTeleporter = standingOn.find(
    (item) => item.type === "teleporter",
  );

  const startingAJump =
    jumpInput &&
    // can't jump if not standing on anything!
    standingOn.length > 0 &&
    // you can't jump from a teleporter!
    standingOnTeleporter === undefined;

  if (!startingAJump) {
    if (standingOn.length > 0) {
      return {
        stateDelta: {
          jumped: false,
        },
      };
    }
    return unitMechanicalResult;
  }

  const standingOnSpring = standingOn.find((item) => item.type === "spring");
  const velZ = getJumpInitialVelocity(type, standingOnSpring !== undefined);

  return {
    vels: { gravity: { z: velZ } },
    stateDelta: {
      action: "moving",
      jumped: true,
    },
  };
};
