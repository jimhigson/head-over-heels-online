import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
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
      Object.assign(item.state.vels, mechanicResult.vels);
    }

    // update item.state.* (anything in stateDelta of the MR)
    const mrStateDelta = mechanicResult.stateDelta;
    if (mrStateDelta !== undefined) {
      Object.assign(item.state, mrStateDelta);
    }
  }

  return writePosDataInto;
};
