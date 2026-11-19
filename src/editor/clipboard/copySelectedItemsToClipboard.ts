import { editorStore } from "../../store/store";
import { pick } from "../../utils/pick";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
} from "../slice/levelEditorSlice";

/** put the selected items' json on the clipboard, to paste into any room */
export const copySelectedItemsToClipboard = async () => {
  const editorState = editorStore.getState();
  const selectedItemJsonIds =
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections(
      editorState,
    );
  const selectedItemMap = pick(
    selectCurrentCommittedRoomJson(editorState).items,
    ...selectedItemJsonIds,
  );
  await navigator.clipboard.writeText(JSON.stringify(selectedItemMap, null, 2));
};
