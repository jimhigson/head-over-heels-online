import {
  type EditorJsonItemUnion,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";

/** walls and floors - the items the walls/floors lock protects */
export const isSceneryItem = (
  item: EditorJsonItemUnion | EditorUnionOfAllItemInPlayTypes,
) => item.type === "wall" || item.type === "floor";
