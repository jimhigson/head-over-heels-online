import { useMemo, useState } from "react";
import type { Monaco } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import { useCurrentEditingRoomJson } from "../slice/levelEditorSelectors";
import type { editor } from "monaco-editor";
import { useLoadMonaco } from "./useLoadMonaco";
import { useSyncSelectionWithMonaco } from "./useSyncSelectionWithMonaco";
import roomSchema from "../../_generated/room.schema.json";
import { useUpdateStoreWhenJsonEdited } from "./useUpdateStoreWhenJsonEdited";
import { ItemContentWidgets } from "./ItemIconDecorations";
import { useMonacoSuggestions } from "./useMonacoSuggestions";

export const JsonRoomEditor = () => {
  const monaco = useLoadMonaco();
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );

  const roomJson = useCurrentEditingRoomJson();

  const updateStoreWhenJsonEdited = useUpdateStoreWhenJsonEdited(editor);
  useSyncSelectionWithMonaco(editor);
  useMonacoSuggestions();

  const stringifiedJson = useMemo(() => {
    return JSON.stringify(roomJson, null, 2);
  }, [roomJson]);

  const handleEditorMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    setEditor(editor);

    // Configure JSON language service with the room schema
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "https://blockstack.org/room.schema.json",
          fileMatch: ["*"],
          schema: roomSchema,
        },
      ],
    });
  };

  if (monaco !== null) {
    return (
      <>
        <Editor
          height="100%"
          width="100%"
          language="json"
          theme="hoh-dark"
          options={
            {
              minimap: { enabled: false },
              // since we're using monaco inside a resizable container with overflow
              // hidden, tell it to move its tooltips up to the top of the window's DOM:
              fixedOverflowWidgets: true,
              fontSize: 12,
              lineNumbers: "off",
              wordWrap: "on",
              glyphMargin: true,
              wrappingIndent: "indent",
              //folding: false,
              "bracketPairColorization.enabled": false,
              quickSuggestions: {
                other: true,
                string: true,
                comments: false,
              },
              quickSuggestionsDelay: 100,
              inlineSuggest: {
                enabled: true,
              },
            } as editor.IStandaloneEditorConstructionOptions
          }
          onChange={updateStoreWhenJsonEdited}
          onMount={handleEditorMount}
          defaultValue="{}"
          value={stringifiedJson}
        />
        <ItemContentWidgets editor={editor} />
      </>
    );
  }
};

export default JsonRoomEditor;
