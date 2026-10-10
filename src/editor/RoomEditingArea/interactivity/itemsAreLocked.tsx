import { type EditorRootState } from "../../../store/store";
import {
  type EditorJsonItemUnion,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import { isSceneryItem } from "./isSceneryItem";

export const itemsAreLocked = (
  storeState: EditorRootState,
  ...items: EditorJsonItemUnion[] | EditorUnionOfAllItemInPlayTypes[]
) => {
  return storeState.levelEditor.wallsFloorsLocked && items.some(isSceneryItem);
};
