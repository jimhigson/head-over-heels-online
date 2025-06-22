import { addItemToRoom } from "../../../game/gameState/mutators/addItemToRoom";
import { iterateRoomItems } from "../../../model/RoomState";
import type { EditorUnionOfAllItemInPlayTypes } from "../../EditorRoomId";
import { type EditorRoomState } from "../../EditorRoomId";

/**
 * mutate the given room in-place
 */
export const mutateRoomAddCursorPreviews = (
  room: EditorRoomState,
  previewItems: Iterable<EditorUnionOfAllItemInPlayTypes>,
) => {
  for (const item of previewItems) {
    addItemToRoom({ room, item });
  }
};

export const mutateRoomRemoveCursorPreviews = (room: EditorRoomState) => {
  for (const item of iterateRoomItems(room.items)) {
    if (item.isCursorPreview) {
      delete room.items[item.id];
    }
  }
};
