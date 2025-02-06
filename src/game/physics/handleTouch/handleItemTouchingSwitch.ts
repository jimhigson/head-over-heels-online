import type { ItemInPlayType } from "../../../model/ItemInPlay";
import { toggleBoolean } from "../../../store/gameMenusSlice";
import { store } from "../../../store/store";
import { objectEntriesIter } from "../../../utils/entries";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

export const handleItemTouchingSwitch = <RoomId extends string>({
  touchedItem: switchItem,
  gameState: { progression },
  room,
}: ItemTouchEventByItemType<RoomId, ItemInPlayType, "switch">) => {
  const {
    config: { activates, store: switchStoreConfig },
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

  if (activates) {
    const newSetting = (switchItem.state.setting =
      setting === "left" ? "right" : "left");

    for (const [k, v] of objectEntriesIter(activates)) {
      const affectedItem = room.items[k];

      if (affectedItem === undefined) {
        // item could have been deleted from the room (ie, be a disappearing block
        // that's already been stood on)
        continue;
      }

      affectedItem.state = { ...affectedItem.state, ...v[newSetting] };
    }
  }

  if (switchStoreConfig) {
    store.dispatch(toggleBoolean(switchStoreConfig.path));
  }
};
