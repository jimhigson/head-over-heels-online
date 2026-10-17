import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import {
  itemBehaviourKey,
  type ItemInPlayType,
} from "../../../model/ItemInPlay";
import {
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { getEffectivelyStandingOnItemIdForPlayable } from "../../../model/stoodOnItemsLookup";
import { originalGameFrameDuration } from "../../../originalGame";
import {
  type CollideableItem,
  hasCollisionItemWithIndex,
} from "../../collision/aabbCollision";
import { smallItemAabb } from "../../collision/boundingBoxes";
import { type GameState } from "../../gameState/GameState";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { type MechanicResult, unitMechanicalResult } from "../MechanicResult";
import {
  fallG,
  jumpFudge,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";

const jumpRefreshCollideBufferHeight = 0.1;
const jumpRefreshCollideBuffer = {
  id: "jumpRefreshCollideBuffer",
  state: {
    box: {
      x: 0,
      y: 0,
      z: 0,
      // xd and yd of playable
      xd: smallItemAabb.x,
      yd: smallItemAabb.y,
      zd: jumpRefreshCollideBufferHeight,
    },
  },
} satisfies CollideableItem;

const jumpInitialVelocity = (apexZ: number) => {
  const fudgedApexZ = apexZ - jumpFudge;
  // Calculate the time to reach the apex in milliseconds in the original game:
  const framesToApex = fudgedApexZ / originalGameJumpPxPerFrame;
  const tApex = framesToApex * originalGameFrameDuration;

  // Calculate the initial velZ needed to reach the apex
  const velZ = (fudgedApexZ + 0.5 * fallG * tApex ** 2) / tApex;

  return velZ;
};

const getJumpInitialVelocity = (
  playableItem: PlayableItem,
  /**
   * extra height given by what the playable jumps off
   */
  jumpBoostPx: number,
  /** only relevant for heels */
  hasBigJumps: boolean,
) => {
  const effectiveCharacterName =
    playableItem.type === "headOverHeels" ? "head"
    : playableItem.type === "heels" && hasBigJumps ? "head"
    : playableItem.type;
  return jumpInitialVelocity(
    playerJumpHeightPx[effectiveCharacterName] + jumpBoostPx,
  );
};

const isJumpOffable = <RoomItemId extends string>(
  item: null | UnionOfAllItemInPlayTypes<RoomItemId>,
): item is NonNullable<typeof item> =>
  item !== null && item[itemBehaviourKey].isJumpOffable(item);

const canRefreshJump = <RoomId extends string, RoomItemId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  if (!playableItem.state.jumped) {
    return false;
  }
  // must not have moved up from the jump start position:
  if (playableItem.state.box.z !== playableItem.state.jumpStartZ) {
    return false;
  }
  // must be moving up or trying to (not landing):
  if (playableItem.state.vels.gravity.z <= 0) {
    return false;
  }

  const bufferPosition = jumpRefreshCollideBuffer.state.box;
  const playablePosition = playableItem.state.box;
  bufferPosition.x = playablePosition.x;
  bufferPosition.y = playablePosition.y;
  bufferPosition.z = playablePosition.z - jumpRefreshCollideBufferHeight;

  const hasShield = playableHasShield(playableItem);
  const jumpoffable = (item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>) => {
    return (
      isJumpOffable(item) &&
      (!item[itemBehaviourKey].isDeadly(item) || hasShield) &&
      // // can't normally stand on a non-solid item to jump off of it, but jump
      // // refresh doesn't require to be standing on so also need to filter out
      // // non-solid items:
      !item[itemBehaviourKey].isNonSolid(item, playableItem)
    );
  };

  // still have something below to jump off (even if the standingOnItemId was cleared by the jump):
  const hasSomethingToJumpOff = hasCollisionItemWithIndex(
    jumpRefreshCollideBuffer,
    room[roomSpatialIndexKey],
    jumpoffable,
  );

  return hasSomethingToJumpOff;
};

/**
 * pushes the playable's jumping result into `into`, and on jumping off a
 * lift, the lift's recoil
 */
export const jumping = <RoomId extends string, RoomItemId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
): void => {
  const {
    state: { standingOnItemId },
  } = playableItem;
  const { inputStateTracker } = gameState;

  const effectivelyStandingOnItemId = getEffectivelyStandingOnItemIdForPlayable(
    room,
    playableItem.state,
  );
  const effectivelyStandingOn =
    effectivelyStandingOnItemId === null ? null : (
      room.items[effectivelyStandingOnItemId]
    );

  const jumpButtonDown =
    inputStateTracker.currentActionPress("jump") !== "released";

  if (jumpButtonDown && canRefreshJump(playableItem, room)) {
    // provide a delayed jumping: if the player hasn't started to rise due to
    // collision with an item above them, they still get the whole jump velocity when they are free
    // no matter how long this takes
    // - this makes head's ladders easier to climb in general, but especially at modern frame rates where
    // it's much harder to press on the exact frame than it was in the low frame-rate original
    const velZ = getJumpInitialVelocity(
      playableItem,
      0,
      playableItem.type === "heels" && playableItem.state.isBigJump,
    );
    into.push({
      movementType: "vel",
      // restore the initial vertical velocity:
      vels: { gravity: { x: 0, y: 0, z: velZ } },
      stateDelta: {},
    });
    return;
  }

  const startingAJump =
    // player cannot jump during death animation:
    playableItem.state.action !== "death" &&
    jumpButtonDown &&
    isJumpOffable(effectivelyStandingOn);

  if (import.meta.env.DEV && !standingOnItemId && startingAJump) {
    console.log("coyote jump");
  }

  if (!startingAJump) {
    into.push(
      standingOnItemId !== null ?
        {
          movementType: "steady",
          stateDelta: {
            // clear our jumped flag(s) - heels has two, one of which is just
            // for the particles:
            jumped: false,
            ...(playableItem.type === "heels" ? { isBigJump: false } : {}),
          },
        }
      : unitMechanicalResult,
    );
    return;
  }

  const isBigJump =
    playableItem.type === "heels" && playableItem.state.bigJumps > 0;

  // the same speed as jumping off anything stationary:
  const velZ = getJumpInitialVelocity(
    playableItem,
    effectivelyStandingOn[itemBehaviourKey].jumpBoostPx,
    isBigJump,
  );

  if (effectivelyStandingOn.type === "lift") {
    into.push(liftRecoil(playableItem, effectivelyStandingOn, velZ));
  }

  // handled this input but don't set jump input off - it is
  // ok to keep jump pressed to keep jumping

  into.push({
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
      jumpStartZ: playableItem.state.box.z,
    },
  });
};

/**
 * jumping pushes the lift down, conserving momentum: the jumper's change in
 * speed from moving with the lift, scaled by the ratio of their masses
 */
const liftRecoil = <RoomId extends string, RoomItemId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  lift: ItemTypeUnion<"lift", RoomId, RoomItemId>,
  /** the jumper's vertical speed on leaving the lift */
  jumpVelZ: number,
): MechanicResult<"lift", RoomId, RoomItemId> => {
  const jumperMass = playableItem[itemBehaviourKey].mass(playableItem);
  const liftMass = lift[itemBehaviourKey].mass(lift);
  return {
    movementType: "velDelta",
    targetItemId: lift.id,
    vels: {
      lift: {
        x: 0,
        y: 0,
        z: (-(jumpVelZ - lift.state.vels.lift.z) * jumperMass) / liftMass,
      },
    },
  };
};
