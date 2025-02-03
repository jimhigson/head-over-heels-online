import type { ItemInPlayType, ItemInPlay } from "../../model/ItemInPlay";
import type { SceneryName } from "../../sprites/planets";
import { objectEntriesIter } from "../../utils/entries";
import { originXyz, addXyz, type Xyz } from "../../utils/vectors/vectors";
import { isFreeItem, isItemType } from "../physics/itemPredicates";
import type { MechanicResult } from "../physics/MechanicResult";

export const applyMechanicsResults = <
  RoomId extends string,
  T extends ItemInPlayType,
>(
  item: ItemInPlay<T, SceneryName, RoomId>,
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
