import { Editor } from "@monaco-editor/react";
import { type editor } from "monaco-editor";
import { useState } from "preact/hooks";

import { useEditorAppSelector } from "../../store/store";
import { selectCursorRoomId } from "../slice/levelEditorSelectors";
import { useMonacoSuggestions } from "./suggestions/useMonacoSuggestions";
import { useItemIconDecorations } from "./useItemIconDecorations";
import { useLoadMonaco } from "./useLoadMonaco";
import { useSyncMonacoCaretToStoreItemSelection } from "./useSyncMonacoCaretToStoreItemSelection";
import { useSyncStoreItemSelectionToMonacoDecorations } from "./useSyncStoreItemSelectionToMonacoDecorations";
import { useUpdateJsonTextWhenStoreChanges } from "./useUpdateJsonTextWhenStoreChanges";
import { useUpdateStoreWhenJsonEdited } from "./useUpdateStoreWhenJsonEdited";

const JsonRoomEditor = () => {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const currentlyEditingRoomId = useEditorAppSelector((state) =>
    selectCursorRoomId(state.levelEditor),
  );

  const monacoLoaded = !!useLoadMonaco();
  const updateStoreWhenJsonEdited = useUpdateStoreWhenJsonEdited(editor);
  useSyncMonacoCaretToStoreItemSelection(editor);
  useSyncStoreItemSelectionToMonacoDecorations(editor);
  useMonacoSuggestions();
  useUpdateJsonTextWhenStoreChanges(editor);
  useItemIconDecorations(editor);

  const handleEditorMount = (mountedEditor: editor.IStandaloneCodeEditor) => {
    setEditor(mountedEditor);

    // readiness signal for network-cost measurement (true-site-size): mark
    // when monaco is rendering, not merely constructed - content size is
    // known once the document has been measured and laid out, and the
    // following animation frame is the first that paints it
    const markOnNextFrame = () => {
      requestAnimationFrame(() => {
        performance.mark("editor-monaco-ready");
      });
    };
    if (mountedEditor.getContentHeight() > 0) {
      markOnNextFrame();
    } else {
      const contentSizeListener = mountedEditor.onDidContentSizeChange(() => {
        contentSizeListener.dispose();
        markOnNextFrame();
      });
    }
    // onLanguage("json") fires when the editor first attaches a JSON model and
    // sets up the token provider asynchronously via getMode().then(setupMode).
    // Monaco re-tokenizes lazily — visible lines aren't tokenized until the
    // viewport changes. setTimeout(0) defers past the setupMode microtask, then
    // nudging the scroll position triggers viewport re-tokenization.
    setTimeout(() => {
      const scroll = mountedEditor.getScrollTop();
      mountedEditor.setScrollTop(scroll + 1);
      mountedEditor.setScrollTop(scroll);
    }, 0);
  };

  // which of the possibly multiple models in monaco are we currently using?
  const path = `${currentlyEditingRoomId}.json`;

  if (!monacoLoaded) {
    return null;
  }

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
          // taller suggest rows - the widget is a virtualised list, so its row
          // height comes from this option, not CSS padding
          suggestLineHeight: 24,
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
          // no word-based completions - JSON suggestions come from the schema
          // and our room-id provider, not from words already in the document
          wordBasedSuggestions: "off",
          inlineSuggest: {
            enabled: true,
          },
        } as editor.IStandaloneEditorConstructionOptions
      }
      onChange={updateStoreWhenJsonEdited}
      onMount={handleEditorMount}
    />
  );
};

// default export for lazy loading
export default JsonRoomEditor;
