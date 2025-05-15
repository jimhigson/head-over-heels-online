import { objectEntries } from "iter-tools";
import type { ItemInPlayType, SwitchSetting } from "../../../model/ItemInPlay";
import type { SwitchInRoomConfig } from "../../../model/json/SwitchConfig";
import type { RoomStateItems } from "../../../model/RoomState";
import { toggleBoolean } from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

export const handleItemTouchingSwitch = <
  RoomId extends string,
  RoomItemId extends string,
>({
  touchedItem: switchItem,
  gameState: { progression },
  room,
}: ItemTouchEventByItemType<RoomId, RoomItemId, ItemInPlayType, "switch">) => {
  const {
    config: switchConfig,
    state: { setting, touchedOnProgression },
  } = switchItem;

  switchItem.state.touchedOnProgression = progression;

  if (
    // touched on the last progression
    progression === touchedOnProgression + 1 ||
    // touched on this progression (handled touch twice in one frame)
    progression === touchedOnProgression
  ) {
    // switch was already being pressed so skip it:
    return;
  }

  switch (switchConfig.type) {
    case "in-room": {
      const newSetting = (switchItem.state.setting =
        setting === "left" ? "right" : "left");

      toggleSwitchInRoom<RoomId, RoomItemId>(
        switchConfig,
        newSetting,
        room.items,
        room.roomTime,
      );
      // break for switch
      break;
    }
    case "in-store": {
      store.dispatch(toggleBoolean(switchConfig.path));
      break;
    }
    default:
      switchConfig satisfies never;
  }
};

type UnknownSwitchSettingStates = {
  left?: unknown;
  right?: unknown;
};

// exported for testing
export const toggleSwitchInRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  switchConfig: SwitchInRoomConfig<NoInfer<RoomId>, NoInfer<RoomItemId>>,
  newSetting: SwitchSetting,
  roomItems: RoomStateItems<RoomId, RoomItemId>,
  roomTime: number,
) => {
  // loop over the top-level of the switch's modification list:
  for (const modification of switchConfig.modifies) {
    // loop the states to modify:
    for (const [
      modifiedPropertyName,
      newStatesForPropertyBySwitchSetting,
    ] of objectEntries(
      modification.newState as Record<string, UnknownSwitchSettingStates>,
    )) {
      if (!Object.hasOwn(newStatesForPropertyBySwitchSetting, newSetting)) {
        // nothing to set for this side of the switch
        continue;
      }

      // loop over individual targets:
      for (const target of modification.targets) {
        const targetItem = roomItems[target];

        if (targetItem === undefined) {
          // item could have been deleted from the room (ie, be a disappearing block
          // that's already been stood on)
          continue;
        }

        if (targetItem.type !== modification.expectType) {
          throw new Error(
            `item "${targetItem.id}" is of type "${targetItem.type}" - does not match expected type "${modification.expectType}" from switch config ${JSON.stringify(switchConfig, null, 2)}`,
          );
        }

        const targetItemCast = targetItem as {
          state: Record<string, unknown>;
        };

        targetItemCast.state = {
          ...targetItem.state,
          [modifiedPropertyName]:
            newStatesForPropertyBySwitchSetting[newSetting],
          switchedAtRoomTime: roomTime,
          switchedSetting: newSetting,
        };
      }
    }
  }
};
