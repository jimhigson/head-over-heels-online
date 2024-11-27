import { isFreeItem } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { findStandingOn } from "../collision/findStandingOn";

export const setStandingOnForAllItemsInRoom = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  progression: number,
) => {
  for (const item of objectValues(room.items)) {
    // setting conditionally is bad because we do a shallow clone to set the
    // lastRenderedState - needs to be a new object if it is different (or just always)
    //if (item.state.stoodOnBy.length > 0) {
    item.state.stoodOnBy = [];
    //}
  }
  for (const item of objectValues(room.items)) {
    if (isFreeItem(item)) {
      item.state.standingOn = findStandingOn(
        item,
        objectValues(room.items),
        progression,
      );

      for (const sOn of item.state.standingOn) {
        room.items[sOn.id].state.stoodOnBy.push(item);
      }
    }
  }
  // TODO: maybe sort items (?)
};
