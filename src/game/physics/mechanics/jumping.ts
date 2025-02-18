import type { FreeItemState } from "../../../model/ItemStateMap";
import type { CharacterName } from "../../../model/modelTypes";
import { originalGameFrameDuration } from "../../../originalGame";
import { blockSizePx } from "../../../sprites/spritePivots";
import type { GameState } from "../../gameState/GameState";
import {
  isPickup,
  isPlayableItem,
  isSpring,
  isTeleporter,
  type PlayableItem,
} from "../itemPredicates";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import {
  fallG,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";

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
  playableItem: PlayableItem,
  onSpring: boolean,
) => {
  const effectiveCharacterName =
    playableItem.type === "headOverHeels" ? "head"
    : playableItem.type === "heels" && playableItem.state.bigJumps > 0 ?
      (playableItem.state.bigJumps--, "head")
    : playableItem.type;
  return jumpInitialVelocities[
    `${effectiveCharacterName}${onSpring ? "OnSpring" : ""}`
  ];
};

const isJumpOffable = <RoomId extends string>(
  item: FreeItemState<RoomId>["standingOn"],
): item is NonNullable<typeof item> => {
  if (item === null) {
    return false;
  }
  if (isTeleporter(item)) {
    // can't jump from a teleporter (jump key teleports)
    return false;
  }
  if (isPickup(item) && item.config.gives === "scroll") {
    // can't jump off of scrolls - the jump after reading is jarring
    return false;
  }
  if (isPlayableItem(item) && item.state.standingOn === null) {
    // can't jump off of a character that is jumping. This prevents
    // a 'superjump' by going out of symbiosis while jumping and
    // holding jump
    return false;
  }

  return true;
};

export const jumping = <RoomId extends string>(
  playableItem: PlayableItem,
  gameState: GameState<RoomId>,
  //_deltaMS: number,
): MechanicResult<CharacterName, RoomId> => {
  const {
    state: { standingOn },
  } = playableItem;
  const { inputStateTracker } = gameState;

  const startingAJump =
    inputStateTracker.currentActionPress("jump") !== "released" &&
    isJumpOffable(standingOn);

  if (startingAJump) console.log("starting a jump!");

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

  const standingOnSpring = isSpring(standingOn);
  const velZ = getJumpInitialVelocity(playableItem, standingOnSpring);

  // handled this input but don't set jump input flat off - it is
  // ok to keep jump pressed to keep jumping

  return {
    movementType: "vel",
    vels: { gravity: { x: 0, y: 0, z: velZ } },
    stateDelta: {
      action: "moving",
      jumped: true,
    },
  };
};
