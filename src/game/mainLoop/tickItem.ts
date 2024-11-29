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
import { objectEntriesIter } from "@/utils/entries";
import type { Xyz } from "@/utils/vectors/vectors";
import { originXyz, addXyz, scaleXyz } from "@/utils/vectors/vectors";
import { moveItem } from "../physics/moveItem";
import { teleporting } from "../physics/mechanics/teleporting";
import { onConveyor } from "../physics/mechanics/onConveyor";
import { tickBaddie } from "../physics/mechanics/baddieAi";
import { carrying } from "../physics/mechanics/carrying";

function* itemMechanicsGen<RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): Generator<MechanicResult<T>> {
  if (isItemType("heels")(item)) {
    // heels can remove items from the game, so process that first since it could
    // affect other mechanics
    carrying(item, gameState, deltaMS);
  }

  if (isFreeItem(item)) {
    // CHARLES and BADIES should also fall (be free items?)
    yield gravity(item, gameState, deltaMS) as MechanicResult<T>;
    yield onConveyor(item, gameState, deltaMS) as MechanicResult<T>;
  }

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    // user controls:
    yield teleporting(item, gameState, deltaMS) as MechanicResult<T>;
    yield walking(item, gameState, deltaMS) as MechanicResult<T>;
    yield jumping(item, gameState, deltaMS) as MechanicResult<T>;
  }

  if (isItemType("lift")(item)) {
    yield moveLift(item, gameState, deltaMS) as MechanicResult<T>;
  }

  if (isItemType("baddie")(item)) {
    yield tickBaddie(item, gameState, deltaMS) as MechanicResult<T>;
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
  gameState: GameState<RoomId>,
  deltaMS: number,
): boolean => {
  let accumulatedMovement = originXyz;

  for (const mr of itemMechanicsGen(item, gameState, deltaMS)) {
    const { vels, stateDelta } = mr;

    if (vels !== undefined)
      for (const [mechanic, velPartial] of objectEntriesIter(vels)) {
        const vel: Xyz = { ...originXyz, ...velPartial };
        accumulatedMovement = addXyz(
          accumulatedMovement,
          scaleXyz(vel, deltaMS),
        );
        if (isFreeItem(item) || isItemType("lift")(item)) {
          (item.state.vels as Record<string, Xyz>)[mechanic as string] = vel;
        }
      }

    if (stateDelta !== undefined) {
      item.state = { ...item.state, ...stateDelta };
    }
  }

  return moveItem({
    subjectItem: item as UnknownItemInPlay<RoomId>,
    posDelta: accumulatedMovement,
    gameState,
    deltaMS,
  });
};
