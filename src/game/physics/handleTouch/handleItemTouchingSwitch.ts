import { currentRoom } from "@/game/gameState/GameState";
import { objectEntriesIter } from "@/utils/entries";
import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { ItemInPlayType } from "@/model/ItemInPlay";

export const handleItemTouchingSwitch = <RoomId extends string>({
  touchedItem: switchItem,
  gameState,
}: ItemTouchEvent<RoomId, ItemInPlayType, "switch">) => {
  const room = currentRoom(gameState);

  const {
    config: { activates },
    state: { setting, touchedOnProgression },
  } = switchItem;

  switchItem.state.touchedOnProgression = gameState.progression;

  if (gameState.progression === touchedOnProgression + 1) {
    // switch was already being pressed so skip it:
    return;
  }

  const newSetting = (switchItem.state.setting =
    setting === "left" ? "right" : "left");

  for (const [k, v] of objectEntriesIter(activates)) {
    const affectedItem = room.items[k];

    affectedItem.state = { ...affectedItem.state, ...v[newSetting] };
  }

  return false;
};
