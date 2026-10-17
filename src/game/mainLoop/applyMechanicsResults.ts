import { type KeysOfUnion } from "type-fest";

import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../model/RoomState";
import {
  addXyz,
  addXyzInPlace,
  originXyz,
  resetXyzInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type MechanicResult } from "../physics/MechanicResult";

export const applyMechanicsResults = <
  RoomId extends string,
  RoomItemId extends string,
>(
  writePosDataInto: Xyz,
  /**
   * the item being ticked - results without a targetItemId apply to it
   */
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  mechanicsResults: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
) => {
  resetXyzInPlace(writePosDataInto);

  for (let i = 0; i < mechanicsResults.length; i++) {
    const mechanicResult = mechanicsResults[i];
    const { targetItemId } = mechanicResult;
    const targetItem =
      targetItemId === undefined ? item : room.items[targetItemId];

    if (targetItem === undefined) {
      // the target was removed from the room
      continue;
    }

    if (mechanicResult.movementType === "position") {
      addXyzInPlace(writePosDataInto, mechanicResult.posDelta);
    }

    // update item.state.vels
    if (mechanicResult.movementType === "vel" && "vels" in targetItem.state) {
      Object.assign(targetItem.state.vels, mechanicResult.vels);
    } else if (
      mechanicResult.movementType === "velDelta" &&
      "vels" in targetItem.state
    ) {
      type VelType = KeysOfUnion<typeof targetItem.state.vels>;
      const targetVels: Partial<Record<VelType, Xyz>> = targetItem.state.vels;
      const deltaVels: Partial<Record<VelType, Xyz>> = mechanicResult.vels;
      for (const velType in deltaVels) {
        // not in-place - vels can be shared constants:
        targetVels[velType as VelType] = addXyz(
          targetVels[velType as VelType] ?? originXyz,
          deltaVels[velType as VelType]!,
        );
      }
    }

    // update item.state.* (anything in stateDelta of the MR)
    const mrStateDelta = mechanicResult.stateDelta;
    if (mrStateDelta !== undefined) {
      Object.assign(targetItem.state, mrStateDelta);
    }
  }

  return writePosDataInto;
};
