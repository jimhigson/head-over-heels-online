import { useState } from "react";
import type { Monaco } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useSyncStoreItemSelectionToMonacoDecorations } from "./useSyncSelectionWithMonaco";
import roomSchema from "../../_generated/room.schema.json";
import { useUpdateStoreWhenJsonEdited } from "./useUpdateStoreWhenJsonEdited";
import { useItemIconDecorations } from "./ItemIconDecorations";
import { useMonacoSuggestions } from "./useMonacoSuggestions";
import { useUpdateJsonTextWhenStoreChanges } from "./useUpdateJsonTextWhenStoreChanges";
import { useAppSelectorWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { useSyncMonacoCaretToStoreItemSelection } from "./useSyncMonacoCaretToStoreItemSelection";

const JsonRoomEditor = () => {
  //const monaco = useLoadMonaco();
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const currentlyEditingRoomId = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.currentlyEditingRoomId,
  );

  const updateStoreWhenJsonEdited = useUpdateStoreWhenJsonEdited(editor);
  useSyncMonacoCaretToStoreItemSelection(editor);
  useSyncStoreItemSelectionToMonacoDecorations(editor);
  useMonacoSuggestions();
  useUpdateJsonTextWhenStoreChanges(editor);
  useItemIconDecorations(editor);

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

  // which of the possibly multiple models in monaco are we currently using?
  const path = `${currentlyEditingRoomId}.json`;

  //if (monaco !== null) { <- this wait stops json loading properly in vite dev for some reason
  return (
    <Editor
      className="no-keyboard-shortcuts"
      height="100%"
      width="100%"
      language="json"
      theme="hoh-dark"
      path={path}
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
    />
  );
  //}
};

// default export for lazy loading
export default JsonRoomEditor;
