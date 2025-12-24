import { objectValues } from "iter-tools-es";

import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import type { RoomState } from "../../model/RoomState";
import type { Xyz } from "../../utils/vectors/vectors";
import type { GameState } from "../gameState/GameState";

import { stoodOnItem } from "../../model/stoodOnItemsLookup";
import {
  addXyzInPlace,
  originXyz,
  scaleXyzWriteInto,
} from "../../utils/vectors/vectors";
import { makeItemFadeOut } from "../gameState/mutators/makeItemFadeOut";
import { handleItemsTouchingItems } from "../physics/handleTouch/handleItemsTouchingItems";
import { handlePlayerTouchingDeadly } from "../physics/handleTouch/handlePlayerTouchingDeadly";
import { handlePlayerTouchingPickup } from "../physics/handleTouch/handlePlayerTouchingPickup";
import {
  isButton,
  isCarrier,
  isCrown,
  isDeadly,
  isEmitter,
  isFiredDoughnut,
  isFirer,
  isLift,
  isMoving,
} from "../physics/itemPredicates";
import { isFreeItem } from "../physics/itemPredicates";
import { isPlayableItem } from "../physics/itemPredicates";
import { type MechanicResult } from "../physics/MechanicResult";
import { tickActivation } from "../physics/mechanics/activation";
import { buttonPressAndRelease } from "../physics/mechanics/buttonPressAndRelease";
import { emitting } from "../physics/mechanics/emitting";
import { firing } from "../physics/mechanics/firing";
import { gravity } from "../physics/mechanics/gravity";
import { jumping } from "../physics/mechanics/jumping";
import { latentMovement } from "../physics/mechanics/latentMovement";
import { moveLift } from "../physics/mechanics/moveLift";
import { tickMovement } from "../physics/mechanics/movement";
import { onConveyor } from "../physics/mechanics/onConveyor";
import { pickingUp } from "../physics/mechanics/pickingUp";
import { puttingDown } from "../physics/mechanics/puttingDown";
import { rotateTowardsFacing } from "../physics/mechanics/rotateTowardsFacing";
import { teleporting } from "../physics/mechanics/teleporting";
import { walking } from "../physics/mechanics/walking";
import { moveItem } from "../physics/moveItem/moveItem";
import { addParticlesAroundCrown } from "./addParticlesToRoom";
import { applyMechanicsResults } from "./applyMechanicsResults";
import { constrainToMaximumSpeedInPlace } from "./constrainToMaximumSpeed";

