import type {
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";

import { isSolid } from "../../../game/physics/itemPredicates";
import { iterateRoomItems } from "../../../model/RoomState";

/**
 * find items that items being (added to/moved in/resized in) a room would
 * need to care about colliding with, when they are added/moved
 */
export const collideableItemsInRoom = (
  roomState: EditorRoomState,
): Iterable<EditorUnionOfAllItemInPlayTypes> => {
  return iterateRoomItems(roomState.items).filter((item) => isSolid(item));
};
