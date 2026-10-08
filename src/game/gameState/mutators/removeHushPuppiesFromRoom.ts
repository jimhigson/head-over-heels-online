import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { makeItemFadeOut } from "./makeItemFadeOut";

export const removeHushPuppiesFromRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
) => {
  const hushPuppyInRoomIter = roomItemsIterable(room.items).filter(
    (item) => item.type === "hushPuppy",
  );
  // hush puppies don't like head:
  for (const hushPuppy of hushPuppyInRoomIter) {
    makeItemFadeOut({ touchedItem: hushPuppy, room });
  }
};
