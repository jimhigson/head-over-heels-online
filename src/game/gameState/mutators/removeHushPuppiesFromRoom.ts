import type { GameState } from "../GameState";

import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { isHushPuppy } from "../../physics/itemPredicates";
import { makeItemFadeOut } from "./makeItemFadeOut";

export const removeHushPuppiesFromRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
) => {
  const hushPuppyInRoomIter = roomItemsIterable(room.items).filter(isHushPuppy);
  // hush puppies don't like head:
  for (const hushPuppy of hushPuppyInRoomIter) {
    makeItemFadeOut({ touchedItem: hushPuppy, gameState, room });
  }
};
