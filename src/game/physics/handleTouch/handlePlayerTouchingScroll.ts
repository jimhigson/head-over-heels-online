import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { CharacterName } from "@/model/modelTypes";

export const handlePlayerTouchingScroll = <RoomId extends string>({
  gameState: { events },
  touchedItem: scrollItem,
  gameState: { progression },
}: ItemTouchEvent<RoomId, CharacterName, "scroll">) => {
  const {
    config,
    state: { touchedOnProgression },
  } = scrollItem;

  scrollItem.state.touchedOnProgression = progression;

  if (progression === touchedOnProgression + 1) {
    // switch was already being pressed so skip it:
    return;
  }

  events.emit("scrollOpened", config);
};
