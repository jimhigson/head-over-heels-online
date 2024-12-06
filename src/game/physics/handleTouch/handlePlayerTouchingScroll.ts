import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { CharacterName } from "@/model/modelTypes";

export const handlePlayerTouchingScroll = <RoomId extends string>({
  gameState: { events },
  touchedItem: { config },
}: ItemTouchEvent<RoomId, CharacterName, "scroll">) => {
  events.emit("scrollOpened", config);
};
