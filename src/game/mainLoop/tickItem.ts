import {
  isCarrier,
  isCrown,
  isDeadly,
  isEmitter,
  isFirer,
  isItemType,
  isLift,
  isMoving,
} from "../physics/itemPredicates";
import { isFreeItem } from "../physics/itemPredicates";
import { isPlayableItem } from "../physics/itemPredicates";
import type { GameState } from "../gameState/GameState";
import { type MechanicResult } from "../physics/MechanicResult";
import { gravity } from "../physics/mechanics/gravity";
import { jumping } from "../physics/mechanics/jumping";
import { walking } from "../physics/mechanics/walking";
import { moveLift } from "../physics/mechanics/moveLift";
import { moveItem } from "../physics/moveItem";
import { teleporting } from "../physics/mechanics/teleporting";
import { onConveyor } from "../physics/mechanics/onConveyor";
import { tickMovement } from "../physics/mechanics/movement";
import { carrying } from "../physics/mechanics/carrying";
import { latentMovement } from "../physics/mechanics/latentMovement";
import { objectValues } from "iter-tools";
import { handlePlayerTouchingDeadly } from "../physics/handleTouch/handlePlayerTouchingDeadly";
import { makeItemFadeOut } from "../gameState/mutators/makeItemFadeOut";
import { firing } from "../physics/mechanics/firing";
import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import { iterate } from "../../utils/iterate";
import { addXyz, scaleXyz } from "../../utils/vectors/vectors";
import { applyMechanicsResults } from "./applyMechanicsResults";
import { handlePlayerTouchingPickup } from "../physics/handleTouch/handlePlayerTouchingPickup";
import { handleItemsTouchingItems } from "../physics/handleTouch/handleItemsTouchingItems";
import type { RoomState } from "../../model/RoomState";
import { stoodOnItem } from "../../model/stoodOnItemsLookup";
import { tickActivation } from "../physics/mechanics/activation";
import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { emitting } from "../physics/mechanics/emitting";
import { addParticlesAroundCrown } from "./addParticlesToRoom";

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

    if (item.id === gameState.currentCharacterName) {
      // user controls:
      yield teleporting(item, room, gameState, deltaMS) as MechanicResult<
        T,
        RoomId,
        RoomItemId
      >;
      yield jumping(item, room, gameState, deltaMS) as MechanicResult<
        T,
        RoomId,
        RoomItemId
      >;

      if (isCarrier(item)) {
        carrying(item, room, gameState, deltaMS);
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
      // they had a shield that has just expired.
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
  const mechanicsResults = [
    ...itemMechanicResultGen(item, room, gameState, deltaMS),
  ];

  // this is done after the mechanicsResults are generated, so that the player
  // can do one more jump on a dissapearing block before the touch on that block
  // is handled
  tickItemStandingOn(item, room, gameState, deltaMS);

  // continue even if there are no mechanicsResults, since item still may be moving (ie, a fired doughnut)

  let accumulatedPosDelta = applyMechanicsResults(item, mechanicsResults);

  // velocities for this item have now been updated - get the aggregate movement, including vels
  // that stood from previous frames (did not change)
  if (
    isFreeItem(item) ||
    isItemType("lift")(item) ||
    isItemType("firedDoughnut")(item)
  ) {
    accumulatedPosDelta = addXyz(
      accumulatedPosDelta,
      ...iterate(objectValues(item.state.vels)).map((val) =>
        scaleXyz(val, deltaMS),
      ),
    );
  }

  if (isCrown(item)) {
    addParticlesAroundCrown(room, item, deltaMS);
  }

  moveItem({
    subjectItem: item as UnionOfAllItemInPlayTypes<RoomId>,
    posDelta: accumulatedPosDelta,
    gameState,
    room,
    deltaMS,
    onTouch: handleItemsTouchingItems,
  });
};
