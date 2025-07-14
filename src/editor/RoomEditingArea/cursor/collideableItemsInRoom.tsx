import { isSolid } from "../../../game/physics/itemPredicates";
import { iterateRoomItems } from "../../../model/RoomState";
import type {
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";

/**
 * find items that items being added/moved to the room would need to care about
 * colliding with, when they are added/moved
 */
export const collideableItemsInRoom = (
  roomState: EditorRoomState,
): Iterable<EditorUnionOfAllItemInPlayTypes> => {
  return iterateRoomItems(roomState.items).filter(
    (item) => isSolid(item) && !item.isCursorPreview,
  );
};
