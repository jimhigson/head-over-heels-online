import { type EditorJsonItemUnion } from "../editorTypes";
import { isSceneryItem } from "../RoomEditingArea/interactivity/isSceneryItem";

/** scenery belongs to its room, and doors are tied to the rooms they join */
export const isMovableBetweenRooms = (item: EditorJsonItemUnion) =>
  !isSceneryItem(item) && item.type !== "door";
