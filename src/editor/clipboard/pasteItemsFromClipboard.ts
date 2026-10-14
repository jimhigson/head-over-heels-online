import { produce } from "immer";

import { editorStore } from "../../store/store";
import {
  roomJsonEdited,
  selectCurrentCommittedRoomJson,
} from "../slice/levelEditorSlice";
import { type UndoDescription } from "../slice/reducers/undoDescription";

/** add items copied (as json) from any room to the current room */
export const pasteItemsFromClipboard = async () => {
  try {
    // bare minimum implementation for pasting in items from other rooms:
    const clipboardText = await navigator.clipboard.readText();
    const clipboardItems = JSON.parse(clipboardText);

    const currentRoomJson = selectCurrentCommittedRoomJson(
      editorStore.getState(),
    );

    const updatedRoom = produce(currentRoomJson, (draft) => {
      Object.assign(draft.items, clipboardItems);
    });

    editorStore.dispatch(
      roomJsonEdited({
        roomJson: updatedRoom,
        description: { kind: "pasteItems" } satisfies UndoDescription,
        timestamp: Date.now(),
      }),
    );
  } catch (_error) {
    // Silently ignore clipboard errors (invalid JSON, permissions, etc)
    // TODO: implement some kind of failure message
  }
};
