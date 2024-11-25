import type {
  ItemInPlay,
  UnknownItemInPlay,
  ItemInPlayType,
} from "@/model/ItemInPlay";
import { isItemType, isPlayableItem, isFreeItem } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { GameState } from "../gameState/GameState";
import type { MechanicResult } from "../physics/MechanicResult";
import { gravity } from "../physics/mechanics/gravity";

import type { Xyz } from "@/utils/vectors/vectors";
import { addXyz, originXyz, scaleXyz } from "@/utils/vectors/vectors";
import { moveItem } from "../physics/moveItem";
import { jumping } from "../physics/mechanics/jumping";
import { walking } from "../physics/mechanics/walking";
import { moveLift } from "../physics/mechanics/moveLift";
import { objectEntriesIter } from "@/utils/entries";
import { springStandingOn } from "../physics/mechanics/springStandingOn";

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 */
export const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  let accumulatedMovement = originXyz;
  const mechanicsResults: MechanicResult<T>[] = [];

  /*
   * each mechanic sees the item in the state given it it by the previous ones
   * ie, the overall mechanic is the result of functional composition of the
   * individual mechanics
   */
  const accumulateResult = (mr: MechanicResult<T>) => {
    mechanicsResults.push(mr);
    const { vels, stateDelta } = mr;

    if (vels !== undefined)
      for (const [mechanic, velPartial] of objectEntriesIter(vels)) {
        const vel: Xyz = { ...originXyz, ...velPartial };
        accumulatedMovement = addXyz(
          accumulatedMovement,
          scaleXyz(vel, deltaMS),
        );
        if (isFreeItem(item)) {
          (item.state.vels as Record<string, Xyz>)[mechanic as string] = vel;
        }
      }

    if (stateDelta !== undefined) {
      item.state = { ...item.state, ...stateDelta };
    }
  };

  if (isFreeItem(item)) {
    accumulateResult(gravity(item, gameState, deltaMS) as MechanicResult<T>);
  }

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    /*accumulateResult(
      teleporting(item, gameState, deltaMS) as MechanicResult<T>,
    );*/
    accumulateResult(walking(item, gameState, deltaMS) as MechanicResult<T>);
    const jumpMechanic = jumping(item, gameState, deltaMS);
    accumulateResult(jumpMechanic as MechanicResult<T>);
  }

  /*
  if (isItemType("teleporter")(item)) {
    accumulateResult(
      teleporterStandingOn(item, gameState, room) as MechanicResult<T>,
    );
  }*/
  if (isItemType("spring")(item)) {
    accumulateResult(springStandingOn(item, gameState) as MechanicResult<T>);
  }
  if (isItemType("lift")(item)) {
    accumulateResult(moveLift(item, gameState, deltaMS) as MechanicResult<T>);
  }

  //if (isFreeItem(item)) {
  moveItem({
    subjectItem: item as UnknownItemInPlay<RoomId>,
    posDelta: accumulatedMovement,
    gameState,
    deltaMS,
  });
  //}
};
