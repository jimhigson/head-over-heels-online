import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { CharacterName } from "@/model/modelTypes";

export const handlePlayerTouchingScroll = <RoomId extends string>({
  touchedItem: scrollItem,
  gameState: { progression, events },
}: ItemTouchEvent<RoomId, CharacterName, "scroll">) => {
  const {
    config,
    state: { touchedOnProgression },
  } = scrollItem;

  scrollItem.state.touchedOnProgression = progression;
  console.log("ℹ️ update touchedOnProgression to", progression);

  if (
    // touched on the last 10 ticks:
    progression <
    touchedOnProgression + 10
  ) {
    console.log(
      "❌ not considering scroll touchd because progression is",
      progression,
      "and touchedOnProgression is",
      touchedOnProgression,
    );

    // switch was already being pressed so skip it:
    return;
  }

  console.log(
    "✅ considering scroll touchd because progression is",
    progression,
    "and touchedOnProgression is",
    touchedOnProgression,
  );

  events.emit("scrollOpened", config);
};
