import type {
  EditorJsonItemUnion,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";

export const itemsAreLocked = (
  storeState: RootStateWithLevelEditorSlice,
  ...items: EditorJsonItemUnion[] | EditorUnionOfAllItemInPlayTypes[]
) => {
  return (
    storeState.levelEditor.wallsFloorsLocked &&
    items.some((t) => t.type === "wall" || t.type === "floor")
  );
};
