import type {
  ItemInPlay,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { isItemType, isPlayableItem, isFreeItem } from "@/model/ItemInPlay";
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
import { objectValues } from "iter-tools";
import { objectEntriesIter } from "@/utils/entries";
import { latentMovement } from "../physics/mechanics/latentMovement";

function* itemMechanicResultGen<
  RoomId extends string,
  T extends ItemInPlayType,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): Generator<MechanicResult<T, RoomId>> {
  if (isItemType("heels")(item)) {
    // heels can remove items from the game, so process that first since it could
    // affect other mechanics
    carrying(item, gameState, deltaMS);
  }

  if (isFreeItem(item)) {
    yield gravity(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield onConveyor(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield* latentMovement(item, gameState, deltaMS) as Generator<
      MechanicResult<T, RoomId>
    >;
  }

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    // user controls:
    yield teleporting(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield walking(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
    yield jumping(item, gameState, deltaMS) as MechanicResult<T, RoomId>;
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
): boolean => {
  let accumulatedPosDelta = originXyz;

  for (const mechanicResult of itemMechanicResultGen(
    item,
    room,
    gameState,
    deltaMS,
  )) {
    // add movement to accumulatedPosDelta
    const mrPosDelta =
      mechanicResult.movementType === "position" ? mechanicResult.posDelta
      : (
        mechanicResult.movementType === "vel" &&
        mechanicResult.vels !== undefined
      ) ?
        scaleXyz(
          addXyz(
            ...objectValues(
              mechanicResult.vels as Record<string, Partial<Xyz>>,
            ),
          ),
          deltaMS,
        )
      : undefined;

    if (mrPosDelta !== undefined) {
      accumulatedPosDelta = addXyz(accumulatedPosDelta, mrPosDelta);
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

    if (mechanicResult.movementType === "endTick") {
      // this items's tick is halting the frame tick
      return true;
    }
  }

  return moveItem({
    subjectItem: item as UnknownItemInPlay<RoomId>,
    posDelta: accumulatedPosDelta,
    gameState,
    deltaMS,
  });
};
