import { type PlayableItem } from "../itemPredicates";
import { isItemType } from "../itemPredicates";
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
  //_deltaMS: number,
): MechanicResult<CharacterName, RoomId> => {
  const {
    inputState: { jump: jumpInput },
  } = gameState;

  const standingOnTeleporter =
    standingOn !== null && isItemType("teleporter")(standingOn);

  const startingAJump =
    jumpInput &&
    // can't jump if not standing on anything!
    standingOn !== null &&
    // you can't jump from a teleporter!
    !standingOnTeleporter;

  if (!startingAJump) {
    if (standingOn !== null) {
      return {
        movementType: "steady",
        stateDelta: {
          jumped: false,
        },
      };
    }
    return unitMechanicalResult;
  }

  const standingOnSpring = isItemType("spring")(standingOn);
  const velZ = getJumpInitialVelocity(type, standingOnSpring);

  // handled this input but don't set jump input flat off - it is
  // ok to keep jump pressed to keep jumping

  return {
    movementType: "vel",
    vels: { gravity: { z: velZ } },
    stateDelta: {
      action: "moving",
      jumped: true,
    },
  };
};
