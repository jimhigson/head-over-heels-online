import { useCallback, useMemo, useState } from "react";
import type { Monaco, OnChange } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import { useCurrentEditingRoomJson } from "../slice/levelEditorSelectors";
import type { editor } from "monaco-editor";
import { useAppDispatch } from "../../store/hooks";
import nanoEqual from "nano-equal";
import type { EditorRoomJson } from "../EditorRoomId";
import { roomJsonEdited } from "../slice/levelEditorSlice";
import { useLoadMonaco } from "./useLoadMonaco";
import { useSyncSelectionWithMonaco } from "./useSyncSelectionWithMonaco";

export const JsonRoomEditor = () => {
  const monaco = useLoadMonaco();
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );

  const roomJson = useCurrentEditingRoomJson();
  const dispatch = useAppDispatch();

  useSyncSelectionWithMonaco(editor);

  const onChange = useCallback<OnChange>(
    (text: string | undefined, _ev: editor.IModelContentChangedEvent) => {
      if (text === undefined) {
        return;
      }

      let parsedJson;
      try {
        parsedJson = JSON.parse(text) as EditorRoomJson;
        // TODO: this doesn't actually check that the json is a valid room, only that
        // it is valid JSON.
      } catch (_e) {
        return;
      }

      if (nanoEqual(parsedJson, roomJson)) {
        return;
      }

      dispatch(roomJsonEdited(parsedJson));
    },
    [dispatch, roomJson],
  );

  const stringifiedJson = useMemo(() => {
    return JSON.stringify(roomJson, null, 2);
  }, [roomJson]);

  const handleEditorMount = (
    editor: editor.IStandaloneCodeEditor,
    _monaco: Monaco,
  ) => {
    setEditor(editor);
  };

  if (monaco !== null) {
    return (
      <Editor
        height="100%"
        width="100%"
        language="json"
        theme="hoh-dark"
        options={
          {
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: "on",
            wordWrap: "on",
            wrappingIndent: "indent",
            "bracketPairColorization.enabled": false,
          } as editor.IStandaloneEditorConstructionOptions
        }
        onChange={onChange}
        onMount={handleEditorMount}
        defaultValue="{}"
        value={stringifiedJson}
      />
    );
  }
};

export default JsonRoomEditor;
