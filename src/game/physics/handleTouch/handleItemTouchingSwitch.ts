import type { ItemInPlayType, SwitchSetting } from "../../../model/ItemInPlay";
import type { SwitchInRoomConfig } from "../../../model/json/SwitchConfig";
import {
  iterateRoomItems,
  type RoomStateItems,
} from "../../../model/RoomState";
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
  for (const modifiesItem of switchConfig.modifies) {
    // loop here because there could be multiple items with the same jsonItemId
    for (const roomItem of iterateRoomItems(roomItems)) {
      if (
        !roomItem.jsonItemId ||
        !modifiesItem.targets.includes(roomItem.jsonItemId)
      ) {
        // skip items that are not targeted by this switch
        continue;
      }

      if (roomItem === undefined) {
        // item could have been deleted from the room (ie, be a disappearing block
        // that's already been stood on)
        continue;
      }

      if (roomItem.type !== modifiesItem.expectType) {
        throw new Error(
          `item "${roomItem.id}" is of type "${roomItem.type}" - does not match expected type "${modifiesItem.expectType}" from switch config ${JSON.stringify(switchConfig, null, 2)}`,
        );
      }

      const targetItemCast = roomItem as {
        state: Record<string, unknown>;
      };

      // loop the states to modify:
      targetItemCast.state = {
        ...roomItem.state,
        ...modifiesItem[`${newSetting}State`],
        switchedAtRoomTime: roomTime,
        switchedSetting: newSetting,
      };
    }
  }
};
