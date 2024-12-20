import type {
  ItemInPlay,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { isDeadlyItem, isItemType } from "../physics/itemPredicates";
import { isFreeItem } from "../physics/itemPredicates";
import { isPlayableItem } from "../physics/itemPredicates";
import type { PlanetName } from "@/sprites/planets";
import type { GameState } from "../gameState/GameState";
import { type MechanicResult } from "../physics/MechanicResult";
import { gravity } from "../physics/mechanics/gravity";
import { jumping } from "../physics/mechanics/jumping";
import { walking } from "../physics/mechanics/walking";
import { moveLift } from "../physics/mechanics/moveLift";
import type { Xyz } from "@/utils/vectors/vectors";
import { originXyz, addXyz, scaleXyz } from "@/utils/vectors/vectors";
import { moveItem } from "../physics/moveItem";
import { teleporting } from "../physics/mechanics/teleporting";
import { onConveyor } from "../physics/mechanics/onConveyor";
import { tickBaddie } from "../physics/mechanics/baddieAi";
import { carrying } from "../physics/mechanics/carrying";
import type { RoomState } from "@/model/modelTypes";
import { objectEntriesIter } from "@/utils/entries";
import { latentMovement } from "../physics/mechanics/latentMovement";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { handlePlayerTouchingDeadly } from "../physics/handleTouch/handlePlayerTouchingDeadly";
import { makeItemFadeOut } from "../gameState/mutators/makeItemFadeOut";
import { firing } from "../physics/mechanics/firing";

function* itemMechanicResultGen<
  RoomId extends string,
  T extends ItemInPlayType,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): Generator<MechanicResult<T, RoomId>> {
  if (isFreeItem(item)) {
    yield gravity(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield onConveyor(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield* latentMovement(item, gameState, deltaMS) as Generator<
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

      if (isItemType("heels")(item)) {
        carrying(item, room, gameState, deltaMS);
      }
      if (isItemType("head")(item)) {
        firing(item, room, gameState, deltaMS);
      }
    }
  }

  if (isItemType("lift")(item)) {
    yield moveLift(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
  }

  if (isItemType("baddie")(item)) {
    yield tickBaddie(item, room, gameState, deltaMS) as MechanicResult<
      T,
      RoomId
    >;
  }
}

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 *
 * @param returns true if the tick should halt
 */
export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  if (
    isPlayableItem(item) &&
    item.state.standingOn !== null &&
    isDeadlyItem(item.state.standingOn)
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

  // handle standing on an item with dissppear='onStand' - eg, if got onto this item
  // by walking onto it from another item, there would have been no collision with it
  // to set the standing on property
  if (
    isFreeItem(item) &&
    item.state.standingOn !== null &&
    item.state.standingOn.state.disappear === "onStand"
  ) {
    makeItemFadeOut({ touchedItem: item.state.standingOn, gameState, room });
  }

  let accumulatedPosDelta = applyMechanicsResults(item, mechanicsResults);

  // velocities for this item have now been updated - get the aggregate movement, including vels
  // that stood from previous frames (did not change)
  if (
    isFreeItem(item) ||
    isItemType("lift")(item) ||
    isItemType("firedDonut")(item)
  ) {
    accumulatedPosDelta = addXyz(
      accumulatedPosDelta,
      ...iterate(objectValues(item.state.vels)).map((val) =>
        scaleXyz(val, deltaMS),
      ),
    );
  }

  moveItem({
    subjectItem: item as UnknownItemInPlay<RoomId>,
    posDelta: accumulatedPosDelta,
    gameState,
    room,
    deltaMS,
  });
};

export const applyMechanicsResults = <
  RoomId extends string,
  T extends ItemInPlayType,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  mechanicsResults: Array<MechanicResult<T, RoomId>>,
) => {
  let accumulatedPosDelta = originXyz;

  for (const mechanicResult of mechanicsResults) {
    if (mechanicResult.movementType === "position") {
      accumulatedPosDelta = addXyz(
        accumulatedPosDelta,
        mechanicResult.posDelta,
      );
    }

    // update item.state.vels
    if (
      mechanicResult.movementType === "vel" &&
      (isFreeItem(item) || isItemType("lift")(item))
    ) {
      for (const [mechanic, velPartial] of objectEntriesIter(
        mechanicResult.vels,
      )) {
        const vel: Xyz = { ...originXyz, ...velPartial };

        (item.state.vels as Record<string, Xyz>)[mechanic as string] = vel;
      }
    }

    // update item.state.*
    const mrStateDelta = mechanicResult.stateDelta;
    if (mrStateDelta !== undefined) {
      item.state = { ...item.state, ...mrStateDelta };
    }
  }

  return accumulatedPosDelta;
};
