import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlay,
  type ItemInPlayType,
  type SwitchSetting,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import {
  type SwitchConfig,
  type SwitchInRoomConfig,
  type SwitchItemModificationUnion,
} from "../../../../model/json/SwitchConfig";
import { roomItemsIterable, type RoomState } from "../../../../model/RoomState";
import { toggleUserSetting } from "../../../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../../../store/store";
import { neverTime } from "../../../../utils/neverTime";
import { switchMinTimeBetweenToggleMs } from "../../mechanicsConstants";
import { type ItemTouchEventByItemType } from "../ItemTouchEvent";
import { getNewState } from "./getNewState";

const oppositeSetting = (setting: SwitchSetting): SwitchSetting => {
  return setting === "left" ? "right" : "left";
};

const isInRoomSwitch = <RoomId extends string, RoomItemId extends string>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
): switchItem is ItemInPlay<"switch", RoomId, RoomItemId> & {
  config: SwitchInRoomConfig<RoomId, RoomItemId>;
} => {
  const {
    config: { type },
  } = switchItem;

  return type !== "in-store";
};

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

      if (
        roomItem.type === "monster" &&
        "activated" in newState &&
        newState.activated === true
      ) {
        const { standingOnItemId } = roomItem.state;
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

      //mark that we shouldn't visit this room item again:
      visited.add(roomItem);

      if (roomItem.type === "switch") {
        // special cases for switches activating other switches, which can then do their activations too:
        handleSwitchActivation(roomItem, room, visited);
      }
    }
  }
};

const toggleSwitchInRoom = <RoomId extends string, RoomItemId extends string>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId> & {
    config: SwitchInRoomConfig<RoomId, RoomItemId>;
  },
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  visited?: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
) => {
  const newSetting = oppositeSetting(switchItem.state.setting);

  switchItem.state.setting = newSetting;

  const modifiesList = switchItem.config.modifies;

  // loop over the top-level of the switch's modification list:
  applyModifiesList(modifiesList, newSetting, switchItem, room, visited);
};

const handleSwitchActivation = <
  RoomId extends string,
  RoomItemId extends string,
>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  /**
   * chain of causation - a list of the switches that flipped to flip this one.
   * needed to avoid infinite loops
   */
  visited?: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
) => {
  if (isInRoomSwitch(switchItem)) {
    toggleSwitchInRoom<RoomId, RoomItemId>(switchItem, room, visited);
  } else {
    const config = switchItem.config as Exclude<
      SwitchConfig<RoomId, RoomItemId>,
      SwitchInRoomConfig<RoomId, RoomItemId>
    >;
    store.dispatch(
      toggleUserSetting({
        path: config.path,
      }),
    );
  }
};

/** not used for buttons, these have a mechanic from tickItem based on stoodOn being set */
export const handleItemTouchingSwitch = <
  RoomId extends string,
  RoomItemId extends string,
>({
  touchedItem: switchItem,
  room,
}: ItemTouchEventByItemType<RoomId, RoomItemId, ItemInPlayType, "switch">) => {
  const lastToggledAt: number =
    switchItem.state.lastToggledAtRoomTime ?? neverTime;

  const { roomTime } = room;

  switchItem.state.lastToggledAtRoomTime = roomTime;

  if (lastToggledAt + switchMinTimeBetweenToggleMs > roomTime) {
    // switch was already being pressed so skip it:
    return;
  }

  handleSwitchActivation(switchItem, room);
};
