import { makeItemFadeOut } from "./makeItemFadeOut";
import type { GameState } from "../GameState";
import { isItemType } from "../../physics/itemPredicates";
import { iterateRoomItems, type RoomState } from "../../../model/RoomState";

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
  for (const hushPuppyBye of hushPuppyInRoomIter) {
    makeItemFadeOut({ touchedItem: hushPuppyBye, gameState, room });
  }
};
