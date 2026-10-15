import { editorStore } from "../../store/store";
import { pick } from "../../utils/pick";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../slice/levelEditorSlice";

/** put the selected items' json on the clipboard, to paste into any room */
export const copySelectedItemsToClipboard = async () => {
  const editorState = editorStore.getState();
  const selectedItemMap = pick(
    selectCurrentCommittedRoomJson(editorState).items,
    ...selectCursorRoomSelectedJsonItemIds(editorState),
  );
  await navigator.clipboard.writeText(JSON.stringify(selectedItemMap, null, 2));
};
