import type {
  EditorJsonItemUnion,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../slice/levelEditorSlice";

export const itemsAreLocked = (
  storeState: RootStateWithLevelEditorSlice,
  ...items: //| ItemInPlayType[]
  EditorJsonItemUnion[] | EditorUnionOfAllItemInPlayTypes[]
) => {
  return (
    storeState.levelEditor.wallsFloorsLocked &&
    items.some(
      (t) =>
        //typeof t === "string" ?
        //  t === "wall" || t === "floor",
        //:
        t.type === "wall" || t.type === "floor",
    )
  );
};
