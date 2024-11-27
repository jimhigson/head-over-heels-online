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

function* itemMechanics<RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): Generator<MechanicResult<T>> {
  if (isFreeItem(item)) {
    yield gravity(item, gameState, deltaMS) as MechanicResult<T>;
  }

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    yield teleporting(item, gameState, deltaMS) as MechanicResult<T>;
    yield walking(item, gameState, deltaMS) as MechanicResult<T>;
    yield jumping(item, gameState, deltaMS) as MechanicResult<T>;
  }

  if (isItemType("lift")(item)) {
    yield moveLift(item, gameState, deltaMS) as MechanicResult<T>;
  }
}

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 */
export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): undefined => {
  let accumulatedMovement = originXyz;

  for (const mr of itemMechanics(item, gameState, deltaMS)) {
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

  moveItem({
    subjectItem: item as UnknownItemInPlay<RoomId>,
    posDelta: accumulatedMovement,
    gameState,
    deltaMS,
  });
};
