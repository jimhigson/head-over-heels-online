import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type RoomState } from "../../model/RoomState";
import { type MechanicResult } from "../physics/MechanicResult";

export const disableToasterOnMonsterActivation = <
  RoomId extends string,
  RoomItemId extends string,
>(
  movingItem: ItemTypeUnion<"monster" | "movingPlatform", RoomId, RoomItemId>,
  activationResult: MechanicResult<
    "monster" | "movingPlatform",
    RoomId,
    RoomItemId
  >,
  room: RoomState<RoomId, RoomItemId>,
) => {
  if (
    movingItem.type === "monster" &&
    (activationResult as MechanicResult<"monster", RoomId, RoomItemId>)
      .stateDelta?.activated === true
  ) {
    const { standingOnItemId } = movingItem.state;
    if (standingOnItemId !== null) {
      const standingOn = room.items[standingOnItemId];
      if (
        standingOn.type === "deadlyBlock" &&
        standingOn.config.style === "toaster"
      ) {
        standingOn.state.disabled = true;
      }
    }
  }
};
