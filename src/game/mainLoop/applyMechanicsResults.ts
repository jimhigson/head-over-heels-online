import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { MechanicResult } from "../physics/MechanicResult";

import { objectEntriesIter } from "../../utils/entries";
import {
  addXyzInPlace,
  resetXyzInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";
import { isFreeItem, isItemType } from "../physics/itemPredicates";

export const applyMechanicsResults = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  writePosDataInto: Xyz,
  item: ItemTypeUnion<T, RoomId, RoomItemId>,
  mechanicsResults: Array<MechanicResult<T, RoomId, RoomItemId>>,
) => {
  resetXyzInPlace(writePosDataInto);

  for (const mechanicResult of mechanicsResults) {
    if (mechanicResult.movementType === "position") {
      addXyzInPlace(writePosDataInto, mechanicResult.posDelta);
    }

    // update item.state.vels
    if (
      mechanicResult.movementType === "vel" &&
      (isFreeItem(item) || isItemType("lift")(item))
    ) {
      for (const [velType, vel] of objectEntriesIter(mechanicResult.vels)) {
        (item.state.vels as Record<string, Xyz>)[velType as string] = vel;
      }
    }

    // update item.state.* (anything in stateDelta of the MR)
    const mrStateDelta = mechanicResult.stateDelta;
    if (mrStateDelta !== undefined) {
      Object.assign(item.state, mrStateDelta);
    }
  }

  return writePosDataInto;
};
