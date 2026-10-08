import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
import { objectEntriesIter } from "../../utils/entries";
import {
  addXyzInPlace,
  resetXyzInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type MechanicResult } from "../physics/MechanicResult";

export const applyMechanicsResults = <
  RoomId extends string,
  RoomItemId extends string,
>(
  writePosDataInto: Xyz,
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  mechanicsResults: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
) => {
  resetXyzInPlace(writePosDataInto);

  for (const mechanicResult of mechanicsResults) {
    if (mechanicResult.movementType === "position") {
      addXyzInPlace(writePosDataInto, mechanicResult.posDelta);
    }

    // update item.state.vels
    if (mechanicResult.movementType === "vel" && "vels" in item.state) {
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