function* itemMechanicResultGen<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<T, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): Generator<MechanicResult<T, RoomId, RoomItemId>> {
  if (isFreeItem(item)) {
    yield gravity(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;
    yield onConveyor(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;
    yield* latentMovement(item, room, gameState, deltaMS) as Generator<
      MechanicResult<T, RoomId, RoomItemId>
    >;
  }

  if (isPlayableItem(item)) {
    // walking is allowed if not current for autowalking:
    yield walking(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;

    yield rotateTowardsFacing(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;

    // although teleporting involves user controls, it also manages the in/out
    // phase which need to happen even if the user switched character since activating the
    // teleporter
    yield teleporting(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;

    // user controls:
    if (item.id === gameState.currentCharacterName) {
      const itemIsCarrier = isCarrier(item);

      // putting down before jumping means that have a chance to
      // put down a spring and then jump off of it:
      if (itemIsCarrier) {
        puttingDown(item, room, gameState, deltaMS);
      }

      yield jumping(item, room, gameState, deltaMS) as MechanicResult<
        T,
        RoomId,
        RoomItemId
      >;

      // picking up after jumping means have time to jump off a spring while
      // instantly picking it up:
      if (itemIsCarrier) {
        pickingUp(item, room, gameState);
      }
      if (isFirer(item)) {
        firing(item, room, gameState, deltaMS);
      }
    }
  } else if (isLift(item)) {
    yield moveLift(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;
  } else if (isMoving(item)) {
    yield tickActivation(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;
    yield tickMovement(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;
  } else if (isEmitter(item)) {
    emitting(item, room, gameState, deltaMS);
  } else if (isButton(item)) {
    yield buttonPressAndRelease(item, room) as MechanicResult<
      T,
      RoomId,
      RoomItemId
    >;
  }
}

const tickItemStandingOn = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<T, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  if (!isFreeItem(item) || item.state.standingOnItemId === null) {
    return;
  }

  const standingOn = stoodOnItem(item.state.standingOnItemId, room);

  // walking onto a platform that is activate on stand
  if (isPlayableItem(item)) {
    // case of walking onto a pickup from another platform, not colliding with it
    if (standingOn.type === "pickup") {
      handlePlayerTouchingPickup({
        gameState,
        movingItem: item,
        touchedItem: standingOn,
        room,
        movementVector: { x: 0, y: 0, z: -1 },
        deltaMS,
      });
    }
  }

  // handle standing on an item with dissppear='onStand' - eg, if got onto this item
  // by walking onto it from another item, there would have been no collision with it
  // to set the standing on property
  const {
    state: { disappearing: disappear },
  } = standingOn;

  if (
    disappear !== null &&
    (disappear.byType === undefined || disappear.byType.includes(item.type))
  ) {
    makeItemFadeOut({
      touchedItem: standingOn,
      gameState,
      room,
    });
  }
};

// since only one item can tick at once, a buffer to write their position change into,
// to avoid malloc:
const tickItemPosDeltaAccumulationBuffer: Xyz = { x: 0, y: 0, z: 0 };
// a buffer to write into while scaling vels down to pos tick pos deltas
const scaleVelBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 *
 * @param returns true if the tick should halt
 */
export const tickItem = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<T, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  if (isPlayableItem(item) && item.state.standingOnItemId !== null) {
    const stoodOn = stoodOnItem(item.state.standingOnItemId, room);
    if (isDeadly(stoodOn) || stoodOn.type === "spikes") {
      // the player has a shield that has only just expired - if they are standing on a deadly
      // item, it should kill them. This would normally have already killed them, but it is possible
      // they had a shield when they walked onto the deadly thing
      handlePlayerTouchingDeadly({
        gameState,
        room,
        movingItem: item,
        touchedItem: stoodOn,
        deltaMS,
        movementVector: { x: 0, y: 0, z: -1 },
      });
    }
  }

  // by spreading the generator onto an array, we run the mechanics at the 'same'
  // time, before the previous ones have changed the game state. This is good for
  // jumping and carrying at the same time, for example. Otherwise, these would
  // one stop the other from working.
  const mechanicsResults = itemMechanicResultGen(
    item,
    room,
    gameState,
    deltaMS,
  ).toArray();

  // this is done after the mechanicsResults are generated, so that the player
  // can do one more jump on a dissapearing block before the touch on that block
  // is handled
  tickItemStandingOn(item, room, gameState, deltaMS);

  // continue even if there are no mechanicsResults, since item still may be moving (ie, a fired doughnut)

  applyMechanicsResults(
    // writeInto:
    tickItemPosDeltaAccumulationBuffer,
    item,
    mechanicsResults,
  );

  const isMovableThing =
    isFreeItem(item) || isLift(item) || isFiredDoughnut(item);
  // velocities for this item have now been updated - get the aggregate movement, including vels
  // that stood from previous frames (did not change)
  if (isMovableThing) {
    for (const vel of objectValues(item.state.vels)) {
      addXyzInPlace(
        tickItemPosDeltaAccumulationBuffer,
        scaleXyzWriteInto(scaleVelBuffer, { ...originXyz, ...vel }, deltaMS),
      );
    }
  }

  if (isCrown(item)) {
    addParticlesAroundCrown(room, item, deltaMS);
  }

  // position deltas are instant - not subject to maximum speed constraints
  // currently. Otherwise, the minimum 1px walking movement on short input
  // bursts gets cancelled
  const mrIncludesInstantMovement =
    mechanicsResults.find((mr) => mr.movementType === "position") !== undefined;

  if (!mrIncludesInstantMovement) {
    constrainToMaximumSpeedInPlace(
      item,
      tickItemPosDeltaAccumulationBuffer,
      deltaMS,
    );
  }

  moveItem({
    subjectItem: item as UnionOfAllItemInPlayTypes<RoomId>,
    posDelta: tickItemPosDeltaAccumulationBuffer,
    gameState,
    room,
    deltaMS,
    onTouch: handleItemsTouchingItems,
  });
};
