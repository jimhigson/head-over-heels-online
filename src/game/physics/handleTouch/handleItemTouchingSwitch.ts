import type { ItemInPlayType } from "../../../model/ItemInPlay";
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

      for (const modification of switchConfig.modifies) {
        const targetItem = room.items[modification.target];

        if (targetItem === undefined) {
          // item could have been deleted from the room (ie, be a disappearing block
          // that's already been stood on)
          continue;
        }

        targetItem.state = {
          ...targetItem.state,
          [modification.key]: modification[newSetting],
          switchedAtRoomTime: room.roomTime,
          switchedSetting: newSetting,
        };
      }

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
