import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import {
  itemBehaviourKey,
  type SwitchSetting,
} from "../../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { type SwitchItemModificationUnion } from "../../../model/json/SwitchConfig";
import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { getNewState } from "./getNewState";

export const applyModifiesList = <
  RoomId extends string,
  RoomItemId extends string,
>(
  modifiesList: SwitchItemModificationUnion<RoomId, RoomItemId>[],
  newSetting: SwitchSetting,
  instigator: ItemTypeUnion<"button" | "switch" | "timer", RoomId, RoomItemId>,
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  visited: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>> = new Set(),
) => {
  // mark that we shouldn't visit this switch again:
  visited.add(instigator);

  for (const modifiesItem of modifiesList) {
    // loop here because there could be multiple items with the same jsonItemId
    for (const roomItem of roomItemsIterable(room.items)) {
      const { targets } = modifiesItem;

      if (roomItem.type !== modifiesItem.expectType) {
        continue;
      }

      if (
        !roomItem.jsonItemId ||
        // it is ok for targets to be undefined, in which case all items of the expected
        // type are impacted by the switch.
        (targets !== undefined && !targets.includes(roomItem.jsonItemId))
      ) {
        // skip items that are not targeted by this switch
        continue;
      }

      if (roomItem === undefined) {
        // item could have been deleted from the room (ie, be a disappearing block
        // that's already been stood on)
        continue;
      }

      if (visited.has(roomItem)) {
        continue;
      }

      const targetItemCast = roomItem as Omit<typeof roomItem, "state"> & {
        state: Record<string, unknown>;
      };

      const newState = getNewState(modifiesItem, newSetting, roomItem);

      // loop the states to modify:
      targetItemCast.state = {
        ...roomItem.state,
        ...newState,
        switchedAtRoomTime: room.roomTime,
        switchedSetting: newSetting,
      };

      if ("activated" in newState && newState.activated === true) {
        roomItem[itemBehaviourKey].onActivated(roomItem, room);
      }

      //mark that we shouldn't visit this room item again:
      visited.add(roomItem);

      // the modified item reacts in turn - eg a switch flipping its own targets:
      roomItem[itemBehaviourKey].onModified(roomItem, room, visited);
    }
  }
};
