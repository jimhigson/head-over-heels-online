import { makeItemFadeOut } from "@/game/gameState/mutators/makeItemFadeOut";
import type { ItemTouchEvent } from "./ItemTouchEvent";
import type { CharacterName } from "@/model/modelTypes";

export const handlePlayerTouchingScroll = <RoomId extends string>({
  touchedItem: scrollItem,
  gameState,
  room,
}: ItemTouchEvent<RoomId, CharacterName, "scroll">) => {
  const {
    config,
    state: { expires },
  } = scrollItem;

  if (expires !== null) {
    // is on its way out, having already been touched
    return;
  }

  const roomPickupCollections = gameState.pickupsCollected[room.id] as Record<
    string,
    true
  >;
  roomPickupCollections[scrollItem.id] = true;

  gameState.events.emit("scrollOpened", config);
  makeItemFadeOut(scrollItem, gameState);
};
