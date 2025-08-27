import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { MechanicResult } from "../physics/MechanicResult";

import { objectEntriesIter } from "../../utils/entries";
import { addXyz, originXyz, type Xyz } from "../../utils/vectors/vectors";
import { isFreeItem, isItemType } from "../physics/itemPredicates";

export const applyMechanicsResults = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<T, RoomId, RoomItemId>,
  mechanicsResults: Array<MechanicResult<T, RoomId, RoomItemId>>,
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
