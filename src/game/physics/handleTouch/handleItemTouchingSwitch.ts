import { objectEntriesIter } from "@/utils/entries";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";
import type { ItemInPlayType } from "@/model/ItemInPlay";

export const handleItemTouchingSwitch = <RoomId extends string>({
  touchedItem: switchItem,
  gameState: { progression },
  room,
}: ItemTouchEventByItemType<RoomId, ItemInPlayType, "switch">) => {
  const {
    config: { activates },
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

  return false;
};
