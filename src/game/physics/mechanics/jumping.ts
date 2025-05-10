import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type CharacterName } from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
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
import type { Mechanic } from "../MechanicResult";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import {
  fallG,
  jumpFudge,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";
import { teleporterIsActive } from "./teleporting";

const jumpDelayGrace = 1000 / 12;

const jumpInitialVelocity = (apexZ: number) => {
  const fudgedApexZ = apexZ - jumpFudge;
  // Calculate the time to reach the apex in milliseconds in the original game:
  const framesToApex = fudgedApexZ / originalGameJumpPxPerFrame;
  const tApex = framesToApex * originalGameFrameDuration;

  // Calculate the initial velZ needed to reach the apex
  const velZ = (fudgedApexZ + 0.5 * fallG * tApex ** 2) / tApex;

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
  /** only relevant for heels */
  hasBigJumps: boolean,
) => {
  const effectiveCharacterName =
    playableItem.type === "headOverHeels" ? "head"
    : playableItem.type === "heels" && hasBigJumps ? "head"
    : playableItem.type;
  return jumpInitialVelocities[
    `${effectiveCharacterName}${onSpring ? "OnSpring" : ""}`
  ];
};

const isJumpOffable = <RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomItemId> | null,
): item is NonNullable<typeof item> => {
  if (item === null) {
    return false;
  }
  if (isTeleporter(item) && teleporterIsActive(item)) {
    // can't jump from a teleporter (jump key teleports)
    return false;
  }
  if (isPickup(item) && item.config.gives === "scroll") {
    // can't jump off of scrolls - the jump after reading is jarring
    return false;
  }
  if (isPlayableItem(item) && item.state.standingOnItemId === null) {
    // can't jump off of a character that is jumping. This prevents
    // a 'superjump' by going out of symbiosis while jumping and
    // holding jump
    return false;
  }

  return true;
};

const eligibleForJumpStartGrace = (
  playableItem: PlayableItem<CharacterName, string, string>,
) => {
  return (
    // we have jumped...
    playableItem.state.jumped &&
    // ... but we haven't moved up
    playableItem.state.position.z === playableItem.state.jumpStartZ &&
    // and we're still in the jump grace period
    playableItem.state.jumpStartTime + jumpDelayGrace >
      (playableItem.type === "headOverHeels" ?
        playableItem.state.head.gameTime
      : playableItem.state.gameTime)
  );
};

export const jumping: Mechanic<CharacterName> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  //_deltaMS: number,
): MechanicResult<CharacterName, RoomId, RoomItemId> => {
  const {
    state: { standingOnItemId },
  } = playableItem;
  const { inputStateTracker } = gameState;

  const standingOn = stoodOnItem(standingOnItemId, room);

  if (eligibleForJumpStartGrace(playableItem)) {
    console.info("jump grace");
    // provide a 'grace' period after jumping where if the player hasn't started to ride due to
    // collision with an item above them, they still get the whole jump velocity when they are free
    // - this makes head's laders easier to climb at higher frame rates where it's much harder to press
    // on the exact frame
    // BUG: the jump grace for heels looks like it subtracts bigJumps count here
    const velZ = getJumpInitialVelocity(
      playableItem,
      false,
      playableItem.type === "heels" && playableItem.state.isBigJump,
    );
    return {
      movementType: "vel",
      // restore the initial vertical velocity:
      vels: { gravity: { x: 0, y: 0, z: velZ } },
      stateDelta: {},
    };
  }

  const startingAJump =
    // player cannot jump during death animation:
    playableItem.state.action !== "death" &&
    inputStateTracker.currentActionPress("jump") !== "released" &&
    isJumpOffable(standingOn);

  if (!startingAJump) {
    if (standingOnItemId !== null) {
      return {
        movementType: "steady",
        stateDelta: {
          // clear our jumped flag(s):
          jumped: false,
          ...(playableItem.type === "heels" ? { isBigJump: false } : {}),
        },
      };
    }
    return unitMechanicalResult;
  }

  const isBigJump =
    playableItem.type === "heels" && playableItem.state.bigJumps > 0;

  const standingOnSpring = isSpring(standingOn);

  const velZ = getJumpInitialVelocity(
    playableItem,
    standingOnSpring,
    isBigJump,
  );

  // handled this input but don't set jump input off - it is
  // ok to keep jump pressed to keep jumping

  return {
    movementType: "vel",
    vels: { gravity: { x: 0, y: 0, z: velZ } },
    stateDelta: {
      action: "moving",
      jumped: true,
      ...(playableItem.type === "heels" ?
        isBigJump ?
          { bigJumps: playableItem.state.bigJumps - 1, isBigJump: true }
          // clear the big jump flag - this is also cleared on landing, but could be starting
          // a normal jump right off of a big jump, so we should also clear it here
        : { isBigJump: false }
      : {}),
      jumpStartZ: playableItem.state.position.z,
      jumpStartTime:
        playableItem.type === "headOverHeels" ?
          playableItem.state.head.gameTime
        : playableItem.state.gameTime,
    },
  };
};
