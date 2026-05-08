import type { EditorRootState } from "../../../store/store";
import type {
  EditorJsonItemUnion,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";

export const itemsAreLocked = (
  storeState: EditorRootState,
  ...items: EditorJsonItemUnion[] | EditorUnionOfAllItemInPlayTypes[]
) => {
  return (
    storeState.levelEditor.wallsFloorsLocked &&
    items.some((t) => t.type === "wall" || t.type === "floor")
  );
};
