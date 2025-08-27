import type { GameState } from "../GameState";

import { iterateRoomItems, type RoomState } from "../../../model/RoomState";
import { isItemType } from "../../physics/itemPredicates";
import { makeItemFadeOut } from "./makeItemFadeOut";

export const removeHushPuppiesFromRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
) => {
  const hushPuppyInRoomIter = iterateRoomItems(room.items).filter(
    isItemType("hushPuppy"),
  );
  // hush puppies don't like head:
  for (const hushPuppy of hushPuppyInRoomIter) {
    makeItemFadeOut({ touchedItem: hushPuppy, gameState, room });
  }
};
