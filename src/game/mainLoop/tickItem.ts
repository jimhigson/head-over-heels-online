import {
  isCarrier,
  isDeadly,
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
  ItemInPlay,
  UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import type { RoomState } from "../../model/modelTypes";
import type { SceneryName } from "../../sprites/planets";
import { iterate } from "../../utils/iterate";
import { addXyz, scaleXyz, lengthXyz } from "../../utils/vectors/vectors";
import { applyMechanicsResults } from "./applyMechanicsResults";
import { handlePlayerTouchingPickup } from "../physics/handleTouch/handlePlayerTouchingPickup";
import { handleItemsTouchingItems } from "../physics/handleTouch/handleItemsTouchingItems";

/**
 * biggest movement (in pixels) allowed in one tick - movement of more than this will be
 * split into multiple sub-ticks
 */
const maxMovementPerTick = 2;

function* itemMechanicResultGen<
  RoomId extends string,
  T extends ItemInPlayType,
>(
  item: ItemInPlay<T, SceneryName, RoomId>,
  room: RoomState<SceneryName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): Generator<MechanicResult<T, RoomId>> {
  if (isFreeItem(item)) {
    yield gravity(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield onConveyor(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield* latentMovement(item, room, gameState, deltaMS) as Generator<
      MechanicResult<T, RoomId>
    >;
  }

  if (isPlayableItem(item)) {
    // walking is allowed if not current for autowalking:
    yield walking(item, gameState, deltaMS) as MechanicResult<T, RoomId>;

    if (item.id === gameState.currentCharacterName) {
      // user controls:
      yield teleporting(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
      yield jumping(item, gameState /*, deltaMS*/) as MechanicResult<T, RoomId>;

      if (isCarrier(item)) {
        carrying(item, room, gameState, deltaMS);
      }
      if (isFirer(item)) {
        firing(item, room, gameState, deltaMS);
      }
    }
  }

  if (isLift(item)) {
    yield moveLift(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
  }

  if (isMoving(item)) {
    yield tickMovement(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId
    >;
  }
}

const tickItemStandingOn = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, SceneryName, RoomId>,
  room: RoomState<SceneryName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  if (!isFreeItem(item) || item.state.standingOn === null) {
    return;
  }

  // walking onto a platform that is activate on stand
  if (isPlayableItem(item)) {
    if (
      item.state.standingOn.type === "movableBlock" &&
      item.state.standingOn.config.movement !== "free" &&
      item.state.standingOn.config.activated === "onStand"
    ) {
      item.state.standingOn.state.activated = true;
    }

    // case of walking onto a pickup from another platform, not colliding with it
    if (item.state.standingOn.type === "pickup") {
      handlePlayerTouchingPickup({
        gameState,
        movingItem: item,
        touchedItem: item.state.standingOn,
        room,
        movementVector: { x: 0, y: 0, z: -1 },
        deltaMS,
      });
    }
  }

  // handle standing on an item with dissppear='onStand' - eg, if got onto this item
  // by walking onto it from another item, there would have been no collision with it
  // to set the standing on property
  if (
    item.state.standingOn.state.disappear === "onStand" ||
    item.state.standingOn.state.disappear === "onTouch" ||
    (isPlayableItem(item) &&
      item.state.standingOn.state.disappear === "onTouchByPlayer")
  ) {
    makeItemFadeOut({ touchedItem: item.state.standingOn, gameState, room });
  }
};

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 *
 * @param returns true if the tick should halt
 */
export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, SceneryName, RoomId>,
  room: RoomState<SceneryName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  if (
    isPlayableItem(item) &&
    item.state.standingOn !== null &&
    isDeadly(item.state.standingOn)
  ) {
    // the player has a shield that has only just expired - if they are standing on a deadly
    // item, it should kill them. This would normally have already killed them, but it is possible
    // they had a shield that has just expired.
    handlePlayerTouchingDeadly({
      gameState,
      room,
      movingItem: item,
      touchedItem: item.state.standingOn,
      deltaMS,
      movementVector: { x: 0, y: 0, z: -1 },
    });
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

  const subTickCount = Math.ceil(
    lengthXyz(accumulatedPosDelta) / maxMovementPerTick,
  );
  const movementPerSubTick = scaleXyz(accumulatedPosDelta, 1 / subTickCount);

  for (let i = 0; i < subTickCount; i++) {
    moveItem({
      subjectItem: item as UnionOfAllItemInPlayTypes<RoomId>,
      posDelta: movementPerSubTick,
      gameState,
      room,
      deltaMS,
      onTouch: handleItemsTouchingItems,
    });
  }
};
