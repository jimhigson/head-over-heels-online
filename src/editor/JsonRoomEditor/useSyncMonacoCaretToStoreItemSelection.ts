import { getLocation } from "jsonc-parser";
import type { editor } from "monaco-editor";
import { useEffect } from "react";
import type { AnyRoomJson } from "../../model/RoomJson";
import { useAppDispatch } from "../../store/hooks";
import type { EditorRoomItemId } from "../editorTypes";
import { setSelectedItemsInRoom } from "../slice/levelEditorSlice";
import { useLoadMonaco } from "./useLoadMonaco";

export const useSyncMonacoCaretToStoreItemSelection = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  // select matching text in monaco whenever the item selection in the store changes
  const monaco = useLoadMonaco();

  const dispatch = useAppDispatch();

  // sync monaco caret -> store item selection
  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }

    const disposable = editor.onDidChangeCursorPosition((e) => {
      if (e.reason !== monaco.editor.CursorChangeReason.Explicit) {
        // ignore cursor position changes that are not explicitly set by the user
        // since we modify the store here, and there are places where we set the
        // cursor position programmatically, which we don't want to trigger this
        // effect
        return;
      }

      const editorModel = editor.getModel();

      if (editorModel === null) {
        return;
      }

      const offset = editorModel.getOffsetAt(e.position);

      const editorText = editorModel?.getValue();

      if (editorText === undefined) {
        // no editor text
        return;
      }

      const { path } = getLocation(editorText, offset);
      if (path.length < 2) {
        return;
      }

      if (path[0] === ("items" satisfies keyof AnyRoomJson)) {
        const [, jsonItemId] = path;
        dispatch(
          setSelectedItemsInRoom({
            jsonItemIds: [jsonItemId as EditorRoomItemId],
          }),
        );
      }
    });

    return disposable.dispose;
  }, [dispatch, editor, monaco]);
};
